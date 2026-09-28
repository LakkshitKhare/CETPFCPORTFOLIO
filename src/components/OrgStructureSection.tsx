"use client";

import React, { useState } from "react";
import {
  Users,
  Building,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  Shield,
  Search,
  User,
} from "lucide-react";

interface PersonNode {
  name: string;
  designation: string;
  department: string;
  location: string;
  role: string;
  email?: string;
  phone?: string;
  isHead?: boolean;
}

export function OrgStructureSection() {
  const headOfDept: PersonNode = {
    name: "Head of Department (PFC)",
    designation: "Chief General Manager (CGM)",
    department: "Projects (PFC, CTE, Contracts & Coordination)",
    location: "Ispat Bhawan, Ranchi",
    role: "Departmental Head — Project Formulation, Coordination, Corporate Capex Appraisal & Milestone Monitoring",
    email: "pfc.cet@sail.in",
    phone: "0651-2411183 / 0651-2411165",
    isHead: true,
  };

  const cgmVerticals: PersonNode[] = [
    {
      name: "CGM / In-Charge (Raw Materials)",
      designation: "Chief General Manager (CGM)",
      department: "Raw Materials & Mining Engineering",
      location: "CET Ranchi",
      role: "Mine planning, beneficiation, raw material handling systems & environmental clearances",
      email: "rm.cet@sail.in",
      phone: "0651-2411196",
    },
    {
      name: "CGM / In-Charge (C, C&C & BE)",
      designation: "Chief General Manager (CGM)",
      department: "Coal, Coke & Chemicals, BE & IPSS",
      location: "CET Ranchi",
      role: "Coke ovens, by-product recovery, basic engineering & inter-plant standardization",
      email: "ccc.cet@sail.in",
      phone: "0651-2411199",
    },
    {
      name: "CGM / In-Charge (Electrical & C&IT)",
      designation: "Chief General Manager (CGM)",
      department: "Electrical, PC&A and C&IT",
      location: "CET Ranchi",
      role: "Power distribution, process control, automation, instrumentation & digital architecture",
      email: "electrical.cet@sail.in",
      phone: "0651-2410841",
    },
  ];

  const subCentres: { name: string; code: string; location: string; focus: string; phone: string }[] = [
    {
      name: "Bhilai Sub-Centre",
      code: "BSC",
      location: "5th Floor, Ispat Bhawan, Bhilai Steel Plant, Bhilai (Chhattisgarh)",
      focus: "Rail & Structural Mill, SMS-3, Blast Furnaces, Plate Mill assignments",
      phone: "0788-2223093",
    },
    {
      name: "Bokaro Sub-Centre",
      code: "BoSC",
      location: "Ground Floor, C-Block, Ispat Bhawan, Bokaro Steel City (Jharkhand)",
      focus: "Hot Strip Mill, CRM, CHSGP, Blast Furnaces, Power Plant projects",
      phone: "06542-240849",
    },
    {
      name: "Rourkela Sub-Centre",
      code: "RSC",
      location: "7th Floor, Ispat Bhawan, Rourkela Steel Plant, Rourkela (Odisha)",
      focus: "Hot Strip Mill-2, Plate Mill, SMS-2, Ore Handling & Environment schemes",
      phone: "0661-2510123",
    },
    {
      name: "Durgapur Sub-Centre",
      code: "DSC",
      location: "PEDD Building, Durgapur Steel Plant, Durgapur (West Bengal)",
      focus: "Wheel & Axle Plant, Medium Structural Mill, SGP, BF#4 modifications",
      phone: "0343-2574321",
    },
    {
      name: "Burnpur Sub-Centre",
      code: "BUSC",
      location: "3rd Floor, PEDD Building, IISCO Steel Plant, Burnpur (West Bengal)",
      focus: "Expansion schemes, Bar Mill, Wire Rod Mill, BOF & Raw Material logistics",
      phone: "0341-2240391",
    },
  ];

  return (
    <section id="organization" className="py-16 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-4 h-4 text-blue-700" />
            Institutional Hierarchy
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
            Organization Structure &amp; Personnel
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Hierarchical governance framework of the Project Formulation &amp; Coordination
            Department, linking executive management, specialized engineering disciplines, and plant sub-centres.
          </p>

        </div>

        <div className="mt-12 space-y-10">
          {/* Tier 1: Apex Leadership */}
          <div className="flex flex-col items-center">
            <div className="w-[320px] h-[320px] bg-[#07162C] text-white rounded-2xl p-6 border border-slate-700 shadow-md text-center relative flex flex-col items-center justify-center">
              <div className="w-24 h-24 mx-auto rounded-full bg-slate-800 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-bold text-lg mb-3 shadow">
                <User className="w-8 h-8 text-amber-300" />
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-amber-400">
                Head Of Department (Project PFC)
              </div>
              <h3 className="text-lg font-black text-white mt-1">
                R.K. Sokey
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Centre for Engineering &amp; Technology, SAIL Ranchi
              </p>
              <div className="text-[11px] text-slate-400 mt-2 font-mono">
                General Manager
              </div>
            </div>

            {/* Connecting Line */}
            <div className="w-0.5 h-8 bg-blue-900 my-1" />

            {/* Tier 2: Desk Officer (Secondary Role) */}
            <div className="w-[260px] h-[260px] bg-gradient-to-r from-blue-950 via-[#0B2545] to-blue-900 text-white rounded-2xl p-5 border-2 border-blue-400 shadow-xl relative flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-blue-800 border-2 border-white/60 flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-inner mb-3">
                <User className="w-7 h-7 text-sky-200" />
              </div>

              <div className="text-center space-y-1">
                <div className="text-[10px] font-bold uppercase tracking-wider text-sky-300">
                  Desk Officer
                </div>
                <h3 className="text-lg font-black text-white">Vikash Kumar</h3>
                <div className="text-[11px] font-bold text-sky-300">
                  Centre for Engineering &amp; Technology, SAIL Ranchi
                </div>
                <div className="text-[11px] text-slate-300 font-medium">
                  General Manager
                </div>
              </div>
            </div>

            {/* Connecting Vertical Stem */}
            <div className="w-0.5 h-8 bg-blue-900 my-1" />
          </div>

          {/* Tier 3: Specialized CGMs & Engineering Disciplines */}
          <div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div

                className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-900 border border-blue-200 flex items-center justify-center font-bold text-base shrink-0">
                      <User className="w-6 h-6 text-blue-800" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Milind Kumar Verma</h4>
                      <span className="text-xs text-blue-800 font-semibold block">
                        Assistant General Manager
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded border border-slate-200 inline-block mb-2">
                    Centre for Engineering &amp; Technology, SAIL Ranchi
                  </div>
                </div>
              </div>
              <div

                className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-900 border border-blue-200 flex items-center justify-center font-bold text-base shrink-0">
                      <User className="w-6 h-6 text-blue-800" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">M. R. Mishra</h4>
                      <span className="text-xs text-blue-800 font-semibold block">
                        Senior Manager
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded border border-slate-200 inline-block mb-2">
                    Centre for Engineering &amp; Technology, SAIL Ranchi
                  </div>
                </div>
              </div>
              <div

                className="bg-slate-50 border border-slate-200 rounded-xl p-5 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-900 border border-blue-200 flex items-center justify-center font-bold text-base shrink-0">
                      <User className="w-6 h-6 text-blue-800" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Ms. Nikki Gupta</h4>
                      <span className="text-xs text-blue-800 font-semibold block">
                        Senior Manager
                      </span>
                    </div>
                  </div>

                  <div className="text-xs font-bold text-slate-700 bg-white px-2.5 py-1 rounded border border-slate-200 inline-block mb-2">
                    Centre for Engineering &amp; Technology, SAIL Ranchi
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tier 4: Sub-Centres (Plant Units Coordination) */}
          <div className="pt-6 border-t border-slate-200">
            <div className="text-center mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                SAIL Plant Sub-Centres Coordination Network
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {subCentres.map((sub, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-500 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-900 uppercase font-mono">
                      {sub.code}
                    </span>
                    <Building className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">{sub.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">{sub.location}</p>
                  <p className="text-[10px] text-slate-600 mt-2 font-medium bg-slate-50 p-1.5 rounded border border-slate-100">
                    {sub.focus}
                  </p>
                  <div className="mt-3 text-[11px] font-mono text-slate-600 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-slate-400" />
                    <span>{sub.phone}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
