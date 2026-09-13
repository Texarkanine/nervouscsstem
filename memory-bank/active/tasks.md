# Task: nerv-v01-m5-installable-docs-skill

* Task ID: nerv-v01-m5-installable-docs-skill
* Complexity: Level 2
* Type: simple enhancement

Add a placeholder agent skill at `skills/nerv/` installable via `npx skills add Texarkanine/nervouscsstem`. The skill carries a copy of the authoring markdown (not `docs/img/`, not the built ProperDocs `site/`). `SKILL.md` version matches `package.json` and is bumped only via a generic `extra-files` entry. Do not relocate `docs/`, do not change `properdocs.yml` or the dual-load contract, and do not redesign the release workflow. Scope is parent-brief requirements 13–14, acceptance criterion 6, and use-case 5.

Operator TDD bar (binding): test what this repo ships to consumers. Do not TDD Actions YAML, `release-please-config.json`, README, or SKILL.md body prose. The skill directory and its version/docs-copy contract are the shipped artifact for `npx skills` installers. Own CI is not the product unless it is brittle or critical.

## Test Plan (TDD)

### Behaviors to Verify

- Discoverable skill: `skills/nerv/SKILL.md` exists → YAML frontmatter has `name: nerv` matching the parent directory, and a non-empty `description`
- Version lockstep: frontmatter `version` → equals `package.json` `"version"` (published contract for AC6; npm semver does not update this file by itself)
- Docs travel: every tracked `docs/**/*.md` → a byte-identical file at `skills/nerv/docs/<same relative path>`
- No screenshot library: walking `skills/nerv/` → no `img/` directory, no path under `docs/img`, and no file whose contents start with the Git LFS pointer header (`version https://git-lfs.github.com/spec/v1`)
- npm pack unchanged: `npm pack --dry-run` → packed paths do not include anything under `skills/`

### Test Infrastructure

- Framework: Node.js built-in test runner (`node:test`, `node:assert/strict`)
- Test location: `test/`
- Conventions: `*.test.mjs`; each file is listed explicitly in `package.json` `"test"` (see `test/publish-contract.test.mjs` and `test/docs-assets.test.mjs`). Do not spawn `npx skills`, ProperDocs, or git.
- New test files: `test/skill-contract.test.mjs`

## Implementation Plan

### 1. Skill install contract — executable

- Files: `test/skill-contract.test.mjs`, `skills/nerv/SKILL.md`, `skills/nerv/docs/**/*.md` (copy of tracked `docs/**/*.md`), `package.json` (`test` script only)

1. Stub tests: add `test/skill-contract.test.mjs` with empty `it()` cases for the five behaviors above; add the file name to `package.json` `"test"`.
2. Stub interface: create `skills/nerv/SKILL.md` with the required frontmatter shape (`name`, `description`, `version: 0.1.0 # x-release-please-version`) and empty placeholder body; do not copy docs yet.
3. Write tests and run red: parse SKILL.md frontmatter (first `---` block); assert name/directory lockstep, non-empty description, version equals `package.json`; list tracked `docs/**/*.md` and assert each has an identical counterpart under `skills/nerv/docs/`; walk `skills/nerv` and reject `img/` and LFS pointer bytes; reuse `npm pack --dry-run --json` (same helper shape as `test/publish-contract.test.mjs`) and assert no `skills/` path. Expect red: docs copies missing; possibly pack still green.
4. Write code and run green: copy each tracked `docs/**/*.md` to `skills/nerv/docs/` preserving relative paths (do not copy `docs/img/**`, `docs/stylesheets/`, `docs/javascripts/`, or `site/`); fill SKILL.md placeholder body (how to apply the design system; stills and live examples live on GitHub Pages; authoring SoT remains `docs/`); do not add `skills/` to `package.json` `"files"`. Run `npm test`.

### 2. release-please extra-files — prose/policy

- Files: `release-please-config.json`
- No tests: prose/policy artifact

1. Under `packages["."]`, add `extra-files` with a single entry `{ "type": "generic", "path": "skills/nerv/SKILL.md" }`. Keep `release-type: node` and the existing bark/woof `pull-request-header`.
2. Do not use `type: yaml` / `jsonpath` (SKILL.md is markdown with frontmatter, not pure YAML). Do not add other extra-files. Do not edit `.github/workflows/release-please.yaml`.

### 3. README and techContext — prose/policy

- Files: `README.md`, `memory-bank/techContext.md`
- No tests: prose/policy artifact

1. README: add an Agent skill section with `npx skills add Texarkanine/nervouscsstem` (the live CLI; `npx skills.sh` is the same site, not a second command). State that skill prose is a placeholder, markdown travels inside the skill, and the screenshot library does not.
2. `techContext.md`: one surgical pointer that the installable product skill is `skills/nerv/` (not `.cursor/skills/`, which is this repo's Niko bootstrap). Do not catalog scripts.

## Technology Validation

No new technology - validation not required. Consumers already have `npx`; this repo does not add the `skills` CLI as a dependency. Do not add a local `npx skills` smoke to CI.

## Dependencies

- `skills/nerv/` must exist before extra-files can point at it (unit 1 before unit 2)
- Copied markdown relative links keep working only if the `docs/` tree shape is preserved under `skills/nerv/docs/`
- `package.json` version `0.1.0` is the current SKILL.md version; release-please is the only later bumper

## Challenges & Mitigations

- Gallery pages (`design-language.md`, `atomic-elements.md`) reference `img/` stills that must not be copied: copy the markdown anyway; SKILL.md tells installers the stills live on Pages / in the git repo. Do not invent a non-LFS image path in this milestone.
- SLOBAC's live pattern is `docs_dir` inside the skill and a plugin marketplace, not `npx skills`: follow this repo's invariants and the brief's install command, not SLOBAC's relocated authoring tree.
- YAML extra-files cannot parse markdown frontmatter: generic updater + `# x-release-please-version` on the version line.
- `npx skills add` discovery looks at `skills/<name>/SKILL.md`, not `.cursor/skills/`: put the product skill at repo-root `skills/nerv/`.
- Byte-identical copy tests fail on every `docs/` edit until the copy is updated: that is the carry-the-docs contract, not a prose pin. Do not add a sync script in 0.1.

## Pre-Mortem

- Preflight treats extra-files / workflow YAML as executable TDD and FAILs like M2: already covered — Test Plan states the operator binding; unit 2 is prose/policy.
- Plan copies the built `site/` or `docs/img/` and ships LFS pointers: already covered by the no-library behavior and unit 1 copy rules.
- Relocating `docs/` or retargeting `properdocs.yml` to the skill (SLOBAC) violates invariants 1 and 9: plan copies into `skills/nerv/docs/` and leaves authoring and the site load contract untouched.
- Version lockstep test is struck as "semver already signals it": keep it. Installers never read `package.json`; extra-files is CI, not the consumer-visible contract.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Pre-Mortem complete
- [ ] Preflight
- [ ] Build
- [ ] QA
