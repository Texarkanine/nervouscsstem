# Active Context

## Current Task: Canonical usage guide
**Phase:** PREFLIGHT - COMPLETE (PASS WITH ADVISORY)

## What Was Done
- Operator rejected new tests for boards, nav, `not_in_nav`, and board/skill HTML contracts: visual prose and design-time config. ProperDocs HTML copy already probed.
- Plan rewritten as all prose/policy. No new test files. Do not delete `ref/` (operator will). Existing skill-contract and docs-assets suites stay as they are.
- Preflight re-run against the reworked plan: both prior blocking/fixable findings no longer apply (no new test files exist to omit or mislabel). New advisory found: `service-manual.md`'s links to the three visual-language files need updating in step 4 (self-caught by `docs:build --strict` if missed, so non-blocking).

## Next Step
- Operator: `/niko-build`. Folded the `service-manual.md` link-fix advisory into plan step 4.
