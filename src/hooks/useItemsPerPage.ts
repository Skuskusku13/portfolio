import { useSyncExternalStore } from 'react';

export interface ItemsPerPageConfig {
  /** < 768 px */
  mobile: number;
  /** 768 – 1023 px */
  tablet: number;
  /** >= 1024 px */
  desktop: number;
}

const DEFAULT: ItemsPerPageConfig = { mobile: 3, tablet: 4, desktop: 6 };

const subscribeResize = (onChange: () => void) => {
  window.addEventListener('resize', onChange);
  return () => window.removeEventListener('resize', onChange);
};

/** Nombre d'éléments par page selon la largeur (3 / 4 / 6 par défaut). */
export function useItemsPerPage(config: ItemsPerPageConfig = DEFAULT): number {
  const read = () => (window.innerWidth < 768 ? config.mobile : window.innerWidth < 1024 ? config.tablet : config.desktop);
  const readServer = () => config.desktop;
  return useSyncExternalStore(subscribeResize, read, readServer);
}
