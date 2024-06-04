/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * DPL CMS - REST API
 * The REST API provide by the core REST module.
 * OpenAPI spec version: Versioning not supported
 */

/**
 * Data for the event provided by a third party.
 */
export type EventsGET200ItemExternalData = {
  /** An absolute url provided by the third party where editorial users can administer the event. Accessing this url should require authentication. */
  admin_url?: string;
  /** An absolute url provided by the third party where end users can access the event. */
  url?: string;
};
