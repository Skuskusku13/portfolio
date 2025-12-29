import { Mail, Github, Linkedin } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Restons en contact</h2>
        <p className="text-xl text-gray-600 mb-12">
          Ouvert aux opportunités professionnelles et aux échanges techniques
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:email@exemple.com"
             className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold transition">
            <Mail className="w-5 h-5" />
            Email
          </a>
          <a href="https://github.com/Skuskusku13" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-lg font-semibold transition">
            <Github className="w-5 h-5" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/dan-levy-a736a2150/" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 hover:border-blue-600 hover:text-blue-600 rounded-lg font-semibold transition">
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
