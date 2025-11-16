"use client";
import { motion } from "framer-motion";

export default function ShowcaseGlow() {
  // Animated SVG glow that surrounds the entire card/image
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
      {/* Subtle vignette mask */}
      <div className="absolute inset-0 radial-mask" />

      <motion.svg
        initial={{ opacity: 0.6, filter: "blur(24px)" as any }}
        animate={{
          opacity: [0.6, 0.85, 0.6],
          translateY: [0, -6, 0],
          scaleX: [1, 1.05, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        width="100%"
        height="100%"
        viewBox="0 0 560 400"
        className="absolute inset-0"
      >
        <defs>
          <radialGradient id="glowGradient" cx="50%" cy="60%" r="80%">
            <stop offset="0%" stopColor="#7C3AED" stopOpacity="1.0" />
            <stop offset="20%" stopColor="#A855F7" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#3B82F6" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#06B6D4" stopOpacity="0.5" />
            <stop offset="80%" stopColor="#8B5CF6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#111827" stopOpacity="0" />
          </radialGradient>
          <filter id="strongGlow">
            <feGaussianBlur stdDeviation="12" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {/* Center glow */}
        <ellipse cx="280" cy="200" rx="280" ry="120" fill="url(#glowGradient)" filter="url(#strongGlow)" />
        {/* Top-left glow */}
        <ellipse cx="140" cy="100" rx="180" ry="80" fill="url(#glowGradient)" opacity="0.6" />
        {/* Top-right glow */}
        <ellipse cx="420" cy="100" rx="180" ry="80" fill="url(#glowGradient)" opacity="0.6" />
        {/* Bottom glow */}
        <ellipse cx="280" cy="300" rx="320" ry="100" fill="url(#glowGradient)" opacity="0.4" />
      </motion.svg>
    </div>
  );
}
