import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import NavbarBrand from './NavbarBrand';
import NavLinks from './NavLinks';
import MobileMenu from './MobileMenu';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          <NavbarBrand />

          {/* Desktop Menu - Visible only on large screens */}
          <div className="hidden lg:flex items-center gap-8">
            <NavLinks />

            <ThemeToggle />
          </div>

          {/* Mobile/Tablet Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 dark:text-gray-300 p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
      />
    </nav>
  );
}