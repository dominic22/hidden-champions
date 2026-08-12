import { z } from "zod";
import { SourceClaimSchema } from "./source.js";

export const OrganizationTypeSchema = z.enum([
  "company",
  "fund",
  "foundation",
  "sports_franchise",
  "racing_team",
  "media",
  "club",
  "think_tank",
  "space",
  "other",
]);

export const OrganizationSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id must be a kebab-case slug"),
  name: z.string().min(1),
  type: OrganizationTypeSchema,
  hqCountry: z.string().length(2).optional(),
  taxDomicile: z.string().length(2).optional(),
  website: z.string().url().optional(),
  summary: z.string().optional(),
  sources: z.array(SourceClaimSchema).default([]),
});

export type OrganizationType = z.infer<typeof OrganizationTypeSchema>;
export type Organization = z.infer<typeof OrganizationSchema>;
