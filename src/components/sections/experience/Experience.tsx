"use client";

import { useState } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const WORK_EXPERIENCE = [
  {
    id: 1,
    role: "Web Developer & UI/UX Intern",
    company: "PT Vinix7",
    period: "2024 - 2025",
    desc: "Collaborated in designing and developing responsive web applications. Translated complex Figma prototypes into clean, functional, and performant code. Conducted user research and iterative design to enhance overall platform usability.",
  },

];

const EDUCATION = [
  {
    id: 1,
    major: "Software Engineering (Semester 8)",
    institution: "Universitas Bina Sarana Informatika",
    period: "2022 - Present",
    desc: "Focused on software architecture, scalable system design, and advanced web development. Actively involved in project-based learning and agile software development life cycles.",
  },

];

type Tab = "work" | "education";

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<Tab>("work");

  return (
    <section className="bg-black min-h-screen px-6 py-28 md:px-20 text-white">
      {/* Heading */}
      <h1 className="font-black text-6xl md:text-7xl text-center uppercase tracking-[-0.03em] leading-none mb-16">
        <span className="text-white/30">EXPE</span>
        <span className="text-white">RIENCE</span>
      </h1>

      {/* Tab Switcher */}
      <div className="flex justify-center mb-20">
        <div className="inline-flex p-1 gap-0.5 border border-white/10 bg-white/[0.02]">
          {(["work", "education"] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-12 py-3 text-[0.7rem] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                activeTab === tab 
                  ? "bg-white text-black" 
                  : "text-white/30 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Wrapper - max-w-5xl */}
      <div className="max-w-5xl mx-auto relative pl-8 md:pl-0">
        {/* Continuous Timeline Line */}
        <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10 ml-0 md:ml-[-40px]" />

        <div className="space-y-12">
          {(activeTab === "work" ? WORK_EXPERIENCE : EDUCATION).map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] md:left-[-44px] top-2 w-2 h-2 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)] transition-transform group-hover:scale-125" />
              
              {/* Content Card */}
              <div className="bg-[#0a0a0a] border border-white/5 p-8 md:p-10 transition-all duration-500 hover:border-white/20 hover:bg-[#0d0d0d]">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white">
                      {"role" in item ? item.role : item.major}
                    </h3>
                    <div className="text-[0.85rem] font-medium text-white/50 uppercase tracking-[0.15em]">
                      {"company" in item ? item.company : item.institution}
                    </div>
                  </div>
                  <div className="shrink-0 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white/30 px-4 py-2 border border-white/10">
                    {item.period}
                  </div>
                </div>
                
                <p className="text-white/50 text-[0.95rem] leading-relaxed mt-8 max-w-3xl">
                  {item.desc}
                </p>

                <div className="absolute bottom-6 right-8 text-[0.6rem] text-white/5 font-mono tracking-[0.3em]">
                  0{item.id} / {activeTab === "work" ? "EXP" : "EDU"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}