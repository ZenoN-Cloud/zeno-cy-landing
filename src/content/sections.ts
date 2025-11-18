export type CTAConfig = {
  headline: string;
  subcopy: string;
  ctaLabel: string;
  privacyNote: string;
};

export type HeroContent = CTAConfig & {
  eyebrow: string;
  perWeekSavings: string;
  demoVideo: {
    src: string;
    poster: string;
  };
  stats: Array<{ label: string; value: string }>;
};

export type PrivacyPillar = {
  title: string;
  description: string;
  icon: "shield" | "chip" | "eyeOff";
};

export type RoadmapItem = {
  label: string;
  description: string;
};

export type RoadmapContent = {
  current: RoadmapItem[];
  upcoming: RoadmapItem[];
};

export type TrustContent = {
  partners: Array<{
    name: string;
    logo: string;
    status: "confirmed" | "placeholder";
  }>;
  quote: {
    body: string;
    author: string;
    role: string;
  };
};

export type FounderCTAContent = CTAConfig & {
  eyebrow: string;
  slotsRemaining: string;
  conciergeDetails: string;
};

export type SectionCopy = {
  hero: HeroContent;
  privacy: {
    title: string;
    badge: string;
    pillars: PrivacyPillar[];
  };
  roadmap: RoadmapContent;
  trust: TrustContent;
  founderCta: FounderCTAContent;
};

export const sectionsCopy: SectionCopy = {
  hero: {
    eyebrow: "Cyprus-first automation",
    headline: "Stop wasting 5 hours a week cleaning bank CSVs.",
    subcopy: "Zeno CY normalises statements from Hellenic, Bank of Cyprus, and Alpha without pushing data to third-party clouds.",
    perWeekSavings: "3–5 hours back every week",
    ctaLabel: "Join private beta",
    privacyNote: "Data processed locally. We'll reply within 24 hours.",
    demoVideo: {
      src: "/demo/zeno-demo.mp4",
      poster: "/demo/poster.png",
    },
    stats: [
      { label: "GDPR-ready", value: "On-device" },
      { label: "Bank formats", value: "3 live" },
      { label: "CSV load", value: "+50MB" },
    ],
  },
  privacy: {
    title: "Your data never leaves your computer",
    badge: "Designed for EU compliance",
    pillars: [
      {
        title: "Zero data storage",
        description: "We never replicate your ledgers to the cloud—everything lives on your machine.",
        icon: "shield",
      },
      {
        title: "100% local processing",
        description: "All parsing happens in a secure desktop runtime optimised for Cyprus banking formats.",
        icon: "chip",
      },
      {
        title: "No tracking",
        description: "No scripts, pixels, or third-party cookies. You decide what's shared.",
        icon: "eyeOff",
      },
    ],
  },
  roadmap: {
    current: [
      {
        label: "CSV upload",
        description: "Drop Hellenic, BoC, Alpha exports and normalise columns instantly.",
      },
      {
        label: "Instant preview",
        description: "Review cleaned rows with filters before exporting.",
      },
      {
        label: "Secure exports",
        description: "Generate audit-ready CSV or XLSX locally.",
      },
    ],
    upcoming: [
      {
        label: "Invoice parsing",
        description: "Match statements to invoices for faster reconciliations.",
      },
      {
        label: "VAT handling",
        description: "Automate Cyprus VAT tags per transaction.",
      },
      {
        label: "PDF support",
        description: "Bring in scanned statements with OCR pipeline.",
      },
    ],
  },
  trust: {
    partners: [
      { name: "IDEA Innovation Center", logo: "/partners/idea.svg", status: "placeholder" },
      { name: "CYBAN", logo: "/partners/cyban.svg", status: "placeholder" },
      { name: "TechIsland", logo: "/partners/techisland.svg", status: "placeholder" },
    ],
    quote: {
      body: "We built Zeno CY because Cyprus accountants deserve privacy-first automation, not another SaaS login.",
      author: "Eleni Antoniou",
      role: "Co-founder, Zeno",
    },
  },
  founderCta: {
    eyebrow: "Founder's Circle",
    headline: "20 early slots with concierge onboarding",
    subcopy: "Help us prioritise Cyprus banking rails, get white-glove setup, and influence our next features.",
    ctaLabel: "Request access",
    privacyNote: "No spam. We follow up manually within a day.",
    slotsRemaining: "12 of 20 founder seats left",
    conciergeDetails: "Includes tailored setup call, migration help, and roadmap votes.",
  },
};