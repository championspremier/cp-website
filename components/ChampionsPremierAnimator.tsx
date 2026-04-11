"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ChampionsPremierAnimator({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      // Hero entry
      gsap.from("[data-cp-badge]", { opacity: 0, y: 20, duration: 0.7, ease: "power2.out", delay: 0.1 });
      gsap.from("[data-cp-title]", { opacity: 0, y: 30, duration: 0.9, ease: "power3.out", delay: 0.25 });
      gsap.from("[data-cp-intro]", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out", delay: 0.4 });

      // Player photos tilt-in
      gsap.from("[data-cp-photo]", {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotate: (_i, el) => Number((el as HTMLElement).dataset.cpPhotoRotate || 0),
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
        delay: 0.55,
      });

      // Scroll-triggered sections
      const sections = wrapper.querySelectorAll("[data-cp-section]");
      sections.forEach((section) => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
