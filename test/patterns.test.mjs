import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST_CSS = resolve(ROOT, 'dist/nerv.css');
const DIST_JS = resolve(ROOT, 'dist/nerv.js');

let css = '';

describe('Phase 4 — build integration', () => {
  before(() => {
    execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
    css = readFileSync(DIST_CSS, 'utf-8');
  });

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

describe('New tokens', () => {
  it('--nerv-stripe-duration token exists on :root', () => {
    assert.match(css, /--nerv-stripe-duration\s*:/, 'missing --nerv-stripe-duration token');
  });

  it('--nerv-stripe-width token exists on :root', () => {
    assert.match(css, /--nerv-stripe-width\s*:/, 'missing --nerv-stripe-width token');
  });

  it('--nerv-radar-duration token exists on :root', () => {
    assert.match(css, /--nerv-radar-duration\s*:/, 'missing --nerv-radar-duration token');
  });

  it('--nerv-primary-rgb meta-token exists on :root', () => {
    assert.match(css, /--nerv-primary-rgb\s*:/, 'missing --nerv-primary-rgb meta-token');
  });
});

describe('Stripe bar CSS', () => {
  // Behavior 5
  it('.nerv-stripe class exists with repeating-linear-gradient', () => {
    assert.match(css, /\.nerv-stripe\b[^-]/, 'missing .nerv-stripe class');
    assert.match(css, /repeating-linear-gradient/, '.nerv-stripe should use repeating-linear-gradient');
  });

  // Behavior 6
  it('.nerv-stripe-vertical class exists', () => {
    assert.match(css, /\.nerv-stripe-vertical\b/, 'missing .nerv-stripe-vertical class');
  });

  it('.nerv-stripe-red class exists', () => {
    assert.match(css, /\.nerv-stripe-red\b/, 'missing .nerv-stripe-red class');
  });

  it('.nerv-stripe-cyan class exists', () => {
    assert.match(css, /\.nerv-stripe-cyan\b/, 'missing .nerv-stripe-cyan class');
  });

  it('stripe color variant exists for every glow-flagged token color', () => {
    const colors = ['amber', 'amber-dark', 'orange', 'red', 'red-deep', 'cyan', 'blue', 'steel'];
    for (const c of colors) {
      assert.match(css, new RegExp(`\\.nerv-stripe-${c}\\b`), `missing .nerv-stripe-${c} class`);
    }
  });

  it('.nerv-stripe-transparent class exists', () => {
    assert.match(css, /\.nerv-stripe-transparent\b/, 'missing .nerv-stripe-transparent class');
  });

  it('.nerv-stripe uses --nerv-stripe-color-rgb for customizable color', () => {
    assert.match(css, /--nerv-stripe-color-rgb/, 'stripes should use --nerv-stripe-color-rgb');
  });

  it('.nerv-stripe uses --nerv-stripe-width for customizable band size', () => {
    const stripeIdx = css.indexOf('.nerv-stripe');
    const stripeSection = css.slice(stripeIdx, stripeIdx + 500);
    assert.ok(stripeSection.includes('--nerv-stripe-width'), '.nerv-stripe should reference --nerv-stripe-width');
  });

  it('.nerv-stripe uses hard-stop gradient bands (CRT constraint, no smooth transitions)', () => {
    const stripeIdx = css.indexOf('.nerv-stripe {');
    const blockEnd = css.indexOf('}', stripeIdx);
    const block = css.slice(stripeIdx, blockEnd);
    assert.ok(
      /\)\s*0[,\s]/.test(block),
      'first band should start at explicit position 0 (hard stop)'
    );
    assert.ok(
      /--nerv-stripe-width\)[\s,]+\w*\(/.test(block),
      'adjacent bands share the same stop position (hard stop boundary, no gradient gap)'
    );
  });

  it('.nerv-stripe bands are fully opaque (no fractional alpha)', () => {
    const stripeIdx = css.indexOf('.nerv-stripe {');
    const blockEnd = css.indexOf('}', stripeIdx);
    const block = css.slice(stripeIdx, blockEnd);
    const gradientMatch = block.match(/repeating-linear-gradient\([\s\S]*?\)\s*;/);
    assert.ok(gradientMatch, 'should have repeating-linear-gradient in .nerv-stripe');
    const gradient = gradientMatch[0];
    const alphaMatches = [...gradient.matchAll(/rgba\(var\([^)]+\),\s*([\d.]+)\)/g)];
    assert.ok(alphaMatches.length > 0, 'gradient should contain rgba() band definitions');
    for (const m of alphaMatches) {
      assert.ok(
        parseFloat(m[1]) === 1,
        `stripe gradient band has fractional alpha ${m[1]} — expected 1 (fully opaque)`
      );
    }
  });

  it('.nerv-stripe dark bands use --nerv-bg-rgb for solid background', () => {
    const stripeIdx = css.indexOf('.nerv-stripe {');
    const blockEnd = css.indexOf('}', stripeIdx);
    const block = css.slice(stripeIdx, blockEnd);
    assert.ok(
      block.includes('--nerv-bg-rgb'),
      '.nerv-stripe dark bands should reference --nerv-bg-rgb for opaque background'
    );
  });

  // Behavior 8
  it('.nerv-stripe-animated class exists with animation referencing --nerv-stripe-duration', () => {
    assert.match(css, /\.nerv-stripe-animated\b/, 'missing .nerv-stripe-animated class');
    assert.match(css, /--nerv-stripe-duration/, '.nerv-stripe-animated should reference --nerv-stripe-duration');
  });

  // Behavior 9
  it('@keyframes for stripe animation exists', () => {
    assert.match(css, /@keyframes\s+nerv-stripe-scroll/, 'missing @keyframes nerv-stripe-scroll');
  });

  // Behavior 10
  it('prefers-reduced-motion suppresses stripe animation', () => {
    assert.match(
      css,
      /prefers-reduced-motion/,
      'should contain prefers-reduced-motion media query'
    );
    const reducedIdx = css.indexOf('prefers-reduced-motion');
    const reducedSection = css.slice(reducedIdx, reducedIdx + 500);
    assert.ok(
      reducedSection.includes('animation') || reducedSection.includes('nerv-stripe'),
      'prefers-reduced-motion should affect stripe animation'
    );
  });
});

describe('Hex grid CSS', () => {
  // Behavior 11
  it('.nerv-hex-grid class exists', () => {
    assert.match(css, /\.nerv-hex-grid\b/, 'missing .nerv-hex-grid class');
  });

  // Behavior 12
  it('.nerv-hex-row class exists', () => {
    assert.match(css, /\.nerv-hex-row\b/, 'missing .nerv-hex-row class');
  });

  // Behavior 13
  it('.nerv-hex-cell exists and pseudo-elements use clip-path for hex shape', () => {
    assert.match(css, /\.nerv-hex-cell\b/, 'missing .nerv-hex-cell class');
    assert.match(css, /\.nerv-hex-cell::before/, 'missing .nerv-hex-cell::before');
    assert.match(css, /\.nerv-hex-cell::after/, 'missing .nerv-hex-cell::after');
    const beforeIdx = css.indexOf('.nerv-hex-cell::before');
    const beforeSection = css.slice(beforeIdx, beforeIdx + 300);
    assert.ok(beforeSection.includes('clip-path'), '::before should use clip-path for hex outline');
  });

  // Behavior 14
  it('.nerv-hex-cell::after uses inset clip-path for inner fill', () => {
    const afterIdx = css.indexOf('.nerv-hex-cell::after');
    const afterSection = css.slice(afterIdx, afterIdx + 300);
    assert.ok(afterSection.includes('clip-path'), '::after should use clip-path for inner fill');
    assert.ok(afterSection.includes('inset'), '::after should be inset from the outer hex');
  });

  // Behavior 15
  it('.nerv-hex-danger uses --nerv-red token', () => {
    assert.match(css, /\.nerv-hex-danger\b/, 'missing .nerv-hex-danger class');
    const dangerIdx = css.indexOf('.nerv-hex-danger');
    const dangerSection = css.slice(dangerIdx, dangerIdx + 400);
    assert.ok(dangerSection.includes('--nerv-red'), '.nerv-hex-danger should use --nerv-red token');
  });

  // Behavior 16
  it('.nerv-hex-warn uses --nerv-amber token', () => {
    assert.match(css, /\.nerv-hex-warn\b/, 'missing .nerv-hex-warn class');
    const warnIdx = css.indexOf('.nerv-hex-warn');
    const warnSection = css.slice(warnIdx, warnIdx + 400);
    assert.ok(warnSection.includes('--nerv-amber'), '.nerv-hex-warn should use --nerv-amber token');
  });

  // Behavior 17
  it('.nerv-hex-safe uses --nerv-green token', () => {
    assert.match(css, /\.nerv-hex-safe\b/, 'missing .nerv-hex-safe class');
    const safeIdx = css.indexOf('.nerv-hex-safe');
    const safeSection = css.slice(safeIdx, safeIdx + 400);
    assert.ok(safeSection.includes('--nerv-green'), '.nerv-hex-safe should use --nerv-green token');
  });

  it('.nerv-hex-row uses negative margin-top for honeycomb tiling', () => {
    const rowIdx = css.indexOf('.nerv-hex-row');
    const rowSection = css.slice(rowIdx, rowIdx + 600);
    assert.ok(
      /margin-top:\s*-/.test(rowSection),
      '.nerv-hex-row should use negative margin-top for honeycomb overlap'
    );
  });

  // Behavior 18
  it('state classes apply inset box-shadow for contained glow', () => {
    const dangerIdx = css.indexOf('.nerv-hex-danger');
    const dangerToEnd = css.slice(dangerIdx, dangerIdx + 600);
    assert.ok(
      dangerToEnd.includes('box-shadow') && dangerToEnd.includes('inset'),
      'hex state classes should apply inset box-shadow for glow (no cross-cell bleed)'
    );
  });

  // B1: .nerv-hex-grid-tiled class exists in compiled CSS
  it('.nerv-hex-grid-tiled class exists', () => {
    assert.match(css, /\.nerv-hex-grid-tiled\b/, 'missing .nerv-hex-grid-tiled class');
  });

  // B2: Tiled rows use wider gap than default (W/2 = 40px for 80px cells)
  it('.nerv-hex-grid-tiled rows use tessellation gap (wider than default)', () => {
    const tiledIdx = css.indexOf('.nerv-hex-grid-tiled');
    assert.ok(tiledIdx >= 0, '.nerv-hex-grid-tiled should exist');
    const tiledSection = css.slice(tiledIdx, tiledIdx + 600);
    assert.ok(
      /gap:\s*40px/.test(tiledSection),
      'tiled rows should use gap: 40px (W/2 for 80px cells)'
    );
  });

  // B3: Tiled odd-row margin-left is 3/4 cell width (60px)
  it('.nerv-hex-grid-tiled odd-row offset is 3/4 cell width', () => {
    const tiledOddIdx = css.indexOf('.nerv-hex-grid-tiled > .nerv-hex-row:nth-child(odd)');
    assert.ok(tiledOddIdx >= 0, 'tiled odd-row selector should exist');
    const tiledOddSection = css.slice(tiledOddIdx, tiledOddIdx + 300);
    assert.ok(
      /margin-left:\s*60px/.test(tiledOddSection),
      'tiled odd-row margin-left should be 60px (3W/4 for 80px cells)'
    );
  });

  // B4: Tiled rows use negative margin-top for tessellation overlap
  it('.nerv-hex-grid-tiled rows use negative margin-top for tessellation', () => {
    const tiledNotFirstIdx = css.indexOf('.nerv-hex-grid-tiled > .nerv-hex-row:not(:first-child)');
    assert.ok(tiledNotFirstIdx >= 0, 'tiled not-first-child row selector should exist');
    const tiledNotFirstSection = css.slice(tiledNotFirstIdx, tiledNotFirstIdx + 300);
    assert.ok(
      /margin-top:\s*-34\.6/.test(tiledNotFirstSection),
      'tiled row overlap should be ~-34.64px (−H/2 for tessellation)'
    );
  });

  // B5: Tiled variant composes with .nerv-hex-grid-filled
  it('.nerv-hex-grid-tiled composes with .nerv-hex-grid-filled', () => {
    assert.match(
      css,
      /\.nerv-hex-grid-filled\s+\.nerv-hex-cell::after/,
      '.nerv-hex-grid-filled cell fill should exist (composable with tiled)'
    );
    assert.match(
      css,
      /\.nerv-hex-grid-filled\s+\.nerv-hex-danger::after/,
      '.nerv-hex-grid-filled danger fill should exist (composable with tiled)'
    );
  });
});

describe('Radar CSS', () => {
  // Behavior 19
  it('.nerv-radar class exists with radial-gradient', () => {
    assert.match(css, /\.nerv-radar\b[^-]/, 'missing .nerv-radar class');
    const radarIdx = css.indexOf('.nerv-radar');
    const radarSection = css.slice(radarIdx, radarIdx + 800);
    assert.ok(radarSection.includes('radial-gradient'), '.nerv-radar should use radial-gradient');
  });

  // Behavior 20
  it('.nerv-radar uses aspect-ratio: 1 and border-radius: 50%', () => {
    const radarIdx = css.indexOf('.nerv-radar');
    const radarSection = css.slice(radarIdx, radarIdx + 800);
    assert.ok(radarSection.includes('aspect-ratio'), '.nerv-radar should use aspect-ratio');
    assert.ok(radarSection.includes('border-radius: 50%'), '.nerv-radar should use border-radius: 50%');
  });

  // Behavior 21
  it('.nerv-radar has pseudo-elements for radial division lines', () => {
    assert.ok(
      css.includes('.nerv-radar::before') || css.includes('.nerv-radar::after'),
      '.nerv-radar should have pseudo-elements for division lines'
    );
  });

  // Behavior 22
  it('.nerv-radar-sweep class exists with conic-gradient', () => {
    assert.match(css, /\.nerv-radar-sweep\b/, 'missing .nerv-radar-sweep class');
    const sweepIdx = css.indexOf('.nerv-radar-sweep');
    const sweepSection = css.slice(sweepIdx, sweepIdx + 500);
    assert.ok(sweepSection.includes('conic-gradient'), '.nerv-radar-sweep should use conic-gradient');
  });

  // Behavior 23
  it('@keyframes for radar sweep exists', () => {
    assert.match(css, /@keyframes\s+nerv-radar-sweep/, 'missing @keyframes nerv-radar-sweep');
  });

  // Behavior 24
  it('radar sweep duration references --nerv-radar-duration', () => {
    const sweepIdx = css.indexOf('.nerv-radar-sweep');
    const sweepSection = css.slice(sweepIdx, sweepIdx + 500);
    assert.ok(
      sweepSection.includes('--nerv-radar-duration'),
      '.nerv-radar-sweep should reference --nerv-radar-duration'
    );
  });

  it('radar sweep fade trails behind the bright edge (not ahead)', () => {
    const sweepIdx = css.indexOf('.nerv-radar-sweep');
    const sweepSection = css.slice(sweepIdx, sweepIdx + 600);
    assert.ok(
      /transparent\s+0deg[\s\S]*transparent\s+310deg/.test(sweepSection),
      'conic-gradient should have transparent region first (0–310deg), bright at end'
    );
  });

  // Behavior 25
  it('prefers-reduced-motion suppresses radar sweep', () => {
    const reducedMotionBlocks = css.split('prefers-reduced-motion');
    const hasRadarSuppression = reducedMotionBlocks.some(
      (block) => block.includes('nerv-radar-sweep') || block.includes('nerv-radar')
    );
    assert.ok(hasRadarSuppression, 'prefers-reduced-motion should suppress radar sweep');
  });

  // M8 — radar blip pulse (sweep-period sync)
  it('.nerv-radar-blip class exists under radar scope', () => {
    assert.match(css, /\.nerv-radar\s+\.nerv-radar-blip\b/, 'expected .nerv-radar .nerv-radar-blip selector');
  });

  it('@keyframes nerv-radar-blip-pulse exists', () => {
    assert.match(css, /@keyframes\s+nerv-radar-blip-pulse\b/, 'missing nerv-radar-blip-pulse keyframes');
  });

  it('.nerv-radar-blip animation duration matches sweep timing (uses --nerv-radar-duration)', () => {
    const idx = css.indexOf('.nerv-radar-blip');
    assert.ok(idx >= 0, '.nerv-radar-blip should appear in compiled CSS');
    const section = css.slice(idx, idx + 900);
    assert.ok(
      section.includes('--nerv-radar-duration') && section.includes('--nerv-animation-speed'),
      '.nerv-radar-blip should use same duration calc as sweep'
    );
  });

  it('.nerv-radar-blip supports phase alignment via --nerv-radar-blip-phase', () => {
    const idx = css.indexOf('.nerv-radar-blip');
    const section = css.slice(idx, idx + 900);
    assert.ok(
      section.includes('--nerv-radar-blip-phase'),
      'animation-delay should reference --nerv-radar-blip-phase for sweep alignment'
    );
  });

  it('.nerv-radar-blip uses phase×period delay (first frame = first sweep hit; cold start opacity 0)', () => {
    const idx = css.indexOf('.nerv-radar .nerv-radar-blip');
    assert.ok(idx >= 0, 'blip rule block should exist');
    const section = css.slice(idx, idx + 950);
    assert.ok(
      section.includes('opacity: 0'),
      'blips should start off until animation-delay elapses'
    );
    assert.ok(
      section.includes('--nerv-radar-blip-phase') && section.includes('animation-delay'),
      'delay should be derived from phase + sweep_align × period'
    );
    assert.ok(
      !section.includes('- 0.5'),
      'delay should not use legacy (phase - 0.5) offset; hit is at keyframe 0%'
    );
  });

  it('--nerv-radar-blip-opacity-floor used in blip keyframes (dim tail before loop snap)', () => {
    const kfIdx = css.indexOf('@keyframes nerv-radar-blip-pulse');
    assert.ok(kfIdx >= 0, 'nerv-radar-blip-pulse keyframes should exist');
    const kfSection = css.slice(kfIdx, kfIdx + 600);
    assert.ok(
      kfSection.includes('--nerv-radar-blip-opacity-floor'),
      'keyframes should use dim floor in the tail of each cycle'
    );
    assert.ok(
      kfSection.includes('0%') && kfSection.includes('opacity: 1'),
      'hit should be at loop start (0%) so delay aligns first sweep pass'
    );
    assert.ok(
      kfSection.includes('99.99%'),
      'keyframes should hold floor until loop boundary'
    );
  });

  it('prefers-reduced-motion suppresses radar blip pulse', () => {
    const reducedMotionBlocks = css.split('prefers-reduced-motion');
    const hasBlipSuppression = reducedMotionBlocks.some((block) => block.includes('nerv-radar-blip'));
    assert.ok(hasBlipSuppression, 'prefers-reduced-motion should suppress .nerv-radar-blip animation');
  });

  it('prefers-contrast strengthens radar blip visibility', () => {
    const contrastBlocks = css.split('prefers-contrast');
    const hasBlipContrast = contrastBlocks.some((block) => block.includes('nerv-radar-blip'));
    assert.ok(hasBlipContrast, 'prefers-contrast: more should adjust .nerv-radar-blip');
  });

  it('.nerv-radar-blip phosphor dot lives on ::before (labels in flex flow)', () => {
    assert.match(
      css,
      /\.nerv-radar\s+\.nerv-radar-blip::before\b/,
      'blip disc should be ::before so inner text does not stretch the glow'
    );
  });
});

describe('Text color utilities (pair with nerv-glow-text-*)', () => {
  it('.nerv-text-green sets color from token', () => {
    assert.match(css, /\.nerv-text-green\b/, 'expected .nerv-text-green utility');
    const idx = css.indexOf('.nerv-text-green');
    assert.ok(idx >= 0, '.nerv-text-green should exist');
    const block = css.slice(idx, idx + 120);
    assert.ok(
      block.includes('var(--nerv-green)'),
      '.nerv-text-green should set color: var(--nerv-green)'
    );
  });
});

describe('nerv.js API surface', () => {
  // Behavior 26
  it('dist/nerv.js exists after build', () => {
    assert.ok(existsSync(DIST_JS), 'dist/nerv.js should exist after build');
  });

  // Behavior 27 + 28 + 29 + 30 + 31
  it('module exports NERV object with expected functions', async () => {
    const mod = await import(resolve(ROOT, 'src/nerv.js'));
    const NERV = mod.NERV || (mod.default && mod.default.NERV);
    assert.ok(NERV, 'module should export NERV object');
    assert.equal(typeof NERV.init, 'function', 'NERV.init should be a function');
    assert.equal(typeof NERV.injectScanlines, 'function', 'NERV.injectScanlines should be a function');
    assert.equal(typeof NERV.initHexFlicker, 'function', 'NERV.initHexFlicker should be a function');
    assert.equal(typeof NERV.initGridLabels, 'function', 'NERV.initGridLabels should be a function');
    assert.equal(
      typeof NERV.initRadarSweepSync,
      'function',
      'NERV.initRadarSweepSync should be a function'
    );
    assert.equal(
      typeof NERV.layoutRadarBlips,
      'function',
      'NERV.layoutRadarBlips should be a function'
    );
    assert.equal(
      typeof NERV.initRadarBlipAutoLayout,
      'function',
      'NERV.initRadarBlipAutoLayout should be a function'
    );
  });
});

describe('Regression — Phase 1–3', () => {
  // Behavior 32
  it('Foundation tokens still present', () => {
    assert.match(css, /--nerv-amber\s*:/, 'missing --nerv-amber token');
    assert.match(css, /--nerv-primary\s*:/, 'missing --nerv-primary meta-token');
    assert.match(css, /\.nerv-glow\b[^-]/, 'missing .nerv-glow class');
  });

  // Behavior 33
  it('Effects selectors still present', () => {
    assert.match(css, /\.nerv-scanlines\b/, 'missing .nerv-scanlines class');
    assert.match(css, /\.nerv-flicker\b[^-]/, 'missing .nerv-flicker class');
    assert.match(css, /\.nerv-glitch\b/, 'missing .nerv-glitch class');
  });

  // Behavior 34
  it('Structural selectors still present', () => {
    assert.match(css, /\.nerv-panel\b[^-]/, 'missing .nerv-panel class');
    assert.match(css, /\.nerv-divider\b[^-]/, 'missing .nerv-divider class');
    assert.match(css, /\.nerv-grid-marks\b/, 'missing .nerv-grid-marks class');
  });
});
