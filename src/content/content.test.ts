import { describe, expect, it } from 'vitest';
import { experiences, formations, projects, site, skills } from '../data';

/** Le contenu réel du site passe le schéma (sinon l'import ci-dessus aurait levé une ContentError). */
describe('contenu du site', () => {
  it('charge trois expériences, trois formations et douze projets', () => {
    expect(experiences).toHaveLength(3);
    expect(formations).toHaveLength(3);
    expect(projects).toHaveLength(12);
  });

  it('place le poste actuel en premier, avec sa promotion', () => {
    expect(experiences[0].company).toBe('Meilleurtaux Placement');
    expect(experiences[0].promotion).toMatch(/CDI/);
  });

  it('expose neuf familles de compétences actives', () => {
    const active = Object.values(skills).filter((items) => items && items.length > 0);
    expect(active).toHaveLength(9);
  });

  it('décrit la chaîne de production en six étapes, dont cinq avec une preuve publique', () => {
    expect(site.chain).toHaveLength(6);
    expect(site.chain.filter((step) => step.href)).toHaveLength(5);
    expect(site.facts).toHaveLength(3);
  });
});
