---
task_id: issue-3-custom-select
date: 2026-09-23
complexity_level: 3
---

# Reflection: Customizable `.nerv-select` (issue #3)

## Summary

Replaced the ticket's JS dropdown with CSS customizable select. `.nerv-select` now gets a NERV picker, option states, per-option data-color boxes and list shapes where `appearance: base-select` exists. The fallback is byte-identical, and color mirroring works even in Firefox. It succeeded: 384/384 tests, and browser proof in Chromium and Firefox.

## Requirements vs Outcome

Every requirement in the brief was delivered. One was reinterpreted: "closed button mirrors via `<selectedcontent>`". `<selectedcontent>` cannot carry the option's class, so `:has()` does the mirroring and `<selectedcontent>` only carries content. Added beyond the plan: Firefox gets mirroring too (preflight advisory), and dark option ink is lifted for legibility.

## Plan Accuracy

The sequence and file list held. The surprises came from the browser, not the plan: the UA stylesheet's rounded corners, the picker flipping upward near the viewport edge (a screenshot artifact), and red-deep illegibility. The planned risks (stylelint and Sass rejecting new pseudo-elements, `@starting-style` misbehaving) did not materialize; the only lint hit was `currentColor` case.

## Creative Phase Review

The class API (`.nerv-option-{color}` plus select-level shapes) held without friction. The spike before planning is why: the `<selectedcontent>` limitation was known before the creative doc, so mirroring was designed correctly first time. The one friction point was specificity. `option[class*=…]` outranks single-class modifiers, which forced the doubled `.nerv-select.nerv-select-solid`, and QA found the same collision on `:checked`.

## Build & QA Observations

TDD was smooth: 8 red, then green on the first full SCSS pass, apart from the solid-specificity fix caught by reading the selectors. The visual problems (radius, legibility) were found only by looking at screenshots; no string test would have caught them. QA's one real finding was another instance of the same attribute-selector specificity.

## Cross-Phase Analysis

Spiking in the complexity phase meant plan and creative started from facts, which removed the riskiest open question. Preflight's advisory changed the design for the better (Firefox mirroring), because the plan had stated its "everything in one block" invariant explicitly enough to be challenged. The attribute-selector choice in build caused both the solid bug and the QA finding. One chain, two symptoms.

## Insights

### Technical
- `appearance: base-select` brings UA styling (rounded corners, spacing) that a design system must reset explicitly. Check the rendered result, not just the computed `appearance`.
- `option[class*='prefix-']` is a convenient "any colored option" hook, but it carries (0,2,1) specificity; every later state or modifier rule must match or beat it.

### Process
- For platform-feature work, a 10-minute browser spike before planning is worth more than any amount of doc reading; it turned the ticket's key premise (`<selectedcontent>` mirroring) into a known limitation before design began.
