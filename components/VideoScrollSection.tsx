"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SENTENCE_1 = "A professional environment is where";
const SENTENCE_2 = "creativity meets a winning mentality.";

const FRAME_COUNT = 71;
const FRAME_PATH = (i: number, isMobile: boolean) =>
  `/video-frames/meg-finish-${isMobile ? "mobile" : "desktop"}/frame-${String(i).padStart(3, "0")}.jpg`;

export default function VideoScrollSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);
  const [framesReady, setFramesReady] = useState(false);

  // Preload all frames on mount
  useEffect(() => {
    let cancelled = false;
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];
    const isMobile =
      typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches;

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = FRAME_PATH(i, isMobile);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT && !cancelled) {
          setFramesReady(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT && !cancelled) {
          setFramesReady(true);
        }
      };
      images.push(img);
    }
    framesRef.current = images;

    return () => {
      cancelled = true;
    };
  }, []);

  // Draw the initial frame when canvas mounts and first image is ready
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
    };

    const drawFrame = (index: number) => {
      const img = framesRef.current[index];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      // Cover: fill canvas while preserving aspect ratio, crop overflow
      const scale = Math.max(cw / iw, ch / ih);
      const drawW = iw * scale;
      const drawH = ih * scale;
      const dx = (cw - drawW) / 2;
      const dy = (ch - drawH) / 2;

      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, drawW, drawH);
      lastFrameRef.current = index;
    };

    // Expose drawFrame on canvas for the scroll handler to use
    (canvas as HTMLCanvasElement & { _drawFrame?: (i: number) => void })._drawFrame = drawFrame;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [framesReady]);

  // Set up ScrollTrigger animations
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrapper = wrapperRef.current;
    const box = boxRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !box || !canvas) return;

    let timer: ReturnType<typeof setTimeout>;
    const drawFrameFn = (canvas as HTMLCanvasElement & { _drawFrame?: (i: number) => void })._drawFrame;

    const ctx = gsap.context(() => {
      // Phase 1 — Circle expands as section enters viewport (before pin)
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top 90%",
        end: "top 10%",
        scrub: true,
        onUpdate: (self) => {
          const p = self.progress;
          const endRadius = Math.max(window.innerWidth, window.innerHeight) * 1.5;
          const radius = p * endRadius;
          const centerY = window.innerHeight * 0.5;
          box.style.clipPath = p >= 0.99 ? "none" : `circle(${radius}px at 50% ${centerY}px)`;
        },
      });

      // Phase 2 — Pin and frame scrub
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const frameIndex = Math.min(
            FRAME_COUNT - 1,
            Math.floor(self.progress * FRAME_COUNT)
          );
          if (frameIndex !== lastFrameRef.current && drawFrameFn) {
            drawFrameFn(frameIndex);
          }
        },
      });

      // Text reveal — letter-by-letter (unchanged from original)
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "+=300%",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const len1 = SENTENCE_1.length;
          const len2 = SENTENCE_2.length;
          const s1RevealEnd = 0.5;
          const s1FadeStart = 0.45;
          const s2RevealStart = 0.5;
          letterRefs.current.forEach((el, i) => {
            if (!el) return;
            if (i < len1) {
              const letterProgress = (i / len1) * s1RevealEnd * 0.9;
              const letterRevealEnd = letterProgress + 0.02;
              if (p >= s1FadeStart) {
                const fade = 1 - (p - s1FadeStart) / 0.05;
                el.style.opacity = String(Math.max(0, fade));
              } else if (p < letterProgress) {
                el.style.opacity = "0";
              } else if (p < letterRevealEnd) {
                el.style.opacity = String((p - letterProgress) / (letterRevealEnd - letterProgress));
                el.style.color = "#3b82f6";
              } else if (p < letterRevealEnd + 0.02) {
                const t = Math.min(1, (p - letterRevealEnd) / 0.02);
                el.style.opacity = "1";
                el.style.color = t >= 1 ? "#ffffff" : `rgb(${59 + 196 * t}, ${130 + 125 * t}, ${246 + 9 * t})`;
              } else {
                el.style.opacity = "1";
                el.style.color = "#ffffff";
              }
            } else {
              const idx = i - len1;
              const letterProgress = s2RevealStart + (idx / len2) * (1 - s2RevealStart) * 0.9;
              const letterRevealEnd = letterProgress + 0.02;
              if (p < letterProgress) {
                el.style.opacity = "0";
              } else if (p < letterRevealEnd) {
                el.style.opacity = String((p - letterProgress) / (letterRevealEnd - letterProgress));
                el.style.color = "#3b82f6";
              } else if (p < letterRevealEnd + 0.02) {
                const t = Math.min(1, (p - letterRevealEnd) / 0.02);
                el.style.opacity = "1";
                el.style.color = t >= 1 ? "#ffffff" : `rgb(${59 + 196 * t}, ${130 + 125 * t}, ${246 + 9 * t})`;
              } else {
                el.style.opacity = "1";
                el.style.color = "#ffffff";
              }
            }
          });
        },
      });

      timer = setTimeout(() => ScrollTrigger.refresh(), 500);
    }, wrapper);

    return () => {
      clearTimeout(timer);
      ctx.revert();
    };
  }, [framesReady]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        marginTop: "0",
        zIndex: 2,
      }}
    >
      <div
        ref={boxRef}
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          clipPath: "circle(0px at 50% 50%)",
          background: "#000",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            display: "block",
          }}
        />
        <div
          ref={textContainerRef}
          style={{
            position: "absolute",
            bottom: "25%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "90%",
            zIndex: 10,
            textAlign: "center",
            fontSize: "clamp(2.5rem, 5vw, 4.5rem)",
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          {SENTENCE_1.split(" ").map((word, wordIndex) => {
            const words = SENTENCE_1.split(" ");
            const startIdx = words
              .slice(0, wordIndex)
              .reduce((acc, w) => acc + w.length + 1, 0);
            return (
              <span
                key={`s1-w-${wordIndex}`}
                style={{ display: "inline-block", whiteSpace: "nowrap" }}
              >
                {word.split("").map((char, charIndex) => (
                  <span
                    key={`s1-${startIdx + charIndex}`}
                    ref={(el) => {
                      if (el) letterRefs.current[startIdx + charIndex] = el;
                    }}
                    style={{ display: "inline-block", opacity: 0 }}
                  >
                    {char}
                  </span>
                ))}
                {wordIndex < words.length - 1 && (
                  <span
                    ref={(el) => {
                      if (el) letterRefs.current[startIdx + word.length] = el;
                    }}
                    style={{ display: "inline-block", width: "0.3em" }}
                  >
                    &nbsp;
                  </span>
                )}
              </span>
            );
          })}
          <span style={{ display: "inline-block", width: "0.3em" }}> </span>
          {SENTENCE_2.split(" ").map((word, wordIndex) => {
            const words = SENTENCE_2.split(" ");
            const startIdx =
              SENTENCE_1.length +
              words.slice(0, wordIndex).reduce((acc, w) => acc + w.length + 1, 0);
            return (
              <span
                key={`s2-w-${wordIndex}`}
                style={{ display: "inline-block", whiteSpace: "nowrap" }}
              >
                {word.split("").map((char, charIndex) => (
                  <span
                    key={`s2-${startIdx + charIndex}`}
                    ref={(el) => {
                      if (el) letterRefs.current[startIdx + charIndex] = el;
                    }}
                    style={{ display: "inline-block", opacity: 0 }}
                  >
                    {char}
                  </span>
                ))}
                {wordIndex < words.length - 1 && (
                  <span
                    ref={(el) => {
                      if (el) letterRefs.current[startIdx + word.length] = el;
                    }}
                    style={{ display: "inline-block", width: "0.3em" }}
                  >
                    &nbsp;
                  </span>
                )}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
