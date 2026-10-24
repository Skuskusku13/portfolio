import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Projects from './Projects';

vi.mock('../data', () => ({
  projects: [
    { title: 'Seul projet pro', category: ['pro'], description: 'D', tech: ['PHP'], status: 'En cours' },
  ],
}));

describe('Projects sans résultat', () => {
  it('explique l’absence de projet pour un filtre vide au lieu d’une grille vide', async () => {
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByRole('button', { name: 'Formation' }));

    expect(screen.queryByRole('list', { name: 'Liste des projets' })).not.toBeInTheDocument();
    expect(screen.getByText(/Aucun projet dans cette catégorie/)).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('0 projet affiché');
  });
});
