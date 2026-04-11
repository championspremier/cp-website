import Link from "next/link";
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

  return (
    <section className={cn("relative w-full overflow-hidden px-4 py-12 sm:px-6 lg:px-8", className)}>
      <div
        data-bg-label
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
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              data-blog-card
              className="group block rounded-2xl outline-none ring-offset-2 ring-offset-[#1a1a1a] focus-visible:ring-2 focus-visible:ring-[#3b82f6]"
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
