"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Express",
  "Laravel",
  "MongoDB",
  "MySQL",
  "Tailwind CSS",
  "Figma",
  "Git",
  "Docker",
];

export default function TechMarquee() {
  const renderPill = (tech: string, index: number, keyPrefix: string) => (
    <div
      key={`${keyPrefix}-${index}`}
      className="flex items-center gap-3 border border-white/10 bg-black px-6 py-3 rounded-sm hover:border-white/30 transition-colors cursor-default"
    >
      <svg viewBox="0 0 24 24" className="w-4 h-4 text-white/50" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
      <span className="text-[0.8rem] font-bold tracking-wide text-white/80">
        {tech}
      </span>
    </div>
  );

  return (
    <div className="relative flex flex-col gap-6 overflow-x-hidden py-10 mt-20">
      {/* Gradients for smooth fade out at edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Line 1 - Moving Left */}
      <motion.div
        className="flex whitespace-nowrap items-center gap-2 px-3"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 35 }}
      >
        {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, index) => renderPill(tech, index, 'l1'))}
      </motion.div>

      {/* Line 2 - Moving Right */}
      <motion.div
        className="flex whitespace-nowrap items-center gap-2 px-3"
        animate={{ x: [-1000, 0] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
      >
        {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].reverse().map((tech, index) => renderPill(tech, index, 'l2'))}
      </motion.div>
    </div>
  );
}
