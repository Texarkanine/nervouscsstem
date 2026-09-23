# Project Brief

## User Story

As a catalog author, I want each live example to come from the copyable HTML fence so a preview and its recipe cannot drift.

Source: [issue #14](https://github.com/Texarkanine/nervouscsstem/issues/14) "Generate catalog islands from the copyable HTML fence" (authoritative spec).

## Approved Intent

Approved by the human operator (Niko Step 5 already satisfied):

> Build exactly what issue #14 describes: a `pymdownx.superfences` custom fence formatter, registered in `properdocs.yml` next to the existing Mermaid custom fence, that takes ONE fence body in markdown and emits at build time both the live `.nerv-docs-island` and the highlighted copyable fence. Island chrome (`nerv-state-*` on the wrapper, `data-nerv-init`) moves into fence options. `<script>` is stripped from the island, and scoped init still runs through `docs-init.js`. CSS islands paint with JS off. Scanlines stays fence-only. The formatter's behavior gets unit tests. Catalog page content does not get tests (those would be change-detectors).
>
> Operator decision: migrate EVERY existing catalog island+fence pair (about 29 today under docs/components/) to the single-source fence in this same PR.

## Use-Cases

### Author a CSS-only example

The author writes one fence. The built page shows a live island (painted with JS off) and a highlighted copyable fence with the same markup.

### Author a JS example

The author writes one fence whose body includes a `<script>` recipe and a fence option naming the scoped init. The island omits the `<script>`, carries `data-nerv-init`, and `docs-init.js` runs the scoped init. The copyable fence keeps the `<script>`.

### Author a tinted example

The author writes one fence with a fence option naming the alert-cascade state. The island wrapper gets `nerv-state-*`; the copyable fence does not show it.

## Requirements

1. A Python superfences custom-fence formatter, registered in `properdocs.yml` beside the Mermaid fence.
2. One fence body produces, at build time, a `.nerv-docs-island` with the body as inner HTML (scripts stripped) plus the normal highlighted `html` code block.
3. Fence options carry island chrome: `data-nerv-init` value and `nerv-state-*` class. Chrome never appears in the copied recipe.
4. `docs-init.js` keeps running scoped init for islands with `data-nerv-init`; Material pages never call `NERV.init()`.
5. Migrate every island+fence pair under `docs/components/` (133 islands on 29 pages) to the single-source fence.
6. Scanlines stays a plain `html` fence (no island).
7. Unit tests for the formatter's behavior; no tests on catalog page content.
8. `docs/service-manual.md` documents the new fence authoring contract (catalog copy does not).
9. Formatter importable by `uv run properdocs build --strict` locally and in `.github/workflows/reusable-docs-build.yml` from a clean checkout.
10. `memory-bank/techContext.md` documents how to run the formatter tests; `memory-bank/systemPatterns.md` sentence about issue #14 updated surgically.

## Constraints

1. CSS islands paint with JS off; no client-side clone of the highlighted `<pre>`.
2. No client-side read-the-fence-and-inject.
3. No product CSS/JS changes (`src/`).
4. Catalog copy must not teach Material, `docs-init.js`, or `data-nerv-init`.
5. No new CI jobs.
6. No compatibility shims for the old island+fence form beyond what migration needs.

## Acceptance Criteria

1. `npm run docs:build` (strict) passes locally and in PR CI.
2. For every migrated page, the built island HTML and code-block HTML are equivalent to the pre-migration build (verified by a scripted diff of `site/`, not by inspection).
3. Formatter unit tests pass and cover: plain body, `<script>` stripping, init option, state option, both options, invalid options, highlighted-copy parity with the stock `html` fence.
4. `npm test` and `npm run lint` still pass.
