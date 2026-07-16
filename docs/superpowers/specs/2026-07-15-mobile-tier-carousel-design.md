# Mobile tier carousel — design

## Problem

`index.html`'s tier comparison grid (`.tier-grid`) is authored as a wide CSS grid:
one row per feature, one column per tier (11 tiers total: NX‑01, Discovery
early-era, SNW, TOS, TNG, DS9, Voyager, Picard, Discovery-zora, Real World
Closed Source, Real World Open Source). Below the existing 900px breakpoint
the grid becomes a horizontally-scrolling table. That's functional but not
mobile-friendly: users have to scroll two directions at once (down the page,
sideways through the table) and status-cell detail is hidden behind hover
tooltips / a tap-to-reveal interaction that's cramped at phone width.

`report.html` is unaffected by this problem — it's already authored as
sequential `<section>`s, one per tier, so it's inherently "one tier at a time"
when read top-to-bottom on a phone. No changes are needed there.

## Goal

Below 900px, replace the horizontally-scrolling grid with a swipeable,
one-tier-per-screen card carousel, similar to a SaaS pricing page on mobile.
Above 900px, nothing changes — the existing grid, hover tooltips, and
tap-to-reveal row behavior stay exactly as they are today.

## Why not rewrite the HTML into a per-tier format?

The grid is authored row-major (each field has 11 sibling cells, one per
tier) because that's the natural, maintainable shape for a comparison table —
adding a new feature row or a new tier stays a small, local edit. A swipeable
one-card-per-tier view needs the opposite grouping: all of one tier's fields
together, column-major. CSS cannot transpose that; something has to regroup
the data.

Rewriting the 1900-line hand-authored grid into a column-major format would
double the size of the file's future edits (every new row would need editing
in 11 places instead of one contiguous line) and risks breaking the existing
desktop behavior for no desktop-facing benefit.

Instead: keep the grid as the single source of truth. At page load, JavaScript
reads the existing grid DOM and assembles a second, mobile-only carousel from
its content. The grid remains untouched; the carousel is a generated view of
it, similar in spirit to how `report.html` already presents the same
underlying facts in a different shape.

## Design

### Structure

Once the DOM is available (`main.js` is loaded at the end of `<body>`, so no
`DOMContentLoaded` listener is needed), `main.js` walks `.tier-grid`'s children once (it is a
flat list: one `.col-head` per tier, then repeating `.group-head` /
`.row-label` + 11 data-cell groups) and builds, per tier, an ordered list of
`{ groupTag?, rowLabel, cellNode }` entries by picking out that tier's cell
(cells appear in the same fixed tier order the rail buttons and
`grid-template-columns` already use: nx01, disco-early, snw, tos, tng, ds9,
voy, picard, disco-zora, real-closed, real-open).

From that, it renders 11 card sections into a new container
(`.tier-carousel`, inserted as a sibling of `.grid-wrap` inside `<main>`):

- Each card starts with the tier's header (era + name, cloned from
  `.col-head`).
- Each card repeats the group heading (e.g. "Interface & Input") before the
  rows that belong to it, so the card reads like a mini version of a
  `report.html` section.
- Each row is rendered as `label` + **full text value** — no icon, no
  tap-to-reveal. A card has an entire screen to itself, so there's no
  cramping pressure that motivated the compact icon+tooltip pattern on
  desktop; showing full text directly is simpler and more legible, and it
  sidesteps re-implementing hover tooltips for touch entirely. Status cells
  still carry their icon's color/status (yes/warn/bad/na) as a small
  colored pill ahead of the text, reusing the existing `.pill-*` classes
  from `report.css` for visual consistency with the report page.

Content is cloned (not moved) from the grid, so the desktop grid keeps its
own nodes, event listeners, and behavior completely intact regardless of
viewport.

### Layout & interaction

- Cards sit in a flex row inside a horizontally scrollable container with
  `scroll-snap-type: x mandatory`; each card has `scroll-snap-align: center`
  and is full viewport width. Swiping between tiers is native browser
  scrolling — no custom gesture/drag JS.
- Small prev/next arrow buttons and a "3 / 11" position indicator sit below
  the card for non-swipe navigation (and keyboard/assistive tech users).
  They call `scrollIntoView()` on the target card, composing naturally with
  the container's `scroll-snap-type`.
- The existing rail buttons (already a horizontal tab strip on mobile) are
  reused as tier tabs: tapping one scrolls the carousel to that tier's card.
  This replaces their current mobile behavior of `scrollIntoView`-ing the
  (now hidden) grid column.
- An `IntersectionObserver` watching the cards updates the active rail tab
  and the "N / 11" indicator as the user swipes, so all three navigation
  affordances (swipe, arrows, rail tabs) stay in sync.

### Accessibility

- Prev/next controls are real `<button>`s, always keyboard operable.
- Each card gets `role="group"` and an `aria-label` with the tier name (e.g.
  "TNG, 2364").
- The "N / 11" indicator is an `aria-live="polite"` region so screen reader
  users hear the tier change when swiping or using the controls.

### Scope boundaries

- Breakpoint: reuses the existing 900px `max-width` breakpoint already used
  throughout `styles.css` / `report.css`.
- Desktop (≥900px): zero behavior change. Grid, hover tooltips, tap-to-reveal
  rows all stay as-is.
- `report.html`: no changes. Its section-per-tier structure is already
  mobile-appropriate.
- No new dependencies — vanilla JS/CSS, consistent with the rest of the
  project.

## Testing

- Manual check at a phone-width viewport (e.g. 375px) in a browser: grid is
  hidden, carousel is visible, swipe/arrow/rail-tab navigation all move
  between the same tier, and the indicator/active tab stay in sync.
- Manual check at desktop width: carousel is hidden, grid and its existing
  interactions (hover title, tap-to-reveal row) are unchanged.
- Keyboard-only pass on the carousel: tab to prev/next buttons and rail tabs,
  confirm card changes and indicator announces it.
