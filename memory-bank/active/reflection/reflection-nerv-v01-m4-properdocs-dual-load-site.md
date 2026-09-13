---
task_id: nerv-v01-m4-properdocs-dual-load-site
date: 2026-09-12
complexity_level: 3
---

# Reflection: nerv-v01-m4-properdocs-dual-load-site

## Summary

M4 added a ProperDocs Material site from existing `docs/`, with Using pages that embed live examples (preview, spec, code) and a dual-load resolver so local builds copy `dist/` or throw and release Pages writes jsDelivr stand-ins. It succeeded. Live Pages still waits on the operator enabling GitHub Pages (Actions source) once.

## Requirements vs Outcome

Parent-brief requirements 8–12, acceptance criteria 3–5, and use-cases 3–4 are met as wiring: the site keeps `docs/` as authoring SoT, Using pages carry CSS-only islands plus one scoped-JS page, local mode errors when `dist/` is missing, and the release job deploys after `publish-npm`. Nothing from M5 leaked in — no skill, no extra-files, no vendored fonts. No requirement was dropped. The operator restated AC4 during replan (CSS islands must not need `nerv.js`; Material chrome may use JS); the build matches that restatement, not the original whole-page-with-JS-disabled reading. Pages is not yet live; that enable step was in the plan as operator work.

## Plan Accuracy

The replanned file list and unit split were right. Unit 1 (resolver) was the only TDD surface; units 2–4 were prose/policy. Build followed that order. The challenges that actually mattered were the ones already named: `NERV.init()` painting scanlines on `body`, jsDelivr lag after publish, LFS on docs checkouts, `--strict` vs the `../.gitattributes` link, and job-scoped `pages: write` because the release workflow's top-level map cannot grow that permission. The one miss in the plan's implementation notes was "docs-init on DOMContentLoaded calls `initBarMeters`." Material defers `extra_javascript`, so a CDN stand-in that inserts a script does not run before `docs-init.js`. That was a recoverable API misunderstanding, not a plan deficiency.

## Creative Phase Review

Two creatives ran. The first (standalone HTML extra pages, Option D) was the wrong hosting model; the operator rejected it before build. The second (`creative-embedded-docs-examples.md`, Option C: inline islands plus `extra_css` / `extra_javascript`) is what shipped, and it held: one `properdocs.yml`, `@import` stand-ins because `extra_css` is relative to `docs_dir`, scoped `initBarMeters(island)`, no `NERV.init()` on docs pages. Friction was the deferred-script ready race, which the creative's "stub that inserts a script" implied but did not name. The mega-unknown should have been "where do the examples live," not "how do two HTML files rewrite after the SSG."

## Build & QA Observations

Resolver TDD behaved as written: red on the empty stub, green on copy-or-throw and CDN stand-ins. ProperDocs `--strict` passed in both modes on the first try after the blob-URL fix. Browser verification showed CSS and Panels islands without JS init, bar meters at 120 bars / 66 active, and no `.nerv-scanlines`. QA passed with no substantive findings. `npm run lint` still fails on generated `dist/nerv.css` (Antonio quotes, `0px`); that predates this milestone. The only build deviation — wait for `window.NERV` / `nerv-docs:ready` — is the deferred-load fix, documented in active context.

## Cross-Phase Analysis

The expensive miss was the first Creative, not Build. Standalone HTML satisfied the original AC4 reading and a ProperDocs spike, then the operator said the examples have to teach from inside the site. Replan was the right response; building Option D would have been the waste. Preflight then caught the one remaining plan hole (`pages: write` absent from the release workflow) as `FAIL (fixable)` and the second preflight passed with the jsDelivr HEAD-verify idea left as advisory. QA had little to catch because the shipped load-path was already tested and the teaching pages were fixtures, not a second contract. The HEAD-verify advisory is still the live risk: `needs: publish-npm` orders jobs, it does not make jsDelivr serve.

## Insights

### Technical

- Material `extra_javascript` is deferred. A CDN stand-in that inserts a script tag does not run before the next extra script. Docs init must see `window.NERV` or wait on a ready event. Do not assume `DOMContentLoaded` means the design-system global exists.
- `extra_css` paths are relative to `docs_dir`. A jsDelivr URL cannot go in `properdocs.yml` without a second config. An `@import` stand-in at the gitignored extra_css path keeps one YAML file and still loads CSS without JS.

### Process

- Hosting model is an operator call, not a spike leftover. If the first creative had asked "in the site or beside it" instead of solving dual-load around standalone HTML, the replan would not have been needed.
- The TDD bar held for a third milestone: test the load-path module; do not TDD Actions YAML or Using-page markdown. Preflight's strike of document-content change-detectors was the right enforcement of that bar.
