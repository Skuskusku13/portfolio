import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useActiveSection } from './useActiveSection';
import { FakeIntersectionObserver, installFakeIntersectionObserver } from '../test/fakeIntersectionObserver';

const IDS = ['about', 'experiences', 'contact'];

function addSections(ids: string[]): Record<string, HTMLElement> {
  const map: Record<string, HTMLElement> = {};
  for (const id of ids) {
    const section = document.createElement('section');
    section.id = id;
    document.body.appendChild(section);
    map[id] = section;
  }
  return map;
}

describe('useActiveSection', () => {
  afterEach(() => {
    document.body.innerHTML = '';
    vi.unstubAllGlobals();
  });

  it('renvoie null et n’observe rien sans IntersectionObserver', () => {
    addSections(IDS);
    const { result } = renderHook(() => useActiveSection(IDS));
    expect(result.current).toBeNull();
  });

  describe('avec IntersectionObserver', () => {
    beforeEach(() => {
      installFakeIntersectionObserver();
    });

    it('observe chaque section présente dans le DOM', () => {
      addSections(IDS);
      renderHook(() => useActiveSection(IDS));
      const [io] = FakeIntersectionObserver.instances;
      expect(io.observe).toHaveBeenCalledTimes(3);
    });

    it('ignore les ids absents du DOM', () => {
      addSections(['about']);
      renderHook(() => useActiveSection(IDS));
      const [io] = FakeIntersectionObserver.instances;
      expect(io.observe).toHaveBeenCalledTimes(1);
    });

    it('n’installe aucun observateur si aucune section n’existe', () => {
      renderHook(() => useActiveSection(IDS));
      expect(FakeIntersectionObserver.instances).toHaveLength(0);
    });

    it('active la section visible', () => {
      const sections = addSections(IDS);
      const { result } = renderHook(() => useActiveSection(IDS));
      act(() => FakeIntersectionObserver.instances[0].trigger([{ target: sections.experiences, isIntersecting: true }]));
      expect(result.current).toBe('experiences');
    });

    it('donne la priorité à la première section visible dans l’ordre des ids', () => {
      const sections = addSections(IDS);
      const { result } = renderHook(() => useActiveSection(IDS));
      act(() =>
        FakeIntersectionObserver.instances[0].trigger([
          { target: sections.contact, isIntersecting: true },
          { target: sections.experiences, isIntersecting: true },
        ]),
      );
      expect(result.current).toBe('experiences');
    });

    it('repasse à null quand plus aucune section n’est visible', () => {
      const sections = addSections(IDS);
      const { result } = renderHook(() => useActiveSection(IDS));
      const io = FakeIntersectionObserver.instances[0];
      act(() => io.trigger([{ target: sections.about, isIntersecting: true }]));
      act(() => io.trigger([{ target: sections.about, isIntersecting: false }]));
      expect(result.current).toBeNull();
    });

    it('déconnecte l’observateur au démontage', () => {
      addSections(IDS);
      const { unmount } = renderHook(() => useActiveSection(IDS));
      const [io] = FakeIntersectionObserver.instances;
      unmount();
      expect(io.disconnect).toHaveBeenCalled();
    });
  });
});
