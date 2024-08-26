/**
 * Generated by orval v6.26.0 🍺
 * Do not edit manually.
 * FBS Adapter
 * OpenAPI spec version: 1.0
 */
import type { AgencyBranch } from "./agencyBranch";
import type { AgencyDepartment } from "./agencyDepartment";
import type { AgencyLocation } from "./agencyLocation";
import type { Material } from "./material";
import type { AgencySublocation } from "./agencySublocation";

export interface Holdings {
  branch: AgencyBranch;
  department?: AgencyDepartment;
  location?: AgencyLocation;
  /** Materials that belongs to this placement */
  materials: Material[];
  sublocation?: AgencySublocation;
}