# Phase 1: Foundation Layer

> Project scaffolding, design tokens, typography system, and phosphor bloom glow effects.
> Verified by: `ref/ref-foundation.html`

---

## Scope

This phase delivers the project's build infrastructure and the absolute bedrock of the design system: the SCSS module structure, the CSS custom properties that every other module depends on, the font loading and typography classes, and the phosphor bloom glow effects. Every subsequent phase builds directly on these outputs.

---

## Deliverables

### Project Scaffolding

| File | Description |
|------|-------------|
| `package.json` | Project metadata, Dart Sass as dev dependency, `build` and `watch` npm scripts |
| `.gitignore` | Ignores `node_modules/`, `dist/` |
| `src/nerv.scss` | Main SCSS entry point — `@forward`s all module partials in dependency order |

**Build commands** (defined in `package.json`):

- `npm run build` — `sass src/nerv.scss dist/nerv.css` (expanded, no source map)
- `npm run build:min` — `sass src/nerv.scss dist/nerv.min.css --style=compressed`
- `npm run watch` — `sass --watch src/nerv.scss dist/nerv.css`

**Directory structure** created by this phase:

```
nervouscsstem/
├── src/                # SCSS source partials
│   ├── nerv.scss       # Entry point (@forward all partials)
│   ├── _tokens.scss
│   ├── _typography.scss
│   └── _glow.scss
├── ref/                # Reference HTML pages (test fixtures)
│   └── ref-foundation.html
├── fonts/              # Self-hosted font files (DSEG7)
├── dist/               # Build output (git-ignored)
│   └── nerv.css
├── planning/           # (already exists)
└── memory-bank/        # (already exists)
```

### SCSS Modules

#### `_tokens.scss`

All design tokens as CSS custom properties on `:root`. This is the single source of truth for every color, timing value, and spatial constant in the system.

**Color tokens** (from VISION.md §2.1.1):

| Token | Value | Role |
|-------|-------|------|
| `--nerv-void` | `#000000` | Background — always true black |
| `--nerv-amber` | `#ffaa00` | Primary UI text, borders, labels |
| `--nerv-amber-dark` | `#f06800` | Darker amber for depth variation |
| `--nerv-orange` | `#ff9830` | Headers, institutional labels |
| `--nerv-red` | `#ff2233` | Alerts, danger, critical states |
| `--nerv-red-deep` | `#a00010` | Dark red (inactive/background alerts) |
| `--nerv-green` | `#50ff50` | Nominal data, system OK, registration marks |
| `--nerv-cyan` | `#20f0ff` | Wireframes, structural lines, grid lines |
| `--nerv-blue` | `#4488ff` | Data bars (Mental Toxicity Level spectrum) |
| `--nerv-steel` | `#e0e0d8` | Secondary text, annotations |

**RGB-decomposed versions** for alpha manipulation in `rgba()`:

Each color token also gets a `-rgb` companion (e.g., `--nerv-amber-rgb: 255, 170, 0`) enabling `rgba(var(--nerv-amber-rgb), 0.5)` usage throughout the system.

**Meta-tokens** (overridden by Phase 6's alert state system — define defaults here):

- `--nerv-primary` — "current primary color," defaults to `var(--nerv-amber)`. Ambiance-driven elements (panel borders, glow, status indicators) should reference this token instead of a specific named color. Data-driven elements (hex cell states, bar meter fill colors) should reference specific named tokens directly. Phase 6's `_states.scss` overrides `--nerv-primary` per escalation state.
- `--nerv-bg` — "current background color," defaults to `var(--nerv-void)`.

**Additional tokens:**

- `--nerv-glow-spread` — default glow blur radius
- `--nerv-scanline-opacity` — scanline overlay intensity
- `--nerv-flicker-duration` — base flicker cycle time
- `--nerv-animation-speed` — multiplier for animation durations (defaults to `1`; Phase 6 alert cascade scales this)
- `--nerv-border-width` — base border thickness (responds to `prefers-contrast`)

**SCSS variables** (compile-time, for use in mixins/calculations — not emitted to CSS):

SCSS `$variables` may be used internally for values that don't need runtime dynamism (e.g., font file paths, breakpoint calculations). CSS custom properties are used for everything a consumer or the alert cascade system might need to override at runtime.

#### `_typography.scss`

Font loading and typography utility classes.

**Font stack (finalized):**

| Role | Font Family | Source | License |
|------|-------------|--------|---------|
| Display / institutional | Shippori Mincho B1 | Google Fonts CDN | OFL |
| HUD labels | Barlow Condensed | Google Fonts CDN | OFL |
| Data / monospace | IBM Plex Mono | Google Fonts CDN | OFL |
| Seven-segment digits | DSEG7 Classic | jsDelivr CDN (`@fontsource/dseg7`) | OFL |

**Font loading strategy:**

- Default: CDN `@font-face` URLs baked into the compiled CSS (Google Fonts for 3 families, jsDelivr for DSEG7). Zero-config for consumers.
- Self-hosted override: planned as a future capability — consumers will be able to override font URLs via CSS custom properties or by replacing the `@font-face` block.

**Utility classes:**

| Class | Font | Properties |
|-------|------|------------|
| `.nerv-type-display` | Shippori Mincho B1 | Large size, for JP + EN institutional text |
| `.nerv-type-hud` | Barlow Condensed | `text-transform: uppercase`, `letter-spacing: 0.1em` |
| `.nerv-type-data` | IBM Plex Mono | `font-variant-numeric: tabular-nums` |
| `.nerv-type-segment` | DSEG7 Classic | For countdown timers and numeric readouts |
| `.nerv-type-mixed` | — | Container handling mixed JP/EN inline text correctly |

#### `_glow.scss`

Phosphor bloom effects — the single most important atmospheric effect. Bright elements bleed light into adjacent black space, simulating CRT phosphor persistence.

**Classes:**

| Class | Technique | Description |
|-------|-----------|-------------|
| `.nerv-glow` | `box-shadow` stacking | Default amber glow — multiple shadows at increasing blur radii with decreasing opacity |
| `.nerv-glow-red` | `box-shadow` stacking | Red/alert variant |
| `.nerv-glow-green` | `box-shadow` stacking | Green/nominal variant |
| `.nerv-glow-cyan` | `box-shadow` stacking | Cyan/structural variant |
| `.nerv-glow-text` | `text-shadow` | Text-specific glow — directional 1px "fat stroke" offsets + blurred layer |

**SCSS mixin opportunity:**

The glow shadow stack pattern (`0 0 2px $color, 0 0 8px rgba($color, 0.5), 0 0 20px rgba($color, 0.25)`) is repeated for every color variant. A `@mixin nerv-glow($color)` can generate both the `box-shadow` and `text-shadow` versions, reducing duplication and making future color additions trivial.

A `filter: drop-shadow()` utility may also be provided for non-rectangular elements (hex cells, clipped panels). `drop-shadow` follows actual rendered shape, unlike `box-shadow` which follows the bounding box.

### Reference Page

#### `ref/ref-foundation.html`

Contents (from VISION.md §3, Page 1):

- Black viewport (`--nerv-void` / `#000000` background), no structural elements
- One instance of each `.nerv-type-*` class with sample text
- Mixed JP/EN text sample: `活動限界 ACTIVE TIME REMAINING`
- Each color token rendered as a glowing text label: "NERV ORANGE", "ALERT RED", "DATA GREEN", "WIRE CYAN", "STEEL"
- One `.nerv-glow-text` element per color
- Ghost-segment seven-segment display showing a static time value (e.g., `00:03:25:08`) with dimmed background digits (`88:88:88:88` in very low opacity behind)
- **No layout, no borders, no structure** — just floating text on void

The HTML `<link>` tag references `../dist/nerv.css` (the compiled output).

---

## Dependencies

None. This is the first phase. All subsequent phases depend on this one.

---

## Verification Criteria

1. **Build succeeds**: `npm run build` compiles `src/nerv.scss` → `dist/nerv.css` without errors
2. **Black void**: `ref-foundation.html` renders on true black (`#000000`) background
3. **Fonts load**: All four font families load successfully (verify via browser DevTools Network tab — 4 distinct font requests, all 200 OK)
4. **Typography classes**: Each `.nerv-type-*` class renders in the correct font family with correct CSS properties (`text-transform`, `letter-spacing`, `font-variant-numeric`)
5. **Mixed text**: `活動限界 ACTIVE TIME REMAINING` renders with correct font pairing — Shippori Mincho B1 for JP characters, appropriate sans/mono for EN
6. **Color tokens**: All 10 color tokens are visually distinguishable and match their specified hex values
7. **Glow effects**: Phosphor bloom is visible around glowing text — multi-layer shadow creates soft light bleeding into the surrounding void
8. **Seven-segment**: DSEG7 font renders with dimmed ghost segments visible behind active digits
9. **Accessibility — `prefers-reduced-motion`**: Glow still renders (it is not an animation), fonts still load. Page is fully usable.
10. **Accessibility — `prefers-contrast`**: Text remains readable; glow does not obscure content. `--nerv-border-width` increases.

---

## Open Questions

All foundational design decisions have been resolved:

| Decision | Resolution |
|----------|------------|
| Build tooling | SCSS (Dart Sass) — modular partials compiled to single CSS output |
| CSS loading | `@forward` chain in `nerv.scss`; consumers get a single `nerv.css` file |
| HUD font | Barlow Condensed |
| Monospace font | IBM Plex Mono |
| Font loading | CDN URLs baked in (Google Fonts + jsDelivr); self-hosted override planned for later |
| Directory structure | `src/`, `ref/`, `dist/`, `fonts/`, `planning/`, `memory-bank/` |

No unresolved questions remain for this phase.
