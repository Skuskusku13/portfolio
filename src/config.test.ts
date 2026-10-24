import { describe, expect, it, vi } from 'vitest';

/** config.ts fige l'URL à l'import : chaque cas recharge le module avec son environnement. */
async function loadMailerUrl(value: string | undefined, dev: boolean): Promise<string | null> {
  vi.resetModules();
  vi.stubEnv('DEV', dev);
  if (value === undefined) vi.stubEnv('VITE_MAILER_URL', undefined);
  else vi.stubEnv('VITE_MAILER_URL', value);
  const { MAILER_URL } = await import('./config');
  return MAILER_URL;
}

describe('MAILER_URL', () => {
  it('accepte une URL https', async () => {
    expect(await loadMailerUrl('https://back.exemple.fr/api/contact', false)).toBe('https://back.exemple.fr/api/contact');
  });

  it('refuse http en production mais le tolère en développement', async () => {
    expect(await loadMailerUrl('http://127.0.0.1:3000/contact', false)).toBeNull();
    expect(await loadMailerUrl('http://127.0.0.1:3000/contact', true)).toBe('http://127.0.0.1:3000/contact');
  });

  it('vaut null quand la variable est absente, vide ou invalide', async () => {
    expect(await loadMailerUrl(undefined, false)).toBeNull();
    expect(await loadMailerUrl('   ', false)).toBeNull();
    expect(await loadMailerUrl('pas une url', false)).toBeNull();
    expect(await loadMailerUrl('javascript:alert(1)', false)).toBeNull();
  });
});
