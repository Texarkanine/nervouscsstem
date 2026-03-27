# Tasks: NERV Design System — Phase 7 Feature Expansion

## Milestone Plan

See `memory-bank/active/milestones.md` for the full 9-milestone breakdown.

Detailed task lists are generated per sub-run at each milestone's planning phase.

## Preflight Findings

### PASS with ADVISORY

**Convention Compliance**: All proposed modules follow `_`-prefix partial convention, `.nerv-` class prefix, existing `@forward` chain pattern in `nerv.scss`. New JS functions follow `NERV.*` namespace.

**Dependency Impact**: M6 (list nesting) is the only milestone modifying existing CSS behavior. All other milestones add new modules/classes only. M9 (dropdown) correctly sequenced after M6 to build on stabilized list structure.

**Conflict Detection**: No existing classes overlap with proposed names. No existing rainbow gradient implementation found (contrary to FUTURE.md speculation). No duplication-in-waiting identified.

**Completeness**: All user requirements (18+) mapped to milestones with no gaps.

### Advisory: Criticality-Aware JS Utility

Milestones M5 (data background) and M7 (psychographic/NCM) both need JS-side awareness of the current alert/criticality state for animation behavior (speed, intensity). The existing `--nerv-animation-speed` CSS custom property (1.0 → 3.0 across states) can be read via `getComputedStyle`, but a shared JS utility — such as `NERV.onStateChange(callback)` added to `NERV.setState()` — would prevent each milestone from independently polling or watching for class changes.

**Recommendation**: The first JS-heavy milestone to execute (likely M5 or M7) should add a lightweight state-change callback mechanism to `nerv.js`. Subsequent milestones consume it. This is an implementation detail within normal sub-run scope, not a separate milestone.
