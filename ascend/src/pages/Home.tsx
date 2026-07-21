// src/pages/Home.tsx
import React from "react";
import { LottiePlayer } from "../components/LottiePlayer";

export const Home: React.FC = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#ff6f91] to-[#001f3f] p-8">
      <div className="glassmorphism p-6 rounded-xl text-center max-w-2xl">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Ascend</h1>
        <p className="text-lg text-white mb-6">
          Your AI‑powered career companion – learn, plan, interview, and land your dream job.
        </p>
        <LottiePlayer
          src="/assets/lottie/generic_animation.json"
          className="w-80 h-80 mx-auto"
        />
      </div>
    </section>
  );
};
