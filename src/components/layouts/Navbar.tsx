"use client";

export default function Navbar() {
  return (
    <nav className="fixed bg-black top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 py-5">
      <a
        href="#"
        className="font-extrabold text-[1.3rem] text-white tracking-tighter uppercase relative z-10"
      >
        ADENT
      </a>
      {/* Hide links on mobile, show on medium screens and up */}
      <ul className="hidden md:flex items-center gap-0 list-none">
        {["Home", "ABOUT", "Projects", "Experience"].map((item, i) => (
          <li key={item} className="flex items-center">
            <a
              href="#"
              className="text-[0.78rem] font-medium text-white/85 hover:text-white uppercase tracking-[0.08em] transition-colors py-1"
            >
              {item}
            </a>
            {i < 3 && (
              <span className="text-white/30 text-[0.85rem] px-[18px] select-none">
                /
              </span>
            )}
          </li>
        ))}
      </ul>
      <a
        href="#contact"
        className="text-[0.75rem] font-semibold text-white border border-white/70 px-[22px] py-[10px] rounded hover:bg-white hover:text-black transition-all uppercase tracking-[0.1em] relative z-10"
      >
        Get in Touch
      </a>
    </nav>
  );
}
