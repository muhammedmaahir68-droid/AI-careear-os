// AIML branch — full syllabus for all 6 role tracks.
// Shape matches syllabus_levels + syllabus_items tables so this
// can be bulk-inserted directly, or read client-side as static
// fallback data before the DB is seeded.

export type SyllabusItem = { id: string; title: string; type: "concept" | "checklist" | "resource" };
export type SyllabusLevel = { id: string; level: number; title: string; description: string; items: SyllabusItem[] };

export const AIML_SYLLABUS: Record<string, SyllabusLevel[]> = {
  "aiml-ml-engineer": [
    { id: "l1", level: 1, title: "Python & Math Foundations", description: "Core language + linear algebra/statistics for ML",
      items: [
        { id: "i1", title: "NumPy, Pandas, Matplotlib fluency", type: "checklist" },
        { id: "i2", title: "Linear algebra: vectors, matrices, eigenvalues", type: "concept" },
        { id: "i3", title: "Probability & statistics for ML", type: "concept" },
        { id: "i4", title: "Calculus: gradients, partial derivatives", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Classical Machine Learning", description: "Supervised and unsupervised algorithms",
      items: [
        { id: "i1", title: "Regression: linear, logistic, regularization", type: "concept" },
        { id: "i2", title: "Tree-based models: decision trees, random forest, XGBoost", type: "concept" },
        { id: "i3", title: "Clustering: k-means, DBSCAN, hierarchical", type: "concept" },
        { id: "i4", title: "Bias-variance tradeoff, cross-validation", type: "concept" },
        { id: "i5", title: "Build 3 end-to-end ML projects (Kaggle-style)", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Deep Learning Basics", description: "Neural network fundamentals",
      items: [
        { id: "i1", title: "Feedforward networks, backpropagation", type: "concept" },
        { id: "i2", title: "Activation functions, optimizers (Adam, SGD)", type: "concept" },
        { id: "i3", title: "PyTorch or TensorFlow fluency", type: "checklist" },
        { id: "i4", title: "CNNs for vision, RNNs/LSTMs for sequences", type: "concept" },
      ] },
    { id: "l4", level: 4, title: "MLOps & Deployment", description: "Taking models to production",
      items: [
        { id: "i1", title: "Model serving: Flask/FastAPI, Docker", type: "checklist" },
        { id: "i2", title: "Experiment tracking (MLflow/W&B)", type: "concept" },
        { id: "i3", title: "Model monitoring & drift detection", type: "concept" },
        { id: "i4", title: "CI/CD for ML pipelines", type: "concept" },
      ] },
    { id: "l5", level: 5, title: "Placement Ready", description: "Interview prep and readiness",
      items: [
        { id: "i1", title: "Solve 50 DSA problems (arrays, trees, graphs)", type: "checklist" },
        { id: "i2", title: "2 ML system design case studies", type: "checklist" },
        { id: "i3", title: "Mock interview: 3 technical + 1 HR round", type: "checklist" },
        { id: "i4", title: "Portfolio: 2 deployed ML projects with README", type: "checklist" },
        { id: "i5", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "aiml-data-scientist": [
    { id: "l1", level: 1, title: "Statistics & Python", description: "Foundations for data science",
      items: [
        { id: "i1", title: "Descriptive & inferential statistics", type: "concept" },
        { id: "i2", title: "Hypothesis testing, A/B testing", type: "concept" },
        { id: "i3", title: "Pandas/SQL for data wrangling", type: "checklist" },
      ] },
    { id: "l2", level: 2, title: "Modeling & Experimentation", description: "Building predictive models",
      items: [
        { id: "i1", title: "Regression & classification modeling", type: "concept" },
        { id: "i2", title: "Feature engineering & selection", type: "concept" },
        { id: "i3", title: "Experiment design and causal inference basics", type: "concept" },
      ] },
    { id: "l3", level: 3, title: "Visualization & Storytelling", description: "Communicating insights",
      items: [
        { id: "i1", title: "Matplotlib/Seaborn/Tableau/PowerBI", type: "checklist" },
        { id: "i2", title: "Build a stakeholder-facing dashboard", type: "checklist" },
      ] },
    { id: "l4", level: 4, title: "Advanced Topics", description: "Scaling data science work",
      items: [
        { id: "i1", title: "Time series forecasting", type: "concept" },
        { id: "i2", title: "Recommendation systems basics", type: "concept" },
      ] },
    { id: "l5", level: 5, title: "Placement Ready", description: "Interview prep and readiness",
      items: [
        { id: "i1", title: "SQL interview problem set (30 queries)", type: "checklist" },
        { id: "i2", title: "2 case-study style mock interviews", type: "checklist" },
        { id: "i3", title: "Portfolio: 2 end-to-end DS case studies", type: "checklist" },
        { id: "i4", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "aiml-dl-engineer": [
    { id: "l1", level: 1, title: "Neural Network Foundations", description: "Core deep learning theory",
      items: [
        { id: "i1", title: "Backpropagation math from scratch", type: "concept" },
        { id: "i2", title: "Loss functions & optimization landscape", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Architectures", description: "Modern deep learning architectures",
      items: [
        { id: "i1", title: "CNNs (ResNet, EfficientNet)", type: "concept" },
        { id: "i2", title: "RNN/LSTM/GRU sequence models", type: "concept" },
        { id: "i3", title: "Transformers & attention mechanism", type: "concept" },
      ] },
    { id: "l3", level: 3, title: "Training at Scale", description: "Practical deep learning engineering",
      items: [
        { id: "i1", title: "GPU training, mixed precision", type: "checklist" },
        { id: "i2", title: "Regularization: dropout, batch norm, augmentation", type: "concept" },
      ] },
    { id: "l4", level: 4, title: "Placement Ready", description: "Interview prep and readiness",
      items: [
        { id: "i1", title: "Reproduce 2 papers from scratch", type: "checklist" },
        { id: "i2", title: "Mock interview: architecture design round", type: "checklist" },
        { id: "i3", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "aiml-nlp-engineer": [
    { id: "l1", level: 1, title: "NLP Foundations", description: "Text processing fundamentals",
      items: [
        { id: "i1", title: "Tokenization, embeddings (Word2Vec, GloVe)", type: "concept" },
        { id: "i2", title: "Classical NLP: TF-IDF, n-grams, POS tagging", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Modern NLP & LLMs", description: "Transformer-based systems",
      items: [
        { id: "i1", title: "Transformer architecture deep dive", type: "concept" },
        { id: "i2", title: "Fine-tuning pretrained models (BERT/GPT-style)", type: "checklist" },
        { id: "i3", title: "RAG (retrieval-augmented generation) basics", type: "concept" },
        { id: "i4", title: "Prompt engineering fundamentals", type: "concept" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep and readiness",
      items: [
        { id: "i1", title: "Build 1 RAG/chatbot project end-to-end", type: "checklist" },
        { id: "i2", title: "Mock interview: NLP system design", type: "checklist" },
        { id: "i3", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "aiml-cv-engineer": [
    { id: "l1", level: 1, title: "Vision Foundations", description: "Image processing basics",
      items: [
        { id: "i1", title: "OpenCV: filtering, edge detection, transforms", type: "checklist" },
        { id: "i2", title: "Image classification with CNNs", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Advanced CV", description: "Detection and segmentation",
      items: [
        { id: "i1", title: "Object detection (YOLO, Faster R-CNN)", type: "concept" },
        { id: "i2", title: "Semantic/instance segmentation", type: "concept" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep and readiness",
      items: [
        { id: "i1", title: "Build 1 real-time detection app", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "aiml-mlops": [
    { id: "l1", level: 1, title: "Infra Foundations", description: "Cloud and containers",
      items: [
        { id: "i1", title: "Docker & Kubernetes basics", type: "checklist" },
        { id: "i2", title: "Cloud ML platforms (SageMaker/Vertex AI)", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "ML Pipelines", description: "Automating the ML lifecycle",
      items: [
        { id: "i1", title: "CI/CD for models, feature stores", type: "concept" },
        { id: "i2", title: "Monitoring, drift detection, retraining triggers", type: "concept" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep and readiness",
      items: [
        { id: "i1", title: "Deploy 1 full ML pipeline end-to-end", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
};
