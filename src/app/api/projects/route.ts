import { NextRequest, NextResponse } from "next/server";
import { getProjects } from "@/services/googleSheets";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get("refresh") === "true";

    const data = await getProjects(forceRefresh);

    return NextResponse.json({
      success: true,
      lastUpdated: data.lastUpdated,
      isStale: !!data.isStale,
      stats: data.stats,
      projects: data.projects,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to load project records from Google Sheets";
    console.error("API /api/projects error:", message);

    return NextResponse.json(
      {
        success: false,
        error: message,
        lastUpdated: new Date().toISOString(),
        stats: {
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
        },
        projects: [],
      },
      { status: 500 }
    );
  }
}
