"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import IntroVideo from "@/components/IntroVideo";
import { Navbar } from "@/components/ui/mini-navbar";
import HeroSection from "@/components/HeroSection";
import VideoScrollSection from "@/components/VideoScrollSection";
import PlayerMarquee from "@/components/PlayerMarquee";
import EvaluationTimeline from "@/components/EvaluationTimeline";
import LocationsSection from "@/components/LocationsSection";

const MissionSection = dynamic(() => import("@/components/MissionSection"), {
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
      <VideoScrollSection />
      <PlayerMarquee />
      <MissionSection />
      <EvaluationTimeline />
      <LocationsSection />
    </main>
  );
}
