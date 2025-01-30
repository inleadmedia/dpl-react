import lodash from "lodash";
import CreateIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Create.svg";
import Receipt from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Receipt.svg";
import VariousIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/Various.svg";
import React, { useEffect, useState, useMemo } from "react";
import { useDeepCompareEffect } from "react-use";
import DisclosureControllable from "../../components/Disclosures/DisclosureControllable";
import DisclosureSummary from "../../components/Disclosures/DisclosureSummary";
import DigitalModal from "../../components/material/digital-modal/DigitalModal";
import InfomediaModal from "../../components/material/infomedia/InfomediaModal";
import { hasCorrectAccess } from "../../components/material/material-buttons/helper";
import MaterialAdditionalDescription from "../../components/material/MaterialAdditionalDescription";
import MaterialDescription from "../../components/material/MaterialDescription";
import MaterialDetailsList from "../../components/material/MaterialDetailsList";
import MaterialHeader from "../../components/material/MaterialHeader";
import MaterialMainfestationItem from "../../components/material/MaterialMainfestationItem";
import { MaterialReviews } from "../../components/material/MaterialReviews";
import MaterialSkeleton from "../../components/material/MaterialSkeleton";
import { PeriodicalEdition } from "../../components/material/periodical/helper";
import { statistics } from "../../core/statistics/statistics";
import { useStatistics } from "../../core/statistics/useStatistics";
import { getWorkPid } from "../../core/utils/helpers/general";
import {
  getUrlQueryParam,
  setQueryParametersInUrl
} from "../../core/utils/helpers/url";
import { usePatronData } from "../../core/utils/helpers/usePatronData";
import { isAnonymous, isBlocked } from "../../core/utils/helpers/user";
import { useText } from "../../core/utils/text";
import { Manifestation, Work } from "../../core/utils/types/entities";
import { WorkId } from "../../core/utils/types/ids";
import { useGetWork } from "../../core/utils/useGetWork";
import {
  divideManifestationsByMaterialType,
  getBestMaterialTypeForWork,
  getDetailsListData,
  getInfomediaIds,
  getManifestationsOrderByTypeAndYear,
  isParallelReservation
} from "./helper";
import {
  ListItemType,
  ListData
} from "../../components/material/MaterialDetailsList";
import MaterialDisclosure from "./MaterialDisclosure";
import ReservationFindOnShelfModals from "./ReservationFindOnShelfModals";

export interface MaterialProps {
  wid: WorkId;
}

function extendedFieldsDataGetter(pointers: string[], materialData: any) {
  let data: any = [];

  (pointers || []).filter(Boolean).forEach((pointer: string) => {
    pointer = pointer.trim();

    let type: string = "graphql";
    if (pointer.includes(":"))
      [type, pointer] = pointer.split(":");

    let fieldData = "";
    if (type === "marc") {
      fieldData = lodash.get(materialData?.parsedMarc, pointer);
    } else if (type === "extraMarc") {
      fieldData = lodash.get(materialData?.parsedExtraMarc, pointer);
    } else if (type === "graphql") {
      fieldData = lodash.get(materialData, pointer);
    } else {
      console.warn(`Unknown getter type: "${ type }, pointer: "${ pointer }"`);
    }

    if (!fieldData)
      return;

    if (Array.isArray(fieldData)) {
      data = data.concat(fieldData);
    } else {
      data.push(fieldData);
    }
  });

  return data.filter((datum: any) => datum && ("" + datum).trim() !== "");
}

function extendedFieldsDataMerge(filedData: any, originalData: any, customData: any, options: any) {
  if (!Array.isArray(originalData))
    originalData = [originalData];

  originalData = originalData.filter(Boolean);

  let mergedData = [];
  switch (filedData.insert) {
    case "prepend":
      mergedData = customData.concat(originalData);
    break;
    case "replace":
      mergedData = customData;
    break;
    case "fallback":
      if (originalData.length === 0) {
        mergedData = customData;
      } else {
        mergedData = originalData;
      }
    break;
    default: // append
      mergedData = originalData.concat(customData);
    break;
  }

  mergedData = mergedData.filter((datum: any) => datum && ("" + datum).trim());

  let outputType = filedData.type || options?.outputType || "text";
  if (outputType === "list") {
    return mergedData;
  }

  return mergedData.join(", ");
}

function hasExtraMarc(pointers: string[]) {
  return (pointers || []).some((pointer: string) => pointer.startsWith("extraMarc:"));
}

const Material: React.FC<MaterialProps> = ({ wid }) => {
  const t = useText();
  const [selectedManifestations, setSelectedManifestations] = useState<
    Manifestation[] | null
  >(null);
  const [selectedPeriodical, setSelectedPeriodical] = useState<PeriodicalEdition | null>(null);
  const { data: userData } = usePatronData();
  const [isUserBlocked, setIsUserBlocked] = useState<boolean | null>(null);
  const { track } = useStatistics();

  const customFields = useMemo(() => {
    // @ts-ignore-next-line
    let extendedFields: any = document.querySelector('[data-eonext-ext-fields]')?.dataset?.eonextExtFields;
    if (!extendedFields)
      return;

    try {
      extendedFields = JSON.parse(extendedFields);
      extendedFields.aliases = extendedFields.aliases || {};
      extendedFields._withExtraMarc = false;

      Object.keys(extendedFields).forEach(sectionName => {
        if (["description", "detail"].includes(sectionName)) {
          Object.keys(extendedFields[sectionName]).forEach(fieldLabel => {
            extendedFields[sectionName][fieldLabel].label = fieldLabel;
            extendedFields[sectionName][fieldLabel].merge = extendedFieldsDataMerge.bind(null, extendedFields[sectionName][fieldLabel]);
            extendedFields[sectionName][fieldLabel].getter = extendedFieldsDataGetter.bind(null, extendedFields[sectionName][fieldLabel]?.data);
            if (hasExtraMarc(extendedFields[sectionName][fieldLabel]?.data)) {
              extendedFields._withExtraMarc = true;
            }

            extendedFields[sectionName][fieldLabel].findLabelIndex = (targetList: string[]) => {
              return targetList.findIndex((targetLabel: string) => {
                // Matched original
                if (targetLabel === fieldLabel)
                  return true;

                // Matched alias
                return (extendedFields.aliases[fieldLabel] || []).some((alias: string) => {
                  return targetLabel === alias;
                });
              });
            };

            extendedFields[sectionName][fieldLabel].findLabel = (targetList: string[]) => {
              const index = extendedFields[sectionName][fieldLabel].findLabelIndex(targetList);
              if (index === -1)
                return null;

              return targetList[index];
            };
          });
        } else if (sectionName === "additionalDescription") {
          extendedFields[sectionName].merge = extendedFieldsDataMerge.bind(null, extendedFields[sectionName]);
          extendedFields[sectionName].getter = extendedFieldsDataGetter.bind(null, extendedFields[sectionName]?.body);
          if (hasExtraMarc(extendedFields[sectionName]?.body)) {
            extendedFields._withExtraMarc = true;
          }

          (extendedFields[sectionName].tags || []).forEach((tag: any) => {
            tag.merge = extendedFieldsDataMerge.bind(null, tag);
            tag.getter = extendedFieldsDataGetter.bind(null, tag?.data);
            if (hasExtraMarc(tag?.data)) {
              extendedFields._withExtraMarc = true;
            }
          });
        }
      });

      return extendedFields;
    } catch (error) {
      console.warn("Cannot parse data-eonext-ext-fields attribute! Data: ", extendedFields, error);
    }

    return {};
  }, [wid]);

  const { data, isLoading, workType } = useGetWork(wid, customFields?._withExtraMarc);

  useEffect(() => {
    setIsUserBlocked(!!(userData?.patron && isBlocked(userData.patron)));
  }, [userData]);

  useDeepCompareEffect(() => {
    if (data?.work?.genreAndForm) {
      track("click", {
        id: statistics.materialGenre.id,
        name: statistics.materialGenre.name,
        trackedData: data.work.genreAndForm.join(", ")
      });
    }
    if (data?.work?.mainLanguages) {
      track("click", {
        id: statistics.materialLanguage.id,
        name: statistics.materialLanguage.name,
        trackedData: data.work.mainLanguages
          .map((language) => language.display)
          .join(", ")
      });
    }
    if (data?.work?.dk5MainEntry) {
      track("click", {
        id: statistics.materialTopicNumber.id,
        name: statistics.materialTopicNumber.name,
        trackedData: data.work.dk5MainEntry.display
      });
    }
    // We can afford to only check the latest manifestation because audience doesn't
    // vary between a specific work's manifestations (information provided by DDF).
    if (data?.work?.manifestations.latest.audience?.generalAudience) {
      track("click", {
        id: statistics.materialTopicNumber.id,
        name: statistics.materialTopicNumber.name,
        trackedData:
          data.work.manifestations.latest.audience.generalAudience.join(", ")
      });
    }
    if (data?.work?.fictionNonfiction) {
      track("click", {
        id: statistics.materialFictionNonFiction.id,
        name: statistics.materialFictionNonFiction.name,
        trackedData: data.work.fictionNonfiction.display
      });
    }
    // In this case we only want to track once - on work data load
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (!data?.work) return;
    const { work } = data as { work: Work };

    const urlType = getUrlQueryParam("type");
    const manifestationsByMaterialType = divideManifestationsByMaterialType(
      work.manifestations.all
    );

    const urlTypeIsPresentInManifestations =
      urlType && manifestationsByMaterialType[urlType]?.length > 0;

    if (urlTypeIsPresentInManifestations) {
      // Use the type from the URL if it's present in the manifestations
      setSelectedManifestations(manifestationsByMaterialType[urlType]);
    } else {
      // Otherwise, fallback to the best material type for the work
      const bestMaterialType = getBestMaterialTypeForWork(work);
      setSelectedManifestations(manifestationsByMaterialType[bestMaterialType]);
      setQueryParametersInUrl({ type: bestMaterialType });
    }
  }, [data]);

  if (isLoading || !data?.work || !selectedManifestations) {
    return <MaterialSkeleton />;
  }

  const {
    work,
    work: {
      manifestations: { all: manifestations },
      relations: { hasReview }
    }
  } = data as { work: Work };

  const pid = getWorkPid(work);
  let detailsListData = getDetailsListData({
    manifestation: selectedManifestations[0],
    work,
    t
  });

  const originalListElementLabels = detailsListData.map((originalListElement: any) => originalListElement?.label);
  Object.values(customFields?.detail || {}).forEach((customField: any) => {
    let dataIndex = customField.findLabelIndex(originalListElementLabels);
    let customFieldValue = customField.getter(work);

    if (dataIndex === -1) {
      dataIndex = detailsListData.push({
        label: customField.label,
        value: customFieldValue
      }) - 1;
    } else {
      detailsListData[dataIndex].value = customField.merge(detailsListData[dataIndex].value, customFieldValue);
    }

    if (customField.type === "list")
      detailsListData[dataIndex].type = ListItemType.List;

    if (detailsListData[dataIndex].value.length === 0 || customField.hidden === true)
      detailsListData.splice(dataIndex, 1);
  });

  const infomediaIds = getInfomediaIds(selectedManifestations);

  // Get disclosure URL parameter from the current URL to see if it should be open.
  const shouldOpenReviewDisclosure = !!getUrlQueryParam("disclosure");

  return (
    <section className="material-page">
      <MaterialHeader
        wid={wid}
        work={work}
        selectedManifestations={selectedManifestations}
        setSelectedManifestations={setSelectedManifestations}
        selectedPeriodical={selectedPeriodical}
        selectPeriodicalHandler={setSelectedPeriodical}
        isGlobalMaterial={workType === "global"}
      >
        {manifestations.map((manifestation) => (
          <ReservationFindOnShelfModals
            patron={userData?.patron}
            manifestations={[manifestation]}
            selectedPeriodical={selectedPeriodical}
            work={work}
            setSelectedPeriodical={setSelectedPeriodical}
          />
        ))}

        {infomediaIds.length > 0 && !isAnonymous() && !isUserBlocked && (
          <InfomediaModal
            selectedManifestations={selectedManifestations}
            infoMediaId={infomediaIds[0]}
          />
        )}
        {hasCorrectAccess("DigitalArticleService", selectedManifestations) &&
          !isAnonymous() &&
          !isUserBlocked && (
            <DigitalModal pid={selectedManifestations[0].pid} workId={wid} />
          )}
        {/* Only create a main version of "reservation" & "find on shelf" modal for physical materials with multiple editions.
        Online materials lead to external links, or to same modals as are created for singular editions. */}
        {isParallelReservation(selectedManifestations) && (
          <ReservationFindOnShelfModals
            patron={userData?.patron}
            manifestations={selectedManifestations}
            selectedPeriodical={selectedPeriodical}
            work={work}
            setSelectedPeriodical={setSelectedPeriodical}
          />
        )}
      </MaterialHeader>

      <div className="material-description-group">
        <MaterialAdditionalDescription work={work} fieldsOptions={ customFields.additionalDescription } />
        <MaterialDescription pid={pid} work={work} customFields={ customFields?.description } />
      </div>
      {/* Since we cannot trust the editions for global manifestations */}
      {/* we limit them to only occur if the loaded work is global */}
      {workType === "local" && (
        <MaterialDisclosure
          title={`${t("editionsText")} (${manifestations.length})`}
          icon={VariousIcon}
          dataCy="material-editions-disclosure"
        >
          <>
            {getManifestationsOrderByTypeAndYear(manifestations).map(
              (manifestation: Manifestation) => {
                return (
                  <MaterialMainfestationItem
                    key={manifestation.pid}
                    manifestation={manifestation}
                    workId={wid}
                  />
                );
              }
            )}
          </>
        </MaterialDisclosure>
      )}
      <MaterialDisclosure
        dataCy="material-details-disclosure"
        title={t("detailsText")}
        icon={Receipt}
      >
        <MaterialDetailsList
          id={`material-details-${wid}`}
          className="pl-80 pb-48"
          data={detailsListData}
        />
      </MaterialDisclosure>
      {hasReview && hasReview.length > 0 && (
        <DisclosureControllable
          detailsClassName="disclosure text-body-large"
          id="reviews"
          showContent={shouldOpenReviewDisclosure}
          cyData="material-reviews-disclosure"
          summary={
            <DisclosureSummary
              title={t("reviewsText")}
              mainIconPath={CreateIcon}
            />
          }
        >
          <MaterialReviews pids={hasReview.map((review) => review.pid)} />
        </DisclosureControllable>
      )}
    </section>
  );
};

export default Material;
