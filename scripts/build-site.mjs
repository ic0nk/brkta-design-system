import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(root, 'site-dist');
const pnpm = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';

async function run(args) {
  await new Promise((resolve, reject) => {
    const child = spawn(pnpm, args, { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });
    child.once('error', reject);
    child.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`pnpm ${args.join(' ')} exited with code ${code}`)));
  });
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await run(['--dir', 'packages/ui-angular', 'exec', 'ng', 'run', 'brkta-ui-angular:build-storybook', '--output-dir', '../../site-dist/angular']);

const skipReact = process.env.BRKTA_SKIP_REACT_STORYBOOK === '1';
if (skipReact) {
  console.warn('BRKTA_SKIP_REACT_STORYBOOK=1: skipping React Storybook for local preview; React Storybook is built in CI.');
} else {
  await run(['--dir', 'packages/ui-react', 'exec', 'storybook', 'build', '--output-dir', '../../site-dist/react']);
}

await cp(path.join(root, 'docs/site'), output, { recursive: true });
if (skipReact) {
  const landingPage = path.join(output, 'index.html');
  const html = await readFile(landingPage, 'utf8');
  await writeFile(landingPage, html.replace('<!-- react-build-note -->', '<small class="build-note">Built in CI only</small>'));
}
