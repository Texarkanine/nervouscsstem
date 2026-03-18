# Task: Phase 5 Enhancements — Component Flexibility

* Task ID: nerv-phase5-enhance
* Complexity: Level 3
* Type: Enhancement (L4 sub-run — Phase 5 revision of nerv-design-system)

Enhance label boxes with hover/press/toggle interactivity and semantic `<button>` support, MAGI panels with per-system-box coloring and N-to-1 flexible layout, and bar meters with token-based customizable color gradients via CSS `color-mix()`, vertical orientation, configurable segment sizing, and JS-generated bar children via `data-bars`. Add `--nerv-white` token for gradient endpoints.

## Pinned Info

### Color Gradient Strategy

The bar meter color system shifts from compile-time HSL values to runtime `color-mix()` interpolation between two CSS custom properties. This allows consumers to set any `--nerv-*` token as the start/end color.

```
Consumer HTML:
  <div class="nerv-bar-meter"
       style="--nerv-bar-from: var(--nerv-green); --nerv-bar-to: var(--nerv-red);"
       data-fill="75">

Compiled CSS (per bar):
  .nerv-bar-meter-bar:nth-child(25) { --nerv-bar-pct: 48.98%; }

Active bar color:
  background-color: color-mix(in srgb, var(--nerv-bar-from), var(--nerv-bar-to) var(--nerv-bar-pct, 0%));
```

### Bar Meter API Surface

The enhanced bar meter exposes multiple customization axes, all via CSS custom properties and HTML attributes:

```
Container (.nerv-bar-meter):
  --nerv-bar-from   Color token for gradient start  (default: --nerv-cyan)
  --nerv-bar-to     Color token for gradient end    (default: --nerv-blue)
  --nerv-bar-gap    Gap between bar segments        (default: 2px)
  data-fill="N"     Fill percentage 0–100           (JS activates bars)
  data-bars="N"     Auto-generate N bar children    (JS creates divs)

Individual bars (.nerv-bar-meter-bar):
  --nerv-bar-width  Preferred segment size           (default: 4px min, flex to fill)
  --nerv-bar-pct    Gradient position 0–100%         (set by SCSS loop or JS)

Modifiers:
  .nerv-bar-meter-vertical  — column-reverse flex, fills bottom-to-top
                               Consumer MUST set height on container.

Examples:
  <!-- Easy mode: 40 bars, green-to-red, 75% filled -->
  <div class="nerv-bar-meter" data-bars="40" data-fill="75"
       style="--nerv-bar-from: var(--nerv-green); --nerv-bar-to: var(--nerv-red);">
  </div>

  <!-- Vertical: fade-in from black, 60% filled -->
  <div class="nerv-bar-meter nerv-bar-meter-vertical" data-bars="30" data-fill="60"
       style="height: 8rem; --nerv-bar-from: var(--nerv-void); --nerv-bar-to: var(--nerv-cyan);">
  </div>
```

### MAGI Per-System Color Cascade

Each `.nerv-magi-system` box defines `--nerv-magi-system-color` (defaulting to the panel's `--nerv-magi-color`). Border, text, glow, and connecting line all reference the per-system property, so a single override colors everything including the edge.

```mermaid
graph TD
    P["--nerv-magi-color (panel)"] --> S1["--nerv-magi-system-color (system 1)"]
    P --> S2["--nerv-magi-system-color (system 2)"]
    P --> SN["--nerv-magi-system-color (system N)"]
    S1 -->|border, text, glow, ::after| S1V["CASPER — APPROVE ↓"]
    S2 -->|border, text, glow, ::after| S2V["BALTHASAR — APPROVE ↓"]
    SN -->|border, text, glow, ::after| SNV["MELCHIOR — DENY ↓"]
    S1V --> O["--nerv-magi-color → OUTPUT"]
    S2V --> O
    SNV --> O
```

## Component Analysis

### Affected Components

- **`src/_label-box.scss`** (MODIFIED): Add `:hover`, `:active`, and `:focus-visible` pseudo-class states. Add button element reset (`appearance: none`) so `.nerv-label-box` works natively on `<button>` elements.
- **`src/_magi-panel.scss`** (MODIFIED): Add per-system-box `--nerv-magi-system-color` / `--nerv-magi-system-color-rgb` custom properties. Change all `.nerv-magi-system` visual references from panel-level to system-level color. Connecting line inherits per-system color.
- **`src/_bar-meter.scss`** (MODIFIED): Replace SCSS `@for` HSL hue loop with percentage-only loop. Add `--nerv-bar-from` / `--nerv-bar-to` custom properties for `color-mix()` gradients. Add `--nerv-bar-gap` and `--nerv-bar-width` custom properties for segment sizing. Add `.nerv-bar-meter-vertical` modifier for vertical orientation.
- **`src/_tokens.scss`** (MODIFIED): Add `'white': (#ffffff, '255, 255, 255', false)` to `$nerv-colors` map.
- **`src/nerv.js`** (MODIFIED): Add `NERV.initLabelBoxGroups(container?)` for click-to-toggle radio behavior. Add `NERV.initMagiPanels(container?)` to set grid columns based on system count. Enhance `initBarMeters()` to: (a) generate bar children from `data-bars="N"` attribute, (b) set `--nerv-bar-pct` per bar for exact gradients beyond the SCSS 50-bar limit.
- **`ref/ref-components.html`** (MODIFIED): Change label boxes to `<button>` elements. Demo hover/click, per-system MAGI colors, varied bar color ranges, a vertical bar meter, and a `data-bars`-generated meter.
- **`test/components.test.mjs`** (MODIFIED): Add new test cases for all enhancements, modify existing bar meter color tests.

### Cross-Module Dependencies

- `_bar-meter.scss` → `_tokens.scss`: now uses `--nerv-bar-from` / `--nerv-bar-to` referencing named tokens via `color-mix()` instead of hardcoded HSL
- `_magi-panel.scss` → `_glow.scss`: glow mixin now receives per-system-box color variable names
- `nerv.js` → DOM: new `initLabelBoxGroups()` reads `.nerv-label-box-group` containers and attaches click handlers; `initMagiPanels()` reads `.nerv-magi-system` child count and sets grid style; `initBarMeters()` now also generates children from `data-bars` attribute

### Boundary Changes

- **`nerv.js` public API**: adds `NERV.initLabelBoxGroups(container?)` and `NERV.initMagiPanels(container?)` — backward-compatible additions
- **`nerv.js` `initBarMeters()` behavior**: now generates child `.nerv-bar-meter-bar` divs if `data-bars="N"` is set and no children exist — backward-compatible (only triggers when attribute is present and container is empty)
- **`_bar-meter.scss` compiled CSS**: `color-mix()` replaces per-bar `hsl()` values — visual change (token-based colors vs hardcoded HSL), behavioral improvement (customizable). New `.nerv-bar-meter-vertical` modifier class. New `--nerv-bar-gap` and `--nerv-bar-width` custom properties.
- **`_magi-panel.scss`**: grid columns no longer hardcoded to 3 when JS runs — backward-compatible (JS defaults to child count, which for existing markup is 3)
- **`_label-box.scss`**: new `:hover` / `:active` / `:focus-visible` states, button reset — purely additive CSS. Reference page uses `<button>` elements (demonstrates semantic HTML pattern).

### Invariants & Constraints

- All selectors use `.nerv-` prefix (enforced by stylelint `selector-class-pattern: ^nerv-`)
- All colors via CSS custom properties from `_tokens.scss` — `color-mix()` uses resolved token values, no hardcoded hex in new code
- `prefers-reduced-motion` suppresses label box hover transitions
- `prefers-contrast` increases `--nerv-border-width` — label box hover must respect
- JS is orchestration only — click handlers, grid column setting, percentage computation, DOM generation
- `color-mix()` browser support: baseline since 2023 (Chrome 111+, Firefox 113+, Safari 16.2+) — acceptable for this project's modern-CSS target
- Vertical bar meters require consumer-set height on container (CSS cannot determine "length" axis size from content alone in column-reverse flex)

## Open Questions

None — the user provided explicit direction on all three enhancements. No design ambiguity exists.

## Test Plan (TDD)

### Behaviors to Verify

**Token additions:**
1. `--nerv-white` token present in `:root` output
2. `--nerv-white-rgb` token present in `:root` output

**Label box enhancements:**
3. `.nerv-label-box:hover` styles exist in compiled CSS
4. `.nerv-label-box:active` styles exist in compiled CSS
5. `NERV.initLabelBoxGroups` is a function

**MAGI panel enhancements:**
6. `--nerv-magi-system-color` custom property declared on `.nerv-magi-system`
7. `.nerv-magi-system::after` references `--nerv-magi-system-color` (not `--nerv-magi-color`)
8. `NERV.initMagiPanels` is a function

**Bar meter color enhancements:**
9. `--nerv-bar-from` custom property declared on `.nerv-bar-meter`
10. `--nerv-bar-to` custom property declared on `.nerv-bar-meter`
11. `.nerv-bar-active` uses `color-mix` for background color
12. SCSS loop generates `--nerv-bar-pct` values (not `hsl(` values per bar)

**Bar meter layout enhancements:**
13. `.nerv-bar-meter-vertical` class exists with `column` in flex-direction
14. `--nerv-bar-gap` custom property referenced in `.nerv-bar-meter` CSS
15. `--nerv-bar-width` custom property referenced in `.nerv-bar-meter-bar` CSS

**Label box semantic/accessibility:**
16. `.nerv-label-box:focus-visible` styles exist in compiled CSS

**Modified existing tests:**
- Behavior 5 (bar color gradient): change assertion from `hsl(` to `--nerv-bar-pct` and `color-mix`

**Regressions — all existing Phase 5 and Phase 1–4 tests remain green**

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Test location: `test/`
- Conventions: one test file per phase, `describe()` blocks group by component
- New test files: none — new tests added to existing `test/components.test.mjs`

### Integration Tests

- Build integration: all modified SCSS compiles cleanly via `nerv.scss`
- JS API: new functions exported and callable
- Regression: Phase 1–4 selectors survive modifications

## Implementation Plan

### Step 1: TDD prep — stub tests and interfaces

- Files: `test/components.test.mjs`, `src/nerv.js`
- Changes:
  - Add empty `it()` blocks in `test/components.test.mjs` for behaviors 1–16 (new tests) and modify behavior 5 test signature
  - Stub `NERV.initLabelBoxGroups` and `NERV.initMagiPanels` as empty functions in `nerv.js`
  - Update `NERV.init()` to call both new functions

### Step 2: Implement tests

- Files: `test/components.test.mjs`
- Changes: Fill out all test implementations — CSS string matching for new properties, JS API import verification
- Run tests: new tests should **fail** (empty stubs, unchanged CSS)

### Step 3: Add `--nerv-white` token

- Files: `src/_tokens.scss`
- Changes: Add `'white': (#ffffff, '255, 255, 255', false)` to `$nerv-colors` map
- Run tests: token tests (behaviors 1–2) should pass

### Step 4: Enhance label box CSS

- Files: `src/_label-box.scss`
- Changes:
  - **Button reset**: Add `appearance: none` and `outline: none` (custom focus replaces it) to `.nerv-label-box` so it works natively on `<button>` elements without browser chrome leaking through
  - **Hover**: Wrap in `@media (hover: hover)` to avoid sticky hover on touch devices (first hover pattern in codebase — establishes convention). `.nerv-label-box:hover` — border color intensification, subtle background hint (`rgba` of label-box-color at ~0.08), slight glow via `box-shadow`. `.nerv-label-box-active:hover` — slightly brighter glow than base active state
  - **Press**: `.nerv-label-box:active` — stronger background fill (`rgba` at ~0.15), slightly reduced scale or inset shadow for "pressed" feel
  - **Focus**: `.nerv-label-box:focus-visible` — visible focus ring using label-box-color glow (distinct from hover, keyboard-accessible). Uses `outline` or `box-shadow` offset to indicate focus without disrupting the skewed shape
  - `prefers-reduced-motion` — existing `transition: none` already covers hover/active transitions
- Run tests: behaviors 3–4, 16 should pass

### Step 5: Enhance MAGI panel CSS

- Files: `src/_magi-panel.scss`
- Changes:
  - `.nerv-magi-system`: add `--nerv-magi-system-color: var(--nerv-magi-color)` and `--nerv-magi-system-color-rgb: var(--nerv-magi-color-rgb)` at top of rule
  - Change all `var(--nerv-magi-color)` references within `.nerv-magi-system` to `var(--nerv-magi-system-color)` (border, color, `::after` background)
  - Change `@include glow.nerv-glow(--nerv-magi-color, --nerv-magi-color-rgb)` to `@include glow.nerv-glow(--nerv-magi-system-color, --nerv-magi-system-color-rgb)`
  - `.nerv-magi-output` stays with `var(--nerv-magi-color)` (output represents consensus, not individual system)
- Run tests: behaviors 6–7 should pass

### Step 6: Rework bar meter — colors, sizing, and vertical

- Files: `src/_bar-meter.scss`
- Changes:
  - **Color system**: Add `--nerv-bar-from: var(--nerv-cyan)` and `--nerv-bar-to: var(--nerv-blue)` on `.nerv-bar-meter`. Replace SCSS `@for` loop body: compute percentage only (`--nerv-bar-pct: #{$pct}%`). Change `.nerv-bar-active` background to `color-mix(in srgb, var(--nerv-bar-from), var(--nerv-bar-to) var(--nerv-bar-pct, 0%))`. Remove old per-nth-child HSL values.
  - **Segment sizing**: Add `--nerv-bar-gap` on `.nerv-bar-meter` (default: `2px`), used in `gap: var(--nerv-bar-gap)`. On `.nerv-bar-meter-bar`, change `min-width` to `var(--nerv-bar-width, 4px)` and `flex` to `1 0 var(--nerv-bar-width, 0px)` so that when `--nerv-bar-width` is set, bars have a preferred basis size while still flexing to fill.
  - **Vertical orientation**: Add `.nerv-bar-meter-vertical` modifier class: `flex-direction: column-reverse` (fills bottom-to-top), `width: 1.2rem`, `height: auto` (consumer sets height to control meter length). Override `.nerv-bar-meter-bar` inside vertical: `min-width: unset; min-height: var(--nerv-bar-width, 4px); flex: 1 0 var(--nerv-bar-width, 0px)`. Override zone marker `::after` positioning for vertical: labels appear to the right of the bar instead of above.
- Run tests: behaviors 9–15 and modified behavior 5 should pass

### Step 7: Implement JS enhancements

- Files: `src/nerv.js`
- Changes:
  - `NERV.initLabelBoxGroups(container?)`: find `.nerv-label-box-group` containers, attach click handler via event delegation on the group. On click: if target is a `.nerv-label-box`, toggle `nerv-label-box-active` on it and remove from siblings (radio behavior).
  - `NERV.initMagiPanels(container?)`: find `.nerv-magi-panel` containers, count `.nerv-magi-system` children, set `gridTemplateColumns = 'repeat(' + count + ', 1fr)'`
  - Enhance `initBarMeters()`:
    1. **Bar generation**: query all `.nerv-bar-meter` elements. For each, if `data-bars="N"` attribute is present AND no `.nerv-bar-meter-bar` children exist, generate N `<div class="nerv-bar-meter-bar">` children.
    2. **Fill activation**: if `data-fill` is present, compute active count and set `.nerv-bar-active` class (existing logic).
    3. **Gradient percentages**: set `--nerv-bar-pct` as inline style on each bar (`(j / Math.max(bars.length - 1, 1)) * 100 + '%'`) for exact gradient independent of SCSS 50-bar limit.
- Run tests: behaviors 5, 8 should pass; all JS tests green

### Step 8: Update reference page

- Files: `ref/ref-components.html`
- Changes:
  - **Label boxes**: Change `<div class="nerv-label-box">` to `<button class="nerv-label-box">` with `<span>` inner text. JS handles interactivity after `NERV.init()`.
  - **MAGI panel**: add per-system color overrides — CASPER/BALTHASAR green (`--nerv-magi-system-color: var(--nerv-green); --nerv-magi-system-color-rgb: var(--nerv-green-rgb)`), MELCHIOR red (`--nerv-magi-system-color: var(--nerv-red); --nerv-magi-system-color-rgb: var(--nerv-red-rgb)`)
  - **Bar meters**: set different `--nerv-bar-from` / `--nerv-bar-to` on each meter:
    - Subject 00: `--nerv-bar-from: var(--nerv-green); --nerv-bar-to: var(--nerv-red)` (safe → danger) — keep manual divs to demo zone markers
    - Subject 01: `--nerv-bar-from: var(--nerv-cyan); --nerv-bar-to: var(--nerv-blue)` (default, cool range) — convert to `data-bars="40"` to demo JS generation
    - Subject 02: `--nerv-bar-from: var(--nerv-void); --nerv-bar-to: var(--nerv-amber)` (fade-in from black) — convert to `data-bars="40"` to demo JS generation
  - **Vertical bar meter**: Add a vertical bar meter alongside the MAGI panel or in a suitable zone. Use `data-bars` + `.nerv-bar-meter-vertical` with a consumer-set height (e.g., `style="height: 8rem"`). Different color range to showcase variety (e.g., cyan-to-steel).

### Step 9: Full verification

- Run full build: `npm run build && npm run build:min`
- Run lint: `npm run lint`
- Run full test suite: `npm test`

## Technology Validation

**CSS `color-mix()`** — new CSS feature used in `_bar-meter.scss`. Baseline support since 2023:
- Chrome 111+ (March 2023), Firefox 113+ (May 2023), Safari 16.2+ (Dec 2022)
- This project already uses modern CSS features (aspect-ratio, CSS Grid, custom properties with var() in calc()), confirming modern browser targeting
- No polyfill needed
- Stylelint: `function-no-unknown` and `color-function-notation` are both `null` (disabled) in `.stylelintrc.json` — `color-mix()` will not be rejected

## Challenges & Mitigations

- **`color-mix()` with `var()` percentage**: CSS custom properties substitute textually, so `var(--nerv-bar-pct, 0%)` resolves to a literal percentage string before `color-mix()` evaluates. Tested pattern is sound, but may encounter issues in edge-case browsers. Mitigation: the `color-mix()` declaration includes `, 0%` fallback in the `var()`, and old browsers that don't support `color-mix()` simply won't render bar colors (transparent bars), which is gracefully degraded.
- **SCSS loop precision for percentages**: `math.div()` can produce many decimal places. Mitigation: round to 2 decimal places using `math.round($val * 100) * 0.01` to satisfy `number-max-precision` stylelint rule.
- **MAGI grid column count**: `repeat()` can't use `var()` for the count. Mitigation: JS sets `gridTemplateColumns` directly, and CSS default of `repeat(3, 1fr)` works for the common case without JS.
- **Label box click handler memory**: event listeners on many label boxes. Mitigation: use event delegation on the group container, not per-element listeners.
- **Existing test modification**: behavior 5 (bar color gradient) must change assertion from `hsl(` to `color-mix`. Mitigation: carefully update the test, verify old and new assertions don't conflict.
- **Vertical bar zone markers**: Zone marker `::after` must reposition from "above bar" (horizontal) to "beside bar" (vertical). Mitigation: `.nerv-bar-meter-vertical .nerv-bar-meter-bar[data-zone]::after` overrides positioning. Writing direction is irrelevant since labels use absolute positioning.
- **Button element reset**: `<button>` elements have browser-default styling (padding, border, font, background) that varies across browsers. Mitigation: `.nerv-label-box` already explicitly sets all of these properties; adding `appearance: none` covers any remaining browser chrome. Custom `:focus-visible` replaces the default outline.
- **`data-bars` idempotency**: `initBarMeters()` must not re-generate bars on repeated calls. Mitigation: only generate children when `data-bars` is present AND no `.nerv-bar-meter-bar` children exist.
- **Vertical height requirement**: Vertical bar meters need consumer-set height. Mitigation: document in the SCSS doc comment; reference page demo explicitly sets height to demonstrate the pattern.

## Status

- [x] Component analysis complete
- [x] Open questions resolved (none identified)
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Preflight — PASS (2 amendments: `@media (hover: hover)` wrapper for label box hover, note `--nerv-bar-color` removal as internal-only breaking change)
- [ ] Build
- [ ] QA
