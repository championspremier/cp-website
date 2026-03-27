"use client";

import { LocationCard } from "@/components/ui/location-card";

const locations = [
  {
    name: "Falls Church",
    address: "300 Hillwood Ave, Falls Church, VA 22046",
    image: "/locations/falls-church.png",
    href: "https://maps.google.com/?q=300+Hillwood+Ave+Falls+Church+VA+22046",
    buttonLabel: "Directions",
  },
  {
    name: "Greg Home Gym",
    address: "2291 Dosinia Ct, Reston, VA",
    image: "/locations/greg-gym.png",
    href: "https://maps.google.com/?q=2291+Dosinia+Ct+Reston+VA",
    buttonLabel: "Directions",
  },
  {
    name: "Great Falls",
    address: "1400 Lake Fairfax Dr, Reston, VA 20190",
    image: "/locations/great-falls.png",
    href: "https://maps.google.com/?q=1400+Lake+Fairfax+Dr+Reston+VA+20190",
    buttonLabel: "Directions",
  },
  {
    name: "Zoom",
    address: "The Virtual Program",
    image: "/locations/zoom.png",
    href: "#",
    buttonLabel: "More Info",
  },
];

export default function LocationsSection() {
  return (
    <section style={{ background: "var(--bg)", position: "relative", zIndex: 20, padding: "0 0 60px 0" }}>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div className="flex flex-col md:flex-row justify-center gap-6 flex-wrap">
          {locations.map((loc) => (
            <div
              key={loc.name}
              className="w-full md:w-[calc(25%-18px)] md:max-w-[280px] h-[440px]"
            >
              <LocationCard
                imageUrl={loc.image}
                location={loc.name}
                country={loc.address}
                href={loc.href}
                className="w-full max-w-none h-full"
                buttonLabel={loc.buttonLabel}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
