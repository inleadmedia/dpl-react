/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * DPL CMS - REST API
 * The REST API provide by the core REST module.
 * OpenAPI spec version: Versioning not supported
 */

export type DplOpeningHoursCreatePOST200ItemRepetitionWeeklyData = {
  /** The end date of the repetition. If the end date is not on the same week day as the first instance then the preceding occurrence of the weekday will be the last instance. <br/><br/>This field must be provided if type is 'weekly' */
  end_date?: string;
};
