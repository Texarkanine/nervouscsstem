# Active Context

## Current Task
Cartouche Multi-Line Table Support (Rework)

## Phase
PLAN - COMPLETE

## What Was Done
- 5 new behaviors to verify (B1–B5), plus regression coverage from existing tests
- 8-step implementation plan: stub tests → stub CSS → implement tests → verify fail → implement CSS → implement JS → update ref page → full suite
- Files affected: `src/_cartouche.scss`, `src/nerv.js`, `ref/ref-foundation.html`, `test/components.test.mjs`
- No new dependencies or technology

## Key Decisions
- Table-mode tests use CSS string matching (same pattern as all existing component tests)
- JS DOM behavior not directly tested (no JSDOM infrastructure) — covered by visual verification on ref page
- Demo cartouches replicate 4 reference imagery patterns: 1×2 column, 4-row data panel, LIVE+JP source, LOCKED/OPEN states

## Next Step
Preflight validation runs automatically.
