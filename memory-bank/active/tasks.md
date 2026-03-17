# Task: NERV Design System — Phase 1: Foundation Layer

* Task ID: nerv-phase1-foundation
* Complexity: Level 3
* Type: feature

Implement the foundational layer of the NERV Design System: project scaffolding with Dart Sass, design tokens as CSS custom properties, typography system with CDN-loaded fonts and utility classes, and phosphor bloom glow effects. Verified by `ref/ref-foundation.html`.

## Pinned Info

### Module Dependency Flow

The @forward order in `nerv.scss` and the test execution order both follow this graph.

```mermaid
graph LR
    T["_tokens.scss<br>(:root custom props)"] --> TY["_typography.scss<br>(@font-face + utility classes)"]
    T --> G["_glow.scss<br>(bloom mixin + classes)"]
    TY --> N["nerv.scss<br>(@forward entry point)"]
    G --> N
    N -->|"sass build"| D["dist/nerv.css"]
    D --> R["ref/ref-foundation.html"]
```

### Token Architecture (from systemPatterns.md)

Ambiance tokens (`--nerv-primary`, `--nerv-bg`) are overridden by alert states in Phase 6. Data tokens (`--nerv-green`, `--nerv-red`, etc.) are stable and never overridden. This distinction must be preserved from the start.

## Component Analysis

### Affected Components

All components are new (greenfield). The project currently has only `LICENSE`, `planning/`, `memory-bank/`, and `.cursor/`.

- **`package.json`**: New. Project metadata, `sass` dev dependency, `build`/`build:min`/`watch`/`test` npm scripts.
- **`.gitignore`**: New. Ignores `node_modules/`, `dist/`.
- **`src/nerv.scss`**: New. Main SCSS entry point — `@forward`s `_tokens`, `_typography`, `_glow` in dependency order.
- **`src/_tokens.scss`**: New. All design tokens as CSS custom properties on `:root`. 10 named colors + RGB companions + 2 meta-tokens + 5 utility tokens. `prefers-contrast` override for `--nerv-border-width`.
- **`src/_typography.scss`**: New. `@font-face` declarations for 4 font families (Google Fonts CDN + jsDelivr). 5 utility classes (`.nerv-type-display`, `.nerv-type-hud`, `.nerv-type-data`, `.nerv-type-segment`, `.nerv-type-mixed`).
- **`src/_glow.scss`**: New. `@mixin nerv-glow($color-var, $color-rgb-var)` generates box-shadow and text-shadow stacks. Classes: `.nerv-glow`, `.nerv-glow-red`, `.nerv-glow-green`, `.nerv-glow-cyan`, `.nerv-glow-text`, plus color variants of `.nerv-glow-text`. `filter: drop-shadow()` utility for non-rectangular elements.
- **`ref/ref-foundation.html`**: New. Visual test fixture — black void background, all typography classes, all color tokens as glowing labels, ghost-segment seven-segment display.
- **`test/foundation.test.mjs`**: New. Build smoke test + color map output verification using Node.js built-in test runner.
- **`.stylelintrc.json`**: New. Stylelint configuration for convention enforcement.

### Cross-Module Dependencies

- `_typography.scss` → `_tokens.scss`: May reference color tokens for default text colors
- `_glow.scss` → `_tokens.scss`: References `-rgb` companion tokens for `rgba()` in box-shadow stacks, `--nerv-glow-spread` for blur radius
- `nerv.scss` → all partials: `@forward` chain in strict dependency order (tokens → typography → glow)
- `ref-foundation.html` → `dist/nerv.css`: links compiled output
- `test/foundation.test.mjs` → `dist/nerv.css`: reads compiled output for map-generated token/glow verification
- Stylelint → `dist/nerv.css`: enforces `.nerv-` prefix and no-hardcoded-hex conventions

### Boundary Changes

None — all new code, no existing interfaces to change.

## Open Questions

None — implementation approach is clear. All design decisions were resolved during L4 planning (SCSS tooling, font stack, font loading strategy, directory structure, token values).

## Preflight Innovation: SCSS Color Map

**Applied during preflight.** Introduce a SCSS `$nerv-colors` map in `_tokens.scss` as the single source of truth for the color system. Each map entry defines the color name, hex value, and whether it gets a glow variant. An `@each` loop generates `:root` custom properties and `-rgb` companions automatically. `_glow.scss` imports this map via `@use 'tokens'` and uses it with the glow mixin in another `@each` loop to auto-generate `.nerv-glow-*` and `.nerv-glow-text-*` classes. This eliminates manual duplication between tokens and glow, and makes adding new colors trivial (add to map → get token + RGB companion + glow class automatically).

## Test Plan

### Testing Philosophy

This is a CSS design system. The behaviors that matter — "does it look right?" — are inherently visual. Automated string-matching against compiled CSS mostly just tests that Dart Sass copies CSS, which has negligible value. The test plan therefore prioritizes:

1. **Build smoke test**: Does the SCSS compile? (Catches syntax errors and broken `@forward`/`@use` chains)
2. **Stylelint**: Does the compiled output follow conventions? (`.nerv-` prefix, no hardcoded hex outside `_tokens.scss`) — catches real violations automatically
3. **Map-generated output verification**: Does the `$nerv-colors` map produce the expected set of tokens and glow classes? (This is the one place where SCSS template logic is complex enough to warrant automated checks)
4. **Reference pages**: `ref/ref-foundation.html` IS the test. Visual acceptance criteria, verified by human inspection.

### Automated Checks

**Build smoke test:**
- `npm run build` exits 0 and produces `dist/nerv.css`
- `npm run build:min` exits 0 and produces `dist/nerv.min.css`

**Stylelint conventions:**
- No bare element selectors (all class selectors start with `.nerv-`)
- No hardcoded color hex values outside `_tokens.scss`

**Color map output verification:**
- `$nerv-colors` map generates exactly 10 `--nerv-*` color tokens on `:root`
- Each color token has a corresponding `--nerv-*-rgb` companion
- Each color flagged for glow produces `.nerv-glow-{name}` and `.nerv-glow-text-{name}` classes

### Visual Verification (Reference Page)

`ref/ref-foundation.html` is the primary test artifact. Acceptance criteria checked by visual inspection:

- Black void background
- All 4 font families render correctly
- Each `.nerv-type-*` class shows correct font + properties
- Mixed JP/EN text renders with correct font pairing
- All 10 color tokens visually distinguishable
- Phosphor bloom visible around glowing text
- DSEG7 ghost segments visible behind active digits
- `prefers-reduced-motion`: page fully usable (no animations to suppress in Phase 1)
- `prefers-contrast`: text readable, glow reduced, borders thicker

### Test Infrastructure

- Framework: Node.js built-in test runner (`node --test`)
- Linter: Stylelint with standard SCSS config
- Test location: `test/foundation.test.mjs`
- npm scripts: `"test": "node --test test/"`, `"lint": "stylelint dist/nerv.css"`
- New dev dependencies: `stylelint`, `stylelint-config-standard`

## Implementation Plan

### Step 1: Project Scaffolding

- Files: `package.json`, `.gitignore`
- Changes:
    - `package.json`: name `nervouscsstem`, private, `sass`/`stylelint`/`stylelint-config-standard` as devDependencies, scripts for `build`, `build:min`, `watch`, `test`, `lint`
    - `.gitignore`: `node_modules/`, `dist/`
- Post: `npm install`

### Step 2: Directory Structure & Stubs

- Create: `src/`, `ref/`, `fonts/`, `test/`
- Stub files (empty implementations with doc comments):
    - `src/nerv.scss` — entry point, empty `@forward` list
    - `src/_tokens.scss` — empty, doc comment describing purpose
    - `src/_typography.scss` — empty, doc comment describing purpose
    - `src/_glow.scss` — empty, doc comment describing purpose
- Create: `.stylelintrc.json` — Stylelint config enforcing `.nerv-` prefix, no hardcoded hex

### Step 3: Test Infrastructure & Test Cases

- Files: `test/foundation.test.mjs`
- Changes:
    - Import `node:test` and `node:assert`
    - Helper: build SCSS via `child_process.execSync('npm run build')`
    - Helper: read `dist/nerv.css` into string
    - Test cases (initially failing):
        - Build smoke: `dist/nerv.css` exists after build
        - Color map output: exactly 10 `--nerv-*` color tokens + 10 `-rgb` companions on `:root`
        - Color map → glow: each glow-flagged color has `.nerv-glow-{name}` and `.nerv-glow-text-{name}`
- Run: `npm test` → confirm tests fail (TDD red phase)
- Run: `npm run lint` → confirm Stylelint runs (will have no output until CSS exists)

### Step 4: Implement _tokens.scss (TDD green)

- Files: `src/_tokens.scss`
- Changes:
    - Define SCSS `$nerv-colors` map: each entry has name, hex value, RGB triplet, and glow-variant flag
    - `:root` block generated via `@each` loop over `$nerv-colors` → `--nerv-{name}` and `--nerv-{name}-rgb` properties
    - Meta-tokens `--nerv-primary` and `--nerv-bg` with defaults (hand-written, not map-driven)
    - Utility tokens (`--nerv-glow-spread`, `--nerv-glow-intensity`, `--nerv-scanline-opacity`, `--nerv-flicker-duration`, `--nerv-animation-speed`, `--nerv-border-width`)
    - `@media (prefers-contrast: more)`: override `--nerv-border-width` (increase) and `--nerv-glow-intensity` (reduce)
- Update: `src/nerv.scss` → `@forward 'tokens'`
- Run: `npm test` → color map token tests pass; `npm run lint` → passes

### Step 5: Implement _typography.scss (TDD green)

- Files: `src/_typography.scss`
- Changes:
    - `@font-face` for Shippori Mincho B1 (Google Fonts CDN, woff2)
    - `@font-face` for Barlow Condensed (Google Fonts CDN, woff2)
    - `@font-face` for IBM Plex Mono (Google Fonts CDN, woff2)
    - `@font-face` for DSEG7 Classic (jsDelivr CDN, woff2 + woff fallback)
    - `.nerv-type-display`: Shippori Mincho B1 font stack
    - `.nerv-type-hud`: Barlow Condensed, uppercase, letter-spacing
    - `.nerv-type-data`: IBM Plex Mono, tabular-nums
    - `.nerv-type-segment`: DSEG7 Classic font stack
    - `.nerv-type-mixed`: Composite font stack using unicode-range to pair Shippori Mincho B1 for CJK with Barlow Condensed for Latin
- Update: `src/nerv.scss` → add `@forward 'typography'`
- Run: `npm run build` → still compiles; `npm run lint` → passes

### Step 6: Implement _glow.scss (TDD green)

- Files: `src/_glow.scss`
- Changes:
    - `@use 'tokens'` to access `$nerv-colors` map
    - `@mixin nerv-glow($color-var, $color-rgb-var)`: generates multi-layer `box-shadow` at increasing blur radii with decreasing opacity
    - `@mixin nerv-glow-text($color-var, $color-rgb-var)`: generates text-shadow version (directional 1px offsets + blurred layer)
    - `@each` loop over `tokens.$nerv-colors` (filtered by glow-variant flag): auto-generates `.nerv-glow-{name}` and `.nerv-glow-text-{name}` classes
    - `.nerv-glow` as alias for `.nerv-glow-amber` (default)
    - `.nerv-glow-text` as alias for `.nerv-glow-text-amber` (default)
    - `.nerv-glow-drop`: `filter: drop-shadow()` utility for non-rectangular elements
    - `@media (prefers-contrast: more)`: reduce glow via a `--nerv-glow-intensity` multiplier token (initially reduces significantly; architecture supports tuning to zero later)
- Update: `src/nerv.scss` → add `@forward 'glow'`
- Run: `npm test` → color map glow tests pass; `npm run lint` → passes

### Step 7: Reference Page

- Files: `ref/ref-foundation.html`
- Changes:
    - HTML5 document linking `../dist/nerv.css`
    - Black void background (`--nerv-void`)
    - One instance of each `.nerv-type-*` class with sample text
    - Mixed JP/EN: `活動限界 ACTIVE TIME REMAINING`
    - Each color as glowing text label
    - One `.nerv-glow-text` per color
    - Ghost-segment seven-segment display (`00:03:25:08` with dimmed `88:88:88:88`)
    - No layout, no borders, no structure — floating text on void

### Step 8: Final Verification

- Run: `npm run build` (expanded) and `npm run build:min` (compressed)
- Run: `npm test` — full test suite (build smoke + color map verification)
- Run: `npm run lint` — Stylelint convention checks
- Visual inspection of `ref/ref-foundation.html` in browser

## Technology Validation

- **Dart Sass**: New dev dependency. Verify: `npm install` succeeds, `npx sass --version` returns version string, `npm run build` compiles SCSS to CSS.
- **Node.js built-in test runner**: Available in Node 22 (confirmed). No additional dependency needed.
- **Stylelint**: New dev dependency. Verify: `npx stylelint --version` returns version string, `npm run lint` runs against compiled output.
- **DSEG7 Classic font**: CDN URL verified at `https://cdn.jsdelivr.net/npm/@fontsource/dseg7-classic@5.2.5/files/dseg7-classic-latin-400-normal.woff2` (5.07 KB, woff2 format).
- **Google Fonts**: Shippori Mincho B1, Barlow Condensed, IBM Plex Mono available via `fonts.googleapis.com/css2` API. Direct woff2 URLs from fonts.gstatic.com will be extracted and baked into `_typography.scss`.

## Challenges & Mitigations

- **Google Fonts direct URLs**: fonts.gstatic.com URLs can change without notice. **Mitigation**: Document exact URLs used; consider migration to Fontsource (jsDelivr) for all 4 fonts in future if stability becomes an issue. URLs are concentrated in `_typography.scss` for easy replacement.
- **Mixed JP/EN text** (`.nerv-type-mixed`): Requires `unicode-range` in `@font-face` to separate CJK and Latin rendering. **Mitigation**: This is an established CSS technique. Will define a composite font family with separate `@font-face` rules for CJK vs Latin unicode ranges.
- **No prior test infrastructure**: Greenfield project has no tests. **Mitigation**: Build smoke test + Stylelint for convention enforcement + targeted color map verification. Reference pages are the primary visual tests. Avoids low-value CSS string matching.
- **SCSS @forward module resolution**: Dart Sass `@forward` requires specific syntax and load paths. **Mitigation**: Keep all partials in flat `src/` directory; use bare names (e.g., `@forward 'tokens'` resolves to `_tokens.scss`).
- **High-contrast glow reduction**: `systemPatterns.md` specifies "reduce reliance on glow/shadow" under `prefers-contrast`. **Mitigation**: Introduce `--nerv-glow-intensity` multiplier token in `_tokens.scss`, reduced under `prefers-contrast`. `_glow.scss` scales blur radii and opacities by this multiplier. Architecture supports tuning to zero later; initial value is a significant reduction, not elimination.

## Status

- [x] Component analysis complete
- [x] Open questions resolved (none identified)
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Preflight
- [x] Build
- [ ] QA
