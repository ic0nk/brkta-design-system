import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { inflateSync } from 'node:zlib';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { chromium } from 'playwright';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const candidates = [
  path.join(root, 'site-dist/react'),
  path.join(root, 'packages/ui-react/storybook-static'),
  path.join(root, 'site-dist/angular'),
  path.join(root, 'packages/ui-angular/storybook-static'),
];
let storybook;
for (const candidate of candidates) {
  try {
    await stat(path.join(candidate, 'index.json'));
    await stat(path.join(candidate, 'iframe.html'));
    storybook = candidate;
    break;
  } catch {}
}
if (!storybook) throw new Error('No complete Storybook output found (index.json and iframe.html are required); run `pnpm docs:build` or a Storybook build command.');

const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff': 'font/woff', '.woff2': 'font/woff2' };
const server = createServer(async (request, response) => {
  try {
    const urlPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    if (urlPath === '/__theme.css') {
      response.writeHead(200, { 'content-type': 'text/css; charset=utf-8' });
      response.end(await readFile(path.join(root, 'packages/design-tokens/theme.css')));
      return;
    }
    const target = path.resolve(storybook, `.${urlPath}`);
    if (target !== storybook && !target.startsWith(`${storybook}${path.sep}`)) throw new Error('Invalid path');
    const file = target.endsWith(path.sep) ? path.join(target, 'index.html') : target;
    const body = await readFile(file);
    response.writeHead(200, { 'content-type': mime[path.extname(file)] ?? 'application/octet-stream' });
    response.end(body);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
});
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const address = server.address();
const baseUrl = `http://127.0.0.1:${address.port}`;

async function launchBrowser() {
  try {
    return await chromium.launch({ channel: 'chrome', headless: true });
  } catch {
    await new Promise((resolve, reject) => {
      const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
      const child = spawn(npx, ['playwright', 'install', 'chromium'], { cwd: root, stdio: 'inherit', shell: process.platform === 'win32' });
      child.once('error', reject);
      child.once('exit', (code) => code === 0 ? resolve() : reject(new Error(`npx playwright install chromium exited with code ${code}`)));
    });
    return chromium.launch({ headless: true });
  }
}

const index = JSON.parse(await readFile(path.join(storybook, 'index.json'), 'utf8'));
const entries = Object.values(index.entries ?? index).filter((entry) => entry.type === 'story');
const normalize = (value) => value.toLowerCase().replace(/[^a-z0-9]/g, '');
function storyFor(component) {
  const target = normalize(component);
  const matching = entries.filter((entry) => normalize(entry.title.split('/').at(-1)) === target);
  if (!matching.length) throw new Error(`No Storybook entry found for component “${component}” in index.json`);
  const preferences = {
    button: ['allvariants', 'showcase', 'hoverfill'], badge: ['allvariants', 'variants', 'showcase'],
    input: ['withvalue', 'default'], select: ['default'], 'dropdown-menu': ['withicons', 'default'],
    dialog: ['default'], tabs: ['segmented', 'default'], 'data-table': ['default'], toast: ['success', 'default'],
    sidebar: ['default', 'embedded'], 'date-picker': ['withvalue', 'default'], slider: ['withvalue', 'range', 'default'],
    switch: ['checked', 'on', 'default'], avatar: ['withimage', 'default'], card: ['default'],
  }[component] ?? ['default'];
  for (const preferred of preferences) {
    const match = matching.find((entry) => normalize(entry.name) === preferred);
    if (match) return match;
  }
  return matching.find((entry) => /^(default|overview|primary)$/i.test(entry.name)) ?? matching[0];
}

const componentFiles = [
  ['button', 'button'], ['badge', 'badge'], ['card', 'card'], ['input', 'input'], ['select', 'select'],
  ['dropdown-menu', 'dropdown-menu'], ['dialog', 'dialog'], ['tabs', 'tabs'], ['data-table', 'data-table'],
  ['toast', 'toast'], ['sidebar', 'sidebar'], ['date-picker', 'date-picker'], ['slider', 'slider'],
  ['switch', 'switch'], ['avatar', 'avatar'],
];
function paeth(left, above, upperLeft) {
  const estimate = left + above - upperLeft;
  const leftDistance = Math.abs(estimate - left);
  const aboveDistance = Math.abs(estimate - above);
  const upperLeftDistance = Math.abs(estimate - upperLeft);
  if (leftDistance <= aboveDistance && leftDistance <= upperLeftDistance) return left;
  return aboveDistance <= upperLeftDistance ? above : upperLeft;
}

async function inspectPng(input) {
  const png = Buffer.isBuffer(input) ? input : await readFile(input);
  const label = typeof input === 'string' ? path.basename(input) : 'screenshot';
  let width;
  let height;
  let bitDepth;
  let colorType;
  let palette;
  const imageData = [];
  for (let offset = 8; offset < png.length;) {
    const length = png.readUInt32BE(offset);
    const type = png.toString('ascii', offset + 4, offset + 8);
    const data = png.subarray(offset + 8, offset + 8 + length);
    if (type === 'IHDR') {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data[8];
      colorType = data[9];
    } else if (type === 'PLTE') palette = data;
    else if (type === 'IDAT') imageData.push(data);
    offset += length + 12;
    if (type === 'IEND') break;
  }
  if (bitDepth !== 8 || ![0, 2, 3, 4, 6].includes(colorType)) throw new Error(`Unsupported PNG format in ${label}`);
  const channels = ({ 0: 1, 2: 3, 3: 1, 4: 2, 6: 4 })[colorType];
  const rowBytes = width * channels;
  const inflated = inflateSync(Buffer.concat(imageData));
  const previous = new Uint8Array(rowBytes);
  const colors = new Map();
  let maxColorCount = 0;
  let backgroundKey;
  const contentBounds = { left: width, top: height, right: 0, bottom: 0 };
  let offset = 0;
  for (let y = 0; y < height; y += 1) {
    const filter = inflated[offset++];
    const row = Uint8Array.from(inflated.subarray(offset, offset + rowBytes));
    offset += rowBytes;
    for (let i = 0; i < rowBytes; i += 1) {
      const left = i >= channels ? row[i - channels] : 0;
      const above = previous[i];
      const upperLeft = i >= channels ? previous[i - channels] : 0;
      if (filter === 1) row[i] = (row[i] + left) & 255;
      else if (filter === 2) row[i] = (row[i] + above) & 255;
      else if (filter === 3) row[i] = (row[i] + Math.floor((left + above) / 2)) & 255;
      else if (filter === 4) row[i] = (row[i] + paeth(left, above, upperLeft)) & 255;
      else if (filter !== 0) throw new Error(`Unknown PNG filter ${filter} in ${label}`);
    }
    for (let x = 0; x < width; x += 1) {
      const i = x * channels;
      let red;
      let green;
      let blue;
      if (colorType === 0 || colorType === 4) red = green = blue = row[i];
      else if (colorType === 3) {
        const paletteOffset = row[i] * 3;
        red = palette[paletteOffset];
        green = palette[paletteOffset + 1];
        blue = palette[paletteOffset + 2];
      } else [red, green, blue] = row.subarray(i, i + 3);
      const key = (red << 16) | (green << 8) | blue;
      if (backgroundKey === undefined) backgroundKey = key;
      if (key !== backgroundKey) {
        contentBounds.left = Math.min(contentBounds.left, x);
        contentBounds.top = Math.min(contentBounds.top, y);
        contentBounds.right = Math.max(contentBounds.right, x + 1);
        contentBounds.bottom = Math.max(contentBounds.bottom, y + 1);
      }
      const count = (colors.get(key) ?? 0) + 1;
      colors.set(key, count);
      if (count > maxColorCount) maxColorCount = count;
    }
    previous.set(row);
  }
  return { width, height, bytes: png.length, dominantRatio: maxColorCount / (width * height), contentBounds: contentBounds.right > contentBounds.left && contentBounds.bottom > contentBounds.top ? contentBounds : null };
}

async function reportImage(file, storyId) {
  const stats = await inspectPng(path.join(root, 'docs/images', file));
  if (stats.height < 64) throw new Error(`${file} is too short (${stats.height}px)`);
  if (stats.bytes < 2048) throw new Error(`${file} is too small (${stats.bytes} bytes)`);
  if (stats.bytes > 300 * 1024) throw new Error(`${file} exceeds 300 KiB (${stats.bytes} bytes)`);
  if (stats.dominantRatio > 0.97) throw new Error(`${file} is over 97% one color (${(stats.dominantRatio * 100).toFixed(1)}%)`);
  console.log(`${file}: ${stats.width}x${stats.height}, ${stats.bytes} bytes, ${(stats.dominantRatio * 100).toFixed(1)}% dominant color — ${storyId}`);
}

let browser;
try {
  browser = await launchBrowser();
  const page = await browser.newPage({ viewport: { width: 1200, height: 900 }, deviceScaleFactor: 2 });
  const screenshotsDir = path.join(root, 'docs/images');
  const { mkdir } = await import('node:fs/promises');
  await mkdir(screenshotsDir, { recursive: true });

  async function capture(story, file, theme = 'light', component = '') {
    const pageUrl = `${baseUrl}/iframe.html?id=${encodeURIComponent(story.id)}&viewMode=story&globals=theme:${theme}`;
    await page.goto(pageUrl, { waitUntil: 'networkidle' });
    await page.evaluate((dark) => document.documentElement.classList.toggle('dark', dark), theme === 'dark');
    await page.addStyleTag({ content: 'html,body{background:var(--background)!important}body{box-sizing:border-box!important;margin:0!important;padding:24px!important;min-height:0!important}' });
    const storyRoot = page.locator('#storybook-root');
    await storyRoot.waitFor({ state: 'attached' });
    await page.waitForTimeout(350);

    if (['dropdown-menu', 'select', 'dialog', 'date-picker'].includes(component)) {
      const existingDialog = page.locator('[role="dialog"]').first();
      const existingMenu = page.locator('[role="menu"], [role="listbox"]').first();
      if (!await existingDialog.isVisible() && !await existingMenu.isVisible()) {
        const target = component === 'select' ? storyRoot.getByRole('combobox').first() : storyRoot.getByRole('button').first();
        if (await target.count()) await target.click({ timeout: 1500 }).catch(() => {});
        await page.waitForTimeout(250);
      }
    }

    const bounds = await page.evaluate(() => {
      const overlays = '[role="dialog"],[role="menu"],[role="listbox"],[role="alert"],[role="status"],[data-brkta-dialog-overlay],[data-brkta-toast-viewport],[data-brkta-dropdown-menu-content],[data-brkta-date-picker-content],[data-radix-popper-content-wrapper],[data-radix-portal]';
      const nodes = new Set(document.querySelectorAll('#storybook-root *, ' + overlays));
      const visible = [...nodes].filter((element) => {
        if (element.matches('[data-brkta-dialog-overlay], [data-radix-portal]')) return false;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== 'none' && style.visibility !== 'hidden' && Number(style.opacity) > 0 && rect.width > 0 && rect.height > 0;
      });
      if (!visible.length) {
        const root = document.querySelector('#storybook-root');
        if (root) visible.push(root);
      }
      if (!visible.length) return null;
      const rects = visible.map((element) => element.getBoundingClientRect());
      return {
        left: Math.min(...rects.map((rect) => rect.left)),
        top: Math.min(...rects.map((rect) => rect.top)),
        right: Math.max(...rects.map((rect) => rect.right)),
        bottom: Math.max(...rects.map((rect) => rect.bottom)),
      };
    });
    if (!bounds) throw new Error(`No visible content found for ${story.title}/${story.name}`);

    const x = Math.max(0, Math.floor(bounds.left - 24));
    const y = Math.max(0, Math.floor(bounds.top - 24));
    const clip = { x, y, width: Math.ceil(bounds.right - x + 24), height: Math.ceil(bounds.bottom - y + 24) };
    const raw = await page.screenshot({ clip, animations: 'disabled' });
    const rawStats = await inspectPng(raw);
    if (!rawStats.contentBounds) throw new Error(`${file} contains no visible pixels beyond its background.`);
    const scaleX = rawStats.width / clip.width;
    const scaleY = rawStats.height / clip.height;
    const left = Math.max(0, Math.floor(clip.x + rawStats.contentBounds.left / scaleX - 24));
    const top = Math.max(0, Math.floor(clip.y + rawStats.contentBounds.top / scaleY - 24));
    const right = Math.ceil(clip.x + rawStats.contentBounds.right / scaleX + 24);
    const bottom = Math.ceil(clip.y + rawStats.contentBounds.bottom / scaleY + 24);
    await page.screenshot({ path: path.join(screenshotsDir, file), clip: { x: left, y: top, width: right - left, height: bottom - top }, animations: 'disabled' });
    await reportImage(file, story.id);
  }

  async function captureVariantShowcase(component, variantOrder, theme, file) {
    const matching = entries.filter((entry) => normalize(entry.title.split('/').at(-1)) === normalize(component));
    const variants = variantOrder.map((name) => matching.find((entry) => normalize(entry.name) === normalize(name))).filter(Boolean);
    if (variants.length < 3) return capture(storyFor(component), file, theme, component);
    const frames = variants.map((entry) => {
      const url = `${baseUrl}/iframe.html?id=${encodeURIComponent(entry.id)}&viewMode=story&globals=theme:${theme}`;
      return `<article><iframe title="${entry.name} ${component}" src="${url}"></iframe><p>${entry.name}</p></article>`;
    }).join('');
    await page.goto(`${baseUrl}/iframe.html?id=${encodeURIComponent(variants[0].id)}&viewMode=story`, { waitUntil: 'networkidle' });
    await page.setContent(`<!doctype html><html><head><link rel="stylesheet" href="${baseUrl}/__theme.css"><style>html,body{background:var(--background)!important}body{margin:0;padding:24px;font-family:var(--font-sans)}.showcase-grid{display:grid;grid-template-columns:repeat(${variants.length},minmax(0,1fr));gap:16px}article{min-height:${component === 'input' ? 140 : 108}px;padding:16px;border:1px solid var(--border);border-radius:var(--radius-lg);background:var(--card);display:flex;flex-direction:column;justify-content:center;gap:8px}iframe{width:100%;height:${component === 'input' ? 88 : 56}px;border:0;background:transparent}p{margin:0;color:var(--muted-foreground);font-size:var(--font-size-sm)}</style></head><body><div class="showcase-grid">${frames}</div></body></html>`);
    await page.evaluate((dark) => document.documentElement.classList.toggle('dark', dark), theme === 'dark');
    const childFrames = page.frames().filter((frame) => frame !== page.mainFrame() && frame.url().includes('/iframe.html?id='));
    for (const frame of childFrames) {
      await frame.locator('#storybook-root').waitFor({ state: 'attached' });
      await frame.addStyleTag({ content: 'html,body{background:var(--background)!important}body{margin:0!important;padding:16px!important}' });
      await frame.evaluate((dark) => document.documentElement.classList.toggle('dark', dark), theme === 'dark');
    }
    await page.waitForTimeout(250);
    const grid = await page.locator('.showcase-grid').boundingBox();
    if (!grid) throw new Error(`${component} variants showcase is empty.`);
    const clip = { x: Math.max(0, Math.floor(grid.x - 24)), y: Math.max(0, Math.floor(grid.y - 24)), width: Math.ceil(grid.width + 48), height: Math.ceil(grid.height + 48) };
    await page.screenshot({ path: path.join(screenshotsDir, file), clip, animations: 'disabled' });
    await reportImage(file, variants.map((entry) => entry.id).join(','));
  }

  const hero = entries.find((entry) => /foundations\/cream across themes/i.test(entry.title) && /^(overview|cream across themes)$/i.test(entry.name));
  if (!hero) throw new Error('No suitable foundations overview story found in Storybook index.json.');
  await capture(hero, 'hero.png');
  for (const [component, filename] of componentFiles) {
    if (component === 'badge') await captureVariantShowcase('badge', ['default', 'secondary', 'destructive', 'outline'], 'light', `${filename}.png`);
    else if (component === 'input') await captureVariantShowcase('input', ['default', 'filled', 'ghost', 'invalid'], 'light', `${filename}.png`);
    else await capture(storyFor(component), `${filename}.png`, 'light', component);
  }
  for (const component of ['button', 'card', 'input', 'badge']) {
    if (component === 'badge') await captureVariantShowcase('badge', ['default', 'secondary', 'destructive', 'outline'], 'dark', `${component}-dark.png`);
    else if (component === 'input') await captureVariantShowcase('input', ['default', 'filled', 'ghost', 'invalid'], 'dark', `${component}-dark.png`);
    else await capture(storyFor(component), `${component}-dark.png`, 'dark', component);
  }
} finally {
  await browser?.close();
  await new Promise((resolve) => server.close(resolve));
}
