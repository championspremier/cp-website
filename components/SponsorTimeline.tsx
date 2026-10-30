import StepTimeline from "@/components/StepTimeline";

const sponsorSteps = [
  {
    heading: "FILL OUT SPONSOR DETAILS",
    body: "Complete our sponsor inquiry form below so we can understand your interest.",
  },
  {
    heading: "MEETING WITH REPRESENTATIVE",
    body: "Schedule a call with our team to discuss sponsorship packages and opportunities.",
  },
  {
    heading: "SPONSOR CHAMPIONS PREMIER",
    body: "Finalize your partnership and join us in developing the next generation of footballers.",
  },
];

export default function SponsorTimeline() {
  return (
    <StepTimeline
      title="Become a Sponsor"
      subtitle="Three simple steps to partner with Champions Premier"
      ctaLabel="FILL OUT FORM"
      ctaHref="#sponsor-form"
      steps={sponsorSteps}
    />
  );
}
