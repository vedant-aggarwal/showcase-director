import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

export function validateEvidence(data) {
  const errors = [], qualifications = [], seen = new Set();
  if (data.version !== 1 || !Array.isArray(data.claims)) return { ok: false, errors: ['Expected version 1 and claims array.'], qualifications };
  if (!data.claims.length) errors.push('No product evidence recorded.');
  for (const claim of data.claims) {
    if (!claim || typeof claim !== 'object') { errors.push('Invalid claim record.'); continue; }
    for (const key of ['id', 'claim', 'source', 'observed', 'level', 'permittedWording']) {
      if (typeof claim[key] !== 'string' || !claim[key].trim()) errors.push(`Missing ${key} on ${claim.id || 'claim'}.`);
    }
    if (seen.has(claim.id)) errors.push(`Duplicate evidence id: ${claim.id}.`);
    seen.add(claim.id);
    if (!['live', 'source', 'sample', 'planned', 'unverified'].includes(claim.level)) errors.push(`Unknown level: ${claim.level}.`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(claim.observed || '') || Number.isNaN(Date.parse(claim.observed))) errors.push(`Invalid observation date: ${claim.id}.`);
    if (['sample', 'planned', 'unverified'].includes(claim.level)) {
      qualifications.push({ id: claim.id, level: claim.level, wording: claim.permittedWording });
      if (typeof claim.visibleQualification !== 'string' || !claim.visibleQualification.trim()) errors.push(`Visible qualification required: ${claim.id}.`);
    }
  }
  return { ok: errors.length === 0, errors, qualifications, note: 'Schema validation only; sources and on-screen claims still require human or agent review.' };
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    if (!process.argv[2]) throw new Error('Usage: node evidence.mjs <project>');
    const data = JSON.parse(readFileSync(resolve(process.argv[2], 'EVIDENCE.json'), 'utf8').replace(/^\uFEFF/, ''));
    const result = validateEvidence(data);
    console.log(JSON.stringify(result, null, 2));
    if (!result.ok) process.exitCode = 1;
  } catch (error) { console.error(error.message); process.exitCode = 1; }
}
