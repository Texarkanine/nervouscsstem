import { describe, it, before } from 'node:test';
import assert from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = resolve(import.meta.dirname, '..');
const DIST_CSS = resolve(ROOT, 'dist/nerv.css');

let css = '';

describe('Effects layer — build integration', () => {
  before(() => {
    execSync('npm run build', { cwd: ROOT, stdio: 'pipe' });
    css = readFileSync(DIST_CSS, 'utf-8');
  });

  it('npm run build succeeds with three new @forward partials', () => {
    assert.ok(existsSync(DIST_CSS), 'dist/nerv.css should exist after build');
    assert.ok(css.length > 0, 'compiled CSS should not be empty');
  });
});

describe('Scanline overlay', () => {
  it('.nerv-scanlines class exists with position: fixed', () => {
    assert.match(css, /\.nerv-scanlines\b/, 'missing .nerv-scanlines class');
    assert.match(css, /position:\s*fixed/, '.nerv-scanlines should use position: fixed');
  });

  it('.nerv-scanlines uses repeating-linear-gradient for scanline pattern', () => {
    assert.match(css, /repeating-linear-gradient/, 'missing repeating-linear-gradient for scanline pattern');
  });

  it('.nerv-scanlines includes radial-gradient for vignette', () => {
    assert.match(css, /radial-gradient/, 'missing radial-gradient for vignette');
  });

  it('.nerv-scanlines has pointer-events: none', () => {
    assert.match(css, /pointer-events:\s*none/, '.nerv-scanlines should have pointer-events: none');
  });

  it('@keyframes for scanline band animation exists', () => {
    assert.match(css, /@keyframes\s+nerv-scanline-band/, 'missing @keyframes nerv-scanline-band');
  });
});

describe('Flicker classes', () => {
  it('.nerv-flicker class exists', () => {
    assert.match(css, /\.nerv-flicker\b[^-]/, 'missing .nerv-flicker class');
  });

  it('.nerv-flicker-fast class exists', () => {
    assert.match(css, /\.nerv-flicker-fast\b/, 'missing .nerv-flicker-fast class');
  });

  it('.nerv-flicker-staccato class exists', () => {
    assert.match(css, /\.nerv-flicker-staccato\b/, 'missing .nerv-flicker-staccato class');
  });

  it('.nerv-blink class exists', () => {
    assert.match(css, /\.nerv-blink\b/, 'missing .nerv-blink class');
  });

  it('flicker animations use steps() timing', () => {
    assert.match(css, /steps\(/, 'flicker animations should use steps() timing function');
  });

  it('flicker durations reference --nerv-flicker-duration or --nerv-animation-speed', () => {
    const flickerSection = css.slice(css.indexOf('.nerv-flicker'));
    assert.ok(
      flickerSection.includes('--nerv-flicker-duration') || flickerSection.includes('--nerv-animation-speed'),
      'flicker durations should reference --nerv-flicker-duration or --nerv-animation-speed tokens'
    );
  });

  it('flicker delays use --nerv-stagger-index custom property', () => {
    assert.match(css, /--nerv-stagger-index/, 'missing --nerv-stagger-index in flicker delay');
  });

  it(':nth-child() rules set --nerv-stagger-index defaults', () => {
    assert.match(css, /nth-child[\s\S]*?--nerv-stagger-index/, ':nth-child should set --nerv-stagger-index');
  });
});

describe('Glitch effect', () => {
  it('.nerv-glitch class exists', () => {
    assert.match(css, /\.nerv-glitch\b/, 'missing .nerv-glitch class');
  });

  it('.nerv-glitch::before and ::after pseudo-elements exist', () => {
    assert.match(css, /\.nerv-glitch::before/, 'missing .nerv-glitch::before');
    assert.match(css, /\.nerv-glitch::after/, 'missing .nerv-glitch::after');
  });

  it('glitch pseudo-elements use clip-path', () => {
    const glitchSection = css.slice(css.indexOf('.nerv-glitch'));
    assert.ok(glitchSection.includes('clip-path'), 'glitch pseudo-elements should use clip-path');
  });

  it('@keyframes for glitch animation exists', () => {
    assert.match(css, /@keyframes\s+nerv-glitch/, 'missing @keyframes nerv-glitch');
  });

  it('glitch duration references --nerv-glitch-duration token', () => {
    const glitchSection = css.slice(css.indexOf('.nerv-glitch'));
    assert.ok(
      glitchSection.includes('--nerv-glitch-duration'),
      'glitch animation should reference --nerv-glitch-duration token'
    );
  });

  it('glitch keyframes contain translate magnitudes >= 8px', () => {
    const startIdx = css.indexOf('@keyframes nerv-glitch-top');
    const endMarker = css.indexOf('@media', startIdx);
    const glitchSection = css.slice(startIdx, endMarker > -1 ? endMarker : undefined);

    const translateValues = [...glitchSection.matchAll(/translate\(\s*(-?\d+(?:\.\d+)?)px/g)]
      .map(m => Math.abs(parseFloat(m[1])));

    assert.ok(translateValues.length > 0, 'should have translate values in glitch keyframes');
    assert.ok(
      translateValues.some(v => v >= 8),
      `largest translate magnitude is ${Math.max(...translateValues)}px, expected >= 8px`
    );
  });

  it('glitch keyframes contain skewX magnitudes >= 6deg', () => {
    const startIdx = css.indexOf('@keyframes nerv-glitch-top');
    const endMarker = css.indexOf('@media', startIdx);
    const glitchSection = css.slice(startIdx, endMarker > -1 ? endMarker : undefined);

    const skewValues = [...glitchSection.matchAll(/skewX\(\s*(-?\d+(?:\.\d+)?)deg/g)]
      .map(m => Math.abs(parseFloat(m[1])));

    assert.ok(skewValues.length > 0, 'should have skewX values in glitch keyframes');
    assert.ok(
      skewValues.some(v => v >= 6),
      `largest skewX magnitude is ${Math.max(...skewValues)}deg, expected >= 6deg`
    );
  });

  it('nerv-glitch-top has reduced keyframe density (<= 3 intermediate stops)', () => {
    const topStart = css.indexOf('@keyframes nerv-glitch-top');
    const bottomStart = css.indexOf('@keyframes nerv-glitch-bottom');
    const topBlock = css.slice(topStart, bottomStart);

    const stops = [...topBlock.matchAll(/(\d+)%/g)]
      .map(m => parseInt(m[1]))
      .filter(v => v > 0 && v < 100);
    const uniqueStops = [...new Set(stops)];

    assert.ok(
      uniqueStops.length <= 3,
      `nerv-glitch-top has ${uniqueStops.length} intermediate stops, expected <= 3`
    );
  });

  it('nerv-glitch-bottom has reduced keyframe density (<= 4 intermediate stops)', () => {
    const bottomStart = css.indexOf('@keyframes nerv-glitch-bottom');
    const afterBottom = css.slice(bottomStart + 1);
    const nextKeyframes = afterBottom.indexOf('@keyframes');
    const nextMedia = afterBottom.indexOf('@media');
    const candidates = [nextKeyframes, nextMedia].filter(i => i > -1);
    const nextBlock = candidates.length > 0 ? Math.min(...candidates) : afterBottom.length;
    const bottomBlock = afterBottom.slice(0, nextBlock);

    const stops = [...bottomBlock.matchAll(/(\d+)%/g)]
      .map(m => parseInt(m[1]))
      .filter(v => v > 0 && v < 100);
    const uniqueStops = [...new Set(stops)];

    assert.ok(
      uniqueStops.length <= 4,
      `nerv-glitch-bottom has ${uniqueStops.length} intermediate stops, expected <= 4`
    );
  });

  it('top and bottom glitch animations use different step counts', () => {
    const glitchSection = css.slice(css.indexOf('.nerv-glitch'));
    const stepMatches = [...glitchSection.matchAll(/steps\(\s*(\d+)\s*\)/g)]
      .map(m => parseInt(m[1]));

    assert.ok(stepMatches.length >= 2, 'should have at least 2 steps() values');
    assert.notEqual(
      stepMatches[0], stepMatches[1],
      'top and bottom glitch should use different step counts for coprime drift'
    );
  });
});

describe('Accessibility — prefers-reduced-motion', () => {
  it('prefers-reduced-motion media query is present', () => {
    assert.match(css, /prefers-reduced-motion:\s*reduce/, 'missing prefers-reduced-motion media query');
  });

  it('animation classes are suppressed under prefers-reduced-motion', () => {
    const rmIdx = css.indexOf('prefers-reduced-motion');
    assert.ok(rmIdx > -1, 'prefers-reduced-motion not found');
    const rmBlock = css.slice(rmIdx);
    assert.ok(
      rmBlock.includes('animation') && (rmBlock.includes('none') || rmBlock.includes('0s')),
      'prefers-reduced-motion should suppress animations (animation: none or animation-duration: 0s)'
    );
  });
});
