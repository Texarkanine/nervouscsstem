# Project Brief

## User Story

As an operator of this design system, I want a v0.1 release pipeline — repo memory, versioned artifacts, a CDN-backed docs site, and an installable agent skill — so we can iterate on a real publish loop even though nobody will understand or use the system from this release.

## Use-Case(s)

### Use-Case 1: Agent onboarding

A new agent in this repository wakes SumMem from `AGENTS.md` and loads Niko project context from the memory-bank bootstrap pair.

### Use-Case 2: Cut a release

`release-please` versions the package, opens the release PR, and a GitHub Release attaches the built CSS and JS. The same artifacts are available on a CDN via npm publish (jsDelivr or whatever falls out of npm).

### Use-Case 3: Read docs on GitHub Pages

A visitor opens the ProperDocs site and sees the existing `docs/` plus two live-example pages. CSS and JS for those examples come from the released CDN URLs.

### Use-Case 4: Iterate docs locally

An operator builds CSS/JS to `dist/` and runs the doc site locally. Example pages load those on-disk bundles. If the files are missing, the local docs build errors.

### Use-Case 5: Install the skill

An operator runs `npx skills.sh` / `npx skills` and gets a placeholder skill whose `SKILL.md` version matches the published artifacts, with the documentation site traveling inside the skill.

## Requirements

1. Install SumMem into this repo first: copy the script under `.summem/`, run `init`, add `**/.summem/__pycache__/` to `.gitignore`.
2. Add Niko’s thin root bootstrap pair (`AGENTS.md` pointing at `memory-bank/`, `CLAUDE.md` as `@AGENTS.md`). This repo currently has neither.
3. Put SumMem’s activation block at the top of `AGENTS.md`, then the Niko bootstrap — same shape as SumMem’s own repo.
4. Drive versions and GitHub Releases with `release-please`, following SumMem and inquirerjs-checkbox-search.
5. Attach the built CSS and JS to each GitHub Release.
6. Publish the package to npm so the public site can load CSS/JS from a CDN (jsDelivr or the equivalent that follows from npm). Confirm that path during the work; do not invent a separate CDN.
7. Investigate the feasibility of an offline bundle that includes fonts and JS. Licensing is the main question. This is a written answer, not a promise to ship that bundle in 0.1.
8. Add a ProperDocs documentation site that keeps existing `docs/` as the docs.
9. Add two new live-example pages: one CSS-only (must work with JavaScript disabled) and one that requires JS.
10. On a release docs build, those example pages load the **released** CSS/JS from the CDN.
11. On a local docs run, those pages load the on-disk `dist/` build and **error if those files are missing**.
12. Host the site on GitHub Pages.
13. Add an agent skill installable via `npx skills.sh` / `npx skills`, slobac-style, so the documentation site travels with the skill. Skill prose may be placeholder.
14. `SKILL.md` carries a version number that matches the published artifacts.

## Constraints

1. v0.1 is wiring, not a usable product. Nobody is expected to understand or use the design system from this release.
2. Do not relocate existing `docs/` into the skill as the authoring source of truth. Keep `docs/` as the docs for now.
3. Offline bundling is investigate-only unless the licensing answer is trivially shippable.
4. Existing design-system constraints still apply to any live examples (`.nerv-` prefix, no canvas/WebGL, minimal JS).
5. Follow the sibling repos named in the intent for release-please and skill-docs wiring; do not invent a third pattern.

## Acceptance Criteria

1. Agents in this repo wake SumMem from `AGENTS.md`; `CLAUDE.md` points at `AGENTS.md`.
2. A GitHub Release exists (or the release-please path to one is wired) with versioned CSS and JS attached.
3. The GitHub Pages site shows existing docs plus the two example pages, and the browser loads CSS/JS from the CDN.
4. The CSS-only example page works with JavaScript disabled.
5. A local ProperDocs serve/build uses on-disk `dist/` bundles and fails if they are absent.
6. `npx skills.sh` / `npx skills` can install the skill; the docs site comes along inside it; `SKILL.md` has a matching version.
7. A written feasibility note exists for offline font+JS bundling (licensing).
