import { useState } from 'react';
import { Briefcase, Wrench, GraduationCap } from 'lucide-react';
import { projects } from '../data';

export default function Projects() {
  const [projectFilter, setProjectFilter] = useState('all');

  const filteredProjects = projectFilter === 'all'
    ? projects
    : projects.filter(p => p.category === projectFilter);

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'pro', label: 'Professionnels' },
    { id: 'perso', label: 'Personnels' },
    { id: 'formation', label: 'Formation' },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Projets</h2>
        <p className="text-gray-600 text-center mb-8">
          Une sélection de mes réalisations professionnelles, personnelles et académiques
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setProjectFilter(filter.id)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                projectFilter === filter.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  {project.category === 'pro' && <Briefcase className="w-6 h-6 text-blue-600" />}
                  {project.category === 'perso' && <Wrench className="w-6 h-6 text-blue-600" />}
                  {project.category === 'formation' && <GraduationCap className="w-6 h-6 text-blue-600" />}
                </div>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                  {project.status}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
