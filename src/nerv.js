/**
 * nerv.js — NERV Design System orchestration module.
 *
 * Provides DOM manipulation that CSS alone cannot achieve:
 * scanline overlay injection, hex cell state cycling, grid axis labels,
 * ghost-segment population, and bar meter fill activation.
 *
 * UMD-lite: works as a classic <script> tag (window.NERV) and as a
 * Node.js/CJS module (require/import). No build step required.
 *
 * @namespace NERV
 */
(function (root) {
  'use strict';

  var HEX_STATES = ['nerv-hex-danger', 'nerv-hex-warn', 'nerv-hex-safe'];

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
      var meters = scope.querySelectorAll('.nerv-bar-meter[data-fill]');
      for (var i = 0; i < meters.length; i++) {
        var meter = meters[i];
        var fill = parseFloat(meter.getAttribute('data-fill')) || 0;
        var bars = meter.querySelectorAll('.nerv-bar-meter-bar');
        var activeCount = Math.round((fill / 100) * bars.length);
        for (var j = 0; j < bars.length; j++) {
          if (j < activeCount) {
            bars[j].classList.add('nerv-bar-active');
          } else {
            bars[j].classList.remove('nerv-bar-active');
          }
        }
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
