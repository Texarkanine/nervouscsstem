import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST_CSS = resolve(ROOT, 'dist/nerv.css');
const TOKENS_SCSS = resolve(ROOT, 'src/_tokens.scss');

execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
const css = readFileSync(DIST_CSS, 'utf-8');

const escapeRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

/** Body of the first rule whose whole selector is `selector` (selector starts its own line). */
function rule(selector, source = css) {
  const m = source.match(new RegExp(`^\\s*${escapeRe(selector)}\\s*\\{([^}]*)\\}`, 'm'));
  return m ? m[1] : null;
}

/** Text inside the braces that open at or after `start`, honoring nesting. */
function braced(source, start) {
  const open = source.indexOf('{', start);
  let depth = 1;
  let i = open + 1;
  while (depth) {
    if (source[i] === '{') depth++;
    else if (source[i] === '}') depth--;
    i++;
  }
  return source.slice(open + 1, i - 1);
}

/** Concatenated contents of every `@media (<query>)` block. */
function media(query) {
  const needle = `@media (${query})`;
  let out = '';
  for (let idx = css.indexOf(needle); idx !== -1; idx = css.indexOf(needle, idx + needle.length)) {
    out += braced(css, idx) + '\n';
  }
  return out;
}

/** The SVG inside a rule's `mask-image` data URI, with the attributes the geometry depends on. */
function maskSvg(body) {
  assert.ok(body, 'rule not found');
  const m = body.match(/mask-image:\s*url\("data:image\/svg\+xml,([^"]+)"\)/);
  assert.ok(m, 'mask-image should be an SVG data URI');
  const svg = decodeURIComponent(m[1]);
  const attr = (name) => svg.match(new RegExp(`${name}='([^']*)'`))?.[1];
  return {
    viewBox: attr('viewBox').trim().split(/\s+/).map(Number),
    d: attr('d'),
    strokeWidth: Number(attr('stroke-width')),
    preserveAspectRatio: attr('preserveAspectRatio'),
    vectorEffect: attr('vector-effect'),
  };
}

/** Cubic segments of an absolute `M x,y C … C …` path. */
function segments(d) {
  assert.match(d.trim(), /^M[^MC]+(C[^MC]+)+$/, 'path should be one M followed by C segments');
  const n = d.match(/-?\d*\.?\d+(?:e-?\d+)?/g).map(Number);
  const segs = [];
  let p0 = [n[0], n[1]];
  for (let i = 2; i + 5 < n.length; i += 6) {
    const seg = [p0, [n[i], n[i + 1]], [n[i + 2], n[i + 3]], [n[i + 4], n[i + 5]]];
    segs.push(seg);
    p0 = seg[3];
  }
  return segs;
}

function bezier(seg, u) {
  const v = 1 - u;
  return [0, 1].map((k) => v * v * v * seg[0][k] + 3 * v * v * u * seg[1][k] + 3 * v * u * u * seg[2][k] + u * u * u * seg[3][k]);
}

/**
 * Worst distance, in amplitude units, between the path and `sign * sin(π/2 · along)` measured on
 * the cross axis. One wavelength is 4 units along the travel axis.
 */
function maxSineError(d, along, across, sign) {
  let worst = 0;
  for (const seg of segments(d)) {
    for (let i = 0; i <= 200; i++) {
      const p = bezier(seg, i / 200);
      worst = Math.max(worst, Math.abs(p[across] - sign * Math.sin((Math.PI / 2) * p[along])));
    }
  }
  return worst;
}

function extent(d, axis) {
  const pts = segments(d).flatMap((s) => [s[0], s[3]]).map((p) => p[axis]);
  return [Math.min(...pts), Math.max(...pts)];
}

const H_STROKE = '.nerv-wave::before';
const V_STROKE = '.nerv-wave-graph-vertical .nerv-wave::before';
const H_POINT = '.nerv-wave-point';
const V_POINT = '.nerv-wave-graph-vertical .nerv-wave-point';

describe('Wave graph — stroke geometry', () => {
  it('horizontal stroke path traces a sine within 0.2% of amplitude', () => {
    // SVG y grows downward, so an upward displacement of sin() is -sin() in path space.
    const { d } = maskSvg(rule(H_STROKE));
    const err = maxSineError(d, 0, 1, -1);
    assert.ok(err < 0.002, `horizontal path strays ${err} amplitude units from sin()`);
  });

  it('vertical stroke path traces the transposed sine within 0.2% of amplitude', () => {
    const { d } = maskSvg(rule(V_STROKE));
    const err = maxSineError(d, 1, 0, 1);
    assert.ok(err < 0.002, `vertical path strays ${err} amplitude units from sin()`);
  });

  it('stroke paths overrun both tile edges and leave headroom for peaks', () => {
    // Tile = exactly one wavelength (4 units) so mask repeats line up with the point math.
    // Overrun lets the SVG viewport cut the stroke flush at the seam; headroom keeps peaks whole.
    for (const [selector, along, across] of [[H_STROKE, 0, 1], [V_STROKE, 1, 0]]) {
      const { viewBox, d } = maskSvg(rule(selector));
      const start = viewBox[along];
      const length = viewBox[along + 2];
      assert.equal(start, 0, `${selector}: tile should start at 0`);
      assert.equal(length, 4, `${selector}: tile should be one wavelength (4 units)`);
      const [lo, hi] = extent(d, along);
      assert.ok(lo <= start - 0.5 && hi >= start + length + 0.5, `${selector}: path should overrun both tile edges`);
      const crossStart = viewBox[across];
      const crossEnd = crossStart + viewBox[across + 2];
      assert.ok(crossStart <= -2 && crossEnd >= 2, `${selector}: viewBox should leave one amplitude of headroom`);
    }
  });

  it('mask tile height matches the SVG viewBox so points and stroke share one scale', () => {
    // Point offset = amplitude × P% of the cross axis. Tile cross size = amplitude × N cq-units.
    // For the stroke's unit-amplitude peak to land where the point is, N / P must equal the
    // viewBox cross size (in amplitude units).
    for (const [stroke, point, cq, crossIdx] of [[H_STROKE, H_POINT, 'cqh', 3], [V_STROKE, V_POINT, 'cqw', 2]]) {
      const strokeBody = rule(stroke);
      const pointBody = rule(point);
      const n = Number(strokeBody.match(new RegExp(`var\\(--nerv-wave-amplitude\\)\\s*\\*\\s*(\\d+(?:\\.\\d+)?)${cq}`))?.[1]);
      const p = Number(pointBody.match(/var\(--nerv-wave-amplitude\)\s*\*\s*(\d+(?:\.\d+)?)%/)?.[1]);
      assert.ok(n > 0 && p > 0, `${stroke}: could not read tile and point amplitude multipliers`);
      assert.equal(n / p, maskSvg(strokeBody).viewBox[crossIdx], `${stroke}: tile/point scale mismatch`);
    }
  });

  it('stroke keeps uniform thickness under non-uniform stretch', () => {
    for (const selector of [H_STROKE, V_STROKE]) {
      const svg = maskSvg(rule(selector));
      assert.equal(svg.preserveAspectRatio, 'none', `${selector}: tile must stretch to the mask size`);
      assert.equal(svg.vectorEffect, 'non-scaling-stroke', `${selector}: stroke must not stretch with the tile`);
    }
  });

  it('high-contrast strokes are heavier than the defaults', () => {
    const contrast = media('prefers-contrast: more');
    for (const selector of [H_STROKE, V_STROKE]) {
      const base = maskSvg(rule(selector)).strokeWidth;
      const heavy = maskSvg(rule(selector, contrast)).strokeWidth;
      assert.ok(heavy > base, `${selector}: contrast stroke ${heavy} should exceed ${base}`);
    }
  });
});

describe('Wave graph — motion', () => {
  it('--nerv-wave-t is a registered inheriting number starting at 0', () => {
    // Unregistered custom properties flip discretely instead of interpolating.
    const m = css.match(/@property\s+--nerv-wave-t\s*\{([^}]*)\}/);
    assert.ok(m, 'missing @property --nerv-wave-t');
    assert.match(m[1], /syntax:\s*["']<number>["']/);
    assert.match(m[1], /inherits:\s*true/);
    assert.match(m[1], /initial-value:\s*0\b/);
  });

  it('nerv-wave-travel animates --nerv-wave-t from 0 to 1, linear and infinite', () => {
    const idx = css.search(/@keyframes\s+nerv-wave-travel\b/);
    assert.ok(idx !== -1, 'missing @keyframes nerv-wave-travel');
    const frames = braced(css, idx);
    assert.match(frames, /(from|0%)\s*\{[^}]*--nerv-wave-t:\s*0\b/);
    assert.match(frames, /(to|100%)\s*\{[^}]*--nerv-wave-t:\s*1\b/);
    const animation = rule('.nerv-wave')?.match(/animation:([^;]*);/)?.[1] ?? '';
    for (const part of ['nerv-wave-travel', 'linear', 'infinite']) {
      assert.ok(animation.includes(part), `.nerv-wave animation should include ${part}`);
    }
  });

  it('wave period scales with frequency, --nerv-wave-duration and --nerv-animation-speed', () => {
    const animation = rule('.nerv-wave')?.match(/animation:([^;]*);/)?.[1] ?? '';
    assert.match(
      animation,
      /var\(--nerv-wave-duration\)\s*\/\s*\(var\(--nerv-wave-frequency\)\s*\*\s*var\(--nerv-animation-speed\)\)/,
      'period should be duration / (frequency × animation-speed) so alert states speed waves up',
    );
  });

  it('--nerv-wave-duration is a :root token', () => {
    const root = rule(':root');
    assert.match(root, /--nerv-wave-duration:\s*[\d.]+m?s/);
  });

  it('stroke offset and point offset read the same clock and wave parameters', () => {
    const position = rule(H_STROKE).match(/mask-position:([^;]*);/)?.[1] ?? '';
    for (const v of ['--nerv-wave-t', '--nerv-wave-phase', '--nerv-wave-wavelength']) {
      assert.ok(position.includes(v), `stroke mask-position should use ${v}`);
    }
    const point = rule(H_POINT);
    const top = point.match(/top:([^;]*);/)?.[1] ?? '';
    assert.ok(top.includes('sin('), 'point top should use sin()');
    for (const v of ['--nerv-wave-t', '--nerv-wave-phase', '--nerv-wave-wavelength', '--nerv-wave-point-at', '--nerv-wave-amplitude']) {
      assert.ok(top.includes(v), `point top should use ${v}`);
    }
    for (const selector of [H_STROKE, H_POINT, V_STROKE, V_POINT]) {
      assert.doesNotMatch(rule(selector), /animation/, `${selector} must not run its own animation`);
    }
  });

  it('.nerv-wave-reverse reverses the clock', () => {
    assert.match(rule('.nerv-wave-reverse') ?? '', /animation-direction:\s*reverse/);
    assert.ok(css.indexOf('.nerv-wave-reverse {') > css.indexOf('.nerv-wave {'), 'reverse must follow the animation shorthand');
  });
});

describe('Wave graph — API surface', () => {
  it('.nerv-wave-graph supplies inheritable defaults, color following --nerv-primary', () => {
    const graph = rule('.nerv-wave-graph');
    assert.ok(graph, 'missing .nerv-wave-graph');
    for (const v of ['amplitude', 'wavelength', 'frequency', 'phase', 'point-at', 'point-size']) {
      assert.match(graph, new RegExp(`--nerv-wave-${v}:`), `.nerv-wave-graph should default --nerv-wave-${v}`);
    }
    assert.match(graph, /--nerv-wave-color:\s*var\(--nerv-primary\)/, 'uncolored waves follow the ambiance color');
  });

  it('.nerv-wave-{color} pins every glow-flagged data color and no others', () => {
    const tokens = readFileSync(TOKENS_SCSS, 'utf-8');
    const colors = [...tokens.matchAll(/'([a-z-]+)':\s*\(#[0-9a-fA-F]+,\s*'[^']*',\s*(true|false)\)/g)];
    assert.ok(colors.length > 0, 'could not read $nerv-colors');
    for (const [, name, glow] of colors) {
      const body = rule(`.nerv-wave-${name}`);
      if (glow === 'true') {
        assert.match(body ?? '', new RegExp(`--nerv-wave-color:\\s*var\\(--nerv-${name}\\)`), `.nerv-wave-${name} should pin --nerv-${name}`);
      } else {
        assert.equal(body, null, `.nerv-wave-${name} should not exist`);
      }
    }
    assert.ok(css.indexOf('.nerv-wave-cyan {') > css.indexOf('.nerv-wave-graph {'), 'modifiers must follow the graph defaults so they win on the box too');
  });

  it('.nerv-wave-graph-vertical swaps axes for stroke and points', () => {
    const stroke = rule(V_STROKE);
    assert.match(stroke ?? '', /mask-repeat:\s*repeat-y/);
    assert.match(stroke, /mask-position:[^;]*--nerv-wave-t[^;]*cqh/);
    const point = rule(V_POINT);
    assert.match(point ?? '', /left:[^;]*sin\(/, 'vertical points move side to side');
    assert.match(point, /top:[^;]*--nerv-wave-point-at/, 'vertical points sit at a fixed height');
  });

  it('.nerv-wave-graph leaves background, border and pseudo-elements free for composition', () => {
    // Grid marks (background-image) and reticle ticks (::after) are composed onto the box.
    const graph = rule('.nerv-wave-graph');
    assert.doesNotMatch(graph, /(^|\s)background/, '.nerv-wave-graph must not set background');
    assert.doesNotMatch(graph, /(^|\s)border/, '.nerv-wave-graph must not set border');
    assert.doesNotMatch(css, /\.nerv-wave-graph(-vertical)?::(before|after)/, '.nerv-wave-graph must not use its pseudo-elements');
  });

  it('glow filter sits on .nerv-wave, not on the masked stroke', () => {
    assert.match(rule('.nerv-wave') ?? '', /filter:[^;]*drop-shadow[^;]*--nerv-wave-color/);
    assert.doesNotMatch(rule(H_STROKE), /filter/, 'a filter on the masked element is cut away by its own mask');
  });
});

describe('Wave graph — accessibility', () => {
  it('prefers-reduced-motion stops the wave clock', () => {
    assert.match(rule('.nerv-wave', media('prefers-reduced-motion: reduce')) ?? '', /animation:\s*none/);
  });

  it('prefers-contrast: more strengthens strokes and separates points', () => {
    const contrast = media('prefers-contrast: more');
    assert.ok(rule(H_STROKE, contrast), 'contrast should restyle the horizontal stroke');
    assert.ok(rule(V_STROKE, contrast), 'contrast should restyle the vertical stroke');
    assert.match(rule(H_POINT, contrast) ?? '', /box-shadow:[^;]*--nerv-bg/, 'points get a void ring to separate from their line');
  });
});
