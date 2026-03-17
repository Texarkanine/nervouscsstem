# Project Brief: Phase 4 — Patterns & Geometry + Initial JS

## User Story

Deliver the three decorative/geometric pattern SCSS modules (`_stripe-bar.scss`, `_hex-grid.scss`, `_radar.scss`), the initial `nerv.js` orchestration module, and the `ref-patterns.html` reference page for the NERV design system.

## Requirements

### SCSS Modules
- `_stripe-bar.scss` — Animated diagonal chevron/hazard stripe patterns (`.nerv-stripe`, `.nerv-stripe-vertical`, `.nerv-stripe-red`, `.nerv-stripe-animated`)
- `_hex-grid.scss` — Hexagonal cell grid with state classes (`.nerv-hex-grid`, `.nerv-hex-row`, `.nerv-hex-cell`, `.nerv-hex-danger/warn/safe`)
- `_radar.scss` — Concentric circle / radar display pattern (`.nerv-radar`, `.nerv-radar-sweep`)

### JavaScript
- `src/nerv.js` — Initial orchestration module (UMD-lite: ES module export + `window.NERV`)
  - `NERV.init()` — master initializer
  - `NERV.injectScanlines()` — creates `.nerv-scanlines` overlay div
  - `NERV.initHexFlicker(container)` — random-interval hex cell state cycling
  - `NERV.initGridLabels(container)` — generates axis labels on grid edges

### Reference Page
- `ref/ref-patterns.html` — showcases all Phase 4 components with JS active

### Build Updates
- Update `src/nerv.scss` to `@forward` the three new partials
- Update `package.json` build script to copy `nerv.js` to `dist/`

### Constraints
- All selectors `.nerv-` prefixed
- `prefers-reduced-motion` suppresses all animations
- `prefers-contrast` handled appropriately
- No image files, no canvas, no WebGL
- JS is orchestration only — no drawing/rendering

## Acceptance Criteria

See `planning/PHASE4.md` § Verification Criteria (14 items).
