# Phase 4: Decorative Patterns & Geometry + Initial Orchestration JS

> Animated stripe bars, hexagonal grids, radar concentric circles, and the first version of `nerv.js`.
> Verified by: `ref/ref-patterns.html`

---

## Scope

This phase delivers the three distinctive decorative/geometric pattern systems (stripe bars, hex grids, radar displays) and introduces the `nerv.js` orchestration module. This is the first phase requiring JavaScript — the hex grid's random-interval state cycling and the scanline overlay auto-injection are behaviors that CSS alone cannot achieve.

The JS module is built incrementally: this phase delivers the initial feature set, Phase 5 extends it, and Phase 6 extends it further.

---

## Deliverables

### SCSS Modules

| File | Description |
|------|-------------|
| `src/_stripe-bar.scss` | Animated diagonal chevron/hazard stripe patterns |
| `src/_hex-grid.scss` | Hexagonal cell grid with state classes |
| `src/_radar.scss` | Concentric circle / radar display pattern |

### JavaScript

| File | Description |
|------|-------------|
| `src/nerv.js` | Orchestration JS — initial version (scanline injection, hex flicker, grid labels) |

### Reference Page

| File | Description |
|------|-------------|
| `ref/ref-patterns.html` | Reference page 4 — geometric patterns with active JS orchestration |

### Updated Entry Point

Update `src/nerv.scss` to `@forward` the three new SCSS partials.

### New/Updated Files

```
src/
├── nerv.scss           # (updated)
├── _tokens.scss        # Phase 1
├── _typography.scss    # Phase 1
├── _glow.scss          # Phase 1
├── _scanlines.scss     # Phase 2
├── _flicker.scss       # Phase 2
├── _glitch.scss        # Phase 2
├── _panels.scss        # Phase 3
├── _dividers.scss      # Phase 3
├── _grid-marks.scss    # Phase 3
├── _stripe-bar.scss    # NEW
├── _hex-grid.scss      # NEW
├── _radar.scss         # NEW
└── nerv.js             # NEW
```

Distribution note: `nerv.js` is copied to `dist/nerv.js` as part of the build. It requires no compilation — it is vanilla JS. The build script in `package.json` should be updated to copy it alongside the CSS output.

---

## Module Details

### `_stripe-bar.scss`

The animated diagonal stripe bars seen in alert states and as decorative borders. Directly sourced from ews-concept's technique.

**Variants:**

| Class | Description |
|-------|-------------|
| `.nerv-stripe` | Horizontal stripe bar — green diagonal bands (default) |
| `.nerv-stripe-vertical` | Vertical stripe bar |
| `.nerv-stripe-red` | Red/danger color variant |
| `.nerv-stripe-animated` | Adds scrolling animation via `background-position` keyframes |

**Technique** (from VISION.md §2.3.4, ews-concept):

1. `repeating-linear-gradient(-45deg, ...)` — alternating colored and transparent diagonal bands
2. `background-size: 47px 47px` controls stripe density
3. `@keyframes` animating `background-position` produces the scrolling effect
4. Reverse direction via `45deg` or `animation-direction: reverse`

**Animation speed** references `--nerv-animation-speed` token for Phase 6 cascade scaling.

**`prefers-reduced-motion`**: Animation stops; static stripe pattern remains visible.

### `_hex-grid.scss`

Tiled hexagonal cells used for warning displays and status grids.

**Structural classes:**

| Class | Description |
|-------|-------------|
| `.nerv-hex-grid` | Container for the hexagonal grid |
| `.nerv-hex-row` | A row of hex cells; odd rows offset via `margin-left` for honeycomb stacking |
| `.nerv-hex-cell` | Individual hexagonal cell |

**State classes (on `.nerv-hex-cell`):**

| Class | Color | Glow |
|-------|-------|------|
| `.nerv-hex-danger` | `--nerv-red` | Red `drop-shadow` |
| `.nerv-hex-warn` | `--nerv-amber` | Amber `drop-shadow` |
| `.nerv-hex-safe` | `--nerv-green` | Green `drop-shadow` |
| (no state class) | Dim/empty | No glow |

**Technique** (from VISION.md §2.3.5):

1. `clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)` — clips each cell to a hexagon
2. `::before` pseudo-element with inset `clip-path` — creates the inner border effect
3. Odd `.nerv-hex-row` elements offset via `margin-left` (half a cell width) for honeycomb layout
4. `filter: drop-shadow()` for per-state glow (follows clipped shape, not bounding box)

**JS-driven behavior:** Random-interval cycling of hex cells through states is handled by `nerv.js` (see below). CSS provides the `flicker` animation classes from Phase 2 for deterministic flicker; JS provides the randomized variant.

### `_radar.scss`

Concentric circle pattern with optional radial division lines. Used in defense screens and tactical displays.

**Classes:**

| Class | Description |
|-------|-------------|
| `.nerv-radar` | Container element — concentric rings and radial lines |
| `.nerv-radar-sweep` | Optional animated sweep arm (conic-gradient rotation) |

**Technique** (from VISION.md §2.3.6, recommending the `radial-gradient` approach as most CSS-pure):

1. **`radial-gradient` with hard stops** on the container element — concentric rings as alternating transparent/colored/transparent bands: `radial-gradient(circle, transparent 19%, var(--color) 19%, var(--color) 20%, transparent 20%, transparent 39%, ...)`
2. **Radial division lines** via rotated `::before`/`::after` pseudo-elements (`transform: rotate(Ndeg)`) — or a single pseudo-element with multiple `linear-gradient` backgrounds for all division lines at once
3. **Radar sweep** (optional): `conic-gradient` with a partially-transparent wedge, rotating via `@keyframes`

The element should be `aspect-ratio: 1` with `border-radius: 50%` to maintain circular geometry.

**`prefers-reduced-motion`**: Sweep animation stops; static rings and division lines remain.

---

### `nerv.js` — Initial Orchestration Module

Minimal vanilla JS. No dependencies, no framework, no build step.

**Architecture:** A single `NERV` global object (or ES module export) with explicit initialization.

**Phase 4 feature set:**

| Function | Purpose | Why JS Is Required |
|----------|---------|-------------------|
| `NERV.init()` | Master initialization — calls all sub-initializers on DOMContentLoaded | Coordinates setup |
| `NERV.injectScanlines()` | Creates the `.nerv-scanlines` overlay `<div>` and appends it to `<body>` | CSS cannot create DOM nodes |
| `NERV.initHexFlicker(container)` | Randomly cycles hex cell states on `setTimeout` with random intervals | CSS `@keyframes` cannot produce random timing |
| `NERV.initGridLabels(container)` | Generates axis label elements along grid edges | Content generation beyond `counter()` capability |

**Consumer usage:**

```html
<link rel="stylesheet" href="nerv.css">
<script src="nerv.js"></script>
<script>NERV.init();</script>
```

Or, if loaded as an ES module:

```html
<script type="module">
  import { NERV } from './nerv.js';
  NERV.init();
</script>
```

**Design decision — module format:**

`nerv.js` should be authored as an ES module with a named export, and also assign to `window.NERV` for `<script>` tag compatibility (UMD-lite pattern). This allows both modern `import` usage and traditional script-tag inclusion.

**Phase 5 additions** (not built now, documented for forward reference):
- `NERV.initGhostSegments(container)` — populates ghost-segment `::before` content for seven-segment displays

**Phase 6 additions** (not built now):
- `NERV.setState(state)` — swaps `.nerv-state-*` class on root element for alert cascade

---

## Reference Page: `ref/ref-patterns.html`

Contents (from VISION.md §3, Page 4):

- **Top**: Horizontal `.nerv-stripe` bar (green, animated scrolling) spanning full width
- **Below top**: Horizontal `.nerv-stripe-red` bar (animated, opposite scroll direction)
- **Center**: `.nerv-radar` element — concentric circles with at least 5 rings, centered, with radial division lines at 0°, 45°, 90°, 135°, etc.
- **Right side**: `.nerv-hex-grid` — at least 3×4 hex cells in honeycomb layout, with mixed states (danger/warn/safe/empty), flickering between states via JS
- **Left side**: Vertical `.nerv-stripe-vertical` bar
- **Bottom**: Horizontal stripe pair framing the bottom edge
- Registration mark grid behind everything (from Phase 3)
- Scanline overlay active (auto-injected by `nerv.js` in this reference page, rather than manual HTML)

**This is the first reference page where `nerv.js` is loaded.** The `<script>` tag calls `NERV.init()`, which handles scanline injection and hex flicker initialization. No manual overlay `<div>` in the HTML.

---

## Dependencies

| Dependency | From Phase | What It Provides |
|------------|-----------|------------------|
| `_tokens.scss` | Phase 1 | Color tokens, animation speed token |
| `_glow.scss` | Phase 1 | Glow mixin for drop-shadow on hex cells, radar rings |
| `_flicker.scss` | Phase 2 | CSS flicker animations (hex cells may use deterministic flicker) |
| `_scanlines.scss` | Phase 2 | Scanline overlay styles (now auto-injected by JS) |
| `_grid-marks.scss` | Phase 3 | Grid marks background visible in reference page |
| Build pipeline | Phase 1 | `npm run build` (updated to also copy `nerv.js` to `dist/`) |

---

## Verification Criteria

1. **Build succeeds**: SCSS compiles without errors; `nerv.js` is copied to `dist/`
2. **Stripe — horizontal**: Green diagonal stripe bar spans full width, pattern is clean
3. **Stripe — red**: Red stripe bar visible below green, animating in opposite direction
4. **Stripe — vertical**: Vertical stripe bar renders correctly on the left edge
5. **Stripe — animation**: Stripes scroll smoothly at a steady pace
6. **Radar — rings**: At least 5 concentric circles are visible, evenly spaced, centered
7. **Radar — divisions**: Radial lines divide the circle at regular angular intervals
8. **Hex grid — layout**: 3×4 (or larger) honeycomb pattern with alternating row offsets
9. **Hex grid — states**: Cells show visually distinct colors for danger/warn/safe/empty states
10. **Hex grid — JS flicker**: Cells randomly change state at irregular intervals (JS-driven)
11. **nerv.js — scanline injection**: Scanline overlay appears without any manual `<div>` in the HTML
12. **nerv.js — non-destructive**: JS does not throw errors, does not interfere with existing page elements
13. **`prefers-reduced-motion`**: Stripe animation stops, radar sweep (if present) stops, hex flicker stops. Static patterns remain.
14. **No regressions**: All Phase 1–3 verification criteria still pass

---

## Open Questions

### nerv.js module format

This document recommends a UMD-lite pattern (ES module export + `window.NERV` global). If the project later adopts a bundler for JS (unlikely given the minimal-JS constraint), this can be revisited. For now, the dual-format approach ensures maximum compatibility for consumers.

This is a **low-risk** decision that can be adjusted during implementation.
