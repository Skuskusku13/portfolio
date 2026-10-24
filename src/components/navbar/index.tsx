import { useCallback, useEffect, useMemo, useRef, useState, type FocusEvent } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import Button from '../ui/Button';
import NavbarBrand from './NavbarBrand';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';
import { menuItems } from './items';
import { useActiveSection } from '../../hooks/useActiveSection';

const MENU_ID = 'menu-mobile';
/** Au-delà de cette largeur, les liens sont dans la barre : le menu mobile n'a plus lieu d'être. */
const DESKTOP_QUERY = '(min-width: 1024px)';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = useMemo(() => menuItems.map((item) => item.href.slice(1)), []);
  const activeId = useActiveSection(sectionIds);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const headerRef = useRef<HTMLElement>(null);

  // Un tap ou un clic hors de l'en-tête ferme le menu mobile.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const onPointerDown = (e: PointerEvent) => {
      if (headerRef.current && e.target instanceof Node && !headerRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [menuOpen]);

  // Le menu se referme si la fenêtre passe en largeur desktop pendant qu'il est ouvert.
  useEffect(() => {
    if (!menuOpen) return undefined;
    const mediaQuery = window.matchMedia(DESKTOP_QUERY);
    const onChange = (e: { matches: boolean }) => {
      if (e.matches) setMenuOpen(false);
    };
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, [menuOpen]);

  // Le focus clavier qui quitte l'en-tête ferme le menu : rien ne reste masqué sous le panneau (WCAG 2.4.11).
  const onHeaderBlur = (e: FocusEvent<HTMLElement>) => {
    if (menuOpen && !(e.relatedTarget instanceof Node && e.currentTarget.contains(e.relatedTarget))) setMenuOpen(false);
  };

  return (
    <header
      ref={headerRef}
      onBlur={onHeaderBlur}
      className="fixed inset-x-0 top-0 z-50 border-b border-line bg-canvas/85 backdrop-blur-md"
    >
      <div className="mx-auto flex h-16 w-full max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-12">
        <NavbarBrand />

        <nav aria-label="Sections du site" className="hidden items-center gap-7 lg:flex">
          <NavLinks activeId={activeId} />
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          {/* Une seule action accent par écran : tant que le hero (et son bouton) est visible, celui-ci reste en retrait. */}
          <Button href="#contact" size="sm" variant={activeId ? 'primary' : 'secondary'}>
            <span className="hidden sm:inline">Me contacter</span>
            <span className="sm:hidden">Contact</span>
          </Button>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={MENU_ID}
            aria-label="Menu"
            className="relative inline-flex size-9 items-center justify-center rounded-md text-ink-2 transition-colors duration-200 before:absolute before:-inset-1 before:content-[''] hover:bg-surface-2 hover:text-ink lg:hidden"
          >
            {menuOpen ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      <MobileMenu id={MENU_ID} isOpen={menuOpen} activeId={activeId} onClose={closeMenu} />
    </header>
  );
}
