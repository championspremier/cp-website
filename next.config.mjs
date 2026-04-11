/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // ============================================
      // ABOUT / COACH REDIRECTS
      // ============================================
      {
        source: "/about-champions-premier-in-falls-church-va",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/aboutct",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/coaches/stanley-alves",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/coach-bio-request",
        destination: "/#coaches",
        permanent: true,
      },
      {
        source: "/coaches",
        destination: "/#coaches",
        permanent: true,
      },

      // ============================================
      // CONTACT REDIRECTS
      // ============================================
      {
        source: "/contact-champions-premier-in-falls-church-va",
        destination: "/#contact",
        permanent: true,
      },

      // ============================================
      // PROGRAM REDIRECTS
      // ============================================
      {
        source: "/programs/champions-teq",
        destination: "/",
        permanent: true,
      },
      {
        source: "/programs/college-advising",
        destination: "/programs/champions-premier",
        permanent: true,
      },
      {
        source: "/programs/film-analysis",
        destination: "/programs/champions-premier",
        permanent: true,
      },
      {
        source: "/programs/get-started",
        destination: "/#get-started",
        permanent: true,
      },
      {
        source: "/programs/highlight-reel",
        destination: "/programs/champions-premier",
        permanent: true,
      },
      {
        source: "/programs/homegrown-development",
        destination: "/programs/champions-premier",
        permanent: true,
      },
      {
        source: "/programs/pro-player-stories",
        destination: "/blog",
        permanent: true,
      },
      {
        source: "/programs/virtual-program",
        destination: "/locations/virtual",
        permanent: true,
      },
      {
        source: "/programs/champions-player-progress",
        destination: "/programs/champions-premier",
        permanent: true,
      },

      // ============================================
      // LOCATION REDIRECTS
      // ============================================
      {
        source: "/locations/falls-church-2",
        destination: "/locations/falls-church",
        permanent: true,
      },
      {
        source: "/locations/old-glory-gym",
        destination: "/locations/greg-home-gym",
        permanent: true,
      },
      {
        source: "/locations/mclean",
        destination: "/locations/falls-church",
        permanent: true,
      },

      // ============================================
      // SCHEDULE / PUSHPRESS REDIRECTS
      // ============================================
      {
        source: "/schedule-champions-premier-in-falls-church-va",
        destination: "https://championspremier.pushpress.com/landing/plans/plan_0j80vu490n01mu/login",
        permanent: true,
      },
      {
        source: "/schedule-teq",
        destination: "https://championspremier.pushpress.com/landing/plans/plan_0j80vu490n01mu/login",
        permanent: true,
      },

      // ============================================
      // MEMBERSHIP / OTHER
      // ============================================
      {
        source: "/membership-pricing-request",
        destination: "/",
        permanent: true,
      },

      // ============================================
      // EVENTS — all defunct, redirect to home
      // ============================================
      {
        source: "/events/:slug*",
        destination: "/",
        permanent: true,
      },

      // ============================================
      // BLOG POST SLUG UPDATES
      // ============================================
      {
        source: "/blog/fitness-or-sprinting-which-is-more-important-for-a-footballer",
        destination: "/blog/fitness-or-sprinting-which-is-more-important",
        permanent: true,
      },
      {
        source: "/blog/mastering-muscle-strain-return-to-play-top-tips-for-footballers",
        destination: "/blog/film-analysis-return-to-play-muscle-strain",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
