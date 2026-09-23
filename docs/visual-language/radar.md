# NERV radar (timing)

**Source of truth:** `src/_radar.scss` (compiled into `dist/nerv.css` via `src/nerv.scss`).
**Usage:** [CSS radar](../components/css/heavies/radar.md), [JavaScript radar](../components/javascript/heavies/radar.md).
**Live combination:** `ref/ref-patterns.html` (tactical scope block).

This is why the lockstep works. The SCSS file has shorter section comments; read both when changing behavior.

---

## Sweep vs blip period

Both animations use the **same duration expression**. One full blip cycle equals one full sweep rotation, so a single number `--nerv-radar-blip-phase` (0–1 turn, clockwise from top) can stay in lockstep with “where the sweep is” in the idealized model.

The visible conic wedge and `rotate(0→360deg)` can disagree by a hair. That is why a unitless turn trim exists on `.nerv-radar`.

---

## Blip pulse (the core idea)

### Cold start

The blip element has **`opacity: 0`**. **`animation-fill-mode`** stays default (`none`), so until the animation *starts*, nothing from the keyframes applies — the blip stays invisible.

### When the animation starts

**`animation-delay`** = `(phase + sweep_align) × period` (seconds).

At the instant the delay elapses, the animation’s **local time is 0%** → first keyframe.

Polar wires phase from `--nerv-radar-blip-bear-turn`. Cartesian auto-layout sets it from phosphor geometry. The model is: delay alone lines the first 0% up with the first sweep pass.

### One cycle of `@keyframes nerv-radar-blip-pulse`

| Segment | Role |
|--------|------|
| **0%** | **Hit** — `opacity: 1` (snap; loop boundary from previous cycle). |
| **0% → ~2.5%** | Short hold at full brightness. |
| **~2.5% → ~93%** | **Long linear fade** to `--nerv-radar-blip-opacity-floor` (default **0**). Uses **`animation-timing-function: linear`** on the element, so this is a straight ramp in time. |
| **~93% → 100%** | Hold at floor (invisible by default). |
| **100% → next 0%** | Next iteration: jump from floor back to **1** = next sweep hit. |

One repeating track; no separate “intro” animation in CSS. The “wait until first sweep” behavior is entirely **delay + initial opacity 0**.

### Why not `(phase − 0.5) × period`?

Older versions aligned the **50%** keyframe with the sweep. The current model puts the **hit at 0%** of each cycle and uses **delay** alone to align the *first* 0% with the first sweep pass. That avoids fighting the keyframe midpoint and matches “pop on, then decay for almost a full rotation.”

---

## Placement traps

A `%` length in `transform` is the **label box**, not the disc. Orbit uses `cqmin` so radius follows the disc.

Do **not** put `cqmin` on `.nerv-radar` itself — an element cannot query itself. Orbit lives on the blip.

`.nerv-radar` has **`overflow: hidden`**. Long labels past the rim clip.

Cartesian auto-layout bears from `transform-origin` (the phosphor), not the flex-box center. Range along the ray does not change timing.

---

## Changing the feel

Keyframe stops **`2.5%`** and **`93%`** in `_radar.scss` control “hold after hit” vs “length of fade.” Wider gap between them = longer fade within the same period. Keep **100%** at the floor so the **100% → 0%** loop jump remains the hit.

---

## Tests

CSS contracts: `test/patterns.test.mjs` (radar + blip + `::before` + `.nerv-text-green`). Run **`npm run build`** before **`npm run test`** (tests read `dist/nerv.css`).
