import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('rend un lien avec href, target et rel quand href est fourni', () => {
    render(
      <Button href="https://exemple.fr" target="_blank" rel="noopener noreferrer">
        Visiter
      </Button>,
    );
    const link = screen.getByRole('link', { name: 'Visiter (nouvelle fenêtre)' });
    expect(link).toHaveAttribute('href', 'https://exemple.fr');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('n’annonce pas de nouvelle fenêtre pour un lien interne', () => {
    render(<Button href="#contact">Me contacter</Button>);
    expect(screen.getByRole('link', { name: 'Me contacter' })).toBeInTheDocument();
  });

  it('reste focalisable mais inactif quand aria-disabled est posé', () => {
    render(
      <Button aria-disabled="true" onClick={() => undefined}>
        Précédent
      </Button>,
    );
    const button = screen.getByRole('button', { name: 'Précédent' });
    expect(button).not.toBeDisabled();
    expect(button).toHaveClass('aria-disabled:pointer-events-none', 'aria-disabled:opacity-50');
  });

  it('rend un bouton de type button par défaut', () => {
    render(<Button>Valider</Button>);
    expect(screen.getByRole('button', { name: 'Valider' })).toHaveAttribute('type', 'button');
  });

  it('respecte le type submit', () => {
    render(<Button type="submit">Envoyer</Button>);
    expect(screen.getByRole('button', { name: 'Envoyer' })).toHaveAttribute('type', 'submit');
  });

  it('applique la variante primary et la taille md par défaut', () => {
    render(<Button>Action</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-accent', 'h-11');
  });

  it('applique les variantes secondary et ghost', () => {
    render(
      <>
        <Button variant="secondary">Second</Button>
        <Button variant="ghost">Fantôme</Button>
      </>,
    );
    expect(screen.getByRole('button', { name: 'Second' })).toHaveClass('border-line', 'bg-surface');
    expect(screen.getByRole('button', { name: 'Fantôme' })).toHaveClass('text-ink-2');
  });

  it('applique la taille sm et la classe additionnelle', () => {
    render(
      <Button size="sm" className="extra">
        Petit
      </Button>,
    );
    expect(screen.getByRole('button')).toHaveClass('h-9', 'extra');
  });

  it('appelle onClick au clic', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Clic</Button>);
    await user.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('désactive le bouton et ignore le clic quand disabled', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Inactif
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    await user.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('ne transmet pas variant ni size au DOM', () => {
    render(
      <Button variant="ghost" size="sm">
        X
      </Button>,
    );
    const button = screen.getByRole('button');
    expect(button).not.toHaveAttribute('variant');
    expect(button).not.toHaveAttribute('size');
  });
});
