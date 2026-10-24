import type { MouseEvent } from 'react';
import Button from './ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** id de la section à ramener en haut de l'écran quand la page change à la souris. */
  scrollTargetId: string;
}

/**
 * Pagination partagée (Projets, Compétences). Les boutons de bout de liste restent
 * focalisables (aria-disabled) pour ne jamais perdre le focus clavier ; un clic à la
 * souris ramène la section en haut de l'écran, une activation au clavier laisse la vue
 * et le focus en place (la région de statut de la section annonce la nouvelle page).
 */
export default function Pagination({ currentPage, totalPages, onPageChange, scrollTargetId }: PaginationProps) {
  if (totalPages <= 1) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === totalPages;

  const goTo = (page: number, blocked: boolean) => (e: MouseEvent<HTMLButtonElement>) => {
    if (blocked) return;
    onPageChange(page);
    // detail vaut 0 quand le clic vient du clavier (Entrée, Espace).
    if (e.detail > 0) document.getElementById(scrollTargetId)?.scrollIntoView({ block: 'start' });
  };

  // Groupé et centré : Précédent, « Page x sur y », Suivant se lisent d'un seul regard.
  return (
    <nav aria-label="Pagination" className="mt-8 flex items-center justify-center gap-5 sm:mt-10">
      <Button variant="secondary" size="sm" onClick={goTo(currentPage - 1, isFirst)} aria-disabled={isFirst || undefined}>
        Précédent
      </Button>

      <p className="font-mono text-[13px] text-ink-2 tnum">
        Page {currentPage} sur {totalPages}
      </p>

      <Button variant="secondary" size="sm" onClick={goTo(currentPage + 1, isLast)} aria-disabled={isLast || undefined}>
        Suivant
      </Button>
    </nav>
  );
}
