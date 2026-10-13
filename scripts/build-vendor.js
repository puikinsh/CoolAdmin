#!/usr/bin/env node
import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { minify } from 'terser';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'node_modules/fullcalendar');
const { version } = JSON.parse(await fs.readFile(path.join(source, 'package.json'), 'utf8'));
const target = path.join(root, `vendor/fullcalendar-${version}`);
const files = [
  ['all/global.js', 'fullcalendar.global.min.js'],
  ['themes/classic/global.js', 'themes/classic/theme.global.min.js'],
  ['skeleton.css', 'skeleton.css'],
  ['themes/classic/theme.css', 'themes/classic/theme.css'],
  ['themes/classic/palette.css', 'themes/classic/palette.css'],
  ['LICENSE.md', 'LICENSE.md'],
];

for (const [from, to] of files) {
  let content = await fs.readFile(path.join(source, from), 'utf8');
  if (from.endsWith('.js')) {
    const result = await minify(content, { format: { comments: /^!/ } });
    content = result.code + '\n';
  }
  const destination = path.join(target, to);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  const previous = await fs.readFile(destination, 'utf8').catch(err => {
    if (err.code !== 'ENOENT') throw err;
    return null;
  });
  if (content !== previous) await fs.writeFile(destination, content);
}

console.log(`FullCalendar ${version}: copied styles/license and minified both scripts`);
