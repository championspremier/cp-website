export const CONTACT_EMAIL = "info@championspremier.net";

export type PlanId = "champion" | "pro";

export interface PlanStep {
  heading: string;
  text: string;
  items?: string[];
}

export interface HighlightPlan {
  id: PlanId;
  name: string;
  tagline: string;
  purchaseUrl: string;
  steps: PlanStep[];
}

const PLAYER_INFO = ["Full name", "Position", "Height", "Weight", "GPA", "Club", "3–4 photos", "2 songs"];

const SHARE_DOC_STEP: PlanStep = {
  heading: "WE'LL TAKE CARE OF THE REST",
  text: `Share your Google Doc with ${CONTACT_EMAIL} and our team will start building your highlight reel.`,
};

export const PLANS: HighlightPlan[] = [
  {
    id: "champion",
    name: "Champion",
    tagline: "Highlight Reel with Clips",
    purchaseUrl: "https://championspremier.pushpress.com/landing/plans/plan_b3197b651d4d44",
    steps: [
      {
        heading: "FILL OUT YOUR PLAYER INFO",
        text: "Fill out the Google Doc with the following:",
        items: PLAYER_INFO,
      },
      {
        heading: "GATHER YOUR CLIPS",
        text: "Put your clips in Dropbox or create a public Google Drive folder.",
      },
      {
        heading: "UPLOAD YOUR CLIPS",
        text: `After your purchase, add your clips to the shared Dropbox link by clicking "Upload files" in the top left. Or share your Google Drive folder link with ${CONTACT_EMAIL}.`,
      },
      SHARE_DOC_STEP,
    ],
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "Highlight Reel with Timestamps",
    purchaseUrl: "https://championspremier.pushpress.com/landing/plans/plan_769d43ea790ba8",
    steps: [
      {
        heading: "DUPLICATE THE GOOGLE DOC & FILL IT OUT",
        text: "Make your own copy of the Google Doc and fill out the following:",
        items: PLAYER_INFO,
      },
      {
        heading: "ADD YOUR OPPONENT",
        text: "Write down the name of the team you played.",
      },
      {
        heading: "ADD THE GAME LINK",
        text: "Paste the link to the full game video.",
      },
      {
        heading: "REVIEW THE GAME & NOTE TIMESTAMPS",
        text: "Watch the game and note the timestamp of each highlight, with a short explanation of the play.",
      },
      SHARE_DOC_STEP,
    ],
  },
];

export const CHOOSE_PLAN_STEP: PlanStep = {
  heading: "CHOOSE YOUR PLAN",
  text: "Purchase the Champion plan (Highlight Reel with Clips) or the Pro plan (Highlight Reel with Timestamps).",
};
