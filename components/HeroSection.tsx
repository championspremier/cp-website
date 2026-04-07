"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  const [scrollIndicatorMobileTransformNone, setScrollIndicatorMobileTransformNone] = useState(false);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isTransitioning = useRef(false);

  const playerAreaRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const programsLabelRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const positionNameRef = useRef<HTMLSpanElement>(null);
  const statNumberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const transitionToPlayer = useCallback(
    (nextIndex: number, direction: "prev" | "next") => {
      if (nextIndex === currentPlayer || isTransitioning.current) return;

      const currentEl = imageRefs.current[currentPlayer];
      const nextEl = imageRefs.current[nextIndex];

      if (currentEl && nextEl) {
        isTransitioning.current = true;

        // Animate position name out (fade + slide up)
        gsap.to(positionNameRef.current, {
          y: -10,
          opacity: 0,
          duration: 0.3,
        });

        gsap.set(nextEl, { rotationY: direction === "next" ? -90 : 90, opacity: 0, zIndex: 3 });

        gsap.to(currentEl, {
          rotationY: direction === "next" ? 90 : -90,
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
            // Update position text and animate in (fade + slide down from above)
            const posEl = positionNameRef.current;
            if (posEl) {
              posEl.textContent = PLAYERS[nextIndex].position.toUpperCase();
              gsap.set(posEl, { y: 10, opacity: 0 });
              gsap.to(posEl, {
                y: 0,
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
              });
            }
          },
        });
      } else {
        setCurrentPlayer(nextIndex);
      }
    },
    [currentPlayer]
  );

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const sync = () => setScrollIndicatorMobileTransformNone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

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

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentPlayer + 1) % PLAYERS.length;
      transitionToPlayer(nextIndex, "next");
    }, 4000);
    return () => clearInterval(interval);
  }, [currentPlayer, transitionToPlayer]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.set(playerAreaRef.current, { opacity: 0, scale: 0.95 });
      gsap.set(headlineRef.current, { opacity: 0 });
      gsap.set(bottomLeftRef.current, { opacity: 0, x: -60 });
      gsap.set(bottomRightRef.current, { opacity: 0, x: 60 });
      gsap.set(programsLabelRef.current, { opacity: 0, y: -20 });
      gsap.set(scrollIndicatorRef.current, { opacity: 0, y: -20 });

      gsap.to(playerAreaRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power2.out",
        delay: 0,
      });
      gsap.to(headlineRef.current, {
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        delay: 0.3,
      });
      gsap.to(bottomLeftRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5,
      });
      gsap.to(bottomRightRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        delay: 0.5,
      });
      gsap.to(programsLabelRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.7,
      });
      gsap.to(scrollIndicatorRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        delay: 0.7,
      });

      // Count-up animations — start after stats div has faded in (~1.4s)
      [statNumberRefs.current[0], statNumberRefs.current[1], statNumberRefs.current[2]].forEach((el, i) => {
        if (el) {
          el.textContent = i === 0 ? "0%" : "0+";
          gsap.set(el, { color: "#3b82f6" });
        }
      });

      const stat0 = { value: 0 };
      gsap.to(stat0, {
        value: 30,
        duration: 1.5,
        ease: "power2.out",
        snap: { value: 1 },
        delay: 1.4,
        onUpdate: () => {
          const el = statNumberRefs.current[0];
          if (el) el.textContent = `20-${Math.round(stat0.value)}%`;
        },
        onComplete: () => {
          const el = statNumberRefs.current[0];
          if (el) {
            el.textContent = "20-30%";
            gsap.to(el, { color: "var(--text)", duration: 0.3 });
          }
        },
      });

      const stat1 = { value: 0 };
      gsap.to(stat1, {
        value: 35,
        duration: 1.2,
        ease: "power2.out",
        snap: { value: 1 },
        delay: 1.4,
        onUpdate: () => {
          const el = statNumberRefs.current[1];
          if (el) el.textContent = `${Math.round(stat1.value)}+`;
        },
        onComplete: () => {
          const el = statNumberRefs.current[1];
          if (el) {
            el.textContent = "35+";
            gsap.to(el, { color: "var(--text)", duration: 0.3 });
          }
        },
      });

      const stat2 = { value: 0 };
      gsap.to(stat2, {
        value: 200,
        duration: 2,
        ease: "power2.out",
        snap: { value: 1 },
        delay: 1.4,
        onUpdate: () => {
          const el = statNumberRefs.current[2];
          if (el) el.textContent = `${Math.round(stat2.value)}+`;
        },
        onComplete: () => {
          const el = statNumberRefs.current[2];
          if (el) {
            el.textContent = "200+";
            gsap.to(el, { color: "var(--text)", duration: 0.3 });
          }
        },
      });

      ScrollTrigger.create({
        trigger: scrollIndicatorRef.current,
        start: "top 90%",
        end: "top 60%",
        scrub: true,
        onUpdate: (self) => {
          if (scrollIndicatorRef.current) {
            scrollIndicatorRef.current.style.opacity = String(1 - self.progress);
          }
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-hidden md:overflow-visible flex flex-col items-center justify-center gap-4 pt-[80px] px-6 pb-6 md:flex-none md:gap-8 md:pt-[80px] md:px-0 md:pb-0"
      style={{ background: "var(--bg)" }}
    >
      {/* Large headline text — BEHIND the player */}
      <div
        ref={headlineRef}
        className="absolute inset-0 hidden md:flex flex-col items-center justify-center pointer-events-none z-[1]"
      >
        <h1
          className="text-center font-black uppercase text-[clamp(3rem,10vw,5rem)] md:text-[clamp(6rem,12vw,14rem)]"
          style={{ lineHeight: 1.1 }}
        >
          <span
            style={{
              color: "var(--text)",
              opacity: 0.08,
            }}
          >
            DICTATE YOUR
          </span>
          <br />
          <span
            className="gradient-text"
            style={{ opacity: 0.15 }}
          >
            <TextEffect
              words={["Development", "Training", "Potential", "Longevity"]}
              effect="flip"
              duration={3000}
              textClassName="gradient-text"
            />
          </span>
        </h1>
      </div>

      {/* "Our programs are for..." label — first in mobile flex flow */}
      <div
        ref={programsLabelRef}
        className="relative text-sm z-[3] w-full text-center md:absolute md:top-[100px] md:left-[6%] md:w-auto md:text-left flex flex-col"
      >
        <span style={{ color: "var(--muted)" }}>Our programs are for...</span>
        <span
          ref={positionNameRef}
          className="gradient-text text-2xl md:text-3xl font-black uppercase mt-1"
        >
          {PLAYERS[currentPlayer].position.toUpperCase()}
        </span>
      </div>

      {/* Player images — CENTER, in front of text */}
      <div
        ref={playerAreaRef}
        className="relative w-[60vw] h-[35vh] flex items-end justify-center z-[2] md:absolute md:inset-0 md:w-auto md:h-auto md:flex md:items-end md:justify-center"
        style={{ perspective: 1000 }}
      >
        <div
          className="relative w-full h-full md:max-h-[75vh] md:h-[75vh]"
          style={{ transformStyle: "preserve-3d" }}
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
                sizes="(max-width: 768px) 60vw, 50vw"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom-left: subtitle + CTA */}
      <div
        ref={bottomLeftRef}
        className="relative z-[3] w-full max-w-[350px] text-center md:absolute md:bottom-[8%] md:left-[6%] md:text-left md:max-w-[350px]"
      >
        <p
          className="text-base md:text-lg mb-4 md:mb-6"
          style={{ color: "var(--muted)" }}
        >
          Trial only training program in the DMV area for footballers entering the 11v11 phase (U12-U18).
        </p>
        <Link
          target="_blank"
          href="https://championspremier.pushpress.com/landing/plans/plan_0j80vu490n01mu/login"
          className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ background: GRADIENT }}
        >
          FREE EVALUATION
        </Link>
      </div>

      {/* Bottom-right: stats row */}
      <div
        ref={bottomRightRef}
        className="relative flex gap-6 md:gap-8 z-[3] justify-center md:absolute md:bottom-[8%] md:right-[6%]"
      >
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={`flex flex-col ${index > 0 ? "pl-6 md:pl-8 border-l border-[var(--border)]" : ""}`}
          >
            <span
              ref={(el) => {
                if (el) statNumberRefs.current[index] = el;
              }}
              className="text-2xl font-bold"
              style={{ color: "#3b82f6" }}
            >
              {index === 0 ? "0%" : "0+"}
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

      {/* Scroll to explore — end of mobile flex flow; absolutely positioned on desktop */}
      <div
        ref={scrollIndicatorRef}
        className="relative z-[3] w-full flex justify-center md:absolute md:bottom-[2%] md:left-1/2 md:-translate-x-1/2 md:w-auto"
        style={scrollIndicatorMobileTransformNone ? { transform: "none" } : undefined}
      >
        <div className="text-center flex flex-col items-center">
          <span className="text-sm" style={{ color: "var(--muted)" }}>
            Scroll to explore
          </span>
          <span
            className="gradient-text text-2xl md:text-3xl font-black mt-1"
            style={{ animation: "bounce 2s ease-in-out infinite" }}
          >
            ↓
          </span>
        </div>
      </div>
    </section>
  );
}
