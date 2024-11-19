/**
 * Generated by orval v7.2.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { Periodical } from "./periodical";

export interface Material {
  /** True if material is available on-shelf, false if lent out */
  available: boolean;
  /** Identifies the material */
  itemNumber: string;
  /** Name of the material group that the material belongs to */
  materialGroupName: string;
  periodical?: Periodical;
}
