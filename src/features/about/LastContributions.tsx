"use client";

import { motion } from "framer-motion";

const MOCK_CONTRIBUTIONS = [
  { repo: "denfasyah/dennime", commit: "feat: add real-time search", date: "2 days ago" },
  { repo: "denfasyah/denpiw", commit: "fix: resolve ejs templating bug", date: "5 days ago" },
  { repo: "denfasyah/dentdev", commit: "chore: update portfolio sections", date: "1 week ago" },
  { repo: "open-source/ui-lib", commit: "docs: improve accessibility guidelines", date: "2 weeks ago" },
];

export default function LastContributions() {
  return (
    <div className="flex flex-col gap-4 border border-white/8 bg-white/[0.02] p-6 rounded-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/30">
          Last Contributions
        </span>
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      </div>

      <div className="space-y-4">
        {MOCK_CONTRIBUTIONS.map((contrib, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
            className="group flex flex-col gap-1 border-l-2 border-white/10 pl-4 hover:border-white/40 transition-colors"
          >
            <div className="flex justify-between items-baseline">
              <span className="text-[0.75rem] font-medium text-white/80 group-hover:text-white transition-colors tracking-wide">
                {contrib.repo}
              </span>
              <span className="text-[0.6rem] text-white/30 uppercase tracking-widest">
                {contrib.date}
              </span>
            </div>
            <p className="text-[0.7rem] text-white/50 tracking-wide font-mono">
              {contrib.commit}
            </p>
          </motion.div>
        ))}
      </div>

      <a
        href="https://github.com/denfasyah"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-[0.7rem] text-white/30 hover:text-white/60 transition-colors uppercase tracking-widest"
      >
        View GitHub Profile ↗
      </a>
    </div>
  );
}
