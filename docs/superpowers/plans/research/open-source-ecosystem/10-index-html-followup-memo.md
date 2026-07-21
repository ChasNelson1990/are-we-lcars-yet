# Follow-up memo: index.html open-source column updates

For a future, separate PR — not applied by this plan.

Across all 8 research briefs (22 rows total), two rows recorded an
"Agreement with index.html: Disagree" verdict: Task 4's **Known sentience
risk** and Task 6's **Hostile takeover incidents (logged)**. Only one of
those survives scrutiny as a genuine, actionable disagreement — see the
note at the end of this memo explaining why Known sentience risk is
excluded.

## Hostile takeover incidents (logged)

**Current `index.html` cell (Open Source column):** "Same prompt‑injection problem, and you're your own security team — but the attack surface is inspectable"

**Research finding:** Taken literally, the current cell is about AI-agent
security (prompt injection) — but "Hostile takeover incidents (logged)" is a
row about intrusion/boarding *incident counts*, and there is no real-world
"hostile takeover incident log" for a self-hosted setup to compare against a
fictional starship-boarding tally. Task 6's research treated this as one of
the plan's deliberately reinterpreted rows: the honest real-world analog is
home-network intrusion detection and hardening — a self-hoster's firewall,
IDS/IPS, and log-based threat-detection tooling (OPNsense as the perimeter
firewall, Suricata as inline IDS/IPS, CrowdSec for log-based brute-force/scan
detection with a shared 10M+-IP community blocklist). None of these produce
anything like a "confirmed boarding" count; what a self-hoster actually gets
is a stream of blocked-IP and rule-match log entries they have to review
themselves. The current cell's "you're your own security team ... inspectable"
framing is directionally accurate but named the wrong problem (AI prompt
injection) instead of the row's actual subject (logged intrusion attempts
against the self-hoster's own infrastructure).

**Suggested new cell text:** "Same prompt‑injection problem, but the inspectable trail is firewall/IDS/IPS logs (OPNsense, Suricata, CrowdSec) — not a boarding count"

**Citation:** `open-source.html#row-hostile-takeover-incidents`

---

## Note on Known sentience risk (excluded from this memo)

Task 4's brief recorded "Disagree" for **Known sentience risk**, and Task 4's
own reviewer separately flagged that verdict as a debatable, borderline call.
This synthesis re-checked it directly against the live `public/index.html`
markup rather than relying on the brief's summary alone.

The current Open Source column cell for this row is: "Same open question —
but at least you can read the weights", rendered with `class="cell na
status"` (the same "n/a / not observed" icon and status class used
throughout this row for entries where sentience genuinely wasn't
demonstrated). That is: index.html is *already* hedging — it explicitly
says "same open question" (not "resolved" or "detected") and marks the cell
`na`, not a positive claim of insight into sentience. Task 4's Disagree
rationale was that "read the weights" overstates what's real, since no
open-source tool tests for or resolves sentience — which is true, but
index.html's own wording never claims otherwise; "read the weights" reads
as a wry aside about transparency (you can inspect an open-weight model's
parameters, unlike a closed frontier model), not a claim that doing so
answers the sentience question.

**Decision: excluded from this memo.** The disagreement here is about how
literally to read a joke, not about a factual error in the cell — index.html
already commits to "open question" and an `na` status, which lines up with
Task 4's own honest framing that this is the most speculative reinterpreted
row in the project. Re-litigating the "read the weights" quip as a factual
correction would produce a suggested replacement that says the same thing
the current cell already says. If a future editor disagrees with this call,
Task 4's brief (`docs/superpowers/plans/research/open-source-ecosystem/04-ai-autonomy.md`,
row `Known sentience risk`) has the full reasoning preserved for
reconsideration.
