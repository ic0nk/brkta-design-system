import { access, mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const cli = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = path.resolve(cli, '../..');
const core = path.join(root, 'packages/ui-core');
const angularRoot = path.join(root, 'packages/ui-angular/src');
const reactRoot = path.join(root, 'packages/ui-react/src');
const reactPackage = JSON.parse(await readFile(path.join(root, 'packages/ui-react/package.json'), 'utf8'));
const publicApi = await readFile(path.join(angularRoot, 'public-api.ts'), 'utf8');
const componentDirs = (await readdir(core, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory());
const names = [];
for (const entry of componentDirs) {
  try {
    await access(path.join(core, entry.name, `${entry.name}.css`));
    names.push(entry.name);
  } catch {}
}

function angularExportRecords() {
  const records = [];
  const pattern = /export\s*\{([^}]+)\}\s*from\s*['"]([^'"]+)['"]/gs;
  for (const match of publicApi.matchAll(pattern)) {
    const sourcePath = path.resolve(angularRoot, `${match[2]}.ts`);
    for (const item of match[1].split(',')) {
      const parts = item.trim().split(/\s+as\s+/);
      if (!parts[0]) continue;
      records.push({ exported: parts.at(-1), declared: parts[0], sourcePath });
    }
  }
  return records;
}

async function reactExportRecords(name, target) {
  const relative = target.default.replace(/^\.\/dist\/src\//, '').replace(/\.js$/, '');
  const stem = path.join(reactRoot, relative);
  let sourcePath;
  for (const extension of ['.tsx', '.ts', '/index.ts']) {
    const candidate = extension.startsWith('/') ? `${stem}${extension}` : `${stem}${extension}`;
    try {
      await access(candidate);
      sourcePath = candidate;
      break;
    } catch {}
  }
  if (!sourcePath) throw new Error(`Cannot find React source for ${name}: ${relative}`);
  const source = await readFile(sourcePath, 'utf8');
  const exports = new Set();
  for (const match of source.matchAll(/export\s+(?:async\s+)?(?:function|class|const|let)\s+([A-Z][A-Za-z0-9_]*)/g)) exports.add(match[1]);
  for (const match of source.matchAll(/export\s*\{([^}]+)\}/gs)) {
    for (const item of match[1].split(',')) {
      const parts = item.trim().split(/\s+as\s+/);
      if (parts.at(-1)?.match(/^[A-Z][A-Za-z0-9_]*$/)) exports.add(parts.at(-1));
    }
  }
  return { path: `@brkta/ui-react/${name}`, exports: [...exports] };
}

function sourceReferencesAngular(source, sourcePath, dependency) {
  const imports = [...source.matchAll(/from\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
  return imports.some((specifier) => {
    if (specifier.includes('/animated-icons/')) return false;
    if (!specifier.startsWith('.')) return false;
    const resolved = path.resolve(path.dirname(sourcePath), specifier).replaceAll('\\', '/');
    return resolved.endsWith(`/${dependency}/${dependency}.component`);
  }) || new RegExp(`<brkta-${dependency}(?:\\s|>)`).test(source);
}

function sourceReferencesReact(source, dependency, exportNames) {
  const imports = [...source.matchAll(/from\s*['"]([^'"]+)['"]/g)].map((match) => match[1]);
  const imported = imports.some((specifier) => {
    if (specifier.includes('/animated-icons/')) return false;
    if (specifier.startsWith('@brkta/ui-react/')) return specifier === `@brkta/ui-react/${dependency}`;
    if (!specifier.startsWith('.')) return false;
    const resolved = path.posix.normalize(specifier);
    return resolved === `../${dependency}/${dependency}` || resolved === `../${dependency}/${dependency}.js`;
  });
  if (imported) return true;
  return exportNames.some((exportName) => new RegExp(`<${exportName}(?:\\s|/|>)`).test(source));
}

const angularRecords = angularExportRecords();
const reactRecords = new Map();
for (const [name, target] of Object.entries(reactPackage.exports ?? {})) {
  if (!name.startsWith('./') || name === './styles/*' || typeof target !== 'object' || !target.default) continue;
  const componentName = name.slice(2);
  reactRecords.set(componentName, await reactExportRecords(componentName, target));
}
const sourceFiles = new Map();
const dependencies = new Map(names.map((name) => [name, new Set()]));
for (const name of names) {
  const cssPath = path.join(core, name, `${name}.css`);
  const css = await readFile(cssPath, 'utf8');
  const angularRecord = angularRecords.find((record) => record.sourcePath.endsWith(`${path.sep}${name}${path.sep}${name}.component.ts`));
  const reactRecord = reactRecords.get(name);
  const files = [];
  if (angularRecord) {
    const content = await readFile(angularRecord.sourcePath, 'utf8');
    files.push({ framework: 'angular', sourcePath: angularRecord.sourcePath, content });
  }
  if (reactRecord) {
    const componentRoot = path.join(reactRoot, name);
    const sources = await readdir(componentRoot, { recursive: true, withFileTypes: true });
    for (const item of sources) {
      if (!item.isFile() || !/\.tsx?$/.test(item.name) || /\.(spec|stories)\./.test(item.name)) continue;
      const sourcePath = path.join(item.parentPath, item.name);
      files.push({ framework: 'react', sourcePath, content: await readFile(sourcePath, 'utf8') });
    }
  }
  sourceFiles.set(name, files);
  for (const match of css.matchAll(/@import\s+(?:url\()?['"]([^'"]+)['"]/g)) {
    const target = path.resolve(path.dirname(cssPath), match[1]);
    try { await access(target); } catch { throw new Error(`${name} imports missing CSS ${match[1]}`); }
    const relative = path.relative(core, target).replaceAll('\\', '/');
    const dependency = relative.split('/')[0];
    if (names.includes(dependency) && dependency !== name) dependencies.get(name).add(dependency);
  }
  for (const source of files) {
    for (const dependency of names) {
      if (dependency === name) continue;
      const referenced = source.framework === 'angular'
        ? sourceReferencesAngular(source.content, source.sourcePath, dependency)
        : sourceReferencesReact(source.content, dependency, reactRecords.get(dependency)?.exports ?? []);
      if (referenced) dependencies.get(name).add(dependency);
    }
  }
}

const manifest = {};
for (const name of names) {
  const angular = angularRecords
    .filter((record) => record.sourcePath.includes(`${path.sep}${name}${path.sep}`))
    .map((record) => ({ exportedName: record.exported, className: record.declared, selector: null }));
  for (const entry of angular) {
    const record = angularRecords.find((candidate) => candidate.exported === entry.exportedName && candidate.declared === entry.className);
    const source = await readFile(record.sourcePath, 'utf8');
    const selector = source.match(/selector\s*:\s*['"]([^'"]+)['"]/);
    entry.selector = selector?.[1] ?? null;
    if (!entry.selector || !source.includes(`class ${entry.className}`)) throw new Error(`Cannot resolve Angular export ${entry.exportedName} for ${name}`);
  }
  const react = reactRecords.get(name) ?? null;
  if (!angular.length && !react) continue;
  manifest[name] = { css: `${name}/${name}.css`, dependencies: [], angular, react };
}

for (const name of Object.keys(manifest)) {
  const ordered = [];
  const visiting = new Set();
  const visit = (dependency) => {
    if (visiting.has(dependency)) return;
    visiting.add(dependency);
    for (const nested of dependencies.get(dependency) ?? []) visit(nested);
    if (dependency !== name && manifest[dependency] && !ordered.includes(dependency)) ordered.push(dependency);
  };
  for (const dependency of dependencies.get(name) ?? []) visit(dependency);
  manifest[name].dependencies = ordered;
}

const aggregateCss = await readFile(path.join(core, 'styles/components.css'), 'utf8');
const sharedCss = { always: ['icon-motion/icon-motion.css'], byComponent: {} };
for (const match of aggregateCss.matchAll(/@import\s+['"]\.\.\/([^'"]+)['"]/g)) {
  const relative = match[1];
  const component = relative.split('/')[0];
  if (!names.includes(component)) {
    const sharedPath = path.join(core, relative);
    await access(sharedPath).catch(() => { throw new Error(`Aggregate CSS imports missing file ${relative}`); });
    if (relative !== 'icon-motion/icon-motion.css') {
      sharedCss.byComponent[component] = [`${component}/${path.basename(relative)}`];
    }
  }
}
const siteShellSource = sourceFiles.get('site-shell')?.map((entry) => entry.content).join('\n') ?? '';
if (siteShellSource.includes('floating-scrollbar')) {
  const scrollbarPath = path.join(core, 'scrollbar/floating-scrollbar.css');
  await access(scrollbarPath).catch(() => { throw new Error('site-shell references missing scrollbar/floating-scrollbar.css'); });
  sharedCss.byComponent['site-shell'] ??= [];
  sharedCss.byComponent['site-shell'].push('scrollbar/floating-scrollbar.css');
}
for (const [name, component] of Object.entries(manifest)) {
  for (const dependency of component.dependencies) if (!manifest[dependency]) throw new Error(`${name} references unavailable component ${dependency}`);
  for (const entry of component.angular) if (!angularRecords.some((record) => record.exported === entry.exportedName)) throw new Error(`Missing Angular export ${entry.exportedName}`);
  if (component.react && !reactPackage.exports[`./${name}`]) throw new Error(`Missing React export ${component.react.path}`);
  await access(path.join(core, component.css));
}

const dist = path.join(cli, 'dist');
await mkdir(dist, { recursive: true });
await writeFile(path.join(dist, 'manifest.json'), JSON.stringify({ components: manifest, sharedCss }, null, 2) + '\n');
const source = await readFile(path.join(cli, 'src/index.js'), 'utf8');
await writeFile(path.join(dist, 'index.js'), source.replace("'../dist/manifest.json'", "'./manifest.json'"));
await writeFile(path.join(dist, 'bin.js'), `#!/usr/bin/env node\nimport { main } from './index.js';\nmain().catch((error) => { console.error(error.message); process.exitCode = 1; });\n`);
console.log(`Generated manifest for ${Object.keys(manifest).length} components`);
