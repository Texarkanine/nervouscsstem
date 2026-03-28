# Progress: M5 — List Nesting Overhaul

Overhaul list nesting in `_list.scss` — fix contained sublists and indented non-contained sublists for all shape/rotation combinations including angled variants.

**Complexity:** Level 3

## History

- **2026-03-28**: Complexity analysis complete. Level 3 determined — deep overhaul of `_list.scss` spanning all shape/rotation/angle permutations, two distinct sub-problems (contained sublists, indented non-contained sublists), M8 depends on stabilized output.
- **2026-03-28**: Plan phase complete. 8 implementation steps, 20 new behaviors (B24–B43). Key decision: `--nerv-list-clip` custom property + `:has()` detection + `::before` shape delegation. No open questions or creative phase needed.
- **2026-03-28**: Preflight PASS. Convention-compliant (flat naming, `--nerv-list-*` pattern). No conflicts. Novel pattern: `--nerv-list-clip` holding full `polygon()` expr — valid CSS, first such pattern in codebase. Advisory: `--nerv-list-clip` doubles as a public API for custom shapes (document it).
