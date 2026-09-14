# Active Context

## Current Task: Canonical usage guide
**Phase:** POST-REFLECT - catalog layers accepted

## What Was Done
- Catalog is `docs/` only. Skill is placeholder `SKILL.md`. Nested `.pages` are not used. Root `docs/.pages` only.
- Polar radar: orbit is `50cqmin` on the blip; phosphor is transform-origin; polar counter-rotates so labels stay upright. Cartesian `top`/`left` is the phosphor. Label-below/above center the caption. `layoutRadarBlips` bears from `transform-origin`.
- Catalog layers accepted: **core / structure / atoms / heavies**. Dividers fold into panels. Gradients fold into colors. MAGI and grid-marks stay structure siblings. JS mirrors only when a leaf has a hook. Fourth layer is **heavies** (not flourishes): named wholes of higher atomic weight; radar is a status surface.

## Next Step
- Implement the nested catalog folders (`css/{core,structure,atoms,heavies}`, matching JS leaves). Then `docs:build --strict` / `npm test`. `/niko-archive` after the operator is satisfied.
