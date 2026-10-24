/** Un seul schéma accepté en production ; http toléré en développement local. */
const ALLOWED_PROTOCOLS: readonly string[] = import.meta.env.DEV ? ['https:', 'http:'] : ['https:'];

function parseMailerUrl(value: unknown): string | null {
  if (typeof value !== 'string' || value.trim() === '') return null;
  try {
    return ALLOWED_PROTOCOLS.includes(new URL(value).protocol) ? value : null;
  } catch {
    return null;
  }
}

/**
 * URL de l'API de contact (`VITE_MAILER_URL`), ou `null` si elle est absente ou invalide.
 * Le formulaire propose alors l'adresse email directement, sans jamais poster vers `/undefined`.
 */
export const MAILER_URL: string | null = parseMailerUrl(import.meta.env.VITE_MAILER_URL);

/** Canaux publics de contact, utilisés par le hero, la section Contact et le pied de page. */
export const EMAIL = 'danlevy149@gmail.com';
export const GITHUB_URL = 'https://github.com/Skuskusku13';
export const LINKEDIN_URL = 'https://www.linkedin.com/in/dan-levy-a736a2150/';
