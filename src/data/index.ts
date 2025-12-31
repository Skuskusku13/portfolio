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
  frontend: ["TypeScript", "JavaScript", "AngularJS", "ReactJS", "Vite", "Bootstrap", "HTML", "CSS", "SCSS"],
  // data_ai: ["TensorFlow", "Keras", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "PySpark"],
};

export const projects: Project[] = [
  {
    title: "Système de messagerie asynchrone",
    category: "pro",
    description: "Implémentation d'un système de file d'attente avec RabbitMQ pour le traitement asynchrone des demandes",
    tech: ["RabbitMQ", "PHP", "Symfony"],
    status: "En production"
  },
  {
    title: "Pipeline CI/CD",
    category: "pro",
    description: "Automatisation du déploiement avec tests et validation continue",
    tech: ["Docker", "GitLab CI", "Bash"],
    status: "En production"
  },
  {
    title: "API REST avec Spring Boot",
    category: "formation",
    description: "Développement d'une API complète avec authentification et gestion de données",
    tech: ["Java", "Spring Boot", "MariaDB"],
    status: "Terminé"
  },
  {
    title: "Dashboard Analytics",
    category: "perso",
    description: "Tableau de bord pour visualiser des métriques personnelles",
    tech: ["Python", "Node.js", "Docker"],
    status: "En développement"
  },
  {
    title: "Site vitrine avec CMS",
    category: "pro",
    description: "Développement de sites web avec WordPress et personnalisation avancée",
    tech: ["WordPress", "PHP", "JavaScript", "CSS"],
    status: "Plusieurs projets livrés"
  },
  {
    title: "Serveur home lab",
    category: "perso",
    description: "Configuration d'un serveur personnel sur Raspberry Pi avec services Docker",
    tech: ["Raspberry Pi", "Docker", "Nginx", "Debian"],
    status: "En production"
  }
];
