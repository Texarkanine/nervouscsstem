# Progress

Fix four PR #10 review findings: bar-meter copy-paste example, CDN handshake assertion, `docs:build` prefix, and PyPI-only `uv.lock` for the docs site.

**Complexity:** Level 2

## 2026-09-13 - COMPLEXITY-ANALYSIS - COMPLETE

* Work completed
    - Classified as Level 2: bug-fix / error correction affecting multiple components (docs + skill copy, docs-assets test, package.json script, uv.lock).
* Decisions made
    - Decision tree Q1 yes → Q1a no → Q1b yes → Level 2.
    - Task id `pr10-review-fixes`. Scope is the four judged fix-in-this-PR items only.
* Insights
    - PyTorch pins in `uv.lock` are lock-machine contamination, not a product dependency.

## 2026-09-13 - PLAN - COMPLETE

* Work completed
    - Wrote Level 2 plan in `tasks.md`: two executable units (docs-assets tests, PyPI relock) and two prose/policy units (`docs:build`, bar-meter fence).
* Decisions made
    - Do not TDD markdown wording or the `docs:build` script string.
    - Pin PyPI in `pyproject.toml` and isolate user uv config so this machine cannot re-contaminate the lock.
* Insights
    - Extra index lives in `~/.config/uv/uv.toml`, not in this repo.

## 2026-09-13 - PREFLIGHT - COMPLETE

* Work completed
    - Ran all seven default-preflight checks against the codebase; result `PASS WITH ADVISORY` (first line of `.preflight-status`).
    - Verified plan touchpoints exist and match reality: production already dispatches `nerv-docs:ready`, `docs-init.js` listens for it, user `uv.toml` carries the pytorch-cu126 index, `uv.lock` has 45 `download.pytorch.org` lines (lock test will be red as planned), bar-meter skill copy is currently byte-identical.
* Decisions made
    - No plan edits: TDD ordering already correct; no change-detectors scheduled; prose/policy units correctly owe no tests.
* Insights
    - Advisory: whitelist-style lock assertion (every uv.lock URL under PyPI hosts) would generalize the blacklist test; operator to evaluate at build time.

## 2026-09-13 - BUILD - COMPLETE

* Work completed
    - CDN handshake assertion and PyPI-host lock whitelist in `test/docs-assets.test.mjs`.
    - Relocked docs toolchain from PyPI only; `uv sync --group docs --frozen` succeeded; `npm run docs:build` succeeded.
    - `docs:build` now runs `npm run build` first.
    - Bar-meter copy-paste example uses a parent container; skill bar-meters.md matched.
    - `docs/reading.md` is not in the skill; copy-identity skips it. `SKILL.md` left as placeholder.
* Decisions made
    - Took the preflight whitelist advisory.
    - Isolated lock needs `--upgrade`; without it uv kept the CUDA pins.
    - Do not iterate placeholder skill prose.
* Insights
    - Extra index is `~/.config/uv/uv.toml`. Frozen sync uses lock URLs, so contamination is a lock-generation problem.
    - `npm run lint` still fails on generated `dist/nerv.css` (Antonio quotes, `0px`); predates this task.

## 2026-09-13 - QA - COMPLETE (PASS)

* Work completed
    - Reviewed the committed implementation against the Level 2 plan and all four acceptance criteria.
    - Confirmed `npm test` passes 370 tests; frozen docs sync and `npm run docs:build` succeed.
* Decisions made
    - Accepted the PyPI-host whitelist as a stronger version of the planned PyTorch-channel check.
* Insights
    - Advisory only: the `pyproject.toml` relock comment should include `--upgrade` when it is intended to repair an already contaminated lockfile; the committed lock is clean.
