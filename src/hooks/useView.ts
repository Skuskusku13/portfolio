import { useState, useEffect } from 'react';

export type View = 'portfolio' | 'portal';

export function useView(): [View, (view: View) => void] {
  // 1. Initialisation basée sur l'URL actuelle
  const [view, setView] = useState<View>(
    window.location.hash === '#portal' ? 'portal' : 'portfolio'
  );

  // 2. Écouter les changements de hash
  useEffect(() => {
    const handleHashChange = () => {
      const isPortal = window.location.hash === '#portal';
      setView(isPortal ? 'portal' : 'portfolio');
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // 3. Fonction pour changer de vue proprement
  const changeView = (newView: View) => {
    if (newView === 'portal') {
      window.location.hash = 'portal';
    } else {
      // Nettoie l'URL sans recharger la page
      window.history.pushState(null, '', window.location.pathname);
      setView('portfolio'); // Force la mise à jour
    }
  };

  return [view, changeView];
}