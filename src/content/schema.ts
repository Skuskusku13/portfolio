import {
  PROJECT_CATEGORIES,
  PROJECT_STATUSES,
  SKILL_GROUP_KEYS,
  type ChainStep,
  type Experience,
  type Formation,
  type Project,
  type ProjectCategory,
  type ProjectLink,
  type ProjectStatus,
  type SiteContent,
  type SkillGroups,
} from '../types';

/**
 * Validation du contenu JSON (src/content/*.json) au chargement du module de données.
 * Écrite à la main, sans dépendance (Zod aurait ajouté plusieurs
 * kilo-octets au bundle pour cinq fichiers). Une erreur nomme le chemin fautif
 * (ex. « projects[3].status ») et fait échouer le démarrage en dev et la suite de tests,
 * jamais silencieusement en production.
 */
export class ContentError extends Error {
  constructor(path: string, message: string) {
    super(`Contenu invalide (${path}) : ${message}`);
    this.name = 'ContentError';
  }
}

type Raw = Record<string, unknown>;

function record(value: unknown, path: string): Raw {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new ContentError(path, 'objet attendu');
  return value as Raw;
}

function list(value: unknown, path: string): unknown[] {
  if (!Array.isArray(value)) throw new ContentError(path, 'liste attendue');
  return value;
}

function text(raw: Raw, key: string, path: string): string {
  const value = raw[key];
  if (typeof value !== 'string' || value.trim() === '') throw new ContentError(`${path}.${key}`, 'texte non vide attendu');
  return value;
}

function optionalText(raw: Raw, key: string, path: string): string | undefined {
  if (raw[key] === undefined) return undefined;
  return text(raw, key, path);
}

function textList(raw: Raw, key: string, path: string, { allowEmpty = false } = {}): string[] {
  const items = list(raw[key], `${path}.${key}`);
  if (!allowEmpty && items.length === 0) throw new ContentError(`${path}.${key}`, 'au moins un élément attendu');
  const texts = items.map((item, i) => {
    if (typeof item !== 'string' || item.trim() === '') throw new ContentError(`${path}.${key}[${i}]`, 'texte non vide attendu');
    return item;
  });
  const duplicate = texts.find((text, i) => texts.indexOf(text) !== i);
  if (duplicate !== undefined) throw new ContentError(`${path}.${key}`, `doublon « ${duplicate} » (sert de clé d'affichage)`);
  return texts;
}

function oneOf<T extends string>(value: unknown, allowed: readonly T[], path: string): T {
  if (typeof value !== 'string' || !(allowed as readonly string[]).includes(value)) {
    throw new ContentError(path, `valeur attendue parmi ${allowed.join(', ')}`);
  }
  return value as T;
}

function httpsUrl(raw: Raw, key: string, path: string): string {
  const value = text(raw, key, path);
  if (!value.startsWith('https://')) throw new ContentError(`${path}.${key}`, 'URL https attendue');
  return value;
}

export function parseExperiences(input: unknown): Experience[] {
  return list(input, 'experiences').map((item, i) => {
    const path = `experiences[${i}]`;
    const raw = record(item, path);
    return {
      company: text(raw, 'company', path),
      role: text(raw, 'role', path),
      period: text(raw, 'period', path),
      type: text(raw, 'type', path),
      promotion: optionalText(raw, 'promotion', path),
      summary: text(raw, 'summary', path),
      skills: textList(raw, 'skills', path),
    };
  });
}

export function parseFormations(input: unknown): Formation[] {
  return list(input, 'formations').map((item, i) => {
    const path = `formations[${i}]`;
    const raw = record(item, path);
    return {
      school: text(raw, 'school', path),
      diploma: text(raw, 'diploma', path),
      specialization: text(raw, 'specialization', path),
      period: text(raw, 'period', path),
      level: text(raw, 'level', path),
    };
  });
}

function parseLinks(raw: Raw, path: string): ProjectLink[] | undefined {
  if (raw.githubLinks === undefined) return undefined;
  return list(raw.githubLinks, `${path}.githubLinks`).map((item, i) => {
    const linkPath = `${path}.githubLinks[${i}]`;
    const link = record(item, linkPath);
    return { label: text(link, 'label', linkPath), url: httpsUrl(link, 'url', linkPath) };
  });
}

export function parseProjects(input: unknown): Project[] {
  const projects = list(input, 'projects').map((item, i) => {
    const path = `projects[${i}]`;
    const raw = record(item, path);
    const category = textList(raw, 'category', path).map((c, j): ProjectCategory =>
      oneOf(c, PROJECT_CATEGORIES, `${path}.category[${j}]`),
    );
    const status: ProjectStatus = oneOf(raw.status, PROJECT_STATUSES, `${path}.status`);
    return {
      title: text(raw, 'title', path),
      category,
      description: text(raw, 'description', path),
      tech: textList(raw, 'tech', path),
      status,
      githubLinks: parseLinks(raw, path),
    };
  });
  const titles = new Set<string>();
  projects.forEach((project, i) => {
    if (titles.has(project.title)) throw new ContentError(`projects[${i}].title`, 'titre en double (sert de clé)');
    titles.add(project.title);
  });
  return projects;
}

export function parseSkillGroups(input: unknown): SkillGroups {
  const raw = record(input, 'skills');
  const unknownKey = Object.keys(raw).find((key) => !(SKILL_GROUP_KEYS as readonly string[]).includes(key));
  if (unknownKey !== undefined) throw new ContentError(`skills.${unknownKey}`, `famille inconnue (attendu : ${SKILL_GROUP_KEYS.join(', ')})`);
  const groups: Partial<Record<(typeof SKILL_GROUP_KEYS)[number], string[]>> = {};
  for (const key of SKILL_GROUP_KEYS) {
    if (raw[key] === undefined) {
      if (key !== 'data_ai') throw new ContentError(`skills.${key}`, 'famille manquante');
      continue;
    }
    groups[key] = textList(raw, key, 'skills');
  }
  return groups as SkillGroups;
}

export function parseSite(input: unknown): SiteContent {
  const raw = record(input, 'site');
  const chain: ChainStep[] = list(raw.chain, 'site.chain').map((item, i) => {
    const path = `site.chain[${i}]`;
    const step = record(item, path);
    return {
      title: text(step, 'title', path),
      detail: text(step, 'detail', path),
      href: step.href === undefined ? undefined : httpsUrl(step, 'href', path),
    };
  });
  if (chain.length === 0) throw new ContentError('site.chain', 'au moins une étape attendue');
  return { facts: textList(raw, 'facts', 'site'), chain };
}
