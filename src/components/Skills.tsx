import { Server, Database, Code, Monitor, Layout, Wrench, Home, ShieldCheck, ClipboardList, type LucideIcon } from 'lucide-react';
import { skills } from '../data';
import type { Skills as SkillsType } from '../types';

interface SkillSection {
  key: keyof SkillsType;
  title: string;
  icon: LucideIcon;
}

export default function Skills() {
  const skillSections: SkillSection[] = [
    { key: 'backend', title: 'Back-end', icon: Server },
    { key: 'devops', title: 'DevOps', icon: Code },
    { key: 'tools', title: 'Outils & Services', icon: Wrench },
    { key: 'databases', title: 'Bases de données', icon: Database },
    { key: 'self_hosted', title: 'Self-Hosted', icon: Home },
    { key: 'network_security', title: 'Réseau & Sécurité', icon: ShieldCheck },
    { key: 'os', title: "Systèmes d'exploitation", icon: Monitor },
    { key: 'frontend', title: 'Front-end', icon: Layout },
    { key: 'project_management', title: 'Gestion de Projet & Conception', icon: ClipboardList },
    // { key: 'data_ai', title: 'Data Science & IA', icon: Brain }, // Décommenter pour réactiver
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">Compétences Techniques</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {skillSections.map((section) => {
            const items = skills[section.key];
            
            // Si la section est vide ou undefined, on ne l'affiche pas
            if (!items || items.length === 0) return null;

            const Icon = section.icon;

            return (
              <div 
                key={section.key}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300 hover:shadow-lg hover:border-blue-500/30 dark:hover:border-blue-400/30"
              >
                <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                  <Icon className="w-5 h-5" />
                  {section.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
}