# Active Context

## Current Task: sine-wave-graph rework — point labels (PR #18)
**Phase:** QA - COMPLETE (FAIL)

## What Was Done
- Rework initiated from PR #18 human feedback (labels on points; PR screenshots). Re-classified Level 2: one sub-feature on one component.
- Operator gate decisions (pre-authorized):
    - Placement: right of the dot by default; `.nerv-wave-point-label-left` is the only other placement.
    - Clipping: the label `translate` is `clamp()`ed against the wave box using the point's own hoisted `--nerv-wave-point-x/y`. Labels never leave the box; at extremes they slide inward and may cross their dot. Proven in Chromium + Firefox before planning.
    - No collision avoidance (human norm); SumMem note during build.

- Preflight PASS WITH ADVISORY. Gate decisions: vertical point rule redefines only x/y (base rule owns left/top; L1 matches); `-left` overrides only internal `--nerv-wave-point-label-shift` so the clamp exists once; docs tell script authors to keep `aria-label` in sync (`role="img"` hides child text); `GIT_LFS_SKIP_SMUDGE=1` for the pr-assets clone; CSS `counter()` live readouts = follow-up idea, not built.

- Build (commits `26c52df` feat, `94489a9` SumMem):
    - /home/mobaxterm/.cursor/worktrees/nervouscsstem-issue-8/src/_wave-graph.scss: `--nerv-wave-point-x/-y` hoisted on `.nerv-wave-point` (vertical redefines only these); `.nerv-wave-point-label` (absolute at dot center, nowrap, wave color, 0.7rem, clamped translate) and `-left` (overrides only `--nerv-wave-point-label-shift`); `--nerv-wave-point-label-gap: 0.35rem` on the box; contrast halo.
    - /home/mobaxterm/.cursor/worktrees/nervouscsstem-issue-8/test/wave-graph.test.mjs: 6 label tests + contrast halo assertion; 3 existing tests read the hoisted properties.
    - /home/mobaxterm/.cursor/worktrees/nervouscsstem-issue-8/docs/components/css/heavies/wave-graph.md: new "Point labels" example; vertical and alert examples labeled; vertical uses default amplitude so the clamp is visible.
    - /home/mobaxterm/.cursor/worktrees/nervouscsstem-issue-8/ref/ref-patterns.html: six labels across the three fixture graphs.
- Deviation: vertical examples dropped their `amplitude: 0.6` override so labels actually reach the edge and demonstrate the clamp.
- Verification: suite 399/399; docs strict green; lint unchanged (10). Harness: dots unchanged (0.35 / 0.57px perpendicular); labels never outside the box (≤0.02px) on built CSS edge cases, docs page, and fixture, both engines; unclamped labels centered on their dot to ≤0.01px.
- PR assets: orphan `pr-assets` @ `1928e75` (fresh `git init`, no history), 7 files under `pr-18/`, all raw URLs 200 image/*. GIF 2.2 MB.

## Next Step
- QA in a subagent; then Reflect; then PR body + push + CI.
