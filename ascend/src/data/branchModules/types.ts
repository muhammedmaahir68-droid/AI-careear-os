// src/data/branchModules/types.ts
// Shared types for branch-specific module data

export interface VideoLink {
  language: string;
  languageCode: string;
  flag: string;
  title: string;
  url: string;
}

export interface ComparisonTable {
  headers: string[];
  rows: string[][];
}

export interface AuthorReference {
  author: string;
  bookTitle: string;
  coreInsight: string;
}

export interface BranchModuleData {
  moduleTitle: string;
  level: string;
  branch: string[]; // ["cse", "it"] etc. or ["all"]
  videos: VideoLink[];
  studyMaterial: {
    summary: string;
    deepDiveTextbook?: string; // Comprehensive textbook chapter content
    authorReferences?: AuthorReference[];
    comparisonTable?: ComparisonTable;
    flowchartSteps?: string[];
    concept3DSimulation?: {
      title: string;
      description: string;
      interactiveNodes: { name: string; type: string; details: string }[];
    };
    keyPoints: string[];
    example: string;
    complexity?: string;
  };
  aiExplain: {
    steps: string[];
    analogy: string;
  };
  debug: { title: string; buggy: string; fixed: string; hint: string }[];
  quiz: { q: string; options: string[]; answer: number }[];
  mnc: { company: string; year: string; question: string; answer: string }[];
  mock: { type: string; question: string; tip: string }[];
  coding: {
    problem: string;
    desc: string;
    input: string;
    output: string;
    starter: string;
  };
}

// Helper to generate YouTube search links for all Indian languages
export function makeVideoLinks(topicEnglish: string): VideoLink[] {
  const base = `https://www.youtube.com/results?search_query=`;
  const enc = (q: string) => encodeURIComponent(q + " tutorial");
  return [
    { language: "English",   languageCode: "en", flag: "🇬🇧", title: `${topicEnglish} in English`,   url: base + enc(`${topicEnglish} in English`) },
    { language: "Hindi",     languageCode: "hi", flag: "🇮🇳", title: `${topicEnglish} in Hindi`,     url: base + enc(`${topicEnglish} in Hindi`) },
    { language: "Tamil",     languageCode: "ta", flag: "🌟", title: `${topicEnglish} in Tamil`,     url: base + enc(`${topicEnglish} in Tamil`) },
    { language: "Telugu",    languageCode: "te", flag: "🌟", title: `${topicEnglish} in Telugu`,    url: base + enc(`${topicEnglish} in Telugu`) },
    { language: "Kannada",   languageCode: "kn", flag: "🌟", title: `${topicEnglish} in Kannada`,   url: base + enc(`${topicEnglish} in Kannada`) },
    { language: "Malayalam", languageCode: "ml", flag: "🌟", title: `${topicEnglish} in Malayalam`, url: base + enc(`${topicEnglish} in Malayalam`) },
    { language: "Bengali",   languageCode: "bn", flag: "🌟", title: `${topicEnglish} in Bengali`,   url: base + enc(`${topicEnglish} in Bengali`) },
    { language: "Marathi",   languageCode: "mr", flag: "🌟", title: `${topicEnglish} in Marathi`,   url: base + enc(`${topicEnglish} in Marathi`) },
    { language: "Gujarati",  languageCode: "gu", flag: "🌟", title: `${topicEnglish} in Gujarati`,  url: base + enc(`${topicEnglish} in Gujarati`) },
    { language: "Punjabi",   languageCode: "pa", flag: "🌟", title: `${topicEnglish} in Punjabi`,   url: base + enc(`${topicEnglish} in Punjabi`) },
    { language: "Odia",      languageCode: "or", flag: "🌟", title: `${topicEnglish} in Odia`,      url: base + enc(`${topicEnglish} in Odia`) },
  ];
}
