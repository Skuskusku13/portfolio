import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Tag from './Tag';

describe('Tag', () => {
  it('affiche le texte dans une étiquette neutre par défaut', () => {
    render(<Tag>Alternance</Tag>);
    const tag = screen.getByText('Alternance');
    expect(tag).toBeInTheDocument();
    expect(tag).toHaveClass('font-mono', 'border-line');
  });

  it('ajoute un point décoratif masqué aux lecteurs d’écran quand dot est vrai', () => {
    const { container } = render(
      <Tag tone="ok" dot>
        En production
      </Tag>,
    );
    const dot = container.querySelector('[aria-hidden="true"]');
    expect(dot).not.toBeNull();
    expect(dot).toHaveClass('bg-ok');
  });

  it('applique la tonalité accent', () => {
    render(<Tag tone="accent">Bac +5</Tag>);
    expect(screen.getByText('Bac +5')).toHaveClass('text-accent');
  });
});
