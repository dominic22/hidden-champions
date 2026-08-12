import { z } from "zod";
import { SourceClaimSchema } from "./source.js";

export const NetWorthSnapshotSchema = z.object({
  id: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "id must be a kebab-case slug"),
  personId: z.string().min(1),
  asOf: z.string().date(),
  netWorthUsd: z.number().nonnegative(),
  rank: z.number().int().positive().optional(),
  sources: z.array(SourceClaimSchema).default([]),
});

export const NetWorthSnapshotListSchema = z.array(NetWorthSnapshotSchema);

export type NetWorthSnapshot = z.infer<typeof NetWorthSnapshotSchema>;
