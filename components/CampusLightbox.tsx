"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { Teko } from "next/font/google";
import gsap from "gsap";
import { markCampusLightboxSeen } from "@/lib/campusLightbox";

const teko = Teko({ subsets: ["latin"], weight: ["500", "600"], display: "swap" });

const CAMPUS_URL = "https://champions-campus.com";
const CAMPUS_LOGO = "/images/campus/champions-campus-logo.png";
const CAMPUS_VIDEO = "/video/campus/campus-lightbox.mp4";
const CAMPUS_POSTER = "/images/campus/campus-lightbox-poster.jpg";
const BRAND_GRADIENT = "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)";

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, select, textarea';
// Keys that scroll the page when focus isn't in a text field
const SCROLL_KEYS = new Set(["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "]);

interface CampusLightboxProps {
  onClosed: () => void;
}

export default function CampusLightbox({ onClosed }: CampusLightboxProps) {
  const [mounted, setMounted] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLAnchorElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const closingRef = useRef(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    setMounted(true);
  }, []);

  // The video only exists while the lightbox is open; nudge play() in case
  // autoPlay was ignored — the poster stays visible if playback is refused
  useEffect(() => {
    if (!mounted || reduceMotion) return;
    videoRef.current?.play().catch(() => {});
  }, [mounted, reduceMotion]);

  // Entrance animation, scoped so revert() only touches the lightbox
  useEffect(() => {
    if (!mounted || !rootRef.current) return;
    markCampusLightboxSeen();
    returnFocusRef.current = document.activeElement as HTMLElement | null;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      tlRef.current = gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(backdropRef.current, { opacity: 0 }, { opacity: 1, duration: reduceMotion ? 0 : 0.35 })
        .fromTo(
          cardRef.current,
          { opacity: 0, scale: 0.95, y: 24 },
          { opacity: 1, scale: 1, y: 0, duration: reduceMotion ? 0 : 0.5 },
          reduceMotion ? 0 : "-=0.15"
        );
    }, rootRef);

    primaryRef.current?.focus({ preventScroll: true });

    return () => ctx.revert();
  }, [mounted]);

  const close = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    videoRef.current?.pause();
    const finish = () => {
      const target = returnFocusRef.current;
      if (target && target !== document.body && document.contains(target)) {
        target.focus({ preventScroll: true });
      } else {
        // Nothing was focused before opening — hand focus back to the page
        document.body.setAttribute("tabindex", "-1");
        document.body.focus({ preventScroll: true });
        document.body.removeAttribute("tabindex");
      }
      onClosed();
    };
    const tl = tlRef.current;
    if (!tl) return finish();
    tl.eventCallback("onReverseComplete", finish);
    tl.timeScale(1.4).reverse();
  }, [onClosed]);

  // Escape to close, Tab stays inside, and page scrolling is blocked without
  // touching overflow/layout so pinned ScrollTrigger sections never recalculate
  useEffect(() => {
    if (!mounted) return;
    const card = cardRef.current;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "Tab" && card) {
        const items = Array.from(card.querySelectorAll<HTMLElement>(FOCUSABLE));
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        const active = document.activeElement;
        if (!card.contains(active)) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
        return;
      }
      if (SCROLL_KEYS.has(e.key)) {
        // Let Space/Enter activate buttons and links
        const target = e.target as HTMLElement | null;
        if (e.key === " " && target?.closest("button, a")) return;
        e.preventDefault();
      }
    };

    const blockScroll = (e: Event) => {
      // Allow scrolling inside the card (it scrolls on very short screens)
      if (card && card.contains(e.target as Node) && card.scrollHeight > card.clientHeight) return;
      e.preventDefault();
    };

    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("wheel", blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("wheel", blockScroll);
      window.removeEventListener("touchmove", blockScroll);
    };
  }, [mounted, close]);

  if (!mounted) return null;

  return createPortal(
    <div ref={rootRef} className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/55 backdrop-blur-sm"
        style={{ opacity: 0 }}
        onClick={close}
        aria-hidden="true"
      />

      <div
        ref={cardRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="campus-lightbox-title"
        className="relative w-full max-w-[880px] overflow-y-auto overscroll-contain rounded-3xl shadow-2xl md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
        style={{
          opacity: 0,
          maxHeight: "calc(100dvh - 32px)",
          background: "var(--bg)",
        }}
      >
        {/* Brand panel: short band on mobile, side column on desktop */}
        <div
          className="relative flex items-center justify-center h-[200px] md:h-auto md:min-h-[440px] overflow-hidden"
          style={{ background: BRAND_GRADIENT }}
        >
          {/* Layers: video/poster → overlay → logo */}
          {reduceMotion ? (
            <Image
              src={CAMPUS_POSTER}
              alt=""
              fill
              sizes="(min-width: 768px) 370px, 100vw"
              className="object-cover"
              aria-hidden="true"
            />
          ) : (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              src={CAMPUS_VIDEO}
              poster={CAMPUS_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden="true"
            />
          )}
          <div
            className="absolute inset-0"
            style={{ background: BRAND_GRADIENT, opacity: 0.55 }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-black/25" aria-hidden="true" />
          <Image
            src={CAMPUS_LOGO}
            alt="Champions Campus"
            width={13380}
            height={4296}
            sizes="200px"
            className="relative w-[160px] md:w-[200px] h-auto"
          />
        </div>

        <div className="px-6 py-7 sm:px-10 sm:py-10 md:py-12">
          <p
            className={`${teko.className} whitespace-nowrap text-[15px] sm:text-base tracking-[0.12em] sm:tracking-[0.2em] leading-none`}
            style={{
              fontFamily: teko.style.fontFamily,
              background: BRAND_GRADIENT,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
              display: "inline-block",
            }}
          >
            NOW ACCEPTING APPLICATIONS
          </p>

          <h2
            id="campus-lightbox-title"
            className="mt-3 text-[44px] sm:text-[56px] md:text-[64px] leading-[0.9] font-semibold"
            style={{ fontFamily: teko.style.fontFamily, color: "var(--text)" }}
          >
            CHAMPIONS CAMPUS
          </h2>

          <p className="mt-4 text-base sm:text-lg font-semibold leading-snug" style={{ color: "var(--text)" }}>
            A full-time school and football academy for the DMV&apos;s top high school players.
          </p>

          <p className="mt-3 text-sm sm:text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>
            Train, lift and go to school, all in one place in McLean, VA. NCAA-accredited flexible
            schedule. Starting January 4, 2027, for ECNL and MLS NEXT players.
          </p>

          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <a
              ref={primaryRef}
              href={CAMPUS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold text-white text-sm transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6]"
              style={{ background: BRAND_GRADIENT }}
            >
              Explore Campus →
            </a>
            <button
              type="button"
              onClick={close}
              className="text-sm font-medium underline-offset-4 hover:underline transition-colors py-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6] rounded"
              style={{ color: "var(--muted)" }}
            >
              Continue to site
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 flex items-center justify-center w-9 h-9 rounded-full bg-white/85 hover:bg-white shadow-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#3b82f6]"
          style={{ color: "var(--text)" }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </div>,
    document.body
  );
}
