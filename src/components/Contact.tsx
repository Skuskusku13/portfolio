import { useEffect, useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { EMAIL, GITHUB_URL, LINKEDIN_URL, MAILER_URL } from '../config';
import Section from './ui/Section';
import Reveal from './ui/Reveal';
import Button from './ui/Button';
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons';
import ContactForm from './ContactForm';

const COPIED_MS = 2000;
type CopyState = 'idle' | 'copied' | 'failed';

const copyMessages: Record<CopyState, string> = {
  idle: '',
  copied: 'Adresse copiée',
  failed: "Copie impossible : sélectionnez l'adresse ci-dessus.",
};

/** Sans API de contact configurée, on ne rend pas un formulaire qui ne peut pas envoyer. */
function ContactUnavailable() {
  return (
    <p className="text-[15px] leading-[1.55] text-ink-2">
      Le formulaire est indisponible pour le moment. Écrivez-moi directement à{' '}
      <a href={`mailto:${EMAIL}`} className="font-medium text-ink underline">
        {EMAIL}
      </a>
      .
    </p>
  );
}

/** Sous le formulaire : l'adresse en clair, sa copie, LinkedIn et GitHub. */
function DirectChannels() {
  const [copy, setCopy] = useState<CopyState>('idle');
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copyEmail = async () => {
    window.clearTimeout(timer.current);
    try {
      if (!navigator.clipboard) throw new Error('Presse-papiers indisponible');
      await navigator.clipboard.writeText(EMAIL);
      setCopy('copied');
      timer.current = window.setTimeout(() => setCopy('idle'), COPIED_MS);
    } catch {
      setCopy('failed');
    }
  };

  return (
    <div className="mt-6 text-center">
      <p className="text-[15px] leading-[1.5] text-ink-2">
        Ou directement à{' '}
        <a href={`mailto:${EMAIL}`} className="font-medium text-ink hover:underline">
          {EMAIL}
        </a>
        .
      </p>
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <Button variant="secondary" onClick={copyEmail}>
          {copy === 'copied' ? (
            <Check className="size-4 text-ok" strokeWidth={2} aria-hidden="true" />
          ) : (
            <Copy className="size-4" strokeWidth={1.5} aria-hidden="true" />
          )}
          Copier l'email
        </Button>
        <Button href={LINKEDIN_URL} variant="secondary" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon className="size-4" />
          LinkedIn
        </Button>
        <Button href={GITHUB_URL} variant="secondary" target="_blank" rel="noopener noreferrer">
          <GitHubIcon className="size-4" />
          GitHub
        </Button>
      </div>
      <p role="status" aria-live="polite" className="mt-3 min-h-5 text-[14px] text-ink-2">
        {copyMessages[copy]}
      </p>
    </div>
  );
}

export default function Contact() {
  return (
    <Section id="contact" title="Contact" deck="Ouvert aux opportunités professionnelles et aux échanges techniques.">
      {/* Une seule colonne centrée : le formulaire dans un panneau, les canaux directs dessous. */}
      <Reveal className="mx-auto max-w-[680px]">
        <div className="rounded-lg border border-line bg-surface p-6 sm:p-8">
          {MAILER_URL ? <ContactForm mailerUrl={MAILER_URL} /> : <ContactUnavailable />}
        </div>
        <DirectChannels />
      </Reveal>
    </Section>
  );
}
