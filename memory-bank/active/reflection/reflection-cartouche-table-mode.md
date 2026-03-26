---
task_id: cartouche-table-mode
date: 2026-03-25
complexity_level: 2
---

# Reflection: Cartouche Multi-Line Table Support

## Summary

Extended the fixed cartouche component with table-mode support for multi-cell grid layouts. CSS + JS changes, 6 new tests, 6 demo cartouches on the ref page. All requirements met, QA caught one measurement bug fixed inline.

## Requirements vs Outcome

Every requirement from the rework brief was delivered: CSS table/td structural rules, JS per-cell scaling, broken example replaced, and all four reference imagery patterns (1×2 column, data panel, LIVE+JP, LOCKED/OPEN) reproduced as table-mode demos. One bonus demo (LIVE+PICTURE) added naturally.

## Plan Accuracy

The plan was accurate on file scope, step sequence, and CSS design. Two things it missed:

1. Preflight caught the `> *` transform bleeding onto `<table>` — correctly amended before build.
2. The plan described cell measurement as "extend the span-mode pattern to iterate `<td>` elements" which implied `scrollWidth`/`scrollHeight` would work. It doesn't — table cells redistribute surplus width, making `scrollWidth === clientWidth` when the cell is wider than its content.

## Build & QA Observations

Build was smooth: CSS rules dropped in cleanly, JS refactored into `measureSpan`/`measureTable` helpers without issue. The pre-existing lint error (`0.00em`) was a minor surprise.

QA caught the measurement bug — the most significant finding of the entire task. The fix (swap to `Range.getBoundingClientRect()`) was trivial, but the *understanding* of why `scrollWidth` fails in table context was non-obvious.

## Insights

### Technical

`scrollWidth`/`scrollHeight` can never be less than `clientWidth`/`clientHeight`. They measure the scrollable content area, which includes container padding/space. For measuring text content that may be smaller than its container (the normal case for text-stretching), `Range.getBoundingClientRect()` is the correct API — it measures the actual rendered content dimensions regardless of container size.

### Process

Nothing notable.

### Million-Dollar Question

If table mode had been assumed from the start, `initCartouches` would use `Range.getBoundingClientRect()` as a unified measurement strategy for ALL modes. The current split — `offsetWidth`/`offsetHeight` for span mode, Range for table mode — works but is an artifact of incremental development. A single `Range.selectNodeContents(target).getBoundingClientRect()` call works correctly in both contexts and would eliminate the two-path measurement logic.
