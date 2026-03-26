---
task_id: cartouche-table-mode
date: 2026-03-25
complexity_level: 2
---

# Reflection: Cartouche Multi-Line Table Support

## Summary

Extended the fixed cartouche with table-mode multi-cell support. CSS structural rules, JS per-cell scaling via Range API, 6 demos, 6 new tests. All requirements met. Three significant issues surfaced across the workflow — none caught by automated tests, all caught by later phases or visual inspection.

## Requirements vs Outcome

Every requirement delivered: CSS table/td rules, JS per-cell scaling, broken example replaced, all four reference imagery patterns reproduced. One bonus demo (LIVE+PICTURE) added. The post-reflect `transform-origin` fix was a rendering correctness issue, not a missing requirement.

## Plan Accuracy

The plan's file scope and step sequence were correct. Three things it got wrong:

1. **Preflight caught**: `> *` transform bleeds onto `<table>` — amended with `transform: none`.
2. **QA caught**: `scrollWidth`/`scrollHeight` can't measure text smaller than its container — fixed with `Range.getBoundingClientRect()`.
3. **Visual inspection caught (post-reflect)**: `transform-origin: center` is wrong for left-aligned table cell content — fixed with `left center`. The preflight phase actually made this worse by explicitly codifying `center` as a finding.

## Build & QA Observations

Build was clean. QA caught the measurement API bug — the most architecturally significant finding. But the most visually impactful bug (`transform-origin`) survived all automated phases: tests, lint, build, and QA. It was immediately obvious in the first screenshot.

## Insights

### Technical

1. `scrollWidth`/`scrollHeight` can never be less than `clientWidth`/`clientHeight`. For measuring text that may be smaller than its container, `Range.getBoundingClientRect()` is the correct API.

2. `transform-origin` must match content alignment. Span mode's `center` origin works because `inline-flex + justify-content: center` positions the text at the element's center. Table cells left-align text by default — scaling from `center` pushes the left half outside the element boundary, where `overflow: hidden` clips it. The fix is `left center`.

### Process

Automated CSS-string tests verify property *presence*, not rendering *correctness*. The ref page is the actual QA surface for visual components — it must be visually inspected, not just built. This task's three bugs were caught by three different mechanisms (preflight code review, QA semantic review, human screenshot), none by automated tests.

### Million-Dollar Question

When porting CSS from one layout context to another, every property needs a "context audit" against the new context's defaults. A checklist: Does the `transform-origin` match where content is positioned? Does the `overflow` model differ? Does the parent's `display` type change child behavior? In this case, a single question — "where does text start in a table cell vs. a flex child?" — would have prevented the `transform-origin` bug at plan time.

The unified Range measurement insight from the prior reflect still holds: `Range.selectNodeContents(target).getBoundingClientRect()` works in both span and table contexts, eliminating the two-path measurement logic.
