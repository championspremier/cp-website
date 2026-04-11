"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

interface Props {
  children: ReactNode;
}

export default function BlogListAnimator({ children }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      // Animate the background BLOG label
      const bgLabel = wrapper.querySelector("[data-bg-label]");
      if (bgLabel) {
        gsap.from(bgLabel, {
          opacity: 0,
          scale: 1.2,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      // Animate the title
      const title = wrapper.querySelector("h1");
      if (title) {
        gsap.from(title, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        });
      }

      // Animate the description
      const description = wrapper.querySelector("p");
      if (description) {
        gsap.from(description, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.25,
        });
      }

      // Stagger the blog cards in from below
      const cards = wrapper.querySelectorAll("[data-blog-card]");
      if (cards.length > 0) {
        gsap.from(cards, {
          opacity: 0,
          y: 60,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.4,
        });
      }
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return <div ref={wrapperRef}>{children}</div>;
}
