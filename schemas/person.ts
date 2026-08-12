import { z } from "zod";
import { SourceClaimSchema } from "./source.js";

export const WealthSourceSchema = z.enum([
  "tech",
  "energy",
  "finance",
  "inheritance",
  "real_estate",
  "retail",
  "manufacturing",
  "media",
  "healthcare",
  "commodities",
  "diversified",
  "other",
]);

export const PersonStatusSchema = z.enum(["living", "deceased"]);

/** Year-only or full ISO date, with optional precision hint. */
export const FuzzyDateSchema = z.object({
  date: z.string().min(4),
  precision: z.enum(["year", "month", "day"]).optional(),
});

export const PersonNameSchema = z.object({
  full: z.string().min(1),
  given: z.string().optional(),
  family: z.string().optional(),
});

export const PersonSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id must be a kebab-case slug"),
  name: PersonNameSchema,
  status: PersonStatusSchema,
  birth: FuzzyDateSchema.optional(),
  death: FuzzyDateSchema.optional(),
  citizenship: z.array(z.string().length(2)).default([]),
  residenceCountries: z.array(z.string().length(2)).default([]),
  primaryWealthSource: WealthSourceSchema,
  summary: z.string().optional(),
  aliases: z.array(z.string()).default([]),
  sources: z.array(SourceClaimSchema).default([]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type WealthSource = z.infer<typeof WealthSourceSchema>;
export type PersonStatus = z.infer<typeof PersonStatusSchema>;
export type FuzzyDate = z.infer<typeof FuzzyDateSchema>;
export type PersonName = z.infer<typeof PersonNameSchema>;
export type Person = z.infer<typeof PersonSchema>;
