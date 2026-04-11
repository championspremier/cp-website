"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SOCIAL_CLASS = "text-[#6b7280] hover:text-[#111111] transition-colors";

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const TikTokIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.71a8.21 8.21 0 0 0 4.76 1.52V6.69h-1z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

export default function Footer() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const el = wrapperRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: 60 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={wrapperRef}
      style={{
        width: "100%",
        background: "var(--bg)",
        paddingTop: 80,
        paddingLeft: 16,
        paddingRight: 16,
      }}
    >
      <footer
        className="mx-auto w-full max-w-[1350px] overflow-hidden rounded-t-[24px] bg-[#f8f9fb] py-12 px-7 lg:px-28"
      >
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-6 lg:gap-12">
          <div className="lg:col-span-2 flex flex-col gap-5">
            <div className="relative h-[60px] w-[60px] shrink-0">
              <Image
                src="/logos/Black%20logo%20Icon.png"
                alt="Champions Premier"
                width={60}
                height={60}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-[#6b7280] max-w-sm">
              Trial only training program in the DMV area for footballers entering the 11v11 phase (U12-U18).
            </p>
            <div className="flex gap-5">
              <a href="#" className={SOCIAL_CLASS} aria-label="Facebook">
                <FacebookIcon />
              </a>
              <a href="#" className={SOCIAL_CLASS} aria-label="Instagram">
                <InstagramIcon />
              </a>
              <a href="#" className={SOCIAL_CLASS} aria-label="TikTok">
                <TikTokIcon />
              </a>
              <a href="#" className={SOCIAL_CLASS} aria-label="YouTube">
                <YouTubeIcon />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-16">
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#111111]">Programs</h3>
              <nav className="flex flex-col gap-2">
                <a href="/programs/champions-premier" className="text-sm text-[#6b7280] transition-colors hover:text-[#111111]">
                  Champions Premier
                </a>
              </nav>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#111111]">About</h3>
              <nav className="flex flex-col gap-2">
                <Link href="/about" className="text-sm text-[#6b7280] transition-colors hover:text-[#111111]">
                  About Us
                </Link>
                <Link href="/faq" className="text-sm text-[#6b7280] transition-colors hover:text-[#111111]">
                  FAQ
                </Link>
                <a href="/contact" className="text-sm text-[#6b7280] transition-colors hover:text-[#111111]">
                  Contact Us
                </a>
                <a target="_blank" href="https://championspremier.pushpress.com/landing/plans/plan_0j80vu490n01mu/login" className="text-sm text-[#6b7280] transition-colors hover:text-[#111111]">
                  Free Evaluation
                </a>
                <a href="#" className="text-sm text-[#6b7280] transition-colors hover:text-[#111111]">
                  Membership Cancellation
                </a>
              </nav>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#111111]">Legal</h3>
              <nav className="flex flex-col gap-2">
                <Link href="/privacy-policy" className="text-sm text-[#6b7280] transition-colors hover:text-[#111111]">
                  Privacy Policy
                </Link>
                <Link href="/terms-of-use" className="text-sm text-[#6b7280] transition-colors hover:text-[#111111]">
                  Terms of Use
                </Link>
              </nav>
            </div>
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#111111]">Address</h3>
              <p className="text-sm text-[#6b7280] leading-relaxed">
                44645 Guilford Dr STE 211, Ashburn, VA 20147
              </p>
              <h3 className="mb-2 mt-6 text-sm font-semibold uppercase tracking-wider text-[#111111]">Locations</h3>
              <ul className="flex flex-col gap-1 text-sm text-[#6b7280]">
                <li>
                  <Link href="/locations/falls-church" className="hover:text-[#111111] transition-colors">
                    Falls Church
                  </Link>
                </li>
                <li>
                  <Link href="/locations/great-falls" className="hover:text-[#111111] transition-colors">
                    Great Falls
                  </Link>
                </li>
                <li>
                  <Link href="/locations/greg-home-gym" className="hover:text-[#111111] transition-colors">
                    Reston
                  </Link>
                </li>
                <li>
                  <Link href="/locations/virtual" className="hover:text-[#111111] transition-colors">
                    Zoom
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-2 border-t border-[#e5e7eb] pt-4 sm:flex-row sm:items-center">
          <p className="text-sm text-[#6b7280]">© 2026 Champions Premier</p>
          <p className="text-sm text-[#6b7280]">All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
