/**
 * nerv.js — NERV Design System orchestration module.
 *
 * Provides DOM manipulation that CSS alone cannot achieve:
 * scanline overlay injection, hex cell state cycling, and grid axis labels.
 *
 * UMD-lite: works as both an ES module (`import { NERV }`) and a global
 * (`window.NERV`) when loaded via `<script>` tag.
 *
 * @namespace NERV
 */

const HEX_STATES = ['nerv-hex-danger', 'nerv-hex-warn', 'nerv-hex-safe'];

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function clearHexState(cell) {
  cell.classList.remove(...HEX_STATES);
}

function randomHexState() {
  const roll = Math.random();
  if (roll < 0.25) return null; // empty
  return HEX_STATES[Math.floor(Math.random() * HEX_STATES.length)];
}

const NERV = {
  /**
   * Master initialization — calls all sub-initializers.
   * Safe to call before DOMContentLoaded; defers if needed.
   */
  init() {
    const run = () => {
      NERV.injectScanlines();

      document.querySelectorAll('.nerv-hex-grid').forEach((grid) => {
        NERV.initHexFlicker(grid);
      });

      document.querySelectorAll('.nerv-grid-marks').forEach((grid) => {
        NERV.initGridLabels(grid);
      });
    };

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run);
    } else {
      run();
    }
  },

  /**
   * Creates a `.nerv-scanlines` overlay `<div>` and appends it to `<body>`.
   * Skips if one already exists.
   */
  injectScanlines() {
    if (typeof document === 'undefined') return;
    if (document.querySelector('.nerv-scanlines')) return;

    const overlay = document.createElement('div');
    overlay.className = 'nerv-scanlines';
    document.body.appendChild(overlay);
  },

  /**
   * Randomly cycles hex cell states at irregular intervals.
   * Respects prefers-reduced-motion — skips entirely if active.
   *
   * @param {HTMLElement} container - Element containing .nerv-hex-cell elements
   */
  initHexFlicker(container) {
    if (!container || typeof document === 'undefined') return;
    if (prefersReducedMotion()) return;

    const cells = container.querySelectorAll('.nerv-hex-cell');
    if (!cells.length) return;

    function flick() {
      const cell = cells[Math.floor(Math.random() * cells.length)];
      clearHexState(cell);
      const state = randomHexState();
      if (state) cell.classList.add(state);

      const delay = 200 + Math.random() * 1800; // 200–2000ms
      setTimeout(flick, delay);
    }

    flick();
  },

  /**
   * Generates axis label `<span>` elements along grid container edges.
   * Labels are positioned absolutely along X (bottom) and Y (left) axes.
   *
   * @param {HTMLElement} container - Element to attach axis labels to
   */
  initGridLabels(container) {
    if (!container || typeof document === 'undefined') return;

    const rect = container.getBoundingClientRect();
    const xCount = 9;
    const yCount = 5;

    const wrapper = document.createElement('div');
    wrapper.className = 'nerv-grid-labels';
    wrapper.style.cssText =
      'position:absolute;inset:0;pointer-events:none;';

    for (let i = 0; i < xCount; i++) {
      const pct = (i / (xCount - 1)) * 100;
      const val = Math.round((i / (xCount - 1)) * rect.width);
      const span = document.createElement('span');
      span.className = 'nerv-grid-label nerv-grid-label-x';
      span.textContent = String(val).padStart(3, '0');
      span.style.cssText =
        `position:absolute;bottom:-1.2rem;left:${pct}%;` +
        "font-family:'IBM Plex Mono',monospace;font-size:0.5rem;" +
        'color:rgba(var(--nerv-cyan-rgb),0.35);letter-spacing:0.05em;';
      wrapper.appendChild(span);
    }

    for (let i = 0; i < yCount; i++) {
      const pct = (i / (yCount - 1)) * 100;
      const val = Math.round(rect.height - (i / (yCount - 1)) * rect.height);
      const span = document.createElement('span');
      span.className = 'nerv-grid-label nerv-grid-label-y';
      span.textContent = String(val).padStart(3, '0');
      span.style.cssText =
        `position:absolute;top:${pct}%;left:-2.2rem;` +
        "font-family:'IBM Plex Mono',monospace;font-size:0.5rem;" +
        'color:rgba(var(--nerv-cyan-rgb),0.35);letter-spacing:0.05em;';
      wrapper.appendChild(span);
    }

    container.style.position = container.style.position || 'relative';
    container.appendChild(wrapper);
  },
};

export { NERV };

if (typeof window !== 'undefined') {
  window.NERV = NERV;
}
