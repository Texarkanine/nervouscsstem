# Project Brief

## Objective

Implement Phase 1 (Foundation Layer) of the NERV Design System: project scaffolding, design tokens, typography system, and phosphor bloom glow effects.

## Requirements

1. Create project scaffolding: `package.json` with Dart Sass dev dependency, build/watch npm scripts, `.gitignore`
2. Create `src/nerv.scss` as the main SCSS entry point that `@forward`s all module partials
3. Create `src/_tokens.scss` — all design tokens as CSS custom properties on `:root` (10 color tokens + RGB companions + meta-tokens + utility tokens)
4. Create `src/_typography.scss` — `@font-face` declarations for 4 font families (CDN URLs), 5 utility classes (`.nerv-type-display`, `.nerv-type-hud`, `.nerv-type-data`, `.nerv-type-segment`, `.nerv-type-mixed`)
5. Create `src/_glow.scss` — phosphor bloom glow effects via `box-shadow`/`text-shadow` stacking (`.nerv-glow`, color variants, `.nerv-glow-text`), with `@mixin nerv-glow($color)` to reduce duplication
6. Create `ref/ref-foundation.html` — reference page verifying all Phase 1 outputs on true black background
7. All CSS selectors must use the `.nerv-` prefix
8. All color values consumed via CSS custom properties from `_tokens.scss`
9. `prefers-reduced-motion` and `prefers-contrast` accessibility support

## Constraints

- No image files, no `<canvas>`, no WebGL — only CSS
- JS is not part of this phase
- `dist/` is git-ignored; build output is not committed
- SCSS partials use `_` prefix; only `nerv.scss` is the compilation entry point
- Fonts loaded via CDN URLs baked into compiled CSS

## Acceptance Criteria

1. `npm run build` compiles `src/nerv.scss` → `dist/nerv.css` without errors
2. `ref-foundation.html` renders on true black (`#000000`) background
3. All 4 font families load successfully (4 distinct font requests, all 200 OK)
4. Each `.nerv-type-*` class renders in the correct font with correct CSS properties
5. Mixed JP/EN text (`活動限界 ACTIVE TIME REMAINING`) renders with correct font pairing
6. All 10 color tokens visually distinguishable and match specified hex values
7. Phosphor bloom visible around glowing text — multi-layer shadows create soft light bleeding
8. DSEG7 font renders with dimmed ghost segments visible behind active digits
9. `prefers-reduced-motion`: glow still renders, fonts still load, page fully usable
10. `prefers-contrast`: text readable, glow does not obscure, `--nerv-border-width` increases
