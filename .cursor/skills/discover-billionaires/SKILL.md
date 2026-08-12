---
name: discover-billionaires
description: >-
  Discover and curate the billionaire roster (people stubs in data/people)
  from public lists before aggregating assets, holdings, or relationships.
  Use when building the hidden-champions list, adding new billionaires from
  Forbes or similar sources, expanding coverage, or when the user asks to
  find/list billionaires to track — not for querying already-enriched profiles.
---

# Discover billionaires

**Pipeline order:** discover roster → then aggregate per person. Do not invent assets, holdings, orgs, or relationships in this step.

```text
1. discover-billionaires  → data/people/<id>.json (+ optional net-worth stub)
2. search-people          → resolve name → id (local)
3. query-dataset / enrich → assets, orgs, holdings, relationships
```

## Goal

Grow the curated set of people with **$1B+ net worth**. Each discovery pass only adds or updates **Person** identity records (and optionally a net-worth snapshot). Aggregation comes later.

## Sources (prefer in order)

1. Forbes Real-Time Billionaires / World’s Billionaires (primary)
2. Bloomberg Billionaires Index (cross-check)
3. Reliable secondary profiles only to fill identity fields

Use WebSearch / WebFetch. Cite the list URL and as-of date in `sources[]`. Do not scrape behind logins or dump unverified pages into `data/`.

## Workflow

1. **See who we already have:** `npm run query -- --model people` (or `npm run search-people -- <name>`).
2. **Pull candidates** from a source list (name, approx net worth, country, wealth source).
3. **Filter:** keep only ≥ $1B USD (or explicit user scope). Skip anyone already in `data/people` unless updating identity/sources.
4. **Add Person stubs** only — see template below. Id = kebab-case from the common English name (`elon-musk`).
5. **Optional:** one `data/net-worth/<id>.json` snapshot from the same list row (with `sources`).
6. **Do not** create assets, organizations, holdings, or relationships in this skill.
7. Run `npm run validate`.
8. Report: added / skipped (already present) / deferred (under $1B or weak source).

## Person stub template

Write `data/people/<id>.json`:

```json
{
  "id": "kebab-case-name",
  "name": { "full": "Full Name", "given": "Given", "family": "Family" },
  "status": "living",
  "citizenship": ["US"],
  "residenceCountries": [],
  "primaryWealthSource": "tech",
  "summary": "One short line from the source list.",
  "aliases": [],
  "sources": [
    {
      "source": "forbes",
      "url": "https://www.forbes.com/...",
      "note": "World’s Billionaires / real-time list; as-of YYYY-MM-DD"
    }
  ],
  "createdAt": "ISO-8601",
  "updatedAt": "ISO-8601"
}
```

`primaryWealthSource` must be one of: `tech`, `energy`, `finance`, `inheritance`, `real_estate`, `retail`, `manufacturing`, `media`, `healthcare`, `commodities`, `diversified`, `other`.

Field rules: [schemas/README.md](../../../schemas/README.md). Sample: `data/people/elon-musk.json`.

## After discovery

- Name → id: [search-people](../search-people/SKILL.md)
- Read curated data: [query-dataset](../query-dataset/SKILL.md)
- Enrichment (assets, holdings, …) is a **separate** pass — not this skill.
