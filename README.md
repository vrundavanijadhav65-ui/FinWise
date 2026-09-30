# FinWise — Personal Finance Advisor Bot 💰🤖

> **An AI-powered financial planning assistant designed to help individuals take control of their personal finances with clarity, confidence, and intelligent automation.**

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6.svg)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC.svg)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-4.21-lightgrey.svg)](https://expressjs.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini_API-3.8_Flash-8E75C2.svg)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 🌟 Overview

The **Personal Finance Advisor Bot** is a modern, responsive full-stack financial planning web platform. It centralizes monthly income recording, daily and weekly expense categorization, automated budget plan generation, goal-based savings tracking, predictive spending velocity analytics, and structured monthly reporting into an intuitive digital workspace.

Powered by Google's **Gemini 3.8 Flash** engine through server-side REST API proxy routes, the assistant provides real-time financial health audits, overspending detection, and scenario-specific guidance tailored to individual life situations.

---

## 👥 Supported Financial Personas & Scenarios

The platform includes 4 pre-loaded real-world financial profiles and a custom workspace:

| Persona | Baseline Income | Profile Focus & Strategy | Key Challenge |
| :--- | :--- | :--- | :--- |
| **👨‍💼 Scenario 1: Salaried Professional** | $5,800/mo | **50/30/20 Smart Rule** with automated transfers to high-yield savings on payday. | Discretionary weekend dining & delivery creep. |
| **🎓 Scenario 2: College Student** | $1,100/mo | **Envelope Micro-Budgeting** ($5/day cap, meal planning, textbook hacks). | Constrained allowance & start-of-semester spikes. |
| **💻 Scenario 3: Freelance Professional** | $4,950/mo | **Baseline Paycheck Method** + 30% Tax Vault + 6-month buffer. | Irregular client invoicing & self-employment tax. |
| **🏡 Scenario 4: Household Manager** | $8,600/mo | **Family Master Ledger** with category caps on groceries & childcare. | Coordinated family spending & seasonal utility hikes. |
| **✨ Custom Persona** | Flexible | **Tailored Hybrid Allocation** with active AI budget auditing. | Personal financial goals & customized tracking. |

---

## 🚀 Key Modules & Capabilities

### 1. 📊 Interactive Dashboard & Financial Health Audit
- **Dynamic Health Score (0–100)**: Evaluates savings rate, essential vs. discretionary ratio, emergency runway, and overspending penalties with grades (A+, A, B, C, D).
- **50/30/20 Rule Alignment**: Visual benchmarks for Needs (50%), Wants (30%), and Savings (20%).
- **Categorical Spending Breakdown**: Donut and bar charts tracking distribution across living cost centers.
- **Overspending Alert Banner**: Instant warnings when categories exceed allocated thresholds with 1-click AI resolution.

### 2. 📝 Income & Daily Expense Ledger
- **Multi-Filter Engine**: Filter by transaction type (Income vs. Expense), nature (Essential Needs vs. Discretionary Wants), categories, and keywords.
- **Transaction Logger**: Record date, amount, description, essential/discretionary tag, payment method, and recurring status.
- **Data Export**: Export your complete financial ledger to `.csv` anytime.

### 3. 🤖 AI Advisor Bot (Conversational Co-Pilot)
- Context-aware financial advisory chatbot powered by `gemini-3.8-flash`.
- Ingests real-time financial context (current income, total expenses, overspent areas, emergency runway).
- Preset prompt shortcuts:
  - *"Analyze my overspending areas and suggest 3 cuts"*
  - *"Build my next month 50/30/20 budget plan"*
  - *"Freelancer irregular income buffer strategy"*
  - *"College student meal prep and textbook hacks"*

### 4. 🎯 Automated AI Budget Planner
- Generates recommended spending caps per category based on persona constraints and historical outflows.
- Visual progress bars: Green (<80%), Amber (80–100%), Red (>100% OVER BUDGET).
- Per-category AI reasoning notes and 1-click adoption of suggested limits.

### 5. 💰 Goal-Based Savings Tracker
- Tracks multi-tier milestones: Emergency Fund, Education, Vacation, Down Payment, and Big Purchases.
- Real-time monthly contribution pace calculator and target date countdown.
- Interactive deposit action with celebratory confetti upon milestone completion.

### 6. 📈 Predictive Spending Analytics & "What-If" Simulator
- **Month-End Cashflow Run-Rate**: Daily burn rate calculations predicting day-30 total outflows.
- **Spending Velocity Anomalies**: Detects weekday vs. weekend spikes and quarterly bill inflation.
- **Interactive Simulator**: Sliders to test income fluctuations (±30%), discretionary cutbacks (0–60%), and fixed expense shocks with live annual wealth delta calculation.

### 7. 📑 Structured Monthly Financial Report
- Generates executive statements with official report ID, AI synthesis, and income vs. expenses balance.
- Overspending audit with root-cause recommendations.
- 4 tailored actionable saving strategies.
- Next month targets (income goal, spending ceiling, and savings objective).
- **Print / PDF export** and **JSON download**.

---

## 🏗️ Architecture & Technology Stack

```
┌─────────────────────────────────────────────────────────────┐
│                 React 19 + TypeScript (SPA)                 │
│        Tailwind CSS v4 • Lucide Icons • Motion & Canvas     │
└──────────────────────────────┬──────────────────────────────┘
                               │ JSON REST API
┌──────────────────────────────▼──────────────────────────────┐
│                    Express Backend Server                   │
│         Vite Middleware Integration • Proxy Controller       │
└───────┬─────────────────────────────────────────────┬───────┘
        │                                             │
┌───────▼───────────────────────────┐   ┌─────────────▼─────────┐
│         Google GenAI SDK          │   │  Relational Entities  │
│        (gemini-3.8-flash)         │   │ (SQLAlchemy / Schema) │
│ Structured JSON • Prompts • Heur. │   │ Ledger, Goals, Budget │
└───────────────────────────────────┘   └───────────────────────┘
```

- **Frontend**: React 19, TypeScript, Tailwind CSS, Lucide React, Canvas Confetti.
- **Backend**: Node.js & Express (`server.ts`) with development Vite middleware.
- **AI Engine**: `@google/genai` TypeScript SDK utilizing the `gemini-3.8-flash` model.
- **Security**: 100% server-side API execution ensuring zero client-side exposure of API keys.

---

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ or 20+
- npm, yarn, or bun
- Google Gemini API Key ([Google AI Studio](https://aistudio.google.com/))

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vrundavanijadhav65-ui/FinWise.git
   cd FinWise
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY="your_gemini_api_key_here"
   PORT=3000
   ```
   *(Note: The app contains built-in smart rule-based fallback logic if an API key is not provided.)*

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📂 Project Structure

```
FinWise/
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── server.ts                       # Express backend server with Gemini API routes
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── App.tsx                     # Main application container & state manager
│   ├── main.tsx                    # React DOM entrypoint
│   ├── index.css                   # Global Tailwind CSS imports
│   ├── types.ts                    # TypeScript interfaces & models
│   ├── data/
│   │   └── scenarios.ts            # Persona profiles, mock ledger & budgets
│   ├── utils/
│   │   └── financialCalculations.ts# Health score math, 50/30/20 & run-rate engine
│   └── components/
│       ├── Navbar.tsx              # Header, persona picker & navigation tabs
│       ├── ScenarioBanner.tsx      # Scenario overview banner & quick switch
│       ├── DashboardOverview.tsx   # Top KPI metrics, 50/30/20 gauges & charts
│       ├── TransactionLedger.tsx   # Filterable income/expense ledger & CSV export
│       ├── AdvisorChat.tsx         # AI Advisor Bot conversational co-pilot
│       ├── BudgetPlanner.tsx       # Automated AI budget planner & variance tracking
│       ├── SavingsTracker.tsx      # Goal-based savings tracker & celebration modal
│       ├── PredictiveAnalytics.tsx # Spending velocity forecast & what-if simulator
│       ├── MonthlyReportView.tsx   # Structured monthly financial report & print view
│       ├── AddTransactionModal.tsx # Transaction creation dialog
│       └── ArchitectureModal.tsx   # System architecture & schema documentation
└── README.md
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
