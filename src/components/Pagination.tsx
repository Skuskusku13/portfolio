import { useRef } from 'react';
import Button from './ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  /** id de la section à ramener en haut de l'écran quand la page change. */
  scrollTargetId: string;
}

/**
 * Pagination partagée (Projets, Compétences). Le compteur est annoncé aux lecteurs d'écran,
 * chaque changement de page ramène la section en haut de l'écran, et le focus ne se perd
 * pas quand le bouton activé devient désactivé en bout de liste.
 */
export default function Pagination({ currentPage, totalPages, onPageChange, scrollTargetId }: PaginationProps) {
  const navRef = useRef<HTMLElement>(null);

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    onPageChange(page);
    document.getElementById(scrollTargetId)?.scrollIntoView({ block: 'start' });
    // Le bouton cliqué peut devenir désactivé : on garde le focus dans la pagination.
    const nextDisabled = page === 1 || page === totalPages;
    if (nextDisabled) requestAnimationFrame(() => navRef.current?.focus({ preventScroll: true }));
  };

  return (
    <nav
      ref={navRef}
      tabIndex={-1}
      aria-label="Pagination"
      className="mt-10 flex items-center justify-between gap-4 border-t border-line pt-6 outline-none sm:mt-12"
    >
      <Button variant="secondary" size="sm" onClick={() => goTo(currentPage - 1)} disabled={currentPage === 1}>
        Précédent
      </Button>

      <p aria-live="polite" className="font-mono text-[13px] text-ink-2 tnum">
        Page {currentPage} sur {totalPages}
      </p>

      <Button variant="secondary" size="sm" onClick={() => goTo(currentPage + 1)} disabled={currentPage === totalPages}>
        Suivant
      </Button>
    </nav>
  );
}
