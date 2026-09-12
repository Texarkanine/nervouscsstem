# Progress

Wire release-please, npm publish, and GitHub Release attachments for the built `dist/nerv.css` and `dist/nerv.js`.

**Complexity:** Level 3

## 2026-09-12 - COMPLEXITY-ANALYSIS - COMPLETE

* Work completed
    - Marked L4 milestone M1 complete and cleared its sub-run ephemerals
    - Classified first unchecked L4 milestone M2 as Level 3
    - Stubbed `tasks.md` for `nerv-v01-m2-release-please-npm-gh-assets`
    - Replaced this progress file (L4 parent and M1 history are stale for the sub-run)
* Decisions made
    - Decision tree: not a bug fix; not a small self-contained enhancement; complete publish feature requiring multiple components (package metadata, release-please, npm trusted-publish, GitHub Release assets) without architectural implications beyond the L4 design → L3
    - Matches the L4 advisory estimate
    - Parent `projectbrief.md` retained; M2 maps to requirements 4–6 and acceptance criterion 2
* Insights
    - Later milestones stay out of this sub-run: no offline-bundle note, ProperDocs site, or skill/`SKILL.md` extra-files work
    - Invariant 5 is load-bearing: M2 creates release-please and does not add a `SKILL.md` extra-file; M5 will extend extra-files later

## 2026-09-12 - PLAN - COMPLETE

* Work completed
    - Wrote the M2 implementation plan in `tasks.md`: one executable TDD unit (npm pack contract) plus release-please/Actions wiring and a short README
    - Mapped parent brief requirements 4–6 and acceptance criterion 2 onto concrete files
* Decisions made
    - Copy inquirerjs for `release-type: node`, OIDC publish (Node 24, `environment: npmjs.org`, `APP_ID` / `APP_PRIVATE_KEY`), doggo PR header
    - Add only `gh release upload` of `dist/nerv.css` and `dist/nerv.js`; do not copy codecov/`test:ci`
    - `package.json` version `0.0.1` + matching manifest so the first `feat:` on `main` is `0.1.0`
    - No `extra-files`; no creative phase
* Insights
    - AC2 is wiring, not a live first publish: npm OIDC cannot create a never-published package; operator bootstraps then attaches the trusted publisher
    - Same GitHub App is named `APP_ID`, `DOGGO_BOT_APP_ID`, and `HELPER_APP_ID` on sibling repos; this plan uses the inquirerjs names

## 2026-09-12 - PREFLIGHT - COMPLETE

* Work completed
    - Validated the M2 plan against the repository, local inquirerjs release-pipeline conventions, and Release Please's documented manifest-mode outputs
    - Wrote `.preflight-status` as `FAIL (blocking)`
* Decisions made
    - Build cannot start until the plan treats release-please and GitHub Actions configuration as executable behavior and schedules test-first coverage
* Insights
    - The existing pack-contract unit satisfies TDD, but it does not cover the release, publish, and release-asset workflow contract

## 2026-09-12 - PLAN - COMPLETE (replan)

* Work completed
    - Re-entered Plan after preflight FAIL (blocking)
    - Recorded the operator decision in `tasks.md`: no TDD unit for release-please/GitHub Actions; pack-contract tests unchanged
* Decisions made
    - Operator: we only test what we ship to customers as product. Own CI is not that, and this pipeline is not brittle or critical. The blocking TDD finding on unit 2 is discarded
    - Do not add YAML/JSON change-detectors while `.cursor-rules` updates always-tdd
* Insights
    - The first preflight was following the letter of always-tdd’s “workflow it runs” clause; the operator overrode that reading for this class of pipeline

## 2026-09-12 - PREFLIGHT - COMPLETE (re-run)

* Work completed
    - Re-validated the M2 plan against the repository, conventions, and dependency/conflict/completeness checks
    - Wrote `.preflight-status` as `PASS WITH ADVISORY`
* Decisions made
    - Honored the operator's 2026-09-12 binding directive: the discarded CI-TDD finding is not re-raised; no YAML/JSON change-detector was invented in its place
* Insights
    - All other checks (conventions, dependency impact, conflict detection, completeness) pass without changes to the plan
    - Advisory only: a `verify-cdn` post-publish smoke job would close the loop on the CDN path before later milestones depend on it live; not required for M2

## 2026-09-12 - OPERATOR - 0.0.1 then 0.1.0

* Work completed
    - Recorded the trusted-publish bootstrap sequence and the lockfile-amend decision in `tasks.md` / `activeContext.md`
* Decisions made
    - Operator publishes 0.0.1 by hand (CLI 2FA) from this branch; first CI/OIDC release is 0.1.0 via release-please after merge
    - This PR keeps `package.json` at 0.0.1; do not pre-bump to 0.1.0
    - No force-push amend on release-please PRs: dist is gitignored; node strategy already updates package-lock.json version fields
* Insights
    - Sibling amend workflows exist for *committed* generated artifacts that change with the version (e.g. inquirerjs demo GIFs). That is not this repo.
