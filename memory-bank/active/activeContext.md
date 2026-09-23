# Active Context

## Current Task: sine-wave-graph rework — point labels (PR #18)
**Phase:** PREFLIGHT - COMPLETE (PASS WITH ADVISORY)

## What Was Done
- Rework initiated from PR #18 human feedback (labels on points; PR screenshots). Re-classified Level 2: one sub-feature on one component.
- Operator gate decisions (pre-authorized):
    - Placement: right of the dot by default; `.nerv-wave-point-label-left` is the only other placement.
    - Clipping: the label `translate` is `clamp()`ed against the wave box using the point's own hoisted `--nerv-wave-point-x/y`. Labels never leave the box; at extremes they slide inward and may cross their dot. Proven in Chromium + Firefox before planning.
    - No collision avoidance (human norm); SumMem note during build.

- Preflight PASS WITH ADVISORY. Gate decisions: vertical point rule redefines only x/y (base rule owns left/top; L1 matches); `-left` overrides only internal `--nerv-wave-point-label-shift` so the clamp exists once; docs tell script authors to keep `aria-label` in sync (`role="img"` hides child text); `GIT_LFS_SKIP_SMUDGE=1` for the pr-assets clone; CSS `counter()` live readouts = follow-up idea, not built.

## Next Step
- Build.
