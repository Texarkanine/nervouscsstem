# Project Brief

## User Story

As a web developer using the NERV design system, I want structural layout primitives (panels, dividers, grid marks) so that I can compose partitioned instrument-panel layouts with the characteristic NERV aesthetic.

## Use-Case(s)

### Use-Case 1: Panel Containers

Apply bordered panel containers (basic, titled, double-border, inset) to hold content regions in a NERV-themed interface.

### Use-Case 2: Zone Separation

Use divider lines (horizontal and vertical, in multiple colors) to visually partition the display into instrument zones.

### Use-Case 3: Registration Mark Grid

Apply a crosshair registration-mark grid as a background measurement substrate behind content, evoking technical-drawing precision.

## Requirements

1. `_panels.scss` — Four panel variants: `.nerv-panel` (basic), `.nerv-panel-titled`, `.nerv-panel-double`, `.nerv-panel-inset`
2. `_dividers.scss` — Horizontal/vertical dividers: `.nerv-divider`, `.nerv-divider-vertical`, `.nerv-divider-amber`
3. `_grid-marks.scss` — Registration mark crosshair grid: `.nerv-grid-marks` via SVG data URI background
4. Update `src/nerv.scss` to `@forward` the three new partials
5. `ref/ref-panels.html` — Reference page with 2x2 panel grid, dividers, grid marks, and axis labels
6. Axis labels as static HTML elements (JS-generated version deferred to Phase 4)

## Constraints

1. All selectors use `.nerv-` prefix — no bare element selectors
2. All color values via CSS custom properties from `_tokens.scss`
3. Glow effects on panel borders and dividers via Phase 1 glow mixin
4. `prefers-reduced-motion` suppresses all animations; static appearance remains NERV
5. `prefers-contrast` increases border widths; elements distinguishable without glow
6. No image files — SVG data URIs in CSS `background-image` are the sole exception
7. No regressions on Phase 1 and Phase 2 outputs

## Acceptance Criteria

1. `npm run build` compiles without errors
2. `.nerv-panel` renders a visible bordered box with amber border and subtle glow
3. `.nerv-panel-titled` shows a filled title bar with contrasting text and body area below
4. `.nerv-panel-double` shows two concentric border lines
5. `.nerv-panel-inset` appears visually recessed with darker background and inset shadow
6. Cyan divider lines visibly separate quadrants with glow bleed
7. Crosshair grid pattern visible behind panels with consistent spacing/alignment
8. Grid pattern does not interfere with panel content or interaction
9. At least one edge shows coordinate axis labels
10. Four panels + dividers + grid marks compose into a coherent instrument-panel layout
11. `prefers-contrast` increases border widths; panels distinguishable without glow
12. All Phase 1 and Phase 2 verification criteria still pass
