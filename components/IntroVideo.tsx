"use client";

import { useRef, useEffect, useCallback } from "react";
import gsap from "gsap";

const VIDEO_LANDSCAPE = encodeURI("/video/Champions Premier Logo animation (landscape).mp4");
const VIDEO_PORTRAIT = encodeURI("/video/Champions Premier Logo animation (portrait).mp4");

interface IntroVideoProps {
  onComplete: () => void;
}

export default function IntroVideo({ onComplete }: IntroVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasCompletedRef = useRef(false);

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
      duration: 0.8,
      ease: "power2.inOut",
      onComplete,
    });
  }, [onComplete]);

  useEffect(() => {
    const video = containerRef.current?.querySelector("video");
    if (!video) return;

    const handleEnded = () => handleFinish();
    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [handleFinish]);

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
      <video
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        autoPlay
        muted
        playsInline
      >
        <source src={VIDEO_PORTRAIT} type="video/mp4" media="(max-width: 767px)" />
        <source src={VIDEO_LANDSCAPE} type="video/mp4" media="(min-width: 768px)" />
      </video>
    </div>
  );
}
