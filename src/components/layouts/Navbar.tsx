"use client";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 md:px-10 h-16 bg-black/90 backdrop-blur-sm border-b-2 border-[#03f7ff]">
      <style>{`
        .font-display {
          font-family: 'Space Grotesk', sans-serif;
        }
        .neon-glow-text {
          text-shadow: 0 0 10px rgba(3,247,255,0.5), 0 0 20px rgba(3,247,255,0.2);
        }
        .nav-link-hover { position: relative; }
        .nav-link-hover::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: #03f7ff;
          transition: width 0.3s ease;
          box-shadow: 0 0 8px #03f7ff;
        }
        .nav-link-hover:hover::after { width: 100%; }
      `}</style>

      <div className="font-display text-xl md:text-2xl font-bold text-[#54f8ff] tracking-tighter neon-glow-text whitespace-nowrap">
        ADENT.DEV
      </div>

      <nav className="hidden md:flex gap-10 items-center h-full" style={{ fontFamily: "'Space Mono', monospace" }}>
        <a className="text-[#54f8ff] text-xs h-full flex items-center nav-link-hover" href="#">
          Home
        </a>
        <a className="text-[#b9caca] text-xs hover:text-[#54f8ff] transition-colors duration-200 nav-link-hover" href="#">
          About
        </a>
        <a className="text-[#b9caca] text-xs hover:text-[#54f8ff] transition-colors duration-200 nav-link-hover" href="#">
          Portfolio
        </a>
        <a className="text-[#b9caca] text-xs hover:text-[#54f8ff] transition-colors duration-200 nav-link-hover" href="#">
          Experience
        </a>
      </nav>

      <button
        className="bg-[#03f7ff] text-[#002021] px-4 md:px-5 py-2 text-[10px] md:text-xs tracking-widest uppercase border-2 border-black shadow-[2px_2px_0px_#000] hover:-translate-x-[1px] hover:-translate-y-[1px] hover:shadow-[3px_3px_0px_#000] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all whitespace-nowrap"
        style={{ fontFamily: "'Space Mono', monospace" }}
      >
        HIRE ME
      </button>
    </header>
  );
}