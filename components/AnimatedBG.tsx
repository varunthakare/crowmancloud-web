"use client";
import { motion } from 'framer-motion';

type Props = {
  glows?: boolean;
};

export default function AnimatedBG({ glows = true }: Props) {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="bg-grid opacity-30 absolute inset-0" />
      {glows && (
        <>
          <motion.div
            className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(245, 158, 11, 0.35), transparent)' }}
            animate={{ y: [0, 30, 0], scale: [1, 1.05, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-24 right-16 h-72 w-72 rounded-full blur-3xl"
            style={{ background: 'radial-gradient(closest-side, rgba(252, 211, 77, 0.30), transparent)' }}
            animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
    </div>
  );
}
