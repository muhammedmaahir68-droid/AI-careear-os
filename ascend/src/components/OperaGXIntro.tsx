import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { OPERA_GX_SOUND_BASE64 } from "./operaGxSoundBase64";

interface OperaGXIntroProps {
  onComplete: () => void;
}

export default function OperaGXIntro({ onComplete }: OperaGXIntroProps) {
  const [ignited, setIgnited] = useState(false);
  const [stage, setStage] = useState<"ready" | "shockwave" | "exit">("ready");
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play user's exact Opera GX audio track with 100% hardware volume
  const igniteEngine = (e?: React.SyntheticEvent) => {
    if (e) {
      e.stopPropagation();
    }
    if (ignited) return;

    setIgnited(true);

    // 1. Play HTML5 Audio element with exact Opera GX track
    if (audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }

    // 2. JS Audio fallback
    try {
      const snd = new Audio("/opera-gx.mpeg");
      snd.volume = 1.0;
      snd.play().catch(() => {
        const snd2 = new Audio(OPERA_GX_SOUND_BASE64);
        snd2.volume = 1.0;
        snd2.play().catch(() => {});
      });
    } catch {}

    // 3. Web Audio API Context wake up
    try {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtxClass();
        }
        if (audioCtxRef.current.state === "suspended") {
          audioCtxRef.current.resume();
        }
      }
    } catch {}

    // Presentation timeline: full 4.5s so sound completes fully before exit
    setTimeout(() => setStage("shockwave"), 700);
    setTimeout(() => setStage("exit"), 4300);
    setTimeout(() => onComplete(), 4800);
  };

  useEffect(() => {
    // Attach window listeners for keydown / pointerdown / touchstart
    const handleWindowIgnite = () => {
      igniteEngine();
    };

    window.addEventListener("keydown", handleWindowIgnite, { once: true });
    window.addEventListener("pointerdown", handleWindowIgnite, { once: true });
    window.addEventListener("touchstart", handleWindowIgnite, { once: true });

    return () => {
      window.removeEventListener("keydown", handleWindowIgnite);
      window.removeEventListener("pointerdown", handleWindowIgnite);
      window.removeEventListener("touchstart", handleWindowIgnite);
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch {}
      }
    };
  }, [ignited]);

  const letters = ["C", "A", "R", "V", "E", "X"];

  return (
    <AnimatePresence>
      {stage !== "exit" && (
        <motion.div
          onClick={() => igniteEngine()}
          onTouchStart={() => igniteEngine()}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.25, filter: "blur(20px)" }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[99999] bg-[#02040a] text-white flex flex-col items-center justify-center overflow-hidden select-none cursor-pointer"
        >
          {/* HTML5 Audio element streaming exact user Opera GX track */}
          <audio
            ref={audioRef}
            src="/opera-gx.mpeg"
            preload="auto"
            playsInline
          />

          {/* Ambient Cyber Light */}
          <div className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-gradient-to-r from-[#7C3AED]/25 via-[#00E5FF]/25 to-transparent blur-[130px] pointer-events-none animate-pulse" />

          {/* Cyber Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#00E5FF15_1px,transparent_1px),linear-gradient(to_bottom,#7C3AED15_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

          {/* Laser Scanline */}
          <motion.div
            initial={{ top: "0%" }}
            animate={{ top: ["0%", "100%", "50%"] }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#00E5FF] to-transparent shadow-[0_0_40px_#00E5FF] opacity-90 pointer-events-none"
          />

          {/* Radial Energy Shockwave Ring */}
          {stage === "shockwave" && (
            <>
              <motion.div
                initial={{ scale: 0.1, opacity: 1 }}
                animate={{ scale: 4.8, opacity: 0 }}
                transition={{ duration: 0.85, ease: "easeOut" }}
                className="absolute w-72 h-72 rounded-full border-4 border-[#00E5FF] shadow-[0_0_100px_#00E5FF,inset_0_0_60px_#7C3AED] pointer-events-none"
              />
              <motion.div
                initial={{ scale: 0.1, opacity: 0.8 }}
                animate={{ scale: 3.2, opacity: 0 }}
                transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
                className="absolute w-72 h-72 rounded-full border-2 border-[#7C3AED] shadow-[0_0_60px_#7C3AED] pointer-events-none"
              />
            </>
          )}

          {/* Tech HUD Corner Brackets */}
          <div className="absolute top-6 left-6 border-t-4 border-l-4 border-[#00E5FF] w-8 h-8 pointer-events-none" />
          <div className="absolute top-6 right-6 border-t-4 border-r-4 border-[#7C3AED] w-8 h-8 pointer-events-none" />
          <div className="absolute bottom-6 left-6 border-b-4 border-l-4 border-[#7C3AED] w-8 h-8 pointer-events-none" />
          <div className="absolute bottom-6 right-6 border-b-4 border-r-4 border-[#00E5FF] w-8 h-8 pointer-events-none" />

          {/* Audio Frequency Spectrum Equalizer */}
          <div className="absolute inset-x-0 bottom-24 flex justify-center items-end gap-1.5 h-14 opacity-40 pointer-events-none">
            {[40, 80, 35, 95, 60, 100, 50, 85, 70, 90, 45, 75].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 4 }}
                animate={{ height: ignited ? [`${h}%`, "15%", `${h * 0.9}%`] : ["10%", "25%", "10%"] }}
                transition={{ repeat: Infinity, duration: 0.35 + (i % 4) * 0.1 }}
                className="w-1.5 rounded-full bg-gradient-to-t from-[#7C3AED] to-[#00E5FF]"
              />
            ))}
          </div>

          {/* Top Status Header */}
          <div className="absolute top-6 flex items-center gap-2.5 text-[11px] font-mono tracking-widest text-cyan-400/90 uppercase">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00E5FF] shadow-[0_0_12px_#00E5FF] animate-ping" />
            <span>CARVEX ENGINE v2.0 // {ignited ? "SYSTEM ONLINE" : "READY FOR IGNITION"}</span>
          </div>

          {/* MAIN LOGO & TYPOGRAPHY LOCKUP */}
          <div className="relative flex flex-col items-center justify-center gap-6 z-10 text-center px-4">
            
            {/* CARVEX Vertex Mark */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{
                scale: stage === "shockwave" ? [1, 1.3, 1] : 1,
                opacity: 1,
              }}
              transition={{ duration: 0.5, type: "spring", stiffness: 240, damping: 18 }}
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

            {/* CARVEX Glitch Lettering */}
            <div className="flex items-center gap-2 sm:gap-4">
              {letters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 50, opacity: 0, scale: 0.4, filter: "blur(12px)" }}
                  animate={{
                    y: ignited ? 0 : 0,
                    opacity: ignited ? 1 : 0.85,
                    scale: stage === "shockwave" ? [1, 1.2, 1] : 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    duration: 0.45,
                    delay: 0.08 + index * 0.06,
                    type: "spring",
                    stiffness: 350,
                    damping: 20,
                  }}
                  className="text-4xl sm:text-7xl font-black tracking-widest text-white font-mono"
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
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.4 }}
              className="text-xs sm:text-sm font-mono tracking-[0.35em] text-cyan-300 font-extrabold uppercase mt-2 drop-shadow-[0_0_12px_#00E5FF]"
            >
              REACH YOUR CAREER VERTEX
            </motion.p>

            {/* AAA Gaming Startup Prompt */}
            {!ignited ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: [0.95, 1.05, 0.95] }}
                transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                className="mt-6 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#7C3AED] via-purple-600 to-[#00E5FF] text-white font-extrabold text-xs sm:text-sm shadow-[0_0_40px_rgba(0,229,255,0.8)] border border-white/30 flex items-center gap-3"
              >
                <span className="text-base animate-bounce">🔊</span>
                <span>TAP ANYWHERE OR PRESS ANY KEY TO IGNITE</span>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-xs font-mono tracking-widest text-emerald-400 font-bold"
              >
                ✓ OPERA GX AUDIO ENGINE ACTIVE
              </motion.div>
            )}
          </div>

          {/* Bottom Controls */}
          <div className="absolute bottom-6 flex items-center justify-between w-full max-w-4xl px-6 text-xs font-mono text-slate-400 z-20">
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${ignited ? "bg-emerald-400" : "bg-amber-400"} animate-pulse`} />
              AUDIO: <strong className="text-white">{ignited ? "PLAYING 🔊" : "AWAITING TAP 👆"}</strong>
            </span>
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
