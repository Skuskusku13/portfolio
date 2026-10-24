import { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data';
import type { Project } from '../types';
import { useItemsPerPage } from '../hooks/useItemsPerPage';
import Section from './ui/Section';
import Reveal from './ui/Reveal';
import Card from './ui/Card';
import Tag from './ui/Tag';
import ChipList from './ui/ChipList';
import NewWindowHint from './ui/NewWindowHint';
import Pagination from './Pagination';

type Category = Project['category'][number];
type Filter = Category | 'all';

const categoryLabels: Record<Category, string> = {
  pro: 'Pro',
  perso: 'Perso',
  formation: 'Formation',
};

const filters: { id: Filter; label: string }[] = [
  { id: 'all', label: 'Tous' },
  { id: 'pro', label: 'Professionnels' },
  { id: 'perso', label: 'Personnels' },
  { id: 'formation', label: 'Formation' },
];

function statusTone(status: string): 'ok' | 'warn' | 'neutral' {
  if (status === 'En production') return 'ok';
  if (status === 'En cours') return 'warn';
  return 'neutral';
}

/**
 * Carte projet : titre et statut en tête, description, puis un pied calé en bas
 * (pastilles de technologies, catégorie, dépôts) pour s'aligner d'une carte à l'autre.
 */
const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const links = project.githubLinks ?? [];

  return (
    <Card as="li" delay={index * 60} className="flex flex-col">
      <div className="flex items-start justify-between gap-x-3">
        <h3 className="min-w-0 flex-1 text-[18px] font-semibold leading-[1.3] text-ink">{project.title}</h3>
        <Tag tone={statusTone(project.status)} dot className="mt-0.5 shrink-0">
          {project.status}
        </Tag>
      </div>
      <p className="mt-2 text-[15px] leading-[1.5] text-ink-2">{project.description}</p>

      {/* Le pied suit le contenu : pas de vide au milieu de la carte quand la rangée est plus haute. */}
      <div className="pt-5">
        <ChipList items={project.tech} label={`Technologies de ${project.title}`} />

        <div className="mt-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <span className="text-[13px] text-ink-3">{project.category.map((cat) => categoryLabels[cat]).join(' · ')}</span>
          {links.length > 0 && (
            <ul className="flex flex-wrap gap-x-4 gap-y-1.5">
              {links.map((link) => (
                <li key={link.url}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1 py-1 text-[14px] text-accent hover:underline"
                  >
                    {links.length === 1 ? 'Code source' : link.label}
                    {links.length === 1 && (
                      <>
                        {' '}
                        <span className="sr-only">de {project.title}</span>
                      </>
                    )}
                    <NewWindowHint />
                    <ArrowUpRight
                      className="size-3.5 transition-transform duration-200 ease-out-quint group-hover:-translate-y-px group-hover:translate-x-px"
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Card>
  );
};

export default function Projects() {
  const [filter, setFilter] = useState<Filter>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = useItemsPerPage();

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category.includes(filter));
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));

  // Page effective, recadrée quand la largeur ou le filtre réduit le nombre de pages.
  const page = Math.min(Math.max(1, currentPage), totalPages);
  const displayed = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleFilter = (id: Filter) => {
    setFilter(id);
    setCurrentPage(1);
  };

  return (
    <Section
      id="projects"
      title="Projets"
      deck="Infrastructure, pipelines et services que j'exploite réellement, puis les projets de formation."
    >
      <Reveal className="mb-8" delay={60}>
        <div role="group" aria-label="Filtrer les projets" className="flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                onClick={() => handleFilter(f.id)}
                aria-pressed={active}
                className={`h-9 rounded-md border px-3.5 text-[14px] font-medium transition-colors duration-200 ${
                  active
                    ? 'border-ink bg-ink text-canvas'
                    : 'border-line bg-surface text-ink-2 hover:border-line-strong/40 hover:text-ink'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </Reveal>

      <p className="sr-only" role="status" aria-live="polite">
        {filtered.length} projet{filtered.length > 1 ? 's' : ''} affiché{filtered.length > 1 ? 's' : ''}
        {totalPages > 1 ? `, page ${page} sur ${totalPages}` : ''}
      </p>

      <ul role="list" aria-label="Liste des projets" className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {displayed.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </ul>

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setCurrentPage} scrollTargetId="projects" />
    </Section>
  );
}
