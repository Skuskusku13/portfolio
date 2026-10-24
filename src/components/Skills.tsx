import { useState } from 'react';
import { Server, Database, Code, Monitor, Layout, Wrench, Home, ShieldCheck, ClipboardList, type LucideIcon } from 'lucide-react';
import { skills } from '../data';
import type { Skills as SkillsType } from '../types';
import Section from './ui/Section';
import Card from './ui/Card';
import ChipList from './ui/ChipList';
import Pagination from './Pagination';
import { useItemsPerPage } from '../hooks/useItemsPerPage';

interface SkillSection {
  key: keyof SkillsType;
  title: string;
  icon: LucideIcon;
}

const skillSections: SkillSection[] = [
  { key: 'backend', title: 'Back-end', icon: Server },
  { key: 'devops', title: 'DevOps', icon: Code },
  { key: 'tools', title: 'Outils & services', icon: Wrench },
  { key: 'databases', title: 'Bases de données', icon: Database },
  { key: 'self_hosted', title: 'Auto-hébergement', icon: Home },
  { key: 'network_security', title: 'Réseau & sécurité', icon: ShieldCheck },
  { key: 'os', title: "Systèmes d'exploitation", icon: Monitor },
  { key: 'frontend', title: 'Front-end', icon: Layout },
  { key: 'project_management', title: 'Gestion & conception', icon: ClipboardList },
  // { key: 'data_ai', title: 'Data Science & IA', icon: Brain }, // Décommenter pour réactiver
];

export default function Skills() {
  const [currentPage, setCurrentPage] = useState(1);
  // Neuf familles : toutes visibles sur desktop (3 × 3), deux pages en dessous.
  const itemsPerPage = useItemsPerPage({ mobile: 5, tablet: 6, desktop: 9 });

  const activeSections = skillSections.filter((section) => {
    const items = skills[section.key];
    return items && items.length > 0;
  });

  const totalPages = Math.max(1, Math.ceil(activeSections.length / itemsPerPage));

  // Page effective, recadrée quand la largeur réduit le nombre de pages.
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const displayed = activeSections.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Section id="skills" title="Compétences" deck="Ce que je pratique au quotidien, du back-end à l'exploitation.">
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {displayed.map((section, index) => {
          const items = skills[section.key];
          const Icon = section.icon;
          if (!items) return null;

          return (
            <Card as="li" key={section.key} delay={index * 60}>
              <h3 className="flex items-center gap-2.5 text-[16px] font-semibold text-ink">
                <Icon className="size-[18px] text-accent" strokeWidth={1.5} aria-hidden="true" />
                {section.title}
              </h3>
              <ChipList items={items} className="mt-4" label={`Compétences ${section.title}`} />
            </Card>
          );
        })}
      </ul>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setCurrentPage} scrollTargetId="skills" />
    </Section>
  );
}
