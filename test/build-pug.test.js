import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';
import { buildPages, watchPages } from '../scripts/build-pug.js';

async function fixture(t) {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'cooladmin-pug-'));
  const pages = path.join(root, 'src/pug/pages');
  const partials = path.join(root, 'src/pug/partials');
  await fs.mkdir(pages, { recursive: true });
  await fs.mkdir(partials);
  await fs.writeFile(path.join(partials, 'message.html'), '<p>Original</p>');
  await fs.writeFile(path.join(pages, 'index.pug'), 'include ../partials/message.html\n');
  await fs.writeFile(path.join(pages, 'other.pug'), 'p Unchanged\n');
  t.after(() => fs.rm(root, { recursive: true, force: true }));
  return { root, pages, partials };
}

async function waitFor(check) {
  const deadline = Date.now() + 6000;
  while (Date.now() < deadline) {
    if (await check()) return;
    await delay(50);
  }
  assert.fail('Timed out waiting for the template watcher');
}

test('build preserves unchanged output timestamps and reports template errors', async (t) => {
  const { root, pages } = await fixture(t);
  const options = { root, log: () => {} };
  assert.deepEqual(await buildPages(options), { written: 2, errors: 0 });
  const output = path.join(root, 'index.html');
  const before = (await fs.stat(output)).mtimeMs;
  await delay(20);
  assert.deepEqual(await buildPages(options), { written: 0, errors: 0 });
  assert.equal((await fs.stat(output)).mtimeMs, before);
  await fs.writeFile(path.join(pages, 'broken.pug'), 'include missing.pug\n');
  assert.deepEqual(await buildPages(options), { written: 0, errors: 1 });
  assert.equal(await fs.readFile(output, 'utf8'), '<p>Original</p>');
});

test('watch rebuilds includes, detects new pages, and recovers after deletion errors', async (t) => {
  const { root, pages, partials } = await fixture(t);
  const logs = [];
  const watcher = await watchPages({ root, log: message => logs.push(message) });
  t.after(() => watcher.close());
  const output = path.join(root, 'index.html');
  const untouched = (await fs.stat(path.join(root, 'other.html'))).mtimeMs;
  const include = path.join(partials, 'message.html');
  await fs.writeFile(include, '<p>Updated</p>');
  await waitFor(async () => (await fs.readFile(output, 'utf8')) === '<p>Updated</p>');
  assert.equal((await fs.stat(path.join(root, 'other.html'))).mtimeMs, untouched);

  await fs.writeFile(path.join(pages, 'new-page.pug'), 'p New page\n');
  await waitFor(async () => fs.access(path.join(root, 'new-page.html')).then(() => true, () => false));
  await fs.unlink(include);
  await waitFor(() => logs.some(message => message.includes('1 errors')));
  assert.equal(await fs.readFile(output, 'utf8'), '<p>Updated</p>');
  await fs.writeFile(include, '<p>Recovered</p>');
  await waitFor(async () => (await fs.readFile(output, 'utf8')) === '<p>Recovered</p>');
});
