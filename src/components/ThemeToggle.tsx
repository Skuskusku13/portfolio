import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const label = theme === 'light' ? 'Passer en mode sombre' : 'Passer en mode clair';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center rounded-md text-ink-2 transition-colors duration-200 hover:bg-surface-2 hover:text-ink"
    >
      {theme === 'light' ? <Moon className="size-[18px]" strokeWidth={1.5} /> : <Sun className="size-[18px]" strokeWidth={1.5} />}
    </button>
  );
}
