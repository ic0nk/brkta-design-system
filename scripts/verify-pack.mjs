import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const packages = ['design-tokens', 'ui-core', 'ui-react', 'ui-angular', 'icons', 'platform-core', 'cli'];
const temp = await mkdtemp(path.join(os.tmpdir(), 'brkta-pack-'));
const packed = path.join(temp, 'packed');
const unpacked = path.join(temp, 'unpacked');
await mkdir(packed, { recursive: true });
await mkdir(unpacked, { recursive: true });
try {
  const paths = {};
  for (const name of packages) {
    const cwd = path.join(root, 'packages', name);
    const result = spawnSync('pnpm', ['pack', '--pack-destination', packed], { cwd, stdio: 'inherit', shell: process.platform === 'win32' });
    if (result.status !== 0) throw new Error(`pnpm pack failed: ${name}`);
    const manifest = JSON.parse(await readFile(path.join(cwd, 'package.json'), 'utf8'));
    const tgz = (await readdir(packed)).find((file) => file.startsWith(`${manifest.name.replace('@', '').replace('/', '-')}-`) && file.endsWith('.tgz'));
    if (!tgz) throw new Error(`Tarball not produced for ${manifest.name}`);
    const target = path.join(unpacked, name);
    await mkdir(target, { recursive: true });
    const extract = spawnSync('tar', ['-xzf', path.join(packed, tgz), '-C', target], { stdio: 'inherit', shell: process.platform === 'win32' });
    if (extract.status !== 0) throw new Error(`tar extraction failed: ${tgz}`);
    paths[name] = path.join(target, 'package');
    const packedManifest = JSON.parse(await readFile(path.join(paths[name], 'package.json'), 'utf8'));
    for (const entry of Object.values(packedManifest.exports ?? {})) {
      const targets = typeof entry === 'string' ? [entry] : Object.values(entry ?? {}).filter((v) => typeof v === 'string');
      for (const file of targets) {
        const clean = file.replace(/^\.\//, '').replace(/\*.*$/, '');
        if (file.includes('*')) {
          const star = file.indexOf('*');
          const directory = path.join(paths[name], file.slice(2, star));
          const matches = await readdir(directory).catch(() => []);
          if (!matches.length) throw new Error(`${manifest.name} export target has no files: ${file}`);
        } else {
          await readFile(path.join(paths[name], clean)).catch(() => { throw new Error(`${manifest.name} missing export target: ${file}`); });
        }
      }
    }
    if (['ui-core', 'ui-react', 'platform-core'].includes(name)) {
      const files = await readdir(path.join(paths[name], 'dist'), { recursive: true });
      if (!files.some((file) => String(file).endsWith('.js')) || !files.some((file) => String(file).endsWith('.d.ts'))) throw new Error(`${manifest.name} lacks compiled JS/declarations`);
    }
    const all = await readdir(paths[name], { recursive: true });
    if (all.some((f) => /(^|\/)(\.env[^/]*|node_modules|storybook-static)(\/|$)|(?<!\.d)\.ts$/.test(String(f)))) throw new Error(`${manifest.name} contains a forbidden source/secret/dependency file`);
    if (name === 'ui-core' && all.some((f) => ['dist/package.json', 'dist/tsconfig.build.json'].includes(String(f).replaceAll('\\', '/')))) throw new Error(`${manifest.name} includes build-only metadata`);
    if (name === 'ui-react' && all.some((f) => /(^|\/)dist\/src\/(stories\/|.*\.(spec|stories)\.)/.test(String(f).replaceAll('\\', '/')))) throw new Error(`${manifest.name} includes tests or stories`);
    console.log(`verified ${manifest.name} (${tgz})`);
  }
  const smokeParent = path.join(root, '.smoke');
  await mkdir(smokeParent, { recursive: true });
  const smokeRoot = await mkdtemp(path.join(smokeParent, 'packed-consumer-'));
  const scoped = path.join(smokeRoot, 'node_modules', '@brkta');
  await mkdir(scoped, { recursive: true });
  for (const name of ['design-tokens', 'ui-core', 'platform-core', 'ui-react']) {
    const dest = path.join(scoped, name);
    await cp(paths[name], dest, { recursive: true });
  }
  for (const name of ['react', 'gsap', 'lucide-react']) {
    const source = path.join(root, 'packages', 'ui-react', 'node_modules', name);
    const dest = path.join(smokeRoot, 'node_modules', name);
    await mkdir(path.dirname(dest), { recursive: true });
    await cp(source, dest, { recursive: true, dereference: true });
  }
  const cliHelp = spawnSync(process.execPath, [path.join(paths.cli, 'dist/bin.js'), '--help'], { cwd: smokeRoot, stdio: 'inherit' });
  if (cliHelp.status !== 0) throw new Error('Packed CLI --help failed');
  const cliList = spawnSync(process.execPath, [path.join(paths.cli, 'dist/bin.js'), 'list'], { cwd: smokeRoot, stdio: 'inherit' });
  if (cliList.status !== 0) throw new Error('Packed CLI list failed');
  const smoke = `import { DATA_ATTRS } from '@brkta/ui-core/types/variant';\nimport { formatDateTime } from '@brkta/platform-core/date-time';\nimport { Button } from '@brkta/ui-react/button';\nconsole.log('smoke exports', DATA_ATTRS.button, typeof formatDateTime, typeof Button);\nconsole.log('css resolution', import.meta.resolve('@brkta/ui-core/styles/components.css'), import.meta.resolve('@brkta/ui-core/button/button.css'));\n`;
  await writeFile(path.join(smokeRoot, 'smoke.mjs'), smoke);
  const run = spawnSync(process.execPath, [path.join(smokeRoot, 'smoke.mjs')], { cwd: smokeRoot, stdio: 'inherit' });
  if (run.status !== 0) throw new Error('Packed consumer smoke test failed');
} finally {
  await rm(temp, { recursive: true, force: true });
}
