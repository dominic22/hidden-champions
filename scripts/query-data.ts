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
  type Asset,
  type Holding,
  type NetWorthSnapshot,
  type Organization,
  type Person,
  type Relationship,
} from "../schemas/index.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dataRoot = path.join(root, "data");

const MODEL_NAMES = [
  "people",
  "assets",
  "organizations",
  "holdings",
  "net-worth",
  "relationships",
] as const;

type ModelName = (typeof MODEL_NAMES)[number];

type ModelConfig = {
  dir: string;
  schema: z.ZodTypeAny;
  /** When true, the JSON file is an array of entities. */
  list?: boolean;
};

const models: Record<ModelName, ModelConfig> = {
  people: { dir: "people", schema: PersonSchema },
  assets: { dir: "assets", schema: AssetListSchema, list: true },
  organizations: { dir: "organizations", schema: OrganizationSchema },
  holdings: { dir: "holdings", schema: HoldingSchema },
  "net-worth": {
    dir: "net-worth",
    schema: NetWorthSnapshotListSchema,
    list: true,
  },
  relationships: { dir: "relationships", schema: RelationshipSchema },
};

function isModelName(value: string): value is ModelName {
  return (MODEL_NAMES as readonly string[]).includes(value);
}

function usage(): never {
  console.error(`Usage:
  npm run query
  npm run query -- --model <${MODEL_NAMES.join("|")}>
  npm run query -- --person <id>
  npm run query -- --model <model> --person <id>
  npm run query -- --search <name>
  npm run search-people -- <name>`);
  process.exit(1);
}

function parseArgs(argv: string[]): {
  model?: ModelName;
  person?: string;
  search?: string;
} {
  let model: ModelName | undefined;
  let person: string | undefined;
  let search: string | undefined;

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--model") {
      const value = argv[++i];
      if (!value || !isModelName(value)) {
        console.error(
          `Unknown or missing --model. Expected one of: ${MODEL_NAMES.join(", ")}`,
        );
        usage();
      }
      model = value;
      continue;
    }
    if (arg === "--person") {
      const value = argv[++i];
      if (!value) {
        console.error("Missing value for --person");
        usage();
      }
      person = value;
      continue;
    }
    if (arg === "--search") {
      const value = argv[++i];
      if (!value) {
        console.error("Missing value for --search");
        usage();
      }
      search = value;
      continue;
    }
    if (arg === "--help" || arg === "-h") usage();
    // Bare leftover token = search query (for `npm run search-people -- musk`)
    if (!arg.startsWith("-") && !search && !model && !person) {
      search = arg;
      continue;
    }
    console.error(`Unknown argument: ${arg}`);
    usage();
  }

  return { model, person, search };
}

function personMatchesSearch(person: Person, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return false;

  const haystack = [
    person.id,
    person.name.full,
    person.name.given,
    person.name.family,
    ...person.aliases,
  ]
    .filter((value): value is string => Boolean(value))
    .map((value) => value.toLowerCase());

  return haystack.some((value) => value.includes(q));
}

async function searchPeople(query: string): Promise<
  Array<{
    id: string;
    name: Person["name"];
    aliases: string[];
    primaryWealthSource: Person["primaryWealthSource"];
    status: Person["status"];
  }>
> {
  const people = (await loadModel("people")) as Person[];
  return people
    .filter((person) => personMatchesSearch(person, query))
    .map((person) => ({
      id: person.id,
      name: person.name,
      aliases: person.aliases,
      primaryWealthSource: person.primaryWealthSource,
      status: person.status,
    }));
}

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

async function readJson(filePath: string): Promise<unknown> {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as unknown;
}

async function loadModel(name: ModelName): Promise<unknown[]> {
  const config = models[name];
  const files = await listJsonFiles(config.dir);
  const items: unknown[] = [];

  for (const filePath of files) {
    const json = await readJson(filePath);
    const parsed = config.schema.safeParse(json);
    if (!parsed.success) {
      const details = parsed.error.issues
        .map((issue) => {
          const where = issue.path.length ? issue.path.join(".") : "(root)";
          return `  - ${where}: ${issue.message}`;
        })
        .join("\n");
      throw new Error(`${filePath}:\n${details}`);
    }

    if (config.list) {
      items.push(...(parsed.data as unknown[]));
    } else {
      items.push(parsed.data);
    }
  }

  return items;
}

function filterPeople(items: Person[], personId: string): Person[] {
  return items.filter((item) => item.id === personId);
}

function filterAssets(items: Asset[], personId: string): Asset[] {
  return items.filter((item) => item.ownerPersonId === personId);
}

function filterNetWorth(
  items: NetWorthSnapshot[],
  personId: string,
): NetWorthSnapshot[] {
  return items.filter((item) => item.personId === personId);
}

function filterHoldings(items: Holding[], personId: string): Holding[] {
  return items.filter((item) => item.personId === personId);
}

function filterRelationships(
  items: Relationship[],
  personId: string,
): Relationship[] {
  return items.filter(
    (item) =>
      (item.from.kind === "person" && item.from.id === personId) ||
      (item.to.kind === "person" && item.to.id === personId),
  );
}

function filterOrganizationsForPerson(
  organizations: Organization[],
  holdings: Holding[],
  personId: string,
): Organization[] {
  const orgIds = new Set(
    holdings
      .filter((holding) => holding.personId === personId)
      .map((holding) => holding.organizationId),
  );
  return organizations.filter((org) => orgIds.has(org.id));
}

function filterModel(
  name: ModelName,
  items: unknown[],
  personId: string,
  holdings: Holding[],
): unknown[] {
  switch (name) {
    case "people":
      return filterPeople(items as Person[], personId);
    case "assets":
      return filterAssets(items as Asset[], personId);
    case "net-worth":
      return filterNetWorth(items as NetWorthSnapshot[], personId);
    case "holdings":
      return filterHoldings(items as Holding[], personId);
    case "relationships":
      return filterRelationships(items as Relationship[], personId);
    case "organizations":
      return filterOrganizationsForPerson(
        items as Organization[],
        holdings,
        personId,
      );
  }
}

async function personExists(personId: string): Promise<boolean> {
  const people = (await loadModel("people")) as Person[];
  return people.some((person) => person.id === personId);
}

async function loadAll(): Promise<Record<ModelName, unknown[]>> {
  const result = {} as Record<ModelName, unknown[]>;
  for (const name of MODEL_NAMES) {
    result[name] = await loadModel(name);
  }
  return result;
}

async function loadPersonProfile(personId: string) {
  if (!(await personExists(personId))) {
    console.error(`Person not found: ${personId}`);
    process.exit(1);
  }

  const [people, assets, organizations, holdings, netWorth, relationships] =
    await Promise.all([
      loadModel("people") as Promise<Person[]>,
      loadModel("assets") as Promise<Asset[]>,
      loadModel("organizations") as Promise<Organization[]>,
      loadModel("holdings") as Promise<Holding[]>,
      loadModel("net-worth") as Promise<NetWorthSnapshot[]>,
      loadModel("relationships") as Promise<Relationship[]>,
    ]);

  const person = people.find((item) => item.id === personId)!;
  const personHoldings = filterHoldings(holdings, personId);

  return {
    person,
    assets: filterAssets(assets, personId),
    holdings: personHoldings,
    organizations: filterOrganizationsForPerson(
      organizations,
      holdings,
      personId,
    ),
    netWorth: filterNetWorth(netWorth, personId),
    relationships: filterRelationships(relationships, personId),
  };
}

async function main(): Promise<void> {
  const { model, person, search } = parseArgs(process.argv.slice(2));

  if (search) {
    if (model || person) {
      console.error("--search cannot be combined with --model or --person");
      usage();
    }
    const matches = await searchPeople(search);
    console.log(JSON.stringify(matches, null, 2));
    if (matches.length === 0) process.exit(1);
    return;
  }

  if (!model && !person) {
    console.log(JSON.stringify(await loadAll(), null, 2));
    return;
  }

  if (!model && person) {
    console.log(JSON.stringify(await loadPersonProfile(person), null, 2));
    return;
  }

  if (model && !person) {
    console.log(JSON.stringify(await loadModel(model), null, 2));
    return;
  }

  // model + person
  if (!(await personExists(person!))) {
    console.error(`Person not found: ${person}`);
    process.exit(1);
  }

  const holdings =
    model === "organizations"
      ? ((await loadModel("holdings")) as Holding[])
      : [];
  const items = await loadModel(model!);
  const filtered = filterModel(model!, items, person!, holdings);
  console.log(JSON.stringify(filtered, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
