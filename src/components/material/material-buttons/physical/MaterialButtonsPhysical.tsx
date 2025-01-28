import React, { useMemo } from "react";
import {
  getAllFaustIds,
  getManifestationType
} from "../../../../core/utils/helpers/general";
import { isBlocked } from "../../../../core/utils/helpers/user";
import { ButtonSize } from "../../../../core/utils/types/button";
import { Manifestation } from "../../../../core/utils/types/entities";
import UseReservableManifestations from "../../../../core/utils/UseReservableManifestations";
import MaterialButtonUserBlocked from "../generic/MaterialButtonUserBlocked";
import MaterialButtonReservePhysical from "./MaterialButtonPhysical";
import MaterialButtonLoading from "../generic/MaterialButtonLoading";
import MaterialButtonDisabled from "../generic/MaterialButtonDisabled";
import { useText } from "../../../../core/utils/text";
import { usePatronData } from "../../../../core/utils/helpers/usePatronData";
import { useConfig } from "../../../../core/utils/config";
import { useGetHoldings } from "../../../../apps/material/helper";

export interface MaterialButtonsPhysicalProps {
  manifestations: Manifestation[];
  size?: ButtonSize;
  dataCy?: string;
}

const MaterialButtonsPhysical: React.FC<MaterialButtonsPhysicalProps> = ({
  manifestations,
  size,
  dataCy = "material-buttons-physical"
}) => {
  const t = useText();
  const config = useConfig();
  const faustIds = getAllFaustIds(manifestations);
  let { data: holdings, isLoading: isLoadingHoldings } = useGetHoldings({
    faustIds,
    blacklist: "availability",
    config
  });

  const blacklistedGroup = useMemo(() => {
    // @ts-ignore-next-line
    return (document.querySelector("[data-blacklisted-reservation-groups]")?.getAttribute("data-blacklisted-reservation-groups") || "")
      .split(",")
      .filter(Boolean);
  }, []);

  const { data: userData, isLoading: isLoadingPatron } = usePatronData();
  const isUserBlocked = !!(userData?.patron && isBlocked(userData?.patron));

  if (isLoadingHoldings || isLoadingPatron) {
    return <MaterialButtonLoading />;
  }

  const blacklistedBranches = config("blacklistedAvailabilityBranchesConfig", { transformer: "stringToArray" });
  const availableForReservation = !holdings || holdings.length === 0 || (holdings || []).filter(group => {
    if (group.reservable !== true)
      return false;

    if ((group.holdings || []).length === 0)
      return true;

    return group.holdings.filter(holding => {
      return blacklistedBranches.includes(holding.branch.branchId) === false && holding.materials.filter((material) => {
        return blacklistedGroup.includes(material?.materialGroup?.name) === false;
      }).length !== 0;
    }).length !== 0;
  }).length !== 0;

  if (availableForReservation !== true) {
    return <MaterialButtonDisabled size={size} label={t("cantReserveText")} />;
  }

  if (isUserBlocked) {
    return <MaterialButtonUserBlocked size={size} dataCy={dataCy} />;
  }

  // We show the reservation button if the user isn't logged in or isn't blocked.
  // In the former case there there's no way to see if they're blocked, so we
  // redirect anonymous user to the login page.

  if (!userData || !isUserBlocked) {
    return (
      <MaterialButtonReservePhysical
        dataCy={dataCy}
        manifestationMaterialType={getManifestationType(manifestations)}
        faustIds={faustIds}
        size={size}
      />
    );
  }

  return null;
};

export default MaterialButtonsPhysical;
