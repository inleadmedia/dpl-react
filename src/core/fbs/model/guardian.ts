/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { Address } from "./address";

export interface Guardian {
  address?: Address;
  cprNumber: string;
  /** Must be valid */
  email: string;
  mobilePhoneNumber?: string;
  /** The full name of the guardian */
  name: string;
}