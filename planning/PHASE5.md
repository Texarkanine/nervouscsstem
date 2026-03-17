# Phase 5: Functional UI Components

> Bar meters, seven-segment displays, MAGI decision panels, skewed label-box buttons, and status text overlays.
> Verified by: `ref/ref-components.html`

---

## Scope

This phase delivers the five functional UI components — the recognizable interactive/display elements that sit inside the structural containers from Phase 3 and compose with the effects from Phase 2. This is the heaviest phase in terms of module count and the most complex reference page.

This phase also extends `nerv.js` with ghost-segment population for the seven-segment display.

---

## Deliverables

### SCSS Modules

| File | Description |
|------|-------------|
| `src/_bar-meter.scss` | Discrete colored bar meter ("Mental Toxicity Level" readout) |
| `src/_segment-display.scss` | Seven-segment numeric readout with ghost segments |
| `src/_magi-panel.scss` | MAGI three-system voting/decision display |
| `src/_label-box.scss` | Skewed parallelogram mode indicator buttons |
| `src/_status-text.scss` | Large alert/status text overlays |

### JavaScript Update

| File | Change |
|------|--------|
| `src/nerv.js` | Add `NERV.initGhostSegments()` + `NERV.initBarMeters()` |

### Reference Page

| File | Description |
|------|-------------|
| `ref/ref-components.html` | Reference page 5 — all components composed in a 12-column grid layout |

### Updated Entry Point

Update `src/nerv.scss` to `@forward` the five new SCSS partials.

### New/Updated Files

```
src/
├── nerv.scss              # (updated)
├── _tokens.scss           # Phase 1
├── _typography.scss       # Phase 1
├── _glow.scss             # Phase 1
├── _scanlines.scss        # Phase 2
├── _flicker.scss          # Phase 2
├── _glitch.scss           # Phase 2
├── _panels.scss           # Phase 3
├── _dividers.scss         # Phase 3
├── _grid-marks.scss       # Phase 3
├── _stripe-bar.scss       # Phase 4
├── _hex-grid.scss         # Phase 4
├── _radar.scss            # Phase 4
├── nerv.js                # (updated — ghost segments, bar meters)
├── _bar-meter.scss        # NEW
├── _segment-display.scss  # NEW
├── _magi-panel.scss       # NEW
├── _label-box.scss        # NEW
└── _status-text.scss      # NEW
```

---

## Module Details

### `_bar-meter.scss`

The "Mental Toxicity Level" readout: rows of discrete colored blocks indicating fill levels.

**Structural classes:**

| Class | Element | Description |
|-------|---------|-------------|
| `.nerv-bar-meter` | Container | Wraps a single row of discrete bars |
| `.nerv-bar-meter-bar` | Child divs | Individual bar segments within the meter |

**Technique** (from VISION.md §2.4.1, ews-concept):

1. **CSS Flexbox** — container with `display: flex; gap: 2–3px`, child divs each `flex: 1; min-width: 4px`
2. **Programmatic color via SCSS loop** — `@for` loop generates `nth-child` selectors stepping HSL hue from cyan through blue to purple across the bar count. This is a prime SCSS use case: the loop outputs static CSS, so no runtime overhead
3. **Zone markers** — `::after` pseudo-elements at threshold positions for "CAUTION" and "DANGER" labels
4. **Fill level** — bars beyond the fill threshold have `background-color: transparent` (inactive). Fill level controlled by a `data-fill` attribute or by adding/removing an `.active` class on individual bars

**JS interaction:** `NERV.initBarMeters()` reads a `data-fill` attribute on the container (e.g., `data-fill="75"`) and activates/deactivates the appropriate number of bars. For static reference pages, bars can be manually classed.

### `_segment-display.scss`

Seven-segment numeric readout using the DSEG7 font, with the characteristic ghost-segment effect.

**Classes:**

| Class | Description |
|-------|-------------|
| `.nerv-segment-display` | Container for the seven-segment readout |

**Technique** (from VISION.md §2.4.2):

1. **DSEG7 Classic web font** — applied via the `.nerv-type-segment` class from Phase 1
2. **`letter-spacing`** to control digit spacing
3. **Ghost-segment effect** — a `::before` pseudo-element displays the ghost content (e.g., `888:88:88`) in a very dim color (`rgba(var(--nerv-amber-rgb), 0.08)`), positioned behind the actual content. The actual digits overlay the ghost at full brightness.
4. **`text-shadow`** for LED glow (amber by default)

**Ghost segment content:** The ghost content (all-8s placeholder) must match the format of the actual content. `NERV.initGhostSegments()` reads the element's text content length and format, generates the appropriate ghost string, and sets it as a `data-ghost` attribute. The `::before` pseudo-element reads this via `content: attr(data-ghost)`.

### `_magi-panel.scss`

The three-system consensus decision display: CASPER, BALTHASAR, MELCHIOR → MAGI.

**Classes:**

| Class | Element | Description |
|-------|---------|-------------|
| `.nerv-magi-panel` | Container | The full MAGI decision tree layout |
| `.nerv-magi-system` | Child | Individual system box (one of three) |
| `.nerv-magi-output` | Child | The MAGI result/consensus box |

**Technique** (from VISION.md §2.4.3):

1. **CSS Grid** for the overall layout — 3 input boxes across the top, 1 output box below, with space for connecting lines
2. **`border`** on individual cells for the box structure
3. **Connecting lines** via `::before`/`::after` pseudo-elements on the system boxes, using `border-top`/`border-left` positioned to create visual connections between system boxes and the output box
4. Uses `.nerv-panel-titled` styles from Phase 3 for the individual system boxes

**MAGI display text:** Each system box shows its name (CASPER·3, BALTHASAR·2, MELCHIOR·1) and a status value. The output box shows the MAGI consensus. The header uses `.nerv-type-display` for the institutional Japanese text (提訴決議).

### `_label-box.scss`

Skewed parallelogram mode-indicator buttons — the "STOP / SLOW / NORMAL / RACING" row.

**Classes:**

| Class | Description |
|-------|-------------|
| `.nerv-label-box` | Individual skewed button element |
| `.nerv-label-box-active` | Active/selected state — background fill + color inversion |
| `.nerv-label-box-group` | Row container for a set of label boxes |

**Technique** (from VISION.md §2.4.4, ews-concept):

1. `transform: skewX(-15deg)` on the button element — creates the parallelogram shape
2. Counter-skew on inner text: child `span` gets `transform: skewX(15deg)` to keep text upright
3. Active state: background fills with the current color, text inverts to dark
4. `box-shadow` glow on active state

### `_status-text.scss`

Large text overlays for alert and status messages — "APPROACHING LIMITS", "DANGER", "EMERGENCY".

**Classes:**

| Class | Description |
|-------|-------------|
| `.nerv-status-text` | Base large status label |
| `.nerv-status-nominal` | Green, no animation |
| `.nerv-status-caution` | Amber, optional blink |
| `.nerv-status-danger` | Red, blinking (`.nerv-blink` from Phase 2) |
| `.nerv-status-critical` | Red, glitching (`.nerv-glitch` from Phase 2) |

**Technique** (from VISION.md §2.4.5):

1. Large, bordered, filled label: `background: var(--nerv-red); color: var(--nerv-void); padding: 0.2em 0.8em; border: 2px solid`
2. Composes with Phase 2's `.nerv-blink` class for blinking behavior
3. Composes with Phase 2's `.nerv-glitch` class for digital corruption effect (requires `data-text` attribute)
4. `position: absolute` or `fixed` for overlay placement; relative to a containing panel or the viewport

---

### `nerv.js` — Phase 5 Additions

| Function | Purpose | Why JS Is Required |
|----------|---------|-------------------|
| `NERV.initGhostSegments(container?)` | Finds `.nerv-segment-display` elements, reads content, generates `data-ghost` attribute with matching all-8s string | Content-aware attribute generation |
| `NERV.initBarMeters(container?)` | Finds `.nerv-bar-meter[data-fill]` elements, activates/deactivates bars based on `data-fill` percentage | Dynamic fill level based on data attribute |

The `container` parameter is optional — defaults to `document` for global initialization, or accepts a specific parent element for scoped setup.

---

## Reference Page: `ref/ref-components.html`

Contents (from VISION.md §3, Page 5):

**Full viewport divided into four zones** via CSS Grid (12-column) with `.nerv-divider` lines:

| Zone | Grid Columns | Contents |
|------|-------------|----------|
| **A** (top-left) | 4 cols | `.nerv-magi-panel` — CASPER·3, BALTHASAR·2, MELCHIOR·1 → MAGI with connecting lines and a `提訴決議` header |
| **B** (top-right) | 8 cols | `.nerv-bar-meter` — 3 rows (subjects 00, 01, 02), each at different fill levels, with "CAUTION" and "DANGER" zone markers |
| **C** (bottom-left) | 6 cols | `.nerv-segment-display` countdown timer with ghost segments + row of `.nerv-label-box` buttons: STOP / SLOW / NORMAL / RACING |
| **D** (bottom-right) | 6 cols | Status text overlay demo — cycling NOMINAL → APPROACHING LIMITS → DANGER → EMERGENCY on a timed loop |

**Additional layers active:**

- Scanline + vignette overlay (auto-injected by `NERV.init()`)
- Registration mark grid behind everything
- Ghost segments auto-populated by `NERV.initGhostSegments()`
- Bar meter fill levels set by `NERV.initBarMeters()`

**Inline script:** Zone D's status text cycling (timed class swap) is handled by an inline `<script>` in the reference page, as it's demo behavior rather than a library feature.

---

## Dependencies

| Dependency | From Phase | What It Provides |
|------------|-----------|------------------|
| `_tokens.scss` | Phase 1 | Color tokens, RGB-decomposed variants for ghost segment dimming |
| `_typography.scss` | Phase 1 | Font classes (`.nerv-type-segment`, `.nerv-type-hud`, `.nerv-type-data`, `.nerv-type-display`) |
| `_glow.scss` | Phase 1 | Glow effects on segment display, MAGI boxes, bar meter glow |
| `_flicker.scss` | Phase 2 | Blink animation for status text, flicker on bar meter thresholds |
| `_glitch.scss` | Phase 2 | Glitch effect for critical status text |
| `_panels.scss` | Phase 3 | Panel styles used by MAGI system boxes |
| `_dividers.scss` | Phase 3 | Zone dividers in reference page layout |
| `_grid-marks.scss` | Phase 3 | Grid marks background in reference page |
| `nerv.js` (Phase 4 base) | Phase 4 | `NERV.init()`, scanline injection, base module structure |

---

## Verification Criteria

1. **Build succeeds**: SCSS compiles without errors; updated `nerv.js` copies to `dist/`
2. **Bar meter — layout**: 3 rows of discrete colored bars, each visibly a row of small blocks with gaps
3. **Bar meter — color gradient**: Bar colors step from cyan through blue to purple across the row (HSL progression)
4. **Bar meter — fill levels**: Different rows show different fill amounts; inactive bars are transparent/dimmed
5. **Bar meter — zone markers**: "CAUTION" and "DANGER" labels appear at threshold positions
6. **Segment display — font**: DSEG7 renders correctly as seven-segment digit characters
7. **Segment display — ghost segments**: Dimmed all-8s pattern visible behind the active digit values
8. **Segment display — glow**: Amber LED glow via `text-shadow`
9. **MAGI panel — layout**: Three system boxes + one output box arranged correctly with connecting lines
10. **MAGI panel — text**: System names, numbers, and Japanese header text render correctly
11. **Label boxes — shape**: Buttons are visibly skewed parallelograms with upright text inside
12. **Label boxes — active state**: One button shows filled/inverted active state with glow
13. **Status text — cycling**: Text cycles through four states (NOMINAL → APPROACHING LIMITS → DANGER → EMERGENCY) on a visible timer
14. **Status text — effects**: DANGER state blinks; EMERGENCY state glitches
15. **Composition**: All four zones render correctly within the 12-column grid, with dividers, grid marks, and scanline overlay all visible and non-conflicting
16. **`prefers-reduced-motion`**: Blink and glitch animations stop; bar meters, segment display, MAGI panel remain fully visible and static
17. **No regressions**: All Phase 1–4 verification criteria still pass

---

## Open Questions

### Bar meter color generation: SCSS loop count

The SCSS `@for` loop needs a maximum bar count to generate `nth-child` color selectors. A reasonable default (e.g., 50 bars) covers most display widths. If a consumer needs more, they can customize the SCSS variable and recompile. This default should be validated during implementation against the reference page's actual bar count.

This is a **low-risk** implementation detail, not a design decision.
