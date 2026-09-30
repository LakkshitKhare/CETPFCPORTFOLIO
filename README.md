# SAIL CET — Project Formulation & Coordination Portal

> **Project Portfolio & Department Information Portal for the Project Formulation & Coordination (PF&C) Department, Centre for Engineering & Technology (CET), Steel Authority of India Limited (SAIL), Ranchi.**

🌐 **Live Website:** https://cetpfcportfolio.vercel.app/

---

## 📌 Overview

The **SAIL CET Project Formulation & Coordination Portal** is a modern web-based platform designed to provide a centralized view of the Project Formulation & Coordination Department's project portfolio, departmental responsibilities, organizational structure, project lifecycle, and official communication channels.

The portal provides a **live project portfolio dashboard** that synchronizes project information from a central **Google Sheet master registry**, allowing authorized project data updates to be reflected on the website without manually modifying the frontend.

The system is designed around SAIL CET's four operational project stages:

```text
Under Formulation
        ↓
Under Consideration
        ↓
Stage 1
        ↓
Stage 2
        ↓
Commissioning & Handover
```

---

## ✨ Key Features

### 📊 Live Project Portfolio

The website provides a centralized project register containing project assignments managed by the PF&C Department.

Users can:

* View the complete project portfolio
* Search projects by assignment number or description
* Filter projects by project stage
* Filter projects by plant
* Filter projects by lead engineer / TFL
* View project-related information and cost details
* Refresh the portfolio to retrieve the latest data

Project information is dynamically synchronized from the department's master Google Sheet.

---

### 📈 Project Status Dashboard

The homepage provides a visual overview of the project portfolio across four major stages:

| Stage                   | Description                                                   |
| ----------------------- | ------------------------------------------------------------- |
| **Under Formulation**   | Scope finalization, FR/DPR preparation and technical review   |
| **Under Consideration** | Feasibility / technical specification submitted for appraisal |
| **Stage 1**             | In-principle approval and tendering                           |
| **Stage 2**             | Final sanction and active project execution                   |

The dashboard provides:

* Total project count
* Projects by stage
* Total project outlay
* Stage-wise cost distribution
* Percentage distribution
* Portfolio-level statistics
* Interactive project-stage filtering

---

## 🏗️ Project Lifecycle

The portal documents the complete project formulation and coordination lifecycle followed by the department.

### 01 — Under Formulation

Projects at this stage undergo initial formulation and technical development.

Activities include:

* Assignment registration
* TFL assignment
* Initial review
* Scope framing
* Technical requirement mapping
* Feasibility Report preparation
* Block cost estimation
* Technical specification preparation
* Bidder eligibility criteria
* Management review

**Decision Gate:** Acceptance for formulation and technical mandate.

---

### 02 — Under Consideration

Projects are reviewed for strategic relevance, technical viability, and plant requirements.

Activities include:

* Feasibility / Technical Specification submission
* Management appraisal
* Stage 1 approval preparation
* Pre-NIT activities
* Cost estimation and revisions
* Approval package preparation

**Decision Gate:** Approval-ready project package for the relevant sanctioning authority.

---

### 03 — Stage 1

Following in-principle approval, projects move into tendering and technical evaluation.

Activities include:

* Stage 1 sanction recording
* NIT and offer receipt
* Technical bid evaluation
* Tender discussions
* Tender Evaluation Report preparation
* TER approval

**Decision Gate:** Completion of tender evaluation and TER submission.

---

### 04 — Stage 2

Projects with final sanction proceed toward execution.

Activities include:

* Stage 2 board sanction
* Expenditure approval
* Contract award
* Contractor mobilization
* Drawing approval
* Site execution monitoring
* Design coordination
* Commissioning
* Handover and closure

**Decision Gate:** Successful testing, commissioning, and handover.

---

## 🏢 Department Information

The portal contains information about the **Project Formulation & Coordination Department** of SAIL's Centre for Engineering & Technology.

The department is responsible for areas including:

* Project formulation
* Techno-economic feasibility
* Project coordination
* Project monitoring
* Portfolio management
* Capital expenditure assignments
* Multi-disciplinary engineering coordination
* Project lifecycle management

The department coordinates with specialized engineering disciplines and SAIL plant sub-centres across the organization.

---

## 👥 Organization Structure

The portal provides an overview of the departmental hierarchy and key personnel.

It also presents the SAIL plant sub-centre coordination network:

* **BSC** — Bhilai Sub-Centre
* **BoSC** — Bokaro Sub-Centre
* **RSC** — Rourkela Sub-Centre
* **DSC** — Durgapur Sub-Centre
* **BUSC** — Burnpur Sub-Centre

Each sub-centre section contains its location, associated project areas, and official contact information.

---

## 📍 Contact & Communication

The portal provides official contact information for the Project Formulation & Coordination Department.

It also includes an **Inter-Departmental Requisition & Communication Form** for submitting project-related communication.

The form supports information such as:

* Full Name / Staff Number
* Designation / Department
* Plant / Mining Unit
* Official Email
* Contact Number / Extension
* Assignment Number
* Subject / Scheme Title
* Technical Scope / Inquiry

This provides a structured channel for project formulation queries, technical coordination, and assignment-related communication.

---

## 🔄 Live Data Architecture

One of the primary features of the portal is its live project data synchronization.

```text
                 ┌─────────────────────┐
                 │   Master Google     │
                 │       Sheet         │
                 └──────────┬──────────┘
                            │
                            │ Live Data
                            ▼
                 ┌─────────────────────┐
                 │   Data Processing   │
                 │    / API Layer      │
                 └──────────┬──────────┘
                            │
                            ▼
              ┌───────────────────────────┐
              │       Web Application     │
              │                           │
              │  Dashboard                │
              │  Portfolio                │
              │  Filters                  │
              │  Cost Analytics           │
              └─────────────┬─────────────┘
                            │
                            ▼
                 ┌─────────────────────┐
                 │     End Users       │
                 │  Department / CET   │
                 └─────────────────────┘
```

The Google Sheet acts as the central source of project records, while the website dynamically renders the information for users.

This approach allows project information to be maintained centrally without requiring changes to the website's source code whenever project records are updated.

---

## 💰 Project Cost Tracking

The portfolio dashboard supports stage-based project cost tracking.

Project costs can be associated with the project's current stage, allowing the dashboard to calculate:

* Stage-wise total outlay
* Overall portfolio outlay
* Project-level cost
* Cost distribution across project stages

This enables users to obtain a high-level view of the department's active capital project portfolio.

---

## 🔎 Portfolio Filtering

The project portfolio provides multiple ways to locate specific assignments.

### Search

Users can search using information such as:

* Assignment number
* Project description
* TFL
* Section

### Filters

Projects can also be filtered according to:

* Project stage
* Plant
* Lead engineer / TFL

This makes it easier to navigate a large project registry.

---

## 🧭 Website Sections

The portal is organized into the following primary sections:

```text
Home
│
├── About Department
│
├── Formulation & Coordination
│
├── Organization Structure
│
├── Project Portfolio
│
└── Contact Us
```

### Home

Provides:

* Department overview
* Portfolio statistics
* Project stage distribution
* Cost analytics
* Project lifecycle overview
* Quick navigation

### About Department

Provides information about the department's:

* Mission
* Purpose
* Responsibilities
* Engineering role
* Portfolio management function

### Formulation & Coordination

Explains the four-stage project lifecycle and activities performed at each stage.

### Organization Structure

Displays the departmental hierarchy and plant sub-centre network.

### Project Portfolio

Provides the live project register with search, filtering, and project information.

### Contact Us

Provides official departmental contact information and a structured communication form.

---

## 🛠️ Technology

The project is implemented as a modern web application and deployed on **Vercel**.

### Frontend

* React
* JavaScript / JSX
* HTML5
* CSS
* Responsive UI

### Data

* Google Sheets
* Live project registry
* Dynamic data synchronization

### Visualization

* Interactive project statistics
* Stage-wise portfolio analytics
* Cost distribution visualization
* Dynamic filtering

### Deployment

* Vercel

---

## 📂 Suggested Project Structure

```text
project/
│
├── public/
│   ├── images/
│   └── assets/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── data/
│   ├── styles/
│   └── App.*
│
├── package.json
├── README.md
└── ...
```

> The exact structure may vary depending on the implementation and build configuration.

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-directory>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will normally be available at:

```text
http://localhost:5173
```

### 4. Build for Production

```bash
npm run build
```

### 5. Preview the Production Build

```bash
npm run preview
```

---

## ⚙️ Data Configuration

The application uses a centralized Google Sheet as the project master registry.

When configuring the application, ensure the required Google Sheet / API configuration is correctly supplied through the project's environment variables or data service configuration.

Example:

```env
VITE_GOOGLE_SHEET_ID=your_sheet_id
VITE_GOOGLE_SHEET_GID=your_sheet_gid
```

> Keep credentials, API keys, service-account information, and other sensitive configuration outside the source code.

---

## 🌐 Deployment

The application is deployed using **Vercel**.

A typical deployment workflow is:

```text
GitHub Repository
        │
        ▼
     Vercel
        │
        ▼
 Production Build
        │
        ▼
 Live Website
```

Live deployment:

**https://cetpfcportfolio.vercel.app/**

---

## 🔐 Data & Security Considerations

Because the application presents departmental project information, the following practices are recommended:

* Do not expose private credentials in frontend code.
* Store API credentials using environment variables.
* Restrict access to the underlying master data where appropriate.
* Validate data received from external sources.
* Avoid exposing sensitive internal project information publicly.
* Use HTTPS for production deployment.
* Apply appropriate access controls if the portal is later converted into an authenticated internal system.

---

## 📊 Data Flow

```text
Google Sheet
     │
     ▼
Project Records
     │
     ├───────────────┐
     │               │
     ▼               ▼
Stage Processing   Cost Processing
     │               │
     └───────┬───────┘
             ▼
       Portfolio Data
             │
      ┌──────┴──────┐
      ▼             ▼
 Dashboard      Portfolio
      │             │
      ▼             ▼
 Analytics      Search/Filter
```

---

## 🎯 Project Objectives

The portal is designed to:

1. Centralize project portfolio information.
2. Provide a single source of truth for project records.
3. Improve visibility into project stages.
4. Display project cost and outlay information.
5. Simplify project discovery through search and filters.
6. Provide an overview of the PF&C department.
7. Document the project formulation lifecycle.
8. Present departmental organization and plant sub-centres.
9. Provide structured communication channels.
10. Reduce dependency on manually maintained static webpages.

---

## 🔮 Future Enhancements

Potential future improvements include:

* 🔐 Role-based authentication
* 👤 Admin dashboard
* ✏️ Controlled project editing
* 📥 Excel / CSV upload and synchronization
* 📤 Project report export
* 📄 PDF project reports
* 📊 Advanced analytics
* 📅 Project milestone tracking
* 🔔 Automated milestone notifications
* 📈 Historical project trend analysis
* 🗂️ Advanced project categorization
* 🔍 More advanced portfolio search
* 📝 Audit logs for data changes
* 📱 Enhanced mobile experience

---

## 👨‍💻 Development

This project was developed as a dedicated digital portal for the **Project Formulation & Coordination Department, Centre for Engineering & Technology (CET), SAIL Ranchi**.

The system combines departmental information with a dynamic project portfolio interface to make project status, lifecycle progression, and portfolio-level information easier to access.

---

## 📜 Disclaimer

This portal is an informational and project-management interface for the Project Formulation & Coordination Department.

Project information displayed on the website is dependent on the underlying project data source and its update status.

For official decisions, records, approvals, or communications, users should refer to the appropriate official SAIL systems, documents, and authorized departmental channels.

---

## 🏢 Organization

**Steel Authority of India Limited (SAIL)**
**Centre for Engineering & Technology (CET)**
**Project Formulation & Coordination Department**
Ranchi, Jharkhand, India

---

## 🔗 Links

* 🌐 **Live Portal:** https://cetpfcportfolio.vercel.app/
* 🏢 **SAIL:** https://www.sail.co.in/

---

## © Copyright

© 2026 Steel Authority of India Limited (SAIL). All Rights Reserved.

**Centre for Engineering & Technology (CET) — Project Formulation & Coordination**
