import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";
import {
  AssetListSchema,
  HoldingSchema,
  NetWorthSnapshotListSchema,
  OrganizationSchema,
  PersonSchema,
  RelationshipSchema,
} from "../schemas/index.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(root, "data");

type Check = {
  dir: string;
  schema: z.ZodTypeAny;
  /** When true, the JSON file is an array of entities. */
  list?: boolean;
};

const checks: Check[] = [
  { dir: "people", schema: PersonSchema },
  { dir: "assets", schema: AssetListSchema, list: true },
  { dir: "organizations", schema: OrganizationSchema },
  { dir: "holdings", schema: HoldingSchema },
  { dir: "net-worth", schema: NetWorthSnapshotListSchema, list: true },
  { dir: "relationships", schema: RelationshipSchema },
];

async function listJsonFiles(dir: string): Promise<string[]> {
  const absolute = path.join(dataRoot, dir);
  let entries: string[];
  try {
    entries = await readdir(absolute);
  } catch (error) {
    const err = error as NodeJS.ErrnoException;
    if (err.code === "ENOENT") return [];
    throw error;
  }
  return entries
    .filter((name) => name.endsWith(".json"))
    .map((name) => path.join(absolute, name))
    .sort();
}

async function validateFile(
  filePath: string,
  schema: z.ZodTypeAny,
): Promise<string | null> {
  const raw = await readFile(filePath, "utf8");
  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return `${filePath}: invalid JSON (${message})`;
  }

  const result = schema.safeParse(json);
  if (result.success) return null;

  const details = result.error.issues
    .map((issue) => {
      const where = issue.path.length ? issue.path.join(".") : "(root)";
      return `  - ${where}: ${issue.message}`;
    })
    .join("\n");

  return `${filePath}:\n${details}`;
}

async function main(): Promise<void> {
  const errors: string[] = [];
  let filesChecked = 0;

  for (const check of checks) {
    const files = await listJsonFiles(check.dir);
    for (const file of files) {
      filesChecked += 1;
      const error = await validateFile(file, check.schema);
      if (error) errors.push(error);
    }
  }

  if (errors.length > 0) {
    console.error(`Validation failed (${errors.length} file(s)):\n`);
    for (const error of errors) {
      console.error(error);
      console.error("");
    }
    process.exit(1);
  }

  console.log(`Validated ${filesChecked} file(s) under data/ — all OK.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
