import { mkdirSync, copyFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
mkdirSync(join(root, 'assets'), { recursive: true });
copyFileSync(require.resolve('gsap/dist/gsap.min.js'), join(root, 'assets/gsap.min.js'));
