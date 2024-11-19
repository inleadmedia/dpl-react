/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { FeeMaterialV2 } from "./feeMaterialV2";

export interface FeeV2 {
  /** The amount to pay, in the currency of the agency */
  amount: number;
  /** The date the fee was created */
  creationDate: string;
  /** Expected payment due date */
  dueDate?: string;
  /** Identifies the fee, used when registering a payment that covers the fee */
  feeId: number;
  /** Set if fee covers materials */
  materials: FeeMaterialV2[];
  /** If the fee has been paid in full, this will be set to the date of the final payment, otherwise not set */
  paidDate?: string;
  /** true if the client system is allowed to offer payment for the fee, false if not allowed */
  payableByClient: boolean;
  /** Human readable free text message about the reason for the fee, presentable to an end user (language is likely
 to be the mother tongue of the agency) */
  reasonMessage: string;
  /** Can be used to distinguish between different types of fees */
  type: string;
}
