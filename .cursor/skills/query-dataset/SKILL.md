---
name: query-dataset
description: >-
  Query curated billionaire JSON under data/ — all models, one model, or a
  model filtered to a person (including full person profiles). Use when the
  user asks about people, assets, holdings, organizations, net worth,
  relationships, what’s in the dataset, or wants data for a specific person.
---

# Query dataset

**Pipeline:** [discover-billionaires](../discover-billionaires/SKILL.md) builds the roster → [search-people](../search-people/SKILL.md) resolves a name to an id → this skill reads curated JSON.

If the user gave a **name** (not a kebab-case id), resolve it with search-people first. If they are not in the dataset yet, discover/add them before aggregating.

```bash
npm run query
npm run query -- --model <people|assets|organizations|holdings|net-worth|relationships>
npm run query -- --person <id>
npm run query -- --model <model> --person <id>
```

## Modes

| Ask | Command |
|-----|---------|
| Everything | `npm run query` |
| One model | `npm run query -- --model holdings` |
| One model for a person | `npm run query -- --model assets --person elon-musk` |
| Full person profile | `npm run query -- --person elon-musk` |

Person ids are kebab-case slugs (`elon-musk`). Profile output matches `BillionaireRecord` in `schemas/index.ts`.

## On-disk map

| Model | Path | Person filter |
|-------|------|---------------|
| `people` | `data/people/<id>.json` | `id` |
| `assets` | `data/assets/<personId>.json` (array) | `ownerPersonId` |
| `net-worth` | `data/net-worth/<personId>.json` (array) | `personId` |
| `holdings` | `data/holdings/<id>.json` | `personId` |
| `relationships` | `data/relationships/<id>.json` | `from` or `to` is person id |
| `organizations` | `data/organizations/<id>.json` | **via holdings** `organizationId` |

Organizations are not person-scoped on disk. For a person’s companies, query holdings (or use `--model organizations --person <id>` / `--person <id>`), which joins through holdings.

## Rules

1. Run the CLI; print or summarize the JSON for the user.
2. Unknown model or missing person → CLI exits non-zero; report the error.
3. Field meanings: see [schemas/README.md](../../../schemas/README.md).
4. Fallback if CLI fails: read files using the map above; still join orgs via holdings.
