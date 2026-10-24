import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { experiences } from '../data';
import { periodDuration } from '../lib/dates';
import Experience from './Experience';

describe('Experience', () => {
  it('affiche la section avec un h3 par expérience', () => {
    render(<Experience />);
    expect(screen.getByRole('heading', { level: 2, name: 'Expériences' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(experiences.length);
  });

  it('affiche le rôle, l’entreprise et la période de chaque expérience', () => {
    render(<Experience />);
    const headings = screen.getAllByRole('heading', { level: 3 });
    experiences.forEach((exp, i) => {
      expect(headings[i]?.textContent).toBe(exp.role);
      expect(screen.getAllByText(exp.company).length).toBeGreaterThan(0);
      expect(screen.getByText(exp.period, { exact: false })).toBeInTheDocument();
    });
  });

  it('affiche la durée calculée de chaque expérience à côté de la période', () => {
    render(<Experience />);
    experiences.forEach((exp) => {
      expect(screen.getByText(`· ${periodDuration(exp.start, exp.end)}`, { exact: false })).toBeInTheDocument();
    });
  });

  it('affiche le tag de promotion sur la première expérience', () => {
    render(<Experience />);
    const first = experiences[0];
    expect(first?.promotion).toBeDefined();
    expect(screen.getByText(first?.promotion ?? '')).toBeInTheDocument();
  });

  it('affiche le tag de type sur chaque expérience, promotion comprise', () => {
    render(<Experience />);
    expect(screen.getAllByText('Alternance')).toHaveLength(experiences.length);
  });

  it('liste les compétences de chaque expérience', () => {
    render(<Experience />);
    const lists = screen.getAllByRole('list', { name: /^Compétences chez / });
    expect(lists).toHaveLength(experiences.length);
    experiences.forEach((exp, i) => {
      const labels = within(lists[i] as HTMLElement)
        .getAllByRole('listitem')
        .map((li) => li.textContent);
      expect(labels).toEqual(exp.skills);
    });
  });
});
