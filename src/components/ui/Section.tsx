import type { ReactNode } from 'react';
import Container from './Container';
import Reveal from './Reveal';

interface SectionProps {
  id: string;
  title: string;
  className?: string;
  children: ReactNode;
}

/**
 * Gabarit commun des sections : filet d'en-tête qui se trace, titre à gauche (28–32 px),
 * contenu en dessous. Pas de chapeau, pas de titre centré, pas de carte englobante.
 */
export default function Section({ id, title, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`pt-12 pb-6 sm:pt-16 sm:pb-8 lg:pt-20 lg:pb-10 ${className}`}>
      <Container>
        <Reveal as="header" className="rule mb-8 pt-6 sm:mb-10">
          <h2 className="text-[1.75rem] font-semibold leading-[1.1] sm:text-[2rem]">{title}</h2>
        </Reveal>
        {children}
      </Container>
    </section>
  );
}
