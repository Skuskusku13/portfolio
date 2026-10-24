import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="relative inline-flex size-9 items-center justify-center rounded-md text-ink-2 transition-colors duration-200 before:absolute before:-inset-1 before:content-[''] hover:bg-surface-2 hover:text-ink"
    >
      {/* Comme sur la première version du site : lune bleu nuit, soleil jaune. */}
      {theme === 'light' ? (
        <Moon className="size-[18px] text-moon" strokeWidth={1.5} />
      ) : (
        <Sun className="size-[18px] text-sun" strokeWidth={1.5} />
      )}
    </button>
  );
}
