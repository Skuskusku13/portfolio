/**
 * Point d'entrée du contenu : les fichiers src/content/*.json sont la source de vérité
 * (éditables sans toucher aux composants), validés ici par src/content/schema.ts.
 */
import experiencesJson from '../content/experiences.json';
import formationsJson from '../content/formations.json';
import projectsJson from '../content/projects.json';
import siteJson from '../content/site.json';
import skillsJson from '../content/skills.json';
import { parseExperiences, parseFormations, parseProjects, parseSite, parseSkillGroups } from '../content/schema';

export const experiences = parseExperiences(experiencesJson);
export const formations = parseFormations(formationsJson);
export const projects = parseProjects(projectsJson);
export const skills = parseSkillGroups(skillsJson);
export const site = parseSite(siteJson);
