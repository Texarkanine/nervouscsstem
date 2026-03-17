import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST_CSS = resolve(ROOT, 'dist/nerv.css');

let css = '';

describe('Structural layer — build integration', () => {
  before(() => {
    execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
    css = readFileSync(DIST_CSS, 'utf-8');
  });

  it('npm run build succeeds with 3 new @forward partials and dist/nerv.css is non-empty', () => {
    assert.ok(existsSync(DIST_CSS), 'dist/nerv.css should exist after build');
    assert.ok(css.length > 0, 'compiled CSS should not be empty');
  });
});

describe('Panels', () => {
  it('.nerv-panel class exists with border property', () => {
    assert.match(css, /\.nerv-panel\b[^-]/, 'missing .nerv-panel class');
    assert.match(css, /\.nerv-panel\b[^-][^}]*border/, '.nerv-panel should have a border property');
  });

  it('.nerv-panel uses position: relative', () => {
    assert.match(css, /\.nerv-panel\b[^-][^}]*position:\s*relative/, '.nerv-panel should use position: relative');
  });

  it('.nerv-panel-titled class exists with ::before pseudo-element', () => {
    assert.match(css, /\.nerv-panel-titled\b/, 'missing .nerv-panel-titled class');
    assert.match(css, /\.nerv-panel-titled::before/, 'missing .nerv-panel-titled::before pseudo-element');
  });

  it('.nerv-panel-double class exists with outline property', () => {
    assert.match(css, /\.nerv-panel-double\b/, 'missing .nerv-panel-double class');
    assert.match(css, /\.nerv-panel-double\b[^}]*outline/, '.nerv-panel-double should have outline property');
  });

  it('.nerv-panel-inset class exists with box-shadow containing inset', () => {
    assert.match(css, /\.nerv-panel-inset\b/, 'missing .nerv-panel-inset class');
    const insetIdx = css.indexOf('.nerv-panel-inset');
    const insetBlock = css.slice(insetIdx, css.indexOf('}', insetIdx) + 1);
    assert.ok(
      insetBlock.includes('box-shadow') && insetBlock.includes('inset'),
      '.nerv-panel-inset should have box-shadow with inset'
    );
  });
});

describe('Dividers', () => {
  it('.nerv-divider class exists', () => {
    assert.match(css, /\.nerv-divider\b[^-]/, 'missing .nerv-divider class');
  });

  it('.nerv-divider-vertical class exists', () => {
    assert.match(css, /\.nerv-divider-vertical\b/, 'missing .nerv-divider-vertical class');
  });

  it('.nerv-divider-amber class exists', () => {
    assert.match(css, /\.nerv-divider-amber\b/, 'missing .nerv-divider-amber class');
  });

  it('dividers have box-shadow for glow effect', () => {
    const dividerIdx = css.indexOf('.nerv-divider');
    const dividerSection = css.slice(dividerIdx);
    assert.ok(dividerSection.includes('box-shadow'), 'dividers should have box-shadow for glow');
  });
});

describe('Grid marks', () => {
  it('.nerv-grid-marks class exists with background-image', () => {
    assert.match(css, /\.nerv-grid-marks\b/, 'missing .nerv-grid-marks class');
    const gridIdx = css.indexOf('.nerv-grid-marks');
    const gridSection = css.slice(gridIdx, css.indexOf('}', gridIdx) + 1);
    assert.ok(gridSection.includes('background-image'), '.nerv-grid-marks should have background-image');
  });

  it('grid marks background uses SVG data URI', () => {
    const gridIdx = css.indexOf('.nerv-grid-marks');
    const gridSection = css.slice(gridIdx, css.indexOf('}', gridIdx) + 1);
    assert.ok(
      gridSection.includes('data:image/svg+xml'),
      'grid marks should use SVG data URI in background-image'
    );
  });
});

describe('Accessibility — prefers-contrast', () => {
  it('panels consume --nerv-border-width for border sizing', () => {
    const panelIdx = css.indexOf('.nerv-panel');
    const panelSection = css.slice(panelIdx, css.indexOf('}', panelIdx) + 1);
    assert.ok(
      panelSection.includes('--nerv-border-width'),
      '.nerv-panel should consume --nerv-border-width token for border sizing'
    );
  });
});

describe('Regression — Phase 1 and Phase 2', () => {
  it('Phase 1 foundation selectors still present', () => {
    assert.match(css, /--nerv-amber\s*:/, 'missing --nerv-amber token');
    assert.match(css, /--nerv-primary\s*:/, 'missing --nerv-primary meta-token');
    assert.match(css, /\.nerv-glow\b[^-]/, 'missing .nerv-glow class');
    assert.match(css, /\.nerv-type-hud\b/, 'missing .nerv-type-hud class');
  });

  it('Phase 2 effects selectors still present', () => {
    assert.match(css, /\.nerv-scanlines\b/, 'missing .nerv-scanlines class');
    assert.match(css, /\.nerv-flicker\b[^-]/, 'missing .nerv-flicker class');
    assert.match(css, /\.nerv-glitch\b/, 'missing .nerv-glitch class');
  });
});
