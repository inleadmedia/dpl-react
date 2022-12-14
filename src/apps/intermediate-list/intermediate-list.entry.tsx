import React, { FC } from "react";
import { withText } from "../../core/utils/text";
import { withUrls } from "../../core/utils/url";

import IntermedateList from "./intermediate-list";

export interface IntermedateListProps {
  totalFeeAmountText: string;
  feeCreatedText: string;
  otherMaterialsText: string;
  materialByAuthorText: string;
  loanListDaysText: string;
}

const IntermedateListEntry: FC<IntermedateListProps> = () => (
  <IntermedateList />
);

export default withUrls(withText(IntermedateListEntry));
