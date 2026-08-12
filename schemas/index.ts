export {
  SourceClaimSchema,
  SourceKindSchema,
  type SourceClaim,
  type SourceKind,
} from "./source.js";

export {
  FuzzyDateSchema,
  PersonNameSchema,
  PersonSchema,
  PersonStatusSchema,
  WealthSourceSchema,
  type FuzzyDate,
  type Person,
  type PersonName,
  type PersonStatus,
  type WealthSource,
} from "./person.js";

export {
  AssetCategorySchema,
  AssetListSchema,
  AssetSchema,
  LocationSchema,
  type Asset,
  type AssetCategory,
  type Location,
} from "./asset.js";

export {
  OrganizationSchema,
  OrganizationTypeSchema,
  type Organization,
  type OrganizationType,
} from "./organization.js";

export {
  HoldingRoleSchema,
  HoldingSchema,
  StakeTypeSchema,
  type Holding,
  type HoldingRole,
  type StakeType,
} from "./holding.js";

export {
  NetWorthSnapshotListSchema,
  NetWorthSnapshotSchema,
  type NetWorthSnapshot,
} from "./net-worth.js";

export {
  EntityRefSchema,
  RelationshipSchema,
  RelationshipTypeSchema,
  type EntityRef,
  type Relationship,
  type RelationshipType,
} from "./relationship.js";

import type { Asset } from "./asset.js";
import type { Holding } from "./holding.js";
import type { NetWorthSnapshot } from "./net-worth.js";
import type { Organization } from "./organization.js";
import type { Person } from "./person.js";
import type { Relationship } from "./relationship.js";

/** Convenience view — not the on-disk storage shape. */
export type BillionaireRecord = {
  person: Person;
  assets: Asset[];
  holdings: Holding[];
  organizations: Organization[];
  netWorth: NetWorthSnapshot[];
  relationships: Relationship[];
};
