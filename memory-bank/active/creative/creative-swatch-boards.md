# Decision: Swatch board publication

## Context

**What**: How the five swatch HTML files (`ref-foundation`, `ref-lists`, `ref-tables`, `ref-forms`, `ref-effects`) appear on GitHub Pages as visual-inspiration boards, with working `nerv.css` / `nerv.js`, without Material chrome, without entering the skill, and without becoming sidebar pages.

**Why it matters**: Catalog islands cannot show “all major combinations.” If the boards are wrapped in Material or fail to load CSS on Pages, they stop being swatches. If they ship in the skill, installers get HTML that cannot load LFS stills or the Pages dual-load paths.

**Constraints**
- Repo `docs/` / Pages only. Not `skills/nerv/`.
- Only those five files. Servings stay in `ref/`.
- GitHub Pages serves whatever is in `site/` after `properdocs build` (Actions already uploads `path: site`).
- Material pages must not call `NERV.init()`. Standalone boards may, because they *are* a NERV viewport.
- Dual-load: local `docs/javascripts/nerv.js` is the real file; CDN mode is an async jsDelivr stub that fires `nerv-docs:ready`.
- `resolve-docs-assets` must not modify `ref/` or `src/` (existing test).
- Skill copy-identity is markdown-only; HTML in `docs/` is not copied today and must stay that way.

## Options Evaluated

- **A — Committed HTML under `docs/boards/`**: Adapt the five files (asset URLs → `../stylesheets/nerv.css` and `../javascripts/nerv.js`; boot `NERV` after `nerv-docs:ready`). MkDocs copies them into `site/boards/`. `not_in_nav` / no markdown means they stay off the sidebar. `ref/` stays the developer fixture.
- **B — Build-time copy from `ref/` into `site/boards/`**: A script after `properdocs build` rewrites and dumps HTML into `site/`. Single source in `ref/`. `docs/boards/` is generated or absent. Depends on a hook the operator sketched (“dump into site and Actions will serve it”).
- **C — Extra MkDocs pages with an iframe**: Markdown catalog pages embed the board. Material chrome still surrounds the iframe; skill would copy the markdown (fine) but iframe targets must exist on Pages. Extra wrapping, not a swatch.

Existing pattern: ProperDocs copies extra HTML as-is (M4 learned markdown islands are Material-wrapped; standalone HTML is the other path). Option A is that path. Option B is the Actions dump. C fights the “not a suggested serving / not Material” constraint.

## Analysis

| Criterion | A Committed boards | B Post-build dump | C iframe |
|-----------|--------------------|-------------------|----------|
| Pages actually serves HTML | Yes, copied into `site/` | Yes, if the script runs in `docs:build` and `publish-pages` | Yes, if targets exist |
| Material chrome | None on the HTML URL | None | Chrome around the iframe |
| Skill | HTML not copied | HTML not in `docs/` | Markdown copies; iframe 404 in skill |
| Dual-load | Same relative URLs as extra_css | Rewrite at dump time; CDN stub race still exists | Same as A plus iframe quirks |
| Drift | Two HTML copies (`ref/` vs `docs/boards/`) | One source | N/A |
| Consistency with M4 | Matches “standalone HTML extra files” | Extra hook; `docs:serve` must run it too | Fights isolation pedagogy |

Key insights:
- `extra_css` is **not** injected into copied HTML. Boards must `<link>` `../stylesheets/nerv.css`. The CDN stand-in is an `@import` of jsDelivr, so that relative link still works on Pages.
- CDN `nerv.js` is async. Bare `NERV.init()` at the bottom of `ref-lists.html` will race. Every board that calls `NERV` must boot on `window.NERV` or `nerv-docs:ready`.
- Option B’s “one source” is nicer until `docs:serve` forgets the dump and local preview 404s. A committed file in `docs/` previews with ordinary `properdocs serve`.
- Drift is real. Mitigate with a one-line comment in each board pointing at the `ref/` original, and do not “improve” boards into new compositions — they stay the labeled swatches.

## Decision

**Selected**: Option A — committed adapted HTML in `docs/boards/`.
**Rationale**: Simplest path that GitHub Pages already publishes (`site/` is the artifact), matches the M4 standalone-HTML lesson, and works on `docs:serve` without a second pipeline. Skill stays markdown-only.
**Tradeoff**: `ref/` and `docs/boards/` can drift. Accept that: `ref/` remains visual QA for the CSS product; boards are the published inspiration URLs with Pages asset paths.

## Implementation Notes

- Add `docs/boards/{foundation,lists,tables,forms,effects}.html` copied from the matching `ref/ref-*.html`.
- Replace `../dist/nerv.css` with `../stylesheets/nerv.css` and `../dist/nerv.js` (if present) with `../javascripts/nerv.js`.
- Replace immediate `NERV.init()` / `NERV.initCartouches()` with a boot that runs now or on `nerv-docs:ready`.
- Leave scanline injection on boards that already call `NERV.init()` — that is the point of a full-page swatch.
- `properdocs.yml`: `not_in_nav` for `reading.md` and `boards/**` (and `img/**` if inferred nav ever picks it up).
- Catalog pages link the matching board at the bottom: “Swatch board” → `/boards/lists.html` (site-relative via markdown link to the HTML file).
- Do not list boards as `extra_templates` (that would Jinja-process them).
- Do not add HTML copies under `skills/nerv/`.
- Do not delete the `ref/` originals.
- Optional later (not this ticket): equivalent boards for remaining components.
