import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

const TARGET_ID = 'section-cible';

beforeEach(() => {
  const target = document.createElement('section');
  target.id = TARGET_ID;
  document.body.appendChild(target);
});

function renderPagination(currentPage: number, totalPages: number) {
  const onPageChange = vi.fn();
  render(
    <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} scrollTargetId={TARGET_ID} />,
  );
  return onPageChange;
}

describe('Pagination', () => {
  it('ne rend rien quand il n’y a qu’une page', () => {
    const { container } = render(
      <Pagination currentPage={1} totalPages={1} onPageChange={vi.fn()} scrollTargetId={TARGET_ID} />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('annonce la page courante et navigue dans les deux sens', async () => {
    const user = userEvent.setup();
    const onPageChange = renderPagination(2, 3);

    expect(screen.getByText('Page 2 sur 3')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Suivant' }));
    await user.click(screen.getByRole('button', { name: 'Précédent' }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 3);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 1);
  });

  it('ramène la section en haut de l’écran après un clic à la souris', async () => {
    const user = userEvent.setup();
    renderPagination(1, 3);
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    scrollIntoView.mockClear();

    await user.click(screen.getByRole('button', { name: 'Suivant' }));

    expect(scrollIntoView).toHaveBeenCalledTimes(1);
  });

  it('ne fait pas défiler la page quand le bouton est activé au clavier', () => {
    const onPageChange = renderPagination(1, 3);
    const scrollIntoView = vi.mocked(Element.prototype.scrollIntoView);
    scrollIntoView.mockClear();

    fireEvent.click(screen.getByRole('button', { name: 'Suivant' }), { detail: 0 });

    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(scrollIntoView).not.toHaveBeenCalled();
  });

  it('garde les boutons de bout de liste focalisables mais inactifs (aria-disabled)', async () => {
    const user = userEvent.setup();
    const onPageChange = renderPagination(1, 2);
    const previous = screen.getByRole('button', { name: 'Précédent' });

    expect(previous).toHaveAttribute('aria-disabled', 'true');
    expect(previous).not.toBeDisabled();
    await user.click(previous);

    expect(onPageChange).not.toHaveBeenCalled();
    expect(screen.getByRole('button', { name: 'Suivant' })).not.toHaveAttribute('aria-disabled', 'true');
  });

  it('laisse l’annonce du compteur à la région de statut de la section parente', () => {
    renderPagination(1, 2);

    expect(screen.getByText('Page 1 sur 2')).not.toHaveAttribute('aria-live');
  });
});
