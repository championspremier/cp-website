"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import IntroVideo from "@/components/IntroVideo";
import { Navbar } from "@/components/ui/mini-navbar";
import HeroSection from "@/components/HeroSection";
import VideoScrollSection from "@/components/VideoScrollSection";
import PlayerMarquee from "@/components/PlayerMarquee";
import EvaluationTimeline from "@/components/EvaluationTimeline";
import LocationsSection from "@/components/LocationsSection";
import CoachesSection from "@/components/CoachesSection";
import PlayerScanSection from "@/components/PlayerScanSection";
import Footer from "@/components/Footer";
import HomeScrollRefresher from "@/components/HomeScrollRefresher";
import { hasSeenCampusLightbox } from "@/lib/campusLightbox";

const MissionSection = dynamic(() => import("@/components/MissionSection"), {
  ssr: false,
});

const CampusLightbox = dynamic(() => import("@/components/CampusLightbox"), {
  ssr: false,
});

// Let the intro fade-out finish and the hero paint before the lightbox appears
const CAMPUS_LIGHTBOX_DELAY_MS = 400;

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false);
  const [showCampusLightbox, setShowCampusLightbox] = useState(false);

  useEffect(() => {
    if (!introComplete || hasSeenCampusLightbox()) return;
    const timer = setTimeout(() => setShowCampusLightbox(true), CAMPUS_LIGHTBOX_DELAY_MS);
    return () => clearTimeout(timer);
  }, [introComplete]);

  if (!introComplete) {
    return <IntroVideo onComplete={() => setIntroComplete(true)} />;
  }

  return (
    <main>
      <HomeScrollRefresher />
      <Navbar />
      <HeroSection />
      <VideoScrollSection />
      <PlayerMarquee />
      <MissionSection />
      <EvaluationTimeline />
      <LocationsSection />
      <CoachesSection />
      <PlayerScanSection />
      <Footer />
      {showCampusLightbox && (
        <CampusLightbox onClosed={() => setShowCampusLightbox(false)} />
      )}
    </main>
  );
}
