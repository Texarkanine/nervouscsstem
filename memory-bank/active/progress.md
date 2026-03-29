# Progress: M5 — List Nesting Overhaul

Overhaul list nesting in `_list.scss` — fix contained sublists and indented non-contained sublists for all shape/rotation combinations including angled variants.

**Complexity:** Level 3

## History

- **2026-03-28**: Complexity analysis complete. Level 3 determined — deep overhaul of `_list.scss` spanning all shape/rotation/angle permutations, two distinct sub-problems (contained sublists, indented non-contained sublists), M8 depends on stabilized output.
- **2026-03-28**: Plan phase complete. 8 implementation steps, 20 new behaviors (B24–B43). Key decision: `--nerv-list-clip` custom property + `:has()` detection + `::before` shape delegation. No open questions or creative phase needed.
- **2026-03-28**: Preflight PASS. Convention-compliant (flat naming, `--nerv-list-*` pattern). No conflicts. Novel pattern: `--nerv-list-clip` holding full `polygon()` expr — valid CSS, first such pattern in codebase. Advisory: `--nerv-list-clip` doubles as a public API for custom shapes (document it).
- **2026-03-29**: Build PASS. All 8 implementation steps complete (clip-path refactor → nesting detection → contained mode → fill overrides → rotation counter-rotation → a11y → ref page → docs). 20 new behaviors (B24–B43) + 3 modified (B2, B15, B20). 161/161 tests pass. No deviations from plan. Browser smoke verified across all shape × fill × rotation × nesting combinations.
- **2026-03-29**: QA PASS. Two trivial DRY fixes: (1) merged duplicate rotation counter-rotation selectors into comma-separated rule, (2) removed redundant margin-left/top from contained rule (inherited from base nested rule). Updated B40/B41 tests for combined-selector format. 161/161 pass.
