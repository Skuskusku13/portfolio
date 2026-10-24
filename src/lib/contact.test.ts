import { describe, expect, it, vi } from 'vitest';
import {
  ContactError,
  MESSAGES,
  SEND_TIMEOUT_MS,
  describeError,
  sendContact,
  toPayload,
  toSafeHtml,
  validateContact,
  validateField,
  type ContactValues,
} from './contact';

const values: ContactValues = { email: ' jean@exemple.fr ', subject: ' Bonjour ', message: 'Ligne 1\nLigne <2> & "fin"' };

describe('toSafeHtml', () => {
  it('échappe les caractères HTML et convertit les retours à la ligne', () => {
    expect(toSafeHtml('a < b & c > "d" \'e\'\r\nf\ng')).toBe('a &lt; b &amp; c &gt; &quot;d&quot; &#39;e&#39;<br>f<br>g');
  });
});

describe('validateField / validateContact', () => {
  it('exige une adresse email bien formée', () => {
    expect(validateField('email', '')).toBe(MESSAGES.emailRequired);
    expect(validateField('email', '   ')).toBe(MESSAGES.emailRequired);
    expect(validateField('email', 'jean@exemple')).toBe(MESSAGES.emailInvalid);
    expect(validateField('email', 'jean exemple.fr')).toBe(MESSAGES.emailInvalid);
    expect(validateField('email', 'jean.dupont@exemple.fr')).toBeUndefined();
  });

  it('refuse un sujet ou un message fait d’espaces', () => {
    expect(validateField('subject', '  ')).toBe(MESSAGES.subjectRequired);
    expect(validateField('message', '\n\t')).toBe(MESSAGES.messageRequired);
    expect(validateField('message', 'Bonjour')).toBeUndefined();
  });

  it('agrège les erreurs par champ et ne renvoie rien quand tout est valide', () => {
    expect(validateContact({ email: '', subject: '', message: '' })).toEqual({
      email: MESSAGES.emailRequired,
      subject: MESSAGES.subjectRequired,
      message: MESSAGES.messageRequired,
    });
    expect(validateContact(values)).toEqual({});
  });
});

describe('toPayload', () => {
  it('respecte le contrat { from, subject, html } avec des valeurs nettoyées', () => {
    expect(toPayload(values)).toEqual({
      from: 'jean@exemple.fr',
      subject: 'Bonjour',
      html: 'Ligne 1<br>Ligne &lt;2&gt; &amp; &quot;fin&quot;',
    });
  });
});

describe('sendContact', () => {
  const url = 'https://api.exemple.fr/contact';
  const json = (status: number, type = 'application/json') =>
    new Response('{}', { status, headers: { 'content-type': type } });

  it('poste le JSON attendu sans cookies ni referer, avec un délai d’abandon', async () => {
    const fetchFn = vi.fn().mockResolvedValue(json(200));
    const timeout = vi.spyOn(AbortSignal, 'timeout');

    await expect(sendContact(url, values, fetchFn)).resolves.toBeUndefined();

    const [calledUrl, init] = fetchFn.mock.calls[0] as [string, RequestInit];
    expect(calledUrl).toBe(url);
    expect(init.method).toBe('POST');
    expect(init.credentials).toBe('omit');
    expect(init.referrerPolicy).toBe('no-referrer');
    expect(JSON.parse(init.body as string)).toEqual(toPayload(values));
    expect(timeout).toHaveBeenCalledWith(SEND_TIMEOUT_MS);
  });

  it.each([
    [429, 'rate-limited'],
    [400, 'rejected'],
    [404, 'rejected'],
    [500, 'unavailable'],
    [503, 'unavailable'],
  ])('classe une réponse %i en « %s »', async (status, kind) => {
    const fetchFn = vi.fn().mockResolvedValue(json(status));

    await expect(sendContact(url, values, fetchFn)).rejects.toMatchObject({ kind, status });
  });

  it('traite une page HTML en 200 comme un service indisponible (repli SPA ou proxy)', async () => {
    const fetchFn = vi.fn().mockResolvedValue(json(200, 'text/html; charset=utf-8'));

    await expect(sendContact(url, values, fetchFn)).rejects.toMatchObject({ kind: 'unavailable' });
  });

  it('distingue le délai dépassé d’une erreur réseau', async () => {
    const timedOut = vi.fn().mockRejectedValue(new DOMException('aborted', 'TimeoutError'));
    const offline = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'));

    await expect(sendContact(url, values, timedOut)).rejects.toMatchObject({ kind: 'timeout' });
    await expect(sendContact(url, values, offline)).rejects.toMatchObject({ kind: 'network' });
  });

  it('expose une erreur typée avec un message utilisateur par cas', () => {
    const error = new ContactError('rate-limited', 429);
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe('ContactError');
    expect(describeError('timeout')).toMatch(/pas répondu à temps/);
    expect(describeError('network')).toMatch(/Connexion impossible/);
    expect(describeError('rate-limited')).toMatch(/Trop d'envois/);
    expect(describeError('rejected')).toMatch(/refusé/);
    expect(describeError('unavailable')).toMatch(/indisponible/);
  });
});
