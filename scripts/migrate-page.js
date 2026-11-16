#!/usr/bin/env node
//
// Migrate a hand-written HTML page to the Pug pipeline.
//
// Detects layout (default / auth / error), extracts the inner content into
// src/pug/partials/content/<page>.html, extracts any trailing inline <script>
// block into src/pug/partials/content/<page>.scripts.html, then generates
// src/pug/pages/<page>.pug. Run via:
//
//   node scripts/migrate-page.js <name> [<name>...]
//
// `<name>` is the basename without `.html` (e.g. `chart`, `404`, `register`).
//
// After migration run `npm run build:pug` to regenerate the root HTML.

import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');

function detectLayout(html) {
  if (html.includes('class="app auth-page"')) return 'auth';
  if (html.includes('class="app error-page"')) return 'error';
  return 'default';
}

function extractMeta(html) {
  const titleMatch = html.match(/<title>([^<]+)<\/title>/);
  const descMatch = html.match(/<meta\s+name="description"\s+content="([^"]+)"/);
  const noindex = /<meta\s+name="robots"\s+content="noindex/.test(html);

  let title = titleMatch ? titleMatch[1].trim() : 'Page';
  // Strip " | CoolAdmin ..." suffix
  title = title.replace(/\s*\|\s*CoolAdmin.*$/, '').trim();
  return {
    title,
    description: descMatch ? descMatch[1] : '',
    noindex
  };
}

function detectVendor(html) {
  return {
    chartjs: /vendor\/chartjs\/chart\.umd\.js-4\.5\.1\.min\.js/.test(html),
    fullcalendar: /vendor\/fullcalendar-6\.1\.20\/fullcalendar\.min\.js/.test(html),
    leafletJs: /unpkg\.com\/leaflet@1\.9\.4\/dist\/leaflet\.js/.test(html),
    leafletCss: /unpkg\.com\/leaflet@1\.9\.4\/dist\/leaflet\.css/.test(html)
  };
}

function extractInlineScript(html) {
  // Find every <script>…</script> block, return the LAST one whose opening
  // tag has no `src=` attribute.
  const re = /<script\b([^>]*)>([\s\S]*?)<\/script>/g;
  let last = null;
  let m;
  while ((m = re.exec(html)) !== null) {
    if (!/\bsrc\s*=/.test(m[1])) {
      last = m[0];
    }
  }
  return last;
}

function extractDefaultContent(html) {
  // Find the main-content wrapper. Prefer the standard <main id="main-content">,
  // fall back to a <div class="main-content"> (used by older pages like
  // fontawesome.html). Some pages (index2/3/4) are missing the </main> closing
  // tag entirely, so we don't rely on it — instead we brace-count <div>s from
  // the container-fluid's opening tag until its matching close.
  let mainIdx = html.search(/<(?:main|div)\b[^>]*\bid="main-content"/);
  if (mainIdx < 0) {
    mainIdx = html.search(/<div\b[^>]*\bclass="[^"]*\bmain-content\b/);
  }
  if (mainIdx < 0) throw new Error('no main-content container found');

  const cfTag = '<div class="container-fluid">';
  const cfStart = html.indexOf(cfTag, mainIdx);
  if (cfStart < 0) throw new Error('no <div class="container-fluid"> inside main');
  const contentStart = cfStart + cfTag.length;

  // Brace-count <div> opens vs </div> closes starting at depth 1 (we're
  // already inside container-fluid). When depth drops back to 0 we've found
  // the matching </div>.
  let depth = 1;
  let pos = contentStart;
  const divOpenRe = /<div\b/g;
  const divCloseRe = /<\/div>/g;
  while (depth > 0) {
    divOpenRe.lastIndex = pos;
    divCloseRe.lastIndex = pos;
    const openMatch = divOpenRe.exec(html);
    const closeMatch = divCloseRe.exec(html);
    if (!closeMatch) throw new Error('container-fluid never closes');
    if (openMatch && openMatch.index < closeMatch.index) {
      depth++;
      pos = openMatch.index + openMatch[0].length;
    } else {
      depth--;
      if (depth === 0) {
        const closeIdx = closeMatch.index;
        const lineStart = html.lastIndexOf('\n', closeIdx) + 1;
        return html.substring(contentStart, lineStart).replace(/^\s*\n/, '').trimEnd();
      }
      pos = closeMatch.index + closeMatch[0].length;
    }
  }
  throw new Error('unreachable');
}

function extractAuthContent(html) {
  const startTag = '<div class="login-content">';
  const startIdx = html.indexOf(startTag);
  if (startIdx < 0) throw new Error('no <div class="login-content"> found');
  const contentStart = startIdx + startTag.length;
  const mainEnd = html.indexOf('</main>', contentStart);
  if (mainEnd < 0) throw new Error('no </main> after login-content');
  const beforeMain = html.substring(0, mainEnd);
  const lastDiv = beforeMain.lastIndexOf('</div>');
  if (lastDiv < 0) throw new Error('no </div> before </main>');
  const lineStart = html.lastIndexOf('\n', lastDiv) + 1;
  return html.substring(contentStart, lineStart).replace(/^\s*\n/, '').trimEnd();
}

function extractErrorContent(html) {
  const mainMatch = html.match(/<main\b[^>]*class="error-card"[^>]*>/);
  if (!mainMatch) throw new Error('no <main class="error-card"> found');
  const startIdx = mainMatch.index + mainMatch[0].length;
  const mainEnd = html.indexOf('</main>', startIdx);
  if (mainEnd < 0) throw new Error('no </main>');
  // Strip newlines bracketing the content for neatness.
  return html.substring(startIdx, mainEnd).replace(/^\s*\n/, '').trimEnd();
}

function detectAuthSkipText(name, html) {
  const m = html.match(/<a class="visually-hidden-focusable skip-link"\s+href="#auth-form">([^<]+)<\/a>/);
  return m ? m[1].trim() : null;
}

async function migratePage(name) {
  const htmlPath = path.join(repoRoot, `${name}.html`);
  const html = await fs.readFile(htmlPath, 'utf8');

  const layout = detectLayout(html);
  const meta = extractMeta(html);
  const vendor = detectVendor(html);
  const inlineScript = extractInlineScript(html);

  let content;
  if (layout === 'default') content = extractDefaultContent(html);
  else if (layout === 'auth') content = extractAuthContent(html);
  else if (layout === 'error') content = extractErrorContent(html);

  // Write inner-content partial.
  const contentDir = path.join(repoRoot, 'src/pug/partials/content');
  await fs.mkdir(contentDir, { recursive: true });
  await fs.writeFile(path.join(contentDir, `${name}.html`), content + '\n', 'utf8');

  // Write inline-script partial if present.
  let hasInlineScript = false;
  if (inlineScript) {
    await fs.writeFile(
      path.join(contentDir, `${name}.scripts.html`),
      inlineScript + '\n',
      'utf8'
    );
    hasInlineScript = true;
  }

  // Build the page .pug file.
  const lines = [];
  lines.push(`extends ../layouts/_${layout}`);
  lines.push('');
  lines.push('block variables');

  const metaObj = {
    title: meta.title,
    description: meta.description
  };
  if (meta.noindex) metaObj.noindex = true;
  const metaJson = JSON.stringify(metaObj)
    .replace(/^\{/, '{ ')
    .replace(/\}$/, ' }')
    .replace(/","/g, '", "')
    .replace(/":/g, '": ');
  lines.push(`  - var pageMeta = ${metaJson}`);

  if (layout === 'default') {
    lines.push(`  - var activePage = '${name}.html'`);
  } else if (layout === 'auth' || layout === 'error') {
    // The page's `block variables` REPLACES the layout's defaults wholesale,
    // so we must emit bodyClass explicitly here.
    const bodyMatch = html.match(/<body\s+class="([^"]+)"/);
    const defaultClass = layout === 'auth' ? 'app auth-page' : 'app error-page';
    lines.push(`  - var bodyClass = '${bodyMatch ? bodyMatch[1] : defaultClass}'`);
    if (layout === 'auth') {
      const skipText = detectAuthSkipText(name, html);
      if (skipText) lines.push(`  - var skipLinkText = '${skipText.replace(/'/g, "\\'")}'`);
    }
  }

  lines.push('');
  lines.push('block content');
  lines.push(`  include ../partials/content/${name}.html`);

  if (vendor.leafletCss) {
    lines.push('');
    lines.push('block extra_head');
    lines.push(`  link(rel='stylesheet' href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css' integrity='sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=' crossorigin='')`);
  }

  if (vendor.chartjs || vendor.fullcalendar || vendor.leafletJs) {
    lines.push('');
    lines.push('block vendor_scripts');
    if (vendor.chartjs) lines.push(`  script(src='vendor/chartjs/chart.umd.js-4.6.1.min.js')`);
    if (vendor.fullcalendar) lines.push(`  script(src='vendor/fullcalendar-6.1.20/fullcalendar.min.js')`);
    if (vendor.leafletJs) lines.push(`  script(src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js' integrity='sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=' crossorigin='')`);
  }

  if (hasInlineScript) {
    lines.push('');
    lines.push('block extra_scripts');
    lines.push(`  include ../partials/content/${name}.scripts.html`);
  }

  lines.push('');

  const pugPath = path.join(repoRoot, 'src/pug/pages', `${name}.pug`);
  await fs.writeFile(pugPath, lines.join('\n'), 'utf8');

  const tags = [layout];
  if (vendor.chartjs) tags.push('chartjs');
  if (vendor.fullcalendar) tags.push('fullcalendar');
  if (vendor.leafletJs) tags.push('leaflet');
  if (hasInlineScript) tags.push('inline-script');
  console.log(`\x1b[32m✓\x1b[0m ${name}.html  (${tags.join(', ')})`);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  console.error('Usage: node scripts/migrate-page.js <name> [<name>...]');
  process.exit(1);
}

let failed = 0;
for (const name of args) {
  try {
    await migratePage(name);
  } catch (err) {
    console.error(`\x1b[31m✗\x1b[0m ${name}.html  ${err.message}`);
    failed++;
  }
}
if (failed > 0) process.exit(1);
