import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../../hooks/useTheme';
import { useTheme } from '../../hooks/useThemeContext';
import NavbarBrand from './NavbarBrand';

function ToggleButton() {
  const { toggleTheme } = useTheme();
  return <button onClick={toggleTheme}>basculer</button>;
}

describe('NavbarBrand', () => {
  it('affiche un lien vers #about avec un nom accessible explicite', () => {
    render(
      <ThemeProvider>
        <NavbarBrand />
      </ThemeProvider>,
    );
    const link = screen.getByRole('link', { name: 'Dan Levy, revenir en haut de la page' });
    expect(link).toHaveAttribute('href', '#about');
  });

  it('rend le logo décoratif avec un alt vide', () => {
    const { container } = render(
      <ThemeProvider>
        <NavbarBrand />
      </ThemeProvider>,
    );
    const img = container.querySelector('img');
    expect(img).toHaveAttribute('alt', '');
  });

  it('change la source du logo en thème sombre', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <ThemeProvider>
        <NavbarBrand />
        <ToggleButton />
      </ThemeProvider>,
    );
    const lightSrc = container.querySelector('img')?.getAttribute('src');
    await user.click(screen.getByRole('button', { name: 'basculer' }));
    const darkSrc = container.querySelector('img')?.getAttribute('src');
    expect(darkSrc).not.toBe(lightSrc);
  });
});
