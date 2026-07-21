# Synthesis: Open Source Ecosystem Report

Research date: 2026-07-21. Synthesizes briefs 01-08 (all 22 rows) into cross-brief
corrections, reference stacks, and a compatibility matrix for Tasks 11-13.

## Cross-brief corrections

Two specific cross-references were called out by name in this task's brief. Both
were checked against the source briefs and found **already consistent** — no
corrective edit is needed when Tasks 11-13 transcribe them, but it's worth
recording that the check happened rather than silently assuming it:

- **Natural language processing (Task 1) vs. Core architecture (Task 3):**
  Task 3's Core architecture row explicitly defers model choice to Task 1's NLP
  row ("Model selection ... is already covered in the ... 'Natural language
  processing' row of Task 1 ... this row and that one should not be read as
  offering two different 'which model' answers"). Confirmed consistent: Task 3
  recommends Ollama as the *runtime*, Task 1 recommends Qwen3.6-27B as the
  *model* that runtime loads. No conflict, no adjustment needed.
- **Personal access device (Task 2, r18) vs. Personal communicator (Task 2, r20):**
  Both rows are in the same brief and already cross-reference each other
  correctly: r18 recommends Fairphone 6, r20 recommends /e/OS + Signal
  specifically because /e/OS is Murena's stock OS on that same Fairphone 6 —
  one coherent real-world stack. The GrapheneOS alternative in r20 is already
  flagged in-brief as trading away r18's Fairphone pick for Pixel hardware. No
  conflict, no adjustment needed.

Beyond those two named checks, reading all 8 briefs together surfaced four
further points worth flagging so Tasks 11-13 transcribe them with the right
cross-links rather than as isolated facts:

- **Touchscreen GUI's Cua (Task 1, r2) vs. Natural language processing (Task 1, r3):**
  Cua's "Plays well with" note says it "needs a vision-capable model to
  actually see and act on the screen ... pairs with a local multimodal
  inference pick in a Data Storage & Processing-style group" — but the
  multimodal model it needs is already sitting in the *same* brief: Task 1's
  own NLP recommendation, Qwen3.6-27B, is explicitly described there as "a
  27B-parameter dense **multimodal** model." When Task 11 transcribes the
  Touchscreen GUI row, its "Plays well with" link should point directly at
  `#row-nlp` (Qwen3.6-27B) rather than a generic pointer to "a Data Storage &
  Processing-style group" — the model already exists in this report, it
  doesn't need inventing.
- **Universal translator (Task 7, r14) and Piper TTS's archived status (Task 1, r1):**
  Task 7's "Plays well with" note mentions "local TTS engines (e.g. Piper, not
  covered here)" without qualification. Task 1's Primary interface row already
  did the diligence on Piper: `rhasspy/piper` is archived upstream (confirmed
  `archived: true`, last pushed 2025-08-26) — still functional and widely used
  as a Wyoming-protocol TTS add-on, but not a project to expect new releases
  from. Task 13 (or wherever Universal translator links to Piper) should carry
  that one-line caveat forward rather than implying Piper is under active
  development.
- **Onboard AI personality (Task 4, r7) and Core architecture (Task 3):**
  Both independently land on Ollama as their #1 pick — Task 3 for the
  inference runtime itself, Task 4 for the Modelfile `SYSTEM` directive that
  bakes a persona into a model served by that same runtime. This isn't a
  conflict, it's the same install doing double duty. Tasks 11/12 should link
  the two rows explicitly (one Ollama instance, two jobs: serving the model
  and holding the persona) rather than transcribing them as two unrelated
  discoveries of the same tool.
- **Ship terminal / console hardware (Task 2, r17) and Self-repair capability (Task 8):**
  Both rows independently rank Framework Computer's Laptop 13/16/Desktop line
  as their #1 pick, for two different reasons (r17: modular/repairable daily
  driver; Task 8: schematics/parts/EC-firmware openly published). Not a
  conflict — a genuine reinforcement — but Task 11/Task 12 should cross-link
  the two rows (`#row-ship-terminal` ↔ `#row-self-repair-capability`) since a
  reader who picks Framework for one gets the other for free, rather than
  treating them as two separate recommendations to shop for.

## Reference stacks

### Stack 1: Home Assistant-centric smart home

The hub is Home Assistant Core with the **Assist** voice pipeline (Primary
interface, `#row-primary-interface`): wake-word detection, faster-whisper
speech-to-text, the Assist conversation agent, and Piper text-to-speech, wired
together over the local network via the open **Wyoming protocol**. Assist's
conversation agent calls out to a local model server — **Ollama** (Core
architecture, `#row-core-architecture`) — over its OpenAI-compatible HTTP API,
serving **Qwen3.6-27B** (Natural language processing, `#row-nlp`) as the
default self-hostable, single-consumer-GPU model. That same Ollama instance
holds the household's **Onboard AI personality** (`#row-onboard-ai-personality`)
via a Modelfile `SYSTEM` directive, so the voice assistant, the persona, and
the model are one running process, not three. **Open WebUI** layers on top as
the shared browser front end for family members (also Primary interface),
inheriting the same backend. For "hands doing things, not just talking,"
**CrewAI** (Autonomous decision-making, `#row-autonomous-decision-making`)
orchestrates multi-step home-automation tasks against the same local model,
wrapped in **NeMo Guardrails** (Known sentience risk / guardrails,
`#row-known-sentience-risk`) as the runtime policy layer — since nothing in
CrewAI's open core stops it from calling a destructive tool, guardrails are
the operator-supplied safety net the row's own honest framing calls for.
**whisper.cpp + Argos Translate** (Universal translator,
`#row-universal-translator`) hangs off the same Wyoming/local-network pattern
for translating incoming speech before Assist ever sees it. The household
runs **TrueNAS Community Edition** (Storage medium, `#row-storage-medium`) as
the box underneath all of this — HA's config, Open WebUI's chat/RAG storage,
and Ollama's model weights all live on the same ZFS-backed volume — and
**Keycloak** (Authorization method, `#row-authorization-method`) sits in front
of Open WebUI and any other self-hosted dashboard as a single WebAuthn/FIDO2
SSO login, rather than a separate password per app. **Uptime Kuma** (Uptime,
`#row-uptime`) pings HA's own health endpoint and the Ollama server; when
something breaks, the fallback is **r/selfhosted** and the **Home Assistant
Community Forum** (Support channel, `#row-support-channel`).

### Stack 2: Mobile / daily-driver privacy

The phone is a **Fairphone 6** (Personal access device,
`#row-personal-access-device`) running **/e/OS** (Personal communicator,
`#row-personal-communicator`) — the same hardware/software pairing both rows
independently converge on, since /e/OS is Murena's stock build for that
device. Messaging and calls run over **Signal**, whose AGPLv3/GPLv3 client and
protocol keep both the transport and the crypto auditable end to end — the
Signal Protocol's double-ratchet key exchange is the actual "E2E-encrypted"
mechanism the pricing table's claim gestures at. Credentials for everything
else — Wi-Fi, self-hosted service logins, any passkeys the phone holds for
third-party sites — live in **Vaultwarden** (Authorization method,
`#row-authorization-method`), an unofficial Rust reimplementation of the
Bitwarden API that the phone's Bitwarden app talks to over the household's own
server instead of Bitwarden's cloud; WebAuthn/FIDO2 hardware keys back up the
vault unlock itself. Files sync to **Nextcloud Hub**'s folder-level end-to-end
encryption (Storage medium, `#row-storage-medium`) — chosen over Proton Drive
here specifically because Nextcloud's server is one you run, keeping the
"only you hold the keys" property intact for the mobile-daily-driver use case
rather than trusting Proton's (open-client, closed-server) infrastructure.
A **Framework Laptop** (Ship terminal / console hardware,
`#row-ship-terminal`) is the pairing/flashing workstation for the phone —
ADB, /e/OS updates, and Vaultwarden's desktop client all run from it — and
its own repairability (Self-repair capability,
`#row-self-repair-capability`) mirrors the phone's user-replaceable-battery
ethos. When something needs fixing or explaining, the fallback is the same
**r/selfhosted**/Matrix-room community (Support channel,
`#row-support-channel`) as Stack 1.

### Stack 3: Self-hosted AI & local-LLM

The model layer is **Qwen3.6-27B** (Natural language processing, `#row-nlp`),
a 27B-parameter dense multimodal model chosen specifically because it fits on
one consumer GPU and its multimodal support covers the vision-agent use case
below without a second model. It's served by **Ollama** (Core architecture,
`#row-core-architecture`) as a GGUF-quantized local endpoint speaking an
OpenAI-compatible HTTP API — the same endpoint every other tool in this stack
points at, so there is one model server, not several. That same Ollama
instance carries the household's persona via a Modelfile `SYSTEM` directive
(Onboard AI personality, `#row-onboard-ai-personality`) — the identical
mechanism Stack 1 uses, reused rather than reinvented, since it's the same
Ollama install either way. The day-to-day human interface to it is
**oterm** (Primary interface, `#row-primary-interface`), a terminal client
built specifically to talk to Ollama and other OpenAI-compatible local
servers with no browser or web server required, matching this stack's
no-GUI-overhead ethos better than Open WebUI's browser front end does. All
of it — the model weights, oterm's local SQLite chat history, and Letta's
memory database (below) — lives on **TrueNAS Community Edition** (Storage
medium, `#row-storage-medium`), the same ZFS-backed box whose OpenZFS layer
(Processing redundancy, below) actually protects it. **CrewAI** and
**OpenHands** (Autonomous decision-making,
`#row-autonomous-decision-making`) orchestrate agentic work — CrewAI for
multi-step planning/delegation, OpenHands specifically for real
terminal/file/browser tasks — both LLM-agnostic and both pointed at the local
Ollama endpoint rather than a hosted API key. Because neither ships a safety
reviewer, **NeMo Guardrails** wraps the runtime as a policy layer (blocking
unsafe tool calls before they execute), while **garak** and **PyRIT** (Known
sentience risk / adjacent-real-practice row, `#row-known-sentience-risk`) are
run offline beforehand to probe the model/agent combination for jailbreaks
and prompt-injection weaknesses the guardrails might miss. For an agent that
also needs to *see and drive a screen* — the Touchscreen GUI row's actual
computer-use use case (`#row-touchscreen-gui`) — **Cua** provides the
sandboxed virtual-desktop layer, and it's Qwen3.6-27B's own multimodal
capability (not a separate model) that gives Cua the vision it needs, per
the correction above. Persona continuity across restarts is handled by
**Letta** (Holographic crew, `#row-holographic-crew`): its Postgres/SQLite-backed
core-memory blocks are literally what makes "the persona" survive a process
restart, exactly matching the pricing table's "persists exactly as long as
your backups do" framing — which is also why **OpenZFS** snapshots plus
**restic** off-site backups (Processing redundancy,
`#row-processing-redundancy`) matter here specifically: they're what makes
that survival real rather than aspirational.

### Stack 4: Field hardware, network hardening & reliability

This stack covers the rows the first three don't reach: physical field
equipment, home-network defense, and the operational discipline that keeps
any of the above running. The field kit is built around **M5Stack**'s
modular ESP32 sensor "Units" (thermal, environmental) for the most literal
"open hardware boards + thermal cams" match, or **HackRF One + PortaPack
Mayhem** for RF-scanning priority (Handheld sensor device,
`#row-handheld-sensor-device`) — both flashed and developed from the same
**Framework** laptop named in Stack 2 (`#row-ship-terminal`). For sky/space
work, **Stellarium** renders real Hipparcos/Gaia star-survey data and ships a
`NavStars` plugin of the 57 traditional celestial-navigation stars, with
**KStars**'s INDI-protocol backend added when the goal is actually pointing a
telescope rather than just viewing a chart (Stellar cartography,
`#row-stellar-cartography`). Perimeter defense is **OPNsense** as the edge
firewall/router, running **Suricata** in-line as IDS/IPS against known attack
signatures, with **CrowdSec** tailing service logs (SSH, reverse proxies) and
sharing its 10M+-IP community blocklist (Hostile takeover incidents,
`#row-hostile-takeover-incidents`) — three layers feeding a stream of
inspectable log lines rather than a fictional boarding count. **Uptime
Kuma** watches service availability and **Healthchecks.io** watches whether
scheduled backup jobs actually ran (Uptime, `#row-uptime`) — watching, not
owning, Stacks 1 and 3's own Storage medium and Processing redundancy picks
(TrueNAS, OpenZFS, restic), since neither protects anyone who silently
stopped running them, and Stack 4 doesn't introduce a separate storage or
redundancy architecture of its own to replace them.
When self-repair is needed, **Framework**'s published schematics/EC firmware
and **iFixit**'s crowd-documented repair guides (Self-repair capability,
`#row-self-repair-capability`) cover, respectively, the report's own hardware
picks and everything else a household owns. **r/selfhosted**, project-specific
Discourse forums, and Matrix/Discord channels (Support channel,
`#row-support-channel`) are the shared fallback across every stack in this
report, not unique to this one.

## Compatibility matrix

| Pricing-table row | Stack 1: Home Assistant smart home | Stack 2: Mobile / daily-driver privacy | Stack 3: Self-hosted AI & local-LLM | Stack 4: Field hardware, network & reliability |
| --- | --- | --- | --- | --- |
| Primary interface | Home Assistant Assist + Open WebUI | — | oterm (terminal access to same model) | — |
| Touchscreen GUI | — | — | Cua (computer-use agent, driven by Qwen3.6-27B's multimodal capability) | — |
| Natural language processing | Qwen3.6-27B (served via Ollama) | — | Qwen3.6-27B | — |
| Ship terminal / console hardware | — | Framework Laptop (phone pairing/flashing host) | — | Framework Laptop (field-device flashing host) |
| Personal access device | — | Fairphone 6 | — | — |
| Handheld sensor device | — | — | — | M5Stack Units / HackRF One + PortaPack Mayhem |
| Personal communicator | — | /e/OS + Signal | — | — |
| Storage medium | TrueNAS Community Edition | Nextcloud Hub (E2EE folder sync) | TrueNAS (model weights, oterm chat history, Letta's memory DB) | — (monitors Stack 1/3's TrueNAS; not Stack 4's own pick) |
| Core architecture | Ollama | — | Ollama | — |
| Processing redundancy | — | — | OpenZFS snapshots + restic (backing Letta's memory DB) | — (monitors Stack 3's OpenZFS/restic; not Stack 4's own pick) |
| Onboard AI personality | Ollama Modelfile `SYSTEM` directive | — | Ollama Modelfile `SYSTEM` directive (same instance as Core architecture) | — |
| Autonomous decision-making | CrewAI | — | CrewAI / OpenHands | — |
| Known sentience risk | NeMo Guardrails | — | NeMo Guardrails + garak/PyRIT | — |
| Holodeck / holo-environments | — | — | — | — |
| Holographic crew | — | — | Letta | — |
| Authorization method | Keycloak (SSO front door) | Vaultwarden | — | — |
| Hostile takeover incidents (logged) | — | — | — | OPNsense + Suricata + CrowdSec |
| Universal translator | whisper.cpp + Argos Translate | — | — | — |
| Stellar cartography | — | — | — | Stellarium + KStars |
| Self-repair capability | — | Framework Laptop repairability | — | Framework + iFixit |
| Uptime (malfunction-free episodes) | Uptime Kuma | — | — | Uptime Kuma + Healthchecks.io |
| Support channel | r/selfhosted + HA Community Forum | r/selfhosted | — | r/selfhosted + project Discourse/Discord |

Note: **Holodeck / holo-environments** (Monado + WiVRn + Hubs, from Task 5)
doesn't fit cleanly into any of the four stacks above as a home-network,
mobile-privacy, or local-LLM component — it's a standalone XR/VR runtime
stack in its own right. Rather than force it into one of the four named
stacks with a stretched justification, it's recorded here with "—" across the
board; Task 13 should present it as an independent, self-contained pairing
(Monado/WiVRn for the runtime + Hubs for the shared-space content layer) when
transcribing the reference-stacks section, cross-linked from Stack 3's
Holographic crew entry for readers who want an AI persona actually
*populating* a shared VR space (per Task 5's own "Plays well with" note).
