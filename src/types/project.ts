export interface LocalizedString {
  en: string;
  bn: string;
}

export interface MaterialItem {
  name: LocalizedString;
  description: LocalizedString;
  texture: string; // image URL
  category: LocalizedString;
}

export interface PaletteColor {
  name: LocalizedString;
  hex: string;
  role: LocalizedString;
}

export interface BeforeAfterPair {
  beforeImage: string;
  afterImage: string;
  beforeLabel: LocalizedString;
  afterLabel: LocalizedString;
  description: LocalizedString;
}

export interface ProjectSpecs {
  location: LocalizedString;
  year: number;
  areaSqFt: number;
  duration: LocalizedString;
  style: LocalizedString;
  scope: LocalizedString;
  clientType: LocalizedString;
}

export interface Project {
  id: string;
  slug: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  category: 'all' | 'penthouse' | 'residential' | 'commercial' | 'hospitality' | 'minimalist';
  categoryLabel: LocalizedString;
  featured: boolean;
  heroImage: string;
  galleryImages: string[];
  beforeAfter?: BeforeAfterPair;
  palette: PaletteColor[];
  materials: MaterialItem[];
  overview: LocalizedString;
  designBrief: LocalizedString;
  challenges: LocalizedString;
  solutions: LocalizedString;
  specs: ProjectSpecs;
  awards?: LocalizedString[];
  tags: LocalizedString[];
}

export interface StudioStat {
  value: string;
  label: LocalizedString;
  description: LocalizedString;
}

export interface Testimonial {
  id: string;
  quote: LocalizedString;
  clientName: LocalizedString;
  projectTitle: LocalizedString;
  location: LocalizedString;
  rating: number;
  avatar: string;
}

export interface ProcessStep {
  stepNumber: string;
  title: LocalizedString;
  subtitle: LocalizedString;
  description: LocalizedString;
  deliverables: LocalizedString[];
  image: string;
}
