# Progress

Stand up a v0.1 release pipeline: SumMem + Niko root bootstrap, release-please with CSS/JS on GitHub Releases and npm/CDN, ProperDocs site with dual load paths and two live-example pages, an installable placeholder skill that carries the docs, and a written feasibility answer on offline font+JS bundling.

**Complexity:** Level 4

## 2026-09-12 - COMPLEXITY-ANALYSIS - COMPLETE

* Work completed
    - Classified the approved intent as Level 4
    - Wrote `projectbrief.md`, stubbed `tasks.md`, opened this progress file
* Decisions made
    - Decision tree: not a bug fix; not a small self-contained enhancement; complete feature requiring multiple components; architectural implications (publish surface, docs load paths, skill packaging) → L4
* Insights
    - Offline bundles stay investigate-only so they do not inflate a wiring milestone into a licensing project

## 2026-09-12 - PLAN - COMPLETE

* Work completed
    - Decomposed the brief into 5 independently deliverable milestones
    - Wrote `memory-bank/active/milestones.md` with invariants, dependency graph, and advisory L1–L3 estimates
* Decisions made
    - M1 first: operator asked to install SumMem and the Niko bootstrap before the rest
    - M2 before M4: the docs CDN URL is npm → jsDelivr; the package name and publish path must exist before the site can load released assets
    - M3 is a written feasibility note only, and has no graph edges, so a licensing rabbit hole cannot block the pipeline
    - M5 after M4: the skill carries the docs site; it must not invent a second authoring tree
    - Follow SumMem + inquirerjs-checkbox-search for release-please; follow slobac for skill-install wiring without relocating `docs/`
* Insights
    - inquirerjs-checkbox-search already publishes to npm on release; this repo also needs GitHub Release asset upload for the CSS/JS files, which that sibling does not do
    - slobac builds ProperDocs from inside the skill; this L4 forbids that relocation, so M5 must carry docs by copy or inclusion, not by moving `docs_dir`
