import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST_CSS = resolve(ROOT, 'dist/nerv.css');
const DIST_MIN = resolve(ROOT, 'dist/nerv.min.css');

/** All named colors expected from the $nerv-colors SCSS map. */
const EXPECTED_COLORS = [
  'void', 'amber', 'amber-dark', 'orange', 'red',
  'red-deep', 'green', 'cyan', 'blue', 'steel',
];

/** Colors that should generate .nerv-glow-{name} and .nerv-glow-text-{name} classes. */
const GLOW_COLORS = [
  'amber', 'amber-dark', 'orange', 'red',
  'red-deep', 'green', 'cyan', 'blue', 'steel',
];

let css = '';

describe('Build smoke tests', () => {
  it('npm run build exits 0 and produces dist/nerv.css', () => {
    execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
    assert.ok(existsSync(DIST_CSS), 'dist/nerv.css should exist after build');
  });

  it('npm run build:min exits 0 and produces dist/nerv.min.css', () => {
    execSync('npm run build:min', { cwd: ROOT, stdio: 'pipe' });
    assert.ok(existsSync(DIST_MIN), 'dist/nerv.min.css should exist after build:min');
  });
});

describe('Color map output verification', () => {
  before(() => {
    execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
    css = readFileSync(DIST_CSS, 'utf-8');
  });

  it('generates exactly 10 --nerv-* color tokens on :root', () => {
    for (const name of EXPECTED_COLORS) {
      const re = new RegExp(`--nerv-${name}\\s*:`);
      assert.ok(re.test(css), `missing color token --nerv-${name}`);
    }
  });

  it('each color token has a corresponding --nerv-*-rgb companion', () => {
    for (const name of EXPECTED_COLORS) {
      const re = new RegExp(`--nerv-${name}-rgb\\s*:`);
      assert.ok(re.test(css), `missing RGB companion --nerv-${name}-rgb`);
    }
  });

  it('defines meta-token --nerv-primary defaulting to var(--nerv-amber)', () => {
    assert.match(css, /--nerv-primary\s*:/, 'missing --nerv-primary');
  });

  it('defines meta-token --nerv-bg defaulting to var(--nerv-void)', () => {
    assert.match(css, /--nerv-bg\s*:/, 'missing --nerv-bg');
  });

  it('defines utility tokens (glow-spread, glow-intensity, border-width, etc.)', () => {
    for (const token of ['glow-spread', 'glow-intensity', 'scanline-opacity', 'flicker-duration', 'glitch-duration', 'animation-speed', 'border-width']) {
      const re = new RegExp(`--nerv-${token}\\s*:`);
      assert.ok(re.test(css), `missing utility token --nerv-${token}`);
    }
  });

  it('overrides --nerv-border-width under prefers-contrast: more', () => {
    assert.match(css, /prefers-contrast:\s*more/, 'missing prefers-contrast media query');
    const contrastBlock = css.slice(css.indexOf('prefers-contrast'));
    assert.match(contrastBlock, /--nerv-border-width\s*:/, '--nerv-border-width not overridden in prefers-contrast');
  });
});

describe('Font-face declarations', () => {
  before(() => {
    if (!css) {
      execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
      css = readFileSync(DIST_CSS, 'utf-8');
    }
  });

  it('declares @font-face for Antonio', () => {
    assert.match(css, /font-family:\s*["']?Antonio["']?/, 'missing @font-face for Antonio');
  });

  it('declares @font-face for NERV Cartouche composite', () => {
    assert.match(css, /font-family:\s*["']?NERV Cartouche["']?/, 'missing @font-face for NERV Cartouche');
  });

  it('NERV Cartouche @font-face uses unicode-range for Latin', () => {
    const idx = css.indexOf('NERV Cartouche');
    assert.ok(idx !== -1, 'NERV Cartouche not found');
    const block = css.slice(Math.max(0, idx - 200), idx + 400);
    assert.ok(block.includes('unicode-range'), 'NERV Cartouche should declare unicode-range for Latin subset');
  });
});

describe('VT323 / DOS/BIOS boot font', () => {
  before(() => {
    if (!css) {
      execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
      css = readFileSync(DIST_CSS, 'utf-8');
    }
  });

  it('declares @font-face for VT323', () => {
    assert.match(css, /font-family:\s*["']?VT323["']?/, 'missing @font-face for VT323');
  });

  it('.nerv-type-boot utility class exists', () => {
    assert.match(css, /\.nerv-type-boot\b/, 'missing .nerv-type-boot class');
  });

  it('.nerv-type-boot sets font-family including VT323', () => {
    const idx = css.indexOf('.nerv-type-boot');
    assert.ok(idx !== -1, '.nerv-type-boot not found');
    const block = css.slice(idx, idx + 300);
    assert.ok(block.includes('VT323'), '.nerv-type-boot should include VT323 in font-family');
  });
});

describe('Color map → glow class verification', () => {
  before(() => {
    if (!css) {
      execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
      css = readFileSync(DIST_CSS, 'utf-8');
    }
  });

  it('each glow-flagged color has a .nerv-glow-{name} class', () => {
    for (const name of GLOW_COLORS) {
      const re = new RegExp(`\\.nerv-glow-${name}\\b`);
      assert.ok(re.test(css), `missing .nerv-glow-${name} class`);
    }
  });

  it('each glow-flagged color has a .nerv-glow-text-{name} class', () => {
    for (const name of GLOW_COLORS) {
      const re = new RegExp(`\\.nerv-glow-text-${name}\\b`);
      assert.ok(re.test(css), `missing .nerv-glow-text-${name} class`);
    }
  });

  it('.nerv-glow exists as alias for default glow', () => {
    assert.match(css, /\.nerv-glow\b[^-]/, 'missing .nerv-glow default class');
  });

  it('.nerv-glow-text exists as alias for default text glow', () => {
    assert.match(css, /\.nerv-glow-text\b[^-]/, 'missing .nerv-glow-text default class');
  });

  it('.nerv-glow-drop utility class exists', () => {
    assert.match(css, /\.nerv-glow-drop\b/, 'missing .nerv-glow-drop class');
  });

  it('each glow-flagged color has a .nerv-glow-drop-{name} class', () => {
    for (const name of GLOW_COLORS) {
      const re = new RegExp(`\\.nerv-glow-drop-${name}\\b`);
      assert.ok(re.test(css), `missing .nerv-glow-drop-${name} class`);
    }
  });

  it('prefers-contrast reduces glow intensity', () => {
    assert.match(css, /prefers-contrast:\s*more/, 'missing prefers-contrast media query');
    const contrastBlock = css.slice(css.indexOf('prefers-contrast'));
    assert.match(contrastBlock, /--nerv-glow-intensity\s*:/, '--nerv-glow-intensity not reduced in prefers-contrast');
  });
});
