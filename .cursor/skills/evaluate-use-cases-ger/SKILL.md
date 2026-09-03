---
name: evaluate-use-cases-ger
description: >-
  Gate proposed German B2B product or dataset use cases (Handwerk & KMU) with
  five skepticism questions (public data, feasibility, willingness to pay, why
  pay, not a chatbot). Use when writing or revising B2B_GER_USE_CASES.md,
  brainstorming commercial angles for German small-business buyers, or when the
  user asks whether a DE B2B use case is real vs. wishful.
---

# Evaluate German B2B use cases

Do **not** invent pseudo use cases. After you draft a candidate, you must answer all five questions below in writing. If any answer fails, **reject or demote** the use case — do not keep it as a “next bet” to sound complete.

## Scope

- **German B2B only** — crafts and small businesses (**Handwerk & KMU**), typically owner-operators without a compliance team.
- **Not in scope unless the user explicitly changes it:** banks/GwG, corporate PA/lobby, PE/holding diligence, NGO campaign tools, consumer/B2C niches.
- **Target file:** [B2B_GER_USE_CASES.md](../../../B2B_GER_USE_CASES.md) only.
- For B2C niche datasets (Pokémon-shaped, billionaires sample, etc.), use [evaluate-use-cases](../evaluate-use-cases/SKILL.md) → `B2C_USE_CASES.md`.

Prefer a **thin Pass list** over padding. A honest short doc beats a strategic fairy tale.

## When this applies

- Editing or creating [B2B_GER_USE_CASES.md](../../../B2B_GER_USE_CASES.md)
- Brainstorming who in German Handwerk/KMU would buy aggregated public data
- User pushback like “too hypothetical”, “where does the data come from?”, “would anyone pay?”

## Gate (required after every candidate)

```text
1. Are the data for this publicly available (or cleanly licensable)?
2. Is the use case actually buildable, or wishful thinking?
3. Would a Handwerker / small-business owner pay money for this?
4. Why would they pay for it?
5. Could ChatGPT or Gemini answer this in a single prompt?
```

### How to judge

| # | Pass | Fail |
|---|---|---|
| 1 | You can name concrete DE sources and what’s *not* in them | “We’ll enrich somehow”; secret networks; data you can’t legally get |
| 2 | Clear workflow, entities, refresh path, known gaps | Requires magic joins, perfect coverage, or behavior change you’ve never seen |
| 3 | Named buyer (Meister, Bürokraft, Inhaber) with budget today — tool, lookup fee, or project | “Someone might find it useful”; selling enterprise PA/compliance to Handwerk |
| 4 | Time saved, Auftrag won, or risk avoided — in one concrete sentence | Vague “insights” / “Transparenz” with no owner-operator pain |
| 5 | Needs bulk, diffs, provenance, multi-portal monitoring, or system-of-record — chat is not enough | One-off briefing a model already drafts well enough |

**Price check (required with question 3):** Would an owner-operator pay **€9–29/month** or a **few euros per lookup** without training and without a compliance team? If no → **fail question 3**.

**Rule:** All five must pass. Soft “maybe” on 3–4 without a real buyer story → reject. Fail on 5 → reject even if the topic is interesting.

## Output shape for each kept use case

Keep only candidates that pass. For each:

1. **Kunde** — Rolle + Betriebstyp (Handwerk/KMU)  
2. **Job** — Situation, die sie schon heute haben  
3. **Heute** — was sie ohne uns tun  
4. **Pay reason** — Antwort auf Frage 4  
5. **Data** — Antwort auf Frage 1 (Quellen + Lücken)  
6. **Why not a chatbot** — Antwort auf Frage 5  

For rejected ideas, keep a short **Verworfen** table: Idee + which gate failed (1–5) or “Fokus” if wrong customer.

## Anti-patterns

- Filling a quota of use cases so the doc looks strategic  
- Banking/registry/UBO ideas when scoped out — still run the gate if they ask  
- Commodity lookups already solved by North Data / Impressum / one Google search  
- “Netzwerk-Karten” with no cited edge sources  
- Assuming newsrooms or NGOs will fund a SaaS because the mission fits  
- Sliding into Konzern-PA / Lobby / DIP because “B2B Deutschland” sounds big  
- Selling Gesellschaftsauskunft to Handwerker as if they were credit analysts  

## Related files

- German B2B (this skill): `B2B_GER_USE_CASES.md`  
- B2C niches: `evaluate-use-cases` → `B2C_USE_CASES.md`
