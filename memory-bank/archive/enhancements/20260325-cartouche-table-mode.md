---
task_id: cartouche-table-mode
complexity_level: 2
date: 2026-03-25
status: completed
---

# TASK ARCHIVE: Cartouche Multi-Line Table Support (Fixed Variant)

## SUMMARY

Extended the existing **status cartouche** fixed variant with **table mode**: a raw `<table>` child inside `.nerv-cartouche-fixed` enables multi-row, multi-column layouts with **per-cell** text scaling driven by `NERV.initCartouches()`. Single-child `<span>` behavior is unchanged. Reference demos on `ref/ref-foundation.html` replace a broken multi-span example and mirror atomic-element reference patterns (OBJECT / EVA-01 panel, LIVE + JP source, LOCKED / OPEN, etc.). A post-ship fix set `transform-origin: left center` on table cells so left-aligned text does not clip under `overflow: hidden`.

## REQUIREMENTS

- **Hybrid API (creative decision)**: Span for single content; `<table>` for multi-cell grids — detection via `el.querySelector('table')` (Option B from creative exploration; Option C span-only rows rejected — cannot do two-column first row like reference).
- **CSS**: `.nerv-cartouche-fixed > table` fills frame (`width/height 100%`, `border-collapse: collapse`, `transform: none` to override `.nerv-cartouche-fixed > *`). `td` cells structural only; per-cell `transform: scale(var(--nerv-cartouche-sx), var(--nerv-cartouche-sy))` with `transform-origin: left center`.
- **JS**: Table mode measures each `td` with `Range.getBoundingClientRect()` on cell contents vs `clientWidth`/`clientHeight`; sets per-cell custom properties. Span mode unchanged.
- **Ref page**: Remove broken example; add table-mode demo section (1×2 compression demo, data panel, LIVE/JP, LOCKED/OPEN, bonus LIVE/PICTURE).
- **Tests**: Six new CSS assertions in `test/components.test.mjs` (“Cartouche table-mode CSS”).
- **Constraints** (from parent brief): `.nerv-` namespace, no `.nerv-table` on inner table (no style leak), mixed JP/EN, accessibility tokens unchanged.

## IMPLEMENTATION

- **`src/_cartouche.scss`**: Table-mode block after fixed variant; flex base padding lint fix (`0` instead of `0.00em`); header doc notes table mode.
- **`src/nerv.js`**: `initCartouches` refactored into `measureSpan` / `measureTable`; table path uses Range API (not `scrollWidth`/`scrollHeight` for “text smaller than cell”).
- **`ref/ref-foundation.html`**: New “Status Cartouche — fixed table-mode” section with multiple demos.
- **`test/components.test.mjs`**: New describe block B1–B6 for compiled CSS rules.

## TESTING

- `npm run build`, `npm run build:min`, `npm run lint`, full `npm test` — **293 tests**, 0 failures at archive time.
- Manual: ref page visual check; screenshot caught `transform-origin` clipping before the `left center` fix.

## LESSONS LEARNED

- **`scrollWidth` / `scrollHeight`** are not reliable for “natural text size” when the container is **wider** than the text — they do not drop below `clientWidth` / `clientHeight`. Use **`Range.getBoundingClientRect()`** on cell contents for stretch-to-fit math.
- **`transform-origin` must match alignment context**: Span mode uses centered content (`inline-flex`); table `td` text is **left-aligned by default**. `center` origin + scale + `overflow: hidden` clipped the left side of glyphs; **`left center`** fixes it.
- **Preflight / QA / screenshot split**: (1) `> *` transform bleeding to `<table>` — caught in preflight, fixed with `transform: none` on `table`. (2) Measurement API — caught in QA. (3) Transform origin — **not** caught by CSS-string tests; caught by **visual** inspection.

## PROCESS IMPROVEMENTS

- Treat **`ref/*.html` as mandatory visual QA** for layout/transform components; do not rely on “build + CSS substring tests” alone.
- When **reusing a CSS pattern** (e.g. `transform-origin: center` from span mode) in a **new layout context** (table cells), run a short **context audit**: default `text-align`, `display`, and overflow interaction.

## TECHNICAL IMPROVEMENTS

- **Optional follow-up**: Unify measurement in `initCartouches` to **Range-based** sizing for both span and table paths (reduces dual logic).
- **Optional follow-up**: `--nerv-font-mixed` token (from earlier cartouche reflection) if the stack is reused elsewhere.

## NEXT STEPS

None required for this task. Optional follow-ups above are backlog suggestions.

---

## INLINED: Creative decision (condensed)

Multi-line fixed cartouches needed a **2D grid** (reference: `v5IGB8l.png`). **Option B — Optional Table (Hybrid)** was chosen: keep `<span>` for the common single-line case; use a **raw** `<table>` (no `.nerv-table` class) for grids so `.nerv-table` styles never apply. Alternatives rejected: always-table (verbose, breaks ergonomics), span-only rows (no two-column rows), nested cartouches (double borders, wrong look).

---

## INLINED: Final reflection (cartouche-table-mode)

Extended the fixed cartouche with table-mode multi-cell support. CSS structural rules, JS per-cell scaling via Range API, 6 demos, 6 new tests. All requirements met. Three significant issues surfaced — none caught by automated tests: preflight (`> *` on table), QA (measurement API), visual inspection (`transform-origin`).

**Million-dollar**: When porting CSS across layout contexts, audit each property against new defaults (`text-align`, `display`, `overflow`). Unified Range measurement could serve both span and table modes.
