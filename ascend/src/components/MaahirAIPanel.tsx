import React, { useState, useRef, useEffect } from "react";
import { Brain, Download, Send, FileText, Code2, Briefcase, Zap } from "lucide-react";

interface MaahirMsg { sender: "user" | "ai"; text: string; ts: string; }

function getMaahirResponse(query: string, branchId?: string | null, roleId?: string | null): string {
  const q = query.toLowerCase();
  const branch = branchId || "cse";
  const role = roleId || "software engineer";

  if (q.includes("summarize") || q.includes("summary")) {
    return `# 📝 AI TEXT SUMMARIZER — Maahir AI Engine

**Paste any text below and I will generate a placement-ready executive summary.**

Since you asked me to summarize, here's how I work:
1. I extract **key entities** (names, technologies, metrics).
2. I identify the **main thesis** and supporting arguments.
3. I compress the content into **bullet-point executive format**.

**Example Summary Output:**
- **Topic:** Advanced Data Structures for ${branch.toUpperCase()} placement interviews
- **Key Insight:** Hash maps provide O(1) average lookup, making them ideal for two-sum and anagram grouping problems.
- **Action Items:** Practice 50+ problems on LeetCode involving HashMap, TreeMap, and PriorityQueue.
- **Interview Tip:** Always state time and space complexity before writing code.

💡 *Paste your study notes or article text and ask me to summarize it!*`;
  }

  if (q.includes("resume") || q.includes("keyword") || q.includes("ats")) {
    return `# 📄 RESUME KEYWORD ANALYZER — Maahir AI

I can analyze your resume content for ATS optimization. Here are the **top keywords** recruiters search for in **${role}** roles:

### 🔑 Must-Have Technical Keywords:
- React, Node.js, Python, TypeScript, SQL, MongoDB
- REST API, GraphQL, Docker, Kubernetes, AWS/GCP
- Git, CI/CD, Agile, Scrum, TDD

### 🎯 Action Verb Power Words:
- Architected, Optimized, Implemented, Designed, Scaled
- Reduced latency by X%, Improved throughput by Y%
- Led team of N engineers, Mentored junior developers

### ⚠️ Common ATS Failures:
1. Using images/graphics (ATS can't read them)
2. Fancy fonts or columns (breaks parsing)
3. Missing quantified achievements
4. Not matching job description keywords

**Pro Tip:** Use the **Resume & ATS** tab to build and score your resume!`;
  }

  if (q.includes("coding") || q.includes("puzzle") || q.includes("dsa") || q.includes("practice")) {
    return `# 💻 CODING CHALLENGE — Maahir AI

Here's a placement-level coding puzzle for **${branch.toUpperCase()} — ${role}**:

## 🧩 Problem: Two Sum (Amazon/Google Favorite)
Given an array of integers \`nums\` and a target integer \`target\`, return indices of the two numbers that add up to \`target\`.

**Constraints:** Each input has exactly one solution. You may not use the same element twice.

\`\`\`python
def two_sum(nums, target):
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# Test: two_sum([2, 7, 11, 15], 9) → [0, 1]
\`\`\`

**Time:** O(N) | **Space:** O(N)

### 🔥 Follow-up Challenges:
1. What if the array is sorted? → Use two pointers (O(1) space)
2. What if there are multiple valid pairs? → Return all pairs
3. Three Sum variant → Sort + two pointers inside a loop`;
  }

  if (q.includes("placement") || q.includes("interview") || q.includes("tip")) {
    return `# 🏢 PLACEMENT INTERVIEW MASTERCLASS — Maahir AI

## Top 10 Tips for Cracking MNC Interviews:

1. **Resume First**: Tailor your resume for EACH company. Use the XYZ formula.
2. **DSA Daily**: Solve 2-3 LeetCode problems daily. Focus on Arrays, Trees, Graphs.
3. **System Design**: Learn CAP theorem, load balancing, caching, and database sharding.
4. **Mock Interviews**: Practice with peers. Record yourself and review.
5. **STAR Method**: Structure all behavioral answers using Situation-Task-Action-Result.
6. **Company Research**: Know the company's products, recent news, and tech stack.
7. **Ask Questions**: Always ask 2-3 intelligent questions at the end of each round.
8. **Time Management**: In coding rounds, spend 5 min understanding, 15 min coding, 5 min testing.
9. **Communication**: Think out loud. Interviewers want to see your thought process.
10. **Stay Calm**: If stuck, break the problem into smaller sub-problems.

### 🎯 Company-Specific Patterns:
- **Amazon**: Leadership Principles + System Design + LP-based behavioral
- **Google**: Algorithm efficiency + Clean code + Googleyness
- **TCS**: Aptitude + Verbal + Basic coding + HR
- **Infosys**: Logical reasoning + Programming MCQs + Technical HR`;
  }

  return `# 🤖 Maahir AI — Your Career Co-Pilot

I'm your **inbuilt large-scale AI assistant**, optimized for placement preparation. Here's what I can help you with:

### Quick Actions:
- 📝 **"Summarize my notes"** — Paste text and I'll create executive summaries
- 📄 **"Analyze resume keywords"** — Get ATS optimization tips
- 💻 **"Give me a coding puzzle"** — Practice DSA problems with solutions
- 🏢 **"Placement interview tips"** — Get company-specific strategies

### About Me:
- ⚡ **100% Offline** — No internet needed, no API keys, zero latency
- 🧠 **Context-Aware** — I know your department (${branch.toUpperCase()}) and role (${role})
- 📚 **Comprehensive** — Covering aptitude, coding, system design, and soft skills

*Type any question or click a quick action button below!*`;
}

export default function MaahirAIPanel({ branchId, roleId }: { branchId?: string | null; roleId?: string | null }) {
  const [messages, setMessages] = useState<MaahirMsg[]>([
    { sender: "ai", text: getMaahirResponse("hello", branchId, roleId), ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }
  ]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  const send = (text: string) => {
    if (!text.trim() || thinking) return;
    const userMsg: MaahirMsg = { sender: "user", text: text.trim(), ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setThinking(true);
    setTimeout(() => {
      const response = getMaahirResponse(text, branchId, roleId);
      setMessages(prev => [...prev, { sender: "ai", text: response, ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
      setThinking(false);
    }, 600);
  };

  const downloadChat = () => {
    const content = messages.map(m => `[${m.ts}] ${m.sender === "user" ? "YOU" : "MAAHIR AI"}:\n${m.text}\n`).join("\n---\n\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "Maahir_AI_Chat.txt";
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[600px] rounded-3xl border border-fuchsia-500/20 bg-white/5 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border bg-fuchsia-950/30 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <Brain size={20} className="text-fuchsia-400 animate-pulse" />
          <span className="text-sm font-bold text-fuchsia-300">Maahir AI — Inbuilt Large LLM Engine</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold border border-emerald-500/30">OFFLINE</span>
        </div>
        <button onClick={downloadChat} className="text-xs px-3 py-1.5 rounded-lg border border-fuchsia-500/30 hover:bg-fuchsia-500/10 text-fuchsia-400 font-bold flex items-center gap-1">
          <Download size={12} /> Export Chat
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}>
            <div className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
              msg.sender === "user"
                ? "bg-purple-600 text-foreground rounded-br-none"
                : "bg-card border border-border text-slate-200 rounded-bl-none"
            }`}>
              {msg.text}
            </div>
            <span className="text-[9px] text-slate-500 mt-1 font-mono">{msg.ts}</span>
          </div>
        ))}
        {thinking && (
          <div className="flex items-start mr-auto max-w-[80%]">
            <div className="p-4 rounded-2xl bg-card border border-border text-slate-300 rounded-bl-none text-xs flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-fuchsia-500" />
              </span>
              <span className="animate-pulse font-medium">Maahir AI is thinking...</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-border flex flex-wrap gap-2 shrink-0 bg-card">
        <button disabled={thinking} onClick={() => send("Summarize my study notes")} className="px-3 py-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[11px] font-bold transition-all flex items-center gap-1"><FileText size={11} /> Summarize Text</button>
        <button disabled={thinking} onClick={() => send("Analyze resume keywords for ATS")} className="px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold transition-all flex items-center gap-1"><Briefcase size={11} /> Resume Keywords</button>
        <button disabled={thinking} onClick={() => send("Give me a coding puzzle to practice")} className="px-3 py-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] font-bold transition-all flex items-center gap-1"><Code2 size={11} /> Coding Puzzle</button>
        <button disabled={thinking} onClick={() => send("Placement interview tips and strategies")} className="px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold transition-all flex items-center gap-1"><Zap size={11} /> Interview Tips</button>
      </div>

      {/* Input */}
      <div className="p-3 border-t border-border flex gap-2 shrink-0">
        <input type="text" value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") send(input); }}
          placeholder="Ask Maahir AI anything..." disabled={thinking}
          className="flex-1 px-4 py-3 rounded-2xl bg-card border border-border text-foreground placeholder-slate-500 text-xs focus:outline-none focus:border-fuchsia-500/60" />
        <button onClick={() => send(input)} disabled={thinking || !input.trim()}
          className="px-5 py-3 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 text-foreground text-xs font-bold transition-all flex items-center gap-1.5">
          <Send size={14} /> Ask
        </button>
      </div>
    </div>
  );
}
