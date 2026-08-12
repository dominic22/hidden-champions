---
name: search-people
description: >-
  Resolve a person’s display name or alias to their kebab-case person id in
  data/people. Use when looking up someone already on the curated roster
  before person-scoped queries. Not for discovering new billionaires from
  Forbes — use discover-billionaires for that.
---

# Search people

Local lookup only: resolve **names → person ids** for people already in `data/people`. To **grow** the roster from public lists, use [discover-billionaires](../discover-billionaires/SKILL.md) first.

```bash
npm run search-people -- <name>
# same as:
npm run query -- --search <name>
```

Matches are case-insensitive substrings against `id`, `name.full`, `name.given`, `name.family`, and `aliases`.

## Workflow

1. User gives a name (not a known slug) → run search.
2. **One match** → use that `id` for `npm run query -- --person <id>` (or `--model … --person <id>`).
3. **Multiple matches** → list them (id + full name); ask which one, or pick the obvious match only if unambiguous.
4. **Zero matches** → CLI exits 1; say no curated person matched; do not invent an id.

## Examples

```bash
npm run search-people -- "Elon Musk"
npm run search-people -- musk
```

Example hit shape:

```json
[
  {
    "id": "elon-musk",
    "name": { "full": "Elon Musk", "given": "Elon", "family": "Musk" },
    "aliases": ["Elon Reeve Musk"],
    "primaryWealthSource": "tech",
    "status": "living"
  }
]
```

Then continue with the [query-dataset](../query-dataset/SKILL.md) skill using `id`.
