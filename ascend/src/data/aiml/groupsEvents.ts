// AIML branch — seed data for branch-tagged study groups and events.
// Matches the study_groups / community_events tables from the
// Community Hub work, plus the new branch_id column.

export const AIML_GROUPS = [
  { name: "ML Interview Prep Circle", description: "Weekly mock ML interviews + DSA problem solving", branch_id: "aiml" },
  { name: "Kaggle Study Group", description: "Team up on Kaggle competitions, share notebooks", branch_id: "aiml" },
  { name: "Papers We Love — AIML", description: "Read and discuss one ML paper every week", branch_id: "aiml" },
  { name: "LLM Builders Club", description: "Building RAG apps, fine-tuning, prompt engineering", branch_id: "aiml" },
];

export const AIML_EVENTS = [
  { title: "Mock Interview Night — ML Engineer Track", description: "Live peer mock interviews with feedback", branch_id: "aiml" },
  { title: "System Design for ML: Recommendation Engines", description: "Workshop on designing ML systems at scale", branch_id: "aiml" },
  { title: "Resume + Portfolio Review — AIML", description: "Get your ML portfolio reviewed before placement season", branch_id: "aiml" },
];
