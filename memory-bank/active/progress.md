# Progress

Add a ProperDocs GitHub Pages site from existing `docs/` plus CSS-only and JS example pages that load CDN assets on release and `dist/` locally, erroring if local bundles are missing.

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
