---
task_id: canonical-usage-guide
complexity_level: 3
date: 2026-09-23
status: completed
---

# TASK ARCHIVE: Canonical usage guide

## SUMMARY

The ProperDocs site is now the teaching surface for every NERV design-system family ([issue #9](https://github.com/Texarkanine/nervouscsstem/issues/9), [PR #13](https://github.com/Texarkanine/nervouscsstem/pull/13)). Navigation comes from the `docs/` directory tree. The component catalog lives under `docs/components/css/` in four layers (core, structure, atoms, heavies), plus `docs/components/javascript/` for families that have a JS hook. Every catalog example is a live island followed by a copyable fence of the same markup. The site also has 13 renamed NGE stills and five unthemed swatch boards. `skills/nerv/` is a placeholder `SKILL.md` and no longer carries a copied docs tree. Radar polar and Cartesian blip geometry was corrected in product CSS/JS. The motion-class rename stayed out ([issue #12](https://github.com/Texarkanine/nervouscsstem/issues/12)). `ref/` originals are untouched; the operator deletes them.

## REQUIREMENTS

User story: as a web developer using NERV, learn what each element is, how to mark it up, and which styling interactions (color, fill, outline, glow) it supports, without opening `ref/*.html`.

- Teach every capability currently shown in `ref/*.html` on the docs site.
- Keep the live-example pattern: preview island, then spec, then HTML. Docs chrome never calls `NERV.init()`; islands use scoped `NERV.init*` only.
- Variants of one component share a page. Surrounding filler is held constant. Empty components get invented filler.
- Introduce each component without color, fill, outline, or glow where possible. Modifiers go at the bottom, one example per modifier class.
- Pages are canonical usage, not suggested servings (panels/patterns/components/alert-cascade compositions are the anti-pattern).
- Rename NGE stills that illustrate a catalogued component. Section order: name → still → island → spec + HTML → detail. Keep taxonomy links resolving.
- Drop `nav:` from `properdocs.yml`. The directory tree drives nav. CSS and JS docs are separate folders. Use `.pages` only where the tree cannot order things. Section homes are `index.md`.
- Publish five swatch boards (foundation, lists, tables, forms, effects) on Pages, linked from the bottom of the matching catalog page. Keep them out of the skill.
- Catalog markdown lives only under `docs/`. No second copy in the skill.
- No new tests: boards, sidebar order, and `not_in_nav` are design-time choices.
- Constraints: do not publish panels/patterns/components/alert-cascade boards. No new idea boards. Motion rename is #12. Stills stay Git LFS under `docs/img/**`. Product rules unchanged: `.nerv-` prefix, no canvas, no image files, `prefers-reduced-motion` / `prefers-contrast` respected.

## IMPLEMENTATION

### Docs tree (creative decision)

Three options were weighed:

- **A: Flat** — taxonomy at the root, plus `css/`, `js/`, and `components/`. Inferred nav interleaves unrelated pages.
- **B: Layered folders** — `index.md` homes plus one root `.pages`.
- **C: Numbered folder prefixes** — orders the sidebar without a plugin, but the numbers stay in every URL forever.

**B was selected.** The fitness and maintainability of layered folders outweighed A's fewer file moves, and C would bake numbering into URLs.

Alphabetical inferred nav would put Components first, which justified the single root `.pages` exception. Doc folders must not collide with the dual-load asset dirs (`docs/stylesheets/`, `docs/javascripts/`).

The operator then corrected the IA three times:

1. **Flatten.** A nested `components/css` + `components/js` alongside top-level `css/` and `js/` was the same split twice, so it was briefly flattened.
2. **Two trees only.** The final shape is `components/css` and `components/javascript` and nothing else. Tokens, type, and glow sit on the CSS home; the `NERV` method table sits on the JavaScript home. Dual families get a page in both trees. There are no nested `.pages`, and page bodies do not repeat the sidebar TOC.
3. **Four CSS layers:**
   - `core` retints any page: colors (gradients folded in), typography, effects, alert cascade.
   - `structure` is regions: panels (dividers folded in), MAGI, grid marks, and similar.
   - `atoms` are one-job instruments.
   - `heavies` are named wholes of higher atomic weight: radar, reticles, and the JS-only data background.

"Heavies" replaced "flourishes": "delete it and the console still reads" was the wrong test, because radar with live blips is load-bearing. JS mirrors a leaf only when that family has a hook.

### Swatch boards (creative decision)

Three options were weighed:

- **A:** Commit adapted HTML under `docs/boards/`.
- **B:** Dump the HTML into `site/` after the build.
- **C:** Embed the boards in markdown pages with an iframe.

**A was selected.** A probe showed that `docs/boards/_probe.html` is copied byte-identical into `site/`, with no Material `md-header`; markdown pages are still wrapped. MkDocs copies non-markdown files unaltered. Listing boards in `extra_templates` would Jinja-process them into Material, and that is the failure mode that would force B.

Each board adaptation does three things:

- It `<link>`s `../stylesheets/nerv.css` itself, because `extra_css` is not injected into copied HTML.
- It wraps `NERV.init` / `initCartouches` to run when `window.NERV` exists or on `nerv-docs:ready`, because CDN `nerv.js` loads async.
- It carries a comment pointing at its `ref/` source.

Drift between `ref/` and `docs/boards/` is accepted.

### Build steps (plan, as executed)

1. **Gitignore:** removed the directory-wide ignores on the docs asset dirs; only `nerv.css` / `nerv.js` there stay ignored. `docs-init.js` / `docs-islands.css` were already tracked.
2. **Boards:** five boards in `docs/boards/` with dual-load paths and the wrapped boot.
3. **Nav:** dropped `nav:`, added `navigation.indexes`, `mkdocs-awesome-pages-plugin` (2.10.1 loads under ProperDocs 1.6), root `docs/.pages`, and `not_in_nav` for `reading.md` and `boards/**`. Relocked `uv.lock` PyPI-only.
4. **Moves and homes:** visual-language essays moved into `docs/visual-language/` with `../img/` fixes; section homes added; `service-manual.md` links retargeted (preflight advisory, folded into the plan in-phase).
5. **Catalog pages:** one per family, mapped 1:1 to the `src/_*.scss` partials. Later reorganized into the layers above.
6. **`docs-init.js`:** `data-nerv-init` kinds for bar-meters, cartouches, hex, magi, radar, label-box, data-bg, ghost-segments, and grid-labels. Each calls the scoped `NERV.init*(island)`.
7. **Stills:** 13 LFS stills renamed after their component, with taxonomy links retargeted.

### Post-reflect work

- **Skill:** reduced to a placeholder `SKILL.md`. The markdown copy and its copy-identity test were deleted as a prose pin.
- **Radar geometry (product CSS/JS, TDD in `test/patterns.test.mjs`):**
  - Polar orbit is `calc(50cqmin - 0.9rem)` on the blip (`.nerv-radar` is `container-type: size`), not `50%` inside `transform` (that `%` is the label box).
  - `transform-origin` is the phosphor, and the blip counter-rotates so labels stay screen-upright.
  - Cartesian `top` / `left` is the phosphor. `NERV.layoutRadarBlips` bears from `transform-origin`, not the flex-box center.
  - Label-below and label-above center on the phosphor.
- **Radar docs:** usage moved out of `visual-language/radar.md` into the CSS and JS radar catalog pages. The visual-language page keeps only the timing rationale, which is mostly CSS lockstep, not a JS concern.
- **PR #13 review fixes:**
  - README now matches the placeholder skill and the catalog.
  - The nonexistent `.nerv-radar-blip-label-right` was dropped from the docs.
  - The colors swatch link moved after the gradients.
  - Every catalog fence now reproduces its island's inner HTML verbatim, and every JS recipe `querySelector`s a class present in that markup. This fixed the hex `getElementById('hex')` no-op, plus six other pages that referenced ids the fence never defined. Scanlines stays fence-only because it is a viewport overlay.
  - LlamaPReview's `container-type` concern was dismissed: `.nerv-radar` already declares it.

Key files: `properdocs.yml`, `docs/.pages`, `docs/components/**`, `docs/boards/*.html`, `docs/visual-language/*`, `docs/javascripts/docs-init.js`, `docs/stylesheets/docs-islands.css`, `src/_radar.scss`, `src/nerv.js`, `test/patterns.test.mjs`, `README.md`, `skills/nerv/SKILL.md`.

## TESTING

- **Preflight, first pass:** FAIL (blocking) because the plan had no tests for nav/config and its new test files were not in `npm test`'s explicit list. The operator rejected those as change-detectors, so the plan was reworked as prose/policy.
- **Preflight, second pass:** PASS WITH ADVISORY. The service-manual links were folded into step 4.7.
- **QA:** PASS (2026-09-13). It verified:
  - The nav config.
  - The five boards: byte-identical in `site/`, with dual-load paths and the wrapped boot.
  - `docs-init` kinds 1:1 with island usage.
  - Catalog grain on sampled pages.
  - 13 stills renamed and retargeted.
  - `ref/` intact.

  One advisory: inline label layout in the `forms.md` checkbox/radio island, accepted as docs filler.
- **Radar geometry:** the placement contract is locked in `test/patterns.test.mjs`.
- **Island/fence audit** (a script over `docs/components/**`): 133 island/fence pairs match exactly. One example is fence-only (scanlines). No script selector points at markup missing from its fence. Browser-checked pages: JS hex flicker, CSS hex states, colors swatch position, the CSS radar islands, and the JS landing bar meter (40 bars, 29 active).
- **Final gates:** `npm test` 373/373 and `npm run docs:build --strict` pass.

## LESSONS LEARNED

- MkDocs copies non-markdown files as-is. `extra_templates` is the path that wraps them. `extra_css` / `extra_javascript` do not reach copied HTML, so boards must link their own assets and wait for async CDN `nerv.js`.
- `docs:build --strict` fails on links to pages that do not exist yet. Write the target before the link.
- Gitignore does not untrack files. Check `git ls-files` before planning a "track this" step.
- Hand-maintaining an island and its fence drifts. Abbreviated fences (`…`), missing wrappers, and `getElementById` against ids the fence never defines all shipped. The fence has to be the island's markup verbatim.
- `cqmin` resolves against the nearest size container, and a `%` inside `transform` is relative to the element's own box. Radar orbit length belongs on the blip, with the disc as the container.
- IA names need the right test. "Heavies" (higher atomic weight, still elements) fit; "flourishes" implied the pieces were optional.

## PROCESS IMPROVEMENTS

- A reviewer that cannot see a load-bearing declaration (LlamaPReview on `container-type`) should be answered with evidence from the PR head, not with a speculative one-line fix.
- Combining a `docs:build` gate with the step that creates the directories `.pages` names avoids a false failure without skipping the gate.
- Folding a preflight advisory into the plan in-phase worked; build did not rediscover it.
- Post-reflect IA iteration was long. For catalog tasks, get the operator to sign off on layer names and the inclusion test before writing the volume of pages.

## TECHNICAL IMPROVEMENTS

- Generate each island and its highlighted fence from one fence body with a `pymdownx.superfences` custom formatter at build time, so drift is impossible. Island chrome would come from fence options. Not client-side injection: CSS islands must paint with JS off. Tracked as [issue #14](https://github.com/Texarkanine/nervouscsstem/issues/14).

## NEXT STEPS

- Merge [PR #13](https://github.com/Texarkanine/nervouscsstem/pull/13).
- Operator deletes the `ref/` originals when ready.
- [Issue #12](https://github.com/Texarkanine/nervouscsstem/issues/12) (motion rename) and [issue #14](https://github.com/Texarkanine/nervouscsstem/issues/14) (single-source islands) remain open.
