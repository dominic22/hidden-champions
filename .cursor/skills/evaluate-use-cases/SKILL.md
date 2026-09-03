---
name: evaluate-use-cases
description: >-
  Gate proposed B2C niche-dataset product ideas with five skepticism questions
  (public data, agent-aggregable, niche size, willingness to pay, not a chatbot
  or incumbent). Use when writing or revising B2C_USE_CASES.md, brainstorming
  consumer niches in the spirit of the billionaires sample, or when the user
  asks whether a use case is real vs. wishful.
---

# Evaluate B2C use cases

Do **not** invent pseudo use cases. After you draft a candidate, you must answer all five questions below in writing. If any answer fails, **reject or demote** the use case — do not keep it as a “next bet” to sound complete.

## Scope

- **B2C only** — enthusiasts, hobbyists, fans, collectors, or curious consumers of a topic.
- **Working sample:** this repo’s billionaire / “hidden champions” list — a curated roster plus joins across scattered public sources.
- **Target file:** [B2C_USE_CASES.md](../../../B2C_USE_CASES.md) only. Do not edit or pad other use-case docs from this skill.
- For German B2B (Handwerk & KMU), use [evaluate-use-cases-ger](../evaluate-use-cases-ger/SKILL.md).

## Niche bar (before the gate)

A niche can be specific, but not tiny.

| Pass | Fail |
|---|---|
| Large hobby / fandom / status market with recurring questions (e.g. Pokémon cards & sets, yachts & owners, billionaire assets) | Ultra-local clubs, one-off events, or audiences too small to sustain any product |
| Enough public facts that **hand aggregation is painful** and an **AI agent / crawler pipeline** earns its keep | One Wikipedia page, one official ranking, or a single spreadsheet already does it |
| Room to differentiate even if big players exist — better joins, fresher diffs, provenance, filters they don’t offer | Commodity topic already owned end-to-end by a dominant free/paid product with nothing left to join |

**Incumbents are a warning, not an automatic fail.** Pokémon and yachts are valid *shape* examples (lots of public-but-scattered data) — still fail the gate if a chat prompt or an existing aggregator already answers the job.

## When this applies

- Editing or creating [B2C_USE_CASES.md](../../../B2C_USE_CASES.md)
- Brainstorming “hidden-champions-shaped” consumer niches
- User pushback like “too hypothetical”, “where does the data come from?”, “would anyone pay?”, “isn’t that just ChatGPT?”

## Gate (required after every candidate)

```text
1. Are the data for this publicly available (or cleanly licensable)?
2. Is the use case actually buildable with agent/crawl aggregation — or wishful thinking?
3. Is the niche big enough that enough people would pay (or convert at scale)?
4. Why would they pay — what painful hand work or bad incumbent UX does this replace?
5. Could ChatGPT/Gemini (or an existing dominant aggregator) answer this well enough already?
```

### How to judge

| # | Pass | Fail |
|---|---|---|
| 1 | You can name concrete sources and what’s *not* in them | “We’ll enrich somehow”; private networks; data you can’t legally get |
| 2 | Clear entities, join keys, refresh path, known gaps; agent/crawl beats manual copy-paste | Magic joins, perfect coverage, or unverifiable “who really controls X” |
| 3 | Named enthusiast type + plausible volume (fandom, collectors, status topic) | Niche so small that “someone might find it cool” is the whole story |
| 4 | Time saved, better decisions (buy/sell/follow), or status curiosity with a recurring job — one concrete sentence | Vague “insights” / “transparency” with no consumer pain |
| 5 | Needs bulk roster, ongoing diffs, provenance, stable IDs, cross-source joins — chat/incumbent isn’t enough | One-off briefing a model drafts well, or a site that already owns the niche |

**Rule:** All five must pass. Soft “maybe” on 3–4 without a real consumer story → reject. Fail on 5 → reject even if the topic is interesting.

## Output shape for each kept use case

Keep only candidates that pass. For each:

1. **Customer** — who (role / hobby) + why they care about this niche  
2. **Job** — situation they already have (recurring question or workflow)  
3. **Today** — what they do without us (forums, spreadsheets, big incumbent, chat)  
4. **Pay reason** — answer to question 4  
5. **Data** — answer to question 1 (sources + gaps); note why hand aggregation fails  
6. **Why not a chatbot / incumbent** — answer to question 5  

For rejected ideas, keep a short **Rejected** table: idea + which gate failed (1–5).

## Anti-patterns

- Filling a quota of use cases so the doc looks strategic  
- Niches that are cool but audience is a handful of obsessives  
- Topics where one official list or wiki is enough  
- Copying a niche that big players already own unless you can name the join/diff they lack  
- B2B / compliance / registry products (wrong skill)  
- “Network maps” with no cited edge sources  
- Lifestyle envy as the only hook with no aggregable entities  

## Related files

- B2C niches: `B2C_USE_CASES.md`  
- Sample dataset pattern: this repo (`data/people`, assets, holdings, relationships)  
- German B2B: use `evaluate-use-cases-ger` → `B2B_GER_USE_CASES.md`
