import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { resolve, relative, isAbsolute, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

function inside(root, file) {
  const rel = relative(root, file);
  return rel !== '..' && !rel.startsWith(`..${sep}`) && !isAbsolute(rel);
}
export function readFeedback(project) {
  const root = realpathSync(resolve(project));
  const file = resolve(root, '.hyperframes/frame-comments.json');
  if (!existsSync(file)) return { status: 'none', comments: [] };
  if (!inside(root, realpathSync(file))) throw new Error('Feedback file resolves outside the project.');
  const raw = readFileSync(file, 'utf8');
  const data = JSON.parse(raw.replace(/^\uFEFF/, ''));
  if (data.version !== 1 || !['storyboard', 'sketch', 'final'].includes(data.pass) || !Array.isArray(data.comments)) throw new Error('Invalid native feedback format.');
  const seen = new Set();
  for (const item of data.comments) {
    if (!Number.isInteger(item.frame) || item.frame < 0 || typeof item.text !== 'string' || !item.text.trim()) throw new Error('Invalid frame comment.');
    if (seen.has(item.frame)) throw new Error('Duplicate frame index.');
    seen.add(item.frame);
    if (item.src !== undefined) {
      if (typeof item.src !== 'string' || isAbsolute(item.src) || /^[a-zA-Z]:|^\\|^\//.test(item.src) || item.src.includes('\\')) throw new Error('Frame source must be a relative forward-slash path.');
      const source = resolve(root, item.src);
      if (!inside(root, source) || (existsSync(source) && !inside(root, realpathSync(source)))) throw new Error('Frame source escapes the project.');
    }
  }
  return { status: data.comments.length ? 'saved' : 'none', hash: createHash('sha256').update(raw).digest('hex'), ...data };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (!process.argv[2]) throw new Error('Usage: node feedback.mjs <project>');
    console.log(JSON.stringify(readFeedback(process.argv[2]), null, 2));
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
