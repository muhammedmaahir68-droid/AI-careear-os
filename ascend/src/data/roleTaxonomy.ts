// Master Role Taxonomy Architecture for CARVEX AI Career OS

export interface ProjectDef {
  title: string;
  description: string;
  technologies: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Capstone";
  realWorldImpact: string;
  githubTemplateUrl?: string;
}

export interface RoleTaxonomy {
  id: string;
  name: string;
  departmentId: string;
  careerObjective: string;
  industryDemand: "High" | "Very High" | "Critical" | "Explosive";
  avgSalaryRange: string;
  jobResponsibilities: string[];
  requiredSkills: string[];
  coreSubjects: string[];
  roleSpecificDSA: string[];
  roleSpecificCoding: string[];
  tools: string[];
  frameworks: string[];
  industrySystems: string[];
  certifications: string[];
  targetCompanies: string[];
  beginnerProjects: ProjectDef[];
  intermediateProjects: ProjectDef[];
}

export const ROLE_TAXONOMY_MAP: Record<string, Partial<RoleTaxonomy>> = {
  "cse-sde": {
    id: "cse-sde",
    name: "Software Development Engineer (Product-based)",
    departmentId: "cse",
    careerObjective: "Architect scalable software products, build high-performance data structures, and crack top product MNC technical rounds.",
    industryDemand: "Critical",
    avgSalaryRange: "$110k - $190k / ₹18L - ₹45L",
    jobResponsibilities: [
      "Design and write clean, modular, production-ready code in C++, Java, Python, or Go",
      "Optimize core algorithmic time/space complexity for distributed services",
      "Conduct code reviews, write comprehensive unit tests, and maintain 99.9% uptime",
      "Collaborate with product managers and system architects on feature RFCs"
    ],
    requiredSkills: ["Data Structures & Algorithms", "System Design (HLD & LLD)", "Object-Oriented Programming", "SQL & Database Indexing", "Concurrency & Multithreading", "Git & CI/CD"],
    coreSubjects: ["Data Structures & Algorithms", "Operating Systems", "Database Management Systems", "Computer Networks", "Low-Level Design (LLD)", "High-Level System Design"],
    roleSpecificDSA: ["Two Pointers & Sliding Window", "Monotonic Stacks & Queues", "Binary Search & Lower/Upper Bounds", "Graph Algorithms (BFS/DFS, Dijkstra, Topological Sort)", "Dynamic Programming (Knapsack, LCS, LIS)", "Trie & Disjoint Set Union (DSU)"],
    roleSpecificCoding: ["LeetCode Medium/Hard Patterns", "Concurrency Lock Mechanisms", "LRU Cache Implementation", "Custom Serialization & Deserialization", "In-Memory Key-Value Store"],
    tools: ["Git", "Docker", "IntelliJ IDEA", "Postman", "GDB", "VS Code"],
    frameworks: ["Spring Boot", "React", "Node.js", "JUnit", "gRPC"],
    industrySystems: ["High-Throughput Web Services", "Microservices Architectures", "In-Memory Caches", "Distributed Storage Engine"],
    certifications: ["AWS Certified Developer Associate", "Oracle Certified Professional Java SE"],
    targetCompanies: ["Google", "Amazon", "Microsoft", "Meta", "Apple", "Adobe"],
    beginnerProjects: [
      { title: "CLI File Compression Tool", description: "Huffman coding based file compressor in C++/Java.", technologies: ["C++", "Bit Manipulation"], difficulty: "Beginner", realWorldImpact: "Compresses text files by up to 40% using greedy tree structures." },
      { title: "In-Memory Key-Value Store", description: "Thread-safe LRU key-value store with expiration TTL.", technologies: ["Java", "Concurrency"], difficulty: "Beginner", realWorldImpact: "Simulates core Redis operations in pure Java." },
      { title: "JSON Parser & Formatter", description: "Recursive descent parser for valid JSON strings.", technologies: ["Python", "Parsing"], difficulty: "Beginner", realWorldImpact: "Validates and parses API responses without external libraries." },
      { title: "Task Scheduler Engine", description: "Priority queue based async task execution engine.", technologies: ["TypeScript", "Async"], difficulty: "Beginner", realWorldImpact: "Executes scheduled jobs with retry logic." },
      { title: "Rate Limiter Middleware", description: "Leaky bucket & Token bucket rate limiting middleware.", technologies: ["Node.js", "Express"], difficulty: "Beginner", realWorldImpact: "Protects APIs from DDoS attacks and request spikes." }
    ],
    intermediateProjects: [
      { title: "Distributed Task Queue", description: "Distributed worker pool processing asynchronous jobs using Redis Pub/Sub.", technologies: ["Go", "Redis", "Docker"], difficulty: "Intermediate", realWorldImpact: "Handles 10,000 background jobs per second with fault tolerance." },
      { title: "Custom Search Engine Indexer", description: "Inverted index search engine with TF-IDF scoring and ranking.", technologies: ["Java", "Lucene", "Spring"], difficulty: "Intermediate", realWorldImpact: "Indexes 100k documents with sub-20ms search latency." },
      { title: "High-Concurrency Chat Server", description: "WebSocket chat platform supporting rooms, history, and message delivery ACKs.", technologies: ["Node.js", "WebSockets", "MongoDB"], difficulty: "Intermediate", realWorldImpact: "Supports 5,000 active concurrent connections per node." },
      { title: "Mini Distributed File System", description: "Simplified HDFS clone with master node, chunk servers, and replication.", technologies: ["C++", "gRPC", "Protobuf"], difficulty: "Intermediate", realWorldImpact: "Demonstrates automated chunk replication across nodes." },
      { title: "API Gateway with OAuth2", description: "Centralized gateway providing rate limiting, JWT validation, and dynamic routing.", technologies: ["Java", "Spring Cloud", "Docker"], difficulty: "Intermediate", realWorldImpact: "Routes traffic across 10+ internal microservices." }
    ]
  },
  "cse-backend": {
    id: "cse-backend",
    name: "Backend Engineer",
    departmentId: "cse",
    careerObjective: "Build high-throughput REST/gRPC APIs, manage relational/NoSQL databases, and engineer resilient distributed systems.",
    industryDemand: "Critical",
    avgSalaryRange: "$105k - $180k / ₹16L - ₹40L",
    jobResponsibilities: [
      "Develop scalable microservices handling million+ daily HTTP/gRPC requests",
      "Optimize relational database queries, indexes, schema migrations, and connection pools",
      "Implement asynchronous messaging queues (Kafka/RabbitMQ) for event-driven flows",
      "Deploy background processing workers and enforce zero-trust authentication"
    ],
    requiredSkills: ["API Architecture", "Database Internals & SQL Tuning", "Distributed Systems", "Caching Strategies", "Message Queues", "Docker & Kubernetes"],
    coreSubjects: ["Database Systems & Indexing", "Distributed Systems Architecture", "API Design (REST & gRPC)", "Operating System Concurrency", "System Security & Auth"],
    roleSpecificDSA: ["Hash Tables & Open Addressing", "B+ Trees & LSM Trees", "Distributed Hashing (Consistent Hashing)", "Concurrency Locks & Semaphore Queues", "Graph Dependency Resolution"],
    roleSpecificCoding: ["REST & gRPC Microservices", "Database Migration Scripts", "Redis Caching Strategies (Cache-Aside)", "Kafka Producer/Consumer Pipelines", "Idempotent Payment API Implementations"],
    tools: ["Postman", "Docker", "Kubernetes", "Redis CLI", "pgAdmin", "Kafka Tools"],
    frameworks: ["Spring Boot", "Express.js", "NestJS", "FastAPI", "Go Gin"],
    industrySystems: ["Payment Gateways", "Event-Driven Microservices", "Distributed Caching Grids", "Real-Time Telemetry Processing"],
    certifications: ["AWS Certified Solutions Architect Associate", "MongoDB Certified Developer"],
    targetCompanies: ["Stripe", "Uber", "PayPal", "Amazon", "Twilio", "Salesforce"],
    beginnerProjects: [
      { title: "RESTful E-Commerce API", description: "Production API with product management, shopping cart, and JWT auth.", technologies: ["Node.js", "Express", "PostgreSQL"], difficulty: "Beginner", realWorldImpact: "Powers full e-commerce checkout workflow." },
      { title: "URL Shortener Service", description: "Scalable shortlink generator with analytics and custom aliases.", technologies: ["Python", "FastAPI", "Redis"], difficulty: "Beginner", realWorldImpact: "Generates 7-character base62 hashes with sub-5ms redirection." },
      { title: "User Auth & RBAC Microservice", description: "Authentication microservice supporting refresh tokens and role permissions.", technologies: ["Go", "JWT", "PostgreSQL"], difficulty: "Beginner", realWorldImpact: "Enforces enterprise-grade security controls." },
      { title: "Notification Service Queue", description: "Async email/SMS notification system backed by RabbitMQ.", technologies: ["Java", "Spring Boot", "RabbitMQ"], difficulty: "Beginner", realWorldImpact: "Processes 500 emails/sec without blocking web thread." },
      { title: "File Metadata API", description: "S3 file upload API with checksum verification and image resizing worker.", technologies: ["TypeScript", "AWS S3", "Sharp"], difficulty: "Beginner", realWorldImpact: "Handles secure multipart S3 uploads." }
    ],
    intermediateProjects: [
      { title: "Event-Driven Order Processing", description: "SAGA pattern order processing system using Apache Kafka and PostgreSQL.", technologies: ["Go", "Kafka", "PostgreSQL", "Docker"], difficulty: "Intermediate", realWorldImpact: "Ensures eventual consistency across inventory, payment, and shipping." },
      { title: "Distributed Rate Limiter Service", description: "Sliding window counter rate limiter deployed as a gRPC sidecar.", technologies: ["C++", "gRPC", "Redis Cluster"], difficulty: "Intermediate", realWorldImpact: "Limits client traffic across 50 API nodes with low latency." },
      { title: "Real-Time Collaborative Document API", description: "Operational Transformation API for collaborative document editing.", technologies: ["Node.js", "WebSockets", "Redis PubSub"], difficulty: "Intermediate", realWorldImpact: "Syncs concurrent keystrokes across multiple client sessions." },
      { title: "Database Sharding & Router Proxy", description: "Custom proxy that shards SQL queries across multiple MySQL instances based on tenant ID.", technologies: ["Java", "MySQL", "Netty"], difficulty: "Intermediate", realWorldImpact: "Scales database reads and writes horizontally by 5x." },
      { title: "Distributed Tracing Middleware", description: "OpenTelemetry middleware for tracking correlation IDs across 5 microservices.", technologies: ["Python", "OpenTelemetry", "Jaeger"], difficulty: "Intermediate", realWorldImpact: "Provides full request path visualization for debugging latency." }
    ]
  }
};

export function getRoleTaxonomy(roleId: string): Partial<RoleTaxonomy> | undefined {
  return ROLE_TAXONOMY_MAP[roleId];
}
