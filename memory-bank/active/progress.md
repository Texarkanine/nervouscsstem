# Progress: M5 — List Nesting Overhaul

Overhaul list nesting in `_list.scss` — fix contained sublists and indented non-contained sublists for all shape/rotation combinations including angled variants.

**Complexity:** Level 3

## History

- **2026-03-28**: Complexity analysis complete. Level 3 determined — deep overhaul of `_list.scss` spanning all shape/rotation/angle permutations, two distinct sub-problems (contained sublists, indented non-contained sublists), M8 depends on stabilized output.
- **2026-03-28**: Plan phase complete. 8 implementation steps, 20 new behaviors (B24–B43). Key decision: `--nerv-list-clip` custom property + `:has()` detection + `::before` shape delegation. No open questions or creative phase needed.
- **2026-03-28**: Preflight PASS. Convention-compliant (flat naming, `--nerv-list-*` pattern). No conflicts. Novel pattern: `--nerv-list-clip` holding full `polygon()` expr — valid CSS, first such pattern in codebase. Advisory: `--nerv-list-clip` doubles as a public API for custom shapes (document it).
- **2026-03-29**: Build PASS. All 8 implementation steps complete (clip-path refactor → nesting detection → contained mode → fill overrides → rotation counter-rotation → a11y → ref page → docs). 20 new behaviors (B24–B43) + 3 modified (B2, B15, B20). 161/161 tests pass. No deviations from plan. Browser smoke verified across all shape × fill × rotation × nesting combinations.
- **2026-03-29**: QA PASS. Two trivial DRY fixes: (1) merged duplicate rotation counter-rotation selectors into comma-separated rule, (2) removed redundant margin-left/top from contained rule (inherited from base nested rule). Updated B40/B41 tests for combined-selector format. 161/161 pass.
- **2026-03-29**: Reflect complete. Plan was highly accurate (8 steps, correct order, correct files). Key insight: `:has()` + `::before` shape delegation is a proven reusable pattern for M8 dropdown. `--nerv-list-clip` serves dual role as internal abstraction and public API.
- **2026-03-29**: Rework identified — two visual bugs: (1) indented-mode parent→first-child gap is ~2px vs ~5px inter-child gap, (2) rotated-nested-list indentation follows the rotation angle instead of being purely horizontal. Re-entering Plan phase.
- **2026-03-29**: Rework plan complete. 2 steps, 5 new tests (B44–B48), no new dependencies. Key technique: CSS `sin()` for trigonometric compensation of rotated layout offset.
- **2026-03-29**: Rework preflight PASS. Convention-compliant, specificity cascade verified, para+nesting interaction confirmed safe, CSS sin() passthrough validated.
- **2026-03-29**: Rework build PASS. 2/2 steps, 5 new tests (B44–B48). Bug 1: `calc(gap + 0.3em)` + contained override. Bug 2: `translateX` with `sin()` compensation + `margin-left: 0`. 357/357 tests pass. No deviations from plan.
- **2026-03-29**: Rework QA PASS. Clean — no semantic issues found across all 7 QA constraints.
- **2026-03-29**: Rework reflect complete. Zero-iteration build confirmed. CSS `sin()` passthrough pattern documented as reusable for M8.
- **2026-03-29**: Rework-2 build. Operator found two remaining issues: (1) last-child→next-parent spacing (fixed with `margin-bottom: -0.3em`), (2) rotated nesting unchanged because `--nerv-list-angle` resets to `0deg` on nested `.nerv-list` (fixed with `--_nerv-list-rotation` internal property). 358/358 tests pass. Browser-verified all modes.
