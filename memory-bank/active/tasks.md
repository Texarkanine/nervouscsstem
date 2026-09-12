# Task: nerv-v01-m1-summem-niko-bootstrap

* Task ID: nerv-v01-m1-summem-niko-bootstrap
* Complexity: Level 2
* Type: simple enhancement

Install SumMem as a consumer and add the Niko root bootstrap pair. Scope is parent-brief requirements 1–3 and acceptance criterion 1 only. Do not touch release-please, npm publish, ProperDocs, the skill, or the offline-bundle note.

## Test Plan (TDD)

### Behaviors to Verify

- SumMem script present: repository root has `.summem/summem` as a non-empty file → the file exists and is readable
- `init` works: run `.summem/summem init` from the repo root → exit 0 and stdout contains `# Project Memory` and `wake`
- `version` works: run `.summem/summem version` from the repo root → exit 0
- Gitignore contract: `.gitignore` → contains the line `**/.summem/__pycache__/`
- SumMem block first: `AGENTS.md` → first heading is `# Project Memory` and that heading appears before `# Agent context`
- Wake instruction present: `AGENTS.md` → contains a `wake` invocation of `.summem/summem` before `# Agent context`
- Niko bootstrap present: `AGENTS.md` → contains `# Agent context` and mentions `memory-bank/productContext.md`
- Claude pointer: `CLAUDE.md` → file body trims to `@AGENTS.md`

### Edge Cases

- Missing `.summem/summem` → `init` / `version` tests fail
- Python older than 3.11 on `PATH` as `python3` → `init` exits 1 with SumMem's own message (this machine's `env python3` is 3.11.11)
- `AGENTS.md` has the Niko block only, or has it above the SumMem block → order tests fail
- `CLAUDE.md` has extra prose besides `@AGENTS.md` → pointer test fails
- `.gitignore` has a generic `__pycache__/` rule but not `**/.summem/__pycache__/` → gitignore test fails
- Do not call `wake` / `note` in tests: first `wake` creates the root store and would write durable files during `npm test`

### Test Infrastructure

- Framework: Node.js built-in test runner (`node:test` + `node:assert/strict`)
- Test location: `test/`
- Conventions: ESM `test/<area>.test.mjs`; `ROOT` via `resolve(import.meta.dirname, '..')`; `describe` / `it`; `execSync` for commands (see `test/foundation.test.mjs`)
- New test files: `test/summem-bootstrap.test.mjs`
- Runner note: `package.json` `test` script lists files explicitly — the new file must be appended there or `npm test` will not run it

## Implementation Plan

### 1. Agent onboard contract — executable

- Files: `test/summem-bootstrap.test.mjs`, `package.json`, `.summem/summem`, `.gitignore`, `AGENTS.md`, `CLAUDE.md`

1. Stub tests: add `test/summem-bootstrap.test.mjs` with empty `describe` / `it` cases for the eight behaviors above; append `test/summem-bootstrap.test.mjs` to the `package.json` `test` script list
2. Stub interface: no new functions, classes, or wrappers. Do not create a fake or empty `.summem/summem`
3. Write tests and run red: implement the assertions (file presence, `init` / `version` via `execSync` on `.summem/summem`, gitignore line, `AGENTS.md` heading order and markers, `CLAUDE.md` trim). Run `node --test test/summem-bootstrap.test.mjs` — all new tests fail
4. Write code and run green:
    - `mkdir -p .summem` and `cp` `/home/mobaxterm/git/SumMem/summem` to `.summem/summem` (chmod `+x`). Do not edit the copied file
    - Append `**/.summem/__pycache__/` to `.gitignore`
    - Run `.summem/summem init`; take the prompt after the `---` line (not the wrapper recipe); write that block at the top of `AGENTS.md`; append the exact Niko `AGENTS.md` template from `.cursor/skills/shared/niko/references/core/memory-bank-init.md` (the `# Agent context` section). Same shape as `/home/mobaxterm/git/SumMem/AGENTS.md` and `/home/mobaxterm/git/stockroom/AGENTS.md`
    - Write `CLAUDE.md` with body `@AGENTS.md`
    - Re-run `node --test test/summem-bootstrap.test.mjs` then `npm test`

## Technology Validation

No new technology — validation not required. SumMem is a file copy, not an npm dependency. Its runtime floor is Python 3.11 (`tomllib`); `python3 --version` on this machine is 3.11.11 via pyenv (`/usr/bin/python3` is 3.10 and is not what `env python3` resolves to here).

## Dependencies

- Sibling script `/home/mobaxterm/git/SumMem/summem` as the unmodified copy source
- Python 3.11+ available as `python3` on `PATH` for `init` / `version` (and later agent `wake`)
- Existing `node:test` suite and the explicit `package.json` `test` file list

## Challenges & Mitigations

- Explicit test list: `package.json` `test` enumerates files. Mitigation: add `test/summem-bootstrap.test.mjs` in the same step that creates the file
- Python 3.11 floor: `/usr/bin/python3` is 3.10. Mitigation: do not rewrite the shebang; tests and agents use `env python3` (3.11.11 here). M2 CI must provision 3.11+ if it runs `npm test`
- `wake` creates the store: tests call only `init` and `version`
- Parent brief lists M2–M5: this plan implements only M1
- Change-detectors: assert structural markers and file contracts, not the full write-rule paragraph or a byte hash of `summem`

## Pre-Mortem

- Implementer plans the whole L4 because `projectbrief.md` is the parent: already covered by Challenge 4
- Tests lock `init` prompt wording and break when SumMem updates the 0BSD template: already covered by Challenge 5
- `npm test` fails on a Python 3.10 runner: already covered by Challenge 2
- Implementer rewrites SumMem instead of copying: the write-code substep is `cp` only
- `AGENTS.md` includes the init wrapper ("Insert the following…") instead of the prompt: split on `---` the way SumMem's own `AGENTS.md` does

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Pre-Mortem complete
- [ ] Preflight
- [ ] Build
- [ ] QA
