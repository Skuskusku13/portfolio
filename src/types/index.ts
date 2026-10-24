/**
 * Contrats du contenu du site. Les données vivent dans src/content/*.json et sont
 * validées par src/content/schema.ts avant d'atteindre les composants.
 */

export interface Experience {
  company: string;
  role: string;
  period: string;
  type: string;
  promotion?: string;
  /** Une phrase : ce qui a été fait, dérivé des technologies réellement pratiquées. */
  summary: string;
  skills: string[];
}

export interface Formation {
  school: string;
  diploma: string;
  specialization: string;
  period: string;
  level: string;
}

export const PROJECT_CATEGORIES = ['pro', 'perso', 'formation'] as const;
export type ProjectCategory = (typeof PROJECT_CATEGORIES)[number];

export const PROJECT_STATUSES = ['En production', 'En cours', 'Terminé', 'Livré'] as const;
export type ProjectStatus = (typeof PROJECT_STATUSES)[number];

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  title: string;
  category: ProjectCategory[];
  description: string;
  tech: string[];
  status: ProjectStatus;
  githubLinks?: ProjectLink[];
}

export const SKILL_GROUP_KEYS = [
  'backend',
  'data_ai',
  'databases',
  'devops',
  'frontend',
  'network_security',
  'os',
  'project_management',
  'self_hosted',
  'tools',
] as const;
export type SkillGroupKey = (typeof SKILL_GROUP_KEYS)[number];

/** Familles de compétences : chaque clé est une liste de pastilles ; `data_ai` est optionnelle. */
export type SkillGroups = Omit<Record<SkillGroupKey, string[]>, 'data_ai'> & { data_ai?: string[] };

export interface ChainStep {
  title: string;
  detail: string;
  /** Lien vers la preuve publique de l'étape, quand elle existe. */
  href?: string;
}

/** Contenu du hero : faits vérifiables et chaîne de production du site. */
export interface SiteContent {
  facts: string[];
  chain: ChainStep[];
}
