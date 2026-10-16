# UI/UX Decision: Wave Graph Consumer API

## User & Context

Web developers reskinning dashboards with `nerv.css`. They write HTML, set custom properties inline or in their own CSS, and add modifier classes. They should be able to reproduce the issue's two examples (four phase-offset waves; two frequency-offset waves) by changing one property per wave.

## Design System

`memory-bank/techContext.md` Design System + `systemPatterns.md`: `.nerv-` prefix, ambiance vs. data tokens, token-driven durations, replacement-property discipline, per-color modifiers generated from `$nerv-colors` (see `_glow.scss`, `_reticle.scss`, `_grid-marks.scss`).

## Options Evaluated

- **Lengths API**: `--nerv-wave-wavelength: 12rem`, `--nerv-wave-amplitude: 3rem`, point at `left: 40%`. Familiar, but point tracking needs `position / wavelength`, a length ÷ length that requires CSS typed arithmetic (Chrome-only in 2026).
- **Fractions API**: all geometry is unitless fractions of the box. Amplitude = fraction of half the cross-axis span; wavelength = fraction of the travel-axis span; point position = fraction of the travel axis; phase = fraction of a cycle (turns). Scales with the box, and the vertical variant reuses the same numbers.
- **Data-attribute API + JS**: `data-amplitude` etc. read by `nerv.js` into custom properties. Adds a JS dependency to something CSS can do alone.

## Analysis

Fractions win on feasibility (the only one that tracks points in CSS across engines), on consistency (radar already uses unitless turns for bearing and phase), and on simplicity (no JS). Lengths would read more naturally, but they cannot meet the spec. Data attributes add a JS layer the constraints say to avoid.

Key insights:

- Phase as an angle (`90deg`) would feed `sin()` directly but cannot be turned into a mask offset without typed arithmetic, so phase is in turns like `--nerv-radar-blip-bear-turn`.
- **Color default is ambiance, named modifiers are data.** An uncolored wave uses `--nerv-primary` so a single decorative trace moves with the alert cascade (like radar). `.nerv-wave-{color}` modifiers pin named data tokens so multi-series graphs keep each series' identity through the cascade.
- The graph box sets no `background` or `border`, so `.nerv-grid-marks` (background-image) and `.nerv-reticle-*` (`::after`) compose onto it without replacement-property collisions. The box claims no pseudo-elements.
- Accessibility: the component is visual. Docs examples give the graph `role="img"` and an `aria-label`. Reduced motion freezes at phase; high contrast thickens strokes, cuts glow via `--nerv-glow-intensity`, and rings points in `--nerv-bg` so they separate from their own line.

## Decision

**Selected**: Fractions API, CSS-only.
**Rationale**: It is the only shape that meets "points stay on the line" in CSS across engines, and it matches existing unitless-turn conventions.
**Tradeoff**: Wavelength and amplitude are relative to the box, not absolute lengths. A consumer who wants a fixed physical wavelength sizes the box accordingly.

## Implementation Notes

Public surface:

| Name | Where | Meaning | Default |
|------|-------|---------|---------|
| `.nerv-wave-graph` | box | positioning context, clips, `aspect-ratio: 16 / 10` | — |
| `.nerv-wave-graph-vertical` | box | waves travel vertically; points move side to side | — |
| `.nerv-wave` | child of box | one sine trace | — |
| `--nerv-wave-amplitude` | wave | fraction of half the cross-axis span | `0.8` |
| `--nerv-wave-wavelength` | wave | fraction of the travel-axis span | `0.5` |
| `--nerv-wave-frequency` | wave | cycles per `--nerv-wave-duration` (cycles/s by default); `0` holds still | `0.25` |
| `--nerv-wave-phase` | wave | starting offset in turns (0.25 = 90°) | `0` |
| `--nerv-wave-color` | wave | stroke + glow color | `var(--nerv-primary)` |
| `.nerv-wave-{color}` | wave | pins a named data color (glow-flagged tokens) | — |
| `.nerv-wave-reverse` | wave | flips travel direction | left / up |
| `.nerv-wave-point` | child of wave | dot riding the line | — |
| `--nerv-wave-point-at` | point | fraction along the travel axis | `0.5` |
| `--nerv-wave-point-size` | graph (inherits) | dot diameter | `0.5rem` |
| `--nerv-wave-duration` | `:root` | time unit for frequency; global slow-down knob | `1s` |
| `--nerv-wave-t` | internal | registered animated clock; consumers do not set it | `0` |

- Stacking: later waves paint over earlier ones.
- Direction default: toward the start of the axis (right-to-left, bottom-to-top), like a chart recorder.
- Graph chrome in docs: `.nerv-panel` wrapper, `.nerv-grid-marks` on the graph, `.nerv-reticle-bottom` / `-left` for ticks, `.nerv-segment-display` for the timer.
