export type ProjectStage =
  | "STAGE 2"
  | "STAGE 1"
  | "UNDER CONSIDERATION"
  | "UNDER FORMULATION"
  | "OTHER";

export interface ProjectRecord {
  assignmentNumber: string;
  projectDescription: string;
  plant: string;
  rawStage: string;
  normalizedStage: ProjectStage;
  acceptanceDate: string;
  leadSection: string;
  tfl: string;
  indicativeCost: string;
  indicativeCostNum: number | null;
  deliverables: string;
  frSubmissionTargetDate: string;
  frSubmissionDate: string;
  tsSubmissionTargetDate: string;
  tsSubmissionDate: string;
  revisedFrDate: string;
  frRevisionNo: string;
  revisedTsDate: string;
  tsRevisionNo: string;
  latestCapitalCost: string;
  latestCapitalCostNum: number | null;
  implementationSchedule: string;
  stage1Date: string;
  stage1Cost: string;
  stage1CostNum: number | null;
  nit: string;
  tod: string;
  terSubmissionDate: string;
  stage2Date: string;
  stage2Cost: string;
  stage2CostNum: number | null;
  scheduledCommissioningDate: string;
  contractor: string;
  commissionedOn: string;
  currentStatus: string;
  cost: string;
  costNum: number | null;
  // Normalized searchable text
  searchString: string;
}

export interface ProjectStats {
  totalProjects: number;
  stage2Count: number;
  stage1Count: number;
  underConsiderationCount: number;
  underFormulationCount: number;
  otherCount: number;
  // Cost breakdown by stage (in ₹ Crores)
  stage2CostCr: number;
  stage1CostCr: number;
  underConsiderationCostCr: number;
  underFormulationCostCr: number;
  totalActiveCostCr: number;
  totalActiveProjects: number;
  plantCounts: Record<string, number>;
  sectionCounts: Record<string, number>;
  totalEstimatedCostCr: number;
  lastUpdated: string;
  sourceUrl: string;
}

export interface ApiResponse {
  success: boolean;
  lastUpdated: string;
  stats: ProjectStats;
  projects: ProjectRecord[];
  error?: string;
  isStale?: boolean;
}

export type StageTabFilter = "ALL" | "STAGE 2" | "STAGE 1" | "UNDER CONSIDERATION" | "UNDER FORMULATION";
