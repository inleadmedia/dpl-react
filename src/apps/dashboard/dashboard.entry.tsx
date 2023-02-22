import React, { FC } from "react";
import { withConfig } from "../../core/utils/config";
import { pageSizeGlobal } from "../../core/utils/helpers/general";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";
import DashBoard from "./dashboard";

export interface DashBoardProps {
  yourProfileText: string;
  intermediateText: string;
  totalOwedText: string;
  payOwedText: string;
  physicalLoansText: string;
  reservationsText: string;
  loansOverdueText: string;
  loansSoonOverdueText: string;
  loansNotOverdueText: string;
  reservationsReadyText: string;
  noPhysicalLoansText: string;
  noReservationsText: string;
  intermediateUrl: string;
  payOwedUrl: string;
  physicalLoansUrl: string;
  loansOverdueUrl: string;
  loansSoonOverdueUrl: string;
  loansNotOverdueUrl: string;
  reservationsUrl: string;
  reservationsStillInQueueForText: string;
  readyForLoanText: string;
  pageSizeDesktop: number;
  pageSizeMobile: number;
  publizonAudioBookText: string;
  publizonEbookText: string;
  publizonPodcastText: string;
  groupModalDueDateHeaderText: string;
  groupModalReturnLibraryText: string;
  groupModalCheckboxText: string;
  groupModalButtonText: string;
  groupModalRenewLoanDeniedMaxRenewalsReachedText: string;
  groupModalDueDateMaterialText: string;
  groupModalGoToMaterialText: string;
  resultPagerStatusText: string;
  loanListMaterialDaysText: string;
  groupModalDueDateWarningLoanOverdueText: string;
  groupModalDueDateLinkToPageWithFeesText: string;
  feesPageUrl: string;
  groupModalRenewLoanDeniedReservedText: string;
  groupModalRenewLoanDeniedInterLibraryLoanText: string;
  thresholdConfig: string;
  pickUpLatestText: string;
  dashboardNumberInLineText: string;
  warningIconAltText: string;
}

const DashboardEntry: FC<DashBoardProps> = ({
  pageSizeDesktop,
  pageSizeMobile
}) => {
  const pageSize = pageSizeGlobal(
    {
      desktop: pageSizeDesktop,
      mobile: pageSizeMobile
    },
    "pageSizeLoanList"
  );

  return <DashBoard pageSize={pageSize} />;
};

export default withConfig(withUrls(withText(DashboardEntry)));