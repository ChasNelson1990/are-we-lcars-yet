# Research brief: Simulation & Holography — Open Source Ecosystem Report

Research date: 2026-07-21

## Row: Holodeck / holo‑environments (`data-row="r10"`)

**index.html currently claims (verbatim, Open Source column):** "Not available — SteamVR on Linux exists, still no photons with mass"

**Honest framing up front: the index.html verdict stands as literally true — no open-source project generates forcefield-assisted matter you can touch, and nothing below rebuts that.** The three candidates are the closest real substitute for the *immersive, shared, walk-around virtual environment* half of a holodeck: an open XR runtime layer, a self-hosted wireless streaming layer that gets you untethered in a room, and a self-hosted multi-user content platform for the shared-space experience. None of them dispute "no photons with mass."

### Top 3 candidates

1. **Monado** — License: Boost Software License 1.0 · Status: actively maintained, latest stable release 25.1.0 (December 9, 2025), with in-progress "vNEXT" changelog entries dated as recent as 2026-07-21 (the research date itself) · Verified 2026-07-21: re-checked directly against the project's own hosted changelog (monado.pages.freedesktop.org/monado/_c_h_a_n_g_e_l_o_g.html), which lists 25.1.0 (2025-12-09) as the newest tagged release and an active vNEXT section above it; cross-checked the license against Guix/Fedora packaging metadata and a March 2026 GamingOnLinux report on Monado becoming a shared open-source foundation for multiple commercial OpenXR vendors.
   Monado is the open-source implementation of the Khronos OpenXR standard for GNU/Linux (with Android and Windows support): the compositor and runtime layer that lets an application talk to VR/AR hardware without a proprietary driver stack. It underpins several downstream projects, including WiVRn below, and runs entirely on hardware and software you control — no telemetry-collecting vendor runtime is required to get an OpenXR app on screen.
   Source: <https://gitlab.freedesktop.org/monado/monado>
2. **WiVRn** — License: GPL-3.0 · Status: actively maintained, latest release v26.6.2 (July 14, 2026), commits as recent as July 21, 2026 (the research date itself) · Verified 2026-07-21: re-checked directly via `gh api repos/WiVRn/WiVRn` (not archived, GPL-3.0 license, pushed_at 2026-07-21T07:34:10Z) and `gh api repos/WiVRn/WiVRn/releases/latest` (tag v26.6.2, published 2026-07-14T12:42:58Z).
   WiVRn wirelessly streams a PC-rendered OpenXR/SteamVR-compatible scene to a standalone Android headset (Quest 1–3S, Pico 4, Vive Focus/XR Elite and others), built on top of Monado, so all rendering, compositing, and networking run on hardware you own with no cloud relay. It is the more actively-released of the two Linux streaming options — ALVR (MIT, also self-hostable) is a reasonable alternative but has had no tagged release since July 2025 despite ongoing commits, whereas WiVRn ships monthly.
   Source: <https://github.com/WiVRn/WiVRn>
3. **Hubs (Hubs Foundation, formerly Mozilla Hubs)** — License: MPL-2.0 · Status: actively maintained by the community-run Hubs Foundation after Mozilla ended its own hosted service May 31, 2024; latest tagged production release prod-2026-03-11, with commits as recent as July 8, 2026 · Verified 2026-07-21: re-checked directly via `gh api repos/Hubs-Foundation/hubs` (not archived, MPL-2.0 license, pushed_at 2026-07-08T20:24:23Z) and the repo's release history (most recent tag prod-2026-03-11); cross-checked the Mozilla-to-Foundation handoff against Mozilla's own support article ("End of support for Mozilla Hubs") to confirm the transfer is real and the open-source line continues rather than having quietly died with the Mozilla shutdown.
   Hubs is a self-hostable, browser-based (WebXR) multi-user virtual space platform: invite others into a 3D room, walk around, bring in web content, and talk over spatialized voice, with the companion Spoke editor for building custom scenes. It's the closest open-source analog to the *shared, persistent, walk-in environment* half of a holodeck — but it is flat WebXR content in a rendered scene, not a compositor-and-hardware runtime, so it complements rather than replaces Monado/WiVRn.
   Source: <https://github.com/Hubs-Foundation/hubs>

### Recommendation

There is no real candidate that rebuts "no photons with mass" — that stays true. If the goal is the closest practical open stack for room-scale shared VR today: start with Monado as the runtime layer (it's now a shared foundation several commercial headset vendors build on, so compatibility is broad), add WiVRn if the headset is a standalone Android device that needs to talk to a Linux PC wirelessly, and use Hubs for the actual shared/social/persistent-space experience once hardware and runtime are sorted. None of the three attempt tactile forcefield-generated matter; all three are genuinely self-hostable with no vendor account required to run the core software.

### Plays well with

Monado and WiVRn are complementary layers (WiVRn is built on Monado), not competitors — pick both if the headset is a standalone Quest/Pico-class device. Hubs sits at the content/experience layer above either and can be authored with the same Godot/Blender-style open 3D tooling referenced elsewhere in the open-source stack. For local AI-driven characters populating a Hubs space, pair with the persona/memory tooling in the next row.

### Agreement with index.html

Agree — the verdict that full sensory, forcefield-assisted holodeck matter is "not available" remains accurate; SteamVR-on-Linux (and its genuinely open alternatives Monado/WiVRn) get you shared immersive VR, never tangible photons.

---

## Row: Holographic crew (`data-row="r11"`)

**index.html currently claims (verbatim, Open Source column):** "Self‑hosted personas persist exactly as long as your backups do"

**Honest framing up front: no open-source tool renders a literal walking, talking hologram — the three candidates below are memory-persistence layers for AI personas/agents, the real substitute for a hologram "crew member" that has to remember who you are across sessions.**

### Top 3 candidates

1. **Letta (formerly MemGPT)** — License: Apache-2.0 · Status: actively maintained, latest release 0.16.8 (May 14, 2026), commits as recent as July 3, 2026 · Verified 2026-07-21: re-checked directly via `gh api repos/letta-ai/letta` (not archived, pushed_at 2026-07-03T18:53:41Z) and `gh api repos/letta-ai/letta/releases/latest` (tag 0.16.8, published 2026-05-14T17:14:24Z); confirmed the license by reading the repo's `LICENSE` file directly (Apache-2.0 text).
   Letta is a self-hostable framework and server for building "stateful" LLM agents whose identity is a persistent object: a fixed set of "core memory" blocks (persona + human facts) that stay in every context window, plus an "archival memory" the agent can search for older detail, all stored in a database you run (Postgres or SQLite). Kill the process, restart it, and the persona resumes exactly where it left off — because "the persona" is rows in your database, so it survives precisely as long as that database's backups do, matching the index.html line almost literally.
   Source: <https://github.com/letta-ai/letta>
2. **Mem0** — License: Apache-2.0 · Status: actively maintained, latest release cli-node-v0.2.11 (July 13, 2026), commits as recent as July 21, 2026 (the research date itself) · Verified 2026-07-21: re-checked directly via `gh api repos/mem0ai/mem0` (not archived, pushed_at 2026-07-21T14:28:55Z, 61k+ stars) and `gh api repos/mem0ai/mem0/releases/latest`; confirmed the license by reading the repo's `LICENSE` file directly (Apache-2.0 text).
   Mem0 is a memory layer you attach to an existing agent/chat stack: it extracts durable facts and preferences from conversations, stores them in a vector/graph store of your choosing (self-hosted Qdrant, Neo4j, or others), and retrieves relevant memories back into future prompts so the same "persona" keeps continuity across sessions and even across different front-end apps. It's lower-level than Letta — a memory API to bolt onto whatever agent runtime you already have, rather than a full agent server — and, like Letta, the persona's continuity is entirely a function of whether you're backing up that vector/graph store.
   Source: <https://github.com/mem0ai/mem0>
3. **Graphiti** — License: Apache-2.0 · Status: actively maintained, latest release v0.29.2 (June 8, 2026), commits as recent as July 20, 2026 · Verified 2026-07-21: re-checked directly via `gh api repos/getzep/graphiti` (not archived, pushed_at 2026-07-20T15:21:54Z, 29k+ stars) and `gh api repos/getzep/graphiti/releases/latest` (tag v0.29.2, published 2026-06-08T14:25:39Z). Note: the separate `getzep/zep` repository is **not** this candidate — as of 2026 it is explicitly relabeled "Zep Cloud: Examples & Integrations" (confirmed by reading its README directly) for the commercial hosted Zep product, after Zep's Community Edition was deprecated in April 2025; Graphiti is the actual self-hostable open-source engine that used to power it and is still independently maintained.
   Graphiti is a self-hosted temporal knowledge-graph engine for agent memory: facts are stored as graph edges with validity time ranges against a database you run (Neo4j or FalkorDB), so an agent can reason about what was true *when*, not just what's true now, and correct or supersede facts as they change rather than silently overwriting them. It's the most structurally sophisticated of the three for a "crew member" persona that needs to track evolving relationships and history, at the cost of running and backing up a graph database yourself.
   Source: <https://github.com/getzep/graphiti>

### Recommendation

Start with Letta if the goal is one persistent named persona with a simple, inspectable memory model — it's a complete self-hosted agent server, not just a library, and the "restart and it remembers" behavior is the most direct real-world match to index.html's claim. Reach for Mem0 if there's already an agent/chat stack in place and only a memory layer is needed on top. Choose Graphiti specifically when the persona needs to track *changing* facts over time (relationships, role changes, corrections) rather than a flat fact list — but budget for running and backing up a real graph database, since Graphiti is a library/engine, not a turnkey server. All three make the index.html caveat literal: the persona is data, and it is exactly as durable as the database backups protecting that data.
Watch the naming trap here: searching for "Zep" turns up the still-Apache-licensed `getzep/zep` GitHub repo, but that repository now ships only Zep Cloud example code — the actual open-source, self-hostable engine is Graphiti, a separate repo under the same organization.

### Plays well with

All three are memory-persistence layers, not persona/character front ends — they pair with the character-persona tooling from AI & Autonomy (Task 4: Ollama Modelfiles, SillyTavern, Open WebUI) to give a persona both a personality/voice and a durable memory, and with the local-inference runtimes from Interface & Input / Data Storage & Processing (Ollama, llama.cpp, vLLM) as the model actually doing the talking.

### Agreement with index.html

Agree — Letta, Mem0, and Graphiti are all real, currently-maintained, self-hostable projects whose entire value proposition is that a persona's continuity is stored data; if you don't back that data up, the persona is gone, exactly as the row states.

---
