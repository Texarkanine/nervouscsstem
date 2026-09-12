---
task_id: nerv-v01-m2-release-please-npm-gh-assets
date: 2026-09-12
complexity_level: 3
---

# Reflection: nerv-v01-m2-release-please-npm-gh-assets

## Summary

M2 wired a public `nervouscsstem` package at `0.0.1`, release-please on `main`, npm trusted-publish, and GitHub Release upload of `dist/nerv.css` and `dist/nerv.js`. It succeeded. The first live `0.1.0` still waits on merge plus the operator's hand-publish of `0.0.1`.

## Requirements vs Outcome

Parent-brief requirements 4–6 and acceptance criterion 2 are met as wiring: versions and GitHub Releases are driven by release-please, the two dist files are attached by `gh release upload`, and the npm `files` list is the jsDelivr path. Nothing from M3–M5 leaked in — no `extra-files`, no ProperDocs, no skill, no offline-bundle note. No requirement was dropped. The live first publish is intentionally not this milestone; that was in the plan.

## Plan Accuracy

The second plan's file list and order were right. Unit 1 (pack contract) was the only executable TDD unit; units 2 and 3 were prose/policy. Build followed that sequence without reordering. The challenges that actually mattered were the ones already in the plan: OIDC cannot create a never-published package, `dist/` must stay gitignored, and Niko `chore:` checkpoints will not open a release PR — hence the `feat(release)` commit. Nothing surprising showed up in implementation. The first plan was the inaccurate one: it treated GitHub Actions YAML as executable product and preflight blocked until the operator discarded that reading.

## Creative Phase Review

No creative phase ran. None was needed. The sibling (inquirerjs) already decided release-type, App token names, Node 24, and `environment: npmjs.org`. The remaining unknowns were operational (hand-publish `0.0.1`, then attach the trusted publisher), not design.

## Build & QA Observations

Unit 1 TDD behaved as written: red on `private: true` and empty `files`, then green after public metadata at `0.0.1`. Copying inquirerjs and deleting codecov / `test:ci` / `.nvmrc` from the release-please job was mechanical. QA passed with no substantive findings and 357/357 tests. `npm run lint` still fails on generated `dist/nerv.css` (Antonio quotes, `0px`); that predates this milestone and is not a publish-contract failure.

## Cross-Phase Analysis

The expensive miss was in the first Preflight, not Build. always-tdd's "workflow it runs" clause classified the Actions YAML as executable behavior. The operator's binding rule — test what this repo ships to consumers; own CI only when it is brittle or critical — made the second Preflight pass and let Build stay a pack contract plus copied YAML. If that override had not happened, Build would have grown YAML/JSON change-detectors that fire on intended edits. QA then had little to catch because the only shipped-product contract was already tested. Preflight's `verify-cdn` advisory was correctly left unapplied; M4 will be the first consumer of the live URL.

## Insights

### Technical

- When `dist/` is gitignored, do not copy sibling release-please "amend the RP branch" jobs. `release-type: node` already rewrites `package-lock.json` version fields. An amend job here would be for a problem this repo does not have.
- The trusted publisher is pinned to workflow filename `release-please.yaml` and GitHub environment `npmjs.org`. Those two strings are the OIDC contract, not comments.

### Process

- This repo's TDD bar is the shipped artifact, not the pipeline that publishes it. The first M2 preflight and the first M1 plan both failed the same way: they tested files the customer never receives. After two milestones, that is the pattern to stop repeating.
- L3 Preflight on an L4 sub-run will keep trying to TDD CI unless the plan states the operator binding up front. Say it in the test plan before the first preflight, not after the FAIL.
