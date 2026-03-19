---
task_id: nerv-m6-form-styling
date: 2026-03-18
complexity_level: 2
---

# Reflection: M6 — Web Form Styling

## Summary

Built 6 form element classes (`.nerv-input`, `.nerv-textarea`, `.nerv-select`, `.nerv-checkbox`, `.nerv-radio`, `.nerv-btn`) in a new `_form.scss` partial. All 17 test behaviors pass, lint clean, ref page created. Clean execution with two minor technical pivots during build, plus a post-QA rework fixing checkbox compound state and number input spinners.

## Requirements vs Outcome

All requirements delivered as planned. Six form elements, focus glow, placeholder styling, custom select arrow, checkbox/radio custom appearance, button with hover/focus/press states, prefers-contrast and prefers-reduced-motion support. No requirements dropped or added. Two post-QA fixes based on user visual review: hidden number input spinners and fixed checkbox checked+focus visual state.

## Plan Accuracy

Plan was accurate for file locations, naming, and 8-step sequence. Two surprises during build:

1. **`@extend` vs `@mixin`**: Plan didn't specify the SCSS sharing mechanism. `@extend` produced combined selectors (`.nerv-textarea, .nerv-input {`) that broke tests expecting individual blocks. Switched to `@mixin` immediately.
2. **Fragile list test**: Pre-existing test B7 used `lastIndexOf('prefers-contrast: more')` which found the new form block instead of the list one. Fixed with a regex pattern match.

One surprise during visual review:

3. **Checkbox checked+focus `box-shadow` collision**: The plan did not account for compound states where two pseudo-classes both set `box-shadow`. This is the same class of "last declaration wins" bug that emerged repeatedly in M5 (drop-shadow, source-order, background override). The plan should have explicitly audited every compound state (`checked+focus`, `checked+hover`, etc.) for property collisions.

## Build & QA Observations

Build was smooth — each TDD cycle passed in one iteration. The `@extend` → `@mixin` pivot and the `$bg` parameter (to avoid duplicate `background` lint error) were the only adjustments needed during implementation. QA caught one trivial DRY issue (three separate prefers-contrast groups → consolidated to one). Otherwise clean.

**Post-QA rework** (user feedback, 2 fixes):

1. **Number input spinners**: Browser-default increment/decrement arrows on `<input type="number">` rendered unstyled. Fixed with `::-webkit-inner-spin-button` / `::-webkit-outer-spin-button` pseudo-elements (`appearance: none`) and `appearance: textfield` for Firefox. Required disabling stylelint's `selector-attribute-quotes` rule because Dart Sass always strips quotes from attribute selectors when the value is a valid CSS identifier.

2. **Checkbox checked+focus state**: When a checkbox was both `:checked` and `:focus` (which happens immediately after clicking), the focus `box-shadow` (outer glow) completely replaced the checked `box-shadow` (inset gap), making the checkbox appear fully filled with no visible inner border. Fix: added `.nerv-checkbox:checked:focus` compound selector that combines both the inset gap and outer glow into a single `box-shadow` declaration.

   This is the **third time** across M5–M6 that "last shadow/filter declaration wins" has caused a visual bug:
   - M5: `filter: drop-shadow()` traces all painted content — it's a glow, not a border
   - M5: Source-order specificity — generic `background` from fill mode overrode shape-specific `background: transparent`
   - M6: `box-shadow` from `:focus` overwrote `box-shadow` from `:checked` — compound states need compound selectors

## Insights

### Technical
- **🔥 RECURRING: CSS rendering properties are replacement, not additive.** `box-shadow`, `filter`, `background`, `text-shadow` — when the same property is set by two different selectors at equal specificity, the later one completely replaces the earlier one. They do not merge. This has now caused bugs in three separate contexts across two milestones. **Any component with compound states (`:checked:focus`, `:hover:active`, `.modifier-a.modifier-b`) must have explicit compound selectors that manually combine all shadow/filter/background layers into a single declaration.** This is not optional — it must be an upfront design step, not a post-hoc fix. See also M5 reflection: source order, orthogonal modifier resets, drop-shadow-is-not-border.
- **Sass `@extend` produces combined selectors in compiled CSS** — tests that search for individual class blocks (e.g., `css.indexOf('.nerv-textarea {')`) will fail because the compiled output is `.nerv-textarea, .nerv-input {`. Use `@mixin` when components need individually identifiable CSS blocks.
- **SVG data URIs cannot reference CSS custom properties** — the select arrow chevron uses hardcoded amber. For non-critical decorative elements this is acceptable; for color-adaptive elements, `mask-image` with `background-color` would be needed.
- **Dart Sass strips quotes from attribute selectors** when the value is a valid CSS identifier (e.g., `[type="number"]` → `[type=number]`). This is unfixable in SCSS and conflicts with stylelint's `selector-attribute-quotes` rule. Disable the rule if attribute selectors are needed.

### Process
- **Positional CSS test methods are fragile**: `lastIndexOf` and `indexOf` break when new blocks shift positions. Prefer regex patterns that match structural content rather than positional lookup.
- **Plan for compound states explicitly.** When a component has interactive pseudo-classes (`:focus`, `:hover`, `:active`, `:checked`), the plan should enumerate all realistic compound states and audit which CSS properties each individual state sets. If two states both set `box-shadow`, a compound selector is needed. This should be a checklist item during the planning phase, not a discovery during visual review.

### Million-Dollar Question

If form styling had been foundational, the focus-glow and hover-tint patterns (currently duplicated between `_label-box.scss` and `_form.scss`) would live as reusable mixins in `_glow.scss`. The "component color override" pattern (`--nerv-{component}-color` / `--nerv-{component}-color-rgb`) would be a documented architectural pattern. However, the current independent-implementation approach is well-suited to a CSS design system where consumers pick components à la carte — tight coupling between label-box and form would make the dependency graph more fragile. The most elegant refinement would be extracting shared interaction mixins (`nerv-focus-ring`, `nerv-hover-tint`) into `_glow.scss`, but this is a refinement, not a redesign.

More critically: if "CSS properties are replacement, not additive" had been a foundational design assumption, every component would ship with a **compound-state matrix** — an explicit enumeration of all state combinations and the merged property values for each. The checkbox would have had `:checked:focus` from the start. The list would have had explicit resets at every shape×fill intersection from the start. This matrix would be a mandatory section in every component's planning phase.
