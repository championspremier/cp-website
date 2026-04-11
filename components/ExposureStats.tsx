"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Smartphone, Mail, Share2, Shirt, Globe } from "lucide-react";

const EXPOSURE_TYPES = [
  {
    icon: Smartphone,
    value: 1000,
    suffix: "+",
    label: "App Users",
  },
  {
    icon: Mail,
    value: 2000,
    suffix: "+",
    label: "Email Subscribers",
  },
  {
    icon: Share2,
    value: 800,
    suffix: "K+",
    label: "Social Interactions",
    sublabel: "past 3 months",
  },
  {
    icon: Shirt,
    value: 250,
    suffix: "+",
    label: "Days of Merch Exposure",
    sublabel: "throughout the year",
  },
  {
    icon: Globe,
    value: 500,
    suffix: "+",
    label: "Website Visits",
    sublabel: "per month",
  },
];

const GRADIENT = "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)";

export default function ExposureStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      EXPOSURE_TYPES.forEach((item, i) => {
        const el = numberRefs.current[i];
        if (!el) return;

        el.textContent = `0${item.suffix}`;
        gsap.set(el, { color: "#3b82f6" });

        const counter = { value: 0 };
        gsap.to(counter, {
          value: item.value,
          duration: 2,
          ease: "power2.out",
          snap: { value: 1 },
          scrollTrigger: {
            trigger: section,
            start: "top 75%",
            toggleActions: "play none none none",
          },
          onUpdate: () => {
            if (el) {
              el.textContent = `${Math.round(counter.value)}${item.suffix}`;
            }
          },
          onComplete: () => {
            if (el) {
              gsap.to(el, { color: "var(--text)", duration: 0.4 });
            }
          },
        });
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--bg)",
        padding: "5rem 1.5rem",
        position: "relative",
        zIndex: 10,
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        <h2
          style={{
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: 800,
            color: "var(--text)",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Types of Exposure
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#6b7280",
            marginBottom: "3rem",
            textAlign: "center",
          }}
        >
          Reach the Champions Premier community across multiple channels
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "2rem",
          }}
        >
          {EXPOSURE_TYPES.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "1.5rem 1rem",
                }}
              >
                <div
                  style={{
                    width: "64px",
                    height: "64px",
                    borderRadius: "16px",
                    background: GRADIENT,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "1.25rem",
                    boxShadow: "0 8px 24px rgba(59, 130, 246, 0.25)",
                  }}
                >
                  <Icon size={32} color="#ffffff" strokeWidth={2} />
                </div>
                <span
                  ref={(el) => {
                    numberRefs.current[i] = el;
                  }}
                  style={{
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 900,
                    lineHeight: 1,
                    marginBottom: "0.5rem",
                  }}
                >
                  0{item.suffix}
                </span>
                <span
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: 700,
                    color: "var(--text)",
                    marginBottom: item.sublabel ? "0.125rem" : 0,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {item.label}
                </span>
                {item.sublabel && (
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color: "#9ca3af",
                      fontWeight: 400,
                    }}
                  >
                    {item.sublabel}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
