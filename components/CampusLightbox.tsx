"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

// Background loop exported from Premiere ("Website Video" sequence).
// If the file is missing or fails to load, the lightbox falls back to a navy panel.
const CAMPUS_VIDEO = "/video/champions-campus-loop.mp4";
const CAMPUS_LOGO = encodeURI("/logos/Champions Campus White logo.png");
// TODO: confirm the live Champions Campus web address before deploying.
const CAMPUS_URL = "https://www.champions-campus.com";

// Delay after the intro finishes, so the lightbox doesn't collide with the page fade-in.
const OPEN_DELAY_MS = 600;

export default function CampusLightbox() {
  const [open, setOpen] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  // Escape to close, lock page scroll, and move focus into the dialog while open.
  useEffect(() => {
    if (!open) return;
    lastFocusedRef.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      lastFocusedRef.current?.focus?.();
    };
  }, [open, close]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="campus-lightbox"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          onClick={close}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="campus-lightbox-title"
            className="relative w-full max-w-md aspect-[4/5] sm:max-w-4xl sm:aspect-video max-h-[85vh] overflow-hidden rounded-2xl bg-[#0F172A] shadow-2xl ring-1 ring-white/10"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {!videoFailed && (
              <video
                className="absolute inset-0 h-full w-full object-cover"
                src={CAMPUS_VIDEO}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
                onError={() => setVideoFailed(true)}
              />
            )}

            {/* Darken the footage so the white logo stays readable. */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/35" />

            <button
              ref={closeButtonRef}
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white/90 ring-1 ring-white/20 backdrop-blur-sm transition-colors hover:bg-black/60 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className="relative z-[1] flex h-full flex-col items-center justify-center px-6 text-center"
              style={{ fontFamily: "var(--font-inter), sans-serif" }}
            >
              <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-xs">
                Introducing
              </p>
              <h2 id="campus-lightbox-title" className="sr-only">
                Champions Campus
              </h2>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CAMPUS_LOGO}
                alt="Champions Campus"
                className="h-auto w-[55%] max-w-[300px] drop-shadow-[0_4px_24px_rgba(0,0,0,0.5)] sm:w-[40%]"
              />
              <p className="mt-4 text-sm font-medium text-white/80 sm:text-base">
                Spring 2027 &middot; Tysons, VA
              </p>
              <a
                href={CAMPUS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center rounded-full bg-[#3B82F6] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-[#2563EB] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                Explore Champions Campus
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
