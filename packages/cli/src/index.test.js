import { describe, expect, it } from 'vitest';
import { detectManager, main, updateCommand, updatePackages, updateStyleBlock, windowsCommandLine } from './index.js';
import { mkdir, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const cliRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(cliRoot, 'dist');
const bin = path.join(dist, 'bin.js');
const manifestPath = path.join(dist, 'manifest.json');

async function fixture(files) {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'brkta-cli-'));
  for (const [name, content] of Object.entries(files)) {
    const file = path.join(directory, name);
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, content);
  }
  return directory;
}

function run(cwd, ...args) {
  return spawnSync(process.execPath, [bin, ...args, '--cwd', cwd], { encoding: 'utf8' });
}

async function manifest() {
  return JSON.parse(await readFile(manifestPath, 'utf8'));
}

describe('CLI regression tests', () => {
  it('1. executable bin always dispatches through its wrapper', () => {
    const result = spawnSync(process.execPath, [bin, '--help'], { encoding: 'utf8' });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('brkta <command>');
  });

  it('2. preserves unquoted package-manager argv and safely builds Windows command text', () => {
    expect(updateCommand('pnpm', [], false)).toEqual(['pnpm', ['update', '@brkta/*', '--latest']]);
    expect(updateCommand('pnpm', [], false, 'win32')).toEqual(['pnpm', ['update', '@brkta/*', '--latest']]);
    expect(windowsCommandLine('pnpm', ['update', '@brkta/*', '--latest']))
      .toBe('pnpm.cmd update @brkta/* --latest');
    expect(windowsCommandLine('npm', ['install', '@brkta/ui-core@latest', 'some folder']))
      .toBe('npm.cmd install @brkta/ui-core@latest "some folder"');
  });

  it('3. checks outdated installed packages with npm, yarn, and bun', async () => {
    const directory = await fixture({
      'package.json': JSON.stringify({ dependencies: { '@brkta/ui-react': '^1', react: '^19' }, devDependencies: { '@brkta/ui-core': '^1' } }),
      'package-lock.json': '{}',
    });
    try {
      const calls = [];
      await updatePackages(directory, true, async (command, args) => { calls.push([command, args]); return 0; });
      expect(calls[0]).toEqual(['npm', ['outdated', '@brkta/ui-react', '@brkta/ui-core']]);
      expect(updateCommand('yarn', ['@brkta/ui-react'], true)).toEqual(['yarn', ['outdated', '@brkta/ui-react']]);
      expect(updateCommand('bun', ['@brkta/ui-react'], true)).toEqual(['bun', ['outdated', '@brkta/ui-react']]);
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it('4. derives only real component dependencies from source references', async () => {
    const components = (await manifest()).components;
    expect(components.button.dependencies).toEqual([]);
    expect(components.sidebar.dependencies).not.toContain('chart');
    expect(components.sidebar.dependencies).not.toContain('card');
    expect(components['alert-dialog'].dependencies).toContain('button');
    expect(components['data-table'].dependencies).toContain('button');
    expect(components['data-table'].dependencies).toContain('checkbox');
  });

  it('5. includes shared motion CSS and site-shell scrollbar CSS in minimal mode', async () => {
    const components = (await manifest()).components;
    const style = updateStyleBlock('', 'minimal', ['button', 'site-shell']);
    expect(style).toContain('@brkta/ui-core/icon-motion/icon-motion.css');
    expect(style).toContain('@brkta/ui-core/site-shell/site-shell.css');
    expect(style).toContain('@brkta/ui-core/scrollbar/floating-scrollbar.css');
    expect(components['scroll-area'].dependencies).not.toContain('scrollbar');
  });

  it('6. resolves aliased Angular exports and selectors for field errors and help', async () => {
    const components = (await manifest()).components;
    expect(components['field-error'].angular).toContainEqual({
      exportedName: 'FieldErrorTextComponent',
      className: 'FieldErrorComponent',
      selector: 'brkta-field-error',
    });
    expect(components['field-help'].angular).toContainEqual({
      exportedName: 'FieldHelpTextComponent',
      className: 'FieldHelpComponent',
      selector: 'brkta-field-help',
    });
  });

  it('7. records real React exports for helper and site-shell component snippets', async () => {
    const components = (await manifest()).components;
    expect(components['field-error'].react.exports).toContain('FieldErrorText');
    expect(components['field-help'].react.exports).toContain('FieldHelpText');
    expect(components['site-shell'].react.exports).toContain('SiteExperience');
    expect(components['site-shell'].react.exports).toContain('SiteHeader');
  });

  it('8. reports the package version at runtime instead of a source constant', async () => {
    const pkg = JSON.parse(await readFile(path.join(cliRoot, 'package.json'), 'utf8'));
    const result = spawnSync(process.execPath, [bin, 'list', '--version'], { encoding: 'utf8' });
    expect(result.status).toBe(0);
    expect(result.stdout.trim()).toBe(pkg.version);
  });

  it('detects pnpm and npm lockfiles and constructs update commands without network calls', () => {
    expect(detectManager(['pnpm-lock.yaml'])).toBe('pnpm');
    expect(detectManager(['package-lock.json'])).toBe('npm');
    expect(updateCommand('npm', ['@brkta/ui-angular'], false)).toEqual(['npm', ['install', '@brkta/ui-angular@latest']]);
  });

  it('keeps managed CSS idempotent and preserves user styles', () => {
    const userCss = 'body { color: red; }';
    const first = updateStyleBlock(userCss, 'all');
    const second = updateStyleBlock(first, 'all');
    expect(second).toBe(first);
    expect(second).toContain(userCss);
    expect(second.match(/brkta-design-system:start/g)).toHaveLength(1);
  });

  it('initializes Angular styles.scss, preserves npmrc, scripts, and the managed block on reruns', async () => {
    const directory = await fixture({
      'package.json': JSON.stringify({ dependencies: { '@angular/core': '^20' }, scripts: { test: 'test' } }),
      'pnpm-lock.yaml': 'lock',
      'angular.json': JSON.stringify({ projects: { app: { architect: { build: { options: { styles: [{ input: 'src/styles.scss' }] } } } } } }),
      'src/styles.scss': 'body { color: rebeccapurple; }',
      '.npmrc': 'save-exact=true\n',
    });
    try {
      expect(run(directory, 'init', '--yes', '--skip-install').status).toBe(0);
      expect(run(directory, 'init', '--yes', '--skip-install').status).toBe(0);
      const styles = await readFile(path.join(directory, 'src/styles.scss'), 'utf8');
      expect(styles.match(/brkta-design-system:start/g)).toHaveLength(1);
      expect(styles).toContain('body { color: rebeccapurple; }');
      const npmrc = await readFile(path.join(directory, '.npmrc'), 'utf8');
      expect(npmrc).toContain('save-exact=true');
      expect(npmrc).toContain('${GITHUB_TOKEN}');
      const packageJson = JSON.parse(await readFile(path.join(directory, 'package.json'), 'utf8'));
      expect(packageJson.scripts['ds:update']).toBe('pnpm dlx @brkta/cli update');
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it('initializes Next minimal CSS and adds component dependencies in order', async () => {
    const directory = await fixture({
      'package.json': JSON.stringify({ devDependencies: { next: '^15', react: '^19' } }),
      'app/globals.css': 'body { margin: 0; }',
    });
    try {
      expect(run(directory, 'init', '--yes', '--skip-install', '--css', 'minimal').status).toBe(0);
      expect(run(directory, 'add', 'alert-dialog').status).toBe(0);
      const styles = await readFile(path.join(directory, 'app/globals.css'), 'utf8');
      expect(styles.indexOf('/button/button.css')).toBeLessThan(styles.indexOf('/alert-dialog/alert-dialog.css'));
      expect(styles).toContain('body { margin: 0; }');
    } finally {
      await rm(directory, { recursive: true, force: true });
    }
  });

  it('rejects ambiguous or missing framework detection and unknown component names', async () => {
    const ambiguous = await fixture({ 'package.json': JSON.stringify({ dependencies: { '@angular/core': 'x', react: 'x' } }), 'src/styles.css': '' });
    const neither = await fixture({ 'package.json': JSON.stringify({ dependencies: {} }), 'src/styles.css': '' });
    try {
      expect(run(ambiguous, 'init', '--yes', '--skip-install').status).not.toBe(0);
      expect(run(ambiguous, 'init', '--yes', '--skip-install', '--framework', 'react').status).toBe(0);
      const missing = run(neither, 'init', '--yes', '--skip-install');
      expect(missing.status).not.toBe(0);
      expect(missing.stderr).toContain('--framework');
      const unknown = run(ambiguous, 'add', 'buton');
      expect(unknown.status).not.toBe(0);
    } finally {
      await rm(ambiguous, { recursive: true, force: true });
      await rm(neither, { recursive: true, force: true });
    }
  });
});
