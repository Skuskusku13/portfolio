/**
 * Logique pure du formulaire de contact : validation, échappement, envoi et
 * classification des erreurs. Sans React, donc testable unitairement.
 */

export interface ContactValues {
  email: string;
  subject: string;
  message: string;
}

export type ContactField = keyof ContactValues;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const LIMITS = { email: 254, subject: 150, message: 4000 } as const;
/** Délai au-delà duquel l'envoi est abandonné (le bouton ne reste jamais bloqué). */
export const SEND_TIMEOUT_MS = 10_000;

/** Suffisant pour le formulaire : une adresse avec un domaine et une extension. */
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MESSAGES = {
  emailRequired: 'Saisissez votre adresse email.',
  emailInvalid: 'Saisissez une adresse du type prenom@exemple.fr.',
  subjectRequired: 'Indiquez un sujet.',
  messageRequired: 'Écrivez un message.',
} as const;

export function validateField(field: ContactField, value: string): string | undefined {
  const trimmed = value.trim();
  if (field === 'email') {
    if (trimmed === '') return MESSAGES.emailRequired;
    if (!EMAIL_PATTERN.test(trimmed)) return MESSAGES.emailInvalid;
    return undefined;
  }
  if (field === 'subject') return trimmed === '' ? MESSAGES.subjectRequired : undefined;
  return trimmed === '' ? MESSAGES.messageRequired : undefined;
}

export function validateContact(values: ContactValues): ContactErrors {
  const errors: ContactErrors = {};
  (Object.keys(values) as ContactField[]).forEach((field) => {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  });
  return errors;
}

/** Le mailer attend un champ `html` : on échappe le texte saisi et on conserve les retours à la ligne. */
export function toSafeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/\r\n|\r|\n/g, '<br>');
}

export type ContactErrorKind = 'timeout' | 'network' | 'rate-limited' | 'rejected' | 'unavailable';

export class ContactError extends Error {
  readonly kind: ContactErrorKind;
  readonly status: number | undefined;

  constructor(kind: ContactErrorKind, status?: number) {
    super(`contact:${kind}${status === undefined ? '' : `:${status}`}`);
    this.name = 'ContactError';
    this.kind = kind;
    this.status = status;
  }
}

/** Contrat inchangé : POST JSON `{ from, subject, html }`. */
export function toPayload(values: ContactValues): { from: string; subject: string; html: string } {
  return { from: values.email.trim(), subject: values.subject.trim(), html: toSafeHtml(values.message.trim()) };
}

function classifyResponse(response: Response): ContactError | null {
  if (response.ok) {
    // Un 200 HTML est une page de repli (SPA, proxy, page d'erreur), jamais une confirmation de l'API.
    const type = response.headers.get('content-type') ?? '';
    return type.toLowerCase().startsWith('text/html') ? new ContactError('unavailable', response.status) : null;
  }
  if (response.status === 429) return new ContactError('rate-limited', response.status);
  if (response.status >= 500) return new ContactError('unavailable', response.status);
  return new ContactError('rejected', response.status);
}

function classifyFailure(error: unknown): ContactError {
  if (error instanceof ContactError) return error;
  if (error instanceof DOMException && (error.name === 'TimeoutError' || error.name === 'AbortError')) {
    return new ContactError('timeout');
  }
  return new ContactError('network');
}

/**
 * Envoie le message. Résout en cas de succès confirmé par l'API, rejette une `ContactError`
 * typée sinon (délai, réseau, refus, limite d'envois, service indisponible).
 */
export async function sendContact(url: string, values: ContactValues, fetchFn: typeof fetch = fetch): Promise<void> {
  let response: Response;
  try {
    response = await fetchFn(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(toPayload(values)),
      credentials: 'omit',
      referrerPolicy: 'no-referrer',
      signal: AbortSignal.timeout(SEND_TIMEOUT_MS),
    });
  } catch (error) {
    throw classifyFailure(error);
  }
  const failure = classifyResponse(response);
  if (failure) throw failure;
}

/** Message affiché sous le formulaire, avant le lien de repli vers l'adresse email. */
export function describeError(kind: ContactErrorKind): string {
  switch (kind) {
    case 'timeout':
      return "Le serveur n'a pas répondu à temps. Réessayez dans un instant, ou écrivez-moi directement à";
    case 'network':
      return 'Connexion impossible. Vérifiez votre réseau, ou écrivez-moi directement à';
    case 'rate-limited':
      return "Trop d'envois en peu de temps. Réessayez dans quelques minutes, ou écrivez-moi directement à";
    case 'rejected':
      return "Le message a été refusé par le serveur. Vérifiez l'adresse et le contenu, ou écrivez-moi directement à";
    case 'unavailable':
      return "Le service d'envoi est indisponible pour le moment. Écrivez-moi directement à";
  }
}
