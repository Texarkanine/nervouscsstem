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
