import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './Contact';
import { MESSAGES } from '../lib/contact';

const MAILER = 'https://api.exemple.fr/contact';
const EMAIL = 'danlevy149@gmail.com';

vi.mock('../config', () => ({
  MAILER_URL: 'https://api.exemple.fr/contact',
  EMAIL: 'danlevy149@gmail.com',
  GITHUB_URL: 'https://github.com/Skuskusku13',
  LINKEDIN_URL: 'https://www.linkedin.com/in/dan-levy-a736a2150/',
}));

const fetchMock = vi.fn();

beforeEach(() => {
  fetchMock.mockReset();
  vi.stubGlobal('fetch', fetchMock);
});

const clipboardDescriptor = Object.getOwnPropertyDescriptor(navigator, 'clipboard');

afterEach(() => {
  vi.unstubAllGlobals();
  if (clipboardDescriptor) Object.defineProperty(navigator, 'clipboard', clipboardDescriptor);
  else Reflect.deleteProperty(navigator, 'clipboard');
});

const jsonResponse = (status: number, type = 'application/json') =>
  new Response('{"ok":true}', { status, headers: { 'content-type': type } });

const form = () => screen.getByRole('form', { name: 'Formulaire de contact' });
const field = (name: string) => within(form()).getByRole('textbox', { name });
const submitButton = () => within(form()).getByRole('button', { name: /Envoyer|Envoi en cours/ });
const status = () => within(form()).getByRole('status');

async function fillValidForm(user: ReturnType<typeof userEvent.setup>) {
  await user.type(field('Votre email'), 'jean@exemple.fr');
  await user.type(field('Sujet'), 'Bonjour');
  await user.type(field('Message'), 'Première ligne{Enter}Deuxième <ligne>');
}

describe('Contact — validation en direct', () => {
  it('annonce que tous les champs sont obligatoires et ne soumet rien quand ils sont vides', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    expect(form()).toHaveAttribute('novalidate');
    expect(within(form()).getByText('Tous les champs sont obligatoires.')).toBeInTheDocument();

    await user.click(submitButton());

    expect(fetchMock).not.toHaveBeenCalled();
    expect(field('Votre email')).toHaveAttribute('aria-invalid', 'true');
    expect(field('Votre email')).toHaveAccessibleDescription(`Erreur : ${MESSAGES.emailRequired}`);
    expect(field('Sujet')).toHaveAccessibleDescription(`Erreur : ${MESSAGES.subjectRequired}`);
    expect(field('Message')).toHaveAccessibleDescription(`Erreur : ${MESSAGES.messageRequired}`);
    expect(field('Votre email')).toHaveFocus();
    expect(status()).toHaveTextContent('3 champs à corriger');
  });

  it('signale une adresse invalide en quittant le champ, puis efface l’erreur dès la correction', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    const email = field('Votre email');

    await user.type(email, 'jean@exemple');
    await user.tab();
    expect(email).toHaveAttribute('aria-invalid', 'true');
    expect(email).toHaveAccessibleDescription(`Erreur : ${MESSAGES.emailInvalid}`);

    await user.type(email, '.fr');

    expect(email).not.toHaveAttribute('aria-invalid', 'true');
    expect(within(form()).queryByText(/Erreur :/)).not.toBeInTheDocument();
  });

  it('ne signale pas d’erreur sur un champ non encore visité', async () => {
    const user = userEvent.setup();
    render(<Contact />);

    await user.type(field('Sujet'), 'Un sujet');

    expect(field('Votre email')).not.toHaveAttribute('aria-invalid', 'true');
    expect(within(form()).queryByText(/Erreur :/)).not.toBeInTheDocument();
  });

  it('refuse un message composé d’espaces', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    await user.type(field('Votre email'), 'jean@exemple.fr');
    await user.type(field('Sujet'), 'Bonjour');
    await user.type(field('Message'), '   ');

    await user.click(submitButton());

    expect(fetchMock).not.toHaveBeenCalled();
    expect(field('Message')).toHaveAccessibleDescription(`Erreur : ${MESSAGES.messageRequired}`);
    expect(field('Message')).toHaveFocus();
  });
});

describe('Contact — envoi', () => {
  it('poste le contrat { from, subject, html } puis confirme et vide le formulaire', async () => {
    fetchMock.mockResolvedValue(jsonResponse(200));
    const user = userEvent.setup();
    render(<Contact />);
    await fillValidForm(user);

    await user.click(submitButton());

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(MAILER);
    expect(init.method).toBe('POST');
    expect(JSON.parse(init.body as string)).toEqual({
      from: 'jean@exemple.fr',
      subject: 'Bonjour',
      html: 'Première ligne<br>Deuxième &lt;ligne&gt;',
    });
    expect(await within(form()).findByText('Message envoyé. Merci, je vous réponds par email.')).toBeInTheDocument();
    expect(field('Votre email')).toHaveValue('');
    expect(field('Message')).toHaveValue('');
  });

  it('annonce « Envoi en cours » et bloque la double soumission pendant la requête', async () => {
    let resolveFetch: (value: Response) => void = () => undefined;
    fetchMock.mockImplementation(() => new Promise<Response>((resolve) => (resolveFetch = resolve)));
    const user = userEvent.setup();
    render(<Contact />);
    await fillValidForm(user);

    await user.click(submitButton());
    await user.click(submitButton());

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(submitButton()).toHaveAttribute('aria-disabled', 'true');
    expect(status()).toHaveTextContent('Envoi en cours');

    await act(async () => resolveFetch(jsonResponse(200)));
    expect(await within(form()).findByText(/Message envoyé/)).toBeInTheDocument();
  });

  it('garde la saisie et propose l’adresse email en cas d’erreur réseau', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
    const user = userEvent.setup();
    render(<Contact />);
    await fillValidForm(user);

    await user.click(submitButton());

    expect(await within(form()).findByText(/Connexion impossible/)).toBeInTheDocument();
    expect(within(status()).getByRole('link', { name: EMAIL })).toHaveAttribute('href', `mailto:${EMAIL}`);
    expect(field('Message')).toHaveValue('Première ligne\nDeuxième <ligne>');
  });

  it('explique un délai dépassé', async () => {
    fetchMock.mockRejectedValue(new DOMException('aborted', 'TimeoutError'));
    const user = userEvent.setup();
    render(<Contact />);
    await fillValidForm(user);

    await user.click(submitButton());

    expect(await within(form()).findByText(/n'a pas répondu à temps/)).toBeInTheDocument();
  });

  it('explique une limite d’envois (429) et un service indisponible (5xx ou page HTML)', async () => {
    const user = userEvent.setup();
    fetchMock.mockResolvedValueOnce(jsonResponse(429));
    const { unmount } = render(<Contact />);
    await fillValidForm(user);
    await user.click(submitButton());
    expect(await within(form()).findByText(/Trop d'envois/)).toBeInTheDocument();
    unmount();

    fetchMock.mockResolvedValueOnce(jsonResponse(200, 'text/html'));
    render(<Contact />);
    await fillValidForm(user);
    await user.click(submitButton());
    expect(await within(form()).findByText(/indisponible/)).toBeInTheDocument();
  });

  it('efface le message d’état dès que la saisie reprend', async () => {
    fetchMock.mockRejectedValue(new TypeError('Failed to fetch'));
    const user = userEvent.setup();
    render(<Contact />);
    await fillValidForm(user);
    await user.click(submitButton());
    await within(form()).findByText(/Connexion impossible/);

    await user.type(field('Sujet'), ' !');

    expect(within(form()).queryByText(/Connexion impossible/)).not.toBeInTheDocument();
  });

  it('ignore silencieusement un robot qui remplit le champ piège', async () => {
    const user = userEvent.setup();
    const { container } = render(<Contact />);
    await fillValidForm(user);
    const trap = container.querySelector('input[name="website"]') as HTMLInputElement;
    expect(trap).toHaveAttribute('tabindex', '-1');
    expect(trap).toHaveAttribute('aria-hidden', 'true');
    fireEvent.change(trap, { target: { value: 'https://spam.example' } });

    await user.click(submitButton());

    expect(fetchMock).not.toHaveBeenCalled();
    expect(await within(form()).findByText(/Message envoyé/)).toBeInTheDocument();
  });
});

describe('Contact — canaux directs', () => {
  it('copie l’adresse et le confirme, puis efface la confirmation après deux secondes', async () => {
    const user = userEvent.setup();
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { value: { writeText }, configurable: true });
    const setTimeoutSpy = vi.spyOn(window, 'setTimeout');
    render(<Contact />);

    await user.click(screen.getByRole('button', { name: "Copier l'adresse" }));

    expect(writeText).toHaveBeenCalledWith(EMAIL);
    expect(await screen.findByText('Adresse copiée')).toBeInTheDocument();
    const hide = setTimeoutSpy.mock.calls.find(([, delay]) => delay === 2000)?.[0] as (() => void) | undefined;
    expect(hide).toBeDefined();
    act(() => hide?.());
    expect(screen.queryByText('Adresse copiée')).not.toBeInTheDocument();
    setTimeoutSpy.mockRestore();
  });

  it('explique l’échec de la copie au lieu de se taire', async () => {
    const user = userEvent.setup();
    Object.defineProperty(navigator, 'clipboard', {
      value: { writeText: vi.fn().mockRejectedValue(new Error('refusé')) },
      configurable: true,
    });
    render(<Contact />);

    await user.click(screen.getByRole('button', { name: "Copier l'adresse" }));

    expect(await screen.findByText(/Copie impossible/)).toBeInTheDocument();
  });

  it('expose l’email, LinkedIn et GitHub en liens nommés', () => {
    render(<Contact />);

    expect(screen.getByRole('link', { name: EMAIL })).toHaveAttribute('href', `mailto:${EMAIL}`);
    expect(screen.getByRole('link', { name: 'LinkedIn (nouvelle fenêtre)' })).toHaveAttribute('target', '_blank');
    expect(screen.getByRole('link', { name: 'GitHub (nouvelle fenêtre)' })).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
