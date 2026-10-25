import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import DeploymentChain from './DeploymentChain';

describe('DeploymentChain', () => {
  it('affiche une figure avec sa légende et le tag En production', () => {
    render(<DeploymentChain />);
    const figure = screen.getByRole('figure');
    expect(within(figure).getByText('Ce site, du dépôt à votre écran')).toBeInTheDocument();
    expect(within(figure).getByText('En production')).toBeInTheDocument();
  });

  it('liste six étapes dans une liste ordonnée', () => {
    const { container } = render(<DeploymentChain />);
    const list = container.querySelector('ol') as HTMLOListElement;
    expect(within(list).getAllByRole('listitem')).toHaveLength(6);
    expect(list.textContent).toContain('dlyhub.com');
  });

  it('expose cinq liens externes sécurisés, l’étape Réseau n’étant pas un lien', () => {
    render(<DeploymentChain />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(5);
    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link.getAttribute('rel')).toContain('noopener');
      expect(link.getAttribute('href')).toMatch(/^https:\/\//);
    }
    expect(screen.queryByRole('link', { name: 'Réseau' })).toBeNull();
  });

  it('pose la variable CSS --chain-dist du rail sans ResizeObserver', () => {
    const { container } = render(<DeploymentChain />);
    const list = container.querySelector('ol') as HTMLOListElement;
    expect(typeof ResizeObserver).toBe('undefined');
    expect((list.parentElement as HTMLElement).style.getPropertyValue('--chain-dist')).toBe('0px');
  });
});
