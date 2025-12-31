import { Server, Database, Code, Monitor, Layout, Wrench, Home, ShieldCheck } from 'lucide-react';
import { skills } from '../data';

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">Compétences Techniques</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Server className="w-5 h-5" />
              Back-end
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/*<div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">*/}
          {/*  <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">*/}
          {/*    <Brain className="w-5 h-5" />*/}
          {/*    Data Science & IA*/}
          {/*  </h3>*/}
          {/*  <div className="flex flex-wrap gap-2">*/}
          {/*    {skills.data_ai.map((skill, i) => (*/}
          {/*      <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">*/}
          {/*        {skill}*/}
          {/*      </span>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Bases de données
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.databases.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Code className="w-5 h-5" />
              DevOps
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.devops.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" />
              Réseau & Sécurité
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.network_security.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {skills.self_hosted && (
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
                <Home className="w-5 h-5" />
                Self-Hosted & Home Lab
              </h3>
              <div className="flex flex-wrap gap-2">
                {skills.self_hosted.map((skill, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Wrench className="w-5 h-5" />
              Outils & Services
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Monitor className="w-5 h-5" />
              Systèmes d'exploitation
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.os.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">
            <h3 className="text-xl font-bold mb-4 text-blue-600 dark:text-blue-400 flex items-center gap-2">
              <Layout className="w-5 h-5" />
              Front-end
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}