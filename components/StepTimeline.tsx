"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

export interface Step {
  heading: string;
  body: React.ReactNode;
}

interface StepTimelineProps {
  title: string;
  subtitle: string;
  ctaLabel?: string;
  ctaHref?: string;
  /** Optional content shown to the right of the title (below it on phones) */
  aside?: React.ReactNode;
  steps: Step[];
}

export default function StepTimeline({ title, subtitle, ctaLabel, ctaHref, aside, steps }: StepTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  // Keep the progress line in sync when the steps change size (e.g. switching plans)
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setHeight(el.getBoundingClientRect().height);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <section style={{ background: "var(--bg)", position: "relative", zIndex: 20 }}>
      <div className="w-full bg-transparent md:px-10" ref={containerRef}>
        <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10 flex flex-wrap justify-between items-start gap-4">
          <div>
            <h2 className="text-lg md:text-4xl mb-4 text-black dark:text-white max-w-4xl">{title}</h2>
            <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-sm">{subtitle}</p>
          </div>
          {ctaLabel && ctaHref && (
          <a
            href={ctaHref}
            className="inline-block px-8 py-4 rounded-lg font-semibold text-white transition-opacity hover:opacity-90 shrink-0"
            style={{ background: "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)" }}
          >
            {ctaLabel}
          </a>
          )}
          {aside}
        </div>

        <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
          <ol className="list-none">
          {steps.map((step, index) => {
            const number = String(index + 1).padStart(2, "0");
            return (
              <li key={index} className="flex justify-start pt-10 md:pt-40 md:gap-10">
                <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                  <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                    <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                  </div>
                  <span className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500">
                    {number}
                  </span>
                </div>

                <div className="relative pl-20 pr-4 md:pl-4 w-full">
                  <span className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                    {number}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text)" }}>
                    {step.heading}
                  </h3>
                  <div className="text-base md:text-lg" style={{ color: "var(--muted)" }}>
                    {step.body}
                  </div>
                </div>
              </li>
            );
          })}
          </ol>
          <div
            style={{ height: height + "px" }}
            className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
          >
            <motion.div
              style={{ height: heightTransform, opacity: opacityTransform }}
              className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-[#3b82f6] via-[#7bb8d4] to-transparent from-[0%] via-[10%] rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
