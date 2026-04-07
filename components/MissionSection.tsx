"use client";

import { useRef, useEffect, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const items = [
  {
    n: "01",
    title: "Technically",
    desc: "At Champions Premier, we build players through 1v1s, small-sided games, and a curriculum built around real match scenarios — all in an environment where players are free to express themselves.",
    video: "/video/technically.mp4",
  },
  {
    n: "02",
    title: "Tactically",
    desc: "From NCAA programs to professional clubs and Champions League youth academies, our coaches bring the tactical expertise needed to develop well-rounded, intelligent players at every stage of their journey.",
    video: "/video/tactically.mp4",
  },
  {
    n: "03",
    title: "Physically",
    desc: "With one of the best S&C coaches in the DMV area, Greg is able to bring in his expertise.",
    video: "/video/physically.mp4",
  },
  {
    n: "04",
    title: "Mentally",
    desc: "Our hybrid approach merges high-level group sessions with personalized 1-on-1 Zoom calls, ensuring every player gets a development plan built around them.",
    video: "/video/mentally.mp4",
  },
];

function Player() {
  const { scene } = useGLTF("/player-3d.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.scale.setScalar(1.3);
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <primitive ref={ref} object={scene} position={[0, 0, 0]} scale={1.3} />
  );
}

export default function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    let timer1: ReturnType<typeof setTimeout> | undefined;
    let timer2: ReturnType<typeof setTimeout> | undefined;
    let loadRefreshTimer: ReturnType<typeof setTimeout> | undefined;

    const handleLoad = () => {
      loadRefreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        loadRefreshTimer = undefined;
      }, 500);
    };
    window.addEventListener("load", handleLoad);

    const ctx = gsap.context(() => {
      timer1 = setTimeout(() => {
        ScrollTrigger.refresh();

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=400vh",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          refreshPriority: -1,
          onUpdate: (self) => {
            const p = self.progress;

            // Determine active segment (0-3)
            const rawSegment = p * 4;
            const segmentIndex = Math.min(3, Math.floor(rawSegment));
            const segmentProgress = rawSegment >= 4 ? 1 : rawSegment % 1;

            // Number indicators — direct style
            numberRefs.current.forEach((el, i) => {
              if (!el) return;
              const isActive = i === segmentIndex;
              el.style.opacity = isActive ? "1" : "0.2";
              el.style.color = isActive ? "var(--text)" : "var(--muted)";
              el.style.transform = `scale(${isActive ? 1.2 : 1})`;
            });

            // Also update mobile number indicators
            const mobileNumbers = document.querySelectorAll("[data-mobile-number]");
            mobileNumbers.forEach((el, i) => {
              const htmlEl = el as HTMLElement;
              const isActive = i === segmentIndex;
              htmlEl.style.opacity = isActive ? "1" : "0.2";
              htmlEl.style.color = isActive ? "var(--text)" : "var(--muted)";
              htmlEl.style.transform = `scale(${isActive ? 1.2 : 1})`;
            });

            // Content rows — zoom from right animation (no exit animation; only active visible)
            contentRowRefs.current.forEach((row, i) => {
              if (!row) return;

              const isActiveSegment = i === segmentIndex;
              const isPastSegment = i < segmentIndex;

              let opacity = 0;
              let x = 200;
              let scale = 1.1;

              if (isActiveSegment) {
                if (segmentProgress < 0.3) {
                  // Enter
                  const t = segmentProgress / 0.3;
                  opacity = t;
                  x = 200 - 200 * t;
                  scale = 1.1 - 0.1 * t;
                } else {
                  // Hold (no exit; previous item hides instantly when segment changes)
                  opacity = 1;
                  x = 0;
                  scale = 1;
                }
              } else if (isPastSegment) {
                opacity = 0;
                x = -100;
                scale = 0.95;
              }

              row.style.opacity = String(opacity);
              row.style.transform = `translateX(${x}px) scale(${scale})`;
            });
          },
        });
      }, 1500);

      timer2 = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 3000);
    }, section);

    return () => {
      if (timer1 !== undefined) clearTimeout(timer1);
      if (timer2 !== undefined) clearTimeout(timer2);
      if (loadRefreshTimer !== undefined) clearTimeout(loadRefreshTimer);
      window.removeEventListener("load", handleLoad);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        height: "100vh",
        position: "relative",
        background: "var(--bg)",
      }}
    >
      <div
        className="flex flex-col md:flex-row"
        style={{
          height: "100vh",
          width: "100%",
          padding: "80px 4% 40px",
        }}
      >
        {/* Left — 3D Player */}
        <div
          className="w-full h-[30vh] md:h-auto md:w-[45%] relative"
          style={{
            padding: "20px",
          }}
        >
          <Canvas
            gl={{ alpha: true }}
            style={{ position: "absolute", inset: 0, background: "transparent" }}
            camera={{ position: [0, 0.5, 4], fov: 45 }}
          >
          <ambientLight intensity={1} />
          <directionalLight position={[5, 10, 5]} intensity={1.5} />
          <pointLight position={[-3, 5, 2]} intensity={0.8} color="#7bb8d4" />
          <Suspense fallback={null}>
            <Player />
          </Suspense>
        </Canvas>
      </div>

      {/* Mobile number indicators — horizontal row */}
      <div
        className="flex md:hidden justify-center items-center w-full"
        style={{
          gap: "20px",
          padding: "8px 0",
        }}
      >
        {items.map((item, i) => (
          <span
            key={`mobile-${item.n}`}
            data-mobile-number={i}
            style={{
              fontSize: "1rem",
              fontWeight: 700,
              opacity: 0.2,
              color: "var(--muted)",
              transition: "opacity 0.3s, color 0.3s, transform 0.3s",
            }}
          >
            {item.n}
          </span>
        ))}
      </div>

      {/* Center — Number indicators */}
      <div
        className="hidden md:flex flex-col justify-center items-center h-full"
        style={{
          width: "10%",
          gap: "24px",
        }}
      >
        {items.map((item, i) => (
          <span
            key={item.n}
            ref={(el) => {
              if (el) numberRefs.current[i] = el;
            }}
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              opacity: 0.2,
              color: "var(--muted)",
              transform: "scale(1)",
            }}
          >
            {item.n}
          </span>
        ))}
      </div>

        {/* Right — Mission content */}
        <div
          className="w-full md:w-[45%] h-[70vh] md:h-full relative overflow-hidden flex flex-col justify-center"
          style={{
            padding: "0 4%",
          }}
        >
        {items.map((item, i) => (
          <div
            key={item.n}
            ref={(el) => {
              if (el) contentRowRefs.current[i] = el;
            }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              padding: "8vh 6% 3vh",
              opacity: 0,
              transform: "translateX(200px) scale(1.1)",
            }}
          >
            <h3
              style={{
                fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                fontWeight: 900,
                color: "var(--text)",
                marginTop: 0,
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--muted)",
                maxWidth: 450,
                marginTop: "1.5rem",
              }}
            >
              {item.desc}
            </p>
            <div
              style={{
                width: "100%",
                maxWidth: 500,
                height: "clamp(25vh, 35vh, 40vh)",
                maxHeight: "40vh",
                borderRadius: 16,
                overflow: "hidden",
                marginTop: "2rem",
              }}
            >
              {item.video ? (
                <video
                  src={item.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    background: "var(--surface)",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--muted)",
                  }}
                >
                  {item.title} content
                </div>
              )}
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
