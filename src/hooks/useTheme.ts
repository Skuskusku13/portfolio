import { useState, useEffect } from 'react';
import faviconLight from '../assets/favicon-light.svg';
import faviconDark from '../assets/favicon-dark.svg';

type Theme = 'light' | 'dark';

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    // 1. Priorité : Préférence utilisateur sauvegardée
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
      return localStorage.getItem('theme') as Theme;
    }
    // 2. Sinon : Préférence système
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    // 3. Par défaut
    return 'light';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);

    // Update Favicon
    const link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (link) {
        link.href = theme === 'dark' ? faviconDark : faviconLight;
    }

  }, [theme]);

  // Écouter les changements système (OS) uniquement si l'utilisateur n'a pas forcé un mode
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = () => {
      // Si aucune préférence n'est sauvegardée dans le localStorage, on suit le système
      if (!localStorage.getItem('theme')) {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      // Quand l'utilisateur clique, on sauvegarde son choix explicitement
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  };

  return { theme, toggleTheme };
}