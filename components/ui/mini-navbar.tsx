"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS: { label: string; href: string; target?: string }[] = [
  { label: "Programs", href: "#" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#" },
  { label: "Shop", target: "_blank", href: "https://championspremier.myshopify.com/" },
  { label: "Sponsors", href: "#" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      style={{
        position: "fixed",
        top: "24px",
        left: "0",
        right: "0",
        display: "flex",
        justifyContent: "center",
        zIndex: 50,
        pointerEvents: "none",
      }}
    >
      <header
        style={{
          pointerEvents: "auto",
          background: "rgba(156, 156, 156, 0.75)",
          backdropFilter: "blur(1px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "9999px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
          padding: "8px 16px",
          display: "flex",
          alignItems: "center",
          gap: "24px",
        }}
        className="relative justify-between"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/logos/Full White logo.png"
            alt="Champions Premier"
            width={120}
            height={30}
            style={{ width: "auto", height: "28px" }}
            priority
          />
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              {...(link.target
                ? { target: link.target, rel: "noopener noreferrer" as const }
                : {})}
            >
              <motion.div
                className="relative block cursor-pointer"
                style={{
                  color: "rgba(255,255,255,0.9)",
                  padding: "6px 16px",
                  fontSize: "14px",
                  borderRadius: "9999px",
                }}
                initial="rest"
                whileHover="hover"
                variants={{
                  rest: { backgroundColor: "transparent" },
                  hover: { backgroundColor: "rgba(255,255,255,0.1)", color: "var(--text)" },
                }}
                transition={{ duration: 0.2 }}
              >
                {link.label}
              </motion.div>
            </Link>
          ))}
        </div>

        {/* CTA button */}
        <Link
          target="_blank"
          href="https://championspremier.pushpress.com/landing/plans/plan_0j80vu490n01mu/login"
          className="hidden md:inline-block px-4 py-2 rounded-full font-semibold text-white text-sm transition-opacity hover:opacity-90 whitespace-nowrap"
          style={{
            background:
              "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)",
          }}
        >
          Free Evaluation
        </Link>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden relative flex justify-center items-center w-9 h-9 -mr-2"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <span
            className="absolute left-1/2 block w-5 h-0.5 rounded-full bg-white transition-all duration-200 ease-out -ml-2.5"
            style={{
              top: "50%",
              transform: menuOpen
                ? "translateY(-50%) rotate(45deg)"
                : "translateY(calc(-50% - 5px)) rotate(0)",
            }}
          />
          <span
            className="absolute left-1/2 block w-5 h-0.5 rounded-full bg-white transition-all duration-200 ease-out -ml-2.5"
            style={{
              top: "50%",
              transform: "translateY(-50%)",
              opacity: menuOpen ? 0 : 1,
            }}
          />
          <span
            className="absolute left-1/2 block w-5 h-0.5 rounded-full bg-white transition-all duration-200 ease-out -ml-2.5"
            style={{
              top: "50%",
              transform: menuOpen
                ? "translateY(-50%) rotate(-45deg)"
                : "translateY(calc(-50% + 5px)) rotate(0)",
            }}
          />
        </button>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="md:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
            <div className="flex flex-col py-4 px-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  {...(link.target
                    ? { target: link.target, rel: "noopener noreferrer" as const }
                    : {})}
                  className="text-sm font-medium text-white/90 py-3 px-4 rounded-lg hover:bg-white/10 transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
}
