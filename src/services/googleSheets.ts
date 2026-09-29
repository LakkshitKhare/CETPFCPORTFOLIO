import { ProjectRecord, ProjectStage, ProjectStats } from "@/types/project";

export const GOOGLE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1lFAJpkXHc1knvtkXStG12SRLJfEUW-ax2hPNaRnZLgo/edit?gid=1788317319#gid=1788317319";

export const GOOGLE_SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/1lFAJpkXHc1knvtkXStG12SRLJfEUW-ax2hPNaRnZLgo/export?format=csv&gid=1788317319";

// In-memory cache to prevent repeated remote requests within TTL
interface CacheContainer {
  timestamp: number;
  data: {
    projects: ProjectRecord[];
    stats: ProjectStats;
    lastUpdated: string;
  } | null;
}

const cache: CacheContainer = {
  timestamp: 0,
  data: null,
};

const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

/**
 * Robust CSV parser that handles quotes, escaped quotes, multiline values, and commas.
 */
export function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentVal = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"' && inQuotes && nextChar === '"') {
      currentVal += '"';
      i++;
    } else if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      currentRow.push(currentVal.trim());
      currentVal = "";
    } else if ((char === "\r" || char === "\n") && !inQuotes) {
      if (char === "\r" && nextChar === "\n") {
        i++;
      }
      currentRow.push(currentVal.trim());
      // Only keep non-empty rows
      if (currentRow.some((c) => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentVal = "";
    } else {
      currentVal += char;
    }
  }

  if (currentVal.length > 0 || currentRow.length > 0) {
    currentRow.push(currentVal.trim());
    if (currentRow.some((c) => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

/**
 * Normalizes stage values into official 4 stages or 'OTHER'.
 * Handles Stage 2, Stage II, Stage 1, Stage I, Under Consideration, Under Formulation with whitespace/casing tolerances.
 */
export function normalizeStage(rawStage: string | undefined): ProjectStage {
  if (!rawStage) return "OTHER";
  const s = rawStage.trim().toLowerCase();

  if (
    s === "stage 2" ||
    s === "stage ii" ||
    s === "stage-2" ||
    s === "stage-ii" ||
    s === "stage 2." ||
    s === "stage ii." ||
    s === "stage2" ||
    s === "stageii"
  ) {
    return "STAGE 2";
  }

  if (
    s === "stage 1" ||
    s === "stage i" ||
    s === "stage-1" ||
    s === "stage-i" ||
    s === "stage 1." ||
    s === "stage i." ||
    s === "stage1" ||
    s === "stagei"
  ) {
    return "STAGE 1";
  }

  if (
    s === "under consideration" ||
    s === "under-consideration" ||
    s === "under_consideration" ||
    s === "consideration"
  ) {
    return "UNDER CONSIDERATION";
  }

  if (
    s === "under formulation" ||
    s === "under-formulation" ||
    s === "under_formulation" ||
    s === "formulation"
  ) {
    return "UNDER FORMULATION";
  }

  return "OTHER";
}

/**
 * Parse numeric cost string (e.g. "1,600.00" -> 1600)
 */
function parseCost(val: string | undefined): number | null {
  if (!val) return null;
  const clean = val.replace(/,/g, "").replace(/[^0-9.-]/g, "").trim();
  if (!clean) return null;
  const num = parseFloat(clean);
  return isNaN(num) ? null : num;
}

/**
 * Normalizes Plant codes and clean strings
 */
function normalizePlant(rawPlant: string | undefined): string {
  if (!rawPlant) return "Unspecified";
  const clean = rawPlant.trim().toUpperCase();
  if (clean === "COLLIERS" || clean === "COLLIRS") return "Collieries";
  return clean;
}

/**
 * Normalizes raw CSV rows to typed ProjectRecord array
 */
export function normalizeProjectData(csvRows: string[][]): {
  projects: ProjectRecord[];
  stats: ProjectStats;
} {
  if (!csvRows || csvRows.length === 0) {
    return {
      projects: [],
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
        sourceUrl: GOOGLE_SHEET_URL,
      },
    };
  }

  const headerRow = csvRows[0].map((h) => h.toLowerCase().trim());

  // Find column indices dynamically
  const colIndex = {
    assignmentNumber: headerRow.findIndex((h) => h.includes("assignment")),
    projectDescription: headerRow.findIndex((h) => h.includes("description") || h.includes("project")),
    plant: headerRow.findIndex((h) => h === "plant"),
    stage: headerRow.findIndex((h) => h.includes("stage") || h.includes("status")),
    acceptanceDate: headerRow.findIndex((h) => h.includes("acceptance")),
    leadSection: headerRow.findIndex((h) => h.includes("lead section") || h === "lead section"),
    tfl: headerRow.findIndex((h) => h === "tfl" || h.includes("task force") || h.includes("leader")),
    indicativeCost: headerRow.findIndex((h) => h.includes("indicative cost")),
    deliverables: headerRow.findIndex((h) => h.includes("deliverables")),
    frSubmissionTargetDate: headerRow.findIndex((h) => h.includes("fr submission target")),
    frSubmissionDate: headerRow.findIndex((h) => h === "fr submission date"),
    tsSubmissionTargetDate: headerRow.findIndex((h) => h.includes("ts submission target")),
    tsSubmissionDate: headerRow.findIndex((h) => h === "ts submission date"),
    revisedFrDate: headerRow.findIndex((h) => h.includes("revised fr submission")),
    frRevisionNo: headerRow.findIndex((h) => h.includes("fr revision number")),
    revisedTsDate: headerRow.findIndex((h) => h.includes("revised ts submission")),
    tsRevisionNo: headerRow.findIndex((h) => h.includes("ts revision number")),
    latestCapitalCost: headerRow.findIndex((h) => h.includes("latest capital cost")),
    implementationSchedule: headerRow.findIndex((h) => h.includes("implentation schedule") || h.includes("schedule")),
    stage1Date: headerRow.findIndex((h) => h.includes("stage i date") || h.includes("stage 1 date")),
    stage1Cost: headerRow.findIndex((h) => h.includes("stage i cost") || h.includes("stage 1 cost")),
    nit: headerRow.findIndex((h) => h === "nit" || h.includes("nit")),
    tod: headerRow.findIndex((h) => h === "tod" || h.includes("tod")),
    terSubmissionDate: headerRow.findIndex((h) => h.includes("ter submission")),
    stage2Date: headerRow.findIndex((h) => h.includes("stage ii date") || h.includes("stage 2 date")),
    stage2Cost: headerRow.findIndex((h) => h.includes("stage ii cost") || h.includes("stage 2 cost")),
    scheduledCommissioningDate: headerRow.findIndex((h) => h.includes("scheduled commissioning")),
    contractor: headerRow.findIndex((h) => h.includes("contractor")),
    commissionedOn: headerRow.findIndex((h) => h.includes("commissioned on")),
    currentStatus: headerRow.findIndex((h) => h === "current status"),
    cost: headerRow.findIndex((h) => h === "cost (rs in cr)" || h.includes("cost (rs in cr)")),
  };

  const projects: ProjectRecord[] = [];
  const plantCounts: Record<string, number> = {};
  const sectionCounts: Record<string, number> = {};

  let stage2Count = 0;
  let stage1Count = 0;
  let underConsiderationCount = 0;
  let underFormulationCount = 0;
  let otherCount = 0;

  let stage2CostSum = 0;
  let stage1CostSum = 0;
  let underConsiderationCostSum = 0;
  let underFormulationCostSum = 0;
  let totalCostSum = 0;

  for (let r = 1; r < csvRows.length; r++) {
    const row = csvRows[r];
    const getVal = (idx: number) => (idx >= 0 && idx < row.length ? (row[idx] || "").trim() : "");

    const assignmentNumber = getVal(colIndex.assignmentNumber !== -1 ? colIndex.assignmentNumber : 0);
    const projectDescription = getVal(colIndex.projectDescription !== -1 ? colIndex.projectDescription : 1);
    const rawStage = getVal(colIndex.stage !== -1 ? colIndex.stage : 3);

    // Skip empty filler rows
    if (!assignmentNumber && !projectDescription) {
      continue;
    }

    const normalizedStage = normalizeStage(rawStage);
    const plant = normalizePlant(getVal(colIndex.plant !== -1 ? colIndex.plant : 2));
    const leadSection = getVal(colIndex.leadSection !== -1 ? colIndex.leadSection : 5);
    const tfl = getVal(colIndex.tfl !== -1 ? colIndex.tfl : 6).replace(/\s+/g, " ");

    const indicativeCostStr = getVal(colIndex.indicativeCost !== -1 ? colIndex.indicativeCost : 7);
    const latestCapitalCostStr = getVal(colIndex.latestCapitalCost !== -1 ? colIndex.latestCapitalCost : 17);
    const stage1CostStr = getVal(colIndex.stage1Cost !== -1 ? colIndex.stage1Cost : 20);
    const stage2CostStr = getVal(colIndex.stage2Cost !== -1 ? colIndex.stage2Cost : 25);
    const costStr = getVal(colIndex.cost !== -1 ? colIndex.cost : 31);

    const indicativeCostNum = parseCost(indicativeCostStr);
    const latestCapitalCostNum = parseCost(latestCapitalCostStr);
    const stage1CostNum = parseCost(stage1CostStr);
    const stage2CostNum = parseCost(stage2CostStr);
    const costNum = parseCost(costStr) ?? latestCapitalCostNum ?? stage2CostNum ?? stage1CostNum ?? indicativeCostNum;

    if (costNum) {
      totalCostSum += costNum;
    }

    // Counts & Stage Costs update
    switch (normalizedStage) {
      case "STAGE 2":
        stage2Count++;
        if (costNum) stage2CostSum += costNum;
        break;
      case "STAGE 1":
        stage1Count++;
        if (costNum) stage1CostSum += costNum;
        break;
      case "UNDER CONSIDERATION":
        underConsiderationCount++;
        if (costNum) underConsiderationCostSum += costNum;
        break;
      case "UNDER FORMULATION":
        underFormulationCount++;
        if (costNum) underFormulationCostSum += costNum;
        break;
      default:
        otherCount++;
        break;
    }

    if (plant) {
      plantCounts[plant] = (plantCounts[plant] || 0) + 1;
    }
    if (leadSection) {
      sectionCounts[leadSection] = (sectionCounts[leadSection] || 0) + 1;
    }

    const searchString = [
      assignmentNumber,
      projectDescription,
      plant,
      rawStage,
      normalizedStage,
      leadSection,
      tfl,
      getVal(colIndex.deliverables),
      getVal(colIndex.contractor),
      costStr,
    ]
      .join(" ")
      .toLowerCase();

    projects.push({
      assignmentNumber: assignmentNumber || "—",
      projectDescription: projectDescription || "Untitled Assignment",
      plant,
      rawStage,
      normalizedStage,
      acceptanceDate: getVal(colIndex.acceptanceDate),
      leadSection: leadSection || "—",
      tfl: tfl || "—",
      indicativeCost: indicativeCostStr,
      indicativeCostNum,
      deliverables: getVal(colIndex.deliverables),
      frSubmissionTargetDate: getVal(colIndex.frSubmissionTargetDate),
      frSubmissionDate: getVal(colIndex.frSubmissionDate),
      tsSubmissionTargetDate: getVal(colIndex.tsSubmissionTargetDate),
      tsSubmissionDate: getVal(colIndex.tsSubmissionDate),
      revisedFrDate: getVal(colIndex.revisedFrDate),
      frRevisionNo: getVal(colIndex.frRevisionNo),
      revisedTsDate: getVal(colIndex.revisedTsDate),
      tsRevisionNo: getVal(colIndex.tsRevisionNo),
      latestCapitalCost: latestCapitalCostStr,
      latestCapitalCostNum,
      implementationSchedule: getVal(colIndex.implementationSchedule),
      stage1Date: getVal(colIndex.stage1Date),
      stage1Cost: stage1CostStr,
      stage1CostNum,
      nit: getVal(colIndex.nit),
      tod: getVal(colIndex.tod),
      terSubmissionDate: getVal(colIndex.terSubmissionDate),
      stage2Date: getVal(colIndex.stage2Date),
      stage2Cost: stage2CostStr,
      stage2CostNum,
      scheduledCommissioningDate: getVal(colIndex.scheduledCommissioningDate),
      contractor: getVal(colIndex.contractor),
      commissionedOn: getVal(colIndex.commissionedOn),
      currentStatus: getVal(colIndex.currentStatus),
      cost: costStr,
      costNum,
      searchString,
    });
  }

  const totalActiveCostCr =
    Math.round((stage2CostSum + stage1CostSum + underConsiderationCostSum + underFormulationCostSum) * 100) / 100;
  const totalActiveProjects = stage2Count + stage1Count + underConsiderationCount + underFormulationCount;

  const stats: ProjectStats = {
    totalProjects: stage2Count + stage1Count + underConsiderationCount + underFormulationCount,
    stage2Count,
    stage1Count,
    underConsiderationCount,
    underFormulationCount,
    otherCount,
    stage2CostCr: Math.round(stage2CostSum * 100) / 100,
    stage1CostCr: Math.round(stage1CostSum * 100) / 100,
    underConsiderationCostCr: Math.round(underConsiderationCostSum * 100) / 100,
    underFormulationCostCr: Math.round(underFormulationCostSum * 100) / 100,
    totalActiveCostCr,
    totalActiveProjects,
    plantCounts,
    sectionCounts,
    totalEstimatedCostCr: Math.round(totalCostSum * 100) / 100,
    lastUpdated: new Date().toISOString(),
    sourceUrl: GOOGLE_SHEET_URL,
  };

  return { projects, stats };
}

/**
 * Fetch projects directly from the Google Sheets CSV endpoint with caching & error recovery.
 */
export async function getProjects(forceRefresh = false): Promise<{
  projects: ProjectRecord[];
  stats: ProjectStats;
  lastUpdated: string;
  isStale?: boolean;
}> {
  const now = Date.now();

  if (!forceRefresh && cache.data && now - cache.timestamp < CACHE_TTL_MS) {
    return {
      ...cache.data,
      isStale: false,
    };
  }

  try {
    const res = await fetch(GOOGLE_SHEET_CSV_URL, {
      cache: "no-store",
      headers: {
        "User-Agent": "SAIL-CET-PFCDepartment-Portal/1.0",
      },
    });

    if (!res.ok) {
      throw new Error(`Google Sheets responded with HTTP ${res.status}: ${res.statusText}`);
    }

    const csvText = await res.text();
    const rows = parseCSV(csvText);

    if (rows.length === 0) {
      throw new Error("Received empty CSV payload from Google Sheets");
    }

    const { projects, stats } = normalizeProjectData(rows);

    cache.timestamp = now;
    cache.data = {
      projects,
      stats,
      lastUpdated: new Date().toISOString(),
    };

    return {
      projects,
      stats,
      lastUpdated: cache.data.lastUpdated,
      isStale: false,
    };
  } catch (error) {
    console.error("Error fetching project data from Google Sheet:", error);

    // If cache is available, return stale cache gracefully
    if (cache.data) {
      return {
        ...cache.data,
        isStale: true,
      };
    }

    throw error;
  }
}
