import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../config';
import Button from './ui/Button';
import NewWindowHint from './ui/NewWindowHint';
import { GitHubIcon, LinkedInIcon } from './ui/BrandIcons';

const COPIED_MS = 2000;
type CopyState = 'idle' | 'copied' | 'failed';

const copyMessages: Record<CopyState, string> = {
  idle: '',
  copied: 'Adresse copiée',
  failed: "Copie impossible : sélectionnez l'adresse ci-dessus.",
};

const channelClass =
  'flex items-center justify-between py-3.5 text-[15px] text-ink-2 transition-colors duration-200 hover:text-ink';

/** Canaux directs : adresse email en clair et copiable, LinkedIn et GitHub. */
export default function ContactChannels() {
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
    <>
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
            {copyMessages[copy]}
          </p>
        </div>
      </div>

      <ul role="list" className="mt-8 divide-y divide-line border-y border-line">
        <li>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={channelClass}>
            <span className="inline-flex items-center gap-2.5">
              <LinkedInIcon className="size-4" />
              LinkedIn
              <NewWindowHint />
            </span>
            <ArrowUpRight className="size-3.5 text-ink-3" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={channelClass}>
            <span className="inline-flex items-center gap-2.5">
              <GitHubIcon className="size-4" />
              GitHub
              <NewWindowHint />
            </span>
            <ArrowUpRight className="size-3.5 text-ink-3" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </li>
      </ul>
    </>
  );
}
