# B2B use cases

Commercial buyers who would pay for a **maintained, citable graph** — people ↔ organizations ↔ ownership ↔ relationships ↔ influence — when asking Gemini or ChatGPT is not enough.

German-market version: [B2B_GER_USE_CASES.md](B2B_GER_USE_CASES.md). Consumer curiosity: [USE_CASES.md](USE_CASES.md). This file is about **budget + workflow + what a chatbot cannot reliably replace**.

## Summary

- **KYB / beneficial-owner diligence** — Auditable UBO chains with sources, not a model’s best guess.
- **Sanctions & PEP network expansion** — Related parties and control links beyond flat watchlist name-match.
- **Portfolio change monitoring** — Alerts when ownership, boards, or control edges move across many entities.
- **M&A related-party graphs** — Sourced multi-hop maps around a target, exportable into the deal room.
- **Vendor parentage at scale** — Resolve ultimate parents for hundreds of suppliers, not one chat at a time.
- **Board & co-investment paths** — Query shared directors and deal edges across a set, with evidence links.
- **Newsroom evidence packs** — Pre-joined, citeable ownership/influence dossiers editors can footnote.
- **CRM graph enrichment** — Stable IDs and structured fields into bank/FO systems, refreshed on a schedule.

## Why not ChatGPT / Gemini

A general LLM is fine for a **one-off narrative** (“who is on this board?”). Buyers still need something models do not deliver as a product:

- **Coverage** — same schema across thousands of entities, not whatever the prompt remembered
- **Provenance** — every edge citeable to a filing, registry, or dated source
- **Reconciliation** — conflicts between sources resolved and versioned
- **Multi-hop queries** — “shared boards between these 200 portfolio cos” as a query, not 200 chats
- **Freshness** — diffs and alerts when control or relationships change
- **Liability posture** — audit trail for compliance and deal files (chat answers are not controls)
- **System of record** — APIs, stable IDs, CRM/KYB exports — not paste from a chat window

If the job is “write me a paragraph about X,” do not build it. If the job is “maintain a sourced graph and answer the same question the same way next quarter,” it belongs here.

## Why this order

Priority follows **cannot-fake-with-a-prompt** first: compliance-grade UBO and network risk, then monitoring and deal graphs at portfolio scale, then enrichment into existing systems. Drop anything a single chat already satisfies.

## Pattern (what sells)

Good signals:

- Clear buyer and recurring workflow
- Chat/LLM answer is insufficient (audit, scale, joins, freshness)
- Graph + sources beat a directory or a paragraph
- Budget already spent on analysts, registry lookups, or brittle scrapes

Weak signals:

- “Ask the model” is good enough for the buyer
- One-shot vanity briefings
- Unsourced or unlicensed aggregation
- Contact scraping / email finding (commodity; not our wedge)

---

## Use cases by buyer pull

### KYB / beneficial-owner diligence

Banks, fintechs, marketplaces, and enterprises need ultimate beneficial owners, control percentages, and related entities — with **sources and an audit trail**, not a fluent summary.

**For**

- Regulated spend; chat answers are not an acceptable control
- Same control-chain joins as the core data model
- High willingness to pay for accuracy, IDs, and evidence

**Against**

- Strict accuracy, provenance, and liability bar
- Crowded category (registry vendors, compliance suites)
- Licensing and update SLAs are harder than curated research

**Why not an LLM alone:** onboarding requires reproducible UBO resolution and evidence, not a probabilistic bio.

### Sanctions & PEP network expansion

Screening needs graph context: related companies, family ties, advisors, and control links that expand risk beyond exact name match on a list.

**For**

- Continuous compliance budgets
- Network expansion is the gap in flat watchlists *and* in one-shot chat lookups
- Fits relationships + org ownership already modeled

**Against**

- False positives are costly; precision over coverage theater
- List hygiene and jurisdiction rules are operationally heavy
- Sales cycle is compliance-led and slow

**Why not an LLM alone:** models invent or miss related parties; compliance needs deterministic expansion from maintained edges.

### Portfolio change monitoring

PE, banks, and risk teams watching **many** companies: alert when directors, parents, UBOs, or sanctions-adjacent links change.

**For**

- Pure product gap vs. chat (no memory, no watchlist, no diffs)
- Recurring subscription shaped around monitoring
- Reuses the same graph with a time dimension

**Against**

- Needs reliable change detection and source freshness
- Alert noise destroys trust quickly
- Ops cost to keep coverage wide enough to be useful

**Why not an LLM alone:** “what changed this month across 500 entities?” is a database job, not a prompt.

### M&A related-party graphs

Corp dev, PE, and strategics need owners, boards, co-investors, and related-party structure around a target — packaged for the deal file.

**For**

- Deal teams already pay fragmented human research
- High value when multi-hop + sources are complete
- Natural fit for holdings, relationships, and control chains

**Against**

- Spiky demand unless productized as seats + monitoring
- Expectation of deep, deal-specific analyst work on top
- Competes with boutiques and internal associates

**Why not an LLM alone:** one chat can sketch a story; diligence needs exhaustive, sourced related-party coverage and exports.

### Vendor parentage at scale

Procurement and risk resolve ultimate parents and concentration behind a **vendor master** (hundreds/thousands of rows), not a single brand curiosity query.

**For**

- Batch resolution + parent graph is something chat UIs do poorly
- Ownership parentage is often missing from vendor systems
- Clear ROI after supply shocks and sanctions events

**Against**

- Full supply-chain risk also wants plants/geo/SKU data
- Procurement system integration is the hard sale
- Budget owner can be fragmented (procurement vs. risk)

**Why not an LLM alone:** pasting 800 vendor names into chat is not a control process; buyers need bulk match, IDs, and parents.

### Board & co-investment paths

Search firms, bankers, and partnerships query **paths** — shared directors, repeated co-investors, advisor overlap — across a defined set.

**For**

- Multi-hop path queries are a graph product, not a paragraph
- Differentiator vs. LinkedIn-only or CRM-only views
- Aligns with relationship-first modeling

**Against**

- Edge freshness and permission/sensitivity matter
- Smaller buyer pool than mass sales enrichment
- Must avoid becoming a generic contact database

**Why not an LLM alone:** “who connects A to B via ≤2 boards?” over a maintained corpus beats ad-hoc recall.

### Newsroom evidence packs

Investigations desks need pre-joined ownership/influence dossiers with footnotes — speed without inventing facts.

**For**

- Citeable sources are the product; chat invents citations
- Mission fit for transparent control graphs
- Strong references even if revenue is secondary

**Against**

- Thin budgets vs. finance buyers
- Expectation of journalist-grade sourcing
- Not a primary revenue engine alone

**Why not an LLM alone:** editors cannot footnote a hallucination; they need stable evidence packs.

### CRM graph enrichment (wealth / FO / private bank)

Attach structures, kin, holdings, and advisors to known principals as **structured fields and stable IDs**, refreshed on a schedule into existing CRMs.

**For**

- Closest commercial mirror of this dataset shape
- System-of-record integration chat cannot replace
- Recurring refresh as boards and holdings move

**Against**

- Privacy and reputation risk are extreme
- Sales cycles are relationship-heavy
- Overlaps specialized wealth-data vendors

**Why not an LLM alone:** relationship managers need fields in the CRM, history, and reviewable sources — not a chat sidebar essay.

---

## Explicitly weak as B2B wedges here

Skip or de-prioritize jobs a general LLM already approximates well enough for the buyer:

- One-off company or person briefings
- Soft “competitive landscape” essays without a maintained ownership graph
- Mass email/phone enrichment
- Generic market narratives with no IDs, edges, or monitoring

---

## Closest next bets (commercial)

1. **KYB / beneficial-owner diligence** — chat is disallowed; control chains + evidence fit the model
2. **Portfolio change monitoring** — impossible to fake with prompts; forces freshness and coverage
3. **Vendor parentage at scale** — bulk + parent graph; clear “not a chatbot” workflow
