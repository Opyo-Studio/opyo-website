// Static site content. Source of truth for Projects and People sections.
// Edit here — no backend, no fetch.

export const PROJECTS = [
  {
    code: "OPYO.NEXUS",
    name: "OPYO Nexus",
    tagline: "AI workstation for creators, developers, and streamers.",
    description:
      "A sovereign AI workstation that unifies chat, code, streaming, and automation into one intelligent environment. Context-aware agents, an integrated IDE, a full terminal, voice control, a plugin surface, and multi-model routing across GPT, Claude, and local models.",
    category: "WORKSTATION",
    status: "BETA",
    order: 1,
  },
  {
    code: "OPYO.ENGINE",
    name: "OPYO Engine",
    tagline: "AI streaming infrastructure.",
    description:
      "Broadcast engine, AI moderator, AI streaming partner, smart highlights, and avatar system — the real-time runtime that turns gameplay into an intelligent stream.",
    category: "INFRASTRUCTURE",
    status: "IN_DEV",
    order: 2,
  },
  {
    code: "PRZMO",
    name: "PRZMO",
    tagline: "Identity and network layer for gaming.",
    description:
      "Gamer profiles, tournaments, creator marketplace, and communities — a portable identity graph that travels with the player across every title in the ecosystem.",
    category: "PLATFORM",
    status: "IN_DEV",
    order: 3,
  },
  {
    code: "OPYO.STUDIOS",
    name: "OPYO Studios",
    tagline: "Games, original IPs, and indie publishing.",
    description:
      "Publishing label for worlds worth living in — original IPs, selective indie publishing, and creator-driven promotion engineered with AI-native tooling.",
    category: "STUDIO",
    status: "LIVE",
    order: 4,
  },
  {
    code: "OPYO.LABS/001",
    name: "Lucid Engine",
    tagline: "Realtime narrative agent mesh.",
    description:
      "An experimental AI director that shapes quests, pacing, and dialogue on the fly — a research spike powering future Studios releases.",
    category: "EXPERIMENT",
    status: "CONCEPT",
    order: 10,
  },
  {
    code: "OPYO.LABS/002",
    name: "Signal",
    tagline: "Low-latency coach for competitive play.",
    description:
      "On-device analysis for reflex, positioning, and macro decisions. A glimpse at what Engine becomes when it plays with you, not just around you.",
    category: "EXPERIMENT",
    status: "CONCEPT",
    order: 11,
  },
  {
    code: "OPYO.LABS/003",
    name: "Arena Protocol",
    tagline: "Trust fabric for cross-title tournaments.",
    description:
      "A verifiable, publisher-agnostic match layer — the invisible plumbing of PRZMO's tournament network.",
    category: "EXPERIMENT",
    status: "CONCEPT",
    order: 12,
  },
];

export const PEOPLE = [
  {
    name: "Operator 01",
    role: "Founder & CEO",
    bio: "System architect. Builds ecosystems from first principles.",
    order: 1,
  },
  {
    name: "Operator 02",
    role: "Chief Technology Officer",
    bio: "Runtime & AI infrastructure. Ex-distributed systems.",
    order: 2,
  },
  {
    name: "Operator 03",
    role: "Head of Studio",
    bio: "Narrative design. Worlds-first mindset.",
    order: 3,
  },
  {
    name: "Operator 04",
    role: "Head of Platform",
    bio: "Identity, networks, trust.",
    order: 4,
  },
  {
    name: "Operator 05",
    role: "Director, Nexus",
    bio: "Agentic UX for creators.",
    order: 5,
  },
  {
    name: "Operator 06",
    role: "Design Lead",
    bio: "Interfaces between humans and systems.",
    order: 6,
  },
];
