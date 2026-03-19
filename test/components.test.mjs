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

describe('List styling CSS', () => {
  it('B1: .nerv-list class exists with list-style: none and flex column layout', () => {
    assert.match(css, /\.nerv-list\b[^-]/, 'missing .nerv-list class');
    const idx = css.indexOf('.nerv-list {');
    assert.ok(idx !== -1, '.nerv-list block not found');
    const block = css.slice(idx, idx + 600);
    assert.ok(block.includes('list-style'), '.nerv-list should set list-style');
    assert.ok(block.includes('display: flex'), '.nerv-list should use display: flex');
    assert.ok(block.includes('column'), '.nerv-list should use flex-direction: column');
  });

  it('B2: .nerv-list li applies clip-path polygon for pillbox shape', () => {
    assert.match(css, /\.nerv-list[^{]*li\b/, 'missing .nerv-list li rule');
    const liMatch = css.match(/\.nerv-list[^{]*li\s*\{[^}]*\}/);
    assert.ok(liMatch, '.nerv-list li block not found');
    assert.ok(liMatch[0].includes('clip-path'), '.nerv-list li should use clip-path');
    assert.ok(liMatch[0].includes('polygon'), '.nerv-list li clip-path should use polygon()');
  });

  it('B3: --nerv-list-color custom property declared on .nerv-list', () => {
    const idx = css.indexOf('.nerv-list {');
    assert.ok(idx !== -1, '.nerv-list block not found');
    const block = css.slice(idx, idx + 600);
    assert.ok(block.includes('--nerv-list-color'), '.nerv-list should declare --nerv-list-color');
  });

  it('B4: --nerv-list-color-rgb custom property declared on .nerv-list', () => {
    const idx = css.indexOf('.nerv-list {');
    assert.ok(idx !== -1, '.nerv-list block not found');
    const block = css.slice(idx, idx + 600);
    assert.ok(block.includes('--nerv-list-color-rgb'), '.nerv-list should declare --nerv-list-color-rgb');
  });

  it('B5: --nerv-list-inset custom property declared on .nerv-list', () => {
    const idx = css.indexOf('.nerv-list {');
    assert.ok(idx !== -1, '.nerv-list block not found');
    const block = css.slice(idx, idx + 600);
    assert.ok(block.includes('--nerv-list-inset'), '.nerv-list should declare --nerv-list-inset');
  });

  it('B6: .nerv-list-amber color variant exists and sets --nerv-list-color', () => {
    assert.match(css, /\.nerv-list-amber\b/, 'missing .nerv-list-amber color variant');
    const idx = css.indexOf('.nerv-list-amber');
    assert.ok(idx !== -1, '.nerv-list-amber block not found');
    const block = css.slice(idx, css.indexOf('}', idx) + 1);
    assert.ok(block.includes('--nerv-list-color'), '.nerv-list-amber should set --nerv-list-color');
  });

  it('B7: prefers-contrast: more media query targets .nerv-list items', () => {
    const re = /prefers-contrast:\s*more\)[^}]*\.nerv-list/;
    assert.match(css, re, 'a prefers-contrast: more block should reference .nerv-list');
  });

  it('B8: .nerv-list li background uses rgba with --nerv-list-color-rgb', () => {
    const liMatch = css.match(/\.nerv-list[^{]*li\s*\{[^}]*\}/);
    assert.ok(liMatch, '.nerv-list li block not found');
    assert.ok(liMatch[0].includes('--nerv-list-color-rgb'), '.nerv-list li should reference --nerv-list-color-rgb for background');
  });

  it('B9: regression — existing component selectors still present', () => {
    assert.match(css, /\.nerv-bar-meter\b[^-]/, 'missing .nerv-bar-meter class');
    assert.match(css, /\.nerv-label-box\b[^-]/, 'missing .nerv-label-box class');
    assert.match(css, /\.nerv-segment-display\b/, 'missing .nerv-segment-display class');
  });

  it('B10: --nerv-list-angle custom property declared on .nerv-list', () => {
    const idx = css.indexOf('.nerv-list {');
    assert.ok(idx !== -1, '.nerv-list block not found');
    const block = css.slice(idx, idx + 800);
    assert.ok(block.includes('--nerv-list-angle'), '.nerv-list should declare --nerv-list-angle');
  });

  it('B11: .nerv-list li uses transform: rotate with --nerv-list-angle and origin at left point', () => {
    const liMatch = css.match(/\.nerv-list[^{]*li\s*\{[^}]*\}/);
    assert.ok(liMatch, '.nerv-list li block not found');
    assert.ok(liMatch[0].includes('rotate'), '.nerv-list li should use rotate transform');
    assert.ok(liMatch[0].includes('--nerv-list-angle'), '.nerv-list li transform should reference --nerv-list-angle');
    assert.ok(liMatch[0].includes('transform-origin'), '.nerv-list li should set transform-origin');
  });

  it('B12: .nerv-list-angled class exists and sets --nerv-list-angle to -45deg', () => {
    assert.match(css, /\.nerv-list-angled\b[^-]/, 'missing .nerv-list-angled class');
    const idx = css.indexOf('.nerv-list-angled {');
    assert.ok(idx !== -1, '.nerv-list-angled block not found');
    const block = css.slice(idx, css.indexOf('}', idx) + 1);
    assert.ok(block.includes('--nerv-list-angle'), '.nerv-list-angled should set --nerv-list-angle');
    assert.ok(block.includes('-45deg'), '.nerv-list-angled should set angle to -45deg');
  });

  it('B13: .nerv-list-angled-reverse class exists and sets --nerv-list-angle to 45deg', () => {
    assert.match(css, /\.nerv-list-angled-reverse\b/, 'missing .nerv-list-angled-reverse class');
    const idx = css.indexOf('.nerv-list-angled-reverse');
    assert.ok(idx !== -1, '.nerv-list-angled-reverse block not found');
    const block = css.slice(idx, css.indexOf('}', idx) + 1);
    assert.ok(block.includes('--nerv-list-angle'), '.nerv-list-angled-reverse should set --nerv-list-angle');
    assert.ok(block.includes('45deg'), '.nerv-list-angled-reverse should set angle to 45deg');
  });

  it('B14: .nerv-list-rect > li removes clip-path (shape-only, no border)', () => {
    assert.match(css, /\.nerv-list-rect\b/, 'missing .nerv-list-rect class');
    const idx = css.indexOf('.nerv-list-rect');
    assert.ok(idx !== -1, '.nerv-list-rect block not found');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('clip-path: none'), '.nerv-list-rect li should set clip-path: none');
  });

  it('B15: .nerv-list-arrow > li has clip-path polygon with left point and flat right edge', () => {
    assert.match(css, /\.nerv-list-arrow\b[^-]/, 'missing .nerv-list-arrow class');
    const idx = css.indexOf('.nerv-list-arrow ');
    assert.ok(idx !== -1, '.nerv-list-arrow block not found');
    const block = css.slice(idx, idx + 500);
    assert.ok(block.includes('clip-path'), '.nerv-list-arrow li should have clip-path');
    assert.ok(block.includes('polygon'), '.nerv-list-arrow li should use polygon()');
    assert.ok(block.includes('100% 0%'), '.nerv-list-arrow polygon should have flush top-right corner');
    assert.ok(block.includes('100% 100%'), '.nerv-list-arrow polygon should have flush bottom-right corner');
  });

  it('B16: .nerv-list-angled uses --nerv-list-gap for spacing', () => {
    const idx = css.indexOf('.nerv-list-angled {');
    assert.ok(idx !== -1, '.nerv-list-angled block not found');
    const block = css.slice(idx, css.indexOf('}', idx) + 1);
    assert.ok(block.includes('--nerv-list-gap'), '.nerv-list-angled should set --nerv-list-gap');
  });

  it('B17: .nerv-list-bordered li has real border using --nerv-border-width', () => {
    assert.match(css, /\.nerv-list-bordered\b/, 'missing .nerv-list-bordered class');
    const idx = css.indexOf('.nerv-list-bordered');
    assert.ok(idx !== -1, '.nerv-list-bordered block not found');
    const block = css.slice(idx, idx + 800);
    assert.ok(block.includes('border:'), '.nerv-list-bordered li should set real border');
    assert.ok(block.includes('--nerv-border-width'), '.nerv-list-bordered border should use --nerv-border-width token');
  });

  it('B18: .nerv-list-outline li has real border and --nerv-bg background', () => {
    assert.match(css, /\.nerv-list-outline\b/, 'missing .nerv-list-outline class');
    const outlineIdx = css.indexOf('.nerv-list-outline');
    assert.ok(outlineIdx !== -1, '.nerv-list-outline not found');
    const block = css.slice(outlineIdx, outlineIdx + 800);
    assert.ok(block.includes('border:'), '.nerv-list-outline li should set real border');
    assert.ok(block.includes('--nerv-bg'), '.nerv-list-outline li should use --nerv-bg background');
  });

  it('B19: .nerv-list-solid sets opaque background using list color', () => {
    assert.match(css, /\.nerv-list-solid\b/, 'missing .nerv-list-solid class');
    const solidIdx = css.indexOf('.nerv-list-solid');
    assert.ok(solidIdx !== -1, '.nerv-list-solid not found');
    const block = css.slice(solidIdx, solidIdx + 600);
    assert.ok(block.includes('--nerv-list-color'), '.nerv-list-solid li should use opaque list color');
    assert.ok(block.includes('--nerv-bg'), '.nerv-list-solid li should set text to --nerv-bg');
  });

  it('B20: .nerv-list-arrow-reverse > li has clip-path polygon with flat left and pointed right', () => {
    assert.match(css, /\.nerv-list-arrow-reverse\b/, 'missing .nerv-list-arrow-reverse class');
    const idx = css.indexOf('.nerv-list-arrow-reverse');
    assert.ok(idx !== -1, '.nerv-list-arrow-reverse block not found');
    const block = css.slice(idx, idx + 500);
    assert.ok(block.includes('clip-path'), '.nerv-list-arrow-reverse li should have clip-path');
    assert.ok(block.includes('polygon'), '.nerv-list-arrow-reverse li should use polygon()');
    assert.ok(block.includes('0% 0%'), '.nerv-list-arrow-reverse polygon should have flush top-left corner');
    assert.ok(block.includes('100% 50%'), '.nerv-list-arrow-reverse polygon should have pointed right edge');
  });

  it('B21: .nerv-list-para uses skewX pseudo-element for true parallelogram', () => {
    assert.match(css, /\.nerv-list-para\b/, 'missing .nerv-list-para class');
    const idx = css.indexOf('.nerv-list-para');
    assert.ok(idx !== -1, '.nerv-list-para block not found');
    const block = css.slice(idx, idx + 1200);
    assert.ok(block.includes('skewX'), '.nerv-list-para should use skewX transform on pseudo');
    assert.ok(block.includes('--nerv-list-skew'), '.nerv-list-para should reference --nerv-list-skew');
    assert.ok(block.includes('clip-path: none'), '.nerv-list-para li should remove clip-path');
  });

  it('B23: .nerv-list-para > li resets border to prevent double-border with bordered/outline', () => {
    const paraLiRe = /\.nerv-list-para\s*>\s*li\s*\{[^}]*\}/;
    const match = css.match(paraLiRe);
    assert.ok(match, '.nerv-list-para > li block not found');
    assert.ok(match[0].includes('border: 0'), '.nerv-list-para > li should reset border to 0');
  });

  it('B22: --nerv-list-gap custom property declared on .nerv-list', () => {
    const idx = css.indexOf('.nerv-list {');
    assert.ok(idx !== -1, '.nerv-list block not found');
    const block = css.slice(idx, idx + 800);
    assert.ok(block.includes('--nerv-list-gap'), '.nerv-list should declare --nerv-list-gap');
    assert.ok(block.includes('gap: var(--nerv-list-gap'), '.nerv-list should use --nerv-list-gap for gap');
  });
});

describe('Form styling CSS', () => {
  it('B1: .nerv-input class exists with border and background styling', () => {
    assert.match(css, /\.nerv-input\b[^-]/, 'missing .nerv-input class');
    const idx = css.indexOf('.nerv-input {');
    assert.ok(idx !== -1, '.nerv-input block not found');
    const block = css.slice(idx, idx + 600);
    assert.ok(block.includes('border'), '.nerv-input should have border styling');
    assert.ok(block.includes('background'), '.nerv-input should have background styling');
  });

  it('B2: .nerv-input declares --nerv-form-color custom property', () => {
    const idx = css.indexOf('.nerv-input {');
    assert.ok(idx !== -1, '.nerv-input block not found');
    const block = css.slice(idx, idx + 600);
    assert.ok(block.includes('--nerv-form-color'), '.nerv-input should declare --nerv-form-color');
  });

  it('B3: .nerv-input:focus styles exist with box-shadow glow', () => {
    assert.match(css, /\.nerv-input:focus\b/, 'missing .nerv-input:focus in compiled CSS');
    const idx = css.indexOf('.nerv-input:focus');
    assert.ok(idx !== -1, '.nerv-input:focus block not found');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('box-shadow'), '.nerv-input:focus should have box-shadow glow');
  });

  it('B4: .nerv-input::placeholder styles exist', () => {
    assert.match(css, /\.nerv-input::placeholder\b/, 'missing .nerv-input::placeholder in compiled CSS');
  });

  it('B5: .nerv-textarea class exists with border styling', () => {
    assert.match(css, /\.nerv-textarea\b[^-]/, 'missing .nerv-textarea class');
    const idx = css.indexOf('.nerv-textarea {');
    assert.ok(idx !== -1, '.nerv-textarea block not found');
    const block = css.slice(idx, idx + 600);
    assert.ok(block.includes('border'), '.nerv-textarea should have border styling');
  });

  it('B6: .nerv-textarea:focus exists with box-shadow glow', () => {
    assert.match(css, /\.nerv-textarea:focus\b/, 'missing .nerv-textarea:focus in compiled CSS');
    const idx = css.indexOf('.nerv-textarea:focus');
    assert.ok(idx !== -1, '.nerv-textarea:focus block not found');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('box-shadow'), '.nerv-textarea:focus should have box-shadow glow');
  });

  it('B7: .nerv-select class exists with appearance: none', () => {
    assert.match(css, /\.nerv-select\b[^-]/, 'missing .nerv-select class');
    const idx = css.indexOf('.nerv-select {');
    assert.ok(idx !== -1, '.nerv-select block not found');
    const block = css.slice(idx, idx + 600);
    assert.ok(block.includes('appearance'), '.nerv-select should set appearance');
  });

  it('B8: .nerv-select uses background-image for custom dropdown arrow', () => {
    const idx = css.indexOf('.nerv-select {');
    assert.ok(idx !== -1, '.nerv-select block not found');
    const block = css.slice(idx, idx + 800);
    assert.ok(block.includes('background-image'), '.nerv-select should use background-image for arrow');
    assert.ok(block.includes('url('), '.nerv-select background-image should use url()');
  });

  it('B9: .nerv-checkbox class exists with appearance: none', () => {
    assert.match(css, /\.nerv-checkbox\b[^-]/, 'missing .nerv-checkbox class');
    const idx = css.indexOf('.nerv-checkbox {');
    assert.ok(idx !== -1, '.nerv-checkbox block not found');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('appearance'), '.nerv-checkbox should set appearance');
  });

  it('B10: .nerv-checkbox:checked styling exists', () => {
    assert.match(css, /\.nerv-checkbox:checked\b/, 'missing .nerv-checkbox:checked in compiled CSS');
  });

  it('B11: .nerv-radio class exists with appearance: none', () => {
    assert.match(css, /\.nerv-radio\b[^-]/, 'missing .nerv-radio class');
    const idx = css.indexOf('.nerv-radio {');
    assert.ok(idx !== -1, '.nerv-radio block not found');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('appearance'), '.nerv-radio should set appearance');
  });

  it('B12: .nerv-radio:checked styling exists', () => {
    assert.match(css, /\.nerv-radio:checked\b/, 'missing .nerv-radio:checked in compiled CSS');
  });

  it('B13: .nerv-btn class exists with border and background', () => {
    assert.match(css, /\.nerv-btn\b[^-]/, 'missing .nerv-btn class');
    const idx = css.indexOf('.nerv-btn {');
    assert.ok(idx !== -1, '.nerv-btn block not found');
    const block = css.slice(idx, idx + 600);
    assert.ok(block.includes('border'), '.nerv-btn should have border styling');
    assert.ok(block.includes('background'), '.nerv-btn should have background styling');
  });

  it('B14: .nerv-btn:hover styles exist', () => {
    assert.match(css, /\.nerv-btn:hover\b/, 'missing .nerv-btn:hover in compiled CSS');
  });

  it('B15: .nerv-btn:focus-visible styles exist', () => {
    assert.match(css, /\.nerv-btn:focus-visible\b/, 'missing .nerv-btn:focus-visible in compiled CSS');
  });

  it('B16: prefers-contrast: more media query targets form elements', () => {
    const contrastRe = /prefers-contrast:\s*more\)[^}]*(?:\.nerv-input|\.nerv-btn|\.nerv-select)/;
    assert.match(css, contrastRe,
      'a prefers-contrast: more block should reference form elements'
    );
  });

  it('B18: .nerv-form-red color variant exists and sets --nerv-form-color', () => {
    assert.match(css, /\.nerv-form-red\b/, 'missing .nerv-form-red color variant');
    const idx = css.indexOf('.nerv-form-red');
    assert.ok(idx !== -1, '.nerv-form-red block not found');
    const block = css.slice(idx, css.indexOf('}', idx) + 1);
    assert.ok(block.includes('--nerv-form-color'), '.nerv-form-red should set --nerv-form-color');
  });

  it('B19: .nerv-form-green color variant exists and sets --nerv-form-color-rgb', () => {
    assert.match(css, /\.nerv-form-green\b/, 'missing .nerv-form-green color variant');
    const idx = css.indexOf('.nerv-form-green');
    assert.ok(idx !== -1, '.nerv-form-green block not found');
    const block = css.slice(idx, css.indexOf('}', idx) + 1);
    assert.ok(block.includes('--nerv-form-color-rgb'), '.nerv-form-green should set --nerv-form-color-rgb');
  });

  it('B17: regression — existing component selectors still present', () => {
    assert.match(css, /\.nerv-bar-meter\b[^-]/, 'missing .nerv-bar-meter class');
    assert.match(css, /\.nerv-label-box\b[^-]/, 'missing .nerv-label-box class');
    assert.match(css, /\.nerv-list\b[^-]/, 'missing .nerv-list class');
  });
});

describe('Table styling CSS', () => {
  // --- Base Table Styling ---

  it('B1: .nerv-table class exists with border and background styling', () => {
    assert.match(css, /\.nerv-table\b[^-]/, 'missing .nerv-table class');
    const idx = css.indexOf('.nerv-table {');
    assert.ok(idx !== -1, '.nerv-table block not found');
    const block = css.slice(idx, idx + 800);
    assert.ok(block.includes('border'), '.nerv-table should have border styling');
  });

  it('B2: .nerv-table declares --nerv-table-color and --nerv-table-color-rgb', () => {
    const idx = css.indexOf('.nerv-table {');
    assert.ok(idx !== -1, '.nerv-table block not found');
    const block = css.slice(idx, idx + 800);
    assert.ok(block.includes('--nerv-table-color'), '.nerv-table should declare --nerv-table-color');
    assert.ok(block.includes('--nerv-table-color-rgb'), '.nerv-table should declare --nerv-table-color-rgb');
  });

  it('B3: .nerv-table th and .nerv-table td have border styling', () => {
    const hasTh = css.includes('.nerv-table th') || css.includes('.nerv-table td');
    assert.ok(hasTh, 'CSS should contain .nerv-table th or .nerv-table td selectors');
    const cellMatch = css.match(/\.nerv-table\s+(?:th|td)\s*(?:,\s*\.nerv-table\s+(?:th|td)\s*)?\{[^}]*\}/);
    assert.ok(cellMatch, '.nerv-table th/td block not found');
    assert.ok(cellMatch[0].includes('border'), '.nerv-table th/td should have border styling');
  });

  // --- Fill/Border Modes ---

  it('B4: .nerv-table-bordered adds border to cells', () => {
    assert.match(css, /\.nerv-table-bordered\b/, 'missing .nerv-table-bordered class');
    const idx = css.indexOf('.nerv-table-bordered');
    assert.ok(idx !== -1, '.nerv-table-bordered block not found');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('border'), '.nerv-table-bordered should set border on cells');
  });

  it('B5: .nerv-table-outline sets border + dark bg', () => {
    assert.match(css, /\.nerv-table-outline\b/, 'missing .nerv-table-outline class');
    const idx = css.indexOf('.nerv-table-outline');
    assert.ok(idx !== -1, '.nerv-table-outline block not found');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('border'), '.nerv-table-outline should set border');
    assert.ok(block.includes('background'), '.nerv-table-outline should set background');
  });

  it('B6: .nerv-table-solid sets opaque fill and cutout text', () => {
    assert.match(css, /\.nerv-table-solid\b/, 'missing .nerv-table-solid class');
    const idx = css.indexOf('.nerv-table-solid');
    assert.ok(idx !== -1, '.nerv-table-solid block not found');
    const block = css.slice(idx, idx + 400);
    assert.ok(block.includes('--nerv-table-color'), '.nerv-table-solid should reference --nerv-table-color for background');
    assert.ok(block.includes('--nerv-bg'), '.nerv-table-solid should reference --nerv-bg for cutout text');
  });

  // --- Color Variants ---

  it('B7: at least one .nerv-table-{color} variant exists with --nerv-table-color', () => {
    const hasVariant = css.includes('.nerv-table-amber') || css.includes('.nerv-table-red') || css.includes('.nerv-table-green');
    assert.ok(hasVariant, 'should have at least one auto-generated .nerv-table-{color} variant');
    const idx = css.indexOf('.nerv-table-amber');
    if (idx !== -1) {
      const block = css.slice(idx, css.indexOf('}', idx) + 1);
      assert.ok(block.includes('--nerv-table-color'), '.nerv-table-amber should set --nerv-table-color');
    }
  });

  // --- Geometric Row Types: Row-Level ---

  it('B8: triangle row class exists in compiled CSS', () => {
    assert.match(css, /\.nerv-table-triangle\b/, 'missing .nerv-table-triangle class in compiled CSS');
  });

  it('B9: triangle cells use clip-path: polygon()', () => {
    const triangleSection = css.slice(css.indexOf('.nerv-table-triangle'));
    const block = triangleSection.slice(0, 1500);
    assert.ok(block.includes('clip-path'), 'triangle context should contain clip-path');
    assert.ok(block.includes('polygon'), 'triangle context should contain polygon');
  });

  it('B10: triangles alternate up/down via :nth-child', () => {
    const triangleSection = css.slice(css.indexOf('.nerv-table-triangle'));
    const block = triangleSection.slice(0, 2000);
    assert.ok(block.includes('nth-child'), 'triangle rows should use :nth-child for alternating direction');
  });

  it('B11: hexagon row class exists in compiled CSS', () => {
    assert.match(css, /\.nerv-table-hex\b/, 'missing .nerv-table-hex class in compiled CSS');
  });

  it('B12: hexagon cells use clip-path: polygon() matching hex shape', () => {
    const hexSection = css.slice(css.indexOf('.nerv-table-hex'));
    const block = hexSection.slice(0, 1500);
    assert.ok(block.includes('clip-path'), 'hex context should contain clip-path');
    assert.ok(block.includes('polygon'), 'hex context should contain polygon');
  });

  it('B13: hexagon rows support out-of-phase offset via :nth-child', () => {
    const hexAltPresent = css.includes('.nerv-table-hex-alt') || css.includes('nerv-table-hex');
    assert.ok(hexAltPresent, 'should have hex-alt or hex modifier for alternating offsets');
    const hexSection = css.slice(css.indexOf('.nerv-table-hex'));
    const block = hexSection.slice(0, 3000);
    assert.ok(block.includes('nth-child'), 'hex rows should use :nth-child for alternating row offsets');
  });

  it('B14: trapezoid row class exists in compiled CSS', () => {
    assert.match(css, /\.nerv-table-trapezoid\b/, 'missing .nerv-table-trapezoid class in compiled CSS');
  });

  it('B15: trapezoid cells use clip-path: polygon() for angled edges', () => {
    const trapSection = css.slice(css.indexOf('.nerv-table-trapezoid'));
    const block = trapSection.slice(0, 1500);
    assert.ok(block.includes('clip-path'), 'trapezoid context should contain clip-path');
    assert.ok(block.includes('polygon'), 'trapezoid context should contain polygon');
  });

  // --- Geometric Row Types: Table-Level Default ---

  it('B16: shape class on table cascades to rows via descendant selector', () => {
    const tableTriangle = css.match(/\.nerv-table\.nerv-table-triangle\s+(?:td|th)/);
    const tableHex = css.match(/\.nerv-table\.nerv-table-hex\s+(?:td|th)/);
    const tableTrap = css.match(/\.nerv-table\.nerv-table-trapezoid\s+(?:td|th)/);
    const hasTableLevel = tableTriangle || tableHex || tableTrap;
    assert.ok(hasTableLevel, 'at least one table-level shape selector should cascade to cells (e.g. .nerv-table.nerv-table-triangle td)');
  });

  // --- Borderless ---

  it('B19: .nerv-table-borderless removes container border and glow', () => {
    assert.match(css, /\.nerv-table-borderless\b/, 'missing .nerv-table-borderless class');
    const idx = css.indexOf('.nerv-table-borderless');
    assert.ok(idx !== -1, '.nerv-table-borderless block not found');
    const block = css.slice(idx, idx + 600);
    assert.ok(
      block.includes('border: 0') || block.includes('border: none') || block.includes('border-style: none'),
      '.nerv-table-borderless should remove border'
    );
    assert.ok(
      block.includes('box-shadow: none'),
      '.nerv-table-borderless should remove box-shadow'
    );
  });

  it('B20: .nerv-table-borderless also removes cell borders', () => {
    const re = /\.nerv-table-borderless\s+(?:th|td)\b/;
    assert.match(css, re, '.nerv-table-borderless should target th/td');
    const idx = css.indexOf('.nerv-table-borderless');
    const block = css.slice(idx, idx + 800);
    assert.ok(
      block.includes('border: 0') || block.includes('border: none'),
      '.nerv-table-borderless cells should have border removed'
    );
  });

  // --- Equilateral Hex ---

  it('B21: .nerv-table-hex-eq class exists with aspect-ratio', () => {
    assert.match(css, /\.nerv-table-hex-eq\b/, 'missing .nerv-table-hex-eq class');
    const hexEqSection = css.slice(css.indexOf('.nerv-table-hex-eq'));
    const block = hexEqSection.slice(0, 1500);
    assert.ok(block.includes('aspect-ratio'), '.nerv-table-hex-eq should set aspect-ratio for equilateral proportions');
  });

  // --- Accessibility ---

  it('B17: prefers-contrast: more media query targets table elements', () => {
    const contrastRe = /prefers-contrast:\s*more\)[^}]*\.nerv-table/;
    assert.match(css, contrastRe, 'a prefers-contrast: more block should reference .nerv-table');
  });

  // --- Regression ---

  it('B18: existing component selectors still present', () => {
    assert.match(css, /\.nerv-bar-meter\b[^-]/, 'missing .nerv-bar-meter class');
    assert.match(css, /\.nerv-hex-grid\b/, 'missing .nerv-hex-grid class');
    assert.match(css, /\.nerv-list\b[^-]/, 'missing .nerv-list class');
    assert.match(css, /\.nerv-input\b[^-]/, 'missing .nerv-input class');
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
