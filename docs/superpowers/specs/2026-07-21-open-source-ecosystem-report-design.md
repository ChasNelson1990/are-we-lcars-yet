# Open source ecosystem report — design

## Problem

`index.html`'s "REAL WORLD (OPEN)" column makes a single claim per row — one
line of prose per feature (e.g. "Self‑hosted NAS or E2E‑encrypted cloud
(Proton Drive)"). That's the right amount of detail for a comparison table,
but it can't show its work: why that pick, what the alternatives are, whether
picks from different rows actually interoperate, or whether the claim is
still accurate months after it was written. There's no page on the site that
does for the real-world open/private tier what `report.html` does for the
fictional tiers — a full citation trail a reader can actually verify.

Someone who wants to *act* on the "Open Source" column — actually go build a
private, repairable, open tech stack for themselves — has nothing to click
through to. This project adds that page.

## Goal

A new page, `public/open-source.html`, that gives every row in the pricing
table's real-world open/private tier a privacyguides.org-style deep dive:
top-3 real candidate tools/projects, license and privacy posture, current
maintenance status, source links, and notes on what plays well with what.
Independent, from-scratch research — not a rationalization of the existing
pricing-table cells — reconciled against those cells only as a final
synthesis step.

Out of scope for this piece of work: editing `index.html`'s cells. That's a
deliberate follow-up (see "Follow-up" below), so the report can ship on its
own and the pricing-table edit can be reviewed independently with the report
as its citation.

## Design

### Page structure & site integration

- New file `public/open-source.html`, reusing the existing LCARS chrome:
  `.lcars-frame`, `.lcars-rail` nav, hero block, `.group-head` section tags,
  and a citation-footnote pattern like `report.html`'s sources list.
- Reuses `assets/styles.css` and `assets/report.css` (the latter already
  handles narrow-viewport layout for sequential-section pages — no new CSS
  breakpoint work should be needed, same as `report.html` today).
- Nav rail (`index.html`, `report.html`, `requests.html`) gets one new
  button: label `OPEN ECOSYSTEM<br/>...`, `data-target`/`href` pointing at
  `open-source.html`, placed alongside the existing `REQUEST LOG` /
  `FULL REPORT + SOURCES` links.
- No mobile-carousel JS involvement — `main.js`'s carousel transform only
  operates on `index.html`'s `.tier-grid`. This page is authored as
  sequential sections, same shape as `report.html`, so it's inherently
  mobile-readable without generating a second view.

### Content model

One section per pricing-table group (8 total, same tags/order as
`index.html`: Interface & Input, Personal & Field Hardware, Data Storage &
Processing, AI & Autonomy, Simulation & Holography, Security & Access
Control, Sensors & Navigation, Reliability & Support).

Within each group section, one subsection per row (22 rows total, matching
`index.html`'s `row-label` text so a reader can map back to the table 1:1).
Each row subsection contains:

1. **Top-3 table** — columns: Project | License / openness | What it does |
   Privacy / data-handling stance | Maintenance status (as of research date)
   | Source link.
2. **Recommendation prose** — which of the 3 to actually start with and why,
   real tradeoffs (not just marketing), and a short **"plays well with"**
   note cross-linking (anchor links) to other row subsections it integrates
   with.
3. A citation marker for anything non-obvious, resolving to a sources list
   at the bottom of the page (same pattern as `report.html`).

Three rows carry over from the pricing table under a **reinterpreted**
real-world meaning rather than being skipped as "fictional-only":

| Pricing-table row | Real-world reinterpretation |
| --- | --- |
| Uptime (malfunction-free episodes) | Self-healing / monitoring: watchdogs, status monitoring, auto-restart (e.g. Uptime Kuma, Healthchecks.io, Watchtower, restart-policy patterns) |
| Hostile takeover incidents (logged) | Cybersecurity / intrusion detection: hardening and monitoring for the home-lab/network layer (e.g. CrowdSec, Suricata, Wazuh, OPNsense/pfSense) |
| Known sentience risk | AI safety / red-teaming / guardrails: the closest real analog to "is this thing behaving unexpectedly" (e.g. NeMo Guardrails, Llama Guard, garak, promptfoo) — flagged in the prose as the most speculative mapping of the three, since "sentience" itself has no real test |

Rows with no real mapping at all (there don't appear to be any left after
the reinterpretations above — the remaining 19 rows already have a direct
real-world product category) are not expected, but if research turns one up,
it gets a one-paragraph honest "there isn't a real category here, here's the
closest adjacent thing" note rather than being silently dropped.

### Cross-cutting section: reference stacks & compatibility matrix

A final section, after all 8 group sections and before the sources list,
with two parts:

1. **Compatibility matrix** — a table with one row per pricing-table row and
   one column per reference stack, showing which top-3 pick that stack uses.
2. **Three named reference stacks**, each a short prose walkthrough of how
   its picks actually interoperate (protocols named explicitly — Matter,
   Zigbee, MQTT, Signal/Matrix federation, etc.), not just a list:
   - **Home Assistant-centric smart home** — the "environmental/ambient
     computer" build.
   - **Mobile / daily-driver privacy** — phone, OS, messaging, passwords,
     the stuff that goes in your pocket.
   - **Self-hosted AI & local-LLM** — inference, agents, voice, guardrails.

   These are a starting proposal; if the row research naturally clusters
   differently (e.g. a 4th stack turns out cleaner than folding something
   into 1-3), the writing/synthesis step may adjust — the count of 3 is a
   target, not a hard constraint, since the point is coherence over a fixed
   number.

### Research methodology

- 8 independent research passes, one per pricing-table group (these are the
  natural unit for parallel subagent dispatch during implementation, since
  the groups don't share state).
- Each pass researches its rows **from scratch** — no assumption that
  `index.html`'s current cell text survives. For every row it must surface
  at least 3 real candidates and, for each: confirm via live web search/fetch
  that the project is still maintained (not dead/acquired/abandoned) and
  currently a reasonable pick as of the research date, capture its license,
  its actual privacy/data posture (not just marketing copy), and at least
  one real, working source URL.
- Each pass explicitly notes, per row, whether its independent finding
  agrees or disagrees with what `index.html` currently claims for that row.
  This feeds directly into the follow-up work below — it is captured, not
  discarded.
- After all passes return, a synthesis step: resolve any row where a pass's
  finding conflicts with another pass's cross-reference (e.g. two groups
  both touch phone hardware), build the compatibility matrix and reference
  stacks from the combined picks, and write the final page in one consistent
  voice — matching the site's existing dry, technical tone (real-world
  claims must be accurate; in-universe humor is not the point of this page
  the way it is on `index.html`/`report.html`).

### Follow-up (separate PR, not part of this work)

The per-row "agrees / disagrees with `index.html`" notes gathered during
research are compiled into a short synthesis memo: every row where the deep
research contradicts or updates the live pricing-table cell, with the
report's relevant anchor as the citation. That memo is the input to a second,
independent PR that edits `index.html`'s open-source column — reviewed on its
own, not bundled with this report.

## Testing

- `npm run check` (Prettier format check + ESLint + Stylelint + HTMLHint)
  must pass on the new page and any nav-link edits to the other three pages.
- Manual browser check of `public/open-source.html`: nav rail link works
  from all four pages, section anchors/cross-links resolve, layout is
  readable at both desktop and phone width (reusing `report.css`'s existing
  narrow-viewport handling).
- Spot-check that a sample of citation/source links actually resolve (not
  exhaustive automated link-checking — a manual sample per group section is
  enough given the page is hand-authored, same standard as the existing
  `report.html`).
- All work happens on a feature branch and ships via PR — never directly to
  `main`.
