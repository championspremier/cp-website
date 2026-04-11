import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Contact | Champions Premier",
  description:
    "Contact Champions Premier. Our dedicated contact page is coming soon. In the meantime, learn about our elite soccer training program in Falls Church, VA.",
  alternates: {
    canonical: "https://www.championspremier.net/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main
        style={{
          background: "var(--bg)",
          minHeight: "100vh",
          paddingTop: "100px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <section
          style={{
            position: "relative",
            maxWidth: "720px",
            margin: "0 auto",
            padding: "6rem 1.5rem",
            textAlign: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "500px",
              height: "500px",
              borderRadius: "50%",
              filter: "blur(120px)",
              background:
                "radial-gradient(circle, rgba(59, 130, 246, 0.18) 0%, rgba(123, 184, 212, 0.06) 45%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div
              style={{
                display: "inline-block",
                padding: "0.25rem 0.75rem",
                borderRadius: "8px",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "#fff",
                background:
                  "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)",
                marginBottom: "1.25rem",
              }}
            >
              Contact
            </div>
            <h1
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                fontWeight: 900,
                lineHeight: 1.1,
                marginBottom: "1.25rem",
                background:
                  "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Page Coming Soon
            </h1>
            <p
              style={{
                fontSize: "1.125rem",
                color: "#6b7280",
                lineHeight: 1.7,
                maxWidth: "520px",
                margin: "0 auto 2.5rem",
              }}
            >
              Our dedicated contact page is on the way. In the meantime, learn more
              about the Champions Premier program and book a free evaluation.
            </p>
            <Link
              href="/programs/champions-premier"
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
              Learn About Our Program
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
