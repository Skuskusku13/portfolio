import type { ReactNode } from 'react';

type Tone = 'neutral' | 'ok' | 'warn' | 'accent';

interface TagProps {
  tone?: Tone;
  dot?: boolean;
  className?: string;
  children: ReactNode;
}

const tones: Record<Tone, { box: string; dot: string }> = {
  neutral: { box: 'border-line text-ink-2', dot: 'bg-ink-3' },
  ok: { box: 'border-line text-ink', dot: 'bg-ok' },
  warn: { box: 'border-line text-ink', dot: 'bg-warn' },
  accent: { box: 'border-accent/40 text-accent', dot: 'bg-accent' },
};

/**
 * L'unique forme d'étiquette du site : mono 12 px, filet d'un pixel, coins 4 px.
 * Réservée aux données (technologies, statuts, périodes), jamais aux titres.
 */
export default function Tag({ tone = 'neutral', dot = false, className = '', children }: TagProps) {
  const t = tones[tone];
  return (
    <span
      className={`inline-flex h-6 items-center gap-1.5 whitespace-nowrap rounded-xs border px-2 font-mono text-[0.75rem] leading-none tnum ${t.box} ${className}`}
    >
      {dot && <span aria-hidden="true" className={`size-1.5 rounded-full ${t.dot}`} />}
      {children}
    </span>
  );
}
