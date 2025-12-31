import type {Experience, Formation, Project, Skills} from '../types';

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
    skills: ["Node.js", "AngularJS", "Spring Boot", "SCSS"]
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
  frontend: ["TypeScript", "JavaScript", "Android (Java)", "AngularJS", "ReactJS", "Vite", "Twig", "HTML", "CSS", "SCSS", "Bootstrap",],
  project_management: ["Agile / Scrum", "Kanban", "Jira", "UML (Séquence)", "Merise (MCD, MLD)", "Architecture Technique"],
  // data_ai: ["TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "PySpark"],
};

export const projects: Project[] = [
  {
    title: "Portfolio & Portail",
    category: ["perso"],
    description: "CV informatique et interface centralisée pour l'accès aux services auto-hébergés (Joplin, Portainer, n8n) avec gestion d'accessibilité par IP.",
    tech: ["ReactJS", "Vite", "Tailwind CSS", "Docker"],
    status: "En production"
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
    status: "En production"
  },
  {
    title: "Stack Monitoring & Observabilité",
    category: ["perso", "pro"],
    description: "Mise en place d'une surveillance complète de l'infrastructure avec collecte de métriques et dashboards.",
    tech: ["Prometheus", "Grafana", "Node Exporter", "Datadog", "Docker"],
    status: "En cours"
  },
  {
    title: "API REST avec Spring Boot",
    category: ["pro", "formation"],
    description: "Développement d'une API complète avec authentification jwt et gestion de données",
    tech: ["Java", "Spring Boot", "MariaDB"],
    status: "Terminé"
  },
  {
    title: "Bateau de Thibaut",
    category: ["formation"],
    description: "Développement d'une application mobile pour un magasin. Gestion de stock, promos, indisponibilités des articles, articles de saisons, prix d'achat, prrix de revente.",
    tech: ["Angular", "Ionic", "TypeScript", "API REST"],
    status: "Terminé"
  },
  {
    title: "Bunker",
    category: ["formation"],
    description: "Filevault pour notes sécurisées enregistrement des mdp et email pour des sites.",
    tech: ["NestJS", "AngularJS", "MariaDB"],
    status: "Terminé"
  },
  {
    title: "Applications Mobile Android",
    category: ["formation"],
    description: "Application native Android pour la consultation de données parlementaires (Open Data).",
    tech: ["Java", "Android SDK", "Gradle"],
    status: "Terminé"
  },
  {
    title: "Analyse Big Data",
    category: ["formation"],
    description: "Traitement et analyse de grands jeux de données (DataFrames) pour l'extraction de statistiques.",
    tech: ["Python", "Pandas", "NumPy"],
    status: "Terminé"
  },
  {
    title: "API de Machine Learning",
    category: ["formation"],
    description: "Développement d'une API Flask exposant un modèle d'IA entraîné avec TensorFlow / Keras pour la classification.",
    tech: ["Python", "Flask", "TensorFlow", "Keras"],
    status: "Terminé"
  },
  {
    title: "Site vitrine avec CMS",
    category: ["formation", "pro"],
    description: "Développement de sites web avec WordPress et personnalisation avancée",
    tech: ["WordPress", "PHP", "JavaScript", "CSS", "HTML"],
    status: "Plusieurs projets livrés"
  }
];
