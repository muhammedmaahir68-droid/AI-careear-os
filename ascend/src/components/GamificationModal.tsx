import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Trophy, Sparkles, Gem, Flame, Award, Gift, CheckCircle2, ChevronRight, Zap, Shield, Star, RefreshCw } from "lucide-react";

interface GamificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  rewardType?: "module_complete" | "daily_40q" | "streak_bonus" | "level_up";
  xpEarned?: number;
  diamondsEarned?: number;
  badgeName?: string;
}

export const LEAGUES = [
  { name: "Bronze Diamond", icon: "💎", minXp: 0, color: "from-amber-700 to-amber-900", border: "border-amber-600/40" },
  { name: "Silver Diamond", icon: "⚡", minXp: 500, color: "from-slate-400 to-slate-600", border: "border-slate-400/40" },
  { name: "Gold Diamond", icon: "🌟", minXp: 1500, color: "from-yellow-400 to-amber-500", border: "border-yellow-400/40" },
  { name: "Platinum League", icon: "✨", minXp: 3000, color: "from-cyan-400 to-blue-500", border: "border-cyan-400/40" },
  { name: "Emerald League", icon: "❇️", minXp: 5000, color: "from-emerald-400 to-green-600", border: "border-emerald-400/40" },
  { name: "Master Diamond", icon: "👑", minXp: 8000, color: "from-purple-500 to-indigo-600", border: "border-purple-400/40" },
  { name: "Placement Legend", icon: "🏆", minXp: 12000, color: "from-rose-500 to-amber-500", border: "border-rose-400/40" },
];

export default function GamificationModal({
  isOpen,
  onClose,
  rewardType = "module_complete",
  xpEarned = 150,
  diamondsEarned = 50,
  badgeName = "Placement Cracker"
}: GamificationModalProps) {
  const [chestOpened, setChestOpened] = useState(false);
  const [claimed, setClaimed] = useState(false);

  if (!isOpen) return null;

  const handleOpenChest = () => {
    setChestOpened(true);
  };

  const handleClaim = () => {
    setClaimed(true);
    setTimeout(() => {
      onClose();
      setChestOpened(false);
      setClaimed(false);
    }, 800);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 20 }}
          className="relative w-full max-w-lg p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-purple-950/80 to-slate-950 border border-purple-500/40 shadow-2xl shadow-purple-500/20 text-center overflow-hidden"
        >
          {/* Glowing Background FX */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl" />

          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <span className="flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Flame size={14} className="text-amber-400 animate-bounce" /> Duolingo Placement League
            </span>
            <span className="flex items-center gap-1 text-xs font-mono text-cyan-300 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
              <Gem size={14} className="text-cyan-400" /> +{diamondsEarned} Diamonds
            </span>
          </div>

          {!chestOpened ? (
            /* CLOSED LOOT CHEST STATE */
            <div className="py-8 space-y-6">
              <motion.div
                animate={{ y: [0, -10, 0], rotate: [-1, 1, -1] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="relative inline-block cursor-pointer group"
                onClick={handleOpenChest}
              >
                <div className="w-32 h-32 mx-auto rounded-3xl bg-gradient-to-tr from-amber-600 to-yellow-400 p-1 shadow-xl shadow-amber-500/30 flex items-center justify-center group-hover:scale-105 transition-transform">
                  <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-6xl">
                    🎁
                  </div>
                </div>
                <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                  TAP TO UNLOCK
                </div>
              </motion.div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-1">Daily Placement Prize Chest!</h3>
                <p className="text-xs text-slate-300 max-w-xs mx-auto">
                  You finished your day-wise target! Tap the chest to crack open your diamond rewards & XP multipliers.
                </p>
              </div>

              <button
                onClick={handleOpenChest}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 font-bold text-slate-950 text-sm shadow-lg shadow-amber-500/20 hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles size={18} /> Crack Open Loot Box!
              </button>
            </div>
          ) : (
            /* UNLOCKED REWARDS STATE */
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="py-4 space-y-5"
            >
              <div className="text-6xl animate-bounce">💎</div>

              <div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                  Level Cracked! Rewards Unlocked 🎉
                </h3>
                <p className="text-xs text-slate-300">Your daily streak is active and your placement ranking boosted!</p>
              </div>

              {/* Reward Grid */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-2xl bg-slate-900/90 border border-amber-500/30 text-center">
                  <div className="text-xl font-bold text-amber-400">+{xpEarned}</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">XP Gained</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/90 border border-cyan-500/30 text-center">
                  <div className="text-xl font-bold text-cyan-400">+{diamondsEarned} 💎</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">Diamonds</div>
                </div>

                <div className="p-3 rounded-2xl bg-slate-900/90 border border-rose-500/30 text-center">
                  <div className="text-xl font-bold text-rose-400">2x</div>
                  <div className="text-[10px] text-slate-400 uppercase font-semibold">XP Boost 1hr</div>
                </div>
              </div>

              {/* Badge Unlock Notification */}
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/40 to-indigo-900/40 border border-purple-400/30 flex items-center gap-3 text-left">
                <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-300 shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <div className="text-xs font-bold text-purple-200">Unlocked Badge: {badgeName}</div>
                  <div className="text-[10px] text-slate-400">Recognized by MNC Recruiters on your profile portfolio!</div>
                </div>
              </div>

              <button
                onClick={handleClaim}
                disabled={claimed}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 font-bold text-white text-sm shadow-lg shadow-emerald-500/20 hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-2"
              >
                {claimed ? (
                  <span className="flex items-center gap-2"><CheckCircle2 size={18} /> Rewards Claimed!</span>
                ) : (
                  <span className="flex items-center gap-2">Claim Rewards & Resume Task <ChevronRight size={18} /></span>
                )}
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
