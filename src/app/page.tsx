"use client";

import React, { useState, useEffect, useCallback } from "react";
import { ProjectRecord, ProjectStats, StageTabFilter, ApiResponse } from "@/types/project";
import { SailHeader } from "@/components/SailHeader";
import { HeroSection } from "@/components/HeroSection";
import { ProjectStatusDashboard } from "@/components/ProjectStatusDashboard";
import { AboutSection } from "@/components/AboutSection";
import { LifecycleSection } from "@/components/LifecycleSection";
import { OrgStructureSection } from "@/components/OrgStructureSection";
import { ProjectPortfolioSection } from "@/components/ProjectPortfolioSection";
import { ContactSection } from "@/components/ContactSection";
import { SailFooter } from "@/components/SailFooter";

const initialStats: ProjectStats = {
  totalProjects: 0,
  stage2Count: 0,
  stage1Count: 0,
  underConsiderationCount: 0,
  underFormulationCount: 0,
  otherCount: 0,
  stage2CostCr: 0,
  stage1CostCr: 0,
  underConsiderationCostCr: 0,
  underFormulationCostCr: 0,
  totalActiveCostCr: 0,
  totalActiveProjects: 0,
  plantCounts: {},
  sectionCounts: {},
  totalEstimatedCostCr: 0,
  lastUpdated: new Date().toISOString(),
  sourceUrl: "",
};

export default function HomePage() {
  const [projects, setProjects] = useState<ProjectRecord[]>([]);
  const [stats, setStats] = useState<ProjectStats>(initialStats);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [isStale, setIsStale] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedStageFilter, setSelectedStageFilter] = useState<StageTabFilter>("ALL");

  const fetchData = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const url = `/api/projects${forceRefresh ? "?refresh=true" : ""}`;
      const res = await fetch(url, {
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}: ${res.statusText}`);
      }

      const data: ApiResponse = await res.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to load project portfolio from Google Sheets");
      }

      setProjects(data.projects || []);
      setStats(data.stats || initialStats);
      setLastUpdated(data.lastUpdated || new Date().toISOString());
      setIsStale(!!data.isStale);
    } catch (err: unknown) {
      const errMsg =
        err instanceof Error ? err.message : "Project data is currently unavailable. Please try again later.";
      setError(errMsg);
      console.error("Failed to fetch project portfolio:", err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchData(false);

    // Periodic automatic background sync every 3 minutes
    const interval = setInterval(() => {
      fetchData(false);
    }, 3 * 60 * 1000);

    return () => clearInterval(interval);
  }, [fetchData]);

  const handleStageSelectFromOtherSections = (stage: StageTabFilter) => {
    setSelectedStageFilter(stage);
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-100">
      {/* 1. Header & Navigation */}
      <SailHeader
        lastUpdated={lastUpdated}
        totalProjects={stats.totalProjects}
        onRefresh={() => fetchData(true)}
        isRefreshing={isRefreshing}
      />

      <main className="flex-1">
        {/* 2. Hero Section */}
        <HeroSection
          totalProjects={stats.totalProjects}
          stage2Count={stats.stage2Count}
          onExplorePortfolio={() => {
            const el = document.getElementById("portfolio");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
        />

        {/* 3. About Department */}
        <AboutSection />

        {/* 4. Live Project Status Overview / Dashboard with Pie Chart */}
        <ProjectStatusDashboard
          stats={stats}
          lastUpdated={lastUpdated}
          isStale={isStale}
          isLoading={isLoading}
          isRefreshing={isRefreshing}
          onRefresh={() => fetchData(true)}
          onSelectStage={handleStageSelectFromOtherSections}
        />

        {/* 5. Project Formulation & Coordination Lifecycle */}
        <LifecycleSection
          stageCounts={{
            underConsideration: stats.underConsiderationCount,
            underFormulation: stats.underFormulationCount,
            stage1: stats.stage1Count,
            stage2: stats.stage2Count,
          }}
          onSelectStage={handleStageSelectFromOtherSections}
        />

        {/* 6. Organization Structure */}
        <OrgStructureSection />

        {/* 7. LIVE PROJECT PORTFOLIO (Core Feature) */}
        <ProjectPortfolioSection
          projects={projects}
          stats={stats}
          lastUpdated={lastUpdated}
          isStale={isStale}
          isLoading={isLoading}
          error={error}
          onRefresh={() => fetchData(true)}
          isRefreshing={isRefreshing}
          selectedStageFilter={selectedStageFilter}
          onStageFilterChange={(stage) => setSelectedStageFilter(stage)}
        />

        {/* 8. Contact Us */}
        <ContactSection />
      </main>

      {/* 9. Institutional Footer */}
      <SailFooter lastUpdated={lastUpdated} totalProjects={stats.totalProjects} />
    </div>
  );
}
