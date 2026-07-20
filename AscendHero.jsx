import React, { useEffect, useState } from "react";
import { ArrowRight, Flame, MessageCircle, Target, Menu, X } from "lucide-react";

const CHECKPOINTS = [
  { label: "Foundations", state: "done" },
  { label: "DSA & Core CS", state: "done" },
  { label: "System Design", state: "active" },
  { label: "Mock Interviews", state: "locked" },
  { label: "Offer", state: "locked" },
];

export default function AscendHero() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-ink text-cream">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;600&display=swap');

        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Inter', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }

        /* ---- Real color classes (bracket-syntax Tailwind classes don't
           compile in this preview, so every custom color lives here as
           plain CSS instead) ---- */
        .bg-ink        { background-color: #0A0C10; }
        .bg-ink-95     { background-color: rgba(10,12,16,0.96); }
        .bg-cream      { background-color: #F2F0E9; }
        .bg-gold       { background-color: #E8B75C; }
        .bg-gold-soft  { background-color: rgba(232,183,92,0.14); }
        .bg-hair       { background-color: rgba(255,255,255,0.05); }

        .text-cream       { color: #F2F0E9; }
        .text-muted       { color: #B7BECB; }
        .text-muted-dim   { color: #8890A0; }
        .text-gold        { color: #E8B75C; }
        .text-ink         { color: #0A0C10; }

        .border-gold    { border-color: #E8B75C; }
        .border-hair    { border-color: rgba(255,255,255,0.20); }
        .border-hair-lo { border-color: rgba(255,255,255,0.08); }

        a.nav-link, button.nav-link { color: #B7BECB; transition: color 0.2s ease; }
        a.nav-link:hover, button.nav-link:hover { color: #F2F0E9; }
        .menu-row:hover { background-color: rgba(255,255,255,0.06); }

        .text-2xs { font-size: 11px; line-height: 1.4; }

        .liquid-glass {
          background: rgba(255,255,255,0.03);
          background-blend-mode: luminosity;
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          border: none;
          box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
          position: relative;
          overflow: hidden;
        }
        .liquid-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1.3px;
          background: linear-gradient(180deg,
            rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.14) 20%,
            rgba(255,255,255,0) 40%, rgba(255,255,255,0) 60%,
            rgba(255,255,255,0.12) 80%, rgba(255,255,255,0.4) 100%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        @keyframes riseIn {
          from { opacity: 0; filter: blur(14px); transform: translateY(28px); }
          to { opacity: 1; filter: blur(0); transform: translateY(0); }
        }
        .rise { opacity: 0; animation: riseIn 0.9s cubic-bezier(0.16,1,0.3,1) forwards; }

        @keyframes twinkle {
          0%, 100% { opacity: 0.25; }
          50% { opacity: 0.9; }
        }
        .star { animation: twinkle 4s ease-in-out infinite; }

        @keyframes drawPath {
          from { stroke-dashoffset: 1000; }
          to { stroke-dashoffset: 0; }
        }

        @keyframes nodeGlow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(232,183,92,0.55); }
          50% { box-shadow: 0 0 16px 4px rgba(232,183,92,0.55); }
        }
        .node-active { animation: nodeGlow 2.2s ease-in-out infinite; }

        @media (prefers-reduced-motion: reduce) {
          .rise, .star, .node-active { animation: none !important; opacity: 1 !important; filter: none !important; transform: none !important; }
        }
      `}</style>

      {/* Ambient background: night gradient + stars */}
      <div className="absolute inset-0 z-0" style={{ background: "radial-gradient(120% 90% at 75% 15%, #171C24 0%, #0A0C10 55%, #050608 100%)" }} />
      <div className="absolute inset-0 z-0 pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="star absolute rounded-full bg-white"
            style={{
              width: Math.random() < 0.8 ? 1.5 : 2.5,
              height: Math.random() < 0.8 ? 1.5 : 2.5,
              top: `${Math.random() * 70}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="relative z-20 flex items-center justify-between px-5 sm:px-8 md:px-12 py-5 md:py-6">
        <div className="rise font-display text-cream text-xl md:text-2xl tracking-tight" style={{ animationDelay: "0ms" }}>
          ASCEND
        </div>

        <div className="hidden lg:flex items-center gap-9 font-body text-sm">
          {["Path", "Practice", "Mock Interviews", "Community"].map((item, i) => (
            <a
              key={item}
              href="#"
              className="nav-link rise"
              style={{ animationDelay: `${100 + i * 60}ms` }}
            >
              {item}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            className="rise liquid-glass text-cream hidden sm:block rounded-full px-5 md:px-6 py-2.5 text-sm font-body font-medium"
            style={{ animationDelay: "350ms" }}
          >
            Start free
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="rise liquid-glass text-cream lg:hidden w-10 h-10 rounded-full flex items-center justify-center"
            style={{ animationDelay: "350ms" }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className="absolute left-0 right-0 z-30 mx-4 rounded-2xl liquid-glass bg-ink-95 border-t border-b border-hair-lo transition-all duration-500 ease-out"
        style={{
          top: 70,
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
          pointerEvents: menuOpen ? "auto" : "none",
        }}
      >
        <div className="flex flex-col p-3 font-body text-sm">
          {["Path", "Practice", "Mock Interviews", "Community"].map((item) => (
            <a key={item} href="#" className="menu-row text-cream px-4 py-3 rounded-xl transition-colors">
              {item}
            </a>
          ))}
          <button className="mt-1 mx-1 mb-1 liquid-glass text-cream rounded-xl py-3 text-sm font-medium">Start free</button>
        </div>
      </div>

      {/* Hero content */}
      <div
        className="relative z-10 px-5 sm:px-8 md:px-12 flex flex-col md:flex-row items-center gap-8 md:gap-4"
        style={{ height: "calc(100% - 84px)" }}
      >
        {/* Left: copy */}
        <div className="flex-1 max-w-xl">
          <div
            className="rise inline-flex items-center gap-2 liquid-glass text-muted rounded-full px-4 py-1.5 mb-6 font-body text-xs"
            style={{ animationDelay: "150ms" }}
          >
            <Flame size={13} className="text-gold" />
            Free, forever. No paywalled chapters.
          </div>

          <h1
            className="rise font-display text-cream text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-tight mb-6"
            style={{ animationDelay: "250ms" }}
          >
            Zero today.
            <br />
            <em className="not-italic text-muted">Offer in hand</em> by the
            <br />
            end of this climb.
          </h1>

          <p
            className="rise font-body text-muted text-base md:text-lg mb-8 leading-relaxed"
            style={{ animationDelay: "350ms" }}
          >
            One path from fundamentals to your first offer — daily tasks, an AI
            that clarifies every doubt instead of just grading it, and real mock
            interviews with feedback that actually tells you what to fix.
          </p>

          <div className="rise flex flex-wrap items-center gap-4" style={{ animationDelay: "450ms" }}>
            <button className="group bg-cream text-ink rounded-full pl-6 pr-2 py-2 md:pl-7 md:py-2.5 flex items-center gap-3 font-body font-medium text-sm md:text-base hover:gap-4 transition-all">
              Start your climb
              <span className="bg-ink text-cream rounded-full w-8 h-8 flex items-center justify-center group-hover:scale-110 transition-transform">
                <ArrowRight size={15} />
              </span>
            </button>
            <button className="liquid-glass text-cream rounded-full px-6 py-2.5 md:py-3 text-sm md:text-base font-body font-medium flex items-center gap-2">
              <MessageCircle size={16} />
              Ask the AI a question
            </button>
          </div>
        </div>

        {/* Right: the climb path — signature element */}
        <div
          className={`rise flex-1 w-full max-w-md md:max-w-lg mx-auto ${mounted ? "" : "opacity-0"}`}
          style={{ animationDelay: "300ms" }}
        >
          <div className="liquid-glass rounded-3xl p-6 md:p-8">
            <div className="flex items-center justify-between mb-6 font-body">
              <span className="text-2xs text-muted-dim uppercase tracking-wider">Your path</span>
              <span className="flex items-center gap-1.5 text-2xs font-mono text-gold">
                <Target size={13} /> 41% to offer
              </span>
            </div>

            <div className="relative pl-2">
              <svg width="4" height="280" className="absolute top-1" style={{ left: 9, overflow: "visible" }}>
                <line x1="2" y1="0" x2="2" y2="280" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                <line
                  x1="2" y1="0" x2="2" y2="140"
                  stroke="#E8B75C" strokeWidth="2"
                  style={{ strokeDasharray: 140, strokeDashoffset: 140, animation: "drawPath 1.4s cubic-bezier(0.65,0,0.35,1) 0.5s forwards" }}
                />
              </svg>

              <div className="flex flex-col pl-8 py-1" style={{ gap: 42 }}>
                {CHECKPOINTS.map((cp) => (
                  <div key={cp.label} className="flex items-center gap-4 relative">
                    <div
                      className={`absolute w-4 h-4 rounded-full border-2 ${
                        cp.state === "done"
                          ? "bg-gold border-gold"
                          : cp.state === "active"
                          ? "bg-ink border-gold node-active"
                          : "bg-ink border-hair"
                      }`}
                      style={{ left: -32 }}
                    />
                    <span
                      className={`font-body text-sm ${
                        cp.state === "locked" ? "text-muted-dim" : "text-cream"
                      } ${cp.state === "active" ? "font-medium" : ""}`}
                    >
                      {cp.label}
                    </span>
                    {cp.state === "active" && (
                      <span className="font-mono text-2xs text-gold bg-gold-soft rounded-full px-2 py-0.5">
                        in progress
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-hair-lo grid grid-cols-3 gap-3 text-center font-mono">
              <div>
                <div className="text-lg md:text-xl text-cream">12</div>
                <div className="text-2xs text-muted-dim font-body mt-0.5">day streak</div>
              </div>
              <div>
                <div className="text-lg md:text-xl text-cream">184</div>
                <div className="text-2xs text-muted-dim font-body mt-0.5">solved</div>
              </div>
              <div>
                <div className="text-lg md:text-xl text-cream">6</div>
                <div className="text-2xs text-muted-dim font-body mt-0.5">mocks done</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
