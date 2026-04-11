import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AboutPageAnimator from "@/components/AboutPageAnimator";

export const metadata: Metadata = {
  title: "About Stanley Alves & Champions Premier | Soccer Training in Falls Church, VA",
  description:
    "Meet Stanley Alves, founder of Champions Premier. Former pro footballer with experience across NCAA Division I, II, Portuguese pro football, the New England Revolution (MLS), Richmond Kickers, and Loudoun United.",
  alternates: {
    canonical: "https://www.championspremier.net/about",
  },
  openGraph: {
    title: "About Stanley Alves & Champions Premier",
    description:
      "Meet the founder of Champions Premier and learn how his professional playing experience shapes our elite soccer training program in the DMV.",
    url: "https://www.championspremier.net/about",
    type: "profile",
    images: [{ url: "/coaches/stanpro2.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Stanley Alves & Champions Premier",
    description:
      "Meet the founder of Champions Premier. Former pro footballer with NCAA DI, Portuguese pro, and MLS experience.",
    images: ["/coaches/stanpro2.png"],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://www.championspremier.net/about#stanley-alves",
  name: "Stanley Alves",
  jobTitle: "Founder & Head Coach",
  worksFor: {
    "@type": "Organization",
    name: "Champions Premier",
    url: "https://www.championspremier.net",
  },
  image: "https://www.championspremier.net/coaches/stanpro2.png",
  description:
    "Founder of Champions Premier. Former professional footballer with experience across NCAA Division I, II, Portuguese pro football, the New England Revolution (MLS), Richmond Kickers, and Loudoun United.",
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "Southern New Hampshire University" },
    { "@type": "CollegeOrUniversity", name: "Dean College" },
    { "@type": "CollegeOrUniversity", name: "UMass Lowell" },
  ],
  sameAs: ["https://www.instagram.com/stan.alves9/"],
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "80px" }}>
        <AboutPageAnimator>
          {/* Hero section */}
          <section
            style={{
              position: "relative",
              overflow: "hidden",
              padding: "5rem 1.5rem 3rem",
            }}
          >
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
            <div
              style={{
                position: "relative",
                maxWidth: "900px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <div
                data-about-badge
                style={{
                  display: "inline-block",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "#fff",
                  background:
                    "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)",
                }}
              >
                About Champions Premier
              </div>
              <h1
                data-about-title
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                  fontWeight: 800,
                  color: "var(--text)",
                  lineHeight: 1.15,
                  marginTop: "1rem",
                  marginBottom: "1.5rem",
                }}
              >
                Built by a Pro. Designed for the Next Generation.
              </h1>
              <p
                data-about-intro
                style={{
                  fontSize: "1.125rem",
                  color: "#6b7280",
                  lineHeight: 1.7,
                  maxWidth: "720px",
                  margin: "0 auto",
                }}
              >
                Champions Premier is an elite soccer training program in Falls Church, VA,
                founded by former professional footballer Stanley Alves. We develop
                well-rounded players technically, tactically, physically, and mentally —
                serving players across the greater DMV area entering the 11v11 phase (U12-U18).
              </p>
            </div>
          </section>

          {/* Stanley Alves feature section */}
          <section style={{ padding: "3rem 1.5rem 6rem" }}>
            <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
              {/* Three angled photos row */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  flexWrap: "wrap",
                  marginBottom: "4rem",
                  perspective: "1200px",
                }}
              >
                {[
                  { src: "/coaches/stanpro1.png", rotate: -6, translateY: 10 },
                  { src: "/coaches/stanpro2.png", rotate: 0, translateY: -10 },
                  { src: "/coaches/stanpro3.png", rotate: 6, translateY: 10 },
                ].map((photo, i) => (
                  <div
                    key={photo.src}
                    data-about-photo
                    data-about-photo-rotate={photo.rotate}
                    style={{
                      position: "relative",
                      width: "clamp(200px, 28vw, 300px)",
                      aspectRatio: "3 / 4",
                      borderRadius: "18px",
                      transform: `rotate(${photo.rotate}deg) translateY(${photo.translateY}px)`,
                      transition: "transform 0.4s ease",
                      zIndex: i === 1 ? 2 : 1,
                    }}
                    className="hover:!rotate-0 hover:!translate-y-0"
                  >
                    <Image
                      src={photo.src}
                      alt={`Stanley Alves action shot ${i + 1}`}
                      fill
                      style={{ objectFit: "cover", objectPosition: "center", height: "auto" }}
                      sizes="(max-width: 768px) 80vw, 300px"
                      priority={i === 1}
                    />
                  </div>
                ))}
              </div>

              {/* Bio content */}
              <div style={{ maxWidth: "760px", margin: "0 auto" }}>
                <span
                  data-about-bio-label
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.12em",
                    color: "#3b82f6",
                  }}
                >
                  Founder & Head Coach
                </span>
                <h2
                  data-about-bio-heading
                  style={{
                    fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                    fontWeight: 800,
                    color: "var(--text)",
                    lineHeight: 1.15,
                    marginTop: "0.5rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  Stanley Alves
                </h2>
                <div
                  data-about-bio-body
                  style={{ color: "#4b5563", fontSize: "1rem", lineHeight: 1.8 }}
                >
                  <p style={{ marginBottom: "1.25rem" }}>
                    Coach Stanley&apos;s soccer journey is a testament to his perseverance and
                    skill. His collegiate career showcased remarkable adaptability, starting
                    at Southern New Hampshire University (NCAA Division II), transitioning to
                    Dean College (NJCAA), and culminating at UMass Lowell (NCAA Division I).
                  </p>
                  <p style={{ marginBottom: "1.25rem" }}>
                    Post-college, Stanley&apos;s talent continued to shine in Portugal with
                    Sertanense F.C., Sacavenense, and Sintrense — all in the third and second
                    divisions of Portugal at that time. In 2019, he trained and played with
                    both the first and second teams of the New England Revolution, an MLS club.
                  </p>
                  <p style={{ marginBottom: "1.25rem" }}>
                    The following year, he signed with Richmond Kickers in USL League One.
                    His prowess on the field was further recognized in 2022 when he received
                    a contract offer from Loudoun United of the USL Championship.
                  </p>
                  <p>
                    This diverse experience across every competitive level gives Coach Stanley
                    a unique perspective, making him an invaluable asset to Champions Premier&apos;s
                    coaching staff and a living example of the continuous improvement and
                    resilience we aim to instill in every player we train.
                  </p>
                </div>

                <div
                  data-about-bio-cta
                  style={{
                    marginTop: "2rem",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "1rem",
                    alignItems: "center",
                  }}
                >
                  <a
                    href="https://www.instagram.com/stan.alves9/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.25rem",
                      borderRadius: "8px",
                      border: "1px solid #e5e7eb",
                      color: "var(--text)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Follow Stanley on Instagram
                  </a>
                  <Link
                    href="/#coaches"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.75rem 1.25rem",
                      borderRadius: "8px",
                      background:
                        "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)",
                      color: "#fff",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      textDecoration: "none",
                    }}
                  >
                    Meet the Full Coaching Staff
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* CTA section */}
          <section
            data-about-final-cta
            style={{
              padding: "4rem 1.5rem 6rem",
              borderTop: "1px solid #e5e7eb",
            }}
          >
            <div
              style={{
                maxWidth: "720px",
                margin: "0 auto",
                textAlign: "center",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  fontWeight: 800,
                  color: "var(--text)",
                  marginBottom: "1rem",
                }}
              >
                Train with Champions Premier
              </h2>
              <p
                style={{
                  fontSize: "1rem",
                  color: "#6b7280",
                  lineHeight: 1.7,
                  marginBottom: "2rem",
                }}
              >
                Book a free evaluation and see how our coaching philosophy can help develop
                your game.
              </p>
              <a
                href="https://championspremier.pushpress.com/landing/plans/plan_0j80vu490n01mu/login"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "1rem 2.5rem",
                  borderRadius: "8px",
                  background:
                    "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)",
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
        </AboutPageAnimator>
      </main>
      <Footer />
    </>
  );
}
