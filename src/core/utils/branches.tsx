import { useConfig } from "./config";
import { getUrlQueryParam } from "./helpers/url";

type TBranch = {
  branchId: string;
  title: string;
  address: {
    lat: string;
    long: string;
    value: string;
  };
};

export const excludeBlacklistedBranches = (
  branches: TBranch[],
  blacklist: string[]
): TBranch[] => {
  return branches.filter((item) => !blacklist.includes(item.branchId));
};

export const cleanBranchesId = (branches: TBranch[]): string[] => {
  return (
    branches
      .map((branch) => {
        // Filtering on branchId, only uses agency number for example "775100" and not ISIL "DK-775100"
        // So we need to filter on the digits after the -
        const pattern = /-(\d*)/g;
        const matches = pattern.exec(branch.branchId);
        return matches ? matches[1] : "";
      })
      // Remove empty strings
      .filter((item) => item)
  );
};

export const useGetBranches = (key: string): TBranch[] => {
  const selectedBranchId = getUrlQueryParam("branchId");
  const config = useConfig();
  let branches = config<TBranch[]>("branchesConfig", {
    transformer: "jsonParse"
  })

  if (selectedBranchId) {
    branches = branches.filter(branch => {
      return branch.branchId === selectedBranchId
    });
  }

  const blacklistBranches = config(key, {
    transformer: "stringToArray"
  });
  const whitelistBranches = excludeBlacklistedBranches(
    branches,
    blacklistBranches
  );
  return whitelistBranches;
};

const useGetCleanBranches = () => {
  const branches = useGetBranches("blacklistedSearchBranchesConfig");
  const cleanBranches = cleanBranchesId(branches);
  return cleanBranches;
};

export default useGetCleanBranches;
