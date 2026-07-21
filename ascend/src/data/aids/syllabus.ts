// AIDS branch — full syllabus for all role tracks.
export type SyllabusItem = { id: string; title: string; type: "concept" | "checklist" | "resource" };
export type SyllabusLevel = { id: string; level: number; title: string; description: string; items: SyllabusItem[] };

export const AIDS_SYLLABUS: Record<string, SyllabusLevel[]> = {
  "aids-data-analyst": [
    { id: "l1", level: 1, title: "Analytics Foundations", description: "SQL and spreadsheets",
      items: [
        { id: "i1", title: "Advanced SQL: joins, window functions", type: "concept" },
        { id: "i2", title: "Excel/Google Sheets for analysis", type: "checklist" },
      ] },
    { id: "l2", level: 2, title: "Visualization & Reporting", description: "Communicating data",
      items: [
        { id: "i1", title: "Power BI/Tableau dashboards", type: "checklist" },
        { id: "i2", title: "Build 1 end-to-end analysis report", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: SQL live coding round", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "aids-data-scientist": [
    { id: "l1", level: 1, title: "Statistics for Business", description: "Applied stats",
      items: [
        { id: "i1", title: "A/B testing, regression basics", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Predictive Modeling", description: "Business-facing ML",
      items: [
        { id: "i1", title: "Build 1 predictive model tied to a business metric", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: case study round", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "aids-data-engineer": [
    { id: "l1", level: 1, title: "Data Platform Foundations", description: "Core pipeline skills",
      items: [
        { id: "i1", title: "SQL, Python for ETL", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Pipeline Building", description: "Production data flows",
      items: [
        { id: "i1", title: "Build 1 automated ETL pipeline", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: design a data pipeline for daily sales reports", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "aids-bi-analyst": [
    { id: "l1", level: 1, title: "BI Foundations", description: "Reporting basics",
      items: [
        { id: "i1", title: "KPI design, dashboard fundamentals", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Advanced Reporting", description: "Scaling BI work",
      items: [
        { id: "i1", title: "Build 2 dashboards for different stakeholder groups", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: present a dashboard to a stakeholder", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
  "aids-ai-product": [
    { id: "l1", level: 1, title: "AI Product Foundations", description: "Bridging AI and product",
      items: [
        { id: "i1", title: "ML capabilities/limitations for PMs, evaluation basics", type: "concept" },
      ] },
    { id: "l2", level: 2, title: "Feature Scoping", description: "Shipping AI features",
      items: [
        { id: "i1", title: "Write 1 AI feature spec end to end", type: "checklist" },
      ] },
    { id: "l3", level: 3, title: "Placement Ready", description: "Interview prep",
      items: [
        { id: "i1", title: "Mock interview: scope an AI feature under ambiguity", type: "checklist" },
        { id: "i2", title: "Get your Placement Readiness Score from AI", type: "checklist" },
      ] },
  ],
};
