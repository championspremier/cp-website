import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlogListAnimator from "@/components/BlogListAnimator";
import { Component } from "@/components/ui/blog-posts";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Champions Premier",
  description:
    "Articles on player development, training philosophy, and football intelligence from Champions Premier. Insights from elite-level coaches in the DMV area.",
  alternates: {
    canonical: "https://www.championspremier.net/blog",
  },
  openGraph: {
    title: "Blog | Champions Premier",
    description:
      "Articles on player development, training philosophy, and football intelligence from Champions Premier.",
    url: "https://www.championspremier.net/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog | Champions Premier",
    description:
      "Articles on player development, training philosophy, and football intelligence.",
  },
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "80px" }}>
        <BlogListAnimator>
          <Component
            title="Champions Premier Blog"
            description="Insights on player development, training philosophy, and building complete footballers"
            backgroundLabel="BLOG"
            backgroundPosition="left"
            posts={blogPosts.map((post) => ({
              ...post,
              href: `/blog/${post.slug}`,
            }))}
            className="mb-16"
          />
        </BlogListAnimator>
      </main>
      <Footer />
    </>
  );
}
