import { UseQueryResult } from "react-query";
import {
  GetMaterialGloballyQuery,
  GetMaterialQuery,
  useGetMaterialGloballyQuery,
  useGetMaterialQuery
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

function parseMarcField(workData: any) {
  if (workData?.marc?.content) {
    try {
      let marcNode = document.createElement("div");
      marcNode.innerHTML = workData?.marc?.content;

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

      workData.parsedMarc = parsedMarc;
    } catch (error) {
      console.warn("Invalid marc field XML", workData);
    }
  }
}

export const useGetWork = (
  wid: WorkId
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

  const localWorkData = getData(localWork, "local");
  if (localWorkData) {
    parseMarcField(localWorkData?.data?.work);
    return localWorkData;
  }

  const globalWorkData = getData(globalWork, "global");
  if (globalWorkData) {
    parseMarcField(globalWorkData?.data?.work);
    return globalWorkData;
  }

  return { data: null, isLoading: true, error: null, workType: "unknown" };
};

export default {};
