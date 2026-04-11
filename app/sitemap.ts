import type { MetadataRoute } from "next";
import { blogPosts } from "@/data/blog-posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.championspremier.net";
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/programs/champions-premier`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/sponsors`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/terms-of-use`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${baseUrl}/locations/falls-church`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/locations/greg-home-gym`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/locations/great-falls`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/locations/virtual`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
  ];

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date ? new Date(post.date) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...blogRoutes];
}
