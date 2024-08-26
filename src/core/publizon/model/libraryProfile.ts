/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * Publizon Library API
 * Pubhub exists in two separate environments, each with their own server, code and database. Please use the web service located at library-api.qa.pubhub.dk when developing and testing.
Orders/loans created in test environment will not be invoiced. Please request a new license key for the production environment when you're ready to go live.
 * OpenAPI spec version: 1
 */
import type { TestCard } from "./testCard";

export interface LibraryProfile {
  audioLoanDurationInDays?: number;
  ebookLoanDurationInDays?: number;
  id?: number;
  /** @nullable */
  isilNumber?: string | null;
  maxAudioAmountPerMonth?: number;
  /** @nullable */
  maxAudioAmountPerMonthNotificationThreshold?: number | null;
  maxAudioCancellationsPerMonth?: number;
  maxConcurrentAudioLoansPerBorrower?: number;
  maxConcurrentAudioReservationsPerBorrower?: number;
  maxConcurrentEbookLoansPerBorrower?: number;
  maxConcurrentEbookReservationsPerBorrower?: number;
  maxEbookAmountPerMonth?: number;
  /** @nullable */
  maxEbookAmountPerMonthNotificationThreshold?: number | null;
  maxEbookCancellationsPerMonth?: number;
  /** @nullable */
  name?: string | null;
  /** @nullable */
  testCards?: TestCard[] | null;
}