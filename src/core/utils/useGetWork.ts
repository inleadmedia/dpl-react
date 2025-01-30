import { useMemo } from "react";
import { UseQueryResult } from "react-query";
import {
  GetMaterialGloballyQuery,
  GetMaterialQuery,
  useGetMaterialGloballyQuery,
  useGetMaterialQuery,
  useGetMaterialMarc
} from "../dbc-gateway/generated/graphql";
import { WorkId } from "./types/ids";

export type WorkType = "local" | "global" | "unknown";

type DataResponse = (
  | UseQueryResult<GetMaterialQuery, unknown>
  | UseQueryResult<GetMaterialGloballyQuery, unknown>
) & { workType: WorkType };

const getData = (
  response:
    | UseQueryResult<GetMaterialQuery, unknown>
    | UseQueryResult<GetMaterialGloballyQuery, unknown>,
  type: WorkType
): DataResponse | null => {
  if (!response.isLoading && response.data?.work) {
    return { ...response, workType: type };
  }

  return null;
};

function parseMarcField(workData: any, extraMarc?: string) {
  [{
    rawMarc: workData?.marc?.content,
    target: "parsedMarc"
  }, {
    rawMarc: extraMarc,
    target: "parsedExtraMarc"
  }].forEach((datum: any) => {
    if (datum.rawMarc) {
      try {
        let marcNode = document.createElement("div");
        marcNode.innerHTML = datum.rawMarc;

        let parsedMarc: any = {};
        [].forEach.call(marcNode.querySelectorAll("[tag]"), (tagNode: HTMLElement) => {
          let tag = tagNode.getAttribute("tag") || "";
          parsedMarc[tag] = parsedMarc[tag] || {};

          [].forEach.call(tagNode.querySelectorAll("[code]"), (codeNode: HTMLElement) => {
            let code = codeNode.getAttribute("code") || "";
            parsedMarc[tag][code] = parsedMarc[tag][code] || [];
            parsedMarc[tag][code].push(codeNode.innerText);
          });
        });

        workData[datum.target] = parsedMarc;
      } catch (error) {
        console.warn("Invalid marc field XML", workData);
      }
    }
  });
}

export const useGetWork = (
  wid: WorkId,
  withExtraMarc: boolean
):
  | ((
      | UseQueryResult<GetMaterialQuery, unknown>
      | UseQueryResult<GetMaterialGloballyQuery, unknown>
    ) & { workType: WorkType })
  | { data: null; isLoading: true; error: null; workType: WorkType } => {
  const localWork = useGetMaterialQuery({
    wid
  });
  const globalWork = useGetMaterialGloballyQuery(
    {
      wid
    },
    { enabled: localWork.isSuccess && !localWork.data.work }
  );

  const marcId = useMemo(() => {
    let systemAgency: string = "";
    try {
      // @ts-ignore-next-line
      systemAgency = JSON.parse(document.querySelector("[data-agency-config]").getAttribute("data-agency-config"))?.id || "";
    } catch (error) {
      console.warn("Cannot parse agency config!", error);
    }

    let [_, materialAgency, faustNumber]: string[] = wid.split(":");
    materialAgency = materialAgency.split("-")[0];

    if (!systemAgency)
      systemAgency = materialAgency

    return [systemAgency, faustNumber].join(":");
  }, [wid]);

  const marcData = useGetMaterialMarc({ recordId: marcId }, { enabled: withExtraMarc });
  // @ts-ignore-next-line
  const extraMarc = marcData?.data?.marc?.getMarcByRecordId?.content;

  const localWorkData = getData(localWork, "local");
  if (localWorkData) {
    parseMarcField(localWorkData?.data?.work, extraMarc);
    return localWorkData;
  }

  const globalWorkData = getData(globalWork, "global");
  if (globalWorkData) {
    parseMarcField(globalWorkData?.data?.work, extraMarc);
    return globalWorkData;
  }

  return { data: null, isLoading: true, error: null, workType: "unknown" };
};

export default {};
