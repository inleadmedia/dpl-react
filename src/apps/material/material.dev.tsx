import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import MaterialEntry, { MaterialEntryProps } from "./material.entry";

export default {
  title: "Apps / Material",
  component: MaterialEntry,
  argTypes: {
    searchUrl: {
      name: "Path to the search result page",
      defaultValue: "/search",
      control: { type: "text" }
    },
    materialUrl: {
      name: "Path to the material page",
      defaultValue: "/work/:workid",
      control: { type: "text" }
    },
    wid: {
      name: "Work ID",
      defaultValue: "work-of:870970-basis:52557240",
      control: { type: "text" }
    },
    smsNotificationsForReservationsEnabledConfig: {
      name: "SMS notifications for reservations is enabled",
      defaultValue: "1",
      control: { type: "text" }
    },
    materialHeaderAllEditionsText: {
      name: "Text for the fiction edition text",
      defaultValue: "All editions",
      control: { type: "text" }
    },
    materialHeaderAuthorByText: {
      name: "By (author)",
      defaultValue: "By",
      control: { type: "text" }
    },
    periodicalSelectYearText: {
      name: "Year",
      defaultValue: "Year",
      control: { type: "text" }
    },
    periodicalSelectEditionText: {
      name: "Edition/Week",
      defaultValue: "Edition",
      control: { type: "text" }
    },
    reserveBookText: {
      name: "Reserve",
      defaultValue: "Reserve book",
      control: { type: "text" }
    },
    reserveText: {
      name: "Reserve",
      defaultValue: "Reserve",
      control: { type: "text" }
    },
    findOnBookshelfText: {
      name: "Find on bookshelf",
      defaultValue: "Find on shelf",
      control: { type: "text" }
    },
    descriptionHeadlineText: {
      name: "Description headline",
      defaultValue: "Description",
      control: { type: "text" }
    },
    identifierText: {
      name: "Identifier/topic text",
      defaultValue: "Tags",
      control: { type: "text" }
    },
    inSameSeriesText: {
      name: "In same series as",
      defaultValue: "In the same series",
      control: { type: "text" }
    },
    numberDescriptionText: {
      name: "Number",
      defaultValue: "Nr.",
      control: { type: "text" }
    },
    inSeriesText: {
      name: "In series",
      defaultValue: "in series",
      control: { type: "text" }
    },
    loginToSeeReviewText: {
      name: "Login to see Review",
      defaultValue: "Login to see the review.",
      control: { type: "text" }
    },
    cantViewReviewText: {
      name: "Cannot view Review",
      defaultValue: "Cannot view the review.",
      control: { type: "text" }
    },
    ratingIsText: {
      name: "Rating is",
      defaultValue: "Rating of this item is",
      control: { type: "text" }
    },
    outOfText: {
      name: "X 'out of' Y",
      defaultValue: "out of",
      control: { type: "text" }
    },
    heartsIconText: {
      name: "Hearts icon text",
      defaultValue: "hearts",
      control: { type: "text" }
    },
    detailsOfTheMaterialText: {
      name: "Details of the material",
      defaultValue: "Details about the material",
      control: { type: "text" }
    },
    editionsText: {
      name: "Editions",
      defaultValue: "Editions",
      control: { type: "text" }
    },
    fictionNonfictionText: {
      name: "Fiction Nonfiction",
      defaultValue: "Fictional",
      control: { type: "text" }
    },
    detailsText: {
      name: "Details",
      defaultValue: "Details",
      control: { type: "text" }
    },
    reviewsText: {
      name: "Reviews",
      defaultValue: "Reviews",
      control: { type: "text" }
    },
    typeText: {
      name: "Type",
      defaultValue: "Type",
      control: { type: "text" }
    },
    languageText: {
      name: "Language",
      defaultValue: "Language",
      control: { type: "text" }
    },
    contributorsText: {
      name: "Contributors",
      defaultValue: "Contributors",
      control: { type: "text" }
    },
    originalTitleText: {
      name: "Original title",
      defaultValue: "Original title",
      control: { type: "text" }
    },
    isbnText: {
      name: "ISBN",
      defaultValue: "ISBN",
      control: { type: "text" }
    },
    editionText: {
      name: "Edition",
      defaultValue: "Edition",
      control: { type: "text" }
    },
    scopeText: {
      name: "Scope",
      defaultValue: "Scope",
      control: { type: "text" }
    },
    publisherText: {
      name: "Publisher",
      defaultValue: "Publisher",
      control: { type: "text" }
    },
    audienceText: {
      name: "Audience",
      defaultValue: "Audience",
      control: { type: "text" }
    },
    genreAndFormText: {
      name: "Genre and form",
      defaultValue: "Genre",
      control: { type: "text" }
    },
    creatorsAreMissingText: {
      name: "Creators are missing",
      defaultValue: "Creators are missing",
      control: { type: "text" }
    },
    goToEReolenText: {
      name: "Go to e-Reolen",
      defaultValue: "Go to e-Reolen",
      control: { type: "text" }
    },
    readArticleText: {
      name: "Read article",
      defaultValue: "Read article",
      control: { type: "text" }
    },
    loadingText: {
      name: "Loading",
      defaultValue: "Loading",
      control: { type: "text" }
    },
    getOnlineText: {
      name: "Get online",
      defaultValue: "Get online",
      control: { type: "text" }
    },
    seeOnlineText: {
      name: "See online",
      defaultValue: "See online",
      control: { type: "text" }
    },
    cantReserveText: {
      name: "Can't be reserved",
      defaultValue: "Can't be reserved",
      control: { type: "text" }
    },
    goToText: {
      name: "Go to",
      defaultValue: "Go to",
      control: { type: "text" }
    },
    materialIsLoanedOutText: {
      name: "Material is loaned out",
      defaultValue: "Material is loaned out",
      control: { type: "text" }
    },
    findOnShelfExpandButtonExplanationText: {
      name: "Find on shelf expand button explanation text",
      defaultValue: "This button opens a modal",
      control: { type: "text" }
    },
    materialIsIncludedText: {
      name: "Material is included",
      defaultValue: "This material doesn't count towards your loan quota",
      control: { type: "text" }
    },
    weHaveShoppedText: {
      name: "We bought",
      defaultValue: "We bought",
      control: { type: "text" }
    },
    copiesThereIsText: {
      name: "copies there is",
      defaultValue: "copies. There are",
      control: { type: "text" }
    },
    reservationsForThisMaterialText: {
      name: "Reservations for this material",
      defaultValue: "reservations for this material",
      control: { type: "text" }
    },
    youHaveBorrowedText: {
      name: "You have loaned",
      defaultValue: "You have loaned",
      control: { type: "text" }
    },
    possibleText: {
      name: "Possible",
      defaultValue: "possible",
      control: { type: "text" }
    },
    thisMonthText: {
      name: "This month",
      defaultValue: "this month",
      control: { type: "text" }
    },
    approveReservationText: {
      name: "Approve reservation",
      defaultValue: "Approve reservation",
      control: { type: "text" }
    },
    shiftText: {
      name: "Change",
      defaultValue: "Change",
      control: { type: "text" }
    },
    pickupLocationText: {
      name: "Pick up at",
      defaultValue: "Pick up at",
      control: { type: "text" }
    },
    receiveSmsWhenMaterialReadyText: {
      name: "You will receive an SMS when the material is ready",
      defaultValue: "You will receive an SMS when the material is ready",
      control: { type: "text" }
    },
    receiveEmailWhenMaterialReadyText: {
      name: "Receive mail when the material is ready",
      defaultValue: "You will receive an email when the material is ready",
      control: { type: "text" }
    },
    haveNoInterestAfterText: {
      name: "Have no interest after",
      defaultValue: "Have no interest after",
      control: { type: "text" }
    },
    oneMonthText: {
      name: "One month",
      defaultValue: "1 month",
      control: { type: "text" }
    },
    twoMonthsText: {
      name: "Two months",
      defaultValue: "2 months",
      control: { type: "text" }
    },
    threeMonthsText: {
      name: "Three months",
      defaultValue: "3 months",
      control: { type: "text" }
    },
    sixMonthsText: {
      name: "Six months",
      defaultValue: "6 months",
      control: { type: "text" }
    },
    oneYearText: {
      name: "Twelve months",
      defaultValue: "12 months",
      control: { type: "text" }
    },
    daysText: {
      name: "Days",
      defaultValue: "Days",
      control: { type: "text" }
    },
    reservationSuccesTitleText: {
      name: "Reservation Success title",
      defaultValue: "Material is available and reserved for you!",
      control: { type: "text" }
    },
    reservationSuccesIsReservedForYouText: {
      name: "Reservation Success Title",
      defaultValue: "is reserved for you",
      control: { type: "text" }
    },
    reservationSuccesPreferredPickupBranchText: {
      name: "Reservation Preferred pickup branch",
      defaultValue:
        "Material is available and you will get a message when it's ready for pickup - pickup at",
      control: { type: "text" }
    },
    reservationErrorsTitleText: {
      name: "Reservation Error title",
      defaultValue: "Failed to reserve the material",
      control: { type: "text" }
    },
    reservationErrorsDescriptionText: {
      name: "Reservation Error description",
      defaultValue:
        "We're sorry. Unfortunately, there has been an error. Try again, please.",
      control: { type: "text" }
    },
    tryAginButtonText: {
      name: "Try again button text",
      defaultValue: "Try again",
      control: { type: "text" }
    },
    okButtonText: {
      name: "Ok button text",
      defaultValue: "Ok",
      control: { type: "text" }
    },
    missingDataText: {
      name: "Missing data text",
      defaultValue: "Missing data",
      control: { type: "text" }
    },
    reservationModalScreenReaderModalDescriptionText: {
      name: "Reservation modal screen reader description",
      defaultValue: "Modal for reservation",
      control: { type: "text" }
    },
    reservationModalCloseModalAriaLabelText: {
      name: "Reservation modal aria label modal two",
      defaultValue: "Close reservation modal",
      control: { type: "text" }
    },
    librariesHaveTheMaterialText: {
      name: "Libraries have the material",
      defaultValue: "libraries have material",
      control: { type: "text" }
    },
    findOnShelfModalScreenReaderModalDescriptionText: {
      name: "Reservation modal screen reader description",
      defaultValue: "Modal for reservation",
      control: { type: "text" }
    },
    findOnShelfModalCloseModalAriaLabelText: {
      name: "Reservation modal aria label modal two",
      defaultValue: "Close reservation modal",
      control: { type: "text" }
    },
    findOnShelfModalListMaterialText: {
      name: "Material",
      defaultValue: "Material",
      control: { type: "text" }
    },
    findOnShelfModalListFindOnShelfText: {
      name: "Find it on shelf",
      defaultValue: "Find it on shelf",
      control: { type: "text" }
    },
    findOnShelfModalListItemCountText: {
      name: "Home",
      defaultValue: "home",
      control: { type: "text" }
    },
    findOnShelfModalNoLocationSpecifiedText: {
      name: "No location for find on shelf specified",
      defaultValue: "-",
      control: { type: "text" }
    },
    findOnShelfModalPeriodicalYearDropdownText: {
      name: "Find on shelf modal periodical dropdown - choose year",
      defaultValue: "Choose periodical year",
      control: { type: "text" }
    },
    findOnShelfModalPeriodicalEditionDropdownText: {
      name: "Find on shelf modal periodical dropdown - choose edition/volume",
      defaultValue: "Choose periodical edition",
      control: { type: "text" }
    },
    numberInQueueText: {
      name: "Number in queue text",
      defaultValue: "You are number",
      control: { type: "text" }
    },
    queueText: {
      name: "Queue text",
      defaultValue: "in queue",
      control: { type: "text" }
    },
    alreadyReservedText: {
      name: "Already reserved text",
      defaultValue: "You already reserved this material",
      control: { type: "text" }
    },
    closeText: {
      name: "Close text",
      defaultValue: "Close",
      control: { type: "text" }
    },
    modalReservationFormEmailHeaderTitleText: {
      name: "Modal reservation form email header title",
      defaultValue: "Change email",
      control: { type: "text" }
    },
    modalReservationFormEmailHeaderDescriptionText: {
      name: "Modal reservation form email header description",
      defaultValue:
        "If you wish to receive notification emails you can add or change your email address here.",
      control: { type: "text" }
    },
    modalReservationFormEmailInputFieldLabelText: {
      name: "Modal reservation form email input field label",
      defaultValue: "Email",
      control: { type: "text" }
    },
    modalReservationFormEmailInputFieldDescriptionText: {
      name: "Modal reservation form email input field description",
      defaultValue: "Add email",
      control: { type: "text" }
    },
    modalReservationFormSmsHeaderTitleText: {
      name: "Modal reservation form sms header title",
      defaultValue: "Change phone number",
      control: { type: "text" }
    },
    modalReservationFormSmsHeaderDescriptionText: {
      name: "Modal reservation form sms header description",
      defaultValue:
        "If you wish to receive notification sms you can add or change your phone number here.",
      control: { type: "text" }
    },
    modalReservationFormSmsInputFieldLabelText: {
      name: "Modal reservation form sms input field label",
      defaultValue: "Phone number",
      control: { type: "text" }
    },
    modalReservationFormSmsInputFieldDescriptionText: {
      name: "Modal reservation form sms input field description",
      defaultValue: "Phone number",
      control: { type: "text" }
    },
    etAlText: {
      name: "Et al. Text",
      defaultValue: "et al.",
      control: { type: "text" }
    },
    modalReservationFormPickupHeaderTitleText: {
      name: "Modal reservation form pickup header title",
      defaultValue: "Change pick-up location",
      control: { type: "text" }
    },
    modalReservationFormPickupHeaderDescriptionText: {
      name: "Modal reservation form pickup header description",
      defaultValue:
        "If you wish to change the pick-up location for your reservation, you can do it here.",
      control: { type: "text" }
    },
    chooseOneText: {
      name: "Choose one text",
      defaultValue: "Choose one",
      control: { type: "text" }
    },
    modalReservationFormNoInterestAfterHeaderTitleText: {
      name: "Modal reservation form no interest after header title",
      defaultValue: "Change date of interest",
      control: { type: "text" }
    },
    modalReservationFormNoInterestAfterHeaderDescriptionText: {
      name: "Modal reservation form no interest after header description",
      defaultValue:
        "If you wish to change the amount of time after which you're no longer interested in the material, you can do it here.",
      control: { type: "text" }
    }
  }
} as ComponentMeta<typeof MaterialEntry>;

const Template: ComponentStory<typeof MaterialEntry> = (
  args: MaterialEntryProps
) => <MaterialEntry {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const Periodical = Template.bind({});
Periodical.args = {
  wid: "work-of:870970-basis:06373674"
};

export const Infomedia = Template.bind({});
Infomedia.args = {
  wid: "work-of:870971-avis:35731733"
};
