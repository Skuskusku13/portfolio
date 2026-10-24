import type {Experience, Formation, Project, Skills} from '../types';

export const experiences: Experience[] = [
  {
    company: "Meilleurtaux Placement",
    role: "Développeur Back-end & DevOps",
    period: "Janv. 2024 - Aujourd'hui",
    type: "Alternance",
    promotion: "CDI · depuis sept. 2026",
    summary: "Développement back-end Symfony et messagerie asynchrone RabbitMQ, conteneurisation Docker, intégration et déploiement continus.",
    skills: ["PHP", "Symfony", "Python", "MariaDB", "Docker", "Docker Compose", "Nginx", "RabbitMQ", "CI/CD", "Bash", "PHPUnit", "PhpMyAdmin", "PhpStorm"]
  },
  {
    company: "Storyzy",
    role: "Développeur Full-stack",
    period: "Sept. 2023 - Janv. 2024",
    type: "Alternance",
    summary: "Développement full-stack : API Node.js et Spring Boot, interfaces Angular.",
    skills: ["Node.js", "Angular", "Spring Boot", "SCSS"]
  },
  {
    company: "SESAN",
    role: "Développeur Web",
    period: "Oct. 2021 - Août 2023",
    type: "Alternance",
    summary: "Développement web : sites WordPress, intégration HTML, CSS et JavaScript, mesure d'audience Piwik Pro.",
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
  devops: ["Docker", "Docker Compose", "Prometheus", "Grafana", "Datadog", "Portainer", "Logrotate", "CI/CD", "Bash / zsh", "GitLab", "GitHub", "Git"],
  tools: ["n8n", "PhpMyAdmin", "PhpStorm", "PHPUnit", "WordPress"],
  databases: ["MySQL / MariaDB", "MongoDB"],
  self_hosted: ["Joplin", "Cloudflared", "Pi-hole"],
  network_security: ["WireGuard", "Nginx", "TLS"],
  os: ["macOS", "Windows", "Debian", "Ubuntu", "Linux Mint", "Kali", "Raspberry Pi OS"],
  frontend: ["TypeScript", "JavaScript", "Android (Java)", "Angular", "React", "Vite", "Twig", "HTML", "CSS", "SCSS", "Bootstrap"],
  project_management: ["Agile / Scrum", "Kanban", "Jira", "UML (Séquence)", "Merise (MCD, MLD)", "Architecture Technique"],
  // data_ai: ["TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "PySpark"],
};

export const projects: Project[] = [
  {
    title: "Portfolio (ce site)",
    category: ["perso"],
    description: "SPA React, Vite et Tailwind conteneurisée en build multi-stage et servie par un Apache durci (CSP stricte, COOP/COEP). Scannée en CI par npm audit, Trivy, Gitleaks et ZAP.",
    tech: ["React", "Vite", "Tailwind CSS", "Docker", "GitHub Actions"],
    status: "En production",
    githubLinks: [
      { label: "Code source", url: "https://github.com/Skuskusku13/portfolio" },
    ]
  },
  {
    title: "Infrastructure microservices",
    category: ["perso", "pro"],
    description: "Architecture de services conteneurisés derrière un reverse proxy, avec certificats TLS et réseau privé.",
    tech: ["Docker Compose", "Nginx Proxy", "Cloudflared", "MariaDB", "Let's Encrypt", "Logrotate"],
    status: "En production"
  },
  {
    title: "Système de messagerie asynchrone",
    category: ["pro"],
    description: "Implémentation d'une file d'attente RabbitMQ (protocole AMQPS) pour le traitement asynchrone des demandes.",
    tech: ["RabbitMQ", "PHP", "Symfony"],
    status: "En production"
  },
  {
    title: "Pipeline CI/CD",
    category: ["perso", "pro"],
    description: "Automatisation des déploiements avec des workflows GitHub Actions réutilisables, pour des mises en production rapides et fiables.",
    tech: ["Docker", "GitHub Actions", "Reusable Workflows", "Bash"],
    status: "En cours",
    githubLinks: [
      { label: "Workflows réutilisables", url: "https://github.com/Skuskusku13/workflows-reusable" }
    ]
  },
  {
    title: "Stack monitoring & observabilité",
    category: ["perso", "pro"],
    description: "Surveillance de l'infrastructure : collecte de métriques et tableaux de bord.",
    tech: ["Prometheus", "Grafana", "Node Exporter", "Datadog", "Docker"],
    status: "En cours"
  },
  {
    title: "Plateforme Shajudan",
    category: ["formation"],
    description: "Plateforme de gestion commerciale : API, backoffice d'administration et application mobile pour les stocks et les transactions.",
    tech: ["Docker", "Python", "Django", "Django REST Framework", "SQLite3", "JWT", "CI/CD", "Angular", "Ionic", "TypeScript", "API REST"],
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
    description: "Développement d'une API REST et affichage des données dans un front Angular.",
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
    description: "Coffre-fort de notes sécurisées : enregistrement de mots de passe et d'identifiants par site.",
    tech: ["NestJS", "Angular", "MariaDB", "Docker"],
    status: "Terminé",
    githubLinks: [
      { label: "Front (Angular / TS)", url: "https://github.com/Skuskusku13/bunker_webapp" },
      { label: "Back (NestJS TS)", url: "https://github.com/Skuskusku13/bunker_API" },
    ]
  },
  {
    title: "Applications mobiles Android",
    category: ["formation"],
    description: "Applications natives Android consommant des API de données.",
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
    description: "Chatbot TensorFlow/Keras et NLTK qui analyse les intentions des utilisateurs et répond via une interface web Flask.",
    tech: ["Docker", "Python", "Flask", "TensorFlow", "Keras", "NLTK"],
    status: "Terminé",
    githubLinks: [
      { label: "Pokemon model IA", url: "https://github.com/Skuskusku13/pokemon_model_ia" }
    ]
  },
  {
    title: "Sites vitrines avec CMS",
    category: ["formation", "pro"],
    description: "Développement de sites vitrines WordPress avec personnalisation avancée.",
    tech: ["WordPress", "PHP", "JavaScript", "CSS", "HTML"],
    status: "Livré"
  }
];
