# Future Work

Potential features and enhancements for future phases. Items here are ideas only — not committed to any timeline.

## Rainbow Gradient System

Multi-hue rainbow gradients as seen in the Evangelion operational console backgrounds — smooth hue sweeps across large regions. Reference imagery in `planning/selected-ref-images/hexagons-with-border-fill-and-noboder-merge.png` shows rainbow-tinted hex grid backgrounds transitioning through red/amber/green/cyan zones.

A full rainbow gradient system would provide:

- A reusable gradient primitive (mixin or utility class) for backgrounds, overlays, and bar meter fills
- Integration with the bar meter `--nerv-bar-from-rgb` / `--nerv-bar-to-rgb` system (multi-stop extension)
- Background application via `.nerv-rainbow-bg` or similar class
- Configurable hue range, direction, and opacity

This is a broader project than a single component — would touch tokens, utilities, and multiple consumers.

We did get rainbow gradients in ref/ref-components.html; so maybe this is done? Or we want to just make it EASIER to add rainbow gradients to things? Maybe there's no work here.

## Custom Dropdown (`.nerv-dropdown`)

Native `<select>` dropdowns are OS-rendered — we can style the closed box (`.nerv-select` does this), but the open dropdown popup ignores CSS for hover highlights, per-option backgrounds, borders, glow, and shapes. This means we can't do things like an "alert level" selector where each option is colored to match its severity.

A custom dropdown component would replace the native `<select>` with a `<div>`/`<ul>` structure that gives full CSS control over every option. The visual building blocks already exist: `.nerv-list` color variants for the option items, `.nerv-panel` for the container, focus/glow patterns from `_form.scss` and `_label-box.scss`. What's missing is the JS interaction layer in `nerv.js`:

- Open/close on click and Escape
- Arrow-key navigation through options
- Selection management (update a hidden `<input>` or data attribute)
- ARIA attributes (`role="listbox"`, `aria-expanded`, `aria-activedescendant`)
- `<label>` association for accessibility

This is orchestration (managing state and DOM interaction), which fits within the project's minimal-JS constraint. Probably L2-sized — one new JS function (`NERV.initDropdowns()`) and CSS for the open/closed/selected states.

## Tiled Hex Grid (`.nerv-hex-grid-tiled`)

A third hex grid layout variant (extending `_hex-grid.scss`) where hexagons perfectly tile with no gaps and no overlaps — true honeycomb tessellation. Currently the hex-grid has:

- **Default (overlapping)**: Rows overlap via negative margin for tight honeycomb
- **Spaced**: Non-overlapping, corner-touching with triangular gaps

The "tiled" variant would eliminate both overlaps and gaps via precise sizing and offset math. **Architecture decision (M7 creative phase, still valid):** implement as `.nerv-hex-grid-tiled` in `_hex-grid.scss`, not as a table row type — full options analysis and implementation notes are in [`planning/tiled-hex-grid-variant.md`](tiled-hex-grid-variant.md). For what actually shipped in M7 (tables without hex rows, tessellation still open), see the capstone summary in [`memory-bank/archive/systems/20260320-nerv-future-features.md`](../memory-bank/archive/systems/20260320-nerv-future-features.md).

## Typefaces

Maybe we'd like a "squished" / narrow typeface option? That feels very Japanese retrofuture UI.

## Rounded Rects

Most of our rectangles have sharp corners. Most of the NERV rectangles - at least the "outline, border only, black fill, text matches border" style - have rounded edges.

The edges in those cases are kinda thick - matching the font weight. Not the narrow phosphor outlines of our existing vector style.

We should add such support for such boxes, as part of the "foundation," demo'd after the `Glow Effects — box-shadow (.nerv-glow-*)` line.

---

## Recently shipped (reference)

Milestones M1–M8 from `nerv-future-features` (barberpole through radar pulse + sweep sync) are recorded in [`memory-bank/archive/systems/20260320-nerv-future-features.md`](../memory-bank/archive/systems/20260320-nerv-future-features.md).
