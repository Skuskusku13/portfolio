import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';

function renderToggle() {
  return render(
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>,
  );
}

describe('ThemeToggle', () => {
  it('propose de passer en mode sombre en thème clair', () => {
    renderToggle();
    const button = screen.getByRole('button', { name: 'Passer en mode sombre' });
    expect(button).toHaveAttribute('title', 'Passer en mode sombre');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('bascule en mode sombre au clic et met à jour le libellé et le titre', async () => {
    const user = userEvent.setup();
    renderToggle();
    await user.click(screen.getByRole('button', { name: 'Passer en mode sombre' }));
    const button = screen.getByRole('button', { name: 'Passer en mode clair' });
    expect(button).toHaveAttribute('title', 'Passer en mode clair');
    expect(document.documentElement).toHaveClass('dark');
  });

  it('revient en mode clair au second clic', async () => {
    const user = userEvent.setup();
    renderToggle();
    await user.click(screen.getByRole('button'));
    await user.click(screen.getByRole('button'));
    expect(screen.getByRole('button', { name: 'Passer en mode sombre' })).toBeInTheDocument();
  });
});
