"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const items = [
  {
    n: "01",
    title: "Technically",
    desc: "At Champions Premier, we build players through 1v1s, small-sided games, and a curriculum built around real match scenarios — all in an environment where players are free to express themselves.",
  },
  {
    n: "02",
    title: "Tactically",
    desc: "From NCAA programs to professional clubs and Champions League youth academies, our coaches bring the tactical expertise needed to develop well-rounded, intelligent players at every stage of their journey.",
  },
  {
    n: "03",
    title: "Physically",
    desc: "With one of the best S&C coaches in the DMV area, Greg is able to bring in his expertise.",
  },
  {
    n: "04",
    title: "Mentally",
    desc: "Our hybrid approach merges high-level group sessions with personalized 1-on-1 Zoom calls, ensuring every player gets a development plan built around them.",
  },
];

const letterStyle = {
  display: "inline-block" as const,
  opacity: 0,
  color: "#3b82f6",
  fontSize: "clamp(3rem, 7vw, 6rem)",
  fontWeight: 900,
  lineHeight: 1,
  letterSpacing: "0.02em",
  whiteSpace: "pre" as const,
};

export default function MissionContentSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const letterRefs = useRef<HTMLSpanElement[][]>([[], [], [], []]);
  const numberRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const descRefs = useRef<(HTMLParagraphElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      items.forEach((item, itemIndex) => {
        const row = rowRefs.current[itemIndex];
        const letters = letterRefs.current[itemIndex];
        const numberEl = numberRefs.current[itemIndex];
        const descEl = descRefs.current[itemIndex];
        if (!row || letters.length === 0) return;

        const len = letters.length;

        // Letter reveal + fade out when row leaves
        ScrollTrigger.create({
          trigger: row,
          start: "top 85%",
          end: "top -30%",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            // First 45%: reveal letters (blue to white)
            // Last 55%: fade out entire row (sooner)
            const revealEnd = 0.45;
            const fadeStart = 0.4;

            // Fade in number + desc in first 8% of scroll, then fade out in last 60%
            const numberDescRevealEnd = 0.08;
            const numberDescOpacity =
              progress < numberDescRevealEnd
                ? progress / numberDescRevealEnd
                : progress >= fadeStart
                  ? Math.max(0, 1 - (progress - fadeStart) / (1 - fadeStart))
                  : 1;

            if (progress >= fadeStart) {
              const rowFade =
                1 - (progress - fadeStart) / (1 - fadeStart);
              const fadeVal = Math.max(0, rowFade);
              row.style.opacity = String(fadeVal);
            } else {
              row.style.opacity = "1";
            }
            if (numberEl) numberEl.style.opacity = String(numberDescOpacity);
            if (descEl) descEl.style.opacity = String(numberDescOpacity);

            letters.forEach((el, i) => {
              if (!el) return;
              const revealStart = (i / len) * revealEnd * 0.75;
              const revealEndLetter = revealStart + 0.04;

              if (progress >= fadeStart) {
                const rowFade =
                  1 - (progress - fadeStart) / (1 - fadeStart);
                el.style.opacity = String(Math.max(0, rowFade));
              } else if (progress < revealStart) {
                el.style.opacity = "0";
              } else if (progress < revealEndLetter) {
                el.style.opacity = String(
                  (progress - revealStart) / (revealEndLetter - revealStart)
                );
                el.style.color = "#3b82f6";
              } else if (progress < revealStart + 0.03) {
                el.style.opacity = "1";
                const t = Math.min(
                  1,
                  (progress - revealEndLetter) / 0.03
                );
                el.style.color =
                  t >= 1
                    ? "var(--text)"
                    : `rgb(${59 + 196 * t}, ${130 + 125 * t}, ${246 + 9 * t})`;
              } else {
                el.style.opacity = "1";
                el.style.color = "var(--text)";
              }
            });
          },
        });

        // Pin row for slower scroll when it enters
        ScrollTrigger.create({
          trigger: row,
          start: "top 50%",
          end: "+=120vh",
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          pinType: "transform",
        });
      });
    }, 700);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      data-mission-content
      style={{ position: "relative", zIndex: 5, background: "transparent" }}
    >
      <div
        style={{
          minHeight: "500vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-around",
          padding: "10vh 2%",
        }}
      >
        {items.map((item, i) => (
          <div
            key={item.n}
            ref={(el) => {
              rowRefs.current[i] = el;
            }}
            style={{
              display: "flex",
              alignItems: "center",
              paddingTop: i === 0 ? 0 : "8vh",
              paddingBottom: "8vh",
            }}
          >
            <div style={{ flex: 1 }}>
              <span
                ref={(el) => {
                  if (el) numberRefs.current[i] = el;
                }}
                style={{
                  color: "var(--muted)",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                }}
              >
                {item.n}
              </span>
              <h2
                style={{
                  fontWeight: 900,
                  fontSize: "clamp(3rem, 7vw, 6rem)",
                  color: "var(--text)",
                  margin: "0.5rem 0",
                  lineHeight: 1,
                }}
              >
                {item.title.split("").map((char, j) => (
                  <span
                    key={`${i}-${j}`}
                    ref={(el) => {
                      if (el) letterRefs.current[i][j] = el;
                    }}
                    style={letterStyle}
                  >
                    {char}
                  </span>
                ))}
              </h2>
              <p
                ref={(el) => {
                  if (el) descRefs.current[i] = el;
                }}
                style={{
                  color: "var(--muted)",
                  fontSize: "1.1rem",
                  lineHeight: 1.7,
                  maxWidth: "400px",
                  marginTop: "1rem",
                }}
              >
                {item.desc}
              </p>
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <div
                style={{
                  width: "500px",
                  height: "400px",
                  background: "var(--surface)",
                  borderRadius: "16px",
                  border: "1px solid var(--border)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--muted)",
                  overflow: "hidden",
                }}
              >
                {item.title === "Technically" ? (
                  <video
                    src="/video/technically.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : item.title === "Tactically" ? (
                  <video
                    src="/video/tactically.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : item.title === "Physically" ? (
                  <video
                    src="/video/physically.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  item.title + " content"
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
