import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.championspremier.net"),
  title: {
    default: "Champions Premier | Soccer Training in Falls Church, VA | DMV",
    template: "%s | Champions Premier",
  },
  description:
    "Champions Premier is an elite soccer training program in Falls Church, VA for players entering the 11v11 phase (U12-U18). Serving the greater DMV area.",
  keywords: [
    "soccer training Falls Church",
    "soccer academy Northern Virginia",
    "youth soccer DMV",
    "Champions Premier",
    "soccer training near me",
    "private soccer training",
  ],
  authors: [{ name: "Champions Premier" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.championspremier.net",
    siteName: "Champions Premier",
    title: "Champions Premier | Soccer Training in Falls Church, VA",
    description:
      "Elite soccer training program in Falls Church, VA for U12-U18 players. Serving the greater DMV area.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Champions Premier Soccer Training",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Champions Premier | Soccer Training in Falls Church, VA",
    description:
      "Elite soccer training program in Falls Church, VA for U12-U18 players.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": "https://www.championspremier.net/#organization",
  name: "Champions Premier",
  legalName: "Champions Premier LLC",
  description:
    "Elite soccer training program in Falls Church, VA for players entering the 11v11 phase (U12-U18).",
  url: "https://www.championspremier.net",
  image: "https://www.championspremier.net/og-image.png",
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
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "16:00",
      closes: "20:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Saturday", "Sunday"],
      opens: "09:00",
      closes: "14:00",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Falls Church" },
    { "@type": "City", name: "McLean" },
    { "@type": "City", name: "Arlington" },
    { "@type": "City", name: "Vienna" },
    { "@type": "City", name: "Bethesda" },
    { "@type": "City", name: "Alexandria" },
    { "@type": "City", name: "Woodbridge" },
    { "@type": "City", name: "Fairfax" },
    { "@type": "City", name: "Sterling" },
    { "@type": "City", name: "Chantilly" },
    { "@type": "City", name: "Ashburn" },
    { "@type": "City", name: "Springfield" },
    { "@type": "City", name: "Great Falls" },
    { "@type": "City", name: "Reston" },
  ],
  sport: "Soccer",
  priceRange: "$$",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: "13",
    bestRating: "5",
    worstRating: "1",
  },
  sameAs: [
    "https://www.instagram.com/championspfooty",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
