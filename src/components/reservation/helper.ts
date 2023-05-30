import dayjs from "dayjs";
import { UseTextFunction } from "../../core/utils/text";
import {
  AgencyBranch,
  CreateReservation,
  CreateReservationBatchV2,
  HoldingsV3
} from "../../core/fbs/model";
import {
  convertPostIdToFaustId,
  creatorsToString,
  flattenCreators,
  getLatestManifestation,
  getManifestationPublicationYear,
  materialIsFiction
} from "../../core/utils/helpers/general";
import { Manifestation } from "../../core/utils/types/entities";
import { PeriodicalEdition } from "../material/periodical/helper";
import { ModalReservationFormTextType } from "./forms/helper";
import invalidSwitchCase from "../../core/utils/helpers/invalid-switch-case";
import { OptionsProps } from "../list-details-dropdown/list-details-dropdown";

export const isConfigValueOne = (configValue: string | undefined | string[]) =>
  configValue === "1";

export const getPreferredBranch = (id: string, array: AgencyBranch[]) => {
  const locationItem = array.find((item) => item.branchId === id);
  return locationItem ? locationItem.title : id;
};

export const getNoInterestAfter = (
  days: number,
  interestPeriod: OptionsProps[],
  t: UseTextFunction
) => {
  const interestPeriodFound = interestPeriod.find(
    ({ value }) => value === String(days)
  );

  if (interestPeriodFound) {
    return interestPeriodFound.label;
  }
  return `${days} ${t("daysText")}`;
};

export const getFutureDateString = (num: number) => {
  const futureDate = dayjs().add(num, "day").format("YYYY-MM-DD");
  return futureDate;
};
type Periodical = Pick<PeriodicalEdition, "volumeNumber" | "volumeYear">;

const constructReservation = ({
  manifestation: { pid },
  pickupBranch,
  expiryDate,
  periodical
}: {
  manifestation: Manifestation;
  pickupBranch?: string;
  expiryDate?: string;
  periodical?: Periodical;
}): CreateReservation => {
  const faustId = convertPostIdToFaustId(pid);

  return {
    recordId: faustId,
    ...(pickupBranch ? { pickupBranch } : {}),
    ...(expiryDate ? { expiryDate } : {}),
    ...(periodical ? { periodical } : {})
  };
};

const constructReservations = ({
  manifestations,
  pickupBranch,
  expiryDate,
  periodical
}: {
  manifestations: Manifestation[];
  pickupBranch?: string;
  expiryDate?: string;
  periodical?: Periodical;
}): CreateReservation[] =>
  manifestations.map((manifestation) =>
    constructReservation({
      manifestation,
      pickupBranch,
      expiryDate,
      periodical
    })
  );

export const constructReservationData = ({
  manifestations,
  selectedBranch,
  expiryDate,
  periodical
}: {
  manifestations: Manifestation[];
  selectedBranch: string | null;
  expiryDate: string | null;
  periodical: PeriodicalEdition | null;
}): CreateReservationBatchV2 => {
  return {
    reservations: constructReservations({
      manifestations,
      ...(selectedBranch ? { pickupBranch: selectedBranch } : {}),
      ...(expiryDate ? { expiryDate } : {}),
      ...(periodical
        ? {
            periodical: {
              volumeNumber: periodical.volumeNumber,
              volumeYear: periodical.volumeYear
            }
          }
        : {})
    }),
    ...(manifestations.length > 1 ? { type: "parallel" } : {})
  };
};

export const getAuthorLine = (
  manifestation: Manifestation,
  t: UseTextFunction
) => {
  const { creators } = manifestation;
  const publicationYear = getManifestationPublicationYear(manifestation);
  const author = creatorsToString(flattenCreators(creators), t) || null;

  let year = "";
  if (publicationYear) {
    year = publicationYear;
  }
  if (materialIsFiction(manifestation)) {
    year = `(${t("materialHeaderAllEditionsText")})`;
  }
  return !author
    ? null
    : [t("materialHeaderAuthorByText"), author, year].join(" ");
};

export const getManifestationsToReserve = (
  reservableManifestations: Manifestation[],
  isPeriodical?: boolean
) => {
  if (isPeriodical) {
    // Specific issues of periodical works usually don't have multiple
    // manifestations - eg. there only is one version of Vogue January 2023.
    return reservableManifestations;
  }
  if (!reservableManifestations || reservableManifestations.length < 1) {
    return [];
  }
  // Newer nonfiction-work's editions have updated more accurate content, so we
  // want to always reserve the latest edition.
  if (!materialIsFiction(reservableManifestations[0])) {
    return [getLatestManifestation(reservableManifestations)];
  }
  // Fictional work editions don't change content, only appearance, and so we can
  // reserve whichever one of the reservable manifestations will be home soonest.
  return reservableManifestations;
};

export const getReservationModalTypeTranslation = (
  name: ModalReservationFormTextType,
  type: "closeModalAriaLabelText" | "screenReaderModalDescriptionText"
) => {
  const isCloseModal = type === "closeModalAriaLabelText";
  switch (name) {
    case "sms":
      return isCloseModal
        ? "closeModalAriaLabelSmsText"
        : "screenReaderModalDescriptionSmsText";
    case "email":
      return isCloseModal
        ? "closeModalAriaLabelEmailText"
        : "screenReaderModalDescriptionEmailText";
    case "interestPeriod":
      return isCloseModal
        ? "closeModalAriaLabelInterestPeriodText"
        : "screenReaderModalDescriptionInterestPeriodText";
    case "pickup":
      return isCloseModal
        ? "closeModalAriaLabelPickupText"
        : "screenReaderModalDescriptionPickupText";
    default:
      return invalidSwitchCase<string>(name);
  }
};

export const getInstantLoanBranchHoldings = (
  branchHoldings: HoldingsV3[],
  whitelist: AgencyBranch[],
  instantLoanString: string
) => {
  const whitelistIds = whitelist.map(({ branchId }) => branchId);

  // 1. Filter holdings by branch on whitelist
  const filteredBranchHoldings = branchHoldings.filter(({ branch }) =>
    whitelistIds.includes(branch.branchId)
  );

  // 2. Filter materials on holdings for instant loans / Filter holdings by empty materials (presence of instant loans)
  const filteredMaterials = filteredBranchHoldings
    .map(({ branch, materials }) => {
      const filtered = materials.filter(
        ({ materialGroup, available }) =>
          materialGroup.description?.includes(instantLoanString) && available
      );

      return { branch, materials: filtered };
    })
    .filter(({ materials }) => materials.length > 0);

  // 4. Return filtered holdings
  return filteredMaterials;
};

export const getInstantLoanBranchHoldingsAboveThreshold = (
  instantLoanBranchHoldings: HoldingsV3[],
  instantLoanThresholdConfig: string
) =>
  instantLoanBranchHoldings.filter(
    ({ materials }) => materials.length >= Number(instantLoanThresholdConfig)
  );

export default {};
