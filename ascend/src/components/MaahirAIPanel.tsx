import React, { useState, useRef, useEffect } from "react";
import { Brain, Download, Send, FileText, Code2, Briefcase, Zap, GitBranch, Key, X } from "lucide-react";

interface MaahirMsg { sender: "user" | "ai"; text: string; ts: string; }

const SYSTEM_PROMPT = (branch: string, role: string) =>
  `You are Maahir AI, an expert career coach and placement assistant inside CARVEX — an AI career OS for engineering students. The user studies ${branch} and targets ${role} roles. You are agentic: provide deep technical explanations, real working code, DSA problems with step-by-step solutions, professional resume advice, mock interviews, GitHub analysis, and debugging help. Always be encouraging and practical. Use markdown with code blocks.`;

async function callGemini(apiKey: string, msgs: MaahirMsg[], sysprompt: string): Promise<string> {
  const contents = msgs.map(m => ({
    role: m.sender === "user" ? "user" : "model",
    parts: [{ text: m.text }]
  }));
  const res = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: sysprompt }] },
        contents,
        generationConfig: { temperature: 0.7, maxOutputTokens: 2048 }
      })
    }
  );
  if (!res.ok) throw new Error(`Gemini API error ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response received.";
}

async function fetchGitHubRepos(username: string): Promise<string> {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=20`)
    ]);
    if (!userRes.ok) return `GitHub user "${username}" not found.`;
    const user = await userRes.json();
    const repos = await reposRes.json();
    const langs: Record<string, number> = {};
    repos.forEach((r: any) => { if (r.language) langs[r.language] = (langs[r.language] || 0) + 1; });
    const topLangs = Object.entries(langs).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([l]) => l).join(", ");
    const repoList = repos.slice(0, 10).map((r: any) =>
      `- **${r.name}** (${r.language || "Unknown"}): ${r.description || "No description"} [${r.stargazers_count} stars]`
    ).join("\n");
    return `**GitHub Profile: ${user.name || username}**\nFollowers: ${user.followers} | Public Repos: ${user.public_repos}\nTop Languages: ${topLangs}\nBio: ${user.bio || "None"}\n\n**Top Repositories:**\n${repoList}`;
  } catch (e: any) {
    return `Error fetching GitHub: ${e.message}`;
  }
}

function getDemoResponse(q: string, branch: string, role: string): string {
  const ql = q.toLowerCase();
  if (ql.includes("coding") || ql.includes("challenge") || ql.includes("dsa"))
    return `# Coding Challenge — ${branch.toUpperCase()}\n\n**Two Sum (Classic)**\n\nGiven an array of integers and a target, return indices of two numbers that add up to target.\n\n\`\`\`python\ndef two_sum(nums, target):\n    seen = {}\n    for i, num in enumerate(nums):\n        comp = target - num\n        if comp in seen:\n            return [seen[comp], i]\n        seen[num] = i\n\`\`\`\n\n**Time:** O(n) | **Space:** O(n)\n\n*Add your Gemini API key (free at aistudio.google.com) for ${branch}-specific AI-generated problems!*`;
  if (ql.includes("interview") || ql.includes("mock"))
    return `# Mock Interview — ${role}\n\n**Q: Tell me about yourself.**\n\n**STAR Structure:**\n1. **Situation:** Current student/grad + branch\n2. **Task:** Skills you bring (top 2-3 relevant to role)\n3. **Action:** Best project with measurable impact\n4. **Result:** Why this company/role specifically\n\n*Add your Gemini API key for personalized AI mock interviews!*`;
  if (ql.includes("resume"))
    return `# Resume Tips — ${role}\n\n**Top 5 ATS Tips:**\n1. Quantify every achievement: "Reduced load time by 40%" not "Improved performance"\n2. Match job description keywords exactly\n3. No graphics, tables, or columns — ATS cannot parse them\n4. Use XYZ formula: "Accomplished X by doing Y resulting in Z"\n5. One page for under 3 years experience\n\n*Add your Gemini API key for AI-powered personalized resume review!*`;
  return `# Maahir AI — Agentic Career Coach (Demo Mode)\n\nI'm your AI-powered placement assistant for **${branch.toUpperCase()}** — **${role}** track.\n\n**What I can do (with Gemini API key):**\n- Generate branch-specific coding challenges\n- Run interactive mock interviews\n- Analyze your GitHub and rewrite professionally\n- Debug your code with explanations\n- Deep-dive into any technical topic\n\n**Get free API key:** [aistudio.google.com](https://aistudio.google.com)\n\nClick **"Add API Key"** in the header to unlock full AI!`;
}

export default function MaahirAIPanel({ branchId, roleId }: { branchId?: string | null; roleId?: string | null }) {
  const branch = branchId?.toUpperCase() || "CSE";
  const role = roleId || "Software Engineer";

  const [messages, setMessages] = useState<MaahirMsg[]>([{
    sender: "ai",
    text: `# Maahir AI — Agentic Career Coach\n\nI'm your AI placement assistant for **${branch}** — **${role}** track.\n\n**What I can do:**\n- Generate branch-specific DSA coding challenges\n- Analyze your GitHub and write professional descriptions\n- Run interactive mock interviews\n- Review and improve your resume\n- Debug your code step by step\n- Explain any technical topic deeply\n\n*Add your free Gemini API key to unlock full AI — or use demo mode below!*`,
    ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem("maahir_gemini_key") || "");
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [tempKey, setTempKey] = useState("");
  const [githubUsername, setGitBranchUsername] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, thinking]);

  const saveApiKey = () => {
    localStorage.setItem("maahir_gemini_key", tempKey);
    setApiKey(tempKey);
    setShowKeyModal(false);
    setTempKey("");
  };

  const send = async (text: string) => {
    if (!text.trim() || thinking) return;
    const userMsg: MaahirMsg = { sender: "user", text: text.trim(), ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setThinking(true);
    try {
      const responseText = apiKey
        ? await callGemini(apiKey, newMessages, SYSTEM_PROMPT(branch, role))
        : (await new Promise<string>(r => setTimeout(() => r(getDemoResponse(text, branch, role)), 800)));
      setMessages(prev => [...prev, { sender: "ai", text: responseText, ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { sender: "ai", text: `Error: ${err.message}. Check your API key or network connection.`, ts: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }]);
    }
    setThinking(false);
  };

  const analyzeGitHub = async () => {
    if (!githubUsername.trim()) { alert("Enter a GitHub username first!"); return; }
    const repoData = await fetchGitHubRepos(githubUsername);
    await send(`Please analyze this GitHub profile for placement readiness and write professional portfolio descriptions for each repository:\n\n${repoData}`);
  };

  const downloadChat = () => {
    const content = messages.map(m => `[${m.ts}] ${m.sender === "user" ? "YOU" : "MAAHIR AI"}:\n${m.text}\n`).join("\n---\n\n");
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "Maahir_AI_Chat.txt";
    document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col h-[680px] rounded-3xl border border-fuchsia-500/20 bg-white/5 overflow-hidden relative">
      {showKeyModal && (
        <div className="absolute inset-0 z-50 bg-black/80 flex items-center justify-center rounded-3xl p-4">
          <div className="bg-card border border-border rounded-2xl p-6 w-80">
            <div className="flex justify-between items-center mb-4">
              <span className="font-bold text-foreground flex items-center gap-2"><Key size={16} /> Gemini API Key</span>
              <button onClick={() => setShowKeyModal(false)}><X size={16} className="text-muted-foreground" /></button>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Get your FREE key from <a href="https://aistudio.google.com" target="_blank" className="text-blue-400 underline">aistudio.google.com</a></p>
            <input type="password" value={tempKey} onChange={e => setTempKey(e.target.value)} onKeyDown={e => e.key === "Enter" && saveApiKey()} placeholder="AIza..." className="w-full px-3 py-2 rounded-lg bg-muted border border-border text-foreground text-xs mb-3 focus:outline-none" />
            <button onClick={saveApiKey} className="w-full py-2 rounded-lg bg-fuchsia-600 hover:bg-fuchsia-500 text-white text-xs font-bold">Save & Connect</button>
          </div>
        </div>
      )}

      <div className="p-4 border-b border-border bg-fuchsia-950/30 flex justify-between items-center shrink-0">
        <div className="flex items-center gap-2">
          <Brain size={20} className="text-fuchsia-400 animate-pulse" />
          <span className="text-sm font-bold text-fuchsia-300">Maahir AI — Agentic Career Coach</span>
          {apiKey
            ? <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 font-bold border border-green-500/30">ONLINE</span>
            : <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold border border-amber-500/30">DEMO</span>
          }
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowKeyModal(true)} className="text-xs px-2 py-1 rounded-lg border border-fuchsia-500/30 hover:bg-fuchsia-500/10 text-fuchsia-400 flex items-center gap-1">
            <Key size={11} /> {apiKey ? "Change Key" : "Add API Key"}
          </button>
          <button onClick={downloadChat} className="text-xs px-3 py-1.5 rounded-lg border border-fuchsia-500/30 hover:bg-fuchsia-500/10 text-fuchsia-400 font-bold flex items-center gap-1">
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {messages.map((msg, i) => (
          <div key={i} className={`flex flex-col max-w-[85%] ${msg.sender === "user" ? "ml-auto items-end" : "mr-auto items-start"}`}>
            <div className={`p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
              msg.sender === "user"
                ? "bg-purple-600 text-white rounded-br-none"
                : "bg-card border border-border text-foreground rounded-bl-none"
            }`}>{msg.text}</div>
            <span className="text-[9px] text-muted-foreground mt-1 font-mono">{msg.ts}</span>
          </div>
        ))}
        {thinking && (
          <div className="flex items-start mr-auto max-w-[80%]">
            <div className="p-4 rounded-2xl bg-card border border-border text-foreground rounded-bl-none text-xs flex items-center gap-2">
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

      <div className="px-4 py-2 border-t border-border bg-card shrink-0">
        <div className="flex gap-2">
          <input value={githubUsername} onChange={e => setGitBranchUsername(e.target.value)} onKeyDown={e => e.key === "Enter" && analyzeGitHub()} placeholder="GitHub username to analyze repos..." className="flex-1 px-3 py-1.5 rounded-lg bg-muted border border-border text-foreground text-xs focus:outline-none" />
          <button onClick={analyzeGitHub} disabled={thinking} className="px-3 py-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center gap-1 disabled:opacity-50">
            <GitBranch size={12} /> Analyze
          </button>
        </div>
      </div>

      <div className="px-4 py-2 border-t border-border flex flex-wrap gap-2 shrink-0 bg-card">
        <button disabled={thinking} onClick={() => send(`Give me a ${branch} placement DSA coding challenge with complete solution, time complexity analysis, and follow-up questions`)} className="px-3 py-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-300 text-[11px] font-bold transition-all flex items-center gap-1"><Code2 size={11} /> Coding Challenge</button>
        <button disabled={thinking} onClick={() => send(`Start a mock technical interview for ${role}. Ask one question at a time and wait for my answer.`)} className="px-3 py-1.5 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[11px] font-bold transition-all flex items-center gap-1"><Zap size={11} /> Mock Interview</button>
        <button disabled={thinking} onClick={() => send(`Give me specific resume improvement tips for a ${branch} student targeting ${role} positions. Include ATS optimization and quantification examples.`)} className="px-3 py-1.5 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-[11px] font-bold transition-all flex items-center gap-1"><FileText size={11} /> Resume Tips</button>
        <button disabled={thinking} onClick={() => send("I have buggy code. I will paste it next. Please debug it with full explanation of the bug and fix.")} className="px-3 py-1.5 rounded-full bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-300 text-[11px] font-bold transition-all flex items-center gap-1"><Briefcase size={11} /> Debug Code</button>
      </div>

      <div className="p-3 border-t border-border flex gap-2 shrink-0">
        <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") send(input); }}
          placeholder={apiKey ? "Ask Maahir AI anything about placement, coding, interviews..." : "Demo mode — Add free Gemini API key to unlock full AI"}
          disabled={thinking}
          className="flex-1 px-4 py-3 rounded-2xl bg-card border border-border text-foreground placeholder-muted-foreground text-xs focus:outline-none focus:border-fuchsia-500/60" />
        <button onClick={() => send(input)} disabled={thinking || !input.trim()}
          className="px-5 py-3 rounded-2xl bg-fuchsia-600 hover:bg-fuchsia-500 disabled:opacity-50 text-white text-xs font-bold transition-all flex items-center gap-1.5">
          <Send size={14} /> Ask
        </button>
      </div>
    </div>
  );
}
