# Research brief: Data Storage & Processing — Open Source Ecosystem Report

Research date: 2026-07-21

## Row: Storage medium

**index.html currently claims (verbatim, Open Source column):** "Self‑hosted NAS or E2E‑encrypted cloud (Proton Drive) — either way, only you hold the keys"

### Top 3 candidates

1. **TrueNAS Community Edition** — License: open source (GPL-3.0 Linux kernel + BSD-licensed middleware/GUI, per TrueNAS's own EULA docs); the separate Enterprise tier is a paid add-on on the same codebase, not required for home use · Status: actively maintained, CORE and SCALE unified into a single free "Community Edition" starting with 25.04 "Fangtooth"; latest maintenance release 25.10.4 (June 3, 2026), with TrueNAS 26-BETA.2 (June 17, 2026) previewing OpenZFS 2.4 and a refreshed web UI · Verified 2026-07-21: confirmed via TrueNAS's own live documentation hub, its "TrueNAS Plans for 2026" roadmap post, and independent 2026 homelab coverage (XDA Developers) describing the current release cadence.
   A free, self-hosted NAS operating system (ZFS-based storage, snapshots, shares, and now LXC-style containers for turning the box into a general home server) that runs entirely on hardware you own. This is the literal "self-hosted NAS" half of the claim: no vendor holds a decryption key, and the ZFS layer underneath provides the actual data-integrity guarantees the claim is gesturing at.
   Source: <https://www.truenas.com/truenas-community-edition/>
2. **Proton Drive** — License: client apps are open source and independently audited (e.g., by Securitum); the server-side infrastructure is Proton's own and not self-hostable · Status: actively maintained, ongoing 2026 development including a from-scratch native Linux client (in progress, not yet shipped) and a 2026 cryptography overhaul Proton reports as up to 3x faster uploads / 2x faster downloads · Verified 2026-07-21: confirmed via Proton's own live security/product pages and independent 2026 review coverage (CyberInsider, It's FOSS) describing the current encryption architecture and in-progress Linux client.
   The literal product named in the claim: files are encrypted client-side before upload under a "zero-access encryption" design, so Proton itself cannot read them even under legal compulsion. Real nuance for readers: only the client apps are open source and auditable — the server side is proprietary, centrally-hosted infrastructure you're trusting Proton to run correctly, which is a meaningfully different trust model than the fully self-hosted NAS option in the same claim.
   Source: <https://proton.me/security/zero-access-encryption>
3. **Nextcloud Hub** — License: AGPLv3, no open-core split (all features, not just a paid tier, ship under the same license) · Status: actively maintained, latest release Nextcloud Hub 26 "Winter" (February 2026) following Hub 25 "Autumn" (September 2025); over 500,000 servers reported running it as of 2025 · Verified 2026-07-21: confirmed via Nextcloud's own live encryption documentation and independent 2026 setup-guide coverage describing the current Hub 26 release and its All-in-One (AIO) Docker deployment path.
   A self-hosted alternative to Proton Drive: folder-level, client-side end-to-end encryption (server never sees plaintext for E2EE folders) plus full file sync/share, calendar, and office-suite features, all on hardware you control. This is the option for readers who want Proton Drive's E2EE *and* the self-hosting of the NAS option simultaneously, at the cost of running and patching a real server application yourself rather than paying a vendor to operate one.
   Source: <https://nextcloud.com/encryption/>

### Recommendation

Start with TrueNAS Community Edition if the goal is literally "self-hosted NAS" — it's free, open source, ZFS-backed, and its 2026 roadmap (OpenZFS 2.4, LXC containers) keeps it current. Reach for Nextcloud Hub instead of Proton Drive if self-hosting matters more than convenience: it delivers genuine E2EE with nobody else's server in the loop, at the cost of running the server yourself. Proton Drive remains the right pick for readers who want the claim's specific named product and are comfortable trusting Proton's infrastructure (open-source, audited clients; proprietary server) rather than operating their own box.

### Plays well with

TrueNAS is the natural home for the redundancy tooling in the Processing redundancy row below (it ships OpenZFS directly) and can serve as the storage backend for a local-LLM inference stack (Core architecture row) or Open WebUI's chat/RAG document storage (Interface & Input group, Task 1).

### Agreement with index.html

Agree — self-hosted NAS software (TrueNAS) and Proton Drive's E2E-encrypted cloud are both real, current, actively-maintained options that put encryption keys in the user's hands rather than a third party's, exactly as the claim frames the choice.

---

## Row: Core architecture

**index.html currently claims (verbatim, Open Source column):** "Same transformers, quantized (GGUF) onto a consumer GPU or unified‑memory mini PC at home"

**Boundary note:** this row researches local-LLM *inference runtimes* — the software that loads a quantized GGUF-style model and serves it on local hardware — not which model to run. Model selection (DeepSeek V4, Qwen3.6-27B, Mistral Large 3) is already covered in the "Natural language processing" row of Task 1 (`docs/superpowers/plans/research/open-source-ecosystem/01-interface-input.md`); this row and that one should not be read as offering two different "which model" answers — they answer two different questions (what serves the model vs. what model gets served).

### Top 3 candidates

1. **llama.cpp** — License: MIT · Status: actively maintained, ships continuous build-tagged releases rather than semantic versions (b10075 as of July 20, 2026); a 2026 CUDA-kernel rewrite substantially improved throughput on Ada Lovelace/Blackwell-class GPUs; 120,898+ GitHub stars as of July 19, 2026 · Verified 2026-07-21: re-checked directly via `gh api repos/ggml-org/llama.cpp/releases` (top tag b10075, published 2026-07-20) plus independent 2026 coverage (tech-insider.org, aithinkerlab.com) of the engine rewrite and star count.
   The reference C/C++ inference engine that originated the GGUF format itself; loads a quantized model, manages the KV cache, and can expose an OpenAI/Anthropic-compatible HTTP server with function calling and speculative decoding. This is the literal "quantized GGUF" runtime the claim describes, runs on a single consumer GPU (or CPU-only) with no cloud dependency, and everything — prompts, responses, model weights — stays on the machine it runs on.
   Source: <https://github.com/ggml-org/llama.cpp>
2. **Ollama** — License: MIT (`ollama/ollama`, which wraps a llama.cpp-derived engine); the desktop GUI app's licensing was a genuine open question in late 2025 (GitHub issue #11634, "Clarify license of the new ollama app") but that issue is now closed, resolved 2025-11-04 by merged PR #12933, which folded the desktop app's macOS/Windows source into the main repo — it now falls under the same single MIT LICENSE file, no separate app license outstanding · Status: actively maintained, v0.32.1 (July 16, 2026), with a June 2026 `ollama launch` feature and January 2026 Anthropic-API-format compatibility added; 52 million monthly downloads reported in Q1 2026 · Verified 2026-07-21: re-checked directly via `gh api repos/ollama/ollama/releases/latest` (v0.32.1, published 2026-07-16) and `gh api repos/ollama/ollama/issues/11634` (state: closed, closed_at: 2025-11-04), cross-checked against 2026 adoption coverage (dev.to, angelo-lima.fr).
   The most widely-adopted "consumer GPU or unified-memory mini PC at home" runtime: a single binary that pulls quantized GGUF models and serves them locally with minimal setup, popular specifically on Apple Silicon unified-memory Macs and consumer NVIDIA GPUs. The 2025 desktop-app licensing gap (once a real caveat, structurally similar to Open WebUI's license situation in Task 1's Primary interface row) is resolved as of this research date — the whole repo, CLI and app alike, is MIT — so there's no outstanding licensing concern to flag here.
   Source: <https://github.com/ollama/ollama>
3. **vLLM** — License: Apache-2.0 · Status: actively maintained, hosted under the PyTorch Foundation (contributed by UC Berkeley's Sky Computing Lab, moved to the Linux Foundation in July 2024); July 2026 release (v26.06 per NVIDIA's release notes) adds CUDA 13.0 support, FP8 on Hopper-and-above, and functional support for DGX Spark and Jetson · Verified 2026-07-21: confirmed via the live `vllm-project/vllm` GitHub LICENSE file and NVIDIA's own July 2026 vLLM release-notes PDF.
   A higher-throughput serving engine (PagedAttention, continuous batching) aimed more at running one model for several concurrent local users/devices than llama.cpp's single-user simplicity; supports GGUF alongside AWQ/GPTQ/FP8 quantization. The realistic "at home" fit is narrower than llama.cpp/Ollama — it wants a real NVIDIA GPU (8GB+ VRAM even for a quantized 8B model) rather than being CPU/unified-memory-friendly — but it's the right pick if the home setup is serving several household members or devices at once rather than one interactive session.
   Source: <https://github.com/vllm-project/vllm>

### Recommendation

Start with Ollama for the actual "consumer GPU or unified-memory mini PC at home" case in the claim — it's the lowest-friction way to run a quantized GGUF model locally today, and as of this research date the whole project (CLI and desktop app) is cleanly MIT-licensed with no outstanding license ambiguity. Drop to bare llama.cpp instead for tighter control over quantization/build flags — it's the actual engine underneath most of these tools anyway. Reach for vLLM only once "one model, one user" stops being the real workload — e.g., serving Home Assistant Assist, Open WebUI, and oterm (all from Task 1) off one shared backend at once.

### Plays well with

Whichever runtime is picked here becomes the shared local backend already referenced across Task 1's Interface & Input group — Open WebUI, oterm, and Home Assistant Assist all point at a local OpenAI-compatible endpoint, and Cua's computer-use agent (Touchscreen GUI row) needs the same kind of local server if a vision-capable model is in play. The model actually loaded into whichever runtime is chosen here is the Natural language processing row's job (Task 1), not this row's.

### Agreement with index.html

Agree — llama.cpp, Ollama, and vLLM are all real, currently-maintained runtimes that do exactly what the claim describes: take a transformer, quantize it to GGUF (or a comparable format), and run it on a consumer GPU or unified-memory mini PC rather than a hyperscaler cluster.

---

## Row: Processing redundancy (`data-row="r6"`)

**index.html currently claims (verbatim, Open Source column):** "Whatever redundancy you build — RAID and a second box, or it's a single point of failure"

### Top 3 candidates

1. **OpenZFS** — License: CDDL (a weak-copyleft OSI-approved license; notably GPL-incompatible per the FSF, which is why it ships as a loadable kernel module on Linux rather than being upstreamed) · Status: actively maintained, OpenZFS 2.4.0 shipped as the largest feature release since 2.0 five years ago (121 contributors), with maintenance point release 2.4.3 current as of June 12, 2026, including stabilized RAID-Z expansion (add a single disk to an existing RAID-Z vdev without rebuilding it) and mature dRAID; first full integration ships in TrueNAS 26 "Halfmoon" · Verified 2026-07-21: re-checked directly via `gh api repos/openzfs/zfs/releases/latest` (tag zfs-2.4.3, published 2026-06-12), plus independent 2026 coverage (FreeBSD Foundation, DATAZONE) of the 2.4 feature set.
   The RAID-Z/mirror layer underneath TrueNAS (Storage medium row, above) and most serious homelab NAS builds: real-time redundancy against 1-3 simultaneous disk failures (RAID-Z1/2/3), snapshots, and `zfs send`/`receive` for replicating a full pool to a second physical box — directly matching both halves of the claim ("RAID and a second box") in one tool. Trade-off: CDDL's GPL-incompatibility means it can never ship in the mainline Linux kernel, so it stays a separately-maintained out-of-tree module (DKMS or precompiled, as TrueNAS does it).
   Source: <https://openzfs.github.io/openzfs-docs/License.html>
2. **SnapRAID** — License: GPL-3.0 · Status: actively maintained, SnapRAID CLI v14.9 (July 19, 2026) · Verified 2026-07-21: re-checked directly via `gh api repos/amadvance/snapraid/releases/latest` (tag v14.9, published 2026-07-19), a release within the research week.
   A lighter-weight alternative to ZFS for home media/parity arrays: scheduled (not real-time) parity computed across up to six disks of protection, commonly paired with mergerfs for pooling. Real caveat directly relevant to the claim's "single point of failure" framing: because parity syncs are scheduled rather than continuous, any file written since the last sync is genuinely unprotected — a real gap the claim's "whatever redundancy you build" phrasing implicitly warns about.
   Source: <https://github.com/amadvance/snapraid>
3. **restic** — License: BSD-2-Clause · Status: actively maintained, v0.19.0 current as of early 2026, single static Go binary with no daemon · Verified 2026-07-21: confirmed via the live `restic/restic` GitHub repo/LICENSE file and restic.net's own documentation.
   Encrypted (AES-256), deduplicated backups to a second location — SFTP, another server, or S3-compatible object storage — covering the "second box" half of the claim for readers who don't want full ZFS replication between two always-on machines. This is the realistic minimum viable version of "a second box": one cron job pushing encrypted snapshots off-site, rather than a mirrored live pool.
   Source: <https://github.com/restic/restic>

### Recommendation

If the storage medium (row above) is already TrueNAS, OpenZFS is not a separate install — RAID-Z plus `zfs send`/`receive` to a second TrueNAS box is the most complete real-world match for "RAID and a second box" in one stack, and it's the strongest pick if starting from scratch. Choose SnapRAID+mergerfs instead only if the array is a JBOD of mismatched drive sizes with mostly write-once media (SnapRAID's classic use case) rather than a from-scratch ZFS build. Layer restic on top of either as the actual off-site "second box" leg regardless of which parity scheme is chosen — it's the cheapest way to guarantee a copy exists somewhere else, and it's the piece most home setups skip, leaving them at the "single point of failure" end of the claim's own caveat.

### Plays well with

Builds directly on the Storage medium row's TrueNAS pick (ZFS is TrueNAS's native filesystem) and can back up the same TrueNAS box's config/datasets that host the Core architecture row's model weights and any chat/RAG data from Task 1's Open WebUI.

### Agreement with index.html

Agree — this is a genuinely accurate caveat rather than marketing copy: real, current open-source tools exist for both RAID-style redundancy (OpenZFS, SnapRAID) and second-box replication (ZFS send/receive, restic), but none of them is automatic — a reader who does nothing really is left with the single point of failure the claim warns about.
