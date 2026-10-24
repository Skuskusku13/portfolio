import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Section from './Section';

describe('Section', () => {
  it('affiche un h2, l’id de la section et ses enfants', () => {
    const { container } = render(
      <Section id="exemple" title="Mon titre">
        <p>Corps</p>
      </Section>,
    );
    expect(screen.getByRole('heading', { level: 2, name: 'Mon titre' })).toBeInTheDocument();
    expect(container.querySelector('section')).toHaveAttribute('id', 'exemple');
    expect(screen.getByText('Corps')).toBeInTheDocument();
  });

  it('affiche le chapeau quand il est fourni', () => {
    render(
      <Section id="a" title="T" deck="Une phrase de chapeau">
        <span />
      </Section>,
    );
    expect(screen.getByText('Une phrase de chapeau')).toBeInTheDocument();
  });

  it('n’affiche pas de paragraphe sans chapeau', () => {
    const { container } = render(
      <Section id="a" title="T">
        <span />
      </Section>,
    );
    expect(container.querySelector('header p')).toBeNull();
  });

  it('ajoute la classe additionnelle à la section', () => {
    const { container } = render(
      <Section id="a" title="T" className="extra">
        <span />
      </Section>,
    );
    expect(container.querySelector('section')).toHaveClass('extra');
  });
});
