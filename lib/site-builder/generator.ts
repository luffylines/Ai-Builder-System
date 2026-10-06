import { SiteSection, SiteSpec } from "./types";

const palettes = {
  purple: { primary: "#8b5cf6", accent: "#c084fc" },
  blue: { primary: "#2563eb", accent: "#60a5fa" },
  green: { primary: "#16a34a", accent: "#4ade80" },
  gold: { primary: "#d97706", accent: "#fbbf24" },
  red: { primary: "#e11d48", accent: "#fb7185" },
  cyan: { primary: "#0891b2", accent: "#22d3ee" },
};

const categoryContent: Record<string, Partial<SiteSpec>> = {
  coffee: {
    name: "Noir Coffee",
    category: "Coffee Shop",
    description: "Small-batch coffee, crafted with intention.",
    hero: {
      eyebrow: "ROASTED DAILY · SERVED SLOWLY",
      title: "Coffee worth slowing down for.",
      subtitle: "A warm neighborhood coffee experience with carefully sourced beans and thoughtful brewing.",
      primaryCta: "Explore the menu",
      secondaryCta: "Visit our shop",
    },
    features: [
      { title: "Single-origin beans", description: "Seasonal beans selected for clarity, sweetness, and balance." },
      { title: "Craft brewing", description: "Espresso and filter recipes dialed in throughout the day." },
      { title: "Local community", description: "A calm space designed for conversations, work, and slow mornings." },
    ],
  },
  restaurant: {
    name: "Maison Table",
    category: "Restaurant",
    description: "A modern dining room built around seasonal ingredients.",
    hero: {
      eyebrow: "SEASONAL · LOCAL · MEMORABLE",
      title: "A table made for unforgettable nights.",
      subtitle: "Contemporary plates, warm hospitality, and a menu inspired by the best of every season.",
      primaryCta: "Reserve a table",
      secondaryCta: "View menu",
    },
  },
  saas: {
    name: "Northstar",
    category: "SaaS",
    description: "A modern operating layer for ambitious teams.",
    hero: {
      eyebrow: "MOVE FASTER WITH LESS BUSYWORK",
      title: "Turn complex work into clear momentum.",
      subtitle: "Plan, automate, and track the work that matters from one beautifully simple workspace.",
      primaryCta: "Start building free",
      secondaryCta: "See how it works",
    },
  },
  portfolio: {
    name: "Avery Studio",
    category: "Portfolio",
    description: "Selected work, experiments, and collaborations.",
    hero: {
      eyebrow: "DESIGN · DIGITAL · DIRECTION",
      title: "I create digital work people remember.",
      subtitle: "Independent designer focused on expressive interfaces, strong systems, and thoughtful interaction.",
      primaryCta: "View selected work",
      secondaryCta: "About me",
    },
  },
  hotel: {
    name: "The Aurelia",
    category: "Hotel",
    description: "A quiet city escape with considered details.",
    hero: {
      eyebrow: "STAY SOMEWHERE UNFORGETTABLE",
      title: "A slower kind of luxury.",
      subtitle: "Thoughtful rooms, local experiences, and effortless hospitality in the heart of the city.",
      primaryCta: "Check availability",
      secondaryCta: "Explore rooms",
    },
  },
  healthcare: {
    name: "Luma Health",
    category: "Healthcare",
    description: "Clear, compassionate care for everyday health.",
    hero: {
      eyebrow: "CARE THAT FITS REAL LIFE",
      title: "Better care starts with being heard.",
      subtitle: "Modern healthcare with accessible appointments, clear next steps, and a team that stays connected.",
      primaryCta: "Book an appointment",
      secondaryCta: "Meet the team",
    },
  },
  education: {
    name: "Atlas Academy",
    category: "Education",
    description: "Learning designed for curious, capable people.",
    hero: {
      eyebrow: "LEARN WITH PURPOSE",
      title: "Build skills that move your future forward.",
      subtitle: "Practical learning paths, expert guidance, and a community that helps you keep going.",
      primaryCta: "Explore programs",
      secondaryCta: "How it works",
    },
  },
  agency: {
    name: "Signal Works",
    category: "Agency",
    description: "Brand, product, and growth for ambitious companies.",
    hero: {
      eyebrow: "STRATEGY · DESIGN · GROWTH",
      title: "We make ambitious brands impossible to ignore.",
      subtitle: "A small senior team creating sharp identities, digital products, and campaigns that move people.",
      primaryCta: "Start a project",
      secondaryCta: "View our work",
    },
  },
};

function getCategory(prompt: string) {
  const p = prompt.toLowerCase();
  if (/coffee|cafe|café/.test(p)) return "coffee";
  if (/restaurant|food|dining/.test(p)) return "restaurant";
  if (/saas|software|startup|app landing/.test(p)) return "saas";
  if (/portfolio|designer|developer portfolio|personal site/.test(p)) return "portfolio";
  if (/hotel|resort|stay|booking/.test(p)) return "hotel";
  if (/health|clinic|medical|doctor|dental/.test(p)) return "healthcare";
  if (/school|education|academy|course|university/.test(p)) return "education";
  if (/agency|creative studio|marketing/.test(p)) return "agency";
  return "saas";
}

function defaultSpec(category: string): SiteSpec {
  const base: SiteSpec = {
    name: "Northstar",
    category: "SaaS",
    description: "A polished website generated from your prompt.",
    theme: {
      mode: "dark",
      primary: palettes.purple.primary,
      accent: palettes.purple.accent,
      background: "#07070b",
      surface: "#111118",
      text: "#f8fafc",
      muted: "#a1a1aa",
      effect: "glass",
    },
    hero: {
      eyebrow: "BUILT FROM YOUR PROMPT",
      title: "Turn an idea into a polished website.",
      subtitle: "Describe what you want, generate a strong first draft, then refine it conversationally.",
      primaryCta: "Get started",
      secondaryCta: "Learn more",
    },
    sections: ["features", "stats", "testimonials", "pricing", "faq", "contact"],
    features: [
      { title: "Fast by default", description: "A focused experience with responsive layouts and production-minded structure." },
      { title: "Designed to convert", description: "Strong hierarchy, clear calls to action, and intentional visual rhythm." },
      { title: "Easy to refine", description: "Follow-up prompts can change theme, sections, messaging, and visual direction." },
    ],
    stats: [
      { value: "3×", label: "faster iteration" },
      { value: "100%", label: "responsive" },
      { value: "24/7", label: "ready to create" },
    ],
    testimonials: [
      { quote: "The first draft already felt like a real product, not a generic template.", name: "Maya Chen", role: "Product Lead" },
      { quote: "We went from rough idea to a confident direction in one sitting.", name: "Jon Bell", role: "Founder" },
    ],
    pricing: [
      { name: "Starter", price: "$0", description: "For exploring ideas and lightweight sites." },
      { name: "Pro", price: "$19", description: "For polished projects and continuous iteration.", popular: true },
      { name: "Studio", price: "$49", description: "For teams shipping multiple client projects." },
    ],
    faqs: [
      { question: "Can I edit the result?", answer: "Yes. Use follow-up prompts to change the theme, content, sections, or visual direction." },
      { question: "Is it responsive?", answer: "Yes. The generated preview is designed for desktop, tablet, and mobile layouts." },
      { question: "Do I need an AI key?", answer: "No for local fallback generation. Add a supported provider key to enable model-powered generation." },
    ],
    contact: {
      heading: "Ready to build something great?",
      copy: "Tell us what you want to create and turn the idea into a strong first version.",
      email: "hello@example.com",
    },
  };

  const content = categoryContent[category];
  return {
    ...base,
    ...content,
    theme: base.theme,
    hero: { ...base.hero, ...(content?.hero ?? {}) },
    features: content?.features ?? base.features,
  };
}

const sections: SiteSection[] = ["features", "stats", "testimonials", "pricing", "faq", "contact"];

export function generateSiteSpec(prompt: string, current?: SiteSpec | null): SiteSpec {
  const lower = prompt.toLowerCase();
  const startsFresh = !current || /rebuild|new website|start over|create a|build a/.test(lower);
  const category = startsFresh
    ? getCategory(prompt)
    : getCategory(`${current.category} ${prompt}`);
  const spec = current ? structuredClone(current) : defaultSpec(category);
  const fresh = defaultSpec(category);

  if (startsFresh) {
    Object.assign(spec, fresh);
  }

  if (/(dark|black theme|night)/.test(lower)) {
    spec.theme.mode = "dark";
    spec.theme.background = "#07070b";
    spec.theme.surface = "#111118";
    spec.theme.text = "#f8fafc";
    spec.theme.muted = "#a1a1aa";
  }
  if (/(light theme|make it light|white theme)/.test(lower)) {
    spec.theme.mode = "light";
    spec.theme.background = "#f7f7fb";
    spec.theme.surface = "#ffffff";
    spec.theme.text = "#111827";
    spec.theme.muted = "#667085";
  }

  for (const [name, palette] of Object.entries(palettes)) {
    if (lower.includes(name)) {
      spec.theme.primary = palette.primary;
      spec.theme.accent = palette.accent;
    }
  }

  if (/glass|glassmorphism/.test(lower)) spec.theme.effect = "glass";
  if (/neon|futuristic|cyber/.test(lower)) spec.theme.effect = "neon";
  if (/minimal|clean|simple/.test(lower)) spec.theme.effect = "minimal";
  if (/soft|warm|friendly/.test(lower)) spec.theme.effect = "soft";

  for (const section of sections) {
    if (new RegExp(`add (a |the )?${section}`).test(lower) && !spec.sections.includes(section)) {
      spec.sections.push(section);
    }
    if (new RegExp(`remove (the )?${section}|without ${section}|hide (the )?${section}`).test(lower)) {
      spec.sections = spec.sections.filter((item) => item !== section);
    }
  }

  if (/no pricing|without pricing/.test(lower)) spec.sections = spec.sections.filter((x) => x !== "pricing");
  if (/sticky navbar/.test(lower)) spec.description = `${spec.description} · Sticky navigation enabled`;

  const nameMatch = prompt.match(/(?:called|named|name it)\s+["']?([A-Za-z0-9 &.-]{2,36})["']?/i);
  if (nameMatch?.[1]) spec.name = nameMatch[1].trim();

  return spec;
}

export function normalizeSiteSpec(input: Partial<SiteSpec>, fallback: SiteSpec): SiteSpec {
  return {
    ...fallback,
    ...input,
    theme: { ...fallback.theme, ...(input.theme ?? {}) },
    hero: { ...fallback.hero, ...(input.hero ?? {}) },
    contact: { ...fallback.contact, ...(input.contact ?? {}) },
    sections: Array.isArray(input.sections) ? input.sections.filter((s): s is SiteSection => sections.includes(s as SiteSection)) : fallback.sections,
    features: Array.isArray(input.features) ? input.features.slice(0, 6) : fallback.features,
    stats: Array.isArray(input.stats) ? input.stats.slice(0, 4) : fallback.stats,
    testimonials: Array.isArray(input.testimonials) ? input.testimonials.slice(0, 4) : fallback.testimonials,
    pricing: Array.isArray(input.pricing) ? input.pricing.slice(0, 4) : fallback.pricing,
    faqs: Array.isArray(input.faqs) ? input.faqs.slice(0, 6) : fallback.faqs,
  };
}
