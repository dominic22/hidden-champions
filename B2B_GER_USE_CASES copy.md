# B2B-Use-Cases (Deutschland)

Greifbare Verkaufssituationen im **deutschen Markt**: wer kauft, was er heute schon tut, und welchen **Nutzen** ein gepflegter, belegbarer Graph (Personen ↔ Firmen ↔ Eigentum ↔ Beziehungen) liefert — den ChatGPT/Gemini so nicht ersetzen.

Allgemein (EN): [B2B_USE_CASES.md](B2B_USE_CASES.md). Konsument: [USE_CASES.md](USE_CASES.md).

## Kurzüberblick

- **GwG-Onboarding bei FinTechs/Banken** — Wirtschaftlich Berechtigte einer GmbH in Minuten mit Beleg, nicht per Hand im Register.
- **Sanktions-Nachprüfung Compliance** — Treffer um verbundene Gesellschafter/Organe erweitern, bevor das Konto live geht.
- **PE-Portfolio wöchentlich prüfen** — 80 HoldCos: wer hat GF/Gesellschafter gewechselt?
- **Buy-Side Diligence vor LOI** — Related Parties und Holding-Kette des Targets als exportierbares Dossier.
- **Einkauf Konzern: Kreditoren-Parents** — 1.200 Lieferanten → Mutterkonzern und Länderrisiko in einer Tabelle.
- **Headhunter: AR-Netzwerk nutzen** — Kandidaten über gemeinsame Aufsichtsratsmandate im Mittelstand finden.
- **Redaktion Investigativ** — Eigentümerkette + Belege für einen Artikel in Stunden statt Tagen.
- **Private Banking CRM** — Zu bestehenden Kunden Strukturen/Familie/Beteiligungen als Felder, nicht als Chat-Text.

## Filter: greifbar genug?

Nur Use-Cases, bei denen gilt:

1. **Kunde** = Rolle + Organisationstyp (nicht „der Markt“)
2. **Heute** = was sie ohne uns schon machen (Register, Excel, Auskunftei, Praktikant)
3. **Nutzen** = Zeit, Risiko oder Deal-Qualität — in einem Satz messbar
4. **Kein Chatbot** = Bulk, Beleg, Diff oder Mehrhop — nicht „erzähl mir was über Firma X“

---

## Use-Cases

### 1. GwG-Onboarding: wirtschaftlich Berechtigte

| | |
|---|---|
| **Kunde** | Compliance / KYC-Team bei **BaFin-regulierten** Instituten und GwG-Verpflichteten: Direktbanken, Zahlungsinstitute, Neo-Broker, große Marktplätze mit Händler-Onboarding |
| **Situation** | Neukunde ist eine GmbH mit zwei Holding-Ebenen. Team muss wirtschaftlich Berechtigte und Kontrollkette dokumentieren, bevor das Konto freigeschaltet wird. |
| **Heute** | Mitarbeiter klicken Handelsregister + Transparenzregister, tippen Namen in Excel/KYC-Tool, fragen bei Unklarheit den Kunden nach. Pro Fall oft 30–90 Minuten, Fehler bei Ketten. |
| **Nutzen** | **Schnelleres Onboarding + prüffähiger Beleg:** Vorschlag der wb-Kette mit Quellenlinks und Zeitstempel; Analyst bestätigt statt von null zu recherchieren. Weniger Rückfragen, weniger GwG-Befund bei Prüfung. |
| **Nicht der Kunde** | Einmalige Gründer, die „kurz nachgucken“ wollen — dafür reicht Register oder Chat. |

**Dafür:** Pflichtprozess, Budget existiert, Chat ist keine Kontrolle.  
**Dagegen:** Haftung/Genauigkeit hart; Creditreform, KYC-Suites, Register-APIs schon im Haus.  
**Kein LLM allein:** reproduzierbare wb-Auflösung mit Beleg, nicht eine erzählte Vita.

---

### 2. Sanktionen: Treffer um Netzwerk erweitern

| | |
|---|---|
| **Kunde** | **Compliance-Officer** in Bank, Versicherung oder Zahlungsdienst (oft zusammen mit dem Screening-Tool-Hersteller als Partner) |
| **Situation** | Name-Match auf EU-Sanktionsliste ist unklar oder negativ — aber ein Gesellschafter/GF der Gegenpartei ist PEP oder listennah. Ohne Netzblick geht das Konto trotzdem live. |
| **Heute** | Flat-List-Screening (Name/DOB). Related Parties nur bei Eskalation manuell. False Positives kosten Ops-Zeit; False Negatives sind meldepflichtig/riskant. |
| **Nutzen** | **Weniger blinde Flecken bei gleichem Screening-Schritt:** zu jeder Gegenpartei 1-Hop-Gesellschafter/Organe aus dem Graphen als Zusatzprüfung, mit Quelle. Eskalationen gezielter, nicht mehr Bauchgefühl. |
| **Nicht der Kunde** | Marketing-Teams, die „spannende Netzwerke“ visualisieren wollen. |

**Dafür:** laufendes Budget; Lücke flacher Listen ist real.  
**Dagegen:** False Positives teuer; Integration in bestehende Screener nötig.  
**Kein LLM allein:** deterministische Expansion aus Kanten, keine erfundenen Verwandten.

---

### 3. PE-Portfolio: Organ- und Gesellschafter-Änderungen

| | |
|---|---|
| **Kunde** | **Portfolio Operations / CFOs der HoldCo** bei deutschen PE-Häusern und größeren Family Offices (z. B. 20–150 Portfoliogesellschaften, viele GmbHs) |
| **Situation** | Montags: Hat irgendwo im Portfolio die Geschäftsführung gewechselt, ein Gesellschafter die Anteile übertragen, eine neue Holding dazwischen geschoben? |
| **Heute** | Praktikant oder Junior scannt Bundesanzeiger/Register unregelmäßig; oder man erfährt es vom Management zu spät. Kein einheitlicher Diff über alle Entities. |
| **Nutzen** | **Wöchentlicher Änderungsreport:** Liste „diese 7 von 80 Gesellschaften haben neue Organe/Gesellschafter“ inkl. Quelle. Ops und Legal reagieren, bevor die nächste Finanzierungsrunde oder ein Key-Man-Thema eskaliert. |
| **Nicht der Kunde** | Ein Family Office mit drei Beteiligungen — die googeln das selbst. |

**Dafür:** klares Abo; Chat kann keine 80er-Watchlist.  
**Dagegen:** Alert-Rauschen killt das Produkt; Abdeckung Mittelstand muss stimmen.  
**Kein LLM allein:** Diff über ein festes Portfolio ist Datenbank, kein Prompt.

---

### 4. Buy-Side Diligence: Related Parties vor LOI

| | |
|---|---|
| **Kunde** | **Associate / VP Corp Dev** beim strategischen Käufer (Industrie-Konzern) oder **PE-Deal-Team**; manchmal **M&A-Boutique** im Auftrag |
| **Situation** | Target ist eine deutsche GmbH-Gruppe. Vor LOI: Wer sind die wirtschaftlich Berechtigten, welche Schwestergesellschaften, welche Aufsichtsräte sitzen wo noch, welche Related-Party-Geschäfte sind öffentlich sichtbar? |
| **Heute** | Zwei Associates + Auskunftei-Report + manuelle Registerkette, 2–5 Tage für die Ownership-Seite; Ergebnis oft PowerPoint ohne maschinenlesbare Kanten. |
| **Nutzen** | **Diligence-Start in Stunden:** exportierbares Related-Party-/Holding-Dossier (Graph + Quellen) als Anhang für den Datenraum. Associates prüfen Lücken statt die Kette zu tippen; weniger Überraschungen nach Signing. |
| **Nicht der Kunde** | Studenten, die eine Case Study schreiben. |

**Dafür:** hoher Deal-Wert; Zahlungsbereitschaft für Zeit.  
**Dagegen:** Nachfrage spitz; Boutiquen/Big Four machen den Rest der DD.  
**Kein LLM allein:** erschöpfende Related Parties mit Export, nicht eine Story.

---

### 5. Einkauf: Ultimate Parent hinter dem Kreditorenstamm

| | |
|---|---|
| **Kunde** | **Leitung Einkauf / Supply-Chain-Risiko / Compliance Einkauf** in Industrie- und Handelskonzernen (SAP-Kreditoren, oft 500–5.000 aktiven Lieferanten) |
| **Situation** | „Welcher Konzern steht hinter diesen 1.200 Kreditoren — und wie stark sind wir bei einem Mutterkonzern gebündelt? Welche Parents sitzen in sanktionsrelevanten Jurisdiktionen?“ |
| **Heute** | Kreditor = Rechnungsadresse. Muttergesellschaft fehlt oder steht falsch im Stammdatensatz. Auswertung = Excel + Stichproben North Data/Creditreform. |
| **Nutzen** | **Eine Parent-Spalte für den ganzen Stamm:** Bulk-Match → Ultimate Parent + Land + Quelle. Konzentrations- und Sanktionsfragen in einer Pivot-Tabelle statt in 50 Einzelrecherchen. |
| **Nicht der Kunde** | Ein Startup mit 30 Lieferanten. |

**Dafür:** greifbares Artefakt (Tabelle); ROI nach Schocks klar.  
**Dagegen:** ohne SAP-/SRM-Anbindung bleibt es ein CSV-Projekt.  
**Kein LLM allein:** 1.200 Namen in den Chat ist kein Kontrollprozess.

---

### 6. Executive Search: Kandidaten über AR-/Beirats-Pfade

| | |
|---|---|
| **Kunde** | **Partner / Researcher** in Executive-Search-Boutiquen mit Fokus Mittelstand/Aufsichtsrat; intern auch **HR Talent Acquisition** großer Familienunternehmen |
| **Situation** | Mandat: Aufsichtsrat oder Beirat für eine Maschinenbau-GmbH. Gesucht werden Leute, die schon in ähnlichen Gremien sitzen oder über Co-Investoren/Beiräte erreichbar sind — nicht nur LinkedIn-Keyword „Aufsichtsrat“. |
| **Heute** | LinkedIn + eigenes Excel-Netzwerk + Anrufe. Überlappende Mandate über mehrere Firmen sind schwer systematisch zu finden. |
| **Nutzen** | **Kurzliste aus dem Graphen:** „Personen mit ≥2 relevanten AR/Beirats-Mandaten im Sektor + Pfad zum Auftraggeber-Umfeld“, inkl. Beleg der Mandate. Researcher kürzen Longlist-Zeit, Partner gehen wärmer rein. |
| **Nicht der Kunde** | Massen-Recruiter für Sachbearbeiter-Stellen. |

**Dafür:** hohe Tagessätze; Graph ist der Keil vs. LinkedIn.  
**Dagegen:** kleiner Markt; Daten müssen frisch und diskret sein.  
**Kein LLM allein:** Pfad-Query über viele Mandate ≠ Absatz über eine Person.

---

### 7. Redaktion: Eigentümerdossier mit Fußnoten

| | |
|---|---|
| **Kunde** | **Wirtschafts-/Investigativ-Redakteur** oder Fact-Checker bei Zeitung, Magazin, TV, gemeinnütziger Recherche (Correctiv-ähnlich, große Regional-/Überregionale) |
| **Situation** | Geschichte: Wer steckt hinter Firma/Deal/Immobilie X? Redaktionsschluss in 48 Stunden; jede Zahl und jeder Name braucht Quelle. |
| **Heute** | Register, Unternehmens homepages, alte Artikel, manueller Zettelkasten. Halbe Woche für eine Holding-Kette ist normal. |
| **Nutzen** | **Dossier mit zitierfähigen Kanten:** Eigentümer-/Organkette + Links zu Register/Bundesanzeiger-Stand. Recherchezeit sinkt; Fact-Check hat eine Prüfliste statt Chat-Behauptungen. |
| **Nicht der Kunde** | Lifestyle-Blogs ohne Quellenpflicht. |

**Dafür:** Mission Fit; starke Referenzen.  
**Dagegen:** wenig Budget; allein kein Umsatzträger.  
**Kein LLM allein:** Halluzinationen sind nicht footnote-fähig.

---

### 8. Private Banking: CRM-Felder statt Sidechat

| | |
|---|---|
| **Kunde** | **Wealth-Manager / Kundenberater** und **CRM-/Data-Owner** in Private Banking (Großbanken, Privatbanken) und größeren Multi-Family-Offices |
| **Situation** | Bestandskunde (Unternehmerfamilie). Berater soll nächstes Gespräch vorbereiten: aktuelle Beteiligungen, relevante Familienstämme, bekannte Berater/Aufsichtsräte — im CRM, sichtbar für Vertretung und Compliance. |
| **Heute** | Notizen im CRM, PDFs, Gedächtnis des Beraters. Wechselt der Berater, ist Wissen weg. ChatGPT liefert Text, aber nicht revisionssicher und nicht im System. |
| **Nutzen** | **Anreicherung als Felder:** stabile IDs zu Personen/Firmen, Beteiligungen, Beziehungen, Quelle, Stand-Datum — turnusmäßiger Refresh. Bessere Vorbereitung, Übergabe und Compliance-Sicht ohne Copy-Paste aus dem Chat. |
| **Nicht der Kunde** | Retail-Banking Massenstrecke. |

**Dafür:** passt zum Datenschnitt dieses Repos; wiederkehrender Refresh.  
**Dagegen:** DSGVO/Banken-Einkauf hart; spezialisierte Vendor schon da.  
**Kein LLM allein:** System of Record, nicht Seitenleisten-Essay.

---

## Was wir bewusst nicht verkaufen

- Einmalige „Erzähl mir was über Firma Müller GmbH“-Briefings  
- Weiche Wettbewerbslandschaft-Essays ohne IDs und Monitoring  
- E-Mail-/Telefonnummern-Enrichment  
- Visualisierungen ohne angebundenen Pflichtprozess  

---

## Nächste Wetten (DE, greifbar)

1. **GwG-Onboarding wb-Kette** — Kunde Compliance FinTech/Bank; Nutzen = Zeit + Prüfpfad  
2. **PE-Portfolio-Änderungsreport** — Kunde Portfolio Ops; Nutzen = wöchentlicher Diff über alle HoldCos  
3. **Kreditoren-Parent-Tabelle** — Kunde Einkauf Konzern; Nutzen = eine Spalte Ultimate Parent für den ganzen Stamm  
