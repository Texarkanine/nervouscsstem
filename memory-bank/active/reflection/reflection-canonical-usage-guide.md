---
task_id: canonical-usage-guide
date: 2026-09-13
complexity_level: 3
---

# Reflection: Canonical usage guide

## Summary

The ProperDocs site is now the teaching surface for every design-system family: directory-driven nav, 19 catalog pages with constant filler and modifiers last, 13 renamed NGE stills, and five unthemed swatch boards. QA passed. `ref/` originals were left in place.

## Requirements vs Outcome

Delivered as specified. Catalog grain, skill lockstep (except `reading.md`), no `nav:`, CSS/JS in separate folders, five boards on Pages and absent from the skill, no new tests. Motion rename stayed on issue #12. Forbidden servings were not published. One small addition: `js/index.md` could not link `components/states.md` until that page existed (`docs:build --strict`); the link landed once the catalog page was written. No requirements dropped.

## Plan Accuracy

The seven-step sequence was right. Two sequencing notes:

- Step 3's `docs:build` gate listed folders in `.pages` that step 4 creates. Combining those two steps avoided a false-fail. The gate still ran before catalog volume.
- Step 1 assumed `docs-init.js` / `docs-islands.css` were untracked. They were already in git; the gitignore change was the real work.

Challenges that actually showed up matched the plan: `--strict` link checking, CDN-async boot on boards, skill copies after moves. The awesome-pages vs ProperDocs risk did not fire — 2.10.1 loaded. The preflight advisory (service-manual same-directory links) was the only mid-build surprise, and it had already been folded into step 4.7.

## Creative Phase Review

- **Docs tree (Option B):** Layered folders, `index.md` homes, one root `.pages`. Held up. Alphabetical inferred nav really would have put Components first; `.pages` was the justified exception. Two radar documents (timing essay vs usage islands) stayed distinct and cross-linked.
- **Swatch boards (Option A):** Committed HTML under `docs/boards/`. The probe was load-bearing: MkDocs copies non-markdown unaltered; listing boards as `extra_templates` is the failure mode. Build and QA both confirmed byte-identical `site/boards/` with no `md-header`. Dual-load `extra_css` does not apply to copied HTML; boards `<link>` their own CSS. CDN `nerv.js` is async; wrapping `NERV.init` / `initCartouches` for `nerv-docs:ready` was required and landed.

## Build & QA Observations

Build was prose-heavy and mechanical-clean: 370/370 tests, strict docs build twice. The hard part was volume and grain (constant filler, modifiers last), not tooling. QA ([QA](80453b45-8faf-40dc-ab20-86172e3aa380)) found no blockers. It confirmed the nine `data-nerv-init` kinds match catalog islands 1:1 and recorded one advisory (inline label layout in `forms.md`). Stylelint's 7 dist errors were pre-existing and out of this task.

## Cross-Phase Analysis

- Operator rejection of nav/board change-detectors (re-plan after blocking preflight) is why a later seventh board cannot fight a test. QA verified those contracts by review.
- Preflight's service-manual advisory, folded in-phase, was executed in build and did not become a `--strict` failure.
- Creative's board-probe saved the Option A/B question from becoming a build FAIL.
- The no-lockstep-test decision for `docs-init` kinds cost nothing this round (kinds matched usage). That is luck relative to a future island, not a reason to add the test.

## Insights

### Technical

- MkDocs copies extra HTML as-is. `extra_templates` Jinja-processes it and is the wrap failure. `extra_css` does not apply to those files; they must `<link>` dual-load paths. CDN `nerv.js` is async, so a bare `NERV.init()` at the bottom of a board races.
- `docs:build --strict` fails on markdown links to pages that do not exist yet. Write the target first, then the link.
- `mkdocs-awesome-pages-plugin` 2.10.1 loads under ProperDocs 1.6; the awesome-nav fallback was unused.

### Process

- Combining a `docs:build` gate with the folder-move step that creates the directories `.pages` names avoids a false-fail without skipping the gate.
- Folding a preflight advisory into the plan (service-manual links) worked: build did not rediscover it.
- Chrome files already tracked vs plan "untracked" is a planning-from-gitignore mistake: gitignore does not untrack. Check `git ls-files` before writing a "track this" step.
