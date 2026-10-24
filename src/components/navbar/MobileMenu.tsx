import { useEffect, useRef } from 'react';
import NavLinks from './NavLinks';

interface MobileMenuProps {
  id: string;
  isOpen: boolean;
  activeId: string | null;
  onClose: () => void;
}

export default function MobileMenu({ id, isOpen, activeId, onClose }: MobileMenuProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus sur le premier lien à l'ouverture ; Échap ferme et rend le focus au bouton d'ouverture.
  useEffect(() => {
    if (!isOpen) return;
    const opener = document.querySelector<HTMLButtonElement>(`[aria-controls="${id}"]`);
    const first = panelRef.current?.querySelector<HTMLAnchorElement>('a');
    first?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        opener?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen, onClose, id]);

  return (
    <div
      id={id}
      ref={panelRef}
      hidden={!isOpen}
      className="border-t border-line bg-canvas shadow-float lg:hidden"
    >
      <nav aria-label="Sections du site" className="mx-auto w-full max-w-[1200px] px-5 py-4 sm:px-8">
        <NavLinks variant="mobile" activeId={activeId} onItemClick={onClose} />
      </nav>
    </div>
  );
}
