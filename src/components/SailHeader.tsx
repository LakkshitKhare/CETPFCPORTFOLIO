"use client";

import React, { useState, useEffect } from "react";
import { SailLogo } from "./SailEmblem";
import {
  Menu,
  X,
  RefreshCw,
  FolderKanban,
  Building2,
  GitBranch,
  Users,
  PhoneCall,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

interface SailHeaderProps {
  lastUpdated?: string;
  totalProjects?: number;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function SailHeader({
  lastUpdated,
  totalProjects = 0,
  onRefresh,
  isRefreshing = false,
}: SailHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formattedTime = lastUpdated
    ? new Date(lastUpdated).toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
    : null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-200">
      {/* Top Institutional Banner */}
      <div className="bg-[#07162C] text-slate-200 text-xs border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 font-medium tracking-wide text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Steel Authority of India Limited (SAIL) • Maharatna CPSE
            </span>
            <span className="hidden sm:inline-block text-slate-500">|</span>
            <span className="hidden sm:inline-block text-slate-400">
              ISO 9001:2015 Certified Unit
            </span>
          </div>

          <div className="flex items-center gap-4">
            {formattedTime && (
              <span className="hidden md:inline-flex items-center gap-1.5 text-slate-400 font-mono text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Live Sheet Sync: {formattedTime}
              </span>
            )}

            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                title="Fetch latest data from Google Sheets"
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-medium transition-colors disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin text-sky-400" : ""}`} />
                <span>{isRefreshing ? "Syncing..." : "Sync Sheet"}</span>
              </button>
            )}

            <a
              href="https://docs.google.com/spreadsheets/d/1lFAJpkXHc1knvtkXStG12SRLJfEUW-ax2hPNaRnZLgo/edit?gid=1788317319#gid=1788317319"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-[11px] text-sky-300 hover:text-sky-200 underline decoration-sky-500/50 underline-offset-2"
            >
              <span>Source Sheet</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Department Header */}
      <div className={`transition-all duration-200 ${isScrolled ? "py-2.5" : "py-3.5"} border-b border-slate-200 bg-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Department Title */}
          <a href="#home" className="flex items-center gap-3.5 group">
            <SailLogo className="w-11 h-11 shrink-0 group-hover:scale-105 transition-transform" />
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-tight text-[#0B2545] uppercase">
                  SAIL • CET
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-800 uppercase tracking-wider">
                  Ranchi HQ
                </span>
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-700 leading-tight">
                Project Formulation & Coordination Department
              </span>
              <span className="hidden md:inline-block text-[11px] text-slate-500 font-medium">
                Centre for Engineering & Technology • Steel Authority of India Ltd.
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            <a
              href="#home"
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-100 transition-colors"
            >
              Home
            </a>
            <a
              href="#about"
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-100 transition-colors"
            >
              About Department
            </a>
            <a
              href="#lifecycle"
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-100 transition-colors"
            >
              Formulation & Coordination
            </a>
            <a
              href="#organization"
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-100 transition-colors"
            >
              Organization Structure
            </a>
            <a
              href="#contact"
              className="px-3 py-1.5 rounded-md text-xs font-semibold text-slate-700 hover:text-blue-900 hover:bg-slate-100 transition-colors"
            >
              Contact Us
            </a>

            {/* Prominent Project Portfolio Nav Link */}
            <a
              href="#portfolio"
              className="ml-2 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] shadow-sm hover:shadow transition-all"
            >
              <FolderKanban className="w-4 h-4 text-sky-400" />
              <span>Project Portfolio</span>
              {totalProjects > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-blue-600 text-[10px] font-mono font-bold text-white">
                  {totalProjects}
                </span>
              )}
            </a>
          </nav>

          {/* Compact links for medium screens */}
          <div className="hidden lg:flex xl:hidden items-center gap-2">
            <a
              href="#about"
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-blue-900"
            >
              About
            </a>
            <a
              href="#lifecycle"
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-blue-900"
            >
              Workflow
            </a>
            <a
              href="#organization"
              className="px-2.5 py-1 text-xs font-semibold text-slate-700 hover:text-blue-900"
            >
              Structure
            </a>
            <a
              href="#portfolio"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87]"
            >
              <FolderKanban className="w-3.5 h-3.5 text-sky-400" />
              <span>Portfolio ({totalProjects})</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href="#portfolio"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded bg-[#0B2545] text-white text-xs font-bold"
            >
              <FolderKanban className="w-3.5 h-3.5 text-sky-400" />
              <span>Portfolio ({totalProjects})</span>
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:bg-slate-100 hover:text-slate-900 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-5 space-y-1 shadow-lg animate-in slide-in-from-top-2 duration-150">
          <a
            href="#home"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <Building2 className="w-4 h-4 text-blue-700" />
            Home
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <Building2 className="w-4 h-4 text-blue-700" />
            About Department
          </a>
          <a
            href="#lifecycle"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <GitBranch className="w-4 h-4 text-blue-700" />
            Project Formulation & Coordination
          </a>
          <a
            href="#organization"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <Users className="w-4 h-4 text-blue-700" />
            Organization Structure
          </a>
          <a
            href="#portfolio"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-bold bg-blue-50 text-blue-900 border border-blue-200"
          >
            <div className="flex items-center gap-3">
              <FolderKanban className="w-4 h-4 text-blue-700" />
              <span>Live Project Portfolio</span>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-blue-600 text-xs font-mono font-bold text-white">
              {totalProjects}
            </span>
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-semibold text-slate-800 hover:bg-slate-100"
          >
            <PhoneCall className="w-4 h-4 text-blue-700" />
            Contact Us
          </a>

          {lastUpdated && (
            <div className="pt-2 text-xs text-slate-500 font-mono px-3">
              Last Synced: {new Date(lastUpdated).toLocaleString("en-IN")}
            </div>
          )}
        </div>
      )}
    </header>
  );
}
