import * as React from "react";
import searchIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/basic/icon-search.svg";
import expandIcon from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { UseComboboxPropGetters } from "downshift";
import clsx from "clsx";
import { useText } from "../../core/utils/text";
import { redirectTo } from "../../core/utils/helpers/url";

export interface SearchBarProps {
  q: string;
  getInputProps: UseComboboxPropGetters<unknown>["getInputProps"];
  getLabelProps: UseComboboxPropGetters<unknown>["getLabelProps"];
  dataCy?: string;
  qWithoutQuery: string;
  setQWithoutQuery: (value: string) => void;
  isHeaderDropdownOpen: boolean;
  setIsHeaderDropdownOpen: (
    value: boolean | ((prevState: boolean) => boolean)
  ) => void;
  redirectUrl: URL;
  altText?: string;
  inputPlaceholderText?: string;
  searchHeaderIconAltText?: string;
  searchNoValidCharactersErrorText?: string;
  searchHeaderDropdownText?: string;
  searchHeaderInputLabelText?: string;
  onBlur?: () => void;
  initialBranchId?: string;
  onBranchChange?: (branchId: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  q,
  getInputProps,
  getLabelProps,
  dataCy = "search-header-input",
  qWithoutQuery,
  setQWithoutQuery,
  isHeaderDropdownOpen,
  setIsHeaderDropdownOpen,
  redirectUrl,
  onBlur,
  initialBranchId,
  onBranchChange
}) => {
  const t = useText();
  const handleDropdownMenu = () => {
    setIsHeaderDropdownOpen((prev) => !prev);
  };

  const branches = React.useMemo(() => {
    let branchSelectorEnabled = (document.querySelector("[data-show-search-branch-selection]")?.getAttribute("data-show-search-branch-selection") || "") === "true";
    if (branchSelectorEnabled === false)
      return [];

    let branchesForSelect = JSON.parse(document.querySelector("[data-branches-config]")?.getAttribute("data-branches-config") || "[]");
    let excludedBranches = (document.querySelector("[data-blacklisted-search-branches-config]")?.getAttribute("data-blacklisted-search-branches-config") || "")
      .split(",")
      .map((branch: string) => branch.trim())
      .filter(Boolean);

    if (excludedBranches.length !== 0) {
      branchesForSelect = branchesForSelect.filter((branch: any) => {
        return excludedBranches.includes(branch.branchId) === false;
      });
    }

    return branchesForSelect;
  }, [document.querySelector("[data-branches-config]")]);

  return (
    <>
      {/* The downshift combobox uses prop spreading by design & associated control is destructured too */}
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, react/jsx-props-no-spreading */}
      <label className="hide-visually" {...getLabelProps()}>
        {t("searchHeaderInputLabelText")}
      </label>
      {/* eslint-disable react/jsx-props-no-spreading */}
      <input
        required
        pattern=".*\S+.*"
        title={t("searchNoValidCharactersErrorText")}
        name="q"
        className="header__menu-search-input text-body-medium-regular"
        data-cy={dataCy}
        type="text"
        placeholder={t("inputPlaceholderText")}
        aria-label={t("inputPlaceholderText")}
        onKeyUp={(e) => {
          // Only redirect if there is no selected item in autosuggest + query is longer than 2 characters
          if (e.key === "Enter" && qWithoutQuery === q && q.length > 2) {
            redirectTo(redirectUrl);
          }
        }}
        {...getInputProps({
          onBlur: onBlur,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            setQWithoutQuery(e.target.value);
          }
        })}
      />
      {/* eslint-enable react/jsx-props-no-spreading */}
      {
        branches.length > 0
          ?
            <select
              className="header__menu-search-branch-select"
              defaultValue={ initialBranchId || "" }
              onChange={ (event) => {
                if (onBranchChange)
                  onBranchChange(event?.target?.value || "");
              }}
            >
              <option value="">{ t("Search in all branches") }</option>
              { branches.map((branch: any) => {
                return <option key={ branch.branchId } value={ branch.branchId }>{ branch.title }</option>
              }) }
            </select>
          : null
      }
      <input
        type="image"
        src={searchIcon}
        alt={t("searchHeaderIconAltText")}
        className="header__menu-search-icon"
        onClick={() => {
          // Only redirect if there is no selected item in autosuggest + query is longer than 2 characters
          if (qWithoutQuery === q && q.length > 2) {
            redirectTo(redirectUrl);
          }
        }}
        onKeyUp={(e) => {
          // Only redirect if there is no selected item in autosuggest + query is longer than 2 characters
          if (e.key === "Enter" && qWithoutQuery === q && q.length > 2) {
            redirectTo(redirectUrl);
          }
        }}
      />
      <input
        type="image"
        src={expandIcon}
        alt={t("searchHeaderDropdownText")}
        className={clsx("header__menu-dropdown-icon", {
          "header__menu-dropdown-icon--expanded": isHeaderDropdownOpen
        })}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          handleDropdownMenu();
        }}
        onKeyUp={(e) => {
          if (e.key === "Enter" || e.key === "ArrowDown") {
            e.preventDefault();
            e.stopPropagation();
            handleDropdownMenu();
          }
        }}
        tabIndex={0}
        aria-label={t("searchHeaderDropdownText")}
        data-cy="search-header-dropdown-icon"
        aria-expanded={isHeaderDropdownOpen}
      />
    </>
  );
};

export default SearchBar;
