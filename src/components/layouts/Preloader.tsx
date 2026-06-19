"use client";

import { useEffect, useState, type ReactNode, type TransitionEvent } from "react";
import styles from "./Preloader.module.css";

interface PreloaderProps {
  children: ReactNode;
}

// Tweak these two to change how fast the counter feels.
const TICK_MS = 45;
const MAX_STEP = 7;

export default function Preloader({ children }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Drive the counter up to 100%.
  // (If you'd rather tie this to real asset loading, swap this effect for
  // a window "load" listener and set progress from that instead.)
  useEffect(() => {
    if (progress >= 100) return;

    const timer = setTimeout(() => {
      setProgress((prev) => {
        const step = Math.floor(Math.random() * MAX_STEP) + 2;
        return Math.min(prev + step, 100);
      });
    }, TICK_MS + Math.random() * 60);

    return () => clearTimeout(timer);
  }, [progress]);

  // Once we hit 100%, hold a beat, fade the ghost + label, then let the
  // curtain (overlay) slide up — see onTransitionEnd below for the handoff.
  useEffect(() => {
    if (progress < 100) return;
    const fadeLabel = setTimeout(() => setIsExiting(true), 420);
    return () => clearTimeout(fadeLabel);
  }, [progress]);

  // Pin to the top and stop the browser from restoring an old scroll
  // position behind the overlay (this was the cause of the small jump-down
  // once the curtain lifted).
  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  // Lock scroll on both <html> and <body> while the preloader is showing.
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;

    if (isDone) {
      html.style.overflow = "";
      body.style.overflow = "";
    } else {
      html.style.overflow = "hidden";
      body.style.overflow = "hidden";
    }

    return () => {
      html.style.overflow = "";
      body.style.overflow = "";
    };
  }, [isDone]);

  const handleOverlayTransitionEnd = (e: TransitionEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && e.propertyName === "transform" && isExiting) {
      window.scrollTo(0, 0);
      setIsDone(true);
    }
  };

  return (
    <>
      {!isDone && (
        <div
          className={`${styles.overlay} ${isExiting ? styles.overlayExit : ""}`}
          onTransitionEnd={handleOverlayTransitionEnd}
          role="status"
          aria-live="polite"
          aria-label={`Loading ${progress}%`}
        >
          <div className={`${styles.stage} ${isExiting ? styles.stageExit : ""}`}>
            <div className={styles.ghostStage}>
              <div className={styles.ghost}>
                <div className={styles.red}>
                  <div className={styles.pupil} />
                  <div className={styles.pupil1} />
                  <div className={styles.eye} />
                  <div className={styles.eye1} />
                  <div className={styles.top0} />
                  <div className={styles.top1} />
                  <div className={styles.top2} />
                  <div className={styles.top3} />
                  <div className={styles.top4} />
                  <div className={styles.st0} />
                  <div className={styles.st1} />
                  <div className={styles.st2} />
                  <div className={styles.st3} />
                  <div className={styles.st4} />
                  <div className={styles.st5} />
                  <div className={styles.an1} />
                  <div className={styles.an2} />
                  <div className={styles.an3} />
                  <div className={styles.an4} />
                  <div className={styles.an5} />
                  <div className={styles.an6} />
                  <div className={styles.an7} />
                  <div className={styles.an8} />
                  <div className={styles.an9} />
                  <div className={styles.an10} />
                  <div className={styles.an11} />
                  <div className={styles.an12} />
                  <div className={styles.an13} />
                  <div className={styles.an14} />
                  <div className={styles.an15} />
                  <div className={styles.an16} />
                  <div className={styles.an17} />
                  <div className={styles.an18} />
                </div>
                <div className={styles.shadow} />
              </div>
            </div>

            <div className={styles.label}>
              <span className={styles.eyebrow}>Loading</span>
              <span className={styles.percent}>{progress}%</span>
              <div className={styles.bar}>
                <div className={styles.barFill} style={{ width: `${progress}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}

      <div
        className={`${styles.content} ${isDone ? styles.contentVisible : ""} flex flex-col flex-1 min-h-full`}
      >
        {children}
      </div>
    </>
  );
}