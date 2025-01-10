import * as React from "react";
import GuardedApp from "../../components/guarded-app";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { WorkId } from "../../core/utils/types/ids";
import { withUrls } from "../../core/utils/url";
import Material from "./material";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";

interface MaterialEntryTextProps {
  alreadyReservedText: string;
  approveReservationText: string;
  blockedButtonText: string;
  cantReserveText: string;
  cantViewReviewText: string;
  cantViewText: string;
  changeEmailText: string;
  changeSmsNumberText: string;
  chooseOneText: string;
  closeText: string;
  daysText: string;
  descriptionHeadlineText: string;
  detailsListAudienceText: string;
  detailsListAgeRangeText: string;
  detailsListAuthorsText: string;
  detailsListNotesText: string;
  detailsListPhysicalDescriptionText: string;
  detailsListHostPublicationText: string;
  detailsListSourceText: string;
  detailsListPartsText: string;
  detailsListContributorsText: string;
  detailsListEditionText: string;
  detailsListFirstEditionYearText: string;
  detailsListFirstEditionYearUnknownText: string;
  detailsListGenreAndFormText: string;
  detailsListIsbnText: string;
  detailsListLanguageText: string;
  detailsListOriginalTitleText: string;
  detailsListPlayTimeText: string;
  detailsListPublisherText: string;
  detailsListScopeText: string;
  detailsListTypeText: string;
  detailsOfTheMaterialText: string;
  detailsText: string;
  editionsText: string;
  editionText: string;
  etAlText: string;
  expandMoreText: string;
  fictionNonfictionText: string;
  filmAdaptationsText: string;
  findOnBookshelfText: string;
  findOnShelfModalCloseModalAriaLabelText: string;
  findOnShelfModalListFindOnShelfText: string;
  findOnShelfModalListItemCountText: string;
  findOnShelfModalListMaterialText: string;
  findOnShelfModalNoLocationSpecifiedText: string;
  findOnShelfModalPeriodicalEditionDropdownText: string;
  findOnShelfModalPeriodicalYearDropdownText: string;
  findOnShelfModalScreenReaderModalDescriptionText: string;
  findOnShelfTableDescriptionText: string;
  firstAvailableEditionText: string;
  getOnlineText: string;
  goToText: string;
  reservationDetailsNoInterestAfterTitleText: string;
  identifierText: string;
  infomediaModalCloseModalAriaLabelText: string;
  infomediaModalScreenReaderModalDescriptionText: string;
  inSameSeriesText: string;
  inSeriesText: string;
  instantLoanSubTitleText: string;
  instantLoanTitleText: string;
  instantLoanUnderlineDescriptionText: string;
  interestPeriodsConfig: string;
  librariesHaveTheMaterialText: string;
  listenOnlineText: string;
  loadingText: string;
  loginToSeeReviewText: string;
  materialHeaderAllEditionsText: string;
  materialHeaderAuthorByText: string;
  materialIsAvailableInAnotherEditionText: string;
  materialIsIncludedText: string;
  materialIsLoanedOutText: string;
  materialReservationInfoText: string;
  materialsInStockInfoText: string;
  missingDataText: string;
  modalReservationFormEmailHeaderDescriptionText: string;
  modalReservationFormEmailHeaderTitleText: string;
  modalReservationFormEmailInputFieldDescriptionText: string;
  modalReservationFormEmailInputFieldLabelText: string;
  modalReservationFormPickupHeaderDescriptionText: string;
  modalReservationFormPickupHeaderTitleText: string;
  modalReservationFormSmsHeaderDescriptionText: string;
  modalReservationFormSmsHeaderTitleText: string;
  modalReservationFormSmsInputFieldDescriptionText: string;
  modalReservationFormSmsInputFieldLabelText: string;
  notLivingInMunicipalityText: string;
  numberDescriptionText: string;
  numberInQueueText: string;
  okButtonText: string;
  onlineLimitMonthAudiobookInfoText: string;
  onlineLimitMonthEbookInfoText: string;
  openOrderAuthenticationErrorText: string;
  openOrderErrorMissingPincodeText: string;
  openOrderInvalidOrderText: string;
  openOrderNoServicerequesterText: string;
  openOrderNotOwnedIllLocText: string;
  openOrderNotOwnedNoIllLocText: string;
  openOrderNotOwnedWrongIllMediumtypeText: string;
  openOrderOrsErrorText: string;
  openOrderOwnedOwnCatalogueText: string;
  openOrderOwnedWrongMediumtypeText: string;
  openOrderResponseTitleText: string;
  openOrderServiceUnavailableText: string;
  openOrderStatusOwnedAcceptedText: string;
  openOrderUnknownErrorText: string;
  openOrderUnknownPickupagencyText: string;
  openOrderUnknownUserText: string;
  openOrderUserBlockedByAgencyText: string;
  openOrderUserNoLongerExistOnAgencyText: string;
  openOrderUserNotVerifiedText: string;
  orderDigitalCopyButtonLoadingText: string;
  orderDigitalCopyButtonText: string;
  orderDigitalCopyDescriptionText: string;
  orderDigitalCopyEmailLabelText: string;
  orderDigitalCopyFeedbackButtonText: string;
  orderDigitalCopyFeedbackErrorAgencyNotSubscribedText: string;
  orderDigitalCopyFeedbackErrorInvalidPickupBranchText: string;
  orderDigitalCopyFeedbackErrorMissingClientConfigurationText: string;
  orderDigitalCopyFeedbackErrorPidNotReservableText: string;
  orderDigitalCopyFeedbackErrorUnauthenticatedUserText: string;
  orderDigitalCopyFeedbackOkText: string;
  orderDigitalCopyFeedbackTitleText: string;
  orderDigitalCopyFeedbackBorchkUserBlockedByAgencyText: string;
  orderDigitalCopyFeedbackBorchkUserNotVerifiedText: string;
  orderDigitalCopyFeedbackBorchkUserNoLongerExistOnAgencyText: string;
  orderDigitalCopyFeedbackErrorMunicipalityagencyidNotFoundText: string;
  orderDigitalCopyFeedbackUnknownUserText: string;
  orderDigitalCopyModalCloseModalAriaLabelText: string;
  orderDigitalCopyModalScreenReaderModalDescriptionText: string;
  orderDigitalCopyFeedbackErrorMissingMunicipalityagencyidText: string;
  orderDigitalCopyFeedbackInternalErrorText: string;
  orderDigitalCopyTitleText: string;
  outOfText: string;
  periodicalSelectEditionText: string;
  periodicalSelectYearText: string;
  reservationDetailsPickUpAtTitleText: string;
  queueText: string;
  ratingIsText: string;
  readArticleText: string;
  receiveEmailWhenMaterialReadyText: string;
  receiveSmsWhenMaterialReadyText: string;
  reservableFromAnotherLibraryText: string;
  reservationErrorsDescriptionText: string;
  reservationErrorsTitleText: string;
  reservationModalCloseModalAriaLabelText: string;
  reservationModalScreenReaderModalDescriptionText: string;
  reservationSuccesIsReservedForYouText: string;
  reservationSuccessPreferredPickupBranchText: string;
  reservationSuccesTitleText: string;
  reserveBookText: string;
  reserveText: string;
  reserveWithMaterialTypeText: string;
  reviewsText: string;
  saveButtonText: string;
  seeOnlineText: string;
  shiftText: string;
  subjectNumberText: string;
  tryAginButtonText: string;
}

interface MaterialEntryConfigProps {
  blacklistedAvailabilityBranchesConfig?: string;
  blacklistedInstantLoanBranchesConfig: string;
  blacklistedPickupBranchesConfig?: string;
  branchesConfig: string;
  instantLoanConfig: string;
  smsNotificationsForReservationsEnabledConfig: string;
}

export interface MaterialEntryProps
  extends GlobalUrlEntryPropsInterface,
    MaterialEntryTextProps,
    GlobalEntryTextProps,
    MaterialEntryConfigProps {
  wid: WorkId;
}

/*const extendedFields = {
  // Custom detail fields
  "Type": "marc:001.a",
  "Type.options": '{ "concat": "prepend" }',
  "Edition": "",
  "Edition.options": '{ "hidden": true }',
  "Custom original title": "graphql:titles.full[0]",
  "Marc lang code":"marc:041.a, marc:041.c",
  "Language": "",
  "Language.options": '{ "hidden": true }',
  // Custom description fields
  // Use localized name from the description page to extend existing field or any other value to create the new one (will be added after the existing fields).
  // %[fieldName].options% - reserved keyword to pass field options
  // Property options might have following values:
  // options.concat<String> - One of "prepend", "append" or "override" (default: "append")
  // options.url<String> - Absolute or relative url with possible templating "${tag}". E.g.: /search?q=${tag}.
  // options.hidden<Boolean> - Hide the line with defined label
  //"%Series%": "marc:041.a",
  "%Emnetal%": "marc:041.c, marc:041.a",
  "%Emnetal.options%": '{ "concat": "prepend", "url":  }',
  "%Fictional%": "",
  "%Fictional.options%": '{ "hidden": true }',
  "%Original title%": "graphql:titles.original[0]"
};*/

const extendedFields = {
  "detail": {
    "Type": {
      "data": ["marc:001.a", "marc:001.c"],
      "insert": "prepend"
    },
    "Edition": {
      "hidden": true
    },
    "Language": {
      "hidden": true
    },
    "Custom original title": {
      "data": ["graphql:titles.full[0]"]
    },
    "Contents": {
      "data": ["marc:001.a", "marc:001.c"],
      "insert": "fallback",
      "type": "list"
    }
  },
  "description": {
    "Emnetal": {
      "data": ["marc:001.c", "marc:001.a"],
      "insert": "replace",
      "url": "/search?q=${tag}"
    },
    "Fictional": {
      "hidden": true
    },
    "Original title": {
      "data": ["graphql:titles.full[0]"]
    }
  }
};

const WrappedMaterialEntry: React.FC<MaterialEntryProps> = ({ wid }) => (
  <div data-dpl-app="material" data-eonext-ext-fields={ JSON.stringify(extendedFields) }>
    <GuardedApp app="material" >
      <Material wid={wid} />
    </GuardedApp>
  </div>
);

export default withConfig(withUrls(withText(WrappedMaterialEntry)));
