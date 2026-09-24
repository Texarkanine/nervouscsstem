# Project Brief: Customizable `.nerv-select` (issue #3)

Source: [issue #3 "Custom dropdown with JS interaction layer"](https://github.com/Texarkanine/nervouscsstem/issues/3). Intent clarification was approved by the human operator before this run.

## Background

- The ticket and its spec (`planning/FUTURE.md` "Custom Dropdown", deleted in d35bff4) assumed the native `<select>` popup is OS-rendered and cannot be styled, so a `<div>`/`<ul>` replacement with a `NERV.initDropdowns()` JS layer was needed.
- The original motivation, the human's words from the phase-6 forms session: "can I have a dropdown for 'alert level' where each level is an appropriately-colored box, e.g. like how we do list boxes fills in ref-components.html?"
- Since then, customizable select (`appearance: base-select`, `::picker(select)`, `::picker-icon`, `::checkmark`, `<selectedcontent>`, `:open`) ships in Chrome/Edge 135+ and Safari 27. Firefox has a positive standards position and flagged work since 149, but `::picker(select)` styling is unfinished and there is no ship date.

## Approved Restatement

**Style the existing `<select>`. Let's see what we can do now that it's "supported."** Extend the existing `.nerv-select` (`src/_form.scss`) with customizable-select styling behind `@supports (appearance: base-select)`, so the OPEN picker gets full NERV treatment:

- **Picker:** panel-like container, glow, NERV typography.
- **Options:** hover, focus and selected states; checkmark and picker-icon styling.
- **Per-option color and shape:** colored boxes matching the `.nerv-list` fill and shape vocabulary. Showcase: the alert-level selector, one appropriately colored box per level.
- **Closed button:** mirrors the selected option's color via `<selectedcontent>` where supported.

**NO JavaScript.** No `NERV.initDropdowns()`, no JS fallback. Browsers without base-select (Firefox, LibreWolf) keep today's `.nerv-select` closed-box styling plus the OS popup; that fallback must not regress. A plain `<select class="nerv-select">` with plain `<option>`s must look good with zero markup changes. Richer markup (custom button, `<selectedcontent>`, per-option classes) is opt-in.

Picking an alert level does NOT change the page's alert state; that wiring is the consumer's.

## Constraints

- All selectors `.nerv-` scoped; no bare `select {}` rules.
- Alert-level option fills use named data colors; picker chrome follows `--nerv-primary` / the alert cascade. Replacement properties (box-shadow, background, filter) need explicit unions in compound states.
- Reduced motion suppresses open/close animation. High contrast: heavier borders, less glow.
- Do not reuse the abandoned rotated-list work.
- TDD with `test/*.test.mjs`; consumer-observable contracts only.
- Ref fixture: new section in `ref/ref-forms.html`.
- Docs: `docs/components/css/structure/forms.md` in today's island+fence form; say which browsers get the enhanced picker and what others see; never call `NERV.init()`.
- Browser proof: Playwright Chromium (enhanced) and Firefox (fallback no regression). Screenshots on the PR via orphan `pr-assets` branch.
