// CSE branch — full syllabus for all role tracks.
export type SyllabusItem = { id: string; title: string; type: "concept" | "checklist" | "resource" };
export type SyllabusLevel = { id: string; level: number; title: string; description: string; items: SyllabusItem[] };

export const CSE_SYLLABUS: Record<string, SyllabusLevel[]> = {
  "cse-sde": [
    { id: "l1", level: 1, title: "DSA Foundations", description: "Core data structures and algorithms",
      items: [
        { id: "i1", title: "Arrays, strings, hashing", type: "concept" },
        { id: "i2", title: "Trees, graphs, recursion", type: "concept" },
        { id: "i3", title: "Solve 100 DSA problems", type: "checklist" },
      ] },
    { id: "l2", level: 2, title: "System Design", description: "Designing scalable systems",
      items: [
        { id: "i1", title: "Load balancing, caching, sharding", type: "concept" },
        { id: "i2", title: "Design 3 systems (URL shortener, chat app, feed)", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "2 mock technical rounds + 1 HR round", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "cse-backend": [
    { id: "l1", level: 1, title: "Backend Fundamentals", description: "APIs and data",
      items: [
        { id: "i1", title: "REST API design, HTTP semantics", type: "concept" },
        { id: "i2", title: "SQL vs NoSQL databases", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Scalability", description: "Building for scale",
      items: [
        { id: "i1", title: "Caching (Redis), message queues", type: "concept" },
        { id: "i2", title: "Build 1 production-style backend service", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "System design mock: design a backend for a food delivery app", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "cse-frontend": [
    { id: "l1", level: 1, title: "Frontend Fundamentals", description: "Core web technologies",
      items: [
        { id: "i1", title: "HTML/CSS/JS fundamentals, DOM", type: "concept" },
        { id: "i2", title: "React fundamentals: components, hooks, state", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Performance & Architecture", description: "Building at scale",
      items: [
        { id: "i1", title: "Rendering performance, code splitting", type: "concept" },
        { id: "i2", title: "Build 2 production-quality UI projects", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Live coding round: build a component under time pressure", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "cse-fullstack": [
    { id: "l1", level: 1, title: "Full Stack Foundations", description: "End to end app basics",
      items: [
        { id: "i1", title: "Frontend + backend integration, REST/GraphQL", type: "concept" },
        { id: "i2", title: "Auth flows: JWT, sessions, OAuth", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Deployment & DevOps Basics", description: "Shipping a full app",
      items: [
        { id: "i1", title: "CI/CD basics, Docker", type: "checklist" },
        { id: "i2", title: "Build 1 full-stack app with auth + DB + deployment", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: explain your full-stack project end to end", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "cse-data-engineer": [
    { id: "l1", level: 1, title: "Data Engineering Foundations", description: "Pipelines and storage",
      items: [
        { id: "i1", title: "SQL mastery, data modeling", type: "concept" },
        { id: "i2", title: "ETL vs ELT concepts", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Big Data Tooling", description: "Scaling data pipelines",
      items: [
        { id: "i1", title: "Spark/Airflow basics", type: "concept" },
        { id: "i2", title: "Build 1 end-to-end data pipeline", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: design a data pipeline for clickstream data", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "cse-devops": [
    { id: "l1", level: 1, title: "DevOps Foundations", description: "Core practices",
      items: [
        { id: "i1", title: "Linux, shell scripting, networking basics", type: "concept" },
        { id: "i2", title: "Git workflows, CI/CD concepts", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Cloud & Containers", description: "Infra at scale",
      items: [
        { id: "i1", title: "Docker, Kubernetes fundamentals", type: "checklist" },
        { id: "i2", title: "Infra-as-code (Terraform)", type: "concept" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: design a CI/CD pipeline for a microservices app", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
};
