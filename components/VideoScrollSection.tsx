"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function VideoScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const letterRefs1 = useRef<HTMLSpanElement[]>([]);
  const letterRefs2 = useRef<HTMLSpanElement[]>([]);
  const textRef = useRef<HTMLDivElement>(null);

  const sentence1 = "A professional environment";
  const sentence2 = "is where creativity meets a winning mentality.";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const box = boxRef.current;
    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!box || !video || !wrapper) return;

    // Phase 1: trapezoid expands to fullscreen as it enters viewport
    gsap.fromTo(
      box,
      {
        width: "88%",
        height: "60vh",
        borderRadius: "20px 20px 0 0",
        clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)",
      },
      {
        width: "100%",
        height: "100vh",
        borderRadius: "0px",
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "none",
        scrollTrigger: {
          trigger: wrapper,
          start: "top bottom",
          end: "top top",
          scrub: true,
        },
      }
    );

    // Phase 2: video scrubs frame by frame while pinned
    let lastTime = 0;
    const setupScrub = () => {
      gsap.to({}, {
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "+=300%",
          pin: wrapper,
          scrub: 1,
          onUpdate: (self) => {
            if (video.duration) {
              const newTime = self.progress * video.duration;
              if (Math.abs(newTime - lastTime) > 0.033) {
                video.currentTime = newTime;
                lastTime = newTime;
              }
            }
          },
        },
      });

      const len1 = letterRefs1.current.length;
      const len2 = letterRefs2.current.length;

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;

          // Sentence 1: 0-50%, fade out at 45-50%
          letterRefs1.current.forEach((el, i) => {
            if (!el) return;
            const revealStart = (i / len1) * 0.5;
            const revealEnd = revealStart + 0.03;
            const colorEnd = revealStart + 0.02;

            if (progress >= 0.45) {
              const fade = 1 - (progress - 0.45) / 0.05;
              el.style.opacity = String(Math.max(0, fade));
            } else if (progress < revealStart) {
              el.style.opacity = "0";
            } else if (progress < revealEnd) {
              el.style.opacity = String((progress - revealStart) / (revealEnd - revealStart));
              el.style.color = "#3b82f6";
            } else if (progress < colorEnd) {
              el.style.opacity = "1";
              const t = Math.min(1, (progress - revealStart) / 0.02);
              el.style.color =
                t >= 1
                  ? "rgba(255,255,255,0.95)"
                  : `rgb(${59 + 196 * t}, ${130 + 125 * t}, ${246 + 9 * t})`;
            } else {
              el.style.opacity = "1";
              el.style.color = "rgba(255,255,255,0.95)";
            }
          });

          // Sentence 2: 50-100%, letter-by-letter blue → white
          letterRefs2.current.forEach((el, i) => {
            if (!el) return;
            const revealStart = 0.5 + (i / len2) * 0.5;
            const revealEnd = revealStart + 0.03;
            const colorEnd = revealStart + 0.02;

            if (progress < revealStart) {
              el.style.opacity = "0";
            } else if (progress < revealEnd) {
              el.style.opacity = String((progress - revealStart) / (revealEnd - revealStart));
              el.style.color = "#3b82f6";
            } else if (progress < colorEnd) {
              el.style.opacity = "1";
              const t = Math.min(1, (progress - revealStart) / 0.02);
              el.style.color =
                t >= 1
                  ? "rgba(255,255,255,0.95)"
                  : `rgb(${59 + 196 * t}, ${130 + 125 * t}, ${246 + 9 * t})`;
            } else {
              el.style.opacity = "1";
              el.style.color = "rgba(255,255,255,0.95)";
            }
          });
        },
      });
    };

    if (video.readyState >= 2) setupScrub();
    else video.addEventListener("loadedmetadata", setupScrub);

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{ position: "relative", marginTop: "-100px", zIndex: 2 }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          overflow: "hidden",
          display: "flex",
          alignItems: "flex-end",
          background: "transparent",
        }}
      >
        <div
          ref={boxRef}
          style={{
            width: "88%",
            height: "60vh",
            margin: "0 auto",
            borderRadius: "20px 20px 0 0",
            overflow: "hidden",
            position: "relative",
            clipPath: "polygon(4% 0%, 96% 0%, 100% 100%, 0% 100%)",
          }}
        >
          <video
            ref={videoRef}
            src="/video/meg-finish.mp4"
            crossOrigin="anonymous"
            muted
            playsInline
            preload="auto"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            ref={textRef}
            style={{
              position: "absolute",
              bottom: "25%",
              left: "50%",
              transform: "translateX(-50%)",
              zIndex: 10,
              textAlign: "center",
              width: "90%",
              pointerEvents: "none",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              {sentence1.split("").map((char, i) => (
                <span
                  key={`1-${i}`}
                  ref={(el) => {
                    if (el) letterRefs1.current[i] = el;
                  }}
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    color: "#3b82f6",
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    fontWeight: "700",
                    lineHeight: "1.1",
                    letterSpacing: "0.02em",
                    whiteSpace: "pre",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
            <div>
              {sentence2.split("").map((char, i) => (
                <span
                  key={`2-${i}`}
                  ref={(el) => {
                    if (el) letterRefs2.current[i] = el;
                  }}
                  style={{
                    display: "inline-block",
                    opacity: 0,
                    color: "#3b82f6",
                    fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
                    fontWeight: "700",
                    lineHeight: "1.1",
                    letterSpacing: "0.02em",
                    whiteSpace: "pre",
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
