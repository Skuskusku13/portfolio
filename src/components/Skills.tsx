import { useState } from 'react';
import {
  Server,
  Database,
  Container as ContainerIcon,
  Monitor,
  Layout,
  Wrench,
  Home,
  ShieldCheck,
  ClipboardList,
  type LucideIcon,
} from 'lucide-react';
import { skills } from '../data';
import type { SkillGroupKey } from '../types';
import Section from './ui/Section';
import Card from './ui/Card';
import ChipList from './ui/ChipList';
import Pagination from './Pagination';
import { useItemsPerPage } from '../hooks/useItemsPerPage';

interface SkillSection {
  key: SkillGroupKey;
  title: string;
  icon: LucideIcon;
}

// L'exploitation d'abord (DevOps, outils, auto-hébergement, réseau), le développement ensuite.
const skillSections: SkillSection[] = [
  { key: 'devops', title: 'DevOps', icon: ContainerIcon },
  { key: 'tools', title: 'Outils & services', icon: Wrench },
  { key: 'self_hosted', title: 'Auto-hébergement', icon: Home },
  { key: 'network_security', title: 'Réseau & sécurité', icon: ShieldCheck },
  { key: 'backend', title: 'Back-end', icon: Server },
  { key: 'databases', title: 'Bases de données', icon: Database },
  { key: 'os', title: "Systèmes d'exploitation", icon: Monitor },
  { key: 'frontend', title: 'Front-end', icon: Layout },
  { key: 'project_management', title: 'Gestion & conception', icon: ClipboardList },
];

export default function Skills() {
  const [currentPage, setCurrentPage] = useState(1);
  // Même rythme que les projets : six familles par page sur desktop (deux rangées), deux pages partout.
  const itemsPerPage = useItemsPerPage({ mobile: 5, tablet: 6, desktop: 6 });

  const activeSections = skillSections.filter((section) => {
    const items = skills[section.key];
    return items && items.length > 0;
  });

  const totalPages = Math.max(1, Math.ceil(activeSections.length / itemsPerPage));

  // Page effective, recadrée quand la largeur réduit le nombre de pages.
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const displayed = activeSections.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Section id="skills" title="Compétences">
      <p className="sr-only" role="status" aria-live="polite">
        {activeSections.length} familles affichées{totalPages > 1 ? `, page ${page} sur ${totalPages}` : ''}
      </p>

      <ul role="list" aria-label="Familles de compétences" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {displayed.map((section, index) => {
          // activeSections ne garde que les familles non vides : items est défini ici.
          const items = skills[section.key] ?? [];
          const Icon = section.icon;

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
