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
