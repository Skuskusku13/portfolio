import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import Button from '../ui/Button';
import NavbarBrand from './NavbarBrand';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import { menuItems } from './items';
import { useActiveSection } from '../../hooks/useActiveSection';

const MENU_ID = 'menu-mobile';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = useMemo(() => menuItems.map((item) => item.href.slice(1)), []);
  const activeId = useActiveSection(sectionIds);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const headerRef = useRef<HTMLElement>(null);

  // Un tap ou un clic hors de l'en-tête ferme le menu mobile.
  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <NavbarBrand />

        <nav aria-label="Sections du site" className="hidden items-center gap-7 lg:flex">
          <NavLinks activeId={activeId} />
        </nav>

        <div className="flex items-center gap-2">
          <Button href="#contact" size="sm">
            <span className="hidden sm:inline">Me contacter</span>
            <span className="sm:hidden">Contact</span>
          </Button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            className="inline-flex size-9 items-center justify-center rounded-md text-ink-2 transition-colors duration-200 hover:bg-surface-2 hover:text-ink lg:hidden"
          >
            {menuOpen ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <MobileMenu id={MENU_ID} isOpen={menuOpen} activeId={activeId} onClose={closeMenu} />
    </header>
  );
}
