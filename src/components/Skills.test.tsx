import { describe, expect, it } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Skills from './Skills';
import { skills } from '../data';

const FAMILIES = Object.values(skills).filter((items) => items && items.length > 0).length;

function setViewportWidth(width: number) {
  window.innerWidth = width;
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
}

const headings = () => screen.getAllByRole('heading', { level: 3 });

describe('Skills', () => {
  it('affiche toutes les familles sur desktop, sans pagination', () => {
    setViewportWidth(1280);
    render(<Skills />);

    expect(headings()).toHaveLength(FAMILIES);
    expect(screen.queryByRole('navigation', { name: 'Pagination' })).not.toBeInTheDocument();
  });

  it('pagine par cinq sur mobile et annonce la page courante', async () => {
    setViewportWidth(500);
    const user = userEvent.setup();
    render(<Skills />);
    const pages = Math.ceil(FAMILIES / 5);

    expect(headings()).toHaveLength(5);
    expect(screen.getByRole('status')).toHaveTextContent(`${FAMILIES} familles affichées, page 1 sur ${pages}`);

    await user.click(screen.getByRole('button', { name: 'Suivant' }));

    expect(headings()).toHaveLength(FAMILIES - 5);
    expect(screen.getByRole('status')).toHaveTextContent(`page 2 sur ${pages}`);
  });

  it('nomme chaque liste de pastilles d’après sa famille', () => {
    setViewportWidth(1280);
    render(<Skills />);

    const backend = screen.getByRole('list', { name: 'Compétences Back-end' });
    expect(within(backend).getAllByRole('listitem')).toHaveLength(skills.backend.length);
    expect(within(backend).getByText('Symfony')).toBeInTheDocument();
  });
});
