"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AboutPageAnimator({ children }: { children: ReactNode }) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-about-badge]", { opacity: 0, y: 20, duration: 0.7, ease: "power2.out", delay: 0.1 });
      gsap.from("[data-about-title]", { opacity: 0, y: 30, duration: 0.9, ease: "power3.out", delay: 0.25 });
      gsap.from("[data-about-intro]", { opacity: 0, y: 20, duration: 0.8, ease: "power2.out", delay: 0.4 });

      gsap.from("[data-about-photo]", {
        opacity: 0,
        y: 60,
        scale: 0.9,
        rotate: (_i, el) => Number((el as HTMLElement).dataset.aboutPhotoRotate || 0),
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.55,
      });

      gsap.from("[data-about-bio-label]", { opacity: 0, y: 20, duration: 0.6, ease: "power2.out", delay: 0.9 });
      gsap.from("[data-about-bio-heading]", { opacity: 0, y: 20, duration: 0.7, ease: "power2.out", delay: 1.0 });
      gsap.from("[data-about-bio-body] p", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power2.out",
        stagger: 0.1,
        delay: 1.1,
      });
      gsap.from("[data-about-bio-cta]", { opacity: 0, y: 20, duration: 0.7, ease: "power2.out", delay: 1.4 });

      gsap.from("[data-about-final-cta]", {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "[data-about-final-cta]",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
