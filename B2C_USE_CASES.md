# B2C use cases

Niche consumer datasets in the same spirit as this repo’s billionaire sample: topics people already care about, where facts are public but painful to aggregate by hand — so an agent/crawl pipeline earns its keep.

**Customer focus:** enthusiasts / fans / collectors / curious consumers — not B2B compliance or Handwerk.

Every candidate must pass the gate in [.cursor/skills/evaluate-use-cases/SKILL.md](.cursor/skills/evaluate-use-cases/SKILL.md). No pseudo-ideas as “Pass”.

German B2B (Handwerk & KMU): [B2B_GER_USE_CASES.md](B2B_GER_USE_CASES.md).

## Summary

**Pass (thin — intentional)**

- **Billionaire / UHNW roster + assets + ties** — working sample for this repo (curated people, holdings, relationships with provenance).
- **Who owns the brands you use** — brand-first map to parents / controllers, built for shareable consumer questions after M&A noise.

**Failed at the gate (among others)**

- Pokémon TCG, superyachts, jets, watches — huge niches, but dominant aggregators already answer the job.
- Sports-team owners, media “who funds the news,” shadow kingmakers — either incumbents/chat suffice or sources/inclusion collapse.

**Honest read:** Shape examples (Pokémon, yachts) teach the bar — big enough + agent-aggregable — then die on question 5 unless you own a join the incumbents skip. Prefer two hard Passes over a fake portfolio.

## Gate

1. Are the data publicly available (or cleanly licensable)?
2. Buildable with agent/crawl aggregation — or wishful thinking?
3. Is the niche big enough that enough people would pay (or convert at scale)?
4. Why pay — what hand work or bad incumbent UX does this replace?
5. Could ChatGPT/Gemini or a dominant aggregator already answer this well enough?

---

## Pass

### 1. Billionaire / UHNW roster + assets + relationships (sample)

|                                   |                                                                                                                                                                                                          |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Customer**                      | Curious consumers and “wealth watchers” who already follow Forbes/Bloomberg names and want the stack behind a person — companies, major assets, ties — not a one-line net-worth rank                     |
| **Job**                           | Recurring: “What does this person actually own / control, and who are they tied to?” across many names over time                                                                                         |
| **Today**                         | Forbes list + tab-hopping SEC, press, yacht/jet gossip, Wikipedia; ChatGPT for a single biography                                                                                                        |
| **Pay reason**                    | Saves rebuilding the same multi-source dossier; freemium/shareable profiles and change alerts beat unpaid list pages when joins + sources are the product                                                |
| **Data**                          | Forbes/Bloomberg lists, SEC ownership, company registries, reputable press for notable assets; **gaps:** true private wealth, unverified lifestyle claims, offshore opacity                              |
| **Why not a chatbot / incumbent** | Chat drafts one bio well; Forbes owns the _rank_. Neither is a maintained multi-person roster with stable IDs, sourced asset/relationship joins, and diffs — the agent-aggregation job this repo samples |

**Gate**

1. Public: yes (lists, filings, registries, press); not a secret ledger.
2. Buildable: yes — entities/joins match `data/people`, holdings, relationships; refresh = agent + editorial QA.
3. Niche size: yes — mass curiosity; convert via freemium / viral profiles, not enterprise seats.
4. Why pay: time + trust (sourced joins) vs. hunting 15 tabs per person.
5. Chat/incumbent: insufficient for bulk roster + provenance + ongoing diffs.

**Not building as:** luxury-porn gallery with no entities; unverifiable “hidden network” claims.

---

### 2. Who owns the brands you use

|                                   |                                                                                                                                                                                                  |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Customer**                      | Everyday consumers who recognize brands/apps/employers and ask “who actually owns this?” after acquisitions, boycotts, or feed drama                                                             |
| **Job**                           | Start from a familiar brand → parent chain → controlling person/org; compare across a basket of brands people already use                                                                        |
| **Today**                         | Google + Wikipedia “parent company,” conflicting headlines, one-off ChatGPT answers, or pro tools (OpenCorporates) with analyst UX                                                               |
| **Pay reason**                    | Fast, brand-first answers with sources and “what changed” after deal waves — without learning a registry product                                                                                 |
| **Data**                          | SEC / corporate filings, registries, official brand/parent disclosures, reputable M&A press; **gaps:** opaque private beneficial owners, complex minority/voting structures easy to oversimplify |
| **Why not a chatbot / incumbent** | Chat is fine for one brand and goes stale; registry products aren’t consumer-shaped. No strong brand-first consumer product that keeps provenance + change feed across many everyday names       |

**Gate**

1. Public: yes for major chains; name what’s missing (true UBO in private trees).
2. Buildable: yes — brand → org → controller joins; agent refresh on M&A; known oversimplification risk.
3. Niche size: yes — universal brand recognition, not a tiny fandom.
4. Why pay: replace repeated tab-hopping / argument threads with a sourced map.
5. Chat/incumbent: one-shot and pro-registry UX don’t cover the consumer job.

**Not building as:** full PE diligence SaaS; gotcha journalism without filings.

---

## Rejected

| Idea                                     | Fail | Note                                                                              |
| ---------------------------------------- | ---- | --------------------------------------------------------------------------------- |
| Pokémon TCG sets / prices / population   | 5    | TCGPlayer, PriceCharting, Bulbapedia already own the job                          |
| Superyacht directory / specs / tracking  | 5    | SuperYacht Times, Yacht Harbour & peers dominate; yacht↔owner alone isn’t a wedge |
| Private jet / ADS-B “who’s flying”       | 5    | ADS-B Exchange / FlightAware are the aggregators                                  |
| Watch secondary market                   | 5    | Chrono24 (and similar) own consumer price discovery                               |
| Sports team “who owns my club”           | 5    | Wikipedia, league coverage, beat press already answer fan questions               |
| Media outlet funding / narrative control | 2, 5 | Contested attribution; chat + existing media-literacy products cover casual use   |
| Shadow influencers / kingmakers          | 1, 2 | Inclusion criteria fuzzy; public sources thin vs. celebrity rosters               |
| Power dynasties / “nepo” graphs          | 2, 5 | Clan boundaries fuzzy; one-family briefings are a chat strength                   |
| Institutional funding / foundations      | 3    | Real data, weak _consumer_ pay — more journalist/NGO                              |
| Corporate control chains / shells        | 3    | Specialist audience, not a B2C hobby niche                                        |
| Private capital operators (PE/VC)        | 3, 5 | Low casual recognition; Crunchbase-class tools own operators                      |
| HQ vs. tax geography                     | 3, 4 | Abstract without a named consumer job or pay hook                                 |

---

## Next bets

1. **Ship the sample** — deepen billionaire people → holdings → relationships with strict provenance (this repo).
2. **Pilot brand→owner** — small basket of consumer-facing brands, M&A change feed, cite filings; kill it if chat + Wikipedia close the loop in user tests.
3. No new Pass rows without a fresh gate pass (sources + niche size + explicit “why not chat/incumbent”).

export type AgentSEOCoachRequestOptions =
| { numMessages?: number; }
| { testCases: SEOTestCase[];};
