// AIML branch — company-oriented question bank.
// category: 'technical' | 'hr_behavioral' | 'case_study' | 'coding'
// company_type: 'product_based' | 'service_based' | 'startup' | 'core_company'

export type HRQuestion = {
  question: string;
  category: "technical" | "hr_behavioral" | "case_study" | "coding";
  company_type: "product_based" | "service_based" | "startup" | "core_company";
  guidance: string;
};

export const AIML_HR_QUESTIONS: Record<string, HRQuestion[]> = {
  "aiml-ml-engineer": [
    { question: "Explain the bias-variance tradeoff and how you'd diagnose which one is hurting your model.", category: "technical", company_type: "product_based",
      guidance: "Define both terms, tie to learning curves, mention fixes (more data/regularization vs more complex model)." },
    { question: "Walk me through how you'd build a recommendation system for an e-commerce app.", category: "case_study", company_type: "product_based",
      guidance: "Cover data collection, collaborative vs content-based filtering, cold-start problem, evaluation metrics." },
    { question: "How does gradient descent differ from stochastic gradient descent and Adam?", category: "technical", company_type: "product_based",
      guidance: "Explain batch size tradeoffs, momentum, adaptive learning rates." },
    { question: "A model performs well in training but poorly in production — how do you debug it?", category: "case_study", company_type: "startup",
      guidance: "Check data drift, train/serve skew, feature leakage, distribution shift." },
    { question: "Tell me about a time you had to explain a technical ML result to a non-technical stakeholder.", category: "hr_behavioral", company_type: "product_based",
      guidance: "Use STAR format; emphasize simplifying without losing accuracy." },
    { question: "Why do you want to work in machine learning specifically, not general software engineering?", category: "hr_behavioral", company_type: "service_based",
      guidance: "Connect to genuine interest and a specific project/experience, not generic enthusiasm." },
    { question: "Explain overfitting and three concrete techniques to reduce it.", category: "technical", company_type: "service_based",
      guidance: "Regularization, dropout, early stopping, more data, cross-validation." },
    { question: "Design an ML system to detect fraudulent transactions in real time.", category: "case_study", company_type: "product_based",
      guidance: "Discuss class imbalance, latency constraints, feature engineering, precision/recall tradeoff." },
    { question: "What's the difference between bagging and boosting?", category: "technical", company_type: "service_based",
      guidance: "Parallel vs sequential ensemble, variance vs bias reduction, examples (Random Forest vs XGBoost)." },
    { question: "Describe a project where your model didn't work as expected — what did you do?", category: "hr_behavioral", company_type: "startup",
      guidance: "Show debugging process and what you learned, not just the fix." },
  ],
  "aiml-data-scientist": [
    { question: "How would you design an A/B test to measure the impact of a new feature?", category: "case_study", company_type: "product_based",
      guidance: "Cover hypothesis, sample size, randomization, guardrail metrics, statistical significance." },
    { question: "Write a SQL query to find the second-highest salary in each department.", category: "coding", company_type: "product_based",
      guidance: "Use window functions (DENSE_RANK) or correlated subquery; discuss edge cases." },
    { question: "Explain p-value and common misinterpretations of it.", category: "technical", company_type: "product_based",
      guidance: "P-value is not probability the null is true; tie to significance threshold and Type I error." },
    { question: "How do you handle missing data in a dataset?", category: "technical", company_type: "service_based",
      guidance: "Discuss MCAR/MAR/MNAR, imputation strategies, and when to drop vs impute." },
    { question: "Tell me about a data project where your analysis changed a business decision.", category: "hr_behavioral", company_type: "startup",
      guidance: "Quantify the impact; show the chain from insight to decision." },
    { question: "How would you detect if a metric's drop is due to seasonality vs a real issue?", category: "case_study", company_type: "product_based",
      guidance: "Compare year-over-year trends, decompose time series, check for confounders." },
    { question: "What's the difference between correlation and causation, with an example?", category: "technical", company_type: "service_based",
      guidance: "Use a concrete example (ice cream sales and drowning) and mention confounders." },
    { question: "How do you prioritize which analysis to work on when everything seems urgent?", category: "hr_behavioral", company_type: "startup",
      guidance: "Discuss impact vs effort framework and stakeholder alignment." },
  ],
  "aiml-dl-engineer": [
    { question: "Explain the vanishing gradient problem and how architectures like LSTM or ResNet address it.", category: "technical", company_type: "product_based",
      guidance: "Gate mechanisms for LSTM, skip connections for ResNet." },
    { question: "Design a system to classify manufacturing defects from images with limited labeled data.", category: "case_study", company_type: "core_company",
      guidance: "Discuss transfer learning, data augmentation, active learning." },
    { question: "Why does batch normalization help training?", category: "technical", company_type: "product_based",
      guidance: "Reduces internal covariate shift, allows higher learning rates, has a regularizing effect." },
    { question: "Walk me through a research paper you implemented from scratch.", category: "hr_behavioral", company_type: "startup",
      guidance: "Explain the problem, your implementation choices, and results vs the paper." },
  ],
  "aiml-nlp-engineer": [
    { question: "Explain how attention mechanisms work in transformers.", category: "technical", company_type: "product_based",
      guidance: "Query/key/value intuition, why it beats fixed-length RNN context." },
    { question: "How would you build a customer-support chatbot grounded in company documents?", category: "case_study", company_type: "startup",
      guidance: "Cover RAG pipeline: embedding, vector store, retrieval, prompt construction, evaluation." },
    { question: "What's the difference between fine-tuning and prompt engineering — when would you use each?", category: "technical", company_type: "product_based",
      guidance: "Cost, data requirements, latency, and use-case fit." },
    { question: "How do you evaluate a generative model's output quality?", category: "technical", company_type: "product_based",
      guidance: "BLEU/ROUGE limitations, human eval, task-specific metrics, hallucination checks." },
  ],
  "aiml-cv-engineer": [
    { question: "Explain the difference between object detection, segmentation, and classification.", category: "technical", company_type: "core_company",
      guidance: "Define each task and give a use case for each." },
    { question: "Design a defect-detection system for a production line camera feed.", category: "case_study", company_type: "core_company",
      guidance: "Cover real-time constraints, model choice, false-positive cost." },
    { question: "How does non-max suppression work in object detection?", category: "technical", company_type: "product_based",
      guidance: "Explain IoU thresholding and why it's needed to remove duplicate boxes." },
  ],
  "aiml-mlops": [
    { question: "How would you design a CI/CD pipeline for ML models?", category: "case_study", company_type: "product_based",
      guidance: "Cover versioning (data + model), automated testing, staged rollout, rollback." },
    { question: "What is model drift, and how do you detect it in production?", category: "technical", company_type: "product_based",
      guidance: "Distinguish data drift vs concept drift; mention monitoring tools and statistical tests." },
    { question: "Tell me about a time a production model failed — what was your response process?", category: "hr_behavioral", company_type: "startup",
      guidance: "Focus on incident response and prevention, not just the fix." },
  ],
};
