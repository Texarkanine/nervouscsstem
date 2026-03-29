# Troubleshooting: Rotated Nesting Spacing Asymmetry

## Problem
ARM R (last child) overlaps UNIT-01 (next parent) in the Angled Up list.
Margin-bottom: 0 works for Angled Down but NOT Angled Up.
Previous attempts oscillated between too-much-gap (down) and overlap (up).

## Core Question
Why is the spacing behavior asymmetric between angled-up (-45deg) and angled-down (+45deg)?

## Hypotheses
- [ ] H1: The rotation direction causes the visual extents to overlap differently
- [ ] H2: The transform-origin override on nesting parents shifts the pivot asymmetrically
- [ ] H3: The margin decomposition formula produces different effective offsets per direction
- [ ] H4: The outer flex gap interacts differently with each rotation direction
- [ ] H5: The nesting parent's layout box height is excessive and needs compensation

## Investigation Plan
1. Measure bounding boxes of ARM R and UNIT-01 to confirm overlap exists and measure it
2. Measure bounding boxes of VECTOR C and AT FIELD to confirm no overlap there
3. Compute the exact margin values produced for each direction
4. Trace the layout chain to understand WHY the asymmetry occurs
5. Determine the correct fix

## Evidence Gathered

### Pre-fix Bounding Boxes
| Element | x | y | w | h | y_bottom |
|---------|---|---|---|---|----------|
| **Angled Up (-45deg)** |
| ARM R (last child) | 418 | 1730 | 173 | 173 | 1903 |
| UNIT-01 (next sibling) | 386 | 1781 | 174 | 174 | 1955 |
| **AABB overlap: 122px** → User sees actual shape overlap |
| **Angled Down (+45deg)** |
| Vector C (last child) | 673 | 1789 | 114 | 114 | 1903 |
| AT Field (next sibling) | 647 | 1803 | 172 | 172 | 1975 |
| **AABB overlap: 100px** → But no visible shape overlap (user says "looks fine") |

### Root Cause: Geometric Asymmetry
- **Confirmed: H1 + H2** — Rotation direction causes asymmetric visual extent overlap.
- For angled-up (-45deg): items tilt upper-right. Bottom-LEFT edge of higher items 
  extends DOWN toward the next sibling → shapes cross.
- For angled-down (+45deg): items tilt lower-right. Bottom-RIGHT edge extends DOWN-RIGHT
  AWAY from the next sibling → shapes don't cross despite AABB overlap.
- The shared `margin-bottom: 0` was symmetric but the overlap behavior is not.

### Fix Applied
Split the combined rule into direction-specific margin-bottom overrides:
- `.nerv-list-angled > li > .nerv-list { margin-bottom: calc(var(--nerv-list-item-height) * 7); }`
- `.nerv-list-angled-reverse > li > .nerv-list { margin-bottom: 0; }`

### Post-fix Verification
| Element | y_before | y_after | Shift |
|---------|----------|---------|-------|
| ARM R (angled-up) | 1730 | 1730 | 0 (unchanged) |
| UNIT-01 (angled-up) | 1781 | 1942 | +161px |
| ARM R→UNIT-01 gap | -122px (overlap) | +39px (clear) | **Fixed** |
| Vector C (angled-down) | 1789 | 1789 | 0 (unchanged) |
| AT Field (angled-down) | 1803 | 1803 | 0 (unchanged) |

All 357 tests pass. Build succeeds. No linter errors introduced.

### Caveat
The multiplier 7 works for typical item widths (~200px). Wider items in narrow
containers could still overlap since the clearance is proportional to item-height,
not item-width. A percentage-based margin-bottom would scale better but is harder
to tune. This is flagged as a known limitation.
