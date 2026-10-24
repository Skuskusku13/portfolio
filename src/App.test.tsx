import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeProvider } from './hooks/useTheme';

describe('App', () => {
  it('expose les repères de page et un lien d’évitement vers un contenu focalisable', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    const skipLink = screen.getByRole('link', { name: 'Aller au contenu' });
    expect(skipLink).toHaveAttribute('href', '#main');
    expect(screen.getAllByRole('navigation', { name: 'Sections du site', hidden: true })).toHaveLength(2);
    expect(screen.getByRole('main')).toHaveAttribute('id', 'main');
    expect(screen.getByRole('main')).toHaveAttribute('tabindex', '-1');
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('enchaîne les sections dans l’ordre du menu, chacune sous un titre de niveau 2', () => {
    render(
      <ThemeProvider>
        <App />
      </ThemeProvider>,
    );

    const titles = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent);
    expect(titles).toEqual(['Expériences', 'Projets', 'Compétences', 'Formation', 'Contact']);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Dan Levy');
  });
});
