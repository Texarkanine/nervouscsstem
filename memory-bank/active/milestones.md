# Milestones: nerv-design-system

## Cross-milestone invariants & constraints

- All CSS selectors use the `.nerv-` prefix — no exceptions, no bare element selectors
- All color values consumed via CSS custom properties from `_tokens.scss` — no hard-coded hex in other modules
- Ambiance-driven elements reference `--nerv-primary`; data-driven elements reference specific named tokens
- `prefers-reduced-motion` suppresses all animations; static appearance remains recognizably NERV
- `prefers-contrast` increases border widths; elements remain distinguishable without glow
- No image files, no `<canvas>`, no WebGL — SVG data URIs in CSS `background-image` are the sole exception
- JS is orchestration only — DOM injection, state toggling, random timers. No drawing, painting, or rendering.
- Each milestone's `ref-*.html` page verifies that all prior milestones' outputs still work (cumulative regression)
- SCSS partials use `_` prefix; only `nerv.scss` is the compilation entry point
- `dist/` is git-ignored; build output is not committed

## Execution Order

See `planning/PHASE{N}.md` for phase research and details.

- [ ] Phase 1 — Foundation Layer: project scaffolding, `_tokens.scss`, `_typography.scss`, `_glow.scss`, `ref-foundation.html` (estimated L3)
- [ ] Phase 2 — Effects Layer: `_scanlines.scss`, `_flicker.scss`, `_glitch.scss`, `ref-effects.html` (estimated L2)
- [ ] Phase 3 — Structural Layer: `_panels.scss`, `_dividers.scss`, `_grid-marks.scss`, `ref-panels.html` (estimated L3)
- [ ] Phase 4 — Patterns & Geometry + Initial JS: `_stripe-bar.scss`, `_hex-grid.scss`, `_radar.scss`, `nerv.js` v1, `ref-patterns.html` (estimated L3)
- [ ] Phase 5 — Functional Components: `_bar-meter.scss`, `_segment-display.scss`, `_magi-panel.scss`, `_label-box.scss`, `_status-text.scss`, `nerv.js` v2, `ref-components.html` (estimated L3)
- [ ] Phase 6 — Alert State Cascade & Integration: `_states.scss`, `NERV.setState()`, `ref-alert-cascade.html` (estimated L3)
