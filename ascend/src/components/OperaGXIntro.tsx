import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface OperaGXIntroProps {
  onComplete: () => void;
}

export default function OperaGXIntro({ onComplete }: OperaGXIntroProps) {
  const [stage, setStage] = useState<"init" | "glitch" | "assemble" | "shockwave" | "exit">("init");
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play Opera GX style futuristic cyber synth startup sound using Web Audio API
  const playOperaGXSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const now = ctx.currentTime;

      // ── 1. SUB-BASS REVERBERATION DROP ──
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sine";
      subOsc.frequency.setValueAtTime(140, now);
      subOsc.frequency.exponentialRampToValueAtTime(35, now + 1.2);
      subGain.gain.setValueAtTime(0.7, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);
      subOsc.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 1.8);

      // ── 2. HIGH-TECH OPERA GX CYBER SWIPE RAMP ──
      const sweepOsc = ctx.createOscillator();
      const sweepGain = ctx.createGain();
      sweepOsc.type = "sawtooth";
      sweepOsc.frequency.setValueAtTime(200, now + 0.2);
      sweepOsc.frequency.exponentialRampToValueAtTime(2800, now + 0.9);
      sweepGain.gain.setValueAtTime(0.01, now + 0.2);
      sweepGain.gain.linearRampToValueAtTime(0.15, now + 0.7);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      sweepOsc.connect(sweepGain);
      sweepGain.connect(ctx.destination);
      sweepOsc.start(now + 0.2);
      sweepOsc.stop(now + 1.2);

      // ── 3. CRISP LOGO LOCK-IN IMPACT CHIME ──
      const chimeOsc1 = ctx.createOscillator();
      const chimeOsc2 = ctx.createOscillator();
      const chimeGain = ctx.createGain();
      chimeOsc1.type = "triangle";
      chimeOsc2.type = "sine";
      chimeOsc1.frequency.setValueAtTime(523.25, now + 0.85); // C5
      chimeOsc2.frequency.setValueAtTime(1046.50, now + 0.85); // C6
      chimeGain.gain.setValueAtTime(0.35, now + 0.85);
      chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);
      chimeOsc1.connect(chimeGain);
      chimeOsc2.connect(chimeGain);
      chimeGain.connect(ctx.destination);
      chimeOsc1.start(now + 0.85);
      chimeOsc2.start(now + 0.85);
      chimeOsc1.stop(now + 2.2);
      chimeOsc2.stop(now + 2.2);

      // ── 4. NEON LASER GLITCH SPARKLE ──
      const sparkOsc = ctx.createOscillator();
      const sparkGain = ctx.createGain();
      sparkOsc.type = "square";
      sparkOsc.frequency.setValueAtTime(1800, now + 0.85);
      sparkOsc.frequency.linearRampToValueAtTime(400, now + 1.1);
      sparkGain.gain.setValueAtTime(0.08, now + 0.85);
      sparkGain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);
      sparkOsc.connect(sparkGain);
      sparkGain.connect(ctx.destination);
      sparkOsc.start(now + 0.85);
      sparkOsc.stop(now + 1.1);
    } catch {
      // Audio autoplay restrictions silent catch
    }
  };

  useEffect(() => {
    // Stage 1: Trigger audio & initial grid scan
    playOperaGXSound();
    setStage("glitch");

    // Stage 2: Letter assembly (0.5s)
    const timer1 = setTimeout(() => setStage("assemble"), 500);
    // Stage 3: Shockwave & vertex ignition (1.1s)
    const timer2 = setTimeout(() => setStage("shockwave"), 1100);
    // Stage 4: Zoom & fade exit (2.4s)
    const timer3 = setTimeout(() => setStage("exit"), 2400);
    // Stage 5: Complete & unmount (2.9s)
    const timer4 = setTimeout(() => onComplete(), 2900);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch {}
      }
    };
  }, []);

  const letters = ["C", "A", "R", "V", "E", "X"];

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.15, filter: "blur(12px)" }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
          className="fixed inset-0 z-50 bg-[#030712] text-white flex flex-col items-center justify-center overflow-hidden select-none"
        >
          {/* Cyberpunk Grid Background with Scanlines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e1b4b15_1px,transparent_1px),linear-gradient(to_bottom,#1e1b4b15_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Opera GX Horizontal Laser Scanline */}
          <motion.div
            initial={{ top: "-10%" }}
            animate={{ top: ["0%", "100%", "50%"] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_25px_#00E5FF] opacity-75 pointer-events-none"
          />

          {/* Shockwave Radial Energy Pulse */}
          {stage === "shockwave" && (
            <motion.div
              initial={{ scale: 0.1, opacity: 0.9 }}
              animate={{ scale: 3.5, opacity: 0 }}
              transition={{ duration: 0.85, ease: "easeOut" }}
              className="absolute w-72 h-72 rounded-full border-2 border-[#00E5FF] shadow-[0_0_60px_#00E5FF,inset_0_0_40px_#7C3AED] pointer-events-none"
            />
          )}

          {/* HUD Tech Corner Brackets */}
          <div className="absolute top-8 left-8 border-t-2 border-l-2 border-[#7C3AED]/60 w-8 h-8 pointer-events-none" />
          <div className="absolute top-8 right-8 border-t-2 border-r-2 border-[#00E5FF]/60 w-8 h-8 pointer-events-none" />
          <div className="absolute bottom-8 left-8 border-b-2 border-l-2 border-[#00E5FF]/60 w-8 h-8 pointer-events-none" />
          <div className="absolute bottom-8 right-8 border-b-2 border-r-2 border-[#7C3AED]/60 w-8 h-8 pointer-events-none" />

          {/* Top Opera GX Style Status Bar */}
          <div className="absolute top-8 flex items-center gap-3 text-[10px] font-mono tracking-widest text-slate-500 uppercase">
            <span className="w-2 h-2 rounded-full bg-[#00E5FF] animate-ping" />
            <span>CARVEX ENGINE v2.0 // INITIALIZED</span>
          </div>

          {/* CENTRAL LOGO LOCKUP */}
          <div className="relative flex flex-col items-center justify-center gap-6">
            
            {/* CARVEX Vertex Icon Mark */}
            <motion.div
              initial={{ scale: 0, rotate: -45, opacity: 0 }}
              animate={{
                scale: stage === "shockwave" ? [1, 1.25, 1] : 1,
                rotate: 0,
                opacity: 1,
              }}
              transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
              className="relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(124,58,237,0.5)]"
              style={{ background: "linear-gradient(135deg, #7C3AED 0%, #00E5FF 100%)" }}
            >
              <svg width="40" height="40" viewBox="0 0 22 22" fill="none">
                <polyline
                  points="2,18 11,4 20,18"
                  stroke="white"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="11" cy="4" r="2.5" fill="#00E5FF" />
              </svg>
              {/* Vertex Glow Dot */}
              <span className="absolute -top-1 w-3 h-3 rounded-full bg-[#00E5FF] shadow-[0_0_20px_#00E5FF] animate-pulse" />
            </motion.div>

            {/* OPERA GX STYLE LETTER-BY-LETTER GLITCH ANIMATION */}
            <div className="flex items-center gap-2 md:gap-4 overflow-hidden px-4">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 60, opacity: 0, scale: 0.5, filter: "blur(10px)" }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: stage === "shockwave" ? [1, 1.15, 1] : 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.15 + index * 0.08,
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  }}
                  className="relative text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-widest text-white font-mono"
                  style={{
                    textShadow:
                      stage === "shockwave"
                        ? "0 0 30px #00E5FF, 0 0 60px #7C3AED, -2px 0 #00E5FF, 2px 0 #7C3AED"
                        : "0 0 20px rgba(0,229,255,0.4)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Subtitle / Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: stage === "shockwave" || stage === "assemble" ? 1 : 0.4, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-xs sm:text-sm font-mono tracking-[0.35em] text-cyan-300 uppercase mt-2 text-center"
            >
              REACH YOUR CAREER VERTEX
            </motion.p>
          </div>

          {/* Bottom Controls & Skip */}
          <div className="absolute bottom-8 flex items-center justify-between w-full max-w-4xl px-8 text-[11px] font-mono text-slate-500">
            <span>SYSTEM STATUS: <strong className="text-emerald-400">ONLINE</strong></span>
            <button
              onClick={onComplete}
              className="px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              SKIP INTRO ➔
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
