import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Server, BrainCircuit, Database, CircuitBoard, Zap, Cog, ChevronRight, CheckCircle2, ArrowLeft } from "lucide-react";
import { BRANCHES, type Branch } from "../data/branches";

const ICON_MAP: Record<string, React.ReactNode> = {
  Code2: <Code2 size={32} />,
  Server: <Server size={32} />,
  BrainCircuit: <BrainCircuit size={32} />,
  Database: <Database size={32} />,
  CircuitBoard: <CircuitBoard size={32} />,
  Zap: <Zap size={32} />,
  Cog: <Cog size={32} />,
};

const BRANCH_COLORS: Record<string, string> = {
  cse:   "from-blue-600/20 to-blue-500/5 border-blue-500/30 text-blue-400",
  it:    "from-indigo-600/20 to-indigo-500/5 border-indigo-500/30 text-indigo-400",
  aiml:  "from-purple-600/20 to-purple-500/5 border-purple-500/30 text-purple-400",
  aids:  "from-violet-600/20 to-violet-500/5 border-violet-500/30 text-violet-400",
  ece:   "from-green-600/20 to-green-500/5 border-green-500/30 text-green-400",
  eee:   "from-yellow-600/20 to-yellow-500/5 border-yellow-500/30 text-yellow-400",
  mech:  "from-orange-600/20 to-orange-500/5 border-orange-500/30 text-orange-400",
};

interface BranchRolePickerProps {
  onSelect: (branchId: string, roleId: string) => void;
  currentBranchId?: string | null;
  currentRoleId?: string | null;
}

export default function BranchRolePicker({ onSelect, currentBranchId, currentRoleId }: BranchRolePickerProps) {
  const [step, setStep] = useState<"branch" | "role">(currentBranchId ? "role" : "branch");
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(
    currentBranchId ? BRANCHES.find((b) => b.id === currentBranchId) ?? null : null
  );
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(currentRoleId ?? null);

  const handleBranchSelect = (branch: Branch) => {
    setSelectedBranch(branch);
    setSelectedRoleId(null);
    setStep("role");
  };

  const handleConfirm = () => {
    if (selectedBranch && selectedRoleId) {
      onSelect(selectedBranch.id, selectedRoleId);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {step === "branch" ? (
            <motion.div
              key="branch-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-10">
                <h1 className="text-4xl font-display font-bold mb-3 bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                  Choose Your Branch
                </h1>
                <p className="text-muted-foreground">Select your engineering discipline to get a personalized syllabus</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BRANCHES.map((branch, i) => {
                  const colorClass = BRANCH_COLORS[branch.id] ?? "from-gray-600/20 to-gray-500/5 border-gray-500/30 text-gray-400";
                  return (
                    <motion.button
                      key={branch.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.07 }}
                      whileHover={{ scale: 1.03, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => handleBranchSelect(branch)}
                      className={`p-6 rounded-2xl border bg-gradient-to-br text-left transition-all ${colorClass} hover:shadow-lg hover:shadow-black/20`}
                    >
                      <div className="mb-4 opacity-80">{ICON_MAP[branch.icon]}</div>
                      <h3 className="text-base font-bold mb-1 text-white">{branch.name}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed mb-3">{branch.description}</p>
                      <div className="flex items-center gap-1 text-xs font-medium opacity-70">
                        {branch.roles.length} career tracks <ChevronRight size={12} />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="role-step"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <button
                  onClick={() => { setStep("branch"); setSelectedBranch(null); }}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors"
                >
                  <ArrowLeft size={16} /> Back to branches
                </button>
                <div className="flex-1 text-center">
                  <h1 className="text-3xl font-display font-bold mb-1">Choose Your Career Track</h1>
                  <p className="text-muted-foreground text-sm">
                    Branch: <span className="text-white font-medium">{selectedBranch?.name}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {selectedBranch?.roles.map((role, i) => {
                  const isSelected = selectedRoleId === role.id;
                  const colorClass = BRANCH_COLORS[selectedBranch.id] ?? "";
                  return (
                    <motion.button
                      key={role.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedRoleId(role.id)}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? `bg-gradient-to-br ${colorClass} shadow-lg`
                          : "bg-white/5 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h4 className="text-sm font-bold mb-1 text-white">{role.name}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{role.description}</p>
                        </div>
                        {isSelected && <CheckCircle2 size={20} className="text-green-400 shrink-0 mt-0.5" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConfirm}
                  disabled={!selectedRoleId}
                  className="px-10 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:opacity-40 text-white font-bold rounded-full text-sm transition-all shadow-lg shadow-blue-500/20"
                >
                  🚀 Start My Personalized Roadmap
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
