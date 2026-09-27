import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { scaffold } from '../plugins/showcase-director/skills/showcase-director/scripts/scaffold.mjs';
import { readFeedback } from '../plugins/showcase-director/skills/showcase-director/scripts/feedback.mjs';
import { validateEvidence } from '../plugins/showcase-director/skills/showcase-director/scripts/evidence.mjs';

const temp = () => mkdtempSync(join(tmpdir(), 'showcase-director-test-'));
test('both aspects scaffold locally and refuse destructive overwrite', () => {
  for (const aspect of ['landscape', 'portrait']) {
    const dest = join(temp(), 'test-film');
    const result = scaffold(dest, aspect);
    assert.equal(result.width, aspect === 'portrait' ? 1080 : 1920);
    const html = readFileSync(join(dest, 'index.html'), 'utf8');
    assert.ok(!/__WIDTH__|__HEIGHT__|__ID__/.test(html));
    assert.ok(html.includes(`width:${result.width}px`));
    const before = readFileSync(join(dest, 'BRIEF.md'), 'utf8');
    assert.throws(() => scaffold(dest, aspect), /already exists/);
    assert.equal(readFileSync(join(dest, 'BRIEF.md'), 'utf8'), before);
    assert.equal(readFeedback(dest).status, 'none');
  }
  assert.throws(() => scaffold(join(temp(), 'bad'), 'square'), /Aspect/);
});
test('native comments preserve zero-based frame and reject escape or malformed input', () => {
  const root = temp();
  mkdirSync(join(root, '.hyperframes'));
  const file = join(root, '.hyperframes/frame-comments.json');
  const data = { version: 1, pass: 'sketch', submitted_at: '2026-09-27', comments: [{frame:0,src:'compositions/01.html',text:'Keep the same camera scale.'}] };
  writeFileSync(file, JSON.stringify(data));
  const result = readFeedback(root);
  assert.equal(result.comments[0].frame, 0);
  assert.equal(result.hash.length, 64);
  for (const src of ['../outside.html','C:\\outside.html','/outside.html','..\\outside.html']) {
    data.comments[0].src = src; writeFileSync(file, JSON.stringify(data));
    assert.throws(() => readFeedback(root));
  }
  writeFileSync(file, 'broken json');
  assert.throws(() => readFeedback(root));
});
test('evidence refuses empty and unqualified claims without pretending to fact-check', () => {
  assert.equal(validateEvidence({ version: 1, claims: [] }).ok, false);
  const claim = { id:'demo', claim:'Example workflow', source:'local fixture', observed:'2026-09-27', level:'sample', permittedWording:'Sample workflow' };
  assert.equal(validateEvidence({ version:1, claims:[claim] }).ok, false);
  claim.visibleQualification = 'Illustrative demo';
  assert.equal(validateEvidence({ version:1, claims:[claim] }).ok, true);
  assert.equal(validateEvidence({ version:1, claims:[claim,claim] }).ok, false);
});
test('marketplace, manifest and skill agree', () => {
  const root = new URL('../', import.meta.url);
  const manifest = JSON.parse(readFileSync(new URL('plugins/showcase-director/.codex-plugin/plugin.json', root)));
  const market = JSON.parse(readFileSync(new URL('.agents/plugins/marketplace.json', root)));
  assert.equal(manifest.name, 'showcase-director');
  assert.equal(manifest.license, 'MIT');
  assert.equal(market.plugins[0].name, manifest.name);
  assert.equal(market.plugins[0].source.path, './plugins/showcase-director');
  assert.match(readFileSync(new URL('plugins/showcase-director/skills/showcase-director/SKILL.md', root),'utf8'), /name: showcase-director/);
});
