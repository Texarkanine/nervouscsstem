---
task_id: pr10-review-fixes
complexity_level: 2
date: 2026-09-13
status: completed
---

# TASK ARCHIVE: pr10-review-fixes

## SUMMARY

Fixed four PR #10 review findings: bar-meter copy-paste example, CDN `nerv-docs:ready` assertion, `docs:build` prefix, and a PyPI-only docs `uv.lock`. This repo does not use PyTorch; CUDA-channel pins were lock-machine contamination. QA passed (370 tests).

## REQUIREMENTS

- Fenced bar-meter example must pass a parent (or `document`) into `NERV.initBarMeters`.
- CDN `nerv.js` stand-in must dispatch `nerv-docs:ready`; the test must fail if that event is dropped.
- `docs:build` must run `npm run build` first.
- `uv.lock` must be the ProperDocs / mkdocs-material toolchain from PyPI only.
- Do not iterate placeholder `SKILL.md`. `docs/reading.md` is research notes; skill copy-identity skips it.

## IMPLEMENTATION

- `test/docs-assets.test.mjs`: CDN stub asserts `nerv-docs:ready`; lock test requires every `url` / `registry` to be `pypi.org` or `files.pythonhosted.org`.
- Relock: `uv lock --no-config --default-index https://pypi.org/simple --upgrade`. Isolation without `--upgrade` kept the CUDA pins. `[[tool.uv.index]]` default PyPI in `pyproject.toml` is not enough by itself — user extra indexes still merge.
- `package.json` `docs:build` prefixed with `npm run build &&`.
- Bar-meter fence wraps the meter in `#bar-meters` and passes that parent. Skill copy of that file kept in lockstep. Did not copy `reading.md` into the skill.

## TESTING

TDD: handshake assertion was green immediately (production already dispatched). Lock assertion was red, then green after `--upgrade`. `/niko-qa` PASS. `npm test` 370/370. `uv sync --group docs --frozen` and `npm run docs:build` succeeded. `npm run lint` still fails on generated `dist/nerv.css` (Antonio quotes, `0px`); predates this task.

## LESSONS LEARNED

- User-level uv extra indexes (here: a non-`explicit` PyTorch CUDA channel) are searched before PyPI. Ordinary packages that exist on that channel (`certifi`, `requests`, `urllib3`, …) land in unrelated locks. Relock with `--no-config --upgrade`. Frozen sync then installs the lock URLs.
- `initBarMeters` uses `querySelectorAll` on descendants; passing the meter node itself is a no-op.
- Copy-identity on every `docs/**/*.md` will pull research notes (`reading.md`) into the skill. Do not treat that as a reason to rewrite placeholder `SKILL.md`.

## PROCESS IMPROVEMENTS

- When a lock is already contaminated, `--no-config` alone is a no-op; `--upgrade` is what re-resolves.
- Stockroom's own lock uses `--no-config` for hermeticity; that does not protect sibling repos. Filed Texarkanine/stockroom#130. Current stockroom HEAD does not appear to write the user-level extra index; the leak class is still real.

## TECHNICAL IMPROVEMENTS

Keep the torch index on the torch install command only. If a user-level `[[index]]` must exist, set `explicit = true`.

## NEXT STEPS

- Merge PR #10.
- Operator: GitHub Pages enable, first npm `0.0.1` bootstrap, trusted publisher (unchanged from the L4 pipeline).
- Stockroom#130: regenerate that root lock without the PyTorch registry.
