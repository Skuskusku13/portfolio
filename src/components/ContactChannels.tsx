import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, MapPin } from 'lucide-react';
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from '../config';
import { useParisTime } from '../hooks/useParisTime';
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

const rowClass = 'flex items-center justify-between gap-4 py-3.5 text-[15px] text-ink-2';
const linkRowClass = `${rowClass} transition-colors duration-200 hover:text-ink`;

/** Canaux directs : l'adresse email en tête, copiable ; LinkedIn et GitHub ; le lieu et son heure. */
export default function ContactChannels() {
  const [copy, setCopy] = useState<CopyState>('idle');
  const timer = useRef<number | undefined>(undefined);
  const parisTime = useParisTime();

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
        {/* L'adresse est le canal : la plus grande chose de la section après son titre. */}
        <a
          href={`mailto:${EMAIL}`}
          className="inline-block break-all text-[22px] font-medium leading-[1.2] text-ink hover:underline sm:text-[24px]"
        >
          {EMAIL}
        </a>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
          <Button variant="secondary" size="sm" onClick={copyEmail}>
            {copy === 'copied' ? (
              <Check className="size-4 text-ok" strokeWidth={2} aria-hidden="true" />
            ) : (
              <Copy className="size-4" strokeWidth={1.5} aria-hidden="true" />
            )}
            Copier l'adresse
          </Button>
          <p role="status" aria-live="polite" className="min-h-5 text-[14px] text-ink-2">
            {copyMessages[copy]}
          </p>
        </div>
      </div>

      <ul role="list" className="mt-8 divide-y divide-line border-y border-line">
        <li>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={linkRowClass}>
            <span className="inline-flex items-center gap-2.5">
              <LinkedInIcon className="size-4" />
              LinkedIn
              <NewWindowHint />
            </span>
            <ArrowUpRight className="size-3.5 shrink-0 text-ink-3" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={linkRowClass}>
            <span className="inline-flex items-center gap-2.5">
              <GitHubIcon className="size-4" />
              GitHub
              <NewWindowHint />
            </span>
            <ArrowUpRight className="size-3.5 shrink-0 text-ink-3" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </li>
        {/* Le lieu vient du JSON-LD ; l'heure se met à jour à la minute, sans annonce. */}
        <li className={rowClass}>
          <span className="inline-flex items-center gap-2.5">
            <MapPin className="size-4" strokeWidth={1.5} aria-hidden="true" />
            Paris
          </span>
          {parisTime && (
            <span className="font-mono text-[13px] text-ink-3 tnum">
              {parisTime} <span className="text-ink-3">heure de Paris</span>
            </span>
          )}
        </li>
      </ul>
    </>
  );
}
