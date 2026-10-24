import { useState, type FormEvent, type ChangeEvent } from 'react';
import { ArrowUpRight, Loader2 } from 'lucide-react';
import { MAILER_URL, EMAIL, GITHUB_URL, LINKEDIN_URL } from '../config';
import Section from './ui/Section';
import Button from './ui/Button';
import Reveal from './ui/Reveal';
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons';

type Status = 'idle' | 'loading' | 'success' | 'error';

/** Le mailer attend un champ `html` : on échappe le texte saisi et on conserve les retours à la ligne. */
function toSafeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\r\n|\r|\n/g, '<br>');
}

const fieldClass =
  'w-full rounded-md border border-line-input bg-surface px-3.5 text-[15px] text-ink placeholder:text-ink-3 ' +
  'transition-[border-color,box-shadow] duration-200 ease-out-quint ' +
  'focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25';

export default function Contact() {
  const [formData, setFormData] = useState({ email: '', subject: '', message: '' });
  const [status, setStatus] = useState<Status>('idle');
  const [copied, setCopied] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === 'loading') return;
    setStatus('loading');

    try {
      const response = await fetch(MAILER_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: formData.email,
          subject: formData.subject,
          html: toSafeHtml(formData.message),
        }),
      });
      if (!response.ok) throw new Error(`Mailer HTTP ${response.status}`);
      setStatus('success');
      setFormData({ email: '', subject: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Impossible de copier l'adresse :", err);
    }
  };

  return (
    <Section id="contact" title="Contact" deck="Ouvert aux opportunités professionnelles et aux échanges techniques.">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Canaux directs */}
        <Reveal className="lg:col-span-5">
          <div className="rule pt-6">
            <p className="text-[14px] text-ink-2">Par email</p>
            <a href={`mailto:${EMAIL}`} className="mt-1 inline-block text-[18px] font-medium text-ink hover:underline">
              {EMAIL}
            </a>
            <div className="mt-4">
              <Button variant="secondary" size="sm" onClick={copyEmail}>
                Copier l'adresse
              </Button>
              <p role="status" aria-live="polite" className="mt-2 min-h-5 text-[14px] text-ink-2">
                {copied ? 'Adresse copiée' : ''}
              </p>
            </div>
          </div>

          <ul className="mt-8 divide-y divide-line border-y border-line">
            <li>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3.5 text-[15px] text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                <span className="inline-flex items-center gap-2.5">
                  <LinkedInIcon className="size-4" />
                  LinkedIn
                </span>
                <ArrowUpRight className="size-3.5 text-ink-3" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between py-3.5 text-[15px] text-ink-2 transition-colors duration-200 hover:text-ink"
              >
                <span className="inline-flex items-center gap-2.5">
                  <GitHubIcon className="size-4" />
                  GitHub
                </span>
                <ArrowUpRight className="size-3.5 text-ink-3" strokeWidth={1.5} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </Reveal>

        {/* Formulaire */}
        <Reveal delay={60} className="lg:col-span-6 lg:col-start-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-1.5 block text-[14px] font-medium text-ink">
                Votre email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                required
                maxLength={254}
                value={formData.email}
                onChange={handleChange}
                placeholder="prenom.nom@exemple.fr"
                className={`${fieldClass} h-11`}
              />
            </div>

            <div>
              <label htmlFor="subject" className="mb-1.5 block text-[14px] font-medium text-ink">
                Sujet
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                maxLength={150}
                value={formData.subject}
                onChange={handleChange}
                placeholder="Proposition, question technique, échange"
                className={`${fieldClass} h-11`}
              />
            </div>

            <div>
              <label htmlFor="message" className="mb-1.5 block text-[14px] font-medium text-ink">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                maxLength={4000}
                value={formData.message}
                onChange={handleChange}
                placeholder="Quelques lignes suffisent."
                className={`${fieldClass} resize-y py-2.5 leading-[1.5]`}
              />
            </div>

            <div>
              <Button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto">
                {status === 'loading' ? (
                  <>
                    <Loader2 className="size-4 motion-safe:animate-spin" strokeWidth={1.5} aria-hidden="true" />
                    Envoi en cours
                  </>
                ) : (
                  'Envoyer'
                )}
              </Button>
              <p role="status" aria-live="polite" className="mt-3 min-h-5 text-[14px] leading-[1.5]">
                {status === 'success' && <span className="text-ink">Message envoyé. Merci, je vous réponds par email.</span>}
                {status === 'error' && (
                  <span className="text-danger">
                    L'envoi a échoué. Écrivez-moi directement à{' '}
                    <a href={`mailto:${EMAIL}`} className="font-medium underline">
                      {EMAIL}
                    </a>
                    .
                  </span>
                )}
              </p>
            </div>
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
