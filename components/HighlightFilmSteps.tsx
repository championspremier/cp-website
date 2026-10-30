"use client";

import React, { useState } from "react";
import StepTimeline, { type Step } from "@/components/StepTimeline";
import { PLANS, CONTACT_EMAIL, CHOOSE_PLAN_STEP, type PlanId, type PlanStep } from "@/data/highlight-film";

const GRADIENT = "linear-gradient(135deg, #7bb8d4 0%, #5fa4c4 45%, #3b82f6 100%)";

// Turn the contact email into a mailto link inside step text
function linkify(text: string): React.ReactNode[] {
  return text.split(CONTACT_EMAIL).flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a key={i} href={`mailto:${CONTACT_EMAIL}`} className="underline" style={{ color: "#3b82f6" }}>
            {CONTACT_EMAIL}
          </a>,
          part,
        ]
  );
}

function renderStep(step: PlanStep): Step {
  return {
    heading: step.heading,
    body: (
      <>
        <p>{linkify(step.text)}</p>
        {step.items && (
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 max-w-md list-disc pl-5">
            {step.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </>
    ),
  };
}

export default function HighlightFilmSteps() {
  const [planId, setPlanId] = useState<PlanId>("champion");
  const plan = PLANS.find((p) => p.id === planId)!;

  const chooseStep: Step = {
    heading: CHOOSE_PLAN_STEP.heading,
    body: (
      <>
        <p>Pick the plan that fits you. The next steps change based on the plan you choose.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 max-w-2xl" role="radiogroup" aria-label="Highlight film plan">
          {PLANS.map((p) => {
            const selected = p.id === planId;
            return (
              <div
                key={p.id}
                role="radio"
                aria-checked={selected}
                tabIndex={0}
                onClick={() => setPlanId(p.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setPlanId(p.id);
                  }
                }}
                className="cursor-pointer rounded-2xl bg-white p-6 text-left transition-shadow"
                style={{
                  border: selected ? "2px solid #3b82f6" : "1px solid #e5e7eb",
                  boxShadow: selected ? "0 8px 30px rgba(59,130,246,0.15)" : "0 4px 20px rgba(0,0,0,0.04)",
                }}
              >
                <div className="text-sm font-semibold uppercase tracking-wider" style={{ color: "#3b82f6" }}>
                  {selected ? "Showing steps below" : "Tap to see steps"}
                </div>
                <div className="mt-2 text-2xl font-black" style={{ color: "var(--text)" }}>
                  {p.name}
                </div>
                <div className="mt-1 text-base" style={{ color: "var(--muted)" }}>
                  {p.tagline}
                </div>
                <a
                  href={p.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-5 inline-block rounded-lg px-5 py-3 text-sm font-bold text-white transition-opacity hover:opacity-90"
                  style={{ background: GRADIENT }}
                >
                  Purchase {p.name} →
                </a>
              </div>
            );
          })}
        </div>
      </>
    ),
  };

  return (
    <StepTimeline
      title="How It Works"
      subtitle={`Choose your plan, then follow the steps for the ${plan.name} plan (${plan.tagline}).`}
      aside={
        <video
          className="w-full md:w-[480px] aspect-video shrink-0 rounded-2xl object-cover shadow-lg"
          src="/videos/highlight-film-loop.mp4"
          poster="/videos/highlight-film-loop.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-label="Sample Champions Premier highlight film"
        />
      }
      steps={[chooseStep, ...plan.steps.map(renderStep)]}
    />
  );
}
