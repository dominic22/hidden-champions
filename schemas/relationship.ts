import { z } from "zod";
import { SourceClaimSchema } from "./source.js";

export const RelationshipTypeSchema = z.enum([
  "family",
  "marriage",
  "board",
  "co_investment",
  "advisor",
  "partnership",
  "other",
]);

export const EntityRefSchema = z.object({
  kind: z.enum(["person", "organization"]),
  id: z.string().min(1),
});

export const RelationshipSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id must be a kebab-case slug"),
  type: RelationshipTypeSchema,
  from: EntityRefSchema,
  to: EntityRefSchema,
  since: z.string().optional(),
  until: z.string().optional(),
  notes: z.string().optional(),
  sources: z.array(SourceClaimSchema).default([]),
});

export type RelationshipType = z.infer<typeof RelationshipTypeSchema>;
export type EntityRef = z.infer<typeof EntityRefSchema>;
export type Relationship = z.infer<typeof RelationshipSchema>;
