import { z } from "zod";

export const SourceKindSchema = z.enum([
  "forbes",
  "sec",
  "opensecrets",
  "panama_papers",
  "pandora_papers",
  "manual",
  "other",
]);

export const SourceClaimSchema = z.object({
  source: SourceKindSchema,
  url: z.string().url().optional(),
  retrievedAt: z.string().date().optional(),
  note: z.string().optional(),
});

export type SourceKind = z.infer<typeof SourceKindSchema>;
export type SourceClaim = z.infer<typeof SourceClaimSchema>;
