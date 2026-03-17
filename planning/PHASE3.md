# Phase 3: Structural Layer — Panels, Dividers, Grid Marks

> Bordered containers, zone separators, and the registration-mark crosshair grid.
> Verified by: `ref/ref-panels.html`

---

## Scope

This phase introduces the spatial composition primitives: the bordered panel containers that hold content, the divider lines that separate display zones, and the crosshair registration-mark grid that serves as the measurement substrate behind everything. Together these give the interface its characteristic partitioned-instrument-panel structure.

Grid marks are the most technically novel element in this phase — VISION.md §2.3.2 notes they are **not implemented in any prior art**. The implementation approach is specified below.

---

## Deliverables

### SCSS Modules

| File | Description |
|------|-------------|
| `src/_panels.scss` | Four panel variants — basic, titled, double-border, inset |
| `src/_dividers.scss` | Horizontal and vertical zone-separator rules |
| `src/_grid-marks.scss` | Registration mark crosshair grid background |

Update `src/nerv.scss` to `@forward` the three new partials.

### Reference Page

| File | Description |
|------|-------------|
| `ref/ref-panels.html` | Reference page 3 — 2×2 panel grid with dividers and grid marks |

### New Files in `src/`

```
src/
├── nerv.scss           # (updated)
├── _tokens.scss        # Phase 1
├── _typography.scss    # Phase 1
├── _glow.scss          # Phase 1
├── _scanlines.scss     # Phase 2
├── _flicker.scss       # Phase 2
├── _glitch.scss        # Phase 2
├── _panels.scss        # NEW
├── _dividers.scss      # NEW
└── _grid-marks.scss    # NEW
```

---

## Module Details

### `_panels.scss`

The basic container unit in NERV interfaces. Rectangular boxes with thin borders and optional title bars.

**Variants:**

| Class | Description | Key Technique |
|-------|-------------|---------------|
| `.nerv-panel` | Basic bordered box (1–2px border in current color) | `border: var(--nerv-border-width) solid var(--nerv-amber)` |
| `.nerv-panel-titled` | Box with a filled title-bar region | `::before` pseudo-element: `position: absolute; top: 0; left: 0; height: ~1.5em; background: var(--color)` |
| `.nerv-panel-double` | Double-border effect | `outline` + negative `outline-offset`, or nested `::after` pseudo-element |
| `.nerv-panel-inset` | Recessed/sunken appearance | `box-shadow: inset ...` with darker background |

**Common panel properties:**

- `position: relative` (needed for pseudo-element positioning in titled/double variants)
- `padding` for internal content spacing
- Color controlled by `--nerv-amber` by default; panels inherit the system's current color context
- Glow on borders via the glow mixin from Phase 1 (subtle `box-shadow` on the panel itself)
- `prefers-contrast`: `--nerv-border-width` increases to improve panel edge visibility without relying on glow

**SCSS mixin opportunity:**

A base `@mixin nerv-panel-base` can set shared properties (position, border, padding, color inheritance), with each variant extending it. This keeps the variants DRY and ensures consistency.

### `_dividers.scss`

Thin colored lines separating the display into zones — the visual "cuts" between instrument clusters.

**Classes:**

| Class | Description | Technique |
|-------|-------------|-----------|
| `.nerv-divider` | Default (cyan) horizontal rule | Dedicated element: `height: 1px; background: var(--nerv-cyan)` + glow |
| `.nerv-divider-vertical` | Vertical rule | `width: 1px; height: 100%; background: var(--nerv-cyan)` + glow |
| `.nerv-divider-amber` | Amber color variant | Color swap |

Dividers apply subtle glow via `box-shadow` for the phosphor-bleed effect on separation lines. They are simple enough to be standalone elements or pseudo-elements on adjacent panels — both approaches will be supported.

### `_grid-marks.scss`

The registration-mark crosshair grid — a background layer of small "+" marks at regular intervals, with optional axis labels. This is the most distinctive structural element of the NERV aesthetic and has no known CSS implementation to reference.

**Implementation approach: SVG data URI in `background-image`**

Of the techniques listed in VISION.md §2.3.2, the SVG data URI approach is recommended for this project because:

1. A single crosshair shape (`+`) as an SVG, encoded as a data URI, tiles perfectly via `background-repeat`
2. Grid density is controlled by `background-size`
3. Grid positioning is controlled by `background-position`
4. Color is embedded in the SVG and can reference the token value at build time (SCSS string interpolation into the data URI)
5. The result is crisp at any zoom level (vector)
6. The alternative (layered `repeating-linear-gradient` with hard stops) requires many gradient layers to produce crosshair shapes and is harder to maintain

**Classes:**

| Class | Description |
|-------|-------------|
| `.nerv-grid-marks` | Applies the crosshair grid as a background pattern |

**Axis labels:**

VISION.md §2.3.2 notes that axis labels (numeric coordinates along grid edges) require content generation beyond CSS `counter()` capability. Two options:

- **Phase 3 approach**: Include axis labels as static text elements in the reference page HTML. CSS positions them along the grid edges.
- **Phase 4+ approach**: `nerv.js` generates axis label elements dynamically.

For `ref-panels.html`, axis labels will be static HTML elements styled by CSS. The JS-generated version arrives in Phase 4.

---

## Reference Page: `ref/ref-panels.html`

Contents (from VISION.md §3, Page 3):

- **2×2 grid of panels** (CSS Grid) dividing the viewport into quadrants, separated by `.nerv-divider` lines (cyan vertical/horizontal rules)
- **Top-left**: `.nerv-panel` (basic bordered box) containing HUD-type text
- **Top-right**: `.nerv-panel-titled` with title bar "PSYCHOGRAPHIC DISPLAY" and body containing placeholder data text
- **Bottom-left**: `.nerv-panel-double` (double border) containing a `.nerv-type-segment` countdown value
- **Bottom-right**: `.nerv-panel-inset` (recessed) with a dense block of `.nerv-type-data` monospace text
- All panels have appropriate glow effects on borders
- **Registration mark grid** (`.nerv-grid-marks`) visible behind the panels as a background layer, with axis labels on at least one edge
- Scanline overlay active (from Phase 2)

**DOM note**: The scanline overlay `<div>` is included in the HTML markup (as in Phase 2's reference page). Grid axis labels are static HTML elements.

---

## Dependencies

| Dependency | From Phase | What It Provides |
|------------|-----------|------------------|
| `_tokens.scss` | Phase 1 | Color tokens, `--nerv-border-width`, spacing |
| `_typography.scss` | Phase 1 | Font classes for panel content |
| `_glow.scss` | Phase 1 | Glow mixin/classes for panel borders and dividers |
| `_scanlines.scss` | Phase 2 | Scanline overlay present in reference page |
| Build pipeline | Phase 1 | `npm run build` |

The panels, dividers, and grid-marks modules themselves depend only on Phase 1 (tokens + glow). The reference page additionally includes Phase 2 effects for visual completeness.

---

## Verification Criteria

1. **Build succeeds**: `npm run build` compiles without errors
2. **Panel — basic**: `.nerv-panel` renders as a visible bordered box with amber border and subtle glow
3. **Panel — titled**: `.nerv-panel-titled` shows a filled title bar with contrasting text, body area below
4. **Panel — double**: `.nerv-panel-double` shows two concentric border lines
5. **Panel — inset**: `.nerv-panel-inset` appears visually recessed (darker background, inset shadow)
6. **Dividers**: Cyan lines visibly separate the four quadrants; glow bleeds into adjacent space
7. **Grid marks**: Crosshair pattern is visible behind the panels, with consistent spacing and alignment
8. **Grid marks — non-interactive**: Grid pattern does not interfere with panel content or interaction
9. **Axis labels**: At least one edge of the grid shows coordinate labels
10. **Composition**: The four panels + dividers + grid marks compose into a coherent instrument-panel layout without visual conflicts
11. **`prefers-contrast`**: Border widths increase; panels remain distinguishable without glow
12. **No regressions**: All Phase 1 and Phase 2 verification criteria still pass

---

## Open Questions

### Grid-marks implementation detail: gradient vs. SVG

This document recommends the SVG data URI approach. If during implementation the gradient approach proves simpler or more flexible (e.g., easier color theming via CSS custom properties at runtime), it is acceptable to switch. The verification criteria test the visual outcome, not the technique.

This is a **low-risk** implementation decision that can be resolved during the Phase 3 build without blocking this plan.
