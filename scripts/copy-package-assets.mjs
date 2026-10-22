import { cp, mkdir, readdir } from 'node:fs/promises';
import path from 'node:path';

const name = process.argv[2];
if (!['ui-core', 'ui-react'].includes(name)) throw new Error(`Unsupported package: ${name}`);
const root = path.resolve(import.meta.dirname, '..', 'packages', name);
const source = path.join(root, name === 'ui-react' ? 'src' : '.');
const out = path.join(root, 'dist', name === 'ui-react' ? 'src' : '');
async function copyAssets(from, to) {
  await mkdir(to, { recursive: true });
  for (const entry of await readdir(from, { withFileTypes: true })) {
    if (['dist', 'node_modules', '.angular'].includes(entry.name)) continue;
    const src = path.join(from, entry.name);
    const dest = path.join(to, entry.name);
    if (entry.isDirectory()) await copyAssets(src, dest);
    else if (/\.(css|woff2?|svg|png|webp|json)$/.test(entry.name)) await cp(src, dest);
  }
}
await copyAssets(source, out);
