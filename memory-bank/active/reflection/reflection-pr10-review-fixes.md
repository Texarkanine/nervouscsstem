---
task_id: pr10-review-fixes
date: 2026-09-13
complexity_level: 2
---

# Reflection: pr10-review-fixes

## Summary

Four PR #10 review findings are fixed: bar-meter copy-paste, CDN handshake assertion, `docs:build` prefix, and a PyPI-only docs lock. QA passed (370 tests).

## Requirements vs Outcome

All four accepted findings landed. Added a PyPI-host whitelist (preflight advisory) instead of a pytorch.org blacklist. Did not copy `docs/reading.md` into the skill; copy-identity skips it. Did not edit placeholder `SKILL.md`.

## Plan Accuracy

File list and TDD order were right. Isolated `uv lock --no-config` without `--upgrade` kept the CUDA pins — the plan named isolation, not the upgrade flag. User extra indexes merge; pinning `[[tool.uv.index]]` default PyPI is not enough by itself.

## Build & QA Observations

Handshake test was green on first run (production already dispatched). Lock test went red, then green after `--upgrade`. Copying `reading.md` into the skill to satisfy copy-all-docs was the wrong fix; operator corrected: leave skill prose alone, drop that copy. QA advisory: relock comment should mention `--upgrade`.

## Insights

### Technical
- User-level `~/.config/uv/uv.toml` extra indexes merge into `uv lock`. Frozen sync then installs those URLs. Relock with `--no-config --upgrade` against PyPI.
- `initBarMeters` uses `querySelectorAll` on descendants; passing the meter node itself is a no-op.

### Process
- Copy-identity on `docs/**/*.md` will pull in research notes added to `docs/` (here: `reading.md`). Do not treat that as a reason to iterate placeholder `SKILL.md`.
- Nothing else notable.

### Million-Dollar Question

A docs-only uv project that cannot see user extra indexes, with the lock test as the backstop. What we shipped is that, plus a comment. Elegant enough.
