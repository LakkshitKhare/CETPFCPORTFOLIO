"use client";

import React, { useState } from "react";
import { ProjectStats, ProjectStage } from "@/types/project";
import {
  PieChart as PieChartIcon,
  IndianRupee,
  Layers,
  ArrowUpRight,
  TrendingUp,
  Info,
  CheckCircle2,
} from "lucide-react";

interface ProjectCostPieChartProps {
  stats: ProjectStats;
  onSelectStage?: (stage: ProjectStage) => void;
}

interface StageSlice {
  id: ProjectStage;
  label: string;
  shortLabel: string;
  tierLabel: string;
  costCr: number;
  count: number;
  color: string;
  hoverColor: string;
  textColor: string;
  badgeBg: string;
}

export function ProjectCostPieChart({ stats, onSelectStage }: ProjectCostPieChartProps) {
  const [activeMode, setActiveMode] = useState<"cost" | "count">("cost");
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // 4 Primary Stages strictly excluding other/closed
  const slices: StageSlice[] = [
    {
      id: "UNDER CONSIDERATION",
      label: "Under Consideration",
      shortLabel: "Under Consideration",
      tierLabel: "Tier 1 Scoping",
      costCr: stats.underConsiderationCostCr || 0,
      count: stats.underConsiderationCount || 0,
      color: "#F59E0B", // amber-500
      hoverColor: "#D97706", // amber-600
      textColor: "text-amber-800",
      badgeBg: "bg-amber-100 border-amber-300 text-amber-900",
    },
    {
      id: "UNDER FORMULATION",
      label: "Under Formulation",
      shortLabel: "Under Formulation",
      tierLabel: "Tier 2 DPR / FR",
      costCr: stats.underFormulationCostCr || 0,
      count: stats.underFormulationCount || 0,
      color: "#9333EA", // purple-600
      hoverColor: "#7E22CE", // purple-700
      textColor: "text-purple-800",
      badgeBg: "bg-purple-100 border-purple-300 text-purple-900",
    },
    {
      id: "STAGE 1",
      label: "Stage 1",
      shortLabel: "Stage 1",
      tierLabel: "Tier 3 In-Principle Approval",
      costCr: stats.stage1CostCr || 0,
      count: stats.stage1Count || 0,
      color: "#2563EB", // blue-600
      hoverColor: "#1D4ED8", // blue-700
      textColor: "text-blue-800",
      badgeBg: "bg-blue-100 border-blue-300 text-blue-900",
    },
    {
      id: "STAGE 2",
      label: "Stage 2",
      shortLabel: "Stage 2",
      tierLabel: "Tier 4 Sanction & Execution",
      costCr: stats.stage2CostCr || 0,
      count: stats.stage2Count || 0,
      color: "#059669", // emerald-600
      hoverColor: "#047857", // emerald-700
      textColor: "text-emerald-800",
      badgeBg: "bg-emerald-100 border-emerald-300 text-emerald-900",
    },
  ];

  // Totals for active 4 categories
  const totalCost = slices.reduce((acc, s) => acc + s.costCr, 0);
  const totalCount = slices.reduce((acc, s) => acc + s.count, 0);

  const activeTotal = activeMode === "cost" ? totalCost : totalCount;

  // Compute SVG arc angles
  let currentAngle = -90; // Start at top (12 o'clock)
  const arcData = slices.map((slice) => {
    const value = activeMode === "cost" ? slice.costCr : slice.count;
    const percentage = activeTotal > 0 ? (value / activeTotal) * 100 : 0;
    const angleSpan = (percentage / 100) * 360;
    const startAngle = currentAngle;
    const endAngle = currentAngle + angleSpan;
    currentAngle = endAngle;

    return {
      ...slice,
      value,
      percentage,
      startAngle,
      endAngle,
      midAngle: startAngle + angleSpan / 2,
    };
  });

  // SVG Geometry Constants
  const size = 320;
  const center = size / 2;
  const outerRadius = 150;
  const innerRadius = 75; // Donut hole

  // Helper to convert polar to cartesian coordinates
  const polarToCartesian = (cx: number, cy: number, r: number, angleDeg: number) => {
    const rad = (angleDeg * Math.PI) / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  };

  // Helper to build SVG donut path
  const createDonutPath = (
    startAngle: number,
    endAngle: number,
    isHovered: boolean
  ) => {
    // Prevent rendering full 360 artifact
    const angleDelta = endAngle - startAngle;
    if (angleDelta <= 0.01) return "";
    const clampedEnd = angleDelta >= 359.99 ? startAngle + 359.99 : endAngle;

    const rOuter = isHovered ? outerRadius + 8 : outerRadius;
    const rInner = isHovered ? innerRadius - 3 : innerRadius;

    const p1 = polarToCartesian(center, center, rOuter, startAngle);
    const p2 = polarToCartesian(center, center, rOuter, clampedEnd);
    const p3 = polarToCartesian(center, center, rInner, clampedEnd);
    const p4 = polarToCartesian(center, center, rInner, startAngle);

    const largeArc = angleDelta > 180 ? 1 : 0;

    return `
      M ${p1.x} ${p1.y}
      A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${p2.x} ${p2.y}
      L ${p3.x} ${p3.y}
      A ${rInner} ${rInner} 0 ${largeArc} 0 ${p4.x} ${p4.y}
      Z
    `;
  };

  const handleSliceClick = (stageId: ProjectStage) => {
    if (onSelectStage) {
      onSelectStage(stageId);
    }
    const portfolioElem = document.getElementById("portfolio");
    if (portfolioElem) {
      portfolioElem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const formatCostCr = (val: number) => {
    return `₹ ${val.toLocaleString("en-IN", {
      maximumFractionDigits: 1,
      minimumFractionDigits: val % 1 !== 0 ? 1 : 0,
    })} Cr`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-200 uppercase tracking-wider mb-1">
            <PieChartIcon className="w-3.5 h-3.5 text-blue-700" />
            Live Capex Outlay &amp; Portfolio Distribution
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0B2545] tracking-tight">
            Project Stage &amp; Total Cost Pie Chart
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
            Breakdown across all 4 operational project stages (Stage 1, Stage 2, Under Consideration, Under Formulation).
          </p>
        </div>

        {/* Mode Toggle: Cost vs Count */}
        <div className="inline-flex p-1 bg-slate-100 rounded-lg border border-slate-200 self-start sm:self-auto">
          <button
            onClick={() => setActiveMode("cost")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeMode === "cost"
                ? "bg-[#0B2545] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <IndianRupee className="w-3.5 h-3.5" />
            <span>Total Cost (₹ Cr)</span>
          </button>
          <button
            onClick={() => setActiveMode("count")}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer ${
              activeMode === "count"
                ? "bg-[#0B2545] text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Project Count</span>
          </button>
        </div>
      </div>

      {/* Main Grid: SVG Pie Chart & Detailed Stage Breakdown Cards */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left: Interactive SVG Donut/Pie Chart */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] select-none">
            <svg
              viewBox={`0 0 ${size} ${size}`}
              className="w-full h-full transform -rotate-0 drop-shadow-sm"
              aria-label="Capex and Project Distribution Pie Chart"
            >
              {arcData.map((slice, i) => {
                const isHovered = hoveredIndex === i;
                const path = createDonutPath(slice.startAngle, slice.endAngle, isHovered);
                if (!path) return null;

                return (
                  <path
                    key={slice.id}
                    d={path}
                    fill={isHovered ? slice.hoverColor : slice.color}
                    className="transition-all duration-200 cursor-pointer stroke-white stroke-[2]"
                    onMouseEnter={() => setHoveredIndex(i)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleSliceClick(slice.id)}
                  >
                    <title>
                      {slice.label}: {formatCostCr(slice.costCr)} ({slice.percentage.toFixed(1)}%) — {slice.count} projects
                    </title>
                  </path>
                );
              })}
            </svg>

            {/* Donut Center Label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {activeMode === "cost" ? "Total Active Capex" : "Active Projects"}
              </span>
              <span className="text-xl sm:text-2xl font-black text-[#0B2545] font-mono leading-tight mt-0.5">
                {activeMode === "cost" ? formatCostCr(totalCost) : `${totalCount} Projects`}
              </span>
              <span className="text-[10px] text-slate-500 font-medium mt-0.5">
                4 Active Stages
              </span>
            </div>
          </div>

          <p className="text-[11px] text-slate-500 mt-2 text-center">
            Hover over segments for details • Click any slice to filter portfolio
          </p>
        </div>

        {/* Right: Detailed Stage Metrics Cards */}
        <div className="lg:col-span-7 space-y-3">
          {arcData.map((slice, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <div
                key={slice.id}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => handleSliceClick(slice.id)}
                className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                  isHovered
                    ? "border-blue-600 bg-blue-50/50 shadow-md scale-[1.01]"
                    : "border-slate-200 bg-slate-50/70 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  {/* Left: Indicator dot, title, tier */}
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full shrink-0 shadow-xs"
                      style={{ backgroundColor: slice.color }}
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-black text-slate-900 tracking-tight">
                          {slice.label}
                        </h4>
                        <span className={`px-2 py-0.2 rounded text-[10px] font-bold border ${slice.badgeBg}`}>
                          {slice.tierLabel}
                        </span>
                      </div>
                      <span className="text-xs text-slate-500 font-medium">
                        {slice.count} Live Projects
                      </span>
                    </div>
                  </div>

                  {/* Right: Cost value and percentage */}
                  <div className="flex items-baseline justify-between sm:justify-end gap-3 sm:text-right pl-7 sm:pl-0">
                    <div>
                      <div className="text-base sm:text-lg font-black text-slate-900 font-mono tracking-tight">
                        {formatCostCr(slice.costCr)}
                      </div>
                      <div className="text-xs font-mono font-bold text-slate-500">
                        {slice.percentage.toFixed(1)}% of total capex
                      </div>
                    </div>

                    <ArrowUpRight className="w-4 h-4 text-blue-700 shrink-0 hidden sm:block" />
                  </div>
                </div>

                {/* Progress fill bar */}
                <div className="mt-2.5 h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-300"
                    style={{
                      width: `${slice.percentage}%`,
                      backgroundColor: slice.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Summary Strip */}
      <div className="mt-8 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-600">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Total outlay dynamically calculated from authorized capex columns (Stage II, Stage I, and Latest Capital Cost estimates).
          </span>
        </div>

        <div className="font-mono font-semibold text-slate-700">
          Source: Live Google Sheet (gid: 1788317319)
        </div>
      </div>
    </div>
  );
}
