"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import TechMarquee from "./TechMarquee";

export default function About() {
  return (
    <section id="about" className="bg-black min-h-screen pt-28 pb-10 overflow-hidden">
      <div className="px-6 md:px-20">
        {/* ── Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <h1 className="font-black text-6xl md:text-7xl uppercase tracking-[-0.03em] leading-none select-none">
            <span className="text-white/30">ABOUT</span>
            <span className="text-white"> ME</span>
          </h1>
          <p className="mt-6 text-[0.9rem]  text-white/50 tracking-widest uppercase max-w-xl mx-auto leading-relaxed">
            Crafting Digital Excellence
            
          </p>
        </motion.div>

        {/* ── Main Grid ── */}
        <div className="max-w-5xl mx-auto flex flex-col-reverse md:grid md:grid-cols-[1fr_340px] gap-12 md:gap-16 items-stretch">
          {/* ── LEFT: Description ── */}
          <div className="flex flex-col gap-10">
            {/* Bio */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            >
              <span className="block text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/30 mb-4">
                Bio
              </span>
              <p className="text-white/70 text-[1.05rem] leading-[1.85] mb-4">
                I&apos;m a Full Stack Developer, passionate about
                crafting digital experiences that marry performance with aesthetic
                precision. Currently a Software Engineering student at xxxxxx University — 22 years old and fully committed to the
                craft.
              </p>
              <p className="text-white/50 text-[0.95rem] leading-[1.8]">
                My approach centers on clean architecture, thoughtful API design,
                and high-impact visual engineering. I follow the latest trends in
                tech and believe that the best products are built at the
                intersection of form and function.
              </p>
            </motion.div>

            {/* Expertise & Philosophy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
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
                  label: "Frequently Used Technologies",
                  value:
                    "Next.js · React · Node.js · Express js · MongoDB · MySQL · Tailwind CSS",
                },
                {
                  label: "Currently",
                  value:
                    "Building open-source tools & freelance projects. Always open to new collaborations.",
                },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="border border-white/8 bg-white/[0.02] p-5 rounded-sm hover:border-white/20 transition-colors"
                >
                  <h3 className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
                    {label}
                  </h3>
                  <p className="text-white/60 text-[0.85rem] leading-relaxed">
                    {value}
                  </p>
                </div>
              ))}
            </motion.div>

         
          </div>

          {/* ── RIGHT: Profile Card ── */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            {/* Avatar */}
            <div className="relative">
              <div
                className="w-full aspect-square rounded-sm overflow-hidden border border-white/10 relative group"
                style={{ maxWidth: 340 }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500 z-10 pointer-events-none" />
                <Image
                  src="https://avatars.githubusercontent.com/u/124890555?v=4"
                  alt="Adent Fallah Amorisyah"
                  width={340}
                  height={340}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  priority
                  unoptimized
                />
              </div>
              {/* Available badge */}
              <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-black/70 backdrop-blur-sm border border-white/10 rounded-sm px-3 py-1.5 z-20">
                <span className="w-[6px] h-[6px] rounded-full bg-green-500 relative">
                  <span className="absolute inset-0 rounded-full bg-green-500 animate-ping" />
                </span>
                <span className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-white/80">
                  Active to work
                </span>
              </div>
            </div>

            {/* Github Contributions */}
            <div className="border border-white/8 bg-white/[0.02] rounded-sm p-5 flex flex-col gap-3 flex-1">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30">
                295 contributions in the last year
              </p>
              <div className="w-full overflow-hidden rounded-sm flex-1 flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="https://ghchart.rshah.org/22c55e/denfasyah"
                  alt="denfasyah GitHub contribution chart"
                  className="w-full h-auto opacity-90 hover:opacity-100 transition-opacity"
                  style={{ filter: "brightness(1.1) saturate(1.2)" }}
                />
              </div>
              <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/5">
                <a
                  href="https://github.com/denfasyah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.65rem] font-mono text-white/40 hover:text-white transition-colors uppercase tracking-widest"
                >
                  github.com/denfasyah ↗
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tech Stack Marquee */}
      <TechMarquee />
    </section>
  );
}