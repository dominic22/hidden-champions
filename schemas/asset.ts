import { z } from "zod";
import { SourceClaimSchema } from "./source.js";

export const AssetCategorySchema = z.enum([
  "primary_residence",
  "vacation_home",
  "mansion",
  "private_island",
  "rental_property",
  "commercial_real_estate",
  "planned_community",
  "vehicle",
  "boat",
  "superyacht",
  "private_jet",
  "helicopter",
  "art",
  "jewelry_watch",
  "collectible",
  "club_membership",
  "vineyard_distillery",
  "other",
]);

export const LocationSchema = z.object({
  label: z.string().optional(),
  city: z.string().optional(),
  region: z.string().optional(),
  country: z.string().length(2).optional(),
});

const AssetBaseSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id must be a kebab-case slug"),
  ownerPersonId: z.string().min(1),
  name: z.string().min(1),
  estimatedValueUsd: z.number().nonnegative().optional(),
  location: LocationSchema.optional(),
  notes: z.string().optional(),
  sources: z.array(SourceClaimSchema).default([]),
});

const ResidenceDetailsSchema = z
  .object({
    propertyType: z.string().optional(),
    sizeSqFt: z.number().positive().optional(),
  })
  .passthrough();

const VehicleDetailsSchema = z
  .object({
    make: z.string().optional(),
    model: z.string().optional(),
    year: z.number().int().optional(),
  })
  .passthrough();

const VesselDetailsSchema = z
  .object({
    lengthMeters: z.number().positive().optional(),
    builder: z.string().optional(),
  })
  .passthrough();

const AircraftDetailsSchema = z
  .object({
    aircraftType: z.string().optional(),
    tailNumber: z.string().optional(),
  })
  .passthrough();

const CollectionDetailsSchema = z
  .object({
    artistOrMaker: z.string().optional(),
    year: z.number().int().optional(),
  })
  .passthrough();

const ClubDetailsSchema = z
  .object({
    clubName: z.string().optional(),
    membershipType: z.string().optional(),
  })
  .passthrough();

export const AssetSchema = z.discriminatedUnion("category", [
  AssetBaseSchema.extend({
    category: z.literal("primary_residence"),
    details: ResidenceDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("vacation_home"),
    details: ResidenceDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("mansion"),
    details: ResidenceDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("private_island"),
    details: ResidenceDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("rental_property"),
    details: ResidenceDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("commercial_real_estate"),
    details: ResidenceDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("planned_community"),
    details: ResidenceDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("vehicle"),
    details: VehicleDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("boat"),
    details: VesselDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("superyacht"),
    details: VesselDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("private_jet"),
    details: AircraftDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("helicopter"),
    details: AircraftDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("art"),
    details: CollectionDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("jewelry_watch"),
    details: CollectionDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("collectible"),
    details: CollectionDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("club_membership"),
    details: ClubDetailsSchema.optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("vineyard_distillery"),
    details: z.record(z.unknown()).optional(),
  }),
  AssetBaseSchema.extend({
    category: z.literal("other"),
    details: z.record(z.unknown()).optional(),
  }),
]);

export const AssetListSchema = z.array(AssetSchema);

export type AssetCategory = z.infer<typeof AssetCategorySchema>;
export type Location = z.infer<typeof LocationSchema>;
export type Asset = z.infer<typeof AssetSchema>;
