import { Project, SkillCategory, Service, Experience, Testimonial } from './types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Frontend',
    skills: [
      { name: 'HTML5', level: 95 },
      { name: 'CSS3', level: 90 },
      { name: 'JavaScript', level: 85 },
      { name: 'Responsive Design', level: 95 },
      { name: 'Tailwind CSS', level: 90 },
    ],
  },
  {
    title: 'Tools',
    skills: [
      { name: 'VS Code', level: 95 },
      { name: 'Git & GitHub', level: 85 },
      { name: 'Netlify', level: 90 },
      { name: 'Canva', level: 80 },
    ],
  },
  {
    title: 'Other Skills',
    skills: [
      { name: 'UI/UX Design', level: 80 },
      { name: 'Website Optimization', level: 85 },
      { name: 'AI Tools Integration', level: 90 },
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'afc-restaurant',
    title: 'AFC Restaurant Website',
    description: 'Modern restaurant website featuring an interactive menu and seamless online ordering.',
    category: 'Web Development',
    features: ['Online ordering', 'Table booking', 'Interactive menu', 'Location integration'],
  },
  {
    id: 'photographer-portfolio',
    title: 'Photographer Portfolio Website',
    description: 'Professional photography showcase designed to highlight visual stories with elegance.',
    category: 'Portfolio',
    features: ['Gallery system', 'Contact forms', 'Responsive design'],
  },
  {
    id: 'personal-ai',
    title: 'Personal AI Assistant',
    description: 'An AI-powered assistant featuring voice interaction and smart automation tools.',
    category: 'AI / Automation',
    features: ['Voice interaction', 'Smart automation', 'Modern interface'],
  }
];

export const SERVICES: Service[] = [
  {
    title: 'Website Development',
    description: 'Custom modern websites tailored for businesses and individuals.',
    icon: 'Monitor',
  },
  {
    title: 'Landing Pages',
    description: 'High-converting landing pages for products and services.',
    icon: 'LayoutTemplate',
  },
  {
    title: 'Portfolio Websites',
    description: 'Professional personal and business portfolios that stand out.',
    icon: 'Briefcase',
  },
  {
    title: 'Website Redesign',
    description: 'Transform outdated websites into stunning modern experiences.',
    icon: 'Paintbrush',
  },
];

export const EXPERIENCES: Experience[] = [
  {
    title: 'Freelance Web Developer',
    description: 'Delivering end-to-end web solutions for global clients, ensuring high performance and responsive design.',
  },
  {
    title: 'Custom Business Websites',
    description: 'Building tailored websites that align with business goals and drive digital growth.',
  },
  {
    title: 'Portfolio Development',
    description: 'Crafting visually appealing portfolios for creatives and professionals to showcase their work.',
  },
  {
    title: 'Responsive Web Design',
    description: 'Creating mobile-first web applications that provide seamless experiences across all devices.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Johnson',
    role: 'Business Owner',
    content: 'Khuzaima delivered a stunning website that exceeded our expectations. The modern design and fast loading speed significantly improved our online presence.',
  },
  {
    id: 't2',
    name: 'David Lee',
    role: 'Creative Director',
    content: 'An absolute pleasure to work with. The attention to detail and ability to translate our vision into a digital reality was remarkable.',
  },
  {
    id: 't3',
    name: 'Emily Chen',
    role: 'Marketing Manager',
    content: 'The new landing page Khuzaima created doubled our conversion rate. Highly recommended for anyone looking for premium web development.',
  }
];
