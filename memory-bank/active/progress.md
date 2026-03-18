# Progress: M4 — Reticle Tickmarks

Add CSS-based measurement-ruler tickmarks along panel edges via utility classes and/or mixin. New structural component in a new SCSS partial.

**Complexity:** Level 2

## Phase History

### Complexity Analysis — Complete
Classified as Level 2 (Simple Enhancement). Self-contained new component — utility classes for edge tickmarks using `repeating-linear-gradient` or SVG data URIs. New SCSS partial, fits structural layer alongside panels and dividers.

### Plan — Complete
Designed `repeating-linear-gradient` approach for tick marks. 6 utility classes (`.nerv-reticle` all edges, 4 individual edge classes) + auto-generated color variants from `$nerv-colors`. Custom properties: `--nerv-reticle-color`, `--nerv-reticle-size`, `--nerv-reticle-spacing`, `--nerv-reticle-width`. `prefers-contrast: more` bumps width to 2px. 9 test behaviors in `test/panels.test.mjs`. 3 files touched: `src/_reticle.scss` (new), `src/nerv.scss` (add @forward), `ref/ref-panels.html` (demos).
