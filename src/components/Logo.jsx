import React from "react";

// Each mark has its own intrinsic aspect ratio. Rendering a non-square asset in
// a square box leaves invisible padding that pushes adjacent text away, so the
// box is derived from the source viewBox instead of assumed to be square.
const ASSETS = {
  mark: { src: "/brand/opyo-mark-clean.svg", ratio: 215.23 / 210.33 },
  energy: { src: "/brand/opyo-energy-clean.svg", ratio: 1 },
};

export default function Logo({
  variant = "mark",
  size = 24,
  className = "",
  glow = false,
}) {
  const { src, ratio } = ASSETS[variant] || ASSETS.mark;
  return (
    <span
      className={`inline-block shrink-0 ${className}`}
      aria-label="OPYO"
      style={{
        width: size,
        height: size / ratio,
        backgroundColor: "currentColor",
        WebkitMask: `url(${src}) center/contain no-repeat`,
        mask: `url(${src}) center/contain no-repeat`,
        filter: glow ? "drop-shadow(0 0 12px rgba(96,165,250,0.55))" : "none",
      }}
    />
  );
}
