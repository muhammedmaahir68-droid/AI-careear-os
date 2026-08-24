// Educational source registry & attribution engine for CARVEX AI Career OS

export interface EducationalSource {
  id: string;
  name: string;
  category: "University" | "Indian Academic" | "Open Learning" | "Documentation" | "Practice Platform";
  country: string;
  url: string;
  attributionText: string;
  licenseNote: string;
}

export const EDUCATIONAL_SOURCES: EducationalSource[] = [
  {
    id: "mit-ocw",
    name: "MIT OpenCourseWare",
    category: "University",
    country: "USA",
    url: "https://ocw.mit.edu",
    attributionText: "Inspired by publicly available MIT OpenCourseWare computer science & engineering curricula.",
    licenseNote: "CC BY-NC-SA 4.0 Educational Attribution"
  },
  {
    id: "harvard-cs50",
    name: "Harvard University CS50 & STAT",
    category: "University",
    country: "USA",
    url: "https://cs50.harvard.edu",
    attributionText: "Inspired by publicly available Harvard University computer science & statistical learning materials.",
    licenseNote: "Educational Reference Attribution"
  },
  {
    id: "oxford-cs",
    name: "University of Oxford Computer Science",
    category: "University",
    country: "UK",
    url: "https://www.cs.ox.ac.uk",
    attributionText: "Inspired by Oxford University undergraduate and advanced computer science core topics.",
    licenseNote: "Public Academic Reference"
  },
  {
    id: "stanford-online",
    name: "Stanford Engineering & Computer Science",
    category: "University",
    country: "USA",
    url: "https://online.stanford.edu",
    attributionText: "Curriculum structure influenced by Stanford Engineering public course syllabi (CS229, CS224N, EE271).",
    licenseNote: "Academic Reference Attribution"
  },
  {
    id: "nptel-iits",
    name: "NPTEL / IITs & IISc",
    category: "Indian Academic",
    country: "India",
    url: "https://nptel.ac.in",
    attributionText: "Curriculum topics aligned with NPTEL open engineering courses from IIT Madras, IIT Bombay, IIT Delhi, and IISc.",
    licenseNote: "NPTEL Open Educational Reference"
  },
  {
    id: "kaggle-learn",
    name: "Kaggle Learn & Open Datasets",
    category: "Open Learning",
    country: "Global",
    url: "https://www.kaggle.com/learn",
    attributionText: "Data Science, Machine Learning, and SQL exercises aligned with Kaggle Learn open micro-courses and open datasets.",
    licenseNote: "Kaggle Open Data & Course Attribution"
  },
  {
    id: "official-docs",
    name: "Official Developer Documentation",
    category: "Documentation",
    country: "Global",
    url: "https://developer.mozilla.org",
    attributionText: "Technical specifications reference MDN, Python.org, Oracle Java, Kubernetes, Docker, and AWS public documentation.",
    licenseNote: "Open Technical Documentation Reference"
  }
];

export function getSourceAttribution(sourceId?: string): string {
  const source = EDUCATIONAL_SOURCES.find(s => s.id === sourceId);
  return source ? source.attributionText : "Inspired by publicly available university & industry curricula.";
}
