# Tasks: NERV Design System — Future Features Buildout

## Preflight Findings

### Passed Checks
- **Convention compliance**: All milestones propose changes consistent with `.nerv-` prefix, `_name.scss` partials, `@forward` pattern in `nerv.scss`
- **No conflicts**: No existing form, list, or table styles in the codebase — clean slate for M5, M6, M7
- **Completeness**: All 9 items from `planning/FUTURE.md` are covered across 8 milestones
- **Independence**: All milestones are independently deliverable with no cross-dependencies
- **Milestone quality**: All meet L4 milestone criteria (independently deliverable, L1-L3 scoped, concrete, non-overlapping)

### Advisory Items
1. **Reference page strategy**: Each milestone should decide whether to add sections to existing `ref-components.html` or create new reference pages. Recommend: extend `ref-components.html` for M1-M4 (small additions); create new pages for M5-M7 if content is substantial.
2. **Geometric primitives**: M4 (reticle), M5 (lists), M7 (tables) all involve angled/geometric CSS shapes. If shared patterns emerge during sub-runs, a post-hoc refactoring to extract shared mixins may be valuable — but not worth adding a milestone for upfront.
3. **Radar pulse JS boundary**: M8 may need `nerv.js` additions (currently no radar JS exists). The milestone description captures this, but sub-run planning should explicitly scope the JS API surface.
