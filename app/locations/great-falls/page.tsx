import type { Metadata } from "next";
import LocationPageTemplate from "@/components/LocationPageTemplate";

export const metadata: Metadata = {
  title: "Soccer Training at Lake Fairfax, Reston VA | Champions Premier",
  description:
    "Champions Premier soccer training at Lake Fairfax in Reston, VA. Outdoor sessions for U12-U18 players serving Great Falls, McLean, and Northern Virginia.",
  alternates: {
    canonical: "https://www.championspremier.net/locations/great-falls",
  },
  openGraph: {
    title: "Soccer Training at Lake Fairfax, Reston VA | Champions Premier",
    description: "Outdoor soccer training at Lake Fairfax in Reston, VA.",
    url: "https://www.championspremier.net/locations/great-falls",
    type: "website",
    images: [{ url: "/locations/great-falls.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": "https://www.championspremier.net/locations/great-falls",
  name: "Champions Premier - Lake Fairfax",
  description:
    "Outdoor soccer training location at Lake Fairfax in Reston, VA, serving Great Falls and Northern Virginia players.",
  url: "https://www.championspremier.net/locations/great-falls",
  telephone: "+1-571-240-4047",
  email: "support@championspremier.net",
  address: {
    "@type": "PostalAddress",
    streetAddress: "1400 Lake Fairfax Dr",
    addressLocality: "Reston",
    addressRegion: "VA",
    postalCode: "20190",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.9629,
    longitude: -77.3362,
  },
  areaServed: [
    { "@type": "City", name: "Great Falls" },
    { "@type": "City", name: "Reston" },
    { "@type": "City", name: "McLean" },
    { "@type": "City", name: "Herndon" },
    { "@type": "City", name: "Vienna" },
    { "@type": "City", name: "Sterling" },
  ],
  sport: "Soccer",
};

export default function GreatFallsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationPageTemplate
        name="Lake Fairfax (Great Falls)"
        city="Reston"
        state="VA"
        fullAddress="1400 Lake Fairfax Dr, Reston, VA 20190"
        zip="20190"
        mapsQuery="1400+Lake+Fairfax+Dr+Reston+VA+20190"
        image="/locations/great-falls.png"
        description="Our Lake Fairfax training location serves players from Great Falls, Reston, McLean, and the surrounding Northern Virginia area. Outdoor sessions take place in the heart of Lake Fairfax Park — an ideal environment for technical, tactical, and small-sided game development."
        nearbyCities={["Great Falls", "McLean", "Herndon", "Vienna", "Sterling"]}
      />
    </>
  );
}
