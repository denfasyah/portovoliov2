"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { label: "Home", id: "home" },
  { label: "About", id: "about" },
  { label: "Portfolio", id: "portfolio" },
  { label: "Experience", id: "experience" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? "bg-black/95 backdrop-blur-md border-b border-white/5" : "bg-black"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-4 md:py-5 max-w-7xl mx-auto">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="font-extrabold text-[1.3rem] text-white tracking-tighter uppercase hover:text-white/80 transition-colors"
          >
            ADENT
          </button>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center list-none">
            {NAV_LINKS.map((link, i) => (
              <li key={link.id} className="flex items-center">
                <button
                  onClick={() => scrollTo(link.id)}
                  className="text-[0.78rem] font-medium text-white/70 hover:text-white uppercase tracking-[0.08em] transition-colors py-1"
                >
                  {link.label}
                </button>
                {i < NAV_LINKS.length - 1 && (
                  <span className="text-white/20 text-[0.85rem] px-4 select-none">/</span>
                )}
              </li>
            ))}
          </ul>

          {/* Right: CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("contact")}
              className="hidden sm:block text-[0.72rem] font-semibold text-white border border-white/50 px-5 py-2.5 hover:bg-white hover:text-black transition-all uppercase tracking-[0.1em]"
            >
              Get in Touch
            </button>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 focus:outline-none"
              aria-label="Toggle menu"
            >
              <span
                className="block w-6 h-[1.5px] bg-white origin-center transition-all duration-300"
                style={{ transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none" }}
              />
              <span
                className="block w-6 h-[1.5px] bg-white transition-all duration-300"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block w-6 h-[1.5px] bg-white origin-center transition-all duration-300"
                style={{ transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none" }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[60px] left-0 right-0 z-[99] bg-black border-b border-white/10 md:hidden"
          >
            <div className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-left py-3 text-[0.9rem] font-medium text-white/60 hover:text-white uppercase tracking-widest transition-colors border-b border-white/5 last:border-0"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => scrollTo("contact")}
                className="mt-3 py-3 text-[0.78rem] font-semibold text-white border border-white/40 hover:bg-white hover:text-black transition-all uppercase tracking-[0.12em] text-center"
              >
                Get in Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
