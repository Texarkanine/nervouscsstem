---
task_id: nerv-v01-release-pipeline
complexity_level: 4
date: 2026-09-13
status: completed
---

# TASK ARCHIVE: nerv-v01-release-pipeline

## SUMMARY

Shipped the v0.1 release pipeline as wiring, not a usable product: SumMem and Niko bootstrap, release-please plus npm/GitHub Release attachments, an offline font-and-JS licensing answer at issue #7, a ProperDocs site with embedded live examples and local-vs-CDN dual-load, and an installable placeholder skill whose `metadata.version` locksteps with the package. Five of five milestones completed. Live Pages, the first npm `0.0.1` bootstrap, and a `0.1.0` cut remain operator steps on that wiring.

## REQUIREMENTS

Parent brief `nerv-v01-release-pipeline`:

- Agents wake SumMem from `AGENTS.md`; `CLAUDE.md` is `@AGENTS.md`.
- release-please versions the package and GitHub Releases; built `dist/nerv.css` and `dist/nerv.js` attach to each Release; npm publish is the CDN path (jsDelivr).
- Written feasibility note for offline font+JS bundling (licensing). Not a 0.1 ship.
- ProperDocs site keeps `docs/` as authoring source of truth. Using pages embed live examples (preview, spec, code). Release builds load CDN assets; local serve/build uses on-disk `dist/` and errors if those files are missing. CSS islands must not need `nerv.js`.
- `npx skills` installs a placeholder skill that carries the docs; `SKILL.md` version matches published artifacts.
- Constraints: do not relocate `docs/` into the skill; no bespoke CDN; no vendored fonts in 0.1; design-system rules still apply to live examples.

## IMPLEMENTATION

- **M1 (L2):** Unmodified SumMem under `.summem/`, `__pycache__` gitignored, `AGENTS.md` (SumMem init then Niko bootstrap), `CLAUDE.md` as `@AGENTS.md`. Planned bootstrap contract tests were struck; the milestone is four files and no new tests.
- **M2 (L3):** Public package metadata at `0.0.1`, `files` whitelist for the tarball, `release-please-config.json` / manifest, `.github/workflows/release-please.yaml` (trusted publisher pinned to that filename and GitHub environment `npmjs.org`). GitHub Release uploads `dist/nerv.css` and `dist/nerv.js`. `dist/` stays gitignored; no RP-branch amend jobs. Executable TDD was `test/publish-contract.test.mjs` only. A `feat(release)` commit exists so Niko `chore:` checkpoints do not have to open the first release PR.
- **M3 (L2):** License inventory of every `@font-face` URL in `_typography.scss`. All six CSS-loaded families are OFL-1.1. The note moved from `planning/offline-bundle.md` to GitHub issue #7; the planning copy was deleted so the ship request has one home. No font files or zip shipped.
- **M4 (L3):** ProperDocs Material site from existing `docs/`. Using pages carry embedded islands (not standalone extra HTML). `scripts/resolve-docs-assets.mjs`: `--mode local` copies `dist/` or throws; `--mode cdn` writes gitignored `docs/{stylesheets,javascripts}/nerv.*` stand-ins (`@import` for CSS because `extra_css` is relative to `docs_dir`; CDN JS fires `nerv-docs:ready`). `publish-pages` job on `release-please.yaml` after `publish-npm`. Docs chrome must not call `NERV.init()` (viewport-fixed scanlines on `body`). Scoped `initBarMeters(island)` on the JS example page. TDD surface: `test/docs-assets.test.mjs`.
- **M5 (L2):** `skills/nerv/` with placeholder `SKILL.md`, markdown copies of `docs/**/*.md` (no `docs/img/` LFS stills, no built `site/`). `metadata.version` quoted string with `# x-release-please-version`; generic extra-files only. `test/skill-contract.test.mjs` (five cases). `skills/` is not on the npm `files` list; installers use `npx skills add`.

## TESTING

Each sub-run used `/niko-qa` and recorded `PASS`. Executable contracts were pack contents (M2), docs local-vs-CDN load path (M4), and skill identity/copy/LFS exclusion (M5). CI YAML, ProperDocs config, Using-page markdown, and extra-files JSON were not TDD'd. Suite grew 353 → 357 (M2) → 369 (M5). `npm run lint` still fails on generated `dist/nerv.css` (Antonio quotes, `0px`); predates this L4. M4 browser-checked CSS and Panels islands without JS init, bar meters at 120/66, and no `.nerv-scanlines`. M5 diffed `docs/**/*.md` against the skill copy.

## LESSONS LEARNED

- Test what this repo ships to consumers. Do not TDD vendored tools, agent prose, or own CI unless it is brittle or critical. M1's struck bootstrap tests and M2's first-preflight YAML change-detectors were the same mistake.
- Contract tests only for this product's published contract. If semver already signals the expectation, skip them.
- Font inventory starts at `_typography.scss` `@font-face` `src`, not `planning/PHASE1.md` (Antonio and VT323 are in CSS and missing from that table).
- Material `extra_javascript` is deferred. A CDN stand-in that inserts a script does not run before the next extra script. Docs init waits for `window.NERV` or `nerv-docs:ready`.
- `extra_css` paths are relative to `docs_dir`. Keep one `properdocs.yml` by writing an `@import` stand-in at the gitignored extra_css path.
- SKILL.md version belongs under `metadata` as a string. A top-level `version` key is not in the Agent Skills spec.
- First npm publish cannot use OIDC until the package exists on the registry. Operator bootstraps `0.0.1`, then attaches the trusted publisher to `release-please.yaml`.

## PROCESS IMPROVEMENTS

- State the TDD bar in the sub-run plan before the first preflight. L3 Preflight on an L4 sub-run will otherwise classify Actions YAML as executable behavior.
- Look up the named consumer spec during Plan (agentskills.io, ProperDocs hosting), not a sibling's shape. M4's first creative (standalone HTML extra pages) and M5's top-level `version` were the same class of miss.
- Hosting model is an operator call. Ask "in the site or beside it" before solving dual-load around a spike leftover.
- When the answer is "yes, later," put it in the GitHub issue that is the ship request. A second `planning/` copy that says the milestone stops here fights whoever picks the work up.

## TECHNICAL IMPROVEMENTS

- A `scripts/sync-skill-docs.mjs` (or equivalent) would stop the hand-maintained `docs/` → `skills/nerv/docs/` copy from drifting. The copy-identity test already fails on drift; the generator is later.
- Do not assume `DOMContentLoaded` means `window.NERV` exists on docs pages.
- When `dist/` is gitignored, skip sibling release-please "amend the RP branch" jobs. `release-type: node` already rewrites `package-lock.json` version fields.

## NEXT STEPS

Operator work on the wiring this L4 left in place:

- Enable GitHub Pages once (Actions as source).
- Bootstrap the first npm publish (`0.0.1`), then attach the trusted publisher (workflow `release-please.yaml`, environment `npmjs.org`).
- Merge and let release-please cut `0.1.0` after that.
- Push `nerv-v01-m3-offline-bundle-feasibility` if another machine needs this tree (it was local-only at archive time).

Later, not 0.1:

- Issue #7 — offline font+JS bundle ship, if ever.
- Optional docs-sync generator for the skill markdown copy.

## Milestone list

Original five-milestone DAG. None added, removed, or reordered. Serial walk stayed M1 → M2 → M3 → M4 → M5. M3 has no edges and can run any time.

M4 was re-scoped in place: from two extra example pages that must work with JavaScript disabled, to Using-page islands (preview, spec, code) whose CSS islands must not call `nerv.js` / `NERV.init()`. Invariant 7 and M4's checkbox text were rewritten to match. Invariant 9 replaced a "this list is not a sub-run plan" note once M4/M5 ownership needed a hard split.

M3's deliverable home moved from `planning/offline-bundle.md` to issue #7 after reflect; the checkbox gained `#7`.

- [x] M1: Install SumMem as a consumer copy and add the Niko root bootstrap pair
- [x] M2: Wire release-please, npm publish, and GitHub Release attachments for the built CSS and JS
- [x] M3: Write a feasibility note on offline font-and-JS bundles covering the licenses of every font the CSS currently loads #7
- [x] M4: Add a ProperDocs GitHub Pages site from existing docs plus component pages with embedded live examples that load CDN assets on release and dist locally, erroring if local bundles are missing
- [x] M5: Add a placeholder agent skill installable via npx skills that carries the docs site and a SKILL.md version bumped by release-please

## Sub-run summaries

**M1 — SumMem and Niko bootstrap (L2):** Consumer copy plus root prompt pair. First plan invented eight contract tests for vendored script and agent prose; operator interrupt struck them. What shipped is what the milestone always was. QA had no substantive findings. 353/353.

**M2 — release-please, npm, GH assets (L3):** Pack contract plus copied inquirerjs release wiring, minus codecov / `test:ci` / `.nvmrc`. First preflight FAILed on TDD-of-CI; second plan kept one executable unit. No creative phase. QA passed. 357/357. Live `0.1.0` waits on merge plus the operator's `0.0.1` hand-publish.

**M3 — Offline bundle feasibility (L2):** License read of live `@font-face` URLs. All six families OFL-1.1; bundling next to AGPL JS is legally feasible and is not a 0.1 ship. Operator moved the note to #7 and deleted the planning file so the ship request is not forked. No tests, no CSS edits. 357/357.

**M4 — ProperDocs dual-load site (L3):** First creative (standalone HTML extra pages) was the wrong hosting model; operator rejected it. Second creative (inline islands, one YAML, dual-load stand-ins) shipped. Preflight `FAIL (fixable)` for missing `pages: write` on the release workflow; jsDelivr HEAD-verify left as advisory (`needs: publish-npm` orders jobs, it does not make jsDelivr serve). Recoverable miss: docs-init on `DOMContentLoaded` vs deferred `extra_javascript`. QA passed. Pages enable is still operator work.

**M5 — Installable docs skill (L2):** `skills/nerv/` with markdown copy of `docs/`. First preflight `FAIL (fixable)` because top-level `version` is not in the Agent Skills spec; replan nested `metadata.version`. Did not relocate `docs/`, did not copy LFS stills, did not add `skills/` to npm `files`, did not add a sync generator. QA passed. 369/369.

## System state

An agent in this repo wakes SumMem from `AGENTS.md` and reads Niko context from `memory-bank/`. `release-please.yaml` is the version bumper and the npm OIDC audience; GitHub Releases are wired to upload the two dist artifacts; the tarball contract is `test/publish-contract.test.mjs`. ProperDocs builds from `docs/` with dual-load via `scripts/resolve-docs-assets.mjs`; CSS example islands do not require `nerv.js`; docs pages must not call `NERV.init()`. `npx skills add Texarkanine/nervouscsstem` installs `skills/nerv/` with docs markdown and `metadata.version` lockstep. Offline bundling is issue #7 only. `docs/` remains the authoring source of truth. `dist/` is gitignored and built in CI before publish and Pages.

What is not live yet: GitHub Pages (operator must enable Actions source), the first npm package (operator `0.0.1` bootstrap), and therefore jsDelivr URLs and a `0.1.0` Release.

## Cross-run insights

- **Shipped-artifact TDD is the L4 invariant.** It had to be restated at M1 (struck tests), M2 (CI YAML), and M4 (no document-content change-detectors). By M5 it held on the first try except for the consumer-spec hole.
- **Consumer spec beats sibling shape.** M4 planned extra HTML because a ProperDocs spike allowed it; M5 planned top-level `version` because YAML extra-files look like that. The brief named ProperDocs-in-the-site and `npx skills` / agentskills.io. Plan against those.
- **Copy, don't relocate.** `docs/` as authoring SoT survived M4 (site) and M5 (skill). LFS stills cannot live in the skill; the 0.1 form is markdown copy plus an identity test. A generator can wait.
- **Operator-owned first publish is load-bearing.** M2, M4, and M5 all consume npm/jsDelivr that does not exist until the operator bootstraps the package and enables Pages. The L4 is complete as wiring.
- If an installable skill had been a founding assumption, `docs/` would still be the authoring tree. The copy-plus-identity-test is the 0.1 form of that split.
