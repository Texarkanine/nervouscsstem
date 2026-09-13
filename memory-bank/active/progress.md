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
