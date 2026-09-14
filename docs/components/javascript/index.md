# JavaScript

`nerv.js` is orchestration, not a renderer. It injects DOM CSS cannot create, scales text that has to fill a box, and runs timers. It does not draw. Family pages in this section are the hooks; the matching CSS page (when there is one) is the look without the hook.

## `NERV.init`

Whole-viewport call. Injects a `.nerv-scanlines` overlay on `body`, then runs every sub-initializer against the document. Use it when the page is a NERV viewport.

```js
NERV.init();
```

When you only own a fragment, call the matching `NERV.init*(container)` instead.

## Scoped initializers

Each function looks up its own selectors inside the container you pass.

| Method | What it does |
| --- | --- |
| `NERV.initBarMeters(container)` | Build `.nerv-bar-meter-bar` children from `data-bars`; apply `.nerv-bar-active` from `data-fill` |
| `NERV.initCartouches(container)` | Scale text inside `.nerv-cartouche-fixed` (and table-mode cells) to fill the box |
| `NERV.initHexFlicker(container)` | Randomly cycle `.nerv-hex-cell` states. `NERV.init()` only starts this on grids with `data-nerv-hex-flicker` |
| `NERV.initGhostSegments(container)` | Set `data-ghost` on `.nerv-segment-display` (digits → 8s) unless already set |
| `NERV.initLabelBoxGroups(container)` | Radio-toggle `.nerv-label-box-active` inside `.nerv-label-box-group` |
| `NERV.initMagiPanels(container)` | Set `grid-template-columns` from the count of `.nerv-magi-system` children |
| `NERV.initDataBackgrounds(container)` | Inject `.nerv-data-bg-inner` character grids |
| `NERV.initGridLabels(container)` | Axis labels on a `.nerv-grid-marks` element |
| `NERV.initRadarBlipAutoLayout(radarEl)` | Cartesian blip phase from bearing. Pair with `data-nerv-radar-auto-blips` |
| `NERV.initRadarSweepSync(radarEl)` | Keep sweep and blips in one period. Opt-in: `data-nerv-radar-sync` |

```html
<div id="meters">
  <div class="nerv-bar-meter nerv-bar-thermal" data-bars="40" data-fill="72"></div>
</div>
<script>
  NERV.initBarMeters(document.getElementById('meters'));
</script>
```

## `NERV.setState`

Applies `.nerv-state-nominal` / `active` / `caution` / `alert` / `critical` on `document.documentElement` (and a flash overlay for `critical`). Whole viewport. To tint a fragment, put the state class on that element so ambiance tokens inherit. See [Alert cascade](../css/core/alert-cascade.md).

```js
NERV.setState('alert');
```

## `NERV.injectScanlines`

Appends `<div class="nerv-scanlines">` to `body` if none exists. Viewport-fixed. `NERV.init()` already does this. See [Scanlines](../css/core/effects.md#scanlines).
