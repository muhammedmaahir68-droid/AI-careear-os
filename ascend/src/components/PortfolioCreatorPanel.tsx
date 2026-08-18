import React, { useState } from "react";
import { Download, Plus, Trash2, Eye, Palette } from "lucide-react";

const THEMES = [
  { id: "slate", label: "Classic Slate", bg: "#0f172a", accent: "#8b5cf6", text: "#e2e8f0" },
  { id: "cyber", label: "Cyberpunk Neon", bg: "#0a0a0a", accent: "#06b6d4", text: "#22d3ee" },
  { id: "mint", label: "Emerald Mint", bg: "#022c22", accent: "#10b981", text: "#d1fae5" },
  { id: "sunset", label: "Sunset Purple", bg: "#1e1028", accent: "#d946ef", text: "#f5d0fe" },
];

interface Project { title: string; desc: string; link: string; }

export default function PortfolioCreatorPanel() {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [about, setAbout] = useState("");
  const [github, setGithub] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail] = useState("");
  const [theme, setTheme] = useState(THEMES[0]);
  const [projects, setProjects] = useState<Project[]>([{ title: "", desc: "", link: "" }]);
  const [showPreview, setShowPreview] = useState(false);

  const addProject = () => setProjects(p => [...p, { title: "", desc: "", link: "" }]);
  const removeProject = (i: number) => setProjects(p => p.filter((_, idx) => idx !== i));
  const updateProject = (i: number, field: keyof Project, val: string) => {
    setProjects(p => p.map((proj, idx) => idx === i ? { ...proj, [field]: val } : proj));
  };

  const generateHTML = () => {
    const t = theme;
    const projectCards = projects.filter(p => p.title).map(p => `
      <div style="background:${t.bg};border:1px solid ${t.accent}33;border-radius:16px;padding:24px;transition:transform .2s" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
        <h3 style="color:${t.accent};font-size:18px;margin:0 0 8px">${p.title}</h3>
        <p style="color:${t.text}99;font-size:13px;margin:0 0 12px">${p.desc}</p>
        ${p.link ? `<a href="${p.link}" target="_blank" style="color:${t.accent};font-size:12px;text-decoration:none">View Project →</a>` : ""}
      </div>`).join("\n");

    return `<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${name || "Developer"} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:${t.bg};color:${t.text};min-height:100vh}
.hero{text-align:center;padding:80px 20px 40px}
.hero h1{font-size:48px;font-weight:800;background:linear-gradient(135deg,${t.accent},${t.text});-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.hero p{font-size:18px;opacity:.7;margin-top:8px}
.about{max-width:700px;margin:0 auto;padding:20px;text-align:center;font-size:15px;opacity:.8;line-height:1.7}
.projects{max-width:900px;margin:40px auto;padding:0 20px;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:20px}
.links{text-align:center;padding:40px 20px;display:flex;justify-content:center;gap:16px;flex-wrap:wrap}
.links a{color:${t.accent};text-decoration:none;padding:10px 24px;border:1px solid ${t.accent}44;border-radius:999px;font-size:13px;font-weight:600;transition:all .2s}
.links a:hover{background:${t.accent}22}
footer{text-align:center;padding:40px;font-size:11px;opacity:.4}
</style></head><body>
<div class="hero"><h1>${name || "Your Name"}</h1><p>${tagline || "Developer & Creator"}</p></div>
<div class="about">${about || "A passionate developer building amazing things."}</div>
<div class="projects">${projectCards}</div>
<div class="links">
${github ? `<a href="${github}" target="_blank">GitHub</a>` : ""}
${linkedin ? `<a href="${linkedin}" target="_blank">LinkedIn</a>` : ""}
${email ? `<a href="mailto:${email}">Email</a>` : ""}
</div>
<footer>Built with AI Career OS Portfolio Creator</footer>
</body></html>`;
  };

  const downloadPortfolio = () => {
    const html = generateHTML();
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${(name || "portfolio").replace(/\s+/g, "_")}_Portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Editor */}
      <div className="space-y-4">
        <div className="p-6 rounded-3xl border border-border bg-white/5 space-y-4">
          <h3 className="text-lg font-display flex items-center gap-2"><Palette size={20} className="text-fuchsia-400" /> Profile Info</h3>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-fuchsia-400" />
          <input value={tagline} onChange={e => setTagline(e.target.value)} placeholder="Tagline (e.g. Full-Stack Developer)" className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-fuchsia-400" />
          <textarea value={about} onChange={e => setAbout(e.target.value)} placeholder="About Me" rows={3} className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-fuchsia-400 resize-none" />
          <div className="grid grid-cols-3 gap-3">
            <input value={github} onChange={e => setGithub(e.target.value)} placeholder="GitHub URL" className="bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-fuchsia-400" />
            <input value={linkedin} onChange={e => setLinkedin(e.target.value)} placeholder="LinkedIn URL" className="bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-fuchsia-400" />
            <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" className="bg-black/30 border border-white/10 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-fuchsia-400" />
          </div>
        </div>

        {/* Projects */}
        <div className="p-6 rounded-3xl border border-border bg-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-purple-400">Projects</h3>
            <button onClick={addProject} className="text-xs px-3 py-1.5 rounded-full bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 flex items-center gap-1"><Plus size={12} /> Add</button>
          </div>
          {projects.map((p, i) => (
            <div key={i} className="space-y-2 p-3 rounded-xl bg-black/20 border border-white/5">
              <div className="flex gap-2">
                <input value={p.title} onChange={e => updateProject(i, "title", e.target.value)} placeholder="Project Title" className="flex-1 bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-400" />
                <button onClick={() => removeProject(i)} className="p-2 rounded-lg hover:bg-red-500/20 text-red-400"><Trash2 size={14} /></button>
              </div>
              <input value={p.desc} onChange={e => updateProject(i, "desc", e.target.value)} placeholder="Short description" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-400" />
              <input value={p.link} onChange={e => updateProject(i, "link", e.target.value)} placeholder="Live URL / GitHub link" className="w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-purple-400" />
            </div>
          ))}
        </div>

        {/* Theme */}
        <div className="p-6 rounded-3xl border border-border bg-white/5 space-y-3">
          <h3 className="text-sm font-bold text-cyan-400">Select Theme</h3>
          <div className="grid grid-cols-2 gap-3">
            {THEMES.map(t => (
              <button key={t.id} onClick={() => setTheme(t)}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${theme.id === t.id ? "border-fuchsia-500 bg-fuchsia-500/10 text-fuchsia-300" : "border-white/10 bg-black/20 text-slate-400 hover:border-white/30"}`}>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-4 h-4 rounded-full" style={{ background: t.accent }} />
                  {t.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Preview & Actions */}
      <div className="space-y-4">
        <div className="p-6 rounded-3xl border border-border bg-white/5 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-emerald-400">Actions</h3>
            <button onClick={() => setShowPreview(!showPreview)} className="text-xs px-3 py-1.5 rounded-full bg-cyan-500/20 text-cyan-300 hover:bg-cyan-500/30 flex items-center gap-1"><Eye size={12} /> {showPreview ? "Hide" : "Show"} Preview</button>
          </div>
          <button onClick={downloadPortfolio} className="w-full px-6 py-3 rounded-full bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2">
            <Download size={16} /> Download HTML Portfolio
          </button>
        </div>

        {showPreview && (
          <div className="rounded-3xl border border-border overflow-hidden" style={{ height: 500 }}>
            <iframe srcDoc={generateHTML()} title="Portfolio Preview" className="w-full h-full border-0" sandbox="allow-same-origin" />
          </div>
        )}
      </div>
    </div>
  );
}
