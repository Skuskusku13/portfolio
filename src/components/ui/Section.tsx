import type { ReactNode } from 'react';
import Container from './Container';
import Reveal from './Reveal';

interface SectionProps {
  id: string;
  title: string;
  /** Une phrase qui dit ce que la section prouve ; en 17 px, colonne droite sur desktop. */
  deck?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Gabarit commun des sections : filet d'en-tête qui se trace, titre à gauche (28–32 px),
 * chapeau à droite, contenu en dessous. Pas de titre centré, pas de carte englobante.
 */
export default function Section({ id, title, deck, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`pt-12 pb-6 sm:pt-16 sm:pb-8 lg:pt-20 lg:pb-10 ${className}`}>
      <Container>
        <Reveal as="header" className="rule mb-8 grid gap-3 pt-6 sm:mb-10 lg:grid-cols-12 lg:gap-12">
          <h2 className="text-[28px] font-semibold leading-[1.1] sm:text-[32px] lg:col-span-5">{title}</h2>
          {deck && (
            <p className="max-w-[58ch] text-[17px] leading-[1.5] text-ink-2 lg:col-span-6 lg:col-start-7">{deck}</p>
          )}
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
