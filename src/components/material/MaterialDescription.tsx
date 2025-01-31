import React from "react";
import {
  getUniqueMovies,
  getDbcVerifiedSubjectsFirst
} from "../../apps/material/helper";
import { useItemHasBeenVisible } from "../../core/utils/helpers/lazy-load";
import {
  constructMaterialUrl,
  constructSearchUrl
} from "../../core/utils/helpers/url";
import { useText } from "../../core/utils/text";
import { Work } from "../../core/utils/types/entities";
import { Pid, WorkId } from "../../core/utils/types/ids";
import { useUrls } from "../../core/utils/url";
import HorizontalTermLine from "../horizontal-term-line/HorizontalTermLine";
import { materialIsFiction } from "../../core/utils/helpers/general";
import SeriesList from "../card-item-list/card-list-item/series-list";

export interface MaterialDescriptionProps {
  pid: Pid;
  work: Work;
  customFields: any;
}

const MaterialDescription: React.FC<MaterialDescriptionProps> = ({ work, customFields }) => {
  const { itemRef, hasBeenVisible: showItem } = useItemHasBeenVisible();
  const t = useText();
  const u = useUrls();
  const searchUrl = u("searchUrl");
  const materialUrl = u("materialUrl");
  const { fictionNonfiction, series, subjects, relations, dk5MainEntry } = work;
  let descriptionTermFields = React.useMemo(() => {
    return Object.values(customFields || {}).map((fieldData: any) => {
      let values = fieldData.getter(work);

      return {
        ...fieldData,
        tags: values.filter(Boolean).map((tag: string) => {
          return {
            term: tag,
            url: new URL((fieldData.url || "#").replace(/\$\{\s*tag\s*\}/ig, tag), window.location.href)
          }
        })
      }
    });
  }, [customFields, work]);

  const seriesMembersList =
    (series &&
      series[0]?.members.map((member) => {
        // TODO: Since the series has changed it structure and can have multiple members
        // we need to double check if we can only look at the first member entry.
        return {
          url: constructMaterialUrl(materialUrl, member.work.workId as WorkId),
          term: member.work.titles.main[0]
        };
      })) ??
    [];

  const subjectsList = getDbcVerifiedSubjectsFirst(subjects).map((item) => ({
    url: constructSearchUrl(searchUrl, item),
    term: item
  }));

  const filmAdaptationsList = getUniqueMovies(relations).map((item) => {
    return {
      url: constructMaterialUrl(materialUrl, item.ownerWork.workId as WorkId),
      term: item.ownerWork.titles.main[0]
    };
  });

  const fictionNonfictionList = fictionNonfiction
    ? [
        {
          url: constructSearchUrl(searchUrl, fictionNonfiction.display),
          term: fictionNonfiction.display
        }
      ]
    : [];

  let knownFileds: any = {
    [t("subjectNumberText")]: !materialIsFiction(work) && dk5MainEntry ? {
      label: t("subjectNumberText"),
      tags: [{
        url: constructSearchUrl(searchUrl, dk5MainEntry.display),
        term: dk5MainEntry.display
      }]
    } : null,
    [t("inSameSeriesText")]: {
      label: t("inSameSeriesText"),
      tags: seriesMembersList,
      cy: "material-description-series-members"
    },
    [t("identifierText")]: {
      label: t("identifierText"),
      tags: subjectsList,
      cy: "material-description-identifier"
    },
    [t("fictionNonfictionText")]: {
      label: t("fictionNonfictionText"),
      tags: fictionNonfictionList,
      cy: "material-description-fiction-nonfiction"
    },
    [t("filmAdaptationsText")]: {
      label: t("filmAdaptationsText"),
      tags: filmAdaptationsList,
      cy: "material-description-film-adaptations"
    }
  };

  descriptionTermFields = descriptionTermFields.filter((fieldData: any) => {
    let matchedLabel = fieldData.findLabel(Object.keys(knownFileds));

    if (fieldData.hidden === true) {
      fieldData.tags = [];

      if (matchedLabel && knownFileds[matchedLabel] != null)
        knownFileds[fieldData.label].tags = [];
    }

    if (matchedLabel && knownFileds[matchedLabel] != null) {
      knownFileds[matchedLabel].tags = fieldData.merge(knownFileds[matchedLabel].tags || [], fieldData.tags || [], { outputType: "list" });

      return false;
    }

    return true;
  });

  descriptionTermFields = Object.values(knownFileds).concat(descriptionTermFields).filter(Boolean);

  return (
    <section
      ref={itemRef}
      className="material-description"
      data-cy="material-description"
    >
      {showItem && (
        <>
          <h2 className="text-header-h4 pb-24">
            {t("descriptionHeadlineText")}
          </h2>
          {work.abstract && (
            <p className="text-body-large material-description__content">
              {work.abstract[0]}
            </p>
          )}
          <div className="material-description__links mt-32">
            <SeriesList
              series={series}
              searchUrl={searchUrl}
              t={t}
              workId={work.workId}
              dataCy="material-description-series"
            />

            {
              descriptionTermFields.map((customField: any) => {
                return <HorizontalTermLine
                  key={ customField.label }
                  title={ customField.label }
                  linkList={ customField.tags }
                  dataCy={ customField.cy || "material-description-custom" }
                />
              })
            }
          </div>
        </>
      )}
    </section>
  );
};

export default MaterialDescription;
