/**
 * Generated by orval v6.8.1 🍺
 * Do not edit manually.
 * DPL CMS - REST API
 * The REST API provide by the core REST module.
 * OpenAPI spec version: Versioning not supported
 */
import type { DplOpeningHoursUpdatePATCHBodyCategory } from "./dplOpeningHoursUpdatePATCHBodyCategory";

export type DplOpeningHoursUpdatePATCHBody = {
  /** An serial unique id of the opening hours instance. */
  id: number;
  category: DplOpeningHoursUpdatePATCHBodyCategory;
  /** The date which the opening hours applies to. In ISO 8601 format. */
  date: string;
  /** When the opening hours start. In format HH:MM */
  start_time: string;
  /** When the opening hours end. In format HH:MM */
  end_time: string;
  /** The id for the branch the instance belongs to */
  branch_id: number;
};
