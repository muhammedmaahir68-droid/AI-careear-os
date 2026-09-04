# 🚀 CARVEX — Autonomous AI Career Operating System

> An enterprise-grade, Duolingo-style career intelligence platform for engineering students across 9 departments and 47+ roles — featuring an autonomous ReAct multi-agent loop, real-time AI Voice Tutor (TTS/STT), CleanStudyContent NLP engine, 24-course independent learning hub, and Kubernetes-ready cloud architecture.

[![Live Demo](https://img.shields.io/badge/Live_App-carvexapp.vercel.app-7C3AED?style=for-the-badge&logo=vercel)](https://carvexapp.vercel.app)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)](https://www.docker.com/)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-Orchestrated-326CE5?style=for-the-badge&logo=kubernetes)](https://kubernetes.io/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-4EA94B?style=for-the-badge&logo=mongodb)](https://www.mongodb.com/)

---

## 🌐 Live Production Deployment
- **Official App**: [**carvexapp.vercel.app**](https://carvexapp.vercel.app)
- **Portfolio**: [**mohamed-maahir-portfolio.vercel.app**](https://mohamed-maahir-portfolio.vercel.app/)

---

## ⚡ Newly Added Upgrades & Major Features

### 1. 🎙️ AI Voice Tutor Engine (TTS & STT)
- **Hands-Free Audio Learning**: Integrated text-to-speech engine powered by the browser's native `Web Speech API` (`SpeechSynthesis`), allowing students to listen to study materials, lessons, and code explanations without eye strain.
- **Dynamic Playback Controls**: Real-time Play, Pause, Resume, and Stop controls with 4 selectable speeds (`0.75x`, `1.0x`, `1.25x`, `1.5x`).
- **Speech-to-Text Vocal Input**: Built-in microphone listener (`SpeechRecognition`) enabling students to speak questions aloud directly to Maahir AI.

### 2. 🧠 CleanStudyContent NLP Rendering Engine
- **Hashtag-Free Textbook Content**: Custom NLP parser that cleans raw markdown `#`, `##`, and `###` artifacts and restructures raw content into semantic, readable cards.
- **Visual Step Flowcharts**: Automatically extracts sequential procedure steps and renders them into interactive visual flowchart step cards.
- **Structured Knowledge Blocks**: Color-coded cards for *Core Theory*, *Step-by-Step Execution*, *Code Implementation*, *Intuitive Analogies*, and *Key Takeaways*.

### 3. 🤖 Autonomous ReAct Multi-Agent Maahir AI
- **Self-Built ReAct Agent Loop**: Autonomous *Thought → Action → Observation → Final Answer* execution loop built without external agent framework bloat.
- **5 Specialized Agent Personas**:
  - 🎓 **Placement Coach**: Technical interview preparation, MNC hiring patterns, HR round advice.
  - 💻 **Code Expert**: Algorithmic problem-solving, bug diagnostics, code review, complexity analysis.
  - 📄 **Resume Specialist**: ATS scoring tips, bullet point optimization, tech stack alignment.
  - 🌐 **Web Research Agent**: Live technical search and documentation lookup.
  - 📊 **Data Analyst**: Explanatory data insights, mathematics, and statistical concepts.
- **In-Browser Sandbox Tools**: In-memory calculator, live JavaScript code executor, web search tool, and system environment inspector.

### 4. 📚 24+ Independent Courses Hub
- **Global Catalog**: 24+ global engineering and emerging tech courses accessible independently:
  - *C Programming, Java, Python, DSA, AI/ML, TensorFlow, PyTorch, AI Agents Building, RAG Systems, Agentic AI, HR Management, Data Analytics with GenAI, Data Science, Cloud Computing, Cybersecurity, DevOps, System Design, Blockchain, Full-Stack Web Development, Embedded Systems, IoT, Mobile App Development, etc.*
- **12-Language Video Tutorials**: Multi-language curated YouTube tutorials per course (English, Hindi, Tamil, Telugu, Kannada, Malayalam, Bengali, Marathi, Gujarati, Spanish, French, German).
- **Independent from Role Path**: Courses live in a dedicated global hub that does not overwrite the student's primary degree roadmap.

### 5. 💻 6-Tab Interactive Lesson Engine
- Dedicated 6-tab interactive study system per module topic:
  - 📖 **Learn**: In-depth theoretical concepts with visual breakdowns and real-world analogies.
  - 💻 **Code**: Syntax, boilerplate, clean implementations, and edge-case handling.
  - 🐞 **Debug**: Buggy code snippet challenge with hints and verified fix.
  - ❓ **Quiz**: Interactive multiple-choice questions with instant scoring and explanations.
  - 🛠️ **Practice**: Real-world challenge prompts for hands-on application.
  - 🎯 **Interview**: Curated MNC interview questions from Google, Amazon, Microsoft, and TCS.

### 6. 🏢 Tappable MNC Interview Questions Modal
- Located right adjacent to YouTube video lessons in both the Learning Game Path and Daily Challenge modules.
- **3 Comprehensive Tabs**:
  - 💻 **Online Assessment (OA)**: Real coding problems with time/space complexity constraints.
  - ❓ **Interview Questions**: Technical round conceptual questions with high-scoring answers.
  - 📋 **Hiring Rounds Breakdown**: Complete step-by-step round flow (Aptitude → Technical I → Technical II → HR).

### 7. 🧭 Department & Role Switcher
- Added a top switcher bar in `BranchRolePicker` allowing students to toggle between:
  - **[Select Department & Career Role]** — Official personalized curriculum.
  - **[Learn Independent Courses]** — Global courses catalog.

### 8. 🧬 9 Engineering Departments & 47+ Career Roles
- **CSE**: Software Development, Backend Engineering, Full-Stack, Systems.
- **IT**: Cloud Architecture, DevOps, Cybersecurity, Database Administration.
- **AIML**: Machine Learning Engineer, Deep Learning Specialist, NLP Engineer, MLOps.
- **AIDS**: Data Scientist, BI Analyst, Big Data Engineer.
- **ECE**: VLSI Design, Embedded Systems, Wireless Communication, Signal Processing.
- **EEE**: Power Systems, Electric Vehicles, Power Electronics, Smart Grid.
- **MECH**: Thermal Engineering, CAD/CAM, Robotics, Automotive Dynamics.
- **Bio-Technology**: Bioinformatics Analyst, Pharma R&D, Biomedical Engineering.
- **Internet of Things (IoT)**: IoT Developer, Edge Computing Engineer, Firmware Engineer.

---

## 🏛️ System Architecture

```
CARVEX-AI-CAREER-OS/
├── ascend/                           # React 18 + Vite Frontend (Vercel)
│   ├── src/
│   │   ├── components/
│   │   │   ├── AIVoiceTutorBar.tsx   # TTS/STT Voice Controller Bar
│   │   │   ├── CleanStudyContent.tsx # NLP Parser & Visual Flowchart Engine
│   │   │   ├── MaahirAIPanel.tsx     # Autonomous ReAct Multi-Agent AI
│   │   │   ├── CoursesHub.tsx        # 24-Course Independent Catalog
│   │   │   ├── CourseLessonViewer.tsx# 6-Tab Interactive Lesson Module
│   │   │   ├── CourseDetailModal.tsx # Course Syllabus & Video Viewer
│   │   │   ├── CompanyQuestionsModal.tsx # Tappable MNC Questions Modal
│   │   │   ├── LearningGamePath.tsx  # Gamified Duolingo-style Career Map
│   │   │   ├── DailyChallenge.tsx    # Daily Practice & Streak System
│   │   │   └── BranchRolePicker.tsx  # Department & Course Switcher
│   │   ├── services/
│   │   │   ├── aiVoiceTutor.ts       # Singleton Web Speech API Service
│   │   │   └── api.ts                # Backend & MongoDB API Client
│   │   └── data/
│   │       ├── branchModules/        # 9 Engineering Departments & 47 Roles
│   │       ├── coursesData.ts        # 24+ Independent Courses
│   │       └── companyData.ts        # MNC Placement & OA Question Bank
│   └── Dockerfile                    # Multi-stage Nginx production build
├── backend/                          # Node.js + Express + TypeScript API
│   ├── src/
│   │   ├── models/                   # Lesson, Question, Module, User, Progress
│   │   ├── routes/                   # auth, lessons, questions, progress
│   │   └── scripts/seed.ts           # Massive seed ingestion
│   └── Dockerfile                    # Multi-stage Node.js container
├── k8s/                              # Production Kubernetes Manifests
│   ├── namespace.yaml
│   ├── mongodb-statefulset.yaml
│   ├── backend-deployment.yaml
│   ├── frontend-deployment.yaml
│   └── ingress.yaml
├── docker-compose.yml                # Full local multi-container stack
└── vercel.json                       # Frontend deployment config
```

---

## ⚡ Quick Start (Local Development)

```bash
# 1. Clone repository
git clone https://github.com/muhammedmaahir68-droid/carvex.git
cd carvex

# 2. Run with Docker Compose (Full Stack)
docker-compose up --build

# OR Run Frontend locally:
cd ascend
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 📄 License
This project is licensed under the MIT License.

---

<div align="center">
  <sub>Engineered with ❤️ by <b>Mohamed Maahir M</b> — <a href="https://mohamed-maahir-portfolio.vercel.app/">Official Portfolio</a></sub>
</div>
