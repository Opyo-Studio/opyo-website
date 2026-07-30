import React from "react";
import SectionShell from "../SectionShell";
import { PEOPLE } from "../../lib/content";

function Avatar({ index, avatarUrl }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <div
      className="w-full aspect-[4/5] flex items-end p-6 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.22), transparent 65%), linear-gradient(180deg, #0C0E12 0%, #060708 100%)",
      }}
    >
      {avatarUrl && (
        <img
          src={avatarUrl}
          alt={`Operator ${num}`}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500 ease-out"
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-[#060708] via-transparent to-[#0C0E12]/10 opacity-90 pointer-events-none"
      />
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(0deg, transparent 96%, rgba(96,165,250,0.4) 100%), linear-gradient(90deg, transparent 96%, rgba(96,165,250,0.4) 100%)",
          backgroundSize: "24px 24px",
        }}
      />
      <div
        className="absolute top-5 left-5 font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] z-10"
      >
        /{num}
      </div>
      <span
        className="relative font-display font-bold text-[#E8EEF5] glow-text z-10"
        style={{ fontSize: "clamp(64px, 11vw, 140px)", lineHeight: 0.8, letterSpacing: "-0.04em" }}
      >
        {num}
      </span>
    </div>
  );
}

export default function People({ onClose }) {
  return (
    <SectionShell
      code="PPL / 03"
      eyebrow="People"
      title={
        <>
          The<br />
          <span className="text-[#60A5FA] glow-text">operators.</span>
        </>
      }
      tagline="A small cell building the infrastructure behind the ecosystem."
      onClose={onClose}
    >
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {PEOPLE.map((p, i) => (
          <div
            key={p.name}
            data-testid={`person-card-${i}`}
            className="group"
          >
            <Avatar index={i} avatarUrl={p.avatar_url} />
            <div className="pt-5 border-t border-[#1E293B] group-hover:border-[#60A5FA] transition-colors">
              <div className="flex items-baseline justify-between mb-2">
                <div
                  className="font-display text-lg md:text-xl font-semibold text-[#E8EEF5]"
                  style={{ letterSpacing: "-0.01em" }}
                >
                  {p.name}
                </div>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#60A5FA]">
                {p.role}
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
