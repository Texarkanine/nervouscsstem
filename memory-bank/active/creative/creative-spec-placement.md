# UI/UX Decision: Spec Paragraph Placement

## Problem

103 of 133 examples read island → `**Spec:**` paragraph → fence. One fence now emits island and copy as one adjacent block, so the Spec paragraph cannot stay between them.

## Constraints

- Repo memory: catalog examples are "name then demo then code".
- No change to the Spec text itself (catalog content).

## Options Evaluated

- **A. Spec after the pair** (heading → demo → code → Spec).
- **B. Spec before the pair** (heading → Spec → demo → code).

## Analysis

- B puts prose between the name and the demo, breaking "name then demo then code".
- A keeps name → demo → code adjacent and the Spec reads as a note on the recipe just shown. The 30 examples that already have no Spec are unchanged in order.

## Decision

### Choice Pre-Mortem

- The operator may prefer Spec near the demo for visual QA: **unchecked, low blast radius** — it is a mechanical, scriptable move either way; flagged for manual visual QA in the PR.

**Selected**: A — move each Spec paragraph to directly after its fence.
**Rationale**: preserves the documented example order; the only layout change the single-source design forces.
**Tradeoff**: Spec is one block further from the demo.
