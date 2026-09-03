# B2B-Use-Cases (Deutschland) — Handwerk & kleine Unternehmen

**Kunde im Fokus:** Handwerksbetriebe und kleine Unternehmen (typisch &lt;50 MA), nicht Banken, nicht Konzern-PA, nicht NGO-Lobby.

**Scope-Ausschluss:** Banking/GwG; Enterprise-Gesellschafts-/Holding-Diligence (PE, Kreditoren-Parents, UBO-SaaS).

Jeder Use-Case muss das Gate in [.cursor/skills/evaluate-use-cases-ger/SKILL.md](.cursor/skills/evaluate-use-cases-ger/SKILL.md) bestehen. Keine Pseudo-Ideen als „Pass“.

B2C-Nischen: [B2C_USE_CASES.md](B2C_USE_CASES.md) (Skill: `evaluate-use-cases`).

## Kurzfassung

**Pass (dünn — Absicht)**

- **Regionaler Vergabe-Radar** — Günstige Alerts zu öffentlichen Aufträgen in festem Umkreis/Gewerk (nicht DTAD-Ersatz für Konzerne).

**Am Gate gescheitert (u. a.)**

- Auftraggeber „Pleite-GmbH derselben Person“ — Register-Commodity; wer’s braucht, nutzt North Data & Co.
- Inkasso-Netz verbundener Firmen — kritische Daten fehlen legal; Rest = derselbe Register-Join.
- Konzern-PA / Lobby / DIP / NGO-Diff — falscher Kundenschwerpunkt für dieses File.

**Ehrlicher Stand:** Mit Fokus Handwerk/KMU + ohne Banken + ohne Gesellschaftsketten-Produkt bleibt **wenig**, das gleichzeitig öffentlich, zahlungswürdig und nicht per Prompt/Commodity lösbar ist. Lieber eine dünne Pass-Liste als Märchen.

## Gate

1. Sind die Daten öffentlich (oder sauber lizenzierbar)?  
2. Ist der Use-Case umsetzbar — oder Wunschdenken?  
3. Würde ein Handwerker / kleines Unternehmen dafür zahlen?  
4. Warum?  
5. Kann ChatGPT/Gemini das nicht in einem Prompt?

Zusatz für diesen Fokus: **Würde der Meister 9–29 €/Monat oder 2–5 € pro Abruf zahlen — ohne Schulung und ohne Compliance-Abteilung?** Wenn nein → Fail auf 3.

---

## Pass

### 1. Regionaler Vergabe-Radar (Handwerk / kleines Bau-nahe Gewerk)

| | |
|---|---|
| **Kunde** | **Inhaber / Bürokraft** in Handwerk (Elektro, Sanitär, Maler, Trockenbau, Garten/Landschaft) oder kleiner Baufirma, die **öffentliche** Aufträge mitnimmt |
| **Job** | Nicht den lokalen/regionalen öffentlichen Auftrag verpassen (Stadt, Kreis, Wohnungsbaugesellschaften soweit öffentlich ausgeschrieben) |
| **Heute** | Zufällig Vergabeportal, Kammer-Hinweis, DTAD zu teuer/komplex, Kollegen-Tipp |
| **Pay reason** | Ein gewonnener Kleinstauftrag (&gt; Radar-Jahrespreis) rechtfertigt ein Billig-Abo; Nutzen = weniger verpasste Ausschreibungen, nicht „Insights“ |
| **Data** | Öffentliche Vergabeportale (Bund/Länder/Kommunen, soweit crawlbar); Lücke: beschränkte/nicht öffentliche Vergaben, schlecht gepflegte Portale |
| **Why not a chatbot** | Dauerhaft viele Portale + Ort/Gewerk-Filter; „gibt’s Aufträge in München?“ einmalig ≈ Prompt, Radar über Wochen ≠ Prompt |

**Gate**

1. Öffentlich: ja (Vergabebekanntmachungen).  
2. Umsetzbar: ja — Quellenliste, Geo/Gewerk-Filter, E-Mail-Digest; Ops-Aufwand = Portalpflege.  
3. Zahlen: ja, **wenn** Preis Handwerker-tauglich ist (Kleinstabo/Pay-per-Hit) und Setup &lt;10 Minuten; bei DTAD-Preisen → Fail.  
4. Warum: Auftragschance / verpasste Ausschreibung.  
5. Chatbot: nein für laufendes Multi-Portal-Monitoring.

**Nicht bauen als:** Enterprise-Vergabe-Suite; Gesellschafts-Check des Auftraggebers (separater Fail unten).

**Go-to-market:** nur Sinn über Handwerkersoftware, Großhandel, Kreishandwerkerschaft — nicht als „Hidden Champions“-Marke.

---

## Verworfen (Gate fail oder falscher Fokus)

| Idee | Fail | Kurz |
|---|---|---|
| Auftraggeber-Check: wer steckt hinter der GmbH / schon Pleite-Firmen | 3, 4, 5 | Die meisten, die vorsichtig sind, nutzen Register/North Data schon. Kein Zahlungsgrund für „noch ein Check“. |
| Inkasso: verbundene Firmen/Personen zum Schuldner | 1, 2 | Strohmann, Familie ohne Mandat, Privatvermögen: nicht verfügbar. Öffentlicher Rest = Commodity-Join. |
| GU-/Bauträger-Kette vor Nachunternehmervertrag | 3, 4, 5 | Gleicher Commodity-Kern; Zeitdruck → niemand pflegt ein zweites Tool. |
| Creditreform-light „Seriositäts-Score“ | 1, 2 | Score ohne neue Daten = Wunschdenken / Haftung. |
| Förder-Radar (BAFA/KfW-Programme) | 3, 4 | Viele Gratis-Newsletter/Kammer-Infos; schwache Zahlungsbereitschaft. |
| Normen-/LBO-Änderungs-Alerts | 1, 3 | DIN oft paywalled; Handwerker zahlen selten für Gesetzesticker. |
| Konzern-PA Themen-Watch / DIP / Konsultationen / DE↔EU-Lobby | Fokus | Valide für PA — **nicht** Handwerk/KMU-Kunde. |
| Forschungs-Panel Lobby/Spenden | Fokus | Institut ≠ Handwerker. |
| NGO-Register-Diff | Fokus | NGO ≠ Handwerker. |
| Bank/GwG/UBO/Kreditoren-Parents | Scope | Ausgeschlossen. |

---

## Was wir daraus lernen

1. **Kunde zuerst:** „B2B Deutschland“ ohne Handwerk-Fokus driftet sofort zu PA/Lobby/Compliance.  
2. **Gesellschafts-Auskunft an Handwerker verkaufen** scheitert am Gate — nicht am Storytelling.  
3. **Vergabe-Radar** ist der einzige bisherige Pass — und auch der nur mit Billigpreis + Kanal, sonst Fail auf 3.

---

## Nächste Wetten

1. **Nur** regionaler Vergabe-Radar — Pilot mit einer Kreishandwerkerschaft oder einer Handwerkersoftware, 2–3 Gewerke, ein Landkreis-Cluster, Preis &lt;30 €/Monat.  
2. Keine weiteren Pass-Einträge ohne neues Gate mit konkreten Quellen + Zahlungsbeleg (wer zahlt was heute schon?).  
