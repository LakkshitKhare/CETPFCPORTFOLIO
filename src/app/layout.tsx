import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Formulation & Coordination Department | SAIL • CET Ranchi",
  description:
    "Official institutional portal of Project Formulation & Coordination (PF&C) Department, Centre for Engineering & Technology (CET), Steel Authority of India Limited (SAIL). Live project portfolio monitoring, capex appraisal lifecycle, and departmental hierarchy.",
  icons: {
    icon: "/images/logo.png",
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
  keywords: [
    "SAIL",
    "CET Ranchi",
    "Centre for Engineering & Technology",
    "Steel Authority of India Limited",
    "Project Formulation and Coordination",
    "Live Project Portfolio",
    "Stage 1",
    "Stage 2",
    "Under Consideration",
    "Under Formulation",
    "Feasibility Report",
    "Tender Specification",
    "Bhilai Steel Plant",
    "Rourkela Steel Plant",
    "Bokaro Steel Plant",
    "Durgapur Steel Plant",
    "IISCO Steel Plant",
  ],
  authors: [{ name: "CET SAIL, Ranchi" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07162C",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-slate-100 text-slate-900 antialiased min-h-screen flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
