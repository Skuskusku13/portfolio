export default function Hero() {
  return (
    <section id="about" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            Développeur Back-end & DevOps
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            En alternance chez Meilleurtaux, spécialisé en PHP/Symfony, Docker et automatisation.
            Actuellement en formation Architecte des Systèmes d'Information (Bac +5).
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact"
               className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-semibold transition">
              Me contacter
            </a>
            <a href="#projects"
               className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-lg font-semibold transition">
              Voir mes projets
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}