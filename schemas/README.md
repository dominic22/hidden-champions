# Billionaire data schemas

Normalized TypeScript + Zod schemas for curated billionaire records. Storage is split JSON under `data/`; types and validators live here.

## Entities

| Entity | File | On-disk location |
|--------|------|------------------|
| Person | `person.ts` | `data/people/<id>.json` |
| Asset | `asset.ts` | `data/assets/<personId>.json` (array) |
| Organization | `organization.ts` | `data/organizations/<id>.json` |
| Holding | `holding.ts` | `data/holdings/<id>.json` |
| NetWorthSnapshot | `net-worth.ts` | `data/net-worth/<personId>.json` (array) |
| Relationship | `relationship.ts` | `data/relationships/<id>.json` |
| SourceClaim | `source.ts` | embedded on most entities as `sources[]` |

`BillionaireRecord` in `index.ts` is a convenience view (person + related collections). Do not store one giant nested file per person — keep the split layout for merge-friendly curation.

## Design rules

- **IDs** are kebab-case slugs (`elon-musk`, `tesla`).
- **Countries** use ISO 3166-1 alpha-2 (`US`, `ZA`).
- **Physical / lifestyle wealth** → `Asset` with a `category` discriminant.
- **Companies, funds, teams, foundations, media** → `Organization` + `Holding` (not fake assets).
- **Net worth over time** → multiple `NetWorthSnapshot` rows.
- **Network edges** → `Relationship` (`from` / `to` person or organization).
- **Provenance** → attach `sources[]` (`forbes`, `sec`, `manual`, …) on factual claims.

## Asset categories vs organizations

From the project README:

- Residences, vehicles, boats, jets, art, jewelry, clubs, vineyards → **Asset**
- Controlling stakes, VC funds, sports franchises, racing teams, space companies, media companies, think tanks → **Organization** + **Holding**

## How to add a person

1. Create `data/people/<id>.json` with identity, citizenship, and `primaryWealthSource`.
2. Add assets in `data/assets/<id>.json` (JSON array; may be `[]`).
3. Add or reuse organizations under `data/organizations/`.
4. Link ownership with `data/holdings/<holding-id>.json`.
5. Add net-worth history in `data/net-worth/<id>.json` (array).
6. Optionally add `data/relationships/<id>.json` edges.
7. Run `npm run validate`.

See `data/**` for the `elon-musk` sample.

## Validation

```bash
npm install
npm run validate
npm run typecheck
```
