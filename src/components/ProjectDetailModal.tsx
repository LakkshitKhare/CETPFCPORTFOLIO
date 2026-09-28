"use client";

import React, { useState } from "react";
import { ProjectRecord } from "@/types/project";
import {
  X,
  Copy,
  Check,
  Building,
  Calendar,
  IndianRupee,
  User,
  Layers,
  FileText,
  Clock,
  Printer,
  ShieldCheck,
  HardHat,
  Share2,
} from "lucide-react";

interface ProjectDetailModalProps {
  project: ProjectRecord | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!project) return null;

  const handleCopyAssignment = () => {
    navigator.clipboard.writeText(project.assignmentNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const getStageBadgeColor = (stage: string) => {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0B2545] text-white p-5 sm:p-6 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded font-mono text-xs font-bold bg-blue-600 text-white tracking-wider">
                ASSIGNMENT #{project.assignmentNumber}
              </span>
              <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-800 text-slate-200 uppercase font-mono">
                {project.plant}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-bold border ${getStageBadgeColor(
                  project.normalizedStage
                )}`}
              >
                {project.rawStage || project.normalizedStage}
              </span>
            </div>

            <h3 id="modal-project-title" className="text-lg sm:text-xl font-black text-white pt-1 leading-snug">
              {project.projectDescription}
            </h3>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close project details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Action Strip */}
        <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <span>Lead Section: <strong className="text-slate-900">{project.leadSection}</strong></span>
            <span>•</span>
            <span>Task Force Leader (TFL): <strong className="text-slate-900">{project.tfl}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyAssignment}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold cursor-pointer transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Copied" : "Copy Assignment #"}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Brief</span>
            </button>
          </div>
        </div>

        {/* Modal Content - Structured Parameter Grid */}
        <div className="p-6 max-h-[72vh] overflow-y-auto space-y-6 custom-scrollbar text-xs">
          {/* Group 1: General & Financial Overview */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <IndianRupee className="w-4 h-4 text-blue-700" />
              Financial &amp; General Specification
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">Cost (₹ in Cr)</span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {project.cost ? `₹ ${project.cost} Cr` : "—"}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">Indicative Cost</span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {project.indicativeCost ? `₹ ${project.indicativeCost} Cr` : "—"}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">Latest Capital Cost</span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {project.latestCapitalCost ? `₹ ${project.latestCapitalCost} Cr` : "—"}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">Acceptance Date</span>
                <span className="text-sm font-bold text-slate-900 font-mono">
                  {project.acceptanceDate || "—"}
                </span>
              </div>
            </div>
          </div>

          {/* Group 2: Deliverables & Technical Scope */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-700" />
              Technical Deliverables &amp; Documentation
            </h4>
            <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
              <span className="text-[10px] text-slate-500 uppercase font-medium block mb-1">
                Authorized Deliverables
              </span>
              <span className="text-xs font-semibold text-slate-900">
                {project.deliverables || "Standard Feasibility & Technical Note Scope"}
              </span>
            </div>
          </div>

          {/* Group 3: Feasibility Report (FR) & Tender Specification (TS) Progress */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-700" />
              FR &amp; TS Engineering Milestones
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">FR Submission Target</span>
                <span className="text-xs font-bold text-slate-800 font-mono">
                  {project.frSubmissionTargetDate || "—"}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">FR Actual Submission</span>
                <span className="text-xs font-bold text-slate-800 font-mono">
                  {project.frSubmissionDate || "—"}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">TS Submission Target</span>
                <span className="text-xs font-bold text-slate-800 font-mono">
                  {project.tsSubmissionTargetDate || "—"}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">TS Actual Submission</span>
                <span className="text-xs font-bold text-slate-800 font-mono">
                  {project.tsSubmissionDate || "—"}
                </span>
              </div>
            </div>

            {(project.revisedFrDate || project.revisedTsDate || project.frRevisionNo || project.tsRevisionNo) && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-medium block">Revised FR Date</span>
                  <span className="text-xs font-semibold text-slate-800 font-mono">{project.revisedFrDate || "—"}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-medium block">FR Revision No.</span>
                  <span className="text-xs font-semibold text-slate-800 font-mono">{project.frRevisionNo || "—"}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-medium block">Revised TS Date</span>
                  <span className="text-xs font-semibold text-slate-800 font-mono">{project.revisedTsDate || "—"}</span>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                  <span className="text-[10px] text-slate-500 uppercase font-medium block">TS Revision No.</span>
                  <span className="text-xs font-semibold text-slate-800 font-mono">{project.tsRevisionNo || "—"}</span>
                </div>
              </div>
            )}
          </div>

          {/* Group 4: Stage 1 & Stage 2 Milestones */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-700" />
              Stage 1 &amp; Stage 2 Sanction Details
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200">
                <span className="text-[10px] text-blue-900 uppercase font-medium block">Stage I Date</span>
                <span className="text-xs font-bold text-blue-950 font-mono">{project.stage1Date || "—"}</span>
              </div>
              <div className="bg-blue-50/60 p-3 rounded-lg border border-blue-200">
                <span className="text-[10px] text-blue-900 uppercase font-medium block">Stage I Cost</span>
                <span className="text-xs font-bold text-blue-950 font-mono">
                  {project.stage1Cost ? `₹ ${project.stage1Cost} Cr` : "—"}
                </span>
              </div>
              <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200">
                <span className="text-[10px] text-emerald-900 uppercase font-medium block">Stage II Date</span>
                <span className="text-xs font-bold text-emerald-950 font-mono">{project.stage2Date || "—"}</span>
              </div>
              <div className="bg-emerald-50/60 p-3 rounded-lg border border-emerald-200">
                <span className="text-[10px] text-emerald-900 uppercase font-medium block">Stage II Cost</span>
                <span className="text-xs font-bold text-emerald-950 font-mono">
                  {project.stage2Cost ? `₹ ${project.stage2Cost} Cr` : "—"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-3">
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">NIT (Notice Inviting Tender)</span>
                <span className="text-xs font-semibold text-slate-800 font-mono">{project.nit || "—"}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">TOD (Tender Open Date)</span>
                <span className="text-xs font-semibold text-slate-800 font-mono">{project.tod || "—"}</span>
              </div>
              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">TER Submission Date</span>
                <span className="text-xs font-semibold text-slate-800 font-mono">{project.terSubmissionDate || "—"}</span>
              </div>
            </div>
          </div>

          {/* Group 5: Execution, Contracting & Commissioning */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
              <HardHat className="w-4 h-4 text-blue-700" />
              Contracting, Execution &amp; Commissioning
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">Appointed Contractor</span>
                <span className="text-xs font-bold text-slate-900">{project.contractor || "Under Tendering / TBD"}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">Implementation Schedule</span>
                <span className="text-xs font-bold text-slate-900 font-mono">
                  {project.implementationSchedule
                    ? `${project.implementationSchedule} Months`
                    : "—"}
                </span>
              </div>
              <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-medium block">Scheduled Commissioning Date</span>
                <span className="text-xs font-bold text-slate-900 font-mono">
                  {project.scheduledCommissioningDate || "—"}
                </span>
              </div>
            </div>

            {(project.commissionedOn || project.currentStatus) && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-3">
                {project.commissionedOn && (
                  <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
                    <span className="text-[10px] text-emerald-800 uppercase font-medium block">Commissioned On</span>
                    <span className="text-xs font-bold text-emerald-950 font-mono">{project.commissionedOn}</span>
                  </div>
                )}
                {project.currentStatus && (
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                    <span className="text-[10px] text-slate-500 uppercase font-medium block">Current Status Note</span>
                    <span className="text-xs font-semibold text-slate-800">{project.currentStatus}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-between">
          <div className="text-[11px] text-slate-500 font-mono">
            Directly mapped from Google Sheets Registry (ID: 1lFAJpkX...)
          </div>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] transition-colors cursor-pointer"
          >
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
