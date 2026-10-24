import { describe, expect, it } from 'vitest';
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Projects from './Projects';
import { projects } from '../data';

const DESKTOP_PER_PAGE = 6;

function setViewportWidth(width: number) {
  window.innerWidth = width;
  act(() => {
    window.dispatchEvent(new Event('resize'));
  });
}

const grid = () => screen.getByRole('list', { name: 'Liste des projets' });
const cards = () => within(grid()).getAllByRole('heading', { level: 3 }).map((h) => h.closest('li') as HTMLElement);
const filterButton = (name: string) => within(screen.getByRole('group', { name: 'Filtrer les projets' })).getByRole('button', { name });

describe('Projects', () => {
  it('affiche la première page de tous les projets avec le filtre « Tous » enfoncé', () => {
    setViewportWidth(1280);
    render(<Projects />);

    expect(filterButton('Tous')).toHaveAttribute('aria-pressed', 'true');
    expect(filterButton('Professionnels')).toHaveAttribute('aria-pressed', 'false');
    expect(cards()).toHaveLength(Math.min(DESKTOP_PER_PAGE, projects.length));
    expect(screen.getByRole('status')).toHaveTextContent(`${projects.length} projets affichés, page 1 sur 2`);
  });

  it('filtre par catégorie et annonce le nombre de résultats', async () => {
    setViewportWidth(1280);
    const user = userEvent.setup();
    render(<Projects />);
    const expected = projects.filter((p) => p.category.includes('formation'));

    await user.click(filterButton('Formation'));

    expect(filterButton('Formation')).toHaveAttribute('aria-pressed', 'true');
    expect(filterButton('Tous')).toHaveAttribute('aria-pressed', 'false');
    expect(cards()).toHaveLength(Math.min(DESKTOP_PER_PAGE, expected.length));
    expect(screen.getByRole('status')).toHaveTextContent(`${expected.length} projets affichés`);
    expected.slice(0, DESKTOP_PER_PAGE).forEach((p) => {
      expect(within(grid()).getByRole('heading', { level: 3, name: p.title })).toBeInTheDocument();
    });
  });

  it('revient à la première page quand le filtre change', async () => {
    setViewportWidth(1280);
    const user = userEvent.setup();
    render(<Projects />);

    await user.click(screen.getByRole('button', { name: 'Suivant' }));
    expect(screen.getByRole('status')).toHaveTextContent('page 2 sur 2');

    await user.click(filterButton('Professionnels'));

    expect(screen.getByRole('status')).not.toHaveTextContent('page 2');
    expect(cards()[0]).toHaveTextContent(projects.filter((p) => p.category.includes('pro'))[0].title);
  });

  it('recadre la page courante quand la largeur réduit le nombre de pages', async () => {
    setViewportWidth(500);
    const user = userEvent.setup();
    render(<Projects />);
    const mobilePages = Math.ceil(projects.length / 3);

    for (let i = 1; i < mobilePages; i += 1) {
      await user.click(screen.getByRole('button', { name: 'Suivant' }));
    }
    expect(screen.getByRole('status')).toHaveTextContent(`page ${mobilePages} sur ${mobilePages}`);

    setViewportWidth(1280);

    expect(screen.getByRole('status')).toHaveTextContent('page 2 sur 2');
  });

  it('nomme chaque lien « Code source » d’après son projet et chaque liste de technologies d’après sa carte', () => {
    setViewportWidth(1280);
    render(<Projects />);
    const single = projects.find((p) => p.githubLinks?.length === 1);
    expect(single).toBeDefined();

    const card = within(grid()).getByRole('heading', { level: 3, name: single?.title }).closest('li') as HTMLElement;

    expect(within(card).getByRole('link', { name: `Code source de ${single?.title} (nouvelle fenêtre)` })).toHaveAttribute(
      'rel',
      'noopener noreferrer',
    );
    expect(within(card).getByRole('list', { name: `Technologies de ${single?.title}` })).toBeInTheDocument();
  });

  it('affiche le statut de chaque projet dans une étiquette', () => {
    setViewportWidth(1280);
    render(<Projects />);

    projects.slice(0, DESKTOP_PER_PAGE).forEach((p) => {
      const card = within(grid()).getByRole('heading', { level: 3, name: p.title }).closest('li') as HTMLElement;
      expect(within(card).getByText(p.status)).toBeInTheDocument();
    });
  });
});
