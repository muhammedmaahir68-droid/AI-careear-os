// IT branch — mock interview question bank.
export type MockQuestion = { question: string; difficulty: "easy" | "medium" | "hard"; ideal_answer_points: string };

export const IT_MOCK_INTERVIEW: Record<string, MockQuestion[]> = {
  "it-qa": [
    { question: "What is the difference between black-box and white-box testing?", difficulty: "easy",
      ideal_answer_points: "Black-box tests functionality without code knowledge; white-box tests internal logic." },
    { question: "How do you decide what to automate vs test manually?", difficulty: "medium",
      ideal_answer_points: "Repetitive/stable/high-risk cases automated; exploratory/UX testing stays manual." },
    { question: "Design a test strategy for an e-commerce checkout flow.", difficulty: "hard",
      ideal_answer_points: "Functional, edge cases, payment failure scenarios, load testing considerations." },
  ],
  "it-sysadmin": [
    { question: "What is the difference between a firewall and a proxy?", difficulty: "easy",
      ideal_answer_points: "Firewall filters traffic by rules; proxy relays/intermediates requests." },
    { question: "Explain the boot process of a Linux system.", difficulty: "medium",
      ideal_answer_points: "BIOS/UEFI, bootloader, kernel init, systemd/init services." },
    { question: "Design a backup and disaster recovery plan for a small company's servers.", difficulty: "hard",
      ideal_answer_points: "RPO/RTO, backup frequency, offsite storage, recovery testing." },
  ],
  "it-cloud": [
    { question: "What's the difference between a security group and a network ACL in AWS?", difficulty: "easy",
      ideal_answer_points: "Stateful instance-level vs stateless subnet-level rules." },
    { question: "Explain auto-scaling and when you'd use it.", difficulty: "medium",
      ideal_answer_points: "Scales resources based on demand metrics; cost and availability benefit." },
    { question: "Design a highly available architecture for a web app on AWS.", difficulty: "hard",
      ideal_answer_points: "Multi-AZ, load balancer, auto-scaling group, managed DB with failover." },
  ],
  "it-fullstack": [
    { question: "What is SQL injection and how do you prevent it?", difficulty: "easy",
      ideal_answer_points: "Untrusted input executed as SQL; prevent with parameterized queries." },
    { question: "Explain the MVC architecture pattern.", difficulty: "medium",
      ideal_answer_points: "Model-View-Controller separation of concerns." },
    { question: "How would you design a simple URL-based file upload service?", difficulty: "hard",
      ideal_answer_points: "Storage choice, validation, size limits, security scanning." },
  ],
  "it-dba": [
    { question: "What is database replication and why is it used?", difficulty: "easy",
      ideal_answer_points: "Copies data across servers for availability and read scaling." },
    { question: "Explain deadlocks and how to prevent them.", difficulty: "medium",
      ideal_answer_points: "Two transactions waiting on each other's locks; prevention via consistent lock ordering, timeouts." },
    { question: "Design a backup strategy for a database with strict uptime requirements.", difficulty: "hard",
      ideal_answer_points: "Full/incremental backups, point-in-time recovery, replication for failover." },
  ],
};
