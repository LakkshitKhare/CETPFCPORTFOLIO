import React from "react";
import Image from "next/image";

export function SailLogo({ className = "w-10 h-10", light = false }: { className?: string; light?: boolean }) {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <Image
        src="/images/logo.png"
        alt="SAIL logo"
        width={200}
        height={200}
        className="w-full h-full object-contain"
        priority
      />
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
