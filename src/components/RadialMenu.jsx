import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Eye,
  LayoutGrid,
  Users,
  Info,
  Briefcase,
} from "lucide-react";
import { playHover, playClick } from "../hooks/useSound";

const ITEMS = [
  { key: "vision", label: "Vision", Icon: Eye },
  { key: "projects", label: "Projects", Icon: LayoutGrid },
  { key: "people", label: "People", Icon: Users },
  { key: "about", label: "About", Icon: Info },
  { key: "careers", label: "Careers", Icon: Briefcase },
];

export default function RadialMenu({ onSelect }) {
  const [hovered, setHovered] = useState(null);

  // Pointer parallax is owned here rather than in App: keeping it local stops
  // every mousemove from re-rendering the HUD, nav and active section.
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const rafRef = useRef(null);
  useEffect(() => {
    const onMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        setMouse({
          x: e.clientX / window.innerWidth - 0.5,
          y: e.clientY / window.innerHeight - 0.5,
        });
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const radius = useMemo(() => {
    if (typeof window === "undefined") return 300;
    const w = window.innerWidth;
    if (w < 640) return 150;
    if (w < 1024) return 220;
    return 300;
  }, []);

  const parX = (mouse?.x || 0) * 14;
  const parY = (mouse?.y || 0) * 14;

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none"
      data-testid="radial-menu"
    >
      {ITEMS.map((it, i) => {
        const angle = (i / ITEMS.length) * Math.PI * 2 - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const { Icon } = it;
        const isHover = hovered === it.key;
        return (
          <button
            key={it.key}
            data-testid={`radial-menu-item-${it.key}`}
            onMouseEnter={() => {
              setHovered(it.key);
              playHover();
            }}
            onMouseLeave={() => setHovered(null)}
            onClick={() => {
              playClick();
              onSelect?.(it.key);
            }}
            className="absolute pointer-events-auto group"
            style={{
              left: "50%",
              top: "50%",
              transform: `translate(calc(-50% + ${x + parX * 0.8}px), calc(-50% + ${
                y + parY * 0.8
              }px))`,
              transition: "transform 350ms cubic-bezier(.2,.8,.2,1)",
            }}
          >
            <div className="flex flex-col items-center gap-2">
              <span
                className={`flex items-center justify-center w-11 h-11 md:w-12 md:h-12 transition-all duration-300 ${
                  isHover ? "scale-110" : "scale-100"
                }`}
                style={{
                  color: isHover ? "#60A5FA" : "#E8EEF5",
                  filter: isHover
                    ? "drop-shadow(0 0 12px rgba(96,165,250,0.7))"
                    : "none",
                }}
              >
                <Icon size={22} strokeWidth={1.5} />
              </span>
              <span
                className={`font-display uppercase tracking-[0.22em] text-xs transition-colors ${
                  isHover ? "text-[#60A5FA]" : "text-[#E8EEF5]"
                }`}
              >
                {it.label}
              </span>
              <span
                className={`h-px bg-[#60A5FA] transition-all duration-300 ${
                  isHover ? "w-8 opacity-100" : "w-0 opacity-0"
                }`}
              />
            </div>
          </button>
        );
      })}
    </div>
  );
}
