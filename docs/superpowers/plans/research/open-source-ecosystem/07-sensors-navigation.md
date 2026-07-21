# Research brief: Sensors & Navigation — Open Source Ecosystem Report

Research date: 2026-07-21

## Row: Universal translator (`data-row="r14"`)

**index.html currently claims (verbatim, Open Source column):** "Whisper + open translation models run locally — near‑real‑time, fewer languages, no cloud required"

### Top 3 candidates

1. **whisper.cpp** — License: MIT · Status: actively maintained, latest release v1.9.1 (June 19, 2026), commits as recent as July 11, 2026, 52k+ GitHub stars · Verified 2026-07-21: re-checked directly via `gh api repos/ggml-org/whisper.cpp` (not archived, MIT, pushed_at 2026-07-11T15:53:59Z) and `gh api repos/ggml-org/whisper.cpp/releases/latest` (tag v1.9.1, published 2026-06-19T05:53:19Z). Note the project moved from `ggerganov/whisper.cpp` to the `ggml-org` GitHub org; the old URL redirects.
   A C/C++ port of OpenAI's Whisper speech-recognition model built for local inference with no Python/CUDA dependency, running on CPU (including phones and Raspberry Pi) or with optional GPU acceleration. It ships a `stream` example specifically for near-real-time microphone transcription, which is the "near-real-time, no cloud" half of the row's claim — audio never leaves the device.
   Source: <https://github.com/ggml-org/whisper.cpp>
2. **Argos Translate** — License: MIT · Status: actively maintained, latest git tag v1.11.0 (tagged February 2, 2026), commits as recent as June 27, 2026, 6.3k+ GitHub stars · Verified 2026-07-21: re-checked directly via `gh api repos/argosopentech/argos-translate` (not archived, MIT, pushed_at 2026-06-27T16:18:53Z); confirmed the real version history via `gh api repos/argosopentech/argos-translate/tags` (v1.11.0) and `gh api .../git/tags/<sha>` (tagged 2026-02-02), since the GitHub "latest release" object is a stale 2021 v1.4.0 entry the project stopped using in favor of plain git tags + PyPI publishing.
   An offline neural machine translation library built on OpenNMT/CTranslate2, distributing per-language-pair model packages that install and run entirely locally — this is the actual "open translation model" a Whisper transcript would be piped through. Language coverage (~35 language pairs as packaged models) is real but far short of a commercial cloud API's 100+, matching the row's own "fewer languages" caveat.
   Source: <https://github.com/argosopentech/argos-translate>
3. **LibreTranslate** — License: AGPL-3.0 · Status: actively maintained, latest release v1.9.6 (May 26, 2026), commits as recent as July 19, 2026, 15k+ GitHub stars · Verified 2026-07-21: re-checked directly via `gh api repos/LibreTranslate/LibreTranslate` (not archived, AGPL-3.0, pushed_at 2026-07-19T12:01:37Z) and `gh api repos/LibreTranslate/LibreTranslate/releases/latest` (tag v1.9.6, published 2026-05-26T17:45:39Z).
   A self-hosted translation API/web UI that wraps Argos Translate's models behind a simple REST endpoint, so a household can run one local service that a Whisper transcript is POSTed to instead of calling Google/DeepL. It's the same underlying models as Argos Translate, packaged as a long-running server rather than a library — useful once more than one device/app needs to call the translator.
   Source: <https://github.com/LibreTranslate/LibreTranslate>

### Recommendation

Start with whisper.cpp for the speech-to-text leg — it's the most actively developed of the group (commits within the last two weeks) and its `stream` example is a working near-real-time local transcription pipeline out of the box. Feed its output into Argos Translate directly if this is a single-device/single-user setup (simplest, one Python process), or LibreTranslate if multiple devices/apps need to share one translation service over a local network. Either way, the honest caveat the row already states holds up: local models cover a real but limited language list, well short of what a cloud translation API supports, and end-to-end latency (transcribe, then translate, then optionally speak) is "near-real-time," not instant.

### Plays well with

Pairs naturally with any local-LLM voice assistant stack from Task 1 (e.g. a Home Assistant Voice / openWakeWord pipeline) for wake-word-triggered translation, and with local TTS engines (e.g. Piper, not covered here) to close the loop into spoken output. None of these three depend on any AI-autonomy or data-storage picks from other groups — they're a self-contained offline pipeline.

### Agreement with index.html

Agree — Whisper-family speech recognition plus locally-run open translation models is a real, currently-maintained, no-cloud-required stack, and "fewer languages" than a commercial cloud service is an accurate, not exaggerated, limitation.

---

## Row: Stellar cartography (`data-row="r15"`)

**index.html currently claims (verbatim, Open Source column):** "Stellarium + open sky‑survey data — the actual star charts are already open source"

### Top 3 candidates

1. **Stellarium** — License: GPL-2.0 · Status: actively maintained, latest release v26.2 (June 24, 2026), commits as recent as July 21, 2026 (the research date itself), 9.8k+ GitHub stars · Verified 2026-07-21: re-checked directly via `gh api repos/Stellarium/stellarium` (not archived, GPL-2.0, pushed_at 2026-07-21T07:56:12Z) and `gh api repos/Stellarium/stellarium/releases/latest` (tag v26.2, published 2026-06-24T17:37:08Z); confirmed the companion `Stellarium/stellarium-data` catalog repo is also actively pushed (2026-07-20).
   A desktop/mobile planetarium that renders real star catalogs (Hipparcos by default, with a Gaia DR2/DR3 star-catalog add-on for far deeper coverage) plus real deep-sky-object and satellite data, exactly the "actual star charts are already open source" claim. It even ships a `NavStars` plugin — a curated list of the 57 traditional celestial-navigation stars — which is the one candidate here that maps most literally onto a ship's "stellar cartography for navigation" use case.
   Source: <https://github.com/Stellarium/stellarium>
2. **KStars** — License: GPL-2.0-or-later (KDE REUSE-compliant: per-file SPDX headers plus a `LICENSES/` directory, not a single root LICENSE file — confirmed by browsing the repo tree, not a generic GitHub license detector) · Status: actively maintained, ChangeLog shows tagged version 3.8.1 with commits into 2026, repo pushed as recently as July 21, 2026 (the research date itself) · Verified 2026-07-21: re-checked directly via `gh api repos/KDE/kstars` (pushed_at 2026-07-21T02:29:41Z); read `ChangeLog` and `LICENSES/` directory contents directly since KDE doesn't use GitHub Releases for this repo.
   KDE's astronomy suite: a planetarium view built on the same class of open star/DSO catalogs as Stellarium, but bundled with INDI-protocol telescope/mount control, plate-solving, and autoguiding — the actual "navigation" half of stellar cartography (pointing a real telescope at real coordinates), not just a star-chart viewer.
   Source: <https://github.com/KDE/kstars>
3. **OpenSpace** — License: MIT (per `LICENSE.md`, though GitHub's detector reports "NOASSERTION") · Status: actively maintained, latest release v0.22.0 (June 12, 2026), commits as recent as July 21, 2026 (the research date itself), 1.2k+ GitHub stars · Verified 2026-07-21: re-checked directly via `gh api repos/OpenSpace/OpenSpace` (not archived, pushed_at 2026-07-21T13:53:44Z), `gh api repos/OpenSpace/OpenSpace/releases/latest` (tag releases/v0.22.0, published 2026-06-12T17:28:19Z), and read `LICENSE.md` directly to resolve the license-detector mismatch.
   A NASA/AMNH-backed interactive astrovisualization engine that renders real large-scale survey data (Gaia's ~2-billion-star catalog, exoplanet databases, spacecraft trajectories) as a navigable 3D volume rather than a flat sky-dome view — closer to a starship-scale "stellar cartography deck" than a backyard-telescope planetarium.
   Source: <https://github.com/OpenSpace/OpenSpace>

### Recommendation

Start with Stellarium if the goal is literally "open star charts" — it's the most direct match for the row's own wording, it's the most active of the three by commit cadence, and its `NavStars` plugin is a genuine celestial-navigation dataset. Add KStars instead (or alongside) if the point is to actually *use* the charts to navigate — point a real telescope, plate-solve a position — since that's the piece Stellarium doesn't do. Reach for OpenSpace only if the ambition is the full "flying through a 3D star field" cartography-deck experience rather than a 2D sky view; it's real and actively maintained but a heavier, more specialized install for a much narrower use case.

### Plays well with

KStars' INDI backend is the same protocol used by most open-source telescope-control and astrophotography tooling, so it extends naturally into any personal-field-hardware picks from Task 2 involving telescopes/mounts. All three consume the same class of open astronomical data (Gaia, Hipparcos, DSS), so none of these choices are exclusive — a household could run Stellarium for casual sky-charting and KStars for actual equipment control side by side.

### Agreement with index.html

Agree — Stellarium and the open star-survey data behind it (Hipparcos, Gaia) are real, currently maintained, and genuinely open source; the row's own "caveat" framing is honest, since a planetarium app viewing public survey data is a much smaller thing than a starship's active-sensor stellar cartography deck.

---
