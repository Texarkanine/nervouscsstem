# Progress

Write a feasibility note on offline font-and-JS bundles covering the licenses of every font the CSS currently loads.

**Complexity:** Level 2

## 2026-09-12 - COMPLEXITY-ANALYSIS - COMPLETE

* Work completed
    - Marked L4 milestone M2 complete and cleared its sub-run ephemerals
    - Classified first unchecked L4 milestone M3 as Level 2
    - Stubbed `tasks.md` for `nerv-v01-m3-offline-bundle-feasibility`
    - Replaced this progress file (L4 parent and M2 history are stale for the sub-run)
* Decisions made
    - Decision tree: not a bug fix; small self-contained enhancement (research plus one written note; no code ship) → L2
    - Matches the L4 advisory estimate
    - Parent `projectbrief.md` retained; M3 maps to requirement 7, acceptance criterion 7, and constraint 3
* Insights
    - Later milestones stay out of this sub-run: no ProperDocs site, skill, or release-please extra-files work
    - Invariant 3 is load-bearing: the note may recommend bundling; this milestone does not vendor font files or add an offline artifact

## 2026-09-12 - PLAN - COMPLETE

* Work completed
    - Wrote the M3 implementation plan in `tasks.md`: one prose/policy unit, output `planning/offline-bundle.md`
    - Mapped parent brief requirement 7, acceptance criterion 7, and constraint 3 onto that file
* Decisions made
    - Inventory from `src/_typography.scss` `@font-face` URLs, not the stale PHASE1 four-font table
    - Composite faces are aliases; `Noto Serif JP` is an unloaded fallback
    - No new tests; no CSS/JS/package/release-please edits
* Insights
    - Offline JS is already in the npm tarball; the open question is redistributing the CDN fonts under OFL next to AGPL `nerv.js`

## 2026-09-12 - PREFLIGHT - COMPLETE

* Work completed
    - Validated the M3 plan against `_typography.scss`, package metadata, `LICENSE`, and the established planning-file convention
    - Confirmed that `planning/offline-bundle.md` does not already exist and that no source or release configuration changes are in scope
* Decisions made
    - Preflight result: PASS WITH ADVISORY
    - No tests are required because the only deliverable is a prose/policy feasibility note, not executable product behavior
* Insights
    - A later shipping milestone should pair an offline bundle with a versioned font provenance manifest containing upstream source, license, copyright, and file hashes

## 2026-09-12 - BUILD - COMPLETE

* Work completed
    - Wrote `planning/offline-bundle.md` from the `_typography.scss` `@font-face` inventory and upstream OFL texts
    - Full suite 357/357; no new tests
* Decisions made
    - All six loaded families are OFL-1.1; reserved names only on Plex and DSEG; unmodified bundling may keep those names
    - Aggregate zip is legally OK if fonts stay OFL and JS stays AGPL; 0.1 still does not ship
    - Left pre-existing stylelint errors on `dist/nerv.css` alone
* Insights
    - Offline JS was never the gap; twenty-two CDN font URLs are
    - If a later milestone ships, take official OFL packages rather than `gstatic` subset hashes

## 2026-09-12 - QA - COMPLETE

* Work completed
    - Verified `planning/offline-bundle.md` against the plan, parent brief, and `src/_typography.scss`
    - Confirmed no scope creep via `git diff --stat` since the pre-build checkpoint
    - Re-ran full suite (357/357) and lint (same pre-existing 7 errors)
* Decisions made
    - QA result: PASS, no findings requiring rework
* Insights
    - All six pre-mortem risks (vendoring, stale PHASE1 table, wrong file location, change-detector tests, Noto Serif JP miscount, `_typography.scss` edits) were each independently avoided in Build

