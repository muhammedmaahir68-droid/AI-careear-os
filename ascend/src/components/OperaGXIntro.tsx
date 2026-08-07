import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface OperaGXIntroProps {
  onComplete: () => void;
}

export default function OperaGXIntro({ onComplete }: OperaGXIntroProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [stage, setStage] = useState<"idle" | "ignite" | "shockwave" | "exit">("idle");
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Mobile-certified Web Audio Synthesizer with explicit audio context resume
  const playMobileCertifiedSound = () => {
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContextClass) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const now = ctx.currentTime;

      // ── 1. OPERAGX SUB-BASS BOMB (180Hz -> 35Hz) ──
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();
      subOsc.type = "sawtooth";
      subOsc.frequency.setValueAtTime(220, now);
      subOsc.frequency.exponentialRampToValueAtTime(35, now + 1.4);

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(900, now);
      filter.frequency.exponentialRampToValueAtTime(140, now + 1.2);

      subGain.gain.setValueAtTime(1.0, now);
      subGain.gain.exponentialRampToValueAtTime(0.001, now + 2.2);

      subOsc.connect(filter);
      filter.connect(subGain);
      subGain.connect(ctx.destination);
      subOsc.start(now);
      subOsc.stop(now + 2.2);

      // ── 2. HIGH-TECH LASER RAMP SWEEP ──
      const sweepOsc = ctx.createOscillator();
      const sweepGain = ctx.createGain();
      sweepOsc.type = "square";
      sweepOsc.frequency.setValueAtTime(250, now + 0.1);
      sweepOsc.frequency.exponentialRampToValueAtTime(3200, now + 0.85);

      sweepGain.gain.setValueAtTime(0.01, now + 0.1);
      sweepGain.gain.linearRampToValueAtTime(0.3, now + 0.75);
      sweepGain.gain.exponentialRampToValueAtTime(0.001, now + 1.3);

      sweepOsc.connect(sweepGain);
      sweepGain.connect(ctx.destination);
      sweepOsc.start(now + 0.1);
      sweepOsc.stop(now + 1.3);

      // ── 3. OPERA GX IMPACT HARMONIC CHORD ──
      const freqs = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98];
      freqs.forEach((f, idx) => {
        const chime = ctx.createOscillator();
        const chimeGain = ctx.createGain();
        chime.type = idx % 2 === 0 ? "triangle" : "sine";
        chime.frequency.setValueAtTime(f, now + 0.7 + idx * 0.03);

        chimeGain.gain.setValueAtTime(0.45, now + 0.7 + idx * 0.03);
        chimeGain.gain.exponentialRampToValueAtTime(0.0001, now + 2.4);

        chime.connect(chimeGain);
        chimeGain.connect(ctx.destination);
        chime.start(now + 0.7 + idx * 0.03);
        chime.stop(now + 2.4);
      });

    } catch (err) {
      console.warn("Mobile Audio Error:", err);
    }
  };

  const handleStart = (e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (isPlaying) return;

    setIsPlaying(true);
    playMobileCertifiedSound();
    setStage("ignite");

    setTimeout(() => setStage("shockwave"), 750);
    setTimeout(() => setStage("exit"), 2500);
    setTimeout(() => onComplete(), 3000);
  };

  useEffect(() => {
    // Window touch listener to immediately unlock mobile audio context on first screen tap
    const unlockMobileAudio = () => {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtxRef.current = new AudioContextClass();
        }
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }
    };

    window.addEventListener("touchstart", unlockMobileAudio, { once: true });
    window.addEventListener("pointerdown", unlockMobileAudio, { once: true });

    return () => {
      window.removeEventListener("touchstart", unlockMobileAudio);
      window.removeEventListener("pointerdown", unlockMobileAudio);
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
          onClick={() => handleStart()}
          onTouchStart={() => handleStart()}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.25, filter: "blur(20px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#02040a] text-white flex flex-col items-center justify-center overflow-hidden select-none touch-none"
        >
          {/* Ambient Radial Glow */}
          <div className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-gradient-to-r from-[#7C3AED]/25 via-[#00E5FF]/25 to-transparent blur-[130px] pointer-events-none animate-pulse" />

          {/* Opera GX Grid lines */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00E5FF15_1px,transparent_1px),linear-gradient(to_bottom,#7C3AED15_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Laser Scanline */}
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "50%"] }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_40px_#00E5FF] opacity-90 pointer-events-none"
          />

          {/* Shockwave Radial Wave Ring */}
          {stage === "shockwave" && (
            <motion.div
              initial={{ scale: 0.1, opacity: 1 }}
              animate={{ scale: 4.8, opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="absolute w-72 h-72 rounded-full border-4 border-[#00E5FF] shadow-[0_0_100px_#00E5FF,inset_0_0_60px_#7C3AED] pointer-events-none"
            />
          )}

          {/* Corner Brackets */}
          <div className="absolute top-6 left-6 border-t-4 border-l-4 border-[#00E5FF] w-8 h-8 pointer-events-none" />
          <div className="absolute top-6 right-6 border-t-4 border-r-4 border-[#7C3AED] w-8 h-8 pointer-events-none" />
          <div className="absolute bottom-6 left-6 border-b-4 border-l-4 border-[#7C3AED] w-8 h-8 pointer-events-none" />
          <div className="absolute bottom-6 right-6 border-b-4 border-r-4 border-[#00E5FF] w-8 h-8 pointer-events-none" />

          {/* Equalizer Spectrum Bars */}
          <div className="absolute inset-x-0 bottom-24 flex justify-center items-end gap-1.5 h-14 opacity-40 pointer-events-none">
            {[40, 80, 35, 95, 60, 100, 50, 85, 70, 90, 45, 75].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 4 }}
                animate={{ height: isPlaying ? [`${h}%`, "15%", `${h * 0.9}%`] : ["10%", `${h * 0.5}%`, "10%"] }}
                transition={{ repeat: Infinity, duration: 0.35 + (i % 4) * 0.1 }}
                className="w-1.5 rounded-full bg-gradient-to-t from-[#7C3AED] to-[#00E5FF]"
              />
            ))}
          </div>

          {/* Top Bar */}
          <div className="absolute top-6 flex items-center gap-2.5 text-[11px] font-mono tracking-widest text-cyan-400/90 uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_12px_#00E5FF] animate-ping" />
            <span>OPERAGX MOBILE AUDIO ENGINE</span>
          </div>

          {/* MAIN LOGO DISPLAY */}
          <div className="relative flex flex-col items-center justify-center gap-6 z-10 text-center px-4">
            
            {/* CARVEX Vertex Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: stage === "shockwave" ? [1, 1.3, 1] : 1,
                opacity: 1,
              }}
              transition={{ duration: 0.5, type: "spring", stiffness: 220 }}
              className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center shadow-[0_0_80px_rgba(0,229,255,0.6)]"
              style={{ background: "linear-gradient(135deg, #7C3AED 0%, #00E5FF 100%)" }}
            >
              <svg width="52" height="52" viewBox="0 0 22 22" fill="none">
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

            {/* CARVEX Lettering */}
            <div className="flex items-center gap-2 sm:gap-4">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: stage === "shockwave" ? [1, 1.2, 1] : 1,
                  }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.06,
                  }}
                  className="text-4xl sm:text-7xl font-black tracking-widest text-white font-mono"
                  style={{
                    textShadow: "0 0 30px #00E5FF, 0 0 60px #7C3AED",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            {/* Mobile Sound Trigger Button */}
            {!isPlaying ? (
              <motion.button
                onClick={(e) => handleStart(e)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-purple-600 to-[#00E5FF] text-white font-extrabold text-sm sm:text-base shadow-[0_0_40px_rgba(0,229,255,0.7)] border border-white/30 flex items-center gap-3 animate-bounce cursor-pointer"
              >
                <span className="text-xl">🔊</span>
                <span>TAP TO START WITH OPERA GX SOUND</span>
              </motion.button>
            ) : (
              <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-cyan-300 font-extrabold uppercase mt-2">
                REACH YOUR CAREER VERTEX
              </p>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-6 flex items-center justify-between w-full max-w-4xl px-6 text-xs font-mono text-slate-400 z-20">
            <span>SOUND: <strong className={isPlaying ? "text-emerald-400" : "text-amber-400"}>{isPlaying ? "PLAYING 🔊" : "TAP SCREEN 👆"}</strong></span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onComplete();
              }}
              className="px-4 py-2 rounded-full bg-white/10 text-white font-bold text-xs hover:bg-white/20 transition-all cursor-pointer"
            >
              SKIP ➔
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
