// AIML branch — mock interview question bank.
// ideal_answer_points is the rubric the grading AI (lib/ai.ts) uses
// to score a user's typed/spoken answer instead of a random number.

export type MockQuestion = {
  question: string;
  ideal_answer_points: string;
  difficulty: "easy" | "medium" | "hard";
};

export const AIML_MOCK_INTERVIEW: Record<string, MockQuestion[]> = {
  "aiml-ml-engineer": [
    { question: "What is regularization and why do we need it?", difficulty: "easy",
      ideal_answer_points: "Penalizes large weights; reduces overfitting; mentions L1 (sparsity) vs L2 (shrinkage)." },
    { question: "Explain the difference between precision and recall, and when you'd optimize for each.", difficulty: "medium",
      ideal_answer_points: "Precision = TP/(TP+FP); recall = TP/(TP+FN); precision matters when false positives are costly (spam), recall when false negatives are costly (disease detection)." },
    { question: "How would you handle a severely imbalanced dataset (99% vs 1%)?", difficulty: "medium",
      ideal_answer_points: "Resampling (SMOTE/undersampling), class weights, appropriate metrics (F1/AUC not accuracy), anomaly-detection framing." },
    { question: "Design a scalable pipeline to serve an ML model to 1 million users.", difficulty: "hard",
      ideal_answer_points: "Batch vs real-time serving, caching, model versioning, load balancing, latency budget, monitoring." },
    { question: "What happens if you don't scale your features before training a KNN or SVM model?", difficulty: "easy",
      ideal_answer_points: "Distance-based algorithms get dominated by large-magnitude features; mentions StandardScaler/MinMaxScaler." },
  ],
  "aiml-data-scientist": [
    { question: "How do you determine if a difference between two groups is statistically significant?", difficulty: "medium",
      ideal_answer_points: "Hypothesis test, p-value vs significance threshold, effect size, sample size considerations." },
    { question: "Explain what a confidence interval means in plain language.", difficulty: "easy",
      ideal_answer_points: "Range of plausible values for a parameter at a given confidence level; not 'probability the true value is in range'." },
    { question: "Walk through how you'd approach a churn-prediction problem end to end.", difficulty: "hard",
      ideal_answer_points: "Problem framing, data collection, feature engineering, model choice, evaluation (precision/recall), deployment/monitoring." },
  ],
  "aiml-dl-engineer": [
    { question: "Why do transformers scale better than RNNs for long sequences?", difficulty: "medium",
      ideal_answer_points: "Parallelizable attention vs sequential RNN processing; handles long-range dependencies better." },
    { question: "What's the purpose of dropout, and where would you place it in a network?", difficulty: "easy",
      ideal_answer_points: "Randomly zeroes activations during training to prevent co-adaptation/overfitting; typically after dense/conv layers, not output layer." },
  ],
  "aiml-nlp-engineer": [
    { question: "What is the difference between extractive and abstractive summarization?", difficulty: "easy",
      ideal_answer_points: "Extractive selects existing sentences; abstractive generates new text; tradeoffs in fluency vs faithfulness." },
    { question: "How would you reduce hallucinations in a RAG-based chatbot?", difficulty: "hard",
      ideal_answer_points: "Better retrieval quality, grounding prompts, citation requirements, confidence thresholds, human-in-the-loop review." },
  ],
  "aiml-cv-engineer": [
    { question: "What's the difference between IoU and mAP as evaluation metrics?", difficulty: "medium",
      ideal_answer_points: "IoU measures overlap for a single box; mAP aggregates precision-recall across classes/thresholds." },
  ],
  "aiml-mlops": [
    { question: "What's the difference between data drift and concept drift?", difficulty: "medium",
      ideal_answer_points: "Data drift = input distribution changes; concept drift = relationship between input and output changes." },
  ],
};
