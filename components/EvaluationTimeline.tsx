"use client";

import { Timeline } from "@/components/ui/timeline";

const evaluationSteps = [
  {
    title: "01",
    content: (
      <div>
        <h4 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text)" }}>
          TRIAL WITH US
        </h4>
        <p className="text-base md:text-lg" style={{ color: "var(--muted)" }}>
          Whether on field or virtually, we give you a free evaluation in order to provide you with the best objectives possible for your development.
        </p>
      </div>
    ),
  },
  {
    title: "02",
    content: (
      <div>
        <h4 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text)" }}>
          SCHEDULE YOUR FREE EVALUATION
        </h4>
        <p className="text-base md:text-lg" style={{ color: "var(--muted)" }}>
          Download our app and select a date within our schedule to be evaluated with some of the best players in the DMV. In addition, you&apos;ll get exclusive access to a 4-week Sprint Training Program.
        </p>
      </div>
    ),
  },
  {
    title: "03",
    content: (
      <div>
        <h4 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: "var(--text)" }}>
          GET EVALUATED
        </h4>
        <p className="text-base md:text-lg" style={{ color: "var(--muted)" }}>
          After your free evaluation, our coaches will provide personalized feedback, highlighting one positive strength and one key area for development.
        </p>
      </div>
    ),
  },
];

export default function EvaluationTimeline() {
  return (
    <section style={{ background: "var(--bg)", position: "relative", zIndex: 20 }}>
      <Timeline data={evaluationSteps} />
    </section>
  );
}
