# Current Task: M1 — Fix barberpole stripe opacity

**Complexity:** Level 1

## Fix Summary

**What broke:** Barberpole stripe bands used semi-transparent rgba values (0.15 for dark bands, 0.85 for bright bands), causing background bleed-through. The dark bands were especially visible as the underlying content showed through at 85% transparency.

**Why:** Original implementation used rgba alpha to create the two-tone effect, but this violated the CRT vector constraint (hard-stop opaque bands) and looked wrong over non-black backgrounds.

**What changed:**
- Dark bands: `rgba(var(--nerv-stripe-color-rgb), 0.15)` → `rgba(var(--nerv-bg-rgb), 1)` — solid background color
- Bright bands: `rgba(var(--nerv-stripe-color-rgb), 0.85)` → `rgba(var(--nerv-stripe-color-rgb), 1)` — solid stripe color
- `.nerv-stripe-transparent` bright bands also updated to alpha 1
- Added `--nerv-stripe-glow-spread` custom property (default: 0px) for configurable glow border
- Added `box-shadow` using stripe color, controlled by `--nerv-stripe-glow-spread` and `--nerv-glow-intensity`

**Files affected:**
- `src/_stripe-bar.scss` — opacity fix + glow border
- `test/patterns.test.mjs` — 4 new tests + 1 modified test
