import { useState } from 'react';
import { Code, Menu, X, LayoutDashboard, Briefcase } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  currentView: 'portfolio' | 'portal';
  onViewChange: (view: 'portfolio' | 'portal') => void;
}

export default function Navbar({ currentView, onViewChange }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { href: "#about", label: "À propos" },
    { href: "#experiences", label: "Expériences" },
    { href: "#projects", label: "Projets" },
    { href: "#skills", label: "Compétences" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => onViewChange('portfolio')}
          >
            <Code className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-bold text-xl text-gray-900 dark:text-white whitespace-nowrap">Dan Levy</span>
          </div>

          {/* Desktop Menu - Visible only on large screens */}
          <div className="hidden lg:flex items-center gap-8">
            {currentView === 'portfolio' && menuItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition whitespace-nowrap"
              >
                {item.label}
              </a>
            ))}
            
            <button
              onClick={() => onViewChange(currentView === 'portfolio' ? 'portal' : 'portfolio')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors text-sm font-medium whitespace-nowrap"
            >
              {currentView === 'portfolio' ? (
                <>
                  <LayoutDashboard className="w-4 h-4" />
                  Portail
                </>
              ) : (
                <>
                  <Briefcase className="w-4 h-4" />
                  Portfolio
                </>
              )}
            </button>

            <ThemeToggle />
          </div>

          {/* Mobile/Tablet Toggle */}
          <div className="lg:hidden flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="text-gray-700 dark:text-gray-300 p-2"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800 absolute w-full left-0 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {currentView === 'portfolio' && menuItems.map((item) => (
              <a 
                key={item.href}
                href={item.href} 
                onClick={() => setMenuOpen(false)}
                className="block text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 py-2"
              >
                {item.label}
              </a>
            ))}
            <button
              onClick={() => {
                onViewChange(currentView === 'portfolio' ? 'portal' : 'portfolio');
                setMenuOpen(false);
              }}
              className="w-full flex items-center gap-2 px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium mt-2"
            >
              {currentView === 'portfolio' ? (
                <>
                  <LayoutDashboard className="w-4 h-4" />
                  Accès Portail
                </>
              ) : (
                <>
                  <Briefcase className="w-4 h-4" />
                  Retour Portfolio
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}