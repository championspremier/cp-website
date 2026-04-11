"use client";

import Image from "next/image";
import { Marquee } from "@/components/ui/marquee";

const players = [
  { name: "Shayne Dos Santos", years: "5 Years", team: "New England Revolution", image: "/players/shayne.png" },
  { name: "Zayyan Ahmed", years: "3 Years", team: "Bangladesh National Team", image: "/players/zayyan.png" },
  { name: "Ameya Iyer", years: "4 Years", team: "Loudoun United FC", image: "/players/ameya.png" },
  { name: "Daniel Ramos", years: "2 Years", team: "Austin F.C.", image: "/players/ramos.png" },
  { name: "Eamonn Hammond", years: "1.5 Years", team: "MLS Next Champion", image: "/players/eamonn.png" },
  { name: "Jair Chavarria", years: "4 Years", team: "DC United", image: "/players/chava.png" },
];

function PlayerCard({ player }: { player: (typeof players)[0] }) {
  return (
    <div className="flex flex-col items-center gap-3" style={{ minWidth: "200px" }}>
      <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>
        {player.years}
      </span>
      <div
        className="relative shrink-0 overflow-hidden rounded-full"
        style={{
          width: "140px",
          height: "140px",
          boxShadow: "0 4px 24px rgba(59, 130, 246, 0.15)",
        }}
      >
        <Image
          src={player.image}
          alt={player.name}
          fill
          className="object-cover"
          sizes="140px"
        />
      </div>
      <span
        className="text-center text-sm font-semibold"
        style={{ color: "var(--text)" }}
      >
        {player.team}
      </span>
    </div>
  );
}

export default function PlayerMarquee() {
  return (
    <section style={{ background: "var(--bg)", padding: "50px 0", position: "relative", zIndex: 20 }}>
      <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
        <Marquee pauseOnHover className="[--duration:25s] [--gap:3rem]">
          {players.map((player) => (
            <PlayerCard key={player.name} player={player} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-1/6" style={{ background: "linear-gradient(to right, var(--bg), transparent)" }}></div>
        <div className="pointer-events-none absolute top-0 bottom-0 right-0 w-1/6" style={{ background: "linear-gradient(to left, var(--bg), transparent)" }}></div>
      </div>
    </section>
  );
}
