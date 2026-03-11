"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextEffectProps {
  words: string[];
  effect?: "flip";
  duration?: number;
  className?: string;
  textClassName?: string;
}

export function TextEffect({
  words,
  effect = "flip",
  duration = 3000,
  className = "",
  textClassName = "",
}: TextEffectProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, duration);
    return () => clearInterval(interval);
  }, [words.length, duration]);

  if (effect === "flip") {
    return (
      <span className={`inline-block overflow-hidden ${className}`}>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentIndex}
            className={textClassName}
            initial={{ rotateX: -90, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            exit={{ rotateX: 90, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            style={{
              display: "inline-block",
              transformOrigin: "top",
              transformStyle: "preserve-3d",
            }}
          >
            {words[currentIndex]}
          </motion.span>
        </AnimatePresence>
      </span>
    );
  }

  return (
    <span className={`${className} ${textClassName}`}>{words[currentIndex]}</span>
  );
}
