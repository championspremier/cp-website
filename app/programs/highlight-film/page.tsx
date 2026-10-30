import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HighlightFilmSteps from "@/components/HighlightFilmSteps";
import { PLANS, CHOOSE_PLAN_STEP } from "@/data/highlight-film";

const PAGE_URL = "https://www.championspremier.net/programs/highlight-film";
const TITLE = "Create Your Soccer Highlight Film | Champions Premier";
const DESCRIPTION =
  "Get a professional soccer highlight reel built to get you noticed by college coaches and scouts. Choose the Champion plan (highlight reel from your clips) or the Pro plan (highlight reel from your game timestamps).";

export const metadata: Metadata = {
  title: "Create Your Soccer Highlight Film",
  description: DESCRIPTION,
  keywords: [
    "soccer highlight film",
    "soccer highlight video",
    "soccer highlight reel",
    "college soccer recruiting video",
    "soccer recruiting highlight reel",
    "youth soccer highlight video DMV",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: PAGE_URL,
    type: "website",
    images: [{ url: "/players/1.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

const toTitleCase = (s: string) =>
  (s.charAt(0) + s.slice(1).toLowerCase()).replace("google doc", "Google Doc");

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Service",
      name: "Soccer Highlight Film",
      serviceType: "Soccer recruiting highlight reel editing",
      description: DESCRIPTION,
      url: PAGE_URL,
      provider: { "@type": "SportsActivityLocation", name: "Champions Premier", url: "https://www.championspremier.net" },
      areaServed: "US",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Highlight Film Plans",
        itemListElement: PLANS.map((plan) => ({
          "@type": "Offer",
          name: `${plan.name} – ${plan.tagline}`,
          url: plan.purchaseUrl,
        })),
      },
    },
    ...PLANS.map((plan) => ({
      "@type": "HowTo",
      name: `How to create your soccer highlight film with the ${plan.name} plan (${plan.tagline})`,
      step: [CHOOSE_PLAN_STEP, ...plan.steps].map((s, i) => ({
        "@type": "HowToStep",
        position: i + 1,
        name: toTitleCase(s.heading),
        text: s.items ? `${s.text} ${s.items.join(", ")}.` : s.text,
      })),
    })),
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.championspremier.net" },
        { "@type": "ListItem", position: 2, name: "Programs", item: "https://www.championspremier.net/programs/champions-premier" },
        { "@type": "ListItem", position: 3, name: "Create Your Highlight Film", item: PAGE_URL },
      ],
    },
  ],
};

export default function HighlightFilmPage() {
  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "100px" }}>
        <section style={{ maxWidth: "1200px", margin: "0 auto", padding: "4rem 1.5rem 2rem", textAlign: "center" }}>
          <h1
            style={{
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 900,
              color: "var(--text)",
              marginBottom: "1rem",
              textTransform: "uppercase",
            }}
          >
            Create Your Highlight Film
          </h1>
          <p style={{ fontSize: "1.125rem", color: "#6b7280", maxWidth: "640px", margin: "0 auto" }}>
            A professional soccer highlight reel built to get you noticed by college coaches and scouts. Choose
            your plan, send us your info, and we&apos;ll take care of the rest.
          </p>
        </section>

        <HighlightFilmSteps />

        <div style={{ height: "4rem" }} />
      </main>
      <Footer />
    </>
  );
}
