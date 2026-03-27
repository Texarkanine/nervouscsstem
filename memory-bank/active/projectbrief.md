# Project Brief: NERV Design System — Phase 7 Feature Expansion

## Summary

Implement all remaining features from `planning/FUTURE.md` plus additional user-specified features, and clean up the documentation in `docs/atomic-elements.md` and `docs/design-language.md` (which are messy, duplicated, and improperly categorized).

## Features

### From FUTURE.md

1. **Rainbow Gradient System** — May already be partially shipped (exists in ref-components.html). Assess whether this needs further work to make rainbow gradients easier to apply to arbitrary elements.
2. **Custom Dropdown (`.nerv-dropdown`)** — JS interaction layer (open/close, arrow keys, selection, ARIA) + CSS for open/closed/selected states, built from existing `.nerv-list` and `.nerv-panel` building blocks.
3. **Tiled Hex Grid (`.nerv-hex-grid-tiled`)** — True honeycomb tessellation with no gaps/overlaps. Architecture decision already made: implement as variant in `_hex-grid.scss`. Must also support the "lockout hex wall" use case (item 4 below).
4. **Psychographic Display** — Full x/y graph with axes, tickmarks, labels, SVG line traces, animation, and criticality-escalating "squigglemass" chaos mode.

### User Additions

5. **Grid `×` variant** — The existing `_grid-marks.scss` registration grid uses `+` crosshairs. Add an `×` (rotated 45°) variant. Also add a **hex grid background** option.
6. **Neural Channel Monitor** — A narrow, vertical psychographic display (side-by-side vertical waveform traces). Shares the criticality escalation system with the full psychographic (item 4), but NCM gets "Richter scale-y" (amplitude increases) rather than squigglemass. Both psychographic and NCM should intensify with criticality.
7. **Data Background (`.nerv-data-bullshit-background` or better name)** — Background fill with binary (0/1) or DNA (CAGT) data. Options: in-place text swap (JS) or seamless scroll. Speed increases with criticality. Sprite-sheet or JS generation approach. Scroll animation using viewport as de-facto sprite coordinates.
8. **DOS/BIOS Boot Screen Font** — One new monospace typeface suitable for mocking up DOS/BIOS-style boot screens. Added to the font stack in `_typography.scss`.
9. **List Nesting with Angled Variants** — Major structural fix. Two sub-problems:
   - **Contained sublists**: A parent item expands to visually contain its children (like "Power Grid" containing "District 01/02"). Currently broken with angled lists.
   - **Indented non-contained sublists**: Children that are indented but NOT visually part of the parent item (like "L Arm" under "LCL Circulation"). Currently not indented at all.
   - Reference: `memory-bank/troubleshooting/angle-multi-sublist.png`, `angle-single-list-add.png`, `no-indent.png`
10. **Green Wireframe Topographic Map** — SVG background fill that looks like a green contour-line topographic map. Generated with JS to keep size down. Must be seedable (random but predictable per seed). Should look map-like (not random noise).

### Documentation

11. **Doc Cleanup** — Reorganize and deduplicate `docs/atomic-elements.md` and `docs/design-language.md`. Ensure proper categorization (atoms vs. compositions/vibes).

## Constraints

- All existing design constraints apply (no image files, no canvas, minimal JS, `.nerv-` prefix, `prefers-reduced-motion`, `prefers-contrast`)
- JS is permitted for generation/orchestration (topo map seed generation, data background animation, psychographic waveform animation)
- SVG data URIs in CSS are permitted; JS-generated SVGs injected into DOM are also permitted for dynamic content
- New features must integrate with the existing alert cascade / criticality system where applicable
