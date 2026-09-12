# Task: nerv-v01-m3-offline-bundle-feasibility

* Task ID: nerv-v01-m3-offline-bundle-feasibility
* Complexity: Level 2
* Type: simple enhancement

Write a feasibility note on offline font-and-JS bundles. Scope is parent-brief requirement 7, acceptance criterion 7, and constraint 3 only. Inventory every typeface `src/_typography.scss` currently loads over the network, record each license, and say whether an offline bundle would be legally shippable. Do not vendor font files, do not add an offline artifact, do not change CSS/JS/release-please, and do not start M4/M5.

## Test Plan (TDD)

No new executable behavior. This milestone is a written investigation. Operator: test only what this repo ships to consumers; do not add tests that grep a planning note.

### Test Infrastructure

- Framework: existing `node:test` suite in `test/` (design-system CSS/JS and the npm pack contract)
- New test files: none

## Implementation Plan

### 1. Offline font-and-JS feasibility note — prose/policy

- Files: `planning/offline-bundle.md`
- No tests: prose/policy artifact

1. [x] Inventory unique typefaces from `src/_typography.scss` `@font-face` `src` URLs. Do not use `planning/PHASE1.md` as the font list — that table is missing Antonio and VT323. Treat `NERV Mixed` and `NERV Cartouche` as aliases of already-listed files, not extra licenses. Name CSS fallbacks that are not loaded (`Noto Serif JP`, system fonts) as not in scope for bundling.
2. [x] For each loaded family, record license name, SPDX id, and an upstream URL. Look up Google-hosted families from the official OFL metadata (not Google Fonts CSS API terms). Look up DSEG7 Classic from [keshikan/DSEG](https://github.com/keshikan/DSEG). Record OFL redistribution conditions that matter here (include license/copyright; reserved font names if unmodified).
3. [x] Cover JS: `dist/nerv.js` is already in the npm tarball under `AGPL-3.0-only` (`package.json` / `LICENSE`). Offline JS is already solved for anyone with the package; the gap is fonts fetched at runtime from `fonts.gstatic.com` and jsDelivr.
4. [x] Write `planning/offline-bundle.md`: inventory table, per-family licenses, OFL+AGPL interaction in one zip, a go/no-go on legal feasibility, and a recommendation. Include a mermaid of today's CDN load path vs a hypothetical later bundle. End with: this milestone does not ship the bundle even if the answer is "yes."
5. [x] Do not edit `src/_typography.scss`, `src/nerv.js`, `package.json`, `docs/`, or release-please files.

## Technology Validation

No new technology — validation not required. No new npm dependencies. License texts are read at build time and summarized in the note; they are not vendored as font files.

## Dependencies

- `src/_typography.scss` as the live inventory of loaded fonts
- `package.json` / `LICENSE` for the JS license
- Upstream OFL sources fetched during build (Google Fonts OFL metadata; [keshikan/DSEG](https://github.com/keshikan/DSEG))

## Challenges & Mitigations

- Stale PHASE1 font table: inventory only from `_typography.scss` `@font-face` URLs
- Google Fonts CSS API terms vs OFL on the files: cite the font's OFL; if a later milestone bundled, prefer official OFL packages (e.g. fontsource) over copying opaque `gstatic` subset URLs
- Licenses looking "fine" is not permission to ship: invariant 3 — note may recommend; this milestone does not vendor
- Composite faces and fallbacks inflating the license list: aliases and unloaded fallbacks called out, not counted as extra families

## Pre-Mortem

- Implementer vendors fonts or adds a zip because the note says bundling is legally possible: already covered by Challenge 3; work step 5 forbids those edits
- Implementer copies the PHASE1 four-font table and misses Antonio/VT323: already covered by Challenge 1
- Implementer puts the note in `docs/` so M4/M5 would publish an investigation as product docs: the file is `planning/offline-bundle.md`, matching other research notes such as `planning/tiled-hex-grid-variant.md`
- Implementer writes a test that greps the note: Test Plan says none; that would be a change-detector
- Implementer treats `Noto Serif JP` as a loaded font: work step 1 says it is a CSS fallback, not a `@font-face` src
- Implementer changes `_typography.scss` to self-host "while we're here": work step 5 forbids it

## QA Findings

- PASS. `git diff --stat` since the pre-build checkpoint touches only `planning/offline-bundle.md` plus memory-bank tracking files — `_typography.scss`, `nerv.js`, `package.json`, `docs/`, and release-please files are untouched.
- All 22 `@font-face` `src` URLs in `src/_typography.scss` cross-checked against the note's inventory table, alias list, and "not loaded" fallback list — exact match.
- Full suite re-run 357/357; `npm run lint` reproduces the same pre-existing 7 stylelint errors on `dist/nerv.css`, confirming they predate and are unrelated to this milestone.
- No KISS/DRY/YAGNI/completeness/regression/integrity/documentation violations found.

## Status

- [x] Initialization complete
- [x] Test planning complete (TDD)
- [x] Implementation plan complete
- [x] Technology validation complete
- [x] Pre-Mortem complete
- [x] Preflight
- [x] Build
- [x] QA
