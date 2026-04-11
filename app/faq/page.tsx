import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChampionsPremierFAQ from "@/components/ChampionsPremierFAQ";

export const metadata: Metadata = {
  title: "FAQ | Champions Premier",
  description:
    "Frequently asked questions about Champions Premier — our elite soccer training program in Falls Church, VA. Get answers about pricing, schedules, programs, and more.",
  alternates: {
    canonical: "https://www.championspremier.net/faq",
  },
  openGraph: {
    title: "FAQ | Champions Premier",
    description:
      "Frequently asked questions about Champions Premier, our programs, pricing, and what to expect.",
    url: "https://www.championspremier.net/faq",
    type: "website",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How do I get started?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Begin your Champions Premier journey by contacting us. Our team will then reach out to discuss the optimal development path tailored specifically for your son or daughter, ensuring they receive the best possible guidance in their soccer journey.",
      },
    },
    {
      "@type": "Question",
      name: "Who are these programs for?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Champions Premier offers elite soccer training programs tailored for ambitious players — our U9-U11 program is co-ed, while U12+ focuses on boys. Homegrown is your go-to source for virtual football development knowledge. These programs are designed for committed athletes aspiring to professional or NCAA Division I careers.",
      },
    },
    {
      "@type": "Question",
      name: "Can my child do this and club?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, we encourage participation in our programs and club soccer. Our flexible schedule of on-field training and online sessions is designed to complement club commitments, allowing players to maximize their development opportunities.",
      },
    },
    {
      "@type": "Question",
      name: "How much does it cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Champions Premier's pricing is discussed after the free evaluation to ensure it's the right fit for each player. Homegrown is a monthly subscription basis to which you choose to either utilize the app solely or meet with our mentors live.",
      },
    },
    {
      "@type": "Question",
      name: "Why choose Champions Premier?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "At Champions Premier, our NCAA and professional-level coaches mentor aspiring footballers to reach new heights. We provide professionalism and personalized guidance, empowering our athletes to build careers that surpass our own achievements in the beautiful game.",
      },
    },
    {
      "@type": "Question",
      name: "What should parents expect for their U9-U11 footballer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start by contacting us for personalized guidance. If you'd like to come check us out, book a free evaluation to see our high-quality coaching firsthand. Then, use our app to check the schedule and reserve your spot in our U9-U11 Tec Tac session.",
      },
    },
    {
      "@type": "Question",
      name: "What is the Homegrown App?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our Homegrown app is a virtual program that offers comprehensive training through a unique third-person perspective, enhancing players' skills with insights often missed in traditional settings.",
      },
    },
    {
      "@type": "Question",
      name: "Why the long-term commitments?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Our proven yearly curriculum fosters strong coach-player relationships and delivers exceptional results. Long-term commitment leads to greater success and savings, as evidenced by our statistics.",
      },
    },
  ],
};

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh", paddingTop: "100px" }}>
        <ChampionsPremierFAQ />
      </main>
      <Footer />
    </>
  );
}
