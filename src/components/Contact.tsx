import { Mail } from 'lucide-react';

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 22v-4c0-1.51-.53-2.08-1-2.42 2.2-.24 4.5-1.07 4.5-4.8 0-1.07-.38-1.95-1.02-2.63.1-.25.45-1.25-.1-2.6-1.05-.33-3.44 1.3-3.44 1.3-.9-.25-1.86-.38-2.82-.38-.96 0-1.92.13-2.82.38 0 0-2.39-1.63-3.44-1.3-.55 1.35-.2 2.35-.1 2.6-.64.68-1.02 1.56-1.02 2.63 0 3.71 2.29 4.56 4.5 4.79-.37.31-.7 1.11-.7 1.8V22" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">Restons en contact</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
          Ouvert aux opportunités professionnelles et aux échanges techniques
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <a href="mailto:contact@dlyhub.com"
             className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold transition">
            <Mail className="w-5 h-5" />
            Email
          </a>
          <a href="https://github.com/Skuskusku13" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition">
            <GithubIcon className="w-5 h-5" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/dan-levy-a736a2150/" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 hover:border-blue-600 dark:hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400 text-gray-700 dark:text-gray-300 rounded-lg font-semibold transition">
            <LinkedinIcon className="w-5 h-5" />
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}