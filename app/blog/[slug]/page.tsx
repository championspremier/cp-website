import { blogPosts } from "@/data/blog-posts";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogPostAnimator from "@/components/BlogPostAnimator";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: "Post Not Found | Champions Premier" };
  return {
    title: `${post.title} | Champions Premier`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "80px" }}>
        <BlogPostAnimator>
          <div
            data-blog-hero
            style={{
              width: "100%",
              height: "50vh",
              backgroundImage: `url(${post.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center top",
              backgroundColor: "#e5e7eb",
            }}
          />

          <article
            style={{
              maxWidth: "720px",
              margin: "0 auto",
              padding: "3rem 1.5rem 6rem",
            }}
          >
            <Link
              href="/blog"
              data-blog-back
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "#3b82f6",
                fontSize: "0.875rem",
                fontWeight: 500,
                marginBottom: "2rem",
                textDecoration: "none",
              }}
            >
              ← Back to Blog
            </Link>

            <span
              data-blog-category
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
              {post.category}
            </span>

            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                fontWeight: 800,
                color: "var(--text)",
                lineHeight: 1.2,
                marginBottom: "1rem",
              }}
            >
              {post.title}
            </h1>

            <p
              data-blog-meta
              style={{
                fontSize: "0.875rem",
                color: "#6b7280",
                marginBottom: "2.5rem",
              }}
            >
              {post.author} ·{" "}
              {new Date(post.date).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
              {post.readTime && ` · ${post.readTime} min read`}
            </p>

            <div
              data-blog-body
              style={{ color: "var(--text)", lineHeight: 1.8 }}
              dangerouslySetInnerHTML={{
                __html: renderMarkdown(post.content || ""),
              }}
            />
          </article>
        </BlogPostAnimator>
      </main>
      <Footer />
    </>
  );
}

function renderMarkdown(md: string): string {
  return md
    .replace(/^---$/gm, '<hr style="border: none; border-top: 1px solid #e5e7eb; margin: 2.5rem 0;" />')
    .replace(/^### (.+)$/gm, '<h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text); margin-top: 2rem; margin-bottom: 1rem;">$1</h3>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size: 1.5rem; font-weight: 800; color: var(--text); margin-top: 2.5rem; margin-bottom: 1rem;">$1</h2>')
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/^- (.+)$/gm, '<li style="margin-bottom: 0.5rem; padding-left: 0.5rem;">$1</li>')
    .replace(/((?:<li[^>]*>.*<\/li>\n?)+)/g, '<ul style="list-style-type: disc; padding-left: 1.5rem; margin: 1rem 0;">$1</ul>')
    .replace(/^(?!<[hulo]|<li|<hr)(.+)$/gm, '<p style="margin-bottom: 1rem; color: #4b5563;">$1</p>')
    .replace(/\n\n/g, "")
    .replace(/\n/g, "");
}
