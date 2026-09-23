---
task_id: issue-14-single-source-islands
date: 2026-09-23
complexity_level: 3
---

# Reflection: Single-source catalog islands (issue #14)

## Summary

A `pymdownx.superfences` custom fence (`html` + `island`) now renders each catalog example's live island and its highlighted copy from one body at build time; all 133 pairs on 29 pages migrated. Built output is equivalent to the old islands by a scripted three-build comparison, and QA passed without findings.

## Requirements vs Outcome

All ten requirements and four acceptance criteria are met. One addition: `init=` / `state=` without `island` fails the build (a forgotten `island` would otherwise render as nothing useful). One forced layout change: 103 Spec paragraphs moved from between demo and code to after the code, because one fence emits both as one block. Nothing descoped. Python tests are documented but not in CI, per the "no new CI jobs" constraint.

## Plan Accuracy

The eight-step sequence ran in order with no reordering or added steps. The only surprise was in verification, not implementation: the old form rendered a blank line between island and code block (two markdown blocks) and the new form does not (one stashed block). The plan's normalization (leading indentation only) flagged every page; the fix was to also allow exactly one dropped blank line per island and assert that count, rather than loosen to "collapse all whitespace".

## Creative Phase Review

- Import path (editable `uv_build` install under `scripts/`): held exactly; the PoC predicted the one-line lock diff and the clean-clone `--frozen` build.
- Fence syntax (`html` gated on `island`): held; the stock-fallthrough and `SuperFencesException` semantics read from source matched behavior. Only friction was naming (`validator`/`formatter` to avoid shadowing `format`).
- Spec placement (after the code): mechanical and verified as a pure reorder; still the one thing a human should eyeball.
- `unittest` runner: zero friction; discovery ignored the `.mjs` files as expected.

## Build & QA Observations

Tests went red (12/13; the plain-fence guard passed trivially because superfences swallows a validator's non-`SuperFencesException` errors) and green on the first implementation. The migration was mechanical because PR #13 had already hand-synced every pair; the script's per-pair assertion never fired. QA found nothing to fix; its advisories were the CI-less Python tests, SumMem nap merge friction, and the unplanned guard.

## Cross-Phase Analysis

Doing the PoCs during Plan (cwd not on `sys.path`; validator fall-through; highlight parity) is why Build had no plan deficiencies: every premise the design rested on was already observed, not assumed. The survey script in classification (all 133 islands already equal to fence-minus-script) turned "migrate everything" from a risk into a mechanical step and fed directly into the migration script's assertion. Preflight's `__pycache__/` advisory was cheap and would otherwise have surfaced as untracked noise at commit time.

## Insights

### Technical
- Superfences validators: raising `SuperFencesException` aborts the build; any other exception is swallowed and the next fence is tried. A stub that raises `NotImplementedError` therefore looks like "not my fence", not like a failure.
- A custom fence's output is one stashed block, so the markdown blank line between two adjacent blocks disappears in HTML. Any before/after equivalence check across a "two blocks become one" refactor needs to account for that gap explicitly.
- `properdocs` (a console script) does not put the working directory on `sys.path`; `!!python/name:` needs an installed module.

### Process
- For refactors whose acceptance is "rendered output unchanged", building an intermediate variant that isolates the one intended change (here: reorder-only) splits the diff into two checks that are each strict, instead of one loose check.
