import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { formations } from '../data';
import Education from './Education';

describe('Education', () => {
  it('affiche la section Formation avec trois cartes', () => {
    render(<Education />);
    expect(screen.getByRole('heading', { level: 2, name: 'Formation' })).toBeInTheDocument();
    expect(formations).toHaveLength(3);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(3);
  });

  it('affiche le diplôme, la spécialité, l’école et la période de chaque formation', () => {
    render(<Education />);
    formations.forEach((f) => {
      expect(screen.getByRole('heading', { level: 3, name: f.diploma })).toBeInTheDocument();
      expect(screen.getByText(f.specialization)).toBeInTheDocument();
      expect(screen.getByText(f.period)).toBeInTheDocument();
    });
    expect(screen.getAllByText('CFA INSTA')).toHaveLength(formations.length);
  });

  it('affiche le niveau de chaque formation dans un tag', () => {
    render(<Education />);
    formations.forEach((f) => {
      expect(screen.getByText(f.level)).toBeInTheDocument();
    });
  });
});
