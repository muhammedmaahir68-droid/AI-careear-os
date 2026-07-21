// src/components/LottiePlayer.tsx
import React, { useEffect, useRef } from "react";
import lottie, { AnimationItem } from "lottie-web";

interface LottiePlayerProps {
  /** Path to the JSON animation file (relative to the src folder) */
  src: string;
  /** Loop the animation? */
  loop?: boolean;
  /** Autoplay on mount? */
  autoplay?: boolean;
  /** Optional CSS class for sizing */
  className?: string;
}

export const LottiePlayer: React.FC<LottiePlayerProps> = ({ src, loop = true, autoplay = true, className }) => {
  const container = useRef<HTMLDivElement>(null);
  const animRef = useRef<AnimationItem | null>(null);

  useEffect(() => {
    if (container.current) {
      animRef.current = lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop,
        autoplay,
        path: src,
      });
    }
    return () => {
      animRef.current?.destroy();
    };
  }, [src, loop, autoplay]);

  return <div ref={container} className={className} />;
};
