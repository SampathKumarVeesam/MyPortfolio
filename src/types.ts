// ===================================================================
// types.ts — TypeScript interfaces for all portfolio data
// ===================================================================

export interface PersonalInfo {
  name: string;
  lastName: string;
  initials: string;
  title: string;
  phone: string;
  email: string;
  location: string;
  linkedin: string;
  github: string;
  profileImage: string;
  heroBackground: string;
  summary: string;
  aboutParagraphs: string[];
  aboutTags: string[];
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface FloatingBadge {
  icon: string;
  text: string;
  position: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface SkillItem {
  name: string;
  level: number;
}

export interface SkillCategory {
  icon: string;
  title: string;
  items: SkillItem[];
}

export interface Experience {
  date: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
}

export interface Project {
  title: string;
  image: string;
  description: string;
  tags: string[];
  link: string;
}

export interface Education {
  icon: string;
  degree: string;
  school: string;
  details: string;
}

export interface Certification {
  title: string;
  org: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  roles: string[];
  stats: Stat[];
  floatingBadges: FloatingBadge[];
  navLinks: NavLink[];
  skills: SkillCategory[];
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certifications: Certification[];
}

export interface ElementOptions {
  className?: string;
  id?: string;
  html?: string;
  text?: string;
  attrs?: Record<string, string>;
  style?: Partial<CSSStyleDeclaration>;
  children?: (HTMLElement | Node)[];
}
