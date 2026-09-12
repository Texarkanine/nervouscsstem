# Task: nerv-v01-m1-summem-niko-bootstrap

* Task ID: nerv-v01-m1-summem-niko-bootstrap
* Complexity: Level 2
* Type: simple enhancement

Install SumMem as a consumer and add the Niko root bootstrap pair. Scope is parent-brief requirements 1–3 and acceptance criterion 1 only. Do not touch release-please, npm publish, ProperDocs, the skill, or the offline-bundle note.

## Test Plan (TDD)

No new executable behavior. This milestone vendors SumMem and adds agent-facing prose. Operator: test only what this repo ships to consumers; do not add tests for `AGENTS.md`, `CLAUDE.md`, `.gitignore`, or the copied script.

### Test Infrastructure

- Framework: existing `node:test` suite in `test/` (design-system CSS/JS only)
- New test files: none

## Implementation Plan

### 1. SumMem consumer install and Niko bootstrap — prose/policy

- Files: `.summem/summem`, `.gitignore`, `AGENTS.md`, `CLAUDE.md`
- No tests: vendored tool plus agent-facing prose/policy

1. `cp` `/home/mobaxterm/git/SumMem/summem` to `.summem/summem` (chmod `+x`). Do not edit the copied file
2. Append `**/.summem/__pycache__/` to `.gitignore`
3. Run `.summem/summem init`; take the prompt after the `---` line; write that block at the top of `AGENTS.md`; append the Niko `# Agent context` template
4. Write `CLAUDE.md` with body `@AGENTS.md`

## Technology Validation

No new technology — validation not required. SumMem is a file copy, not an npm dependency. Its runtime floor is Python 3.11 (`tomllib`); `python3 --version` on this machine is 3.11.11 via pyenv (`/usr/bin/python3` is 3.10 and is not what `env python3` resolves to here).

## Dependencies

- Sibling script `/home/mobaxterm/git/SumMem/summem` as the unmodified copy source
- Python 3.11+ available as `python3` on `PATH` for later agent `wake`

## Challenges & Mitigations

- Parent brief lists M2–M5: this plan implements only M1
- Do not add a test file or change the `package.json` `test` list for this milestone

## Pre-Mortem

- Implementer plans the whole L4 because `projectbrief.md` is the parent: already covered by the M1-only challenge
- Implementer rewrites SumMem instead of copying: the work step is `cp` only
- Implementer adds bootstrap contract tests: operator forbade that; no new tests
- `AGENTS.md` includes the init wrapper ("Insert the following…") instead of the prompt: split on `---` the way SumMem's own `AGENTS.md` does

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Pre-Mortem complete
- [x] Preflight
- [x] Build
- [ ] QA
