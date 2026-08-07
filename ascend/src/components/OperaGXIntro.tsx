import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface OperaGXIntroProps {
  onComplete: () => void;
}

export default function OperaGXIntro({ onComplete }: OperaGXIntroProps) {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [stage, setStage] = useState<"ready" | "ignite" | "shockwave" | "exit">("ready");
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Deep, heavy Opera GX sound synthesizer using Web Audio API
  const triggerHeavyOperaGXSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      audioCtxRef.current = ctx;
      const now = ctx.currentTime;

      // ── 1. HEAVY BASS IMPACT DROP (OPERAGX STYLE SUB-BASS) ──
      const bassOsc = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bassOsc.type = "sawtooth";
      bassOsc.frequency.setValueAtTime(180, now);
      bassOsc.frequency.exponentialRampToValueAtTime(32, now + 1.4);

      // Lowpass filter for deep thundering bass punch
      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(800, now);
      filter.frequency.exponentialRampToValueAtTime(120, now + 1.2);

      bassGain.gain.setValueAtTime(0.9, now);
      bassGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0);

      bassOsc.connect(filter);
      filter.connect(bassGain);
      bassGain.connect(ctx.destination);
      bassOsc.start(now);
      bassOsc.stop(now + 2.0);

      // ── 2. HIGH-FREQUENCY CYBER RAMP SWEEP (OPERA GX STUTTER) ──
      const sweepOsc = ctx.createOscillator();
      const sweepGain = ctx.createGain();
      sweepOsc.type = "square";
      sweepOsc.frequency.setValueAtTime(300, now + 0.1);
      sweepOsc.frequency.exponentialRampToValueAtTime(3400, now + 0.9);

      sweepGain.gain.setValueAtTime(0.01, now + 0.1);
      sweepGain.gain.linearRampToValueAtTime(0.25, now + 0.7);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      sweepOsc.connect(sweepGain);
      sweepGain.connect(ctx.destination);
      sweepOsc.start(now + 0.1);
      sweepOsc.stop(now + 1.3);

      // ── 3. CRISP METALLIC POWER-ON LOGO IMPACT (0.8s) ──
      [523.25, 659.25, 783.99, 1046.50, 1567.98].forEach((freq, idx) => {
        const chime = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chime.type = idx % 2 === 0 ? "triangle" : "sine";
        chime.frequency.setValueAtTime(freq, now + 0.75 + idx * 0.04);

        chimeGain.gain.setValueAtTime(0.4, now + 0.75 + idx * 0.04);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

        chime.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chime.start(now + 0.75 + idx * 0.04);
        chime.stop(now + 2.5);
      });

      // ── 4. NEON ENERGY PULSE RIPPLE ──
      const pulseOsc = ctx.createOscillator();
      const pulseGain = ctx.createGain();
      pulseOsc.type = "sine";
      pulseOsc.frequency.setValueAtTime(80, now + 0.8);
      pulseOsc.frequency.linearRampToValueAtTime(440, now + 1.2);
      pulseGain.gain.setValueAtTime(0.3, now + 0.8);
      pulseGain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      pulseOsc.connect(pulseGain);
      pulseGain.connect(ctx.destination);
      pulseOsc.start(now + 0.8);
      pulseOsc.stop(now + 1.8);

    } catch (e) {
      console.warn("Audio Context init error", e);
    }
  };

  const startIntroSequence = () => {
    if (hasInteracted) return;
    setHasInteracted(true);
    triggerHeavyOperaGXSound();
    setStage("ignite");

    // Timings for heavy Opera GX flow
    setTimeout(() => setStage("shockwave"), 800);
    setTimeout(() => setStage("exit"), 2400);
    setTimeout(() => onComplete(), 2900);
  };

  useEffect(() => {
    // Auto-attempt sound after short delay, or await user interaction if browser blocks
    const autoTimer = setTimeout(() => {
      startIntroSequence();
    }, 400);

    return () => {
      clearTimeout(autoTimer);
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
          onClick={startIntroSequence}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2, filter: "blur(16px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#02040a] text-white flex flex-col items-center justify-center overflow-hidden select-none cursor-pointer"
        >
          {/* Heavy Opera GX Ambient Lighting Radial Glow */}
          <div className="absolute w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#7C3AED]/20 via-[#00E5FF]/20 to-transparent blur-[120px] pointer-events-none animate-pulse" />

          {/* Opera GX Cyber Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00E5FF10_1px,transparent_1px),linear-gradient(to_bottom,#7C3AED10_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Scanline Sweep */}
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "50%"] }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_35px_#00E5FF] opacity-90 pointer-events-none"
          />

          {/* Shockwave Radial Wave Ring */}
          {stage === "shockwave" && (
            <>
              <motion.div
                initial={{ scale: 0.1, opacity: 1 }}
                animate={{ scale: 4.5, opacity: 0 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
                className="absolute w-80 h-80 rounded-full border-4 border-[#00E5FF] shadow-[0_0_90px_#00E5FF,inset_0_0_60px_#7C3AED] pointer-events-none"
              />
              <motion.div
                initial={{ scale: 0.1, opacity: 0.8 }}
                animate={{ scale: 3.2, opacity: 0 }}
                transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                className="absolute w-80 h-80 rounded-full border-2 border-[#7C3AED] shadow-[0_0_60px_#7C3AED] pointer-events-none"
              />
            </>
          )}

          {/* Opera GX HUD Corner Tech Brackets */}
          <div className="absolute top-6 left-6 border-t-4 border-l-4 border-[#00E5FF] w-10 h-10 shadow-[0_0_15px_#00E5FF] pointer-events-none" />
          <div className="absolute top-6 right-6 border-t-4 border-r-4 border-[#7C3AED] w-10 h-10 shadow-[0_0_15px_#7C3AED] pointer-events-none" />
          <div className="absolute bottom-6 left-6 border-b-4 border-l-4 border-[#7C3AED] w-10 h-10 shadow-[0_0_15px_#7C3AED] pointer-events-none" />
          <div className="absolute bottom-6 right-6 border-b-4 border-r-4 border-[#00E5FF] w-10 h-10 shadow-[0_0_15px_#00E5FF] pointer-events-none" />

          {/* Sound Wave Visualizer Bars */}
          <div className="absolute inset-x-0 bottom-24 flex justify-center items-end gap-1.5 h-16 opacity-30 pointer-events-none">
            {[40, 75, 30, 90, 60, 100, 45, 80, 65, 95, 50, 85, 35, 70].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 4 }}
                animate={{ height: stage === "shockwave" ? [`${h}%`, "10%", `${h * 0.8}%`] : ["10%", `${h}%`, "15%"] }}
                transition={{ repeat: Infinity, duration: 0.4 + (i % 5) * 0.1, ease: "easeInOut" }}
                className="w-1.5 rounded-full bg-gradient-to-t from-[#7C3AED] to-[#00E5FF]"
              />
            ))}
          </div>

          {/* Status Header */}
          <div className="absolute top-8 flex items-center gap-3 text-xs font-mono tracking-widest text-cyan-400/80 uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF] animate-ping" />
            <span>OPERAGX ENGINE // HIGH-PRECISION AUDIO ACTIVE</span>
          </div>

          {/* MAIN LOGO DISPLAY */}
          <div className="relative flex flex-col items-center justify-center gap-8 z-10">
            {/* CARVEX Vertex Mark */}
            <motion.div
              initial={{ scale: 0, rotate: -90, opacity: 0 }}
              animate={{
                scale: stage === "shockwave" ? [1, 1.35, 1] : 1,
                rotate: 0,
                opacity: 1,
              }}
              transition={{ duration: 0.6, type: "spring", stiffness: 220, damping: 15 }}
              className="relative w-28 h-28 rounded-3xl flex items-center justify-center border border-white/20 shadow-[0_0_80px_rgba(0,229,255,0.6)]"
              style={{ background: "linear-gradient(135deg, #7C3AED 0%, #00E5FF 100%)" }}
            >
              <svg width="56" height="56" viewBox="0 0 22 22" fill="none">
                <polyline
                  points="2,18 11,4 20,18"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="11" cy="4" r="2.8" fill="#00E5FF" />
              </svg>
              <span className="absolute -top-2 w-4 h-4 rounded-full bg-[#00E5FF] shadow-[0_0_30px_#00E5FF] animate-pulse" />
            </motion.div>

            {/* Opera GX Style Heavy Glitch Lettering */}
            <div className="flex items-center gap-3 md:gap-6 px-4">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 80, opacity: 0, scale: 0.3, filter: "blur(14px)" }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: stage === "shockwave" ? [1, 1.2, 1] : 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + index * 0.07,
                    type: "spring",
                    stiffness: 350,
                    damping: 22,
                  }}
                  className="relative text-5xl sm:text-7xl md:text-8xl font-black tracking-widest text-white font-mono"
                  style={{
                    textShadow:
                      stage === "shockwave"
                        ? "0 0 40px #00E5FF, 0 0 80px #7C3AED, -3px 0 #00E5FF, 3px 0 #7C3AED"
                        : "0 0 25px rgba(0,229,255,0.6), 0 0 50px rgba(124,58,237,0.4)",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Subtitle / Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col items-center gap-1 mt-2"
            >
              <span className="text-sm sm:text-base font-mono tracking-[0.4em] text-cyan-300 font-extrabold uppercase drop-shadow-[0_0_12px_#00E5FF]">
                REACH YOUR CAREER VERTEX
              </span>
              <span className="text-[11px] font-mono text-purple-300/80 tracking-widest">
                [ CLICK ANYWHERE TO IGNITE SOUND & START ]
              </span>
            </motion.div>
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-8 flex items-center justify-between w-full max-w-5xl px-8 text-xs font-mono text-slate-400 z-20">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              SYSTEM ACTIVE: <strong className="text-white">OPERAGX ENGINE LOUD AUDIO</strong>
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComplete();
              }}
              className="px-5 py-2 rounded-full bg-gradient-to-r from-[#7C3AED] to-[#00E5FF] text-white font-bold text-xs shadow-[0_0_20px_rgba(0,229,255,0.5)] hover:scale-105 transition-all cursor-pointer"
            >
              ENTER CARVEX ➔
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
