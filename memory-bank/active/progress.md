# Progress

Extend `.nerv-select` with CSS customizable-select styling behind `@supports (appearance: base-select)`: NERV picker, option states, per-option colored boxes with `.nerv-list` shapes, closed-button color mirroring. No JS. Firefox fallback unchanged. Tests, ref fixture section, docs, browser proof.

**Complexity:** Level 3

## 2026-09-23 - COMPLEXITY-ANALYSIS - COMPLETE

* Work completed
    - Recorded approved restatement in `projectbrief.md`
    - Spiked customizable select in Playwright Chromium 153 and Firefox 155
* Decisions made
    - Level 3: multi-artifact enhancement with open design questions
* Insights
    - Chromium: `CSS.supports('appearance: base-select')` true; picker, `::checkmark`, `::picker-icon`, `:open` all style. Firefox 155: false.
    - `<selectedcontent>` clones the option's children, not the option element, so option classes do not reach the button. `.nerv-select:has(option.X:checked)` mirrors color with or without `<selectedcontent>`.
