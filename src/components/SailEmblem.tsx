import React from "react";

export function SailLogo({ className = "w-10 h-10", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center font-bold select-none ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-sm"
        aria-hidden="true"
      >
        {/* Steel hex outer shield */}
        <polygon
          points="50,4 92,26 92,74 50,96 8,74 8,26"
          fill={light ? "#ffffff" : "#0B2545"}
          stroke={light ? "#93C5FD" : "#1E40AF"}
          strokeWidth="4"
        />
        {/* Inner steel ingot / triangle facets */}
        <polygon
          points="50,14 82,32 82,68 50,86 18,68 18,32"
          fill={light ? "#1E3A8A" : "#1E3A8A"}
          opacity="0.15"
        />
        {/* SAIL Steel Bloom / Ingot Geometry */}
        <path
          d="M50 18 L76 34 L76 66 L50 82 L24 66 L24 34 Z"
          stroke={light ? "#60A5FA" : "#3B82F6"}
          strokeWidth="3"
          fill="none"
        />
        <path
          d="M50 18 L50 82"
          stroke={light ? "#93C5FD" : "#60A5FA"}
          strokeWidth="3.5"
        />
        <path
          d="M24 34 L76 66"
          stroke={light ? "#93C5FD" : "#60A5FA"}
          strokeWidth="2.5"
        />
        <path
          d="M24 66 L76 34"
          stroke={light ? "#93C5FD" : "#60A5FA"}
          strokeWidth="2.5"
        />
        {/* Central Core */}
        <circle
          cx="50"
          cy="50"
          r="9"
          fill={light ? "#F59E0B" : "#D97706"}
          stroke={light ? "#ffffff" : "#0B2545"}
          strokeWidth="2"
        />
      </svg>
    </div>
  );
}

export function GovernmentOfIndiaLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex flex-col text-left">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          A Maharatna PSU
        </span>
        <span className="text-xs font-bold text-slate-800 tracking-tight">
          Govt. of India Enterprise
        </span>
      </div>
    </div>
  );
}
