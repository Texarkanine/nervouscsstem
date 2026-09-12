# Active Context

## Current Task: nerv-v01-release-pipeline
**Phase:** PLAN - COMPLETE

## What Was Done

- Replanned after blocking preflight. Operator: L4 preflight judges L4 design, not each checklist item as an L2/L3 run. That is a Niko bug.
- Kept the same 5 milestones. Added L4-level invariant: M2 creates release-please; M5 only adds the `SKILL.md` extra-files entry.
- Did not add per-milestone TDD steps or file-level implementation paths.

## Next Step

- Operator reviews the milestone list. `/niko` starts M1. Do not re-run L4 preflight until the Niko bug is fixed.
