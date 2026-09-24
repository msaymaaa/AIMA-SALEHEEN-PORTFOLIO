export interface Project {
  id: string;
  slug: string;
  number: string;
  title: string;
  shortDescription: string;
  category: 'Full-Stack' | 'AI & Web' | 'Application' | 'Systems & Games' | 'Cybersecurity' | 'Automation & AI';
  categoryDisplay?: string;
  liveButtonText?: string;
  year: string;
  problem: string;
  targetUser: string;
  role: string;
  tools: string[];
  importantFeatures: string[];
  architecture: string;
  result: string;
  challenges: string;
  screenshotPlaceholder?: string;
  liveUrl?: string;
  githubUrl?: string;
  statusText?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  department?: string;
  type: 'Internship' | 'Industry Experience' | 'Academic / Technical Role' | 'Applied AI Program' | 'Hands-on Program' | 'Certification & Practical Lab';
  duration: string;
  location: string;
  summary: string;
  keyResponsibilities: string[];
  technologies: string[];
}

export interface EducationInfo {
  institution: string;
  subtitle: string;
  degree: string;
  field: string;
  duration: string;
  location: string;
  overview: string;
  highlights: string[];
}

export interface SkillItem {
  name: string;
  focus?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: SkillItem[];
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  type: 'Fellowship' | 'Internship' | 'Certification' | 'Job Simulation' | 'Honor' | 'Learning Program';
  year: string;
  subtitle?: string;
  description: string;
  status: string;
  verificationNote?: string;
  link?: string;
  highlights?: string[];
  keyLearning?: string;
  tags?: string[];
}

export interface TestimonialItem {
  id: string;
  authorName: string;
  authorTitle: string;
  relationship: string;
  quote: string;
  verified: boolean;
}
