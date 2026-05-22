"use client";

import { useEffect, useState } from "react";

export default function ModernBackground() {
  const [mounted, setMounted] = useState(false);

  // Menghindari hydration mismatch akibat perbedaan state server vs browser
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-50 bg-slate-50 dark:bg-[#030712] transition-colors duration-500 overflow-hidden">
      
      {/* LAYER 1: AMBIENT GLOW (Berada di paling belakang agar pendarannya terbiaskan oleh kaca) */}
      <div className="absolute inset-0 pointer-events-none opacity-60 dark:opacity-100 transition-opacity duration-500">
        <div className="absolute top-[-10%] left-[-10%] h-[600px] w-[600px] rounded-full bg-brand-blue/25 blur-[140px] animate-pulse duration-[8s]" />
        <div className="absolute bottom-[-10%] right-[-10%] h-[500px] w-[500px] rounded-full bg-purple-600/20 blur-[130px] animate-pulse duration-[12s]" />
        <div className="absolute top-[30%] right-[20%] h-[350px] w-[350px] rounded-full bg-emerald-500/15 blur-[110px] animate-ping duration-[20s]" />
      </div>

      {/* LAYER 2: TECHNICAL PATTERN (Grid & Dot Matrix rapat 24px) */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,23,42,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(15,23,42,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.025)_1px,transparent_1px)]"
        style={{
          backgroundSize: "24px 24px",
          maskImage: "radial-gradient(circle 80% at 50% 40%, #000 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 80% at 50% 40%, #000 50%, transparent 100%)"
        }}
      />
      <div 
        className="absolute inset-0 bg-[radial-gradient(rgba(15,23,42,0.05)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)]"
        style={{
          backgroundSize: "24px 24px",
          backgroundPosition: "12px 12px",
          maskImage: "radial-gradient(circle 80% at 50% 40%, #000 50%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 80% at 50% 40%, #000 50%, transparent 100%)"
        }}
      />

      {/* 
        LAYER 3: TOTAL FROSTED GLASS OVERLAY (Efek Utama)
        Layer inilah yang membuat seluruh background di bawahnya otomatis ngeblur kayak kaca es / navbar.
        - backdrop-blur-[12px]: Mengontrol kekuatan blur kacanya.
        - bg-white/[0.2] & dark:bg-[#030712]/[0.45]: Lapisan kaca transparan tipis penahan kontras.
      */}
      <div className="absolute inset-0 backdrop-blur-[12px] bg-white/[0.2] dark:bg-[#030712]/[0.45] pointer-events-none" />
      
    </div>
  );
}