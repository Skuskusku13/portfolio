import { GraduationCap } from 'lucide-react';
import { formations } from '../data';

export default function Education() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Formation</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {formations.map((formation, idx) => (
            <div key={idx} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {formation.level}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2">{formation.diploma}</h3>
              <p className="text-gray-600 mb-2">{formation.specialization}</p>
              <p className="text-sm text-gray-500 mb-2">{formation.school}</p>
              <p className="text-sm text-gray-500">{formation.period}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
