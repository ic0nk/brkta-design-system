import { cp, mkdir, mkdtemp, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const packages = ['design-tokens', 'ui-core', 'ui-react', 'ui-angular', 'icons', 'platform-core'];
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
          const dir = path.join(paths[name], clean);
          const matches = await readdir(path.dirname(dir)).catch(() => []);
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
    console.log(`verified ${manifest.name} (${tgz})`);
  }
  const smokeRoot = path.join(root, '.smoke');
  const scoped = path.join(smokeRoot, 'node_modules', '@brkta');
  await mkdir(scoped, { recursive: true });
  for (const name of ['ui-core', 'platform-core']) {
    const manifest = JSON.parse(await readFile(path.join(paths[name], 'package.json'), 'utf8'));
    const dest = path.join(scoped, name);
    await rm(dest, { recursive: true, force: true });
    await mkdir(dest, { recursive: true });
    await cp(paths[name], dest, { recursive: true });
  }
  const smoke = `import { buttonVariants } from '@brkta/ui-core/types/variant';\nimport { formatDateTime } from '@brkta/platform-core/date-time';\nconsole.log('smoke resolved', typeof buttonVariants, typeof formatDateTime);\n`;
  await writeFile(path.join(smokeRoot, 'smoke.mjs'), smoke);
  const run = spawnSync(process.execPath, [path.join(smokeRoot, 'smoke.mjs')], { cwd: smokeRoot, stdio: 'inherit' });
  if (run.status !== 0) throw new Error('Packed consumer smoke test failed');
} finally {
  await rm(temp, { recursive: true, force: true });
}
