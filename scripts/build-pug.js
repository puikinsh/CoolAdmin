#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import { once } from 'node:events';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pug from 'pug';
import chokidar from 'chokidar';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export async function buildPages({ root = repoRoot, log = console.log } = {}) {
  const pugRoot = path.join(root, 'src/pug');
  const pagesDir = path.join(pugRoot, 'pages');
  const files = (await fs.readdir(pagesDir)).filter(f => f.endsWith('.pug')).sort();
  const result = { written: 0, errors: 0 };

  for (const file of files) {
    const pugPath = path.join(pagesDir, file);
    const htmlPath = path.join(root, file.replace(/\.pug$/, '.html'));
    try {
      const html = pug.renderFile(pugPath, { pretty: true, basedir: pugRoot }).trimStart();
      const previous = await fs.readFile(htmlPath, 'utf8').catch(err => {
        if (err.code !== 'ENOENT') throw err;
        return null;
      });
      // Preserve timestamps and avoid unnecessary Vite reloads for unchanged pages.
      if (html !== previous) {
        await fs.writeFile(htmlPath, html, 'utf8');
        result.written++;
      }
    } catch (err) {
      result.errors++;
      log(`✗ ${file} — ${err.message}`);
    }
  }

  log(`Pug: ${files.length} pages, ${result.written} written, ${result.errors} errors`);
  return result;
}

export async function watchPages(options = {}) {
  const { root = repoRoot, log = console.log } = options;
  const watcher = chokidar.watch(path.join(root, 'src/pug'), {
    ignoreInitial: true,
    // Chokidar 4+ accepts directory paths, not glob patterns.
    ignored: (file, stats) => stats?.isFile() && !/\.(pug|html)$/.test(file),
  });
  let timer;
  let running = false;
  let pending = false;

  const rebuild = async () => {
    if (running) return;
    running = true;
    try {
      while (pending) {
        pending = false;
        await buildPages({ root, log });
      }
    } catch (err) {
      log(`Pug build failed — ${err.message}`);
    } finally {
      running = false;
    }
  };

  watcher.on('all', (event, file) => {
    if (!['add', 'change', 'unlink'].includes(event) || !/\.(pug|html)$/.test(file)) return;
    pending = true;
    clearTimeout(timer);
    timer = setTimeout(rebuild, 80);
  });
  watcher.on('error', err => log(`Pug watcher failed — ${err.message}`));
  const close = watcher.close.bind(watcher);
  watcher.close = async () => {
    clearTimeout(timer);
    pending = false;
    await close();
  };
  await once(watcher, 'ready');
  pending = true;
  await rebuild();
  log('Watching src/pug/ for changes…');
  return watcher;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--watch')) {
    const watcher = await watchPages();
    const stop = async () => {
      await watcher.close();
      process.exit(0);
    };
    process.once('SIGINT', stop);
    process.once('SIGTERM', stop);
  } else {
    const result = await buildPages();
    if (result.errors) process.exitCode = 1;
  }
}
