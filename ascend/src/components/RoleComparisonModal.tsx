import React, { useState } from "react";
import { X, ArrowRight, CheckCircle2, Award, Building2, Code2, Zap, Shield, Cpu } from "lucide-react";
import { BRANCHES } from "../data/branches";
import { ROLE_TAXONOMY_MAP } from "../data/roleTaxonomy";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  initialRole1?: string;
  initialRole2?: string;
}

export default function RoleComparisonModal({ isOpen, onClose, initialRole1 = "cse-backend", initialRole2 = "cse-devops" }: Props) {
  const [role1Id, setRole1Id] = useState(initialRole1);
  const [role2Id, setRole2Id] = useState(initialRole2);

  if (!isOpen) return null;

  const allRoles = BRANCHES.flatMap(b => b.roles.map(r => ({ ...r, branchName: b.name })));

  const r1Tax = ROLE_TAXONOMY_MAP[role1Id] || {};
  const r2Tax = ROLE_TAXONOMY_MAP[role2Id] || {};

  const r1Info = allRoles.find(r => r.id === role1Id);
  const r2Info = allRoles.find(r => r.id === role2Id);

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-card border border-border rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-fade-rise">
        {/* Header */}
        <div className="p-6 border-b border-border bg-gradient-to-r from-purple-950/40 via-background to-blue-950/40 flex justify-between items-center shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Zap size={20} className="text-purple-400" />
              <h2 className="text-lg font-bold text-foreground">Role Intelligence Comparison Tool</h2>
            </div>
            <p className="text-xs text-muted-foreground mt-0.5">Compare skills, tools, target companies, and curriculum architecture side-by-side.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Role Selectors */}
        <div className="p-6 border-b border-border bg-muted/40 grid grid-cols-1 md:grid-cols-2 gap-6 shrink-0">
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-2">Select First Role</label>
            <select
              value={role1Id}
              onChange={e => setRole1Id(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-xs font-medium focus:outline-none focus:border-purple-500"
            >
              {allRoles.map(r => (
                <option key={r.id} value={r.id}>[{r.branchName}] {r.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-2">Select Second Role</label>
            <select
              value={role2Id}
              onChange={e => setRole2Id(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-card border border-border text-foreground text-xs font-medium focus:outline-none focus:border-blue-500"
            >
              {allRoles.map(r => (
                <option key={r.id} value={r.id}>[{r.branchName}] {r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Content Comparison Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Role 1 Card */}
            <div className="p-5 rounded-2xl bg-purple-950/10 border border-purple-500/20 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-bold border border-purple-500/30 uppercase tracking-wider">
                    {r1Info?.branchName}
                  </span>
                  <h3 className="text-base font-bold text-foreground mt-2">{r1Info?.name}</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {r1Tax.avgSalaryRange || "Industry Standard"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{r1Tax.careerObjective || r1Info?.description}</p>

              {/* Skills */}
              <div>
                <h4 className="text-xs font-bold text-purple-400 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(r1Tax.requiredSkills || ["System Architecture", "Coding", "Problem Solving"]).map(s => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-card border border-border text-foreground font-medium">{s}</span>
                  ))}
                </div>
              </div>

              {/* Role Specific DSA */}
              <div>
                <h4 className="text-xs font-bold text-purple-400 mb-2">Role-Specific DSA Focus</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {(r1Tax.roleSpecificDSA || ["Arrays & Hashing", "Graphs & Trees"]).map(dsa => (
                    <li key={dsa} className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-purple-400 shrink-0" /> {dsa}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools & Frameworks */}
              <div>
                <h4 className="text-xs font-bold text-purple-400 mb-2">Tools & Frameworks</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(r1Tax.tools || ["Git", "Docker"]).concat(r1Tax.frameworks || []).map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-300 font-bold border border-purple-500/20">{t}</span>
                  ))}
                </div>
              </div>

              {/* Target MNCs */}
              <div>
                <h4 className="text-xs font-bold text-purple-400 mb-2">Target MNCs</h4>
                <p className="text-xs text-foreground font-medium">{(r1Tax.targetCompanies || ["Google", "Amazon", "Microsoft"]).join(", ")}</p>
              </div>
            </div>

            {/* Role 2 Card */}
            <div className="p-5 rounded-2xl bg-blue-950/10 border border-blue-500/20 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 font-bold border border-blue-500/30 uppercase tracking-wider">
                    {r2Info?.branchName}
                  </span>
                  <h3 className="text-base font-bold text-foreground mt-2">{r2Info?.name}</h3>
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {r2Tax.avgSalaryRange || "Industry Standard"}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{r2Tax.careerObjective || r2Info?.description}</p>

              {/* Skills */}
              <div>
                <h4 className="text-xs font-bold text-blue-400 mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(r2Tax.requiredSkills || ["Infrastructure", "Automation", "Security"]).map(s => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-card border border-border text-foreground font-medium">{s}</span>
                  ))}
                </div>
              </div>

              {/* Role Specific DSA */}
              <div>
                <h4 className="text-xs font-bold text-blue-400 mb-2">Role-Specific DSA Focus</h4>
                <ul className="space-y-1 text-xs text-muted-foreground">
                  {(r2Tax.roleSpecificDSA || ["Network Graphs", "State Machines"]).map(dsa => (
                    <li key={dsa} className="flex items-center gap-1.5">
                      <CheckCircle2 size={12} className="text-blue-400 shrink-0" /> {dsa}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tools & Frameworks */}
              <div>
                <h4 className="text-xs font-bold text-blue-400 mb-2">Tools & Frameworks</h4>
                <div className="flex flex-wrap gap-1.5">
                  {(r2Tax.tools || ["Kubernetes", "Terraform"]).concat(r2Tax.frameworks || []).map(t => (
                    <span key={t} className="text-[10px] px-2 py-0.5 rounded-md bg-blue-500/10 text-blue-300 font-bold border border-blue-500/20">{t}</span>
                  ))}
                </div>
              </div>

              {/* Target MNCs */}
              <div>
                <h4 className="text-xs font-bold text-blue-400 mb-2">Target MNCs</h4>
                <p className="text-xs text-foreground font-medium">{(r2Tax.targetCompanies || ["AWS", "NVIDIA", "Apple"]).join(", ")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
