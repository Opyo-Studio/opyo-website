import React from "react";
import SectionShell from "../SectionShell";
import { playClick } from "../../hooks/useSound";
import { ArrowUpRight } from "lucide-react";

// Update this to the real inbox.
const CAREERS_EMAIL = "careers@opyo.dev";

const INCLUDE = [
  {
    k: "01",
    t: "Who you are",
    d: "Name, the role you do now, and the role you want to grow into.",
  },
  {
    k: "02",
    t: "What you've built",
    d: "Ships beat resumes. Link the thing you're proudest of and tell us your part in it.",
  },
  {
    k: "03",
    t: "What you want to build",
    d: "Which system in the ecosystem pulls at you, and what you'd change about it.",
  },
  {
    k: "04",
    t: "Where to look",
    d: "Portfolio, GitHub, or anything that shows the work rather than describing it.",
  },
];

export default function Careers({ onClose }) {
  return (
    <SectionShell
      code="C / 06"
      eyebrow="Careers"
      title={
        <>
          Join the<br />
          <span className="text-[#60A5FA] glow-text">ecosystem.</span>
        </>
      }
      tagline="We hire slowly and with care. Tell us what you've built and what you want to build next."
      onClose={onClose}
    >
      <div className="border-t border-[#1E293B] pt-8 pb-16 md:pb-20 mb-20">
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-6">
          Open application
        </div>
        <a
          href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
            "Application — OPYO"
          )}`}
          data-testid="careers-email-link"
          onClick={playClick}
          className="group inline-flex items-baseline gap-3 md:gap-5 font-display font-semibold text-[#E8EEF5] hover:text-[#60A5FA] transition-colors duration-300"
          style={{
            fontSize: "clamp(30px, 6vw, 76px)",
            letterSpacing: "-0.03em",
            lineHeight: 1,
          }}
        >
          <span className="group-hover:glow-text break-all">{CAREERS_EMAIL}</span>
          <ArrowUpRight
            className="shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
            style={{ width: "clamp(20px, 3vw, 40px)", height: "auto" }}
          />
        </a>
        <p className="mt-10 text-[#8B9BB4] max-w-xl text-base md:text-lg leading-relaxed">
          No forms, no portals. One email, read by an operator. If there's a fit,
          we'll reach out — we read every one.
        </p>
      </div>

      <div>
        <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA] mb-8">
          What to include
        </div>
        <div>
          {INCLUDE.map((x) => (
            <div
              key={x.k}
              className="border-t border-[#1E293B] py-7 md:py-8 grid grid-cols-12 gap-6 items-baseline"
            >
              <div className="col-span-2 md:col-span-1 font-mono text-[10px] uppercase tracking-[0.3em] text-[#60A5FA]">
                /{x.k}
              </div>
              <div className="col-span-10 md:col-span-4">
                <div
                  className="font-display font-semibold text-2xl md:text-4xl text-[#E8EEF5]"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {x.t}
                </div>
              </div>
              <div className="col-span-12 md:col-span-7 text-[#8B9BB4] text-base md:text-lg leading-relaxed">
                {x.d}
              </div>
            </div>
          ))}
          <div className="border-t border-[#1E293B]" />
        </div>
      </div>
    </SectionShell>
  );
}
