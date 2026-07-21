// IT branch — full syllabus for all role tracks.
export type SyllabusItem = { id: string; title: string; type: "concept" | "checklist" | "resource" };
export type SyllabusLevel = { id: string; level: number; title: string; description: string; items: SyllabusItem[] };

export const IT_SYLLABUS: Record<string, SyllabusLevel[]> = {
  "it-qa": [
    { id: "l1", level: 1, title: "Testing Foundations", description: "Manual testing basics",
      items: [
        { id: "i1", title: "SDLC/STLC, test case design", type: "concept" },
        { id: "i2", title: "Bug lifecycle, severity vs priority", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Automation Testing", description: "Scripted testing",
      items: [
        { id: "i1", title: "Selenium/Playwright fundamentals", type: "checklist" },
        { id: "i2", title: "Build 1 automated test suite", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: test case design for a login feature", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "it-sysadmin": [
    { id: "l1", level: 1, title: "Networking & OS Basics", description: "Core infra knowledge",
      items: [
        { id: "i1", title: "TCP/IP, DNS, subnetting", type: "concept" },
        { id: "i2", title: "Linux administration basics", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Systems Management", description: "Keeping systems running",
      items: [
        { id: "i1", title: "User/permission management, backups", type: "concept" },
        { id: "i2", title: "Monitoring and troubleshooting", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: troubleshoot a server down scenario", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "it-cloud": [
    { id: "l1", level: 1, title: "Cloud Foundations", description: "Core cloud concepts",
      items: [
        { id: "i1", title: "IaaS/PaaS/SaaS, core AWS/Azure services", type: "concept" },
        { id: "i2", title: "Cloud networking basics (VPC, security groups)", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Cloud Operations", description: "Running workloads",
      items: [
        { id: "i1", title: "Monitoring, cost optimization", type: "concept" },
        { id: "i2", title: "Get 1 cloud certification (AWS/Azure fundamentals)", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: troubleshoot a cloud VM connectivity issue", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "it-fullstack": [
    { id: "l1", level: 1, title: "Web Dev Foundations", description: "Core stack basics",
      items: [
        { id: "i1", title: "HTML/CSS/JS, a backend framework", type: "concept" },
        { id: "i2", title: "Databases: SQL basics", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Building Applications", description: "End to end apps",
      items: [
        { id: "i1", title: "Build 1 CRUD application with auth", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: explain your project architecture", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "it-dba": [
    { id: "l1", level: 1, title: "Database Foundations", description: "Core DB concepts",
      items: [
        { id: "i1", title: "SQL fundamentals, normalization", type: "concept" },
        { id: "i2", title: "Indexes and query optimization", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Database Operations", description: "Running production DBs",
      items: [
        { id: "i1", title: "Backup/recovery, replication", type: "concept" },
        { id: "i2", title: "Performance tuning practice", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: diagnose a slow query", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
};
