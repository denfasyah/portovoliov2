/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";

const TECH_STACK = [
  { name: "React",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  { name: "TypeScript",  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Node.js",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "MongoDB",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "MySQL",       icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
  { name: "Tailwind CSS",icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Docker",      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
];

// Duplicate for seamless loop
const ROW1 = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK];
const ROW2 = [...TECH_STACK].reverse().concat([...TECH_STACK].reverse(), [...TECH_STACK].reverse());

function Pill({ tech, keyPrefix, index }: { tech: typeof TECH_STACK[0]; keyPrefix: string; index: number }) {
  return (
    <div
      key={`${keyPrefix}-${index}`}
      // Tambahkan kelas 'grayscale' dan 'grayscale-0' saat group-hover
      className="group flex-shrink-0 flex items-center gap-2.5 border border-white/10 bg-white/[0.03] px-5 py-2.5 rounded-sm 
                 hover:border-white/30 hover:bg-white/[0.06] transition-all duration-500 cursor-default
                 grayscale hover:grayscale-0"
    >
      <img
        src={tech.icon}
        alt={tech.name}
        className="w-4 h-4 object-contain transition-all duration-500 opacity-60 group-hover:opacity-100"
      />
      <span className="text-[0.75rem] font-semibold tracking-wide text-white/60 group-hover:text-white transition-colors duration-500 whitespace-nowrap">
        {tech.name}
      </span>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <div className="mt-20 py-2 max-w-5xl mx-auto">
      {/* Outer clip — hides overflow beyond 5xl */}
      <div className="relative overflow-hidden">
        {/* Edge fades */}
        <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />

        {/* Row 1 — moves left */}
        <motion.div
          className="flex items-center gap-3 py-2 px-2"
          animate={{ x: [0, -1200] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
          style={{ width: "max-content" }}
        >
          {ROW1.map((tech, i) => (
            <Pill key={`r1-${i}`} tech={tech} keyPrefix="r1" index={i} />
          ))}
        </motion.div>

        {/* Row 2 — moves right */}
        <motion.div
          className="flex items-center gap-3 py-2 px-2 mt-3"
          animate={{ x: [-1200, 0] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 36 }}
          style={{ width: "max-content" }}
        >
          {ROW2.map((tech, i) => (
            <Pill key={`r2-${i}`} tech={tech} keyPrefix="r2" index={i} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
