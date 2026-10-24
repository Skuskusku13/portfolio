import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Contact from './Contact';

vi.mock('../config', () => ({
  MAILER_URL: null,
  EMAIL: 'danlevy149@gmail.com',
  GITHUB_URL: 'https://github.com/Skuskusku13',
  LINKEDIN_URL: 'https://www.linkedin.com/in/dan-levy-a736a2150/',
}));

describe('Contact sans API de contact configurée', () => {
  it('remplace le formulaire par une invitation à écrire directement', () => {
    render(<Contact />);

    expect(screen.queryByRole('form')).not.toBeInTheDocument();
    expect(screen.getByText(/formulaire est indisponible/)).toBeInTheDocument();
    expect(screen.getAllByRole('link', { name: 'danlevy149@gmail.com' }).length).toBeGreaterThan(0);
  });
});
