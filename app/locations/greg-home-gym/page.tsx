import type { Metadata } from "next";
import LocationPageTemplate from "@/components/LocationPageTemplate";

export const metadata: Metadata = {
  title: "S&C Soccer Training in Reston, VA | Champions Premier",
  description:
    "Strength and conditioning training with Champions Premier in Reston, VA. Work with one of the DMV's top S&C coaches.",
  alternates: {
    canonical: "https://www.championspremier.net/locations/greg-home-gym",
  },
  openGraph: {
    title: "S&C Soccer Training in Reston, VA | Champions Premier",
    description: "Strength and conditioning training in Reston, VA.",
    url: "https://www.championspremier.net/locations/greg-home-gym",
    type: "website",
    images: [{ url: "/locations/greg-gym.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": "https://www.championspremier.net/locations/greg-home-gym",
  name: "Champions Premier - Greg's Home Gym",
  description:
    "Strength and conditioning training location in Reston, VA with one of the DMV's top S&C coaches.",
  url: "https://www.championspremier.net/locations/greg-home-gym",
  telephone: "+1-571-240-4047",
  email: "support@championspremier.net",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2291 Dosinia Ct",
    addressLocality: "Reston",
    addressRegion: "VA",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.9586,
    longitude: -77.357,
  },
  areaServed: [
    { "@type": "City", name: "Reston" },
    { "@type": "City", name: "Herndon" },
    { "@type": "City", name: "Great Falls" },
    { "@type": "City", name: "Sterling" },
    { "@type": "City", name: "Vienna" },
  ],
  sport: "Soccer",
};

export default function GregHomeGymPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationPageTemplate
        name="Greg's Home Gym"
        city="Reston"
        state="VA"
        fullAddress="2291 Dosinia Ct, Reston, VA"
        mapsQuery="2291+Dosinia+Ct+Reston+VA"
        image="/locations/greg-gym.png"
        description="Our Reston strength and conditioning location is run by one of the top S&C coaches in the DMV area. Players work on the physical foundations that support elite-level soccer development: explosive strength, injury prevention, and football-specific conditioning."
        nearbyCities={["Herndon", "Great Falls", "Sterling", "Vienna"]}
      />
    </>
  );
}
