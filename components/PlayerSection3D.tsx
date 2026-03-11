"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

function Player({
  scrollProgress,
}: {
  scrollProgress: React.MutableRefObject<number>;
}) {
  const { scene } = useGLTF("/player-3d.glb");
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const p = scrollProgress.current;
    const scale = 0.1 + p * 1.0;
    ref.current.scale.setScalar(scale);
    // Subtle sway: right to left and back (max ~0.15 radians each way)
    ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.15;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[0, 0, 0]}
      scale={0.1}
    />
  );
}

export default function PlayerSection3D() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "top top",
        scrub: true,
        onUpdate: (self) => {
          scrollProgress.current = self.progress;
          // Fade in "OUR MISSION" from left as scroll progresses (starts at 30%)
          if (headingRef.current) {
            const p = self.progress;
            const fadeStart = 0.3;
            const fadeEnd = 0.7;
            const t = p <= fadeStart ? 0 : Math.min(1, (p - fadeStart) / (fadeEnd - fadeStart));
            headingRef.current.style.opacity = String(t);
            headingRef.current.style.transform = `translateX(${-30 + 30 * t}px)`;
          }
        },
      });

      // Pin the player section while mission content scrolls over it
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: () => {
          const missionSection = document.querySelector(
            "[data-mission-content]"
          ) as HTMLElement | null;
          return `+=${missionSection?.offsetHeight || window.innerHeight * 4}`;
        },
        pin: true,
        pinSpacing: false,
        anticipatePin: 1,
      });

      // Fade out "OUR MISSION" when mission section reaches top of viewport
      const missionSection = document.querySelector(
        "[data-mission-content]"
      ) as HTMLElement | null;
      if (missionSection && headingRef.current) {
        ScrollTrigger.create({
          trigger: missionSection,
          start: "top top",
          end: "+=80",
          scrub: true,
          onUpdate: (self) => {
            if (headingRef.current) {
              headingRef.current.style.opacity = String(1 - self.progress);
            }
          },
        });
      }
    }, 700);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        height: "100vh",
        background: "var(--bg)",
        zIndex: 4,
      }}
    >
      <div
        ref={headingRef}
        style={{
          position: "absolute",
          top: "8%",
          left: "6%",
          zIndex: 10,
          opacity: 0,
          transform: "translateX(-30px)",
          pointerEvents: "none",
        }}
      >
        <h2
          style={{
            fontWeight: 900,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1.1,
          }}
        >
          <span style={{ color: "var(--text)" }}>OUR</span>
          <br />
          <span className="gradient-text">MISSION</span>
        </h2>
      </div>
      <Canvas
        gl={{ alpha: true }}
        style={{ position: "absolute", inset: 0, background: "transparent" }}
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} />
        <pointLight position={[-3, 5, 2]} intensity={0.8} color="#7bb8d4" />
        <Suspense fallback={null}>
          <Player scrollProgress={scrollProgress} />
        </Suspense>
      </Canvas>
    </div>
  );
}
