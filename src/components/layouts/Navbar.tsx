"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Experience", href: "#experience" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("Home");
  const [isDark, setIsDark] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  // Deteksi event scroll untuk memicu efek glassmorphism
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Sinkronisasi inisial tema saat komponen dimuat di browser
  useEffect(() => {
    const isDarkTheme = document.documentElement.classList.contains("dark");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsDark(isDarkTheme);
  }, []);

  // Handler pengubah tema dengan manipulasi DOM class "dark"
  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <>
      {/* Wrapper Navigasi Utama */}
      <nav className="fixed top-4 left-0 right-0 z-50 px-4 transition-all duration-300">
        <div
          className={`
            mx-auto max-w-3xl flex items-center justify-between gap-3
            rounded-full px-4 py-2.5
            border transition-all duration-300
            ${scrolled
              ? "bg-white/70 dark:bg-neutral-950/40 border-slate-200/80 dark:border-white/10 backdrop-blur-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/40"
              : "bg-white/40 dark:bg-white/5 border-slate-200/50 dark:border-white/10 backdrop-blur-md"}
          `}
        >
          {/* Logo Brand */}
          <Link
            href="#home"
            onClick={() => setActive("Home")}
            className="text-slate-900 dark:text-white font-extrabold text-[15px] tracking-tight whitespace-nowrap shrink-0 hover:opacity-80 transition-opacity"
          >
            <span className="text-blue-600 dark:text-blue-500 font-mono">&lt;</span>
            Adent
            <span className="text-blue-600 dark:text-blue-500 font-mono">/&gt;</span>
          </Link>

          {/* Menu Tautan Tampilan Desktop */}
          <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setActive(link.label)}
                className={`
                  text-[13px] font-medium px-4 py-1.5 rounded-full
                  border transition-all duration-200 cursor-pointer
                  ${active === link.label
                    ? "text-blue-600 dark:text-white bg-blue-50 dark:bg-blue-500/10 border-blue-200 dark:border-blue-500/30 shadow-sm"
                    : "text-slate-500 dark:text-white/50 border-transparent hover:text-slate-900 hover:dark:text-white hover:bg-slate-100/80 hover:dark:bg-white/5"}
                `}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Kontrol Sisi Kanan */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Tombol Pengubah Tema */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="w-9 h-9 rounded-full flex items-center justify-center text-[15px]
                bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-white/70
                hover:bg-slate-50 hover:dark:bg-white/10 hover:text-slate-900 hover:dark:text-white hover:border-slate-300 hover:dark:border-white/20
                shadow-sm dark:shadow-none transition-all duration-200"
            >
              {isDark ? "☀️" : "🌙"}
            </button>

            {/* Tombol Aksi Utama Desktop */}
            <button
              className="hidden md:block bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white
                text-[12px] font-bold tracking-wider px-5 py-2 rounded-full
                transition-all duration-200 shadow-sm hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
            >
              Hire Me
            </button>

            {/* Hamburger Trigger Menu Mobile */}
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="md:hidden flex flex-col gap-1.5 p-2 rounded-xl
                bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10
                hover:bg-slate-50 hover:dark:bg-white/10 transition-all duration-200"
            >
              <span
                className={`block w-4 h-[1.5px] bg-slate-600 dark:bg-white/70 rounded-full
                  transition-all duration-300 origin-center
                  ${open ? "translate-y-1.25 rotate-45 bg-slate-900 dark:bg-white" : ""}`}
              />
              <span
                className={`block w-4 h-[1.5px] bg-slate-600 dark:bg-white/70 rounded-full
                  transition-all duration-300
                  ${open ? "opacity-0 scale-x-0" : ""}`}
              />
              <span
                className={`block w-4 h-[1.5px] bg-slate-600 dark:bg-white/70 rounded-full
                  transition-all duration-300 origin-center
                  ${open ? "-translate-y-1.25 -rotate-45 bg-slate-900 dark:bg-white" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Menu Panel Khusus Mobile */}
        <div
          className={`
            md:hidden mx-auto max-w-3xl mt-2
            flex flex-col gap-1 px-3
            bg-white/90 dark:bg-neutral-950/80 border border-slate-200 dark:border-white/10 rounded-[24px]
            backdrop-blur-2xl overflow-hidden
            transition-all duration-300 ease-in-out
            ${open ? "max-h-80 opacity-100 py-3 shadow-xl shadow-slate-200/40 dark:shadow-black/50" : "max-h-0 opacity-0 py-0 border-transparent pointer-events-none"}
          `}
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => {
                setActive(link.label);
                setOpen(false);
              }}
              className={`
                text-[14px] font-medium px-4 py-2.5 rounded-xl cursor-pointer
                transition-all duration-200
                ${active === link.label
                  ? "text-blue-600 dark:text-white bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20"
                  : "text-slate-500 dark:text-white/50 hover:text-slate-900 hover:dark:text-white hover:bg-slate-50 hover:dark:bg-white/5"}
              `}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="pt-2 mt-2 border-t border-slate-100 dark:border-white/5">
            <button
              className="w-full bg-slate-900 hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white
                text-[12px] font-bold tracking-wider py-2.5 rounded-xl
                transition-all duration-200 active:scale-[0.98]"
            >
              Hire Me
            </button>
          </div>
        </div>
      </nav>

      {/* Spacer Logis untuk Tata Letak Konten */}
      <div className="h-24 pointer-events-none" />
    </>
  );
}