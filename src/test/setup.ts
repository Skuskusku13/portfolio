import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

/**
 * Environnement jsdom commun à tous les tests.
 * Seules les APIs absentes de jsdom et requises au simple rendu sont simulées ici ;
 * IntersectionObserver, ResizeObserver, fetch et le presse-papiers restent à la charge
 * des tests qui en ont besoin.
 */

// matchMedia est lu dès le montage du ThemeProvider.
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  configurable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// scrollIntoView n'existe pas dans jsdom ; la pagination l'appelle à chaque changement de page.
Element.prototype.scrollIntoView = vi.fn();

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove('light', 'dark', 'js');
  window.localStorage.clear();
});
