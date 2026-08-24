// MNC Question Bank Provenance & Company Taxonomy Engine

export type ProvenanceTag = 
  | "verified_public_question"
  | "reported_interview_question"
  | "company_topic_pattern"
  | "original_role_question"
  | "AI_generated_variant";

export interface CompanyCategory {
  id: string;
  categoryName: string;
  companies: { id: string; name: string; logo: string; hq: string }[];
}

export const COMPANY_CATEGORIES: CompanyCategory[] = [
  {
    id: "software",
    categoryName: "Software & Cloud Giants",
    companies: [
      { id: "google", name: "Google", logo: "🔍", hq: "Mountain View, CA" },
      { id: "microsoft", name: "Microsoft", logo: "🪟", hq: "Redmond, WA" },
      { id: "amazon", name: "Amazon", logo: "📦", hq: "Seattle, WA" },
      { id: "meta", name: "Meta", logo: "♾️", hq: "Menlo Park, CA" },
      { id: "apple", name: "Apple", logo: "🍎", hq: "Cupertino, CA" },
      { id: "nvidia", name: "NVIDIA", logo: "💚", hq: "Santa Clara, CA" },
      { id: "adobe", name: "Adobe", logo: "🔴", hq: "San Jose, CA" },
      { id: "oracle", name: "Oracle", logo: "🔴", hq: "Austin, TX" },
      { id: "salesforce", name: "Salesforce", logo: "☁️", hq: "San Francisco, CA" }
    ]
  },
  {
    id: "it-services",
    categoryName: "IT Services & Consulting",
    companies: [
      { id: "tcs", name: "TCS (Tata Consultancy Services)", logo: "🏢", hq: "Mumbai, India" },
      { id: "infosys", name: "Infosys", logo: "🔷", hq: "Bengaluru, India" },
      { id: "wipro", name: "Wipro", logo: "🌈", hq: "Bengaluru, India" },
      { id: "accenture", name: "Accenture", logo: "💜", hq: "Dublin, Ireland" },
      { id: "cognizant", name: "Cognizant", logo: "🔵", hq: "Teaneck, NJ" },
      { id: "capgemini", name: "Capgemini", logo: "♠️", hq: "Paris, France" },
      { id: "hcltech", name: "HCLTech", logo: "🟦", hq: "Noida, India" }
    ]
  },
  {
    id: "ai-data",
    categoryName: "AI & Data Platforms",
    companies: [
      { id: "openai", name: "OpenAI", logo: "🤖", hq: "San Francisco, CA" },
      { id: "anthropic", name: "Anthropic", logo: "🧠", hq: "San Francisco, CA" },
      { id: "databricks", name: "Databricks", logo: "🧱", hq: "San Francisco, CA" },
      { id: "snowflake", name: "Snowflake", logo: "❄️", hq: "Bozeman, MT" }
    ]
  },
  {
    id: "semiconductor",
    categoryName: "Semiconductor & Hardware",
    companies: [
      { id: "intel", name: "Intel", logo: "🔷", hq: "Santa Clara, CA" },
      { id: "amd", name: "AMD", logo: "🔴", hq: "Santa Clara, CA" },
      { id: "qualcomm", name: "Qualcomm", logo: "📱", hq: "San Diego, CA" },
      { id: "ti", name: "Texas Instruments", logo: "⚡", hq: "Dallas, TX" },
      { id: "broadcom", name: "Broadcom", logo: "📶", hq: "San Jose, CA" },
      { id: "synopsys", name: "Synopsys", logo: "💾", hq: "Sunnyvale, CA" }
    ]
  },
  {
    id: "electrical-industrial",
    categoryName: "Electrical & Industrial Systems",
    companies: [
      { id: "siemens", name: "Siemens", logo: "🟢", hq: "Munich, Germany" },
      { id: "abb", name: "ABB", logo: "⚡", hq: "Zurich, Switzerland" },
      { id: "schneider", name: "Schneider Electric", logo: "🍃", hq: "Rueil-Malmaison, France" },
      { id: "ge", name: "GE (General Electric)", logo: "💡", hq: "Boston, MA" },
      { id: "honeywell", name: "Honeywell", logo: "🔴", hq: "Charlotte, NC" }
    ]
  },
  {
    id: "robotics-automotive",
    categoryName: "Automotive, Robotics & Mechatronics",
    companies: [
      { id: "tesla", name: "Tesla", logo: "🚗", hq: "Austin, TX" },
      { id: "bosch", name: "Bosch", logo: "⚙️", hq: "Gerlingen, Germany" },
      { id: "kuka", name: "KUKA Robotics", logo: "🤖", hq: "Augsburg, Germany" },
      { id: "fanuc", name: "FANUC", logo: "🟡", hq: "Yamanashi, Japan" },
      { id: "tata-motors", name: "Tata Motors", logo: "🚘", hq: "Mumbai, India" }
    ]
  }
];

export function getProvenanceLabel(tag: ProvenanceTag): { label: string; badgeColor: string } {
  switch (tag) {
    case "verified_public_question":
      return { label: "Verified Public Interview Q", badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" };
    case "reported_interview_question":
      return { label: "Reported Candidate Question", badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30" };
    case "company_topic_pattern":
      return { label: "Company Topic Pattern Match", badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30" };
    case "original_role_question":
      return { label: "Original Role Benchmark", badgeColor: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" };
    case "AI_generated_variant":
      return { label: "AI Practice Variant", badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/30" };
    default:
      return { label: "Role Question", badgeColor: "bg-slate-500/20 text-slate-400 border-slate-500/30" };
  }
}
