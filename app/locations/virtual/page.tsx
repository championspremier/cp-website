import type { Metadata } from "next";
import LocationPageTemplate from "@/components/LocationPageTemplate";

export const metadata: Metadata = {
  title: "Virtual Soccer Training Program | Champions Premier",
  description:
    "Champions Premier virtual soccer training via Zoom. Film analysis, 1-on-1 development sessions, and personalized game IQ coaching from anywhere.",
  alternates: {
    canonical: "https://www.championspremier.net/locations/virtual",
  },
  openGraph: {
    title: "Virtual Soccer Training Program | Champions Premier",
    description:
      "Online soccer development via Zoom — film analysis, 1-on-1 sessions, and personalized game IQ coaching.",
    url: "https://www.championspremier.net/locations/virtual",
    type: "website",
    images: [{ url: "/locations/zoom.png", width: 1200, height: 630 }],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": "https://www.championspremier.net/locations/virtual",
  name: "Champions Premier Virtual Program",
  description:
    "Online soccer training and film analysis program available anywhere via Zoom.",
  provider: {
    "@type": "Organization",
    name: "Champions Premier",
    url: "https://www.championspremier.net",
    telephone: "+1-571-240-4047",
    email: "support@championspremier.net",
  },
  serviceType: "Online Soccer Training",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
};

export default function VirtualPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LocationPageTemplate
        name="Virtual Program"
        city="Virtual"
        state="Anywhere"
        fullAddress=""
        mapsQuery=""
        image="/locations/zoom.png"
        description="Our Virtual Program brings Champions Premier coaching directly to players anywhere in the country via Zoom. Through film analysis and personalized 1-on-1 sessions, we help players develop game IQ, decision-making, and football intelligence from the comfort of home. Built around one core idea: adopting a third-person perspective during analysis helps players make decisions that progress the game."
        isVirtual={true}
      />
    </>
  );
}
