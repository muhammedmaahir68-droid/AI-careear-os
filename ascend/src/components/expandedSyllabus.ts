// ─────────────────────────────────────────────────────────────────────────────
// MASSIVE EXPANDED SYLLABUS DATA PER PHASE & DEPARTMENT
// Each phase now has DEEP sub-topic nodes with textbook-grade content
// ─────────────────────────────────────────────────────────────────────────────
import type { VideoLink } from "../data/branchModules/types";
import { makeVideoLinks } from "../data/branchModules";
import type { LessonNode } from "./LearningGamePath";

const v = (topic: string) => makeVideoLinks(topic);

// ─────────────────────────────────────────────────────────────────────────────
// PHASE 1 EXPANDED: APTITUDE FOUNDATION (MASSIVE CONTENT)
// ─────────────────────────────────────────────────────────────────────────────
export function getPhase1Nodes(b: string, startStep: number): LessonNode[] {
  let step = startStep;
  return [
    // ── QUANTITATIVE APTITUDE ──
    {
      id: `${b}-p1-quant-1`, step: step++, phaseNumber: 1, category: "Phase 1: Aptitude Foundation", subTopic: "Quantitative Aptitude",
      title: "Number Systems, Cyclicity & Divisibility Rules", type: "lesson", xpReward: 40, diamondReward: 10,
      videos: v("Number Systems and Cyclicity Quant Aptitude"),
      theory: {
        summary: "Master core arithmetic principles, unit digit cyclicity, remainder theorems, and rapid HCF/LCM shortcuts essential for TCS NQT, Wipro NTH, Infosys, and Amazon written tests.",
        detailedContent: `
### 1. FUNDAMENTAL PROPERTIES OF NUMBER SYSTEMS
Numbers form the foundation of quantitative aptitude and computer algorithms:
- Natural Numbers: {1, 2, 3, ...}. Counting numbers starting from 1.
- Whole Numbers: {0, 1, 2, ...}. Natural numbers including zero.
- Integers: {..., -2, -1, 0, 1, 2, ...}. Whole numbers including negatives.
- Rational Numbers: Numbers expressible as p/q where q ≠ 0. E.g., 3/4, 0.5, -7/2.
- Irrational Numbers: Numbers NOT expressible as p/q. E.g., √2, π, e.
- Real Numbers: Union of all rational and irrational numbers on the number line.
- Prime Numbers: Numbers greater than 1 with exactly two distinct positive divisors (1 and itself). 2 is the only even prime.
- Co-Prime Numbers: Two numbers a and b are co-prime if GCD(a, b) = 1. Example: 8 and 15 are co-prime.
- Perfect Numbers: Numbers equal to the sum of their proper divisors. E.g., 6 = 1 + 2 + 3.
- Fibonacci Sequence: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34... Each term = sum of two preceding terms.

### 2. DIVISIBILITY RULES MASTER CHART
- By 2: Last digit is even (0, 2, 4, 6, 8).
- By 3: Sum of all digits is divisible by 3. Example: 123 → 1+2+3 = 6, divisible by 3. ✓
- By 4: Last TWO digits form a number divisible by 4. Example: 1324 → 24 ÷ 4 = 6. ✓
- By 5: Last digit is 0 or 5.
- By 6: Number is divisible by BOTH 2 AND 3.
- By 7: Double the last digit, subtract from the remaining number. If result is divisible by 7, original is too. Example: 343 → 34 - 2×3 = 28. 28 ÷ 7 = 4. ✓
- By 8: Last THREE digits form a number divisible by 8. Example: 1000 → 000 ÷ 8 = 0. ✓
- By 9: Sum of ALL digits is divisible by 9. Example: 729 → 7+2+9 = 18 → 18 ÷ 9 = 2. ✓
- By 11: (Sum of digits at ODD positions) - (Sum of digits at EVEN positions) = 0 or multiple of 11.
  Example: 121 → (1 + 1) - (2) = 0. ✓
- By 12: Divisible by BOTH 3 AND 4.
- By 13: Multiply last digit by 4 and add to the remaining number. Repeat until a recognizable multiple of 13 is obtained.

### 3. HCF (Highest Common Factor) & LCM (Least Common Multiple)
The fundamental relationship: HCF(a, b) × LCM(a, b) = a × b.
This identity is valid ONLY for exactly 2 numbers.

Methods to find HCF:
- Prime Factorization Method: Decompose both numbers, take minimum power of common primes.
- Division Method (Euclidean Algorithm): Repeatedly divide larger by smaller until remainder is 0.
  HCF(252, 198): 252 = 1×198 + 54 → 198 = 3×54 + 36 → 54 = 1×36 + 18 → 36 = 2×18 + 0 → HCF = 18.

HCF of Fractions = HCF(Numerators) / LCM(Denominators)
LCM of Fractions = LCM(Numerators) / HCF(Denominators)

### 4. UNIT DIGIT CYCLICITY (Critical for Placement Exams)
Every digit when raised to successive powers creates a repeating cycle of unit digits:
- Cyclicity 1 (always same unit digit): 0, 1, 5, 6
  6^1 = 6, 6^2 = 36, 6^3 = 216... Always ends in 6.
- Cyclicity 2: 4, 9
  4^1 = 4, 4^2 = 16, 4^3 = 64, 4^4 = 256 → Pattern: 4, 6, 4, 6...
  9^1 = 9, 9^2 = 81, 9^3 = 729, 9^4 = 6561 → Pattern: 9, 1, 9, 1...
- Cyclicity 4: 2, 3, 7, 8
  2: 2, 4, 8, 6 (repeats every 4 powers)
  3: 3, 9, 7, 1 (repeats every 4 powers)
  7: 7, 9, 3, 1 (repeats every 4 powers)
  8: 8, 4, 2, 6 (repeats every 4 powers)

Algorithm: To find unit digit of N^P:
1. Find the unit digit of N.
2. If cyclicity is 4, compute r = P mod 4. If r = 0, use power 4.
3. Unit digit = (unit digit of N)^r.

### 5. REMAINDER THEOREMS
- Fermat's Little Theorem: If p is prime and GCD(a, p) = 1, then a^(p-1) ≡ 1 (mod p).
- Wilson's Theorem: (p-1)! ≡ -1 (mod p) for prime p.
- Chinese Remainder Theorem: Solve systems of linear congruences with coprime moduli.

### 6. SPEED MATH SHORTCUTS
- Multiplying by 11: Insert the sum of digits between the two digits. 34 × 11 = 3_(3+4)_4 = 374.
- Squaring numbers ending in 5: n5² = n(n+1) followed by 25. 75² = 7×8 = 56, append 25 → 5625.
- Vedic Math Nikhilam Sutra: For numbers close to a base (10, 100, 1000):
  97 × 96: Deficits from 100 are 3 and 4. Product = (97-4) | (3×4) = 93 | 12 = 9312.
        `,
        keyPoints: [
          "HCF × LCM = Product of two numbers (valid only for 2 numbers)",
          "HCF of fractions = HCF(Numerators) / LCM(Denominators)",
          "Unit digit of 2, 3, 7, 8 repeats every 4 powers (Cyclicity 4)",
          "Sum of first N natural numbers = N(N + 1) / 2",
          "Sum of squares of first N naturals = N(N+1)(2N+1) / 6",
          "Sum of cubes of first N naturals = [N(N+1)/2]²",
          "Euclidean algorithm finds HCF in O(log(min(a,b))) time",
          "Fermat's Little Theorem: a^(p-1) ≡ 1 (mod p) for prime p"
        ],
        formula: "HCF(a, b) × LCM(a, b) = a × b\nUnit Digit of N^P: Find r = P mod cyclicity, compute N^r\nSum(1..N) = N(N+1)/2",
        examples: [
          "Find unit digit of 7^105:\n105 mod 4 = 1. Therefore, unit digit of 7^105 is 7^1 = 7.",
          "Find HCF and LCM of 36 and 48:\n36 = 2² × 3², 48 = 2⁴ × 3¹.\nHCF = 2² × 3¹ = 12. LCM = 2⁴ × 3² = 144.\nVerification: 12 × 144 = 1728 = 36 × 48. ✓",
          "Find the remainder when 2^100 is divided by 7:\nBy Fermat's Little Theorem, 2^6 ≡ 1 (mod 7).\n100 = 16 × 6 + 4. So 2^100 = (2^6)^16 × 2^4 ≡ 1^16 × 16 ≡ 16 mod 7 = 2.",
          "What is the unit digit of 3^999?\nCyclicity of 3: {3, 9, 7, 1}. 999 mod 4 = 3. So unit digit = 7."
        ],
        placementTips: [
          "TCS NQT: 30% of Quant section tests Number Systems. Master cyclicity to answer in 10 seconds.",
          "Infosys: Expect remainder theorem + prime factorization combo questions.",
          "Wipro NTH: Divisibility rule questions frequently appear with 4-digit numbers.",
          "Accenture: Focuses on LCM/HCF word problems involving circular track meetings."
        ],
        authorReferences: [
          { author: "Dr. R.S. Aggarwal", bookTitle: "Quantitative Aptitude for Competitive Examinations", coreInsight: "Unit digit cyclicity shortcuts eliminate 90% of manual calculation steps in screening tests." },
          { author: "Arun Sharma", bookTitle: "How to Prepare for Quantitative Aptitude for the CAT", coreInsight: "Number system mastery is the gateway to scoring 95+ percentile in any aptitude exam." }
        ]
      },
      questions: [
        { prompt: "Find the HCF of 36 and 48.", options: ["6", "12", "18", "24"], correct: 1, explanation: "Prime factorizations: 36 = 2²×3², 48 = 2⁴×3¹. Lowest powers: 2²×3¹ = 12." },
        { prompt: "What is the unit digit of 7^105?", options: ["1", "3", "7", "9"], correct: 2, explanation: "7 has cyclicity of 4. 105 mod 4 = 1. So 7^1 = 7." },
        { prompt: "If N = 2³ × 3² × 5, how many divisors does N have?", options: ["12", "18", "24", "36"], correct: 2, explanation: "Number of divisors = (3+1)(2+1)(1+1) = 4×3×2 = 24." },
        { prompt: "Find remainder when 17^23 is divided by 16.", options: ["0", "1", "15", "17"], correct: 1, explanation: "17 = 16 + 1. So 17^23 mod 16 = 1^23 mod 16 = 1." }
      ]
    },

    {
      id: `${b}-p1-quant-2`, step: step++, phaseNumber: 1, category: "Phase 1: Aptitude Foundation", subTopic: "Quantitative Aptitude",
      title: "Percentages, Profit, Loss & Successive Discounts", type: "quiz", xpReward: 40, diamondReward: 10,
      videos: v("Percentages Profit Loss Discount Shortcut Formulas"),
      theory: {
        summary: "Percentage multipliers, markups, successive discounts, and margin calculations required for campus placement screening rounds.",
        detailedContent: `
### 1. PERCENTAGE AS MULTIPLIERS (Speed Math Foundation)
Converting percentages to multipliers dramatically speeds up calculation:
- A 20% increase ⟹ multiply by 1.20 (factor = 1 + 20/100)
- A 15% decrease ⟹ multiply by 0.85 (factor = 1 - 15/100)
- A 33.33% increase ⟹ multiply by 4/3
- A 25% decrease ⟹ multiply by 3/4

Successive changes of +a% and +b% yield net change:
Net Change % = a + b + (a × b) / 100

CRITICAL INSIGHT: Two successive changes of +x% and -x% ALWAYS result in a NET LOSS of (x/10)² percent.
Example: +20% then -20%: Net = 20 - 20 + (20 × -20)/100 = -4% loss.

### 2. PROFIT AND LOSS FUNDAMENTALS
- Cost Price (CP): The price at which an article is bought.
- Selling Price (SP): The price at which an article is sold.
- Marked Price (MP): The price labeled/displayed on the article (also called List Price).
- Profit = SP - CP (when SP > CP). Profit% = ((SP - CP) / CP) × 100.
- Loss = CP - SP (when CP > SP). Loss% = ((CP - SP) / CP) × 100.
- SP = CP × (1 + Profit%/100) for profit scenarios.
- SP = CP × (1 - Loss%/100) for loss scenarios.

SHORTCUT: If CP of X articles = SP of Y articles:
- Profit% = ((X - Y) / Y) × 100 when X > Y.
- Loss% = ((Y - X) / Y) × 100 when Y > X.

### 3. MARKED PRICE, DISCOUNT & SINGLE EQUIVALENT DISCOUNT
- Discount% = ((MP - SP) / MP) × 100
- SP = MP × (1 - Discount%/100)
- Two successive discounts of d1% and d2% are equivalent to:
  Single Discount% = d1 + d2 - (d1 × d2) / 100

Example: Successive discounts of 20% and 10%:
  Single Discount = 20 + 10 - (20×10)/100 = 30 - 2 = 28%

### 4. PARTNERSHIP & SHARE OF PROFIT
When partners invest different amounts for different durations:
- Partner A invests ₹X for t₁ months, Partner B invests ₹Y for t₂ months.
- Profit ratio = X × t₁ : Y × t₂
- Individual share = (Individual ratio / Total ratio) × Total Profit

### 5. SIMPLE & COMPOUND INTEREST
- Simple Interest: SI = (P × R × T) / 100
- Compound Interest: A = P(1 + R/100)^T, CI = A - P
- When compounded half-yearly: Rate becomes R/2, Time becomes 2T.
- Difference between CI and SI for 2 years = P(R/100)²
- Difference between CI and SI for 3 years = P(R/100)²(3 + R/100)

### 6. MIXTURE AND ALLIGATION
- Alligation Rule: Cheaper quantity / Dearer quantity = (Dearer price - Mean price) / (Mean price - Cheaper price)
- This creates a criss-cross diagram used to find mixing ratios.
        `,
        keyPoints: [
          "Net change for +x% followed by -x% is ALWAYS a loss of (x²/100)%",
          "Discounts are calculated on MP, while Profit/Loss is on CP",
          "Buy 3 Get 1 Free = 1/4 × 100 = 25% discount",
          "If SP of X articles = CP of Y articles, Profit/Loss% = ((Y-X)/X) × 100",
          "CI - SI for 2 years = P(R/100)²",
          "Successive discounts are NOT additive; use: d1 + d2 - (d1×d2)/100"
        ],
        formula: "Net % Change = a + b + (a × b) / 100\nProfit% = (SP - CP) / CP × 100\nSingle Equivalent Discount = d1 + d2 - (d1 × d2) / 100\nSI = PRT/100\nCI = P(1 + R/100)^T - P",
        examples: [
          "A trader marks goods 30% above CP and offers 10% discount. Find profit%.\nLet CP = 100. MP = 130. SP = 130 × 0.90 = 117. Profit = 17%.",
          "Find the single equivalent discount for successive discounts of 20% and 15%.\nSingle Discount = 20 + 15 - (20×15)/100 = 35 - 3 = 32%.",
          "₹8000 invested at 10% CI for 2 years.\nA = 8000(1.1)² = 8000 × 1.21 = ₹9680. CI = ₹1680.\nSI would be = 8000 × 10 × 2 / 100 = ₹1600. Difference = ₹80."
        ],
        placementTips: [
          "TCS NQT: Partnership + Profit/Loss combo questions are very common. Practice 50+ problems.",
          "Amazon: Percentage-based data interpretation is tested in their online assessment.",
          "Wipro NTH: Successive discount questions appear in nearly every batch."
        ]
      },
      questions: [
        { prompt: "A 20% increase followed by a 20% decrease yields a net change of:", options: ["0%", "-4%", "+4%", "-2%"], correct: 1, explanation: "Net change = 20 - 20 + (20×(-20))/100 = -4% (4% decrease)." },
        { prompt: "If CP of 15 articles equals SP of 12 articles, profit percentage is:", options: ["20%", "25%", "30%", "33.3%"], correct: 1, explanation: "Profit % = (15 - 12) / 12 × 100 = 25%." },
        { prompt: "Single equivalent discount for 30% and 20% successive discounts:", options: ["50%", "44%", "40%", "56%"], correct: 1, explanation: "30 + 20 - (30×20)/100 = 50 - 6 = 44%." },
        { prompt: "CI on ₹5000 at 10% for 2 years is:", options: ["₹1000", "₹1050", "₹1100", "₹1025"], correct: 1, explanation: "A = 5000(1.1)² = 5000 × 1.21 = 6050. CI = 6050 - 5000 = ₹1050." }
      ]
    },

    {
      id: `${b}-p1-quant-3`, step: step++, phaseNumber: 1, category: "Phase 1: Aptitude Foundation", subTopic: "Quantitative Aptitude",
      title: "Time, Speed, Distance & Trains, Boats, Streams", type: "lesson", xpReward: 45, diamondReward: 12,
      videos: v("Time Speed Distance Trains Boats Streams Problems"),
      theory: {
        summary: "Relative speed concepts, upstream/downstream formulas, and platform/bridge train problems for TCS, Infosys, Wipro placement exams.",
        detailedContent: `
### 1. CORE FORMULAS
- Speed = Distance / Time
- Distance = Speed × Time
- Time = Distance / Speed
- Unit Conversion: km/h to m/s → multiply by 5/18. m/s to km/h → multiply by 18/5.

### 2. RELATIVE SPEED
- Same direction: Relative speed = |S₁ - S₂|
- Opposite directions: Relative speed = S₁ + S₂
- When a faster object overtakes a slower one, time to catch up = Gap / Relative speed.

### 3. TRAIN PROBLEMS (Placement Favorites)
- Train crossing a stationary pole/person: Distance = Length of train. Time = Length / Speed.
- Train crossing a platform/bridge: Distance = Length of train + Length of platform.
- Two trains crossing each other (opposite directions): Distance = L₁ + L₂, Speed = S₁ + S₂.
- Two trains crossing each other (same direction): Distance = L₁ + L₂, Speed = |S₁ - S₂|.

### 4. BOATS AND STREAMS
- Downstream speed = Boat speed + Stream speed = u + v
- Upstream speed = Boat speed - Stream speed = u - v
- Speed of boat in still water = (Downstream + Upstream) / 2
- Speed of stream = (Downstream - Upstream) / 2

### 5. CIRCULAR TRACK PROBLEMS
- Two people running in the same direction on a circular track of length L:
  Time to meet for the first time = L / |S₁ - S₂|
- Running in opposite directions: Time to meet = L / (S₁ + S₂)
- First time at the starting point together = LCM(L/S₁, L/S₂)

### 6. AVERAGE SPEED (NOT the average of speeds!)
Average Speed = Total Distance / Total Time
- For equal distances at speeds S₁ and S₂: Average speed = 2S₁S₂ / (S₁ + S₂) (Harmonic mean)
- For equal times at speeds S₁ and S₂: Average speed = (S₁ + S₂) / 2 (Arithmetic mean)
        `,
        keyPoints: [
          "km/h to m/s: multiply by 5/18",
          "Train crossing platform: Distance = Train length + Platform length",
          "Average speed for equal distances = 2S₁S₂ / (S₁ + S₂)",
          "Upstream speed = Boat speed - Stream speed",
          "Circular track same direction: Time = L / |S₁ - S₂|"
        ],
        formula: "Speed = Distance / Time\nAvg Speed (equal dist) = 2S₁S₂ / (S₁ + S₂)\nDownstream = u + v; Upstream = u - v",
        examples: [
          "A train 200m long passes a 300m platform in 25 seconds. Speed?\nTotal distance = 200 + 300 = 500m.\nSpeed = 500/25 = 20 m/s = 20 × 18/5 = 72 km/h.",
          "A boat goes 36 km downstream in 4 hours and 24 km upstream in 4 hours.\nDownstream speed = 36/4 = 9 km/h. Upstream speed = 24/4 = 6 km/h.\nBoat speed = (9+6)/2 = 7.5 km/h. Stream speed = (9-6)/2 = 1.5 km/h."
        ]
      },
      questions: [
        { prompt: "A train 200m long passes a 300m platform in 25 seconds. Speed in km/h?", options: ["54", "72", "90", "108"], correct: 1, explanation: "Distance = 500m. Speed = 500/25 = 20 m/s = 72 km/h." },
        { prompt: "A person covers half the distance at 40 km/h and remaining half at 60 km/h. Average speed?", options: ["48 km/h", "50 km/h", "45 km/h", "52 km/h"], correct: 0, explanation: "Average speed = 2×40×60/(40+60) = 4800/100 = 48 km/h." }
      ]
    },

    {
      id: `${b}-p1-quant-4`, step: step++, phaseNumber: 1, category: "Phase 1: Aptitude Foundation", subTopic: "Quantitative Aptitude",
      title: "Time & Work, Pipes & Cisterns, Work Efficiency", type: "quiz", xpReward: 45, diamondReward: 12,
      videos: v("Time and Work Pipes Cisterns Placement Problems"),
      theory: {
        summary: "LCM-based work efficiency methods, pipe filling/emptying rates, and collaborative work distribution for placement screening.",
        detailedContent: `
### 1. WORK EFFICIENCY METHOD (LCM Approach)
Instead of fractional work (1/A, 1/B), use LCM of days as total work units:
- If A does work in 10 days, B in 15 days: LCM(10,15) = 30 units.
- A's efficiency = 30/10 = 3 units/day. B's efficiency = 30/15 = 2 units/day.
- Together: 3 + 2 = 5 units/day. Time = 30/5 = 6 days.

### 2. WORK AND WAGES
- Wages are distributed in the ratio of work done (efficiency × time worked).
- If A works for 5 days and B for 3 days: A's share = 3×5 = 15 units, B's share = 2×3 = 6 units.

### 3. PIPES AND CISTERNS
- Filling pipe: Adds work (+). Emptying pipe/leak: Subtracts work (-).
- If pipe A fills in 12 hours and pipe B empties in 18 hours:
  LCM = 36. A = +3 units/hr, B = -2 units/hr. Net = 1 unit/hr. Time = 36 hours.

### 4. ALTERNATE DAY WORK PATTERNS
When A and B work on alternate days (A on day 1, B on day 2, etc.):
- Calculate work done in 2-day cycle.
- Find how many complete cycles fit, then calculate remaining work.
        `,
        keyPoints: [
          "Always use LCM method over fraction method for speed",
          "Filling pipe = positive efficiency, Emptying = negative efficiency",
          "Wages ∝ Work done (efficiency × time)",
          "Men × Days × Hours = Constant (for same work)"
        ],
        formula: "Combined efficiency = E_A + E_B\nTime = Total Work / Combined Efficiency\nM₁D₁H₁ / W₁ = M₂D₂H₂ / W₂"
      },
      questions: [
        { prompt: "A does work in 10 days, B in 15 days. Together how many days?", options: ["5", "6", "7", "8"], correct: 1, explanation: "LCM=30. A=3/day, B=2/day. Together=5/day. Time=30/5=6 days." },
        { prompt: "A pipe fills a tank in 6 hours, another empties in 8 hours. When both open, time to fill?", options: ["24 hours", "20 hours", "12 hours", "18 hours"], correct: 0, explanation: "LCM=24. Fill=4/hr, Empty=-3/hr. Net=1/hr. Time=24/1=24 hours." }
      ]
    },

    {
      id: `${b}-p1-quant-5`, step: step++, phaseNumber: 1, category: "Phase 1: Aptitude Foundation", subTopic: "Quantitative Aptitude",
      title: "Probability, Permutations & Combinations", type: "lesson", xpReward: 50, diamondReward: 15,
      videos: v("Probability Permutation Combination Placement"),
      theory: {
        summary: "Counting principles, factorial arrangements, selection vs arrangement, conditional probability, and Bayes theorem applications.",
        detailedContent: `
### 1. FUNDAMENTAL COUNTING PRINCIPLE
If task 1 can be done in m ways and task 2 in n ways:
- If BOTH must be done: Total ways = m × n (Multiplication principle)
- If EITHER can be done: Total ways = m + n (Addition principle)

### 2. PERMUTATIONS (Arrangements — ORDER MATTERS)
- nPr = n! / (n-r)! = Number of ways to arrange r items from n distinct items.
- n! = n × (n-1) × (n-2) × ... × 1. 0! = 1.
- Circular permutations: (n-1)! for n objects in a circle.
- Permutations with repetition: n! / (p! × q! × r!) where p, q, r are repeat counts.

### 3. COMBINATIONS (Selections — ORDER DOES NOT MATTER)
- nCr = n! / (r! × (n-r)!) = Number of ways to select r items from n.
- nC0 = nCn = 1. nC1 = n.
- nCr = nC(n-r). Example: 10C3 = 10C7.
- nCr + nC(r+1) = (n+1)C(r+1) (Pascal's Identity).

### 4. PROBABILITY FUNDAMENTALS
- P(A) = Favorable outcomes / Total outcomes. 0 ≤ P(A) ≤ 1.
- P(A') = 1 - P(A) (Complementary probability).
- P(A ∪ B) = P(A) + P(B) - P(A ∩ B) (Addition rule).
- P(A ∩ B) = P(A) × P(B|A) (Multiplication rule).
- Independent events: P(A ∩ B) = P(A) × P(B).

### 5. CONDITIONAL PROBABILITY & BAYES THEOREM
P(A|B) = P(A ∩ B) / P(B)
Bayes: P(A|B) = P(B|A) × P(A) / P(B)
        `,
        keyPoints: [
          "nPr for arrangements (order matters), nCr for selections (order doesn't)",
          "Circular arrangements = (n-1)!",
          "P(A') = 1 - P(A) — use complementary probability for 'at least one' questions",
          "Independent: P(A∩B) = P(A)×P(B); Mutually exclusive: P(A∩B) = 0"
        ],
        formula: "nPr = n!/(n-r)!\nnCr = n!/(r!(n-r)!)\nP(A∪B) = P(A) + P(B) - P(A∩B)"
      },
      questions: [
        { prompt: "How many ways can 5 people sit around a circular table?", options: ["120", "24", "60", "20"], correct: 1, explanation: "Circular permutation = (5-1)! = 4! = 24." },
        { prompt: "Probability of getting at least one head in 3 coin tosses?", options: ["7/8", "3/4", "1/2", "5/8"], correct: 0, explanation: "P(at least 1 head) = 1 - P(no heads) = 1 - (1/2)³ = 1 - 1/8 = 7/8." }
      ]
    },

    // ── LOGICAL REASONING ──
    {
      id: `${b}-p1-logical-1`, step: step++, phaseNumber: 1, category: "Phase 1: Aptitude Foundation", subTopic: "Logical Reasoning",
      title: "Blood Relations, Coding-Decoding & Direction Sense", type: "lesson", xpReward: 40, diamondReward: 10,
      videos: v("Logical Reasoning Blood Relations Coding Decoding"),
      theory: {
        summary: "Master family tree diagrams, letter-shift substitution patterns, and 2D cardinal direction coordinate navigation.",
        detailedContent: `
### 1. BLOOD RELATIONS FAMILY TREE SYSTEM
Draw a structured family tree for every question:
- Males: represented with squares [□] or (+)
- Females: represented with circles (○) or (-)
- Marriage: Double horizontal line (═)
- Siblings: Single horizontal line (─)
- Parent-Child: Vertical line (│)

KEY RELATIONSHIPS:
- Father's/Mother's father = Grandfather
- Father's/Mother's mother = Grandmother
- Father's brother = Uncle; Father's sister = Aunt
- Mother's brother = Maternal Uncle (Mama)
- Brother's/Sister's son = Nephew; Brother's/Sister's daughter = Niece
- Son's wife = Daughter-in-law; Daughter's husband = Son-in-law

### 2. CODING-DECODING PATTERNS
Types:
A) Letter Shifting: Each letter shifted by fixed positions (A→D means +3 shift).
B) Reverse Alphabet: A=26, B=25... Z=1. Opposite pairs sum to 27 (A-Z, B-Y, C-X...).
C) Number Coding: Each letter mapped to its position (A=1, B=2... Z=26) or custom mapping.
D) Symbolic Coding: Words replaced by symbols following a pattern.

### 3. DIRECTION & DISTANCE
- North (+Y), South (-Y), East (+X), West (-X)
- Shortest distance = √(Δx² + Δy²) (Pythagoras theorem)
- Shadow in morning → towards West (sun rises in East)
- Shadow in evening → towards East (sun sets in West)
- At noon → no shadow (sun overhead)
        `,
        keyPoints: [
          "Always draw a generation tree diagram for multi-statement blood relation questions",
          "Opposite letters in English alphabet sum to 27 (A=1+Z=26=27)",
          "Shadow: Morning→West, Evening→East, Noon→None",
          "Shortest distance always uses Pythagoras: √(Δx² + Δy²)"
        ],
        formula: "Shortest Distance = √(Δx² + Δy²)"
      },
      questions: [
        { prompt: "Pointing to a photo, a man said: 'I have no brother or sister, but that man's father is my father's son.' Whose photo?", options: ["His own", "His son's", "His father's", "His nephew's"], correct: 1, explanation: "'My father's son' = himself. So 'that man's father is myself'. Photo = his son." },
        { prompt: "If FLOWER is coded as GMPXFS, what is the coding pattern?", options: ["+1 shift", "+2 shift then -1 shift alternately", "+1 shift to each letter", "Reverse alphabet"], correct: 2, explanation: "F→G(+1), L→M(+1), O→P(+1), W→X(+1), E→F(+1), R→S(+1). Each letter shifted by +1." }
      ]
    },

    {
      id: `${b}-p1-logical-2`, step: step++, phaseNumber: 1, category: "Phase 1: Aptitude Foundation", subTopic: "Logical Reasoning",
      title: "Syllogisms, Seating Arrangements & Puzzles", type: "quiz", xpReward: 45, diamondReward: 12,
      videos: v("Syllogism Seating Arrangement Logical Puzzles"),
      theory: {
        summary: "Venn diagram syllogism solving, linear/circular seating constraints, and multi-constraint logic grid puzzles.",
        detailedContent: `
### 1. SYLLOGISMS (Venn Diagram Method)
Rules:
- "All A are B" → Circle A is completely inside circle B.
- "Some A are B" → Circles A and B overlap partially.
- "No A are B" → Circles A and B are completely separate.
- "Some A are not B" → At least part of circle A is outside circle B.

To verify conclusions, draw ALL possible valid Venn diagram configurations. A conclusion is valid ONLY if it holds in EVERY possible configuration.

### 2. LINEAR SEATING ARRANGEMENT
- Identify fixed positions first (e.g., "A sits at the end").
- Apply relative constraints ("B is to the left of C").
- Eliminate invalid configurations systematically.
- Watch for "faces North/South" directional clues that flip left/right perspective.

### 3. CIRCULAR SEATING ARRANGEMENT
- Fix one person's position (reduces arrangements from n! to (n-1)!).
- Apply clockwise/anti-clockwise constraints.
- "Opposite" in circular arrangement means diametrically across.
- "Immediate left/right" depends on the direction everyone faces (inward vs outward).

### 4. DATA SUFFICIENCY
Determine if given statements (individually or combined) are sufficient to answer the question:
- Statement 1 alone is sufficient.
- Statement 2 alone is sufficient.
- Both together are sufficient.
- Both together are insufficient.
- Each alone is sufficient.
        `,
        keyPoints: [
          "Draw ALL possible Venn diagrams to verify syllogism conclusions",
          "In circular seating, fix one person first to reduce complexity",
          "For linear arrangement facing North: left = West, right = East",
          "Data sufficiency: test each statement independently FIRST"
        ]
      },
      questions: [
        { prompt: "Statements: All cats are dogs. Some dogs are elephants. Conclusion: Some cats are elephants.", options: ["Definitely true", "Definitely false", "Does not follow", "Probably true"], correct: 2, explanation: "Draw Venn: Cats inside Dogs, Dogs overlapping Elephants. The cat-elephant overlap is NOT guaranteed." }
      ]
    },

    // ── VERBAL ABILITY ──
    {
      id: `${b}-p1-verbal-1`, step: step++, phaseNumber: 1, category: "Phase 1: Aptitude Foundation", subTopic: "Verbal Ability",
      title: "Reading Comprehension, Grammar & Error Spotting", type: "quiz", xpReward: 40, diamondReward: 10,
      videos: v("Verbal Ability Spotting Errors Reading Comprehension"),
      theory: {
        summary: "Subject-verb agreement, tenses, article usage, modifier placement, and speed reading strategies for placement exams.",
        detailedContent: `
### 1. SUBJECT-VERB AGREEMENT RULES
- Rule 1: Singular subjects take singular verbs; plural subjects take plural verbs.
- Rule 2: 'Either...or' / 'Neither...nor' → verb matches CLOSER subject.
  "Neither the teacher nor the students WERE present." (students = plural → were)
- Rule 3: Collective nouns (team, committee, jury) take singular verb when acting as ONE unit.
  "The team IS performing well."
- Rule 4: 'Each', 'Every', 'Everyone', 'Everybody' → always singular verb.
  "Each of the boys HAS completed the task."
- Rule 5: Intervening prepositional phrases don't change subject-verb agreement.
  "The quality of the apples WAS good." (quality = singular, not apples)

### 2. COMMON ERROR PATTERNS IN PLACEMENT TESTS
A) Tense Consistency: Don't mix past and present within a sentence.
B) Pronoun-Antecedent Agreement: "Each student should submit THEIR (wrong) → HIS/HER assignment."
C) Misplaced Modifiers: "Walking down the street, the trees looked beautiful." (trees can't walk!)
D) Fewer vs Less: Fewer = countable (fewer books). Less = uncountable (less water).
E) Between vs Among: Between = two entities. Among = three or more.

### 3. READING COMPREHENSION SPEED STRATEGIES
- Read the questions FIRST before reading the passage.
- Identify question types: factual, inferential, vocabulary-in-context, main idea.
- For 'tone' questions: Look for adjective patterns (positive/negative/neutral).
- Eliminate two obviously wrong options, then compare remaining two carefully.

### 4. VOCABULARY ROOT WORDS
Learning root words accelerates vocabulary building:
- 'Bene' = good (benefit, benevolent, beneficial)
- 'Mal' = bad (malice, malfunction, malcontent)
- 'Chrono' = time (chronology, chronic, synchronize)
- 'Graph' = write (biography, autograph, graphite)
- 'Poly' = many (polygon, polyglot, polynomial)
        `,
        keyPoints: [
          "Subject-verb agreement ignores prepositional phrases between them",
          "Use 'Fewer' for countable, 'Less' for uncountable nouns",
          "Neither...nor → verb agrees with the NEAREST subject",
          "Read questions BEFORE reading RC passages for speed",
          "Root words: Bene=good, Mal=bad, Chrono=time"
        ]
      },
      questions: [
        { prompt: "Choose the correct sentence:", options: ["Neither the manager nor the employees was present.", "Neither the manager nor the employees were present.", "Neither the manager or the employees was present.", "Neither the manager nor employees has present."], correct: 1, explanation: "'Neither...nor' → verb agrees with nearest subject ('employees' = plural → 'were')." },
        { prompt: "'The team __ playing well today.'", options: ["are", "is", "were", "have been"], correct: 1, explanation: "Collective noun acting as a single unit takes singular verb: 'is'." },
        { prompt: "Identify the error: 'Each of the students have completed their homework.'", options: ["Each", "have (should be 'has')", "their", "completed"], correct: 1, explanation: "'Each' takes singular verb → 'has completed'." }
      ]
    },

    {
      id: `${b}-p1-verbal-2`, step: step++, phaseNumber: 1, category: "Phase 1: Aptitude Foundation", subTopic: "Verbal Ability",
      title: "Para Jumbles, Sentence Completion & Analogies", type: "lesson", xpReward: 40, diamondReward: 10,
      videos: v("Para Jumbles Sentence Completion Verbal Ability"),
      theory: {
        summary: "Rearranging jumbled paragraphs, fill-in-the-blank contextual vocabulary, and word analogy patterns.",
        detailedContent: `
### 1. PARA JUMBLES (Sentence Rearrangement)
Strategy:
- Find the OPENING sentence (introduces a topic, no pronoun references to earlier sentences).
- Find the CLOSING sentence (conclusion, summary, or forward-looking statement).
- Identify MANDATORY PAIRS (sentences that must be adjacent due to pronoun references or logical flow).
- Link sentences using transition words: However, Moreover, Therefore, Furthermore, In contrast.

### 2. SENTENCE COMPLETION / CLOZE TEST
- Read the ENTIRE sentence before filling blanks.
- Look for contextual clues: contrast words (but, however, although), cause-effect (because, therefore).
- Eliminate options that create redundancy or contradiction.

### 3. WORD ANALOGIES
Common patterns:
- Synonym: Happy : Joyful :: Sad : Melancholy
- Antonym: Hot : Cold :: Light : Dark
- Degree: Warm : Hot :: Cool : Freezing (intensity increases)
- Part : Whole: Petal : Flower :: Page : Book
- Tool : Function: Knife : Cut :: Pen : Write
- Worker : Workplace: Teacher : School :: Chef : Kitchen
        `,
        keyPoints: [
          "Opening sentence introduces a topic without backward references",
          "Transition words reveal sentence order: However=contrast, Moreover=addition",
          "Analogy patterns: synonym, antonym, degree, part:whole, tool:function"
        ]
      },
      questions: [
        { prompt: "Complete: 'Although she was tired, she __ to finish the project.'", options: ["managed", "failed", "refused", "declined"], correct: 0, explanation: "'Although' indicates contrast. Despite being tired, she still managed (positive outcome contrasting fatigue)." }
      ]
    },

    // CHEST
    {
      id: `${b}-chest-p1`, step: step++, phaseNumber: 1, category: "Phase 1: Aptitude Foundation", subTopic: "Aptitude Foundation",
      title: "🎁 Phase 1 Aptitude Master Reward Chest — 10 Topics Conquered!", type: "chest", xpReward: 200, diamondReward: 75
    }
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// DOWNLOAD DOCUMENT UTILITY
// ─────────────────────────────────────────────────────────────────────────────
export function downloadLessonAsDocument(node: LessonNode): void {
  const lines: string[] = [];
  const divider = "═".repeat(80);

  lines.push(divider);
  lines.push(`  AI CAREER OS — STUDY MATERIAL DOCUMENT`);
  lines.push(divider);
  lines.push("");
  lines.push(`  📖 ${node.title}`);
  lines.push(`  📂 ${node.category} → ${node.subTopic}`);
  lines.push(`  ⭐ XP Reward: ${node.xpReward} | 💎 Diamonds: ${node.diamondReward}`);
  lines.push("");
  lines.push(divider);

  if (node.theory) {
    lines.push("");
    lines.push("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
    lines.push("  📖 TEXTBOOK STUDY MATERIAL");
    lines.push("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
    lines.push("");
    lines.push(`SUMMARY: ${node.theory.summary}`);
    lines.push("");

    if (node.theory.detailedContent) {
      lines.push("─── DETAILED CHAPTER CONTENT ───");
      lines.push(node.theory.detailedContent.trim());
      lines.push("");
    }

    if (node.theory.keyPoints?.length) {
      lines.push("─── KEY TAKEAWAYS ───");
      node.theory.keyPoints.forEach((kp, i) => {
        lines.push(`  ${i + 1}. ${kp}`);
      });
      lines.push("");
    }

    if (node.theory.formula) {
      lines.push("─── FORMULAS ───");
      lines.push(node.theory.formula);
      lines.push("");
    }

    if (node.theory.examples?.length) {
      lines.push("─── WORKED EXAMPLES ───");
      node.theory.examples.forEach((ex, i) => {
        lines.push(`  Example ${i + 1}:`);
        lines.push(`  ${ex}`);
        lines.push("");
      });
    }

    if (node.theory.placementTips?.length) {
      lines.push("─── 🏢 MNC PLACEMENT TIPS ───");
      node.theory.placementTips.forEach((tip, i) => {
        lines.push(`  💡 ${i + 1}. ${tip}`);
      });
      lines.push("");
    }

    if (node.theory.authorReferences?.length) {
      lines.push("─── 📚 AUTHOR REFERENCES ───");
      node.theory.authorReferences.forEach(ref => {
        lines.push(`  Book: "${ref.bookTitle}"`);
        lines.push(`  Author: ${ref.author}`);
        lines.push(`  Insight: ${ref.coreInsight}`);
        lines.push("");
      });
    }

    if (node.theory.code) {
      lines.push("─── 💻 CODE IMPLEMENTATION ───");
      lines.push(node.theory.code);
      lines.push("");
    }
  }

  if (node.debugChallenge) {
    lines.push("─── 🐛 BUG DEBUGGING CHALLENGE ───");
    lines.push(`  Challenge: ${node.debugChallenge.title}`);
    lines.push(`  BUGGY CODE:\n${node.debugChallenge.buggy}`);
    lines.push(`  FIXED CODE:\n${node.debugChallenge.fixed}`);
    lines.push(`  Hint: ${node.debugChallenge.hint}`);
    lines.push("");
  }

  if (node.questions?.length) {
    lines.push("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
    lines.push("  📝 PRACTICE QUESTIONS & ANSWERS");
    lines.push("▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬");
    lines.push("");
    node.questions.forEach((q, i) => {
      lines.push(`  Q${i + 1}. ${q.prompt}`);
      q.options.forEach((opt, j) => {
        const marker = j === q.correct ? " ✓ (CORRECT)" : "";
        lines.push(`      ${String.fromCharCode(65 + j)}) ${opt}${marker}`);
      });
      lines.push(`  📖 Explanation: ${q.explanation}`);
      lines.push("");
    });
  }

  lines.push(divider);
  lines.push("  Generated by AI Career OS — Your Complete Placement Preparation Platform");
  lines.push("  © 2024 AI Career OS. All rights reserved.");
  lines.push(divider);

  const content = lines.join("\n");
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `AI-Career-OS_${node.subTopic.replace(/[^a-zA-Z0-9]/g, "_")}_${node.title.replace(/[^a-zA-Z0-9]/g, "_").substring(0, 40)}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
