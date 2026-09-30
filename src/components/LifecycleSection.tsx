"use client";

import React from "react";
import {
  FileQuestion,
  FileCode2,
  FileCheck2,
  Rocket,
  ArrowRight,
  ArrowDown,
  Layers,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface LifecycleSectionProps {
  stageCounts: {
    underConsideration: number;
    underFormulation: number;
    stage1: number;
    stage2: number;
  };
  onSelectStage?: (stageName: "UNDER CONSIDERATION" | "UNDER FORMULATION" | "STAGE 1" | "STAGE 2") => void;
}

export function LifecycleSection({
  stageCounts,
  onSelectStage,
}: LifecycleSectionProps) {
  const steps = [
    {
      id: "UNDER FORMULATION" as const,
      number: "01",
      title: "Under Formulation",
      subTitle: "Tier 1 • FR/DPR/TS/EC PREPARATION",
      badgeColor: "bg-purple-100 text-purple-900 border-purple-300",
      icon: FileCode2,
      accentColor: "border-purple-600",
      bgColor: "bg-purple-50/50",
      count: stageCounts.underFormulation,
      description:
        "The formulation team defines project scope, objectives, conduct market & environmental analysis, site visits, assess technical feasibility, conduct risk analysis, prepares technical layouts, cost estimates, and the formal feasibility documentation required for approval and sanctioning.",
      keyDeliverables: [
        "Assignment Registration & TFL Assignment",
        "Initial Review for Mandate-to-Formulation",
        "Scope Framing & Technical Requirement Mapping",
        "FR Preparation with Block cost",
        "Technical Specification",
        "Eligibility Criteria for Bidders",
        "Report for Management Review and Approval",
      ],
      decisionGate: "Acceptance for formulation and technical mandate",
    },
    {
      id: "UNDER CONSIDERATION" as const,
      number: "02",
      title: "Under Consideration",
      subTitle: "Tier 2 • FR/DPR/TS SUBMITTED",
      badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
      icon: FileQuestion,
      accentColor: "border-amber-500",
      bgColor: "bg-amber-50/50",
      count: stageCounts.underConsideration,
      description:
        "The project concept is reviewed for strategic fit, site relevance, and preliminary technical viability. Plant validates the scope, assesses whether a technical mandate should be initiated, and aligns the assignment with requirements.",
      keyDeliverables: [
        "Feasibility / Technical Specification Submitted",
        "Management Appraisal for Stage I approval",
        "Pre-NIT",
        "Revised Reports with estimated cost",
      ],
      decisionGate: "Approval-ready project package for Board / sanctioning authority",
    },
    {
      id: "STAGE 1" as const,
      number: "03",
      title: "Stage 1",
      subTitle: "Tier 3 • Approval & Tendering",
      badgeColor: "bg-blue-100 text-blue-900 border-blue-300",
      icon: FileCheck2,
      accentColor: "border-blue-600",
      bgColor: "bg-blue-50/50",
      count: stageCounts.stage1,
      description:
        "Once the in-principle approval is received, CET finalizes the technical tendering specification of packages, evaluates technical offers and conducts tender discussion. Prepares TER for further award.",
      keyDeliverables: [
        "Stage-1 Sanction & Date Recording",
        "NIT and Offers receipt",
        "Technical Bid Evaluation",
        "TER preparation and Approval",
      ],
      decisionGate: "Tender completion, technical evaluation and TER submission",
    },
    {
      id: "STAGE 2" as const,
      number: "04",
      title: "Stage 2",
      subTitle: "Tier 4 • Sanction & Execution",
      badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
      icon: Rocket,
      accentColor: "border-emerald-600",
      bgColor: "bg-emerald-50/50",
      count: stageCounts.stage2,
      description:
        "Final sanctions are granted, contracts are awarded, and the project enters execution. CET continues as the design and engineering interface through drawing approval, site supervision/ monitoring and commissioning.",
      keyDeliverables: [
        "Stage-2 Board Sanction & Expenditure Approval",
        "Contract Award & Mobilisation",
        "Drawing Approval",
        "Execution Monitoring & Design Coordination",
        "Commissioning, Handover & Closure",
      ],
      decisionGate: "Successful Testing, Commissioning & Handover",
    },
  ];

  const handleStageSelect = (stageId: "UNDER CONSIDERATION" | "UNDER FORMULATION" | "STAGE 1" | "STAGE 2") => {
    if (onSelectStage) {
      onSelectStage(stageId);
    }
    const portfolio = document.getElementById("portfolio");
    if (portfolio) {
      portfolio.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="lifecycle" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Layers className="w-4 h-4 text-blue-700" />
            Standard Departmental Procedure
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
            Project Formulation &amp; Coordination Lifecycle
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            The institutional four-tier progression framework governing capital projects across
            SAIL steel plants from conceptual proposal to final execution and commissioning.
          </p>
        </div>

        {/* 4-Stage Workflow Diagram */}
        <div className="mt-14 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.id}
                  className={`bg-white rounded-xl p-6 border-2 ${step.accentColor} shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative`}
                >
                  {/* Step Header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black font-mono text-slate-400">
                        {step.number}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${step.badgeColor} font-mono`}
                        >
                          {step.count} Live Projects
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className="p-2 rounded-lg bg-slate-100 text-slate-800">
                        <Icon className="w-5 h-5 text-blue-900" />
                      </div>
                      <div>
                        <h3 className="text-base font-black text-slate-900 leading-snug">
                          {step.title}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide block">
                          {step.subTitle}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 mt-3 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Key Deliverables List */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                        Key Deliverables &amp; Activities
                      </span>
                      {step.keyDeliverables.map((item, itemIdx) => (
                        <div
                          key={itemIdx}
                          className="flex items-start gap-1.5 text-xs text-slate-700 font-medium"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Decision Gate & Quick Filter Action */}
                  <div className="mt-6 pt-3 border-t border-slate-100">
                    <div className="p-2 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-600 mb-3">
                      <strong className="text-slate-800 font-semibold block">Decision Gate:</strong>
                      {step.decisionGate}
                    </div>

                    <button
                      onClick={() => handleStageSelect(step.id)}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-[#0B2545] text-slate-700 hover:text-white text-xs font-bold transition-all cursor-pointer group"
                    >
                      <span>Filter {step.title} in Portfolio</span>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-300 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flow Summary Legend */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900">Official Workflow Sequence:</span>
              <span className="hidden sm:inline font-mono">
                Under Formulation → Under Consideration → Stage 1 → Stage 2 → Commissioning &amp; Handover
              </span>
            </div>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-1 font-bold text-blue-700 hover:text-blue-900"
            >
              <span>Explore Live Project Records</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
