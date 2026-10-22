/**
 * BRKTA — Theme Contrast Validator
 * ========================================================================
 * Validates WCAG AA contrast ratios for all semantic token pairings
 * in both light and dark themes.
 *
 * Usage:
 *   node scripts/validate-contrast.mjs
 *
 * Requires: culori (available in @brkta/design-tokens)
 *   pnpm --filter @brkta/design-tokens exec node scripts/validate-contrast.mjs
 *
 * ========================================================================
 */

import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const culori = require('culori');

// ─── Convert hex to WCAG relative luminance ───────────────────────────────
function relativeLuminance(hex) {
  const r = culori.rgb(hex);
  const toLinear = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r.r * 255) + 0.7152 * toLinear(r.g * 255) + 0.0722 * toLinear(r.b * 255);
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ─── Theme colour definitions ─────────────────────────────────────────────
// sRGB hex equivalents of the OKLCH tokens in theme.css

const LIGHT = {
  Background:  '#F4F1EA',
  Surface:     '#F8F5EE',
  Card:        '#FFFCF7',
  Popover:     '#FFFDF9',
  Muted:       '#EEE9DF',
  Secondary:   '#E9E4DA',
  Input:       '#FAF7F1',
  Border:      '#DDD5C8',
  Foreground:  '#181713',
  SecondaryFg: '#3F3C36',
  MutedFg:     '#68645C',
  SubtleFg:    '#827D73',
  Primary:     '#181713',
  PrimaryFg:   '#F4F1EA',
};

const DARK = {
  Background:  '#12110E',
  Surface:     '#191813',
  Card:        '#211F1A',
  Popover:     '#29261F',
  Muted:       '#302D26',
  Secondary:   '#38342C',
  Input:       '#1E1C17',
  Border:      '#474238',
  Foreground:  '#F4F1EA',
  SecondaryFg: '#D8D2C7',
  MutedFg:     '#AAA398',
  SubtleFg:    '#8D867B',
  Primary:     '#F4F1EA',
  PrimaryFg:   '#181713',
};

const THRESHOLD_NORMAL = 4.5;  // WCAG AA normal text
const THRESHOLD_LARGE  = 3.0;  // WCAG AA large text
const THRESHOLD_NON_TEXT = 3.0; // WCAG AA non-text contrast

// ─── Test definitions ─────────────────────────────────────────────────────
// Each test: [label, foreground key, background key, threshold, notes]
const TESTS = [
  // Primary text on surfaces
  ['Foreground on Background',   'Foreground', 'Background',  THRESHOLD_NORMAL, 'Main text on page canvas'],
  ['Foreground on Surface',      'Foreground', 'Surface',     THRESHOLD_NORMAL, 'Main text on sidebars/groups'],
  ['Foreground on Card',         'Foreground', 'Card',        THRESHOLD_NORMAL, 'Main text on cards'],
  ['Foreground on Popover',      'Foreground', 'Popover',     THRESHOLD_NORMAL, 'Main text on popovers/dialogs'],

  // Muted / secondary text
  ['Muted foreground on Background',  'MutedFg', 'Background', THRESHOLD_NORMAL, 'Secondary text on page'],
  ['Muted foreground on Surface',     'MutedFg', 'Surface',    THRESHOLD_NORMAL, 'Secondary text on surfaces'],
  ['Muted foreground on Muted',       'MutedFg', 'Muted',      THRESHOLD_NORMAL, 'Secondary text on muted areas'],
  ['Secondary foreground on Secondary', 'SecondaryFg', 'Secondary', THRESHOLD_NORMAL, 'Labels on secondary controls'],

  // Subtle / placeholder text (may only meet large-text threshold)
  ['Subtle foreground on Background', 'SubtleFg', 'Background', THRESHOLD_LARGE, 'Placeholders on page (large-text OK)'],
  ['Subtle foreground on Input',      'SubtleFg', 'Input',      THRESHOLD_LARGE, 'Placeholders on form fields (large-text OK)'],

  // Borders (non-text contrast)
  ['Border on Background', 'Border', 'Background', THRESHOLD_NON_TEXT, 'Dividers and card borders on page'],
  ['Border on Card',       'Border', 'Card',       THRESHOLD_NON_TEXT, 'Card borders on card surface'],
  ['Border on Surface',    'Border', 'Surface',    THRESHOLD_NON_TEXT, 'Borders on surface panels'],
  ['Border on Input',      'Border', 'Input',      THRESHOLD_NON_TEXT, 'Form field borders on input surface'],

  // Primary button
  ['Primary background on Primary foreground', 'Primary', 'PrimaryFg', THRESHOLD_NORMAL, 'Primary button bg on button text'],
  ['Primary foreground on Primary background', 'PrimaryFg', 'Primary', THRESHOLD_NORMAL, 'Primary button text on button bg'],

  // Surface hierarchy distinctness (informational)
  ['Surface on Background',  'Surface', 'Background', 3.0, 'Surface distinct from page canvas'],
  ['Card on Background',     'Card',    'Background', 3.0, 'Card distinct from page canvas'],
  ['Card on Surface',        'Card',    'Surface',    1.5, 'Card distinct from surface (low)'],
  ['Popover on Background',  'Popover', 'Background', 3.0, 'Popover distinct from page canvas'],
];

// ─── Run validation ───────────────────────────────────────────────────────
let allPass = true;

function validate(themeName, theme) {
  console.log(`\n\x1b[1m${themeName}\x1b[0m`);
  console.log('━'.repeat(60));

  for (const [label, fgKey, bgKey, threshold, notes] of TESTS) {
    const fgHex = theme[fgKey];
    const bgHex = theme[bgKey];
    if (!fgHex || !bgHex) {
      console.log(`  \x1b[33mSKIP\x1b[0m  ${label} — missing colour definition`);
      continue;
    }

    const ratio = contrastRatio(fgHex, bgHex);
    const pass = ratio >= threshold;
    const icon = pass ? '\x1b[32m✓\x1b[0m' : '\x1b[31m✗\x1b[0m';
    const ratioStr = ratio.toFixed(2).padStart(5);

    console.log(`  ${icon} ${ratioStr}:1  ${label}${pass ? '' : '\x1b[31m  FAIL\x1b[0m'}`);
    if (!pass) {
      allPass = false;
      console.log(`       ${fgKey} (#${fgHex}) on ${bgKey} (#${bgHex}) — need ≥ ${threshold}:1`);
    }
  }

  // Summary for this theme
  const failures = TESTS.filter(([, fg, bg, t]) => {
    const f = theme[fg];
    const b = theme[bg];
    return f && b && contrastRatio(f, b) < t;
  });

  if (failures.length === 0) {
    console.log(`\n  \x1b[32m✓ All ${TESTS.length} checks pass for ${themeName}\x1b[0m`);
  } else {
    console.log(`\n  \x1b[31m✗ ${failures.length}/${TESTS.length} checks fail for ${themeName}\x1b[0m`);
  }
}

validate('LIGHT THEME', LIGHT);
validate('DARK THEME', DARK);

console.log('\n' + '═'.repeat(60));
if (allPass) {
  console.log('\x1b[32m✓ All contrast checks pass across both themes\x1b[0m');
  process.exit(0);
} else {
  console.log('\x1b[31m✗ Some contrast checks failed — review and adjust tokens\x1b[0m');
  process.exit(1);
}
