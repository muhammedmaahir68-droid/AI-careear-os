import type { BranchModuleData } from "./types";
import { makeVideoLinks } from "./types";

export const AIML_AIDS_MODULES: BranchModuleData[] = [
  {
    moduleTitle: "Supervised Learning & Regression Metrics",
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
        buggy: `def mse(y_true, y_pred):\n    return sum((y_true - y_pred)) ** 2 / len(y_true) # Bug: squaring sum instead of sum of squares`,
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
      starter: `def compute_mse(y_true, y_pred):\n    # Return mean squared difference\n    pass`
    }
  },
  {
    moduleTitle: "Neural Networks & Backpropagation",
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
        buggy: `def softmax(x):\n    return np.exp(x) / np.sum(np.exp(x)) # Bug: np.exp(large_val) causes overflow inf`,
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
        buggy: `# BUG: Scaling entire dataset before splitting\nscaler = StandardScaler()\nX_scaled = scaler.fit_transform(X)\nX_train, X_test = train_test_split(X_scaled)`,
        fixed: `X_train, X_test = train_test_split(X)\nscaler = StandardScaler()\nX_train = scaler.fit_transform(X_train)\nX_test = scaler.transform(X_test) # Transform test only!`,
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
      starter: `import math\n\ndef z_score_normalize(arr):\n    # Return [(x - mean) / std for x in arr]\n    pass`
    }
  },
  {
    moduleTitle: "Classification – Decision Trees, Random Forest, SVM",
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
        buggy: `tree = DecisionTreeClassifier() # Bug: no max_depth limit leads to infinite depth and overfitting`,
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
      starter: `def compute_gini(labels):\n    # Return 1 - sum(p_i^2)\n    pass`
    }
  },
  {
    moduleTitle: "Deep Learning – CNN, RNN, LSTM & Transformers",
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
        return torch.relu(x + self.conv(x)) # Residual Skip Connection!`,
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
        buggy: `conv = nn.Conv2d(in_channels=3, out_channels=16, kernel_size=3)\n# Input tensor passed as (16, 3, 32, 32) -> Incorrect batch formatting!`,
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
      starter: `import numpy as np\n\ndef scaled_dot_product_attention(Q, K, V):\n    # Return Softmax(Q @ K.T / sqrt(d_k)) @ V\n    pass`
    }
  },
  {
    moduleTitle: "Generative AI & LLMs – GPT, RAG, Prompt Engineering",
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

# Cosine Similarity Search
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
        buggy: `# BUG: Passing all 100 retrieved documents directly into LLM prompt\ncontext = "\\n".join(all_100_docs) # Causes Context Window Overflow`,
        fixed: `context = "\\n".join(retrieved_docs[:3]) # Limit to top-3`,
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
      starter: `import math\n\ndef cosine_similarity(v1, v2):\n    # Return dot(v1, v2) / (norm(v1) * norm(v2))\n    pass`
    }
  }
];
