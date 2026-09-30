"use client";

import React, { useState } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Building2,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Copy,
  Check,
  User,
} from "lucide-react";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    designation: "",
    plantUnit: "Bhilai Steel Plant (BSP)",
    email: "",
    phone: "",
    assignmentNumber: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  const headOfDept = {
    name: "Head of Department (PFC)",
    designation: "Chief General Manager (CGM) - Projects (PFC, CTE & Contracts)",
    department: "Project Formulation & Coordination Department",
    organization: "Centre for Engineering & Technology (CET), SAIL Ranchi",
    phonePrimary: "0651-2411183",
    phoneSecondary: "0651-2411165",
    email: "pfc.cet@sail.in",
    alternateEmail: "edcetsail@sail.in",
    address:
      "4th Floor, RDCIS Lab Building, Ispat Bhawan, Shyamali Colony, Doranda, Ranchi – 834002, Jharkhand, India",
    workingHours: "10:00 – 18:00 Hrs. (Monday to Friday, 1st/3rd Saturdays)",
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(headOfDept.address);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 className="w-4 h-4 text-blue-700" />
            Official Communications
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0B2545] tracking-tight">
            Contact Head of Department
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 leading-relaxed">
            Direct institutional channels for project requisitions, formulation coordination,
            techno-commercial queries, and milestone appraisal with CET Ranchi and sub-centres.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Official Head of Department Executive Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#0B2545] text-white rounded-2xl p-6 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 mb-4">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                Head of Department (PFC)
              </div>

              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-blue-800 border-2 border-white/40 flex items-center justify-center font-bold text-2xl text-white shadow-inner">
                  <User className="w-8 h-8 text-sky-200" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">R. K. Sokey</h3>
                  <div className="text-xs font-semibold text-sky-300">
                    General Manager
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    {headOfDept.department}
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed border-t border-slate-800 pt-4">
                Responsible for corporate project formulation, techno-economic feasibility approval,
                inter-plant engineering coordination, and capex milestone monitoring.
              </p>

              {/* Direct Actions: Call & Email */}
              <div className="mt-6 space-y-3">
                {/* Phone Call Action */}

                {/* Email Action */}
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/80 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-900/60 text-sky-300">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                        Official Enterprise Email
                      </span>
                      <span className="text-xs font-bold text-white font-mono">
                        rk.sokey@sail.in
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:${headOfDept.email}?subject=Project Formulation & Coordination Query`}
                    className="px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
                  >
                    Send Email
                  </a>
                </div>

                {/* Office Address */}
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-700/80">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-900/60 text-sky-300 shrink-0 mt-0.5">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 font-semibold uppercase block">
                          Department Head Office Address
                        </span>
                        <p className="text-xs text-slate-200 mt-1 leading-snug">
                          {headOfDept.address}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={handleCopyAddress}
                      className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
                      title="Copy Address"
                    >
                      {copiedAddress ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Office Timings */}
                <div className="flex items-center gap-2 text-xs text-slate-400 px-1 pt-1">
                  <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <span>{headOfDept.workingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inter-Departmental Requisition / Query Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-md">
              <div className="border-b border-slate-200 pb-4 mb-6">
                <h3 className="text-lg font-bold text-slate-900">
                  Inter-Departmental Requisition &amp; Communication Form
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Submit formal communication regarding project formulation status, TS scope
                  clarifications, or assignment scheduling to the PFC Department.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 text-center bg-emerald-50 border border-emerald-200 rounded-xl space-y-3 animate-in fade-in">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="text-base font-bold text-emerald-950">
                    Requisition Transmitted Successfully
                  </h4>
                  <p className="text-xs text-emerald-800 max-w-md mx-auto">
                    Your communication has been registered with the Project Formulation &amp;
                    Coordination Department (CET Ranchi). An acknowledgment reference has been
                    generated for tracking.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({
                        name: "",
                        designation: "",
                        plantUnit: "Bhilai Steel Plant (BSP)",
                        email: "",
                        phone: "",
                        assignmentNumber: "",
                        subject: "",
                        message: "",
                      });
                    }}
                    className="mt-3 px-4 py-1.5 bg-[#0B2545] text-white rounded-lg text-xs font-bold hover:bg-[#133E87] transition-colors cursor-pointer"
                  >
                    Submit Another Query
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name &amp; Staff No. *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        placeholder="e.g. Officer Name / Staff No."
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Designation / Department *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.designation}
                        onChange={(e) =>
                          setFormState({ ...formState, designation: e.target.value })
                        }
                        placeholder="e.g. DGM (Projects / Capex)"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Plant / Mining Unit *
                      </label>
                      <select
                        value={formState.plantUnit}
                        onChange={(e) =>
                          setFormState({ ...formState, plantUnit: e.target.value })
                        }
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      >
                        <option value="Bhilai Steel Plant (BSP)">Bhilai Steel Plant (BSP)</option>
                        <option value="Rourkela Steel Plant (RSP)">Rourkela Steel Plant (RSP)</option>
                        <option value="Bokaro Steel Plant (BSL)">Bokaro Steel Plant (BSL)</option>
                        <option value="Durgapur Steel Plant (DSP)">Durgapur Steel Plant (DSP)</option>
                        <option value="IISCO Steel Plant (ISP)">IISCO Steel Plant (ISP)</option>
                        <option value="Captive Mines / CMLO">Captive Mines / CMLO</option>
                        <option value="Alloy Steels Plant (ASP)">Alloy Steels Plant (ASP)</option>
                        <option value="SAIL Corporate Office">SAIL Corporate Office</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Official Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        placeholder="name@sail.in"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Contact Number / Ext.
                      </label>
                      <input
                        type="text"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        placeholder="0651-XXXXXX / Mobile"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Assignment # (if existing)
                      </label>
                      <input
                        type="text"
                        value={formState.assignmentNumber}
                        onChange={(e) =>
                          setFormState({ ...formState, assignmentNumber: e.target.value })
                        }
                        placeholder="e.g. 5090"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Subject / Scheme Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formState.subject}
                        onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                        placeholder="e.g. Query regarding FR Submission Target for Secondary Screening"
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Detailed Technical Scope / Inquiries *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      placeholder="Specify your technical requirement, milestone inquiry, or formulation request details..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-500">
                      * All communications recorded as per SAIL ISO 9001:2015 documentation procedure.
                    </span>

                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#0B2545] hover:bg-[#133E87] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Message</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
