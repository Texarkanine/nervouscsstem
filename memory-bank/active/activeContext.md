# Active Context

## Current Task: nerv-v01-m2-release-please-npm-gh-assets
**Phase:** PLAN - COMPLETE

## What Was Done

- Replanned after preflight FAIL (blocking) on CI TDD
- Operator 2026-09-12: test only what we ship to customers as product; own CI does not get that TDD cycle unless brittle or critical; this pipeline is not one of those times. Discard that preflight finding. always-tdd wording is being fixed in `.cursor-rules`
- Implementation units unchanged: unit 1 stays the npm pack contract (executable); unit 2 stays release-please/Actions wiring (prose/policy); unit 3 README (prose/policy)

## Next Step

- Spawn Preflight; the CI-TDD blocking finding is discarded
