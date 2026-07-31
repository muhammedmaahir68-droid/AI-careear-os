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
      starter: `import numpy as np

def relu(x):
    pass

def softmax(x):
    pass`
    }
  }
];
