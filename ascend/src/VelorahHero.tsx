"use client";

import { motion } from "motion/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function VelorahHero() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background text-foreground">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          type="video/mp4"
        />
      </video>

      {/* Navigation */}
      <nav className="relative z-10 flex flex-row justify-between items-center px-8 py-6 max-w-7xl mx-auto">
        <div className="text-3xl tracking-tight font-display text-foreground">
          
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <a href="#" className="text-sm text-foreground transition-colors">Home</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Studio</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Journal</a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Reach Us</a>
        </div>

        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/login")}
          className="liquid-glass rounded-full px-6 py-2.5 text-sm text-foreground transition-transform cursor-pointer"
        >
          Begin Journey
        </motion.button>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center text-center px-6 pt-32 pb-40 py-[90px] min-h-[calc(100vh-100px)] pointer-events-none">
        <motion.h1 
          className="text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal font-display animate-fade-rise pointer-events-auto"
        >
          Where <em className="not-italic text-muted-foreground">dreams</em> rise <em className="not-italic text-muted-foreground">through the silence.</em>
        </motion.h1>

        <motion.p 
          className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay pointer-events-auto"
        >
          We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces for sharp focus and inspired work.
        </motion.p>

        <motion.button 
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/login")}
          className="liquid-glass rounded-full px-14 py-5 text-base text-foreground mt-12 cursor-pointer transition-transform animate-fade-rise-delay-2 pointer-events-auto"
        >
          Begin Journey
        </motion.button>
      </main>
    </div>
  );
}
