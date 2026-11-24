// Unit checks for the build-time HTP endpoint validator. Run: bun scripts/htp-endpoint.test.mjs
import assert from 'node:assert/strict';
import { validateHtpEndpoint } from '../src/lib/htp-endpoint.mjs';

const id = '0f8fad5b-d9cb-469f-a165-8c967dc3d8a1';
const good = `https://www.kerryhatcher.com/public/forms/${id}`;

assert.equal(validateHtpEndpoint(good), good);
assert.equal(validateHtpEndpoint(`https://forms.example.invalid/public/forms/${id.toUpperCase()}`), `https://forms.example.invalid/public/forms/${id.toUpperCase()}`);

const rejected = [
  '',
  'not a url',
  `http://www.kerryhatcher.com/public/forms/${id}`,
  `https://user@www.kerryhatcher.com/public/forms/${id}`,
  `https://www.kerryhatcher.com:8443/public/forms/${id}`,
  `${good}?x=1`,
  `${good}#frag`,
  `https://www.kerryhatcher.com/public/forms/${id}/`,
  'https://www.kerryhatcher.com/public/forms/not-a-uuid',
  'https://www.kerryhatcher.com/api/forms/' + id,
  `https://abcdefgh.supabase.co/functions/v1/form-submit/${id}`,
  `https://abcdefgh.supabase.co/public/forms/${id}`,
  `https://www.kerryhatcher.com/public/forms/${id}/../x`,
];
for (const value of rejected) {
  assert.throws(() => validateHtpEndpoint(value), /Invalid PUBLIC_HTP_FORM_ENDPOINT/, `should reject ${value}`);
}
console.log(`htp-endpoint: ${rejected.length} rejected, 2 accepted`);
