import React from "react";
import IconExpand from "@danskernesdigitalebibliotek/dpl-design-system/build/icons/collection/ExpandMore.svg";
import { useMultipleSelection, useSelect } from "downshift";
import clsx from "clsx";
import CheckBox from "../checkbox/Checkbox";
import { MultiselectOption } from "../../core/utils/types/multiselect-types";
import useMultiselectOptions from "./useMultiselectOptions";

export type MultiselectProps = {
  caption?: string;
  options: MultiselectOption[];
};

const Multiselect: React.FC<MultiselectProps> = ({ caption, options }) => {
  const { allOptions } = useMultiselectOptions(options, {
    item: "All",
    value: "all"
  });

  const { getDropdownProps, setSelectedItems, selectedItems } =
    useMultipleSelection({ initialSelectedItems: [allOptions[0]] });

  const addNewSelectedItem = (
    allCurrentlySelected: MultiselectOption[],
    newSelected: MultiselectOption,
    allPossibleOptions: number
  ) => {
    // If new selection is not "all" we make sure "all" is deselected
    if (
      allCurrentlySelected.find((item) => item.value === "all") &&
      newSelected.value !== "all"
    ) {
      return [
        ...selectedItems.filter((item) => item.value !== "all"),
        newSelected
      ];
    }

    // If every non-"all" item is selected, then we just select "all"
    if (
      newSelected.value !== "all" &&
      [...allCurrentlySelected, newSelected].length === allPossibleOptions - 1
    ) {
      return [{ item: "All", value: "all" }];
    }

    // If new selection is "all" we make sure to deselect all other options
    if (newSelected.value === "all") {
      return [newSelected];
    }

    return [...allCurrentlySelected, newSelected];
  };

  const {
    isOpen,
    getToggleButtonProps,
    getMenuProps,
    highlightedIndex,
    getItemProps
  } = useSelect({
    selectedItem: null,
    items: allOptions,
    stateReducer: (state, actionAndChanges) => {
      const { changes, type } = actionAndChanges;
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          return {
            ...changes,
            isOpen: true // keep the menu open after selection.
          };
        default:
          break;
      }
      return changes;
    },
    onStateChange: ({ type, selectedItem: newSelectedItem }) => {
      switch (type) {
        case useSelect.stateChangeTypes.ToggleButtonKeyDownEnter:
        case useSelect.stateChangeTypes.ToggleButtonKeyDownSpaceButton:
        case useSelect.stateChangeTypes.ItemClick:
          // If new selection isn't already selected, we add it
          if (
            newSelectedItem &&
            !selectedItems.find((item) => item.value === newSelectedItem.value)
          ) {
            setSelectedItems(
              addNewSelectedItem(
                selectedItems,
                newSelectedItem,
                allOptions.length
              )
            );
            return;
          }
          // It new selection is already selected, we deselect it
          if (
            newSelectedItem &&
            selectedItems.find((item) => item.value === newSelectedItem.value)
          ) {
            // Unless it's the only selected item
            if (selectedItems.length === 1) {
              return;
            }
            const newSelectedItems = selectedItems.filter((item) => {
              return item.value !== newSelectedItem.value;
            });
            setSelectedItems(newSelectedItems);
          }
          break;
        default:
          break;
      }
    }
  });

  return (
    <>
      {caption && <div className="multiselect__caption">{caption}</div>}
      <div className="multiselect">
        {/* eslint-disable react/jsx-props-no-spreading */}
        {/* The downshift combobox works this way by design */}
        <button
          type="button"
          className="multiselect focus-styling"
          {...getToggleButtonProps(
            getDropdownProps({ preventKeyAction: isOpen })
          )}
        >
          <div className="multiselect__selected">
            {selectedItems.map((singularitem, index) => {
              const getSpace = index > 0 ? ", " : "";
              return getSpace + singularitem.item;
            })}
          </div>

          <div className="multiselect__opener">
            <img
              className={clsx("multiselect__icon", {
                "dropdown__arrow--bottom": isOpen
              })}
              src={IconExpand}
              alt=""
            />
          </div>
        </button>

        {isOpen && (
          <ul className="multiselect__options" {...getMenuProps()}>
            {allOptions.map((item, index) => {
              return (
                <li
                  className={clsx("multiselect__option", {
                    "multiselect__option--highlighted":
                      highlightedIndex === index
                  })}
                  key={`${item.value}${item.item}`}
                  {...getItemProps({ item, index })}
                >
                  {/* eslint-enable react/jsx-props-no-spreading */}
                  {item.item}
                  <div className="checkbox multiselect__checkbox">
                    <CheckBox
                      id={index.toString()}
                      selected={
                        !!selectedItems.find(
                          (selected) => selected.value === item.value
                        )
                      }
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default Multiselect;
