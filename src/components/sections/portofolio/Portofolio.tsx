"use client";

import { useState, useEffect } from "react";

type Tab = "projects" | "skills" | "certificates";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PROJECTS = [
  {
    id: 1,
    title: "DenAnime",
    category: "Frontend",
    year: "2024",
    desc: "Anime discovery platform built with vanilla JS and a public REST API. Features real-time search, genre filtering, and a responsive card-based UI with smooth hover transitions.",
    tech: ["JavaScript", "REST API", "CSS3", "HTML5"],
    link: "https://github.com/denfasyah/dennime",
    live: "",
    img: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&q=80",
  },
  {
    id: 2,
    title: "DenPiw",
    category: "Full Stack",
    year: "2024",
    desc: "Server-rendered dynamic web application using EJS templating. Clean layout architecture with fast load times and proper MVC separation.",
    tech: ["EJS", "Node.js", "Express", "CSS3"],
    link: "https://github.com/denfasyah/denpiw",
    live: "",
    img: "https://images.unsplash.com/photo-1555066931-4365d14431b9?w=800&q=80",
  },
  {
    id: 3,
    title: "Portfolio V2",
    category: "Frontend",
    year: "2025",
    desc: "Personal portfolio built with Next.js 15 and Tailwind CSS. Features a WebGL animated hero, GitHub contribution integration, and polished micro-interactions throughout.",
    tech: ["Next.js", "TypeScript", "WebGL", "Tailwind CSS"],
    link: "https://github.com/denfasyah",
    live: "https://dentdev.vercel.app",
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80",
  },
  {
    id: 4,
    title: "REST API Service",
    category: "Backend",
    year: "2024",
    desc: "Production-ready RESTful API with JWT authentication, role-based access control, full CRUD operations, and MongoDB integration on top of Express.",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    link: "https://github.com/denfasyah",
    live: "",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    id: 5,
    title: "Laravel CMS",
    category: "Full Stack",
    year: "2023",
    desc: "Content management system with role-based access control, file/image uploads, rich text editing, and fully relational MySQL database design.",
    tech: ["Laravel", "MySQL", "Bootstrap", "PHP"],
    link: "https://github.com/denfasyah",
    live: "",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
  },
  {
    id: 6,
    title: "React Dashboard",
    category: "Frontend",
    year: "2025",
    desc: "Admin dashboard with interactive data visualisation, filterable and sortable tables, dark mode, and a fully responsive layout using Recharts.",
    tech: ["React", "Recharts", "Tailwind CSS", "TypeScript"],
    link: "https://github.com/denfasyah",
    live: "",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
  },
];

const ITEMS_PER_PAGE = 6;

const SKILL_ROWS: { label: string; color: string; textColor: string }[][] = [
  [
    { label: "HTML", color: "#e34c26", textColor: "#fff" },
    { label: "CSS", color: "#264de4", textColor: "#fff" },
    { label: "JS", color: "#f7df1e", textColor: "#111" },
    { label: "TS", color: "#3178c6", textColor: "#fff" },
    { label: "PHP", color: "#777bb4", textColor: "#fff" },
    { label: "SQL", color: "#00758f", textColor: "#fff" },
    { label: "Bash", color: "#3c3c3c", textColor: "#4af626" },
  ],
  [
    { label: "React", color: "#20232a", textColor: "#61dafb" },
    { label: "Next", color: "#f5f5f5", textColor: "#000" },
    { label: "Vue", color: "#42b883", textColor: "#fff" },
    { label: "Node", color: "#339933", textColor: "#fff" },
    { label: "Express", color: "#ececec", textColor: "#000" },
    { label: "Laravel", color: "#ff2d20", textColor: "#fff" },
    { label: "Vite", color: "#646cff", textColor: "#fff" },
  ],
  [
    { label: "Mongo", color: "#47a248", textColor: "#fff" },
    { label: "MySQL", color: "#4479a1", textColor: "#fff" },
    { label: "Tailwind", color: "#0ea5e9", textColor: "#fff" },
    { label: "Bootstrap", color: "#7952b3", textColor: "#fff" },
    { label: "Git", color: "#f05032", textColor: "#fff" },
    { label: "GitHub", color: "#24292e", textColor: "#fff" },
    { label: "Docker", color: "#2496ed", textColor: "#fff" },
  ],
  [
    { label: "AWS", color: "#ff9900", textColor: "#000" },
    { label: "Linux", color: "#fcc624", textColor: "#000" },
    { label: "Figma", color: "#f24e1e", textColor: "#fff" },
    { label: "Vercel", color: "#f5f5f5", textColor: "#000" },
    { label: "REST", color: "#6db33f", textColor: "#fff" },
    { label: "JWT", color: "#d63aff", textColor: "#fff" },
    { label: "API", color: "#ff6b6b", textColor: "#fff" },
  ],
];

const CERTS = [
  {
    title: "Full Stack Web Development",
    issuer: "Dicoding Indonesia",
    date: "2024",
    id: "CERT-FSD-2024",
    color: "#3b82f6",
    img: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80",
  },
  {
    title: "React & Next.js Fundamentals",
    issuer: "Buildwithangga",
    date: "2024",
    id: "CERT-RNX-2024",
    color: "#61dafb",
    img: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=600&q=80",
  },
  {
    title: "JavaScript Algorithms & DS",
    issuer: "freeCodeCamp",
    date: "2023",
    id: "CERT-JS-2023",
    color: "#f7df1e",
    img: "https://images.unsplash.com/photo-1579468118864-1b9ea3c0db4a?w=600&q=80",
  },
  {
    title: "Back End Development & APIs",
    issuer: "freeCodeCamp",
    date: "2023",
    id: "CERT-API-2023",
    color: "#6db33f",
    img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80",
  },
  {
    title: "Database Management MySQL",
    issuer: "Dicoding Indonesia",
    date: "2023",
    id: "CERT-DB-2023",
    color: "#4479a1",
    img: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=600&q=80",
  },
  {
    title: "UI/UX Design Essentials",
    issuer: "Skilvul",
    date: "2024",
    id: "CERT-UX-2024",
    color: "#f24e1e",
    img: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&q=80",
  },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function darken(hex: string, amt: number): string {
  const h = hex.replace("#", "");
  if (h.length < 6) return "#000";
  const clamp = (v: number) => Math.max(0, Math.min(255, v));
  const r = clamp(parseInt(h.slice(0, 2), 16) - amt);
  const g = clamp(parseInt(h.slice(2, 4), 16) - amt);
  const b = clamp(parseInt(h.slice(4, 6), 16) - amt);
  return `rgb(${r},${g},${b})`;
}

// ─── KEY COMPONENT ─────────────────────────────────────────────────────────────

function Key({ label, color, textColor }: { label: string; color: string; textColor: string }) {
  const [pressed, setPressed] = useState(false);
  const shadow = darken(color, 55);

  return (
    <button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      aria-label={label}
      className="relative select-none focus:outline-none"
      style={{
        width: 54,
        height: pressed ? 54 : 60,
        transform: pressed ? "translateY(6px)" : "translateY(0)",
        transition: "transform 0.06s ease, height 0.06s ease",
        flexShrink: 0,
      }}
    >
      {/* Bottom face (3D depth) */}
      <div
        className="absolute inset-x-0 bottom-0 rounded-lg"
        style={{ height: pressed ? 2 : 8, backgroundColor: shadow }}
      />
      {/* Top key face */}
      <div
        className="absolute inset-x-0 top-0 rounded-lg flex items-center justify-center overflow-hidden"
        style={{
          height: 54,
          backgroundColor: color,
          color: textColor,
          boxShadow: pressed
            ? "none"
            : "inset 0 1px 0 rgba(255,255,255,0.28), inset 0 -1px 0 rgba(0,0,0,0.25)",
        }}
      >
        {/* Top shine */}
        <div
          className="absolute inset-x-0 top-0 rounded-t-lg pointer-events-none"
          style={{
            height: "45%",
            background: "linear-gradient(to bottom, rgba(255,255,255,0.22), transparent)",
          }}
        />
        <span
          className="relative z-10 text-center leading-none px-1"
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "0.58rem",
            fontWeight: 900,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          {label}
        </span>
      </div>
    </button>
  );
}

// ─── PROJECT MODAL ─────────────────────────────────────────────────────────────

type Project = (typeof PROJECTS)[0];

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.88)", backdropFilter: "blur(10px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl border border-white/12 bg-[#080808] overflow-hidden"
        style={{ boxShadow: "0 50px 100px rgba(0,0,0,0.9)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Hero image */}
        <div className="relative h-52 overflow-hidden">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover"
            style={{ filter: "brightness(0.6)" }}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 30%, #080808 100%)" }}
          />
          {/* Overlay labels */}
          <div className="absolute top-3 left-3 bg-black/60 border border-white/10 px-2.5 py-1 text-[0.58rem] text-white/50 uppercase tracking-[0.2em]">
            /{String(project.id).padStart(3, "0")}/
          </div>
          <div className="absolute top-3 right-12 bg-black/60 border border-white/10 px-2.5 py-1 text-[0.58rem] text-white uppercase tracking-[0.15em]">
            {project.category}
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-7 h-7 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/50 transition-all"
          >
            <svg viewBox="0 0 14 14" className="w-3 h-3" fill="none">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-5">
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <h2 className="text-white font-black text-xl uppercase tracking-tight">{project.title}</h2>
              <span className="text-white/20 text-[0.62rem] uppercase tracking-widest">{project.year}</span>
            </div>
            <p className="text-white/50 text-[0.87rem] leading-relaxed">{project.desc}</p>
          </div>

          <div>
            <span className="block text-[0.58rem] font-bold uppercase tracking-[0.25em] text-white/20 mb-2.5">
              Tech Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-[0.62rem] uppercase tracking-[0.1em] text-white/45 border border-white/8 bg-white/[0.03] px-2.5 py-1"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-2.5 pt-1">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 border border-white/12 hover:border-white/35 hover:bg-white/5 py-3 text-[0.67rem] font-semibold uppercase tracking-[0.15em] text-white/50 hover:text-white transition-all"
            >
              <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              Source Code
            </a>
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 py-3 text-[0.67rem] font-black uppercase tracking-[0.15em] transition-all"
              >
                Live Site
                <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none">
                  <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PROJECTS TAB ──────────────────────────────────────────────────────────────

function Projects() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const totalPages = Math.ceil(PROJECTS.length / ITEMS_PER_PAGE);
  const visible = PROJECTS.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visible.map((p, i) => {
          const isHovered = hoveredId === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setSelected(p)}
              onMouseEnter={() => setHoveredId(p.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group relative overflow-hidden border text-left focus:outline-none"
              style={{
                aspectRatio: "16/10",
                borderColor: isHovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.06)",
                transition: "border-color 0.3s",
              }}
            >
              {/* Image — grayscale → color */}
              <img
                src={p.img}
                alt={p.title}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: isHovered ? "grayscale(0%) brightness(0.65)" : "grayscale(100%) brightness(0.4)",
                  transform: isHovered ? "scale(1.06)" : "scale(1)",
                  transition: "filter 0.6s ease, transform 0.6s ease",
                }}
              />

              {/* Vignette */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: isHovered
                    ? "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)"
                    : "linear-gradient(to top, rgba(0,0,0,0.96) 0%, rgba(0,0,0,0.5) 60%, rgba(0,0,0,0.1) 100%)",
                  transition: "background 0.4s",
                }}
              />

              {/* Corner brackets — film/cinema style */}
              <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/30 pointer-events-none" />
              <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/30 pointer-events-none" />
              <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/30 pointer-events-none" />
              <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/30 pointer-events-none" />

              {/* Index + category */}
              <div className="absolute top-3 left-3 right-3 flex justify-between pointer-events-none px-5">
                <span className="text-[0.55rem] text-white/35 uppercase tracking-[0.22em]">
                  /{String(page * ITEMS_PER_PAGE + i + 1).padStart(3, "0")}/
                </span>
                <span
                  className="text-[0.55rem] uppercase tracking-[0.18em] px-2 py-0.5 font-bold"
                  style={{
                    backgroundColor: isHovered ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.5)",
                    color: "rgba(255,255,255,0.7)",
                    transition: "background-color 0.3s",
                  }}
                >
                  {p.category}
                </span>
              </div>

              {/* Bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-4 pt-6">
                <div className="flex items-end justify-between gap-2">
                  <div>
                    <h3 className="text-white font-black text-base uppercase leading-none tracking-tight mb-1.5">
                      {p.title}
                    </h3>
                    <div className="flex gap-2 flex-wrap">
                      {p.tech.slice(0, 2).map((t) => (
                        <span key={t} className="text-[0.52rem] text-white/30 uppercase tracking-wider">
                          {t}
                        </span>
                      ))}
                      {p.tech.length > 2 && (
                        <span className="text-[0.52rem] text-white/18 uppercase">+{p.tech.length - 2}</span>
                      )}
                    </div>
                  </div>

                  {/* Expand icon */}
                  <div
                    className="w-7 h-7 border flex items-center justify-center flex-shrink-0"
                    style={{
                      borderColor: isHovered ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.15)",
                      backgroundColor: isHovered ? "rgba(255,255,255,0.12)" : "transparent",
                      transition: "border-color 0.3s, background-color 0.3s",
                    }}
                  >
                    <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-white/60" fill="none">
                      <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-10 border-t border-white/5 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="border border-white/12 text-white/35 hover:text-white hover:border-white/35 disabled:opacity-20 disabled:cursor-not-allowed px-5 py-2 text-[0.63rem] uppercase tracking-widest transition-all"
          >
            ← Prev
          </button>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`w-7 h-7 text-[0.63rem] border transition-all ${
                  idx === page
                    ? "border-white text-white bg-white/8"
                    : "border-white/10 text-white/25 hover:border-white/25 hover:text-white/55"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="border border-white/12 text-white/35 hover:text-white hover:border-white/35 disabled:opacity-20 disabled:cursor-not-allowed px-5 py-2 text-[0.63rem] uppercase tracking-widest transition-all"
          >
            Next →
          </button>
        </div>
      )}

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

// ─── SKILLS TAB ────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <div className="flex flex-col items-center gap-8">
      <p className="text-[0.62rem] text-white/18 uppercase tracking-[0.3em]">— Hint: press a key —</p>

      {/* Keyboard chassis */}
      <div
        className="relative w-full max-w-3xl"
        style={{
          background: "linear-gradient(160deg, #1f1f21 0%, #141416 55%, #0e0e10 100%)",
          borderRadius: 20,
          padding: "20px 24px 28px",
          boxShadow: [
            "0 50px 100px rgba(0,0,0,0.9)",
            "0 0 0 1px rgba(255,255,255,0.055)",
            "inset 0 1px 0 rgba(255,255,255,0.09)",
            "inset 0 -3px 0 rgba(0,0,0,0.6)",
          ].join(", "),
        }}
      >
        {/* Brand bar */}
        <div className="flex items-center justify-between mb-4 px-1">
          <span style={{ fontSize: "0.52rem", letterSpacing: "0.38em", color: "rgba(255,255,255,0.12)", fontWeight: 700, textTransform: "uppercase" }}>
            ADENT · SKILLBOARD MK1
          </span>
          <div className="flex gap-1.5">
            {(["#ff5f57", "#ffbd2e", "#28c840"] as const).map((c) => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: c, opacity: 0.65 }} />
            ))}
          </div>
        </div>

        {/* Key tray */}
        <div
          style={{
            borderRadius: 14,
            background: "rgba(0,0,0,0.55)",
            boxShadow: "inset 0 4px 12px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.035)",
            padding: "18px 14px 22px",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {SKILL_ROWS.map((row, ri) => (
              <div
                key={ri}
                style={{
                  display: "flex",
                  gap: 8,
                  justifyContent: "center",
                  marginLeft: [0, 10, 5, 14][ri] ?? 0,
                }}
              >
                {row.map((key) => (
                  <Key key={key.label} label={key.label} color={key.color} textColor={key.textColor} />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Spacebar */}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 10 }}>
          <div
            style={{
              width: 260,
              height: 36,
              borderRadius: 8,
              background: "linear-gradient(to bottom, #2e2e30, #1c1c1e)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.12), 0 4px 0 #0a0a0b",
            }}
          />
        </div>

        {/* RGB LED strip */}
        <div
          style={{
            position: "absolute",
            bottom: 4,
            left: "10%",
            right: "10%",
            height: 2,
            borderRadius: 99,
            background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #f59e0b, #22c55e, #3b82f6)",
            filter: "blur(4px)",
            opacity: 0.65,
          }}
        />
      </div>

      {/* Legend */}
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-x-5 gap-y-2.5 w-full max-w-3xl">
        {SKILL_ROWS.flat().map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: s.color }} />
            <span className="text-[0.6rem] text-white/25 uppercase tracking-wider">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CERTIFICATES TAB ──────────────────────────────────────────────────────────

function Certificates() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {CERTS.map((c, i) => {
        const isHovered = hoveredIdx === i;
        return (
          <div
            key={c.id}
            className="group relative overflow-hidden cursor-pointer"
            style={{
              border: `1px solid ${isHovered ? c.color + "50" : "rgba(255,255,255,0.07)"}`,
              transform: isHovered ? "translateY(-7px) scale(1.015)" : "translateY(0) scale(1)",
              transition: "transform 0.38s cubic-bezier(0.34,1.56,0.64,1), border-color 0.25s",
            }}
            onMouseEnter={() => setHoveredIdx(i)}
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {/* Image */}
            <div className="relative h-44 overflow-hidden">
              <img
                src={c.img}
                alt={c.title}
                className="w-full h-full object-cover"
                style={{
                  filter: isHovered ? "grayscale(20%) brightness(0.5)" : "grayscale(80%) brightness(0.35)",
                  transform: isHovered ? "scale(1.1)" : "scale(1)",
                  transition: "filter 0.55s ease, transform 0.55s ease",
                }}
              />

              {/* Color tint overlay */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${c.color}35, transparent 60%)`,
                  opacity: isHovered ? 1 : 0,
                  transition: "opacity 0.4s",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(to bottom, transparent 35%, #0a0a0a 100%)" }}
              />

              {/* Verified badge */}
              <div
                className="absolute top-0 right-0 px-3 py-1.5 text-[0.52rem] font-black uppercase tracking-[0.2em]"
                style={{
                  backgroundColor: c.color,
                  color: "#000",
                  clipPath: "polygon(8px 0, 100% 0, 100% 100%, 0 100%, 0 8px)",
                }}
              >
                ✓ Verified
              </div>

              {/* Index */}
              <span className="absolute top-3 left-3 text-[0.55rem] text-white/25 uppercase tracking-[0.22em]">
                /{String(i + 1).padStart(2, "0")}/
              </span>
            </div>

            {/* Content */}
            <div
              className="p-5 space-y-2"
              style={{ backgroundColor: "#080808" }}
            >
              <h3
                className="font-bold text-[0.9rem] leading-snug"
                style={{ color: isHovered ? "#fff" : "rgba(255,255,255,0.8)", transition: "color 0.2s" }}
              >
                {c.title}
              </h3>
              <div className="flex items-center justify-between">
                <p
                  className="text-[0.65rem] uppercase tracking-[0.15em] font-semibold"
                  style={{ color: c.color + "cc" }}
                >
                  {c.issuer}
                </p>
                <span className="text-[0.6rem] text-white/18 uppercase tracking-widest">{c.date}</span>
              </div>
              <div className="pt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                <code className="text-[0.55rem] text-white/12 font-mono tracking-widest">{c.id}</code>
              </div>
            </div>

            {/* Animated bottom line */}
            <div
              className="absolute bottom-0 left-0 h-0.5"
              style={{
                width: isHovered ? "100%" : "0%",
                backgroundColor: c.color,
                transition: "width 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
            />

            {/* Subtle glow behind card */}
            <div
              className="absolute inset-0 pointer-events-none rounded-sm"
              style={{
                boxShadow: isHovered ? `0 0 30px ${c.color}20` : "none",
                transition: "box-shadow 0.4s",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState<Tab>("projects");

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "projects", label: "Projects", count: PROJECTS.length },
    { id: "skills", label: "Skills", count: SKILL_ROWS.flat().length },
    { id: "certificates", label: "Certificates", count: CERTS.length },
  ];

  return (
    <section className="bg-black min-h-screen px-6 py-28 md:px-20">
      {/* Heading */}
      <h1 className="font-black text-6xl md:text-7xl text-center uppercase tracking-[-0.03em] leading-none mb-16 select-none">
        <span className="text-white/30">PORT</span>
        <span className="text-white">FOLIO</span>
      </h1>

      {/* Tab switcher — centered */}
      <div className="flex justify-center mb-14">
        <div
          className="inline-flex p-1 gap-0.5"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            backgroundColor: "rgba(255,255,255,0.015)",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="relative px-7 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.17em] transition-all duration-200"
              style={{
                backgroundColor: activeTab === t.id ? "rgba(255,255,255,1)" : "transparent",
                color: activeTab === t.id ? "#000" : "rgba(255,255,255,0.3)",
              }}
            >
              {t.label}
              <span
                className="ml-2 text-[0.52rem]"
                style={{ color: activeTab === t.id ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.12)" }}
              >
                {t.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto">
        {activeTab === "projects" && <Projects />}
        {activeTab === "skills" && <Skills />}
        {activeTab === "certificates" && <Certificates />}
      </div>
    </section>
  );
}




// itu code halaman portofolio saya. saya baru kelar mengerjakan bagian portofolio. nah skrng saya mau mengerjakan halaman experience. saya mau tanya dulu saya kan masi ada experience dan juga education apakah lebih baik eduaction di masukan saja ke experience? karna navbar nya udah bagus apa di pisah aja dan tambah education pada bagian navbar? lihat pada portofolio yg dmn isi nya ada project skills dan certificate project tabs apakah bagus seperti itu? karna semisal saya bedakan semua halaman nya dan saya pasti tambah di navbar auto chaos kan? jadi apakah seperti itu bagus? lalu untuk experience dan education bagus nya gmn? apa kah sama seperti portofolio?. jangan koding dulu. saya mau bahas dulu. kamu adalah seorang senior full stack developer