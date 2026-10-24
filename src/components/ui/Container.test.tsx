import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Container from './Container';

describe('Container', () => {
  it('affiche ses enfants dans une div centrée avec la largeur maximale', () => {
    render(<Container>Contenu</Container>);
    const el = screen.getByText('Contenu');
    expect(el.tagName).toBe('DIV');
    expect(el).toHaveClass('mx-auto', 'w-full', 'max-w-[1200px]');
  });

  it('rend l’élément demandé par as avec une classe additionnelle', () => {
    render(
      <Container as="main" className="extra">
        Principal
      </Container>,
    );
    expect(screen.getByRole('main')).toHaveClass('extra');
  });
});
