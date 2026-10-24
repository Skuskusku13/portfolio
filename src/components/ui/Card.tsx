import type { ElementType, ReactNode } from 'react';
import Reveal from './Reveal';

interface CardProps {
  as?: ElementType;
  /** Décalage d'entrée (orchestration par grille : index × 60 ms). */
  delay?: number;
  className?: string;
  children: ReactNode;
}

/**
 * La carte du site : surface blanche (bleu nuit en sombre), filet d'un pixel, coins 16 px,
 * padding 24 px. Inerte : aucune ombre ni mouvement au survol. Entre avec la grammaire Reveal.
 */
export default function Card({ as = 'div', delay = 0, className = '', children }: CardProps) {
  return (
    <Reveal as={as} delay={delay} className={`rounded-lg border border-line bg-surface p-6 ${className}`}>
      {children}
    </Reveal>
  );
}
