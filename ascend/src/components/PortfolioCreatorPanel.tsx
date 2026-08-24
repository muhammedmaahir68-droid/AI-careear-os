import React, { useState } from "react";
import { Download, Plus, Trash2, Eye, Palette, FileText, GitBranch, Sparkles, CheckCircle2, RefreshCw } from "lucide-react";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";
import { saveAs } from "file-saver";

const THEMES = [
  { id: "slate", label: "Classic Slate", bg: "#0f172a", accent: "#8b5cf6", text: "#e2e8f0" },
  { id: "cyber", label: "Cyberpunk Neon", bg: "#0a0a0a", accent: "#06b6d4", text: "#22d3ee" },
  { id: "mint", label: "Emerald Mint", bg: "#022c22", accent: "#10b981", text: "#d1fae5" },
  { id: "sunset", label: "Sunset Purple", bg: "#1e1028", accent: "#d946ef", text: "#f5d0fe" },
];

interface Project { title: string; desc: string; link: string; }

interface GitHubRepoData {
  user: any;
  repos: any[];
  totalStars: number;
  topLanguages: string[];
}

export default function PortfolioCreatorPanel() {
  const [name, setName] = useState("");
  const [tagline, setTagline] = useState("");
  const [about, setAbout] = useState("");
  const [github, setGitBranch] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [email, setEmail] = useState("");
  const [skills, setSkills] = useState("");
  const [theme, setTheme] = useState(THEMES[0]);
  const [projects, setProjects] = useState<Project[]>([{ title: "", desc: "", link: "" }]);
  const [showPreview, setShowPreview] = useState(false);
  const [generatingDocx, setGeneratingDocx] = useState(false);

  // Real GitHub analyzer state
  const [githubUsername, setGitBranchUsername] = useState("");
  const [githubToken, setGitBranchToken] = useState("");
  const [githubLoading, setGitBranchLoading] = useState(false);
  const [githubData, setGitBranchData] = useState<GitHubRepoData | null>(null);
  const [githubError, setGitBranchError] = useState("");

  const addProject = () => setProjects(p => [...p, { title: "", desc: "", link: "" }]);
  const removeProject = (i: number) => setProjects(p => p.filter((_, idx) => idx !== i));
  const updateProject = (i: number, field: keyof Project, val: string) => {
    setProjects(p => p.map((proj, idx) => idx === i ? { ...proj, [field]: val } : proj));
  };

  // Real DOCX resume generator using template
  const generateDocxResume = async () => {
    setGeneratingDocx(true);
    try {
      const res = await fetch("/resume-template.docx");
      if (!res.ok) throw new Error("Resume template file not found in public folder");
      const arrayBuffer = await res.arrayBuffer();
      const zip = new PizZip(arrayBuffer);
      const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
      });

      doc.setData({
        NAME: name || "Mohamed Maahir M",
        TAGLINE: tagline || "Software Engineer",
        EMAIL: email || "user@example.com",
        GITHUB: github || "https://github.com",
        LINKEDIN: linkedin || "https://linkedin.com",
        ABOUT: about || "Passionate engineer skilled in software design and development.",
        SKILLS: skills || "JavaScript, TypeScript, React, Node.js, Python, SQL, Git",
        PROJECTS: projects
          .filter(p => p.title)
          .map(p => `• ${p.title}: ${p.desc}${p.link ? ` (${p.link})` : ""}`)
          .join("\n"),
      });

      doc.render();
      const out = doc.getZip().generate({
        type: "blob",
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });

      saveAs(out, `${(name || "Mohamed_Maahir").replace(/\s+/g, "_")}_Resume.docx`);
    } catch (err: any) {
      console.error("DOCX generation error:", err);
      alert(`Error generating DOCX resume: ${err.message}`);
    } finally {
      setGeneratingDocx(false);
    }
  };

  // Real GitHub API fetcher
  const analyzeGitHub = async () => {
    if (!githubUsername.trim()) return;
    setGitBranchLoading(true);
    setGitBranchError("");
    try {
      const headers: Record<string, string> = { Accept: "application/vnd.github.v3+json" };
      if (githubToken.trim()) headers["Authorization"] = `token ${githubToken.trim()}`;

      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${githubUsername.trim()}`, { headers }),
        fetch(`https://api.github.com/users/${githubUsername.trim()}/repos?sort=updated&per_page=30`, { headers }),
      ]);

      if (!userRes.ok) throw new Error(`GitHub user "${githubUsername}" not found.`);
      const user = await userRes.json();
      const repos = await reposRes.json();

      const languages: Record<string, number> = {};
      repos.forEach((r: any) => {
        if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
      });

      const topLangs = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang);

      const totalStars = repos.reduce((sum: number, r: any) => sum + r.stargazers_count, 0);

      setGitBranchData({
        user,
        repos: repos.slice(0, 8),
        totalStars,
        topLanguages: topLangs,
      });

      // Auto fill form fields if empty
      if (!name) setName(user.name || user.login);
      if (!about) setAbout(user.bio || "");
      if (!github) setGitBranch(user.html_url);
    } catch (err: any) {
      setGitBranchError(err.message);
    } finally {
      setGitBranchLoading(false);
    }
  };

  const importRepoAsProject = (repo: any) => {
    setProjects(prev => {
      const emptyIdx = prev.findIndex(p => !p.title);
      const newProj = { title: repo.name, desc: repo.description || `Built with ${repo.language || "code"}`, link: repo.html_url };
      if (emptyIdx !== -1) {
        const updated = [...prev];
        updated[emptyIdx] = newProj;
        return updated;
      }
      return [...prev, newProj];
    });
  };

  const generateHTML = () => {
    const t = theme;
    const projectCards = projects
      .filter(p => p.title)
      .map(
        p => `
      <div style="background:${t.bg};border:1px solid ${t.accent}33;border-radius:16px;padding:24px;transition:transform .2s" onmouseover="this.style.transform='translateY(-4px)'" onmouseout="this.style.transform='translateY(0)'">
        <h3 style="color:${t.accent};font-size:18px;margin:0 0 8px">${p.title}</h3>
        <p style="color:${t.text}99;font-size:13px;margin:0 0 12px">${p.desc}</p>
        ${p.link ? `<a href="${p.link}" target="_blank" style="color:${t.accent};font-size:12px;text-decoration:none">View Project →</a>` : ""}
      </div>`
      )
      .join("\n");

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
<footer>Built with CARVEX Portfolio Creator</footer>
</body></html>`;
  };

  const downloadHTML = () => {
    const blob = new Blob([generateHTML()], { type: "text/html" });
    saveAs(blob, `${(name || "portfolio").toLowerCase().replace(/\s+/g, "-")}.html`);
  };

  return (
    <div className="space-y-6">
      {/* Real GitHub Analyzer Section */}
      <div className="p-6 rounded-3xl bg-card border border-border space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <GitBranch size={20} className="text-purple-400" />
            <h2 className="text-base font-bold text-foreground">Real GitHub Analyzer & Auto-Import</h2>
          </div>
          <span className="text-xs px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 font-bold border border-purple-500/20">LIVE API</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <input
            type="text"
            value={githubUsername}
            onChange={e => setGitBranchUsername(e.target.value)}
            placeholder="GitHub Username (e.g. torvalds)"
            className="px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-xs focus:outline-none focus:border-purple-500"
          />
          <input
            type="password"
            value={githubToken}
            onChange={e => setGitBranchToken(e.target.value)}
            placeholder="PAT Token (optional for private repos)"
            className="px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-xs focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={analyzeGitHub}
            disabled={githubLoading || !githubUsername}
            className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            {githubLoading ? <RefreshCw size={14} className="animate-spin" /> : <GitBranch size={14} />} Analyze Profile
          </button>
        </div>

        {githubError && <p className="text-xs text-red-400 font-mono">Error: {githubError}</p>}

        {githubData && (
          <div className="p-4 rounded-2xl bg-muted border border-border space-y-3">
            <div className="flex items-center gap-4">
              <img src={githubData.user.avatar_url} alt="Avatar" className="w-12 h-12 rounded-full border border-purple-500/30" />
              <div>
                <h4 className="text-sm font-bold text-foreground">{githubData.user.name || githubData.user.login}</h4>
                <p className="text-xs text-muted-foreground">{githubData.user.bio || "GitHub Developer"}</p>
                <div className="flex gap-3 text-[11px] text-purple-400 mt-1">
                  <span>⭐ {githubData.totalStars} Stars</span>
                  <span>📦 {githubData.user.public_repos} Repos</span>
                  <span>👥 {githubData.user.followers} Followers</span>
                </div>
              </div>
            </div>

            {githubData.topLanguages.length > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-muted-foreground">Top Tech:</span>
                {githubData.topLanguages.map(l => (
                  <span key={l} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30">
                    {l}
                  </span>
                ))}
              </div>
            )}

            <div className="space-y-2">
              <span className="text-xs font-bold text-muted-foreground">Repositories (Click + to import to resume):</span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {githubData.repos.map(r => (
                  <div key={r.id} className="p-2.5 rounded-xl bg-card border border-border flex items-center justify-between">
                    <div className="truncate pr-2">
                      <p className="text-xs font-bold text-foreground truncate">{r.name}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{r.description || "No description"}</p>
                    </div>
                    <button
                      onClick={() => importRepoAsProject(r)}
                      title="Import as Project"
                      className="px-2 py-1 rounded-lg bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white text-[10px] font-bold shrink-0 transition-all"
                    >
                      + Import
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Resume & Portfolio Builder Controls */}
      <div className="p-6 rounded-3xl bg-card border border-border space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-foreground">Resume & Portfolio Generator</h2>
            <p className="text-xs text-muted-foreground">Export as a real Word document (.docx) using your exact template or export as an HTML portfolio.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={generateDocxResume}
              disabled={generatingDocx}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all disabled:opacity-50"
            >
              {generatingDocx ? <RefreshCw size={14} className="animate-spin" /> : <FileText size={14} />} Export Word Resume (.docx)
            </button>
            <button
              onClick={downloadHTML}
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg transition-all"
            >
              <Download size={14} /> Export HTML Portfolio
            </button>
          </div>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Mohamed Maahir M"
              className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-xs focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Tagline / Target Role</label>
            <input
              type="text"
              value={tagline}
              onChange={e => setTagline(e.target.value)}
              placeholder="Software Engineer | Full Stack Developer"
              className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-xs focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="maahir@example.com"
              className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-xs focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">GitHub URL</label>
            <input
              type="text"
              value={github}
              onChange={e => setGitBranch(e.target.value)}
              placeholder="https://github.com/maahir"
              className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-xs focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">LinkedIn URL</label>
            <input
              type="text"
              value={linkedin}
              onChange={e => setLinkedin(e.target.value)}
              placeholder="https://linkedin.com/in/maahir"
              className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-xs focus:outline-none focus:border-purple-500"
            />
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Key Technical Skills</label>
            <input
              type="text"
              value={skills}
              onChange={e => setSkills(e.target.value)}
              placeholder="Python, React, TypeScript, Node.js, SQL, Docker, AWS"
              className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-xs focus:outline-none focus:border-purple-500"
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-bold text-muted-foreground block mb-1">Professional Summary / About</label>
          <textarea
            value={about}
            onChange={e => setAbout(e.target.value)}
            rows={3}
            placeholder="Passionate engineer with expertise in building scalable web apps and AI systems..."
            className="w-full px-4 py-2.5 rounded-xl bg-muted border border-border text-foreground text-xs focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Projects Section */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-xs font-bold text-muted-foreground">Projects ({projects.length})</label>
            <button onClick={addProject} className="text-xs px-3 py-1 rounded-lg bg-purple-500/10 text-purple-400 font-bold border border-purple-500/20 flex items-center gap-1">
              <Plus size={12} /> Add Project
            </button>
          </div>

          {projects.map((proj, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-muted border border-border space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-foreground">Project #{idx + 1}</span>
                {projects.length > 1 && (
                  <button onClick={() => removeProject(idx)} className="text-red-400 hover:text-red-300">
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input
                  type="text"
                  value={proj.title}
                  onChange={e => updateProject(idx, "title", e.target.value)}
                  placeholder="Project Title"
                  className="px-3 py-2 rounded-lg bg-card border border-border text-foreground text-xs focus:outline-none"
                />
                <input
                  type="text"
                  value={proj.link}
                  onChange={e => updateProject(idx, "link", e.target.value)}
                  placeholder="Project Link / Repo URL"
                  className="px-3 py-2 rounded-lg bg-card border border-border text-foreground text-xs focus:outline-none"
                />
              </div>
              <input
                type="text"
                value={proj.desc}
                onChange={e => updateProject(idx, "desc", e.target.value)}
                placeholder="Description & Impact (e.g. Built full-stack app using React & Node, serving 500+ users)"
                className="w-full px-3 py-2 rounded-lg bg-card border border-border text-foreground text-xs focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
