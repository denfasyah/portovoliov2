"use client";

import { useState } from "react";

export default function GetInTouch() {
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulasi pengiriman form
    setTimeout(() => setStatus("success"), 1500);
  };

  return (
    <section className="bg-black min-h-screen px-6 py-28 md:px-20 text-white flex flex-col items-center justify-center">
      <div className="max-w-5xl w-full">
        {/* Heading */}
        <h1 className="font-black text-6xl md:text-8xl uppercase tracking-[-0.03em] leading-none mb-12">
          LET'S 
          <span className="text-white/30"> TALK</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Info Side */}
          <div className="space-y-8">
            <p className="text-white/60 text-lg leading-relaxed">
              Have a project in mind or just want to say hi? I'm currently open to new collaborations and exciting opportunities. Feel free to reach out.
            </p>
            <div className="space-y-4">
              <div className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30">Email Me At</div>
              <a href="mailto:your.email@example.com" className="text-2xl md:text-3xl font-bold hover:text-white/50 transition-colors">
                hello@adent.dev
              </a>
            </div>
          </div>

          {/* Form Side */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30">Name</label>
              <input 
                required
                className="w-full bg-[#0a0a0a] border border-white/10 p-4 outline-none focus:border-white/50 transition-all text-sm placeholder:text-white/10"
                placeholder="Enter your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30">Email</label>
              <input 
                required
                type="email"
                className="w-full bg-[#0a0a0a] border border-white/10 p-4 outline-none focus:border-white/50 transition-all text-sm placeholder:text-white/10"
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/30">Message</label>
              <textarea 
                required
                rows={4}
                className="w-full bg-[#0a0a0a] border border-white/10 p-4 outline-none focus:border-white/50 transition-all text-sm placeholder:text-white/10 resize-none"
                placeholder="How can I help you?"
              />
            </div>

            <button 
              type="submit"
              disabled={status !== "idle"}
              className="w-full bg-white text-black py-4 font-black uppercase tracking-[0.2em] text-xs hover:bg-white/90 transition-all active:scale-[0.98] disabled:opacity-50"
            >
              {status === "idle" ? "Send Message" : status === "sending" ? "Sending..." : "Message Sent!"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}