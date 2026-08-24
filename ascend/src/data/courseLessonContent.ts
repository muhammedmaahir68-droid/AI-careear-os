// Course Lesson Content Engine for CARVEX AI Career OS
// Generates structured lesson content for any course module topic

export interface LessonTopic {
  id: string;
  title: string;
  estimatedMinutes: number;
  concept: string;
  whyItMatters: string;
  howItWorks: string[];
  realWorldExample: string;
  codeExample: { language: string; code: string };
  debugChallenge: { buggyCode: string; bug: string; fix: string };
  quiz: QuizQuestion[];
  practiceProblems: string[];
  interviewQuestions: { q: string; hint: string }[];
  commonMistake: string;
  advancedExtension: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

// Shared rich quiz/practice banks mapped by keyword
const CONTENT_BANK: Record<string, Partial<LessonTopic>> = {
  "pointer": {
    concept: "A pointer is a variable that stores the memory address of another variable instead of a value directly. Think of RAM as a huge hotel — a pointer is the room number, not the guest itself.",
    whyItMatters: "Pointers allow direct memory manipulation, efficient data structure traversal (linked lists, trees), passing large data without copying, and are essential for embedded/systems programming.",
    howItWorks: [
      "1. Declare a pointer: `int *ptr;` — this creates a variable that will store an address.",
      "2. Assign an address: `ptr = &x;` — the & operator gives the memory address of x.",
      "3. Dereference: `*ptr` — the * operator reads the value at that address.",
      "4. Pointer arithmetic: `ptr++` moves to the next int-sized memory block (4 bytes on most platforms)."
    ],
    realWorldExample: "In operating systems like Linux, the kernel uses pointer chains to traverse doubly-linked lists of running processes (struct list_head). Every process has a next/prev pointer to the adjacent process in the scheduler queue.",
    codeExample: {
      language: "c",
      code: `#include <stdio.h>
int main() {
    int x = 42;
    int *ptr = &x;          // pointer to x
    printf("Address: %p\\n", (void*)ptr);
    printf("Value:   %d\\n", *ptr);   // dereference → 42
    *ptr = 100;             // modify x through pointer
    printf("x is now: %d\\n", x);    // prints 100
    return 0;
}`
    },
    debugChallenge: {
      buggyCode: `int *p;
*p = 5;  // Write value without initializing pointer`,
      bug: "Undefined behaviour: p is uninitialized and points to a random address. Dereferencing it is a segfault.",
      fix: "Always initialize: `int val = 0; int *p = &val;` or allocate: `int *p = malloc(sizeof(int));`"
    },
    quiz: [
      { question: "What does the & operator return?", options: ["The value of the variable", "The memory address of the variable", "A copy of the variable", "The size of the variable"], correctIndex: 1, explanation: "& is the 'address-of' operator. It returns the memory address where the variable is stored." },
      { question: "What happens when you dereference an uninitialized pointer?", options: ["It returns 0", "It returns NULL", "Undefined behaviour / segfault", "Compilation error"], correctIndex: 2, explanation: "An uninitialized pointer holds a garbage address. Dereferencing it is undefined behaviour — usually a segmentation fault at runtime." },
      { question: "What is `int **ptr`?", options: ["Pointer to int", "Pointer to pointer to int", "Double dereference", "Invalid syntax"], correctIndex: 1, explanation: "int **ptr is a pointer to a pointer to an int — used for 2D arrays or when a function must modify a pointer itself." },
      { question: "What does `ptr++` do when ptr is `int *`?", options: ["Increments ptr by 1 byte", "Increments ptr by sizeof(int) bytes", "Adds 1 to the value at ptr", "Compilation error"], correctIndex: 1, explanation: "Pointer arithmetic scales by the size of the pointed-to type. On most platforms sizeof(int)=4, so ptr++ advances 4 bytes." },
      { question: "Which function allocates memory on the heap in C?", options: ["alloc()", "new()", "malloc()", "reserve()"], correctIndex: 2, explanation: "malloc(size) allocates 'size' bytes on the heap and returns a void* pointer to the start of the allocated block." }
    ],
    practiceProblems: [
      "Write a function swap(int *a, int *b) that swaps two integers using pointers.",
      "Implement strlen() using only pointer arithmetic (no array indexing).",
      "Create a dynamic int array of size n using malloc, fill it with squares 1²..n², then free it."
    ],
    interviewQuestions: [
      { q: "What is the difference between a null pointer, a dangling pointer, and a wild pointer?", hint: "Null = intentionally points to nothing. Dangling = points to freed memory. Wild = uninitialized, points to garbage." },
      { q: "How would you detect a memory leak in a C program?", hint: "Valgrind --leak-check=full, AddressSanitizer (-fsanitize=address), or manual review of every malloc having a matching free." }
    ],
    commonMistake: "Forgetting to free() heap-allocated memory causes memory leaks. Also, returning a pointer to a local stack variable is a dangling pointer — the stack frame is destroyed when the function returns.",
    advancedExtension: "Study function pointers: `int (*fn)(int, int) = &add;` — used extensively in C callbacks, vtables, and plugin architectures. Also explore void* generic pointers and type-punning."
  },
  "class": {
    concept: "A class is a blueprint that bundles data (fields) and behaviour (methods) together. An object is one instance created from that blueprint — like a cookie cutter (class) vs actual cookies (objects).",
    whyItMatters: "OOP with classes enables modular, reusable, maintainable code. Real systems (Android, Spring, game engines) are built on class hierarchies. Encapsulation hides internal details; inheritance avoids code duplication.",
    howItWorks: [
      "1. Define a class with fields and methods.",
      "2. Use `new ClassName()` to create an object (heap-allocated instance).",
      "3. Access members via the dot operator: `obj.method()`.",
      "4. Constructor runs automatically at creation; destructor/GC cleans up when no references remain.",
      "5. `this` refers to the current object inside methods."
    ],
    realWorldExample: "Spring Boot uses @RestController classes to handle HTTP requests. Each controller class is instantiated once (singleton bean) and its methods map to API endpoints — clean separation of concerns through class design.",
    codeExample: {
      language: "java",
      code: `public class BankAccount {
    private String owner;
    private double balance;

    public BankAccount(String owner, double initial) {
        this.owner = owner;
        this.balance = initial;
    }

    public void deposit(double amount) {
        if (amount > 0) balance += amount;
    }

    public boolean withdraw(double amount) {
        if (amount > balance) return false;
        balance -= amount;
        return true;
    }

    public double getBalance() { return balance; }
}
// Usage:
BankAccount acc = new BankAccount("Maahir", 1000.0);
acc.deposit(500);
System.out.println(acc.getBalance()); // 1500.0`
    },
    debugChallenge: {
      buggyCode: `class Counter {
    int count;
    void increment() { count++; }
    static void reset() { count = 0; }  // Error here
}`,
      bug: "A static method cannot access the instance field `count` — static methods have no `this` reference.",
      fix: "Either make count static too (`static int count;`) or make reset() non-static (remove the `static` keyword)."
    },
    quiz: [
      { question: "What keyword creates an object from a class in Java?", options: ["create", "new", "make", "construct"], correctIndex: 1, explanation: "`new ClassName()` allocates memory on the heap and calls the constructor, returning a reference to the new object." },
      { question: "What is encapsulation?", options: ["Inheritance from a parent class", "Wrapping data and methods + restricting direct access", "Running multiple instances", "Overriding methods"], correctIndex: 1, explanation: "Encapsulation bundles data and methods and uses access modifiers (private/protected) to restrict direct access, exposing only a controlled interface." },
      { question: "What does `this` refer to inside a method?", options: ["The parent class", "The current object instance", "A static reference", "The class itself"], correctIndex: 1, explanation: "`this` is a reference to the current instance of the class. It is used to distinguish instance fields from local variables with the same name." },
      { question: "What is a constructor?", options: ["A method that destroys an object", "A special method called when an object is created", "A static factory method", "A method that copies an object"], correctIndex: 1, explanation: "A constructor has the same name as the class, no return type, and runs automatically when `new` is used to create an object." },
      { question: "Which access modifier allows access only within the same class?", options: ["public", "protected", "package-private", "private"], correctIndex: 3, explanation: "`private` restricts access strictly to the class in which the member is declared — not even subclasses can access it." }
    ],
    practiceProblems: [
      "Create a `Student` class with name, rollNumber, grades[] and methods to calculate GPA and print a report card.",
      "Implement a `Stack<T>` class using an ArrayList internally, with push(), pop(), peek(), and isEmpty() methods.",
      "Design a `Vehicle` class and two subclasses `Car` and `Truck` with overridden `describe()` methods demonstrating polymorphism."
    ],
    interviewQuestions: [
      { q: "What is the difference between an abstract class and an interface in Java?", hint: "Abstract class can have concrete methods + state; interface (Java 8+) can have default methods but represents a contract. A class can implement multiple interfaces but extend only one class." },
      { q: "Explain the SOLID principles with a real-world example.", hint: "Single Responsibility: one class = one job. Open/Closed: open for extension, closed for modification. Liskov, Interface Segregation, Dependency Inversion." }
    ],
    commonMistake: "Confusing static and instance members — static members belong to the class (shared across all instances), instance members belong to each individual object. Accessing instance members from static context causes compilation errors.",
    advancedExtension: "Explore the Decorator pattern to dynamically add behaviour without modifying existing classes. Study Java's reflection API to inspect class metadata at runtime — used heavily in Spring and Hibernate."
  },
  "tensor": {
    concept: "A Tensor is a multi-dimensional array — the fundamental data structure of all deep learning frameworks. A scalar is a 0-D tensor, a vector is 1-D, a matrix is 2-D, and feature maps in CNNs are 4-D tensors (batch × channels × height × width).",
    whyItMatters: "All neural network computations — forward passes, backpropagation, gradient updates — are tensor operations. GPU acceleration (CUDA) works on batched tensor operations. Understanding tensors is prerequisite for all ML engineering.",
    howItWorks: [
      "1. Create tensors: `torch.tensor([1,2,3])` or `torch.zeros(3,4)` for shapes.",
      "2. Tensor attributes: `.shape`, `.dtype`, `.device` (cpu or cuda).",
      "3. Operations are element-wise by default: `a + b`, `a * b`.",
      "4. Matrix multiplication: `torch.matmul(A, B)` or `A @ B`.",
      "5. Move to GPU: `tensor.to('cuda')` — enables GPU-accelerated math.",
      "6. `requires_grad=True` enables autograd tracking for backprop."
    ],
    realWorldExample: "In a CNN for image classification, an input batch of 32 RGB images (224×224 pixels) is represented as a tensor of shape [32, 3, 224, 224]. The first Conv2D layer transforms this to [32, 64, 222, 222] — all through optimized CUDA tensor ops.",
    codeExample: {
      language: "python",
      code: `import torch

# Create tensors
x = torch.tensor([1.0, 2.0, 3.0], requires_grad=True)
W = torch.tensor([[1.0, 0.0], [0.0, 1.0], [1.0, 1.0]])  # 3x2

# Forward pass
out = x @ W          # matrix multiply: shape [2]
loss = out.sum()     # scalar loss

# Backward pass (autograd)
loss.backward()
print(x.grad)        # gradient of loss w.r.t. x

# GPU usage (if available)
device = "cuda" if torch.cuda.is_available() else "cpu"
x_gpu = x.to(device)
print(f"Tensor on: {x_gpu.device}")`
    },
    debugChallenge: {
      buggyCode: `a = torch.tensor([1, 2, 3])
b = torch.tensor([1.0, 2.0, 3.0])
result = a + b  # RuntimeError here`,
      bug: "Type mismatch: `a` is torch.int64, `b` is torch.float32. PyTorch does not auto-cast integer+float tensors.",
      fix: "Cast explicitly: `a = a.float()` or create a with float dtype: `torch.tensor([1,2,3], dtype=torch.float32)`"
    },
    quiz: [
      { question: "What is the shape of a batch of 16 RGB images at 224×224?", options: ["[224, 224, 3]", "[16, 224, 224, 3]", "[16, 3, 224, 224]", "[3, 16, 224, 224]"], correctIndex: 2, explanation: "PyTorch uses NCHW format: [batch_size, channels, height, width] = [16, 3, 224, 224]. TensorFlow uses NHWC by default." },
      { question: "What does requires_grad=True do?", options: ["Moves tensor to GPU", "Tracks operations for automatic differentiation", "Makes tensor read-only", "Enables CUDA acceleration"], correctIndex: 1, explanation: "Setting requires_grad=True tells PyTorch's autograd engine to record all operations on this tensor so gradients can be computed during backward()." },
      { question: "Which operator performs matrix multiplication in PyTorch?", options: ["*", "@", "**", "dot()"], correctIndex: 1, explanation: "The @ operator calls torch.matmul() for matrix multiplication. The * operator performs element-wise (Hadamard) multiplication." },
      { question: "What is broadcasting in tensor operations?", options: ["Sending tensors to multiple GPUs", "Automatically expanding smaller tensors to match larger shapes", "Converting tensor dtype", "Serializing tensors"], correctIndex: 1, explanation: "Broadcasting allows operations between tensors of different shapes by virtually expanding the smaller tensor along dimensions of size 1, following NumPy broadcasting rules." },
      { question: "What does .detach() do?", options: ["Deletes the tensor", "Creates a new tensor that shares data but is not tracked by autograd", "Moves tensor to CPU", "Clears gradients"], correctIndex: 1, explanation: ".detach() returns a new tensor that shares the same data storage but is excluded from the computation graph — used when you want values without gradient tracking (e.g., for visualization)." }
    ],
    practiceProblems: [
      "Create a 3×3 identity matrix tensor and compute its matrix product with a random 3×3 tensor. Verify the result equals the random tensor.",
      "Implement a single linear layer (y = xW + b) using only raw PyTorch tensor operations and verify it matches nn.Linear output.",
      "Write a manual gradient descent step for a simple quadratic loss without using an optimizer — use GradientTape equivalent in PyTorch."
    ],
    interviewQuestions: [
      { q: "What is the difference between in-place operations (e.g., tensor.add_()) and regular operations in PyTorch?", hint: "In-place ops modify the tensor directly (memory-efficient) but can cause autograd issues if the tensor is part of the computation graph — PyTorch will raise a RuntimeError." },
      { q: "Explain what happens during a forward pass in a neural network at the tensor level.", hint: "Input tensor → series of matrix multiplications and non-linear activation functions → output logits tensor. Each operation is recorded by autograd for the backward pass." }
    ],
    commonMistake: "Forgetting to call optimizer.zero_grad() before loss.backward() — gradients accumulate by default in PyTorch. If you don't zero them, each backward() adds to existing gradients, causing incorrect parameter updates.",
    advancedExtension: "Study torch.jit.script() for TorchScript compilation, which converts Python dynamic graphs to a static IR for production deployment. Also explore torch.compile() (PyTorch 2.0+) for kernel fusion and speed-up."
  },
  "algorithm": {
    concept: "An algorithm is a finite, well-defined sequence of steps that solves a specific computational problem. Good algorithms find the optimal balance between correctness, time complexity, space complexity, and simplicity.",
    whyItMatters: "Algorithm efficiency determines whether a system handles 100 users or 100 million. A naive O(n²) sort on 1 million items takes 1 trillion operations. An O(n log n) sort takes 20 million — 50,000x faster. Companies like Google and Amazon test algorithm knowledge because their systems operate at planetary scale.",
    howItWorks: [
      "1. Understand the problem constraints — input size n, value ranges, edge cases.",
      "2. Choose an algorithmic paradigm — brute force, divide & conquer, greedy, DP, or graph traversal.",
      "3. Analyse time complexity using Big-O notation before coding.",
      "4. Implement and test with small inputs first, then edge cases.",
      "5. Optimize — can you reduce a nested loop to a hash map lookup? Can you use memoization?"
    ],
    realWorldExample: "Google Maps uses Dijkstra's algorithm (and its A* variant) to find shortest paths in a graph of billions of road nodes. The routing engine must return results in milliseconds — requiring extremely optimized graph algorithms and data structures.",
    codeExample: {
      language: "python",
      code: `# Two Sum - O(n) using HashMap vs O(n²) brute force

def two_sum_brute(nums, target):
    # O(n²) time, O(1) space
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]

def two_sum_optimal(nums, target):
    # O(n) time, O(n) space
    seen = {}  # value -> index
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

# Test
nums = [2, 7, 11, 15]
print(two_sum_optimal(nums, 9))  # [0, 1]`
    },
    debugChallenge: {
      buggyCode: `def binary_search(arr, target):
    left, right = 0, len(arr)  # Bug here
    while left < right:
        mid = (left + right) // 2
        if arr[mid] == target: return mid
        elif arr[mid] < target: left = mid
        else: right = mid - 1`,
      bug: "Two bugs: 1) right should be len(arr)-1 (last valid index). 2) When arr[mid] < target, left should be mid+1 not mid — causes infinite loop.",
      fix: "`right = len(arr) - 1` and `left = mid + 1` when arr[mid] < target."
    },
    quiz: [
      { question: "What is the time complexity of binary search?", options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"], correctIndex: 1, explanation: "Binary search halves the search space each step. Starting with n elements: n → n/2 → n/4 → ... → 1, requiring log₂(n) steps." },
      { question: "Which data structure gives O(1) average-case lookup?", options: ["Array (unsorted)", "Linked List", "Hash Map", "Binary Search Tree"], correctIndex: 2, explanation: "Hash maps use a hash function to map keys to array indices, giving O(1) average lookup. Worst case O(n) with many collisions, but rare with good hash functions." },
      { question: "What is the space complexity of recursive Fibonacci without memoization?", options: ["O(1)", "O(n)", "O(n²)", "O(2ⁿ)"], correctIndex: 1, explanation: "The call stack depth is O(n) since recursion goes fib(n)→fib(n-1)→...→fib(1). Time is O(2ⁿ) due to repeated subproblems, but space (stack depth) is O(n)." },
      { question: "Which sorting algorithm has best average-case performance?", options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"], correctIndex: 2, explanation: "Merge sort is O(n log n) in all cases (best, average, worst). Quick sort is also O(n log n) average but O(n²) worst case. Merge sort is preferred for stable sorting." },
      { question: "What is dynamic programming?", options: ["Optimizing RAM usage", "Breaking problems into overlapping subproblems and caching results", "Sorting data progressively", "Using pointers to traverse data"], correctIndex: 1, explanation: "DP solves complex problems by breaking them into simpler overlapping subproblems, solving each once, and storing results (memoization/tabulation) to avoid redundant computation." }
    ],
    practiceProblems: [
      "Implement merge sort from scratch and verify it correctly sorts [38, 27, 43, 3, 9, 82, 10].",
      "Solve 'Longest Consecutive Sequence' in O(n) using a HashSet (LeetCode 128).",
      "Implement a solution for 'Coin Change' using bottom-up dynamic programming."
    ],
    interviewQuestions: [
      { q: "Walk me through how you would approach a new algorithm problem in a live coding interview.", hint: "Clarify constraints → brute force first → state complexity → optimize with better data structure or paradigm → test with examples → handle edge cases." },
      { q: "What is the difference between memoization and tabulation in dynamic programming?", hint: "Memoization = top-down recursion + cache. Tabulation = bottom-up iteration, fills a table from base cases. Both give same complexity but tabulation avoids recursion overhead." }
    ],
    commonMistake: "Jumping to code without analysing complexity first. Many candidates write O(n²) solutions and only realize they need optimization when the interviewer hints. Always state time/space complexity before coding.",
    advancedExtension: "Study amortized analysis (e.g., why dynamic array appends are O(1) amortized), and explore advanced graph algorithms like Tarjan's SCC, Kruskal's MST, and network flow algorithms used in infrastructure routing."
  }
};

// Generate dynamic topic content based on keywords in title
function getContentForTopic(courseTitle: string, moduleTitle: string, topicTitle: string): LessonTopic {
  const titleLower = (topicTitle + " " + moduleTitle + " " + courseTitle).toLowerCase();

  // Match to closest content bank entry
  let matched: Partial<LessonTopic> = {};
  if (titleLower.includes("pointer") || titleLower.includes("memory") || titleLower.includes("malloc")) {
    matched = CONTENT_BANK["pointer"];
  } else if (titleLower.includes("class") || titleLower.includes("oop") || titleLower.includes("object") || titleLower.includes("inherit")) {
    matched = CONTENT_BANK["class"];
  } else if (titleLower.includes("tensor") || titleLower.includes("autograd") || titleLower.includes("pytorch") || titleLower.includes("torch")) {
    matched = CONTENT_BANK["tensor"];
  } else if (titleLower.includes("algorithm") || titleLower.includes("dsa") || titleLower.includes("search") || titleLower.includes("sort") || titleLower.includes("dynamic programming") || titleLower.includes("complexity")) {
    matched = CONTENT_BANK["algorithm"];
  }

  // Build a complete topic from matched + generic fallback
  return {
    id: `topic-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: topicTitle,
    estimatedMinutes: 25,
    concept: matched.concept ?? `${topicTitle} is a core concept in ${moduleTitle}. It forms the building block for understanding advanced topics in ${courseTitle}. Mastering this concept gives you the mental model needed to architect production-grade systems.`,
    whyItMatters: matched.whyItMatters ?? `Understanding ${topicTitle} is essential for real-world engineering at scale. Industry systems — from Google's data pipelines to Netflix's recommendation engine — rely on this concept daily. This is frequently tested in FAANG, MNC, and startup interviews.`,
    howItWorks: matched.howItWorks ?? [
      `1. Understand the fundamental definition of ${topicTitle} — what problem it solves.`,
      `2. Identify the core components: input, transformation, output.`,
      `3. Trace through a simple example step by step.`,
      `4. Apply it to an edge case to deepen understanding.`,
      `5. Connect it to the surrounding concepts in ${moduleTitle}.`
    ],
    realWorldExample: matched.realWorldExample ?? `Companies like Google, Amazon, and Microsoft use ${topicTitle} extensively in their ${courseTitle} systems. For example, at scale, engineers at these companies must have deep mastery of this concept to build systems that handle millions of requests per second.`,
    codeExample: matched.codeExample ?? {
      language: titleLower.includes("java") ? "java" : titleLower.includes("c++") ? "cpp" : titleLower.includes("rust") ? "rust" : "python",
      code: `# ${topicTitle} - Core Implementation
# This demonstrates the fundamental pattern

# Step 1: Setup
data = [1, 2, 3, 4, 5]

# Step 2: Apply ${topicTitle} concept
result = [x * 2 for x in data]  # Example transformation

# Step 3: Verify output
print(f"Input:  {data}")
print(f"Output: {result}")

# Real industry usage: scale this to millions of items
# using vectorized operations or distributed compute`
    },
    debugChallenge: matched.debugChallenge ?? {
      buggyCode: `# Find the bug in this implementation
def process(items):
    result = []
    for i in range(len(items) + 1):  # Bug here
        result.append(items[i] * 2)
    return result`,
      bug: "Off-by-one error: `range(len(items) + 1)` goes one index past the last element, causing an IndexError.",
      fix: "Change to `range(len(items))` to iterate indices 0 through len(items)-1 correctly."
    },
    quiz: matched.quiz ?? [
      { question: `What is the primary purpose of ${topicTitle}?`, options: ["To increase code complexity", "To solve a specific engineering problem efficiently", "To slow down execution", "To use more memory"], correctIndex: 1, explanation: `${topicTitle} exists to solve a specific class of engineering problems efficiently. Always understand the 'why' before the 'how'.` },
      { question: `Which scenario best applies ${topicTitle}?`, options: ["When writing UI components", "When optimizing backend system performance", "When designing database schemas", "When styling web pages"], correctIndex: 1, explanation: `${topicTitle} is primarily applied in engineering contexts where correctness and efficiency matter most.` },
      { question: "What is Big-O notation used for?", options: ["Measuring exact runtime in seconds", "Describing how runtime grows relative to input size", "Measuring memory usage only", "Comparing code readability"], correctIndex: 1, explanation: "Big-O describes the upper bound growth rate of time/space complexity as input size n approaches infinity — not the exact runtime." },
      { question: "What is the best way to debug a logic error?", options: ["Restart the computer", "Add print/log statements to trace values", "Delete and rewrite the function", "Ignore it"], correctIndex: 1, explanation: "Adding strategic print/log statements to trace variable values through execution is the most effective first-pass debugging technique." },
      { question: "What makes code maintainable?", options: ["Using as many lines as possible", "Clear naming, small functions, and documentation", "Avoiding comments", "Writing everything in one function"], correctIndex: 1, explanation: "Clean, maintainable code uses descriptive names, single-responsibility functions, and appropriate comments — making it easy for other engineers (or future you) to understand and modify." }
    ],
    practiceProblems: matched.practiceProblems ?? [
      `Implement ${topicTitle} from scratch without using library helpers. Verify correctness with at least 3 test cases including edge cases.`,
      `Extend your implementation to handle a list of 10,000 items and measure the execution time. How does it scale?`,
      `Combine ${topicTitle} with one other concept from ${moduleTitle} to solve a real-world mini-project problem.`
    ],
    interviewQuestions: matched.interviewQuestions ?? [
      { q: `Explain ${topicTitle} to a non-technical person using a real-life analogy.`, hint: "Great engineers communicate complex ideas simply. Use an analogy from everyday life — sorting books, finding a word in a dictionary, etc." },
      { q: `What are the performance trade-offs when using ${topicTitle} at scale?`, hint: "Consider time complexity, space complexity, cache behaviour, and how the approach degrades as n grows to millions." }
    ],
    commonMistake: matched.commonMistake ?? `The most common mistake when learning ${topicTitle} is applying it without understanding the underlying assumptions. Always verify: what is the valid input range? What happens at the boundaries? What is the time/space complexity of your approach?`,
    advancedExtension: matched.advancedExtension ?? `After mastering ${topicTitle}, explore its advanced variants used in large-scale systems: how does this concept change when distributed across multiple machines? How does it interact with concurrency? Study open-source implementations in well-known projects for real engineering insight.`
  };
}

// Generate a list of lesson topics for a module
export function generateModuleTopics(courseTitle: string, moduleTitle: string, topicsCount: number): LessonTopic[] {
  const topicNames = generateTopicNames(courseTitle, moduleTitle, topicsCount);
  return topicNames.map((name, i) => ({
    ...getContentForTopic(courseTitle, moduleTitle, name),
    id: `topic-${i}`,
    title: name,
    estimatedMinutes: 20 + Math.floor(Math.random() * 20)
  }));
}

function generateTopicNames(courseTitle: string, moduleTitle: string, count: number): string[] {
  const lower = (courseTitle + " " + moduleTitle).toLowerCase();

  if (lower.includes("pointer") || lower.includes("memory")) {
    return ["What is a Pointer?", "Address-Of & Dereference Operators", "Pointer Arithmetic", "Null & Void Pointers", "Pointers & Arrays", "Pointers to Pointers", "Dynamic Memory (malloc/free)", "Function Pointers", "Common Memory Bugs", "Debugging with Valgrind"].slice(0, count);
  }
  if (lower.includes("class") || lower.includes("oop") || lower.includes("java")) {
    return ["Classes & Objects", "Constructors & Destructors", "Encapsulation & Access Modifiers", "Inheritance & super", "Polymorphism & Method Overriding", "Abstract Classes", "Interfaces", "Static vs Instance Members", "Generics & Templates", "Design Patterns (Factory, Singleton)"].slice(0, count);
  }
  if (lower.includes("tensor") || lower.includes("torch") || lower.includes("tensorflow")) {
    return ["Tensor Fundamentals", "Shape, Dtype & Device", "Tensor Operations & Broadcasting", "Automatic Differentiation", "Building Neural Layers", "Activation Functions", "Loss Functions", "Optimizers (SGD, Adam)", "Training Loop", "Model Saving & Loading"].slice(0, count);
  }
  if (lower.includes("algorithm") || lower.includes("dsa") || lower.includes("data structure")) {
    return ["Complexity Analysis (Big-O)", "Arrays & Two Pointers", "Hash Maps & Sets", "Linked Lists", "Stacks & Queues", "Binary Trees & BST", "Heap & Priority Queue", "Graph BFS & DFS", "Dynamic Programming", "Greedy Algorithms", "Tries & Advanced Structures", "Mock Contest Practice"].slice(0, count);
  }
  if (lower.includes("cloud") || lower.includes("aws") || lower.includes("azure")) {
    return ["Cloud Architecture Fundamentals", "Virtual Machines & Compute", "Storage Services (S3/Blob)", "Identity & Access Management", "Networking & VPC", "Serverless Functions", "Managed Databases", "Container Services", "Infrastructure as Code", "Monitoring & Alerting"].slice(0, count);
  }
  if (lower.includes("sql") || lower.includes("database") || lower.includes("rds")) {
    return ["SELECT & Filtering", "JOINs (INNER, LEFT, RIGHT)", "Aggregations & GROUP BY", "Subqueries & CTEs", "Indexing & Query Plans", "Transactions & ACID", "Stored Procedures", "Database Design & Normalization", "Performance Tuning", "NoSQL vs SQL"].slice(0, count);
  }
  if (lower.includes("agent") || lower.includes("rag") || lower.includes("llm")) {
    return ["LLM Fundamentals & Prompt Engineering", "Tool Use & Function Calling", "Memory Systems for Agents", "ReAct Reasoning Pattern", "Embeddings & Vector Stores", "RAG Pipeline Architecture", "Multi-Agent Orchestration", "Agent Evaluation & Safety", "Human-in-the-Loop Design", "Production Deployment"].slice(0, count);
  }

  // Generic fallback
  const base = ["Core Concepts & Theory", "Practical Implementation", "Real-World Application", "Advanced Techniques", "Performance Optimization", "Testing & Debugging", "Industry Best Practices", "Project Architecture", "Integration Patterns", "Assessment & Review"];
  return Array.from({ length: count }, (_, i) => base[i % base.length] + (i >= base.length ? ` (Part ${Math.floor(i / base.length) + 1})` : ""));
}
