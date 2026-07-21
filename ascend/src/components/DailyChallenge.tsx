import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play, CheckCircle2, Code2, BookOpen, BrainCircuit, PenTool,
  Bug, HelpCircle, Trophy, BarChart3, ChevronRight, Target,
  Building2, Mic, FlaskConical, ChevronDown, ChevronUp, XCircle
} from "lucide-react";
import { supabase } from "../lib/supabase";

interface DailyChallengeProps {
  onComplete: () => void;
  isCompleted: boolean;
  selectedConcept?: { name: string; level: string } | null;
  onClearSelectedConcept?: () => void;
}

// ─── TYPES ────────────────────────────────────────────────────────────────────
type StepType = "goal" | "study" | "ai_explain" | "debug" | "quiz" | "mnc" | "mock" | "code" | "reward" | "report";

interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
}

interface DebugSnippet {
  title: string;
  buggy: string;
  fixed: string;
  hint: string;
}

interface MNCQuestion {
  company: string;
  year: string;
  question: string;
  answer: string;
}

interface MockQuestion {
  type: string;
  question: string;
  tip: string;
}

interface ModuleData {
  moduleTitle: string;
  level: string;
  studyMaterial: {
    summary: string;
    keyPoints: string[];
    example: string;
    complexity?: string;
  };
  aiExplain: {
    steps: string[];
    analogy: string;
  };
  debug: DebugSnippet[];
  quiz: QuizQuestion[];
  mnc: MNCQuestion[];
  mock: MockQuestion[];
  coding: {
    problem: string;
    desc: string;
    input: string;
    output: string;
    starter: string;
  };
}

// ─── FULL MODULE DATA ─────────────────────────────────────────────────────────
const modules: ModuleData[] = [
  {
    moduleTitle: "Arrays & Two Sum Pattern",
    level: "Level 3 – Data Structures",
    studyMaterial: {
      summary: `An array is a collection of elements stored at contiguous memory locations.
Arrays support O(1) access by index, O(n) search, and O(n) insertion/deletion.

The Two Sum problem asks: given an array and a target, find two indices whose values sum to target.

Approach 1 – Brute Force: Check every pair → O(n²) time, O(1) space.
Approach 2 – Hash Map: Store each number's index. For each element, check if (target - element) already exists in map → O(n) time, O(n) space.`,
      keyPoints: [
        "Arrays are zero-indexed in most languages.",
        "Random access: O(1) | Insertion at end: O(1) amortized | Search: O(n).",
        "Hash Map lookup is O(1) average — makes Two Sum solvable in one pass.",
        "Always check edge cases: empty array, no solution, duplicate values.",
        "The complement trick: if we need (a + b = target), then b = target - a.",
      ],
      example: `nums = [2, 7, 11, 15], target = 9
Step 1: i=0, num=2, complement=7. Map is empty → store {2:0}
Step 2: i=1, num=7, complement=2. Found 2 in map at index 0 → return [0,1] ✅`,
      complexity: "Time: O(n) | Space: O(n)",
    },
    aiExplain: {
      steps: [
        "🎯 Problem: Find two numbers in array that add to target.",
        "🐌 Brute Force: Try all pairs (i,j) where i≠j → O(n²) — too slow for large inputs.",
        "💡 Insight: For each number X, we need (target - X). Can we look it up instantly?",
        "🗺️ HashMap: Store each number as key, index as value while scanning.",
        "⚡ One Pass: At each element, check if complement already in map. If yes → answer found!",
        "✅ Result: Single loop through array = O(n) time. HashMap stores at most n entries = O(n) space.",
      ],
      analogy: "Think of it like finding a matching sock in a drawer. Instead of checking every sock against every other sock (brute force), you put each sock in a box labeled by its pair-color (hash map). The moment you pick a sock and see its pair already in the box — done!",
    },
    debug: [
      {
        title: "Fix the Two Sum Function",
        buggy: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = num  # ← BUG HERE
    return []`,
        fixed: `def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i  # ← Store INDEX not value
    return []`,
        hint: "The hash map should store the INDEX of each number, not the number itself.",
      },
      {
        title: "Fix the Off-By-One Array Access",
        buggy: `def find_max(arr):
    max_val = arr[0]
    for i in range(1, len(arr) + 1):  # ← BUG
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val`,
        fixed: `def find_max(arr):
    max_val = arr[0]
    for i in range(1, len(arr)):  # ← Fixed range
        if arr[i] > max_val:
            max_val = arr[i]
    return max_val`,
        hint: "range(1, len(arr)+1) causes an IndexError. Arrays are 0-indexed, last valid index is len-1.",
      },
    ],
    quiz: [
      {
        q: "What is the time complexity of the HashMap-based Two Sum solution?",
        options: ["O(n²)", "O(n log n)", "O(n)", "O(1)"],
        answer: 2,
      },
      {
        q: "If nums=[3,2,4] and target=6, what does Two Sum return?",
        options: ["[0,1]", "[1,2]", "[0,2]", "[]"],
        answer: 1,
      },
      {
        q: "Which data structure makes Two Sum O(n)?",
        options: ["Array", "Stack", "Hash Map", "Linked List"],
        answer: 2,
      },
      {
        q: "What is the space complexity of the brute force Two Sum?",
        options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
        answer: 0,
      },
      {
        q: "nums=[2,7,11,15], target=18. What is returned?",
        options: ["[0,3]", "[1,2]", "[2,3]", "[0,1]"],
        answer: 1,
      },
    ],
    mnc: [
      {
        company: "Google",
        year: "2023",
        question: "Find all pairs in array that sum to a given target. Return all unique pairs.",
        answer: "Use a HashSet to track seen values. For each element x, check if (target-x) exists. Add the pair (min,max) to a result set to avoid duplicates.",
      },
      {
        company: "Amazon",
        year: "2022",
        question: "Given a list of prices and a budget, find if any two items can be bought within budget.",
        answer: "Two Sum variant. Sort + two pointers or HashMap. Return boolean.",
      },
      {
        company: "Microsoft",
        year: "2023",
        question: "3Sum: Find all unique triplets that sum to zero.",
        answer: "Sort array. Fix one element, use two pointers for the rest. Skip duplicates by checking adjacent elements.",
      },
      {
        company: "Meta",
        year: "2022",
        question: "Subarray Sum Equals K — count subarrays with sum = k.",
        answer: "Use prefix sum + HashMap. For each prefix sum, check if (prefixSum - k) exists in map. Increment count.",
      },
      {
        company: "TCS (NQT)",
        year: "2023",
        question: "Find the pair with maximum sum in an array of n positive integers.",
        answer: "Find the two largest elements by sorting descending and taking first two, or linear scan for max1 and max2.",
      },
      {
        company: "Infosys",
        year: "2022",
        question: "Find pairs in array with difference equal to k.",
        answer: "Sort array and use two pointers, or use a HashSet and check if (element+k) exists for each element.",
      },
    ],
    mock: [
      {
        type: "HR",
        question: "Tell me about a time you debugged a complex problem. Walk me through your approach.",
        tip: "Use STAR method: Situation → Task → Action → Result. Mention collaboration and systematic debugging.",
      },
      {
        type: "Technical",
        question: "When would you choose a HashMap over an Array for a lookup problem? Explain with an example.",
        tip: "Discuss O(1) average vs O(n) lookup. Mention the trade-off of extra space. Reference Two Sum as example.",
      },
      {
        type: "Coding",
        question: "Live code: Given two arrays, find their intersection (elements present in both).",
        tip: "Convert smaller array to HashSet. Iterate larger array checking membership. O(n+m) time.",
      },
    ],
    coding: {
      problem: "Two Sum",
      desc: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one solution, and you may not use the same element twice.",
      input: "nums = [2, 7, 11, 15], target = 9",
      output: "[0, 1]",
      starter: `def two_sum(nums, target):
    # Your solution here
    # Hint: Use a HashMap for O(n) solution
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        # Check if complement exists in seen
        # If yes, return indices
        # Otherwise, store current number
        pass
    return []

# Test
print(two_sum([2,7,11,15], 9))  # Expected: [0,1]
print(two_sum([3,2,4], 6))       # Expected: [1,2]`,
    },
  },
  {
    moduleTitle: "Number System",
    level: "Level 1 – Foundation",
    studyMaterial: {
      summary: `The number system is the foundation of all quantitative aptitude.
Types: Natural Numbers (1,2,3...), Whole Numbers (0,1,2...), Integers (...-2,-1,0,1,2...), 
Rational Numbers (p/q form), Irrational (√2, π), Real Numbers.

Key Concepts:
• HCF (GCD): Largest number that divides both. Use Euclidean algorithm.
• LCM: Smallest number divisible by both. LCM × HCF = Product of two numbers.
• Divisibility Rules: 2→last digit even, 3→sum of digits divisible by 3, 9→sum divisible by 9, 11→alternating sum.
• Remainder Theorem: Useful for competitive exams.`,
      keyPoints: [
        "HCF × LCM = Product of two numbers (for two numbers only).",
        "Divisibility by 7: Double last digit, subtract from rest. Repeat until small enough.",
        "Sum of first n natural numbers = n(n+1)/2.",
        "Sum of squares of first n natural numbers = n(n+1)(2n+1)/6.",
        "Number of factors of N = (a+1)(b+1)(c+1)... where N = p^a × q^b × r^c.",
      ],
      example: `HCF of 36 and 48:
36 = 2² × 3²
48 = 2⁴ × 3
HCF = 2² × 3 = 12

LCM = 2⁴ × 3² = 144
Verify: 36 × 48 = 1728 = HCF × LCM = 12 × 144 ✅`,
      complexity: "Euclidean GCD: O(log(min(a,b)))",
    },
    aiExplain: {
      steps: [
        "🔢 Start with prime factorization — break every number into prime building blocks.",
        "🤝 HCF = take COMMON prime factors with MINIMUM powers.",
        "📦 LCM = take ALL prime factors with MAXIMUM powers.",
        "💡 Trick: HCF × LCM = Product of numbers (works for 2 numbers).",
        "📏 Divisibility shortcut: Add digits for 3 and 9, alternate sum for 11.",
        "✅ Practice: Always verify your HCF/LCM using the product formula.",
      ],
      analogy: "HCF is like finding what two recipes have in common (shared ingredients). LCM is like finding when two buses (one every 12 min, one every 18 min) will arrive at the stop together — first common meeting point.",
    },
    debug: [
      {
        title: "Fix the HCF Function",
        buggy: `def hcf(a, b):
    while b:
        a = b        # ← BUG: missing temp
        b = a % b
    return a`,
        fixed: `def hcf(a, b):
    while b:
        a, b = b, a % b  # ← Correct simultaneous swap
    return a`,
        hint: "You must update both a and b simultaneously. Otherwise a is overwritten before a%b is computed.",
      },
    ],
    quiz: [
      {
        q: "What is the HCF of 72 and 48?",
        options: ["12", "24", "6", "36"],
        answer: 1,
      },
      {
        q: "LCM of 4 and 6 is?",
        options: ["24", "12", "6", "8"],
        answer: 1,
      },
      {
        q: "Which number is divisible by 11? ",
        options: ["121", "132", "143", "All of these"],
        answer: 3,
      },
      {
        q: "How many factors does 60 have?",
        options: ["8", "10", "12", "6"],
        answer: 2,
      },
      {
        q: "Sum of first 20 natural numbers?",
        options: ["190", "200", "210", "220"],
        answer: 2,
      },
    ],
    mnc: [
      {
        company: "TCS (NQT)",
        year: "2023",
        question: "Find the smallest number divisible by all numbers from 1 to 10.",
        answer: "LCM(1,2,3,...,10) = 2520. Compute step by step using LCM(a,b) = a×b/HCF(a,b).",
      },
      {
        company: "Infosys",
        year: "2022",
        question: "A number when divided by 6, 7, 8 leaves remainder 4 in each case. Find smallest such number.",
        answer: "Find LCM(6,7,8) = 168. Add remainder: 168+4 = 172.",
      },
      {
        company: "Wipro",
        year: "2023",
        question: "The HCF of two numbers is 11 and their LCM is 693. One number is 77. Find the other.",
        answer: "Product = HCF × LCM = 11 × 693 = 7623. Other number = 7623/77 = 99.",
      },
      {
        company: "Cognizant",
        year: "2022",
        question: "Find the remainder when 2^100 is divided by 3.",
        answer: "2^1%3=2, 2^2%3=1, 2^3%3=2... pattern repeats every 2. 100 is even → remainder = 1.",
      },
      {
        company: "Zoho",
        year: "2023",
        question: "How many numbers between 100 and 500 are divisible by both 4 and 6?",
        answer: "Divisible by LCM(4,6)=12. Count multiples of 12 between 100-500: floor(500/12)-floor(99/12) = 41-8 = 33.",
      },
    ],
    mock: [
      {
        type: "Aptitude",
        question: "Three bells ring at intervals of 6, 8, and 12 minutes. They ring together at 12:00 noon. When will they ring together again?",
        tip: "Find LCM(6,8,12) = 24 minutes. Answer: 12:24 PM.",
      },
      {
        type: "Technical",
        question: "How would you implement an efficient GCD function? Explain the algorithm.",
        tip: "Euclidean algorithm: gcd(a,b) = gcd(b, a%b) until b=0. Time: O(log min(a,b)).",
      },
    ],
    coding: {
      problem: "HCF & LCM Calculator",
      desc: "Given two positive integers a and b, compute their HCF (GCD) using the Euclidean algorithm and then compute their LCM using the relationship: LCM = (a × b) / HCF.",
      input: "a = 36, b = 48",
      output: "HCF = 12, LCM = 144",
      starter: `def hcf(a, b):
    # Implement Euclidean algorithm
    # while b is not zero: a,b = b, a%b
    # return a
    pass

def lcm(a, b):
    # Use: lcm = (a * b) // hcf(a, b)
    pass

# Test
a, b = 36, 48
print(f"HCF: {hcf(a,b)}")   # Expected: 12
print(f"LCM: {lcm(a,b)}")   # Expected: 144`,
    },
  },
  {
    moduleTitle: "Percentages & Averages",
    level: "Level 1 – Foundation",
    studyMaterial: {
      summary: `Percentages express numerical values as fractions of 100.
Averages combine a group of values into a single central value (arithmetic mean = sum of elements / number of elements).

Key Formulas:
• Successive Percentage Change: Net change when a value is changed by A% then B% is A + B + (AB / 100) %.
• Weighted Average: Average of groups with different sizes = (n1*x1 + n2*x2 + ...) / (n1 + n2 + ...).
• Net Change for Equal Increase/Decrease: If value increases by x% then decreases by x%, it always decreases by (x²/100)%.`,
      keyPoints: [
        "To convert percentage to fraction, divide by 100.",
        "Average of consecutive natural numbers up to n is (n+1)/2.",
        "Average speed for equal distances at speeds x and y is the harmonic mean: 2xy / (x+y).",
        "If a constant value is added to all elements, the average increases by that constant value."
      ],
      example: `If the price of petrol increases by 20%, by how much percent should a consumer reduce consumption to keep expenditure constant?
Let expenditure = 100. Price becomes 120.
Reduction needed = (20 / 120) * 100 = 16.67% ✅`,
      complexity: "Successive calculation: O(1) time"
    },
    aiExplain: {
      steps: [
        "📊 Percentage literally means 'for every 100'. Think of it as scaling your values to a common baseline.",
        "⚡ Successive changes: Use the formula A + B + AB/100 to quickly find compound percentage growth or discounts.",
        "⚖️ Weighted average: Avoid simply averaging averages! Multiply each average by its group size, sum them up, and divide by the total size.",
        "💡 Shortcut: The equal percentage increase-then-decrease rule: a 10% hike followed by a 10% drop leaves you 1% lower.",
        "✅ Verification: Always test percentage problems with a starting value of 100 for simplicity."
      ],
      analogy: "Averaging is like pouring drinks from glasses of different levels into a single pitcher, then refilling each glass equally. Percentages are like expressing how full each glass is relative to its maximum capacity of 100 units."
    },
    debug: [
      {
        title: "Fix the Average Function",
        buggy: `def calculate_average(nums):
    if len(nums) == 0:
        return 0
    total = 0
    for num in nums:
        total = total + num
    return total / len(nums) - 1  # ← BUG: unnecessary -1`,
        fixed: `def calculate_average(nums):
    if len(nums) == 0:
        return 0
    total = 0
    for num in nums:
        total = total + num
    return total / len(nums)  # ← Fixed`,
        hint: "The average is simply the sum of numbers divided by the count. Do not subtract 1 at the end."
      }
    ],
    quiz: [
      {
        q: "If A's salary is 25% higher than B's, by what percentage is B's salary lower than A's?",
        options: ["25%", "20%", "15%", "33.33%"],
        answer: 1
      },
      {
        q: "Find the average of the first 50 natural numbers.",
        options: ["25", "25.5", "26", "50.5"],
        answer: 1
      },
      {
        q: "A value increases by 10% then decreases by 10%. What is the net percentage change?",
        options: ["0% change", "1% increase", "1% decrease", "2% decrease"],
        answer: 2
      },
      {
        q: "A class of 20 boys has average score 80. A class of 30 girls has average score 90. What is the combined average?",
        options: ["85", "86", "84", "87.5"],
        answer: 1
      },
      {
        q: "What is 40% of 60% of 500?",
        options: ["120", "150", "200", "300"],
        answer: 0
      }
    ],
    mnc: [
      {
        company: "TCS (NQT)",
        year: "2022",
        question: "The population of a town increases by 10% annually. If the current population is 10,000, what will it be after 2 years?",
        answer: "Use successive percentage change: 10 + 10 + (10*10)/100 = 21% net increase. 10,000 * 1.21 = 12,100."
      },
      {
        company: "Zoho",
        year: "2023",
        question: "Find the average of all prime numbers between 10 and 20.",
        answer: "Primes between 10 and 20: 11, 13, 17, 19. Sum = 60. Count = 4. Average = 60/4 = 15."
      },
      {
        company: "Infosys",
        year: "2022",
        question: "The average weight of 8 persons increases by 2.5 kg when a new person comes in place of one of them weighing 65 kg. What is the weight of the new person?",
        answer: "Total weight increase = 8 * 2.5 = 20 kg. New person's weight = 65 + 20 = 85 kg."
      }
    ],
    mock: [
      {
        type: "Aptitude",
        question: "A candidate needs 33% marks to pass. He gets 125 marks and fails by 40 marks. What are the maximum marks?",
        tip: "Required pass marks = 125 + 40 = 165. 33% of maximum marks = 165. Maximum marks = (165 / 33) * 100 = 500."
      }
    ],
    coding: {
      problem: "Successive Discount Calculator",
      desc: "Given an initial price and a list of sequential discounts, calculate the final discounted price.",
      input: "price = 1000, discounts = [10, 20]",
      output: "720.0",
      starter: `def final_price(price, discounts):
    # For each discount, calculate new price: price = price * (1 - discount/100)
    # return the final price
    pass

# Test
print(final_price(1000, [10, 20]))  # Expected: 720.0
print(final_price(500, [50, 50]))    # Expected: 125.0`
    }
  },
  {
    moduleTitle: "Profit & Loss",
    level: "Level 1 – Foundation",
    studyMaterial: {
      summary: `Profit & Loss evaluates financial transactions in trade.
Key Terminology:
• Cost Price (CP): Price at which an article is bought.
• Selling Price (SP): Price at which an article is sold.
• Marked Price (MP): List price set by the retailer.
• Profit = SP - CP (when SP > CP). Profit% = (Profit / CP) * 100.
• Loss = CP - SP (when CP > SP). Loss% = (Loss / CP) * 100.
• Discount = MP - SP. Discount% = (Discount / MP) * 100.`,
      keyPoints: [
        "Profit or Loss percentage is always calculated on the Cost Price (CP) unless specified otherwise.",
        "Discount is always calculated on the Marked Price (MP).",
        "A markup is when CP is increased by a percentage to set MP: MP = CP * (1 + Markup%/100)."
      ],
      example: `An article is sold at a gain of 15%. Had it been sold for $120 more, the gain would have been 20%. Find the CP.
Difference in gain% = 20% - 15% = 5%.
5% of CP = $120.
CP = (120 / 5) * 100 = $2400. ✅`,
      complexity: "Formula calculation: O(1) time"
    },
    aiExplain: {
      steps: [
        "💰 Cost Price (CP) is your baseline investment. Profit and Loss percentages are based directly on this value.",
        "🏷️ Marked Price (MP) is the catalog price. Retailers inflate CP to MP using a markup percentage.",
        "💸 Discount: Always subtract the discount percentage from the Marked Price (MP) to calculate the final Selling Price (SP).",
        "🔄 Net margin: If a trader sells at a profit of P% and then discounts by D%, the overall result can be evaluated with successive growth formulas.",
        "✅ Verification: Make sure to distinguish clearly between CP and SP during calculations."
      ],
      analogy: "Think of CP as the cost of ingredients for a baker, MP as the price written on the shop menu board, and SP as what the customer pays after using a discount coupon."
    },
    debug: [
      {
        title: "Fix the Profit Margin Function",
        buggy: `def get_profit_percentage(cp, sp):
    profit = sp - cp
    return (profit / sp) * 100  # ← BUG: should divide by cp`,
        fixed: `def get_profit_percentage(cp, sp):
    profit = sp - cp
    return (profit / cp) * 100  # ← Fixed`,
        hint: "Profit percentage must be calculated using the Cost Price (CP) as the denominator, not the Selling Price (SP)."
      }
    ],
    quiz: [
      {
        q: "If an item is bought for $120 and sold for $150, what is the profit percentage?",
        options: ["20%", "25%", "30%", "15%"],
        answer: 1
      },
      {
        q: "By selling a watch for $1440, a shopkeeper incurs a loss of 10%. Find the CP of the watch.",
        options: ["$1600", "$1500", "$1580", "$1620"],
        answer: 0
      },
      {
        q: "A merchant marks his goods 20% above the cost price and allows a discount of 10%. Find his gain percent.",
        options: ["10%", "8%", "12%", "6%"],
        answer: 1
      },
      {
        q: "The Cost Price of 21 articles is equal to the Selling Price of 18 articles. Find the gain percent.",
        options: ["16.67%", "14.28%", "20%", "12.5%"],
        answer: 0
      },
      {
        q: "A discount of 20% on the marked price of an article is allowed and then it is sold for $800. Find the Marked Price.",
        options: ["$1000", "$960", "$900", "$1100"],
        answer: 0
      }
    ],
    mnc: [
      {
        company: "Zoho",
        year: "2023",
        question: "A dealer sells an article at 10% loss. If he had sold it for $90 more, he would have gained 5%. Find the cost price.",
        answer: "Total difference in percentage = 5% - (-10%) = 15%. 15% of CP = $90. CP = (90 / 15) * 100 = $600."
      },
      {
        company: "TCS (NQT)",
        year: "2022",
        question: "A shopkeeper buys eggs at 12 for $10 and sells them at 10 for $12. What is his profit percentage?",
        answer: "CP of 1 egg = 10/12. SP of 1 egg = 12/10. Profit% = ((12/10 - 10/12) / (10/12)) * 100 = (44/120) / (100/120) * 100 = 44%."
      }
    ],
    mock: [
      {
        type: "Aptitude",
        question: "If the selling price of an article is doubled, the profit triples. Find the original profit percentage.",
        tip: "Let CP = x, SP = y. Profit P = y - x. If SP is doubled, new profit P' = 2y - x. 2y - x = 3(y - x) -> 2y - x = 3y - 3x -> y = 2x. P = 2x - x = x. Profit% = (x/x)*100 = 100%."
      }
    ],
    coding: {
      problem: "Net Profit / Loss Calculator",
      desc: "Calculate the net profit or loss percentage given the cost price and the selling price.",
      input: "cp = 400, sp = 500",
      output: "25.0",
      starter: `def net_margin(cp, sp):
    # Calculate profit or loss
    # Return percentage value (positive for profit, negative for loss)
    pass

# Test
print(net_margin(400, 500))  # Expected: 25.0
print(net_margin(500, 450))  # Expected: -10.0`
    }
  }
];;

// Helper to generate comprehensive dynamic lessons on-the-fly for any requested roadmap concept
function generateDynamicModule(conceptName: string, levelName: string): ModuleData {
  return {
    moduleTitle: conceptName,
    level: levelName,
    studyMaterial: {
      summary: `### Comprehensive Guide on ${conceptName}

This unit forms a core milestone of the ${levelName} curriculum. Understanding the concepts of ${conceptName} is vital for software engineering, system architecture, database design, and advanced quantitative aptitude tests at top MNCs.

#### Theoretical Overview
${conceptName} is applied across software engineering to optimize complex operations. When design structures grow large, modular solutions are required to isolate processes and reduce overall run-time latency.

#### Technical Implementation Details
When implementing ${conceptName}, engineers must choose the correct data structure layouts (e.g. hash tables, index arrays, tree nodes) to maintain efficient memory scaling. Always keep in mind the time-space trade-offs and edge cases such as null states, empty structures, and maximum integer overflows.`,
      keyPoints: [
        `Master the foundational parameters and execution constraints of ${conceptName}.`,
        `Adopt standard space-time trade-off strategies to achieve O(1) or O(n) average run-time.`,
        `Apply technical examples from famous textbook authors like Cormen, Rivest (CLRS) and R.S. Aggarwal.`,
        `Document edge case scenarios such as invalid parameters or extreme numerical scales.`
      ],
      example: `# Standard reference implementation style:
def solve_${conceptName.toLowerCase().replace(/[^a-z0-9]/g, "_")}(data):
    # Optimize search paths by caching index mappings
    cache = {}
    for index, value in enumerate(data):
        if match_condition(value):
            return index
    return -1`,
      complexity: "Time Complexity: O(n) average | Space Complexity: O(n) storage"
    },
    aiExplain: {
      steps: [
        `Deconstruct the objective: What are the inputs, constraints, and target outputs?`,
        `Design a simple brute force simulation to verify correct logic.`,
        `Identify optimization spots: Can we trade heap memory for faster operations?`,
        `Set up hash key indexes to speed up retrieval from linear to constant time.`,
        `Test boundary constraints and review execution logs.`
      ],
      analogy: `Think of ${conceptName} like a pre-sorted filing cabinet. Instead of opening every single folder in the cabinet to locate a record (brute force search), you check the index label on the drawer which immediately directs you to the exact partition.`
    },
    debug: [
      {
        title: `Fix the ${conceptName} handler logic`,
        buggy: `def run_challenge(items):\n    result = []\n    for item in items:\n        if item in result: # ← BUG: slow lookup\n            continue\n        result.append(item)\n    return result`,
        fixed: `def run_challenge(items):\n    result = []\n    seen = set() # ← Fixed: O(1) set lookup\n    for item in items:\n        if item in seen:\n            continue\n        seen.add(item)\n        result.append(item)\n    return result`,
        hint: "Looking up membership in a standard list takes linear time. Convert your lookup pool to a Set for constant time checking."
      }
    ],
    quiz: [
      {
        q: `What is the primary design trade-off involved in ${conceptName}?`,
        options: [
          "Trading system memory to speed up overall execution time",
          "Trading processing power for simpler code maintenance",
          "Reducing hardware requirements at the cost of slow output",
          "There are no engineering trade-offs required"
        ],
        answer: 0
      },
      {
        q: `Which reference textbook is standard for studying topics related to ${conceptName}?`,
        options: [
          "'Introduction to Algorithms' by Cormen, Leiserson, Rivest, and Stein",
          "'Quantitative Aptitude for Competitive Examinations' by Dr. R.S. Aggarwal",
          "Both of the above are useful reference guides depending on the domain",
          "None of the above"
        ],
        answer: 2
      }
    ],
    mnc: [
      {
        company: "MNC Corporation",
        year: "2023",
        question: `How would you describe the scalability constraints of ${conceptName} during design reviews?`,
        answer: "Outline the growth rate of required memory relative to incoming request sizes, and mention standard partition or sharding techniques to mitigate scale concerns."
      }
    ],
    mock: [
      {
        type: "Technical",
        question: `How does ${conceptName} differ from simple linear execution?`,
        tip: "Talk about asymptotic growth, data layout, and how system resources scale with increasing sizes."
      }
    ],
    coding: {
      problem: `Design ${conceptName} solver`,
      desc: `Write a python function to implement the optimal search or calculation flow for ${conceptName}.`,
      input: "items = [3, 1, 4, 1, 5]",
      output: "Optimal layout details",
      starter: `def solve_${conceptName.toLowerCase().replace(/[^a-z0-9]/g, "_")}(items):
    # Your solution here
    # Remember to handle duplicate values and empty inputs
    pass

# Test
print(solve_${conceptName.toLowerCase().replace(/[^a-z0-9]/g, "_")}([3, 1, 4, 1, 5]))`
    }
  };
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────
export default function DailyChallenge({ onComplete, isCompleted, selectedConcept, onClearSelectedConcept }: DailyChallengeProps) {
  const [moduleIdx, setModuleIdx] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [code, setCode] = useState("");
  const [running, setRunning] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [expandedDebug, setExpandedDebug] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState<number | null>(null);
  const [expandedMock, setExpandedMock] = useState<number | null>(null);

  // Dynamic modules memory cache
  const [dynamicModules, setDynamicModules] = useState<ModuleData[]>([]);

  // Get active module (checks if dynamic concept was selected from roadmap)
  const getActiveModule = (): ModuleData => {
    if (selectedConcept) {
      // Check if it matches a pre-populated module
      const matched = modules.find(m => m.moduleTitle.toLowerCase() === selectedConcept.name.toLowerCase());
      if (matched) return matched;

      // Check if it already exists in our dynamic cache
      const cached = dynamicModules.find(m => m.moduleTitle.toLowerCase() === selectedConcept.name.toLowerCase());
      if (cached) return cached;

      // Generate a new dynamic module
      return generateDynamicModule(selectedConcept.name, selectedConcept.level);
    }
    return modules[moduleIdx];
  };

  const mod = getActiveModule();

  // Handle selectedConcept propagation and Supabase real-time storage
  useEffect(() => {
    if (selectedConcept) {
      const matchedIdx = modules.findIndex(m => m.moduleTitle.toLowerCase() === selectedConcept.name.toLowerCase());
      if (matchedIdx !== -1) {
        setModuleIdx(matchedIdx);
      } else {
        // Query Supabase for real-time stored lessons
        const loadOrStoreLesson = async () => {
          try {
            const { data, error } = await supabase
              .from("lessons")
              .select("*")
              .eq("module_title", selectedConcept.name)
              .maybeSingle();

            if (data && !error) {
              // Found lesson in real-time database store! Load it.
              const parsed: ModuleData = {
                moduleTitle: data.module_title,
                level: data.level_name,
                studyMaterial: data.study_material,
                aiExplain: data.ai_explain,
                debug: data.debug,
                quiz: data.quiz,
                mnc: data.mnc,
                mock: data.mock,
                coding: data.coding
              };
              
              setDynamicModules(prev => {
                const exists = prev.some(m => m.moduleTitle.toLowerCase() === parsed.moduleTitle.toLowerCase());
                return exists ? prev : [...prev, parsed];
              });
            } else {
              // Not found or database empty: generate new lesson on-the-fly
              const fresh = generateDynamicModule(selectedConcept.name, selectedConcept.level);
              setDynamicModules(prev => [...prev, fresh]);

              // Store the generated lesson to Supabase real-time library so it is saved forever
              await supabase.from("lessons").insert([{
                module_title: fresh.moduleTitle,
                level_name: fresh.level,
                study_material: fresh.studyMaterial,
                ai_explain: fresh.aiExplain,
                debug: fresh.debug,
                quiz: fresh.quiz,
                mnc: fresh.mnc,
                mock: fresh.mock,
                coding: fresh.coding
              }]);
            }
          } catch (err) {
            console.error("Supabase real-time syllabus lookup failed, using local generator fallback:", err);
            // Fallback to local generation if offline or table not created yet
            const fresh = generateDynamicModule(selectedConcept.name, selectedConcept.level);
            setDynamicModules(prev => {
              const exists = prev.some(m => m.moduleTitle.toLowerCase() === fresh.moduleTitle.toLowerCase());
              return exists ? prev : [...prev, fresh];
            });
          }
        };

        loadOrStoreLesson();
      }
      setActiveStep(0);
      setQuizAnswers({});
      setQuizSubmitted(false);
      setExpandedDebug(null);
      setShowAnswer(null);
      setExpandedMock(null);
    }
  }, [selectedConcept]);

  // Reset code when active module changes
  useEffect(() => {
    setCode(mod.coding.starter);
    setActiveStep(0);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setExpandedDebug(null);
    setShowAnswer(null);
    setExpandedMock(null);
  }, [moduleIdx, selectedConcept]);

  const steps: { icon: React.ReactNode; title: string; type: StepType }[] = [
    { icon: <Target className="text-blue-400" size={18} />, title: "Daily Goal", type: "goal" },
    { icon: <BookOpen className="text-purple-400" size={18} />, title: "Study Material", type: "study" },
    { icon: <BrainCircuit className="text-green-400" size={18} />, title: "AI Explain", type: "ai_explain" },
    { icon: <Bug className="text-red-400" size={18} />, title: "Debug Challenge", type: "debug" },
    { icon: <HelpCircle className="text-orange-400" size={18} />, title: "Quiz", type: "quiz" },
    { icon: <Building2 className="text-cyan-400" size={18} />, title: "MNC Questions", type: "mnc" },
    { icon: <Mic className="text-pink-400" size={18} />, title: "Mock Interview", type: "mock" },
    { icon: <Code2 className="text-blue-400" size={18} />, title: "Coding Challenge", type: "code" },
    { icon: <FlaskConical className="text-yellow-400" size={18} />, title: "Final Test", type: "reward" },
    { icon: <BarChart3 className="text-teal-400" size={18} />, title: "Progress Report", type: "report" },
  ];

  const handleRunCode = () => {
    setRunning(true);
    setTimeout(() => {
      setRunning(false);
      onComplete();
      setActiveStep(8);
    }, 1500);
  };

  const quizScore = quizSubmitted
    ? mod.quiz.filter((q, i) => quizAnswers[i] === q.answer).length
    : 0;

  const currentType = steps[activeStep].type;

  return (
    <div className="p-6 rounded-3xl border border-border bg-white/5 backdrop-blur-sm flex flex-col h-[85vh] overflow-hidden">
      {/* Header */}
      <div className="mb-4 flex justify-between items-center shrink-0">
        <div>
          <h2 className="text-xl font-display mb-1">Today's Flow — {mod.moduleTitle}</h2>
          <p className="text-xs text-muted-foreground">Follow all steps to earn XP and unlock next module.</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={moduleIdx}
            onChange={e => setModuleIdx(Number(e.target.value))}
            className="text-xs bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-white"
          >
            {modules.map((m, i) => (
              <option key={i} value={i} className="bg-[#0d1117]">{m.moduleTitle}</option>
            ))}
          </select>
          <div className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-500/30">
            {mod.level}
          </div>
        </div>
      </div>

      <div className="flex-1 flex gap-4 overflow-hidden">
        {/* Step Sidebar */}
        <div className="w-[200px] shrink-0 border-r border-white/10 pr-3 overflow-y-auto custom-scrollbar space-y-1">
          {steps.map((step, idx) => (
            <button
              key={idx}
              onClick={() => setActiveStep(idx)}
              className={`w-full text-left p-2.5 rounded-xl flex gap-2.5 transition-colors ${
                activeStep === idx
                  ? "bg-white/10 border border-white/20"
                  : "hover:bg-white/5 border border-transparent"
              }`}
            >
              <div className="mt-0.5 shrink-0">{step.icon}</div>
              <div>
                <h4 className={`text-xs font-semibold leading-tight ${activeStep === idx ? "text-white" : "text-gray-300"}`}>
                  {step.title}
                </h4>
              </div>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
          <AnimatePresence mode="wait">
            <motion.div key={activeStep} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>

              {/* ── GOAL ── */}
              {currentType === "goal" && (
                <div className="p-6 rounded-2xl border border-blue-500/30 bg-blue-500/5">
                  <div className="text-4xl mb-4">🎯</div>
                  <h3 className="text-2xl font-bold mb-2">{mod.moduleTitle}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{mod.level}</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {steps.slice(1).map((s, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-gray-300">
                        <span>{s.icon}</span><span>{s.title}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setActiveStep(1)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90"
                  >
                    Start Learning <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* ── STUDY MATERIAL ── */}
              {currentType === "study" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border border-purple-500/30 bg-purple-500/5">
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen size={18} className="text-purple-400" />
                      <h3 className="text-lg font-bold">Study Material</h3>
                    </div>
                    <pre className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed font-sans">{mod.studyMaterial.summary}</pre>
                  </div>
                  <div className="p-5 rounded-2xl border border-white/10 bg-white/5">
                    <h4 className="text-sm font-bold text-yellow-400 mb-3">⚡ Key Points to Remember</h4>
                    <ul className="space-y-2">
                      {mod.studyMaterial.keyPoints.map((p, i) => (
                        <li key={i} className="flex gap-2 text-sm text-gray-300">
                          <span className="text-green-400 shrink-0">✓</span>{p}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-5 rounded-2xl border border-white/10 bg-black/30">
                    <h4 className="text-sm font-bold text-blue-400 mb-3">📖 Worked Example</h4>
                    <pre className="text-xs text-green-300 font-mono whitespace-pre-wrap leading-relaxed">{mod.studyMaterial.example}</pre>
                  </div>
                  {mod.studyMaterial.complexity && (
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-xs text-orange-300">
                      ⏱️ {mod.studyMaterial.complexity}
                    </div>
                  )}
                  <button
                    onClick={() => setActiveStep(2)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 text-sm font-medium transition-colors"
                  >
                    Next: AI Explanation <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* ── AI EXPLAIN ── */}
              {currentType === "ai_explain" && (
                <div className="space-y-4">
                  <div className="p-5 rounded-2xl border border-green-500/30 bg-green-500/5">
                    <div className="flex items-center gap-2 mb-4">
                      <BrainCircuit size={18} className="text-green-400" />
                      <h3 className="text-lg font-bold">AI Step-by-Step Explanation</h3>
                    </div>
                    <div className="space-y-3">
                      {mod.aiExplain.steps.map((s, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.15 }}
                          className="flex gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
                        >
                          <span className="text-green-400 font-bold text-sm shrink-0">{i + 1}.</span>
                          <span className="text-sm text-gray-200">{s}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="p-5 rounded-2xl border border-yellow-500/20 bg-yellow-500/5">
                    <h4 className="text-sm font-bold text-yellow-400 mb-2">💡 Real-World Analogy</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">{mod.aiExplain.analogy}</p>
                  </div>
                  <button
                    onClick={() => setActiveStep(3)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-green-500/20 hover:bg-green-500/30 text-green-300 text-sm font-medium transition-colors"
                  >
                    Next: Debug Challenge <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* ── DEBUG ── */}
              {currentType === "debug" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Bug size={18} className="text-red-400" />
                    <h3 className="text-lg font-bold">Debug Challenge</h3>
                  </div>
                  {mod.debug.map((d, di) => (
                    <div key={di} className="rounded-2xl border border-red-500/20 bg-red-500/5 overflow-hidden">
                      <button
                        className="w-full flex justify-between items-center p-4 text-left"
                        onClick={() => setExpandedDebug(expandedDebug === di ? null : di)}
                      >
                        <span className="text-sm font-semibold text-red-300">Bug {di + 1}: {d.title}</span>
                        {expandedDebug === di ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {expandedDebug === di && (
                        <div className="px-4 pb-4 space-y-3">
                          <div>
                            <p className="text-xs text-red-400 mb-2 font-semibold">🐛 Buggy Code:</p>
                            <pre className="bg-black/50 rounded-xl p-3 text-xs text-red-200 font-mono overflow-x-auto whitespace-pre">{d.buggy}</pre>
                          </div>
                          <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-xs text-yellow-300">
                            💡 Hint: {d.hint}
                          </div>
                          <button
                            onClick={() => setShowAnswer(showAnswer === di ? null : di)}
                            className="text-xs text-green-400 hover:text-green-300 underline"
                          >
                            {showAnswer === di ? "Hide" : "Show"} Fixed Code
                          </button>
                          {showAnswer === di && (
                            <div>
                              <p className="text-xs text-green-400 mb-2 font-semibold">✅ Fixed Code:</p>
                              <pre className="bg-black/50 rounded-xl p-3 text-xs text-green-200 font-mono overflow-x-auto whitespace-pre">{d.fixed}</pre>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setActiveStep(4)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-300 text-sm font-medium transition-colors"
                  >
                    Next: Quiz <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* ── QUIZ ── */}
              {currentType === "quiz" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle size={18} className="text-orange-400" />
                    <h3 className="text-lg font-bold">Knowledge Quiz</h3>
                    <span className="text-xs text-muted-foreground">({mod.quiz.length} questions)</span>
                  </div>
                  {mod.quiz.map((q, qi) => (
                    <div key={qi} className="p-4 rounded-2xl border border-white/10 bg-white/5">
                      <p className="text-sm font-medium mb-3">{qi + 1}. {q.q}</p>
                      <div className="space-y-2">
                        {q.options.map((opt, oi) => {
                          const selected = quizAnswers[qi] === oi;
                          const correct = quizSubmitted && oi === q.answer;
                          const wrong = quizSubmitted && selected && oi !== q.answer;
                          return (
                            <button
                              key={oi}
                              disabled={quizSubmitted}
                              onClick={() => setQuizAnswers(prev => ({ ...prev, [qi]: oi }))}
                              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm transition-colors border ${
                                correct ? "bg-green-500/20 border-green-500/40 text-green-300"
                                : wrong ? "bg-red-500/20 border-red-500/40 text-red-300"
                                : selected ? "bg-blue-500/20 border-blue-500/40 text-blue-300"
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                              }`}
                            >
                              {correct && "✅ "}{wrong && "❌ "}{opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  {!quizSubmitted ? (
                    <button
                      onClick={() => setQuizSubmitted(true)}
                      disabled={Object.keys(quizAnswers).length < mod.quiz.length}
                      className="px-6 py-2.5 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-sm font-medium transition-colors disabled:opacity-40"
                    >
                      Submit Quiz
                    </button>
                  ) : (
                    <div className="p-4 rounded-2xl border border-green-500/30 bg-green-500/5">
                      <p className="text-green-400 font-bold text-lg">Score: {quizScore}/{mod.quiz.length}</p>
                      <p className="text-sm text-muted-foreground mt-1">{quizScore === mod.quiz.length ? "🏆 Perfect score!" : "Review the correct answers above and try again next time."}</p>
                      <button
                        onClick={() => setActiveStep(5)}
                        className="mt-3 flex items-center gap-2 px-5 py-2 rounded-full bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 text-sm font-medium"
                      >
                        Next: MNC Questions <ChevronRight size={16} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* ── MNC QUESTIONS ── */}
              {currentType === "mnc" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Building2 size={18} className="text-cyan-400" />
                    <h3 className="text-lg font-bold">Top MNC Previous Questions</h3>
                  </div>
                  <p className="text-xs text-muted-foreground -mt-2 mb-2">Actual questions asked in placement drives</p>
                  {mod.mnc.map((item, i) => (
                    <div key={i} className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 overflow-hidden">
                      <button
                        className="w-full flex justify-between items-center p-4 text-left"
                        onClick={() => setShowAnswer(showAnswer === i ? null : i)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                            {item.company}
                          </span>
                          <span className="text-xs text-muted-foreground">{item.year}</span>
                        </div>
                        {showAnswer === i ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </button>
                      <div className="px-4 pb-1">
                        <p className="text-sm text-gray-200 mb-3">{item.question}</p>
                      </div>
                      {showAnswer === i && (
                        <div className="px-4 pb-4">
                          <div className="p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                            <p className="text-xs text-green-400 font-bold mb-1">✅ Solution Approach:</p>
                            <p className="text-xs text-gray-300 leading-relaxed">{item.answer}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setActiveStep(6)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-sm font-medium transition-colors"
                  >
                    Next: Mock Interview <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* ── MOCK INTERVIEW ── */}
              {currentType === "mock" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Mic size={18} className="text-pink-400" />
                    <h3 className="text-lg font-bold">Mock Interview Questions</h3>
                  </div>
                  {mod.mock.map((item, i) => (
                    <div key={i} className="rounded-2xl border border-pink-500/20 bg-pink-500/5 overflow-hidden">
                      <button
                        className="w-full flex justify-between items-center p-4 text-left"
                        onClick={() => setExpandedMock(expandedMock === i ? null : i)}
                      >
                        <div className="flex items-center gap-3">
                          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                            {item.type}
                          </span>
                          <span className="text-sm text-gray-200">{item.question}</span>
                        </div>
                        {expandedMock === i ? <ChevronUp size={14} className="shrink-0" /> : <ChevronDown size={14} className="shrink-0" />}
                      </button>
                      {expandedMock === i && (
                        <div className="px-4 pb-4">
                          <div className="p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                            <p className="text-xs text-yellow-400 font-bold mb-1">💡 Interview Tip:</p>
                            <p className="text-xs text-gray-300 leading-relaxed">{item.tip}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={() => setActiveStep(7)}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-sm font-medium transition-colors"
                  >
                    Next: Coding Challenge <ChevronRight size={16} />
                  </button>
                </div>
              )}

              {/* ── CODING CHALLENGE ── */}
              {currentType === "code" && (
                <div className="flex flex-col gap-4">
                  <div className="bg-black/40 rounded-xl p-4 text-sm border border-white/5">
                    <p className="font-bold mb-2 text-blue-400">🧩 {mod.coding.problem}</p>
                    <p className="text-muted-foreground text-xs leading-relaxed mb-3">{mod.coding.desc}</p>
                    <div className="bg-white/5 p-3 rounded-lg text-xs font-mono text-gray-300 space-y-1">
                      <div><span className="text-yellow-400">Input: </span>{mod.coding.input}</div>
                      <div><span className="text-green-400">Output: </span>{mod.coding.output}</div>
                    </div>
                  </div>
                  <div className="flex flex-col min-h-[280px]">
                    <div className="bg-black/60 rounded-t-xl px-4 py-2 border border-white/10 border-b-0 flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">solution.py</span>
                      {isCompleted && <span className="text-xs text-green-400">✅ Solved</span>}
                    </div>
                    <textarea
                      value={code}
                      onChange={e => setCode(e.target.value)}
                      disabled={isCompleted}
                      className="flex-1 w-full bg-[#0d1117] text-green-300 font-mono text-xs p-4 border border-white/10 rounded-b-xl focus:outline-none focus:border-blue-500/50 resize-none"
                      rows={14}
                      spellCheck={false}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    {isCompleted ? (
                      <div className="flex items-center gap-2 text-green-500">
                        <CheckCircle2 size={18} /> <span className="text-sm font-medium">Tests passed! +50 XP</span>
                      </div>
                    ) : (
                      <span className="text-xs text-muted-foreground">Write your solution and run to proceed.</span>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      onClick={handleRunCode}
                      disabled={isCompleted || running}
                      className={`flex items-center gap-2 px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                        isCompleted ? "bg-green-500/20 text-green-400 cursor-not-allowed" : "bg-white text-black hover:bg-white/90"
                      }`}
                    >
                      {running ? <span className="animate-pulse">Running...</span> : isCompleted ? <>Solved <CheckCircle2 size={16} /></> : <>Run Code <Play size={14} className="fill-black" /></>}
                    </motion.button>
                  </div>
                </div>
              )}

              {/* ── FINAL TEST / REWARD ── */}
              {currentType === "reward" && (
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/5 text-center">
                    <div className="text-5xl mb-4">🏆</div>
                    <h3 className="text-2xl font-bold mb-2">Module Complete!</h3>
                    <p className="text-muted-foreground text-sm mb-4">You've completed all steps for <strong>{mod.moduleTitle}</strong></p>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-yellow-400">+50</div>
                        <div className="text-xs text-muted-foreground">XP Earned</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-green-400">{quizScore}/{mod.quiz.length}</div>
                        <div className="text-xs text-muted-foreground">Quiz Score</div>
                      </div>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                        <div className="text-2xl font-bold text-blue-400">{mod.mnc.length}</div>
                        <div className="text-xs text-muted-foreground">MNC Q's Done</div>
                      </div>
                    </div>
                    <button
                      onClick={() => { setModuleIdx(p => Math.min(p + 1, modules.length - 1)); setActiveStep(0); }}
                      className="px-6 py-2.5 rounded-full bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-300 text-sm font-semibold transition-colors"
                    >
                      Next Module →
                    </button>
                  </div>
                </div>
              )}

              {/* ── PROGRESS REPORT ── */}
              {currentType === "report" && (
                <div className="p-6 rounded-2xl border border-teal-500/30 bg-teal-500/5">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 size={18} className="text-teal-400" />
                    <h3 className="text-lg font-bold">Progress Report</h3>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Study Material", done: true },
                      { label: "AI Explanation", done: true },
                      { label: "Debug Challenge", done: true },
                      { label: "Quiz", done: quizSubmitted, score: quizSubmitted ? `${quizScore}/${mod.quiz.length}` : "" },
                      { label: "MNC Questions", done: true },
                      { label: "Mock Interview", done: true },
                      { label: "Coding Challenge", done: isCompleted },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                        <span className="text-sm text-gray-300">{item.label}</span>
                        <div className="flex items-center gap-2">
                          {item.score && <span className="text-xs text-yellow-400">{item.score}</span>}
                          {item.done ? <CheckCircle2 size={16} className="text-green-400" /> : <XCircle size={16} className="text-red-400" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
