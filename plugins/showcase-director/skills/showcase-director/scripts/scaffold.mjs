import { existsSync, mkdirSync, cpSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve, dirname, basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export function scaffold(destination, aspect = 'landscape') {
  if (!destination) throw new Error('A destination is required.');
  if (!['landscape', 'portrait'].includes(aspect)) throw new Error('Aspect must be landscape or portrait.');
  const target = resolve(destination);
  if (existsSync(target)) throw new Error('Destination already exists; no files changed.');
  const id = basename(target).toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-');
  if (!/^[a-z0-9][a-z0-9-]*$/.test(id)) throw new Error('Use a descriptive destination folder name.');
  const template = resolve(dirname(fileURLToPath(import.meta.url)), '../assets/starter');
  const [width, height] = aspect === 'portrait' ? [1080, 1920] : [1920, 1080];
  mkdirSync(dirname(target), { recursive: true });
  cpSync(template, target, { recursive: true, errorOnExist: true, force: false });
  for (const file of ['index.html', 'package.json', 'STORYBOARD.md']) {
    const path = join(target, file);
    const content = readFileSync(path, 'utf8').replaceAll('__ID__', id)
      .replaceAll('__WIDTH__', String(width)).replaceAll('__HEIGHT__', String(height));
    writeFileSync(path, content);
  }
  for (const folder of ['assets', 'compositions', 'references', 'renders']) mkdirSync(join(target, folder), { recursive: true });
  return { project: target, width, height, status: 'placeholder', next: 'Fill brief and evidence, then install dependencies.' };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const [destination, flag, aspect, ...extra] = process.argv.slice(2);
    if ((flag && flag !== '--aspect') || (flag && !aspect) || extra.length) throw new Error('Usage: node scaffold.mjs <destination> [--aspect landscape|portrait]');
    console.log(JSON.stringify(scaffold(destination, aspect), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
