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

export type ChampionDetail = {
  person: PersonRecord;
  netWorth: NetWorthSnapshot[];
  latest: NetWorthSnapshot | null;
};

function dataRoot(): string {
  // Runtime path — avoid path.join(dir, dynamic) so Turbopack does not glob data/.
  return (
    process.env.HIDDEN_CHAMPIONS_DATA ??
    path.resolve(process.cwd(), "..", "data")
  );
}

async function readJson<T>(filePath: string): Promise<T> {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw) as T;
}

function latestSnapshot(snapshots: NetWorthSnapshot[]): NetWorthSnapshot | null {
  if (snapshots.length === 0) return null;
  return snapshots.reduce((best, next) =>
    next.asOf > best.asOf ? next : best,
  );
}

export const getChampions = cache(async (): Promise<ChampionSummary[]> => {
  const root = dataRoot();
  const peopleDir = `${root}/people`;
  const files = await readdir(peopleDir);
  const jsonFiles = files.filter((f) => f.endsWith(".json"));

  const champions = await Promise.all(
    jsonFiles.map(async (file) => {
      const person = await readJson<PersonRecord>(`${peopleDir}/${file}`);
      let latest: NetWorthSnapshot | null = null;
      try {
        const snapshots = await readJson<NetWorthSnapshot[]>(
          `${root}/net-worth/${person.id}.json`,
        );
        latest = latestSnapshot(snapshots);
      } catch {
        latest = null;
      }

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
    let person: PersonRecord;
    try {
      person = await readJson<PersonRecord>(`${root}/people/${id}.json`);
    } catch {
      return null;
    }

    let netWorth: NetWorthSnapshot[] = [];
    try {
      netWorth = await readJson<NetWorthSnapshot[]>(
        `${root}/net-worth/${id}.json`,
      );
    } catch {
      netWorth = [];
    }

    return {
      person,
      netWorth,
      latest: latestSnapshot(netWorth),
    };
  },
);
