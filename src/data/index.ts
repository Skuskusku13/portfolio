import type {Experience, Formation, Project, Skills, PortalService} from '../types';

export const experiences: Experience[] = [
  {
    company: "Meilleurtaux Placement",
    role: "Développeur Back-end / DevOps",
    period: "Sept. 2024 - Aujourd'hui",
    type: "Alternance",
    skills: ["PHP", "Symfony", "Python", "MariaDB", "Docker", "Docker Compose", "Nginx", "RabbitMQ", "CI/CD", "Bash"]
  },
  {
    company: "Meilleurtaux Placement",
    role: "Développeur Back-end",
    period: "Janv. 2024 - Août 2024",
    type: "Alternance",
    skills: ["PHP", "Symfony", "PHPUnit", "Docker", "PhpMyAdmin", "PhpStorm"]
  },
  {
    company: "Storyzy",
    role: "Full-stack Developer",
    period: "Sept. 2023 - Janv. 2024",
    type: "Alternance",
    skills: ["Node.js", "Angular", "Spring Boot", "SCSS"]
  },
  {
    company: "SESAN",
    role: "Développeur Web",
    period: "Oct. 2021 - Août 2023",
    type: "Alternance",
    skills: ["HTML", "CSS", "JavaScript", "WordPress", "Bootstrap", "Piwik Pro"]
  }
];

export const formations: Formation[] = [
  {
    school: "CFA INSTA",
    diploma: "Architecte des Systèmes d'Information",
    specialization: "Option Logiciel",
    period: "Juil. 2024 - Juil. 2026",
    level: "Bac +5"
  },
  {
    school: "CFA INSTA",
    diploma: "CDA - Concepteur Développeur d'Applications",
    specialization: "Programmation / Développeur informatique",
    period: "Juil. 2023 - Juil. 2024",
    level: "Bac +3"
  },
  {
    school: "CFA INSTA",
    diploma: "BTS SIO SLAM",
    specialization: "Développeur Web",
    period: "Oct. 2021 - Juil. 2023",
    level: "Bac +2"
  }
];

export const skills: Skills = {
  backend: ["PHP", "Symfony", "Python", "Django", "Flask", "NestJS", "Java", "Spring Boot", "RabbitMQ"],
  devops: ["Docker", "Docker Compose", "Prometheus", "Grafana", "Datadog", "Portainer", "Logrotate", "CI / CD", "Bash / zsh", "GitLab", "GitHub", "Git"],
  tools: ["n8n", "PhpMyAdmin", "PhpStorm", "PHPUnit", "WordPress"],
  databases: ["MySQL / MariaDB", "MongoDB"],
  self_hosted: ["Joplin", "Cloudflared", "Pi-hole"],
  network_security: ["WireGuard", "Nginx", "SSL / TLS"],
  os: ["MacOS", "Windows", "Debian", "Ubuntu", "Linux Mint", "Kali", "Raspberry Pi OS"],
  frontend: ["TypeScript", "JavaScript", "Android (Java)", "Angular", "React", "Vite", "Twig", "HTML", "CSS", "SCSS", "Bootstrap",],
  project_management: ["Agile / Scrum", "Kanban", "Jira", "UML (Séquence)", "Merise (MCD, MLD)", "Architecture Technique"],
  // data_ai: ["TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "PySpark"],
};

export const projects: Project[] = [
  {
    title: "Portfolio & Portail",
    category: ["perso"],
    description: "CV informatique et interface centralisée pour l'accès aux services auto-hébergés (Joplin, Portainer, n8n) avec gestion d'accessibilité par IP.",
    tech: ["React", "Vite", "Tailwind CSS", "Docker"],
    status: "En production",
    githubLinks: [
      { label: "Code Source", url: "https://github.com/Skuskusku13/portfolio" },
    ]
  },
  {
    title: "Infrastructure Microservices",
    category: ["perso", "pro"],
    description: "Architecture complète de services conteneurisés avec reverse proxy, gestion SSL et réseau privé.",
    tech: ["Docker Compose", "Nginx Proxy", "Cloudflared", "MariaDB", "LetsEncrypt", "Logrotate"],
    status: "En production"
  },
  {
    title: "Système de messagerie asynchrone",
    category: ["pro"],
    description: "Implémentation d'un système de file d'attente avec RabbitMQ et le protocol amqps pour le traitement asynchrone des demandes.",
    tech: ["RabbitMQ", "PHP", "Symfony"],
    status: "En production"
  },
  {
    title: "Pipeline CI/CD",
    category: ["perso", "pro"],
    description: "Automatisation des déploiements via des pipelines CI / CD pour garantir des mises en production rapides et fiables.",
    tech: ["Docker", "Reusable Workflows", "Github CI / CD", "Bash"],
    status: "En cours",
    githubLinks: [
      { label: "Workflows réutilisable", url: "https://github.com/Skuskusku13/workflows-reusable" }
    ]
  },
  {
    title: "Stack Monitoring & Observabilité",
    category: ["perso", "pro"],
    description: "Mise en place d'une surveillance complète de l'infrastructure avec collecte de métriques et dashboards.",
    tech: ["Prometheus", "Grafana", "Node Exporter", "Datadog", "Docker"],
    status: "En cours"
  },
  {
    title: "Plateforme Shajudan",
    category: ["formation"],
    description: "Plateforme complète de gestion commerciale intégrant API, backoffice d'administration et application mobile pour la gestion des stocks et transactions.",
    tech: ["Docker", "Python", "Django", "Django REST Framework", "SQLite3", "JWT", "CI / CD", "Angular", "Ionic", "TypeScript", "API REST"],
    status: "Terminé",
    githubLinks: [
      { label: "Backoffice Django", url: "https://github.com/Skuskusku13/backoffice-django/" },
      { label: "Backoffice", url: "https://github.com/Skuskusku13/backoffice/" },
      { label: "Bateau Shajudan", url: "https://github.com/Skuskusku13/bateau-shajudan/" }
    ]
  },
  {
    title: "API REST avec Spring Boot",
    category: ["pro", "formation"],
    description: "Développement d'une API et gestion de données, et affichage de ces données en front.",
    tech: ["Java", "Spring Boot", "MariaDB", "Angular"],
    status: "Terminé",
    githubLinks: [
      { label: "Front (Angular)", url: "https://github.com/Skuskusku13/SpringAngularRest/tree/main/frontRestProject" },
      { label: "Back (Spring Boot)", url: "https://github.com/Skuskusku13/SpringAngularRest/tree/main/myRestProject" },
    ]
  },
  {
    title: "Bunker",
    category: ["formation"],
    description: "Filevault pour notes sécurisées enregistrement des mdp et email pour des sites.",
    tech: ["NestJS", "Angular", "MariaDB", "docker"],
    status: "Terminé",
    githubLinks: [
      { label: "Front (Angular / TS)", url: "https://github.com/Skuskusku13/bunker_webapp" },
      { label: "Back (NestJS TS)", url: "https://github.com/Skuskusku13/bunker_API" },
    ]
  },
  {
    title: "Applications Mobile Android",
    category: ["formation"],
    description: "Application native Android pour la consultation de données en API.",
    tech: ["Java", "Android SDK", "Gradle"],
    status: "Terminé",
    githubLinks: [
      { label: "Pokedex Android", url: "https://github.com/Skuskusku13/pokedex-android" },
      { label: "Nos députés (Open Data)", url: "https://github.com/Skuskusku13/nosdeputes-android" },
    ]
  },
  {
    title: "Analyse Big Data",
    category: ["formation"],
    description: "Traitement et analyse de grands jeux de données (DataFrames) pour l'extraction de statistiques.",
    tech: ["Python", "Pandas", "NumPy"],
    status: "Terminé"
  },
  {
    title: "Chatbot IA",
    category: ["formation"],
    description: "Chatbot utilisant TensorFlow/Keras et NLTK pour analyser les intentions des utilisateurs et générer des réponses contextuelles via une interface web Flask.",
    tech: ["Docker", "Python", "Flask", "TensorFlow", "Keras", "NLTK"],
    status: "Terminé",
    githubLinks: [
      { label: "Pokemon model IA", url: "https://github.com/Skuskusku13/pokemon_model_ia" }
    ]
  },
  {
    title: "Site vitrine avec CMS",
    category: ["formation", "pro"],
    description: "Développement de sites web avec WordPress et personnalisation avancée",
    tech: ["WordPress", "PHP", "JavaScript", "CSS", "HTML"],
    status: "Plusieurs projets livrés"
  }
];

export const portalServices: PortalService[] = [
  {
    name: "Pi-hole",
    url: "https://pihole.dlyhub.com",
    description: "Bloqueur de publicités et DNS local",
    icon: "Shield",
    restricted: true
  },

  {
    name: "Portainer",
    url: "https://portainer.dlyhub.com",
    description: "Gestionnaire d'infrastructure Docker",
    icon: "Container",
    restricted: true
  },
  {
    name: "n8n",
    url: "https://n8n.dlyhub.com",
    description: "Automatisation de workflows",
    icon: "Workflow",
    restricted: true
  },
  {
    name: "Joplin Admin",
    url: "https://jop.dlyhub.com",
    description: "Serveur de synchronisation de notes sécurisé",
    icon: "FileText",
    restricted: true
  },
  {
    name: "PhpMyAdmin",
    url: "https://pma.dlyhub.com",
    description: "Administration MariaDB",
    icon: "Database",
    restricted: true
  },
  {
    name: "Microwave",
    url: "https://microwave.dlyhub.com",
    description: "Projet personnel (Web)",
    icon: "Globe"
  },
];
