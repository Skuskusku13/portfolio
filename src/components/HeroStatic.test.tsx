import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
// `?raw` : le fichier est lu par Vite, sans dépendre des APIs Node dans un test de composant.
import indexHtml from '../../index.html?raw';
import HeroStatic from './HeroStatic';

/** Compare deux fragments HTML une fois parsés par le navigateur (entités et espaces normalisés). */
function normalize(fragment: string): string {
  const div = document.createElement('div');
  div.innerHTML = fragment.trim();
  return div.innerHTML.replace(/\s+/g, ' ');
}

describe('HeroStatic', () => {
  it('rend le nom en h1 et l’énoncé, sans animation', () => {
    const html = renderToStaticMarkup(<HeroStatic />);
    expect(html).toContain('<h1');
    expect(html).toContain('Dan Levy');
    expect(html).not.toContain('reveal');
  });

  it('est strictement identique à la copie statique d’index.html (peinte avant le JavaScript)', () => {
    const match = indexHtml.match(/<!-- hero-static:start -->([\s\S]*?)<!-- hero-static:end -->/);
    expect(match).not.toBeNull();

    expect(normalize(match?.[1] ?? '')).toBe(normalize(renderToStaticMarkup(<HeroStatic />)));
  });
});
