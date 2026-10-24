import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import ChipList from './ChipList';

describe('ChipList', () => {
  it('affiche un élément de liste par item', () => {
    render(<ChipList items={['PHP', 'Docker', 'Bash']} />);
    const items = within(screen.getByRole('list')).getAllByRole('listitem');
    expect(items.map((li) => li.textContent)).toEqual(['PHP', 'Docker', 'Bash']);
  });

  it('utilise « Technologies » comme libellé accessible par défaut', () => {
    render(<ChipList items={['PHP']} />);
    expect(screen.getByRole('list', { name: 'Technologies' })).toBeInTheDocument();
  });

  it('accepte un libellé personnalisé et une classe additionnelle', () => {
    render(<ChipList items={['PHP']} label="Outils" className="extra" />);
    expect(screen.getByRole('list', { name: 'Outils' })).toHaveClass('extra');
  });

  it('rend une liste sans élément quand items est vide', () => {
    render(<ChipList items={[]} />);
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });
});
