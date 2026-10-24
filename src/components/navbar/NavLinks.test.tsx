import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavLinks from './NavLinks';
import { menuItems } from './items';

describe('NavLinks', () => {
  it('rend un lien par entrée de menu, vers son ancre', () => {
    render(<NavLinks />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(menuItems.length);
    menuItems.forEach((item, i) => expect(links[i]).toHaveAttribute('href', item.href));
  });

  it('signale la section courante avec aria-current="location" (desktop)', () => {
    render(<NavLinks activeId="projects" />);

    expect(screen.getByRole('link', { name: 'Projets' })).toHaveAttribute('aria-current', 'location');
    expect(screen.getByRole('link', { name: 'Formation' })).not.toHaveAttribute('aria-current');
  });

  it('distingue le lien actif du menu mobile autrement que par la couleur', () => {
    render(<NavLinks variant="mobile" activeId="skills" />);

    expect(screen.getByRole('link', { name: 'Compétences' })).toHaveClass('border-ink');
    expect(screen.getByRole('link', { name: 'Projets' })).toHaveClass('border-transparent');
  });

  it('prévient le parent quand un lien est activé', async () => {
    const user = userEvent.setup();
    const onItemClick = vi.fn();
    render(<NavLinks onItemClick={onItemClick} />);

    await user.click(screen.getByRole('link', { name: 'Formation' }));

    expect(onItemClick).toHaveBeenCalledTimes(1);
  });
});
