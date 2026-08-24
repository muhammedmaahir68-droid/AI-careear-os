import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

export const AIML_AIDS_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "Supervised Learning & Regression Metrics",
    roles: ["aiml-ml-engineer", "aiml-data-scientist", "aiml-dl-engineer"],
    industryUseCase: "Algorithmic Pricing & Demand Forecasting at Airbnb/Uber",
    harvardOxfordRef: "Harvard STAT 110 Probability & Applied Statistical Learning",
    level: "Level 1 – AI/DS Core",
    branch: ["aiml", "aids"],
    videos: makeVideoLinks("Supervised Learning Linear Regression MSE R2 Score"),
    studyMaterial: {
      summary: `Supervised learning fits models on labeled datasets (X, y).
Linear Regression predicts continuous output: y = W^T * X + b.
Evaluation Metrics:
- Mean Squared Error (MSE): (1/N) * ∑(y - ŷ)² — penalizes large errors.
- Root Mean Squared Error (RMSE): √MSE.
- R² Score (Coefficient of Determination): 1 - (SS_res / SS_tot). 1.0 represents perfect prediction.`,
      keyPoints: [
        "Supervised learning requires labeled features and ground truth targets.",
        "MSE is convex for Linear Regression ensuring global minimum via Gradient Descent.",
        "R² measures proportion of target variance explained by model inputs.",
        "Overfitting occurs when model memorizes training noise; prevented using L1 (Lasso) / L2 (Ridge) regularization."
      ],
      example: `import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

X = np.array([[1], [2], [3], [4]])
y = np.array([2, 4, 5, 4])
model = LinearRegression().fit(X, y)
preds = model.predict(X)
print("MSE:", mean_squared_error(y, preds))
print("R2:", r2_score(y, preds))`,
      complexity: "Gradient Descent Step: O(n * d) | Matrix Inversion: O(d³)"
    },
    aiExplain: {
      steps: [
        "1. Define input features X and continuous target y.",
        "2. Initialize weight vector W and bias b.",
        "3. Compute predictions ŷ = X*W + b.",
        "4. Calculate Loss = MSE(y, ŷ).",
        "5. Update W = W - learning_rate * ∇Loss via Backprop/Gradient Descent."
      ],
      analogy: "Drawing the best fitting line through scatter plots of house sizes vs prices to estimate future house prices!"
    },
    debug: [
      {
        title: "Fix MSE Formula Scaling Error",
        buggy: `def mse(y_true, y_pred):\n    return sum((y_true - y_pred)) ** 2 / len(y_true) • Bug: squaring sum instead of sum of squares`,
        fixed: `import numpy as np\ndef mse(y_true, y_pred):\n    return np.mean((y_true - y_pred) ** 2)`,
        hint: "Square the error differences FIRST, then take the mean average."
      }
    ],
    quiz: [
      { q: "Which metric evaluates regression models?", options: ["Confusion Matrix", "Mean Squared Error (MSE)", "F1 Score", "ROC-AUC"], answer: 1 },
      { q: "What does an R² score of 1.0 indicate?", options: ["Worst fit", "Perfect fit", "Overfitting only", "Zero variance"], answer: 1 },
      { q: "Which regularization technique adds absolute weight values to loss (L1)?", options: ["Ridge", "Lasso", "ElasticNet", "Dropout"], answer: 1 },
      { q: "Why is MSE preferred over MAE for gradient descent?", options: ["MSE is smooth and differentiable everywhere", "MSE is linear", "MSE ignores outliers", "MSE requires no computation"], answer: 0 },
      { q: "What happens when learning rate α is too large in Gradient Descent?", options: ["Converges faster", "Overshoots minimum and diverges", "Stops learning", "Weights become 0"], answer: 1 }
    ],
    mnc: [
      { company: "Fractal Analytics", year: "2023", question: "Difference between L1 (Lasso) and L2 (Ridge) Regularization", answer: "L1 adds ∑|W| causing feature selection by driving weights to absolute zero; L2 adds ∑W² shrinking weights smoothly." },
      { company: "Tiger Analytics", year: "2023", question: "How to handle Multicollinearity in Regression?", answer: "Use Variance Inflation Factor (VIF) > 5 to detect and drop collinear features or apply PCA." },
      { company: "Amazon AI", year: "2022", question: "Explain Bias-Variance Tradeoff", answer: "High bias causes Underfitting; High variance causes Overfitting. Optimal model minimizes Total Error = Bias² + Variance + Irreducible Noise." }
    ],
    mock: [
      { type: "Technical", question: "How do you handle missing values in a Machine Learning dataset?", tip: "Mean/Median imputation for continuous numerical variables; Mode imputation for categorical variables; or advanced KNN/MICE imputation." }
    ],
    coding: {
      problem: "Calculate Mean Squared Error",
      desc: "Implement MSE function for two numeric arrays.",
      input: "y_true = [3, -0.5, 2, 7], y_pred = [2.5, 0.0, 2, 8]",
      output: "0.375",
      starter: `def compute_mse(y_true, y_pred):\n    • Return mean squared difference\n    pass`
    }
  },
  {
    moduleTitle: "Neural Networks & Backpropagation",
    roles: ["aiml-ml-engineer", "aiml-data-scientist", "aiml-dl-engineer"],
    industryUseCase: "Algorithmic Pricing & Demand Forecasting at Airbnb/Uber",
    harvardOxfordRef: "Harvard STAT 110 Probability & Applied Statistical Learning",
    level: "Level 2 – Deep Learning",
    branch: ["aiml", "aids"],
    videos: makeVideoLinks("Neural Networks Backpropagation Vanishing Gradient Activation Functions"),
    studyMaterial: {
      summary: `Artificial Neural Networks (ANN) consist of Input, Hidden, and Output layers connected by trainable weights.
Forward Pass: Compute weighted sums z = W*x + b, apply non-linear Activation Function a = σ(z).
Activation Functions: ReLU, Sigmoid, Softmax, Tanh.
Backpropagation: Computes partial derivatives of Loss with respect to every weight using the Calculus Chain Rule.`,
      keyPoints: [
        "Non-linear activations allow neural nets to learn arbitrary complex decision boundaries.",
        "ReLU (Rectified Linear Unit): max(0, x) prevents vanishing gradients for positive inputs.",
        "Vanishing Gradient occurs in deep networks using Sigmoid/Tanh as gradients approach zero backwards.",
        "Softmax converts output logits into normalized probability distributions summing to 1.0."
      ],
      example: `import numpy as np

def relu(x):
    return np.maximum(0, x)

def softmax(z):
    exp_z = np.exp(z - np.max(z))
    return exp_z / np.sum(exp_z, axis=-1, keepdims=True)`,
      complexity: "Forward/Backward Pass: O(Layer_Nodes * Next_Nodes)"
    },
    aiExplain: {
      steps: [
        "1. Pass input tensor X through hidden layer matrix W1: z1 = X*W1 + b1.",
        "2. Apply non-linear activation: h1 = ReLU(z1).",
        "3. Compute output logits: z2 = h1*W2 + b2.",
        "4. Calculate Loss using Cross-Entropy or MSE.",
        "5. Apply Chain Rule backward: dLoss/dW2 = h1^T * dLoss/dz2."
      ],
      analogy: "An orchestra adjusting instrument volumes: if the final song sounds off (high loss), the conductor backpropagates feedback to each musician to tune their instruments (weights) slightly!"
    },
    debug: [
      {
        title: "Fix Softmax Numerical Overflow",
        buggy: `def softmax(x):\n    return np.exp(x) / np.sum(np.exp(x)) • Bug: np.exp(large_val) causes overflow inf`,
        fixed: `def softmax(x):\n    e_x = np.exp(x - np.max(x))\n    return e_x / e_x.sum(axis=0)`,
        hint: "Subtract max(x) before exponentiation to prevent numerical overflow in float32/64."
      }
    ],
    quiz: [
      { q: "Which problem occurs when gradients approach 0 in deep Sigmoid networks?", options: ["Exploding Gradient", "Vanishing Gradient", "Overfitting", "Dead Neurons"], answer: 1 },
      { q: "What is the mathematical definition of ReLU activation?", options: ["1 / (1 + e^-x)", "max(0, x)", "tanh(x)", "e^x / sum(e^x)"], answer: 1 },
      { q: "Which activation function is standard for multi-class classification output?", options: ["ReLU", "Sigmoid", "Softmax", "Linear"], answer: 2 },
      { q: "What calculus principle powers Backpropagation?", options: ["L'Hopital's Rule", "Chain Rule", "Taylor Series", "Fourier Transform"], answer: 1 },
      { q: "Which technique randomly deactivates neurons during training to stop overfitting?", options: ["Batch Normalization", "Dropout", "Early Stopping", "Gradient Clipping"], answer: 1 }
    ],
    mnc: [
      { company: "Google AI", year: "2023", question: "How does Batch Normalization accelerate training?", answer: "Normalizes layer inputs to zero mean and unit variance per batch, reducing internal covariate shift." },
      { company: "NVIDIA", year: "2023", question: "Explain Vanishing vs Exploding Gradients", answer: "Vanishing: gradients < 1 shrink exponentially backwards; Exploding: gradients > 1 grow exponentially causing NaN weights." },
      { company: "Microsoft AI", year: "2022", question: "Why is ReLU preferred over Sigmoid in hidden layers?", answer: "Derivative of ReLU for x>0 is 1.0, preventing gradient decay during backpropagation." }
    ],
    mock: [
      { type: "Technical", question: "What is the difference between Epoch, Batch Size, and Iteration?", tip: "Epoch = 1 full pass over whole dataset; Batch Size = number of samples processed together; Iteration = number of batches needed to complete 1 epoch." }
    ],
    coding: {
      problem: "Implement ReLU & Softmax",
      desc: "Implement ReLU activation and numerically stable Softmax in Python.",
      input: "z = [2.0, 1.0, 0.1]",
      output: "Normalized probabilities",
      starter: `import numpy as np\n\ndef relu(x):\n    pass\n\ndef softmax(x):\n    pass`
    }
  },
  {
    moduleTitle: "Python Fundamentals & Data Wrangling for ML",
    roles: ["aiml-ml-engineer", "aiml-data-scientist", "aiml-dl-engineer"],
    industryUseCase: "Algorithmic Pricing & Demand Forecasting at Airbnb/Uber",
    harvardOxfordRef: "Harvard STAT 110 Probability & Applied Statistical Learning",
    level: "Level 1 – ML Foundations",
    branch: ["aiml", "aids"],
    videos: makeVideoLinks("Python Data Wrangling NumPy Pandas Scikit-Learn"),
    studyMaterial: {
      summary: `Data wrangling is the process of cleaning, transforming, and mapping raw data into a format suitable for machine learning algorithms.

NumPy provides fast vector and matrix computations using contiguous memory C-arrays. Vectorization avoids slow Python for-loops.

Pandas introduces Series and DataFrame objects for table manipulation: indexing, filtering, groupby aggregations, merging, and handling missing values (NaNs).

Scikit-Learn provides standardized interfaces (fit, transform, predict) for preprocessing (StandardScaler, OneHotEncoder) and modeling pipelines.`,
      keyPoints: [
        "NumPy array operations use SIMD vectorization for up to 100x performance gains over native Python loops.",
        "Broadcasting automatically aligns shapes of arrays with compatible dimensions.",
        "One-Hot Encoding converts categorical variables into binary indicator vectors for linear models.",
        "Train-Test Split prevents data leakage by isolating validation data before fitting transformers."
      ],
      example: `import pandas as pd
from sklearn.preprocessing import StandardScaler

df = pd.DataFrame({'age': [25, 30, 35], 'city': ['NY', 'SF', 'NY']})
scaler = StandardScaler()
df['age_scaled'] = scaler.fit_transform(df[['age']])
print(df)`,
      complexity: "NumPy Vectorized Ops: O(N) C-speed | Pandas GroupBy: O(N log N)"
    },
    aiExplain: {
      steps: [
        "1. Load raw CSV/JSON data into Pandas DataFrame.",
        "2. Inspect missing values (df.isnull().sum()) and clean NaNs.",
        "3. Encode categorical features using OneHotEncoder or LabelEncoder.",
        "4. Scale numerical features using StandardScaler or MinMaxScaler.",
        "5. Split dataset into X_train, X_test, y_train, y_test."
      ],
      analogy: "Preparing raw ingredients in a kitchen before cooking — washing, chopping, and measuring spices so the recipe (ML algorithm) turns out perfect!"
    },
    debug: [
      {
        title: "Fix Data Leakage in Scaling",
        buggy: `• BUG: Scaling entire dataset before splitting\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)\nX_train, X_test = train_test_split(X_scaled)`,
        fixed: `X_train, X_test = train_test_split(X)\nscaler = StandardScaler()\nX_train = scaler.fit_transform(X_train)\nX_test = scaler.transform(X_test) • Transform test only!`,
        hint: "Never call fit() or fit_transform() on test data! Only fit on train to avoid data leakage."
      }
    ],
    quiz: [
      { q: "Which Pandas function turns categorical columns into binary dummy variables?", options: ["pd.concat()", "pd.get_dummies()", "pd.pivot()", "pd.melt()"], answer: 1 },
      { q: "What is data leakage in ML?", options: ["Data corrupted on disk", "Test information leaking into training phase", "Memory leak in Python", "Network data interception"], answer: 1 },
      { q: "What does StandardScaler do?", options: ["Rescales values to [0,1]", "Transforms features to zero mean and unit variance", "Converts text to numbers", "Removes outliers"], answer: 1 },
      { q: "Which NumPy attribute gives array dimensions?", options: [".dim", ".shape", ".size", ".length"], answer: 1 },
      { q: "Why call scaler.transform(X_test) instead of fit_transform?", options: ["Faster execution", "Prevents test data leakage into scaler parameters", "It gives better accuracy", "fit_transform doesn't work on arrays"], answer: 1 }
    ],
    mnc: [
      { company: "Fractal Analytics", year: "2023", question: "How to handle extreme outliers in Pandas DataFrames?", answer: "Use IQR (Interquartile Range) capping: filter values outside [Q1 - 1.5*IQR, Q3 + 1.5*IQR] or apply log transformation." },
      { company: "Mu Sigma", year: "2023", question: "Difference between fit(), transform(), and fit_transform()", answer: "fit() computes parameters (mean, std); transform() applies transformation; fit_transform() does both efficiently on training data." },
      { company: "LatentView", year: "2022", question: "How do you handle imbalanced datasets?", answer: "Use SMOTE (Synthetic Minority Over-sampling Technique), Class Weight balancing, or precision-recall curves instead of accuracy." }
    ],
    mock: [
      { type: "Technical", question: "Why is accuracy a poor metric for imbalanced classification?", tip: "In a dataset with 99% negative and 1% positive cases, a dumb model predicting all negatives gets 99% accuracy but 0% recall. Use F1-Score, ROC-AUC, or Precision-Recall AUC instead." }
    ],
    coding: {
      problem: "Standard Scaler Implementation",
      desc: "Implement a simple z-score normalization function for a list of numbers.",
      input: "data = [10, 20, 30, 40, 50]",
      output: "[-1.414, -0.707, 0.0, 0.707, 1.414]",
      starter: `import math\n\ndef z_score_normalize(arr):\n    • Return [(x - mean) / std for x in arr]\n    pass`
    }
  },
  {
    moduleTitle: "Classification – Decision Trees, Random Forest, SVM",
    roles: ["aiml-ml-engineer", "aiml-data-scientist", "aiml-dl-engineer"],
    industryUseCase: "Algorithmic Pricing & Demand Forecasting at Airbnb/Uber",
    harvardOxfordRef: "Harvard STAT 110 Probability & Applied Statistical Learning",
    level: "Level 3 – Machine Learning",
    branch: ["aiml", "aids"],
    videos: makeVideoLinks("Decision Trees Random Forest SVM Classification ML"),
    studyMaterial: {
      summary: `Classification predicts discrete class labels (e.g. Spam/Ham, Tumor/Benign).

Decision Trees recursively partition feature space based on Information Gain (Entropy reduction) or Gini Impurity:
- Entropy: H(S) = -∑ p_i log₂(p_i).
- Gini Impurity: 1 - ∑ (p_i)².

Random Forest is an ensemble of de-correlated decision trees built using Bagging (Bootstrap Aggregating) and random feature subsets, reducing variance significantly without increasing bias.

Support Vector Machines (SVM) find the optimal hyper-plane maximizing margin distance between classes. Kernel Trick (RBF, Polynomial) projects data into higher dimensions for non-linear separation.`,
      keyPoints: [
        "Decision trees overfit easily if unpruned (high depth = memorizing training set).",
        "Random Forest uses bagging to reduce variance and feature randomness to de-correlate trees.",
        "SVM maximizes the margin: distance between support vectors and decision boundary.",
        "Kernel Trick computes high-dimensional inner products without explicitly projecting data."
      ],
      example: `from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC

rf = RandomForestClassifier(n_estimators=100, max_depth=5)
svm = SVC(kernel='rbf', C=1.0)`,
      complexity: "Tree Training: O(n * d * log n) | SVM Training: O(n² to n³)"
    },
    aiExplain: {
      steps: [
        "1. Select splitting metric (Gini or Entropy) for Decision Tree root node.",
        "2. Find feature split that maximizes Information Gain.",
        "3. Recursively split child nodes until max_depth or pure leaf reached.",
        "4. Combine 100+ trees in Random Forest with majority voting.",
        "5. For SVM: solve quadratic programming problem to locate support vectors."
      ],
      analogy: "A single doctor giving a diagnosis (Decision Tree) vs a board of 100 doctors voting independently (Random Forest) to eliminate individual errors!"
    },
    debug: [
      {
        title: "Fix Overfitting in Decision Tree",
        buggy: `tree = DecisionTreeClassifier() • Bug: no max_depth limit leads to infinite depth and overfitting`,
        fixed: `tree = DecisionTreeClassifier(max_depth=5, min_samples_split=10)`,
        hint: "Always restrict max_depth or set min_samples_split to prevent decision trees from over-fitting."
      }
    ],
    quiz: [
      { q: "Which ensemble technique underpins Random Forest?", options: ["Boosting", "Bagging", "Stacking", "Cascading"], answer: 1 },
      { q: "What is Gini Impurity of a perfectly pure node with only one class?", options: ["0.5", "1.0", "0.0", "-1.0"], answer: 2 },
      { q: "What are Support Vectors in SVM?", options: ["All training data points", "Data points closest to the hyper-plane boundary", "Tree leaf nodes", "Outliers"], answer: 1 },
      { q: "What does the Kernel Trick in SVM enable?", options: ["Faster training speed", "Non-linear classification by implicit high-dimensional mapping", "Feature selection", "Handling missing values"], answer: 1 },
      { q: "Which hyperparameter controls trade-off between margin size and misclassification in SVM?", options: ["C", "Alpha", "Gamma", "Learning rate"], answer: 0 }
    ],
    mnc: [
      { company: "Flipkart", year: "2023", question: "Compare Random Forest vs XGBoost", answer: "Random Forest builds parallel independent trees via Bagging (reduces variance); XGBoost builds sequential trees via Boosting (corrects residual errors)." },
      { company: "Walmart Labs", year: "2023", question: "Explain Confusion Matrix metrics", answer: "Precision = TP / (TP + FP); Recall = TP / (TP + FN); F1 = 2*(P*R)/(P+R)." },
      { company: "PayPal", year: "2022", question: "How to handle non-linear decision boundaries with SVM?", answer: "Use Radial Basis Function (RBF) kernel K(x, z) = exp(-γ ||x - z||²) to map features into higher dimensional space." }
    ],
    mock: [
      { type: "Technical", question: "When would you prefer Random Forest over XGBoost?", tip: "Random Forest requires minimal hyperparameter tuning, handles noise well without overfitting, and builds in parallel easily." }
    ],
    coding: {
      problem: "Calculate Gini Impurity",
      desc: "Write a function to calculate Gini Impurity for a list of class labels.",
      input: "labels = [1, 1, 0, 1, 0, 0]",
      output: "0.5",
      starter: `def compute_gini(labels):\n    • Return 1 - sum(p_i^2)\n    pass`
    }
  },
  {
    moduleTitle: "Deep Learning – CNN, RNN, LSTM & Transformers",
    roles: ["aiml-ml-engineer", "aiml-data-scientist", "aiml-dl-engineer"],
    industryUseCase: "Algorithmic Pricing & Demand Forecasting at Airbnb/Uber",
    harvardOxfordRef: "Harvard STAT 110 Probability & Applied Statistical Learning",
    level: "Level 4 – Deep Learning",
    branch: ["aiml", "aids"],
    videos: makeVideoLinks("Convolutional Neural Networks CNN RNN LSTM Transformers Deep Learning"),
    studyMaterial: {
      summary: `Deep Learning architectures specialize based on spatial and temporal structures:

Convolutional Neural Networks (CNN):
- Convolutional Layers: Learn local spatial filters (edge, texture, object detectors).
- Pooling Layers: Max/Average pooling reduces spatial resolution.
- Architectures: ResNet (skip connections solve vanishing gradients), EfficientNet.

Recurrent Neural Networks (RNN & LSTM):
- Process sequential data (time-series, text).
- LSTM introduces Forget, Input, and Output gates with a Cell State to maintain long-range dependencies.

Transformers & Attention:
- Self-Attention Mechanism: Computes Query, Key, Value interaction Q * K^T / √d_k.
- Multi-Head Attention powers state-of-the-art LLMs like BERT and GPT.`,
      keyPoints: [
        "CNN kernel weight sharing dramatically reduces parameters compared to fully-connected layers.",
        "ResNet skip connections allow gradients to flow directly during backprop.",
        "LSTM cell state acts as an information highway guarded by 3 sigmoid gates.",
        "Transformers replace recurrent sequential processing with parallel self-attention mechanisms."
      ],
      example: `import torch
import torch.nn as nn

class ResidualBlock(nn.Module):
    def __init__(self, channels):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(channels, channels, 3, padding=1),
            nn.BatchNorm2d(channels),
            nn.ReLU(),
            nn.Conv2d(channels, channels, 3, padding=1)
        )
    def forward(self, x):
        return torch.relu(x + self.conv(x)) • Residual Skip Connection!`,
      complexity: "CNN Conv Layer: O(K² * C_in * C_out * H * W) | Self-Attention: O(N² * d)"
    },
    aiExplain: {
      steps: [
        "1. CNN slides KxK filters across image matrix to produce feature maps.",
        "2. Max Pooling extracts peak activations per region.",
        "3. For sequences, Multi-Head Attention projects inputs into Query, Key, Value spaces.",
        "4. Calculate Attention weights: Softmax(Q * K^T / √d_k).",
        "5. Multiply weights by Values V to create context-aware representations."
      ],
      analogy: "CNN is like inspecting a photograph with a magnifying glass sliding corner to corner; Transformer self-attention is like reading a sentence where every word instantly looks up every other word!"
    },
    debug: [
      {
        title: "Fix Input Dimension Mismatch in Conv2D",
        buggy: `conv = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3)\n• Input tensor passed as (16, 3, 32, 32) -> Incorrect batch formatting!`,
        fixed: `x = torch.randn(8, 3, 32, 32)\nout = conv(x)`,
        hint: "PyTorch Conv2D expects tensor shape (N, C, H, W) where N is Batch Size."
      }
    ],
    quiz: [
      { q: "What problem do ResNet skip connections resolve?", options: ["Overfitting", "Vanishing Gradient in deep networks", "High memory usage", "Slow inference speed"], answer: 1 },
      { q: "Which gate in LSTM decides how much old information to discard?", options: ["Input Gate", "Forget Gate", "Output Gate", "Update Gate"], answer: 1 },
      { q: "What is the time complexity of Transformer Self-Attention with respect to sequence length N?", options: ["O(N)", "O(N log N)", "O(N²)", "O(1)"], answer: 2 },
      { q: "Why are Transformers faster to train than LSTMs?", options: ["Fewer parameters", "Parallel processing across sequence length", "No activation functions", "Lower precision"], answer: 1 },
      { q: "What operation reduces spatial dimensions in CNNs?", options: ["Convolution", "Batch Normalization", "Max Pooling", "Softmax"], answer: 2 }
    ],
    mnc: [
      { company: "NVIDIA", year: "2023", question: "Explain Self-Attention formula: Softmax(QK^T / √d_k)V", answer: "Q and K dot product measures similarity. Divided by √d_k to prevent gradient vanishing in Softmax. Softmax gives weights used to average V." },
      { company: "Google Brain", year: "2023", question: "Difference between BERT and GPT architectures", answer: "BERT is an Encoder-only bidirectional model; GPT is a Decoder-only autoregressive model." },
      { company: "Meta AI", year: "2022", question: "How does Data Augmentation improve CNN generalization?", answer: "Applies random rotations, crops, flips to training images, forcing CNN to learn invariant features." }
    ],
    mock: [
      { type: "Technical", question: "What is Transfer Learning and why is fine-tuning used in Vision & NLP?", tip: "Transfer learning reuses weights from models pretrained on massive datasets. Freezing early layers and fine-tuning final heads drastically reduces required training data." }
    ],
    coding: {
      problem: "Self-Attention Score Matrix",
      desc: "Implement scaled dot-product attention calculation in NumPy.",
      input: "Q, K, V matrices of shape (seq_len, d_k)",
      output: "Context matrix of shape (seq_len, d_k)",
      starter: `import numpy as np\n\ndef scaled_dot_product_attention(Q, K, V):\n    • Return Softmax(Q @ K.T / sqrt(d_k)) @ V\n    pass`
    }
  },
  {
    moduleTitle: "Generative AI & LLMs – GPT, RAG, Prompt Engineering",
    roles: ["aiml-ml-engineer", "aiml-data-scientist", "aiml-dl-engineer"],
    industryUseCase: "Algorithmic Pricing & Demand Forecasting at Airbnb/Uber",
    harvardOxfordRef: "Harvard STAT 110 Probability & Applied Statistical Learning",
    level: "Level 6 – Cutting-Edge AI",
    branch: ["aiml", "aids"],
    videos: makeVideoLinks("Generative AI LLM GPT RAG Vector Databases Pinecone LangChain Prompt Engineering"),
    studyMaterial: {
      summary: `Generative AI models create new content (text, code, images) by modeling underlying probability distributions.

Large Language Models (LLMs):
- Decoder-only Transformers trained on trillions of tokens via Next-Token Prediction.
- RLHF (Reinforcement Learning from Human Feedback) aligns raw LLMs to follow instructions safely.

Retrieval-Augmented Generation (RAG):
- Solves LLM hallucination and knowledge cutoff issues.
- Workflow: User Query → Embed Query → Vector Search in Vector DB (Pinecone, Chroma, FAISS) → Retrieve Relevant Chunks → Inject Chunks into LLM Prompt → Generate Answer.

Vector Databases & Indexing:
- Store dense embedding vectors representing semantic meaning.
- Search Algorithms: Cosine Similarity, HNSW for fast approximate nearest neighbor search.`,
      keyPoints: [
        "RAG grounds LLM outputs in external private knowledge bases, eliminating hallucinations.",
        "Embedding models convert text strings into dense floating-point vectors.",
        "Vector databases use HNSW or IVF indexes for sub-linear vector similarity search.",
        "Prompt engineering techniques: Few-Shot Prompting, Chain-of-Thought (CoT), System Role Framing."
      ],
      example: `import numpy as np

• Cosine Similarity Search
def cosine_sim(v1, v2):
    return np.dot(v1, v2) / (np.linalg.norm(v1) * np.linalg.norm(v2))`,
      complexity: "Exact Vector Search: O(N * D) | HNSW Vector Search: O(log N * D)"
    },
    aiExplain: {
      steps: [
        "1. Chunk raw knowledge documents into 500-token blocks.",
        "2. Generate vector embeddings for all chunks and store in Vector DB.",
        "3. User sends a query -> Convert query into vector space.",
        "4. Perform Cosine Similarity / HNSW search to retrieve top-k chunks.",
        "5. Prompt LLM with retrieved context."
      ],
      analogy: "LLM without RAG is answering an exam from memory; LLM WITH RAG is quickly searching the textbook index to quote the exact page!"
    },
    debug: [
      {
        title: "Fix RAG Context Overflow Error",
        buggy: `• BUG: Passing all 100 retrieved documents directly into LLM prompt\ncontext = "\\n".join(all_100_docs) • Causes Context Window Overflow`,
        fixed: `context = "\\n".join(retrieved_docs[:3]) • Limit to top-3`,
        hint: "Limit retrieved document count (top-k) to stay within the model's context window limit."
      }
    ],
    quiz: [
      { q: "What primary problem does RAG solve for LLMs?", options: ["Slow training speed", "Model hallucinations and knowledge cutoff", "GPU memory leaks", "High API cost"], answer: 1 },
      { q: "Which metric is standard for measuring distance between vector embeddings?", options: ["Hamming Distance", "Cosine Similarity", "Manhattan Distance", "Jaccard Index"], answer: 1 },
      { q: "What does RLHF stand for in LLM alignment?", options: ["Recurrent Learning from Human Feedback", "Reinforcement Learning from Human Feedback", "Robust Linear Hidden Filtering", "Randomized Layer Hierarchy"], answer: 1 },
      { q: "Which algorithm powers fast approximate nearest neighbor search in vector databases?", options: ["Binary Search", "HNSW (Hierarchical Navigable Small World)", "Dijkstra's", "Bubble Sort"], answer: 1 },
      { q: "What is Chain-of-Thought (CoT) prompting?", options: ["Executing Python code", "Prompting model to break down reasoning step-by-step", "Translating prompts", "Recursive prompt looping"], answer: 1 }
    ],
    mnc: [
      { company: "OpenAI", year: "2023", question: "Explain Fine-Tuning vs RAG", answer: "RAG is best for dynamic factual data with sources; Fine-Tuning is best for custom tone, style, and formatting." },
      { company: "Anthropic", year: "2023", question: "What is Context Window?", answer: "Context window is max tokens model processes. Extremely large contexts can suffer from 'Needle in a Haystack' retrieval issues." },
      { company: "Google DeepMind", year: "2023", question: "How does Vector Quantization compress embeddings?", answer: "Clusters vector space into codebooks and stores cluster IDs instead of raw floats, saving 90%+ memory." }
    ],
    mock: [
      { type: "Technical", question: "How would you design an enterprise AI search system?", tip: "Ingestion -> Chunking -> Vector DB with HNSW -> Hybrid Search (Vector + BM25) -> Grounded LLM Generation." }
    ],
    coding: {
      problem: "Cosine Similarity Function",
      desc: "Implement cosine similarity between two 1D numeric vectors in Python.",
      input: "vec1 = [1, 2, 3], vec2 = [4, 5, 6]",
      output: "0.9746318",
      starter: `import math\n\ndef cosine_similarity(v1, v2):\n    • Return dot(v1, v2) / (norm(v1) * norm(v2))\n    pass`
    }
  }
,
  {
    moduleTitle: "Linear & Logistic Regression",
    roles: ["aiml-ml-engineer", "aiml-data-scientist", "aiml-dl-engineer"],
    industryUseCase: "Algorithmic Pricing & Demand Forecasting at Airbnb/Uber",
    harvardOxfordRef: "Harvard STAT 110 Probability & Applied Statistical Learning",
    level: "Level 1 – Foundations",
    branch: ["aiml", "aids"],
    videos: makeVideoLinks("Linear Logistic Regression Machine Learning"),
    studyMaterial: {
      summary: "Linear Regression predicts continuous values by fitting y = mx + b. Logistic Regression predicts binary class probabilities using the sigmoid function σ(z) = 1/(1+e^-z).",
      deepDiveTextbook: `REGRESSION ALGORITHMS\n\nLinear Regression:\nObjective: minimize MSE = (1/N)Σ(y - ŷ)². Uses Gradient Descent: w = w - α * ∂Loss/∂w.\nNormal Equation: w = (XᵀX)⁻¹Xᵀy gives closed-form solution but O(N³) complexity.\n\nLogistic Regression:\nUsed for binary classification. Output: P(y=1|x) = σ(wᵀx + b) where σ(z) = 1/(1+e^-z).\nLoss: Binary Cross Entropy = -[y log(ŷ) + (1-y) log(1-ŷ)].\nDecision boundary: predict 1 if P > 0.5, else 0.\n\nRegularization:\n- L1 (Lasso): Adds λΣ|w| to loss. Drives some weights to zero (feature selection).\n- L2 (Ridge): Adds λΣw² to loss. Shrinks weights uniformly.\n- ElasticNet: Combination of L1 and L2.\n\nMulticlass: Softmax regression generalizes logistic for K classes. Output = e^(wᵢx) / Σe^(wⱼx).`,
      keyPoints: ["Sigmoid maps any value to (0,1) for probability output","Binary cross-entropy is convex loss for logistic regression","L1 regularization creates sparse models (feature selection)","Multiclass uses Softmax function"],
      example: `from sklearn.linear_model import LogisticRegression\nfrom sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\n\nX, y = load_iris(return_X_y=True)\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nmodel = LogisticRegression(max_iter=200, C=1.0)  • C=1/lambda\nmodel.fit(X_train, y_train)\nprint(model.score(X_test, y_test))`,
      comparisonTable: { headers: ["Algorithm","Output","Loss","Use Case"], rows: [["Linear Regression","Continuous","MSE","House price prediction"],["Logistic Regression","Probability 0-1","Binary Cross-Entropy","Spam classification"],["Ridge (L2 Reg)","Continuous","MSE + λΣw²","Correlated features"],["Lasso (L1 Reg)","Continuous","MSE + λΣ|w|","Feature selection"]] },
      flowchartSteps: ["Initialize weights w=0","Forward pass: ŷ = σ(wᵀx+b)","Compute loss: BCE(y, ŷ)","Backprop: ∂Loss/∂w = xᵀ(ŷ-y)/N","Update: w = w - α*gradient","Repeat until convergence"],
      concept3DSimulation: { title: "Gradient Descent Loss Landscape", description: "Loss surface shown as bowl — gradient descent steps descend toward minimum.", interactiveNodes: [{name:"Weight Space",type:"Parameter Landscape",details:"Each point represents a set of weights"},{name:"Gradient Vector",type:"Direction of Steepest Descent",details:"Points toward minimum MSE/BCE"},{name:"Learning Rate",type:"Step Size Controller",details:"Controls how far each gradient step moves"}] },
      complexity: "Training O(N*D) per epoch | Inference O(D)"
    },
    aiExplain: { steps: ["Initialize weights","Predict using current weights","Compute error","Update weights via gradient descent","Repeat"], analogy: "Like adjusting a recipe iteratively — each batch tells you to add more salt or less sugar until the taste is perfect" },
    debug: [{ title: "Underfitting", buggy: "model = LogisticRegression(C=0.001)  • too much regularization", fixed: "model = LogisticRegression(C=1.0)  • balanced regularization", hint: "Very low C means very high regularization → model too simple → underfitting" }],
    quiz: [
      { q: "Sigmoid function output range:", options: ["(-∞, +∞)","(0, 1)","(-1, 1)","(0, ∞)"], answer: 1 },
      { q: "L1 regularization effect:", options: ["Increases model complexity","Drives weights to zero (sparse)","Only affects bias","Prevents gradient descent"], answer: 1 },
      { q: "Loss for logistic regression:", options: ["MSE","MAE","Binary Cross-Entropy","Hinge Loss"], answer: 2 },
      { q: "Normal equation complexity:", options: ["O(N)","O(N²)","O(N³)","O(N log N)"], answer: 2 }
    ],
    mnc: [
      { company: "Google", year: "2023", question: "When would you use Logistic Regression over a Neural Network?", answer: "When data is linearly separable, interpretability is needed, dataset is small, or fast training is required. Logistic Regression is also useful as a baseline before trying complex models." },
      { company: "Amazon", year: "2022", question: "How do you handle class imbalance in logistic regression?", answer: "Use class_weight='balanced', SMOTE oversampling, undersampling majority class, or adjust decision threshold. Evaluate with F1-score/AUC-ROC instead of accuracy." }
    ],
    mock: [{ type: "Technical", question: "Explain the bias-variance tradeoff.", tip: "High bias = underfitting (model too simple). High variance = overfitting (model too complex). Regularization reduces variance at cost of slight bias increase. Optimal model minimizes total error = bias² + variance + irreducible noise." }],
    coding: { problem: "Implement Gradient Descent", desc: "Implement gradient descent for linear regression from scratch.", input: "X=[1,2,3,4], y=[2,4,6,8], lr=0.01, epochs=100", output: "w≈2.0, b≈0.0", starter: "def gradient_descent(X, y, lr=0.01, epochs=100):\n    w, b = 0, 0\n    N = len(X)\n    for _ in range(epochs):\n        y_pred = [w*x + b for x in X]\n        dw = -2/N * sum((y[i]-y_pred[i])*X[i] for i in range(N))\n        db = -2/N * sum(y[i]-y_pred[i] for i in range(N))\n        w -= lr*dw; b -= lr*db\n    return w, b" }
  },
  {
    moduleTitle: "Decision Trees & Random Forests",
    roles: ["aiml-ml-engineer", "aiml-data-scientist", "aiml-dl-engineer"],
    industryUseCase: "Algorithmic Pricing & Demand Forecasting at Airbnb/Uber",
    harvardOxfordRef: "Harvard STAT 110 Probability & Applied Statistical Learning",
    level: "Level 2 – Intermediate",
    branch: ["aiml", "aids"],
    videos: makeVideoLinks("Decision Trees Random Forest Ensemble"),
    studyMaterial: {
      summary: "Decision Trees split data using information gain or Gini impurity. Random Forests ensemble hundreds of trees using bagging and random feature selection to reduce variance and prevent overfitting.",
      deepDiveTextbook: `DECISION TREES & ENSEMBLE METHODS\n\nDecision Tree Splitting Criteria:\n- Gini Impurity: G = 1 - Σpᵢ². Lower = purer split.\n- Information Gain: IG = H(parent) - Σ(|child|/|parent|)H(child). H = entropy = -Σp log₂p.\n- Choose split that maximizes IG or minimizes Gini.\n\nPruning: Trees overfit without pruning. Pre-pruning: stop when depth > max_depth or samples < min_samples_split. Post-pruning: build full tree, then remove branches that don't improve validation.\n\nRandom Forest:\n1. Bootstrap sampling: each tree trained on random subset of data (bagging).\n2. Random features: at each split, only √D features considered (reduces correlation between trees).\n3. Majority vote (classification) or average (regression) for final prediction.\n\nFeature Importance: Based on total impurity reduction across all splits for that feature.\n\nGradient Boosting (XGBoost/LightGBM): Trees built sequentially — each corrects errors of previous. Uses gradient of loss function. Often outperforms Random Forest on structured data.\n\nKey Hyperparameters: n_estimators (• trees), max_depth, min_samples_split, max_features.`,
      keyPoints: ["Information Gain = entropy reduction at each split","Random Forest: bagging + random features reduces overfitting","Feature importance = total impurity reduction for each feature","Gradient Boosting builds trees sequentially correcting errors"],
      example: `from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import cross_val_score\n\nX, y = load_breast_cancer(return_X_y=True)\nrf = RandomForestClassifier(n_estimators=100, max_depth=5, random_state=42)\nscores = cross_val_score(rf, X, y, cv=5, scoring='f1')\nprint(f"F1: {scores.mean():.3f} ± {scores.std():.3f}")\nprint(sorted(zip(rf.fit(X,y).feature_importances_, load_breast_cancer().feature_names), reverse=True)[:5])`,
      comparisonTable: { headers: ["Model","Bias","Variance","Interpretable","Best For"], rows: [["Single Decision Tree","Low","High","Yes","Small datasets"],["Random Forest","Medium","Low","Partial","Tabular data"],["XGBoost","Low","Low","No","Competitions, structured data"],["Logistic Reg","High","Low","Yes","Linear problems"]] },
      flowchartSteps: ["For each tree: bootstrap sample dataset","At each node: sample √D features","Find best split (max IG / min Gini)","Split node, recurse until stopping criteria","Ensemble: majority vote all trees","Output aggregated prediction"],
      concept3DSimulation: { title: "Random Forest Ensemble", description: "Multiple trees trained on different data subsets vote collectively — errors cancel out.", interactiveNodes: [{name:"Bootstrap Sampler",type:"Data Subsetter",details:"Creates N random samples with replacement"},{name:"Tree Builder",type:"Recursive Splitter",details:"Builds tree using random feature subset at each node"},{name:"Vote Aggregator",type:"Ensemble Combiner",details:"Takes majority class vote or average prediction"}] },
      complexity: "Training O(N*D*log N * n_trees) | Inference O(depth * n_trees)"
    },
    aiExplain: { steps: ["Sample N trees from bootstrapped data","Each tree votes on class","Majority vote wins","Variance reduced because trees are decorrelated"], analogy: "Like asking 100 different doctors for a diagnosis — each has slightly different training, but their combined vote is more reliable than any single opinion" },
    debug: [{ title: "Overfitting single tree", buggy: "tree = DecisionTreeClassifier()  • no depth limit → memorizes training", fixed: "tree = DecisionTreeClassifier(max_depth=5, min_samples_split=10)", hint: "Unlimited depth trees memorize training data. Always set max_depth or min_samples." }],
    quiz: [
      { q: "Random Forest uses which sampling technique?", options: ["Cross-validation","Bootstrapping","Stratified sampling","Cluster sampling"], answer: 1 },
      { q: "At each split, Random Forest considers:", options: ["All features","√D features","1 feature","D/2 features"], answer: 1 },
      { q: "Gini impurity value for pure node:", options: ["1.0","0.5","0.0","0.25"], answer: 2 },
      { q: "Gradient Boosting builds trees:", options: ["In parallel","Randomly","Sequentially correcting errors","Using all features"], answer: 2 }
    ],
    mnc: [
      { company: "Amazon", year: "2023", question: "How does XGBoost differ from Random Forest?", answer: "Random Forest: parallel trees, bagging, reduces variance. XGBoost: sequential trees, boosting, each tree fits residuals of previous. XGBoost uses regularization (L1/L2) and is usually more accurate but slower to train." },
      { company: "Google", year: "2022", question: "How would you handle missing values in a tree-based model?", answer: "Decision Trees can handle missing values natively using surrogate splits. XGBoost learns default directions for missing values during training. Or: impute with median/mode before training." }
    ],
    mock: [{ type: "Technical", question: "When would Random Forest fail and what would you use instead?", tip: "Fails: high-dimensional sparse data (NLP), sequential data (use LSTM/Transformer), when interpretability is critical (use single tree or linear model). Use XGBoost for better accuracy on tabular data, Neural Networks for images/text." }],
    coding: { problem: "Feature Importance Analysis", desc: "Train Random Forest and identify top 3 most important features.", input: "sklearn breast_cancer dataset", output: "Top 3 feature names + importance scores", starter: "from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.datasets import load_breast_cancer\nX, y = load_breast_cancer(return_X_y=True)\nnames = load_breast_cancer().feature_names\nrf = RandomForestClassifier(n_estimators=100).fit(X, y)\n• Print top 3 features by importance" }
  },
  {
    moduleTitle: "Neural Networks & Backpropagation",
    roles: ["aiml-ml-engineer", "aiml-data-scientist", "aiml-dl-engineer"],
    industryUseCase: "Algorithmic Pricing & Demand Forecasting at Airbnb/Uber",
    harvardOxfordRef: "Harvard STAT 110 Probability & Applied Statistical Learning",
    level: "Level 2 – Intermediate",
    branch: ["aiml", "aids"],
    videos: makeVideoLinks("Neural Networks Backpropagation Deep Learning"),
    studyMaterial: {
      summary: "Neural Networks learn by forward-passing input through layers of neurons, computing loss, then backpropagating gradients to update weights via chain rule. They are the foundation of all deep learning.",
      deepDiveTextbook: `NEURAL NETWORKS & BACKPROPAGATION\n\nForward Pass:\nLayer l: aˡ = f(Wˡ * aˡ⁻¹ + bˡ) where f is activation function.\nActivations: ReLU(x)=max(0,x) [hidden layers], Sigmoid [binary output], Softmax [multiclass output].\n\nLoss Functions:\n- Regression: MSE\n- Binary Classification: Binary Cross-Entropy\n- Multiclass: Categorical Cross-Entropy\n\nBackpropagation (Chain Rule):\n∂Loss/∂W = ∂Loss/∂a * ∂a/∂z * ∂z/∂W\n\nGradient Descent Variants:\n- SGD: Update with one sample. Noisy but fast.\n- Mini-batch: Update with batch of 32-256. Best of both worlds.\n- Adam: Adaptive learning rates per parameter. Most popular. Combines momentum + RMSProp.\n\nRegularization:\n- Dropout: Randomly zero out neurons during training (probability p). Forces redundant representations.\n- Batch Normalization: Normalizes layer inputs. Reduces internal covariate shift, allows higher learning rates.\n- Weight Decay: L2 regularization on weights.\n\nVanishing Gradients: Deep networks with sigmoid lose gradient magnitude in early layers. Solved by ReLU, residual connections (ResNet), gradient clipping.`,
      keyPoints: ["Backprop uses chain rule to compute gradients layer by layer","ReLU solves vanishing gradient better than sigmoid/tanh","Adam optimizer adapts learning rate per parameter","Dropout and BatchNorm are key regularization techniques"],
      example: `import torch\nimport torch.nn as nn\n\nclass MLP(nn.Module):\n    def __init__(self):\n        super().__init__()\n        self.net = nn.Sequential(\n            nn.Linear(784, 256), nn.ReLU(), nn.Dropout(0.3),\n            nn.Linear(256, 128), nn.ReLU(), nn.BatchNorm1d(128),\n            nn.Linear(128, 10)  • Softmax in loss function\n        )\n    def forward(self, x): return self.net(x)\n\nmodel = MLP()\noptimizer = torch.optim.Adam(model.parameters(), lr=1e-3)\nloss_fn = nn.CrossEntropyLoss()`,
      comparisonTable: { headers: ["Optimizer","Adaptive LR","Momentum","Best For"], rows: [["SGD","No","Optional","Fine-tuning"],["Adam","Yes","Yes","Most tasks"],["RMSProp","Yes","No","RNNs"],["AdaGrad","Yes","No","Sparse data"]] },
      flowchartSteps: ["Forward pass through all layers","Compute loss","Compute output layer gradient","Backpropagate via chain rule","Update all weights with optimizer","Repeat for all mini-batches (epoch)"],
      concept3DSimulation: { title: "Backpropagation Flow", description: "Gradients flow backward from loss through each layer, updating weights proportionally.", interactiveNodes: [{name:"Loss Compute",type:"Output Layer",details:"Computes scalar loss from predictions and labels"},{name:"Chain Rule Engine",type:"Gradient Multiplier",details:"Multiplies local gradients backward through network"},{name:"Weight Updater",type:"Optimizer",details:"Updates parameters using computed gradients"}] },
      complexity: "Forward+Backward O(N * L * D²) per batch"
    },
    aiExplain: { steps: ["Predict with current weights","Measure how wrong (loss)","Find how each weight contributed to error (backprop)","Update weights to reduce error","Repeat"], analogy: "Like learning to throw darts — you throw (forward pass), see how far off you were (loss), figure out what adjustment to make (backprop), then adjust your arm (weight update)" },
    debug: [{ title: "Exploding gradients", buggy: "Deep network without gradient clipping → NaN loss", fixed: "torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)", hint: "Exploding gradients happen in deep/recurrent networks. Clip gradient norm to prevent NaN weights." }],
    quiz: [
      { q: "ReLU advantage over sigmoid:", options: ["Output is probability","No vanishing gradient in positive range","Outputs between -1 and 1","Requires less data"], answer: 1 },
      { q: "Dropout during inference:", options: ["Applied normally","Disabled (all neurons active)","Applied at 50%","Only on output layer"], answer: 1 },
      { q: "Adam optimizer combines:", options: ["SGD + Dropout","Momentum + RMSProp","L1 + L2 regularization","Batch Norm + Weight Decay"], answer: 1 },
      { q: "Backpropagation uses:", options: ["Forward pass only","Random search","Chain rule of calculus","Genetic algorithms"], answer: 2 }
    ],
    mnc: [
      { company: "DeepMind", year: "2023", question: "Why does Batch Normalization help training?", answer: "BatchNorm normalizes layer inputs to zero mean and unit variance. Reduces internal covariate shift, allows higher learning rates, provides slight regularization. Applied after linear layer, before activation." },
      { company: "OpenAI", year: "2022", question: "What causes vanishing gradients and how is it solved?", answer: "Sigmoid/tanh saturate → gradients near zero for extreme inputs → early layers learn very slowly. Solutions: ReLU activation, residual connections (skip connections), careful weight initialization (Xavier/He), gradient clipping." }
    ],
    mock: [{ type: "Technical", question: "Explain the Universal Approximation Theorem.", tip: "A neural network with one hidden layer and enough neurons can approximate any continuous function to arbitrary precision. This doesn't mean it can learn it easily — depth helps with representational efficiency and generalization." }],
    coding: { problem: "Train MNIST Classifier", desc: "Build and train a neural network achieving >97% on MNIST.", input: "60000 28x28 grayscale images", output: "Test accuracy > 97%", starter: "import torch, torch.nn as nn\nfrom torchvision import datasets, transforms\n• Define model with 2 hidden layers\n• Use Adam optimizer, CrossEntropyLoss\n• Train for 5 epochs\n• Report test accuracy" }
  },
  {
    moduleTitle: "Transformers & Attention Mechanism",
    roles: ["aiml-ml-engineer", "aiml-data-scientist", "aiml-dl-engineer"],
    industryUseCase: "Algorithmic Pricing & Demand Forecasting at Airbnb/Uber",
    harvardOxfordRef: "Harvard STAT 110 Probability & Applied Statistical Learning",
    level: "Level 3 – Advanced",
    branch: ["aiml", "aids"],
    videos: makeVideoLinks("Transformer Architecture Self Attention BERT GPT"),
    studyMaterial: {
      summary: "Transformers replaced RNNs by using self-attention to relate all positions in a sequence simultaneously. They power BERT, GPT, T5, and every modern LLM. Attention: 'Attention is All You Need' (Vaswani et al., 2017).",
      deepDiveTextbook: `TRANSFORMER ARCHITECTURE\n\nSelf-Attention Formula:\nAttention(Q,K,V) = softmax(QKᵀ/√dₖ) * V\nWhere Q=Queries, K=Keys, V=Values (all linear projections of input embeddings).\nScaling by √dₖ prevents softmax saturation in high dimensions.\n\nMulti-Head Attention: Run h attention heads in parallel with different weight matrices. Concatenate outputs → linear projection. Captures different relationship types simultaneously.\n\nPositional Encoding: Since attention is position-agnostic, add positional encodings (sinusoidal or learned) to embeddings.\n\nEncoder-Decoder Architecture:\n- Encoder: Stack of self-attention + feedforward layers. Used in BERT (bidirectional).\n- Decoder: Self-attention (masked) + cross-attention to encoder + feedforward. Used in GPT (autoregressive).\n- Full encoder-decoder: T5, BART for seq2seq tasks.\n\nBERT vs GPT:\n- BERT: Masked Language Modeling (predict masked tokens). Bidirectional context. Best for classification/NER.\n- GPT: Autoregressive (predict next token). Unidirectional. Best for generation.\n\nEfficiency: Attention is O(N²*D) — quadratic in sequence length. Solutions: Sparse Attention, Flash Attention, Linear Attention.`,
      keyPoints: ["Attention = softmax(QKᵀ/√dₖ)V — relates all positions simultaneously","Multi-head attention captures multiple relationship types","BERT is bidirectional encoder; GPT is autoregressive decoder","Attention complexity O(N²) limits long sequences — Flash Attention solves this"],
      example: `import torch\nimport torch.nn.functional as F\n\ndef scaled_dot_product_attention(Q, K, V, mask=None):\n    d_k = Q.shape[-1]\n    scores = torch.matmul(Q, K.transpose(-2, -1)) / (d_k ** 0.5)\n    if mask is not None:\n        scores = scores.masked_fill(mask == 0, -1e9)\n    weights = F.softmax(scores, dim=-1)\n    return torch.matmul(weights, V), weights`,
      comparisonTable: { headers: ["Model","Type","Context","Best Use"], rows: [["BERT","Encoder","Bidirectional","Classification, NER, QA"],["GPT-4","Decoder","Unidirectional","Generation, chatbots"],["T5","Enc-Dec","Both","Translation, summarization"],["CLIP","Dual-encoder","Cross-modal","Image-text matching"]] },
      flowchartSteps: ["Input tokens → embeddings + positional encoding","Multi-head self-attention (relate all positions)","Add & Normalize (residual connection)","Feed-forward network (2 linear layers + ReLU)","Stack N encoder layers","Output to task-specific head"],
      concept3DSimulation: { title: "Self-Attention Matrix", description: "N×N attention heatmap shows which tokens attend to which — bright cells = strong attention.", interactiveNodes: [{name:"Q/K/V Projector",type:"Linear Layer",details:"Projects embeddings to query, key, value spaces"},{name:"Attention Scorer",type:"Dot Product",details:"Computes compatibility between all query-key pairs"},{name:"Context Aggregator",type:"Weighted Sum",details:"Produces context-aware representation via weighted V sum"}] },
      complexity: "Attention O(N²*D) | Full Transformer O(N²*D*L)"
    },
    aiExplain: { steps: ["Each token creates Query (what I want), Key (what I am), Value (what I provide)","Compute similarity of my Query with all Keys","Soft-select Values proportional to similarity","Aggregate into context-aware representation"], analogy: "Like a library search — Query is your search term, Keys are book titles, Values are book content. Attention score decides how relevant each book is to your query." },
    debug: [{ title: "Attention score explosion", buggy: "scores = Q @ K.T  • not scaled → softmax becomes one-hot", fixed: "scores = Q @ K.T / math.sqrt(d_k)  • scale by sqrt(d_k)", hint: "Without scaling, dot products grow large in high dimensions, making softmax output near-deterministic (one token gets all attention)" }],
    quiz: [
      { q: "Attention formula denominator uses:", options: ["dₖ","√dₖ","log(dₖ)","dₖ²"], answer: 1 },
      { q: "BERT uses which type of attention?", options: ["Masked (causal)","Bidirectional","Cross-attention only","Sparse attention"], answer: 1 },
      { q: "Attention time complexity:", options: ["O(N)","O(N log N)","O(N²)","O(N³)"], answer: 2 },
      { q: "Positional encoding is needed because:", options: ["Attention is too fast","Attention is position-agnostic","Attention can't handle text","Tokens are too long"], answer: 1 }
    ],
    mnc: [
      { company: "Google", year: "2023", question: "How does BERT's pre-training work?", answer: "Two tasks: 1) Masked Language Modeling (MLM): randomly mask 15% of tokens, predict them from context. 2) Next Sentence Prediction (NSP): predict if sentence B follows sentence A. Results in rich bidirectional contextual embeddings." },
      { company: "OpenAI", year: "2022", question: "What is the difference between RLHF and standard fine-tuning?", answer: "Standard fine-tuning: supervised on labeled examples. RLHF (Reinforcement Learning from Human Feedback): 1) Fine-tune on demonstrations, 2) Train reward model from human comparisons, 3) Use PPO to optimize policy against reward model. Used in ChatGPT to align with human preferences." }
    ],
    mock: [{ type: "Technical", question: "Explain how Transformer handles variable-length sequences.", tip: "Tokenize input, pad to fixed max length (or use dynamic batching). Attention mask prevents attending to padding tokens. Positional encoding is added up to max_length. Output is same length as input; use [CLS] token pooling or average pooling for classification." }],
    coding: { problem: "Implement Scaled Dot-Product Attention", desc: "Implement the attention function from scratch in PyTorch.", input: "Q, K, V tensors of shape (batch, seq_len, d_k)", output: "Context vectors of shape (batch, seq_len, d_k)", starter: "import torch\nimport torch.nn.functional as F\n\ndef attention(Q, K, V, mask=None):\n    d_k = Q.shape[-1]\n    • Compute scaled attention scores\n    • Apply optional mask\n    • Return weighted sum of V" }
  },
  {
    moduleTitle: "Model Evaluation & Cross-Validation",
    roles: ["aiml-ml-engineer", "aiml-data-scientist", "aiml-dl-engineer"],
    industryUseCase: "Algorithmic Pricing & Demand Forecasting at Airbnb/Uber",
    harvardOxfordRef: "Harvard STAT 110 Probability & Applied Statistical Learning",
    level: "Level 2 – Intermediate",
    branch: ["aiml", "aids"],
    videos: makeVideoLinks("Model Evaluation Cross Validation Hyperparameter Tuning"),
    studyMaterial: {
      summary: "Proper model evaluation uses held-out test sets, cross-validation for small datasets, and appropriate metrics for the task. Hyperparameter tuning with Grid/Random/Bayesian search optimizes model performance.",
      deepDiveTextbook: `MODEL EVALUATION & SELECTION\n\nEvaluation Metrics:\nClassification:\n- Accuracy = (TP+TN)/(TP+TN+FP+FN). Misleading for imbalanced classes.\n- Precision = TP/(TP+FP). How many predicted positives are actually positive.\n- Recall = TP/(TP+FN). How many actual positives are captured.\n- F1 = 2*(P*R)/(P+R). Harmonic mean balancing precision and recall.\n- AUC-ROC: Area under ROC curve. 1.0 = perfect, 0.5 = random. Threshold-independent.\n\nRegression:\n- MAE = mean(|y-ŷ|). Robust to outliers.\n- MSE = mean((y-ŷ)²). Penalizes large errors.\n- R² = 1 - SS_res/SS_tot. Proportion of variance explained.\n\nCross-Validation:\n- K-Fold: Split into K folds, train on K-1, test on 1. Repeat K times. Average scores.\n- Stratified K-Fold: Preserves class distribution in each fold.\n- Leave-One-Out (LOO): K = N. Unbiased but expensive.\n\nHyperparameter Tuning:\n- Grid Search: Exhaustive search over parameter grid. O(product of grid sizes).\n- Random Search: Random sampling. More efficient for large spaces.\n- Bayesian Optimization: Models performance as a function, intelligently selects next params.`,
      keyPoints: ["Use F1-score for imbalanced datasets, not accuracy","AUC-ROC is threshold-independent classification metric","K-Fold CV reduces variance of performance estimates","Bayesian optimization is most efficient for tuning"],
      example: `from sklearn.model_selection import StratifiedKFold, GridSearchCV\nfrom sklearn.svm import SVC\n\nparam_grid = {'C': [0.1, 1, 10], 'kernel': ['rbf', 'linear']}\ncv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)\ngrid = GridSearchCV(SVC(), param_grid, cv=cv, scoring='f1', n_jobs=-1)\ngrid.fit(X_train, y_train)\nprint(f"Best params: {grid.best_params_}, Best F1: {grid.best_score_:.3f}")`,
      comparisonTable: { headers: ["Metric","Range","Best For","Sensitive To"], rows: [["Accuracy","0-1","Balanced classes","Class imbalance"],["F1 Score","0-1","Imbalanced classes","Threshold"],["AUC-ROC","0-1","Any classification","Nothing — threshold-free"],["MAE","0-∞","Regression","Not outliers"]] },
      flowchartSteps: ["Split data: train/val/test (60/20/20)","Train model on training set","Tune hyperparameters on validation set","Final evaluation on held-out test set","Report metrics with confidence intervals","Never use test set during development"],
      concept3DSimulation: { title: "K-Fold Cross-Validation", description: "Data split into K folds rotating — each fold serves as test once.", interactiveNodes: [{name:"Fold Iterator",type:"Data Splitter",details:"Rotates which fold is the test set"},{name:"Model Trainer",type:"Learning Engine",details:"Trains fresh model on K-1 folds"},{name:"Score Aggregator",type:"Statistics",details:"Averages K scores and computes standard deviation"}] },
      complexity: "K-Fold: O(K * training_time) | Grid Search: O(|grid| * K * training_time)"
    },
    aiExplain: { steps: ["Split data into folds","Train on K-1 folds","Test on remaining fold","Repeat K times, average results","Select model with best CV score"], analogy: "Like a tournament where each team plays every other team once — gives fairer ranking than single elimination" },
    debug: [{ title: "Data leakage in cross-validation", buggy: "scaler.fit(X)  • fitted on entire data before CV\nX_scaled = scaler.transform(X)\ncross_val_score(model, X_scaled, y)", fixed: "pipeline = Pipeline([('scaler', StandardScaler()), ('model', model)])\ncross_val_score(pipeline, X, y)", hint: "Fitting scaler before CV leaks test data statistics into training. Always use Pipeline to fit preprocessing inside each fold." }],
    quiz: [
      { q: "F1 score is:", options: ["Accuracy on test set","Harmonic mean of precision and recall","Area under ROC curve","Mean squared error"], answer: 1 },
      { q: "AUC-ROC of 0.5 means:", options: ["Perfect classifier","50% accuracy","Random classifier","50% precision"], answer: 2 },
      { q: "Which handles class imbalance in CV?", options: ["K-Fold","Leave-One-Out","Stratified K-Fold","Time Series Split"], answer: 2 },
      { q: "Most efficient hyperparameter search:", options: ["Grid Search","Random Search","Bayesian Optimization","Manual Search"], answer: 2 }
    ],
    mnc: [
      { company: "Netflix", year: "2023", question: "How would you evaluate a recommendation system?", answer: "Offline: Precision@K, Recall@K, NDCG (normalized discounted cumulative gain), MAP (mean average precision). Online A/B test: click-through rate, watch time, user satisfaction. Train/test split must be time-based (future items test past behavior)." },
      { company: "Amazon", year: "2022", question: "How do you detect data leakage in a machine learning pipeline?", answer: "Signs: unrealistically high CV scores that drop on deployment. Check: no target-dependent features used, no future data used for prediction, preprocessing fitted only on training data, no duplicates spanning train/test. Use Pipeline to prevent leakage." }
    ],
    mock: [{ type: "Technical", question: "Explain precision-recall tradeoff and when to optimize each.", tip: "High precision = fewer false positives (important for spam detection — don't block real email). High recall = fewer false negatives (important for cancer diagnosis — don't miss real cases). Adjust classification threshold: lower threshold → higher recall, lower precision. Use F1 when both matter equally." }],
    coding: { problem: "Build Complete ML Pipeline", desc: "Create a sklearn pipeline with preprocessing + model + cross-validation.", input: "Any classification dataset", output: "Mean CV F1 ± std", starter: "from sklearn.pipeline import Pipeline\nfrom sklearn.preprocessing import StandardScaler\nfrom sklearn.svm import SVC\nfrom sklearn.model_selection import cross_val_score\n\npipeline = Pipeline([('scaler', StandardScaler()), ('svm', SVC(kernel='rbf'))])\nscores = cross_val_score(pipeline, X, y, cv=5, scoring='f1_macro')\nprint(f'{scores.mean():.3f} ± {scores.std():.3f}')" }
  }
];
