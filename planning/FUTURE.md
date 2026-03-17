# Future Work

Potential features and enhancements for future phases. Items here are ideas only — not committed to any timeline.

## Reticle Tickmarks

CSS-based tickmarks along rectangle/panel edges, creating measurement-ruler or targeting-reticle aesthetics. Could be implemented as:

- A utility class (e.g., `.nerv-reticle-top`, `.nerv-reticle-left`) applied to any box edge
- Pure CSS via `repeating-linear-gradient` with thin bright lines at regular intervals, or SVG data URIs for more precise control (similar to `_grid-marks.scss`)
- Possibly a mixin that takes edge, color, and density parameters

Fits naturally in the structural layer alongside panels and dividers.

## Tiled Hex Grid

A third hex grid layout variant where hexagons perfectly tile with no gaps (true honeycomb tessellation). Currently we have:

- **Default (overlapping)**: Rows overlap via negative margin for tight honeycomb
- **Spaced**: Non-overlapping, corner-touching with triangular gaps

The "tiled" variant would eliminate both overlaps and gaps via precise sizing and offset math.

## Rainbow Gradient System

Multi-hue rainbow gradients as seen in the Evangelion operational console backgrounds — smooth hue sweeps across large regions. Reference imagery in `planning/selected-ref-images/hexagons-with-border-fill-and-noboder-merge.png` shows rainbow-tinted hex grid backgrounds transitioning through red/amber/green/cyan zones.

A full rainbow gradient system would provide:

- A reusable gradient primitive (mixin or utility class) for backgrounds, overlays, and bar meter fills
- Integration with the bar meter `--nerv-bar-from-rgb` / `--nerv-bar-to-rgb` system (multi-stop extension)
- Background application via `.nerv-rainbow-bg` or similar class
- Configurable hue range, direction, and opacity

This is a broader project than a single component — would touch tokens, utilities, and multiple consumers.

## Fix: CRT opacity on barberspole

Vertical and/or green barberpole has opacity in-between green bands. Should not.

Perhaps: barberpoles should have square borders with glow of a configurable color? Default to the main barberpole color?