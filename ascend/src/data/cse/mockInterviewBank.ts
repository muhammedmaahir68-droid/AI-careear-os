// CSE branch — mock interview question bank.
export type MockQuestion = { question: string; difficulty: "easy" | "medium" | "hard"; ideal_answer_points: string };

export const CSE_MOCK_INTERVIEW: Record<string, MockQuestion[]> = {
  "cse-sde": [
    { question: "What's the difference between an array and a linked list?", difficulty: "easy",
      ideal_answer_points: "Contiguous memory vs nodes with pointers; access time O(1) vs O(n)." },
    { question: "Explain how a hash map handles collisions.", difficulty: "medium",
      ideal_answer_points: "Chaining vs open addressing; mentions load factor." },
    { question: "Design a rate limiter for an API.", difficulty: "hard",
      ideal_answer_points: "Token bucket/sliding window algorithms, distributed considerations." },
  ],
  "cse-backend": [
    { question: "What is database indexing and how does it speed up queries?", difficulty: "easy",
      ideal_answer_points: "B-tree structure, tradeoff of write speed vs read speed." },
    { question: "Explain ACID properties in databases.", difficulty: "medium",
      ideal_answer_points: "Atomicity, Consistency, Isolation, Durability with examples." },
    { question: "How would you design a message queue-based order processing system?", difficulty: "hard",
      ideal_answer_points: "Producer/consumer, retries, dead-letter queues, idempotency." },
  ],
  "cse-frontend": [
    { question: "What are React hooks and why were they introduced?", difficulty: "easy",
      ideal_answer_points: "Reuse stateful logic without classes; useState/useEffect basics." },
    { question: "Explain event delegation in JavaScript.", difficulty: "medium",
      ideal_answer_points: "Single listener on parent using bubbling instead of many listeners." },
    { question: "How would you design a design system/component library for a large team?", difficulty: "hard",
      ideal_answer_points: "Reusability, theming, accessibility, documentation, versioning." },
  ],
  "cse-fullstack": [
    { question: "What is CORS and why does it exist?", difficulty: "easy",
      ideal_answer_points: "Browser security policy restricting cross-origin requests; how to configure it." },
    { question: "How would you structure environment variables and secrets across dev/staging/prod?", difficulty: "medium",
      ideal_answer_points: "Env files, secret managers, never committing secrets." },
    { question: "Design the schema for a multi-tenant SaaS application.", difficulty: "hard",
      ideal_answer_points: "Tenant isolation strategies, shared vs separate DB, row-level security." },
  ],
  "cse-data-engineer": [
    { question: "What is data partitioning and why does it matter?", difficulty: "easy",
      ideal_answer_points: "Splitting data for parallelism and query performance." },
    { question: "Explain the difference between batch and stream processing.", difficulty: "medium",
      ideal_answer_points: "Latency, throughput, use cases (daily reports vs real-time fraud detection)." },
    { question: "Design a data warehouse schema for an e-commerce company.", difficulty: "hard",
      ideal_answer_points: "Star schema, fact/dimension tables, slowly changing dimensions." },
  ],
  "cse-devops": [
    { question: "What's the difference between horizontal and vertical scaling?", difficulty: "easy",
      ideal_answer_points: "Adding more machines vs adding more resources to one machine." },
    { question: "Explain how a Kubernetes pod differs from a container.", difficulty: "medium",
      ideal_answer_points: "Pod as the smallest deployable unit, can contain multiple containers." },
    { question: "Design a monitoring and alerting strategy for a production system.", difficulty: "hard",
      ideal_answer_points: "Metrics, logs, traces, SLOs, alert fatigue prevention." },
  ],
};
