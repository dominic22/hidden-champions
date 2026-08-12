import { z } from "zod";
import { SourceClaimSchema } from "./source.js";

export const StakeTypeSchema = z.enum([
  "controlling",
  "significant",
  "minority",
  "unknown",
]);

export const HoldingRoleSchema = z.enum([
  "founder",
  "chair",
  "board",
  "ceo",
  "investor",
  "owner",
  "other",
]);

export const HoldingSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id must be a kebab-case slug"),
  personId: z.string().min(1),
  organizationId: z.string().min(1),
  stakeType: StakeTypeSchema,
  ownershipPercent: z.number().min(0).max(100).optional(),
  role: HoldingRoleSchema.optional(),
  asOf: z.string().date().optional(),
  sources: z.array(SourceClaimSchema).default([]),
});

export type StakeType = z.infer<typeof StakeTypeSchema>;
export type HoldingRole = z.infer<typeof HoldingRoleSchema>;
export type Holding = z.infer<typeof HoldingSchema>;
