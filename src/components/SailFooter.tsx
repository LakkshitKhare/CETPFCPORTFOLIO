"use client";

import React from "react";
import { SailLogo } from "./SailEmblem";
import {
  ShieldCheck,
  Building2,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  Award,
  Layers,
  Clock,
} from "lucide-react";

interface SailFooterProps {
  lastUpdated?: string;
  totalProjects?: number;
}

export function SailFooter({ lastUpdated, totalProjects = 0 }: SailFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07162C] text-slate-300 border-t border-slate-800 text-xs">
      {/* Main Footer Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
          {/* Col 1: Institutional Identity */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <SailLogo className="w-10 h-10 shrink-0" light />
              <div>
                <span className="text-base font-black text-white tracking-tight uppercase">
                  SAIL • CET Ranchi
                </span>
                <span className="block text-[11px] text-slate-400 font-semibold">
                  Centre for Engineering &amp; Technology
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Project Formulation &amp; Coordination Department. The in-house design, engineering,
              and technology consultancy division of Steel Authority of India Limited (a Maharatna
              Public Sector Enterprise, Govt. of India).
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-amber-400 font-medium">
              <Award className="w-4 h-4 shrink-0" />
              <span>ISO 9001:2015 Certified Engineering Unit</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Department Portal Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#home" className="hover:text-white transition-colors">
                  Home Overview
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Department &amp; Responsibilities
                </a>
              </li>
              <li>
                <a href="#lifecycle" className="hover:text-white transition-colors">
                  Project Formulation &amp; Coordination Lifecycle
                </a>
              </li>
              <li>
                <a href="#organization" className="hover:text-white transition-colors">
                  Organization Structure &amp; Personnel
                </a>
              </li>
              <li>
                <a
                  href="#portfolio"
                  className="font-bold text-sky-400 hover:text-sky-300 transition-colors flex items-center gap-1"
                >
                  <span>Live Project Portfolio</span>
                  {totalProjects > 0 && (
                    <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-[10px] font-mono text-white">
                      {totalProjects}
                    </span>
                  )}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact Head of Department
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Head Office & Sub-Centres */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Headquarters &amp; Sub-Centres
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>
                  Room C-334, 4th Floor, Ispat Bhawan, Shyamali Colony, Doranda, Ranchi – 834002
                  (Jharkhand)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span className="font-mono">rk.sokey@sail.in</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">
                Integrated Plant Sub-Centres
              </span>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px] text-slate-300">
                <span className="px-1.5 py-0.5 bg-slate-800 rounded">BSC (Bhilai)</span>
                <span className="px-1.5 py-0.5 bg-slate-800 rounded">BoSC (Bokaro)</span>
                <span className="px-1.5 py-0.5 bg-slate-800 rounded">RSC (Rourkela)</span>
                <span className="px-1.5 py-0.5 bg-slate-800 rounded">DSC (Durgapur)</span>
                <span className="px-1.5 py-0.5 bg-slate-800 rounded">BUSC (Burnpur)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Sync Source Banner */}
        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>
              Dynamic Source of Truth:{" "}
              <a
                href="https://docs.google.com/spreadsheets/d/1lFAJpkXHc1knvtkXStG12SRLJfEUW-ax2hPNaRnZLgo/edit?gid=1788317319#gid=1788317319"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-400 hover:underline font-mono inline-flex items-center gap-1"
              >
                <span>Google Sheet 1lFAJpkX... (gid: 1788317319)</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </span>
          </div>

          {lastUpdated && (
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-400">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <span>Last Synced: {new Date(lastUpdated).toLocaleString("en-IN")}</span>
            </div>
          )}
        </div>

        {/* Legal Disclaimer & Copyright */}
        <div className="mt-6 pt-4 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500">
          <div>
            © {currentYear} Steel Authority of India Limited (SAIL). All Rights Reserved.
          </div>
          <div>
            Centre for Engineering &amp; Technology (CET) • Project Formulation &amp; Coordination
          </div>
        </div>
      </div>
    </footer>
  );
}
