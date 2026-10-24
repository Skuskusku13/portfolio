import { describe, expect, it } from 'vitest';
import { ContentError, parseExperiences, parseFormations, parseProjects, parseSite, parseSkillGroups } from './schema';

const experience = {
  company: 'Acme',
  role: 'Développeuse',
  period: '2024 - 2026',
  type: 'CDI',
  summary: 'Back-end.',
  skills: ['PHP'],
};
const project = { title: 'P1', category: ['pro'], description: 'D', tech: ['PHP'], status: 'En cours' };
const skills = {
  backend: ['PHP'],
  databases: ['MySQL'],
  devops: ['Docker'],
  frontend: ['React'],
  network_security: ['TLS'],
  os: ['Debian'],
  project_management: ['Scrum'],
  self_hosted: ['Pi-hole'],
  tools: ['n8n'],
};

describe('schema du contenu', () => {
  it('accepte des données valides et conserve les champs optionnels', () => {
    expect(parseExperiences([{ ...experience, promotion: 'CDI' }])[0]?.promotion).toBe('CDI');
    expect(parseFormations([{ school: 'S', diploma: 'D', specialization: 'Sp', period: 'P', level: 'Bac +5' }])).toHaveLength(1);
    const parsed = parseProjects([{ ...project, githubLinks: [{ label: 'Code', url: 'https://github.com/x' }] }]);
    expect(parsed[0]?.githubLinks?.[0]?.url).toBe('https://github.com/x');
    expect(parseSkillGroups(skills).data_ai).toBeUndefined();
    expect(parseSkillGroups({ ...skills, data_ai: ['Pandas'] }).data_ai).toEqual(['Pandas']);
    expect(parseSite({ facts: ['F'], chain: [{ title: 'Code', detail: 'React' }] }).chain[0]?.href).toBeUndefined();
  });

  it('nomme le chemin fautif dans l’erreur', () => {
    expect(() => parseExperiences([{ ...experience, company: '' }])).toThrow(/experiences\[0\]\.company/);
    expect(() => parseExperiences([{ ...experience, skills: [] }])).toThrow(/experiences\[0\]\.skills/);
    expect(() => parseProjects([{ ...project, status: 'Bientôt' }])).toThrow(/projects\[0\]\.status/);
    expect(() => parseProjects([{ ...project, category: ['interne'] }])).toThrow(/projects\[0\]\.category\[0\]/);
    expect(() => parseProjects([{ ...project, githubLinks: [{ label: 'x', url: 'http://pas-https' }] }])).toThrow(
      /githubLinks\[0\]\.url.*https/,
    );
    expect(() => parseSite({ facts: ['F'], chain: [] })).toThrow(/site\.chain/);
    expect(() => parseSite({ facts: [], chain: [{ title: 'C', detail: 'D' }] })).toThrow(/site\.facts/);
  });

  it('refuse un doublon dans une liste de textes (pastilles, faits : clés d’affichage)', () => {
    expect(() => parseExperiences([{ ...experience, skills: ['PHP', 'PHP'] }])).toThrow(/experiences\[0\]\.skills.*doublon/);
  });

  it('refuse un titre de projet en double (il sert de clé React)', () => {
    expect(() => parseProjects([project, { ...project }])).toThrow(ContentError);
    expect(() => parseProjects([project, { ...project }])).toThrow(/titre en double/);
  });

  it('refuse une famille de compétences inconnue ou manquante', () => {
    expect(() => parseSkillGroups({ ...skills, cloud: ['AWS'] })).toThrow(/skills\.cloud/);
    const { tools, ...incomplete } = skills;
    void tools;
    expect(() => parseSkillGroups(incomplete)).toThrow(/skills\.tools/);
  });

  it('refuse ce qui n’est pas une liste ou un objet', () => {
    expect(() => parseExperiences({})).toThrow(/liste attendue/);
    expect(() => parseExperiences(['texte'])).toThrow(/objet attendu/);
    expect(() => parseSkillGroups([])).toThrow(/objet attendu/);
  });
});
