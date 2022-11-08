import React, { useEffect, useState } from "react";
import SearchResultHeader from "../../components/search-bar/search-result-header/SearchResultHeader";
import usePager from "../../components/result-pager/use-pager";
import SearchResultList from "../../components/search-result-list/SearchResultList";
import {
  SearchWithPaginationQuery,
  useSearchWithPaginationQuery
} from "../../core/dbc-gateway/generated/graphql";
import { Work } from "../../core/utils/types/entities";
import { formatFacetTerms } from "./helpers";
import useFilterHandler from "./useFilterHandler";
import { FilterItemTerm, TermOnClickHandler } from "./types";
import { useConfig } from "../../core/utils/config";
import { AgencyBranch } from "../../core/fbs/model";
import {
  excludeBlacklistedBranches,
  cleanBranchesId
} from "../../components/reservation/helper";
import { useStatistics } from "../../core/statistics/useStatistics";
import { useCampaignMatchPOST } from "../../core/dpl-cms/dpl-cms";
import {
  CampaignMatchPOST200,
  CampaignMatchPOSTBodyItem
} from "../../core/dpl-cms/model";
import Campaign from "../../components/campaign/Campaign";
import { useGetFacets } from "../../components/facet-browser/helper";
import FacetBrowserModal from "../../components/facet-browser/FacetBrowserModal";

interface SearchResultProps {
  q: string;
  pageSize: number;
}

const SearchResult: React.FC<SearchResultProps> = ({ q, pageSize }) => {
  const config = useConfig();
  const branches = config<AgencyBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  });
  const blacklistBranches = config("blacklistedSearchBranchesConfig", {
    transformer: "stringToArray"
  });
  const whitelistBranches = excludeBlacklistedBranches(
    branches,
    blacklistBranches
  );
  const cleanBranches = cleanBranchesId(whitelistBranches);
  const [resultItems, setResultItems] = useState<Work[]>([]);
  const [hitcount, setHitCount] = useState<number>(0);
  const { PagerComponent, page, resetPager } = usePager(hitcount, pageSize);
  const { filters, filterHandler } = useFilterHandler();
  const { mutate } = useCampaignMatchPOST();
  const [isFirstLoad, setIsFirstLoad] = useState<boolean>(true);
  const [campaignData, setCampaignData] = useState<CampaignMatchPOST200 | null>(
    null
  );
  const filteringHandler: TermOnClickHandler = (filterInfo) => {
    filterHandler(filterInfo);
    resetPager();
  };
  const { facets: campaignFacets } = useGetFacets(q, filters);

  // If q changes (eg. in Storybook context)
  // then make sure that we reset the entire result set.
  useEffect(() => {
    setResultItems([]);
  }, [q, pageSize, filters]);

  const { track } = useStatistics("page");
  useEffect(() => {
    track(10, "On site search string", q);
    // We actaully just want to track if the query changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  useEffect(() => {
    if (campaignFacets) {
      mutate(
        {
          data: campaignFacets as CampaignMatchPOSTBodyItem[]
        },
        {
          onSuccess: (campaign) => {
            setCampaignData(campaign);
          },
          onError: () => {
            // TODO: when we handle errors - handle this error
          }
        }
      );
    }
  }, [mutate, campaignFacets]);

  const createFilters = (
    facets: {
      [key: string]: { [key: string]: FilterItemTerm };
    },
    branchIdList: string[]
  ) => {
    return {
      ...formatFacetTerms(facets),
      ...(cleanBranches ? { branchId: branchIdList } : {})
    };
  };

  const { data } = useSearchWithPaginationQuery({
    q: { all: q },
    offset: page * pageSize,
    limit: pageSize,
    filters: createFilters(filters, cleanBranches)
  });

  useEffect(() => {
    if (!data) {
      return;
    }

    const {
      search: { works: resultWorks, hitcount: resultCount }
    } = data as {
      search: {
        works: Work[];
        hitcount: SearchWithPaginationQuery["search"]["hitcount"];
      };
    };

    setHitCount(resultCount);
    setResultItems((prev) => [...prev, ...resultWorks]);
  }, [data]);

  const worksAreLoaded = Boolean(resultItems.length);

  useEffect(() => {
    if (isFirstLoad) {
      setIsFirstLoad(false);
      return;
    }
    track(11, "OSS Results", hitcount);
    // We actaully just want to track if the hitcount changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hitcount]);

  return (
    <div className="search-result-page">
      {worksAreLoaded && (
        <>
          <SearchResultHeader hitcount={String(hitcount)} q={q} />
          {campaignData && campaignData.data && (
            <Campaign campaignData={campaignData.data} />
          )}
          <SearchResultList resultItems={resultItems} />
          {PagerComponent}
        </>
      )}
      <FacetBrowserModal
        q={q}
        filters={filters}
        filterHandler={filteringHandler}
      />
    </div>
  );
};

export default SearchResult;
