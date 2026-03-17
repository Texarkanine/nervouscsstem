# Project Brief: Phase 5 — Functional UI Components

## User Story

Deliver the five functional UI components that sit inside the structural containers from Phase 3 and compose with the effects from Phase 2: bar meters, seven-segment displays, MAGI decision panels, skewed label-box buttons, and status text overlays.

## Requirements

### SCSS Modules (5 new partials)
- `_bar-meter.scss` — Discrete colored bar meter with HSL gradient, zone markers, fill-level control
- `_segment-display.scss` — Seven-segment numeric readout with DSEG7 font and ghost-segment effect
- `_magi-panel.scss` — Three-system consensus decision display (CASPER, BALTHASAR, MELCHIOR → MAGI)
- `_label-box.scss` — Skewed parallelogram mode-indicator buttons with active state
- `_status-text.scss` — Large alert/status text overlays with severity-based styling and animation composition

### JavaScript Update (`nerv.js` v2)
- `NERV.initGhostSegments(container?)` — reads `.nerv-segment-display` content, generates `data-ghost` attribute
- `NERV.initBarMeters(container?)` — reads `data-fill` on `.nerv-bar-meter`, activates/deactivates bars

### Entry Point Update
- Update `src/nerv.scss` to `@forward` the five new SCSS partials

### Reference Page
- `ref/ref-components.html` — Four-zone 12-column grid layout demonstrating all components with scanlines, grid marks, ghost segments, and bar meter fills

## Acceptance Criteria

See `planning/PHASE5.md` — Verification Criteria (17 items covering layout, color, fill, font, glow, composition, accessibility, and no regressions).
