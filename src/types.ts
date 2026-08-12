export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  features: string[];
}

export interface Skill {
  name: string;
  level: number; // 0 to 100
}

export interface SkillCategory {
  title: string;
  skills: Skill[];
}

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Experience {
  title: string;
  description: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
}
