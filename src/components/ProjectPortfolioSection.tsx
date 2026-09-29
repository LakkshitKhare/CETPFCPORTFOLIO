"use client";

import React, { useState, useMemo, useEffect } from "react";
import { ProjectRecord, ProjectStats, StageTabFilter, ProjectStage } from "@/types/project";
import { ProjectDetailModal } from "./ProjectDetailModal";
import {
  Search,
  Filter,
  RefreshCw,
  FolderKanban,
  Download,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Eye,
  AlertTriangle,
  FileSpreadsheet,
  Building,
  RotateCcw,
  Sparkles,
  Layers,
  IndianRupee,
} from "lucide-react";

interface ProjectPortfolioSectionProps {
  projects: ProjectRecord[];
  stats: ProjectStats;
  lastUpdated: string;
  isStale?: boolean;
  isLoading?: boolean;
  error?: string | null;
  onRefresh: () => void;
  isRefreshing?: boolean;
  selectedStageFilter?: StageTabFilter;
  onStageFilterChange?: (stage: StageTabFilter) => void;
}

export function ProjectPortfolioSection({
  projects,
  stats,
  lastUpdated,
  isStale = false,
  isLoading = false,
  error = null,
  onRefresh,
  isRefreshing = false,
  selectedStageFilter = "ALL",
  onStageFilterChange,
}: ProjectPortfolioSectionProps) {
  // Filters state
  const [activeStageTab, setActiveStageTab] = useState<StageTabFilter>(selectedStageFilter);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPlant, setSelectedPlant] = useState<string>("ALL");
  const [selectedSection, setSelectedSection] = useState<string>("ALL");
  const [sortField, setSortField] = useState<"assignment" | "cost" | "plant">("assignment");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState<number>(5);

  // Selected project for modal
  const [selectedProject, setSelectedProject] = useState<ProjectRecord | null>(null);

  // Keep internal stage tab synced if parent changes it (e.g. from hero, lifecycle or pie chart)
  useEffect(() => {
    setActiveStageTab(selectedStageFilter);
    setCurrentPage(1);
  }, [selectedStageFilter]);

  const handleStageTabClick = (stage: StageTabFilter) => {
    setActiveStageTab(stage);
    setCurrentPage(1);
    if (onStageFilterChange) {
      onStageFilterChange(stage);
    }
  };

  // Distinct plants and sections for dropdowns
  const distinctPlants = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.plant && p.plant !== "—" && p.plant !== "Unspecified") set.add(p.plant);
    });
    return Array.from(set).sort();
  }, [projects]);

  const distinctSections = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => {
      if (p.leadSection && p.leadSection !== "—") set.add(p.leadSection);
    });
    return Array.from(set).sort();
  }, [projects]);

  // Filtering & Sorting
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        // 1. Stage Tab Filter
        if (activeStageTab === "STAGE 2" && project.normalizedStage !== "STAGE 2") return false;
        if (activeStageTab === "STAGE 1" && project.normalizedStage !== "STAGE 1") return false;
        if (activeStageTab === "UNDER CONSIDERATION" && project.normalizedStage !== "UNDER CONSIDERATION")
          return false;
        if (activeStageTab === "UNDER FORMULATION" && project.normalizedStage !== "UNDER FORMULATION")
          return false;
        if (activeStageTab === "OTHER" && project.normalizedStage !== "OTHER") return false;

        // 2. Plant Filter
        if (selectedPlant !== "ALL" && project.plant !== selectedPlant) return false;

        // 3. Lead Section Filter
        if (selectedSection !== "ALL" && project.leadSection !== selectedSection) return false;

        // 4. Search Query (Assignment Number, Title, Plant, TFL, Deliverable, etc.)
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchesAssignment = project.assignmentNumber.toLowerCase().includes(query);
          const matchesDescription = project.projectDescription.toLowerCase().includes(query);
          const matchesPlant = project.plant.toLowerCase().includes(query);
          const matchesTfl = project.tfl.toLowerCase().includes(query);
          const matchesSection = project.leadSection.toLowerCase().includes(query);
          const matchesDeliverables = project.deliverables.toLowerCase().includes(query);
          const matchesContractor = project.contractor.toLowerCase().includes(query);

          if (
            !matchesAssignment &&
            !matchesDescription &&
            !matchesPlant &&
            !matchesTfl &&
            !matchesSection &&
            !matchesDeliverables &&
            !matchesContractor
          ) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortField === "assignment") {
          const numA = parseInt(a.assignmentNumber.replace(/\D/g, ""), 10) || 0;
          const numB = parseInt(b.assignmentNumber.replace(/\D/g, ""), 10) || 0;
          return sortDirection === "asc" ? numA - numB : numB - numA;
        }
        if (sortField === "cost") {
          const costA = a.costNum || 0;
          const costB = b.costNum || 0;
          return sortDirection === "asc" ? costA - costB : costB - costA;
        }
        if (sortField === "plant") {
          return sortDirection === "asc"
            ? a.plant.localeCompare(b.plant)
            : b.plant.localeCompare(a.plant);
        }
        return 0;
      });
  }, [
    projects,
    activeStageTab,
    selectedPlant,
    selectedSection,
    searchQuery,
    sortField,
    sortDirection,
  ]);

  // Pagination slice
  const totalFiltered = filteredProjects.length;
  const totalPages = Math.ceil(totalFiltered / pageSize) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredProjects.slice(start, start + pageSize);
  }, [filteredProjects, currentPage, pageSize]);

  const handleResetFilters = () => {
    setActiveStageTab("ALL");
    setSearchQuery("");
    setSelectedPlant("ALL");
    setSelectedSection("ALL");
    setSortField("assignment");
    setSortDirection("asc");
    setCurrentPage(1);
    if (onStageFilterChange) {
      onStageFilterChange("ALL");
    }
  };

  const handleExportCSV = () => {
    const headers = [
      "Assignment Number",
      "Project Description",
      "Plant",
      "Present Stage",
      "Lead Section",
      "Task Force Leader (TFL)",
      "Cost (Rs in Cr)",
      "Deliverables",
      "Acceptance Date",
    ];

    const rows = filteredProjects.map((p) => [
      `"${p.assignmentNumber}"`,
      `"${p.projectDescription.replace(/"/g, '""')}"`,
      `"${p.plant}"`,
      `"${p.rawStage || p.normalizedStage}"`,
      `"${p.leadSection}"`,
      `"${p.tfl}"`,
      `"${p.cost || ""}"`,
      `"${(p.deliverables || "").replace(/"/g, '""')}"`,
      `"${p.acceptanceDate || ""}"`,
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `SAIL_CET_Project_Portfolio_${activeStageTab}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStageBadgeClasses = (stage: ProjectStage) => {
    switch (stage) {
      case "STAGE 2":
        return "bg-emerald-100 text-emerald-900 border-emerald-300";
      case "STAGE 1":
        return "bg-blue-100 text-blue-900 border-blue-300";
      case "UNDER CONSIDERATION":
        return "bg-amber-100 text-amber-900 border-amber-300";
      case "UNDER FORMULATION":
        return "bg-purple-100 text-purple-900 border-purple-300";
      default:
        return "bg-slate-100 text-slate-800 border-slate-300";
    }
  };

  const formatCostBadge = (val: number | undefined) => {
    if (!val) return "₹ 0 Cr";
    return `₹ ${val.toLocaleString("en-IN", {
      maximumFractionDigits: 1,
    })} Cr`;
  };

  return (
    <section id="portfolio" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title & Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
              <FolderKanban className="w-4 h-4 text-blue-700" />
              Live Project Register
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
              Project Portfolio
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl">
              Authoritative, single-source-of-truth project portfolio dynamically rendered from the
              master Google Sheet. Filter by formulation stage, assignment code, plant, or lead engineer.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleExportCSV}
              disabled={filteredProjects.length === 0}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 text-xs font-bold shadow-xs cursor-pointer transition-colors disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={onRefresh}
              disabled={isRefreshing || isLoading}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-bold shadow-xs cursor-pointer transition-all disabled:opacity-60"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin text-sky-300" : ""}`} />
              <span>{isRefreshing ? "Refreshing..." : "Refresh Portfolio"}</span>
            </button>
          </div>
        </div>

        {/* 4 PRIMARY STAGE TABS WITH LIVE DYNAMIC COUNTS & TOTAL COSTS */}
        <div className="mt-6 flex flex-wrap gap-2 pb-2">
          {/* STAGE 2 */}
          <button
            onClick={() => handleStageTabClick("STAGE 2")}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
              activeStageTab === "STAGE 2"
                ? "bg-emerald-700 text-white border-emerald-800 shadow-sm ring-2 ring-emerald-500/20"
                : "bg-white text-slate-700 hover:bg-emerald-50/70 border-slate-200 hover:border-emerald-300"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>STAGE 2</span>
            <span
              className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                activeStageTab === "STAGE 2"
                  ? "bg-emerald-900/60 text-emerald-100"
                  : "bg-emerald-100 text-emerald-800"
              }`}
            >
              {stats.stage2Count}
            </span>
            <span
              className={`text-[10px] font-mono font-medium hidden sm:inline ${
                activeStageTab === "STAGE 2" ? "text-emerald-200" : "text-emerald-700"
              }`}
            >
              ({formatCostBadge(stats.stage2CostCr)})
            </span>
          </button>

          {/* STAGE 1 */}
          <button
            onClick={() => handleStageTabClick("STAGE 1")}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
              activeStageTab === "STAGE 1"
                ? "bg-blue-700 text-white border-blue-800 shadow-sm ring-2 ring-blue-500/20"
                : "bg-white text-slate-700 hover:bg-blue-50/70 border-slate-200 hover:border-blue-300"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>STAGE 1</span>
            <span
              className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                activeStageTab === "STAGE 1"
                  ? "bg-blue-900/60 text-blue-100"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {stats.stage1Count}
            </span>
            <span
              className={`text-[10px] font-mono font-medium hidden sm:inline ${
                activeStageTab === "STAGE 1" ? "text-blue-200" : "text-blue-700"
              }`}
            >
              ({formatCostBadge(stats.stage1CostCr)})
            </span>
          </button>

          {/* UNDER CONSIDERATION */}
          <button
            onClick={() => handleStageTabClick("UNDER CONSIDERATION")}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
              activeStageTab === "UNDER CONSIDERATION"
                ? "bg-amber-600 text-white border-amber-700 shadow-sm ring-2 ring-amber-500/20"
                : "bg-white text-slate-700 hover:bg-amber-50/70 border-slate-200 hover:border-amber-300"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>UNDER CONSIDERATION</span>
            <span
              className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                activeStageTab === "UNDER CONSIDERATION"
                  ? "bg-amber-800/60 text-amber-100"
                  : "bg-amber-100 text-amber-900"
              }`}
            >
              {stats.underConsiderationCount}
            </span>
            <span
              className={`text-[10px] font-mono font-medium hidden sm:inline ${
                activeStageTab === "UNDER CONSIDERATION" ? "text-amber-100" : "text-amber-800"
              }`}
            >
              ({formatCostBadge(stats.underConsiderationCostCr)})
            </span>
          </button>

          {/* UNDER FORMULATION */}
          <button
            onClick={() => handleStageTabClick("UNDER FORMULATION")}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
              activeStageTab === "UNDER FORMULATION"
                ? "bg-purple-700 text-white border-purple-800 shadow-sm ring-2 ring-purple-500/20"
                : "bg-white text-slate-700 hover:bg-purple-50/70 border-slate-200 hover:border-purple-300"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-purple-400" />
            <span>UNDER FORMULATION</span>
            <span
              className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                activeStageTab === "UNDER FORMULATION"
                  ? "bg-purple-900/60 text-purple-100"
                  : "bg-purple-100 text-purple-900"
              }`}
            >
              {stats.underFormulationCount}
            </span>
            <span
              className={`text-[10px] font-mono font-medium hidden sm:inline ${
                activeStageTab === "UNDER FORMULATION" ? "text-purple-200" : "text-purple-700"
              }`}
            >
              ({formatCostBadge(stats.underFormulationCostCr)})
            </span>
          </button>

          {/* ALL PROJECTS TAB */}
          <button
            onClick={() => handleStageTabClick("ALL")}
            className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
              activeStageTab === "ALL"
                ? "bg-[#0B2545] text-white border-slate-900 shadow-sm ring-2 ring-slate-700/20"
                : "bg-white text-slate-700 hover:bg-slate-100 border-slate-200"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>ALL PROJECTS</span>
            <span
              className={`px-2 py-0.5 rounded-full font-mono text-[11px] font-bold ${
                activeStageTab === "ALL"
                  ? "bg-slate-800 text-white"
                  : "bg-slate-200 text-slate-800"
              }`}
            >
              {stats.totalProjects}
            </span>
          </button>
        </div>

        {/* SEARCH & MULTI-FILTER CONTROL BAR */}
        <div className="mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
            {/* Search Input */}
            <div className="lg:col-span-5 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search Assignment #, Description, TFL, Section..."
                className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Plant Dropdown */}
            <div className="lg:col-span-3">
              <select
                value={selectedPlant}
                onChange={(e) => {
                  setSelectedPlant(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="ALL">All Plants &amp; Mines ({projects.length})</option>
                {distinctPlants.map((plant) => (
                  <option key={plant} value={plant}>
                    {plant} ({projects.filter((p) => p.plant === plant).length} projects)
                  </option>
                ))}
              </select>
            </div>

            {/* Lead Section Dropdown */}
            <div className="lg:col-span-2">
              <select
                value={selectedSection}
                onChange={(e) => {
                  setSelectedSection(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="ALL">All Lead Sections</option>
                {distinctSections.map((sec) => (
                  <option key={sec} value={sec}>
                    {sec}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="lg:col-span-2 flex items-center gap-1.5">
              <select
                value={`${sortField}-${sortDirection}`}
                onChange={(e) => {
                  const [field, dir] = e.target.value.split("-") as ["assignment" | "cost" | "plant", "asc" | "desc"];
                  setSortField(field);
                  setSortDirection(dir);
                }}
                className="w-full px-2.5 py-2 text-xs bg-white border border-slate-300 rounded-lg text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-600"
              >
                <option value="assignment-asc">Assign # (Asc)</option>
                <option value="assignment-desc">Assign # (Desc)</option>
                <option value="cost-desc">Cost (High → Low)</option>
                <option value="plant-asc">Plant (A → Z)</option>
              </select>
            </div>
          </div>

          {/* Active Filter Metrics & Reset Row */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 text-xs">
            <div className="flex items-center gap-2 text-slate-600">
              <span>
                Showing <strong className="text-slate-900 font-mono">{filteredProjects.length}</strong> of{" "}
                <strong className="text-slate-900 font-mono">{stats.totalProjects}</strong> total projects
              </span>
              {(searchQuery || selectedPlant !== "ALL" || selectedSection !== "ALL" || activeStageTab !== "ALL") && (
                <span className="text-[11px] text-blue-800 font-medium bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  Filters Active
                </span>
              )}
            </div>

            {(searchQuery || selectedPlant !== "ALL" || selectedSection !== "ALL" || activeStageTab !== "ALL") && (
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-1 text-slate-600 hover:text-blue-900 font-semibold cursor-pointer transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            )}
          </div>
        </div>

        {/* LOADING STATE */}
        {isLoading && (
          <div className="mt-8 py-16 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto" />
            <h3 className="text-base font-bold text-slate-800">
              Loading project data...
            </h3>
            <p className="text-xs text-slate-500">
              Synchronizing records directly from the Google Sheet master database.
            </p>
          </div>
        )}

        {/* ERROR STATE */}
        {!isLoading && error && projects.length === 0 && (
          <div className="mt-8 p-8 text-center bg-red-50 border border-red-200 rounded-xl space-y-3">
            <AlertTriangle className="w-10 h-10 text-red-600 mx-auto" />
            <h3 className="text-base font-bold text-red-900">
              Project data is currently unavailable. Please try again later.
            </h3>
            <p className="text-xs text-red-700 max-w-md mx-auto">
              {error}
            </p>
            <button
              onClick={onRefresh}
              className="mt-2 inline-flex items-center gap-2 px-4 py-2 bg-red-800 hover:bg-red-900 text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry Connection</span>
            </button>
          </div>
        )}

        {/* EMPTY STATE */}
        {!isLoading && !error && filteredProjects.length === 0 && (
          <div className="mt-8 py-16 text-center bg-slate-50 rounded-xl border border-slate-200 space-y-3">
            <FileSpreadsheet className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No projects found.</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              No project records match the current filter criteria or search query &quot;{searchQuery}&quot;.
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#0B2545] hover:bg-[#133E87] text-white rounded-lg text-xs font-bold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Search &amp; Filters</span>
            </button>
          </div>
        )}

        {/* MAIN DATA DISPLAY (Desktop Table & Mobile Responsive Cards) */}
        {!isLoading && filteredProjects.length > 0 && (
          <div className="mt-6 space-y-4">
            {/* DESKTOP TABLE VIEW (Hidden on small mobile, visible on md and up) */}
            <div className="hidden md:block overflow-hidden rounded-xl border border-slate-200 shadow-sm bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead className="bg-[#0B2545] text-slate-200 uppercase font-mono text-[11px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th scope="col" className="px-4 py-3.5 font-bold">
                        Assign #
                      </th>
                      <th scope="col" className="px-3 py-3.5 font-bold">
                        Plant
                      </th>
                      <th scope="col" className="px-4 py-3.5 font-bold w-2/5">
                        Project Description
                      </th>
                      <th scope="col" className="px-3 py-3.5 font-bold">
                        Present Stage
                      </th>
                      <th scope="col" className="px-3 py-3.5 font-bold">
                        Lead Sec / TFL
                      </th>
                      <th scope="col" className="px-3 py-3.5 font-bold text-right">
                        Cost (₹ Cr)
                      </th>
                      <th scope="col" className="px-3 py-3.5 font-bold text-center">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 bg-white">
                    {paginatedProjects.map((project) => (
                      <tr
                        key={project.assignmentNumber + project.projectDescription}
                        onClick={() => setSelectedProject(project)}
                        className="hover:bg-blue-50/60 transition-colors cursor-pointer group"
                      >
                        {/* Assignment Number */}
                        <td className="px-4 py-3 font-mono font-bold text-blue-900 group-hover:text-blue-700 whitespace-nowrap">
                          #{project.assignmentNumber}
                        </td>

                        {/* Plant */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span className="px-2 py-0.5 rounded text-[11px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200">
                            {project.plant}
                          </span>
                        </td>

                        {/* Description */}
                        <td className="px-4 py-3 font-medium text-slate-900 leading-snug">
                          <div>{project.projectDescription}</div>
                          {project.deliverables && (
                            <div className="text-[10px] text-slate-500 font-normal mt-0.5 line-clamp-1">
                              Deliverables: {project.deliverables}
                            </div>
                          )}
                        </td>

                        {/* Stage Badge */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <span
                            className={`inline-block px-2.5 py-0.5 rounded text-[11px] font-bold border ${getStageBadgeClasses(
                              project.normalizedStage
                            )}`}
                          >
                            {project.rawStage || project.normalizedStage}
                          </span>
                        </td>

                        {/* Lead Section & TFL */}
                        <td className="px-3 py-3 whitespace-nowrap">
                          <div className="font-semibold text-slate-800">{project.leadSection}</div>
                          <div className="text-[11px] text-slate-500">{project.tfl || "—"}</div>
                        </td>

                        {/* Cost */}
                        <td className="px-3 py-3 text-right font-mono font-bold text-slate-900 whitespace-nowrap">
                          {project.cost ? `₹ ${project.cost}` : "—"}
                        </td>

                        {/* Action View */}
                        <td className="px-3 py-3 text-center whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-slate-100 hover:bg-[#0B2545] text-slate-700 hover:text-white font-bold text-[11px] transition-colors cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Details</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* MOBILE RESPONSIVE CARDS VIEW (Visible on small screens) */}
            <div className="md:hidden space-y-3">
              {paginatedProjects.map((project) => (
                <div
                  key={project.assignmentNumber + project.projectDescription}
                  onClick={() => setSelectedProject(project)}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs hover:border-blue-500 hover:shadow-sm transition-all cursor-pointer space-y-2.5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold text-blue-900">
                      Assignment #{project.assignmentNumber}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 text-slate-800 border border-slate-200 uppercase">
                      {project.plant}
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {project.projectDescription}
                  </h3>

                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold border ${getStageBadgeClasses(
                        project.normalizedStage
                      )}`}
                    >
                      {project.rawStage || project.normalizedStage}
                    </span>

                    <span className="font-mono font-bold text-slate-900">
                      {project.cost ? `₹ ${project.cost} Cr` : "Cost: —"}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Sec: {project.leadSection} • TFL: {project.tfl || "—"}</span>
                    <span className="text-blue-700 font-bold flex items-center gap-0.5">
                      Full Specs →
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* PAGINATION CONTROLS */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-3">
                <span>
                  Page <strong className="font-mono text-slate-900">{currentPage}</strong> of{" "}
                  <strong className="font-mono text-slate-900">{totalPages}</strong>
                </span>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] text-slate-500">Per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="px-2 py-1 bg-white border border-slate-300 rounded text-xs text-slate-800 font-semibold"
                  >
                    <option value={3}>3</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={12}>12</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Previous</span>
                </button>

                {/* Page numbers preview */}
                <div className="hidden sm:flex items-center gap-1 font-mono">
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5 && currentPage > 3) {
                      pageNum = Math.min(currentPage - 2 + i, totalPages - 4 + i);
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-7 h-7 rounded text-xs font-bold cursor-pointer ${
                          currentPage === pageNum
                            ? "bg-[#0B2545] text-white"
                            : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  );
}
