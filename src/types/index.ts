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
  category: 'pro' | 'perso' | 'formation';
  description: string;
  tech: string[];
  status: string;
}

export interface Skills {
  backend: string[];
  databases: string[];
  devops: string[];
  frontend: string[];
  tools: string[];
}
