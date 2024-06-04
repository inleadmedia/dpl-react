/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * DPL CMS - REST API
 * The REST API provide by the core REST module.
 * OpenAPI spec version: Versioning not supported
 */
import type { DplOpeningHoursCreatePOSTOpeningHoursInstanceBodyCategory } from "./dplOpeningHoursCreatePOSTOpeningHoursInstanceBodyCategory";
import type { DplOpeningHoursCreatePOSTOpeningHoursInstanceBodyRepetition } from "./dplOpeningHoursCreatePOSTOpeningHoursInstanceBodyRepetition";

export type DplOpeningHoursCreatePOSTOpeningHoursInstanceBody = {
  /** The id for the branch the instance belongs to */
  branch_id: number;
  category: DplOpeningHoursCreatePOSTOpeningHoursInstanceBodyCategory;
  /** The date which the opening hours applies to. In ISO 8601 format. */
  date: string;
  /** When the opening hours end. In format HH:MM */
  end_time: string;
  /** An serial unique id of the opening hours instance. */
  id?: number;
  repetition: DplOpeningHoursCreatePOSTOpeningHoursInstanceBodyRepetition;
  /** When the opening hours start. In format HH:MM */
  start_time: string;
};
