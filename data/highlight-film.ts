export const CONTACT_EMAIL = "info@championspremier.net";

export type PlanId = "champion" | "pro";

export interface PlanStep {
  heading: string;
  text: string;
  items?: string[];
  link?: { label: string; href: string };
}

export interface HighlightPlan {
  id: PlanId;
  name: string;
  tagline: string;
  purchaseUrl: string;
  steps: PlanStep[];
}

// "/copy" links make Google prompt the player to save their own copy,
// so nobody fills in (or sees info on) the shared original.
const CLIPS_DOC_COPY_URL = "https://docs.google.com/document/d/15c1Omrl_r9qGpkhpn_mG8BR6sr9unawtktXL6JpmcMU/copy";
const TIMESTAMPS_DOC_COPY_URL = "https://docs.google.com/document/d/1pCfR4WvbjSz11NhltgNHrmTrQ5mLs8sh0fLYtweiD-U/copy";

const COPY_DOC_TEXT =
  "Click below to make your own copy of our Google Doc. Only fill out your copy, never the original, so your info stays private. Add the following:";

const PLAYER_INFO = ["Full name", "Position", "Height", "Weight", "GPA", "Club", "3–4 photos", "2 songs"];

const SHARE_DOC_STEP: PlanStep = {
  heading: "WE'LL TAKE CARE OF THE REST",
  text: `Share your copy of the Google Doc with ${CONTACT_EMAIL} and our team will start building your highlight reel.`,
};

export const PLANS: HighlightPlan[] = [
  {
    id: "champion",
    name: "Champion",
    tagline: "Highlight Reel with Clips",
    purchaseUrl: "https://championspremier.pushpress.com/landing/plans/plan_b3197b651d4d44",
    steps: [
      {
        heading: "MAKE A COPY OF THE GOOGLE DOC & FILL IT OUT",
        text: COPY_DOC_TEXT,
        items: PLAYER_INFO,
        link: { label: "Make a Copy of the Doc", href: CLIPS_DOC_COPY_URL },
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
        heading: "MAKE A COPY OF THE GOOGLE DOC & FILL IT OUT",
        text: COPY_DOC_TEXT,
        items: PLAYER_INFO,
        link: { label: "Make a Copy of the Doc", href: TIMESTAMPS_DOC_COPY_URL },
      },
      {
        heading: "ADD YOUR OPPONENT",
        text: "In your copy of the doc, write down the name of the team you played.",
      },
      {
        heading: "ADD THE GAME LINK",
        text: "In your copy of the doc, paste the link to the full game video.",
      },
      {
        heading: "REVIEW THE GAME & NOTE TIMESTAMPS",
        text: "Watch the game and, in your copy of the doc, note the timestamp of each highlight, with a short explanation of the play.",
      },
      SHARE_DOC_STEP,
    ],
  },
];

export const CHOOSE_PLAN_STEP: PlanStep = {
  heading: "CHOOSE YOUR PLAN",
  text: "Purchase the Champion plan (Highlight Reel with Clips) or the Pro plan (Highlight Reel with Timestamps).",
};
