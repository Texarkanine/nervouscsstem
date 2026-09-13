# Progress

Add a placeholder agent skill installable via `npx skills` that carries the documentation site. `SKILL.md` version matches the published package. Add only the `SKILL.md` extra-files entry. Do not relocate `docs/` or redesign the release workflow or the site. Scope is parent-brief requirements 13–14, acceptance criterion 6, and use-case 5.

**Complexity:** Level 2

## 2026-09-12 - COMPLEXITY-ANALYSIS - COMPLETE

* Work completed
    - Marked L4 milestone M4 complete and cleared its sub-run ephemerals
    - Classified first unchecked L4 milestone M5 as Level 2
    - Stubbed `tasks.md` for `nerv-v01-m5-installable-docs-skill`
    - Replaced this progress file (M4 history is stale for the sub-run)
* Decisions made
    - Decision tree: not a bug fix; adding a small enhancement; self-contained (placeholder skill plus one extra-files hook) → L2
    - Matches the L4 advisory estimate
    - Parent `projectbrief.md` retained; M5 maps to requirements 13–14, acceptance criterion 6, and use-case 5
* Insights
    - Invariants 1, 4, 5, and 9 are load-bearing: `docs/` remains the authoring source, release-please stays the only version bumper, M5 only extends extra-files, M4's site and dual-load contract are consumed not redesigned
    - Skill prose may be placeholder; the shippable contract is installability plus version lockstep with the published package
