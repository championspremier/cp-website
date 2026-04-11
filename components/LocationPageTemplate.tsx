"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ExpandingCards } from "@/components/ui/expanding-cards";

interface LocationPageTemplateProps {
  name: string;
  city: string;
  state: string;
  fullAddress: string;
  zip?: string;
  mapsQuery: string;
  image: string;
  description: string;
  nearbyCities?: string[];
  isVirtual?: boolean;
}

const GRADIENT =
  "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)";

const PROGRAMS = [
  {
    title: "Technical",
    description:
      "Our Speed Training and Tec Tacs sessions emphasize the opposed and unopposed ball work and running technique needed to become a top footballer.",
    image: "/ttpm/technical.png",
  },
  {
    title: "Tactical",
    description:
      "Our Tec Tacs (on-field training), Champions Player Progress, and Group Film Analysis sessions develop game IQ and tactical awareness across all aspects of play.",
    image: "/ttpm/tactical.png",
  },
  {
    title: "Physical",
    description:
      "Greg Petrosian brings extensive experience training Olympians and has won 3 MLS Cups with DC United. Our S&C and Speed sessions cover the physical side of football.",
    image: "/ttpm/physical.png",
  },
  {
    title: "Mental",
    description:
      "Our virtual sessions deliver the final piece of development through Pro Player Stories, Champions Player Progress, Group Film Analysis, and College Advising.",
    image: "/ttpm/mental.png",
  },
];

export default function LocationPageTemplate({
  name,
  city,
  state,
  fullAddress,
  mapsQuery,
  image,
  description,
  nearbyCities = [],
  isVirtual = false,
}: LocationPageTemplateProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const ctx = gsap.context(() => {
      const hero = wrapper.querySelector("[data-loc-hero]");
      if (hero) {
        gsap.from(hero, {
          opacity: 0,
          scale: 1.05,
          duration: 1.2,
          ease: "power3.out",
        });
      }

      const title = wrapper.querySelector("[data-loc-title]");
      if (title) {
        gsap.from(title, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.3,
        });
      }

      const subtitle = wrapper.querySelector("[data-loc-subtitle]");
      if (subtitle) {
        gsap.from(subtitle, {
          opacity: 0,
          y: 20,
          duration: 0.7,
          ease: "power2.out",
          delay: 0.5,
        });
      }

      const sections = wrapper.querySelectorAll("[data-loc-section]");
      if (sections.length > 0) {
        gsap.from(sections, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          stagger: 0.15,
          delay: 0.7,
        });
      }
    }, wrapper);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapperRef}>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "80px" }}>
        {/* Hero image */}
        <div
          data-loc-hero
          style={{
            width: "100%",
            height: "45vh",
            position: "relative",
            backgroundColor: "#e5e7eb",
            overflow: "hidden",
          }}
        >
          <Image
            src={image}
            alt={`${name} - Champions Premier training location`}
            fill
            style={{ objectFit: "cover", objectPosition: "center" }}
            priority
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4) 100%)",
            }}
          />
        </div>

        {/* Content */}
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "3rem 1.5rem 6rem" }}>
          {/* Back link */}
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              color: "#3b82f6",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: "2rem",
              textDecoration: "none",
            }}
          >
            ← Back to Home
          </Link>

          {/* Title */}
          <h1
            data-loc-title
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              fontWeight: 900,
              color: "var(--text)",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            Soccer Training in {city}, {state}
          </h1>

          {/* Subtitle / description */}
          <p
            data-loc-subtitle
            style={{
              fontSize: "1.125rem",
              color: "#6b7280",
              lineHeight: 1.7,
              marginBottom: "3rem",
              maxWidth: "720px",
            }}
          >
            {description}
          </p>

          {/* Address card */}
          {!isVirtual && (
            <section
              data-loc-section
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: "16px",
                padding: "2rem",
                marginBottom: "3rem",
                boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--text)",
                  marginBottom: "1rem",
                }}
              >
                Training Location
              </h2>
              <p style={{ fontSize: "1rem", color: "#4b5563", marginBottom: "1.5rem", lineHeight: 1.6 }}>
                {fullAddress}
              </p>
              <a
                href={`https://maps.google.com/?q=${mapsQuery}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "0.875rem 1.75rem",
                  borderRadius: "8px",
                  background: GRADIENT,
                  color: "#fff",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                }}
              >
                Get Directions
              </a>
            </section>
          )}

          {/* Embedded Google Map */}
          {!isVirtual && (
            <section
              data-loc-section
              style={{
                marginBottom: "3rem",
                borderRadius: "16px",
                overflow: "hidden",
                border: "1px solid #e5e7eb",
              }}
            >
              <iframe
                src={`https://www.google.com/maps?q=${mapsQuery}&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Map of ${name}`}
              />
            </section>
          )}

          {/* Programs offered */}
          <section data-loc-section style={{ marginBottom: "3rem" }}>
            <h2
              style={{
                fontSize: "1.75rem",
                fontWeight: 800,
                color: "var(--text)",
                marginBottom: "1.5rem",
              }}
            >
              What We Offer at {name}
            </h2>
            <ExpandingCards
              cards={PROGRAMS}
              gap="gap-3 md:gap-5"
              height="h-[350px] md:h-[450px]"
              classNames={{
                container: "rounded-xl",
                card: "rounded-xl",
                title: "font-extrabold tracking-wide truncate",
                description: "font-medium text-gray-200",
                button: "bg-black/40 hover:bg-black/60",
                buttonIcon: "text-white",
              }}
              breakpoints={[
                {
                  maxWidth: 640,
                  activeWidth: 250,
                  inactiveWidth: 120,
                  titleActive: "22px",
                  titleInactive: "16px",
                },
                {
                  maxWidth: 768,
                  activeWidth: 300,
                  inactiveWidth: 180,
                  titleActive: "24px",
                  titleInactive: "18px",
                },
              ]}
              transitionDuration={0.4}
            />
          </section>

          {/* Nearby cities served */}
          {nearbyCities.length > 0 && (
            <section
              data-loc-section
              style={{
                marginBottom: "3rem",
                padding: "2rem",
                background: "#f9fafb",
                borderRadius: "16px",
                border: "1px solid #e5e7eb",
              }}
            >
              <h2
                style={{
                  fontSize: "1.25rem",
                  fontWeight: 800,
                  color: "var(--text)",
                  marginBottom: "0.75rem",
                }}
              >
                Serving the Greater DMV Area
              </h2>
              <p style={{ fontSize: "1rem", color: "#4b5563", lineHeight: 1.7 }}>
                Our {city} training location welcomes players from {nearbyCities.join(", ")}, and the surrounding
                Northern Virginia and DMV region.
              </p>
            </section>
          )}

          {/* CTA */}
          <section
            data-loc-section
            style={{
              textAlign: "center",
              padding: "3rem 2rem",
              background: GRADIENT,
              borderRadius: "16px",
              color: "#fff",
            }}
          >
            <h2 style={{ fontSize: "1.75rem", fontWeight: 800, marginBottom: "0.75rem" }}>
              Ready to Get Started?
            </h2>
            <p style={{ fontSize: "1rem", marginBottom: "2rem", opacity: 0.95 }}>
              Book a free evaluation and see how Champions Premier can help develop your game.
            </p>
            <a
              href="https://championspremier.pushpress.com/landing/plans/plan_0j80vu490n01mu/login"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "1rem 2.5rem",
                borderRadius: "8px",
                background: "#fff",
                color: "#3b82f6",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
              }}
            >
              FREE EVALUATION
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
