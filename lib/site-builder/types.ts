export type SiteSection =
  | "features"
  | "stats"
  | "testimonials"
  | "pricing"
  | "faq"
  | "contact";

export type SiteSpec = {
  name: string;
  category: string;
  description: string;
  theme: {
    mode: "light" | "dark";
    primary: string;
    accent: string;
    background: string;
    surface: string;
    text: string;
    muted: string;
    effect: "soft" | "glass" | "neon" | "minimal";
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primaryCta: string;
    secondaryCta: string;
  };
  sections: SiteSection[];
  features: Array<{ title: string; description: string }>;
  stats: Array<{ value: string; label: string }>;
  testimonials: Array<{ quote: string; name: string; role: string }>;
  pricing: Array<{ name: string; price: string; description: string; popular?: boolean }>;
  faqs: Array<{ question: string; answer: string }>;
  contact: {
    heading: string;
    copy: string;
    email: string;
  };
};
