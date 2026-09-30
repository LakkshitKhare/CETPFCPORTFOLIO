"use client";

import React from "react";
import Image from "next/image";
import {
  FileText,
  Compass,
  Activity,
  Briefcase,
  Layers,
  Award,
  CheckCircle,
} from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-50 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
            Institutional Profile
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
            About the Department
          </h2>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            The <strong>Project Formulation &amp; Coordination (PF&amp;C) Department</strong> is an
            integral division of the <em>Centre for Engineering &amp; Technology (CET)</em>, the
            in-house design, engineering, and technology consultancy unit of Steel Authority of India
            Limited (SAIL).
          </p>
        </div>

        {/* 2-Column Institutional Narrative */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6 text-slate-700 leading-relaxed text-sm sm:text-base">
            <p>
              Headquartered at Ispat Bhawan, Ranchi, with dedicated engineering sub-centres across
              SAIL&apos;s steel manufacturing facilities, the department spearheads the conceptualization,
              techno-economic feasibility evaluation, multi-disciplinary engineering coordination,
              and project monitoring from initial client request through Stage-1, Stage-2 sanction, and
              commissioning.
            </p>

            <div className="bg-slate-50 border-l-4 border-blue-700 p-4 sm:p-5 rounded-r-lg space-y-2">
              <h4 className="font-bold text-slate-900 text-base">
                Departmental Mission &amp; Purpose
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                To formulate technically robust, commercially viable, and operationally optimal
                capital investment schemes and modernization projects for SAIL&apos;s integrated steel
                plants, mines, and auxiliary units while ensuring rigorous adherence to CPSE guidelines,
                environmental standards, and ISO 9001:2015 quality frameworks.
              </p>
            </div>

            <p>
              The department functions as the centralized repository and coordination hub for all
              capital expenditure assignments, acting as the bridge between operating plants,
              specialized engineering disciplines (Blast Furnaces, Steel Making, Rolling Mills, Raw
              Materials, Utilities, Electrical &amp; Automation, Civil &amp; Structural), and apex
              management approvals.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-slate-200 shadow-md">
              <div className="relative h-64 sm:h-72 w-full">
                <Image
                  src="/images/Sail.png"
                  alt="Engineering Blueprints and Metallurgical CAD"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2545]/90 via-[#0B2545]/30 to-transparent" />
              </div>
              <div className="p-5 bg-[#0B2545] text-white">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Award className="w-4 h-4" /> ISO 9001:2015 Certified Management System
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Quality assured workflows across Feasibility Reports, Tender Specifications, Cost
                  Estimations, and Technical Evaluation Reports.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 5 Core Pillars of Departmental Functionality */}
        <div className="mt-14 pt-10 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-xl sm:text-2xl font-black text-[#0B2545]">
              Core Departmental Responsibilities
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Five fundamental pillars governing the department&apos;s operational mandate
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center font-bold mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                1. Project Formulation
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Formulating comprehensive Techno-Economic Feasibility Reports (FR), Detailed Project
                Reports (DPR), Technical Notes, Mining Plans, and capital cost estimates for new
                installations, brownfield expansions, and revamping schemes.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-4">
                <Compass className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                2. Project Coordination
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Facilitating multi-disciplinary synergy among specialized CET departments, Task Force
                Leaders (TFLs), plant sub-centres (BSC, BoSC, RSC, DSC, BUSC), and plant project
                authorities to ensure seamless data exchange and technical coherence.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                3. Project Monitoring
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Continuous tracking of project milestones including FR submission target dates, TS
                submissions, NIT releases, TODs, Tender Evaluation Reports (TER), and implementation
                schedules against approved timelines.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-sm transition-all">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center font-bold mb-4">
                <Briefcase className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                4. Portfolio Management
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Centralized maintenance and dynamic tracking of SAIL&apos;s corporate capex assignment
                register, ensuring accurate stage classification, expenditure metrics, and executive
                decision-support analytics.
              </p>
            </div>

            {/* Pillar 5 */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-sm transition-all md:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-lg bg-slate-200 text-slate-800 flex items-center justify-center font-bold mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-slate-900">
                5. Multi-Stage Lifecycle Transition Management
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                Structured oversight ensuring every capital scheme methodically progresses from initial
                plant requisition (Under Consideration) → Feasibility formulation (Under Formulation)
                → Board In-Principle Sanction (Stage 1) → Board Final Financial Sanction &amp; Package
                Award (Stage 2) → Commissioning &amp; Handover.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
