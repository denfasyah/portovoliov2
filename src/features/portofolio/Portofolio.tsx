/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { SKILL_ROWS } from "@/data/skills";
import { CERTS } from "@/data/certificates";

type Tab = "projects" | "skills" | "certificates";

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
    <motion.button
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onTouchStart={() => setPressed(true)}
      onTouchEnd={() => setPressed(false)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
      className="relative select-none focus:outline-none"
      style={{
        width: 54,
        height: pressed ? 54 : 60,
        transform: pressed ? "translateY(6px)" : "translateY(0)",
        transition: "height 0.06s ease",
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
    </motion.button>
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
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
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
      </motion.div>
    </div>
  );
}

// ─── PROJECTS TAB ──────────────────────────────────────────────────────────────

function Projects() {
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<Project | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(PROJECTS.length / ITEMS_PER_PAGE);
  const visible = PROJECTS.slice(page * ITEMS_PER_PAGE, (page + 1) * ITEMS_PER_PAGE);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={page}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
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

                {/* Index + category */}
                <div className="absolute top-3 left-3 right-3 flex justify-between pointer-events-none px-5 z-10">
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
                <div className="absolute bottom-0 left-0 right-0 p-4 pt-6 z-10">
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
        </motion.div>
      </AnimatePresence>

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

      <AnimatePresence>
        {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </>
  );
}

// ─── SKILLS TAB ────────────────────────────────────────────────────────────────

function Skills() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center gap-8"
    >
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
    </motion.div>
  );
}

// ─── CERTIFICATES TAB ──────────────────────────────────────────────────────────

function CertificateCard({ c, i }: { c: typeof CERTS[0]; i: number }) {
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
        className="group relative overflow-hidden cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          border: `1px solid ${isHovered ? c.color + "50" : "rgba(255,255,255,0.07)"}`,
          transition: "border-color 0.25s",
          boxShadow: isHovered ? `0 20px 40px ${c.color}20` : "none",
        }}
      >
        {/* Image */}
        <div className="relative h-44 overflow-hidden" style={{ transform: "translateZ(30px)" }}>
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
          className="p-5 space-y-2 relative z-10"
          style={{ backgroundColor: "#080808", transform: "translateZ(40px)" }}
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
            transform: "translateZ(50px)",
          }}
        />
      </motion.div>
    </div>
  );
}

function Certificates() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
    >
      {CERTS.map((c, i) => (
        <CertificateCard key={c.id} c={c} i={i} />
      ))}
    </motion.div>
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
    <section id="portfolio" className="bg-black min-h-screen px-6 py-28 md:px-20 overflow-hidden">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="font-black text-6xl md:text-7xl text-center uppercase tracking-[-0.03em] leading-none mb-16 select-none"
      >
        <span className="text-white/30">PORT</span>
        <span className="text-white">FOLIO</span>
          <p className="mt-6 text-[0.9rem] text-white/50 text-normal tracking-widest uppercase max-w-xl mx-auto leading-relaxed">
            Selected Digital Works.
            
          </p>
      </motion.h1>

      {/* Tab switcher — centered */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="flex justify-center mb-14"
      >
        <div
          className="inline-flex p-1 gap-0.5 relative"
          style={{
            border: "1px solid rgba(255,255,255,0.07)",
            backgroundColor: "rgba(255,255,255,0.015)",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className="relative px-7 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.17em] transition-all duration-200 z-10"
              style={{
                color: activeTab === t.id ? "#000" : "rgba(255,255,255,0.3)",
              }}
            >
              {activeTab === t.id && (
                <motion.div
                  layoutId="portfolio-tab-indicator"
                  className="absolute inset-0 bg-white z-[-1]"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
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
      </motion.div>

      {/* Content */}
      <div className="max-w-5xl mx-auto min-h-[60vh]">
        <AnimatePresence mode="wait">
          {activeTab === "projects" && <Projects key="projects" />}
          {activeTab === "skills" && <Skills key="skills" />}
          {activeTab === "certificates" && <Certificates key="certs" />}
        </AnimatePresence>
      </div>
    </section>
  );
}