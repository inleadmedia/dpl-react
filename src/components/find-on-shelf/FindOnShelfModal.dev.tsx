import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import materialDev from "../../apps/material/material.dev";
import { convertPostIdToFaustId } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import MaterialButtonsFindOnShelf from "../material/material-buttons/physical/MaterialButtonsFindOnShelf";
import FindOnShelfModal, { FindOnShelfModalProps } from "./FindOnShelfModal";
import { mockedManifestationData } from "./mocked-data";

export default {
  title: "Components / Find On Shelf Modal",
  component: FindOnShelfModal,
  argTypes: {
    // Spread material app argTypes so that we get access to system strings.
    // -> t() function strings in this story.
    ...materialDev.argTypes,
    manifestations: {
      name: "Manifestations",
      defaultValue: mockedManifestationData,
      control: { type: "object" }
    },
    workTitles: {
      name: "Work title(s)",
      defaultValue: ["Title 1", "Title 2"],
      control: { type: "object" }
    },
    authors: {
      name: "Author(s)",
      defaultValue: [
        { __typename: "Person", display: "author 1" },
        { __typename: "Person", display: "author 2" },
        { __typename: "Corporation", display: "author 3" }
      ],
      control: { type: "object" }
    }
  }
} as ComponentMeta<typeof FindOnShelfModal>;

export const Default: ComponentStory<typeof FindOnShelfModal> = (
  args: FindOnShelfModalProps
) => {
  const {
    manifestations: [{ pid }]
  } = args;
  const FindOnShelfModalWithText = withText(FindOnShelfModal);

  return (
    <>
      <MaterialButtonsFindOnShelf
        size="small"
        faustIds={[convertPostIdToFaustId(pid)]}
      />
      <FindOnShelfModalWithText {...args} />
    </>
  );
};