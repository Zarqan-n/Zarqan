export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'web' | 'ui' | 'animation';
  image: string;
  tags: string[];
  links: {
    demo?: string;
    github?: string;
  };
}

export interface Skill {
  name: string;
  percentage: number;
}

export interface Tool {
  name: string;
  icon: string;
  category: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export type Theme = 'light' | 'dark';
