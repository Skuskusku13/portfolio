import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GITHUB_URL, LINKEDIN_URL } from '../config';
import Hero from './Hero';

describe('Hero', () => {
  it('affiche le nom en titre de niveau 1 dans la section #about', () => {
    const { container } = render(<Hero />);
    expect(screen.getByRole('heading', { level: 1, name: 'Dan Levy' })).toBeInTheDocument();
    expect(container.querySelector('section')).toHaveAttribute('id', 'about');
  });

  it('propose le bouton « Me contacter » vers #contact', () => {
    render(<Hero />);
    expect(screen.getByRole('link', { name: 'Me contacter' })).toHaveAttribute('href', '#contact');
  });

  it('propose les boutons LinkedIn et GitHub en nouvel onglet', () => {
    render(<Hero />);
    const linkedin = screen.getByRole('link', { name: 'LinkedIn (nouvelle fenêtre)' });
    const github = screen.getByRole('link', { name: 'GitHub (nouvelle fenêtre)' });
    expect(linkedin).toHaveAttribute('href', LINKEDIN_URL);
    expect(github).toHaveAttribute('href', GITHUB_URL);
    for (const link of [linkedin, github]) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
    }
  });

  it('affiche l’énoncé sous le nom', () => {
    render(<Hero />);
    expect(screen.getByText(/Architecte des Systèmes d'Information\. Conception d'architectures/)).toBeInTheDocument();
  });

  it('inclut la chaîne de déploiement', () => {
    render(<Hero />);
    expect(screen.getByRole('figure')).toBeInTheDocument();
  });
});
