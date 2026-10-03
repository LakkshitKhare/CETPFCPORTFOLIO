"use client";

import React from "react";
import Image from "next/image";
import { FolderKanban, ShieldCheck, ArrowRight, Layers, Award } from "lucide-react";

interface HeroSectionProps {
  totalProjects: number;
  stage2Count: number;
  onExplorePortfolio?: () => void;
}

export function HeroSection({
  totalProjects,
  stage2Count,
  onExplorePortfolio,
}: HeroSectionProps) {
  return (
    <section id="home" className="relative bg-[#07162C] text-white overflow-hidden border-b border-slate-800">
      {/* Background Graphic / Overlay */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <Image
          src="/images/sail-cet-hq.jpg"
          alt="SAIL CET Ranchi Engineering Headquarters"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#07162C] via-[#07162C]/90 to-[#0B2545]/80" />
      </div>

      {/* Subtle Grid Pattern Overlay */}
      <div
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.2) 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-8 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-950/80 border border-blue-700/50 text-blue-300 text-[11px] sm:text-xs font-semibold tracking-[0.12em] uppercase shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Centre for Enineering and Technology</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-black tracking-[-0.05em] text-white leading-[0.95] max-w-5xl">
              Steel Authority of India Limited
            </h1>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#portfolio"
                onClick={onExplorePortfolio}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm tracking-wide shadow-lg shadow-blue-900/40 hover:shadow-blue-700/50 transition-all cursor-pointer group"
              >
                <FolderKanban className="w-4 h-4 text-sky-200 group-hover:scale-110 transition-transform" />
                <span>View Project Portfolio</span>
                <ArrowRight className="w-4 h-4 text-sky-200 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#lifecycle"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-sm transition-colors cursor-pointer"
              >
                <Layers className="w-4 h-4 text-slate-400" />
                <span>Formulation Lifecycle</span>
              </a>
            </div>

            {/* Institutional Trust Badges */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-slate-800/80">
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                  Parent Enterprise
                </span>
                <span className="font-semibold text-slate-100 text-xs sm:text-sm">
                  SAIL (Maharatna PSU)
                </span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                  Headquarters
                </span>
                <span className="font-semibold text-slate-100 text-xs sm:text-sm">
                  Ispat Bhawan, Ranchi
                </span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                  Active Plants Served
                </span>
                <span className="font-semibold text-slate-100 text-xs sm:text-sm">
                  SAIL PLANTS
                </span>
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider text-slate-400 font-medium">
                  Certification
                </span>
                <span className="font-semibold text-slate-100 text-xs sm:text-sm flex items-center gap-1">
                  <Award className="w-3.5 h-3.5 text-amber-400" /> ISO 9001:2015
                </span>
              </div>
            </div>
          </div>

          {/* Quick Hero Stat Preview Card */}
          <div className="lg:col-span-4">
            <div className="bg-gradient-to-b from-slate-900/90 to-[#0B2545]/90 border border-blue-900/60 rounded-xl p-6 shadow-2xl backdrop-blur-sm">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <span className="text-xs uppercase tracking-wider font-bold text-sky-400">
                  Live Portfolio Glance
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  LIVE
                </span>
              </div>

              <div className="space-y-4">
                <div className="bg-slate-950/60 rounded-lg p-3.5 border border-slate-800">
                  <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">
                    Total Records In Portfolio
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-black text-white font-mono">
                      {totalProjects > 0 ? totalProjects : "—"}
                    </span>
                    <span className="text-xs text-slate-400">assignments mapped</span>
                  </div>
                </div>

                <div className="bg-slate-950/60 rounded-lg p-3.5 border border-slate-800">
                  <span className="text-xs text-emerald-400 font-medium uppercase tracking-wider">
                    Stage 2 (Final Sanctions / Execution)
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-emerald-300 font-mono">
                      {stage2Count > 0 ? stage2Count : "—"}
                    </span>
                    <span className="text-xs text-slate-400">advanced projects</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800">
                <a
                  href="#dashboard"
                  className="block text-center text-xs font-semibold text-sky-300 hover:text-sky-200 transition-colors"
                >
                  View Full Status Dashboard Breakdown ↓
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
