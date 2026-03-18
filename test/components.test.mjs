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

describe('Phase 5 Enhancement — Token additions', () => {
  it('--nerv-white token present in :root output', () => {
    assert.match(css, /--nerv-white\s*:/, 'missing --nerv-white token in :root');
  });

  it('--nerv-white-rgb token present in :root output', () => {
    assert.match(css, /--nerv-white-rgb\s*:/, 'missing --nerv-white-rgb token in :root');
  });
});

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

  // Behavior 5 (modified for color-mix enhancement)
  it('bar color gradient: nth-child selectors present with --nerv-bar-pct percentage values', () => {
    assert.match(css, /\.nerv-bar-meter-bar:nth-child/, 'missing nth-child selectors for color stepping');
    assert.match(css, /--nerv-bar-pct\s*:/, 'should set --nerv-bar-pct values for gradient');
    assert.doesNotMatch(css, /\.nerv-bar-meter-bar:nth-child[^}]*hsl\(/s, 'should not use hsl() values per bar (replaced by color-mix)');
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

  // Enhancement: --nerv-bar-from custom property
  it('--nerv-bar-from custom property declared on .nerv-bar-meter', () => {
    const idx = css.indexOf('.nerv-bar-meter {');
    assert.ok(idx !== -1, '.nerv-bar-meter block not found');
    const block = css.slice(idx, idx + 500);
    assert.ok(block.includes('--nerv-bar-from'), '.nerv-bar-meter should declare --nerv-bar-from');
  });

  // Enhancement: --nerv-bar-to custom property
  it('--nerv-bar-to custom property declared on .nerv-bar-meter', () => {
    const idx = css.indexOf('.nerv-bar-meter {');
    assert.ok(idx !== -1, '.nerv-bar-meter block not found');
    const block = css.slice(idx, idx + 500);
    assert.ok(block.includes('--nerv-bar-to'), '.nerv-bar-meter should declare --nerv-bar-to');
  });

  // Enhancement: color-mix for active bars
  it('.nerv-bar-active uses color-mix for background color', () => {
    const idx = css.indexOf('.nerv-bar-active');
    assert.ok(idx !== -1, '.nerv-bar-active block not found');
    const block = css.slice(idx, idx + 300);
    assert.ok(block.includes('color-mix'), '.nerv-bar-active should use color-mix for background');
  });

  // Enhancement: SCSS loop generates --nerv-bar-pct (not hsl)
  it('SCSS loop generates --nerv-bar-pct values, not hsl() values per bar', () => {
    const nthChildMatches = css.match(/\.nerv-bar-meter-bar:nth-child\(\d+\)\s*\{[^}]*\}/g) || [];
    assert.ok(nthChildMatches.length > 0, 'should have nth-child rules for bars');
    for (const rule of nthChildMatches) {
      assert.ok(rule.includes('--nerv-bar-pct'), `nth-child rule should set --nerv-bar-pct: ${rule.slice(0, 60)}...`);
      assert.ok(!rule.includes('hsl('), `nth-child rule should not contain hsl(): ${rule.slice(0, 60)}...`);
    }
  });

  // Enhancement: vertical orientation
  it('.nerv-bar-meter-vertical class exists with column in flex-direction', () => {
    assert.match(css, /\.nerv-bar-meter-vertical\b/, 'missing .nerv-bar-meter-vertical class');
    const idx = css.indexOf('.nerv-bar-meter-vertical');
    assert.ok(idx !== -1, '.nerv-bar-meter-vertical block not found');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('column'), '.nerv-bar-meter-vertical should use column flex-direction');
  });

  // Enhancement: --nerv-bar-gap
  it('--nerv-bar-gap custom property referenced in .nerv-bar-meter CSS', () => {
    const idx = css.indexOf('.nerv-bar-meter {');
    assert.ok(idx !== -1, '.nerv-bar-meter block not found');
    const block = css.slice(idx, idx + 500);
    assert.ok(block.includes('--nerv-bar-gap'), '.nerv-bar-meter should reference --nerv-bar-gap');
  });

  // Enhancement: --nerv-bar-width
  it('--nerv-bar-width custom property referenced in .nerv-bar-meter-bar CSS', () => {
    const idx = css.indexOf('.nerv-bar-meter-bar {');
    assert.ok(idx !== -1, '.nerv-bar-meter-bar block not found');
    const block = css.slice(idx, idx + 500);
    assert.ok(block.includes('--nerv-bar-width'), '.nerv-bar-meter-bar should reference --nerv-bar-width');
  });
});

describe('Bar meter gradient presets', () => {
  function extractBlock(className) {
    const idx = css.indexOf(className + ' {');
    assert.ok(idx !== -1, `${className} block not found in compiled CSS`);
    const closeIdx = css.indexOf('}', idx);
    return css.slice(idx, closeIdx + 1);
  }

  it('.nerv-bar-thermal sets --nerv-bar-from to green and --nerv-bar-to to red', () => {
    const block = extractBlock('.nerv-bar-thermal');
    assert.ok(block.includes('--nerv-bar-from: var(--nerv-green)'), 'thermal should set --nerv-bar-from to --nerv-green');
    assert.ok(block.includes('--nerv-bar-to: var(--nerv-red)'), 'thermal should set --nerv-bar-to to --nerv-red');
  });

  it('.nerv-bar-energy sets --nerv-bar-from to cyan and --nerv-bar-to to blue', () => {
    const block = extractBlock('.nerv-bar-energy');
    assert.ok(block.includes('--nerv-bar-from: var(--nerv-cyan)'), 'energy should set --nerv-bar-from to --nerv-cyan');
    assert.ok(block.includes('--nerv-bar-to: var(--nerv-blue)'), 'energy should set --nerv-bar-to to --nerv-blue');
  });

  it('.nerv-bar-warning sets --nerv-bar-from to amber and --nerv-bar-to to red', () => {
    const block = extractBlock('.nerv-bar-warning');
    assert.ok(block.includes('--nerv-bar-from: var(--nerv-amber)'), 'warning should set --nerv-bar-from to --nerv-amber');
    assert.ok(block.includes('--nerv-bar-to: var(--nerv-red)'), 'warning should set --nerv-bar-to to --nerv-red');
  });

  it('.nerv-bar-field sets --nerv-bar-from to void and --nerv-bar-to to amber', () => {
    const block = extractBlock('.nerv-bar-field');
    assert.ok(block.includes('--nerv-bar-from: var(--nerv-void)'), 'field should set --nerv-bar-from to --nerv-void');
    assert.ok(block.includes('--nerv-bar-to: var(--nerv-amber)'), 'field should set --nerv-bar-to to --nerv-amber');
  });

  it('preset classes contain only color token overrides, no layout properties', () => {
    const presets = ['.nerv-bar-thermal', '.nerv-bar-energy', '.nerv-bar-warning', '.nerv-bar-field'];
    const forbidden = ['display', 'flex', 'gap', 'height', 'width', 'grid'];
    for (const cls of presets) {
      const block = extractBlock(cls);
      for (const prop of forbidden) {
        assert.ok(!block.includes(prop), `${cls} should not contain layout property "${prop}"`);
      }
    }
  });

  it('regression: .nerv-bar-meter defaults still cyan→blue', () => {
    const idx = css.indexOf('.nerv-bar-meter {');
    assert.ok(idx !== -1, '.nerv-bar-meter block not found');
    const block = css.slice(idx, idx + 500);
    assert.ok(block.includes('--nerv-bar-from: var(--nerv-cyan)'), 'default --nerv-bar-from should still be --nerv-cyan');
    assert.ok(block.includes('--nerv-bar-to: var(--nerv-blue)'), 'default --nerv-bar-to should still be --nerv-blue');
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

  // Enhancement: per-system-box color property
  it('--nerv-magi-system-color custom property declared on .nerv-magi-system', () => {
    const idx = css.indexOf('.nerv-magi-system {');
    assert.ok(idx !== -1, '.nerv-magi-system block not found');
    const block = css.slice(idx, idx + 600);
    assert.ok(block.includes('--nerv-magi-system-color'), '.nerv-magi-system should declare --nerv-magi-system-color');
  });

  // Enhancement: connecting line uses per-system color
  it('.nerv-magi-system::after references --nerv-magi-system-color', () => {
    const idx = css.indexOf('.nerv-magi-system::after');
    assert.ok(idx !== -1, '.nerv-magi-system::after block not found');
    const closeIdx = css.indexOf('}', idx);
    const block = css.slice(idx, closeIdx + 1);
    assert.ok(block.includes('--nerv-magi-system-color'), '.nerv-magi-system::after should reference --nerv-magi-system-color');
    assert.ok(!block.includes('var(--nerv-magi-color)'), '.nerv-magi-system::after should NOT reference --nerv-magi-color directly');
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

  // Enhancement: hover state
  it('.nerv-label-box:hover styles exist in compiled CSS', () => {
    assert.match(css, /\.nerv-label-box:hover\b/, 'missing .nerv-label-box:hover in compiled CSS');
  });

  // Enhancement: active/press state
  it('.nerv-label-box:active styles exist in compiled CSS', () => {
    assert.match(css, /\.nerv-label-box:active\b/, 'missing .nerv-label-box:active in compiled CSS');
  });

  // Enhancement: focus-visible state
  it('.nerv-label-box:focus-visible styles exist in compiled CSS', () => {
    assert.match(css, /\.nerv-label-box:focus-visible\b/, 'missing .nerv-label-box:focus-visible in compiled CSS');
  });

  // Enhancement: reverse-angle modifier
  it('.nerv-label-box-reverse class exists', () => {
    assert.match(css, /\.nerv-label-box-reverse\b/, 'missing .nerv-label-box-reverse class');
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

  // Enhancement: initLabelBoxGroups
  it('NERV.initLabelBoxGroups is a function', async () => {
    const mod = await import(resolve(ROOT, 'src/nerv.js'));
    const NERV = mod.NERV || (mod.default && mod.default.NERV);
    assert.ok(NERV, 'module should export NERV object');
    assert.equal(typeof NERV.initLabelBoxGroups, 'function', 'NERV.initLabelBoxGroups should be a function');
  });

  // Enhancement: initMagiPanels
  it('NERV.initMagiPanels is a function', async () => {
    const mod = await import(resolve(ROOT, 'src/nerv.js'));
    const NERV = mod.NERV || (mod.default && mod.default.NERV);
    assert.ok(NERV, 'module should export NERV object');
    assert.equal(typeof NERV.initMagiPanels, 'function', 'NERV.initMagiPanels should be a function');
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
