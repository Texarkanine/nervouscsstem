# Progress

Add a ProperDocs GitHub Pages site from existing `docs/` plus Using pages with live examples embedded on the page. Released pages load CDN assets; local serve/build uses `dist/` and errors if those files are missing.

**Complexity:** Level 3

## 2026-09-12 - COMPLEXITY-ANALYSIS - COMPLETE

* Work completed
    - Marked L4 milestone M3 complete and cleared its sub-run ephemerals
    - Classified first unchecked L4 milestone M4 as Level 3
    - Stubbed `tasks.md` for `nerv-v01-m4-properdocs-dual-load-site`
    - Replaced this progress file (M3 history is stale for the sub-run)
* Decisions made
    - Decision tree: not a bug fix; not a small self-contained enhancement; complete feature with multiple components (ProperDocs site, GitHub Pages, CSS-only example, JS example, local-vs-CDN load switch) and no new system architecture → L3
    - Matches the L4 advisory estimate
    - Parent `projectbrief.md` retained; M4 maps to requirements 8–12, acceptance criteria 3–5, and use-cases 3–4
* Insights
    - Later milestone M5 stays out of this sub-run: no placeholder skill, no `SKILL.md` extra-files hook
    - Invariants 1, 2, and 7 are load-bearing: `docs/` remains the authoring source, no bespoke CDN, live examples stay inside design-system constraints
    - L4 preflight advised a single dual-load asset-resolution module; Plan should treat that as the default unless a sibling ProperDocs pattern already owns the switch

## 2026-09-12 - CREATIVE - COMPLETE

* Work completed
    - Explored dual-load + example hosting as the sole open question
    - Wrote `memory-bank/active/creative/creative-dual-load-example-hosting.md`
    - Spiked ProperDocs 1.6.7 + Material 9.7 in `/tmp/pd-poc` against both a toy HTML extra page and this repo's `docs/`
* Decisions made
    - Node module + standalone HTML (Option D). Rejected site-wide `extra_css` and runtime JS (AC4 / overlay). Python hooks would move the URL contract out of `node:test`.
    - Local: copy `dist/` beside examples or throw. CDN: rewrite `site/examples/` after ProperDocs build.
* Insights
    - Extra HTML is copied as-is. `--strict` currently fails only on `docs/service-manual.md` → `../.gitattributes`. No `index.md` means no `/` page.

## 2026-09-12 - PLAN - COMPLETE

* Work completed
    - Wrote the L3 plan in `tasks.md`: one executable unit (resolver + example pages) and three prose/policy units (ProperDocs toolchain, Pages/CI, README)
    - Mapped parent brief requirements 8–12 and AC 3–5 onto that split
* Decisions made
    - Follow SLOBAC ProperDocs + uv + Pages-on-release, not SLOBAC's skill `docs_dir` or extra plugins
    - PR docs build uses local mode (`npm run build` first); release Pages uses CDN mode
    - No tests that spawn ProperDocs or grep workflow YAML
* Insights
    - The load-path contract is the only shipped-product behavior; the SSG config is wiring like M2's Actions YAML

## 2026-09-12 - PREFLIGHT - COMPLETE

* Work completed
    - Ran L3 preflight checks against `tasks.md`, creative doc, and codebase reality
    - Wrote `memory-bank/active/.preflight-status` (first line: `PASS WITH ADVISORY`)
* Decisions made
    - Plan is acceptable as-is for `/niko-build`; advisories are optional improvements, not replan triggers
* Insights
    - Release Pages job should declare dependency on `publish-npm` to avoid parallel-release CDN races
    - Chaining deploy into the release-please workflow (PR docs stay separate) is the highest-leverage structural refinement

## 2026-09-12 - L4 PLAN - REALIGNED

* Work completed
    - Refactored `memory-bank/active/milestones.md` to the upstream L4 plan format: Per-milestone done and risks, estimates off checkbox lines, issue #7 on M3
    - Left the in-flight M4 L3 plan (`tasks.md`, creative, preflight) in place
* Decisions made
    - Advisory estimates unchanged: M1 L2 (self-contained onboard), M2 L3 (publish feature), M3 L2 (research note), M4 L3 (site plus load-path), M5 L2 (placeholder skill plus extra-files only)
    - Dropped the old meta-invariant ("this list is not a sub-run plan"); Done/Risks now hold judgeable outcomes instead of implementation steps
    - Added invariant 9 as the ProperDocs handoff: M4 owns the site; M5 includes it
* Insights
    - Classification of the next `/niko` after M4 will read the M5 checkbox plus its Done/Risks block, not a file list on the checkbox line

## 2026-09-12 - PLAN - REPLAN

* Work completed
    - Operator rejected standalone HTML examples and invoked `/niko-plan` to replan M4
* Decisions made
    - Live examples belong inside the ProperDocs teaching site (preview island, then spec, then code), not as separate HTML pages
    - AC4 restated: CSS example islands must not require `nerv.js`; Material chrome may use JS
    - v0.1 ships the pattern (CSS section plus a small set of component pages), not a page for every component
* Insights
    - The previous creative (Option D) is void. Dual-load remains; hosting does not.

## 2026-09-12 - CREATIVE - COMPLETE (replan)

* Work completed
    - Explored embedding plus dual-load as the replacement open question
    - Wrote `memory-bank/active/creative/creative-embedded-docs-examples.md`
    - Marked the standalone-HTML creative superseded
* Decisions made
    - Option C: inline HTML islands in markdown plus `extra_css` / `extra_javascript`
    - Never call `NERV.init()` on docs pages; `injectScanlines` is viewport-fixed on `body`
    - v0.1 Using pages: CSS, Panels (CSS-only), Bar meters (scoped JS)
* Insights
    - `extra_css` is relative to `docs_dir`, so CDN mode writes an `@import` stand-in rather than a second YAML config

## 2026-09-12 - PLAN - COMPLETE (replan)

* Work completed
    - Rewrote `tasks.md`: resolver still the executable unit; Using pages and ProperDocs are prose/policy
    - Updated parent brief requirements 9–11 and AC 3–4, and the L4 M4 checkbox/Done, to match embedded examples
    - Folded the prior preflight advisory (`needs: publish-npm`) into unit 3
* Decisions made
    - Still L3. Pattern, not encyclopedia
    - No tests that spawn ProperDocs or grep workflow YAML
* Insights
    - The load-path contract is still the shipped-product TDD surface; the teaching pages are fixtures that contract tests assert on

## 2026-09-12 - PREFLIGHT - COMPLETE

* Work completed
    - Validated the replan against the existing Node test suite, NERV scoped initializers, docs tree, package contract, and release workflow
    - Struck document-content change-detector tests from the executable unit
    - Wrote `memory-bank/active/.preflight-status` with `FAIL (fixable)`
* Decisions made
    - The plan needs an explicit GitHub Pages deployment permission before build; planner replan is required
    - Resolver fixture tests remain the TDD surface; pages and workflow wiring are prose/policy artifacts
* Insights
    - The existing explicit workflow permissions map omits `pages: write`, so an `actions/deploy-pages` job cannot deploy without a permission addition

## 2026-09-12 - PLAN - COMPLETE (replan, pages permission)

* Work completed
    - Added job-scoped `pages: write` (plus `id-token: write` and `contents: read`) to the release Pages job in unit 3
    - Removed leftover references to struck docs-content tests
* Decisions made
    - Do not grant `pages: write` at the release-please workflow top level; only the Pages job needs it
* Insights
    - SLOBAC’s dedicated docs workflow can set `pages: write` globally; this repo’s release workflow cannot, because that map also covers release-please and npm publish

## 2026-09-12 - PREFLIGHT - COMPLETE

* Work completed
    - Ran L3 preflight checks against the replanned `tasks.md`, creative doc, and codebase reality (`src/nerv.js` scoped initializers, release workflow jobs/permissions, docs tree, package contract, README anchors)
    - Wrote `memory-bank/active/.preflight-status` (first line: `PASS WITH ADVISORY`)
* Decisions made
    - Plan is acceptable as-is for `/niko-build`; the earlier `FAIL (fixable)` permission gap is resolved by unit 3's job-scoped `pages: write`
    - Verified `NERV.initBarMeters(container)` accepts an element scope and `injectScanlines` appends to `document.body`, confirming both the scoped-init design and the no-`NERV.init()` rule
* Insights
    - Advisory (radical innovation): CDN mode could HEAD-verify the versioned jsDelivr URL with retry and throw, turning the documented jsDelivr-lag risk into a failed release job instead of a live 404 site; sketch recorded in `.preflight-status` for operator evaluation
    - Advisory: `.nerv-docs-island` spends the design-system `.nerv-` namespace on docs-only chrome — safe against Material collisions, but the prefix no longer exclusively means shipped product

## 2026-09-12 - BUILD - IN-PROGRESS

* Work completed
    - Left PREFLIGHT (PASS WITH ADVISORY)
    - Starting implementation of the replanned M4 dual-load site
* Decisions made
    - Follow `tasks.md` in order: resolver TDD, then ProperDocs/Using pages, Pages CI, README/techContext
    - Preflight jsDelivr HEAD/retry advisory stays out of this build
* Insights
    - CDN `nerv.js` is a stand-in script tag, so docs-init must wait for `window.NERV` rather than assuming a blocking load
