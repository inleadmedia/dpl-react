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
  smsNotificationsForReservationsEnabledConfig: boolean;
}

export interface MaterialEntryProps
  extends GlobalUrlEntryPropsInterface,
    MaterialEntryTextProps,
    GlobalEntryTextProps,
    MaterialEntryConfigProps {
  wid: WorkId;
}

const WrappedMaterialEntry: React.FC<MaterialEntryProps> = ({ wid }) => (
  <GuardedApp app="material">
    <Material wid={wid} />
  </GuardedApp>
);

export default withConfig(withUrls(withText(WrappedMaterialEntry)));
