# Future Work

Potential features and enhancements for future phases. Items here are ideas only — not committed to any timeline.

## Reticle Tickmarks

CSS-based tickmarks along rectangle/panel edges, creating measurement-ruler or targeting-reticle aesthetics. Could be implemented as:

- A utility class (e.g., `.nerv-reticle-top`, `.nerv-reticle-left`) applied to any box edge
- Pure CSS via `repeating-linear-gradient` with thin bright lines at regular intervals, or SVG data URIs for more precise control (similar to `_grid-marks.scss`)
- Possibly a mixin that takes edge, color, and density parameters

Fits naturally in the structural layer alongside panels and dividers.

## Rainbow Gradient System

Multi-hue rainbow gradients as seen in the Evangelion operational console backgrounds — smooth hue sweeps across large regions. Reference imagery in `planning/selected-ref-images/hexagons-with-border-fill-and-noboder-merge.png` shows rainbow-tinted hex grid backgrounds transitioning through red/amber/green/cyan zones.

A full rainbow gradient system would provide:

- A reusable gradient primitive (mixin or utility class) for backgrounds, overlays, and bar meter fills
- Integration with the bar meter `--nerv-bar-from-rgb` / `--nerv-bar-to-rgb` system (multi-stop extension)
- Background application via `.nerv-rainbow-bg` or similar class
- Configurable hue range, direction, and opacity

This is a broader project than a single component — would touch tokens, utilities, and multiple consumers.

We did get rainbow gradients in ref/ref-components.html; so maybe this is done? Or we want to just make it EASIER to add rainbow gradients to things? Maybe there's no work here.

## Fix: CRT opacity on barberspole

Vertical and/or green barberpole has opacity in-between green bands. Should not.

Perhaps: barberpoles should have square borders with glow of a configurable color? Default to the main barberpole color?

## Glitch Refinement:

Insight: Glitch styling should NEVER smoothly translate; it should JUMP between slides/positions. This makes it look broken instead of like a little moth around a flame.

## Web Forms

We are building components used in NGE. This allows building NGE-ish displays.

We also want to be able to style actual websites; we should take an inventory of the major web form elements and make sure they can be styled appropriately (text input, textarea, etc. - the basics!)

## Lists

Lists should get a helper set of classes that let them be 45% angled up or down pillboxes around content, this is a very common NGE design element. Should allow color selection and maybe shape (trapezoid or enlongated hexagon?) though shape may be YAGNI.

## Custom Dropdown (`.nerv-dropdown`)

Native `<select>` dropdowns are OS-rendered — we can style the closed box (`.nerv-select` does this), but the open dropdown popup ignores CSS for hover highlights, per-option backgrounds, borders, glow, and shapes. This means we can't do things like an "alert level" selector where each option is colored to match its severity.

A custom dropdown component would replace the native `<select>` with a `<div>`/`<ul>` structure that gives full CSS control over every option. The visual building blocks already exist: `.nerv-list` color variants for the option items, `.nerv-panel` for the container, focus/glow patterns from `_form.scss` and `_label-box.scss`. What's missing is the JS interaction layer in `nerv.js`:

- Open/close on click and Escape
- Arrow-key navigation through options
- Selection management (update a hidden `<input>` or data attribute)
- ARIA attributes (`role="listbox"`, `aria-expanded`, `aria-activedescendant`)
- `<label>` association for accessibility

This is orchestration (managing state and DOM interaction), which fits within the project's minimal-JS constraint. Probably L2-sized — one new JS function (`NERV.initDropdowns()`) and CSS for the open/closed/selected states.

## Tables

Tables - both real and CSS - should be trivially styleable as vector-like phosphor glowing outlines.

However, we want to support a few kinds of special table rows:

- alternating triangles - tiled equilateral triangles, up and down, as table cells in a "triangle" row. Text is aligned to the base, alternating up or down depending on triangle direction. Height scales with row height.
- hexagons - touching on edges. Need an offset A and B that will cause multiple rows of hexagon cells to align out-of-phase so that they can have triangles in-between, or in-phase so that they form nice vertical columns. Ideally, a table could specify what it wanted its hexagon rows to do - be the same offset, or alternate between two offsets.
- alternating stretchable triangles - like regular triangles, except, cells can expand based on their contents, and become trapezoids. The edge tiling remains.

### Tiled Hex Grid

A third hex grid layout variant where hexagons perfectly tile with no gaps (true honeycomb tessellation). Currently we have:

- **Default (overlapping)**: Rows overlap via negative margin for tight honeycomb
- **Spaced**: Non-overlapping, corner-touching with triangular gaps

The "tiled" variant would eliminate both overlaps and gaps via precise sizing and offset math.

TO DECIDE: is this just the hexagon table type?

## Radar pulse

Ability to put elements (maybe just text) in the radar radially and have them pulse and fade down when the radar scans over them, like actual radar. Not possible with CSs? find out!

AT least be able to sync elements to WHERE the radar sweep is, e.g. update a value when it hits top - even if not provided by us. goal: syncing other UI actions - even if outside our kit - to the radar sweep.

## Typefaces

Maybe we'd like a "squished" / narrow typeface option? That feels very Japanese retrofuture UI.

## Rounded Rects

Most of our rectangles have sharp corners. Most of the NERV rectangles - at least the "outline, border only, black fill, text matches border" style - have roudned edges.

the edges in those cases are kinda thick - matching the font weight. Not the narrow phosphor outlines of our existing vector style.

We should add such support for such boxes, as part of the "foundation," demo'd after the `Glow Effects — box-shadow (.nerv-glow-*)` line.
