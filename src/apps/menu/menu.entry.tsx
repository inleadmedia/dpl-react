import React, { FC } from "react";
import Menu from "./menu";
import { withText } from "../../core/utils/text";
import { withConfig } from "../../core/utils/config";
import { withUrls } from "../../core/utils/url";
import GlobalUrlEntryPropsInterface from "../../core/utils/types/global-url-props";

export interface MenuProps {
  menuViewYourProfileText: string;
  menuViewYourProfileTextUrl: string;
  menuNavigationDataConfig: string;
  menuNotificationLoansExpiredText: string;
  menuNotificationLoansExpiredUrl: string;
  menuNotificationLoansExpiringSoonText: string;
  menuNotificationLoansExpiringSoonUrl: string;
  menuNotificationReadyForPickupText: string;
  menuNotificationReadyForPickupUrl: string;
  menuLogOutText: string;
  menuLogOutUrl: string;
  thresholdConfig: string;
  intermediateListDaysText: string;
  menuLoginText: string;
  menuLoginUrl: string;
  menuSignUpText: string;
  menuSignUpUrl: string;
}

const MenuEntry: FC<MenuProps & GlobalUrlEntryPropsInterface> = () => <Menu />;

export default withUrls(withConfig(withText(MenuEntry)));
