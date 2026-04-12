"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";

const VIDEO_LANDSCAPE = encodeURI("/video/Champions Premier Logo animation (landscape).mp4");
const VIDEO_PORTRAIT = encodeURI("/video/Champions Premier Logo animation (portrait).mp4");

// Safety: if video hasn't completed in this many ms, skip the intro anyway
const SAFETY_TIMEOUT_MS = 5000;
// Show "Skip" button after this many ms
const SHOW_SKIP_AFTER_MS = 1200;

interface IntroVideoProps {
  onComplete: () => void;
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasCompletedRef = useRef(false);
  const [videoSrc, setVideoSrc] = useState<string | null>(null);
  const [showSkip, setShowSkip] = useState(false);

  const handleFinish = useCallback(() => {
    if (hasCompletedRef.current) return;
    hasCompletedRef.current = true;
    const container = containerRef.current;
    if (!container) {
      onComplete();
      return;
    }
    gsap.to(container, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.inOut",
      onComplete,
    });
  }, [onComplete]);

  // Pick the correct source once on mount (avoids iOS <source media> inconsistencies)
  useEffect(() => {
    const isPortrait =
      typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches;
    setVideoSrc(isPortrait ? VIDEO_PORTRAIT : VIDEO_LANDSCAPE);
  }, []);

  // Safety timeout — if video never ends for any reason, skip the intro
  useEffect(() => {
    const safetyTimer = setTimeout(() => {
      if (!hasCompletedRef.current) {
        handleFinish();
      }
    }, SAFETY_TIMEOUT_MS);

    const skipTimer = setTimeout(() => {
      setShowSkip(true);
    }, SHOW_SKIP_AFTER_MS);

    return () => {
      clearTimeout(safetyTimer);
      clearTimeout(skipTimer);
    };
  }, [handleFinish]);

  // Wire up video events once src is set and element exists
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    const handleEnded = () => handleFinish();
    const handleError = () => handleFinish();

    video.addEventListener("ended", handleEnded);
    video.addEventListener("error", handleError);

    // Try to play — if blocked by autoplay policy, skip the intro immediately
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay was blocked (common on iOS in-app browsers)
        handleFinish();
      });
    }

    return () => {
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("error", handleError);
    };
  }, [videoSrc, handleFinish]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black cursor-pointer"
      onClick={handleFinish}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleFinish()}
      aria-label="Skip intro"
    >
      {videoSrc && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          src={videoSrc}
          muted
          playsInline
          autoPlay
          preload="auto"
        />
      )}

      {showSkip && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            handleFinish();
          }}
          className="absolute bottom-10 right-6 z-10 px-4 py-2 text-sm font-semibold text-white/80 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:bg-white/20 hover:text-white transition-colors"
          style={{ fontFamily: "var(--font-inter), sans-serif" }}
          aria-label="Skip intro video"
        >
          Skip →
        </button>
      )}
    </div>
  );
}
