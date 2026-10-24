import { afterEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useItemsPerPage } from './useItemsPerPage';

const DEFAULT_WIDTH = 1024;

function resizeTo(width: number) {
  act(() => {
    window.innerWidth = width;
    window.dispatchEvent(new Event('resize'));
  });
}

describe('useItemsPerPage', () => {
  afterEach(() => {
    window.innerWidth = DEFAULT_WIDTH;
    vi.restoreAllMocks();
  });

  it('renvoie la valeur desktop par défaut à 1024 px', () => {
    const { result } = renderHook(() => useItemsPerPage());
    expect(result.current).toBe(6);
  });

  it('passe en mobile sous 768 px après un redimensionnement', () => {
    const { result } = renderHook(() => useItemsPerPage());
    resizeTo(500);
    expect(result.current).toBe(3);
  });

  it('passe en tablette entre 768 et 1023 px', () => {
    const { result } = renderHook(() => useItemsPerPage());
    resizeTo(800);
    expect(result.current).toBe(4);
  });

  it('applique la limite exacte de 768 px à la tablette', () => {
    const { result } = renderHook(() => useItemsPerPage());
    resizeTo(768);
    expect(result.current).toBe(4);
  });

  it('utilise la configuration personnalisée', () => {
    const config = { mobile: 5, tablet: 6, desktop: 9 };
    const { result } = renderHook(() => useItemsPerPage(config));
    expect(result.current).toBe(9);
    resizeTo(500);
    expect(result.current).toBe(5);
    resizeTo(900);
    expect(result.current).toBe(6);
  });

  it('retire l’écouteur de redimensionnement au démontage', () => {
    const removeSpy = vi.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useItemsPerPage());
    unmount();
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});
