# Algorithm Decision: Wave Rendering and Point Tracking

## Problem

Draw N independently configured scrolling sine strokes inside a box, and keep plotted points exactly on their stroke while it moves, using only CSS (no canvas, no WebGL, no image files, JS does not draw).

- **Inputs (per wave):** amplitude, wavelength, temporal frequency, phase offset, color. Per point: position along the travel axis.
- **Output:** a glowing stroke of uniform thickness, scrolling at `frequency × wavelength`, and points whose cross-axis position equals the stroke's displacement at their position, at every frame.
- **Invariants:** stroke and points derive from one time source (no drift under main-thread jank); stroke thickness does not distort with amplitude/wavelength; tiles join without seams; reduced motion leaves points on the line; speed scales with `--nerv-animation-speed`.

## Options Evaluated

- **A. One registered time property drives everything.** `@property --nerv-wave-t` (`<number>`) animates 0→1 per period on `.nerv-wave`. The stroke is an SVG sine used as a repeating `mask-image` on `::before` over `background-color: var(--nerv-wave-color)`; `mask-position` is computed from `t`. Points compute their offset with CSS `sin()` from the same `t`.
- **B. Compositor stroke, `sin()` points.** Stroke is an oversized strip animated with `transform: translateX`; points use `@property` + `sin()`. Two separate animations.
- **C. No `sin()`/`@property`.** Stroke as in B; each point oscillates via `transform` with `animation-direction: alternate` and the easeInOutSine cubic-bezier approximation, phase via negative `animation-delay`.

## Analysis

| Criterion | A | B | C |
|-----------|---|---|---|
| Correctness | Exact: one clock, measured ≤1px | Two clocks (compositor vs main thread) can drift a frame under jank | Bezier-approx sine plus two clocks; small but real error |
| Simplicity | One keyframes, pure math in `calc()` | Two animation mechanisms | Four keyframe tricks, delay math per point |
| Reduced motion | `animation: none` → `t = 0` → static, exact | Needs separate static pose for each | Needs paused-at-delay trick |
| Support floor | `sin()` (Chrome 111 / Firefox 108 / Safari 15.4), animated `@property` (Chrome 85 / Safari 16.4 / Firefox 128), unprefixed `mask` (Chrome 120 / Safari 15.4 / Firefox 53) | Same as A | Widest |
| Cost | Main-thread style recalc per frame per wave | Stroke composited | All composited |

Key insights:

- **Browser proof** (throwaway harness in `/tmp`, Playwright Chromium 1243 and Firefox 1543, 800×500 box, four waves incl. a 0.3333 wavelength fraction): animations paused at six times; point center vs. stroke centroid in the same pixel column. Worst error **0.45px Chromium, 0.97px Firefox** against a 2px stroke and 8–10px dot. Both engines render identical frames: uniform stroke, no tile seams, unclipped peaks.
- **Uniform stroke under non-uniform stretch** comes from `preserveAspectRatio='none'` plus `vector-effect='non-scaling-stroke'` in the data URI; verified in both engines.
- **Seam-free tiling:** the path is drawn a quarter-wave past each tile edge so the SVG viewport clips it vertically exactly at the edge and the neighbor tile continues it.
- **Peak clipping:** the SVG viewBox is ±2 around a unit-amplitude path, so the mask tile is 4× the amplitude tall and the stroke has half a tile of headroom. `max(…, 4px)` keeps a zero-amplitude wave visible as a flat line.
- **Glow must live on the parent:** filter runs before masking, so `filter: drop-shadow` on the masked `::before` would be cut away. The filter sits on `.nerv-wave`, which also glows its points for free.
- **Frequency edge cases (measured):** `0` → duration clamps to max float in both engines → frozen at phase (good). Negative → `0s` → frozen at phase. So direction cannot come from the sign; it gets a modifier.
- Test harness detail worth keeping: toggling `display: none` restarts CSS animations; hide with `visibility` when sampling paused frames.

## Decision

**Selected**: A — one registered `--nerv-wave-t` per wave; SVG sine mask for the stroke; `sin()` for points.
**Rationale**: It is the only option where stroke and points cannot disagree, it makes reduced motion exact for free, and it is the simplest code. Measured accuracy is sub-pixel to 1px in both engines.
**Tradeoff**: Animation runs on the main thread (style recalc + a drop-shadow repaint per wave per frame). Acceptable for a handful of waves; not built for dozens. Support floor is Firefox 128 / Safari 16.4 / Chrome 120; older engines fall back to a static line.

## Implementation Notes

- Displacement model: `D(s, t) = A · sin(2π · (s/λ + φ + t))`, with `s` the position fraction along the travel axis, `λ` the wavelength fraction, `φ` phase in turns. Mask offset `-(φ + t) · λ · 100cq{w|h}`; point cross-axis `50% ∓ A · 50% · sin((s/λ + φ + t) · 1turn)`. Increasing `t` moves the pattern toward the start of the axis (left / up).
- Period: `calc(var(--nerv-wave-duration) / (var(--nerv-wave-frequency) * var(--nerv-animation-speed)))`.
- `.nerv-wave` is `container-type: size` so `cqw`/`cqh` in `::before` resolve to the wave box.
- Quarter-sine cubic: control points (0.3261, 0.5123) and (0.6381, 1) in quarter-wave units (max error ≈0.1% of amplitude).
- Vertical variant uses a second data URI with axes swapped and `mask-repeat: repeat-y`.
- High contrast: heavier-stroke data URIs; glow already scales down via `--nerv-glow-intensity`.
- A state change that alters `--nerv-animation-speed` changes the duration mid-flight, so waves jump to a new position once. Radar has the same behavior; accepted.
