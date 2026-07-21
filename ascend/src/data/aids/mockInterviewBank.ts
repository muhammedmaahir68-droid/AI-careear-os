// AIDS branch — mock interview question bank.
export type MockQuestion = { question: string; difficulty: "easy" | "medium" | "hard"; ideal_answer_points: string };

export const AIDS_MOCK_INTERVIEW: Record<string, MockQuestion[]> = {
  "aids-data-analyst": [
    { question: "What is a JOIN in SQL and what are the different types?", difficulty: "easy",
      ideal_answer_points: "INNER, LEFT, RIGHT, FULL OUTER — explain what rows each returns." },
    { question: "How do you handle outliers in a dataset before analysis?", difficulty: "medium",
      ideal_answer_points: "Detect via IQR/z-score, decide to cap/remove/investigate based on context." },
    { question: "Design a dashboard to track key business metrics for an e-commerce company.", difficulty: "hard",
      ideal_answer_points: "Revenue, conversion rate, retention, cohort views, refresh cadence." },
  ],
  "aids-data-scientist": [
    { question: "What is multicollinearity and why is it a problem in regression?", difficulty: "easy",
      ideal_answer_points: "Correlated predictors inflate coefficient variance, make interpretation unreliable." },
    { question: "How would you validate that your model generalizes well?", difficulty: "medium",
      ideal_answer_points: "Train/val/test split, cross-validation, out-of-time validation for business data." },
    { question: "Design an experiment to test a new pricing strategy.", difficulty: "hard",
      ideal_answer_points: "A/B test design, guardrail metrics, statistical power, rollout plan." },
  ],
  "aids-data-engineer": [
    { question: "What is a slowly changing dimension?", difficulty: "easy",
      ideal_answer_points: "Dimension table values change over time; Type 1/2/3 handling strategies." },
    { question: "How do you handle schema changes in an upstream data source?", difficulty: "medium",
      ideal_answer_points: "Schema validation, versioning, backward-compatible transformations." },
    { question: "Design a data pipeline architecture for a company with 5 different data sources.", difficulty: "hard",
      ideal_answer_points: "Ingestion layer, staging, transformation, orchestration, monitoring." },
  ],
  "aids-bi-analyst": [
    { question: "What is the difference between a snowflake schema and a star schema?", difficulty: "easy",
      ideal_answer_points: "Star = denormalized dimensions; snowflake = normalized, more joins." },
    { question: "How do you ensure a dashboard stays performant with large datasets?", difficulty: "medium",
      ideal_answer_points: "Pre-aggregation, incremental refresh, query optimization." },
    { question: "Design a reporting suite for tracking a company's quarterly OKRs.", difficulty: "hard",
      ideal_answer_points: "Metric definitions, drill-downs, update cadence, ownership." },
  ],
  "aids-ai-product": [
    { question: "What's the difference between precision and recall from a product perspective?", difficulty: "easy",
      ideal_answer_points: "Ties false positives/negatives to real user-facing consequences." },
    { question: "How would you prioritize an AI feature roadmap with limited ML engineering resources?", difficulty: "medium",
      ideal_answer_points: "Impact vs effort, data readiness, quick wins vs strategic bets." },
    { question: "Design the success metrics for an AI-powered recommendation feature.", difficulty: "hard",
      ideal_answer_points: "Engagement, relevance, business KPIs, guardrails against bias/harm." },
  ],
};
