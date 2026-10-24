import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('affiche ses enfants dans une div avec les classes de base', () => {
    render(<Card>Contenu</Card>);
    const card = screen.getByText('Contenu');
    expect(card.tagName).toBe('DIV');
    expect(card).toHaveClass('rounded-lg', 'border-line', 'bg-surface', 'p-6');
  });

  it('rend l’élément demandé par as et ajoute la classe additionnelle', () => {
    render(
      <ul>
        <Card as="li" className="extra">
          Entrée
        </Card>
      </ul>,
    );
    expect(screen.getByRole('listitem')).toHaveClass('extra');
  });

  it('transmet le délai d’entrée à Reveal', () => {
    render(<Card delay={120}>Retardée</Card>);
    expect(screen.getByText('Retardée').style.getPropertyValue('--reveal-delay')).toBe('120ms');
  });
});
