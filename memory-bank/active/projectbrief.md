# Project Brief: Phase 5 Enhancements — Component Flexibility

## User Story

Enhance the three primary interactive components from Phase 5 (label boxes, MAGI panels, bar meters) with runtime flexibility, interactivity, and token-based color customization so that consumers can adapt them to varied data visualization scenarios within the NERV design language.

## Requirements

### Label Box Interactivity & Semantics
- CSS `:hover`, `:active`, and `:focus-visible` pseudo-class states with visual feedback
- Button element reset (`appearance: none`) so `.nerv-label-box` works on `<button>` elements
- JS click-to-toggle: within a `.nerv-label-box-group`, clicking a label box activates it and deactivates siblings (radio behavior)
- Reference page uses `<button>` elements to demonstrate semantic HTML pattern

### MAGI Panel — N-to-1 Layout with Per-Box Color
- Per-system-box color via `--nerv-magi-system-color` / `--nerv-magi-system-color-rgb` custom properties, defaulting to the panel's `--nerv-magi-color`
- Connecting lines (`::after`) inherit the system box's color automatically
- Support N system boxes flowing into 1 output box (not hardcoded to 3) via `NERV.initMagiPanels()` which sets grid columns based on child count

### Bar Meter — Token-Based Color Gradient, Sizing, Orientation, and Generation
- Replace hardcoded HSL gradient with `color-mix()` approach using two custom properties: `--nerv-bar-from` and `--nerv-bar-to`
- Defaults: cyan-to-blue (matching current visual)
- Consumers set from/to using built-in `--nerv-*` tokens: any named color, plus `--nerv-void` (black) and new `--nerv-white` for fade-in/fade-out effects
- SCSS `@for` loop generates percentage values only (`--nerv-bar-pct`); JS sets exact percentages for arbitrary bar counts
- Configurable segment sizing via `--nerv-bar-gap` and `--nerv-bar-width` custom properties
- Vertical orientation via `.nerv-bar-meter-vertical` modifier (column-reverse flex, fills bottom-to-top)
- JS-generated bar children via `data-bars="N"` attribute — cheap/easy path for consumers; manual divs remain for fine-grained control (zone markers, etc.)

### Token Addition
- Add `--nerv-white` / `--nerv-white-rgb` to the color token system for bar meter fade endpoints

### Reference Page Update
- Demo hover/click behavior on label boxes using `<button>` elements
- Demo per-system MAGI coloring (DENY in red, APPROVE in green)
- Demo varied bar meter color ranges (different from/to per meter)
- Demo `data-bars` JS-generated bars (at least one meter)
- Demo vertical bar meter with consumer-set height

## Acceptance Criteria

- All existing Phase 5 tests continue to pass (with modifications for changed color approach)
- New tests cover hover/active/focus-visible CSS states, per-system MAGI colors, token-based bar colors, vertical bars, segment sizing, JS API additions
- Lint, build, and full test suite green
- Reference page visually demonstrates all enhancements including vertical meter, data-bars generation, and button elements
