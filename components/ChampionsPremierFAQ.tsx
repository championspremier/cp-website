"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_DATA = [
  {
    question: "How do I get started?",
    answer:
      "Begin your Champions Premier journey by contacting us. Our team will then reach out to discuss the optimal development path tailored specifically for your son or daughter, ensuring they receive the best possible guidance in their soccer journey.",
  },
  {
    question: "Who are these programs for?",
    answer:
      "Champions Premier offers elite soccer training programs tailored for ambitious players — our U9-U11 program is co-ed, while U12+ focuses on boys. Homegrown is your go-to source for virtual football development knowledge. These programs are designed for committed athletes aspiring to professional or NCAA Division I careers. We not only enhance your soccer skills but also nurture your personal growth, igniting a passion that extends beyond the field.",
  },
  {
    question: "Can my child do this and club?",
    answer:
      "Yes, we encourage participation in our programs and club soccer. Our flexible schedule of on-field training and online sessions is designed to complement club commitments, allowing players to maximize their development opportunities.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Champions Premier's pricing is discussed after the free evaluation to ensure it's the right fit for each player. Homegrown is a monthly subscription basis to which you choose to either utilize the app solely or meet with our mentors live.",
  },
  {
    question: "Why choose Champions Premier?",
    answer:
      "At Champions Premier, our NCAA and professional-level coaches mentor aspiring footballers to reach new heights. We provide professionalism and personalized guidance, empowering our athletes to build careers that surpass our own achievements in the beautiful game.",
  },
  {
    question: "What should parents expect for their U9-U11 footballer?",
    answer:
      "Start by contacting us for personalized guidance. If you'd like to come check us out, book a free evaluation to see our high-quality coaching firsthand. Then, use our app to check the schedule and reserve your spot in our U9-U11 Tec Tac session.",
  },
  {
    question: "What is the Homegrown App?",
    answer:
      "Our Homegrown app is a virtual program that offers comprehensive training through a unique third-person perspective, enhancing players' skills with insights often missed in traditional settings. Explore our website to see how dedicated, personalized training can transform your soccer journey.",
  },
  {
    question: "Why the long-term commitments?",
    answer:
      "Our proven yearly curriculum fosters strong coach-player relationships and delivers exceptional results. Long-term commitment leads to greater success and savings, as evidenced by our statistics.",
  },
];

type FAQItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
  index: number;
};

const FAQItem = ({ question, answer, isOpen, onToggle, index }: FAQItemProps) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.08 }}
    className={cn(
      "group relative mb-4 overflow-hidden rounded-2xl border-2 border-transparent",
      isOpen ? "bg-[#3b82f6]/5" : "bg-white",
      "transition-all duration-300 ease-in-out hover:border-[#3b82f6]/30 shadow-sm"
    )}
  >
    <button
      type="button"
      onClick={onToggle}
      className="flex w-full items-center justify-between p-6 text-left"
      aria-expanded={isOpen}
    >
      <div className="flex items-center gap-3">
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex h-6 w-6 items-center justify-center text-[#3b82f6]"
        >
          <ChevronRight size={18} />
        </motion.div>
        <h3 className="text-lg font-semibold text-[#111111]">{question}</h3>
      </div>
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-6 pb-6 pl-[3.75rem] text-[#6b7280] leading-relaxed">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
    <motion.div
      className="absolute bottom-0 left-0 h-[2px] w-full bg-gradient-to-r from-[#7bb8d4] via-[#3b82f6] to-[#7bb8d4]"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: isOpen ? 1 : 0 }}
      transition={{ duration: 0.5 }}
    />
  </motion.div>
);

export default function ChampionsPremierFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="relative mx-auto w-full max-w-4xl px-4 py-20">
      <div className="mb-12 text-center">
        <div className="mb-2 flex items-center justify-center gap-2">
          <Sparkles className="h-5 w-5 text-[#3b82f6]" />
          <p className="text-sm font-semibold uppercase tracking-wider text-[#3b82f6]">
            Frequently Asked
          </p>
        </div>
        <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl text-[#111111]">
          Questions & Answers
        </h2>
        <p className="mx-auto max-w-2xl text-[#6b7280]">
          Everything you need to know about Champions Premier, from getting started to
          long-term commitment.
        </p>
      </div>
      <div className="space-y-4">
        {FAQ_DATA.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
