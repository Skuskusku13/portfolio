import { describe, expect, it } from 'vitest';
import { formatDuration, isYearMonth, monthsBetween, periodDuration, toYearMonth } from './dates';

describe('dates', () => {
  it('reconnaît le format AAAA-MM', () => {
    expect(isYearMonth('2024-01')).toBe(true);
    expect(isYearMonth('2024-13')).toBe(false);
    expect(isYearMonth('2024-1')).toBe(false);
    expect(isYearMonth('janv. 2024')).toBe(false);
  });

  it('compte les mois bornes incluses', () => {
    expect(monthsBetween('2024-01', '2024-01')).toBe(1);
    expect(monthsBetween('2023-09', '2024-01')).toBe(5);
    expect(monthsBetween('2021-10', '2023-08')).toBe(23);
    expect(monthsBetween('2024-01', '2026-10')).toBe(34);
  });

  it('refuse un mois mal formé', () => {
    expect(() => monthsBetween('2024-1', '2024-02')).toThrow(RangeError);
  });

  it('écrit la durée en années et mois, jamais vide', () => {
    expect(formatDuration(1)).toBe('1 mois');
    expect(formatDuration(5)).toBe('5 mois');
    expect(formatDuration(12)).toBe('1 an');
    expect(formatDuration(13)).toBe('1 an 1 mois');
    expect(formatDuration(34)).toBe('2 ans 10 mois');
    expect(formatDuration(0)).toBe('1 mois');
  });

  it('calcule une période en cours jusqu’au mois courant', () => {
    const now = new Date(2026, 9, 24);
    expect(toYearMonth(now)).toBe('2026-10');
    expect(periodDuration('2024-01', undefined, now)).toBe('2 ans 10 mois');
    expect(periodDuration('2023-09', '2024-01', now)).toBe('5 mois');
  });
});
