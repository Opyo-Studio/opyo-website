// Static site content. Source of truth for Projects and People sections.
// Edit here — no backend, no fetch.

export const PROJECTS = [
  {
    code: "OPYO.ENGINE",
    name: "OPYO Engine",
    tagline: "AI streaming infrastructure.",
    description: "AI streaming infrastructure.",
    category: "INFRASTRUCTURE",
    status: "IN_DEV",
    order: 1,
  },
  {
    code: "OPYO.COMMUNITY",
    name: "OPYO Community",
    tagline: "Community platform for builders, creators, and gamers.",
    description: "Community platform for builders, creators, and gamers.",
    category: "PLATFORM",
    status: "LIVE",
    order: 2,
  },
  {
    code: "OPYO.LABS",
    name: "OPYO Labs",
    tagline: "Coming soon.",
    description: "Coming soon.",
    category: "EXPERIMENT",
    status: "COMING_SOON",
    order: 3,
  },
];

export const PEOPLE = [
  {
    name: "Operator 01",
    role: "Co-Founder & CEO",
    bio: "System architect. Builds ecosystems from first principles.",
    avatar_url: "/operators/ceo.png",
    order: 1,
  },
  {
    name: "Operator 02",
    role: "Co-Founder & CTO",
    bio: "Runtime & AI infrastructure. Ex-distributed systems.",
    avatar_url: "/operators/cto.png",
    order: 2,
  },
  {
    name: "Operator 03",
    role: "Head of Studio",
    bio: "Narrative design. Worlds-first mindset.",
    avatar_url: "/operators/studio.png",
    order: 3,
  },
];
