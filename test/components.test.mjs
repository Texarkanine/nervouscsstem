import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST_CSS = resolve(ROOT, 'dist/nerv.css');
const DIST_JS = resolve(ROOT, 'dist/nerv.js');

execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
const css = readFileSync(DIST_CSS, 'utf-8');

describe('Phase 5 — build integration', () => {
  // Behavior 1
  it('npm run build exits 0 and dist/nerv.css is non-empty', () => {
    assert.ok(existsSync(DIST_CSS), 'dist/nerv.css should exist');
    assert.ok(css.length > 0, 'compiled CSS should not be empty');
  });

  // Behavior 2
  it('npm run build:min still succeeds', () => {
    execSync('npm run build:min', { cwd: ROOT, stdio: 'pipe' });
    assert.ok(existsSync(resolve(ROOT, 'dist/nerv.min.css')), 'dist/nerv.min.css should exist');
  });
});

describe('Bar meter CSS', () => {
  // Behavior 3
  it('.nerv-bar-meter class exists with display: flex', () => {
    assert.match(css, /\.nerv-bar-meter\b[^-]/, 'missing .nerv-bar-meter class');
    const idx = css.indexOf('.nerv-bar-meter {');
    assert.ok(idx !== -1, '.nerv-bar-meter block not found');
    const block = css.slice(idx, idx + 300);
    assert.ok(block.includes('display: flex'), '.nerv-bar-meter should use display: flex');
  });

  // Behavior 4
  it('.nerv-bar-meter-bar child class exists', () => {
    assert.match(css, /\.nerv-bar-meter-bar\b/, 'missing .nerv-bar-meter-bar class');
  });

  // Behavior 5
  it('bar color gradient: nth-child selectors present for HSL color stepping', () => {
    assert.match(css, /\.nerv-bar-meter-bar:nth-child/, 'missing nth-child selectors for color stepping');
    assert.match(css, /hsl\(/, 'should use HSL color values for gradient');
  });

  // Behavior 6
  it('bar meter uses gap for discrete bar spacing', () => {
    const idx = css.indexOf('.nerv-bar-meter {');
    assert.ok(idx !== -1, '.nerv-bar-meter block not found');
    const block = css.slice(idx, idx + 300);
    assert.ok(block.includes('gap'), '.nerv-bar-meter should use gap for bar spacing');
  });

  // Behavior 6b
  it('bar meter zone markers: ::after pseudo-element present', () => {
    assert.match(css, /\.nerv-bar-meter-bar[^{]*::after/, 'missing ::after pseudo-element on bar meter bars');
  });
});

describe('Segment display CSS', () => {
  // Behavior 7
  it('.nerv-segment-display class exists', () => {
    assert.match(css, /\.nerv-segment-display\b/, 'missing .nerv-segment-display class');
  });

  // Behavior 8
  it('.nerv-segment-display::before exists with content: attr(data-ghost)', () => {
    assert.match(css, /\.nerv-segment-display::before/, 'missing .nerv-segment-display::before');
    const idx = css.indexOf('.nerv-segment-display::before');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('attr(data-ghost)'), '::before should use content: attr(data-ghost)');
  });

  // Behavior 9
  it('segment display references text-shadow for LED glow', () => {
    const idx = css.indexOf('.nerv-segment-display {');
    assert.ok(idx !== -1, '.nerv-segment-display block not found');
    const block = css.slice(idx, idx + 500);
    assert.ok(block.includes('text-shadow'), '.nerv-segment-display should use text-shadow for LED glow');
  });

  // Behavior 10
  it('segment display references DSEG7 font', () => {
    const idx = css.indexOf('.nerv-segment-display {');
    assert.ok(idx !== -1, '.nerv-segment-display block not found');
    const block = css.slice(idx, idx + 500);
    assert.ok(
      block.includes('DSEG7') || block.includes('nerv-type-segment'),
      '.nerv-segment-display should reference DSEG7 font or .nerv-type-segment'
    );
  });
});

describe('MAGI panel CSS', () => {
  // Behavior 11
  it('.nerv-magi-panel class exists with CSS Grid', () => {
    assert.match(css, /\.nerv-magi-panel\b/, 'missing .nerv-magi-panel class');
    const idx = css.indexOf('.nerv-magi-panel {');
    assert.ok(idx !== -1, '.nerv-magi-panel block not found');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('display: grid'), '.nerv-magi-panel should use display: grid');
  });

  // Behavior 12
  it('.nerv-magi-system class exists', () => {
    assert.match(css, /\.nerv-magi-system\b/, 'missing .nerv-magi-system class');
  });

  // Behavior 13
  it('.nerv-magi-output class exists', () => {
    assert.match(css, /\.nerv-magi-output\b/, 'missing .nerv-magi-output class');
  });

  // Behavior 14
  it('MAGI system boxes use panel-like border styling with glow', () => {
    const idx = css.indexOf('.nerv-magi-system {');
    assert.ok(idx !== -1, '.nerv-magi-system block not found');
    const block = css.slice(idx, idx + 600);
    assert.ok(block.includes('border'), '.nerv-magi-system should have border styling');
    assert.ok(block.includes('box-shadow'), '.nerv-magi-system should have box-shadow glow');
  });

  // Behavior 14b
  it('MAGI connecting lines: pseudo-elements present', () => {
    const hasSystemPseudo = css.includes('.nerv-magi-system::before') ||
                            css.includes('.nerv-magi-system::after') ||
                            css.includes('.nerv-magi-output::before') ||
                            css.includes('.nerv-magi-output::after');
    assert.ok(hasSystemPseudo, 'MAGI should have pseudo-elements for connecting lines');
  });
});

describe('Label box CSS', () => {
  // Behavior 15
  it('.nerv-label-box class exists with skewX', () => {
    assert.match(css, /\.nerv-label-box\b[^-]/, 'missing .nerv-label-box class');
    const idx = css.indexOf('.nerv-label-box {');
    assert.ok(idx !== -1, '.nerv-label-box block not found');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('skewX'), '.nerv-label-box should use skewX transform');
  });

  // Behavior 16
  it('.nerv-label-box-active class exists with background fill', () => {
    assert.match(css, /\.nerv-label-box-active\b/, 'missing .nerv-label-box-active class');
    const idx = css.indexOf('.nerv-label-box-active');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('background'), '.nerv-label-box-active should have background fill');
  });

  // Behavior 17
  it('.nerv-label-box-group row container exists with display: flex', () => {
    assert.match(css, /\.nerv-label-box-group\b/, 'missing .nerv-label-box-group class');
    const idx = css.indexOf('.nerv-label-box-group');
    const block = css.slice(idx, idx + 300);
    assert.ok(block.includes('display: flex'), '.nerv-label-box-group should use display: flex');
  });
});

describe('Status text CSS', () => {
  // Behavior 18
  it('.nerv-status-text base class exists', () => {
    assert.match(css, /\.nerv-status-text\b/, 'missing .nerv-status-text class');
  });

  // Behavior 19
  it('.nerv-status-nominal class exists referencing --nerv-green', () => {
    assert.match(css, /\.nerv-status-nominal\b/, 'missing .nerv-status-nominal class');
    const idx = css.indexOf('.nerv-status-nominal');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('--nerv-green'), '.nerv-status-nominal should reference --nerv-green');
  });

  // Behavior 20
  it('.nerv-status-caution class exists referencing --nerv-amber', () => {
    assert.match(css, /\.nerv-status-caution\b/, 'missing .nerv-status-caution class');
    const idx = css.indexOf('.nerv-status-caution');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('--nerv-amber'), '.nerv-status-caution should reference --nerv-amber');
  });

  // Behavior 21
  it('.nerv-status-danger class exists referencing --nerv-red', () => {
    assert.match(css, /\.nerv-status-danger\b/, 'missing .nerv-status-danger class');
    const idx = css.indexOf('.nerv-status-danger');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('--nerv-red'), '.nerv-status-danger should reference --nerv-red');
  });

  // Behavior 22
  it('.nerv-status-critical class exists referencing --nerv-red', () => {
    assert.match(css, /\.nerv-status-critical\b/, 'missing .nerv-status-critical class');
    const idx = css.indexOf('.nerv-status-critical');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('--nerv-red'), '.nerv-status-critical should reference --nerv-red');
  });
});

describe('nerv.js Phase 5 API', () => {
  // Behavior 23
  it('NERV.initGhostSegments is a function', async () => {
    const mod = await import(resolve(ROOT, 'src/nerv.js'));
    const NERV = mod.NERV || (mod.default && mod.default.NERV);
    assert.ok(NERV, 'module should export NERV object');
    assert.equal(typeof NERV.initGhostSegments, 'function', 'NERV.initGhostSegments should be a function');
  });

  // Behavior 24
  it('NERV.initBarMeters is a function', async () => {
    const mod = await import(resolve(ROOT, 'src/nerv.js'));
    const NERV = mod.NERV || (mod.default && mod.default.NERV);
    assert.ok(NERV, 'module should export NERV object');
    assert.equal(typeof NERV.initBarMeters, 'function', 'NERV.initBarMeters should be a function');
  });

  // Behavior 25
  it('NERV.init still exists (backward compatible)', async () => {
    const mod = await import(resolve(ROOT, 'src/nerv.js'));
    const NERV = mod.NERV || (mod.default && mod.default.NERV);
    assert.ok(NERV, 'module should export NERV object');
    assert.equal(typeof NERV.init, 'function', 'NERV.init should be a function');
  });
});

describe('Regression — Phase 1–4', () => {
  // Behavior 26
  it('Foundation tokens still present', () => {
    assert.match(css, /--nerv-amber\s*:/, 'missing --nerv-amber token');
    assert.match(css, /--nerv-primary\s*:/, 'missing --nerv-primary meta-token');
    assert.match(css, /\.nerv-glow\b[^-]/, 'missing .nerv-glow class');
  });

  // Behavior 27
  it('Effects selectors still present', () => {
    assert.match(css, /\.nerv-scanlines\b/, 'missing .nerv-scanlines class');
    assert.match(css, /\.nerv-flicker\b[^-]/, 'missing .nerv-flicker class');
    assert.match(css, /\.nerv-glitch\b/, 'missing .nerv-glitch class');
  });

  // Behavior 28
  it('Structural selectors still present', () => {
    assert.match(css, /\.nerv-panel\b[^-]/, 'missing .nerv-panel class');
    assert.match(css, /\.nerv-divider\b[^-]/, 'missing .nerv-divider class');
    assert.match(css, /\.nerv-grid-marks\b/, 'missing .nerv-grid-marks class');
  });

  // Behavior 29
  it('Phase 4 selectors still present', () => {
    assert.match(css, /\.nerv-stripe\b[^-]/, 'missing .nerv-stripe class');
    assert.match(css, /\.nerv-hex-grid\b/, 'missing .nerv-hex-grid class');
    assert.match(css, /\.nerv-radar\b[^-]/, 'missing .nerv-radar class');
  });
});
