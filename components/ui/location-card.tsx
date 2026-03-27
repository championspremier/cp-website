"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

export interface LocationCardProps {
  imageUrl: string;
  location: string;
  country: string;
  href: string;
  className?: string;
  buttonLabel?: string;
}

const LocationCard = React.forwardRef<HTMLDivElement, LocationCardProps>(
  ({ imageUrl, location, country, href, className, buttonLabel }, ref) => {
    const controls = useAnimation();

    const cardVariants = {
      initial: { scale: 1, y: 0 },
      hover: {
        scale: 1.03,
        y: -5,
        transition: { type: "spring" as const, stiffness: 400, damping: 10 },
      },
    };

    const handleHoverStart = () => {
      controls.start("hover");
    };

    const handleHoverEnd = () => {
      controls.start("initial");
    };

    return (
      <motion.div
        ref={ref}
        className={cn(
          "group w-full max-w-xs text-card-foreground shadow-sm h-full flex flex-col",
          className
        )}
        style={{
          background: "linear-gradient(135deg, #7bb8d4, #3b82f6, #7bb8d4)",
          backgroundSize: "200% 200%",
          animation: "gradientMove 3s linear infinite",
          padding: "2px",
          borderRadius: "1rem",
        }}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        onHoverStart={handleHoverStart}
        onHoverEnd={handleHoverEnd}
        role="group"
        aria-labelledby="location-title"
      >
        <div
          className="flex flex-col flex-1 min-h-0 h-full"
          style={{
            background: "var(--bg)",
            borderRadius: "calc(1rem - 2px)",
            overflow: "hidden",
          }}
        >
          <div className="aspect-[4/3] overflow-hidden relative shrink-0">
            <Image
              src={imageUrl}
              alt={`A scenic view of ${location}`}
              width={400}
              height={300}
              className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            />
          </div>

          <div className="flex items-center justify-between p-4 min-h-[100px] flex-1 gap-2">
            <div className="min-w-0 flex-1">
              <h3 id="location-title" className="font-semibold text-card-foreground">
                {location},
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">{country}</p>
            </div>

            <motion.a
              href={href}
              target={href === "#" ? undefined : "_blank"}
              rel={href === "#" ? undefined : "noopener noreferrer"}
              className="relative flex h-10 w-28 items-center justify-center overflow-hidden rounded-full bg-primary text-sm font-medium text-primary-foreground shrink-0"
              aria-label={`Get directions to ${location}`}
              whileTap={{ scale: 0.95 }}
            >
              <motion.span
                className="absolute"
                variants={{
                  initial: { opacity: 1 },
                  hover: { opacity: 0, transition: { duration: 0.1 } },
                }}
                initial="initial"
                animate={controls}
              >
                {buttonLabel || "Directions"}
              </motion.span>
              <motion.span
                className="absolute left-4"
                variants={{
                  initial: { x: 0 },
                  hover: {
                    x: 40,
                    transition: { type: "spring" as const, stiffness: 300, damping: 15 },
                  },
                }}
                initial="initial"
                animate={controls}
              >
                <Send size={16} />
              </motion.span>
            </motion.a>
          </div>
        </div>
      </motion.div>
    );
  }
);

LocationCard.displayName = "LocationCard";

export { LocationCard };
