import { useState, useEffect } from 'react';
import { Briefcase, Wrench, GraduationCap } from 'lucide-react';
import { projects } from '../data';
import Pagination from './Pagination';
import type { Project } from '../types';

export default function Projects() {
  const [projectFilter, setProjectFilter] = useState<Project['category'][number] | 'all'>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setItemsPerPage(3);
      else if (window.innerWidth < 1024) setItemsPerPage(4);
      else setItemsPerPage(6);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter(p => p.category.includes(projectFilter as any));

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const displayedProjects = filteredProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleFilterChange = (filterId: Project['category'][number] | 'all') => {
    setProjectFilter(filterId);
    setCurrentPage(1); // Reset page to 1 when filter changes
  };

  const filters: { id: Project['category'][number] | 'all', label: string }[] = [
    { id: 'all', label: 'Tous' },
    { id: 'pro', label: 'Professionnels' },
    { id: 'perso', label: 'Personnels' },
    { id: 'formation', label: 'Formation' },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-gray-900 dark:text-white">Projets</h2>
        <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
          Une sélection de mes réalisations professionnelles, personnelles et académiques
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                projectFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 hover:shadow-lg dark:hover:shadow-blue-900/10 transition duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex gap-2">
                  {project.category.map((cat, i) => (
                    <div key={i} className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg" title={cat}>
                      {cat === 'pro' && <Briefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                      {cat === 'perso' && <Wrench className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                      {cat === 'formation' && <GraduationCap className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                    </div>
                  ))}
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                  {project.status}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">{project.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Pagination 
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </section>
  );
}