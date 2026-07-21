# Research brief: Interface & Input — Open Source Ecosystem Report

Research date: 2026-07-21

## Row: Primary interface

**index.html currently claims (verbatim, Open Source column):** "Terminal, self-hosted web UIs (Open WebUI), Home Assistant voice for ambient pickup"

### Top 3 candidates

1. **Open WebUI** — License: "Open WebUI License" (BSD-3-Clause base + mandatory branding-retention clause for deployments over 50 users, plus a CLA for contributions; code through v0.6.5 remains plain BSD-3-Clause and is freely forkable) · Status: actively maintained, latest release v0.10.2 (July 1, 2026), 166 releases, 17,201+ commits · Verified 2026-07-21: fetched the live GitHub repo page (not archived, ongoing commits) and cross-checked the April 2025 license-change discussion (GitHub Discussion #8467) and community coverage of the branding-clause backlash.
   Self-hosted, ChatGPT-style web front end for local or remote model backends (Ollama, OpenAI-compatible APIs). All chat data and RAG documents stay on your own server by default — nothing is sent to Open WebUI's maintainers. The 2025 license change is a real privacy-adjacent caveat for readers: it's no longer pure BSD-3 for new code, and large multi-tenant deployments must keep "Open WebUI" branding visible, though personal/family self-hosting (≤50 users) is unaffected.
   Source: <https://github.com/open-webui/open-webui>
2. **Home Assistant Assist (voice pipeline)** — License: Apache-2.0 (Home Assistant Core) · Status: actively maintained, Home Assistant Core latest release 2026.7.2 (July 10, 2026), 113,000+ commits, 1,618 releases · Verified 2026-07-21: fetched the live GitHub repo page (not archived) and confirmed via multiple independent 2026 write-ups (Botmonster, InsiderLLM, personal blog posts) that the fully-local Assist stack (Wyoming protocol + Whisper STT + Piper TTS + Ollama) is a current, documented, actively-used setup.
   Assist wires together wake-word detection, speech-to-text, a conversation agent, and text-to-speech entirely over the local network via the open Wyoming protocol (originating from the Rhasspy project). Run fully locally (faster-whisper + Piper + a local Ollama model), no audio or transcript ever needs to leave the home network — this is the closest real analogue to "ambient voice pickup shipwide" without a cloud dependency.
   Source: <https://www.home-assistant.io/voice_control/voice_remote_local_assistant/>
3. **oterm** — License: MIT · Status: actively maintained, latest release v0.20.0 (June 30, 2026), 81 releases, 835+ commits · Verified 2026-07-21: fetched the live GitHub repo page directly (not archived, ongoing release cadence through mid-2026).
   A terminal UI client that talks to Ollama and any pydantic-ai-supported provider (OpenAI, Anthropic, local OpenAI-compatible servers like llama.cpp/vLLM/LM Studio) with no browser or web server required. Chat history and settings are stored locally in SQLite; when pointed at a local Ollama endpoint, nothing leaves the machine. This is the direct real-world match for the "Terminal" half of the index.html claim.
   Source: <https://github.com/ggozad/oterm>

### Recommendation

Start with Home Assistant's Assist pipeline if ambient, hands-free pickup is the goal — it's the only one of the three that's actually designed for "walk up and talk," and it's fully local end-to-end. Layer Open WebUI on top for a shared, multi-user chat surface (family members, phone browsers), but budget time to read the 2025 license change before deploying it at any scale beyond a household, since the branding clause is a real (if narrow) departure from the project's original BSD-3 terms. Keep oterm in the toolbox for your own quick, no-server terminal access to the same local models — it has near-zero setup cost and no license caveats, but it's single-user and not something you'd hand to a non-technical family member.

### Plays well with

Home Assistant Assist needs a local inference backend — pairs directly with a local-LLM runtime (e.g., Ollama) that would be the natural pick in a Data Storage & Processing-style group. Open WebUI and oterm can point at that same backend, so all three candidates can share one self-hosted model server rather than requiring three separate stacks.

### Agreement with index.html

Agree — Open WebUI and Home Assistant's Assist voice pipeline are both real, current, actively-maintained projects that do what the claim says, and a terminal remains a genuine, low-overhead primary interface for this kind of self-hosted stack.

---

## Row: Touchscreen GUI (`data-row="r2"`)

**index.html currently claims (verbatim, Open Source column):** "Linux touch support is real but patchy — and open computer-use agents can drive a screen too" (status: caveat)

### Top 3 candidates

1. **GNOME (GNOME Shell / mobile-adaptive libadwaita apps)** — License: GPL-2.0-or-later (core) · Status: actively maintained, current stable line GNOME 48 with point release 6.48-era fixes through mid-2026 · Verified 2026-07-21: confirmed via 2026 GNOME Discourse and Framework community-forum threads showing active discussion and bug reports against the current release, plus KDE/GNOME release cadence checks.
   The default Linux desktop's touch handling: on-screen gestures, tablet-mode auto-rotation, and adaptive (libadwaita) apps that resize for touch. Fully local, no telemetry by default. It genuinely earns the "patchy" label — 2026 community threads still report basic gestures not registering and tablet-mode detection breaking on some hardware, which is the same caveat index.html gives this row.
   Source: <https://gitlab.gnome.org/GNOME/gnome-shell>
2. **KDE Plasma Mobile** — License: GPL/LGPL (standard KDE licensing) · Status: actively maintained as part of the KDE Plasma 6 line, latest maintenance point release 6.6.5 (May 12, 2026) · Verified 2026-07-21: confirmed via KDE's own 2026 Plasma release announcements and Wikipedia's actively-updated Plasma Mobile entry describing ongoing postmarketOS/PinePhone support.
   A touch-first Plasma shell built specifically for phones and tablets (PinePhone, OnePlus 6 via postmarketOS), rather than a touch mode bolted onto a desktop shell. More consistent on supported hardware than desktop-GNOME's touch mode, but device support is narrower — it targets a short list of mainline-Linux phones, not arbitrary touchscreen laptops.
   Source: <https://invent.kde.org/plasma-mobile>
3. **Cua (trycua/cua)** — License: MIT · Status: actively maintained, latest package release `@trycua/fleet` v0.0.3 (July 15, 2026), 20.4k GitHub stars, 226 open issues / 290 open PRs · Verified 2026-07-21: fetched the live GitHub repo/releases page directly (not archived, releases within the past week of the research date).
   Open-source infrastructure for computer-use agents: sandboxed virtual desktops (macOS/Linux/Windows) plus an SDK and benchmark suite so a vision-capable model can perceive a screen and drive it with clicks/taps/keystrokes, rather than relying on brittle DOM selectors. This is the real-world "open computer-use agent" the claim references — worth flagging that a commonly-cited alternative, Open Interpreter, rewrote itself in 2026 as a coding agent and dropped its original computer-use focus (its GUI-control features now live only in a community fork, endolith/open-interpreter, which itself has no vision/GUI-automation features), and another common pick, OthersideAI/self-operating-computer, has had no commit since September 2025 — so Cua is the more current pick for this specific use case.
   Source: <https://github.com/trycua/cua>

### Recommendation

If you already run a Linux desktop, don't add anything — GNOME's or Plasma Mobile's touch support (whichever your distro ships) is "good enough, patchy" out of the box and matches what index.html actually claims. Reach for Cua only for the narrower job the claim's second half describes: letting an agent operate a touchscreen (or any screen) on your behalf, e.g. driving a legacy non-touch application through a vision model. Don't reach for Open Interpreter for this specific job in 2026 — it's still a fine coding agent, but it's no longer a computer-use tool.

### Plays well with

Cua needs a vision-capable model to actually see and act on the screen — pairs with a local multimodal inference pick in a Data Storage & Processing-style group, and can share the same local model server discussed in the Primary interface row (Home Assistant/Ollama stack) if that server also hosts a vision model.

### Agreement with index.html

Agree — Linux touchscreen support is genuinely inconsistent in current releases (GNOME's own 2026 community threads confirm gesture and tablet-mode bugs), and open, MIT-licensed computer-use agents (Cua) really can drive a screen today.

---

## Row: Natural language processing (`data-row="r3"`)

**index.html currently claims (verbatim, Open Source column):** "Open-weight models are genuinely conversational — a step behind frontier on the hardest reasoning" (status: caveat)

### Top 3 candidates

1. **DeepSeek V4 (V4-Pro / V4-Flash)** — License: MIT (weights) · Status: actively maintained, released April 24, 2026; technical report dated April 26, 2026 · Verified 2026-07-21: fetched the live Hugging Face model card for deepseek-ai/DeepSeek-V4-Pro directly, confirming the MIT license and April 2026 release, cross-checked against independent 2026 model-guide coverage (OpenRouter's "open weight models that matter" series).
   A mixture-of-experts family (V4-Pro: 1.6T total / 49B active parameters; V4-Flash: 284B total / 13B active), both with 1M-token context, downloadable from Hugging Face and runnable fully offline once fetched. MIT licensing permits commercial use, fine-tuning, and self-hosting with no callback to DeepSeek's servers — genuine "no conversation data leaves your machine" privacy posture once self-hosted, though "open-weight" here means the weights are open, not the training data or full training pipeline.
   Source: <https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro>
2. **Qwen3.6-27B** — License: Apache-2.0 · Status: actively maintained, released April 22, 2026, still Alibaba's newest fully open-weight general model as of this research date (the newer Qwen3.8-Max, previewed July 19, 2026, remains proprietary/API-only so far) · Verified 2026-07-21: confirmed via multiple independent July 2026 sources (MarkTechPost, Dataconomy) reporting the Qwen3.8 preview alongside explicit confirmation that Qwen3.6-27B remains the latest open-weight release, plus the Hugging Face repo's own LICENSE file.
   A 27B-parameter dense multimodal model built for agentic coding and repository-level reasoning, small enough to self-host on a single consumer-class GPU (unlike DeepSeek's much larger MoE variants). Apache-2.0 with no commercial-use restriction; runs fully locally via Ollama/vLLM/llama.cpp once downloaded, so no data has to leave the host.
   Source: <https://huggingface.co/Qwen/Qwen3.6-27B>
3. **Mistral Large 3** — License: Apache-2.0 · Status: actively maintained, released December 2, 2025 as Mistral's flagship open-weight model (with a further open-weight model in early access as of July 2026, per Mistral's own July 6, 2026 announcement) · Verified 2026-07-21: confirmed via Mistral's own product announcement and independent July 2026 model-guide coverage describing the ongoing Mistral 3 family and ~2026 early-access follow-up model.
   A sparse mixture-of-experts model (41B active / 675B total parameters) available in base, instruct, and reasoning variants on Hugging Face. Apache-2.0 covers essentially the whole Mistral 3 family (the one confirmed exception being the separately-licensed Voxtral TTS audio model), so downstream users can redistribute and commercialize without a legal review. Self-hostable for full data locality, at real hardware cost given the parameter count.
   Source: <https://mistral.ai/news/mistral-3/>

### Recommendation

For a home/self-hosted setup, start with Qwen3.6-27B — it's the only one of the three that realistically runs on a single consumer GPU, which matters more for actual adoption than raw benchmark position. Reach for DeepSeek V4-Flash (not V4-Pro; the Pro variant's 1.6T total parameters puts it out of reach for anyone without a small server farm) or Mistral Large 3 only if you have the hardware and want the strongest open-weight reasoning available, accepting that both still trail the best closed frontier models on the hardest reasoning benchmarks (DeepSeek-V4-Pro-Max ties Gemini 3.1 Pro on SWE-bench Verified but doesn't lead it). None of the three publish full training-data provenance, so "open-weight" should not be read as "fully auditable" — a real privacy/transparency limit worth stating plainly to readers.

### Plays well with

All three need a local inference runtime to actually self-host — pairs directly with the local-LLM inference pick (e.g., Ollama, llama.cpp, or vLLM) that belongs in a Data Storage & Processing-style group, and can share the same backend already referenced by the Primary interface row (Open WebUI / oterm / Home Assistant Assist) and the Touchscreen GUI row's computer-use pick (Cua, if a multimodal variant is used).

### Agreement with index.html

Agree — DeepSeek V4, Qwen3.6, and Mistral Large 3 are all genuinely conversational, currently-maintained open-weight models, and independent 2026 benchmarking (e.g., SWE-bench Verified) confirms the best of them still sit a notch behind the top closed frontier models on the hardest reasoning tasks, exactly as the claim states.
