import {
  CONTENT_FILM_ANALYSIS,
  CONTENT_STATS_VIRTUAL,
  CONTENT_FITNESS,
} from "@/data/blog-posts-content";

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  category: string;
  imageUrl: string;
  views: number;
  readTime?: number;
  rating?: number;
  date: string;
  author: string;
  excerpt: string;
  content: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: "film-analysis-return-to-play-muscle-strain",
    title: "Film Analysis for Footballers: A Smarter Return-to-Play After Muscle Strain",
    category: "Info Talk | Muscle Strain Injuries",
    imageUrl: "/blog/injuries.png",
    views: 0,
    readTime: 7,
    rating: 5,
    date: "2026-03-30",
    author: "Stanley Alves",
    excerpt:
      "Return-to-play is a process, not a moment. Combine physical rehab with film analysis habits that improve decision-making under pressure.",
    content: CONTENT_FILM_ANALYSIS,
  },
  {
    id: 2,
    slug: "stats-virtual-program-film-analysis-football-iq",
    title: "Our Virtual Program: How Film Analysis Boosts Foundational Football IQ by 20–50%",
    category: "Our Virtual Program",
    imageUrl: "/blog/film-analysis.png",
    views: 0,
    readTime: 10,
    rating: 5,
    date: "2026-03-30",
    author: "Stanley Alves",
    excerpt:
      "Using third-person film analysis to help players make better decisions when they receive the ball. 20–50% improvement in foundational actions.",
    content: CONTENT_STATS_VIRTUAL,
  },
  {
    id: 3,
    slug: "fitness-or-sprinting-which-is-more-important",
    title: "Fitness or Sprinting | Which is More Important for a Footballer?",
    category: "Info Talk | Fitness",
    imageUrl: "/blog/sprint.png",
    views: 0,
    readTime: 5,
    rating: 4,
    date: "2024-07-30",
    author: "Stanley Alves",
    excerpt:
      "Distance of high velocity sprints > distance of running. An 8-week fitness program for footballers.",
    content: CONTENT_FITNESS,
  },
];
