"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
/** lucide-react@1.7 has no Instagram export */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export type TeamBlockMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  instagram: string;
};

export interface TeamBlockProps {
  members: TeamBlockMember[];
  badge?: string;
  title: string;
  subtitle: string;
  /** lg:grid-cols-* (default 5) */
  columnsLg?: 4 | 5;
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15,
    },
  },
};

export function TeamBlock({
  members,
  badge = "Our Coaches",
  title,
  subtitle,
  columnsLg = 5,
}: TeamBlockProps) {
  const lgCols = columnsLg === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4";

  return (
    <div className="relative overflow-hidden py-20 sm:py-28">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.2 }}
        className="pointer-events-none absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle at center, rgba(59, 130, 246, 0.2) 0%, rgba(123, 184, 212, 0.05) 45%, transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-16 max-w-2xl text-center"
        >
          <div
            className="inline-block rounded-lg px-3 py-1 text-sm font-medium text-white"
            style={{
              background: "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)",
            }}
          >
            {badge}
          </div>
          <p
            className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            {title}
          </p>
          <p className="mt-6 text-lg leading-8" style={{ color: "var(--muted)" }}>
            {subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className={`grid grid-cols-1 gap-10 sm:grid-cols-2 ${lgCols}`}
        >
          {members.map((member, index) => (
            <motion.div
              key={`${member.name}-${index}`}
              variants={item}
              whileHover={{ y: -10 }}
              className="group relative"
            >
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-card">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="translate-y-4 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm text-white/90">{member.bio}</p>
                    <div className="mt-4 flex gap-3">
                      <a
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-white/90 transition-colors hover:text-white"
                        aria-label={`${member.name} on Instagram`}
                      >
                        <InstagramIcon className="h-5 w-5 shrink-0" />
                        <span className="text-sm font-medium">Instagram</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
                  {member.name}
                </h3>
                <p className="text-sm" style={{ color: "var(--muted)" }}>
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
