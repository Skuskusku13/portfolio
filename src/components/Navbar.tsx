import { useState } from 'react';
import { Code, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { href: "#about", label: "À propos" },
    { href: "#experience", label: "Expérience" },
    { href: "#projects", label: "Projets" },
    { href: "#skills", label: "Compétences" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Code className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-xl text-gray-900 dark:text-white">Dan Levy</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                {item.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="text-gray-700 dark:text-gray-300"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-4 py-4 space-y-3">
            {menuItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}