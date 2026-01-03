export interface Experience {
  company: string;
  role: string;
  period: string;
  type: string;
  skills: string[];
}

export interface Formation {
  school: string;
  diploma: string;
  specialization: string;
  period: string;
  level: string;
}

export interface Project {
  title: string;
  category: ('pro' | 'perso' | 'formation')[];
  description: string;
  tech: string[];
  status: string;
  githubLinks?: { label: string; url: string }[];
}

export interface Skills {
  backend: string[];
  data_ai?: string[];
  databases: string[];
  devops: string[];
  frontend: string[];
  network_security: string[];
  os: string[];
  project_management: string[];
  self_hosted: string[];
  tools: string[];
}

export interface PortalService {
  name: string;
  url: string;
  description: string;
  icon: string; // Nom de l'icône Lucide (ex: "FileText", "Activity")
  restricted?: boolean; // Si vrai, nécessite d'être sur le réseau autorisé
  fallbackUrl?: string; // URL de redirection si l'accès est refusé
}
