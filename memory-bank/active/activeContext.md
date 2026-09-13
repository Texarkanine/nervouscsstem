# Active Context

## Current Task: nerv-v01-m4-properdocs-dual-load-site
**Phase:** BUILD - IN-PROGRESS

## What Was Done

- Operator rejected standalone HTML; replanned M4 around Bootstrap-style embedded examples
- Creative: inline HTML islands plus `extra_css` / `extra_javascript` dual-load
- Preflight PASS WITH ADVISORY; job-scoped `pages: write` is in the plan
- Struck docs-content change-detector tests; resolver remains the TDD unit

## Next Step

- Execute `tasks.md` in order: resolver TDD, ProperDocs/Using pages, Pages CI, README/techContext
