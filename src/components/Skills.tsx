import { Server, Database, Code } from 'lucide-react';
import { skills } from '../data';

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Compétences Techniques</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2">
              <Server className="w-5 h-5" />
              Back-end
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.backend.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Bases de données
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.databases.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-600 flex items-center gap-2">
              <Code className="w-5 h-5" />
              DevOps & Outils
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.devops.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Front-end</h3>
            <div className="flex flex-wrap gap-2">
              {skills.frontend.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-6 md:col-span-2">
            <h3 className="text-xl font-bold mb-4 text-blue-600">Autres outils</h3>
            <div className="flex flex-wrap gap-2">
              {skills.tools.map((skill, i) => (
                <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
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
