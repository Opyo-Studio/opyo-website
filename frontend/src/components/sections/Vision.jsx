import React from "react";
import SectionShell from "../SectionShell";

const PILLARS = [
  { n: "01", t: "Streaming Engine", s: "INFRASTRUCTURE" },
  { n: "02", t: "OPYO Community", s: "PLATFORM" },
  { n: "03", t: "OPYO Labs", s: "RESEARCH" },
];

export default function Vision({ onClose }) {
  return (
    <SectionShell
      code="V / 01"
      eyebrow="Vision"
      title={
        <>
          We build<br />
          <span className="text-[#60A5FA] glow-text">ecosystems.</span>
        </>
      }
      tagline="The operating system for games, creators, and players. Three systems. One ecosystem."
      onClose={onClose}
    >
      <div className="grid md:grid-cols-3 gap-8 md:gap-10 -mt-5 md:-mt-7 pt-4">
        {PILLARS.map((p, i) => (
          <div key={p.n} className="border-t border-[#1E293B] pt-6 group">
            <div className="flex items-baseline justify-between mb-6">
              <span className="font-mono text-[10px] font-normal uppercase tracking-[0.35em] text-[#93C5FD]">
                /{p.n}
              </span>
              <span className="font-mono text-[10px] font-normal uppercase tracking-[0.35em] text-[#A3B1C6]">
                {p.s}
              </span>
            </div>
            <div
              className="font-display text-4xl md:text-5xl font-semibold text-[#E8EEF5] group-hover:text-[#60A5FA] transition-colors duration-300"
              style={{ letterSpacing: "-0.02em" }}
            >
              {p.t}
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
