"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

const SPONSORS = [
  { name: "sponsor1", logo: "/sponsors/sponsor1.png", href: "https://npcm.llc/" },
  { name: "sponsor2", logo: "/sponsors/sponsor2.png", href: "https://rscleaners.com/" },
  {
    name: "sponsor3",
    logo: "/sponsors/sponsor3.png",
    href: "https://www.dreamvacations.com/home-page",
  },
  { name: "sponsor4", logo: "/sponsors/sponsor4.png", href: "https://www.pessotepro.com/" },
  { name: "sponsor5", logo: "/sponsors/sponsor5.png", href: "https://homegrown-app.com/" },
];

export default function SponsorMarquee() {
  return (
    <section style={{ background: "var(--bg)", padding: "50px 0", position: "relative", zIndex: 20 }}>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:25s] [--gap:3rem]">
          {SPONSORS.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative shrink-0 flex items-center justify-center cursor-pointer transition-transform hover:scale-105"
              style={{ width: "180px", height: "120px", textDecoration: "none" }}
            >
              <Image
                src={sponsor.logo}
                alt={sponsor.name}
                fill
                className="object-contain"
                sizes="180px"
              />
            </a>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/6" style={{ background: "linear-gradient(to right, var(--bg), transparent)" }}></div>
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-1/6" style={{ background: "linear-gradient(to left, var(--bg), transparent)" }}></div>
      </div>
    </section>
  );
}
