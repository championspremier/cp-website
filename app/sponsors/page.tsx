import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SponsorMarquee from "@/components/SponsorMarquee";
import ExposureStats from "@/components/ExposureStats";
import SponsorTimeline from "@/components/SponsorTimeline";

export const metadata: Metadata = {
  title: "Sponsors | Champions Premier",
  description:
    "Partner with Champions Premier to support the next generation of footballers in the DMV area. Reach our community through app users, email subscribers, social media, and more.",
  alternates: {
    canonical: "https://www.championspremier.net/sponsors",
  },
  openGraph: {
    title: "Sponsors | Champions Premier",
    description:
      "Partner with Champions Premier to support the next generation of footballers in the DMV area.",
    url: "https://www.championspremier.net/sponsors",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsors | Champions Premier",
    description:
      "Partner with Champions Premier to support the next generation of footballers.",
  },
};

export default function SponsorsPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "100px" }}>
        {/* Page header */}
        <section
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "4rem 1.5rem 2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 900,
              color: "var(--text)",
              marginBottom: "1rem",
            }}
          >
            OUR SPONSORS
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              maxWidth: "600px",
              margin: "0 auto",
            }}
          >
            Champions Premier is proud to partner with organizations that share our vision for
            developing the next generation of footballers.
          </p>
        </section>

        {/* Current sponsors - marquee */}
        <SponsorMarquee />

        <ExposureStats />

        {/* Become a sponsor - timeline */}
        <SponsorTimeline />

        {/* Notion form embed */}
        <section id="sponsor-form" style={{ maxWidth: "900px", margin: "0 auto", padding: "2rem 1.5rem 6rem" }}>
          {/* Desktop: embedded iframe */}
          <div
            className="hidden md:block"
            style={{
              width: "100%",
              height: "900px",
              borderRadius: "12px",
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              background: "#fff",
            }}
          >
            <iframe
              src="https://diligent-leopon-3f5.notion.site/ebd/33c7b18e73c28017abd1d372814c71fb"
              width="100%"
              height="100%"
              frameBorder={0}
              title="Sponsor Inquiry Form"
              style={{ border: "none" }}
              allowFullScreen
            />
          </div>

          {/* Mobile: CTA button that opens Notion in new tab */}
          <div
            className="md:hidden"
            style={{
              width: "100%",
              padding: "3rem 1.5rem",
              borderRadius: "16px",
              border: "1px solid #e5e7eb",
              background: "#fff",
              textAlign: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 800,
                color: "var(--text)",
                marginBottom: "0.75rem",
              }}
            >
              Sponsor Inquiry Form
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "#6b7280",
                lineHeight: 1.6,
                marginBottom: "1.75rem",
              }}
            >
              Tap below to open our sponsor inquiry form. Submissions go directly to our team and we&apos;ll be in touch soon.
            </p>
            <a
              href="https://diligent-leopon-3f5.notion.site/33c7b18e73c28017abd1d372814c71fb"
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
              Open Sponsor Form →
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
