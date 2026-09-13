# Project Brief

## User Story

As the maintainer of PR #10, I want the four judged review findings fixed so the docs site copy-paste, CDN handshake test, local docs build, and docs-toolchain lockfile are correct before merge.

## Use-Case(s)

### Use-Case 1

A reader copies the bar-meter HTML example and gets bars, because `initBarMeters` is called on a parent (or `document`), not the meter node.

### Use-Case 2

CI and a later editor cannot drop `nerv-docs:ready` from the CDN `nerv.js` stand-in without a failing test.

### Use-Case 3

`npm run docs:build` after a SCSS edit produces a site from a freshly built `dist/`, not a stale copy.

### Use-Case 4

`uv.lock` is exactly the ProperDocs / mkdocs-material toolchain from PyPI. Frozen `uv sync --group docs` does not depend on `download.pytorch.org`.

## Requirements

1. Fenced example in `docs/components/bar-meters.md` passes a parent or `document` into `NERV.initBarMeters`. Keep `skills/nerv/docs/components/bar-meters.md` identical.
2. `test/docs-assets.test.mjs` asserts the written CDN `nerv.js` stand-in dispatches `nerv-docs:ready`.
3. `package.json` `docs:build` is prefixed with `npm run build &&`.
4. Relock `uv.lock` from PyPI only, extra indexes unset. No CUDA / PyTorch wheel channel. Lock contains only what the docs site needs.

## Constraints

1. This repo does not use PyTorch. Do not add a torch extra-index to `pyproject.toml` to "explain" the old pins.
2. Do not relocate `docs/` or change the dual-load / Pages wiring except as required by these four fixes.
3. Skill markdown copy must stay identical to `docs/` for the files this task edits.

## Acceptance Criteria

1. Copy-paste of the bar-meter fence initializes bars.
2. CDN-mode tests fail if the stand-in omits `nerv-docs:ready`.
3. `docs:build` runs `npm run build` first.
4. `uv.lock` has no `download.pytorch.org` (or other non-PyPI) registry; `uv sync --group docs --frozen` and `uv run properdocs build --strict` still work after a local `npm run build`.
