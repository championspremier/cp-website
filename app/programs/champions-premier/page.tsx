import type { Metadata } from "next";
import Image from "next/image";
import { Users, Target, Flag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChampionsPremierAnimator from "@/components/ChampionsPremierAnimator";
import ChampionsPremierFAQ from "@/components/ChampionsPremierFAQ";

export const metadata: Metadata = {
  title: "Champions Premier Program | Elite Soccer Training in Falls Church, VA",
  description:
    "Champions Premier is an elite soccer training program for committed U9-U18 players in the DMV area. Technical, tactical, physical, and mental development with NCAA and pro-level coaches.",
  alternates: {
    canonical: "https://www.championspremier.net/programs/champions-premier",
  },
  openGraph: {
    title: "Champions Premier Program | Elite Soccer Training in Falls Church, VA",
    description:
      "Elite soccer training for committed U9-U18 players. Technical, tactical, physical, and mental development.",
    url: "https://www.championspremier.net/programs/champions-premier",
    type: "website",
    images: [{ url: "/players/1.png", width: 1200, height: 630 }],
  },
};

const PLAYER_PHOTOS = [
  { src: "/players/1.png", rotate: -6, translateY: 10 },
  { src: "/players/2.png", rotate: 0, translateY: -10 },
  { src: "/players/3.png", rotate: 0, translateY: -10 },
  { src: "/players/4.png", rotate: 6, translateY: 10 },
];

const GRADIENT = "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)";

export default function ChampionsPremierProgramPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "80px" }}>
        <ChampionsPremierAnimator>
          {/* HERO */}
          <section style={{ position: "relative", overflow: "hidden", padding: "5rem 1.5rem 2rem" }}>
            <div
              style={{
                position: "absolute",
                top: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "500px",
                height: "500px",
                borderRadius: "50%",
                filter: "blur(100px)",
                background:
                  "radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(123, 184, 212, 0.05) 45%, transparent 70%)",
                pointerEvents: "none",
              }}
            />
            <div style={{ position: "relative", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
              <div
                data-cp-badge
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#fff",
                  background: GRADIENT,
                }}
              >
                Champions Premier
              </div>
              <h1
                data-cp-title
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                  fontWeight: 800,
                  lineHeight: 1.1,
                  marginTop: "1rem",
                  marginBottom: "1.5rem",
                  background: "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Elite Soccer Training for the Next Generation
              </h1>
              <p
                data-cp-intro
                style={{
                  fontSize: "1.125rem",
                  color: "#6b7280",
                  lineHeight: 1.7,
                  maxWidth: "720px",
                  margin: "0 auto",
                }}
              >
                Built for committed U9-U18 players in the DMV area. Our program develops
                players technically, tactically, physically, and mentally through
                small-sided games, film analysis, and personalized coaching from NCAA
                and professional-level coaches.
              </p>
            </div>
          </section>

          {/* PLAYER PHOTOS */}
          <section style={{ padding: "2rem 1.5rem 5rem" }}>
            <div
              style={{
                maxWidth: "1200px",
                margin: "0 auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "1rem",
                flexWrap: "wrap",
                perspective: "1200px",
              }}
            >
              {PLAYER_PHOTOS.map((photo, i) => (
                <div
                  key={photo.src}
                  data-cp-photo
                  data-cp-photo-rotate={photo.rotate}
                  style={{
                    position: "relative",
                    width: "clamp(180px, 22vw, 260px)",
                    aspectRatio: "3 / 4",
                    borderRadius: "18px",
                    transform: `rotate(${photo.rotate}deg) translateY(${photo.translateY}px)`,
                    transition: "transform 0.4s ease",
                    zIndex: i === 1 || i === 2 ? 2 : 1,
                  }}
                  className="hover:!rotate-0 hover:!translate-y-0"
                >
                  <Image
                    src={photo.src}
                    alt={`Champions Premier player ${i + 1}`}
                    fill
                    style={{ objectFit: "contain", objectPosition: "center bottom", height: "auto" }}
                    sizes="(max-width: 768px) 45vw, 260px"
                    priority={i < 2}
                  />
                </div>
              ))}
            </div>
          </section>

          <section data-cp-section style={{ padding: "5rem 1.5rem", borderTop: "1px solid #e5e7eb" }}>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "3rem",
                }}
              >
                {[
                  {
                    icon: Users,
                    title: "WHO WE ARE",
                    body:
                      "Champions Premier is a player development program created by players, for players. Our philosophy includes a technical, tactical, physical, and psychological approach.",
                  },
                  {
                    icon: Target,
                    title: "OUR MISSION",
                    body:
                      "Champions Premier's mission is to create world-class players on American soil — exposing parents and players with the foundation of all tools necessary to compete at the highest level.",
                  },
                  {
                    icon: Flag,
                    title: "OUR WAY",
                    body:
                      "Champions Premier is a club-agnostic training program that recruits top players around the area to an environment of European training and coaching methodologies.",
                  },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        padding: "0 1rem",
                      }}
                    >
                      <div
                        style={{
                          width: "72px",
                          height: "72px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginBottom: "1.5rem",
                        }}
                      >
                        <Icon size={56} strokeWidth={2} color="#111111" />
                      </div>
                      <h3
                        style={{
                          fontSize: "clamp(1.5rem, 2.5vw, 1.875rem)",
                          fontWeight: 900,
                          letterSpacing: "-0.01em",
                          marginBottom: "1rem",
                          background:
                            "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          backgroundClip: "text",
                        }}
                      >
                        {item.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "1rem",
                          color: "#6b7280",
                          lineHeight: 1.7,
                          maxWidth: "300px",
                        }}
                      >
                        {item.body}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <section
            data-cp-section
            style={{ padding: "5rem 1.5rem", borderTop: "1px solid #e5e7eb", background: "#f9fafb" }}
          >
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              <div style={{ textAlign: "center", marginBottom: "3rem" }}>
                <span
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#3b82f6",
                  }}
                >
                  General Schedule
                </span>
                <h2
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                    fontWeight: 900,
                    marginTop: "0.5rem",
                    background:
                      "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  Year-Round Development
                </h2>
                <p style={{ marginTop: "0.75rem", color: "#6b7280", fontSize: "1rem" }}>
                  Training adapts to the season so players get the right mix of field work and film study.
                </p>
              </div>

              {/* Weekly grid */}
              <div
                style={{
                  overflowX: "auto",
                  WebkitOverflowScrolling: "touch",
                  borderRadius: "16px",
                  marginLeft: "-0.5rem",
                  marginRight: "-0.5rem",
                  paddingLeft: "0.5rem",
                  paddingRight: "0.5rem",
                }}
                className="scrollbar-hide"
              >
                <div
                  style={{
                    background: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "16px",
                    overflow: "hidden",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
                    minWidth: "720px",
                  }}
                >
                {/* Day header row */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px repeat(7, 1fr)",
                    borderBottom: "1px solid #e5e7eb",
                    background: "#f9fafb",
                  }}
                >
                  <div />
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                    <div
                      key={day}
                      style={{
                        padding: "0.875rem 0.5rem",
                        textAlign: "center",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        color: "#6b7280",
                      }}
                    >
                      {day}
                    </div>
                  ))}
                </div>

                {/* Fall/Spring row */}
                {[
                  {
                    season: "Fall / Spring",
                    onField: [false, false, false, false, true, true, true],
                    virtual: [true, true, true, true, false, false, false],
                  },
                  {
                    season: "Winter / Summer",
                    onField: [true, true, true, true, true, false, false],
                    virtual: [true, true, true, true, false, false, false],
                  },
                ].map((row, rowIdx) => (
                  <div key={row.season}>
                    {/* Season label + on-field cells */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "140px repeat(7, 1fr)",
                        borderTop: rowIdx === 0 ? "none" : "1px solid #e5e7eb",
                      }}
                    >
                      <div
                        style={{
                          padding: "1rem",
                          fontSize: "0.95rem",
                          fontWeight: 800,
                          color: "var(--text)",
                          display: "flex",
                          alignItems: "center",
                          borderRight: "1px solid #e5e7eb",
                          background: "#fafbfc",
                        }}
                      >
                        {row.season}
                      </div>
                      {row.onField.map((active, i) => (
                        <div
                          key={`of-${rowIdx}-${i}`}
                          style={{
                            padding: "0.75rem 0.375rem",
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.375rem",
                            borderRight: i < 6 ? "1px solid #f3f4f6" : "none",
                          }}
                        >
                          {/* On-field pill */}
                          <div
                            style={{
                              height: "22px",
                              borderRadius: "6px",
                              background: active
                                ? "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)"
                                : "#f3f4f6",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              color: active ? "#fff" : "#d1d5db",
                              letterSpacing: "0.04em",
                            }}
                          >
                            {active ? "FIELD" : ""}
                          </div>
                          {/* Virtual pill */}
                          <div
                            style={{
                              height: "22px",
                              borderRadius: "6px",
                              background: row.virtual[i] ? "#eff6ff" : "#f9fafb",
                              border: row.virtual[i] ? "1px solid #bfdbfe" : "1px solid #f3f4f6",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "0.65rem",
                              fontWeight: 700,
                              color: row.virtual[i] ? "#3b82f6" : "#d1d5db",
                              letterSpacing: "0.04em",
                            }}
                          >
                            {row.virtual[i] ? "VIRTUAL" : ""}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                </div>
              </div>

              <p
                className="md:hidden"
                style={{
                  fontSize: "0.75rem",
                  color: "#9ca3af",
                  textAlign: "center",
                  marginTop: "0.75rem",
                  fontStyle: "italic",
                }}
              >
                ← swipe to see the full week →
              </p>

              {/* Legend */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "2rem",
                  marginTop: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
                  <div
                    style={{
                      width: "18px",
                      height: "12px",
                      borderRadius: "4px",
                      background: "linear-gradient(135deg, #7bb8d4 0%, #3b82f6 100%)",
                    }}
                  />
                  On-Field Training
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
                  <div
                    style={{
                      width: "18px",
                      height: "12px",
                      borderRadius: "4px",
                      background: "#eff6ff",
                      border: "1px solid #bfdbfe",
                    }}
                  />
                  Virtual Sessions
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <div data-cp-section>
            <ChampionsPremierFAQ />
          </div>

          {/* FINAL CTA */}
          <section data-cp-section style={{ padding: "4rem 1.5rem 6rem", borderTop: "1px solid #e5e7eb" }}>
            <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
              <h2 style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 800, color: "var(--text)", marginBottom: "1rem" }}>
                Ready to Join Champions Premier?
              </h2>
              <p style={{ fontSize: "1rem", color: "#6b7280", lineHeight: 1.7, marginBottom: "2rem" }}>
                Book a free evaluation and see how our program can develop your game.
              </p>
              <a
                href="https://championspremier.pushpress.com/landing/plans/plan_0j80vu490n01mu/login"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "1rem 2.5rem",
                  borderRadius: "8px",
                  background: GRADIENT,
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  textDecoration: "none",
                }}
              >
                FREE EVALUATION
              </a>
            </div>
          </section>
        </ChampionsPremierAnimator>
      </main>
      <Footer />
    </>
  );
}
