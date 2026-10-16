# Active Context

## Current Task: issue-14-single-source-islands
**Phase:** REFLECT COMPLETE

Reflection: `memory-bank/active/reflection/reflection-issue-14-single-source-islands.md`. Persistent files reconciled (systemPatterns/techContext already updated in build; productContext skip). Operator archives after PR review and manual QA.

## What Was Done
- Preflight PASS WITH ADVISORY. Operator-delegated gate decisions on advisories:
    - Accept: general `__pycache__/` rule in `.gitignore` (replaces the `.summem`-only rule it subsumes).
    - Accept: creative doc cites pymdown-extensions 11.0.2.
    - Watch: `uv_build<0.9` pin; widen only if CI fails.
    - Decline: validating `init`/`state` values against `docs-init.js` / `dist/nerv.css`.
- Files created: `scripts/nervouscsstem_docs/{__init__,island_fence}.py`, `test/test_island_fence.py`.
- Files modified: `pyproject.toml`, `uv.lock` (one line), `properdocs.yml`, `.gitignore`, `docs/service-manual.md`, 29 pages under `docs/components/`, `memory-bank/{systemPatterns,techContext}.md`.
- Build-time decisions not in creative docs:
    - Function names `validator` / `formatter` (avoid shadowing builtin `format`).
    - Added guard: `init=` / `state=` without `island` raises (a forgotten `island` would otherwise fall to stock superfences, which rejects unknown attrs and renders nothing useful).
    - Formatter emits island and copy as one block, so the built HTML has no blank line between island `</div>` and the highlight `<div>` (inter-block whitespace; no rendering effect).
- Integration results:
    - Registering the fence before migration: built `site/` byte-identical to baseline.
    - Before/after comparison (51 HTML pages): 22 pages byte-identical; on the 29 migrated pages, Check A (baseline vs reorder-only: identical line multisets) and Check B (reorder-only vs single-source: equal after stripping leading indentation and the island→copy blank line; all 133 island tags and every highlight block byte-identical) pass.
    - Built site: 133 islands, none contain `<script>`, none execute `NERV.init()`.
    - `npm test` 373/373; formatter tests 13/13; strict docs build clean; clean-clone `uv sync --frozen` + strict build pass.
    - `npm run lint`: 10 errors in generated `dist/nerv.css`, pre-existing (no `src/` change on this branch).

## Next Step
- QA (subagent).
