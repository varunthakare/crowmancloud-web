"use client";
import { motion } from 'framer-motion';

const logos = [
  '/logos/logo-1.svg',
  '/logos/logo-2.svg',
  '/logos/logo-3.svg',
  '/logos/logo-4.svg',
  '/logos/logo-5.svg',
  '/logos/logo-6.svg',
];

export default function LogoMarquee() {
  return (
    <section className="py-12 border-y border-white/10 bg-white/[.02]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-6 text-center text-sm sm:text-base font-medium tracking-wide text-neutral-300 uppercase">
          Supported languages & frameworks
        </p>
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-14 will-change-transform"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          >
            {[...logos, ...logos].map((src, i) => (
              <img
                key={i}
                src={src}
                alt="logo"
                className="h-10 sm:h-12 w-auto opacity-80"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
