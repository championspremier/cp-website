import type { Metadata } from "next";
import LocationPageTemplate from "@/components/LocationPageTemplate";

export const metadata: Metadata = {
  title: "Soccer Training in Falls Church, VA | Champions Premier",
  description:
    "Champions Premier soccer training in Falls Church, VA. Elite player development for U12-U18. Serving McLean, Arlington, Vienna, Bethesda, and the greater DMV area.",
  alternates: {
    canonical: "https://www.championspremier.net/locations/falls-church",
  },
  openGraph: {
    title: "Soccer Training in Falls Church, VA | Champions Premier",
    description:
      "Elite soccer training and player development in Falls Church, VA. Book a free evaluation today.",
    url: "https://www.championspremier.net/locations/falls-church",
    type: "website",
    images: [{ url: "/locations/falls-church.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": "https://www.championspremier.net/locations/falls-church",
  name: "Champions Premier - Falls Church",
  description:
    "Elite soccer training program in Falls Church, VA for players entering the 11v11 phase (U12-U18).",
  url: "https://www.championspremier.net/locations/falls-church",
  telephone: "+1-571-240-4047",
  email: "support@championspremier.net",
  address: {
    "@type": "PostalAddress",
    streetAddress: "300 Hillwood Ave",
    addressLocality: "Falls Church",
    addressRegion: "VA",
    postalCode: "22046",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 38.8823,
    longitude: -77.1711,
  },
  areaServed: [
    { "@type": "City", name: "Falls Church" },
    { "@type": "City", name: "McLean" },
    { "@type": "City", name: "Arlington" },
    { "@type": "City", name: "Vienna" },
    { "@type": "City", name: "Bethesda" },
    { "@type": "City", name: "Alexandria" },
    { "@type": "City", name: "Woodbridge" },
    { "@type": "City", name: "Fairfax" },
  ],
  sport: "Soccer",
};

export default function FallsChurchPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationPageTemplate
        name="Falls Church"
        city="Falls Church"
        state="VA"
        fullAddress="300 Hillwood Ave, Falls Church, VA 22046"
        zip="22046"
        mapsQuery="300+Hillwood+Ave+Falls+Church+VA+22046"
        image="/locations/falls-church.png"
        description="Our Falls Church training location is the home base of Champions Premier. Located at 300 Hillwood Ave, this is where top players from across Northern Virginia come together to develop technically, tactically, physically, and mentally. Sessions run year-round with programs for players entering the 11v11 phase (U12-U18)."
        nearbyCities={["McLean", "Arlington", "Vienna", "Bethesda", "Alexandria", "Woodbridge", "Fairfax"]}
      />
    </>
  );
}
