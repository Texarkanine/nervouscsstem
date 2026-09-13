# NERV radar (display + sweep + blips)

**Source of truth:** `src/_radar.scss` (compiled into `dist/nerv.css` via `src/nerv.scss`).  
**Live example:** `ref/ref-patterns.html` (tactical scope block).  
**Optional JS:** `src/nerv.js` — sweep phase + Cartesian blip phase (see below).

This doc explains *why* the timing works the way it does. The SCSS file has shorter section comments; read both when changing behavior.

---

## 1. Markup shape

```html
<div class="nerv-radar" data-nerv-radar-sync data-nerv-radar-auto-blips>
  <div class="nerv-radar-sweep"></div>
  <span class="nerv-radar-blip" style="top: …%; left: …%;"></span>
</div>
```

- **`.nerv-radar`** — Square aspect-ratio disc (rings + crosshairs are `::before` / `::after` on this element). Uses ambiance tokens `--nerv-primary` / `--nerv-primary-rgb` so it follows alert state.
- **`.nerv-radar-sweep`** — Full-size child; conic-gradient “wedge” rotated by `@keyframes nerv-radar-sweep`. Same **period** as blip pulse:  
  `calc(var(--nerv-radar-duration) / var(--nerv-animation-speed))`  
  (`--nerv-radar-duration` is on `:root` in `_tokens.scss`).
- **`.nerv-radar-blip`** — Absolutely positioned **contact**; phosphor dot is **`::before`**, optional label text is normal content in an `inline-flex` row/column.

---

## 2. Sweep vs blip period

Both animations intentionally use the **same duration expression**. That way one full blip cycle equals one full sweep rotation, and a single number `--nerv-radar-blip-phase` (0–1 turn, clockwise from top) can stay in lockstep with “where the sweep is” in the idealized model.

The visible conic wedge and `rotate(0→360deg)` may need a tiny trim: set **`--nerv-radar-blip-sweep-align`** (unitless turns, e.g. `0.01` or `-0.02`) on `.nerv-radar` if the bright edge and blip hits look slightly early/late.

---

## 3. Blip pulse timing (the core idea)

### 3.1 Cold start

The blip element has **`opacity: 0`** in CSS. **`animation-fill-mode`** stays default (`none`), so until the animation *starts*, nothing from the keyframes applies — the blip stays invisible.

### 3.2 When the animation starts

**`animation-delay`** = `(phase + sweep_align) × period` (seconds).

- **`--nerv-radar-blip-phase`**: bearing where the **first** hit should occur, as a fraction of one turn (0 = top, increasing clockwise). For **polar** blips, this is wired from **`--nerv-radar-blip-bear-turn`**. For **Cartesian** blips with `data-nerv-radar-auto-blips`, **`NERV.layoutRadarBlips`** sets it from pixel geometry (see §5).
- At the instant the delay elapses, the animation’s **local time is 0%** → first keyframe.

### 3.3 One cycle of `@keyframes nerv-radar-blip-pulse`

| Segment | Role |
|--------|------|
| **0%** | **Hit** — `opacity: 1` (snap; loop boundary from previous cycle). |
| **0% → ~2.5%** | Short hold at full brightness. |
| **~2.5% → ~93%** | **Long linear fade** to `--nerv-radar-blip-opacity-floor` (default **0**). Uses **`animation-timing-function: linear`** on the element, so this is a straight ramp in time. |
| **~93% → 100%** | Hold at floor (invisible by default). |
| **100% → next 0%** | Next iteration: jump from floor back to **1** = next sweep hit. |

So: **one repeating track**; no separate “intro” animation in CSS. The “wait until first sweep” behavior is entirely **delay + initial opacity 0**.

### 3.4 Why not `(phase − 0.5) × period`?

Older versions aligned the **50%** keyframe with the sweep. The current model puts the **hit at 0%** of each cycle and uses **delay** alone to align the *first* 0% with the first sweep pass. That avoids fighting the keyframe midpoint and matches “pop on, then decay for almost a full rotation.”

---

## 4. Tokens (on `.nerv-radar` or per blip)

| Token | Purpose |
|--------|---------|
| `--nerv-radar-blip-orbit` | Polar: radius from disc center to dot (`calc(50% - 0.9rem)` default). |
| `--nerv-radar-blip-sweep-align` | Fine-tune blip vs sweep (turns). |
| `--nerv-radar-blip-opacity-floor` | Opacity at end of fade / tail (default **0**; raised under `prefers-contrast: more`). |
| `--nerv-radar-blip-phase` | Bearing 0–1 for delay (set by CSS for polar, or JS for auto Cartesian). |
| `--nerv-radar-blip-bear-turn` | Polar only: same as phase, drives `rotate()` and phase. |
| `--nerv-radar-blip-label-gap` | Flex gap between dot and label. |
| `--nerv-radar-blip-label-max-width` | Wrap width for label text (`none` default). |
| `--nerv-radar-blip-label-line-height` | Label line height. |
| `--nerv-radar-blip-label-text-align` | Label alignment. |

Root timing: **`--nerv-radar-duration`**, **`--nerv-animation-speed`** (shared with sweep).

---

## 5. Placement: polar vs Cartesian

### Polar — `.nerv-radar-blip-polar`

- Set **`--nerv-radar-blip-bear-turn`** (0–1, unitless).
- Phase is **`--nerv-radar-blip-phase: var(--nerv-radar-blip-bear-turn)`**.
- **`transform`**: `translate(-50%,-50%) rotate(bear × 1turn) translateY(-orbit)` so the dot sits on a true circle; bearing matches pulse phase by construction.

### Cartesian — `top` / `left` %

- Container uses **`transform: translate(-50%,-50%)`** so **`top` / `left`** are the **contact center** (middle of the phosphor dot intent).
- **`data-nerv-radar-auto-blips`** on `.nerv-radar` runs **`NERV.initRadarBlipAutoLayout`**: **`ResizeObserver`** + layout passes call **`layoutRadarBlips`**, which sets **`--nerv-radar-blip-phase`** from `atan2` (bearing only; **range along the ray does not change timing**).
- Skipped for: **`data-nerv-radar-manual-phase`**, **`.nerv-radar-blip-polar`**.
- **Caveat:** labeled blips use the **whole** flex box for `getBoundingClientRect`; for precise bearing with long labels, use **polar** or **manual** phase.

---

## 6. Labels

- Dot = **`::before`**; text = element content. **`inline-flex`** + optional modifiers:
  - **`.nerv-radar-blip-label-left` / `-right`** (default row = label right of dot)
  - **`.nerv-radar-blip-label-above` / `-below`**
  - **`.nerv-radar-blip-label-nowrap`**, **`.nerv-radar-blip-label-align-end`**
- **`.nerv-glow-text-*`** only adds **text-shadow**. Pair with **`.nerv-text-*`** for **`color`** (see `_glow.scss` / `ref/ref-foundation.html`).

---

## 7. JavaScript (`nerv.js`)

| API / attribute | Role |
|-----------------|------|
| **`data-nerv-radar-sync`** on `.nerv-radar` | Opt-in: runs sweep sync (and auto-blips if combined). |
| **`data-nerv-radar-auto-blips`** | **`initRadarBlipAutoLayout`** → **`layoutRadarBlips`** on resize. |
| **`NERV.initRadarSweepSync(el)`** | Writes **`--nerv-radar-sweep-phase`** (0–1) from WAAPI on `.nerv-radar-sweep`. |
| **`NERV.layoutRadarBlips(el)`** | Sets Cartesian blip phases (public; can call after DOM changes). |

All respect **`prefers-reduced-motion`** (animations skipped; blips forced visible for static HUDs).

---

## 8. Accessibility

- **`prefers-reduced-motion: reduce`**: sweep and blip **animations off**; blips **`opacity: 1`**.
- **`prefers-contrast: more`**: stronger **`::before`** outline/glow; **`--nerv-radar-blip-opacity-floor`** raised so traces are not fully invisible between hits.

---

## 9. Changing the feel

Keyframe stops **`2.5%`** and **`93%`** in `_radar.scss` control “hold after hit” vs “length of fade.” Wider gap between them = longer fade within the same period. Keep **100%** at the floor so the **100% → 0%** loop jump remains the hit.

---

## 10. Tests

CSS contracts: `test/patterns.test.mjs` (radar + blip + `::before` + `.nerv-text-green`). Run **`npm run build`** before **`npm run test`** (tests read `dist/nerv.css`).
