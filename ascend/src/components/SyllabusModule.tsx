import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Circle, Lock, ChevronDown, ChevronUp, BookOpen, HelpCircle, Zap, Loader2 } from "lucide-react";
import { usePlacementReadiness } from "../hooks/usePlacementReadiness";

interface SyllabusModuleProps {
  completedModules: number;
  onSelectConcept?: (conceptName: string, levelName: string) => void;
}

// ─── TYPES ───────────────────────────────────────────────────────────────────
interface Concept {
  name: string;
  questions: string[];
}

interface Phase {
  title: string;
  desc: string;
  concepts: Concept[];
}

// ─── FULL SYLLABUS DATA ───────────────────────────────────────────────────────
const syllabus: Phase[] = [
  {
    title: "Phase 0 – AI Assessment",
    desc: "Skill check, dream company, personalized roadmap.",
    concepts: [
      {
        name: "Career Goal Assessment",
        questions: [
          "What is your target dream company?",
          "Which domain excites you most — Tech, Finance, or Consulting?",
          "How many months do you have before your placement?",
          "What is your current CGPA or academic standing?",
          "Do you have any internship or work experience?",
          "What programming language are you most comfortable with?",
          "Rate your aptitude skills from 1–10.",
          "Rate your coding skills from 1–10.",
          "Have you practiced any mock interviews before?",
          "What is your biggest strength right now?",
          "What is your biggest weakness you want to fix?",
          "Do you prefer on-site or remote roles?",
          "Are you open to relocating for a job?",
          "What salary range are you targeting?",
          "Describe your ideal work culture in one line.",
        ],
      },
    ],
  },
  {
    title: "Level 1 – Foundation",
    desc: "Aptitude Basics — read, solve, and master each concept before unlocking Level 2.",
    concepts: [
      {
        name: "Number System",
        questions: [
          "What is the HCF of 36 and 48?",
          "Find the LCM of 12, 18, and 24.",
          "Which is the smallest prime number?",
          "Is 0 an even number? Justify.",
          "Find the sum of all even numbers between 1 and 100.",
          "What is the remainder when 123456789 is divided by 9?",
          "How many factors does 48 have?",
          "Express 0.375 as a fraction.",
          "What is the square root of 1764?",
          "Find the cube of 15.",
          "A number when divided by 12 gives remainder 5. What is the remainder when divided by 6?",
          "What is the value of 2^10?",
          "Find the next prime after 97.",
          "What is the digital root of 998?",
          "How many two-digit numbers are divisible by both 3 and 5?",
        ],
      },
      {
        name: "Percentages & Averages",
        questions: [
          "What is 35% of 420?",
          "If a price increases by 20% then decreases by 20%, what is the net change?",
          "A student scored 78 out of 120. What is the percentage?",
          "Find the average of 45, 67, 89, 23, and 56.",
          "If the average of 5 numbers is 40, what is their sum?",
          "A salary increased from ₹20,000 to ₹25,000. Find the % increase.",
          "What is 15% of 15% of 1000?",
          "If 40% of a number is 160, find the number.",
          "The average of 10 numbers is 50. If one number is removed, the average becomes 45. Find the removed number.",
          "A shop offers 30% discount. What is the selling price of an item marked ₹500?",
          "If A's salary is 20% more than B's, by what % is B's salary less than A's?",
          "The average age of 4 brothers is 12. If the father's age is included, the average becomes 18. Find the father's age.",
          "What percent of 2 hours is 45 minutes?",
          "A class has 40 students. 30% are girls. How many are boys?",
          "Find the weighted average of scores 80, 90, 70 with weights 2, 3, 1.",
        ],
      },
      {
        name: "Profit & Loss",
        questions: [
          "Cost price ₹400, Selling price ₹500. Find profit %.",
          "A merchant marks up by 25% and gives 10% discount. Find overall profit %.",
          "If SP = ₹336 and profit = 12%, find the CP.",
          "A loss of 10% was made on selling at ₹450. Find the CP.",
          "Two articles sold at ₹99 each; one at 10% profit and one at 10% loss. Find overall profit/loss.",
          "A shopkeeper sells two items at ₹1200 each — one at 20% profit, other at 20% loss. Net result?",
          "Find the profit when CP = ₹5000 and SP = ₹5750.",
          "If the profit is ₹500 and profit% is 25%, find the SP.",
          "A manufacturer sells to retailer at 20% profit. Retailer sells to customer at 10% profit. If CP to manufacturer is ₹100, what does customer pay?",
          "A fruit seller sells 120 fruits for the price of 100 fruits. Find profit or loss%.",
          "Discount% = 20, Marked Price = ₹800. Find SP.",
          "If a man earns 10% profit by selling an article at ₹1100, find the CP.",
          "By selling 33 metres of cloth, a merchant gains the cost of 11 metres. Find profit%.",
          "A trader allows 20% discount and still makes 25% profit. Find the marked price if CP = ₹400.",
          "What is the maximum discount% a seller can offer while still breaking even, if his profit margin is 15%?",
        ],
      },
      {
        name: "Time, Speed & Distance",
        questions: [
          "A car travels 300 km in 5 hours. Find speed.",
          "Speed = 60 km/h, Time = 2.5 h. Find distance.",
          "Convert 90 km/h to m/s.",
          "Two trains 200 m and 300 m long cross each other in 25 sec. Both moving at 72 km/h same direction. Find relative speed.",
          "A and B start from opposite ends of 120 km road at 40 and 20 km/h. When do they meet?",
          "A person walks at 5 km/h for 2 h and runs at 10 km/h for 1 h. Find total distance.",
          "A train crosses a 500 m bridge in 50 sec at 72 km/h. Find train length.",
          "Average speed for a 600 km journey: first 200 km at 50 km/h, rest at 100 km/h.",
          "A boat travels 24 km upstream in 6 h and downstream in 4 h. Find speed of stream.",
          "Two cyclists start at the same point and go in opposite directions at 15 and 25 km/h. Distance after 3 hours?",
          "A man covers a distance in 3 h less if he increases speed from 40 to 60 km/h. Find distance.",
          "Speed ratio of A:B = 3:4. Race of 400 m — by how much does B beat A?",
          "A thief is 30 metres ahead of a policeman. The thief runs at 5 m/s, policeman at 7 m/s. When caught?",
          "Aeroplane A leaves at 8:00 AM at 500 km/h. B leaves at 10:00 AM at 700 km/h. When does B overtake A?",
          "A clock gains 2 minutes every hour. Set correctly at 12:00 noon. What time does it show at 6:00 PM?",
        ],
      },
      {
        name: "Ratio & Proportion",
        questions: [
          "Simplify the ratio 48:36.",
          "If A:B = 3:4 and B:C = 5:6, find A:B:C.",
          "Divide ₹1200 in ratio 3:5:4.",
          "The ratio of milk to water is 4:1. If 5 litres of water is added, ratio becomes 2:1. Find initial milk.",
          "If 4 machines can do a job in 6 days, how many days for 3 machines?",
          "A map uses scale 1:50000. Two cities are 3 cm apart. Find actual distance.",
          "If x:y = 3:5, find (3x+2y):(x+y).",
          "Two numbers are in ratio 5:7. Their difference is 18. Find numbers.",
          "A mixture of alcohol and water is 5:2. If 21 litres of mixture is taken, find litres of water.",
          "Salary of A and B are in ratio 7:5. If both get ₹3000 hike, ratio becomes 9:7. Find salaries.",
          "Three numbers in ratio 2:3:5 sum to 400. Find the largest number.",
          "If 6 men complete a work in 4 days, how many men needed to complete in 3 days?",
          "The duplicate ratio of 3:4 is?",
          "Find the mean proportional between 16 and 100.",
          "A solution has 30% acid. How many litres of water must be added to 10 litres to make it 20%?",
        ],
      },
      {
        name: "Time & Work",
        questions: [
          "A can do a job in 10 days, B in 15 days. Together in how many days?",
          "A and B together complete in 6 days. A alone in 10 days. B alone?",
          "Pipe A fills tank in 4 h, Pipe B empties in 6 h. Both open — tank full in?",
          "10 men complete work in 12 days. After 4 days 5 men leave. Total days?",
          "A is twice as fast as B and together complete work in 12 days. A alone?",
          "A can do 1/3 of a job in 5 days. Total time for A?",
          "3 men or 5 women can finish a job in 8 days. 6 men and 5 women will finish in?",
          "A and B can do work in 18 and 24 days. They start together but A leaves after 6 days. B finishes?",
          "Two pipes fill a tank in 20 min and 30 min. A third empties it in 40 min. All three open?",
          "Work efficiency ratio of A:B = 2:3. Together they complete in 6 days. A alone?",
          "15 men complete a wall in 10 days working 8 h/day. 12 men working 10 h/day?",
          "A man, woman, child can paint a house in 3, 4, 12 days. All three together?",
          "A tap fills tank in 6 h, another in 4 h. Leakage empties in 12 h. Time to fill?",
          "40 persons can complete work in 16 days. After 8 days 10 more persons join. When done?",
          "A and B together: 6 days. B and C together: 8 days. A, B, C together: 4 days. A and C together?",
        ],
      },
      {
        name: "Simple & Compound Interest",
        questions: [
          "SI on ₹5000 at 8% pa for 3 years?",
          "CI on ₹10000 at 10% pa for 2 years, compounded annually?",
          "Find the difference between CI and SI on ₹2000 at 10% for 2 years.",
          "At what rate does ₹1000 become ₹1200 in 2 years (SI)?",
          "Principal = ₹4000. SI = ₹960 in 3 years. Find rate.",
          "In how many years does a sum double at 8% SI?",
          "CI on ₹8000 at 5% pa compounded half-yearly for 1 year?",
          "A person takes a loan of ₹5000 at 12% pa CI. Find amount after 2 years.",
          "The CI on a certain sum for 2 years at 10% is ₹420. Find SI for same period.",
          "A sum of ₹12000 is lent at 10% pa. Find difference between CI and SI after 3 years.",
          "If a sum triples in 12 years at SI, find the rate.",
          "₹2500 invested at 8% CI for 3 years — find total interest.",
          "A bank pays 6% CI compounded monthly. ₹10000 deposited for 1 year. Find amount.",
          "Two banks offer 10% SI and 9% CI. For ₹5000 over 2 years, which is better?",
          "Find the present value of ₹5000 due 3 years later at 10% pa SI.",
        ],
      },
      {
        name: "Permutations & Combinations",
        questions: [
          "Find the value of 5!",
          "How many ways can 6 books be arranged on a shelf?",
          "In how many ways can a committee of 3 be chosen from 8 people?",
          "Find P(7,3).",
          "Find C(10,4).",
          "In how many ways can TRIANGLE be arranged?",
          "A coin is tossed 3 times. Total outcomes?",
          "How many 4-digit numbers can be formed using {1,2,3,4,5} without repetition?",
          "In how many ways can 5 people sit in a row if 2 must sit together?",
          "A team of 5 is selected from 6 men and 4 women; must have exactly 2 women. Ways?",
          "How many ways to distribute 4 distinct balls into 3 distinct boxes?",
          "Number of diagonals in a hexagon?",
          "In how many ways can 8 people be seated in a circle?",
          "A bag has 5 red, 3 green, 2 blue balls. Ways to pick 2 of different color?",
          "Number of ways to arrange the letters in 'MISSISSIPPI'?",
        ],
      },
      {
        name: "Probability",
        questions: [
          "A die is rolled. P(getting 4)?",
          "A card is drawn from a deck. P(it is a king)?",
          "Two coins tossed. P(at least one head)?",
          "P(drawing a red card from a standard deck)?",
          "A bag has 5 white and 4 black balls. P(drawing black)?",
          "Two dice rolled. P(sum = 7)?",
          "P(getting a prime on a die)?",
          "A bag has 3 red, 5 green, 2 blue. P(not red)?",
          "Cards are drawn without replacement. P(both kings)?",
          "P(getting exactly 2 heads in 3 coin tosses)?",
          "If P(A) = 0.4 and P(B) = 0.3 and A, B independent, find P(A and B).",
          "A number is chosen randomly from 1–50. P(it is divisible by 6)?",
          "P(A) = 0.6, P(B|A) = 0.5. Find P(A and B).",
          "P(A∪B) if P(A)=0.5, P(B)=0.4, P(A∩B)=0.2?",
          "A card is picked from 52. What is P(either ace or spade)?",
        ],
      },
      {
        name: "Logical Reasoning – Series & Coding",
        questions: [
          "Next in series: 2, 6, 12, 20, 30, __?",
          "Find missing: 3, 9, 27, __, 243.",
          "What comes next: Z, X, V, T, __?",
          "Decode: If CAT = 24, DOG = 26, then BAT = ?",
          "If PENCIL is coded as QFODJM, what is ERASER coded as?",
          "1, 4, 9, 16, 25, __?",
          "A:Z :: B:Y :: C:__?",
          "Odd one out: 16, 25, 36, 50, 64.",
          "Series: 1, 2, 3, 5, 8, 13, __?",
          "If WATER is coded as 52, FIRE is coded as?",
          "Find the pattern: 100, 81, 64, 49, __?",
          "If NORTH = 56, SOUTH = 68, then EAST = ?",
          "Complete: ACE, BDF, CEG, __?",
          "Find missing number in matrix: [1,2,3], [4,5,6], [7,?,9]. What is ?",
          "Decode: All 'A' are 'B'. Some 'B' are 'C'. Are some 'A' definitely 'C'?",
        ],
      },
      {
        name: "Data Interpretation",
        questions: [
          "A pie chart shows 30% Sales, 25% Operations, 20% HR, 25% R&D. If total budget is ₹40L, find Sales budget.",
          "Bar graph shows sales: Jan=50, Feb=70, Mar=60, Apr=90. Find average.",
          "A table shows runs scored by batsmen: A=45, B=78, C=34, D=89, E=55. Who scored median?",
          "A line graph shows growth: 2020=100, 2021=120, 2022=150. Find % growth 2020–2022.",
          "In a bar chart, Product A sells 200 units in Q1 and 300 in Q2. Find % increase.",
          "In a pie chart, 40% of 2400 students prefer Science. How many prefer other subjects?",
          "Find ratio of men to women from table: Men=600, Women=400.",
          "Revenue table: 2019=₹5L, 2020=₹4L, 2021=₹6L, 2022=₹7L. Which year had max growth?",
          "From a double bar chart, compare sales of two companies in Q3.",
          "A histogram shows frequencies: 10-20: 5, 20-30: 10, 30-40: 15, 40-50: 8. Find modal class.",
          "Pie chart: A=72°, B=108°, C=90°, D=90°. Fraction of circle for C?",
          "If 500 candidates appear in an exam and 60% pass, how many fail?",
          "Average income from table: ₹15K, ₹18K, ₹20K, ₹22K, ₹25K. Find average.",
          "Difference between max and min values in a given bar graph.",
          "A table shows profit %: 2020=10%, 2021=15%, 2022=5%. CP=₹10000 each year. Find total profit.",
        ],
      },
      {
        name: "Verbal Ability – Reading & Vocabulary",
        questions: [
          "Find the synonym of 'Eloquent'.",
          "Antonym of 'Benevolent'?",
          "Fill in the blank: She __ (go/goes/went) to school every day.",
          "Choose the correct sentence: 'He don't know' or 'He doesn't know'?",
          "One-word substitution: A person who loves books — ?",
          "Identify the error: 'Neither of the boys have done their homework.'",
          "Correct the spelling: recieve, beleive, accomodate.",
          "Arrange into a paragraph: B, D, A, C, E — what is the correct order?",
          "Reading comprehension: After reading 3 lines, answer — what is the main idea?",
          "Idiom meaning: 'Hit the nail on the head' means?",
          "Phrase: 'Burning the midnight oil' — what does it mean?",
          "Choose correct preposition: She is good __ mathematics.",
          "Find word closest in meaning to 'Ambiguous'.",
          "What is the plural of 'thesis'?",
          "Identify type of sentence: 'What a beautiful day!'",
        ],
      },
      {
        name: "Geometry & Mensuration",
        questions: [
          "Area of a circle with radius 7 cm?",
          "Volume of a cube with side 5 cm?",
          "Perimeter of a rectangle: length=12 cm, breadth=8 cm.",
          "Find the diagonal of a square with side 6 cm.",
          "Area of triangle with base 10 and height 8?",
          "Surface area of a cylinder: r=3, h=7.",
          "Volume of a sphere with radius 6 cm?",
          "Find angle in a triangle if two angles are 65° and 45°.",
          "What is the area of an equilateral triangle with side 6?",
          "Two angles of a quadrilateral are 90° and 85°. Third is 95°. Find fourth.",
          "A rectangle has area 60 cm² and length 12 cm. Find breadth.",
          "Perimeter of a semicircle with radius 7 cm?",
          "Find curved surface area of a cone: r=5, l=13.",
          "Total surface area of a hemisphere with radius 4 cm?",
          "A ladder 10 m long leans against a wall. Base is 6 m away. How high does it reach?",
        ],
      },
      {
        name: "Clocks & Calendars",
        questions: [
          "What angle do hands of a clock make at 3:15?",
          "How many times do hour and minute hands coincide in 24 hours?",
          "At what time between 4 and 5 are hands at right angle?",
          "What day of the week was 1st Jan 2000?",
          "If today is Wednesday, what day is 100 days from now?",
          "A clock is set right at 8 AM. It gains 10 min every hour. At 1 PM same day, what time does it show?",
          "Between 6 and 7 o'clock, when are the hands opposite each other?",
          "February 2024 has how many days?",
          "What is the angle between clock hands at 6:30?",
          "On what day of the week does Independence Day (Aug 15, 2025) fall?",
          "If Feb 1 is Monday, what is Feb 28 (non-leap year)?",
          "How many Sundays are in the month of March if March 1 is Friday?",
          "At 12:30, what is the angle between the hands of a clock?",
          "A watch shows 10:10. What is the mirror image time?",
          "How many times does a clock's minute hand make in 48 hours?",
        ],
      },
      {
        name: "Blood Relations & Directions",
        questions: [
          "A is the father of B. B is the brother of C. How is A related to C?",
          "X's mother's brother is Y. How is Y related to X?",
          "If M's son is N, N's sister is O — how is O related to M?",
          "Pointing to a man, a woman says 'He is the only son of my father's wife.' Who is he?",
          "A says 'B is my mother's son.' What is B's relation to A if A is female?",
          "P walked 5 km North, turned East 4 km, then South 5 km. How far from start?",
          "A person facing South turns 90° clockwise. Which direction now?",
          "Ram goes 10 km East, then 5 km North, then 10 km West. Final direction and distance from start?",
          "Start North, turn right, turn right again, turn left. Now facing?",
          "If morning shadow falls to the West, which direction is the person facing?",
          "A is grandmother of B. C is father of B. D is son of C. How is D related to A?",
          "A couple has 4 daughters, each daughter has one brother. Total children?",
          "If X is the wife of Y and Z is the son of Y, how is Z related to X?",
          "A person walks 20 m South, turns left walks 10 m, turns left walks 20 m. Distance from start?",
          "If B is the brother of A, C is A's mother, D is C's father, E is D's mother. How is B related to D?",
        ],
      },
    ],
  },
  {
    title: "Level 2 – Programming",
    desc: "Choose Python, Java, C++, or JavaScript. 15 questions per concept.",
    concepts: [
      {
        name: "Variables, Loops & Conditionals",
        questions: [
          "Write a program to print numbers 1 to 100.",
          "Print Fibonacci series up to n terms.",
          "Check if a number is prime.",
          "Find factorial using a loop.",
          "Swap two variables without a third.",
          "Check if a number is Armstrong.",
          "Print multiplication table of n.",
          "Reverse a given number.",
          "Check if a year is a leap year.",
          "Find the sum of digits of a number.",
          "Print pattern: Right-angled triangle of stars.",
          "Find GCD using Euclidean algorithm.",
          "Categorize a number as positive, negative, or zero.",
          "Count occurrences of a digit in a number.",
          "Print all numbers divisible by 3 and 5 between 1–200.",
        ],
      },
      {
        name: "Functions & Arrays",
        questions: [
          "Write a function to find max in an array.",
          "Find second largest in an array without sorting.",
          "Rotate an array by k positions.",
          "Count even and odd numbers in an array.",
          "Merge two sorted arrays.",
          "Find duplicate elements in an array.",
          "Remove duplicates from an array.",
          "Find pair with given sum.",
          "Find the subarray with maximum sum (Kadane's algorithm).",
          "Reverse an array in place.",
          "Check if array is a palindrome.",
          "Move all zeros to end of array.",
          "Find the majority element (appears more than n/2 times).",
          "Rearrange array so positives and negatives alternate.",
          "Find the missing number in 1–n array.",
        ],
      },
      {
        name: "Strings & OOP",
        questions: [
          "Reverse a string without built-in functions.",
          "Check if a string is a palindrome.",
          "Count vowels and consonants in a string.",
          "Find the most frequent character in a string.",
          "Check if two strings are anagrams.",
          "Remove duplicates from a string.",
          "Find all permutations of a string.",
          "Replace spaces with %20 in-place.",
          "Count words in a sentence.",
          "Implement a class 'BankAccount' with deposit and withdraw methods.",
          "Demonstrate inheritance: Vehicle → Car → ElectricCar.",
          "Implement polymorphism with method overriding.",
          "Create an abstract class Shape with area().",
          "Demonstrate encapsulation with private variables.",
          "Implement a singleton design pattern.",
        ],
      },
      {
        name: "Exception Handling & File I/O",
        questions: [
          "Handle division by zero exception gracefully.",
          "Read a file and count lines.",
          "Write to a file with error handling.",
          "Read CSV file and display contents.",
          "Parse a JSON file in your language.",
          "Catch multiple exception types in one block.",
          "Create a custom exception class.",
          "Use finally block to close file/resource.",
          "Validate user input using exception handling.",
          "Write log messages to a file.",
          "Read specific lines from a large file efficiently.",
          "Serialize and deserialize an object.",
          "Count word frequency from a text file.",
          "Merge two text files into one.",
          "Delete a file after checking if it exists.",
        ],
      },
    ],
  },
  {
    title: "Level 3 – Data Structures",
    desc: "Arrays to Tries with Daily Solve & Debug.",
    concepts: [
      {
        name: "Arrays & Linked Lists",
        questions: [
          "Implement a singly linked list with insert and delete.",
          "Detect cycle in linked list (Floyd's algorithm).",
          "Reverse a linked list iteratively and recursively.",
          "Find the middle of a linked list in one pass.",
          "Merge two sorted linked lists.",
          "Remove nth node from end of list.",
          "Flatten a multilevel linked list.",
          "Find intersection point of two linked lists.",
          "Clone a linked list with random pointers.",
          "Implement doubly linked list.",
          "Sort a linked list using merge sort.",
          "Check if linked list is palindrome.",
          "Delete nodes with given value.",
          "Segregate even and odd nodes.",
          "Find kth element from end.",
        ],
      },
      {
        name: "Stack & Queue",
        questions: [
          "Implement stack using arrays.",
          "Implement queue using two stacks.",
          "Evaluate postfix expression.",
          "Check balanced parentheses.",
          "Implement min-stack (stack that returns min in O(1)).",
          "Implement circular queue.",
          "Next greater element using stack.",
          "Largest rectangle in histogram.",
          "Implement deque (double-ended queue).",
          "Sort stack using recursion.",
          "Reverse a queue using a stack.",
          "Sliding window maximum using deque.",
          "Implement LRU Cache.",
          "Implement priority queue.",
          "Valid queue sequences.",
        ],
      },
      {
        name: "Hash Tables & Trees",
        questions: [
          "Implement hash map from scratch.",
          "Find two numbers with given sum using hashing.",
          "Count frequency of each element.",
          "Find first non-repeating character.",
          "Group anagrams together.",
          "Implement a Binary Tree with insert and inorder traversal.",
          "Find height of a binary tree.",
          "Level order traversal (BFS).",
          "Check if tree is balanced.",
          "Find LCA of two nodes.",
          "Count nodes in a complete binary tree.",
          "Serialize and deserialize a binary tree.",
          "Zigzag level order traversal.",
          "Find diameter of binary tree.",
          "Check if two trees are identical.",
        ],
      },
      {
        name: "BST, Heap, Graph & Trie",
        questions: [
          "Implement BST insert, search, delete.",
          "Validate if a tree is a valid BST.",
          "Find kth smallest element in BST.",
          "Implement min-heap and max-heap.",
          "Find kth largest using heap.",
          "Implement Dijkstra's algorithm.",
          "Detect cycle in directed graph.",
          "BFS and DFS traversal.",
          "Topological sort.",
          "Implement Trie with insert and search.",
          "Word search in a 2D grid using Trie.",
          "Number of islands (graph problem).",
          "Prim's algorithm for MST.",
          "Kruskal's algorithm.",
          "Longest word in dictionary using Trie.",
        ],
      },
    ],
  },
  {
    title: "Level 4 – Algorithms",
    desc: "Sorting, Recursion, DP, and Graph Algorithms.",
    concepts: [
      {
        name: "Sorting & Searching",
        questions: [
          "Implement bubble sort.",
          "Implement merge sort.",
          "Implement quicksort with partition.",
          "Binary search on sorted array.",
          "Find first and last position of element.",
          "Search in rotated sorted array.",
          "Find square root using binary search.",
          "Implement counting sort.",
          "Implement radix sort.",
          "Three-way partition (Dutch national flag).",
          "Find median of two sorted arrays.",
          "Kth largest using quickselect.",
          "Sort nearly sorted array.",
          "Find peak element.",
          "Minimize maximum distance between gas stations.",
        ],
      },
      {
        name: "Dynamic Programming",
        questions: [
          "Fibonacci with memoization.",
          "0/1 Knapsack problem.",
          "Longest Common Subsequence.",
          "Longest Increasing Subsequence.",
          "Coin Change problem.",
          "Edit Distance (Levenshtein).",
          "Matrix Chain Multiplication.",
          "Subset Sum problem.",
          "Rod Cutting problem.",
          "Maximum profit in stock (multi transactions).",
          "Palindrome Partitioning.",
          "Word Break problem.",
          "Minimum path sum in grid.",
          "Egg Drop problem.",
          "Wildcard Pattern Matching.",
        ],
      },
    ],
  },
  {
    title: "Level 5 – SQL & Databases",
    desc: "Database Basics to Window Functions & Transactions.",
    concepts: [
      {
        name: "CRUD & Joins",
        questions: [
          "Write SQL to create a table with primary key.",
          "Insert 3 records into an employee table.",
          "Update salary of employee with id=5.",
          "Delete record where department='HR'.",
          "SELECT employees with salary > 50000.",
          "Write an INNER JOIN between Orders and Customers.",
          "LEFT JOIN to find customers with no orders.",
          "Find duplicate emails in a table.",
          "GROUP BY department and find average salary.",
          "HAVING clause: departments with more than 5 employees.",
          "Use subquery to find second highest salary.",
          "Rank employees by salary using RANK().",
          "Find employees hired in the last 30 days.",
          "Write a self-join to find manager names.",
          "Create an index and explain why.",
        ],
      },
    ],
  },
  {
    title: "Level 6 – Core CS",
    desc: "DBMS, OS, Computer Networks, and OOP.",
    concepts: [
      {
        name: "DBMS",
        questions: [
          "What is ACID in databases?",
          "Explain normalization up to 3NF.",
          "What is the difference between DELETE, TRUNCATE, and DROP?",
          "What are indexes and when should you use them?",
          "Explain transaction isolation levels.",
          "What is a deadlock? How to prevent it?",
          "Difference between clustered and non-clustered index.",
          "What is a view in SQL?",
          "Explain stored procedures vs functions.",
          "What is a trigger? Give an example.",
          "Difference between OLAP and OLTP.",
          "What is a foreign key constraint?",
          "Explain the ER diagram with an example.",
          "What is sharding in databases?",
          "Explain CAP theorem.",
        ],
      },
      {
        name: "Operating Systems",
        questions: [
          "What is a process vs a thread?",
          "Explain Round Robin scheduling.",
          "What is deadlock? List necessary conditions.",
          "Explain paging and segmentation.",
          "What is virtual memory?",
          "Difference between mutex and semaphore.",
          "Explain the producer-consumer problem.",
          "What is context switching?",
          "What are system calls?",
          "Explain LRU page replacement.",
          "What is thrashing?",
          "What is a zombie process?",
          "Difference between preemptive and non-preemptive scheduling.",
          "What is a critical section?",
          "Explain Banker's algorithm.",
        ],
      },
      {
        name: "Computer Networks",
        questions: [
          "Explain the OSI model with all 7 layers.",
          "What is TCP vs UDP?",
          "How does HTTP work?",
          "What is DNS and how does it resolve a domain?",
          "Explain the 3-way handshake.",
          "What is NAT (Network Address Translation)?",
          "Difference between HTTP and HTTPS.",
          "What is a subnet mask?",
          "Explain ARP and its role.",
          "What is a firewall?",
          "What is DHCP?",
          "Difference between hub, switch, and router.",
          "Explain socket programming.",
          "What is a REST API?",
          "How does HTTPS ensure security? (TLS/SSL)",
        ],
      },
    ],
  },
  {
    title: "Level 7 – Web Development",
    desc: "Frontend, Backend, DB, Cloud, and Deployment.",
    concepts: [
      {
        name: "Frontend (HTML/CSS/JS/React)",
        questions: [
          "What is the DOM and how does JavaScript interact with it?",
          "Difference between == and ===.",
          "What is event bubbling and capturing?",
          "Explain closures with an example.",
          "What are promises and async/await?",
          "What is a React hook? List the most common ones.",
          "Difference between useState and useReducer.",
          "Explain React's virtual DOM.",
          "What is CSS Flexbox vs Grid?",
          "What is responsive design?",
          "How does localStorage differ from sessionStorage?",
          "Explain debouncing and throttling.",
          "What is CORS and how to fix it?",
          "Explain lazy loading in React.",
          "What is a Higher-Order Component?",
        ],
      },
    ],
  },
  {
    title: "Level 8 – AI & Cloud",
    desc: "Machine Learning, Gen AI, AWS, Kubernetes.",
    concepts: [
      {
        name: "Machine Learning Fundamentals",
        questions: [
          "What is overfitting and how do you prevent it?",
          "Explain bias-variance tradeoff.",
          "Difference between supervised and unsupervised learning.",
          "What is gradient descent?",
          "Explain the confusion matrix.",
          "What is regularization (L1 vs L2)?",
          "What is a neural network?",
          "Explain K-means clustering.",
          "What is cross-validation?",
          "Difference between bagging and boosting.",
          "What is a decision tree?",
          "Explain SVM intuitively.",
          "What is the ROC curve?",
          "How does backpropagation work?",
          "What is transfer learning?",
        ],
      },
    ],
  },
  {
    title: "Level 9 – Projects",
    desc: "Build Beginner → Intermediate → Advanced projects.",
    concepts: [
      {
        name: "Project Phases",
        questions: [
          "Plan a Todo app — list all features.",
          "Design database schema for a blog app.",
          "Implement authentication (JWT) for an API.",
          "Build a RESTful CRUD API for products.",
          "Integrate payment gateway in e-commerce.",
          "Design real-time chat with WebSockets.",
          "Implement search with Elasticsearch.",
          "Build a recommendation engine (collaborative filtering).",
          "Deploy app on AWS EC2 with Nginx.",
          "Containerize app using Docker.",
          "Set up CI/CD pipeline.",
          "Implement rate limiting on an API.",
          "Write unit and integration tests.",
          "Set up monitoring and logging.",
          "Build and deploy a full-stack AI SaaS product.",
        ],
      },
    ],
  },
  {
    title: "Level 10 – Resume Builder",
    desc: "ATS Resume, Portfolio, GitHub, LinkedIn.",
    concepts: [
      {
        name: "Resume & Branding",
        questions: [
          "Write your professional summary in 3 sentences.",
          "List 5 quantifiable achievements for your resume.",
          "Identify keywords for your target role.",
          "Format your GitHub profile README.",
          "Write a LinkedIn headline and about section.",
          "Choose the right resume template for ATS.",
          "Get ATS score above 80% using the tool.",
          "Export resume in PDF, DOCX, and JSON.",
          "Write cover letter for a FAANG application.",
          "List 5 strong action verbs for your resume.",
          "Review and improve your online portfolio.",
          "Add metrics to every bullet point.",
          "Tailor resume for three different companies.",
          "Request recommendations on LinkedIn.",
          "Publish a technical blog post for credibility.",
        ],
      },
    ],
  },
  {
    title: "Level 11 – Coding Practice",
    desc: "Daily Easy/Med/Hard, Weekly Contests.",
    concepts: [
      {
        name: "Daily Challenges",
        questions: [
          "Solve 1 easy LeetCode problem.",
          "Solve 1 medium LeetCode problem.",
          "Review solution of a hard problem.",
          "Explain time and space complexity of your solution.",
          "Optimize a brute-force to O(n log n).",
          "Solve a sliding window problem.",
          "Solve a two-pointer problem.",
          "Solve a graph BFS problem.",
          "Solve a DP problem from scratch.",
          "Participate in a weekly LeetCode contest.",
          "Write test cases for your solution.",
          "Code review with AI mentor.",
          "Solve a greedy problem.",
          "Solve a bit manipulation problem.",
          "Explain your solution in an interview style.",
        ],
      },
    ],
  },
  {
    title: "Level 12 – Communication Skills",
    desc: "English Speaking, HR, Group Discussions, Emails.",
    concepts: [
      {
        name: "HR & Communication",
        questions: [
          "Introduce yourself in 60 seconds.",
          "Answer: What is your greatest strength?",
          "Answer: Where do you see yourself in 5 years?",
          "Answer: Why do you want to join this company?",
          "Answer: Describe a challenge you overcame.",
          "Practice a group discussion on 'AI in Education'.",
          "Write a formal email requesting an interview.",
          "Write a thank-you email after an interview.",
          "Practice salary negotiation conversation.",
          "Answer: What is your biggest weakness?",
          "Record yourself speaking for 2 minutes and review.",
          "Practice STAR method for a behavioral question.",
          "Conduct a mock group discussion with peers.",
          "Write a professional LinkedIn connection message.",
          "Answer: Why should we hire you over others?",
        ],
      },
    ],
  },
  {
    title: "Level 13 – Mock Interview",
    desc: "HR, Technical, Coding, and System Design rounds.",
    concepts: [
      {
        name: "All Interview Rounds",
        questions: [
          "HR Round: Tell me about yourself.",
          "Technical: Explain OOPS in 2 minutes.",
          "Technical: Difference between process and thread?",
          "Technical: How would you design Twitter?",
          "Coding: Solve Two Sum live.",
          "Coding: Reverse a linked list live.",
          "System Design: Design URL Shortener.",
          "System Design: Design WhatsApp.",
          "HR: Salary negotiation roleplay.",
          "Behavioral: Tell me about a failure.",
          "Aptitude: Solve 5 problems in 10 minutes.",
          "Technical: SQL query — find top 3 salaries.",
          "Coding: Implement LRU cache.",
          "System Design: Design a parking lot system.",
          "Final: Mock full interview (60 min) with AI scoring.",
        ],
      },
    ],
  },
  {
    title: "Level 14 – Company Preparation",
    desc: "Google, Microsoft, Amazon, Meta, Zoho, TCS, Infosys...",
    concepts: [
      {
        name: "FAANG & MNC Specific",
        questions: [
          "Google: Solve a hard graph problem.",
          "Google: System Design — Design Google Maps.",
          "Microsoft: Explain Azure architecture.",
          "Amazon: STAR behavioral question (leadership principle).",
          "Amazon: Design Amazon's recommendation system.",
          "Meta: Explain React fiber architecture.",
          "Meta: Design Instagram feed.",
          "Zoho: Solve aptitude test — 30 questions in 30 min.",
          "TCS: NQT pattern — Verbal + Quant + Coding.",
          "Infosys: Infytq coding challenge.",
          "Wipro: NLTH pattern analysis.",
          "Cognizant: GenC pattern practice.",
          "Capgemini: Game-based assessment prep.",
          "Accenture: Cognitive and technical assessment.",
          "Practice a full company-specific mock test.",
        ],
      },
    ],
  },
  {
    title: "Level 15 – Placement Ready 🏆",
    desc: "Final AI Evaluation & Readiness Score (0–100%).",
    concepts: [
      {
        name: "Final Assessment",
        questions: [
          "Final Aptitude mock test — 30 questions.",
          "Final DSA challenge — solve 3 problems.",
          "Final SQL test — 5 advanced queries.",
          "Final Core CS quiz — 20 questions.",
          "Final communication round — 10 minute mock.",
          "Get your Placement Readiness Score from AI.",
          "Review AI recommendations for weak areas.",
          "Apply to 5 target companies.",
          "Schedule mock interviews with peers.",
          "Update resume and portfolio with all new projects.",
          "Finalize LinkedIn profile.",
          "Request 3 LinkedIn recommendations.",
          "Attend a placement drive or hackathon.",
          "Negotiate your offer confidently.",
          "Celebrate 🎉 — You are Placement Ready!",
        ],
      },
    ],
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────
interface SyllabusModuleProps {
  completedModules: number;
  onSelectConcept?: (conceptName: string, levelName: string) => void;
  syllabusData?: any[] | null;
}

export default function SyllabusModule({ completedModules, onSelectConcept, syllabusData }: SyllabusModuleProps) {
  const activeSyllabus = syllabusData && syllabusData.length > 0 ? syllabusData : syllabus;
  const [expandedPhase, setExpandedPhase] = useState<number | null>(0);
  const [expandedConcept, setExpandedConcept] = useState<string | null>(null);

  const { checkedItems, history, loading, calculating, toggleItem, calculateScore } = usePlacementReadiness();

  return (
    <div className="p-6 rounded-3xl border border-border bg-white/5 backdrop-blur-sm max-h-[85vh] overflow-y-auto custom-scrollbar">
      <div className="sticky top-0 bg-background/95 backdrop-blur-md pt-2 pb-6 z-20 border-b border-white/5 mb-6">
        <h2 className="text-2xl font-display mb-1">Career Roadmap</h2>
        <p className="text-sm text-muted-foreground">
          Phase 0 → Level 15 · Read, Solve & Master before unlocking next level.
        </p>
      </div>

      <div className="space-y-2 relative">
        <div className="absolute left-[23px] top-4 bottom-4 w-0.5 bg-white/10" />

        {activeSyllabus.map((phase, i) => {
          const isCompleted = i < completedModules;
          const isActive = i === completedModules;
          const isLocked = i > completedModules;
          const isExpanded = expandedPhase === i;

          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`relative flex gap-4 items-start p-2 rounded-2xl transition-colors ${
                isLocked ? "opacity-60" : isActive ? "bg-blue-500/5" : "hover:bg-white/5"
              }`}
            >
              {/* Status Icon */}
              <div className="bg-background relative z-10 pt-1 shrink-0">
                {isCompleted ? (
                  <CheckCircle2 className="text-green-500 bg-background" size={28} />
                ) : isActive ? (
                  <Circle className="text-blue-400 fill-blue-400/20 bg-background" size={28} />
                ) : (
                  <Lock className="text-muted-foreground p-1.5 border border-white/20 rounded-full bg-background" size={28} />
                )}
              </div>

              <div className="flex-1 pb-2">
                {/* Phase Header */}
                <div
                  className="cursor-pointer select-none"
                  onClick={() => setExpandedPhase(isExpanded ? null : i)}
                >
                  <div className="flex justify-between items-center">
                    <h3 className={`text-base font-semibold ${isActive ? "text-blue-400" : "text-foreground"}`}>
                      {phase.title}
                    </h3>
                    {isExpanded ? (
                      <ChevronUp size={16} className="text-muted-foreground" />
                    ) : (
                      <ChevronDown size={16} className="text-muted-foreground" />
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed pr-4">
                    {phase.desc}
                  </p>
                </div>

                {/* Placement Readiness Panel (Level 15 only) */}
                {i === 15 && isExpanded && (
                  <div className="mt-4 p-5 rounded-2xl border border-blue-500/30 bg-blue-500/5 mb-4">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h4 className="text-lg font-bold text-blue-400">Placement Readiness</h4>
                        <p className="text-xs text-muted-foreground mt-1">Check off the items below, then get your AI score.</p>
                      </div>
                      <button
                        onClick={() => calculateScore(phase.concepts.reduce((acc: number, c: any) => acc + c.questions.length, 0))}
                        disabled={calculating || loading}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-sm font-semibold rounded-lg flex items-center gap-2 transition-colors"
                      >
                        {calculating ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16} />}
                        Get My Readiness Score
                      </button>
                    </div>

                    {history.length > 0 && (
                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                          <div className="flex items-end gap-3 mb-2">
                            <span className="text-3xl font-bold text-green-400">{history[0].score}%</span>
                            <span className="text-sm text-muted-foreground pb-1">Current Readiness Score</span>
                          </div>
                          <p className="text-sm text-gray-200 leading-relaxed">{history[0].recommendation}</p>
                        </div>
                        
                        {history.length > 1 && (
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs text-muted-foreground py-1 mr-2">History:</span>
                            {history.slice(1, 4).map((h) => (
                              <div key={h.id} className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400">
                                {h.score}% <span className="opacity-50">({new Date(h.calculated_at).toLocaleDateString()})</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {/* Expanded Concepts */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden mt-4"
                    >
                      <div className="space-y-3">
                        {phase.concepts.map((concept: any, ci: number) => {
                          const key = `${i}-${ci}`;
                          const conceptOpen = expandedConcept === key;
                          return (
                            <div key={ci} className="rounded-xl border border-white/10 bg-white/5 overflow-hidden">
                              {/* Concept Row */}
                              <button
                                className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/5 transition-colors"
                                onClick={() => setExpandedConcept(conceptOpen ? null : key)}
                              >
                                <div className="flex items-center gap-2">
                                  <BookOpen size={14} className="text-blue-400 shrink-0" />
                                  <span className="text-sm font-medium">{concept.name}</span>
                                  <span className="text-xs text-muted-foreground bg-white/10 px-2 py-0.5 rounded-full">
                                    {concept.questions.length} Q
                                  </span>
                                </div>
                                {conceptOpen ? (
                                  <ChevronUp size={14} className="text-muted-foreground shrink-0" />
                                ) : (
                                  <ChevronDown size={14} className="text-muted-foreground shrink-0" />
                                )}
                              </button>

                              {/* Questions List */}
                              <AnimatePresence>
                                {conceptOpen && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="border-t border-white/10 pt-3 px-4 pb-3 space-y-3">
                                      <div className="flex justify-end">
                                        <button
                                          onClick={() => onSelectConcept?.(concept.name, phase.title)}
                                          className="text-xs px-3.5 py-1.5 rounded-full bg-blue-500 hover:bg-blue-600 text-white font-semibold flex items-center gap-1 transition-colors"
                                        >
                                          <Zap size={12} /> Start Learning Flow
                                        </button>
                                      </div>
                                      <ol className="space-y-2">
                                        {concept.questions.map((q: any, qi: number) => {
                                          const itemId = `${phase.title}-${concept.name}-${qi}`;
                                          const isChecked = checkedItems[itemId] || false;
                                          return (
                                            <li key={qi} className="flex gap-3 text-xs text-gray-300 leading-relaxed items-start">
                                              {i === 15 ? (
                                                <button
                                                  onClick={() => toggleItem(itemId, isChecked)}
                                                  className={`mt-0.5 w-4 h-4 rounded-sm border shrink-0 flex items-center justify-center transition-colors ${isChecked ? "bg-blue-500 border-blue-500" : "border-gray-500 hover:border-gray-400"}`}
                                                >
                                                  {isChecked && <CheckCircle2 size={12} className="text-white" />}
                                                </button>
                                              ) : (
                                                <span className="text-blue-400 font-mono shrink-0 w-5">{qi + 1}.</span>
                                              )}
                                              <span className={i === 15 && isChecked ? "line-through opacity-50 transition-opacity" : ""}>{q}</span>
                                              {i !== 15 && <HelpCircle size={12} className="text-muted-foreground shrink-0 mt-0.5 ml-auto" />}
                                            </li>
                                          );
                                        })}
                                      </ol>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
