"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Terminal, Code2, Layers, Cpu } from "lucide-react";

export default function Hero() {
  // Variasi animasi melayang (floating) untuk elemen UI di sekeliling teks utama
  const floatAnimation = (delay: number, duration: number = 6) => ({
    animate: {
      y: [0, -12, 0],
      x: [0, 8, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay,
      },
    },
  });

  return (
    <section
      id="home"
      className="relative min-h-[calc(10vh-96px)] w-full flex items-center justify-center overflow-hidden px-4 py-12"
    >
      {/* ---------------- MAIN HERO CONTAINER ---------------- */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center">
        {/* 1. STATUS BADGE [🟢 Active to Work] */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
            bg-white/40 dark:bg-[#0A0A0A]/40 border border-slate-200 dark:border-white/10 
            backdrop-blur-md shadow-[0_2px_20px_rgba(0,0,0,0.02)] mb-8"
        >
          {/* <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span> */}
          <span className="text-[12px] font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200 font-mono">
            Full Stack Developer
          </span>
        </motion.div>

        {/* 2. SUB-TITLE / ROLE */}

        {/* 3. MAIN HEADING (Adent Fallah Amorisyah) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="font-black text-[clamp(36px,6vw,72px)] leading-[1.05] tracking-tighter text-slate-900 dark:text-white max-w-4xl mb-6 font-sans"
        >
          Adent Fallah <br />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#0047FF] to-blue-600 dark:from-[#CCFF00] dark:to-lime-400">
            Amorisyah
          </span>
        </motion.h1>

        {/* 4. SHORT TAGLINE */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-slate-600 dark:text-slate-400 text-[15px] md:text-[18px] max-w-xl leading-relaxed mb-10"
        >
          Building high-performance web systems with crisp pixel-perfect
          interfaces, modular architecture, and modern technical precision.
        </motion.p>

        {/* 5. CALL TO ACTION (CTA BUTTONS) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center gap-4 z-20"
        >
          {/* CTA 1 - Neo Brutalism Style Accent */}
          <a href="#portfolio" className="w-full sm:w-auto group">
            <button
              className="w-full sm:w-auto flex items-center justify-center gap-2 font-bold text-[14px] px-8 py-3.5 rounded-xl transition-all duration-300
              bg-[#0047FF] dark:bg-[#CCFF00] text-white dark:text-[#0A0A0A]
              shadow-[4px_4px_0px_0px_rgba(10,10,10,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,0.9)]
              hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(10,10,10,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,0.9)]"
            >
              View Projects
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </button>
          </a>

          {/* CTA 2 - Glassmorphic Secondary */}
          <a href="#about" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto flex items-center justify-center font-bold text-[14px] px-8 py-3.5 rounded-xl transition-all duration-200
              bg-white/60 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-white backdrop-blur-md
              hover:bg-slate-100 hover:dark:bg-white/10"
            >
              About Me
            </button>
          </a>
        </motion.div>

        {/* 6. SCROLL DOWN INDICATOR (🔽) */}
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20px] md:bottom-2 left-1/2 -translate-x-1/2 text-slate-400 dark:text-slate-600 cursor-pointer hover:text-[#0047FF] dark:hover:text-[#CCFF00] transition-colors"
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
        >
          <div className="flex flex-col items-center gap-1 font-mono text-[10px] tracking-widest uppercase">
            <span>Scroll</span>
            <span className="text-[14px]">↓</span>
          </div>
        </motion.div>
      </div>

      {/* ---------------- 7. FLOATING UI COMPONENTS (SEKELILING HERO) ---------------- */}
      {/* Floating UI 1 - Kiri Atas (Terminal/Code Vibe) */}
      <motion.div
        animate="animate"
        className="hidden lg:flex absolute left-[8%] top-[20%] items-center gap-3 px-4 py-3 rounded-2xl backdrop-blur-xl border shadow-lg
          bg-white/40 dark:bg-[#0A0A0A]/40 border-slate-200/60 dark:border-white/5"
      >
        <div className="p-2 rounded-xl bg-blue-500/10 text-[#0047FF] dark:text-blue-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <div className="text-left font-mono">
          <p className="text-[13px] text-slate-800 dark:text-slate-200 font-bold">
            Active to work
          </p>
        </div>
      </motion.div>
    </section>
  );
}
