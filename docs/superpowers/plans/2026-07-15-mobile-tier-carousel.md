# Mobile Tier Carousel Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Below the existing 900px breakpoint, replace `index.html`'s horizontally-scrolling comparison grid with a swipeable, one-tier-per-screen card carousel, without touching the grid's markup or its desktop behavior.

**Architecture:** At page load, `main.js` walks the existing `.tier-grid` DOM once (it's a flat, predictable sequence of `.col-head`, `.group-head`, and `.row-label` + N data-cell groups) and builds a second, mobile-only set of `.carousel-card` elements — one per tier — inside a new `#carousel-track` container. The grid remains the single authored source of truth; the carousel is a generated view of it. CSS `scroll-snap` makes the cards swipeable with native touch scrolling; a small JS layer adds prev/next buttons, a position indicator, and syncs the existing rail buttons to double as tier tabs.

**Tech Stack:** Vanilla HTML/CSS/JS, matching the rest of the project. No new dependencies, no build step, no test framework (this is a static site — verification is manual/browser-based plus the existing `npm run lint` / `npm run format:check`).

## Global Constraints

- Reuse the existing 900px `max-width` breakpoint already used in `styles.css` / `report.css`. Do not introduce a new breakpoint.
- Desktop (≥900px): zero behavior change to the grid, hover tooltips, or tap-to-reveal rows.
- Do not modify `report.html` — its section-per-tier structure is already mobile-appropriate.
- No new npm dependencies. No swipe-gesture library — swiping is native `scroll-snap` browser scrolling.
- Any cloned DOM node must have its `id` attribute stripped before insertion (HTMLHint's `id-unique` rule is enforced by `npm run lint`; duplicate ids will fail CI).
- Run `npm run format` and `npm run lint` before the final commit of each task — these are the project's only automated checks.

---

### Task 1: Build the carousel scaffold and per-tier content

**Files:**
- Modify: `public/index.html:13` (add a stylesheet link), and between the closing of `.grid-wrap` and the `.cta-strip` div (currently lines 1896–1898)
- Modify: `public/assets/styles.css` (new section after the `.legend` rules at line 602, and edits inside the existing `@media (max-width: 900px)` block at lines 604–643)
- Modify: `public/assets/main.js` (append a new carousel-building block after the existing row-toggle code)
- Test: none (no JS test runner in this project) — manual browser verification, see Step 6

**Interfaces:**
- Produces: a global-scope `let scrollCarouselToTier` variable in `main.js`, initially `null`, assigned to a function `(tierId) => void` once the carousel is built. Task 2 does not need this (Task 2 modifies the same file directly), but any later task/agent reading `main.js` should know this variable exists so it isn't reintroduced.
- Consumes: the existing `.tier-grid` DOM structure in `index.html` — specifically that its children are, in order: one empty `.cell.row-label`, then exactly N `.cell.col-head` elements (one per tier, each with a unique `id` like `col-nx01`), then repeating groups of one `.group-head` followed by rows of (`.cell.row-label` + N data cells), ending with one `.footnote-row`. This structure is not changed by this task — only read.

- [ ] **Step 1: Add the `report.css` link and empty carousel markup to `index.html`**

In `public/index.html`, change line 13 from:

```html
    <link rel="stylesheet" href="assets/styles.css" />
```

to:

```html
    <link rel="stylesheet" href="assets/styles.css" />
    <link rel="stylesheet" href="assets/report.css" media="(max-width: 900px)" />
```

(`report.css` already documents itself as "loaded alongside styles.css" and defines the `.pill-yes` / `.pill-warn` / `.pill-bad` / `.pill-na` classes this task reuses for status values. The `media` attribute keeps it from being fetched/applied on the desktop grid, where none of its selectors are used.)

Then, find this in `public/index.html` (currently lines 1894–1898):

```html
              </div>
            </div>
          </div>
        </div>

        <div class="cta-strip">
```

and insert a new `.tier-carousel` container between the closing `.grid-wrap` div and `.cta-strip`:

```html
              </div>
            </div>
          </div>
        </div>

        <div class="tier-carousel" id="tier-carousel">
          <div class="carousel-track" id="carousel-track"></div>
          <div class="carousel-nav">
            <button
              type="button"
              class="carousel-arrow"
              id="carousel-prev"
              aria-label="Previous tier"
            >
              &lsaquo;
            </button>
            <span class="carousel-indicator mono" id="carousel-indicator" aria-live="polite"
              >1 / 1</span
            >
            <button type="button" class="carousel-arrow" id="carousel-next" aria-label="Next tier">
              &rsaquo;
            </button>
          </div>
          <div class="carousel-footnote" id="carousel-footnote"></div>
        </div>

        <div class="cta-strip">
```

The track starts empty; `main.js` populates it. The indicator starts at a harmless placeholder ("1 / 1") that JS overwrites immediately on load.

- [ ] **Step 2: Add carousel CSS to `styles.css`**

In `public/assets/styles.css`, insert this new section immediately after the `.legend .l-bad::before` rule (currently ends at line 602) and before the `@media (max-width: 900px)` block:

```css
/* ---------- MOBILE TIER CAROUSEL ---------- */
.tier-carousel {
  display: none;
  flex-direction: column;
  gap: 14px;
  padding: 16px 0 0;
}

.carousel-track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  gap: 16px;
  padding: 0 20px 4px;
  scrollbar-width: none;
}

.carousel-track::-webkit-scrollbar {
  display: none;
}

.carousel-card {
  flex: 0 0 100%;
  max-width: 100%;
  scroll-snap-align: center;
  background: var(--row-alt);
  border: 1px solid var(--hairline);
  border-radius: 14px;
}

.carousel-card-body {
  padding: 4px 20px 20px;
  border-radius: 0 0 14px 14px;
}

.carousel-group {
  font-family: Antonio, sans-serif;
  text-transform: uppercase;
  font-size: 0.85rem;
  color: var(--panel-orange);
  margin: 20px 0 4px;
  padding-top: 16px;
  border-top: 1px solid var(--hairline);
}

.carousel-card-body > .carousel-group:first-child {
  margin-top: 16px;
  padding-top: 0;
  border-top: none;
}

.carousel-field {
  padding: 10px 0;
  border-bottom: 1px solid var(--hairline);
}

.carousel-field:last-child {
  border-bottom: none;
}

.carousel-field .field-label {
  font-family: Antonio, sans-serif;
  text-transform: uppercase;
  font-size: 0.72rem;
  color: var(--text-dim);
  margin-bottom: 6px;
}

.carousel-value {
  font-size: 0.88rem;
  line-height: 1.5;
}

.carousel-value.mono {
  font-family: "Space Mono", monospace;
  font-size: 0.78rem;
}

.carousel-value .pill {
  margin-right: 6px;
}

.carousel-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 0 20px;
}

.carousel-arrow {
  background: var(--panel-lilac);
  color: var(--text-dark);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
}

.carousel-arrow:disabled {
  opacity: 0.3;
  cursor: default;
}

.carousel-arrow:focus-visible {
  outline: 2px solid var(--panel-orange);
  outline-offset: 2px;
}

.carousel-indicator {
  font-size: 0.72rem;
  color: var(--text-dim);
}

.carousel-footnote {
  padding: 4px 20px 0;
  font-family: "Space Mono", monospace;
  font-size: 0.66rem;
  color: var(--text-dim);
  line-height: 1.7;
}

.carousel-footnote a {
  color: var(--panel-orange);
}
```

Then edit the existing `@media (max-width: 900px)` block (currently lines 604–643) to hide the desktop grid/legend and show the carousel. Change:

```css
  .grid-wrap {
    padding: 16px 20px 0;
  }
```

to:

```css
  .rail-btn.active {
    outline: 2px solid var(--text);
    outline-offset: -2px;
  }

  .legend {
    display: none;
  }

  .grid-wrap {
    display: none;
  }

  .tier-carousel {
    display: flex;
  }
```

(`.rail-btn.active` must live inside this media block, not the global section above — it's only ever applied by `updateNav(0)`, which now only runs on mobile, but keeping the rule itself scoped to the breakpoint too avoids any desktop-visible outline if that ever changes.)

(The legend's copy — "Hover an icon for detail · click a row to expand it" — describes desktop-only interactions that don't exist in the carousel, so it's hidden rather than shown incorrectly.)

- [ ] **Step 3: Run format and lint to catch syntax mistakes early**

Run: `npm run format && npm run lint`
Expected: exits 0. Fix any reported issues before continuing.

- [ ] **Step 4: Add the transpose logic to `main.js`**

Append this to the end of `public/assets/main.js` (after the existing `tierGrid` row-toggle block):

```js
let scrollCarouselToTier = null;

const tierCarousel = document.getElementById("tier-carousel");
if (tierGrid && tierCarousel) {
  const STATUS_PILLS = {
    yes: ["pill-yes", "YES"],
    warn: ["pill-warn", "CAVEAT"],
    bad: ["pill-bad", "NO"],
    na: ["pill-na", "N/A"],
  };

  const cellToValueNode = function (cell) {
    const value = document.createElement("div");
    if (cell.classList.contains("status")) {
      value.className = "carousel-value";
      const statusKey = ["yes", "warn", "bad", "na"].find(function (key) {
        return cell.classList.contains(key);
      });
      const pillInfo = STATUS_PILLS[statusKey] || STATUS_PILLS.na;
      const pill = document.createElement("span");
      pill.className = "pill " + pillInfo[0];
      pill.textContent = pillInfo[1];
      const txt = cell.querySelector(".txt");
      value.appendChild(pill);
      value.appendChild(document.createTextNode(txt ? txt.textContent.trim() : ""));
    } else {
      value.className = "carousel-value" + (cell.classList.contains("mono") ? " mono" : "");
      value.innerHTML = cell.innerHTML.trim();
    }
    return value;
  };

  const buildCarousel = function () {
    const children = Array.from(tierGrid.children);
    const tierIds = [];
    const cards = [];
    let i = 0;

    while (i < children.length) {
      const child = children[i];

      if (child.classList.contains("col-head")) {
        const header = child.cloneNode(true);
        header.removeAttribute("id");

        const card = document.createElement("div");
        card.className = "carousel-card";
        card.setAttribute("data-tier", child.id);
        card.setAttribute("role", "group");
        const eraEl = child.querySelector(".tier-era");
        const planEl = child.querySelector(".tier-plan");
        card.setAttribute(
          "aria-label",
          [planEl, eraEl]
            .filter(Boolean)
            .map(function (el) {
              return el.textContent.trim();
            })
            .join(", ")
        );

        const body = document.createElement("div");
        body.className = "carousel-card-body";

        card.appendChild(header);
        card.appendChild(body);
        tierIds.push(child.id);
        cards.push(card);
        i += 1;
        continue;
      }

      if (child.classList.contains("group-head")) {
        const tagEl = child.querySelector(".tag");
        const tagText = tagEl ? tagEl.textContent.trim() : "";
        cards.forEach(function (card) {
          const body = card.querySelector(".carousel-card-body");
          const groupEl = document.createElement("div");
          groupEl.className = "carousel-group";
          groupEl.textContent = tagText;
          body.appendChild(groupEl);
        });
        i += 1;
        continue;
      }

      if (child.classList.contains("footnote-row")) {
        const footnote = document.getElementById("carousel-footnote");
        if (footnote) footnote.innerHTML = child.innerHTML;
        i += 1;
        continue;
      }

      if (child.classList.contains("row-label")) {
        const labelText = child.textContent.trim();
        const rowCells = children.slice(i + 1, i + 1 + cards.length);
        rowCells.forEach(function (cell, index) {
          const body = cards[index].querySelector(".carousel-card-body");
          const field = document.createElement("div");
          field.className = "carousel-field";
          const fieldLabel = document.createElement("div");
          fieldLabel.className = "field-label";
          fieldLabel.textContent = labelText;
          field.appendChild(fieldLabel);
          field.appendChild(cellToValueNode(cell));
          body.appendChild(field);
        });
        i += 1 + cards.length;
        continue;
      }

      i += 1;
    }

    const track = document.getElementById("carousel-track");
    cards.forEach(function (card) {
      track.appendChild(card);
    });

    return { tierIds: tierIds, cards: cards };
  };

  const built = buildCarousel();
  window.__tierCarouselCards = built.cards;
  window.__tierCarouselTierIds = built.tierIds;
}
```

(`window.__tierCarouselCards` / `window.__tierCarouselTierIds` are a deliberate, temporary handoff for Task 2, which replaces this stopgap with proper closure-scoped navigation code in the same `if` block. They're not a public API.)

- [ ] **Step 5: Run format and lint**

Run: `npm run format && npm run lint`
Expected: exits 0.

- [ ] **Step 6: Manual verification in a browser**

Open `public/index.html` directly in a browser (no server needed). Open devtools, switch to a mobile device emulation (e.g. iPhone SE, 375px wide, or just shrink the window below 900px).

Verify:
- The desktop grid (`.grid-wrap`) and legend are hidden; the carousel is visible.
- The carousel shows one card, and swiping (click-drag or trackpad scroll) horizontally moves between 11 cards in tier order (NX-01 → Discovery early → SNW → TOS → TNG → DS9 → Voyager → Picard → Discovery zora → Closed Source → Open Source).
- Each card shows the tier's header (era, plan name, best-for text, and the "MOST DEPLOYED" badge on the TNG card), followed by group headings ("Interface & Input", "Personal & Field Hardware", etc.) and field rows with labels and values.
- Status-cell rows show a colored pill (YES / CAVEAT / NO / N/A) followed by the full descriptive text — not an icon.
- The methodology footnote text (with the "full report" link) appears below the nav controls on the last render.
- Resize the window back above 900px: the grid reappears exactly as before, unchanged, with hover tooltips and tap-to-reveal rows still working.

- [ ] **Step 7: Commit**

```bash
git add public/index.html public/assets/styles.css public/assets/main.js
git commit -m "$(cat <<'EOF'
Add mobile tier carousel scaffold and per-tier content

Below 900px, transpose the existing comparison grid into a swipeable
one-tier-per-screen carousel built from the same source markup, so
phones get a SaaS-pricing-page-style card instead of a two-directional
scrolling table. Desktop grid is untouched.
EOF
)"
```

---

### Task 2: Wire up carousel navigation (arrows, rail tabs, position sync)

**Files:**
- Modify: `public/assets/main.js`
- Test: none (manual browser verification, see Step 4)

**Interfaces:**
- Consumes: `tierGrid` (existing top-level `const`), the carousel markup from Task 1 (`#carousel-track`, `#carousel-prev`, `#carousel-next`, `#carousel-indicator`), and the existing `.rail-btn[data-target]` buttons and their click-handler loop (currently `public/assets/main.js:17-22`).
- Produces: replaces the Task 1 stopgap (`window.__tierCarouselCards` / `window.__tierCarouselTierIds` and the unused `scrollCarouselToTier` variable) with real navigation wiring, scoped inside the same `if (tierGrid && tierCarousel)` block.

- [ ] **Step 1: Replace the Task-1 stopgap with real navigation wiring**

In `public/assets/main.js`, find:

```js
    const track = document.getElementById("carousel-track");
    cards.forEach(function (card) {
      track.appendChild(card);
    });

    return { tierIds: tierIds, cards: cards };
  };

  const built = buildCarousel();
  window.__tierCarouselCards = built.cards;
  window.__tierCarouselTierIds = built.tierIds;
}
```

Replace it with:

```js
    const track = document.getElementById("carousel-track");
    cards.forEach(function (card) {
      track.appendChild(card);
    });

    return { tierIds: tierIds, cards: cards, track: track };
  };

  const built = buildCarousel();
  const cards = built.cards;
  const tierIds = built.tierIds;
  const track = built.track;

  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");
  const indicator = document.getElementById("carousel-indicator");
  const railButtons = Array.from(document.querySelectorAll(".rail-btn[data-target]"));

  let activeIndex = 0;

  const updateNav = function (index) {
    activeIndex = index;
    indicator.textContent = index + 1 + " / " + cards.length;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === cards.length - 1;
    railButtons.forEach(function (btn) {
      btn.classList.toggle("active", btn.getAttribute("data-target") === tierIds[index]);
    });
  };

  const scrollToIndex = function (index) {
    const clamped = Math.max(0, Math.min(cards.length - 1, index));
    cards[clamped].scrollIntoView({ inline: "center", block: "nearest" });
  };

  scrollCarouselToTier = function (tierId) {
    const index = tierIds.indexOf(tierId);
    if (index !== -1) scrollToIndex(index);
  };

  prevBtn.addEventListener("click", function () {
    scrollToIndex(activeIndex - 1);
  });
  nextBtn.addEventListener("click", function () {
    scrollToIndex(activeIndex + 1);
  });

  if (cards.length > 0) {
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            const index = cards.indexOf(entry.target);
            if (index !== -1) updateNav(index);
          }
        });
      },
      { root: track, threshold: 0.6 }
    );
    cards.forEach(function (card) {
      observer.observe(card);
    });
    updateNav(0);
  }
}
```

- [ ] **Step 2: Make the rail buttons also drive the carousel**

In `public/assets/main.js`, find the existing rail-button handler:

```js
document.querySelectorAll(".rail-btn[data-target]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const target = document.getElementById(btn.getAttribute("data-target"));
    if (target) target.scrollIntoView({ inline: "center", block: "nearest" });
  });
});
```

Replace it with:

```js
let scrollCarouselToTier = null;

document.querySelectorAll(".rail-btn[data-target]").forEach(function (btn) {
  btn.addEventListener("click", function () {
    const targetId = btn.getAttribute("data-target");
    const target = document.getElementById(targetId);
    if (target) target.scrollIntoView({ inline: "center", block: "nearest" });
    if (scrollCarouselToTier) scrollCarouselToTier(targetId);
  });
});
```

(This moves the `let scrollCarouselToTier = null;` declaration up to before its first use — remove the duplicate declaration that Task 1 left near the bottom of the file, i.e. delete the standalone `let scrollCarouselToTier = null;` line that currently sits just above `const tierCarousel = document.getElementById("tier-carousel");`.)

- [ ] **Step 3: Run format and lint**

Run: `npm run format && npm run lint`
Expected: exits 0.

- [ ] **Step 4: Manual verification in a browser**

At a viewport below 900px:
- Tap the prev/next arrow buttons: the carousel moves one card at a time; both buttons disable correctly at the first/last card.
- Tap a rail button (e.g. "DS9"): the carousel scrolls to that tier's card without scrolling the whole page vertically.
- Swipe manually between cards: the active rail button (outlined) and the "N / 11" indicator update to match the visible card.
- Tab through the page with the keyboard only: prev/next buttons and rail buttons are all reachable and operable with Enter/Space; the indicator's `aria-live="polite"` region means a screen reader (or the accessibility tree in devtools) shows the updated position text after each navigation.
- Resize back above 900px: rail buttons still scroll the desktop grid exactly as before (no regression from the added `scrollCarouselToTier` call, since it's a no-op when the carousel subtree is hidden).

- [ ] **Step 5: Commit**

```bash
git add public/assets/main.js
git commit -m "$(cat <<'EOF'
Sync carousel navigation with rail tabs, arrows, and swipe position

Rail buttons, prev/next arrows, and native swipe now all move the same
active-tier state, so mobile users can navigate the carousel by
whichever method they reach for.
EOF
)"
```

---

## Verification (end to end)

After both tasks:

1. `npm run check` (format:check + lint) exits 0.
2. In a browser at ≥900px: `index.html` is pixel-identical in behavior to before this branch — same grid, same hover tooltips, same tap-to-reveal rows, same rail-button scroll-to-column behavior.
3. In a browser at <900px: the carousel is the only comparison UI shown; swipe, arrows, and rail tabs all navigate the same 11 tiers in the same order as the desktop grid's columns; the footnote/report-link text is present; no duplicate-id console warnings.
4. `report.html` is unchanged (`git diff` shows no modifications to it).
