"use client";

import Image from "next/image";

export default function About() {
  return (
    <section className="bg-black min-h-screen px-6 py-28 md:px-20">
      {/* ── Heading ── */}
      <h1 className="font-black text-6xl md:text-7xl text-center uppercase tracking-[-0.03em] leading-none mb-20 select-none">
        <span className="text-white/30">ABOUT</span>
        <span className="text-white"> ME</span>
      </h1>

      {/* ── Main Grid ── */}
      <div className="max-w-5xl mx-auto flex flex-col-reverse md:grid md:grid-cols-[1fr_340px] gap-12 md:gap-16 items-start">

        {/* ── LEFT: Description ── */}
        <div className="flex flex-col gap-10">
          {/* Bio */}
          <div>
            <span className="block text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/30 mb-4">
              Bio
            </span>
            <p className="text-white/70 text-[1.05rem] leading-[1.85] mb-4">
              I&apos;m a Full Stack Developer based in Indonesia, passionate about
              crafting digital experiences that marry performance with aesthetic
              precision. Currently a Software Engineering student at Bina Sarana
              Informatics University — 21 years old and fully committed to the
              craft.
            </p>
            <p className="text-white/50 text-[0.95rem] leading-[1.8]">
              My approach centers on clean architecture, thoughtful API design,
              and high-impact visual engineering. I follow the latest trends in
              tech and believe that the best products are built at the
              intersection of form and function.
            </p>
          </div>

          {/* Expertise & Philosophy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              {
                label: "Expertise",
                value:
                  "Frontend Architecture · Backend Systems · UI/UX Engineering · Database Design",
              },
              {
                label: "Philosophy",
                value:
                  "Design is not just how it looks — it's how it works, how it scales, and how it feels.",
              },
              {
                label: "Stack",
                value:
                  "Next.js · React · Node.js · Laravel · MongoDB · MySQL · Tailwind CSS",
              },
              {
                label: "Currently",
                value:
                  "Building open-source tools & freelance projects. Always open to new collaborations.",
              },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="border border-white/8 bg-white/[0.02] p-5 rounded-sm"
              >
                <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
                  {label}
                </h3>
                <p className="text-white/60 text-[0.85rem] leading-relaxed">
                  {value}
                </p>
              </div>
            ))}
          </div>

          {/* GitHub contribution graph */}
          <div>
            <span className="block text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/30 mb-4">
              Contributions — Last 12 Months
            </span>
            <div className="border border-white/8 bg-white/[0.02] rounded-sm p-5 overflow-hidden">
              {/* GitHub's public contribution SVG embed */}
              <img
                src="https://ghchart.rshah.org/22c55e/denfasyah"
                alt="denfasyah GitHub contribution chart"
                className="w-full h-auto opacity-90"
                style={{ filter: "brightness(1.1) saturate(1.2)" }}
              />
              <div className="mt-3 flex items-center justify-between">
                <a
                  href="https://github.com/denfasyah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.7rem] text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest"
                >
                  github.com/denfasyah ↗
                </a>
                <span className="text-[0.7rem] text-white/20 uppercase tracking-widest">
                  28 repositories
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Profile Card ── */}
        <div className="flex flex-col gap-6 md:sticky md:top-28">
          {/* Avatar */}
          <div className="relative">
            <div
              className="w-full aspect-square rounded-sm overflow-hidden border border-white/10"
              style={{ maxWidth: 340 }}
            >
              <Image
                src="https://avatars.githubusercontent.com/u/124890555?v=4"
                alt="Adent Fallah Amorisyah"
                width={340}
                height={340}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                priority
                unoptimized
              />
            </div>
            {/* Available badge */}
            <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-white/10 rounded-sm px-3 py-1.5">
              <span className="w-[6px] h-[6px] rounded-full bg-green-500 relative">
                <span className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
              </span>
              <span className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-white/80">
                Active to work
              </span>
            </div>
          </div>

          {/* Identity */}
          <div className="border border-white/8 bg-white/[0.02] rounded-sm p-5 space-y-4">
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">
                Name
              </p>
              <p className="text-white font-semibold text-[0.95rem]">
                Adent Fallah Amorisyah
              </p>
            </div>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">
                Role
              </p>
              <p className="text-white/70 text-[0.9rem]">Full Stack Developer</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">
                Location
              </p>
              <p className="text-white/70 text-[0.9rem]">Indonesia</p>
            </div>
            <div>
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30 mb-1">
                Website
              </p>
              <a
                href="https://dentdev.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/50 text-[0.9rem] hover:text-white transition-colors"
              >
                dentdev.vercel.app ↗
              </a>
            </div>
          </div>

          {/* GitHub link button */}
          <a
            href="https://github.com/denfasyah"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between border border-white/15 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/30 transition-all duration-200 px-5 py-4 rounded-sm"
          >
            <div className="flex items-center gap-3">
              {/* GitHub icon */}
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-white/50 group-hover:fill-white transition-colors"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span className="text-[0.75rem] uppercase tracking-[0.15em] text-white/50 group-hover:text-white transition-colors font-semibold">
                View GitHub Profile
              </span>
            </div>
            <svg
              className="w-3.5 h-3.5 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 11L11 1M11 1H4M11 1V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}