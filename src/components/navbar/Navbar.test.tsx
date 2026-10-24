import { describe, expect, it, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Navbar from './index';
import { ThemeProvider } from '../../hooks/useTheme';

type MediaHandler = (event: { matches: boolean }) => void;

/** matchMedia qui mémorise les écouteurs « change » par requête, pour simuler un passage en desktop. */
function installMatchMedia(): Map<string, MediaHandler> {
  const handlers = new Map<string, MediaHandler>();
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: (_type: string, handler: MediaHandler) => handlers.set(query, handler),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
  return handlers;
}

function renderNavbar() {
  return render(
    <ThemeProvider>
      <Navbar />
      <button type="button">Hors en-tête</button>
    </ThemeProvider>,
  );
}

const menuButton = () => screen.getByRole('button', { name: 'Menu' });
const panel = () => document.getElementById('menu-mobile') as HTMLElement;

describe('Navbar', () => {
  it('garde un nom fixe sur le bouton de menu et expose son état par aria-expanded', async () => {
    const user = userEvent.setup();
    renderNavbar();

    expect(menuButton()).toHaveAttribute('aria-expanded', 'false');
    expect(panel()).toHaveAttribute('hidden');

    await user.click(menuButton());

    expect(menuButton()).toHaveAttribute('aria-expanded', 'true');
    expect(menuButton()).toHaveAccessibleName('Menu');
    expect(panel()).not.toHaveAttribute('hidden');
  });

  it('place le focus sur le premier lien à l’ouverture', async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(menuButton());

    const firstLink = within(panel()).getAllByRole('link')[0];
    expect(firstLink).toHaveFocus();
  });

  it('ferme le menu avec Échap et rend le focus au bouton', async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(menuButton());

    await user.keyboard('{Escape}');

    expect(panel()).toHaveAttribute('hidden');
    expect(menuButton()).toHaveFocus();
  });

  it('ferme le menu quand on clique hors de l’en-tête', async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(menuButton());

    fireEvent.pointerDown(document.body);

    expect(panel()).toHaveAttribute('hidden');
  });

  it('ferme le menu au clic sur un lien de section', async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(menuButton());

    await user.click(within(panel()).getByRole('link', { name: 'Projets' }));

    expect(panel()).toHaveAttribute('hidden');
  });

  it('ferme le menu quand le focus clavier quitte l’en-tête (2.4.11)', async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(menuButton());
    const links = within(panel()).getAllByRole('link');
    const lastLink = links[links.length - 1];
    const outside = screen.getByRole('button', { name: 'Hors en-tête' });

    fireEvent.focusOut(lastLink as HTMLElement, { relatedTarget: outside });

    expect(panel()).toHaveAttribute('hidden');
  });

  it('garde le menu ouvert quand le focus se déplace à l’intérieur de l’en-tête', async () => {
    const user = userEvent.setup();
    renderNavbar();
    await user.click(menuButton());
    const [first, second] = within(panel()).getAllByRole('link');

    fireEvent.focusOut(first as HTMLElement, { relatedTarget: second });

    expect(panel()).not.toHaveAttribute('hidden');
  });

  it('ferme le menu quand la fenêtre passe en largeur desktop', async () => {
    const handlers = installMatchMedia();
    const user = userEvent.setup();
    renderNavbar();
    await user.click(menuButton());

    const onDesktop = handlers.get('(min-width: 1024px)');
    expect(onDesktop).toBeDefined();
    act(() => onDesktop?.({ matches: true }));

    expect(panel()).toHaveAttribute('hidden');
    expect(menuButton()).toHaveAttribute('aria-expanded', 'false');
  });

  it('expose une navigation desktop, une navigation mobile masquée et le bouton principal de contact', () => {
    renderNavbar();

    expect(screen.getAllByRole('navigation', { name: 'Sections du site' })).toHaveLength(1);
    expect(screen.getAllByRole('navigation', { name: 'Sections du site', hidden: true })).toHaveLength(2);
    expect(screen.getByRole('link', { name: /^Me contacter/ })).toHaveAttribute('href', '#contact');
    // Aucune section active (hero à l'écran) : le bouton de la barre reste en retrait, le hero porte l'accent.
    expect(screen.getByRole('link', { name: /^Me contacter/ })).toHaveClass('bg-surface');
  });
});
