# Progress

Replace every hand-duplicated catalog island+fence pair with one `pymdownx.superfences` custom fence whose build-time formatter emits both the live `.nerv-docs-island` and the highlighted copyable fence; island chrome moves to fence options; formatter gets unit tests; service manual documents the contract.

**Complexity:** Level 3

## 2026-09-23 - COMPLEXITY-ANALYSIS - COMPLETE

* Work completed
    - Recorded operator-approved intent in `projectbrief.md`.
    - Surveyed 29 pages / 133 islands; all islands already match their fences minus `<script>`.
* Decisions made
    - Level 3: multi-component feature with design choices, not architectural.

## 2026-09-23 - PLAN - COMPLETE

* Work completed
    - Component analysis, test plan, 8-step implementation plan in `tasks.md`.
    - Four creative decisions (high confidence, PoC-backed) in `creative/`.
    - PoC: cwd module not importable by `properdocs`; editable `uv_build` install under `scripts/` works with `uv sync --frozen`; custom `html` fence gated on `island` leaves plain fences stock and reproduces stock highlight byte-for-byte.
* Decisions made (operator gates delegated; made within approved scope)
    - Import path: editable install of root docs project (`uv_build`, `module-root = "scripts"`, package `nervouscsstem_docs`).
    - Syntax: ```` ```html island init="…" state="…" ````; unknown/valueless/malformed options abort the build.
    - Spec paragraph moves after the fence (keeps "name then demo then code").
    - Python tests: stdlib `unittest`, not wired into CI.
* Insights
    - Superfences validators that raise `SuperFencesException` abort the build; other exceptions are swallowed and fall through.

## 2026-09-23 - PREFLIGHT - COMPLETE

* Result: `PASS WITH ADVISORY` (no plan edits).
* Advisories
    - Add `__pycache__/` to `.gitignore` (tests and the properdocs import create caches under `scripts/` and `test/`).
    - Creative evidence cites superfences 10.x; lock pins pymdown-extensions 11.0.2 (PoC ran on 11.0.2, so the conclusions hold).
    - `uv_build<0.9` pin may make a newer CI uv fetch an older backend; widen the bound if CI objects.
    - Radical: validate `init` / `state` values against `docs-init.js` kinds and `dist/nerv.css` state selectors at build time.
* Decisions made (operator-delegated): accept the first two, watch the third, decline the fourth (see `activeContext.md`).

## 2026-09-23 - BUILD - COMPLETE

* Work completed
    - Editable docs package (`uv_build`, `scripts/nervouscsstem_docs/`); lock diff one line.
    - `island_fence.validator` / `formatter` built test-first: 13 `unittest` cases red (12 failing) then green.
    - `html` custom fence registered in `properdocs.yml`; site byte-identical to baseline before migration.
    - 133 pairs on 29 pages migrated by a one-off script that asserted each island == fence minus `<script>`; 103 Spec paragraphs moved after the fence.
    - Service manual "Island fences" section; `systemPatterns.md` / `techContext.md` surgical edits; SumMem note.
* Verification
    - Site comparison over 51 pages: 22 byte-identical; 29 migrated pages pass Check A (pure reorder) and Check B (equal modulo leading indentation and the island→copy blank line; 133 island tags and all highlight blocks byte-identical).
    - `npm test` 373/373, formatter tests 13/13, strict docs build clean, clean-clone `uv sync --frozen` + strict build clean, 133 built islands script-free.
    - `npm run lint`: 10 pre-existing errors in generated `dist/nerv.css` (no `src/` change).
* Decisions made
    - Added guard: `init=` / `state=` without `island` fails the build.
    - Kept the missing blank line between island and copy (inter-block whitespace, no rendering effect) rather than padding output to match.
* Insights
    - The old form's only structural difference from single-source was whitespace; the hand-sync on PR #13 had already made every pair exact.

## 2026-09-23 - QA - COMPLETE

* Result: PASS (advisories only).
* Re-verified: formatter tests 13/13, `npm test` 373/373, strict docs build clean, 133 built islands, site comparison ALL CHECKS PASS.
* Advisories
    - Formatter tests are not in `npm test` or CI; consider adding them to the docs build job.
    - Commit 56caa5b includes an automatic SumMem nap of two pre-existing notes (possible merge friction with sibling branches).
    - Unplanned guard (`init=` / `state=` without `island` fails the build) is tested and documented.

## 2026-09-23 - REFLECT - COMPLETE

* Work completed
    - Reflection written; persistent files reconciled (no further edits needed).
* Insights
    - Superfences swallows non-`SuperFencesException` validator errors; a custom fence's output is one block, so inter-block blank lines vanish from HTML.
    - Isolating the one intended change in an intermediate build (reorder-only) kept both equivalence checks strict.
