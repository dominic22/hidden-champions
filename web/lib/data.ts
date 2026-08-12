import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";

export type ChampionSummary = {
  id: string;
  name: string;
  primaryWealthSource: string;
  citizenship: string[];
  status: string;
  netWorthUsd: number | null;
  rank: number | null;
  asOf: string | null;
};

export type SourceClaim = {
  source: string;
  url?: string;
  retrievedAt?: string;
  note?: string;
};

export type PersonRecord = {
  id: string;
  name: { full: string; given?: string; family?: string };
  status: string;
  birth?: { date: string; precision?: string };
  death?: { date: string; precision?: string };
  citizenship: string[];
  residenceCountries: string[];
  primaryWealthSource: string;
  summary?: string;
  aliases: string[];
  sources: SourceClaim[];
  createdAt: string;
  updatedAt: string;
};

export type NetWorthSnapshot = {
  id: string;
  personId: string;
  asOf: string;
  netWorthUsd: number;
  rank?: number;
  sources: SourceClaim[];
};

export type Location = {
  label?: string;
  city?: string;
  region?: string;
  country?: string;
};

export type AssetRecord = {
  id: string;
  ownerPersonId: string;
  name: string;
  category: string;
  estimatedValueUsd?: number;
  location?: Location;
  notes?: string;
  details?: Record<string, unknown>;
  sources: SourceClaim[];
};

export type HoldingRecord = {
  id: string;
  personId: string;
  organizationId: string;
  stakeType: string;
  ownershipPercent?: number;
  role?: string;
  asOf?: string;
  sources: SourceClaim[];
};

export type OrganizationRecord = {
  id: string;
  name: string;
  type: string;
  hqCountry?: string;
  taxDomicile?: string;
  website?: string;
  summary?: string;
  sources: SourceClaim[];
};

export type EntityRef = {
  kind: "person" | "organization";
  id: string;
};

export type RelationshipRecord = {
  id: string;
  type: string;
  from: EntityRef;
  to: EntityRef;
  since?: string;
  until?: string;
  notes?: string;
  sources: SourceClaim[];
};

export type HoldingSummary = HoldingRecord & {
  personName: string | null;
  organizationName: string | null;
};

export type RelationshipSummary = RelationshipRecord & {
  fromLabel: string;
  toLabel: string;
  fromHref: string;
  toHref: string;
};

export type ChampionDetail = {
  person: PersonRecord;
  netWorth: NetWorthSnapshot[];
  latest: NetWorthSnapshot | null;
  assets: AssetRecord[];
  holdings: HoldingSummary[];
  relationships: RelationshipSummary[];
};

export type AssetDetail = AssetRecord & {
  ownerName: string | null;
};

export type OrganizationDetail = OrganizationRecord & {
  holdings: HoldingSummary[];
  relationships: RelationshipSummary[];
};

function dataRoot(): string {
  return (
    process.env.HIDDEN_CHAMPIONS_DATA ??
    path.resolve(process.cwd(), "..", "data")
  );
}

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

async function tryReadJson<T>(filePath: string): Promise<T | null> {
  try {
    return await readJson<T>(filePath);
  } catch {
    return null;
  }
}

async function listJsonFiles(dir: string): Promise<string[]> {
  try {
    const files = await readdir(dir);
    return files.filter((f) => f.endsWith(".json"));
  } catch {
    return [];
  }
}

function latestSnapshot(snapshots: NetWorthSnapshot[]): NetWorthSnapshot | null {
  if (snapshots.length === 0) return null;
  return snapshots.reduce((best, next) =>
    next.asOf > best.asOf ? next : best,
  );
}

function entityHref(ref: EntityRef): string {
  return ref.kind === "person"
    ? `/people/${ref.id}`
    : `/organizations/${ref.id}`;
}

async function resolveEntityName(ref: EntityRef): Promise<string> {
  const root = dataRoot();
  if (ref.kind === "person") {
    const person = await tryReadJson<PersonRecord>(
      `${root}/people/${ref.id}.json`,
    );
    return person?.name.full ?? ref.id;
  }
  const org = await tryReadJson<OrganizationRecord>(
    `${root}/organizations/${ref.id}.json`,
  );
  return org?.name ?? ref.id;
}

async function loadAllHoldings(): Promise<HoldingRecord[]> {
  const root = dataRoot();
  const dir = `${root}/holdings`;
  const files = await listJsonFiles(dir);
  const holdings = await Promise.all(
    files.map((file) => readJson<HoldingRecord>(`${dir}/${file}`)),
  );
  return holdings;
}

async function loadAllRelationships(): Promise<RelationshipRecord[]> {
  const root = dataRoot();
  const dir = `${root}/relationships`;
  const files = await listJsonFiles(dir);
  return Promise.all(
    files.map((file) => readJson<RelationshipRecord>(`${dir}/${file}`)),
  );
}

async function loadAllAssets(): Promise<AssetRecord[]> {
  const root = dataRoot();
  const dir = `${root}/assets`;
  const files = await listJsonFiles(dir);
  const lists = await Promise.all(
    files.map((file) => readJson<AssetRecord[]>(`${dir}/${file}`)),
  );
  return lists.flat();
}

async function enrichHolding(holding: HoldingRecord): Promise<HoldingSummary> {
  const root = dataRoot();
  const [person, org] = await Promise.all([
    tryReadJson<PersonRecord>(`${root}/people/${holding.personId}.json`),
    tryReadJson<OrganizationRecord>(
      `${root}/organizations/${holding.organizationId}.json`,
    ),
  ]);
  return {
    ...holding,
    personName: person?.name.full ?? null,
    organizationName: org?.name ?? null,
  };
}

async function enrichRelationship(
  relationship: RelationshipRecord,
): Promise<RelationshipSummary> {
  const [fromLabel, toLabel] = await Promise.all([
    resolveEntityName(relationship.from),
    resolveEntityName(relationship.to),
  ]);
  return {
    ...relationship,
    fromLabel,
    toLabel,
    fromHref: entityHref(relationship.from),
    toHref: entityHref(relationship.to),
  };
}

function relationshipTouchesPerson(
  relationship: RelationshipRecord,
  personId: string,
): boolean {
  return (
    (relationship.from.kind === "person" &&
      relationship.from.id === personId) ||
    (relationship.to.kind === "person" && relationship.to.id === personId)
  );
}

function relationshipTouchesOrg(
  relationship: RelationshipRecord,
  organizationId: string,
): boolean {
  return (
    (relationship.from.kind === "organization" &&
      relationship.from.id === organizationId) ||
    (relationship.to.kind === "organization" &&
      relationship.to.id === organizationId)
  );
}

export const getChampions = cache(async (): Promise<ChampionSummary[]> => {
  const root = dataRoot();
  const peopleDir = `${root}/people`;
  const files = await listJsonFiles(peopleDir);

  const champions = await Promise.all(
    files.map(async (file) => {
      const person = await readJson<PersonRecord>(`${peopleDir}/${file}`);
      const snapshots =
        (await tryReadJson<NetWorthSnapshot[]>(
          `${root}/net-worth/${person.id}.json`,
        )) ?? [];
      const latest = latestSnapshot(snapshots);

      return {
        id: person.id,
        name: person.name.full,
        primaryWealthSource: person.primaryWealthSource,
        citizenship: person.citizenship ?? [],
        status: person.status,
        netWorthUsd: latest?.netWorthUsd ?? null,
        rank: latest?.rank ?? null,
        asOf: latest?.asOf ?? null,
      } satisfies ChampionSummary;
    }),
  );

  champions.sort((a, b) => {
    const rankA = a.rank ?? Number.POSITIVE_INFINITY;
    const rankB = b.rank ?? Number.POSITIVE_INFINITY;
    if (rankA !== rankB) return rankA - rankB;
    return a.name.localeCompare(b.name);
  });

  return champions;
});

export const getChampion = cache(
  async (id: string): Promise<ChampionDetail | null> => {
    const root = dataRoot();
    const person = await tryReadJson<PersonRecord>(
      `${root}/people/${id}.json`,
    );
    if (!person) return null;

    const [netWorth, assetsFile, allHoldings, allRelationships] =
      await Promise.all([
        tryReadJson<NetWorthSnapshot[]>(`${root}/net-worth/${id}.json`),
        tryReadJson<AssetRecord[]>(`${root}/assets/${id}.json`),
        loadAllHoldings(),
        loadAllRelationships(),
      ]);

    const snapshots = netWorth ?? [];
    const personHoldings = allHoldings.filter((h) => h.personId === id);
    const personRelationships = allRelationships.filter((r) =>
      relationshipTouchesPerson(r, id),
    );

    const [holdings, relationships] = await Promise.all([
      Promise.all(personHoldings.map(enrichHolding)),
      Promise.all(personRelationships.map(enrichRelationship)),
    ]);

    return {
      person,
      netWorth: [...snapshots].sort((a, b) => b.asOf.localeCompare(a.asOf)),
      latest: latestSnapshot(snapshots),
      assets: assetsFile ?? [],
      holdings,
      relationships,
    };
  },
);

export const getAsset = cache(
  async (id: string): Promise<AssetDetail | null> => {
    const assets = await loadAllAssets();
    const asset = assets.find((item) => item.id === id);
    if (!asset) return null;

    const owner = await tryReadJson<PersonRecord>(
      `${dataRoot()}/people/${asset.ownerPersonId}.json`,
    );

    return {
      ...asset,
      ownerName: owner?.name.full ?? null,
    };
  },
);

export const getHolding = cache(
  async (id: string): Promise<HoldingSummary | null> => {
    const holdings = await loadAllHoldings();
    const holding = holdings.find((item) => item.id === id);
    if (!holding) return null;
    return enrichHolding(holding);
  },
);

export const getOrganization = cache(
  async (id: string): Promise<OrganizationDetail | null> => {
    const root = dataRoot();
    const organization = await tryReadJson<OrganizationRecord>(
      `${root}/organizations/${id}.json`,
    );
    if (!organization) return null;

    const [allHoldings, allRelationships] = await Promise.all([
      loadAllHoldings(),
      loadAllRelationships(),
    ]);

    const orgHoldings = allHoldings.filter((h) => h.organizationId === id);
    const orgRelationships = allRelationships.filter((r) =>
      relationshipTouchesOrg(r, id),
    );

    const [holdings, relationships] = await Promise.all([
      Promise.all(orgHoldings.map(enrichHolding)),
      Promise.all(orgRelationships.map(enrichRelationship)),
    ]);

    return {
      ...organization,
      holdings,
      relationships,
    };
  },
);

export const getRelationship = cache(
  async (id: string): Promise<RelationshipSummary | null> => {
    const relationships = await loadAllRelationships();
    const relationship = relationships.find((item) => item.id === id);
    if (!relationship) return null;
    return enrichRelationship(relationship);
  },
);
