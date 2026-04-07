"use client";

import { useState, useEffect } from "react";
import { Clock, Eye, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BlogPost {
  id: number;
  slug?: string;
  title: string;
  category: string;
  imageUrl: string;
  href?: string;
  views: number;
  readTime?: number;
  rating?: number;
  className?: string;
  author?: string;
  date?: string;
  excerpt?: string;
  content?: string;
}

export type BlogPostCard = BlogPost & { href?: string };

export function Component({
  title,
  description,
  backgroundLabel,
  backgroundPosition,
  posts,
  className,
}: {
  title: string;
  description: string;
  backgroundLabel: string;
  backgroundPosition: "left" | "right";
  posts: BlogPostCard[];
  className?: string;
}) {
  void backgroundPosition;
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedPost]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedPost(null);
    };
    if (selectedPost) {
      window.addEventListener("keydown", handleEsc);
      return () => window.removeEventListener("keydown", handleEsc);
    }
  }, [selectedPost]);

  return (
    <section className={cn("relative w-full overflow-hidden px-4 py-12 sm:px-6 lg:px-8", className)}>
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -z-50 select-none font-black uppercase text-[clamp(4rem,18vw,14rem)] text-center w-full bg-clip-text text-transparent"
        style={{
          fontFamily: "var(--font-inter), sans-serif",
          backgroundImage:
            "linear-gradient(135deg, #7bb8d4, #5fa4c4, #3b82f6, #7bb8d4, #5fa4c4)",
          backgroundSize: "300% 300%",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          opacity: 0.08,
          animation: "gradientShift 6s ease-in-out infinite",
        }}
        aria-hidden
      >
        {backgroundLabel}
      </div>

      <div className="relative mx-auto max-w-6xl">
        <header className="mb-12 max-w-2xl">
          <h1
            className="text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {title}
          </h1>
          <p
            className="mt-4 text-base text-[#6b7280] sm:text-lg"
            style={{ fontFamily: "var(--font-inter), sans-serif" }}
          >
            {description}
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedPost(post)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedPost(post);
                }
              }}
              className="group cursor-pointer rounded-2xl outline-none ring-offset-2 ring-offset-[#1a1a1a] focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
            >
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#1a1a1a]/90 shadow-lg backdrop-blur-md transition-all hover:shadow-xl">
                <div
                  className="relative aspect-[16/10] w-full bg-cover bg-center transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url(${post.imageUrl})`,
                    backgroundColor: "#e5e7eb",
                  }}
                />
                <div className="flex flex-1 flex-col p-5">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider text-[#7bb8d4]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {post.category}
                  </span>
                  <span
                    className="mt-1.5 text-sm text-white/50"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {post.author && `${post.author} · `}
                    {post.date &&
                      new Date(post.date).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                  </span>
                  <h2
                    className="mt-2 line-clamp-2 text-lg font-semibold text-white group-hover:text-[#7bb8d4]"
                    style={{ fontFamily: "var(--font-inter), sans-serif" }}
                  >
                    {post.title}
                  </h2>
                  {post.excerpt ? (
                    <p
                      className="mt-2 line-clamp-2 flex-1 text-sm text-white/60"
                      style={{ fontFamily: "var(--font-inter), sans-serif" }}
                    >
                      {post.excerpt}
                    </p>
                  ) : null}
                  <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5 shrink-0" aria-hidden />
                      {post.views.toLocaleString()}
                    </span>
                    {post.readTime != null ? (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 shrink-0" aria-hidden />
                        {post.readTime} min
                      </span>
                    ) : null}
                    {post.rating != null ? (
                      <span className="flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" aria-hidden />
                        {post.rating}/5
                      </span>
                    ) : null}
                  </div>
                </div>
              </article>
            </div>
          ))}
        </div>
      </div>

      {selectedPost && (
        <div
          className="fixed inset-0 z-[9999] flex items-start justify-center overflow-y-auto"
          style={{ background: "rgba(0, 0, 0, 0.85)", backdropFilter: "blur(8px)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedPost(null);
          }}
        >
          <div
            className="relative mx-4 my-8 w-full max-w-3xl overflow-hidden rounded-2xl md:my-16"
            style={{ background: "var(--bg)" }}
          >
            <button
              type="button"
              onClick={() => setSelectedPost(null)}
              className="fixed right-6 top-6 z-[10000] flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-md transition-colors hover:bg-black/80"
              aria-label="Close"
            >
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
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div
              style={{
                width: "100%",
                height: "40vh",
                backgroundImage: `url(${selectedPost.imageUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#e5e7eb",
              }}
            />

            <div style={{ padding: "2.5rem 2rem 4rem" }}>
              <span
                style={{
                  display: "block",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "#3b82f6",
                  marginBottom: "0.5rem",
                }}
              >
                {selectedPost.category}
              </span>

              <h1
                style={{
                  fontSize: "clamp(1.5rem, 4vw, 2.25rem)",
                  fontWeight: 800,
                  color: "var(--text)",
                  lineHeight: 1.2,
                  marginBottom: "0.75rem",
                }}
              >
                {selectedPost.title}
              </h1>

              <p
                style={{
                  fontSize: "0.875rem",
                  color: "#6b7280",
                  marginBottom: "2rem",
                }}
              >
                {selectedPost.author} ·{" "}
                {selectedPost.date &&
                  new Date(selectedPost.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                {selectedPost.readTime != null ? ` · ${selectedPost.readTime} min read` : ""}
              </p>

              <div
                style={{ color: "var(--text)", lineHeight: 1.8 }}
                dangerouslySetInnerHTML={{
                  __html: renderMarkdown(selectedPost.content || ""),
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function renderMarkdown(md: string): string {
  return md
    .replace(
      /^---$/gm,
      '<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 2.5rem 0;" />',
    )
    .replace(
      /^### (.+)$/gm,
      '<h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text); margin-top: 2rem; margin-bottom: 1rem;">$1</h3>',
    )
    .replace(
      /^## (.+)$/gm,
      '<h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text); margin-top: 2.5rem; margin-bottom: 1rem;">$1</h2>',
    )
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<li style="margin-bottom: 0.5rem; padding-left: 0.5rem;">$1</li>')
    .replace(
      /((?:<li[^>]*>.*<\/li>\n?)+)/g,
      '<ul style="list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0;">$1</ul>',
    )
    .replace(/^(?!<[hulo]|<li|<hr)(.+)$/gm, '<p style="margin-bottom: 1rem; color: #4b5563;">$1</p>')
    .replace(/\n\n/g, "")
    .replace(/\n/g, "");
}
