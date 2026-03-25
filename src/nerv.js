/**
 * nerv.js — NERV Design System orchestration module.
 *
 * Provides DOM manipulation that CSS alone cannot achieve:
 * scanline overlay injection, hex cell state cycling, grid axis labels,
 * ghost-segment population, bar meter fill activation / generation,
 * label box group radio toggle, MAGI panel dynamic grid columns,
 * and optional radar sweep phase sync for CSS/JS consumers.
 *
 * UMD-lite: works as a classic <script> tag (window.NERV) and as a
 * Node.js/CJS module (require/import). No build step required.
 *
 * @namespace NERV
 */
(function (root) {
  'use strict';

  var HEX_STATES = ['nerv-hex-danger', 'nerv-hex-warn', 'nerv-hex-safe'];
  var ALERT_STATES = [
    'nerv-state-nominal',
    'nerv-state-active',
    'nerv-state-caution',
    'nerv-state-alert',
    'nerv-state-critical'
  ];

  function prefersReducedMotion() {
    return (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  }

  function clearHexState(cell) {
    cell.classList.remove.apply(cell.classList, HEX_STATES);
  }

  function randomHexState() {
    var roll = Math.random();
    if (roll < 0.25) return null;
    return HEX_STATES[Math.floor(Math.random() * HEX_STATES.length)];
  }

  var NERV = {
    /**
     * Master initialization — calls all sub-initializers.
     * Safe to call before DOMContentLoaded; defers if needed.
     */
    init: function init() {
      var run = function () {
        NERV.injectScanlines();

        var hexGrids = document.querySelectorAll('.nerv-hex-grid');
        for (var i = 0; i < hexGrids.length; i++) {
          NERV.initHexFlicker(hexGrids[i]);
        }

        var gridMarks = document.querySelectorAll('.nerv-grid-marks');
        for (var j = 0; j < gridMarks.length; j++) {
          NERV.initGridLabels(gridMarks[j]);
        }

        NERV.initGhostSegments();
        NERV.initBarMeters();
        NERV.initLabelBoxGroups();
        NERV.initMagiPanels();
        NERV.initCartouches();

        var syncRadars = document.querySelectorAll('.nerv-radar[data-nerv-radar-sync]');
        for (var r = 0; r < syncRadars.length; r++) {
          var radarRoot = syncRadars[r];
          if (radarRoot.hasAttribute('data-nerv-radar-auto-blips')) {
            NERV.initRadarBlipAutoLayout(radarRoot);
          }
          NERV.initRadarSweepSync(radarRoot);
        }
      };

      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
      } else {
        run();
      }
    },

    /**
     * Creates a `.nerv-scanlines` overlay div and appends it to body.
     * Skips if one already exists.
     */
    injectScanlines: function injectScanlines() {
      if (typeof document === 'undefined') return;
      if (document.querySelector('.nerv-scanlines')) return;

      var overlay = document.createElement('div');
      overlay.className = 'nerv-scanlines';
      document.body.appendChild(overlay);
    },

    /**
     * Randomly cycles hex cell states at irregular intervals.
     * Respects prefers-reduced-motion — skips entirely if active.
     *
     * @param {HTMLElement} container - Element containing .nerv-hex-cell elements
     */
    initHexFlicker: function initHexFlicker(container) {
      if (!container || typeof document === 'undefined') return;
      if (prefersReducedMotion()) return;

      var cells = container.querySelectorAll('.nerv-hex-cell');
      if (!cells.length) return;

      function flick() {
        var cell = cells[Math.floor(Math.random() * cells.length)];
        clearHexState(cell);
        var state = randomHexState();
        if (state) cell.classList.add(state);

        var delay = 200 + Math.random() * 1800;
        setTimeout(flick, delay);
      }

      flick();
    },

    /**
     * Populates data-ghost attributes on .nerv-segment-display elements.
     * Reads each element's text content, replaces digits with 8s, and sets
     * the result as data-ghost for the ::before ghost-segment overlay.
     *
     * @param {HTMLElement} [container=document] - Scope for element lookup
     */
    initGhostSegments: function initGhostSegments(container) {
      if (typeof document === 'undefined') return;
      var scope = container || document;
      var displays = scope.querySelectorAll('.nerv-segment-display');
      for (var i = 0; i < displays.length; i++) {
        var el = displays[i];
        if (el.getAttribute('data-ghost')) continue;
        var text = el.textContent || '';
        var ghost = text.replace(/[0-9]/g, '8');
        el.setAttribute('data-ghost', ghost);
      }
    },

    /**
     * Reads data-fill percentage on .nerv-bar-meter containers and
     * activates/deactivates child .nerv-bar-meter-bar elements accordingly.
     *
     * @param {HTMLElement} [container=document] - Scope for element lookup
     */
    initBarMeters: function initBarMeters(container) {
      if (typeof document === 'undefined') return;
      var scope = container || document;
      var meters = scope.querySelectorAll('.nerv-bar-meter');
      for (var i = 0; i < meters.length; i++) {
        var meter = meters[i];

        var barCount = parseInt(meter.getAttribute('data-bars'), 10);
        if (barCount > 0 && !meter.querySelector('.nerv-bar-meter-bar')) {
          for (var b = 0; b < barCount; b++) {
            var div = document.createElement('div');
            div.className = 'nerv-bar-meter-bar';
            meter.appendChild(div);
          }
        }

        var bars = meter.querySelectorAll('.nerv-bar-meter-bar');
        var total = bars.length;

        for (var j = 0; j < total; j++) {
          var pct = total > 1 ? (j / (total - 1)) * 100 : 0;
          bars[j].style.setProperty('--nerv-bar-pct', pct + '%');
        }

        var fill = parseFloat(meter.getAttribute('data-fill'));
        if (!isNaN(fill)) {
          var activeCount = Math.round((fill / 100) * total);
          for (var k = 0; k < total; k++) {
            if (k < activeCount) {
              bars[k].classList.add('nerv-bar-active');
            } else {
              bars[k].classList.remove('nerv-bar-active');
            }
          }
        }
      }
    },

    /**
     * Enables click-to-toggle radio behavior within .nerv-label-box-group
     * containers. Clicking a .nerv-label-box activates it and deactivates
     * siblings. Uses event delegation on the group container.
     *
     * @param {HTMLElement} [container=document] - Scope for element lookup
     */
    initLabelBoxGroups: function initLabelBoxGroups(container) {
      if (typeof document === 'undefined') return;
      var scope = container || document;
      var groups = scope.querySelectorAll('.nerv-label-box-group');
      for (var i = 0; i < groups.length; i++) {
        (function (group) {
          group.addEventListener('click', function (e) {
            var target = e.target.closest('.nerv-label-box');
            if (!target || !group.contains(target)) return;
            var boxes = group.querySelectorAll('.nerv-label-box');
            for (var k = 0; k < boxes.length; k++) {
              boxes[k].classList.remove('nerv-label-box-active');
            }
            target.classList.add('nerv-label-box-active');
          });
        })(groups[i]);
      }
    },

    /**
     * Sets grid-template-columns on .nerv-magi-panel elements based on the
     * count of .nerv-magi-system children, enabling N-to-1 flexible layouts.
     *
     * @param {HTMLElement} [container=document] - Scope for element lookup
     */
    initMagiPanels: function initMagiPanels(container) {
      if (typeof document === 'undefined') return;
      var scope = container || document;
      var panels = scope.querySelectorAll('.nerv-magi-panel');
      for (var i = 0; i < panels.length; i++) {
        var systems = panels[i].querySelectorAll('.nerv-magi-system');
        if (systems.length > 0) {
          panels[i].style.gridTemplateColumns = 'repeat(' + systems.length + ', 1fr)';
        }
      }
    },

    /**
     * Measures text inside `.nerv-cartouche-fixed` elements and sets
     * `--nerv-cartouche-sx` / `--nerv-cartouche-sy` so the inner content
     * stretches to fill the cartouche dimensions. Waits for fonts to load
     * before measuring. Safe to call multiple times (re-measures).
     *
     * @param {HTMLElement} [container=document] - Scope for element lookup
     */
    initCartouches: function initCartouches(container) {
      if (typeof document === 'undefined') return;
      var scope = container || document;

      function measure() {
        var cartouches = scope.querySelectorAll('.nerv-cartouche-fixed');
        for (var i = 0; i < cartouches.length; i++) {
          var el = cartouches[i];
          var inner = el.firstElementChild;
          if (!inner) continue;

          inner.style.transform = 'none';
          var contentW = inner.scrollWidth;
          var contentH = inner.scrollHeight;
          var boxW = el.clientWidth;
          var boxH = el.clientHeight;

          if (contentW > 0 && contentH > 0 && boxW > 0 && boxH > 0) {
            var sx = boxW / contentW;
            var sy = boxH / contentH;
            el.style.setProperty('--nerv-cartouche-sx', String(sx));
            el.style.setProperty('--nerv-cartouche-sy', String(sy));
          }

          inner.style.transform = '';
        }
      }

      if (typeof document.fonts !== 'undefined' && typeof document.fonts.ready !== 'undefined') {
        document.fonts.ready.then(measure);
      } else {
        measure();
      }
    },

    /**
     * Sets the alert cascade state by applying a .nerv-state-* class to the
     * root element. Removes all existing state classes first. For 'critical'
     * state, injects a temporary screen-flash overlay.
     *
     * @param {string} state - One of: 'nominal', 'active', 'caution', 'alert', 'critical'
     */
    setState: function setState(state) {
      if (typeof document === 'undefined') return;
      var root = document.documentElement;

      for (var i = 0; i < ALERT_STATES.length; i++) {
        root.classList.remove(ALERT_STATES[i]);
      }

      var cls = 'nerv-state-' + state;
      if (ALERT_STATES.indexOf(cls) === -1) return;

      void root.offsetHeight;
      root.classList.add(cls);

      if (state === 'critical' && !prefersReducedMotion()) {
        var flash = document.createElement('div');
        flash.style.cssText =
          'position:fixed;inset:0;z-index:99999;pointer-events:none;' +
          'background:rgba(255,34,51,0.35);animation:nerv-screen-flash 0.4s ease-out forwards;';
        document.body.appendChild(flash);
        flash.addEventListener('animationend', function () {
          flash.remove();
        });
      }
    },

    /**
     * Sets `--nerv-radar-blip-phase` on each `.nerv-radar-blip` from pixel position: bearing
     * only (clockwise from top, 0–1). Radius does not change hit timing along a ray. Skips
     * `data-nerv-radar-manual-phase` and `.nerv-radar-blip-polar` (phase from CSS).
     *
     * @param {HTMLElement} radarEl - `.nerv-radar` container
     */
    layoutRadarBlips: function layoutRadarBlips(radarEl) {
      if (!radarEl || typeof document === 'undefined') return;

      var rr = radarEl.getBoundingClientRect();
      var cx = rr.left + rr.width / 2;
      var cy = rr.top + rr.height / 2;
      var radius = Math.min(rr.width, rr.height) / 2;
      if (radius <= 0) return;

      var blips = radarEl.querySelectorAll('.nerv-radar-blip');
      for (var i = 0; i < blips.length; i++) {
        var b = blips[i];
        if (b.hasAttribute('data-nerv-radar-manual-phase')) continue;
        if (b.classList.contains('nerv-radar-blip-polar')) continue;

        var br = b.getBoundingClientRect();
        var bx = br.left + br.width / 2;
        var by = br.top + br.height / 2;
        var dx = bx - cx;
        var dy = by - cy;
        var bearing = Math.atan2(dx, -dy);
        if (bearing < 0) bearing += 2 * Math.PI;
        var bearingNorm = bearing / (2 * Math.PI);
        b.style.setProperty('--nerv-radar-blip-phase', String(bearingNorm));
      }
    },

    /**
     * Re-runs `layoutRadarBlips` on resize. Pair with `data-nerv-radar-auto-blips` on the radar.
     *
     * @param {HTMLElement} radarEl - `.nerv-radar` container
     */
    initRadarBlipAutoLayout: function initRadarBlipAutoLayout(radarEl) {
      if (!radarEl || typeof document === 'undefined') return;
      if (prefersReducedMotion()) return;

      function run() {
        NERV.layoutRadarBlips(radarEl);
      }

      run();
      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(run);
      }

      if (typeof ResizeObserver !== 'undefined') {
        if (radarEl.__nervBlipResizeRo) {
          radarEl.__nervBlipResizeRo.disconnect();
        }
        radarEl.__nervBlipResizeRo = new ResizeObserver(run);
        radarEl.__nervBlipResizeRo.observe(radarEl);
      }
    },

    /**
     * Drives `--nerv-radar-sweep-phase` (0–1) on a `.nerv-radar` element from the
     * Web Animations API timeline of its child `.nerv-radar-sweep`, so external UI
     * can read phase via `getComputedStyle(radarEl).getPropertyValue(...)`.
     * No-ops when `prefers-reduced-motion` is set or WAAPI is unavailable.
     *
     * @param {HTMLElement} radarEl - Element with class `nerv-radar` containing `.nerv-radar-sweep`
     */
    initRadarSweepSync: function initRadarSweepSync(radarEl) {
      if (!radarEl || typeof document === 'undefined') return;
      if (prefersReducedMotion()) return;

      var sweep = radarEl.querySelector('.nerv-radar-sweep');
      if (!sweep) return;
      if (radarEl.__nervRadarSyncActive) return;
      radarEl.__nervRadarSyncActive = true;

      function tick() {
        var phase = 0;

        if (typeof sweep.getAnimations === 'function') {
          var anims = sweep.getAnimations();
          for (var i = 0; i < anims.length; i++) {
            var a = anims[i];
            if (a.playState === 'idle') continue;

            var ctRaw = a.currentTime;
            if (ctRaw === null || ctRaw === undefined) continue;

            var ctNum =
              typeof ctRaw === 'number'
                ? ctRaw
                : typeof ctRaw === 'object' && ctRaw !== null && 'value' in ctRaw
                  ? Number(ctRaw.value)
                  : Number(ctRaw);
            if (isNaN(ctNum)) continue;

            var eff = a.effect;
            if (!eff || typeof eff.getComputedTiming !== 'function') continue;

            var ctiming = eff.getComputedTiming();
            var dur = ctiming.duration;
            if (typeof dur === 'number' && dur > 0 && dur !== Infinity) {
              phase = ((ctNum % dur) + dur) % dur / dur;
              break;
            }
          }
        }

        radarEl.style.setProperty('--nerv-radar-sweep-phase', String(phase));

        if (typeof requestAnimationFrame === 'function') {
          requestAnimationFrame(tick);
        }
      }

      if (typeof requestAnimationFrame === 'function') {
        requestAnimationFrame(tick);
      }
    },

    /**
     * Generates axis label span elements along grid container edges.
     * Labels are positioned absolutely along X (bottom) and Y (left) axes.
     *
     * @param {HTMLElement} container - Element to attach axis labels to
     */
    initGridLabels: function initGridLabels(container) {
      if (!container || typeof document === 'undefined') return;

      var rect = container.getBoundingClientRect();
      var xCount = 9;
      var yCount = 5;

      var wrapper = document.createElement('div');
      wrapper.className = 'nerv-grid-labels';
      wrapper.style.cssText =
        'position:absolute;inset:0;pointer-events:none;';

      for (var i = 0; i < xCount; i++) {
        var pct = (i / (xCount - 1)) * 100;
        var val = Math.round((i / (xCount - 1)) * rect.width);
        var span = document.createElement('span');
        span.className = 'nerv-grid-label nerv-grid-label-x';
        span.textContent = String(val).padStart(3, '0');
        span.style.cssText =
          'position:absolute;bottom:-1.2rem;left:' + pct + '%;' +
          "font-family:'IBM Plex Mono',monospace;font-size:0.5rem;" +
          'color:rgba(var(--nerv-cyan-rgb),0.35);letter-spacing:0.05em;';
        wrapper.appendChild(span);
      }

      for (var j = 0; j < yCount; j++) {
        var pctY = (j / (yCount - 1)) * 100;
        var valY = Math.round(rect.height - (j / (yCount - 1)) * rect.height);
        var spanY = document.createElement('span');
        spanY.className = 'nerv-grid-label nerv-grid-label-y';
        spanY.textContent = String(valY).padStart(3, '0');
        spanY.style.cssText =
          'position:absolute;top:' + pctY + '%;left:-2.2rem;' +
          "font-family:'IBM Plex Mono',monospace;font-size:0.5rem;" +
          'color:rgba(var(--nerv-cyan-rgb),0.35);letter-spacing:0.05em;';
        wrapper.appendChild(spanY);
      }

      var pos = typeof getComputedStyle !== 'undefined'
        ? getComputedStyle(container).position
        : container.style.position;
      if (!pos || pos === 'static') {
        container.style.position = 'relative';
      }
      container.appendChild(wrapper);
    }
  };

  // Browser global
  if (root) {
    root.NERV = NERV;
  }

  // Node.js CJS export (supports require() and dynamic import())
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { NERV: NERV };
  }

})(typeof window !== 'undefined' ? window : typeof globalThis !== 'undefined' ? globalThis : undefined);
