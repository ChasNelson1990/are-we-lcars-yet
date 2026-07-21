# Research brief: Personal & Field Hardware — Open Source Ecosystem Report

Research date: 2026-07-21

## Row: Ship terminal / console hardware (`data-row="r17"`)

**index.html currently claims (verbatim, Open Source column):** "Framework laptop or desktop — modular, repairable, upgradeable; still no fixed bridge console"

### Top 3 candidates

1. **Framework Laptop 13 Pro / Laptop 16 (and Framework Desktop)** — License: hardware is *not* fully open — chassis CAD and Expansion Card reference designs are published under CC BY 4.0 and embedded-controller firmware is open source on GitHub, but mainboard schematics are only partially published and include closed vendor components (Intel ME etc.) · Status: actively maintained, Laptop 13 Pro launched April 22, 2026 with a ground-up redesign (CNC aluminum chassis, touch display, Intel Core Ultra Series 3, 20+ hour battery), Laptop 16's Expansion Bay system continues · Verified 2026-07-21: confirmed via 2026 launch coverage (The Register, Yanko Design) and Framework's live GitHub org (`FrameworkComputer/ExpansionCards`, `ExpansionBay`, `Framework-Laptop-16` — all actively updated).
   Modular x86 laptops/desktop where mainboard, keyboard, screen, battery, ports, and (on the 16) GPU module are all user-replaceable with standard screws and no adhesive. This is the literal product the claim names, and repairability is real and independently documented. Its "open source" framing needs precision, though: CAD, Expansion Card specs, and EC firmware are open; the mainboard itself is only partially open and isn't OSHWA-certified.
   Source: <https://frame.work/>
2. **System76 Lemur Pro (Coreboot-based Open Firmware)** — License: `system76/firmware-open` mixes GPL-2.0 (coreboot), GPL-3.0 (embedded controller, firmware-setup), and BSD-2-Clause-Patent (edk2), with Intel CSME/FSP/microcode remaining proprietary blobs · Status: actively maintained, new Lemur Pro announced July 2026 with Intel "Panther Lake" chips, 18-hour battery, Coreboot-based firmware replacing the closed BIOS · Verified 2026-07-21: confirmed via Open Source For You's July 2026 launch article and the live `system76/firmware-open` GitHub repo and its `LICENSE.md`.
   Linux-first laptops (Pop!_OS/Ubuntu) whose boot firmware is open source rather than a closed vendor BIOS blob, giving real, verifiable control over boot/power/thermal behavior. Not modular across models the way Framework is, but firmware-level openness is a genuine property the claim doesn't capture (the claim is specifically about Framework).
   Source: <https://github.com/system76/firmware-open>
3. **MNT Reform Next** — License: CERN-OHL-2.0-S (hardware), GPL-3.0 (software/firmware), CC-BY-SA 4.0 (docs/artwork) — OSHWA-certified, the only laptop with that certification · Status: actively shipping, second-generation crowdfunding campaign live on Crowd Supply with a July 30, 2026 ship date, Arm/Rockchip RK3588-based · Verified 2026-07-21: confirmed via Tom's Hardware coverage and the live Crowd Supply campaign page.
   A genuinely fully-open-hardware laptop: complete schematics, mechanical designs, and firmware are published under reciprocal open licenses and OSHWA-certified, not merely "repairable" the way Framework is. Trade-off: it's a niche, lower-performance ARM machine from a small team, not an x86 workstation replacement.
   Source: <https://www.crowdsupply.com/mnt/mnt-reform-next>

### Recommendation

Start with Framework if the goal is a practical daily-driver stand-in for a bridge console — it's the literal product named in the claim, x86-performance-competitive, and its repairability is real even though its "openness" is partial (CAD/EC firmware/Expansion Card specs open, mainboard schematics only partial, no OSHWA certification). Add System76's open firmware if boot-level transparency matters more than modularity — no closed BIOS blob controls the machine. Reserve MNT Reform Next for readers who want a genuinely 100%-open, OSHWA-certified machine and are willing to trade raw performance and mainstream software compatibility for it.

### Plays well with

All three can run the same self-hosted stack referenced elsewhere in this report (a local-LLM backend, Open WebUI, Home Assistant Assist) as a home "ops console"; System76's Pop!_OS and MNT's Debian-based OS both integrate directly with Linux-native local-dashboard tooling without extra setup.

### Agreement with index.html

Agree, with a caveat — Framework genuinely is modular/repairable/upgradeable and remains actively developed in 2026, but its "open source" framing should be tightened: it's open-ish (CAD, EC firmware, and Expansion Card specs are open; mainboard schematics are only partial), not a certified open-hardware design the way MNT Reform is.

---

## Row: Personal access device (`data-row="r18"`)

**index.html currently claims (verbatim, Open Source column):** "Fairphone — a user‑replaceable battery beats a PADD"

### Top 3 candidates

1. **Fairphone 6** — License: hardware design is not published/open-hardware-certified; GPL-licensed kernel sources are published as legally required; ships a standard Android build (alternative OSes supported, not required) · Status: actively maintained, launched 2026, iFixit 10/10 repairability score, Android 16 update rolled out March 2026, backed by a 5-year warranty with software support planned through roughly 2033 · Verified 2026-07-21: confirmed via GSMArena's 2026 repairability-test coverage and independent 2026 long-term review coverage.
   A modular, screw-based (T5 Torx only) smartphone with 12 user-replaceable parts — battery, screen, cameras, USB port — shipped with its own screwdriver. This is the literal subject of the claim and the repairability claim checks out; but Fairphone the company is only "open source" adjacent — it publishes GPL-required kernel sources, not full hardware schematics, and the stock OS is ordinary Android, not privacy-hardened by default.
   Source: <https://www.fairphone.com/>
2. **Volla Phone (Quintus / Plinius / X23)** — License: Volla OS is an AOSP-based (Apache-2.0-core) Google-free Android fork, developed in the open on GitHub (`HelloVolla` org); the hardware itself is not open-hardware-certified · Status: actively maintained, multiple current models with regular Volla OS release notes through 2026 · Verified 2026-07-21: confirmed via Volla's live GitHub org and independent 2026 privacy-phone comparison coverage.
   A German-made de-Googled Android alternative with a removable battery on some models and multi-boot support for Ubuntu Touch alongside Volla OS. Less repair-documented than Fairphone and from a much smaller company (independent 2026 reviews note a slower, less consistent patch cadence than GrapheneOS), but it's a real, currently-shipping option for readers who want the *OS* itself open source rather than just the hardware ethically sourced.
   Source: <https://volla.online/en/volla-phone/>
3. **Purism Librem 5** — License: hardware schematics/STEP files released under GNU GPLv3+; PureOS is a Debian-based, predominantly free-software Linux distribution · Status: actively maintained, PureOS Crimson released across 2026 with continued Librem 5 camera-stack fixes, PureOS Dawn (Debian 13/Trixie-based) in development as of mid-2026, priced at $699 · Verified 2026-07-21: confirmed via Purism's own April–May 2026 PureOS Crimson development-report posts.
   The only one of the three where both hardware design and the entire software stack aim for GPL-level openness, running mainline Linux (Phosh) rather than Android. Real trade-off: it uses an aging, comparatively underpowered SoC (i.MX8), so day-to-day performance lags well behind Fairphone or Volla — buyers are paying for openness and repairability, not speed.
   Source: <https://puri.sm/products/librem-5/>

### Recommendation

Fairphone 6 remains the strongest default: index.html's specific claim about a user-replaceable battery is accurate today, repairability is independently verified (10/10 iFixit), and performance is mainstream-competitive — at the cost of running a fairly ordinary (if de-Googleable) Android build rather than something open source top to bottom. Choose the Librem 5 only if genuinely open-source software matters more than raw performance; it is the most "actually open source," not just "ethically made," of the three, but meaningfully slower. Volla Phone sits in between: a smaller company than Fairphone with less mature repair support, but an OS that's open source out of the box rather than requiring a third-party flash.

### Plays well with

Directly overlaps with the **Personal communicator** row (`r20`) below — /e/OS (that row's recommended pick) runs on Fairphone 6 as Murena's flagship device, so choosing Fairphone here and /e/OS there is the same real-world combination index.html's row 20 claim describes. The Librem 5, by contrast, pairs with its own PureOS/Phosh stack rather than /e/OS, so picking it here means *not* following row 20's specific software recommendation.

### Agreement with index.html

Agree — Fairphone genuinely offers an independently-verified user-replaceable battery and is the strongest currently-available repairable-phone pick. Worth noting the claim slightly conflates "open source" with "repairable/ethical": Fairphone's hardware itself isn't open-sourced the way MNT Reform's or the Librem 5's designs are.

---

## Row: Handheld sensor device (`data-row="r19"`)

**index.html currently claims (verbatim, Open Source column):** "Open hardware boards + SDR + thermal cams — more tricorder‑like, more assembly required"

### Top 3 candidates

1. **HackRF One + PortaPack (Mayhem firmware)** — License: HackRF hardware designs and firmware are published on GitHub (`greatscottgadgets/hackrf`) under open licenses; the community Mayhem firmware is GPL-licensed · Status: actively maintained, Mayhem nightly builds run through July 11, 2026 · Verified 2026-07-21: confirmed via the live `portapack-mayhem/mayhem-firmware` GitHub releases page, showing builds within the two weeks preceding the research date.
   HackRF One is an open hardware software-defined radio (1 MHz–6 GHz) from Great Scott Gadgets; adding the PortaPack add-on and Mayhem firmware turns it into a genuinely standalone handheld spectrum scanner with its own screen — no laptop required. This is the closest real match to a tricorder's "scan for signals" function, though it requires buying/attaching the PortaPack add-on and real documentation-reading to use well.
   Source: <https://github.com/greatscottgadgets/hackrf>
2. **Flipper Zero** — License: firmware source is published on GitHub (`flipperdevices/flipperzero-firmware`), though not uniformly open — some ST radio-stack components remain proprietary blobs, so treat it as "mostly open, not fully" · Status: actively maintained; stable firmware 1.0 shipped September 2024, and after July 2026 community concern over a perceived development slowdown, Flipper Devices publicly recommitted dedicated resources to firmware maintenance with a new community-vote process for feature requests · Verified 2026-07-21: confirmed via July 2026 coverage (Help Net Security, BleepingComputer) of the firmware-maintenance policy change.
   A pocket multi-tool combining sub-GHz radio, NFC/RFID, infrared, and GPIO in one handheld device with a screen and buttons — the most "off-the-shelf tricorder" feeling of the three, needing the least assembly. Real caveat: mid-2026 saw genuine community concern about firmware development slowing; the company has recommitted resources, but the long-term pace is less certain than HackRF/Mayhem's.
   Source: <https://github.com/flipperdevices/flipperzero-firmware>
3. **M5Stack modular sensor ecosystem (Core2/Cardputer + Thermal/ENV Units)** — License: M5Stack publishes hardware schematics and example firmware per module on GitHub (`github.com/m5stack`) under generally permissive licenses; not a single OSHWA-certified product line · Status: actively sold and documented, current product docs list the Thermal Camera Unit (MLX90640) and ENV Pro Unit (BME688) as current catalog items · Verified 2026-07-21: confirmed via M5Stack's live current product documentation and shop listings.
   Rather than one finished device, this is a build-your-own-tricorder ecosystem: a handheld ESP32/microcontroller base (Core2 or the keyboard-equipped Cardputer) plus snap-on sensor "Units" — thermal imaging (MLX90640), environmental/air-quality (BME688), and more. This is the most literal match to "open hardware boards + thermal cams," but it's also the most assembly-and-code-required of the three — closer to a dev kit than a finished tool.
   Source: <https://docs.m5stack.com/en/products>

### Recommendation

If matching the claim exactly (SDR + thermal, DIY assembly) is the goal, M5Stack's modular Units are the most literal fit and cheapest entry point, but expect real soldering/coding/case-design work. HackRF One + PortaPack Mayhem is the better pick if RF-scanning is the priority and a finished, ready-to-use handheld matters more than modularity. Flipper Zero is the best starting point for someone who wants a low-assembly device today, accepting it covers a narrower set of "senses" (no thermal, no true wideband SDR) and carries a small amount of firmware-roadmap uncertainty as of mid-2026.

### Plays well with

The Ship terminal row's Framework/System76 machines (`r17`) are the natural flashing/development host for all three — HackRF/Mayhem firmware builds, Flipper Zero's `qFlipper` updater, and M5Stack's Arduino/UIFlow tooling all run from a normal Linux laptop.

### Agreement with index.html

Agree — this is a genuinely accurate caveat, not marketing copy: real open hardware SDR (HackRF) and thermal-camera modules (M5Stack) exist and are tricorder-like, but none of the three is a single finished tricorder — all require meaningfully more assembly/configuration than the show's one-button device.

---

## Row: Personal communicator (`data-row="r20"`)

**index.html currently claims (verbatim, Open Source column):** "Fairphone on /e/OS + Signal — E2E‑encrypted comms on hardware you can open with a screwdriver"

### Top 3 candidates

1. **Signal** — License: clients (Android/iOS/Desktop) and the Signal Protocol library are open source (AGPLv3 clients, GPLv3 protocol library) · Status: actively maintained, iOS 8.14 (June 4, 2026), Android 8.10.3 (May 19, 2026), Desktop 8.12.0 (May 27, 2026) · Verified 2026-07-21: confirmed via `aboutsignal.com`'s live per-platform release pages showing current 2026 version numbers and dates.
   End-to-end encrypted messaging/calling with an open, independently audited protocol; both server and client code are open source, though a phone number is still required and the service runs on centralized (if minimal-metadata) infrastructure. This is the literal app named in the claim and remains the most credible, actively-maintained E2EE messenger for mainstream daily use.
   Source: <https://signal.org/>
2. **/e/OS (Murena)** — License: AOSP-based, predominantly open source (Apache-2.0 core plus GPL kernel components); Murena's cloud/workspace services run on the company's own infrastructure, not self-hostable by default · Status: actively maintained, /e/OS 4.0 released June 2026 with Gmail/Drive migration tooling and an updated Blisslauncher · Verified 2026-07-21: confirmed via AndroidAuthority's and Murena's own June 2026 /e/OS 4.0 launch coverage.
   A de-Googled Android fork with its own privacy-respecting app repository and cloud alternative, sold pre-installed on Fairphone (and other) hardware by Murena. This is the literal OS named in the claim and is current and actively developed, though its cloud/workspace features route data to Murena's own servers rather than being fully self-hostable.
   Source: <https://murena.com/e-os-4-0-murena-workspace-whats-new-faq/>
3. **GrapheneOS** — License: open source, AOSP-consistent licensing (Apache-2.0/MIT-style) plus GrapheneOS's own hardened components · Status: actively maintained, official release line current as of the research date covering Pixel 6 through Pixel 10/10 Pro (10th-gen support no longer "experimental"); working with a "major Android OEM" (revealed as Motorola, March 2026) toward official non-Pixel support in late 2026/2027 · Verified 2026-07-21: confirmed via GrapheneOS's own live releases page and independent 2026 device-compatibility coverage.
   A security-hardened AOSP fork with a stronger sandboxing/exploit-mitigation track record than /e/OS, widely regarded by security researchers as the most hardened mainstream privacy OS. Real trade-off directly relevant to the cross-reference below: it's officially Pixel-only, so it cannot run on the Fairphone that this row's claim and row 18 both recommend — choosing GrapheneOS trades away the repairable-hardware half of the claim for a harder security posture.
   Source: <https://grapheneos.org/releases>

### Recommendation

/e/OS + Signal best matches the claim as written — repairable Fairphone hardware plus a de-Googled OS plus E2EE messaging, all currently shipping and maintained. Recommend GrapheneOS + Signal instead only for readers who prioritize hardened security over repairable/ethical hardware, since GrapheneOS forces a move to Pixel hardware. Signal itself is close to non-negotiable either way — it's the strongest currently-maintained option for the messaging layer specifically, independent of OS choice.

### Plays well with

This row is the software/communications half of the **Personal access device** row (`r18`) above — /e/OS is literally the OS Murena preinstalls on the Fairphone 6 recommended there, so "Fairphone 6 + /e/OS + Signal" is one coherent real-world stack across both rows. Choosing GrapheneOS here instead pulls a reader away from r18's Fairphone pick toward Pixel hardware — a genuine, worth-flagging trade-off between the two rows rather than a free combination.

### Agreement with index.html

Agree — Fairphone on /e/OS with Signal is a real, currently-shipping, actively-maintained combination that does deliver genuine E2E-encrypted communication on repairable hardware, exactly as claimed.
