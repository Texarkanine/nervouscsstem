# Progress

Fill out the documentation site as a canonical usage catalog for every design-system capability ([issue #9](https://github.com/Texarkanine/nervouscsstem/issues/9)): directory-driven nav, live-example pages with constant filler and modifier classes, renamed NGE stills, and five docs-only swatch boards. Motion rename is [issue #12](https://github.com/Texarkanine/nervouscsstem/issues/12).

**Complexity:** Level 3

## 2026-09-13 - COMPLEXITY-ANALYSIS - COMPLETE

* Work completed
    - Restated and confirmed intent for issue #9 plus session constraints (page grain, modifier pedagogy, stills, directory nav, swatch boards vs servings).
    - Filed issue #12 for flicker/pulse investigation; left that work out of this task.
    - Classified as Level 3.
* Decisions made
    - Swatch boards: `ref-foundation`, `ref-lists`, `ref-tables`, `ref-forms`, `ref-effects` only. Servings stay in `ref/` unpublished.
    - Boards live in repo docs / GitHub Pages, not the skill.
    - Document current motion class names; do not redesign `_flicker.scss` here.
    - Level 3 rather than L4: one feature with creative-phase open questions (folder tree, HTML hosting, still mapping), not separate product subsystems.
* Insights
    - Catalog pages and swatch boards are different tools. Isolation teaches the palette; the existing labeled HTML is the combination view.
    - Canonical docs freeze names. Issue #12 exists so the effects page is not written twice.

## 2026-09-13 - CREATIVE - COMPLETE (docs tree)

* Work completed
    - Architecture creative for folder tree and catalog map.
* Decisions made
    - Option B: `visual-language/`, `css/`, `js/`, `components/` with `index.md` homes; root `docs/.pages`; markdown not in asset dirs.
    - Two radar docs: timing essay stays under visual-language; usage islands go under components.
    - Track `docs-init.js` / `docs-islands.css`; gitignore only `nerv.css` / `nerv.js` in those dirs.
* Insights
    - Alphabetical inferred nav would put Components first; that is the legitimate `.pages` exception.

## 2026-09-13 - CREATIVE - COMPLETE (swatch boards)

* Work completed
    - Generic creative for publishing the five swatch HTML files.
* Decisions made
    - Committed `docs/boards/*.html` adapted from `ref/` (not a post-build dump, not iframes).
    - Asset paths go through dual-load `stylesheets/nerv.css` and `javascripts/nerv.js`.
    - `NERV.init` on boards is allowed; wrap boot for the CDN async stub.
    - `ref/` remains the CSS visual fixture; boards may drift and that is accepted with a source comment.
* Insights
    - `extra_css` does not apply to copied HTML. CDN `nerv.js` is async; bare `NERV.init()` at the bottom of a board will race.

## 2026-09-13 - CREATIVE - UPDATED (swatch boards, operator interrupt)

* Work completed
    - Operator required full black-void HTML outside Material. Probe: `docs/boards/_probe.html` → `site/boards/_probe.html` byte-identical, no `md-header`. Markdown pages still wrap.
* Decisions made
    - Keep Option A. Option B only if `.html` starts getting themed (including via `extra_templates`).
* Insights
    - MkDocs copies non-markdown unaltered. The wrap risk is treating boards as templates or markdown, not putting them under `docs/boards/`.

## 2026-09-13 - PLAN - COMPLETE

* Work completed
    - Level 3 plan written to `memory-bank/active/tasks.md`.
* Decisions made
    - TDD surface: chrome files, void board HTML, skill has no HTML, `data-nerv-init` kinds lockstep. Catalog markdown is prose/policy.
    - awesome-pages is the only new docs dependency; validate on `docs:build` before writing catalog pages.

## 2026-09-13 - PREFLIGHT - COMPLETE (FAIL (blocking))

* Work completed
    - Validated the Level 3 plan, creative decisions, current docs configuration, test runner, and relevant contracts.
* Decisions made
    - Build must not begin until the planner adds test-first coverage for the public navigation/configuration behavior and ensures planned new test files are executed by the full test command.
* Insights
    - `npm run docs:build` verifies buildability but does not verify the required navigation behavior.
    - `npm test` currently enumerates test files explicitly, so newly proposed suites are silently excluded unless the plan changes the command or reuses listed suites.

## 2026-09-13 - PLAN - COMPLETE (rework after blocking preflight)

* Work completed
    - Rewrote the implementation plan as prose/policy only. Removed new test files, npm test list changes, nav/output assertions, board HTML contracts, and `data-nerv-init` lockstep.
* Decisions made
    - Operator: boards and sidebar are visual/design-time prose. A later seventh board or rename must not fight a test. ProperDocs extra-HTML copy is vendor behavior already probed.
    - Operator deletes `ref/` originals; this ticket does not.
    - Existing `skill-contract` and `docs-assets` stay unchanged. Gitignore/docs chrome is always-tdd out of scope.
* Insights
    - Preflight's blocking item (test built nav) and its advisory (catalog manifest) are the same class of change-detector. Operator rejected both.

## 2026-09-13 - PREFLIGHT - COMPLETE (PASS WITH ADVISORY)

* Work completed
    - Re-validated the reworked, all-prose Level 3 plan against `always-tdd`, codebase reality (`properdocs.yml`, `.gitignore`, `package.json` test list, existing tests, `docs/` tree, `src/*.scss` partials), and the two creative decisions.
    - Confirmed both prior blocking/fixable findings (untested nav/output, missing test files in `npm test`'s explicit list, mislabeled red/green step) no longer apply now that all new test files were removed from the plan.
    - Verified step 5's 19-page catalog is an exact 1:1 map to every `src/_*.scss` component partial — no orphan, no invented page.
* Decisions made
    - First line of `.preflight-status` is `PASS WITH ADVISORY`; the plan is a valid build gate as written.
* Insights
    - Found one real, unaddressed cross-reference: `service-manual.md` links to the three visual-language files by same-directory relative path and is not updated when they move into `visual-language/`. Self-caught by the plan's own `docs:build --strict` gate, so recorded as advisory rather than blocking, with a one-line fix recommended for step 4.
    - `docs-init.js`'s new dispatch branches are executable behavior, not content-lockstep; not a new gap since the existing `bar-meters` branch is already untested by the same convention.

## 2026-09-13 - PREFLIGHT ADVISORY - FOLDED

* Work completed
    - Added step 4.7: retarget `service-manual.md` links after the visual-language move.
* Decisions made
    - In-phase advisory fold-in only. Did not adopt the catalog-manifest idea.
    - Build waits for `/niko-build`.


