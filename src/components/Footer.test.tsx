import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GITHUB_URL, LINKEDIN_URL } from '../config';
import { site } from '../data';
import Footer from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2031-06-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('affiche l’année courante dans la mention de droits', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2031 Dan Levy/)).toBeInTheDocument();
  });

  it('expose les liens GitHub et LinkedIn en nouvel onglet avec rel noopener', () => {
    render(<Footer />);
    const nav = screen.getByRole('navigation', { name: 'Liens de pied de page' });
    for (const [name, url] of [
      ['GitHub (nouvelle fenêtre)', GITHUB_URL],
      ['LinkedIn (nouvelle fenêtre)', LINKEDIN_URL],
    ]) {
      const link = screen.getByRole('link', { name });
      expect(nav).toContainElement(link);
      expect(link).toHaveAttribute('href', url);
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });

  it('renvoie au dépôt du site, première étape de la chaîne de production', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'Code source de ce site (nouvelle fenêtre)' });
    expect(link).toHaveAttribute('href', site.chain[0]?.href);
    expect(link.getAttribute('rel')).toContain('noopener');
  });

  it('propose un lien « Haut de page » vers #about', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: 'Haut de page' })).toHaveAttribute('href', '#about');
  });
});
