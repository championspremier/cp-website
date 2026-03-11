"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { TextEffect } from "@/components/ui/text-effect";

const PLAYERS = [
  { src: "/players/1.png", position: "Midfielders" },
  { src: "/players/2.png", position: "Goalkeepers" },
  { src: "/players/3.png", position: "Forwards" },
  { src: "/players/4.png", position: "Defenders" },
];

const GRADIENT =
  "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)";

const STATS = [
  { number: "20-30%", label: "Game IQ Improvement" },
  { number: "35+", label: "Players Studied" },
  { number: "200+", label: "Players Trained" },
];

export default function HeroSection() {
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftContentRef = useRef<HTMLDivElement>(null);
  const isTransitioning = useRef(false);

  // Set initial state for all images
  useEffect(() => {
    PLAYERS.forEach((_, index) => {
      const el = imageRefs.current[index];
      if (el) {
        gsap.set(el, {
          rotationY: 0,
          opacity: index === 0 ? 1 : 0,
          zIndex: index === 0 ? 2 : 1,
        });
      }
    });
  }, []);

  const goToPlayer = useCallback(
    (index: number, direction: "prev" | "next") => {
      const nextIndex = ((index % 4) + 4) % 4;
      if (nextIndex === currentPlayer || isTransitioning.current) return;

      const currentEl = imageRefs.current[currentPlayer];
      const nextEl = imageRefs.current[nextIndex];
      const leftEl = leftContentRef.current;

      if (currentEl && nextEl) {
        isTransitioning.current = true;

        // Slide in left content: from left when going right, from right when going left
        const fromX = direction === "next" ? -100 : 100;
        if (leftEl) {
          gsap.set(leftEl, { x: fromX, opacity: 0 });
          gsap.to(leftEl, {
            x: 0,
            opacity: 1,
            duration: 0.4,
            ease: "power2.out",
          });
        }

        gsap.set(nextEl, { rotationY: -90, opacity: 0, zIndex: 3 });

        // Animate current out
        gsap.to(currentEl, {
          rotationY: 90,
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            setCurrentPlayer(nextIndex);
            gsap.set(currentEl, { rotationY: 0, opacity: 0, zIndex: 1 });
            gsap.to(nextEl, {
              rotationY: 0,
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
              zIndex: 2,
              onComplete: () => {
                isTransitioning.current = false;
              },
            });
          },
        });
      } else {
        setCurrentPlayer(nextIndex);
      }
    },
    [currentPlayer]
  );

  const handlePrev = () => {
    goToPlayer(currentPlayer - 1, "prev");
  };

  const handleNext = () => {
    goToPlayer(currentPlayer + 1, "next");
  };

  const handleDotClick = (index: number) => {
    const direction = index > currentPlayer ? "next" : "prev";
    goToPlayer(index, direction);
  };

  return (
    <section
      className="min-h-screen overflow-hidden pt-[80px] px-6 md:px-12 lg:px-16 pb-8"
      style={{
        background: "var(--bg)",
        opacity: 1,
      }}
    >
      <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row">
        {/* Left side - text content */}
        <div
          ref={leftContentRef}
          className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 md:py-0"
        >
        <div className="max-w-xl">
          {/* Headline */}
          <h1 className="font-black text-6xl md:text-7xl leading-tight mb-6">
            <span style={{ color: "var(--text)" }}>DICTATE YOUR</span>
            <br />
            <span className="gradient-text">
              <TextEffect
                words={["Development", "Training", "Potential", "Longevity"]}
                effect="flip"
                duration={3000}
                textClassName="gradient-text"
              />
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-lg mb-8 max-w-md"
            style={{ color: "var(--muted)" }}
          >
            For top players in the DMV area entering the 11v11 phase (U13-U19) of their footballing journey.
          </p>

          {/* CTA button */}
          <Link
            href="#"
            className="inline-block px-8 py-4 rounded-lg font-semibold text-white mb-12 transition-opacity hover:opacity-90"
            style={{ background: GRADIENT }}
          >
            FREE EVALUATION
          </Link>

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 md:gap-8 justify-center">
            {STATS.map((stat, index) => (
              <div
                key={stat.label}
                className={`flex flex-col ${index > 0 ? "pl-6 md:pl-8 border-l border-[var(--border)]" : ""}`}
              >
                <span
                  className="text-2xl font-bold"  
                  style={{ color: "var(--text)" }}
                >
                  {stat.number}
                </span>
                <span
                  className="text-sm"
                  style={{ color: "var(--muted)" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
        </div>

        {/* Right side - player carousel */}
        <div className="flex-1 relative min-h-[400px] md:min-h-0 md:h-[calc(100vh-80px)]">
        <div className="absolute inset-0 flex items-end justify-center">
          {/* Player images container */}
          <div
            className="relative w-full h-full max-h-[500px] md:max-h-none"
            style={{ perspective: 1000 }}
          >
            {PLAYERS.map((player, index) => (
              <div
                key={player.src}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                className="absolute inset-0"
                style={{
                  transformStyle: "preserve-3d",
                  backfaceVisibility: "hidden",
                }}
              >
                <Image
                  src={player.src}
                  alt={player.position}
                  fill
                  className="object-contain object-bottom"
                  style={{
                    filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.15))",
                  }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Carousel labels - top left and top right */}
        <span
          className="absolute top-4 left-4 text-sm z-10"
          style={{ color: "var(--muted)" }}
        >
          Our programs are for...
        </span>
        <span
          className="absolute top-4 right-4 text-sm font-medium z-10"
          style={{ color: "var(--text)" }}
        >
          {PLAYERS[currentPlayer].position}
        </span>

        {/* Arrow buttons */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-light transition-opacity hover:opacity-90 z-10"
          style={{ background: GRADIENT }}
          aria-label="Previous player"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center text-white text-2xl font-light transition-opacity hover:opacity-90 z-10"
          style={{ background: GRADIENT }}
          aria-label="Next player"
        >
          ›
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {PLAYERS.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleDotClick(index)}
              className="w-2.5 h-2.5 rounded-full transition-all"
              style={{
                background:
                  index === currentPlayer ? GRADIENT : "var(--border)",
              }}
              aria-label={`Go to ${PLAYERS[index].position}`}
            />
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
