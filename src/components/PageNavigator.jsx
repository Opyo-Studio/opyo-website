import React, { useState } from "react";
import { Volume2, VolumeX, Menu } from "lucide-react";
import { playClick, playHover } from "../hooks/useSound";

export default function PageNavigator({ active, onSelect, muted, onToggleMute }) {
  const [isHovered, setHovered] = useState(false);

  const goHub = () => {
    playClick();
    onSelect?.(null);
  };

  return (
    <>
      {/* Center Capsule - Docked Semi-Circular Dome */}
      <div
        className="fixed bottom-0 left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
        data-testid="page-navigator"
      >
        <button
          data-testid="nav-menu-button"
          onMouseEnter={() => {
            playHover();
            setHovered(true);
          }}
          onMouseLeave={() => setHovered(false)}
          onClick={goHub}
          className="w-[60px] h-[60px] md:w-[68px] md:h-[68px] rounded-full flex justify-center items-start pt-[8px] md:pt-[10px] text-[#8B9BB4] hover:text-[#60A5FA] transition-all duration-300 transform translate-y-1/2 hover:translate-y-[calc(50%-3px)] focus:outline-none"
          style={{
            background: "rgba(12,14,18,0.85)",
            backdropFilter: "blur(20px) saturate(150%)",
            WebkitBackdropFilter: "blur(20px) saturate(150%)",
            border: isHovered
              ? "1px solid rgba(96,165,250,0.25)"
              : "1px solid rgba(232,238,245,0.1)",
            boxShadow: isHovered
              ? "0 0 0 1px rgba(96,165,250,0.2), 0 20px 40px -12px rgba(0,0,0,0.6), 0 0 30px 4px rgba(96,165,250,0.35)"
              : "0 0 0 1px rgba(96,165,250,0.08), 0 20px 40px -12px rgba(0,0,0,0.6), 0 0 24px -8px rgba(96,165,250,0.15)",
          }}
          aria-label="Return to Hub Menu"
        >
          <Menu size={14} />
        </button>
      </div>

      {/* Sound Control (Keep in bottom-right corner, reduced size) */}
      <div
        className="fixed bottom-5 md:bottom-8 right-5 md:right-10 z-40 pointer-events-auto"
        data-testid="sound-control-container"
      >
        <button
          data-testid="nav-sound"
          onMouseEnter={playHover}
          onClick={onToggleMute}
          className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-full text-[#8B9BB4] hover:text-[#60A5FA] hover:bg-[#60A5FA]/10 transition-colors focus:outline-none"
          style={{
            background: "rgba(12,14,18,0.85)",
            backdropFilter: "blur(20px) saturate(150%)",
            WebkitBackdropFilter: "blur(20px) saturate(150%)",
            border: "1px solid rgba(232,238,245,0.1)",
            boxShadow:
              "0 0 0 1px rgba(96,165,250,0.08), 0 20px 40px -12px rgba(0,0,0,0.6), 0 0 24px -8px rgba(96,165,250,0.15)",
          }}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          {muted ? <VolumeX size={11} /> : <Volume2 size={11} />}
        </button>
      </div>
    </>
  );
}
