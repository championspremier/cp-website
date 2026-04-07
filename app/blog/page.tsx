import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { Component } from "@/components/ui/blog-posts";
import { blogPosts } from "@/data/blog-posts";

export const metadata: Metadata = {
  title: "Blog | Champions Premier",
  description:
    "Articles on player development, training philosophy, and football intelligence from Champions Premier.",
};

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "80px" }}>
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
      </main>
    </>
  );
}
