/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { AddressV3 } from "./addressV3";

export interface GuardianV2 {
  address?: AddressV3;
  /** Must be valid */
  email: string;
  mobilePhoneNumber?: string;
  /** The full name of the guardian */
  name: string;
  personIdentifier: string;
}
