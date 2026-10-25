"use client";
import { useEffect, useRef, useState } from "react";
import { editorial, type Locale } from "@/lib/editorial-content";
import { useMotionPreferences } from "./motion-preferences";
const SOURCES: Record<Locale, string> = {
  en: "/videos/showreel-eng",
  ja: "/videos/showreel-jap",
};
export function Showreel({ locale }: { locale: Locale }) {
  const c = editorial[locale].showreel;
  const base = SOURCES[locale];
  const video = useRef<HTMLVideoElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreferences();
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [ended, setEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  // Autoplay (muted) only while the reel is on screen; pause when it leaves.
  useEffect(() => {
    const el = video.current;
    const box = frame.current;
    if (!el || !box || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          if (!el.dataset.userPaused && !el.ended) el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: [0, 0.5] },
    );
    io.observe(box);
    return () => io.disconnect();
  }, [reduced, base]);
  function toggle() {
    const el = video.current;
    if (!el) return;
    if (el.ended) {
      el.currentTime = 0;
      delete el.dataset.userPaused;
      el.play().catch(() => {});
    } else if (el.paused) {
      delete el.dataset.userPaused;
      el.play().catch(() => {});
    } else {
      el.dataset.userPaused = "1";
      el.pause();
    }
  }
  return (
    <section className="section showreel-section" aria-label={c.title}>
      <div className="showreel-head">
        <p className="eyebrow">{c.eyebrow}</p>
        <h2>{c.title}</h2>
      </div>
      <div ref={frame} className="showreel-frame" data-playing={playing}>
        {/* key remounts the element so a language switch loads the matching reel */}
        <video
          key={base}
          ref={video}
          className="showreel-video"
          poster={`${base}.jpg`}
          muted={muted}
          playsInline
          preload="metadata"
          onPlay={() => {
            setPlaying(true);
            setEnded(false);
          }}
          onPause={() => setPlaying(false)}
          onEnded={() => {
            setPlaying(false);
            setEnded(true);
            if (video.current) video.current.muted = true;
            setMuted(true);
          }}
          onTimeUpdate={(e) =>
            setProgress(e.currentTarget.currentTime / (e.currentTarget.duration || 1))
          }
        >
          <source src={`${base}.mp4`} type="video/mp4" />
        </video>
        <button
          type="button"
          className="showreel-center"
          onClick={toggle}
          aria-label={ended ? c.replay : playing ? c.pause : c.play}
        >
          <span className="showreel-center-icon" aria-hidden="true">
            {playing ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 5h4v14H6zm8 0h4v14h-4z" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            )}
          </span>
        </button>
        <div className="showreel-bar">
          <button
            type="button"
            className="showreel-sound technical"
            aria-pressed={!muted}
            onClick={() => {
              const el = video.current;
              if (!el) return;
              el.muted = !el.muted;
              setMuted(el.muted);
              if (!el.muted && el.paused) el.play().catch(() => {});
            }}
          >
            {muted ? c.soundOn : c.soundOff}
          </button>
          <span className="showreel-progress" aria-hidden="true">
            <span style={{ transform: `scaleX(${progress})` }} />
          </span>
        </div>
      </div>
    </section>
  );
}
