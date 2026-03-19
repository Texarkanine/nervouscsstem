---
task_id: nerv-m6-form-styling
date: 2026-03-18
complexity_level: 2
---

# Reflection: M6 — Web Form Styling

## Summary

Built 6 form element classes (`.nerv-input`, `.nerv-textarea`, `.nerv-select`, `.nerv-checkbox`, `.nerv-radio`, `.nerv-btn`) in a new `_form.scss` partial. All 17 test behaviors pass, lint clean, ref page created. Clean execution with two minor technical pivots.

## Requirements vs Outcome

All requirements delivered as planned. Six form elements, focus glow, placeholder styling, custom select arrow, checkbox/radio custom appearance, button with hover/focus/press states, prefers-contrast and prefers-reduced-motion support. No requirements dropped or added.

## Plan Accuracy

Plan was accurate for file locations, naming, and 8-step sequence. Two surprises:

1. **`@extend` vs `@mixin`**: Plan didn't specify the SCSS sharing mechanism. `@extend` produced combined selectors (`.nerv-textarea, .nerv-input {`) that broke tests expecting individual blocks. Switched to `@mixin` immediately.
2. **Fragile list test**: Pre-existing test B7 used `lastIndexOf('prefers-contrast: more')` which found the new form block instead of the list one. Fixed with a regex pattern match.

Both were resolved in-line with no impact on the plan sequence.

## Build & QA Observations

Build was smooth — each TDD cycle passed in one iteration. The `@extend` → `@mixin` pivot and the `$bg` parameter (to avoid duplicate `background` lint error) were the only adjustments needed during implementation. QA caught one trivial DRY issue (three separate prefers-contrast groups → consolidated to one). Otherwise clean.

## Insights

### Technical
- **Sass `@extend` produces combined selectors in compiled CSS** — tests that search for individual class blocks (e.g., `css.indexOf('.nerv-textarea {')`) will fail because the compiled output is `.nerv-textarea, .nerv-input {`. Use `@mixin` when components need individually identifiable CSS blocks.
- **SVG data URIs cannot reference CSS custom properties** — the select arrow chevron uses hardcoded amber. For non-critical decorative elements this is acceptable; for color-adaptive elements, `mask-image` with `background-color` would be needed.

### Process
- **Positional CSS test methods are fragile**: `lastIndexOf` and `indexOf` break when new blocks shift positions. Prefer regex patterns that match structural content rather than positional lookup.

### Million-Dollar Question

If form styling had been foundational, the focus-glow and hover-tint patterns (currently duplicated between `_label-box.scss` and `_form.scss`) would live as reusable mixins in `_glow.scss`. The "component color override" pattern (`--nerv-{component}-color` / `--nerv-{component}-color-rgb`) would be a documented architectural pattern. However, the current independent-implementation approach is well-suited to a CSS design system where consumers pick components à la carte — tight coupling between label-box and form would make the dependency graph more fragile. The most elegant refinement would be extracting shared interaction mixins (`nerv-focus-ring`, `nerv-hover-tint`) into `_glow.scss`, but this is a refinement, not a redesign.
