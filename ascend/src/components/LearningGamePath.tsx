import React, { useState, useMemo, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Trophy, Gem, Lock, CheckCircle2, Sparkles, BookOpen,
  ArrowRight, Gift, X, Zap, Target, ChevronDown, ChevronRight,
  Code2, Brain, Cpu, Bolt, Wrench, Building, Database, Shield,
  Lightbulb, HelpCircle, FileText, Check, Award, Video, Play,
  Briefcase, UserCheck, Layers, FileCheck, Terminal, Bug
} from "lucide-react";
import GamificationModal, { LEAGUES } from "./GamificationModal";
import { recordUserProgress } from "../services/api";
import { getBranchModules, makeVideoLinks } from "../data/branchModules";
import type { BranchModuleData, VideoLink } from "../data/branchModules/types";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────
export interface LessonNode {
  id: string;
  step: number;
  phaseNumber: number; // 1 to 5
  category: string;    // e.g. "Phase 1: Aptitude Foundation"
  subTopic: string;    // e.g. "Quantitative Aptitude"
  title: string;
  type: "lesson" | "quiz" | "code" | "chest" | "boss";
  xpReward: number;
  diamondReward: number;
  videos?: VideoLink[];
  theory?: {
    summary: string;
    detailedContent?: string;      // Multi-paragraph textbook-grade study material
    keyPoints: string[];
    formula?: string;
    code?: string;
    examples?: string[];           // Real worked examples
    placementTips?: string[];       // Secret tips for TCS / Amazon / Google placement exams
    authorReferences?: Array<{ author: string; bookTitle: string; coreInsight: string }>;
    comparisonTable?: { headers: string[]; rows: string[][] };
    flowchartSteps?: string[];
  };
  debugChallenge?: {
    title: string;
    buggy: string;
    fixed: string;
    hint: string;
  };
  questions?: Array<{
    prompt: string;
    options: string[];
    correct: number;
    explanation: string;
  }>;
}

interface LearningGamePathProps {
  branchId?: string | null;
  roleId?: string | null;
  targetPhase?: number;
  onNodeComplete?: (xp: number, diamonds: number) => void;
}

// ─────────────────────────────────────────────────────────────────────────────
// 5-PHASE DEPARTMENT & ROLE SPECIFIC ROADMAP GENERATOR
// ─────────────────────────────────────────────────────────────────────────────
export function getCoursePath(branchId: string, roleId?: string | null): LessonNode[] {
  const b = (branchId || "cse").toLowerCase();
  const r = (roleId || "").toLowerCase();

  // Load department-specific rich branch modules (CSE, IT, AIML, AIDS, ECE, EEE, MECH)
  const branchModules = getBranchModules(b, r);

  const nodes: LessonNode[] = [];
  let currentStep = 1;

  // Helper to attach video search links across 11 Indian languages
  const attachVideos = (topicName: string) => makeVideoLinks(topicName);

  // ───────────────────────────────────────────────────────────────────────────
  // PHASE 1: APTITUDE FOUNDATION
  // ─────────────────────────────────────────────────────────────────────────
  // Sub-topics: Quantitative Aptitude, Logical Reasoning, Verbal Ability
  nodes.push(
    // Quant 1
    {
      id: `${b}-p1-quant-1`,
      step: currentStep++,
      phaseNumber: 1,
      category: "Phase 1: Aptitude Foundation",
      subTopic: "Quantitative Aptitude",
      title: "Number Systems, Cyclicity & Divisibility Rules",
      type: "lesson",
      xpReward: 40,
      diamondReward: 10,
      videos: attachVideos("Number Systems and Cyclicity Quant Aptitude"),
      theory: {
        summary: "Master core arithmetic principles, unit digit cyclicity, remainder theorems, and rapid HCF/LCM shortcuts essential for TCS NQT, Wipro NTH, Infosys, and Amazon written tests.",
        detailedContent: `
### 1. Fundamental Properties of Number Systems
Numbers form the foundation of quantitative aptitude and computer algorithms:
- Natural Numbers: {1, 2, 3, ...}
- Prime Numbers: Numbers greater than 1 with exactly two distinct positive divisors (1 and itself). 2 is the only even prime number.
- Co-Prime Numbers: Two numbers a and b are co-prime if GCD(a, b) = 1.

### 2. Divisibility Rules Shortcut Matrix
- Divisibility by 3: Sum of digits must be divisible by 3.
- Divisibility by 4: Last two digits formed must be divisible by 4.
- Divisibility by 7: Double the last digit and subtract it from the remaining number.
- Divisibility by 11: Difference between sum of digits at odd places and sum of digits at even places must be 0 or a multiple of 11.

### 3. Highest Common Factor (HCF) & Least Common Multiple (LCM)
- HCF(a, b) * LCM(a, b) = a * b (Valid ONLY for 2 numbers)
- HCF of Fractions = HCF(Numerators) / LCM(Denominators)
- LCM of Fractions = LCM(Numerators) / HCF(Denominators)

### 4. Cyclicity of Unit Digits
To find unit digit of N^P:
- 0, 1, 5, 6: Cyclicity 1 (e.g. 6^k always ends in 6)
- 4, 9: Cyclicity 2 (4^1=4, 4^2=6, 4^3=4...)
- 2, 3, 7, 8: Cyclicity 4. Divide exponent P by 4; if remainder is r, unit digit is N^r (if r=0, use N^4).
        `,
        keyPoints: [
          "HCF × LCM = Product of two numbers",
          "HCF of fractions = HCF(Numerators) / LCM(Denominators)",
          "Unit digit of 2, 3, 7, 8 repeats every 4 powers",
          "Sum of first N natural numbers = N(N + 1) / 2"
        ],
        formula: "HCF(a, b) × LCM(a, b) = a × b",
        examples: [
          "Find unit digit of 7^105:\n105 mod 4 = 1. Therefore, unit digit of 7^105 is 7^1 = 7.",
          "Find HCF and LCM of 36 and 48:\n36 = 2² × 3², 48 = 2⁴ × 3¹.\nHCF = 2² × 3¹ = 12. LCM = 2⁴ × 3² = 144."
        ],
        placementTips: [
          "TCS NQT frequently asks for the smallest number which leaves a specific remainder when divided by a set of numbers. Use LCM(a, b, c) + Remainder.",
          "Infosys quantitative tests repeatedly feature unit digit questions with giant exponents like 23^4567."
        ],
        authorReferences: [
          { author: "Dr. R.S. Aggarwal", bookTitle: "Quantitative Aptitude for Competitive Examinations", coreInsight: "Unit digit cyclicity shortcuts eliminate 90% of manual calculation steps in screening tests." }
        ]
      },
      questions: [
        { prompt: "Find the HCF of 36 and 48.", options: ["6", "12", "18", "24"], correct: 1, explanation: "Prime factorizations: 36 = 2²×3², 48 = 2⁴×3¹. Lowest powers: 2²×3¹ = 12." },
        { prompt: "What is the unit digit of 7^105?", options: ["1", "3", "7", "9"], correct: 2, explanation: "7 has cyclicity of 4. 105 mod 4 = 1. So 7^1 = 7." }
      ]
    },

    // Quant 2
    {
      id: `${b}-p1-quant-2`,
      step: currentStep++,
      phaseNumber: 1,
      category: "Phase 1: Aptitude Foundation",
      subTopic: "Quantitative Aptitude",
      title: "Percentages, Profit, Loss & Successive Discounts",
      type: "quiz",
      xpReward: 40,
      diamondReward: 10,
      videos: attachVideos("Percentages Profit Loss Discount Shortcut Formulas"),
      theory: {
        summary: "Percentage multipliers, markups, successive discounts, and margin calculations required for campus placement screening rounds.",
        detailedContent: `
### 1. Percentage as Multipliers
- A 20% increase => multiply by 1.20
- A 15% decrease => multiply by 0.85
- Successive changes of +a% and +b% result in a net change of:
Net Change % = a + b + (a * b) / 100

### 2. Profit and Loss Essentials
- Profit % = (SP - CP) / CP * 100
- Loss % = (CP - SP) / CP * 100
- If CP of X articles = SP of Y articles: Profit/Loss % = (X - Y) / Y * 100

### 3. Marked Price & Single Equivalent Discount
- Discount % = (MP - SP) / MP * 100
- Two successive discounts of d1% and d2% equal a single discount of:
Single Discount % = d1 + d2 - (d1 * d2) / 100
        `,
        keyPoints: [
          "Net change for +x% followed by -x% is ALWAYS a loss of (x/100)² %",
          "Discounts are calculated on Marked Price (MP), while Profit/Loss is on Cost Price (CP)",
          "Buy 3 Get 1 Free = 1/4 × 100 = 25% discount"
        ],
        formula: "Net % Change = a + b + (a × b) / 100",
        examples: [
          "A trader marks goods 30% above CP and offers a 10% discount. Find profit %.\nLet CP = 100. MP = 130.\nDiscount = 10% of 130 = 13.\nSP = 130 - 13 = 117.\nProfit = 17%."
        ]
      },
      questions: [
        { prompt: "A 20% increase followed by a 20% decrease yields a net change of:", options: ["0%", "-4%", "+4%", "-2%"], correct: 1, explanation: "Net change = 20 - 20 + (20×(-20))/100 = -4% (4% decrease)." },
        { prompt: "If cost price of 15 articles equals selling price of 12 articles, profit percentage is:", options: ["20%", "25%", "30%", "33.3%"], correct: 1, explanation: "Profit % = (15 - 12) / 12 × 100 = 25%." }
      ]
    },

    // Logical Reasoning
    {
      id: `${b}-p1-logical-1`,
      step: currentStep++,
      phaseNumber: 1,
      category: "Phase 1: Aptitude Foundation",
      subTopic: "Logical Reasoning",
      title: "Blood Relations, Coding-Decoding & Direction Sense",
      type: "lesson",
      xpReward: 40,
      diamondReward: 10,
      videos: attachVideos("Logical Reasoning Blood Relations Coding Decoding"),
      theory: {
        summary: "Master family tree diagrams, letter-shift substitution patterns, and 2D cardinal direction coordinate navigation.",
        detailedContent: `
### 1. Blood Relations Family Tree System
- Represent males with [+] and females with [-].
- Represent couples with double lines (=) and siblings with single horizontal lines (-).
- Vertical lines represent generation gaps (Parents | Children).

### 2. Coding-Decoding Patterns
- Alphabet Positioning: A=1, B=2 ... Z=26. Reverse positions: A=26, B=25 ... Z=1.
- Opposite Letter Shortcut (AZ, BY, CX, DW, EV, FU, GT, HS, IR, JK, LO, MN).

### 3. Direction & Distance Vector Math
- Cardinal Directions: North (+Y), South (-Y), East (+X), West (-X).
- Shortest distance between starting and ending points uses Pythagoras Theorem:
Distance = sqrt((dx)^2 + (dy)^2)
        `,
        keyPoints: [
          "Always draw a generation tree diagram for multi-statement blood relation questions",
          "Opposite letters sum up to 27 in alphabet indexing (e.g. A=1, Z=26 => 1+26 = 27)",
          "Shadow in the morning is towards West; shadow in the evening is towards East"
        ],
        formula: "Shortest Distance = √(Δx² + Δy²)"
      },
      questions: [
        { prompt: "Pointing to a photograph, a man said: 'I have no brother or sister, but that man's father is my father's son.' Whose photo was it?", options: ["His own", "His son's", "His father's", "His nephew's"], correct: 1, explanation: "'My father's son' = himself (since he has no brother). So 'that man's father is myself'. The photo is his son's." }
      ]
    },

    // Verbal Ability
    {
      id: `${b}-p1-verbal-1`,
      step: currentStep++,
      phaseNumber: 1,
      category: "Phase 1: Aptitude Foundation",
      subTopic: "Verbal Ability",
      title: "Reading Comprehension, Grammar Rules & Vocabulary",
      type: "quiz",
      xpReward: 40,
      diamondReward: 10,
      videos: attachVideos("Verbal Ability Spotting Errors Reading Comprehension"),
      theory: {
        summary: "Subject-verb agreement rules, modifier placement, tone identification, and vocabulary roots for corporate communication tests.",
        detailedContent: `
### 1. Subject-Verb Agreement Golden Rules
- Singular subjects take singular verbs; plural subjects take plural verbs.
- Words joined by 'and' take plural verbs ('John and Mary are going').
- Words joined by 'either...or' / 'neither...nor' take the verb matching the CLOSER subject ('Neither the teacher nor the students WERE present').

### 2. Active vs Passive Voice & Parallelism
- Parallelism: Items in a series must share grammatical form ('He likes hiking, swimming, and biking', NOT 'to bike').
        `,
        keyPoints: [
          "Subject and verb must agree in number regardless of intervening prepositional phrases",
          "Use 'Fewer' for countable nouns (fewer books) and 'Less' for uncountable quantities (less water)",
          "Root words simplify vocabulary recognition (e.g., 'Mal' = bad, 'Bene' = good)"
        ]
      },
      questions: [
        { prompt: "Choose the correct sentence:", options: ["Neither the manager nor the employees was present.", "Neither the manager nor the employees were present.", "Neither the manager or the employees was present.", "Neither the manager nor employees has present."], correct: 1, explanation: "With 'neither...nor', verb agrees with the nearest subject ('employees' => plural verb 'were')." }
      ]
    },

    // Chest 1
    {
      id: `${b}-chest-p1`,
      step: currentStep++,
      phaseNumber: 1,
      category: "Phase 1: Aptitude Foundation",
      subTopic: "Aptitude Foundation",
      title: "🎁 Phase 1 Aptitude Master Reward Chest",
      type: "chest",
      xpReward: 150,
      diamondReward: 50
    }
  );

  // ───────────────────────────────────────────────────────────────────────────
  // PHASE 2: TECHNICAL FOUNDATION
  // ─────────────────────────────────────────────────────────────────────────
  // Mapped per department (CSE/IT, AIML/AIDS, ECE, EEE, MECH)
  const isCseIt = b === "cse" || b === "it";
  const isAimlAids = b === "aiml" || b === "aids";
  const isEce = b === "ece";
  const isEee = b === "eee";
  const isMech = b === "mech";

  // Node 1: Department Core Subject
  let coreTitle = "Operating Systems & Process Lifecycle";
  let coreSummary = "Process management, CPU scheduling, thread synchronization, and virtual memory paging.";
  if (isAimlAids) {
    coreTitle = "Linear Algebra, Vector Spaces & PCA";
    coreSummary = "Matrices, eigenvalues, eigenvectors, matrix decompositions, and Principal Component Analysis.";
  } else if (isEce) {
    coreTitle = "Digital Electronics & Logic Gate Minimization";
    coreSummary = "Boolean algebra, K-Maps, combinational logic, flip-flops, and sequential state machines.";
  } else if (isEee) {
    coreTitle = "Circuit Theory & Network Theorems";
    coreSummary = "KCL, KVL, Thevenin theorem, Norton theorem, maximum power transfer, and AC transient analysis.";
  } else if (isMech) {
    coreTitle = "Thermodynamics & First/Second Laws";
    coreSummary = "Carnot cycle, entropy, enthalpy, ideal gas equations, and heat engine efficiencies.";
  }

  nodes.push({
    id: `${b}-p2-core-1`,
    step: currentStep++,
    phaseNumber: 2,
    category: "Phase 2: Technical Foundation",
    subTopic: "Core Subjects",
    title: coreTitle,
    type: "lesson",
    xpReward: 60,
    diamondReward: 15,
    videos: attachVideos(`${b.toUpperCase()} ${coreTitle} Engineering Lecture`),
    theory: {
      summary: coreSummary,
      detailedContent: `
### 1. Department Core Fundamentals (${b.toUpperCase()})
Deep academic grounding required for technical interview rounds:
- Principles of domain architecture and physical laws.
- Mathematical formulations and system behavior modeling.
- Real-world engineering implementations and industry standards.
      `,
      keyPoints: [
        "Core theoretical concepts form 50% of technical interview questions",
        "Focus on fundamental laws, mathematical proofs, and system trade-offs"
      ]
    },
    questions: [
      { prompt: `Which concept is fundamental to ${b.toUpperCase()} technical core evaluations?`, options: [coreTitle, "Generic Aptitude", "Basic Grammar", "Public Speaking"], correct: 0, explanation: `${coreTitle} is a core evaluation pillar in ${b.toUpperCase()} engineering technical interviews.` }
    ]
  });

  // Node 2: Programming Languages & Logic
  nodes.push({
    id: `${b}-p2-prog-1`,
    step: currentStep++,
    phaseNumber: 2,
    category: "Phase 2: Technical Foundation",
    subTopic: "Programming Languages",
    title: "C++ / Java / Python Memory Models & OOP Concepts",
    type: "lesson",
    xpReward: 60,
    diamondReward: 15,
    videos: attachVideos("Object Oriented Programming C++ Java Python OOPs"),
    theory: {
      summary: "Encapsulation, Inheritance, Polymorphism, Abstraction, Stack vs Heap memory allocation, and Garbage Collection.",
      detailedContent: `
### 1. The 4 Pillars of OOP
1. Encapsulation: Binding data members and methods together while restricting direct access (private getters/setters).
2. Abstraction: Hiding internal implementation details and exposing only essential interfaces.
3. Inheritance: Reusing attributes and methods from a parent class (Single, Multiple, Multilevel, Hierarchical).
4. Polymorphism: Ability of a method to take multiple forms (Compile-time Method Overloading vs Runtime Method Overriding).

### 2. Stack vs Heap Memory Management
- Stack Memory: Stores local variables, function calls, and primitive types. Fast access, managed automatically by call stack.
- Heap Memory: Dynamic allocation for objects created via 'new' keyword. Slower access, requires manual deallocation (C++) or automatic Garbage Collection (Java/Python).
      `,
      keyPoints: [
        "Method Overloading = Same method name, different parameter signature (Compile-time)",
        "Method Overriding = Child class redefines virtual/abstract method of parent class (Runtime)",
        "Stack memory overflow occurs with infinite recursion"
      ],
      code: `// C++ Polymorphism & Virtual Function
class Animal {
public:
    virtual void makeSound() { cout << "Generic sound" << endl; }
};
class Dog : public Animal {
public:
    void makeSound() override { cout << "Bark bark!" << endl; }
};`
    },
    questions: [
      { prompt: "Which OOP concept allows a subclass to provide a specific implementation of a method already defined in its superclass?", options: ["Method Overloading", "Method Overriding", "Encapsulation", "Abstraction"], correct: 1, explanation: "Method Overriding enables runtime polymorphism by redefining a superclass method in a child class." }
    ]
  });

  // Node 3: Coding Basics
  nodes.push({
    id: `${b}-p2-code-1`,
    step: currentStep++,
    phaseNumber: 2,
    category: "Phase 2: Technical Foundation",
    subTopic: "Coding Basics",
    title: "Logic Building: Loops, Recursion & Pattern Printing",
    type: "code",
    xpReward: 70,
    diamondReward: 20,
    videos: attachVideos("Logic Building Loops Recursion C++ Python Java"),
    debugChallenge: {
      title: "Fix Infinite Recursion Bug in Factorial",
      buggy: `function factorial(n) {\n  return n * factorial(n - 1);\n}`,
      fixed: `function factorial(n) {\n  if (n <= 1) return 1;\n  return n * factorial(n - 1);\n}`,
      hint: "Every recursive function requires a base case to terminate execution!"
    },
    questions: [
      { prompt: "What happens if a recursive function lacks a valid base case?", options: ["Runs infinitely until Stack Overflow", "Returns null automatically", "Executes in O(1) time", "Compiles with warning"], correct: 0, explanation: "Without a base case, recursion fills the call stack continuously until a Stack Overflow error occurs." }
    ]
  });

  // ───────────────────────────────────────────────────────────────────────────
  // PHASE 3: ADVANCED PREPARATION
  // ─────────────────────────────────────────────────────────────────────────
  // Mapped using branchModules (DSA, SQL, System Design)
  branchModules.slice(0, 3).forEach((mod, i) => {
    nodes.push({
      id: `${b}-p3-mod-${i}`,
      step: currentStep++,
      phaseNumber: 3,
      category: "Phase 3: Advanced Preparation",
      subTopic: i === 0 ? "DSA" : i === 1 ? "SQL & Databases" : "System Design / CS Fundamentals",
      title: mod.moduleTitle,
      type: "lesson",
      xpReward: 80,
      diamondReward: 25,
      videos: mod.videos,
      theory: {
        summary: mod.studyMaterial.summary,
        detailedContent: mod.studyMaterial.deepDiveTextbook,
        keyPoints: mod.studyMaterial.keyPoints,
        authorReferences: mod.studyMaterial.authorReferences,
        comparisonTable: mod.studyMaterial.comparisonTable,
        flowchartSteps: mod.studyMaterial.flowchartSteps,
        examples: [mod.studyMaterial.example]
      },
      questions: mod.quiz.map(q => ({
        prompt: q.q,
        options: q.options,
        correct: q.answer,
        explanation: "Review the module deep dive textbook and comparison table for full solution steps."
      }))
    });
  });

  // Chest 3
  nodes.push({
    id: `${b}-chest-p3`,
    step: currentStep++,
    phaseNumber: 3,
    category: "Phase 3: Advanced Preparation",
    subTopic: "Advanced Preparation",
    title: "🎁 Phase 3 Advanced Master Diamond Chest",
    type: "chest",
    xpReward: 250,
    diamondReward: 100
  });

  // ───────────────────────────────────────────────────────────────────────────
  // PHASE 4: PLACEMENT READINESS
  // ─────────────────────────────────────────────────────────────────────────
  // Sub-topics: Resume & Portfolio, Projects, Company-wise Preparation
  nodes.push(
    // Resume & Portfolio
    {
      id: `${b}-p4-resume`,
      step: currentStep++,
      phaseNumber: 4,
      category: "Phase 4: Placement Readiness",
      subTopic: "Resume & Portfolio",
      title: "ATS Resume Optimization, GitHub Portfolio & LinkedIn Branding",
      type: "lesson",
      xpReward: 75,
      diamondReward: 20,
      videos: attachVideos("ATS Resume Building GitHub Portfolio LinkedIn Placement"),
      theory: {
        summary: "Pass Applicant Tracking Systems (ATS) with 85%+ score, build a high-impact GitHub portfolio, and optimize LinkedIn profiles for recruiter outreach.",
        detailedContent: `
### 1. ATS Resume Parsing Mechanics
Applicant Tracking Systems parse resumes using OCR and keyword extraction:
- Standard Single-Column Layout: Avoid tables, images, text boxes, or fancy graphics that break ATS parsers.
- Impact Statements (XYZ Formula): "Accomplished [X], as measured by [Y], by doing [Z]."
  * Bad: "Built a web app for college project."
  * Good: "Developed a real-time full-stack e-learning portal serving 1,200 active students, reducing server response latency by 35% using Redis caching."

### 2. GitHub Portfolio Best Practices
- Every project must include a professional README.md with system architecture diagram, live demo link, tech stack badges, and local setup instructions.

### 3. Recruiter LinkedIn Hacks
- Headline formula: [Target Role] | [Tech Stack Skills] | [Key Accomplishment].
        `,
        keyPoints: [
          "Always use standard bullet points and clear section headers (Education, Experience, Projects, Skills)",
          "Quantify achievements with percentages, metrics, and latency numbers",
          "Tailor keywords to match job descriptions before applying"
        ],
        placementTips: [
          "Use Google's official XYZ resume bullet formula to immediately rank in the top 5% of candidate applications."
        ]
      },
      questions: [
        { prompt: "What is Google's recommended formula for writing resume accomplishment bullet points?", options: ["XYZ Formula: Accomplished X, measured by Y, by doing Z", "ABC Formula: Action, Basic, Code", "SMART Goal Formula", "STAR Method only"], correct: 0, explanation: "Google recommends the XYZ formula: Accomplished [X], as measured by [Y], by doing [Z]." }
      ]
    },

    // Company-wise Prep
    {
      id: `${b}-p4-company`,
      step: currentStep++,
      phaseNumber: 4,
      category: "Phase 4: Placement Readiness",
      subTopic: "Company-wise Preparation",
      title: "TCS NQT, Infosys, Amazon & Google Company Test Patterns",
      type: "quiz",
      xpReward: 80,
      diamondReward: 25,
      videos: attachVideos("TCS NQT Infosys Amazon Google Placement Preparation"),
      theory: {
        summary: "Detailed breakdown of exam patterns, cut-offs, coding platforms, and interview rounds for Service & Product giants.",
        detailedContent: `
### 1. TCS NQT (National Qualifier Test)
- Foundation Section: Numerical Ability, Verbal Ability, Reasoning Ability (75 mins).
- Advanced Section: Advanced Quantitative & Reasoning (35 mins) + 2 Hands-on Coding Problems (45 mins).

### 2. Amazon SDE Assessment
- Online Assessment (OA): 2 LeetCode Medium/Hard Coding Questions (90 mins) + Work Style Assessment & Leadership Principles evaluation.
- Leadership Principles: Customer Obsession, Ownership, Bias for Action, Deep Dive.
        `,
        keyPoints: [
          "Service-based MNCs (TCS, Infosys, Wipro) heavily penalize speed errors in Aptitude screening",
          "Product MNCs (Amazon, Microsoft, Google) require 100% test case pass on Coding OA rounds"
        ]
      },
      questions: [
        { prompt: "Which Amazon Leadership Principle evaluates taking initiative without waiting for manager approval?", options: ["Bias for Action", "Frugality", "Hire and Develop the Best", "Think Big"], correct: 0, explanation: "Bias for Action emphasizes calculated risk-taking and fast action without over-deliberation." }
      ]
    }
  );

  // ───────────────────────────────────────────────────────────────────────────
  // PHASE 5: PLACEMENT ROUNDS
  // ─────────────────────────────────────────────────────────────────────────
  // Sub-topics: Aptitude Test, Coding Test, Technical Interview, HR Interview, Managerial, Mock Placement Exam
  nodes.push(
    {
      id: `${b}-p5-apt-test`,
      step: currentStep++,
      phaseNumber: 5,
      category: "Phase 5: Placement Rounds",
      subTopic: "Aptitude Test",
      title: "Round 1: Full-Length Online Aptitude Screening Exam",
      type: "quiz",
      xpReward: 100,
      diamondReward: 30,
      questions: [
        { prompt: "A train 200m long passes a 300m platform in 25 seconds. Speed of the train in km/h?", options: ["54 km/h", "72 km/h", "90 km/h", "108 km/h"], correct: 1, explanation: "Total distance = 200+300 = 500m. Speed = 500/25 = 20 m/s = 20 × (18/5) = 72 km/h." },
        { prompt: "If log10(x) = 3, what is the value of x?", options: ["30", "100", "1000", "3000"], correct: 2, explanation: "log10(x) = 3 => x = 10³ = 1000." }
      ]
    },
    {
      id: `${b}-p5-tech-interview`,
      step: currentStep++,
      phaseNumber: 5,
      category: "Phase 5: Placement Rounds",
      subTopic: "Technical Interview",
      title: "Round 3: Live Technical Panel Interview & System Deep Dive",
      type: "lesson",
      xpReward: 120,
      diamondReward: 40,
      videos: attachVideos("Technical Interview Round Questions and Answers"),
      theory: {
        summary: "Handling live whiteboard coding, system architecture questions, project deep dives, and edge case defenses.",
        detailedContent: `
### Technical Interview Survival Strategy
1. Think Out Loud: Explain your thought process to the interviewer before writing code.
2. Clarify Constraints: Ask about input size N, memory limits, and handling null/invalid inputs.
3. Start with Brute Force: State brute force complexity first, then optimize using Hash Maps, Two Pointers, or Dynamic Programming.
        `,
        keyPoints: [
          "Never stay silent for more than 30 seconds during a technical interview",
          "State space and time complexity explicitly after completing solution"
        ]
      },
      questions: [
        { prompt: "What should you do first when given a coding problem in a live technical interview?", options: ["Start typing code immediately", "Ask clarifying questions and state constraints", "Memorize code", "Ask for solution"], correct: 1, explanation: "Always clarify problem constraints, edge cases, and sample inputs before writing any code." }
      ]
    },
    {
      id: `${b}-p5-hr-round`,
      step: currentStep++,
      phaseNumber: 5,
      category: "Phase 5: Placement Rounds",
      subTopic: "HR Interview",
      title: "Round 4: Behavioral HR Round & STAR Method Mastery",
      type: "quiz",
      xpReward: 100,
      diamondReward: 30,
      videos: attachVideos("HR Interview Questions Answers STAR Method"),
      theory: {
        summary: "Answering 'Tell me about yourself', conflict resolution, salary expectations, and company culture alignment using the STAR technique.",
        detailedContent: `
### STAR Method (Situation, Task, Action, Result)
- Situation: Describe the specific event or situation.
- Task: Explain the challenge or goal you had to complete.
- Action: Detail the specific steps YOU took to solve it.
- Result: Share the measurable outcomes and takeaways.
        `,
        keyPoints: [
          "Focus 70% of your STAR response on your specific Actions and positive Results",
          "Never speak negatively about past teammates, professors, or employers"
        ]
      },
      questions: [
        { prompt: "What does the 'A' in the STAR method stand for?", options: ["Aptitude", "Action", "Achievement", "Assessment"], correct: 1, explanation: "STAR stands for Situation, Task, Action, Result." }
      ]
    },

    // FINAL BOSS EXAM
    {
      id: `${b}-p5-boss-exam`,
      step: currentStep++,
      phaseNumber: 5,
      category: "Phase 5: Placement Rounds",
      subTopic: "Mock Placement Exam",
      title: "🏆 GRAND BOSS: Tier-1 MNC Full Mock Placement Certification",
      type: "boss",
      xpReward: 500,
      diamondReward: 200,
      questions: [
        { prompt: "Given an array nums = [2,7,11,15] and target = 9, what is the most optimal algorithm to return indices of the two numbers that add up to target?", options: ["O(N²) brute force nested loops", "O(N log N) sort array then binary search", "O(N) single-pass HashMap storing target - num complement", "O(N log N) Heap allocation"], correct: 2, explanation: "A single-pass HashMap maps value to index. For each element x, check if (target - x) exists in map. Time O(N), Space O(N)." },
        { prompt: "Which data structure is naturally used to implement a Min-Heap and Priority Queue with O(log N) insertion and extraction?", options: ["Doubly Linked List", "Binary Heap Array", "B-Tree", "Red-Black Tree"], correct: 1, explanation: "A Binary Heap stored as an array provides parent i at floor((i-1)/2) and children at 2i+1, 2i+2. Provides O(log N) push/pop." }
      ]
    }
  );

  return nodes;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN GAME PATH COMPONENT
// ─────────────────────────────────────────────────────────────────────────────
export default function LearningGamePath({ branchId = "cse", roleId, targetPhase, onNodeComplete }: LearningGamePathProps) {
  const [userXp, setUserXp] = useState(() => parseInt(localStorage.getItem("user_xp") || "0", 10));
  const [userDiamonds, setUserDiamonds] = useState(() => parseInt(localStorage.getItem("user_diamonds") || "0", 10));
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => {
    try { return new Set(JSON.parse(localStorage.getItem("completed_ids") || "[]")); }
    catch { return new Set(); }
  });

  const [activeNode, setActiveNode] = useState<LessonNode | null>(null);
  const [modalTab, setModalTab] = useState<"textbook" | "formulas" | "videos" | "placement">("textbook");
  const [step, setStep] = useState<"theory" | "quiz">("theory");
  const [qIdx, setQIdx] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [lastCompleted, setLastCompleted] = useState<LessonNode | null>(null);

  const phaseRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const nodes = useMemo(() => getCoursePath(branchId || "cse", roleId), [branchId, roleId]);

  // Group nodes by Category (Phase 1 to 5)
  const phases = useMemo(() => {
    const map = new Map<string, LessonNode[]>();
    for (const n of nodes) {
      if (!map.has(n.category)) map.set(n.category, []);
      map.get(n.category)!.push(n);
    }
    return Array.from(map.entries());
  }, [nodes]);

  // Auto-scroll when targetPhase is selected
  useEffect(() => {
    if (targetPhase && phaseRefs.current[targetPhase]) {
      phaseRefs.current[targetPhase]?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [targetPhase]);

  const isUnlocked = (node: LessonNode): boolean => {
    if (completedIds.has(node.id)) return true;
    const prev = nodes.find(n => n.step === node.step - 1);
    return !prev || completedIds.has(prev.id);
  };

  const openNode = (node: LessonNode) => {
    if (!isUnlocked(node)) return;
    setActiveNode(node);
    setModalTab("textbook");
    setStep(node.theory ? "theory" : "quiz");
    setQIdx(0);
    setSelected(null);
    setSubmitted(false);

    if (node.type === "chest") {
      completeNode(node);
    }
  };

  const completeNode = (node: LessonNode) => {
    const newXp = userXp + node.xpReward;
    const newD = userDiamonds + node.diamondReward;
    setUserXp(newXp);
    setUserDiamonds(newD);
    localStorage.setItem("user_xp", String(newXp));
    localStorage.setItem("user_diamonds", String(newD));

    const next = new Set(completedIds);
    next.add(node.id);
    setCompletedIds(next);
    localStorage.setItem("completed_ids", JSON.stringify([...next]));

    recordUserProgress({ type: "lesson_complete", score: 100, xpEarned: node.xpReward, diamondsEarned: node.diamondReward });
    if (onNodeComplete) onNodeComplete(node.xpReward, node.diamondReward);

    setLastCompleted(node);
    setShowReward(true);
  };

  const handleNextQuestion = () => {
    if (!activeNode?.questions) return;
    if (qIdx + 1 < activeNode.questions.length) {
      setQIdx(q => q + 1);
      setSelected(null);
      setSubmitted(false);
    } else {
      completeNode(activeNode);
    }
  };

  const nodeIcon = (n: LessonNode, done: boolean, unlocked: boolean) => {
    if (done) return <CheckCircle2 size={30} className="text-slate-950 stroke-[2.5]" />;
    if (!unlocked) return <Lock size={24} className="text-slate-600" />;
    if (n.type === "chest") return <Gift size={28} className="text-yellow-300 animate-bounce" />;
    if (n.type === "boss") return <Trophy size={28} className="text-amber-400" />;
    if (n.type === "code") return <Code2 size={26} className="text-cyan-300" />;
    return <BookOpen size={26} className="text-white" />;
  };

  const nextNode = nodes.find(n => !completedIds.has(n.id));

  return (
    <div className="w-full space-y-8 pb-20 text-slate-100">
      {/* ── HEADER STATS ── */}
      <div className="relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br from-slate-900 via-purple-950/60 to-slate-950 border border-purple-500/30 shadow-2xl">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
                {branchId?.toUpperCase() || "CSE"} — 5-Phase Placement Roadmap
              </span>
              {nextNode && (
                <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 animate-pulse">
                  ▶ Active Step {nextNode.step}: {nextNode.subTopic}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
              Comprehensive Placement Curriculum <Sparkles size={22} className="text-amber-400" />
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">Master Aptitude, Technical Core, DSA, Projects, ATS Resumes, and MNC Placement Interview Rounds.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm font-bold">
              <Zap size={15} /> {userXp} XP
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-bold">
              <Gem size={15} /> {userDiamonds} 💎
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-slate-500 mb-1">
            <span>{completedIds.size} of {nodes.length} syllabus modules complete</span>
            <span>{Math.round((completedIds.size / nodes.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full"
              animate={{ width: `${(completedIds.size / nodes.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      {/* ── PATH NODES (5 PHASES) ── */}
      <div className="space-y-12">
        {phases.map(([category, phaseNodes]) => {
          const phaseNum = phaseNodes[0]?.phaseNumber || 1;

          return (
            <div
              key={category}
              ref={el => { phaseRefs.current[phaseNum] = el; }}
              className="space-y-6 pt-2"
            >
              <div className="flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-800" />
                <div className="flex items-center gap-2 px-5 py-2 rounded-full border border-purple-500/30 bg-slate-900 shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-400 animate-pulse" />
                  <span className="text-xs font-extrabold uppercase tracking-widest text-purple-300">
                    {category}
                  </span>
                </div>
                <div className="h-px flex-1 bg-slate-800" />
              </div>

              <div className="flex flex-col items-center gap-10 relative">
                {phaseNodes.map((node, idx) => {
                  const done = completedIds.has(node.id);
                  const unlocked = isUnlocked(node);
                  const offsets = [0, -100, 100, -60, 60, 0, -80, 80];
                  const xOffset = offsets[idx % offsets.length];

                  return (
                    <div key={node.id} className="flex flex-col items-center relative" style={{ transform: `translateX(${xOffset}px)` }}>
                      {idx < phaseNodes.length - 1 && (
                        <div className="absolute top-[72px] left-1/2 -translate-x-1/2 w-0.5 h-12 bg-gradient-to-b from-purple-500/40 to-transparent" />
                      )}

                      <motion.button
                        whileHover={{ scale: unlocked ? 1.08 : 1 }}
                        whileTap={{ scale: unlocked ? 0.95 : 1 }}
                        onClick={() => openNode(node)}
                        disabled={!unlocked}
                        className={`relative w-[72px] h-[72px] rounded-full border-4 flex items-center justify-center shadow-xl transition-all ${
                          done
                            ? "bg-gradient-to-tr from-amber-400 to-yellow-300 border-amber-200 shadow-amber-400/40"
                            : unlocked
                            ? node.type === "boss"
                              ? "bg-gradient-to-tr from-rose-600 to-orange-500 border-orange-300 shadow-rose-500/40 animate-pulse"
                              : node.type === "chest"
                              ? "bg-gradient-to-tr from-amber-500 to-yellow-400 border-yellow-200 shadow-amber-400/40"
                              : "bg-gradient-to-tr from-purple-600 to-cyan-500 border-cyan-300 shadow-purple-500/40 animate-pulse"
                            : "bg-slate-900 border-slate-700 cursor-not-allowed"
                        }`}
                      >
                        {nodeIcon(node, done, unlocked)}
                        <span className="absolute -top-1 -left-1 w-5 h-5 rounded-full bg-slate-900 border border-slate-700 text-[9px] font-bold text-slate-400 flex items-center justify-center">
                          {node.step}
                        </span>
                      </motion.button>

                      <div className="mt-2 text-center max-w-[200px]">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
                          {node.subTopic}
                        </span>
                        <p className="text-xs font-bold text-white mt-1 line-clamp-2">{node.title}</p>
                        <div className="flex items-center justify-center gap-2 mt-0.5">
                          <span className="text-[10px] text-amber-400 font-mono">+{node.xpReward} XP</span>
                          <span className="text-[10px] text-cyan-400 font-mono">+{node.diamondReward} 💎</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── EXPANDED DETAILED STUDY MODAL ── */}
      <AnimatePresence>
        {activeNode && activeNode.type !== "chest" && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-3xl bg-slate-900 border border-purple-500/30 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-slate-800 flex justify-between items-start bg-slate-950/60">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-purple-400">
                      Step {activeNode.step} • {activeNode.category}
                    </span>
                    <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-full border border-cyan-500/20">
                      {activeNode.subTopic}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mt-1">{activeNode.title}</h3>
                </div>
                <button
                  onClick={() => setActiveNode(null)}
                  className="p-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Sub-Navigation Tabs inside Lesson Modal */}
              {step === "theory" && (
                <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 gap-2 pt-2 overflow-x-auto custom-scrollbar">
                  <button
                    onClick={() => setModalTab("textbook")}
                    className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                      modalTab === "textbook"
                        ? "border-purple-500 text-purple-400"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <BookOpen size={15} /> 📖 Textbook Chapter
                  </button>
                  <button
                    onClick={() => setModalTab("formulas")}
                    className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                      modalTab === "formulas"
                        ? "border-cyan-500 text-cyan-400"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Code2 size={15} /> ⚡ Formulas & Debugging
                  </button>
                  <button
                    onClick={() => setModalTab("videos")}
                    className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                      modalTab === "videos"
                        ? "border-emerald-500 text-emerald-400"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Video size={15} /> 📺 11 Indian Languages Videos
                  </button>
                  <button
                    onClick={() => setModalTab("placement")}
                    className={`pb-3 px-4 text-xs font-bold transition-all border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
                      modalTab === "placement"
                        ? "border-amber-500 text-amber-400"
                        : "border-transparent text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <Lightbulb size={15} /> 💡 MNC Interview Secrets
                  </button>
                </div>
              )}

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {step === "theory" && (
                  <>
                    {/* TAB 1: TEXTBOOK CHAPTER */}
                    {modalTab === "textbook" && (
                      <div className="space-y-6">
                        {activeNode.theory && (
                          <>
                            <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/20 text-slate-200 text-sm leading-relaxed">
                              <strong>Summary:</strong> {activeNode.theory.summary}
                            </div>

                            {activeNode.theory.detailedContent && (
                              <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed whitespace-pre-line font-sans space-y-4">
                                {activeNode.theory.detailedContent}
                              </div>
                            )}

                            {/* Author References */}
                            {activeNode.theory.authorReferences?.length && (
                              <div className="space-y-3 pt-2">
                                <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-400">Author Textbook References</h4>
                                {activeNode.theory.authorReferences.map((ref, i) => (
                                  <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
                                    <div className="text-xs font-bold text-white">{ref.bookTitle}</div>
                                    <div className="text-[11px] text-purple-400 font-medium">— {ref.author}</div>
                                    <div className="text-xs text-slate-300 italic pt-1">"{ref.coreInsight}"</div>
                                  </div>
                                ))}
                              </div>
                            )}

                            {/* Key Takeaways */}
                            <div className="space-y-3 pt-2">
                              <h4 className="text-xs font-extrabold uppercase tracking-wider text-purple-400">Core Takeaways</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {activeNode.theory.keyPoints.map((kp, i) => (
                                  <div key={i} className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2 text-xs text-slate-300">
                                    <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                                    <span>{kp}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    )}

                    {/* TAB 2: FORMULAS & DEBUGGING */}
                    {modalTab === "formulas" && (
                      <div className="space-y-6">
                        {activeNode.theory?.formula && (
                          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-sm">
                            <span className="font-bold text-amber-400 block mb-1">⚡ Core Mathematical Formula:</span>
                            {activeNode.theory.formula}
                          </div>
                        )}

                        {activeNode.debugChallenge && (
                          <div className="p-5 rounded-2xl bg-rose-950/40 border border-rose-500/30 space-y-3">
                            <h4 className="text-xs font-extrabold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                              <Bug size={16} /> Bug Debugging Challenge: {activeNode.debugChallenge.title}
                            </h4>
                            <div className="space-y-2">
                              <span className="text-[10px] font-bold uppercase text-rose-300">Buggy Implementation:</span>
                              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-rose-400 overflow-x-auto">
                                <code>{activeNode.debugChallenge.buggy}</code>
                              </pre>
                            </div>
                            <div className="space-y-2">
                              <span className="text-[10px] font-bold uppercase text-emerald-300">Fixed Production Code:</span>
                              <pre className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-emerald-300 overflow-x-auto">
                                <code>{activeNode.debugChallenge.fixed}</code>
                              </pre>
                            </div>
                            <p className="text-xs text-amber-300 italic">💡 Hint: {activeNode.debugChallenge.hint}</p>
                          </div>
                        )}

                        {activeNode.theory?.code && (
                          <div className="space-y-2">
                            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Implementation Code Blueprint</span>
                            <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto">
                              <code>{activeNode.theory.code}</code>
                            </pre>
                          </div>
                        )}

                        {activeNode.theory?.examples?.length && (
                          <div className="space-y-3">
                            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Worked Step-by-Step Examples</span>
                            {activeNode.theory.examples.map((ex, i) => (
                              <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 whitespace-pre-line leading-relaxed font-mono">
                                {ex}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* TAB 3: 11 INDIAN LANGUAGES YOUTUBE VIDEOS */}
                    {modalTab === "videos" && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200 text-xs leading-relaxed space-y-1">
                          <h4 className="font-extrabold text-emerald-400 text-sm flex items-center gap-1.5">
                            <Video size={18} /> Multi-Lingual Video Tutorials (11 Indian Languages)
                          </h4>
                          <p>Learn this topic in your mother tongue! Click any language button to launch top-rated YouTube tutorial searches instantly:</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                          {activeNode.videos?.map((v, i) => (
                            <a
                              key={i}
                              href={v.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/80 transition-all flex items-center justify-between group"
                            >
                              <div className="flex items-center gap-2.5">
                                <span className="text-xl">{v.flag}</span>
                                <div>
                                  <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors">{v.language}</div>
                                  <div className="text-[10px] text-slate-400 line-clamp-1">{v.title}</div>
                                </div>
                              </div>
                              <Play size={14} className="text-emerald-400 shrink-0 group-hover:scale-125 transition-transform" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB 4: PLACEMENT & MNC INTERVIEW SECRETS */}
                    {modalTab === "placement" && (
                      <div className="space-y-4">
                        <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs leading-relaxed space-y-2">
                          <h4 className="font-extrabold text-amber-400 text-sm flex items-center gap-1.5">
                            <Award size={18} /> TCS / Amazon / Google Placement Insights
                          </h4>
                          <p>These specialized interview secrets help candidates clear technical rounds on their first attempt:</p>
                        </div>

                        {activeNode.theory?.placementTips?.map((tip, i) => (
                          <div key={i} className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-start gap-3 text-xs text-slate-300">
                            <Lightbulb size={18} className="text-amber-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{tip}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}

                {/* QUIZ STEP */}
                {step === "quiz" && activeNode.questions && activeNode.questions[qIdx] && (
                  <div className="space-y-5">
                    <div className="flex justify-between items-center text-xs text-slate-400">
                      <span>Question {qIdx + 1} of {activeNode.questions.length}</span>
                      <span className="text-amber-400 font-mono">+{activeNode.xpReward} XP on completion</span>
                    </div>

                    <p className="text-lg font-bold text-white">{activeNode.questions[qIdx].prompt}</p>

                    <div className="space-y-2.5">
                      {activeNode.questions[qIdx].options.map((opt, i) => {
                        const correct = i === activeNode.questions![qIdx].correct;
                        const picked = selected === i;
                        let cls = "bg-slate-950 border-slate-800 text-slate-300 hover:border-purple-500/50";
                        if (submitted) {
                          if (correct) cls = "bg-emerald-950/60 border-emerald-500 text-emerald-200";
                          else if (picked) cls = "bg-rose-950/60 border-rose-500 text-rose-300";
                        } else if (picked) cls = "bg-purple-950/60 border-purple-400 text-white";

                        return (
                          <button
                            key={i}
                            onClick={() => !submitted && setSelected(i)}
                            className={`w-full p-4 rounded-2xl border text-left text-sm font-medium transition-all ${cls}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {submitted && (
                      <div className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                        selected === activeNode.questions[qIdx].correct
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-300"
                          : "bg-rose-500/10 border-rose-500/30 text-rose-300"
                      }`}>
                        <p className="font-bold mb-1">{selected === activeNode.questions[qIdx].correct ? "🎉 Correct!" : "❌ Incorrect"}</p>
                        <p>{activeNode.questions[qIdx].explanation}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-800 bg-slate-950/60 flex items-center justify-between">
                {step === "theory" ? (
                  activeNode.questions?.length ? (
                    <button
                      onClick={() => setStep("quiz")}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-cyan-500 to-emerald-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                    >
                      Start Practice Assessment <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button
                      onClick={() => completeNode(activeNode)}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 transition-opacity"
                    >
                      Mark Complete & Claim Rewards <Gift size={18} />
                    </button>
                  )
                ) : (
                  !submitted ? (
                    <button
                      disabled={selected === null}
                      onClick={() => setSubmitted(true)}
                      className="w-full py-4 rounded-2xl bg-purple-600 disabled:opacity-40 text-white font-bold text-sm hover:bg-purple-500 transition-colors"
                    >
                      Verify Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-95"
                    >
                      Continue <ArrowRight size={18} />
                    </button>
                  )
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── REWARD MODAL ── */}
      <GamificationModal
        isOpen={showReward}
        onClose={() => { setShowReward(false); setActiveNode(null); }}
        xpEarned={lastCompleted?.xpReward || 0}
        diamondsEarned={lastCompleted?.diamondReward || 0}
      />
    </div>
  );
}
