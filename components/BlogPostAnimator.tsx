"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
}

export default function BlogPostAnimator({ children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      // Hero image fade in + subtle scale
      const hero = wrapper.querySelector("[data-blog-hero]");
      if (hero) {
        gsap.from(hero, {
          opacity: 0,
          scale: 1.05,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      // Back link slide in
      const backLink = wrapper.querySelector("[data-blog-back]");
      if (backLink) {
        gsap.from(backLink, {
          opacity: 0,
          x: -20,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.3,
        });
      }

      // Category badge
      const category = wrapper.querySelector("[data-blog-category]");
      if (category) {
        gsap.from(category, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.4,
        });
      }

      // Title
      const title = wrapper.querySelector("h1");
      if (title) {
        gsap.from(title, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.5,
        });
      }

      // Author + date
      const meta = wrapper.querySelector("[data-blog-meta]");
      if (meta) {
        gsap.from(meta, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.65,
        });
      }

      // Article body
      const body = wrapper.querySelector("[data-blog-body]");
      if (body) {
        gsap.from(body, {
          opacity: 0,
          y: 30,
          duration: 0.9,
          ease: "power2.out",
          delay: 0.8,
        });
      }
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
