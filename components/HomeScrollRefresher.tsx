"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HomeScrollRefresher() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Wait for all assets (videos, images, fonts) then do one authoritative refresh
    const doRefresh = () => ScrollTrigger.refresh();

    const handleReady = () => {
      // Small delay lets pinned section creation settle
      setTimeout(doRefresh, 100);
    };

    if (document.readyState === "complete") {
      handleReady();
    } else {
      window.addEventListener("load", handleReady, { once: true });
    }

    return () => {
      window.removeEventListener("load", handleReady);
    };
  }, []);

  return null;
}
