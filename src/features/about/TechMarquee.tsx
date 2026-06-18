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
  return (
    <div className="relative flex flex-col gap-4 overflow-x-hidden border-y border-white/10 bg-white/[0.01] py-8 mt-20">
      {/* Gradients for smooth fade out at edges */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

      {/* Line 1 - Moving Left */}
      <motion.div
        className="flex whitespace-nowrap items-center gap-10 px-5"
        animate={{ x: [0, -1000] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
      >
        {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].map((tech, index) => (
          <span
            key={`l1-${index}`}
            className="text-[0.8rem] font-black uppercase tracking-[0.25em] text-white/20 hover:text-white transition-colors cursor-default"
          >
            {tech}
          </span>
        ))}
      </motion.div>

      {/* Line 2 - Moving Right */}
      <motion.div
        className="flex whitespace-nowrap items-center gap-10 px-5"
        animate={{ x: [-1000, 0] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
      >
        {[...TECH_STACK, ...TECH_STACK, ...TECH_STACK].reverse().map((tech, index) => (
          <span
            key={`l2-${index}`}
            className="text-[0.8rem] font-black uppercase tracking-[0.25em] text-white/20 hover:text-white transition-colors cursor-default"
          >
            {tech}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
