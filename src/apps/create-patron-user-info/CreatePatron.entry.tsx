import React, { FC, useEffect } from "react";
import { withConfig } from "../../core/utils/config";
import { withText } from "../../core/utils/text";
import { useUrls, withUrls } from "../../core/utils/url";
import { GlobalEntryTextProps } from "../../core/storybook/globalTextArgs";
import { isUnregistered } from "../../core/utils/helpers/user";
import { redirectTo } from "../../core/utils/helpers/url";
import CreatePatron from "./CreatePatron";

interface CreatePatronConfigProps {
  agencyConfig: string;
  pincodeLengthMinConfig: string;
  pincodeLengthMaxConfig: string;
  blacklistedPickupBranchesConfig: string;
  branchesConfig: string;
  textNotificationsEnabledConfig: string;
}
interface CreatePatronUrlProps {
  loginUrl: string;
  redirectOnUserCreatedUrl: string;
  logoutUrl: string;
  fbsBaseUrl: string;
  publizonBaseUrl: string;
  dashboardUrl: string;
}

interface CreatePatronTextProps {
  pickupBranchesDropdownLabelText: string;
  createPatronCancelButtonText: string;
  patronPagePhoneInputMessageText: string;
  createPatronChangePickupBodyText: string;
  createPatronChangePickupHeaderText: string;
  createPatronConfirmButtonText: string;
  createPatronHeaderText: string;
  createPatronInvalidSsnBodyText: string;
  createPatronInvalidSsnHeaderText: string;
  patronContactEmailCheckboxText: string;
  patronContactEmailLabelText: string;
  patronContactInfoHeaderText: string;
  patronContactNameLabelText: string;
  patronContactPhoneCheckboxText: string;
  patronContactPhoneLabelText: string;
  patronPageChangePincodeBodyText: string;
  patronPageChangePincodeHeaderText: string;
  patronPageConfirmPincodeLabelText: string;
  patronPagePincodeLabelText: string;
  patronPagePincodesNotTheSameText: string;
  patronPagePincodeTooShortValidationText: string;
  phoneInputMessageText: string;
  pickupBranchesDropdownNothingSelectedText: string;
}

export interface CreatePatronProps
  extends CreatePatronConfigProps,
    GlobalEntryTextProps,
    CreatePatronUrlProps,
    CreatePatronTextProps {
  storybookContextCpr?: string;
}

const CreatePatronEntry: FC<CreatePatronProps> = ({ storybookContextCpr }) => {
  const u = useUrls();
  const dashboardUrl = u("dashboardUrl");

  // TODO: Investigate wether we need to wrap the redirect in a useEffect.
  useEffect(() => {
    // If the user has already been registered, redirect to the dashboard.
    if (!isUnregistered()) {
      redirectTo(dashboardUrl);
    }
  }, [dashboardUrl]);

  return isUnregistered() ? (
    <CreatePatron storybookContextCpr={storybookContextCpr} />
  ) : null;
};

export default withConfig(withText(withUrls(CreatePatronEntry)));
