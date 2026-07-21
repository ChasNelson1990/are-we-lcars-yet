# Research brief: Security & Access Control — Open Source Ecosystem Report

Research date: 2026-07-21

## Row: Authorization method (`data-row="r12"`)

**index.html currently claims (verbatim, Open Source column):** "Passkeys, FIDO2 hardware keys, Bitwarden / Proton Pass — auditable end to end"

### Top 3 candidates

1. **Vaultwarden** — License: AGPL-3.0 · Status: actively maintained, latest release v1.36.0 (May 3, 2026), commits as recent as July 20, 2026, 64k+ GitHub stars · Verified 2026-07-21: re-checked directly via `gh api repos/dani-garcia/vaultwarden` (not archived, AGPL-3.0 license, pushed_at 2026-07-20) and `gh api repos/dani-garcia/vaultwarden/releases/latest` (tag 1.36.0, published 2026-05-03T12:54:52Z).
   An unofficial, Rust-rewritten, self-hostable server implementation of the Bitwarden API — you point official Bitwarden apps/browser extensions at your own Vaultwarden instance instead of Bitwarden's cloud, so vault data (passwords and any FIDO2/passkey credentials saved for third-party sites) lives entirely on your own server. It also supports WebAuthn/FIDO2 hardware security keys as a two-factor login method for unlocking the vault itself. One real caveat worth flagging: passwordless login *to the vault itself* via passkey (as opposed to storing passkeys created for other sites) is not yet implemented server-side — PR #5929 ("Add support for the 'Login with passkey' option") was still open and unmerged as of 2026-07-21 (`gh api repos/dani-garcia/vaultwarden/pulls/5929`, `merged: false`).
   Source: <https://github.com/dani-garcia/vaultwarden>
2. **KeePassXC** — License: GPL-2.0-or-later (dual GPL-2.0/GPL-3.0 per the project's own COPYING file; GitHub's license detector reports "NOASSERTION" because of the mixed grant, not because the code is unlicensed) · Status: actively maintained, latest tagged release 2.7.12 (March 10, 2026), commits as recent as July 11, 2026, 28k+ GitHub stars · Verified 2026-07-21: re-checked directly via `gh api repos/keepassxreboot/keepassxc` (not archived, pushed_at 2026-07-11) and `gh api repos/keepassxreboot/keepassxc/releases/latest` (tag 2.7.12); read `COPYING` directly to confirm the GPL-2.0-or-later/GPL-3.0 dual grant; confirmed ongoing passkey-feature bug reports/refinements via `gh search issues --repo keepassxreboot/keepassxc "passkey" --state open` (10+ open issues actively updated through July 2026, e.g. #11661 updated 2026-07-18, #13039 updated 2026-07-18).
   A fully offline, local-first password database with a browser-extension bridge that lets it store and autofill FIDO2 passkeys for third-party sites directly inside the encrypted `.kdbx` file — no cloud sync of any kind unless you add your own (e.g. Syncthing, a self-hosted WebDAV/Nextcloud share). It also supports YubiKey/OnlyKey hardware keys configured for HMAC-SHA1 challenge-response as an additional database-unlock factor, so the database itself can't be opened from a stolen copy without the physical key. This is the most "auditable end to end" of the three in the strict sense — nothing ever leaves your machine unless you choose a sync mechanism.
   Source: <https://github.com/keepassxreboot/keepassxc>
3. **Keycloak** — License: Apache-2.0 · Status: actively maintained, latest release 26.7.0 (July 9, 2026), commits as recent as July 21, 2026 (the research date itself), 35k+ GitHub stars · Verified 2026-07-21: re-checked directly via `gh api repos/keycloak/keycloak` (not archived, Apache-2.0, pushed_at 2026-07-21T14:55:40Z) and `gh api repos/keycloak/keycloak/releases/latest` (tag 26.7.0, published 2026-07-09T06:58:13Z); cross-checked passkey support against Keycloak's own 2025-09 announcement post ("Passkeys support in upcoming Keycloak release (26.4)").
   A self-hosted identity and access management (IAM) server: rather than a personal password manager, it's the piece you'd run to become your own OAuth2/OIDC/SAML provider for every other self-hosted app in a homelab, with a built-in WebAuthn engine that supports passkeys both as a first-factor passwordless login and as a phishing-resistant second factor. Because it's the single sign-on layer sitting in front of everything else, its audit logs give one central, inspectable record of every authorization event across a whole self-hosted stack — a different kind of "auditable end to end" than a password manager provides.
   Source: <https://github.com/keycloak/keycloak>

### Recommendation

For an individual or household replacing a commercial password manager, start with Vaultwarden — it's the lowest-friction option (compatible with the polished official Bitwarden apps) and covers "Bitwarden" directly from the row's own claim, with the one honest caveat that logging into the vault itself via passkey is still an open PR, not shipped. Reach for KeePassXC instead if "auditable end to end" needs to mean literally zero network dependency — it's a single encrypted file plus an optional hardware key, with no server component to audit at all. Add Keycloak on top of either once there's more than one self-hosted service to protect — it turns "authorization method" from a per-app password/passkey into one central, logged SSO decision point, which is the closest real analog to a ship-wide command-code system.

### Plays well with

Vaultwarden and KeePassXC are both password/passkey stores, not identity providers — either can hold the credentials a person uses to reach a Keycloak-protected login screen, and Keycloak in turn can be the OIDC provider in front of self-hosted apps discussed elsewhere in this project (e.g. the local-LLM web UIs in Task 1/Task 4, or any self-hosted dashboard). All three are independent of model/inference choice, so they combine freely with any of the AI-stack picks from other groups.

### Agreement with index.html

Agree — passkeys, FIDO2 hardware keys, and self-hosted Bitwarden-compatible vaults are real, current, and (with a self-hosted server) genuinely auditable end to end; the one nuance is that "auditable end to end" is strongest for KeePassXC (no server at all) and weakest for Vaultwarden's *own* login flow specifically (passkey login to the vault is still unmerged), though passkey storage/use for other sites works today.

---

## Row: Hostile takeover incidents (logged) — reinterpreted row

**index.html currently claims (verbatim, Open Source column):** "Same prompt‑injection problem, and you're your own security team — but the attack surface is inspectable"

**Reinterpretation, stated explicitly: there is no real-world "hostile takeover incident log" analogous to a starship being boarded.** The honest real-world analog for a self-hoster is home-lab/network-layer intrusion detection and hardening: the firewall, IDS/IPS, and log-based threat-detection tooling a person actually runs to notice and stop unauthorized access to their own infrastructure. This is one of three deliberately reinterpreted rows across this research project; the candidates below are evaluated against that real practice, not against a literal takeover log (which doesn't exist for self-hosted setups any more than the AI-agent prompt-injection framing in the original claim needs one).

### Top 3 candidates

1. **OPNsense** — License: BSD-2-Clause · Status: actively maintained, fixed twice-yearly major-release cadence (January/July) with biweekly security/patch updates; current series 26.7 with point release 26.7.1, and a 27.1.a development snapshot already tagged · Verified 2026-07-21: re-checked directly via `gh api repos/opnsense/core` (not archived, BSD-2-Clause license, pushed_at 2026-07-21T14:47:49Z) and `gh api repos/opnsense/core/tags` (top tags `27.1.a`, `26.7.1`, `26.7`, confirming the ongoing 2026 release train).
   A full self-hosted firewall/router operating system (a hardened, actively-developed FreeBSD-based fork of the pfSense lineage) that a self-hoster runs as the edge device in front of their home network — the "firewall" leg of the reinterpreted claim. It ships one codebase under one open license with no free/paid feature split, and can host Suricata as an in-line IDS/IPS plugin directly on the same box, giving a single auditable choke point for inbound and outbound traffic.
   Source: <https://github.com/opnsense/core>
2. **Suricata** — License: GPL-2.0 · Status: actively maintained, latest release suricata-8.0.6 (July 7, 2026), commits as recent as July 10, 2026, maintained by the nonprofit Open Information Security Foundation (OISF) · Verified 2026-07-21: re-checked directly via `gh api repos/OISF/suricata` (not archived, GPL-2.0, pushed_at 2026-07-10T04:15:25Z) and `gh api repos/OISF/suricata/releases/latest` (tag suricata-8.0.6, published 2026-07-07T19:26:37Z).
   A network intrusion detection/prevention engine (IDS/IPS) that inspects live traffic against signature rulesets (e.g. the community Emerging Threats ruleset) and can either log matches for review or actively drop/reject flagged packets in inline IPS mode — the "IDS/IPS" leg of the reinterpreted claim. It runs standalone on a spare box/VM or as a plugin inside OPNsense/pfSense, and every rule match is a plain, greppable log line, which is the actual "inspectable attack surface" a self-hoster gets in place of a fictional takeover log.
   Source: <https://github.com/OISF/suricata>
3. **CrowdSec** — License: MIT · Status: actively maintained, latest release v1.7.8 (May 11, 2026), commits as recent as July 21, 2026 (the research date itself), 14k+ GitHub stars · Verified 2026-07-21: re-checked directly via `gh api repos/crowdsecurity/crowdsec` (not archived, MIT license, pushed_at 2026-07-21T14:16:24Z) and `gh api repos/crowdsecurity/crowdsec/releases/latest` (tag v1.7.8, published 2026-05-11T07:53:36Z).
   A log-based threat-detection engine (a modernized, crowdsourced answer to fail2ban) that tails logs from SSH, reverse proxies, mail daemons and dozens of other services, matches them against behavioral "scenarios" to spot brute-force/scan/exploit patterns, and hands off enforcement to pluggable "bouncers" (firewall rule, WAF block, reverse-proxy 403) — the "log-based threat detection" leg of the reinterpreted claim. Its opt-in community blocklist (10M+ contributed malicious IPs as of mid-2026) means a self-hoster benefits from every other operator's incident history, which is about as close as the real world gets to a shared "hostile takeover" log.
   Source: <https://github.com/crowdsecurity/crowdsec>

### Recommendation

Layer all three rather than picking one, since each covers a different part of the "inspectable attack surface" the index.html line gestures at: OPNsense as the perimeter firewall a home network sits behind, Suricata (either bundled in OPNsense or standalone) watching the wire for known attack signatures, and CrowdSec tailing application/service logs to catch brute-force and scan behavior that a signature-based IDS alone would miss. None of these produce anything like a "confirmed boarding" count — what a self-hoster actually gets is a stream of blocked-IP and rule-match log entries they have to review themselves, which is the real-world equivalent of "you're your own security team, but the attack surface is inspectable."

### Plays well with

CrowdSec and Suricata both benefit from being fed logs/traffic from whatever else is self-hosted elsewhere in this project (reverse proxies, SSH daemons, the local-LLM web UIs), and both can run natively on or alongside an OPNsense box. None of the three are specific to AI/LLM tooling — they're general home-network hardening that applies regardless of which AI-autonomy or data-storage picks (Tasks 3–4) a reader adopts.

### Agreement with index.html

Disagree, by necessity — taken literally, the index.html claim ("same prompt-injection problem... your own security team") is about AI agent security, and there is no real "hostile takeover incident log" to compare it against for a self-hosted setup, fictional or otherwise. The genuinely real practice available today is network/log-based intrusion detection and hardening (OPNsense, Suricata, CrowdSec), which is a different, narrower, and answerable problem than "has my system been taken over" — the self-hoster is indeed their own security team, and the tooling above is what makes the attack surface inspectable rather than a black box.

---
