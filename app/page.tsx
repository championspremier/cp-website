"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import IntroVideo from "@/components/IntroVideo";
import { Navbar } from "@/components/ui/mini-navbar";
import HeroSection from "@/components/HeroSection";
import VideoScrollSection from "@/components/VideoScrollSection";
import MissionContentSection from "@/components/MissionContentSection";

const PlayerSection3D = dynamic(() => import("@/components/PlayerSection3D"), {
  ssr: false,
});

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);

  if (!introComplete) {
    return <IntroVideo onComplete={() => setIntroComplete(true)} />;
  }

  return (
    <main>
      <Navbar />
      <HeroSection />
      <div style={{ marginTop: "-80px", position: "relative", zIndex: 2 }}>
        <VideoScrollSection />
      </div>
      <PlayerSection3D />
      <MissionContentSection />
    </main>
  );
}
