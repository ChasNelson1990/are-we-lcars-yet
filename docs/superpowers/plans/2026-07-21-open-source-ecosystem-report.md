# Open Source Ecosystem Report Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship `public/open-source.html`, a privacyguides.org-style deep dive giving every row of the pricing table's real-world open/private tier a top-3 tool comparison, sourced and cross-linked, plus a compatibility matrix and reference stacks — without touching the pricing table's own cell content.

**Architecture:** 8 independent, from-scratch research passes (one per pricing-table group) write structured markdown briefs to `docs/superpowers/plans/research/open-source-ecosystem/`. A synthesis pass reconciles them into a compatibility matrix, reference stacks, and a follow-up memo. Authoring tasks then transcribe the briefs into a new static HTML page that reuses `report.html`'s existing LCARS section/table/citation markup verbatim — no new CSS, no new JS, no build step.

**Tech Stack:** Static HTML/CSS/vanilla JS (no framework, no build step — matches the rest of the repo). Verification via `npm run check` (Prettier + ESLint + Stylelint + HTMLHint).

## Global Constraints

- Never commit or push directly to `main` — all work happens on `feat/open-source-ecosystem-report` (already created and checked out) and ships via PR.
- `npm run check` must pass on every task that touches a `public/*.html` file.
- No new dependencies, no build step — vanilla HTML/CSS/JS only, per the project README.
- Reuse existing CSS classes exactly as `report.html` defines them: `.report-section`, `.tier-title`, `.report-body`, `.summary`, `.block-tag`, `.report-table-wrap` / `.report-table`, `.pill pill-yes` / `.pill-warn` / `.pill-bad` / `.pill-na`, `.source-list`. Do not add new CSS unless a genuine gap is found (none is expected).
- Research must use targeted, individually-fetched queries — no bulk scraping pipeline, consistent with the project's existing stance (see `report.html`'s "Method & sources" section, "Why there's no bulk pipeline").
- Every tool claim must be web-verified as current as of the actual research date (today is 2026-07-21, but if a task runs later, use and record that real date) — do not rely on training-data memory alone for "is this still maintained" claims.
- `public/index.html`'s pricing-table **cell content** is not edited by this plan — only its nav rail gains one new link. Cell edits are an explicit, separate follow-up PR (see Task 9's memo output).

---

## File Structure

**Working research artifacts (not shipped to the live site, live under `docs/`):**
- `docs/superpowers/plans/research/open-source-ecosystem/01-interface-input.md` through `08-reliability-support.md` — one brief per pricing-table group.
- `docs/superpowers/plans/research/open-source-ecosystem/09-synthesis.md` — cross-reference resolution, compatibility matrix draft, reference-stack drafts.
- `docs/superpowers/plans/research/open-source-ecosystem/10-index-html-followup-memo.md` — the agree/disagree memo for the separate follow-up PR.

**Shipped site files:**
- Create: `public/open-source.html` — the new report page.
- Modify: `public/index.html` — add one nav rail link.
- Modify: `public/report.html` — add one nav rail link.
- Modify: `public/requests.html` — add one nav rail link.

---

## Row anchor slugs (canonical — use exactly these `id="row-..."` values in Tasks 11, 12, and 13; do not invent alternates)

| Group | Row label | Anchor id |
| --- | --- | --- |
| Interface & Input | Primary interface | `row-primary-interface` |
| Interface & Input | Touchscreen GUI | `row-touchscreen-gui` |
| Interface & Input | Natural language processing | `row-nlp` |
| Personal & Field Hardware | Ship terminal / console hardware | `row-ship-terminal` |
| Personal & Field Hardware | Personal access device | `row-personal-access-device` |
| Personal & Field Hardware | Handheld sensor device | `row-handheld-sensor-device` |
| Personal & Field Hardware | Personal communicator | `row-personal-communicator` |
| Data Storage & Processing | Storage medium | `row-storage-medium` |
| Data Storage & Processing | Core architecture | `row-core-architecture` |
| Data Storage & Processing | Processing redundancy | `row-processing-redundancy` |
| AI & Autonomy | Onboard AI personality | `row-onboard-ai-personality` |
| AI & Autonomy | Autonomous decision-making | `row-autonomous-decision-making` |
| AI & Autonomy | Known sentience risk | `row-known-sentience-risk` |
| Simulation & Holography | Holodeck / holo-environments | `row-holodeck` |
| Simulation & Holography | Holographic crew | `row-holographic-crew` |
| Security & Access Control | Authorization method | `row-authorization-method` |
| Security & Access Control | Hostile takeover incidents (logged) | `row-hostile-takeover-incidents` |
| Sensors & Navigation | Universal translator | `row-universal-translator` |
| Sensors & Navigation | Stellar cartography | `row-stellar-cartography` |
| Reliability & Support | Self-repair capability | `row-self-repair-capability` |
| Reliability & Support | Uptime (malfunction-free episodes) | `row-uptime` |
| Reliability & Support | Support channel | `row-support-channel` |

---

### Task 1: Research — Interface & Input

**Files:**
- Create: `docs/superpowers/plans/research/open-source-ecosystem/01-interface-input.md`

**Interfaces:**
- Consumes: nothing (independent, from-scratch research).
- Produces: a markdown brief with one `## Row: <label>` section per row below, each containing `### Top 3 candidates`, `### Recommendation`, `### Plays well with`, and `### Agreement with index.html` subsections. Later tasks (9, 11) read this file by its exact path and heading structure.

**Rows to research** (from `public/index.html`'s "Interface & Input" group):

1. **Primary interface** (no `data-row` id — plain row). Current `index.html` Open Source claim: *"Terminal, self-hosted web UIs (Open WebUI), Home Assistant voice for ambient pickup"*.
2. **Touchscreen GUI** (`data-row="r2"`). Current claim: *"Linux touch support is real but patchy — and open computer-use agents can drive a screen too"* (status: caveat).
3. **Natural language processing** (`data-row="r3"`). Current claim: *"Open-weight models are genuinely conversational — a step behind frontier on the hardest reasoning"* (status: caveat).

- [ ] **Step 1: Research each row's top 3 real candidates**

  For each row, find at least 3 real, currently-maintained open-source/privacy-respecting projects or products a reader could actually adopt today. Use targeted web searches per candidate (e.g. "Open WebUI github releases 2026", "Home Assistant Assist voice pipeline 2026") — not a bulk scrape. For each candidate, confirm via a live search or fetch that it is still maintained (not archived/dead/acquired away from its open license) and note how you confirmed it.

- [ ] **Step 2: Write the brief using this exact template per row**

  ```markdown
  # Research brief: Interface & Input — Open Source Ecosystem Report

  Research date: 2026-07-21

  ## Row: Primary interface

  **index.html currently claims (verbatim, Open Source column):** "Terminal, self-hosted web UIs (Open WebUI), Home Assistant voice for ambient pickup"

  ### Top 3 candidates

  1. **<Project name>** — License: <license> · Status: <maintained, last release/commit date> · Verified 2026-07-21: <how you confirmed it>
     <2-4 sentences: what it does, its actual privacy/data-handling posture>
     Source: <https://...>
  2. ...
  3. ...

  ### Recommendation

  <Which to start with and why; real tradeoffs, not marketing copy.>

  ### Plays well with

  <Name other rows/groups it integrates with — exact pick if you know it from this group, otherwise the general category, e.g. "the local-LLM inference pick in Data Storage & Processing".>

  ### Agreement with index.html

  Agree | Disagree — <one sentence>

  ---

  ## Row: Touchscreen GUI (`data-row="r2"`)

  ... (same structure) ...

  ---

  ## Row: Natural language processing (`data-row="r3"`)

  ... (same structure) ...
  ```

- [ ] **Step 3: Verify the brief is structurally complete**

  Run: `grep -c '^## Row:' docs/superpowers/plans/research/open-source-ecosystem/01-interface-input.md`
  Expected: `3`

  Run: `grep -c '^### Top 3 candidates' docs/superpowers/plans/research/open-source-ecosystem/01-interface-input.md`
  Expected: `3`

  Manually confirm every `### Top 3 candidates` block lists exactly 3 numbered candidates, each with a License, Status, and Source line, and that every row has a filled `### Agreement with index.html` line (not left blank).

- [ ] **Step 4: Commit**

  ```bash
  git add docs/superpowers/plans/research/open-source-ecosystem/01-interface-input.md
  git commit -m "research: interface & input group for open-source ecosystem report"
  ```

---

### Task 2: Research — Personal & Field Hardware

**Files:**
- Create: `docs/superpowers/plans/research/open-source-ecosystem/02-personal-field-hardware.md`

**Interfaces:**
- Consumes: nothing.
- Produces: same brief structure as Task 1, one `## Row:` section per row below.

**Rows to research:**

1. **Ship terminal / console hardware** (`data-row="r17"`). Current claim: *"Framework laptop or desktop — modular, repairable, upgradeable; still no fixed bridge console"* (caveat).
2. **Personal access device** (`data-row="r18"`). Current claim: *"Fairphone — a user-replaceable battery beats a PADD"* (yes).
3. **Handheld sensor device** (`data-row="r19"`). Current claim: *"Open hardware boards + SDR + thermal cams — more tricorder-like, more assembly required"* (caveat).
4. **Personal communicator** (`data-row="r20"`). Current claim: *"Fairphone on /e/OS + Signal — E2E-encrypted comms on hardware you can open with a screwdriver"* (yes).

Note: rows 2 and 4 both touch phone/OS choice from different angles (device vs. comms app) — research each independently, but the "Plays well with" note should make the overlap explicit rather than silently repeating the same pick twice with no connection.

- [ ] **Step 1: Research each row's top 3 real candidates**

  Same method as Task 1: targeted searches per candidate, live-verify maintenance status as of today.

- [ ] **Step 2: Write the brief using the Task 1 template**, substituting these 4 rows and their current claims (shown above) in place of Task 1's 3 rows. Same heading structure: `## Row: <label>` (with `data-row` id noted), `### Top 3 candidates`, `### Recommendation`, `### Plays well with`, `### Agreement with index.html`.

- [ ] **Step 3: Verify structural completeness**

  Run: `grep -c '^## Row:' docs/superpowers/plans/research/open-source-ecosystem/02-personal-field-hardware.md`
  Expected: `4`

  Manually confirm each of the 4 rows has 3 candidates and a filled agreement line, and that the Personal access device / Personal communicator rows cross-reference each other in "Plays well with".

- [ ] **Step 4: Commit**

  ```bash
  git add docs/superpowers/plans/research/open-source-ecosystem/02-personal-field-hardware.md
  git commit -m "research: personal & field hardware group for open-source ecosystem report"
  ```

---

### Task 3: Research — Data Storage & Processing

**Files:**
- Create: `docs/superpowers/plans/research/open-source-ecosystem/03-data-storage-processing.md`

**Interfaces:**
- Consumes: nothing.
- Produces: same brief structure, one `## Row:` per row below.

**Rows to research:**

1. **Storage medium** (no `data-row`). Current claim: *"Self-hosted NAS or E2E-encrypted cloud (Proton Drive) — either way, only you hold the keys"*.
2. **Core architecture** (no `data-row`). Current claim: *"Same transformers, quantized (GGUF) onto a consumer GPU or unified-memory mini PC at home"*.
3. **Processing redundancy** (`data-row="r6"`). Current claim: *"Whatever redundancy you build — RAID and a second box, or it's a single point of failure"* (caveat).

- [ ] **Step 1: Research each row's top 3 real candidates.** For "Core architecture" this means local-LLM inference runtimes (e.g. quantization/serving stacks), not the models themselves — the model choice belongs to the "Natural language processing" row already researched in Task 1; note that boundary explicitly in this row's write-up so Task 9's synthesis doesn't get two conflicting "which model" answers.

- [ ] **Step 2: Write the brief using the Task 1 template** with these 3 rows/claims substituted in.

- [ ] **Step 3: Verify structural completeness**

  Run: `grep -c '^## Row:' docs/superpowers/plans/research/open-source-ecosystem/03-data-storage-processing.md`
  Expected: `3`

  Manually confirm the Core architecture row explicitly distinguishes "inference runtime" from "which model" and cross-references the NLP row from Task 1.

- [ ] **Step 4: Commit**

  ```bash
  git add docs/superpowers/plans/research/open-source-ecosystem/03-data-storage-processing.md
  git commit -m "research: data storage & processing group for open-source ecosystem report"
  ```

---

### Task 4: Research — AI & Autonomy

**Files:**
- Create: `docs/superpowers/plans/research/open-source-ecosystem/04-ai-autonomy.md`

**Interfaces:**
- Consumes: nothing.
- Produces: same brief structure, one `## Row:` per row below.

**Rows to research:**

1. **Onboard AI personality** (`data-row="r7"`). Current claim: *"Any persona you like — the system prompt is yours to edit"* (yes).
2. **Autonomous decision-making** (`data-row="r8"`). Current claim: *"Open agent stacks run locally — capable, but you're the safety team"* (caveat).
3. **Known sentience risk** (`data-row="r9"`) — **reinterpreted row**. Current claim: *"Same open question — but at least you can read the weights"* (n/a). Research the closest real analog: open-source AI safety / red-teaming / guardrails tooling (things that test whether a model or agent is behaving unexpectedly or unsafely) — e.g. guardrail frameworks, LLM vulnerability scanners, prompt-injection/jailbreak test harnesses. This is explicitly the most speculative of the three reinterpreted rows; the write-up must say so plainly rather than overclaiming these tools "detect sentience."

- [ ] **Step 1: Research each row's top 3 real candidates**, live-verifying maintenance status. For row 3, be honest in the "Recommendation" section that no tool "measures sentience" — frame it as "closest real practice: guarding against unexpected/unsafe autonomous behavior."

- [ ] **Step 2: Write the brief using the Task 1 template** with these 3 rows/claims substituted in.

- [ ] **Step 3: Verify structural completeness**

  Run: `grep -c '^## Row:' docs/superpowers/plans/research/open-source-ecosystem/04-ai-autonomy.md`
  Expected: `3`

  Manually confirm the "Known sentience risk" row's recommendation explicitly flags the speculative nature of the mapping.

- [ ] **Step 4: Commit**

  ```bash
  git add docs/superpowers/plans/research/open-source-ecosystem/04-ai-autonomy.md
  git commit -m "research: AI & autonomy group for open-source ecosystem report"
  ```

---

### Task 5: Research — Simulation & Holography

**Files:**
- Create: `docs/superpowers/plans/research/open-source-ecosystem/05-simulation-holography.md`

**Interfaces:**
- Consumes: nothing.
- Produces: same brief structure, one `## Row:` per row below.

**Rows to research:**

1. **Holodeck / holo-environments** (`data-row="r10"`). Current claim: *"Not available — SteamVR on Linux exists, still no photons with mass"* (no). Research the real open/self-hostable VR/AR software stack landscape (compositors, runtimes, content platforms), being honest that "no forcefield-generated matter" remains true — the top-3 here is about the closest real substitute, not a rebuttal of the "not available" verdict.
2. **Holographic crew** (`data-row="r11"`). Current claim: *"Self-hosted personas persist exactly as long as your backups do"* (caveat). Research self-hostable persistent AI persona / character tooling (memory-persistence layers for local assistants, not literal holograms).

- [ ] **Step 1: Research each row's top 3 real candidates**, live-verifying maintenance status.

- [ ] **Step 2: Write the brief using the Task 1 template** with these 2 rows/claims substituted in.

- [ ] **Step 3: Verify structural completeness**

  Run: `grep -c '^## Row:' docs/superpowers/plans/research/open-source-ecosystem/05-simulation-holography.md`
  Expected: `2`

- [ ] **Step 4: Commit**

  ```bash
  git add docs/superpowers/plans/research/open-source-ecosystem/05-simulation-holography.md
  git commit -m "research: simulation & holography group for open-source ecosystem report"
  ```

---

### Task 6: Research — Security & Access Control

**Files:**
- Create: `docs/superpowers/plans/research/open-source-ecosystem/06-security-access-control.md`

**Interfaces:**
- Consumes: nothing.
- Produces: same brief structure, one `## Row:` per row below.

**Rows to research:**

1. **Authorization method** (`data-row="r12"`). Current claim: *"Passkeys, FIDO2 hardware keys, Bitwarden / Proton Pass — auditable end to end"* (yes).
2. **Hostile takeover incidents (logged)** (no `data-row` — mono/narrative row) — **reinterpreted row**. Current claim: *"Same prompt-injection problem, and you're your own security team — but the attack surface is inspectable"*. Research the real analog: home-lab/network-layer intrusion detection and hardening tooling (firewalls, IDS/IPS, log-based threat detection) a self-hoster would actually run.

- [ ] **Step 1: Research each row's top 3 real candidates**, live-verifying maintenance status.

- [ ] **Step 2: Write the brief using the Task 1 template** with these 2 rows/claims substituted in.

- [ ] **Step 3: Verify structural completeness**

  Run: `grep -c '^## Row:' docs/superpowers/plans/research/open-source-ecosystem/06-security-access-control.md`
  Expected: `2`

- [ ] **Step 4: Commit**

  ```bash
  git add docs/superpowers/plans/research/open-source-ecosystem/06-security-access-control.md
  git commit -m "research: security & access control group for open-source ecosystem report"
  ```

---

### Task 7: Research — Sensors & Navigation

**Files:**
- Create: `docs/superpowers/plans/research/open-source-ecosystem/07-sensors-navigation.md`

**Interfaces:**
- Consumes: nothing.
- Produces: same brief structure, one `## Row:` per row below.

**Rows to research:**

1. **Universal translator** (`data-row="r14"`). Current claim: *"Whisper + open translation models run locally — near-real-time, fewer languages, no cloud required"* (caveat).
2. **Stellar cartography** (`data-row="r15"`). Current claim: *"Stellarium + open sky-survey data — the actual star charts are already open source"* (caveat).

- [ ] **Step 1: Research each row's top 3 real candidates**, live-verifying maintenance status.

- [ ] **Step 2: Write the brief using the Task 1 template** with these 2 rows/claims substituted in.

- [ ] **Step 3: Verify structural completeness**

  Run: `grep -c '^## Row:' docs/superpowers/plans/research/open-source-ecosystem/07-sensors-navigation.md`
  Expected: `2`

- [ ] **Step 4: Commit**

  ```bash
  git add docs/superpowers/plans/research/open-source-ecosystem/07-sensors-navigation.md
  git commit -m "research: sensors & navigation group for open-source ecosystem report"
  ```

---

### Task 8: Research — Reliability & Support

**Files:**
- Create: `docs/superpowers/plans/research/open-source-ecosystem/08-reliability-support.md`

**Interfaces:**
- Consumes: nothing.
- Produces: same brief structure, one `## Row:` per row below.

**Rows to research:**

1. **Self-repair capability** (`data-row="r16"`). Current claim: *"The system can't fix itself, but you can — schematics, parts, and source are all published"* (caveat). Research real right-to-repair-friendly hardware vendors/communities and repair-documentation resources.
2. **Uptime (malfunction-free episodes)** (no `data-row` — mono row) — **reinterpreted row**. Current claim: *"Your homelab, your SLA — exactly as good as your backups"*. Research the real analog: self-healing/monitoring tooling — watchdogs, uptime/status monitoring, auto-restart patterns.
3. **Support channel** (no `data-row`). Current claim: *"You are the chief engineer — plus forums, Matrix rooms, and GitHub issues"*. Research real community support channels/hubs for self-hosters (this row's "top 3" is community resources, not software projects).

- [ ] **Step 1: Research each row's top 3 real candidates/resources**, live-verifying they're currently active (not a dead forum/abandoned tool) as of the research date.

- [ ] **Step 2: Write the brief using the Task 1 template** with these 3 rows/claims substituted in.

- [ ] **Step 3: Verify structural completeness**

  Run: `grep -c '^## Row:' docs/superpowers/plans/research/open-source-ecosystem/08-reliability-support.md`
  Expected: `3`

- [ ] **Step 4: Commit**

  ```bash
  git add docs/superpowers/plans/research/open-source-ecosystem/08-reliability-support.md
  git commit -m "research: reliability & support group for open-source ecosystem report"
  ```

---

### Task 9: Synthesis — cross-references, compatibility matrix, reference stacks, follow-up memo

**Files:**
- Create: `docs/superpowers/plans/research/open-source-ecosystem/09-synthesis.md`
- Create: `docs/superpowers/plans/research/open-source-ecosystem/10-index-html-followup-memo.md`
- Read (do not modify): all 8 briefs from Tasks 1-8, and `public/index.html` (to re-check the "Agreement with index.html" notes against the live cells).

**Interfaces:**
- Consumes: all 8 brief files by their exact paths and `## Row:` / `### Top 3 candidates` / `### Plays well with` / `### Agreement with index.html` headings (Tasks 1-8's Produces).
- Produces: `09-synthesis.md` (consumed by Tasks 11-13's authoring work) and `10-index-html-followup-memo.md` (a standalone deliverable for a future, separate PR — not consumed by any later task in this plan).

- [ ] **Step 1: Read all 8 briefs** and list every row (22 total) with its group, its #1 recommended pick, and its "Plays well with" note.

- [ ] **Step 2: Resolve cross-brief conflicts.** Where two briefs' "Plays well with" notes both name a pick for the same underlying thing (e.g. Task 2's Personal access device and Task 2's Personal communicator both landing on phone hardware, or Task 1's NLP row and Task 3's Core architecture row both touching "which model"), pick the one, consistent answer and note in `09-synthesis.md` which brief's wording needs a one-line adjustment when Tasks 11-13 transcribe it (do not edit the brief files themselves — record the correction here so authoring tasks apply it once, in the final HTML).

- [ ] **Step 3: Write the compatibility matrix and reference stacks into `09-synthesis.md`**, using this structure:

  ```markdown
  # Synthesis: Open Source Ecosystem Report

  ## Cross-brief corrections

  - <Row A> vs <Row B>: <the one consistent answer, and which brief's prose to adjust when transcribing>
  - ...

  ## Reference stacks

  ### Stack 1: Home Assistant-centric smart home

  <Prose walkthrough naming every row's pick this stack uses, and the actual protocols/integrations connecting them (Matter, Zigbee, MQTT, etc.).>

  ### Stack 2: Mobile / daily-driver privacy

  <Same, for phone/OS/messaging/passwords rows.>

  ### Stack 3: Self-hosted AI & local-LLM

  <Same, for inference/agents/voice/guardrails rows.>

  (If the 22 rows' picks naturally need a 4th stack to stay coherent, add
  `### Stack 4: <name>` here with the same structure — 3 is a target, not a
  hard cap.)

  ## Compatibility matrix

  | Pricing-table row | Stack 1 pick | Stack 2 pick | Stack 3 pick |
  | --- | --- | --- | --- |
  | Primary interface | ... | ... | ... |
  | ... (all 22 rows) | | | |
  ```

  Every one of the 22 rows must appear in the matrix even if a given stack doesn't use that row's category (write "—" for that cell rather than omitting the row).

- [ ] **Step 4: Write the follow-up memo** to `10-index-html-followup-memo.md`, listing every row where a brief's "Agreement with index.html" said "Disagree", in this format:

  ```markdown
  # Follow-up memo: index.html open-source column updates

  For a future, separate PR — not applied by this plan.

  ## <Row label>

  **Current `index.html` cell (Open Source column):** "<verbatim>"
  **Research finding:** <what the brief found instead, and why>
  **Suggested new cell text:** "<proposed replacement, matching the pricing table's existing terse one-line style>"
  **Citation:** `open-source.html#row-<slug>`

  (repeat per disagreeing row)
  ```

  If no rows disagree, the memo should say so explicitly rather than being an empty file.

- [ ] **Step 5: Verify completeness**

  Run: `grep -c '| ' docs/superpowers/plans/research/open-source-ecosystem/09-synthesis.md` and manually confirm all 22 row labels appear as matrix rows (compare against the row list in this plan's Tasks 1-8).

- [ ] **Step 6: Commit**

  ```bash
  git add docs/superpowers/plans/research/open-source-ecosystem/09-synthesis.md docs/superpowers/plans/research/open-source-ecosystem/10-index-html-followup-memo.md
  git commit -m "research: synthesize open-source ecosystem briefs into stacks, matrix, and follow-up memo"
  ```

---

### Task 10: Page skeleton + nav rail links across all four pages

**Files:**
- Create: `public/open-source.html`
- Modify: `public/index.html:38-40` (nav rail)
- Modify: `public/report.html:19-21` (nav rail)
- Modify: `public/requests.html:19-21` (nav rail)

**Interfaces:**
- Consumes: nothing (pure scaffold — no row content yet).
- Produces: `public/open-source.html` containing 8 empty `<section>` skeletons (one per group, each with its final `id` and an inline `<!-- TODO: populate in Task 11/12 -->` marker) plus a 9th cross-cutting section skeleton and a working nav rail. Tasks 11, 12, and 13 locate and replace these exact marker comments.

- [ ] **Step 1: Add the new page's nav rail link to the other three pages.**

  In `public/index.html`, `public/report.html`, and `public/requests.html`, add one line to each page's `<nav class="lcars-rail">`, immediately after the existing `<a>` links and before the first `<button class="rail-btn">`:

  ```html
  <a href="open-source.html" class="rail-link">OPEN<br />ECOSYSTEM</a>
  ```

- [ ] **Step 2: Create `public/open-source.html`** with this skeleton (head copied from `report.html`'s head, adjusted title; nav rail includes the reverse links plus one rail-btn per group and one for the cross-cutting section):

  ```html
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Open Source Ecosystem Report — Starfleet Computer Systems</title>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
      <link
        href="https://fonts.googleapis.com/css2?family=Antonio:wght@400;600;700&family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap"
        rel="stylesheet"
      />
      <link rel="stylesheet" href="assets/styles.css" />
      <link rel="stylesheet" href="assets/report.css" />
    </head>
    <body>
      <div class="lcars-frame">
        <nav class="lcars-rail">
          <div class="elbow"></div>
          <a href="index.html" class="rail-link">&larr; COMPARE<br />PLANS</a>
          <a href="report.html" class="rail-link">FULL REPORT<br />+ SOURCES</a>
          <a href="requests.html" class="rail-link">REQUEST<br />LOG</a>
          <button type="button" class="rail-btn" data-target="grp-interface-input">
            INTERFACE<br />&amp; INPUT
          </button>
          <button type="button" class="rail-btn" data-target="grp-personal-field-hardware">
            PERSONAL<br />&amp; FIELD
          </button>
          <button type="button" class="rail-btn" data-target="grp-data-storage-processing">
            DATA<br />STORAGE
          </button>
          <button type="button" class="rail-btn" data-target="grp-ai-autonomy">
            AI &amp;<br />AUTONOMY
          </button>
          <button type="button" class="rail-btn" data-target="grp-simulation-holography">
            SIM &amp;<br />HOLOGRAPHY
          </button>
          <button type="button" class="rail-btn" data-target="grp-security-access-control">
            SECURITY<br />&amp; ACCESS
          </button>
          <button type="button" class="rail-btn" data-target="grp-sensors-navigation">
            SENSORS<br />&amp; NAV
          </button>
          <button type="button" class="rail-btn" data-target="grp-reliability-support">
            RELIABILITY<br />&amp; SUPPORT
          </button>
          <button type="button" class="rail-btn" data-target="grp-reference-stacks">
            REFERENCE<br />STACKS
          </button>
          <div class="rail-fill"></div>
          <div class="stardate" id="stardate">STARDATE &mdash;</div>
        </nav>

        <main class="report-main">
          <div class="top-bar">
            <div class="chip c1"></div>
            <div class="chip c2"></div>
            <div class="chip c3"></div>
          </div>

          <div class="report-hero">
            <span class="eyebrow">COMPUTER CORE // OPEN ECOSYSTEM DIVISION</span>
            <h1 class="display" style="font-size: clamp(1.8rem, 3.6vw, 2.8rem)">
              Build the <span>open-source column</span>, for real.
            </h1>
            <p class="sub">
              <a href="index.html" style="color: var(--panel-orange)">The comparison table</a>'s
              Open Source column makes one claim per row. This is the deep dive behind it: three
              real candidates per row, independently researched, license and privacy posture
              included, plus what actually plugs into what if you want to build the whole
              ecosystem rather than one piece of it.
            </p>
          </div>

          <!-- GROUP-1: interface-input -->
          <section class="report-section" id="grp-interface-input">
            <h2
              class="tier-title"
              style="background: transparent; color: var(--text); border: 1px solid var(--text-dim)"
            >
              Interface &amp; Input
            </h2>
            <div class="report-body">
              <!-- TODO: populate in Task 11 -->
            </div>
          </section>

          <!-- GROUP-2: personal-field-hardware -->
          <section class="report-section" id="grp-personal-field-hardware">
            <h2
              class="tier-title"
              style="background: transparent; color: var(--text); border: 1px solid var(--text-dim)"
            >
              Personal &amp; Field Hardware
            </h2>
            <div class="report-body">
              <!-- TODO: populate in Task 11 -->
            </div>
          </section>

          <!-- GROUP-3: data-storage-processing -->
          <section class="report-section" id="grp-data-storage-processing">
            <h2
              class="tier-title"
              style="background: transparent; color: var(--text); border: 1px solid var(--text-dim)"
            >
              Data Storage &amp; Processing
            </h2>
            <div class="report-body">
              <!-- TODO: populate in Task 11 -->
            </div>
          </section>

          <!-- GROUP-4: ai-autonomy -->
          <section class="report-section" id="grp-ai-autonomy">
            <h2
              class="tier-title"
              style="background: transparent; color: var(--text); border: 1px solid var(--text-dim)"
            >
              AI &amp; Autonomy
            </h2>
            <div class="report-body">
              <!-- TODO: populate in Task 11 -->
            </div>
          </section>

          <!-- GROUP-5: simulation-holography -->
          <section class="report-section" id="grp-simulation-holography">
            <h2
              class="tier-title"
              style="background: transparent; color: var(--text); border: 1px solid var(--text-dim)"
            >
              Simulation &amp; Holography
            </h2>
            <div class="report-body">
              <!-- TODO: populate in Task 12 -->
            </div>
          </section>

          <!-- GROUP-6: security-access-control -->
          <section class="report-section" id="grp-security-access-control">
            <h2
              class="tier-title"
              style="background: transparent; color: var(--text); border: 1px solid var(--text-dim)"
            >
              Security &amp; Access Control
            </h2>
            <div class="report-body">
              <!-- TODO: populate in Task 12 -->
            </div>
          </section>

          <!-- GROUP-7: sensors-navigation -->
          <section class="report-section" id="grp-sensors-navigation">
            <h2
              class="tier-title"
              style="background: transparent; color: var(--text); border: 1px solid var(--text-dim)"
            >
              Sensors &amp; Navigation
            </h2>
            <div class="report-body">
              <!-- TODO: populate in Task 12 -->
            </div>
          </section>

          <!-- GROUP-8: reliability-support -->
          <section class="report-section" id="grp-reliability-support">
            <h2
              class="tier-title"
              style="background: transparent; color: var(--text); border: 1px solid var(--text-dim)"
            >
              Reliability &amp; Support
            </h2>
            <div class="report-body">
              <!-- TODO: populate in Task 12 -->
            </div>
          </section>

          <!-- CROSS-CUTTING: reference-stacks-and-matrix -->
          <section class="report-section" id="grp-reference-stacks">
            <h2
              class="tier-title"
              style="background: transparent; color: var(--text); border: 1px solid var(--text-dim)"
            >
              Reference Stacks &amp; Compatibility Matrix
            </h2>
            <div class="report-body">
              <!-- TODO: populate in Task 13 -->
            </div>
          </section>
        </main>
      </div>

      <script src="assets/main.js"></script>
    </body>
  </html>
  ```

- [ ] **Step 2: Run the check script**

  Run: `npm run check`
  Expected: PASS (Prettier format check, ESLint, Stylelint, HTMLHint all clean). If Prettier reformats the file, accept its formatting and re-run.

- [ ] **Step 3: Manual browser check**

  Open `public/open-source.html` directly in a browser. Confirm: stardate clock ticks, all 9 rail buttons scroll to their section, the 3 cross-page links (`← COMPARE PLANS`, `FULL REPORT + SOURCES`, `REQUEST LOG`) navigate correctly, and the new `OPEN ECOSYSTEM` link appears and works from `index.html`, `report.html`, and `requests.html`.

- [ ] **Step 4: Commit**

  ```bash
  git add public/open-source.html public/index.html public/report.html public/requests.html
  git commit -m "feat: scaffold open-source ecosystem report page and nav links"
  ```

---

### Task 11: Author page content — Groups 1-4

**Files:**
- Modify: `public/open-source.html` (replace the `<!-- TODO: populate in Task 11 -->` markers inside `#grp-interface-input`, `#grp-personal-field-hardware`, `#grp-data-storage-processing`, `#grp-ai-autonomy`)
- Read (do not modify): `docs/superpowers/plans/research/open-source-ecosystem/01-interface-input.md`, `02-personal-field-hardware.md`, `03-data-storage-processing.md`, `04-ai-autonomy.md`, `09-synthesis.md` (for the "Cross-brief corrections" section)

**Interfaces:**
- Consumes: briefs 01-04, the corrections list from `09-synthesis.md` (Task 9's Produces), and the canonical anchor ids from this plan's "Row anchor slugs" table.
- Produces: populated HTML for groups 1-4, using exactly the `id="row-..."` values from the "Row anchor slugs" table (e.g. `id="row-primary-interface"`) — not ad hoc slugs — since Tasks 12 and 13 link to these ids by that exact spelling.

- [ ] **Step 1: For each row in briefs 01-04, transcribe its brief content into HTML** inside that group's `.report-body`, in this exact per-row structure (using `report.html`'s existing table/pill/citation classes). Use the anchor id from the "Row anchor slugs" table for each row's `<h3>` and for every `#row-...` link you write (both the "Plays well with" link and any inbound links other rows point at this one):

  ```html
  <h3 class="block-tag" id="row-primary-interface">Primary interface</h3>
  <p class="summary">
    <code>index.html</code> currently says: &ldquo;Terminal, self-hosted web UIs
    (Open WebUI), Home Assistant voice for ambient pickup.&rdquo;
  </p>
  <div class="report-table-wrap">
    <table class="report-table">
      <thead>
        <tr>
          <th>Project</th>
          <th>License</th>
          <th>What it does</th>
          <th>Privacy stance</th>
          <th>Status</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><!-- project 1 name --></td>
          <td><!-- license --></td>
          <td><!-- what it does --></td>
          <td><!-- privacy stance --></td>
          <td><!-- maintained/last release --></td>
          <td>
            <a href="<!-- source url -->" target="_blank" rel="noopener"><!-- link text --></a>
          </td>
        </tr>
        <!-- repeat for candidates 2 and 3 -->
      </tbody>
    </table>
  </div>
  <p class="summary">
    <strong>Recommendation:</strong> <!-- from the brief's Recommendation section -->
  </p>
  <p class="summary">
    <strong>Plays well with:</strong>
    <a href="#row-touchscreen-gui">Touchscreen GUI</a> —
    <!-- from the brief's Plays well with section, corrected per 09-synthesis.md if listed there;
         look up the actual target row's anchor id in the Row anchor slugs table, this is just an example -->
  </p>
  <p class="summary">
    <span class="pill pill-yes">Agrees</span>
    <!-- or <span class="pill pill-bad">Disagrees</span> -->
    with <code>index.html</code>'s current claim.
    <!-- one-sentence why, from the brief -->
  </p>
  ```

  Fill every `<!-- ... -->` placeholder with the brief's actual researched content — none should remain in the committed file. Apply this same structure to all 3 rows in group 1, all 4 rows in group 2, all 3 rows in group 3, and all 3 rows in group 4 (13 rows total for this task).

- [ ] **Step 2: Apply the reinterpreted-row framing** for "Known sentience risk" (group 4): keep the same table structure, but make the `<p class="summary">` immediately above the table explicitly state this is a reinterpretation onto AI safety/guardrails tooling, not a literal sentience test — matching the brief's framing from Task 4.

- [ ] **Step 3: Run the check script**

  Run: `npm run check`
  Expected: PASS.

- [ ] **Step 4: Manual verification**

  Run: `grep -c 'id="row-' public/open-source.html`
  Expected: at least `13` (the 13 rows across groups 1-4; more once Task 12 adds the rest).

  Open the page in a browser, confirm groups 1-4 render with populated tables (no visible `<!-- -->` placeholder text) and that "Plays well with" links jump to the right anchors (some may 404-scroll until Task 12 adds their targets — acceptable at this point, re-check after Task 12).

- [ ] **Step 5: Commit**

  ```bash
  git add public/open-source.html
  git commit -m "content: populate open-source ecosystem groups 1-4"
  ```

---

### Task 12: Author page content — Groups 5-8

**Files:**
- Modify: `public/open-source.html` (replace the `<!-- TODO: populate in Task 12 -->` markers inside `#grp-simulation-holography`, `#grp-security-access-control`, `#grp-sensors-navigation`, `#grp-reliability-support`)
- Read (do not modify): `docs/superpowers/plans/research/open-source-ecosystem/05-simulation-holography.md`, `06-security-access-control.md`, `07-sensors-navigation.md`, `08-reliability-support.md`, `09-synthesis.md`

**Interfaces:**
- Consumes: briefs 05-08, `09-synthesis.md`'s corrections (Task 9's Produces), and the canonical anchor ids from this plan's "Row anchor slugs" table; also relies on Task 11 having already created `id="row-..."` anchors for groups 1-4 so this task's "Plays well with" links can target them.
- Produces: populated HTML for groups 5-8, using exactly the `id="row-..."` values from the "Row anchor slugs" table, completing all 22 row anchors that Task 13 links from.

- [ ] **Step 1: Transcribe briefs 05-08 into HTML** using the exact same per-row structure as Task 11 Step 1 (table + Recommendation + Plays well with + Agreement pill), for all 9 rows across these 4 groups (2 + 2 + 2 + 3). Use the anchor id from the "Row anchor slugs" table for each row's `<h3>` and for every `#row-...` link.

- [ ] **Step 2: Apply the reinterpreted-row framing** for "Hostile takeover incidents (logged)" (group 6) and "Uptime (malfunction-free episodes)" (group 8): each `<p class="summary">` above the table must state plainly that this row is reinterpreted onto real cybersecurity/monitoring practice, matching the brief's framing from Tasks 6 and 8.

- [ ] **Step 3: Run the check script**

  Run: `npm run check`
  Expected: PASS.

- [ ] **Step 4: Manual verification**

  Run: `grep -c 'id="row-' public/open-source.html`
  Expected: `22`.

  Open the page in a browser and click through every "Plays well with" link across all 8 groups — confirm each resolves to a real row anchor (no dead links now that all 22 exist).

- [ ] **Step 5: Commit**

  ```bash
  git add public/open-source.html
  git commit -m "content: populate open-source ecosystem groups 5-8"
  ```

---

### Task 13: Author the reference stacks & compatibility matrix section

**Files:**
- Modify: `public/open-source.html` (replace the `<!-- TODO: populate in Task 13 -->` marker inside `#grp-reference-stacks`)
- Read (do not modify): `docs/superpowers/plans/research/open-source-ecosystem/09-synthesis.md`

**Interfaces:**
- Consumes: `09-synthesis.md`'s "Reference stacks" and "Compatibility matrix" sections (Task 9's Produces); links to the 22 `id="row-..."` anchors that Tasks 11-12 created, using the exact ids from this plan's "Row anchor slugs" table.
- Produces: the completed page, ready for Task 14's final verification pass.

- [ ] **Step 1: Transcribe the reference stacks** from `09-synthesis.md` into HTML inside `#grp-reference-stacks`'s `.report-body`, one `<h3 class="block-tag">` per stack, each followed by a `<p class="summary">` with the stack's prose walkthrough, linking to the relevant `#row-...` anchors inline (e.g. `<a href="#row-primary-interface">Primary interface</a>`) wherever a specific row's pick is named:

  ```html
  <h3 class="block-tag">Stack 1: Home Assistant-centric smart home</h3>
  <p class="summary"><!-- prose from 09-synthesis.md, with inline #row- links --></p>

  <h3 class="block-tag">Stack 2: Mobile / daily-driver privacy</h3>
  <p class="summary"><!-- ... --></p>

  <h3 class="block-tag">Stack 3: Self-hosted AI &amp; local-LLM</h3>
  <p class="summary"><!-- ... --></p>
  ```

  If `09-synthesis.md` defined a 4th stack, add its `<h3>`/`<p>` pair here too.

- [ ] **Step 2: Transcribe the compatibility matrix** as an HTML table immediately after the stacks, using `report.table`'s existing classes:

  ```html
  <h3 class="block-tag">Compatibility matrix</h3>
  <div class="report-table-wrap">
    <table class="report-table">
      <thead>
        <tr>
          <th>Pricing-table row</th>
          <th>Stack 1</th>
          <th>Stack 2</th>
          <th>Stack 3</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><a href="#row-primary-interface">Primary interface</a></td>
          <td><!-- pick or &mdash; --></td>
          <td><!-- pick or &mdash; --></td>
          <td><!-- pick or &mdash; --></td>
        </tr>
        <!-- one row per each of the 22 pricing-table rows, in the same group order as the page -->
      </tbody>
    </table>
  </div>
  ```

  All 22 rows must appear (use `&mdash;` for any stack/row combination `09-synthesis.md` marked "—").

- [ ] **Step 3: Run the check script**

  Run: `npm run check`
  Expected: PASS.

- [ ] **Step 4: Manual verification**

  Run: `grep -c '<tr>' public/open-source.html` and manually confirm the compatibility matrix table body has 22 data rows (plus its header row).

  Open the page in a browser: confirm the matrix's row-label links jump to the correct sections, and the reference-stack prose's inline links do too.

- [ ] **Step 5: Commit**

  ```bash
  git add public/open-source.html
  git commit -m "content: add reference stacks and compatibility matrix to open-source ecosystem report"
  ```

---

### Task 14: Final verification and PR readiness

**Files:**
- Read only: `public/open-source.html`, `public/index.html`, `public/report.html`, `public/requests.html`

**Interfaces:**
- Consumes: the fully authored page from Tasks 10-13.
- Produces: nothing new — this task only verifies and reports; it's the gate before opening a PR.

- [ ] **Step 1: Full check run**

  Run: `npm run check`
  Expected: PASS with zero errors/warnings.

- [ ] **Step 2: Desktop manual pass**

  Open `public/open-source.html` at a desktop viewport width. Confirm: all 9 rail buttons work, all 22 row tables render fully populated (no leftover `<!-- -->` comments visible as text, no empty table cells), every "Plays well with" and matrix link resolves, the stardate clock ticks.

- [ ] **Step 3: Mobile-width manual pass**

  Resize the browser (or use devtools) to ~375px width. Confirm the page reflows readably using `report.css`'s existing narrow-viewport rules (same as `report.html` already does) — no horizontal scroll, no clipped content.

- [ ] **Step 4: Cross-page nav pass**

  From `index.html`, `report.html`, and `requests.html`, click the new `OPEN ECOSYSTEM` link and confirm it lands on `open-source.html`; from `open-source.html`, confirm all 3 reverse links work.

- [ ] **Step 5: Citation spot-check**

  Pick 2 source links from each of the 8 groups (16 total) at random and open them, confirming each resolves to the actual project/resource named (not a 404 or an unrelated page).

- [ ] **Step 6: Confirm no pricing-table content changed**

  Run: `git diff main -- public/index.html`
  Expected: the diff shows only the single added `<a href="open-source.html">` nav line — no changes to any `.cell` content inside `.tier-grid`.

- [ ] **Step 7: Final commit (if Steps 1-6 required any fixes)**

  ```bash
  git add public/open-source.html public/index.html public/report.html public/requests.html
  git commit -m "fix: address final verification findings on open-source ecosystem report"
  ```

  If no fixes were needed, skip this step — nothing to commit.

At this point the branch `feat/open-source-ecosystem-report` is ready for `superpowers:finishing-a-development-branch` to open a PR. The follow-up memo at `docs/superpowers/plans/research/open-source-ecosystem/10-index-html-followup-memo.md` is intentionally left uncommitted-to-`index.html` — it's the input for a second, separate PR, not part of this one.
