import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { formatParisTime, useParisTime } from './useParisTime';

describe('useParisTime', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    // 12:04:30 UTC un 24 octobre : heure d'été à Paris (UTC+2).
    vi.setSystemTime(new Date('2026-10-24T12:04:30Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('formate l’heure de Paris sur deux chiffres', () => {
    expect(formatParisTime(new Date('2026-10-24T12:04:30Z'))).toBe('14:04');
    expect(formatParisTime(new Date('2026-01-24T08:05:00Z'))).toBe('09:05');
  });

  it('donne l’heure courante puis avance au changement de minute', () => {
    const { result, unmount } = renderHook(() => useParisTime());
    expect(result.current).toBe('14:04');

    act(() => {
      vi.advanceTimersByTime(30_000);
    });
    expect(result.current).toBe('14:05');

    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(result.current).toBe('14:06');

    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
