"use client";
import { useRef, useState } from "react";
import { editorial, type Locale } from "@/lib/editorial-content";
const VIDEO_ID = "YpYtGt7R3xE";
const EMBED_SRC = `https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`;
export function IntroVideo({ locale }: { locale: Locale }) {
  const c = editorial[locale].introVideo;
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="intro-video-trigger"
        onClick={() => {
          setOpen(true);
          dialog.current?.showModal();
        }}
      >
        <span className="intro-video-play" aria-hidden="true">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5.5v13l11-6.5z" />
          </svg>
        </span>
        <span className="intro-video-text">
          {c.label}
          <span className="technical intro-video-duration">{c.duration}</span>
        </span>
      </button>
      <dialog
        ref={dialog}
        className="intro-video-dialog"
        aria-label={c.title}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <button
          type="button"
          className="intro-video-close"
          aria-label={c.close}
          onClick={() => dialog.current?.close()}
        >
          ×
        </button>
        <div className="intro-video-frame">
          {open && (
            <iframe
              src={EMBED_SRC}
              title={c.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          )}
        </div>
      </dialog>
    </>
  );
}
