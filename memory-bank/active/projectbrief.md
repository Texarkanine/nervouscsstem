# Project Brief: Phase 5 Enhancements — Component Flexibility

## User Story

Enhance the three primary interactive components from Phase 5 (label boxes, MAGI panels, bar meters) with runtime flexibility, interactivity, and token-based color customization so that consumers can adapt them to varied data visualization scenarios within the NERV design language.

## Requirements

### Label Box Interactivity
- CSS `:hover` and `:active` pseudo-class states with visual feedback (border glow, pressed feel)
- JS click-to-toggle: within a `.nerv-label-box-group`, clicking a label box activates it and deactivates siblings (radio behavior)
- Standalone label boxes toggle on/off independently

### MAGI Panel — N-to-1 Layout with Per-Box Color
- Per-system-box color via `--nerv-magi-system-color` / `--nerv-magi-system-color-rgb` custom properties, defaulting to the panel's `--nerv-magi-color`
- Connecting lines (`::after`) inherit the system box's color automatically
- Support N system boxes flowing into 1 output box (not hardcoded to 3) via `NERV.initMagiPanels()` which sets grid columns based on child count

### Bar Meter — Token-Based Color Gradient
- Replace hardcoded HSL gradient with `color-mix()` approach using two custom properties: `--nerv-bar-from` and `--nerv-bar-to`
- Defaults: cyan-to-blue (matching current visual)
- Consumers set from/to using built-in `--nerv-*` tokens: any named color, plus `--nerv-void` (black) and new `--nerv-white` for fade-in/fade-out effects
- SCSS `@for` loop generates percentage values only (`--nerv-bar-pct`); JS sets exact percentages for arbitrary bar counts

### Token Addition
- Add `--nerv-white` / `--nerv-white-rgb` to the color token system for bar meter fade endpoints

### Reference Page Update
- Demo hover/click behavior on label boxes
- Demo per-system MAGI coloring (DENY in red, APPROVE in green)
- Demo varied bar meter color ranges (different from/to per meter)

## Acceptance Criteria

- All existing Phase 5 tests continue to pass (with modifications for changed color approach)
- New tests cover hover/active CSS states, per-system MAGI colors, token-based bar colors, JS API additions
- Lint, build, and full test suite green
- Reference page visually demonstrates all enhancements
