import test from 'node:test';
import assert from 'node:assert/strict';
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pages = (await fs.readdir(path.join(root, 'src/pug/pages')))
  .filter(file => file.endsWith('.pug')).map(file => file.replace(/\.pug$/, '.html'));

test('every generated page references existing local assets and destinations', async () => {
  const missing = [];
  const styles = new Set();
  async function check(url, source) {
    if (!url || url.startsWith('#') || /^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(url)) return;
    const file = path.resolve(path.dirname(source), decodeURIComponent(url.split(/[?#]/)[0]));
    try {
      await fs.access(file);
      if (file.endsWith('.css')) styles.add(file);
    } catch {
      missing.push(`${path.relative(root, source)} → ${url}`);
    }
  }
  for (const page of pages) {
    const source = path.join(root, page);
    // Inline scripts may contain template literals with runtime-generated URLs.
    const html = (await fs.readFile(source, 'utf8'))
      .replace(/(<script\b[^>]*>)[\s\S]*?<\/script>/gi, '$1</script>');
    for (const [tag] of html.matchAll(/<(?:a|script|link|img|source)\b[^>]*>/gi)) {
      for (const [, url] of tag.matchAll(/\b(?:href|src)=["']([^"']*)["']/gi)) {
        await check(url, source);
      }
    }
  }
  for (const source of styles) {
    const css = await fs.readFile(source, 'utf8');
    for (const [, url] of css.matchAll(/url\(["']?([^\s)'"]+)["']?\)/g)) {
      await check(url, source);
    }
  }
  assert.deepEqual(missing, []);
});

test('Chart.js is included exactly where chart canvases are rendered', async () => {
  for (const page of pages) {
    const html = await fs.readFile(path.join(root, page), 'utf8');
    assert.equal(html.includes('vendor/chartjs/'), /<canvas\b/i.test(html), page);
  }
});

test('the calendar references the installed FullCalendar distribution', async () => {
  const { version } = JSON.parse(await fs.readFile(path.join(root, 'node_modules/fullcalendar/package.json'), 'utf8'));
  const html = await fs.readFile(path.join(root, 'calendar.html'), 'utf8');
  assert.ok(html.includes(`vendor/fullcalendar-${version}/fullcalendar.global.min.js`));
  const bundle = await fs.readFile(path.join(root, `vendor/fullcalendar-${version}/fullcalendar.global.min.js`), 'utf8');
  assert.ok(bundle.includes(`v${version}`));
  assert.ok(bundle.length < 500000, 'Ship the minified calendar bundle');
});
