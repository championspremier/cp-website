"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const beforeStats = [
  { label: "Scanning Right", value: "20.0%", width: 20, index: 0 },
  { label: "Scanning Left", value: "22.2%", width: 22.2, index: 1 },
  { label: "Body Orientation", value: "44.4%", width: 44.4, index: 2 },
  { label: "Receiving Back Foot", value: "37.5%", width: 37.5, index: 3 },
  { label: "Communication", value: "20.1%", width: 20, index: 4 },
  { label: "Creating Contact", value: "25.0%", width: 25, index: 5 },
  { label: "Progresses Play", value: "33.3%", width: 33.3, index: 6 },
  { label: "Chance Created", value: "25.2%", width: 25, index: 7 },
  { label: "Time on Ball >3s", value: "30.0%", width: 30, index: 8 },
];

const afterStats = [
  { label: "Scanning Right", value: "60.0%", width: 60 },
  { label: "Scanning Left", value: "44.4%", width: 44.4 },
  { label: "Body Orientation", value: "80.0%", width: 80 },
  { label: "Receiving Back Foot", value: "77.8%", width: 77.8 },
  { label: "Communication", value: "60.0%", width: 60 },
  { label: "Creating Contact", value: "69.2%", width: 69.2 },
  { label: "Progresses Play", value: "84.6%", width: 84.6 },
  { label: "Chance Created", value: "75.0%", width: 75 },
  { label: "Time on Ball >3s", value: "83.3%", width: 83.3 },
];

const changes = [
  { label: "Scanning Right", value: "+40.0%" },
  { label: "Scanning Left", value: "+22.2%" },
  { label: "Body Orientation", value: "+35.6%" },
  { label: "Receiving Back Foot", value: "+40.3%" },
  { label: "Communication", value: "+40.7%" },
  { label: "Creating Contact", value: "+44.2%" },
  { label: "Progresses Play", value: "+51.3%" },
  { label: "Chance Created", value: "+50.0%" },
  { label: "Time on Ball >3s", value: "+53.3%" },
];

const FRAME_COUNT = 80;
const FRAME_PATH = (i: number, isMobile: boolean) =>
  `/video-frames/player-scan-${isMobile ? "mobile" : "desktop"}/frame-${String(i).padStart(3, "0")}.jpg`;

export default function PlayerScanSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const leftStatsRef = useRef<HTMLDivElement>(null);
  const afterStatsRef = useRef<HTMLDivElement>(null);
  const changesLeftRef = useRef<HTMLDivElement>(null);
  const changesRightRef = useRef<HTMLDivElement>(null);
  const changesCombinedRef = useRef<HTMLDivElement>(null);
  const beforeBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const afterBarRefs = useRef<(HTMLDivElement | null)[]>([]);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const lastFrameRef = useRef(-1);
  const [framesReady, setFramesReady] = useState(false);

  // Preload frames
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
        if (loadedCount === FRAME_COUNT && !cancelled) setFramesReady(true);
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === FRAME_COUNT && !cancelled) setFramesReady(true);
      };
      images.push(img);
    }
    framesRef.current = images;
    return () => {
      cancelled = true;
    };
  }, []);

  // Canvas setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      drawFrame(lastFrameRef.current >= 0 ? lastFrameRef.current : 0);
    };

    (canvas as HTMLCanvasElement & { _drawFrame?: (i: number) => void })._drawFrame = drawFrame;
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [framesReady]);

  // ScrollTrigger setup
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const wrapper = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !canvas) return;
    const drawFrameFn = (canvas as HTMLCanvasElement & { _drawFrame?: (i: number) => void })._drawFrame;

    let loadRefreshTimer: ReturnType<typeof setTimeout> | undefined;
    const handleLoad = () => {
      loadRefreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        loadRefreshTimer = undefined;
      }, 500);
    };
    window.addEventListener("load", handleLoad);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "+=300%",
        pin: true,
        pinSpacing: true,
        scrub: 1,
        refreshPriority: -2,
        onUpdate: (self) => {
          // Frame scrub
          const frameIndex = Math.min(FRAME_COUNT - 1, Math.floor(self.progress * FRAME_COUNT));
          if (frameIndex !== lastFrameRef.current && drawFrameFn) drawFrameFn(frameIndex);

          const p = self.progress;

          if (titleRef.current) {
            if (p < 0.1) titleRef.current.style.opacity = "0";
            else if (p < 0.15) titleRef.current.style.opacity = String((p - 0.1) / 0.05);
            else if (p < 0.9) titleRef.current.style.opacity = "1";
            else if (p < 0.99) titleRef.current.style.opacity = String(1 - (p - 0.99) / 0.05);
            else titleRef.current.style.opacity = "0";
          }

          if (leftStatsRef.current) {
            if (p < 0.4) leftStatsRef.current.style.opacity = "0";
            else if (p < 0.45) leftStatsRef.current.style.opacity = String((p - 0.4) / 0.05);
            else if (p < 0.65) leftStatsRef.current.style.opacity = "1";
            else if (p < 0.7) leftStatsRef.current.style.opacity = String(1 - (p - 0.65) / 0.05);
            else leftStatsRef.current.style.opacity = "0";
          }

          if (p >= 0.4 && p <= 0.55) {
            const barProgress = Math.min(1, (p - 0.4) / 0.15);
            beforeStats.forEach((stat) => {
              const bar = beforeBarRefs.current[stat.index];
              if (bar) bar.style.width = `${stat.width * barProgress}%`;
            });
          }

          if (afterStatsRef.current) {
            if (p < 0.7) afterStatsRef.current.style.opacity = "0";
            else if (p < 0.75) afterStatsRef.current.style.opacity = String((p - 0.7) / 0.05);
            else if (p < 0.85) afterStatsRef.current.style.opacity = "1";
            else if (p < 0.9) afterStatsRef.current.style.opacity = String(1 - (p - 0.85) / 0.05);
            else afterStatsRef.current.style.opacity = "0";
          }

          if (p >= 0.7 && p <= 0.8) {
            const barProgress = Math.min(1, (p - 0.7) / 0.1);
            afterStats.forEach((stat, i) => {
              const bar = afterBarRefs.current[i];
              if (bar) bar.style.width = `${stat.width * barProgress}%`;
            });
          }

          [changesLeftRef, changesRightRef, changesCombinedRef].forEach((ref) => {
            if (ref.current) {
              if (p < 0.86) ref.current.style.opacity = "0";
              else if (p < 0.9) ref.current.style.opacity = String((p - 0.86) / 0.05);
              else if (p < 0.99) ref.current.style.opacity = "1";
              else if (p < 1) ref.current.style.opacity = String(1 - (p - 0.99) / 0.05);
              else ref.current.style.opacity = "0";
            }
          });
        },
      });
    }, wrapper);

    return () => {
      if (loadRefreshTimer !== undefined) clearTimeout(loadRefreshTimer);
      window.removeEventListener("load", handleLoad);
      ctx.revert();
    };
  }, [framesReady]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "relative",
        background: "var(--bg)",
        zIndex: 1,
        overflow: "hidden",
      }}
    >
      <div style={{ width: "100%", height: "100vh", background: "#000" }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", display: "block" }}
        />
      </div>

      <div
        ref={titleRef}
        className="absolute z-10 left-[2%] right-[2%] text-center md:text-left md:left-[5%] md:right-auto md:w-auto"
        style={{
          top: "10%",
          opacity: 0,
        }}
      >
        <h2
          className="font-black text-[#111111] md:text-[#111111] [text-shadow:0_2px_8px_rgba(255,255,255,0.9),0_0_20px_rgba(255,255,255,0.6),0_0_3px_rgba(255,255,255,0.8)] md:[text-shadow:none]"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          THE NUMBERS DON&apos;T LIE
        </h2>
        <p
          className="text-[#111111] md:text-[#6b7280] [text-shadow:0_1px_6px_rgba(255,255,255,0.9),0_0_15px_rgba(255,255,255,0.5)] md:[text-shadow:none]"
          style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}
        >
          20-50% improvement after consistent film analysis
        </p>
      </div>

      <div
        ref={leftStatsRef}
        className="absolute z-10 left-[5%] right-[5%] text-center md:text-left md:left-auto md:right-[5%] md:w-[280px]"
        style={{
          top: "30%",
          opacity: 0,
        }}
      >
        <h3
          className="text-white md:text-[#111111] [text-shadow:0_2px_8px_rgba(0,0,0,0.7),0_0_3px_rgba(0,0,0,0.5)] md:[text-shadow:none]"
          style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}
        >
          Before Champions Premier
        </h3>
        {beforeStats.map((stat) => (
          <div key={stat.label} style={{ marginBottom: "8px" }}>
            <div
              className="text-white/85 md:text-[#6b7280] [text-shadow:0_1px_6px_rgba(0,0,0,0.8),0_0_2px_rgba(0,0,0,0.5)] md:[text-shadow:none]"
              style={{ fontSize: "0.7rem", marginBottom: "2px" }}
            >
              {stat.label}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  flex: 1,
                  height: "8px",
                  background: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  ref={(el) => {
                    beforeBarRefs.current[stat.index] = el;
                  }}
                  style={{
                    width: "0%",
                    height: "100%",
                    borderRadius: "4px",
                    background: "linear-gradient(90deg, #7bb8d4, #3b82f6)",
                  }}
                />
              </div>
              <span
                className="text-white md:text-[#111111] [text-shadow:0_1px_6px_rgba(0,0,0,0.7)] md:[text-shadow:none]"
                style={{ fontSize: "0.75rem", fontWeight: 700, minWidth: "40px" }}
              >
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        ref={afterStatsRef}
        className="absolute z-10 left-[5%] right-[5%] text-center md:text-left md:left-[5%] md:right-auto md:w-[280px]"
        style={{
          top: "30%",
          opacity: 0,
        }}
      >
        <h3
          className="text-white md:text-[#111111] [text-shadow:0_2px_8px_rgba(0,0,0,0.7),0_0_3px_rgba(0,0,0,0.5)] md:[text-shadow:none]"
          style={{ fontSize: "1.2rem", fontWeight: 700, marginBottom: "1rem" }}
        >
          After Champions Premier
        </h3>
        {afterStats.map((stat, i) => (
          <div key={stat.label} style={{ marginBottom: "8px" }}>
            <div
              className="text-white/85 md:text-[#6b7280] [text-shadow:0_1px_6px_rgba(0,0,0,0.8),0_0_2px_rgba(0,0,0,0.5)] md:[text-shadow:none]"
              style={{ fontSize: "0.7rem", marginBottom: "2px" }}
            >
              {stat.label}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div
                style={{
                  flex: 1,
                  height: "8px",
                  background: "rgba(0, 0, 0, 0.1)",
                  borderRadius: "4px",
                  overflow: "hidden",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.3)",
                }}
              >
                <div
                  ref={(el) => {
                    afterBarRefs.current[i] = el;
                  }}
                  style={{
                    width: "0%",
                    height: "100%",
                    borderRadius: "4px",
                    background: "linear-gradient(90deg, #7bb8d4, #3b82f6)",
                  }}
                />
              </div>
              <span
                className="text-white md:text-[#111111] [text-shadow:0_1px_6px_rgba(0,0,0,0.7)] md:[text-shadow:none]"
                style={{ fontSize: "0.75rem", fontWeight: 700, minWidth: "40px" }}
              >
                {stat.value}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        ref={changesCombinedRef}
        className="md:hidden"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10,
          opacity: 0,
          width: "60%",
          maxWidth: "500px",
        }}
      >
        <h3
          className="[text-shadow:0_2px_8px_rgba(0,0,0,0.7),0_0_3px_rgba(0,0,0,0.4)] md:[text-shadow:none]"
          style={{ fontSize: "1.2rem", fontWeight: 700, color: "#22c55e", marginBottom: "1rem" }}
        >
          IMPROVEMENT
        </h3>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px 24px",
          }}
        >
          {changes.map((item) => (
            <div key={item.label}>
              <div
                className="text-white/85 md:text-[#6b7280] [text-shadow:0_1px_6px_rgba(0,0,0,0.8),0_0_2px_rgba(0,0,0,0.5)] md:[text-shadow:none]"
                style={{ fontSize: "0.65rem" }}
              >
                {item.label}
              </div>
              <div
                className="[text-shadow:0_2px_8px_rgba(0,0,0,0.7),0_0_3px_rgba(0,0,0,0.4)] md:[text-shadow:none]"
                style={{ fontSize: "1.3rem", fontWeight: 900, color: "#22c55e" }}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        ref={changesLeftRef}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "30%",
          left: "15%",
          zIndex: 10,
          opacity: 0,
          width: "250px",
          textAlign: "center",
        }}
      >
        <h3
          className="[text-shadow:0_2px_8px_rgba(0,0,0,0.7),0_0_3px_rgba(0,0,0,0.4)] md:[text-shadow:none]"
          style={{ fontSize: "1.2rem", fontWeight: 700, color: "#22c55e", marginBottom: "1rem" }}
        >
          IMPROVEMENT
        </h3>
        {changes.slice(0, 5).map((item) => (
          <div key={item.label} style={{ marginBottom: "12px" }}>
            <div
              className="text-white/85 md:text-[#6b7280] [text-shadow:0_1px_6px_rgba(0,0,0,0.8),0_0_2px_rgba(0,0,0,0.5)] md:[text-shadow:none]"
              style={{ fontSize: "0.7rem" }}
            >
              {item.label}
            </div>
            <div
              className="[text-shadow:0_2px_8px_rgba(0,0,0,0.7),0_0_3px_rgba(0,0,0,0.4)] md:[text-shadow:none]"
              style={{ fontSize: "1.5rem", fontWeight: 900, color: "#22c55e" }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div
        ref={changesRightRef}
        className="hidden md:block"
        style={{
          position: "absolute",
          top: "30%",
          right: "15%",
          zIndex: 10,
          opacity: 0,
          width: "250px",
          textAlign: "center",
        }}
      >
        {changes.slice(5).map((item) => (
          <div key={item.label} style={{ marginBottom: "12px" }}>
            <div
              className="text-white/85 md:text-[#6b7280] [text-shadow:0_1px_6px_rgba(0,0,0,0.8),0_0_2px_rgba(0,0,0,0.5)] md:[text-shadow:none]"
              style={{ fontSize: "0.7rem" }}
            >
              {item.label}
            </div>
            <div
              className="[text-shadow:0_2px_8px_rgba(0,0,0,0.7),0_0_3px_rgba(0,0,0,0.4)] md:[text-shadow:none]"
              style={{ fontSize: "1.5rem", fontWeight: 900, color: "#22c55e" }}
            >
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
