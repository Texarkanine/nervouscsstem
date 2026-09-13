# Task: pr10-review-fixes

* Task ID: pr10-review-fixes
* Complexity: Level 2
* Type: bug fix

Four PR #10 review findings: bar-meter copy-paste example, CDN `nerv-docs:ready` assertion, `docs:build` prefix, PyPI-only docs `uv.lock`.

## Test Plan (TDD)

### Behaviors to Verify

- CDN handshake: `resolveDocsAssets({ mode: 'cdn' })` writes `docs/javascripts/nerv.js` that contains `nerv-docs:ready` → Pages `docs-init.js` can hear the stand-in.
- Docs lock: repo `uv.lock` text does not contain `download.pytorch.org` → frozen docs CI cannot depend on the CUDA wheel channel.
- Edge: CDN stub still includes the versioned jsDelivr URL (existing assertion stays).
- Edge: skill markdown copy of `docs/components/bar-meters.md` stays byte-identical (existing `test/skill-contract.test.mjs`).

No tests for the `docs:build` script string or the bar-meter markdown fence (prose/policy / config). Do not add change-detectors on those files' wording.

### Test Infrastructure

- Framework: Node.js `node:test` + `node:assert/strict`
- Test location: `test/`
- Conventions: `test/<area>.test.mjs`; `package.json` `test` script lists files explicitly
- New test files: none (add cases to `test/docs-assets.test.mjs`)

## Implementation Plan

### 1. Docs-assets tests — executable

- Files: `test/docs-assets.test.mjs`

1. Stub tests: in `writes a stub that loads the versioned jsDelivr nerv.js`, add an empty extra assertion for the handshake; add empty `it('does not pin wheels from download.pytorch.org')` under a `docs toolchain lock` describe.
2. Stub interface: none. `resolveDocsAssets` and `uv.lock` already exist.
3. Write tests and run red: assert CDN `nerv.js` includes `nerv-docs:ready`; assert `readFileSync` of repo `uv.lock` does not include `download.pytorch.org`. Handshake may already be green (production dispatches today). Lock assertion must be red on the current lock.
4. Write code and run green: production handshake already in `scripts/resolve-docs-assets.mjs` — do not weaken it to force red. Relock and `docs:build` / bar-meter steps below make the lock test green.

### 2. Relock docs toolchain from PyPI — executable

- Files: `uv.lock`, `pyproject.toml`

1. Stub tests: covered in step 1.
2. Stub interface: none.
3. Write tests and run red: covered in step 1 (lock assertion).
4. Write code and run green: pin `[tool.uv]` default index to `https://pypi.org/simple` so this repo does not inherit `~/.config/uv/uv.toml`'s `pytorch-cu126` extra index. Relock with user config isolated (`uv lock --default-index https://pypi.org/simple`, and if the extra index still appears, lock with `--config-file` pointing at a file that has no `[[index]]` while still reading this `pyproject.toml` project). Confirm `uv.lock` has zero `download.pytorch.org` lines and that wheel entries for previously hashless packages gain `hash`. Then `uv sync --group docs --frozen`.

### 3. docs:build prefix — prose/policy

- Files: `package.json`
- No tests: prose/policy artifact

1. Change `docs:build` to `npm run build && node scripts/resolve-docs-assets.mjs --mode local && uv run properdocs build --strict`.

### 4. Bar-meter copy-paste example — prose/policy

- Files: `docs/components/bar-meters.md`, `skills/nerv/docs/components/bar-meters.md`
- No tests: prose/policy artifact

1. Wrap the fenced meter in a parent and pass that parent (or `document`) into `NERV.initBarMeters`, matching `querySelectorAll` descendant lookup.
2. Copy the same bytes into the skill path so `test/skill-contract.test.mjs` stays green.

## Technology Validation

No new technology - validation not required

## Dependencies

- Existing: `uv`, Node `node:test`, ProperDocs docs group
- Machine: `~/.config/uv/uv.toml` extra index must not participate in this repo's lock

## Challenges & Mitigations

- User-level `~/.config/uv/uv.toml` adds `https://download.pytorch.org/whl/cu126`. Mitigation: default-index in `pyproject.toml` plus an isolated lock invocation; grep the lock before finishing.
- Relock upgrades `certifi` / `requests` / `urllib3` / etc. to current PyPI. Mitigation: that is the point; re-run `uv sync --group docs --frozen` and a local docs build after `npm run build`.
- Handshake assertion is a substring. Mitigation: assert `nerv-docs:ready` as the event name already used in `scripts/resolve-docs-assets.mjs` (`dispatchEvent(new Event("nerv-docs:ready"))`).

## Pre-Mortem

- Relock still writes pytorch URLs because user `uv.toml` still merges. Plan change: isolated config is required, not optional; fail the step if grep still matches.
- Treating the markdown fence as executable TDD and adding a change-detector. Already excluded in Test Plan.
- Forgetting the skill copy. Existing skill-contract test is the backstop.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Pre-Mortem complete
- [x] Preflight
- [ ] Build
- [ ] QA
