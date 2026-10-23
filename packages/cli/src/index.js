import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'node:process';
import { fileURLToPath } from 'node:url';
import manifestData from '../dist/manifest.json' with { type: 'json' };

const manifest = manifestData.components;
const START_MARKER = '/* brkta-design-system:start */';
const END_MARKER = '/* brkta-design-system:end */';
const HELP = `brkta <command>

Commands:
  init [--framework angular|react] [--css all|minimal] [--yes] [--skip-install] [--cwd <dir>]
  add <component...> [--cwd <dir>]
  update [--check] [--cwd <dir>]
  list
`;

export function parseArguments(args) {
  const flags = {};
  const positional = [];
  const valueFlags = new Set(['cwd', 'framework', 'css']);
  for (let index = 0; index < args.length; index += 1) {
    const argument = args[index];
    if (!argument.startsWith('--')) {
      positional.push(argument);
      continue;
    }
    const name = argument.slice(2);
    flags[name] = valueFlags.has(name) ? args[++index] : true;
  }
  return { flags, positional };
}

export function detectManager(files) {
  if (files.includes('pnpm-lock.yaml')) return 'pnpm';
  if (files.includes('yarn.lock')) return 'yarn';
  if (files.includes('bun.lock') || files.includes('bun.lockb')) return 'bun';
  if (files.includes('package-lock.json')) return 'npm';
  return 'npm';
}

export function updateCommand(manager, packages, check = false) {
  if (check) {
    if (manager === 'pnpm') return ['pnpm', ['outdated', '@brkta/*']];
    if (manager === 'yarn') return ['yarn', ['outdated', ...packages]];
    if (manager === 'bun') return ['bun', ['outdated', ...packages]];
    return ['npm', ['outdated', ...packages]];
  }
  if (manager === 'pnpm') return ['pnpm', ['update', '@brkta/*', '--latest']];
  if (manager === 'yarn') return ['yarn', ['up', '@brkta/*']];
  if (manager === 'bun') return ['bun', ['update', '@brkta/*']];
  return ['npm', ['install', ...packages.map((name) => `${name}@latest`)]];
}

function quoteWindowsArgument(argument) {
  const escaped = String(argument).replaceAll('"', '""');
  return /[\s&|<>^()]/.test(escaped) ? `"${escaped}"` : escaped;
}

export function windowsCommandLine(command, args) {
  return [
    `${command}.cmd`,
    ...args.map(quoteWindowsArgument),
  ].join(' ');
}

export function runProcess(command, args, cwd) {
  return new Promise((resolve, reject) => {
    const windows = process.platform === 'win32';
    const child = windows
      ? spawn(windowsCommandLine(command, args), { cwd, stdio: 'inherit', shell: true })
      : spawn(command, args, { cwd, stdio: 'inherit' });
    child.once('error', reject);
    child.once('close', (code) => resolve(code ?? 1));
  });
}

function frameworkFrom(packageJson) {
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };
  const angular = Boolean(dependencies['@angular/core']);
  const react = Boolean(dependencies.next || dependencies.react);
  if (angular === react) return null;
  return angular ? 'angular' : 'react';
}

async function ensureFileText(file) {
  try {
    return await readFile(file, 'utf8');
  } catch {
    return '';
  }
}

async function addRegistry(root) {
  const file = path.join(root, '.npmrc');
  const current = await ensureFileText(file);
  const lines = current
    ? current.split(/\r?\n/).filter((line, index, all) => line || index < all.length - 1)
    : [];
  const required = [
    '@brkta:registry=https://npm.pkg.github.com',
    '//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}',
  ];
  for (const line of required) {
    if (!lines.includes(line)) lines.push(line);
  }
  await writeFile(file, `${lines.join('\n').replace(/\n*$/, '')}\n`);
}

function styleImports(cssMode, componentNames = []) {
  const lines = [
    '@import "@brkta/design-tokens/fonts.css";',
    '@import "@brkta/design-tokens/theme.css";',
    '@import "@brkta/design-tokens/base.css";',
  ];
  if (cssMode === 'all') {
    lines.push('@import "@brkta/ui-core/styles/components.css";');
    return lines;
  }

  const seen = new Set();
  const addImport = (relativePath) => {
    if (seen.has(relativePath)) return;
    seen.add(relativePath);
    lines.push(`@import "@brkta/ui-core/${relativePath}";`);
  };
  for (const shared of manifestData.sharedCss.always) addImport(shared);
  for (const componentName of componentNames) {
    const component = manifest[componentName];
    if (!component) continue;
    for (const shared of manifestData.sharedCss.byComponent[componentName] ?? []) addImport(shared);
    addImport(component.css);
  }
  return lines;
}

export function updateStyleBlock(content, cssMode, componentNames = []) {
  const block = [
    START_MARKER,
    ...styleImports(cssMode, componentNames),
    END_MARKER,
  ].join('\n');
  const escapedStart = START_MARKER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const escapedEnd = END_MARKER.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const managedBlock = new RegExp(`${escapedStart}[\\s\\S]*?${escapedEnd}\\s*`);
  const preservedContent = content.replace(managedBlock, '').replace(/^\s*\n/, '');
  return `${block}\n${preservedContent}`;
}

async function fileExists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function findStylesheet(root, framework) {
  if (framework === 'angular') {
    let angularConfig;
    try {
      angularConfig = JSON.parse(await readFile(path.join(root, 'angular.json'), 'utf8'));
    } catch {}
    for (const project of Object.values(angularConfig?.projects ?? {})) {
      const targets = project.architect ?? project.targets;
      const entry = targets?.build?.options?.styles?.[0];
      const file = typeof entry === 'string' ? entry : entry?.input;
      if (file) return path.resolve(root, file);
    }
    for (const file of ['src/styles.css', 'src/styles.scss']) {
      if (await fileExists(path.join(root, file))) return path.join(root, file);
    }
    return path.join(root, 'src/styles.css');
  }

  const candidates = [
    'app/globals.css',
    'src/app/globals.css',
    'styles/globals.css',
    'src/styles/globals.css',
  ];
  for (const file of candidates) {
    if (await fileExists(path.join(root, file))) return path.join(root, file);
  }
  if (await fileExists(path.join(root, 'src/app'))) {
    return path.join(root, 'src/app/globals.css');
  }
  return null;
}

function installCommand(manager, framework) {
  const packageName = framework === 'angular' ? '@brkta/ui-angular' : '@brkta/ui-react';
  if (manager === 'pnpm') return ['pnpm', ['add', packageName]];
  if (manager === 'yarn') return ['yarn', ['add', packageName]];
  if (manager === 'bun') return ['bun', ['add', packageName]];
  return ['npm', ['install', packageName]];
}

async function installPackage(root, manager, framework, runner) {
  const [command, args] = installCommand(manager, framework);
  return runner(command, args, root);
}

async function writeGlobalStyles(root, framework, cssMode, components = []) {
  const stylesheet = await findStylesheet(root, framework);
  if (!stylesheet) {
    console.log(`Add this to your global stylesheet:\n${styleImports(cssMode, components).join('\n')}`);
    return;
  }
  await mkdir(path.dirname(stylesheet), { recursive: true });
  const content = await ensureFileText(stylesheet);
  await writeFile(stylesheet, updateStyleBlock(content, cssMode, components));
}

async function promptFramework() {
  const readline = createInterface({ input: stdin, output: stdout });
  const answer = await readline.question('Choose framework (angular/react): ');
  readline.close();
  return answer.trim();
}

async function init(flags, root, runner) {
  const packagePath = path.join(root, 'package.json');
  const packageJson = JSON.parse(await readFile(packagePath, 'utf8'));
  let framework = flags.framework;
  if (framework && !['angular', 'react'].includes(framework)) {
    throw new Error('--framework must be angular or react');
  }
  framework ??= frameworkFrom(packageJson);
  if (!framework) {
    if (flags.yes || !stdin.isTTY) {
      throw new Error('Could not uniquely detect framework; specify --framework angular or --framework react.');
    }
    framework = await promptFramework();
    if (!['angular', 'react'].includes(framework)) {
      throw new Error('Choose angular or react.');
    }
  }

  const cssMode = flags.css ?? 'all';
  if (!['all', 'minimal'].includes(cssMode)) {
    throw new Error('--css must be all or minimal');
  }
  const files = await readdir(root);
  const manager = detectManager(files);
  await addRegistry(root);
  if (!process.env.GITHUB_TOKEN && !process.env.NODE_AUTH_TOKEN) {
    console.warn('Neither GITHUB_TOKEN nor NODE_AUTH_TOKEN is set. Create a classic GitHub PAT with read:packages and set GITHUB_TOKEN before installing.');
  }
  await writeGlobalStyles(root, framework, cssMode);

  packageJson.scripts ??= {};
  if (!packageJson.scripts['ds:update']) {
    packageJson.scripts['ds:update'] = manager === 'pnpm'
      ? 'pnpm dlx @brkta/cli update'
      : 'npx @brkta/cli update';
  }
  await writeFile(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
  await writeFile(path.join(root, 'brkta.json'), `${JSON.stringify({ framework, css: cssMode, components: [] }, null, 2)}\n`);
  if (!flags['skip-install']) {
    const exitCode = await installPackage(root, manager, framework, runner);
    if (exitCode) throw new Error(`Package installation failed (${exitCode})`);
  }

  const example = framework === 'angular'
    ? 'ButtonComponent from @brkta/ui-angular and use <brkta-button>.'
    : 'Button from @brkta/ui-react/button and use <Button>.';
  console.log(`Initialized BRKTA design system for ${framework}. Next: import ${example}`);
}

function levenshtein(left, right) {
  const row = Array.from({ length: right.length + 1 }, (_, index) => index);
  for (let i = 1; i <= left.length; i += 1) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= right.length; j += 1) {
      const oldValue = row[j];
      row[j] = Math.min(
        row[j] + 1,
        row[j - 1] + 1,
        previous + (left[i - 1] === right[j - 1] ? 0 : 1),
      );
      previous = oldValue;
    }
  }
  return row[right.length];
}

function suggestComponents(name) {
  return Object.keys(manifest)
    .map((candidate) => [candidate, levenshtein(candidate, name)])
    .sort((left, right) => left[1] - right[1])
    .slice(0, 3)
    .map(([candidate]) => candidate);
}

function componentStyleOrder(componentNames) {
  const ordered = [];
  for (const name of componentNames) {
    for (const dependency of manifest[name].dependencies) {
      if (!ordered.includes(dependency)) ordered.push(dependency);
    }
    if (!ordered.includes(name)) ordered.push(name);
  }
  return ordered;
}

function printUsage(component, framework) {
  if (framework === 'angular') {
    const entry = component.angular[0];
    if (!entry) {
      console.log('This component is not available for Angular.');
      return;
    }
    console.log(`import { ${entry.exportedName} } from '@brkta/ui-angular';\nUse <${entry.selector}> in a template and add ${entry.exportedName} to imports: [...].`);
    return;
  }
  if (!component.react) {
    console.log('This component is not available for React.');
    return;
  }
  const exports = component.react.exports;
  console.log(`import { ${exports.join(', ')} } from '${component.react.path}';\nUse <${exports[0]} />.`);
}

async function addComponents(names, root) {
  const configPath = path.join(root, 'brkta.json');
  const config = JSON.parse(await readFile(configPath, 'utf8'));
  for (const name of names) {
    if (!manifest[name]) {
      throw new Error(`Unknown component "${name}". Similar components: ${suggestComponents(name).join(', ')}`);
    }
  }
  const components = [...new Set([...(config.components ?? []), ...names])];
  if (config.css === 'minimal') {
    await writeGlobalStyles(root, config.framework, 'minimal', componentStyleOrder(components));
  }
  config.components = components;
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`);
  if (config.css === 'all') console.log('CSS unchanged because css mode is all.');
  for (const name of names) printUsage(manifest[name], config.framework);
}

export async function updatePackages(root, check, runner = runProcess) {
  const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'));
  const packages = [...new Set(Object.keys({
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  }).filter((name) => name.startsWith('@brkta/')))];
  const manager = detectManager(await readdir(root));
  const [command, args] = updateCommand(manager, packages, check);
  const exitCode = await runner(command, args, root);
  if (exitCode) process.exitCode = exitCode;
}

async function readVersion() {
  const packagePath = fileURLToPath(new URL('../package.json', import.meta.url));
  return JSON.parse(await readFile(packagePath, 'utf8')).version;
}

export async function main(args = process.argv.slice(2), runner = runProcess) {
  const [command, ...rest] = args;
  if (rest.includes('--version') || rest.includes('-v') || command === '--version' || command === '-v') {
    console.log(await readVersion());
    return;
  }
  if (!command || command === '--help' || command === '-h') {
    console.log(HELP);
    return;
  }
  const { flags, positional } = parseArguments(rest);
  const root = path.resolve(flags.cwd ?? process.cwd());
  if (flags.help || flags.h) {
    console.log(HELP);
    return;
  }
  if (command === 'list') {
    for (const [name, component] of Object.entries(manifest)) {
      console.log(`${name}\tAngular: ${component.angular.length ? 'yes' : 'no'}\tReact: ${component.react ? 'yes' : 'no'}`);
    }
    return;
  }
  if (command === 'init') return init(flags, root, runner);
  if (command === 'add') {
    if (!positional.length) throw new Error('Usage: brkta add <component...>');
    return addComponents(positional, root);
  }
  if (command === 'update') return updatePackages(root, Boolean(flags.check), runner);
  throw new Error(`Unknown command: ${command}\n${HELP}`);
}
