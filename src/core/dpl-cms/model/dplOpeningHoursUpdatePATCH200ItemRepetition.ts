/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * DPL CMS - REST API
 * The REST API provide by the core REST module.
 * OpenAPI spec version: Versioning not supported
 */
import type { DplOpeningHoursUpdatePATCH200ItemRepetitionType } from "./dplOpeningHoursUpdatePATCH200ItemRepetitionType";
import type { DplOpeningHoursUpdatePATCH200ItemRepetitionWeeklyData } from "./dplOpeningHoursUpdatePATCH200ItemRepetitionWeeklyData";

export type DplOpeningHoursUpdatePATCH200ItemRepetition = {
  /** A serial unique id of the repetition. All instances with the same id belongs to the same repetition. */
  id: number;
  /** If/how the instance should be repeated in the future: <br/> - single: The instance should not be repeated <br/> - weekly: The instance should be repeated weekly from the first day of the repetition until the provided end date. The week day of the first instance defines which weekday should be used for the repeated instances. */
  type: DplOpeningHoursUpdatePATCH200ItemRepetitionType;
  weekly_data?: DplOpeningHoursUpdatePATCH200ItemRepetitionWeeklyData;
};
