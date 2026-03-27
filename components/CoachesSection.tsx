"use client";

import { TeamBlock } from "@/components/team-block";

const coaches = [
  {
    name: "Stanley Alves",
    role: "Founder & Ex-Pro",
    image: "/coaches/stanley.png",
    bio: "Former pro at all levels in America and Division II in Liga Portugal.",
    instagram: "https://www.instagram.com/stan.alves9/",
  },
  {
    name: "Jonathan Bolaños",
    role: "Film Analysis Coach & Current Pro",
    image: "/coaches/jonathan.png",
    bio: "Currently with Sarasota in USL League One and continuing his 7th year in pro football.",
    instagram: "https://www.instagram.com/j.bolanos11/",
  },
  {
    name: "Mert Meriç Sayili",
    role: "Director of Goalkeeping",
    image: "/coaches/mert.png",
    bio: "Formerly from Turkey, Mert brings a contagious high-level energy to our GK sessions.",
    instagram: "https://www.instagram.com/themerco_/",
  },
  {
    name: "Dylan Zane",
    role: "Coach",
    image: "/coaches/dylan.png",
    bio: "A NCAA DIII National Champion and Jamaican U-19 National brings his expertise to Champions Premier.",
    instagram: "https://www.instagram.com/dylanzane7/",
  },
  {
    name: "Austin Aviza",
    role: "GK Film Analysis Coach",
    image: "/coaches/austin.png",
    bio: "Drafted in the 2020 draft and has been providing access to high level analyzation.",
    instagram: "https://www.instagram.com/austinaviza/",
  },
];

export default function CoachesSection() {
  return (
    <section style={{ background: "var(--bg)", position: "relative", zIndex: 2 }}>
      <TeamBlock
        members={coaches}
        badge="Our Coaches"
        title="Meet the Coaches"
        subtitle="Professional players and coaches dedicated to developing the next generation."
      />
    </section>
  );
}
