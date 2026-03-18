# Project Brief: NERV Design System — Future Features Buildout

## Overview

Implement all planned features and enhancements documented in `planning/FUTURE.md` for the NERV CSS design system. This is a multi-feature project spanning new components, bug fixes, enhancements, and potentially new architectural patterns.

## Features

### 1. Reticle Tickmarks
CSS-based tickmarks along rectangle/panel edges for measurement-ruler or targeting-reticle aesthetics. Utility classes (`.nerv-reticle-top`, `.nerv-reticle-left`, etc.) or a mixin taking edge, color, and density parameters. Pure CSS via `repeating-linear-gradient` or SVG data URIs. Fits in the structural layer alongside panels and dividers.

### 2. Rainbow Gradient System
Multi-hue rainbow gradients for backgrounds, overlays, and bar meter fills. Reusable gradient primitive (mixin or utility class), integration with bar meter `--nerv-bar-from-rgb` / `--nerv-bar-to-rgb`, background application via `.nerv-rainbow-bg` or similar. Configurable hue range, direction, and opacity. **Note:** Rainbow gradients already exist in `ref/ref-components.html` — may need scoping to determine if this is already done or if it needs to be made easier/more reusable.

### 3. Fix: CRT Opacity on Barberpole
Vertical and/or green barberpole has unwanted opacity between green bands. Should be solid. Also consider: barberpoles should have square borders with glow of a configurable color (default to main barberpole color).

### 4. Glitch Refinement
Glitch styling should NEVER smoothly translate — it should JUMP between positions. Current behavior looks like a smooth moth-around-flame; desired behavior is sharp, broken-feeling discontinuous jumps.

### 5. Web Forms
Style major web form elements (text input, textarea, select, radio, checkbox, button — the basics) in the NERV aesthetic. The design system needs to support real websites, not just dashboards.

### 6. Lists
Helper classes for lists with 45-degree angled pillbox styling around content. Very common NGE design element. Should allow color selection; shape options (trapezoid or elongated hexagon) may be YAGNI.

### 7. Tables
Tables (both real `<table>` and CSS-grid-based) styleable as vector-like phosphor glowing outlines. Special row types:
- **Alternating triangles** — tiled equilateral triangles (up/down) as cells. Text aligned to base.
- **Hexagons** — touching on edges, with offset A/B for in-phase or out-of-phase alignment.
- **Alternating stretchable triangles** — like regular triangles but cells expand with content, becoming trapezoids.

### 8. Tiled Hex Grid
A third hex grid layout variant: true honeycomb tessellation with no gaps or overlaps. **To decide:** is this achieved with a table similar to #7? Is this its own element? Or is this just a *technique* that can be done with existing hexagons, and doesn't need to be in our style library at all?

### 9. Radar Pulse
Elements (possibly just text) placed radially in the radar that pulse and fade when the radar sweep passes. At minimum, ability to sync external UI actions to radar sweep position. May not be possible with pure CSS — needs investigation.

## Acceptance Criteria

- Each NEW feature has its own reference HTML section or page demonstrating the feature
- All features respect `prefers-reduced-motion` and `prefers-contrast`
- All selectors use `.nerv-` prefix
- No image files — CSS-only (SVG data URIs permitted)
- Existing features remain unbroken
- Tests pass (Stylelint + Node.js test runner)
