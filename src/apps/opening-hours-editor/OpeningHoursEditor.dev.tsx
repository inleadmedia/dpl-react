import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import serviceUrlArgs from "../../core/storybook/serviceUrlArgs";
import OpeningHoursEditor from "./OpeningHoursEditor.entry";

export default {
  title: "Apps / OpeningHoursEditor",
  component: OpeningHoursEditor,
  argTypes: {
    ...serviceUrlArgs,
    openingHoursRemoveEventButtonText: {
      name: "Opening hours remove event button",
      defaultValue: "Remove event",
      control: { type: "text" }
    },
    openingHoursInvalidEventText: {
      name: "Opening hours invalid event text",
      defaultValue: "Invalid event. No start or end time",
      control: { type: "text" }
    },
    openingHoursEditorCategoriesConfig: {
      name: "Opening hours categories",
      defaultValue:
        '[{"title":"\\u00c5bent","color":"#B3DC6C"},{"title":"Telefontid","color":"#FBE983"}]',
      control: { type: "text" }
    },
    openingHoursBranchIdConfig: {
      name: "Opening hours branch id",
      defaultValue: "12",
      control: { type: "text" }
    },
    initialDate: {
      name: "Initial date to show",
      // This date is aligned with the wiremock data
      defaultValue: new Date("2024-03-25"),
      control: { type: "date" }
    },
    openingHoursEventFormTitleText: {
      name: "Opening hours event form title",
      defaultValue: "Title",
      control: { type: "text" }
    },
    openingHoursEventFormStartTimeText: {
      name: "Opening hours event form start time",
      defaultValue: "Start time",
      control: { type: "text" }
    },
    openingHoursEventFormEndTimeText: {
      name: "Opening hours event form end time",
      defaultValue: "End time",
      control: { type: "text" }
    },
    openingHoursEventFormSubmitText: {
      name: "Opening hours event form submit",
      defaultValue: "Submit",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof OpeningHoursEditor>;

export const App: ComponentStory<typeof OpeningHoursEditor> = (args) => (
  <OpeningHoursEditor {...args} />
);
