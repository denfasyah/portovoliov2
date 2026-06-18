"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WORK_EXPERIENCE, EDUCATION } from "@/data/experience";

type Tab = "work" | "education";

// ─── ANIMATION VARIANTS ────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};



// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<Tab>("work");

  return (
    <section className="bg-black min-h-screen px-6 py-28 md:px-20 text-white overflow-hidden">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-black text-6xl md:text-7xl text-center uppercase tracking-[-0.03em] leading-none mb-16 select-none"
      >
        <span className="text-white/30">EXPE</span>
        <span className="text-white">RIENCE</span>
      </motion.h1>

      {/* Tab Switcher */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center mb-20"
      >
        <div className="inline-flex p-1 gap-0.5 border border-white/10 bg-white/[0.02]">
          {(["work", "education"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="relative px-12 py-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-colors duration-300 z-10"
              style={{ color: activeTab === tab ? "#000" : "rgba(255,255,255,0.3)" }}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="active-tab-indicator"
                  className="absolute inset-0 bg-white z-[-1]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className={activeTab !== tab ? "hover:text-white transition-colors" : ""}>
                {tab}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Timeline Wrapper - max-w-5xl */}
      <div className="max-w-5xl mx-auto relative pl-8 md:pl-0">
        {/* Continuous Timeline Line */}
        <motion.div
          initial={{ scaleY: 0, transformOrigin: "top" }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 top-0 bottom-0 w-px bg-white/10 ml-0 md:ml-[-40px]"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="space-y-12"
          >
            {(activeTab === "work" ? WORK_EXPERIENCE : EDUCATION).map((item) => (
              <motion.div key={item.id} variants={itemVariants} className="relative group">
                {/* Timeline Dot */}
                <div className="absolute -left-[41px] md:left-[-44px] top-2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-transform group-hover:scale-125 group-hover:shadow-[0_0_15px_rgba(255,255,255,1)]" />

                {/* Content Card */}
                <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-10 transition-all duration-500 hover:border-white/20 hover:bg-[#0d0d0d] hover:-translate-y-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="space-y-2">
                      <h3 className="text-2xl font-black uppercase tracking-tight text-white group-hover:text-white transition-colors">
                        {"role" in item ? item.role : item.major}
                      </h3>
                      <div className="text-[0.85rem] font-medium text-white/50 uppercase tracking-[0.15em] flex items-center gap-2">
                        {activeTab === "work" ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-white/30"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-4 h-4 text-white/30"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-9-5m9 5l9-5m-9 5v6m0-6l-9-5m9 5l9-5"></path></svg>
                        )}
                        {"company" in item ? item.company : item.institution}
                      </div>
                    </div>
                    <div className="shrink-0 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/30 px-4 py-2 border border-white/10 group-hover:border-white/30 group-hover:text-white/80 transition-all">
                      {item.period}
                    </div>
                  </div>

                  <p className="text-white/50 text-[0.95rem] leading-relaxed mt-8 max-w-3xl">
                    {item.desc}
                  </p>

                  {/* Technical Badges */}
                  {item.tech && (
                    <div className="mt-8 pt-6 border-t border-white/5 flex flex-wrap gap-2">
                      {item.tech.map((t, i) => (
                        <span
                          key={i}
                          className="text-[0.62rem] uppercase tracking-[0.1em] text-white/45 border border-white/8 bg-white/[0.02] px-3 py-1.5 transition-colors group-hover:border-white/20 group-hover:text-white/70"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="absolute bottom-6 right-8 text-[0.6rem] text-white/5 font-mono tracking-[0.3em] group-hover:text-white/10 transition-colors pointer-events-none">
                    0{item.id} / {activeTab === "work" ? "EXP" : "EDU"}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
