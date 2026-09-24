# UI/UX Decision: Per-option Color/Shape API and Closed-button Mirroring

## User & Context

Consumers are developers reskinning existing UIs (e.g. Pi-hole) or building NERV dashboards. Two use cases:

1. Plain `<select class="nerv-select">` with plain `<option>`s, with no markup changes. The picker must look NERV by default.
2. The human's alert-level selector: one colored box per level, using the `.nerv-list` fill and shape look. When closed, the button shows the chosen level's color.

## Design System

`memory-bank/systemPatterns.md` and `techContext.md` "Design System": `.nerv-` prefix, data colors vs ambiance, replacement properties, reduced-motion and contrast rules. The `.nerv-list` vocabulary is in `src/_list.scss`: shapes hex (default) / rect / arrow / arrow-reverse / para; fills default translucent / bordered / outline / solid; colors come from glow-flagged tokens.

## Options Evaluated

- **A. Option color classes plus select-level shape and fill modifiers.** `<option class="nerv-option-red">` sets `--nerv-option-color` / `-rgb` and gives the option a translucent fill box. `.nerv-select-hex`, `-arrow`, `-arrow-reverse` and `.nerv-select-solid` on the `<select>` change every option's shape or fill. Rect is the default, because a picker is a vertical menu and rect keeps focus outlines visible.
- **B. Reuse `.nerv-list-*` classes directly on the select and options.** `.nerv-list-red` sets `--nerv-list-color` on a container, and the list shape rules target `> li`. Reusing them means extra selectors per class plus confusing semantics (a select is not a list).
- **C. Custom properties only.** `style="--nerv-option-color:…"`. This needs an RGB pair, is hard to discover, and gives no shape vocabulary.
- **D. Alert-level aliases** (`.nerv-option-nominal` … `-critical`) on top of A.

## Analysis

| Criterion | A | B | C | D (on A) |
|---|---|---|---|---|
| Usability | one class per option, one per select | familiar names, wrong targets | verbose | nice for the showcase |
| Clarity | mirrors list vocabulary with a select prefix | ambiguous | opaque | couples data colors to state names |
| Accessibility | rect default keeps focus visible; contrast drops clip-path | same as A | same | same |
| Consistency | same color set and shape names as lists | literally the same classes | none | new naming axis |
| Feasibility | Sass `@each` over glow tokens, same as `.nerv-form-*` | selector bloat | trivial | trivial |
| Simplicity | small | medium | smallest markup API, worst ergonomics | extra surface |

Key insights:

- The alert-cascade state classes change ambiance (`--nerv-primary`). An option's fill is data, so it must use named data tokens. Aliases would blur that line and bind the library to one level-to-color mapping. The consumer writes `nerv-option-green` for "nominal", and the docs show the mapping.
- `clip-path` clips outlines and box-shadows. Hex and arrow shapes must show focus through fill intensity. High contrast removes `clip-path`, so outlines render.
- Closed-button mirroring: the spike showed `<selectedcontent>` clones the option's children only, so the option class never reaches the button. `.nerv-select:has(option[class*="nerv-option-"]:checked)` cannot extract a color generically. One `:has()` rule per color is generated in the same `@each` as the option class. It works with plain markup; no `<selectedcontent>` is needed.

## Decision

**Selected**: A, without D.
**Rationale**: Smallest API that reads like `.nerv-list` and `.nerv-form-*`, keeps data colors stable, and needs zero markup for the plain case.
**Tradeoff**: No para shape (skewX on an option would need a pseudo-element, as in lists; it is not worth it for a menu). No bordered/outline fill modes (translucent default plus solid covers the showcase). No level aliases.

## Implementation Notes

- All base-select rules sit inside one `@supports (appearance: base-select)` block in `src/_form.scss`, section "3b". The fallback `.nerv-select` rules stay byte-identical.
- `.nerv-select, .nerv-select::picker(select) { appearance: base-select; }`. In base-select mode the SVG arrow `background-image` is replaced with a `::picker-icon` triangle drawn in `currentColor`, so under the alert cascade the arrow follows `--nerv-form-color`. The fallback arrow is hardcoded amber, and that stays as is.
- Picker: `--nerv-bg` background, form-color border, panel glow (box-shadow), HUD typography inherited, small gap below the button.
- Option states: `:hover` and `:focus-visible` get a translucent form-color fill. `:checked` gets a `::checkmark` "▶" in the option color. Colored options: translucent fill at rest, stronger fill on hover/focus. Solid: opaque fill, bg-colored text.
- Mirroring: `.nerv-select:has(option.nerv-option-{c}:checked) { --nerv-form-color: var(--nerv-{c}); --nerv-form-color-rgb: … }`. Because `::picker(select)` inherits from the select, the picker chrome also takes the selected level's color. That is acceptable: it is the consumer's opt-in color, not the alert cascade.
- `<selectedcontent>` / custom `<button>`: styled to inherit font and color, so rich option content shows in the closed box. Documented as opt-in.
- Motion: picker fades and slides in with `@starting-style` and `transition-behavior: allow-discrete`; the picker icon rotates on `:open`. Reduced motion sets both transitions to none.
- High contrast: thicker picker border, no picker glow, options get `clip-path: none`, focus uses an outline.
