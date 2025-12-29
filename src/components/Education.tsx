import { GraduationCap } from 'lucide-react';
import { formations } from '../data';

export default function Education() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center text-gray-900 dark:text-white">Formation</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {formations.map((formation, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-colors duration-300">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                  {formation.level}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{formation.diploma}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-2">{formation.specialization}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{formation.school}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{formation.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}