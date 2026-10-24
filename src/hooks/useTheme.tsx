import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import faviconLight from '../assets/favicon-light.svg';
import faviconDark from '../assets/favicon-dark.svg';
import { ThemeContext, type Theme } from './themeContext';

const THEME_COLORS: Record<Theme, string> = { light: '#f4f6fb', dark: '#0a1124' };

function readSavedTheme(): Theme | null {
  try {
    const saved = localStorage.getItem('theme');
    return saved === 'dark' || saved === 'light' ? saved : null;
  } catch {
    return null; /* stockage indisponible (navigation privée, cookies bloqués) */
  }
}

function saveTheme(theme: Theme): void {
  try {
    localStorage.setItem('theme', theme);
  } catch {
    /* stockage indisponible : le choix vaut pour la session, sans message (compromis assumé) */
  }
}

/**
 * Thème initial : la classe posée par le script inline d'index.html avant le premier
 * rendu fait foi (pas de flash). Repli : préférence sauvegardée, puis préférence système.
 */
function getInitialTheme(): Theme {
  if (typeof document === 'undefined') return 'light';
  const root = document.documentElement;
  if (root.classList.contains('dark')) return 'dark';
  if (root.classList.contains('light')) return 'light';
  return readSavedTheme() ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  // Un choix explicite (bascule) prime sur le système pour toute la session, même si le stockage a échoué.
  const userChose = useRef(readSavedTheme() !== null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    const link = document.getElementById('favicon');
    if (link instanceof HTMLLinkElement) link.href = theme === 'dark' ? faviconDark : faviconLight;

    // La couleur de la barre du navigateur suit le thème choisi, pas seulement le système.
    document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]').forEach((meta) => {
      meta.content = THEME_COLORS[theme];
    });
  }, [theme]);

  // Suivre le système tant que l'utilisateur n'a pas forcé un mode.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!userChose.current) setTheme(mediaQuery.matches ? 'dark' : 'light');
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // La persistance est un effet de bord : elle reste hors de l'updater de setState (pur).
  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    userChose.current = true;
    saveTheme(next);
    setTheme(next);
  }, [theme]);

  const value = useMemo(() => ({ theme, toggleTheme }), [theme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
