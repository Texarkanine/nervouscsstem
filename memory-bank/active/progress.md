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
