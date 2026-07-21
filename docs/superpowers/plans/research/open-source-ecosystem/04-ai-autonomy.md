# Research brief: AI & Autonomy — Open Source Ecosystem Report

Research date: 2026-07-21

## Row: Onboard AI personality (`data-row="r7"`)

**index.html currently claims (verbatim, Open Source column):** "Any persona you like — the system prompt is yours to edit"

### Top 3 candidates

1. **Ollama (Modelfile `SYSTEM` directive)** — License: MIT · Status: actively maintained, latest release v0.32.1 (July 16, 2026), ongoing weekly release cadence · Verified 2026-07-21: re-checked directly via `gh api repos/ollama/ollama` (not archived, MIT license file present) and `gh api repos/ollama/ollama/releases/latest` (tag v0.32.1, published 2026-07-16T03:27:23Z).
   Ollama's Modelfile format lets you bake a persistent `SYSTEM` prompt into a named local model variant ("You are Mario from Super Mario Bros, acting as an assistant"), or override it per-session at runtime via `/set system` or the chat API's `role: "system"` field. Everything — the model weights, the persona text, the conversation — runs and stays on your own machine; no persona data is sent anywhere.
   Source: <https://github.com/ollama/ollama>
2. **SillyTavern** — License: AGPL-3.0 · Status: actively maintained, latest tagged release v1.18.0 (May 3, 2026), with commits as recent as July 11, 2026 · Verified 2026-07-21: re-checked directly via `gh api repos/SillyTavern/SillyTavern` (not archived, AGPL-3.0 license, pushed_at 2026-07-11) and `gh api repos/SillyTavern/SillyTavern/releases/latest` (tag 1.18.0, published 2026-05-03T15:55:24Z).
   A self-hosted chat front end built specifically around character personas: "character cards" bundle a name, avatar, and system-prompt-equivalent personality definition that can be swapped per conversation, layered with world-info/lorebooks for persistent persona context. It connects to any backend (local Ollama/llama.cpp, or a hosted API key you supply), and stored personas/chat logs live in your own SillyTavern data directory — nothing is sent to a SillyTavern-run server, since there isn't one.
   Source: <https://github.com/SillyTavern/SillyTavern>
3. **Open WebUI (Workspace "Models")** — License: "Open WebUI License" (BSD-3-Clause base plus a mandatory branding-retention clause for deployments over 50 users) · Status: actively maintained, latest release v0.10.2 (July 1, 2026) · Verified 2026-07-21: re-checked directly via `gh api repos/open-webui/open-webui` (not archived) and `gh api repos/open-webui/open-webui/releases/latest` (tag v0.10.2, published 2026-07-01T08:41:06Z); cross-checked the Workspace/Models feature against Open WebUI's own current docs (docs.openwebui.com/features/workspace/models).
   The Workspace → Models screen lets you wrap any connected base model with a custom name, avatar, system prompt, attached knowledge base, and tools, then save it as a selectable persona alongside the stock model list. It's the same self-hosted deployment already flagged in this project's Interface & Input research (Task 1) for its 2025 branding-clause license change — that caveat still applies here, but persona/system-prompt data stays on your own server regardless of the licensing terms.
   Source: <https://docs.openwebui.com/features/workspace/models/>

### Recommendation

Start with Ollama's Modelfile `SYSTEM` directive if you just want one or two fixed personas bound to specific local models — it's the lowest-overhead option and has no licensing caveats. Reach for SillyTavern if you want to swap between many distinct personas in a single session with a UI built for exactly that (character cards, per-character memory) — accept the AGPL-3.0 copyleft terms if you ever redistribute a modified build. Open WebUI's Workspace/Models feature is the middle ground: multiple personas behind one shared web UI for a household, with the same branding-clause caveat already noted for this project's Interface & Input row.

### Plays well with

All three need a model to actually run — Ollama is both a candidate here and the natural local-inference backend for the other two (SillyTavern and Open WebUI can both point at a local Ollama endpoint), tying this row directly to the local-LLM runtime picks in Interface & Input (Task 1: Open WebUI, oterm) and Data Storage & Processing (Task 3: Ollama, llama.cpp, vLLM).

### Agreement with index.html

Agree — self-hosted tooling genuinely lets you write, edit, and swap any system prompt/persona you like, with no platform-imposed restriction on content, matching the "yes" status.

---

## Row: Autonomous decision-making (`data-row="r8"`)

**index.html currently claims (verbatim, Open Source column):** "Open agent stacks run locally — capable, but you're the safety team"

### Top 3 candidates

1. **CrewAI** — License: MIT · Status: actively maintained, latest release v1.15.5 (July 20, 2026), very active release cadence (multiple releases per month) · Verified 2026-07-21: re-checked directly via `gh api repos/crewAIInc/crewAI` (not archived, MIT license, pushed_at 2026-07-20T23:57:52Z) and `gh api repos/crewAIInc/crewAI/releases/latest` (tag 1.15.5, published 2026-07-20T16:33:25Z).
   A Python framework for orchestrating teams ("crews") of role-playing autonomous agents that plan, delegate, and execute multi-step tasks against tools you wire up, with a separate lower-level "Flows" system for more deterministic control. It runs entirely on infrastructure you control and works against any LLM backend, including fully local models via Ollama/LiteLLM — there is no CrewAI-run service in the loop, and no built-in approval gate stops an agent from calling a destructive tool if you've given it access to one.
   Source: <https://github.com/crewAIInc/crewAI>
2. **OpenHands** — License: MIT for the core project (a separate `enterprise/` directory ships under its own license, not part of the open core) · Status: actively maintained, latest release cloud-1.47.0 (July 21, 2026, the research date itself) · Verified 2026-07-21: re-checked directly via `gh api repos/OpenHands/OpenHands` (not archived, pushed_at 2026-07-21T10:20:49Z) and `gh api repos/OpenHands/OpenHands/releases/latest` (tag cloud-1.47.0, published 2026-07-21T08:20:14Z); confirmed the MIT/enterprise split by reading the repo's LICENSE file directly.
   A software-engineering agent (formerly OpenDevin) that runs a plan → code → run-in-sandbox → fix loop against a real terminal, file system, and browser, self-hostable with any LLM API key including a local model server. It genuinely executes shell commands and edits files with real side effects; sandboxing limits blast radius to the container it's given, but nothing in the open-source core stops it from, say, running `rm` inside that sandbox or pushing a bad commit if given repo write access — supervision is the operator's job.
   Source: <https://github.com/OpenHands/OpenHands>
3. **AutoGPT** — License: split — the original agent (`classic/` directory) is MIT; the newer "AutoGPT Platform" (`autogpt_platform/` directory) is licensed under the PolyForm Shield License 1.0.0, which is source-available but restricts using the software to build a competing product · Status: actively maintained, latest platform release `autogpt-platform-beta-v0.6.68` (July 17, 2026), commits as recent as July 21, 2026, 185k+ GitHub stars · Verified 2026-07-21: re-checked directly via `gh api repos/Significant-Gravitas/AutoGPT` (not archived, pushed_at 2026-07-21T09:42:05Z) and `gh api repos/Significant-Gravitas/AutoGPT/releases/latest`, plus reading the repo's LICENSE file directly to confirm the classic/platform split.
   One of the original "give an LLM a goal and let it plan its own steps" agents, now split between the original single-agent MIT-licensed classic version and a newer visual, block-based "AutoGPT Platform" for building and running agents locally or self-hosted. Both run against your own LLM credentials; the platform's PolyForm Shield terms are a real license caveat worth flagging to readers even though the code itself remains inspectable and self-hostable.
   Source: <https://github.com/Significant-Gravitas/AutoGPT>

### Recommendation

Start with CrewAI if the goal is a small, controllable multi-agent workflow — it's cleanly MIT-licensed, has no platform lock-in, and its "Flows" mode lets you keep a human-in-the-loop checkpoint exactly where index.html's caveat says you need one. Reach for OpenHands specifically for coding/dev-environment tasks — it's the most capable of the three at real terminal/file work, which is also where an unsupervised agent can do the most damage, so pair it with container-level sandboxing (which it already uses) and don't hand it credentials wider than the task needs. Treat AutoGPT's classic agent as a historically important but now second-tier option, and be aware that its newer "Platform" half is not MIT — the PolyForm Shield clause matters if you'd ever build on it commercially. None of the three ship a safety layer beyond basic sandboxing; the index.html claim's "you're the safety team" is accurate for all three.

### Plays well with

All three are LLM-agnostic orchestration layers, not model providers — they pair directly with the local-inference picks from Data Storage & Processing (Task 3: Ollama, llama.cpp, vLLM) and can share the same open-weight model already chosen for onboard personality in this row's own group. For guardrails against exactly the unsupervised-action risk index.html flags, pair any of the three with the guardrail/red-teaming tooling in the next row (NeMo Guardrails, garak, PyRIT).

### Agreement with index.html

Agree — CrewAI, OpenHands, and AutoGPT are all real, current, self-hostable agent stacks capable of genuine autonomous multi-step action, and none of them include a built-in safety reviewer: the operator is unambiguously the safety team.

---

## Row: Known sentience risk (`data-row="r9"`) — reinterpreted row

**index.html currently claims (verbatim, Open Source column):** "Same open question — but at least you can read the weights"

**Honest framing up front: no open-source tool measures, detects, or rules out machine sentience — that remains a philosophical and scientific open question with no instrument that resolves it, in this codebase's fiction or in reality.** The three candidates below are the closest real analog available: open-source tooling that tests whether a model or agent is behaving unexpectedly or unsafely (guardrail frameworks, vulnerability scanners, and red-teaming/jailbreak harnesses). This is explicitly the most speculative of the reinterpreted rows in this research project — treat it as "closest adjacent real practice," not as an answer to the sentience question.

### Top 3 candidates

1. **NeMo Guardrails (NVIDIA)** — License: Apache-2.0 · Status: actively maintained, latest release v0.23.0 (July 1, 2026), commits as recent as July 21, 2026 (the research date itself) · Verified 2026-07-21: re-checked directly via `gh api repos/NVIDIA-NeMo/Guardrails` (not archived, pushed_at 2026-07-21T10:30:07Z, 183 open issues) and `gh api repos/NVIDIA-NeMo/Guardrails/releases/latest` (tag v0.23.0, published 2026-07-01T16:22:19Z); confirmed the license by reading `LICENSE.md` directly (Apache-2.0 SPDX header).
   A runtime guardrail framework: you define programmable "rails" (topical, safety, jailbreak-detection, execution rails around tool/agent calls) that intercept a conversation or agent action before and after the LLM call, blocking or rewriting outputs that violate the configured policy. This is a *guardrail framework* in the sense the task asks for — it constrains behavior in production, rather than testing for it offline — and it is the category closest to "ongoing supervision of an autonomous system," though it enforces rules the operator writes, not an independent judgment about the model's inner state.
   Source: <https://github.com/NVIDIA-NeMo/Guardrails>
2. **garak (NVIDIA)** — License: Apache-2.0 · Status: actively maintained, latest release v0.15.1 (June 5, 2026), commits as recent as July 14, 2026, 8.5k+ GitHub stars · Verified 2026-07-21: re-checked directly via `gh api repos/NVIDIA/garak` (not archived, pushed_at 2026-07-14T20:29:03Z) and `gh api repos/NVIDIA/garak/releases/latest` (tag v0.15.1, published 2026-06-05T17:24:50Z).
   An LLM "vulnerability scanner": a CLI tool with 50+ probe modules that throw known failure-inducing inputs at a model or agent (jailbreaks, prompt injection, data leakage, hallucination, toxic generation, and — as of the May 2026 v0.15.0 release — an "Agent-breaker" probe aimed specifically at tools available to LLM agents) and reports which probes succeeded. This is offline/pre-deployment testing for *unexpected or unsafe behavior*, not a measurement of anything resembling awareness or experience.
   Source: <https://github.com/NVIDIA/garak>
3. **PyRIT (Microsoft)** — License: MIT · Status: actively maintained, latest release v0.14.0 (June 5, 2026), commits as recent as July 21, 2026 (the research date itself); note the project moved from `Azure/PyRIT` (archived March 27, 2026) to the current canonical `microsoft/PyRIT` — verify against the new location, not the old one · Verified 2026-07-21: re-checked directly via `gh api repos/microsoft/PyRIT` (not archived, MIT license, pushed_at 2026-07-21T01:53:35Z) and `gh api repos/microsoft/PyRIT/releases/latest` (tag v0.14.0, published 2026-06-05T22:22:48Z); separately confirmed `gh api repos/Azure/PyRIT` shows `archived: true` so a researcher doesn't cite the old, frozen location.
   An automation framework built by Microsoft's own AI Red Team for orchestrating adversarial-prompt campaigns against a target model or agent — generating and iterating attack prompts, scoring responses, and logging what got past the system's defenses. Like garak, this tests for exploitable, unsafe, or policy-violating *behavior*, under adversarial pressure; it has no mechanism for, and makes no claim about, assessing sentience or inner experience.
   Source: <https://github.com/microsoft/PyRIT>

### Recommendation

**Closest real practice: guarding against unexpected/unsafe autonomous behavior — not measuring sentience, which no tool in this space claims or attempts to do.** If you're running any of the agent stacks from the "Autonomous decision-making" row above, start with NeMo Guardrails as the runtime layer (it's the one of the three actually built to sit in the loop and constrain live behavior), then use garak and/or PyRIT before deployment to probe for jailbreaks and prompt-injection weaknesses the guardrails might miss. All three are current, actively-maintained, permissively-licensed (Apache-2.0/MIT) projects — but readers should come away understanding this row is a reinterpretation, not a real answer to "is it sentient": that question has no open-source instrument, full stop.

### Plays well with

Directly complements the "Autonomous decision-making" row's candidates (CrewAI, OpenHands, AutoGPT) — NeMo Guardrails wraps around any of them as a runtime policy layer, while garak and PyRIT are used to red-team the underlying model before it's given agentic tool access. All three are model-agnostic and can point at the same local open-weight model chosen elsewhere in this group.

### Agreement with index.html

Disagree — the index.html line plays along with the bit ("read the weights" as a stand-in for insight into sentience), which is fair satire, but taken literally it overstates what's real: no open-source tool, weight-readable or not, tests for or resolves the sentience question. The genuinely real practice available today is behavioral guardrails and red-teaming, which is a different (and answerable) problem than the one the row's row-label names.

---
