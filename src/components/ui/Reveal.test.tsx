import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import Reveal from './Reveal';
import { FakeIntersectionObserver, installFakeIntersectionObserver } from '../../test/fakeIntersectionObserver';

describe('Reveal', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('est visible d’emblée sans IntersectionObserver', () => {
    render(<Reveal>Contenu</Reveal>);
    expect(screen.getByText('Contenu')).toHaveClass('reveal', 'is-in');
  });

  describe('avec IntersectionObserver', () => {
    it('n’est pas visible avant l’intersection', () => {
      installFakeIntersectionObserver();
      render(<Reveal>Contenu</Reveal>);
      const el = screen.getByText('Contenu');
      expect(el).not.toHaveClass('is-in');
      expect(FakeIntersectionObserver.instances[0].observe).toHaveBeenCalledWith(el);
    });

    it('devient visible puis se déconnecte à l’intersection', () => {
      installFakeIntersectionObserver();
      render(<Reveal>Contenu</Reveal>);
      const el = screen.getByText('Contenu');
      act(() => FakeIntersectionObserver.instances[0].trigger([{ target: el, isIntersecting: true }]));
      expect(el).toHaveClass('is-in');
      expect(FakeIntersectionObserver.instances[0].disconnect).toHaveBeenCalled();
    });

    it('reste masqué quand l’entrée n’intersecte pas', () => {
      installFakeIntersectionObserver();
      render(<Reveal>Contenu</Reveal>);
      const el = screen.getByText('Contenu');
      act(() => FakeIntersectionObserver.instances[0].trigger([{ target: el, isIntersecting: false }]));
      expect(el).not.toHaveClass('is-in');
    });
  });

  it('pose --reveal-delay en style', () => {
    render(<Reveal delay={240}>Contenu</Reveal>);
    expect(screen.getByText('Contenu').style.getPropertyValue('--reveal-delay')).toBe('240ms');
  });

  it('respecte as, id et className', () => {
    render(
      <Reveal as="section" id="zone" className="extra">
        Contenu
      </Reveal>,
    );
    const el = screen.getByText('Contenu');
    expect(el.tagName).toBe('SECTION');
    expect(el).toHaveAttribute('id', 'zone');
    expect(el).toHaveClass('extra');
  });
});
