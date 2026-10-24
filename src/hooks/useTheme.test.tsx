import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';
import { ThemeProvider } from './useTheme';
import { useTheme } from './useThemeContext';

const wrapper = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;

type ChangeHandler = () => void;

/** Remplace matchMedia et expose le handler `change` enregistré par le provider. */
function mockSystemTheme(matches: boolean) {
  let handler: ChangeHandler | undefined;
  const mql = {
    matches,
    media: '(prefers-color-scheme: dark)',
    addEventListener: vi.fn((_type: string, cb: ChangeHandler) => {
      handler = cb;
    }),
    removeEventListener: vi.fn(),
  };
  window.matchMedia = vi.fn().mockReturnValue(mql);
  return {
    mql,
    fire(nextMatches: boolean) {
      mql.matches = nextMatches;
      handler?.();
    },
  };
}

describe('useTheme', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
  });

  afterEach(() => {
    document.head.innerHTML = '';
  });

  it('lève une erreur hors du ThemeProvider', () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useTheme())).toThrow('useTheme must be used within a ThemeProvider');
    errorSpy.mockRestore();
  });

  it('lit le thème initial depuis la classe dark posée sur <html>', () => {
    document.documentElement.classList.add('dark');
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('dark');
  });

  it('lit le thème initial depuis la classe light posée sur <html>', () => {
    mockSystemTheme(true);
    document.documentElement.classList.add('light');
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('light');
  });

  it('lit le thème sauvegardé dans localStorage quand <html> n’a pas de classe', () => {
    mockSystemTheme(false);
    localStorage.setItem('theme', 'dark');
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('dark');
  });

  it('retombe sur la préférence système sombre sans sauvegarde', () => {
    mockSystemTheme(true);
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('dark');
  });

  it('retombe sur le thème clair quand le système ne demande pas le sombre', () => {
    mockSystemTheme(false);
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('light');
  });

  it('pose la classe, le favicon et la couleur de thème selon le thème', () => {
    mockSystemTheme(true);
    document.head.innerHTML =
      '<link id="favicon" rel="icon" href="initial.svg"><meta name="theme-color" content="#000"><meta name="theme-color" content="#000" media="(prefers-color-scheme: dark)">';
    renderHook(() => useTheme(), { wrapper });
    expect(document.documentElement).toHaveClass('dark');
    expect(document.documentElement).not.toHaveClass('light');
    expect((document.getElementById('favicon') as HTMLLinkElement).getAttribute('href')).not.toBe('initial.svg');
    const metas = document.querySelectorAll<HTMLMetaElement>('meta[name="theme-color"]');
    expect(Array.from(metas).map((m) => m.content)).toEqual(['#0a1020', '#0a1020']);
  });

  it('met à jour la couleur de thème en clair', () => {
    mockSystemTheme(false);
    document.head.innerHTML = '<meta name="theme-color" content="#000">';
    renderHook(() => useTheme(), { wrapper });
    expect(document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')?.content).toBe('#f5f5f7');
  });

  it('bascule le thème et le persiste dans localStorage', () => {
    mockSystemTheme(false);
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement).toHaveClass('dark');
    act(() => result.current.toggleTheme());
    expect(result.current.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('suit le changement du système tant que rien n’est sauvegardé', () => {
    const system = mockSystemTheme(false);
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => system.fire(true));
    expect(result.current.theme).toBe('dark');
  });

  it('ignore le changement du système quand un thème est sauvegardé', () => {
    const system = mockSystemTheme(false);
    localStorage.setItem('theme', 'light');
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => system.fire(true));
    expect(result.current.theme).toBe('light');
  });

  it('retire l’écouteur système au démontage', () => {
    const system = mockSystemTheme(false);
    const { unmount } = renderHook(() => useTheme(), { wrapper });
    unmount();
    expect(system.mql.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });
});
