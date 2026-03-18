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

describe('Reticle tickmarks', () => {
  it('B1: .nerv-reticle::after exists with repeating-linear-gradient background', () => {
    assert.match(css, /\.nerv-reticle\b[^-]/, 'missing .nerv-reticle class');
    const idx = css.indexOf('.nerv-reticle::after');
    assert.ok(idx !== -1, '.nerv-reticle::after block not found');
    const block = css.slice(idx, css.indexOf('}', idx) + 1);
    assert.ok(block.includes('repeating-linear-gradient'), '.nerv-reticle::after should use repeating-linear-gradient');
  });

  it('B2: .nerv-reticle::after has 4 background layers for all edges', () => {
    const idx = css.indexOf('.nerv-reticle::after');
    assert.ok(idx !== -1, '.nerv-reticle::after block not found');
    const block = css.slice(idx, css.indexOf('}', idx) + 1);
    assert.ok(block.includes('top'), '.nerv-reticle::after background-position should reference top');
    assert.ok(block.includes('bottom'), '.nerv-reticle::after background-position should reference bottom');
    assert.ok(block.includes('right'), '.nerv-reticle::after background-position should reference right');
  });

  it('B3: .nerv-reticle-top::after exists with repeating-linear-gradient background', () => {
    assert.match(css, /\.nerv-reticle-top\b/, 'missing .nerv-reticle-top class');
    const idx = css.indexOf('.nerv-reticle-top::after');
    assert.ok(idx !== -1, '.nerv-reticle-top::after block not found');
    const block = css.slice(idx, css.indexOf('}', idx) + 1);
    assert.ok(block.includes('repeating-linear-gradient'), '.nerv-reticle-top::after should use repeating-linear-gradient');
  });

  it('B4: .nerv-reticle-right class exists', () => {
    assert.match(css, /\.nerv-reticle-right\b/, 'missing .nerv-reticle-right class');
  });

  it('B5: .nerv-reticle-bottom class exists', () => {
    assert.match(css, /\.nerv-reticle-bottom\b/, 'missing .nerv-reticle-bottom class');
  });

  it('B6: .nerv-reticle-left class exists', () => {
    assert.match(css, /\.nerv-reticle-left\b/, 'missing .nerv-reticle-left class');
  });

  it('B7: --nerv-reticle-color custom property declared in .nerv-reticle', () => {
    const idx = css.indexOf('.nerv-reticle {');
    assert.ok(idx !== -1, '.nerv-reticle block not found');
    const block = css.slice(idx, css.indexOf('}', idx) + 1);
    assert.ok(block.includes('--nerv-reticle-color'), '.nerv-reticle should declare --nerv-reticle-color');
  });

  it('B8: .nerv-reticle-amber color variant exists and sets --nerv-reticle-color', () => {
    assert.match(css, /\.nerv-reticle-amber\b/, 'missing .nerv-reticle-amber color variant');
    const idx = css.indexOf('.nerv-reticle-amber');
    assert.ok(idx !== -1, '.nerv-reticle-amber block not found');
    const block = css.slice(idx, css.indexOf('}', idx) + 1);
    assert.ok(block.includes('--nerv-reticle-color'), '.nerv-reticle-amber should set --nerv-reticle-color');
  });

  it('B9: regression — existing structural selectors still present', () => {
    assert.match(css, /\.nerv-panel\b[^-]/, 'missing .nerv-panel class');
    assert.match(css, /\.nerv-divider\b[^-]/, 'missing .nerv-divider class');
    assert.match(css, /\.nerv-grid-marks\b/, 'missing .nerv-grid-marks class');
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
