"use client";

import React from "react";
import { ProjectStats, StageTabFilter } from "@/types/project";
import { ProjectCostPieChart } from "./ProjectCostPieChart";
import {
  RefreshCw,
  Clock,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  BarChart3,
  Factory,
  IndianRupee,
} from "lucide-react";

interface ProjectStatusDashboardProps {
  stats: ProjectStats;
  lastUpdated: string;
  isStale?: boolean;
  isLoading?: boolean;
  isRefreshing?: boolean;
  onRefresh: () => void;
  onSelectStage?: (stage: StageTabFilter) => void;
}

export function ProjectStatusDashboard({
  stats,
  lastUpdated,
  isStale = false,
  isLoading = false,
  isRefreshing = false,
  onRefresh,
  onSelectStage,
}: ProjectStatusDashboardProps) {
  const stage2 = stats.stage2Count || 0;
  const stage1 = stats.stage1Count || 0;
  const underConsideration = stats.underConsiderationCount || 0;
  const underFormulation = stats.underFormulationCount || 0;

  // Always derive the live total from the four active stages, never from a fixed stored value.
  const total = stage2 + stage1 + underConsideration + underFormulation;

  // Active 4 stages total
  const activeTotal = total;

  // Percentage calculations
  const pct = (val: number) => (activeTotal > 0 ? ((val / activeTotal) * 100).toFixed(1) : "0");

  const formattedDate = lastUpdated
    ? new Date(lastUpdated).toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : "Synchronizing...";

  const handleStageClick = (stage: StageTabFilter) => {
    if (onSelectStage) {
      onSelectStage(stage);
    }
    const portfolioElem = document.getElementById("portfolio");
    if (portfolioElem) {
      portfolioElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatCost = (val: number | undefined) => {
    if (!val) return "₹ 0 Cr";
    return `₹ ${val.toLocaleString("en-IN", {
      maximumFractionDigits: 1,
      minimumFractionDigits: val % 1 !== 0 ? 1 : 0,
    })} Cr`;
  };

  return (
    <section id="dashboard" className="py-12 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Dashboard Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-[#0B2545] text-white uppercase tracking-wider">
                Live Status
              </span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Monitoring &amp; Appraisal Dashboard
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0B2545] tracking-tight mt-1">
              Project Portfolio Status Overview
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-2xl">
              Live quantitative distribution of engineering assignments across formulation and
              approval tiers, dynamically synchronized from the central master registry.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Timestamp Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-sm text-slate-700 text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              <span>
                <strong className="font-semibold text-slate-900">Last Updated:</strong>{" "}
                {formattedDate}
              </span>
              {isStale && (
                <span className="inline-flex items-center text-amber-600 font-sans font-bold text-[10px]">
                  (Cached fallback)
                </span>
              )}
            </div>

            {/* Refresh Action */}
            <button
              onClick={onRefresh}
              disabled={isRefreshing || isLoading}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-bold transition-all shadow-sm disabled:opacity-60 cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-sky-300" : ""}`}
              />
              <span>{isRefreshing ? "Synchronizing..." : "Refresh Data"}</span>
            </button>
          </div>
        </div>

        {/* Dynamic Warning if Fetch is in Error/Stale state */}
        {isStale && (
          <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 flex items-center gap-2 text-xs text-amber-800">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Google Sheets connection is temporarily operating on cached data from the last
              successful synchronization ({formattedDate}). Real-time data will refresh automatically.
            </span>
          </div>
        )}

        {/* Top Big Total Projects Banner */}
        <div
          onClick={() => handleStageClick("ALL")}
          className="group relative bg-[#0B2545] text-white rounded-xl p-6 sm:p-8 shadow-md border border-slate-800 hover:border-blue-500 transition-all cursor-pointer overflow-hidden"
        >
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-blue-900/30 to-transparent pointer-events-none" />
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/80 text-sky-300 text-xs font-bold uppercase tracking-wider mb-2">
                <BarChart3 className="w-3.5 h-3.5" />
                Master Department Portfolio
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                TOTAL ASSIGNMENTS &amp; PROJECTS
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Active engineering projects across 5 integrated steel plants, mines, and units
              </p>
            </div>

            <div className="flex flex-col items-center sm:items-end">
              <div className="text-5xl sm:text-6xl font-black text-white font-mono tracking-tight group-hover:scale-105 transition-transform">
                {isLoading ? "..." : total}
              </div>
              <div className="inline-flex items-center gap-1 text-xs text-sky-300 font-semibold mt-1">
                <span>Click to view all records in portfolio</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>

        {/* 4 Primary Stage Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* 1. STAGE 2 */}
          <div
            onClick={() => handleStageClick("STAGE 2")}
            className="group bg-white rounded-xl p-5 border-2 border-emerald-500/80 shadow-sm hover:shadow-md hover:border-emerald-600 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-emerald-600" />
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-100 text-emerald-800 uppercase tracking-wide">
                Tier 4 Sanction
              </span>
              <span className="text-[11px] font-mono font-semibold text-slate-500">
                {pct(stage2)}% of active
              </span>
            </div>

            <h4 className="text-base font-black text-slate-900 mt-3 tracking-tight">
              STAGE 2
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-snug">
              Final Board sanction &amp; active execution
            </p>

            {/* Total Cost in Stage 2 */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Total Outlay:</span>
              <span className="font-mono font-bold text-emerald-800">
                {formatCost(stats.stage2CostCr)}
              </span>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-baseline justify-between">
              <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-mono tracking-tight group-hover:scale-105 transition-transform">
                {isLoading ? "..." : stage2}
              </div>
              <span className="text-xs font-bold text-emerald-800 flex items-center gap-0.5 group-hover:underline">
                Filter Stage 2 <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 2. STAGE 1 */}
          <div
            onClick={() => handleStageClick("STAGE 1")}
            className="group bg-white rounded-xl p-5 border-2 border-blue-500/80 shadow-sm hover:shadow-md hover:border-blue-600 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-blue-600" />
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wide">
                Tier 3 Approval &amp; Tendering
              </span>
              <span className="text-[11px] font-mono font-semibold text-slate-500">
                {pct(stage1)}% of active
              </span>
            </div>

            <h4 className="text-base font-black text-slate-900 mt-3 tracking-tight">
              STAGE 1
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-snug">
              In-principle approval &amp; under tendering
            </p>

            {/* Total Cost in Stage 1 */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Total Outlay:</span>
              <span className="font-mono font-bold text-blue-800">
                {formatCost(stats.stage1CostCr)}
              </span>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-baseline justify-between">
              <div className="text-3xl sm:text-4xl font-black text-blue-700 font-mono tracking-tight group-hover:scale-105 transition-transform">
                {isLoading ? "..." : stage1}
              </div>
              <span className="text-xs font-bold text-blue-800 flex items-center gap-0.5 group-hover:underline">
                Filter Stage 1 <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 3. UNDER CONSIDERATION */}
          <div
            onClick={() => handleStageClick("UNDER CONSIDERATION")}
            className="group bg-white rounded-xl p-5 border-2 border-amber-500/80 shadow-sm hover:shadow-md hover:border-amber-600 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-amber-500" />
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 uppercase tracking-wide">
                Tier 1 Scoping
              </span>
              <span className="text-[11px] font-mono font-semibold text-slate-500">
                {pct(underConsideration)}% of active
              </span>
            </div>

            <h4 className="text-base font-black text-slate-900 mt-3 tracking-tight">
              UNDER CONSIDERATION
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-snug">
              Feasibility / Technical specification submitted
            </p>

            {/* Total Cost in Under Consideration */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Total Outlay:</span>
              <span className="font-mono font-bold text-amber-800">
                {formatCost(stats.underConsiderationCostCr)}
              </span>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-baseline justify-between">
              <div className="text-3xl sm:text-4xl font-black text-amber-700 font-mono tracking-tight group-hover:scale-105 transition-transform">
                {isLoading ? "..." : underConsideration}
              </div>
              <span className="text-xs font-bold text-amber-800 flex items-center gap-0.5 group-hover:underline">
                Filter Consideration <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          {/* 4. UNDER FORMULATION */}
          <div
            onClick={() => handleStageClick("UNDER FORMULATION")}
            className="group bg-white rounded-xl p-5 border-2 border-purple-500/80 shadow-sm hover:shadow-md hover:border-purple-600 transition-all cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-purple-600" />
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-100 text-purple-900 uppercase tracking-wide">
                Tier 2 DPR / FR
              </span>
              <span className="text-[11px] font-mono font-semibold text-slate-500">
                {pct(underFormulation)}% of active
              </span>
            </div>

            <h4 className="text-base font-black text-slate-900 mt-3 tracking-tight">
              UNDER FORMULATION
            </h4>
            <p className="text-xs text-slate-600 mt-0.5 leading-snug">
              Scope finalisation, FR preparation &amp; review
            </p>

            {/* Total Cost in Under Formulation */}
            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Total Outlay:</span>
              <span className="font-mono font-bold text-purple-800">
                {formatCost(stats.underFormulationCostCr)}
              </span>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-100 flex items-baseline justify-between">
              <div className="text-3xl sm:text-4xl font-black text-purple-700 font-mono tracking-tight group-hover:scale-105 transition-transform">
                {isLoading ? "..." : underFormulation}
              </div>
              <span className="text-xs font-bold text-purple-800 flex items-center gap-0.5 group-hover:underline">
                Filter Formulation <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>

        {/* PIE CHART SECTION: Interactive Stage Total Cost & Distribution Breakdown */}
        <ProjectCostPieChart
          stats={stats}
          onSelectStage={(stage) => handleStageClick(stage as StageTabFilter)}
        />

        {/* Plant Wise Distribution Breakdown Strip */}
        {stats.plantCounts && Object.keys(stats.plantCounts).length > 0 && (
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Factory className="w-4 h-4 text-blue-700" />
                Plant &amp; Unit Distribution
              </span>
              <span className="text-xs text-slate-500">
                Projects assigned per SAIL plant / division
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2.5">
              {Object.entries(stats.plantCounts)
                .sort((a, b) => b[1] - a[1])
                .map(([plantName, plantCount]) => (
                  <div
                    key={plantName}
                    className="bg-slate-50 hover:bg-blue-50/70 border border-slate-200 rounded-lg p-2.5 text-center transition-colors"
                  >
                    <div className="text-xs font-bold text-slate-800">{plantName}</div>
                    <div className="text-lg font-black text-blue-900 font-mono mt-0.5">
                      {plantCount}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">projects</div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
