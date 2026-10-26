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

## Documentation

FINWISE
AI-Assisted Personal Finance, Budget Planning and Goal-Based Savings Tracker



Prepared as a project report based on the supplied interface screenshots and public reference material.

Prepared by: Vrundavani Mohanrao Jadhav
Academic year: 2026–2027



 
Abstract
FinWise is a proposed personal-finance web application that brings together income and expense tracking, category-based budgeting, AI-assisted budget guidance, spending insights, and goal-based savings. The supplied screenshots show a dashboard with monthly cash-flow summaries, an expense ledger, editable category budgets, a budget-overrun alert, and savings-goal cards. The prototype uses a 50/30/20 budgeting framework as a reference point while allowing category budgets to be adjusted. This report documents the problem context, objectives, related public guidance, system modules, proposed workflow, screenshot-based observations, evaluation approach, limitations, and future enhancements. It is a design and documentation report rather than a completed controlled research study: no user study, production deployment, model benchmark, or financial-outcome evaluation was supplied.
Keywords: personal finance management, budgeting, expense tracking, AI financial assistant, savings goals, financial literacy, human-centred design.
Report structure
1. Introduction and problem statement · 2. Objectives and scope · 3. Background and related work · 4. System design and methodology · 5. Interface walkthrough · 6. Evaluation plan and discussion · 7. Limitations and future work · 8. Conclusion
· References
1.	Introduction
A personal budget helps a person compare money coming in with money going out, plan for recurring bills, and reserve money for short- and long-term goals. Consumer-education guidance recommends recording income and expenses, reviewing actual spending against a plan, and adjusting the next budget based on observed results [1]. In practice, this process can be difficult when transactions are spread across categories or when users have several goals competing for the same monthly surplus.
FinWise is designed to make these tasks easier to review in one interface. It presents a dashboard summary, searchable expense records, adjustable category limits, budget warnings, an AI advisor entry point, and a savings-goal tracker. The interface is intended to support awareness and planning; it should not be interpreted as a bank, credit-scoring, investment, or regulated financial-advice service.
1.1	Problem statement
Users may have difficulty noticing which categories exceed their budgets, estimating how much money remains after essential spending, or translating leftover cash into a realistic savings plan. A fragmented workflow can make it harder to understand the relationship between everyday expenses and larger goals. The project problem is to design a single, understandable interface that organizes cash-flow information and turns it into actionable, reviewable budget cues.
1.2	Aim
To design and document a prototype that consolidates monthly cash flow, category budgets, AI-assisted guidance, and savings-goal progress in a clear personal-finance dashboard.
 
2.	Objectives and Scope
2.1	Objectives
•	Record and categorize income sources and expenses, including recurring transactions.
•	Summarize monthly income, expenses, savings, and essential-versus-discretionary spending.
•	Compare actual spending with user-defined category budgets and flag potential overruns.
•	Offer an AI advisor interface for plain-language explanations and budgeting suggestions.
•	Track multiple savings goals using target amounts, current balances, progress indicators, and suggested monthly contributions.
•	Present financial information through readable cards, tables, progress bars, and alerts.
2.2	Scope
The visible prototype covers Dashboard, Income & Expenses, AI Budget Planner, and Savings Goals. Navigation also advertises Advisor Bot, Spending Insights, and Monthly Report. The screenshots show the UI and example scenario values, but do not prove that bank connections, transaction imports, authentication, data persistence, email reminders, or a production AI service are implemented. These should be described as planned or to-be-verified features unless confirmed in source code.
2.3	Intended users
Potential users include salaried professionals, students, freelancers, and households. The scenario selector suggests that the workflow can be adapted to different income patterns. A real implementation should let users override default allocations rather than assuming one rule fits every household.
3.	Background and Related Work
3.1	Budgeting and spending review
Consumer.gov describes a budget as a plan for monthly income and spending, recommends listing bills and other expenses, subtracting expenses from income, and revisiting the plan regularly [1]. The Consumer Financial Protection Bureau (CFPB) similarly recommends examining real spending records, including less frequent expenses, and comparing category totals with take-home pay [2]. These practices support FinWise’s expense ledger, category summaries, and monthly dashboard.
3.2	The 50/30/20 rule
The 50/30/20 rule is a commonly taught budgeting heuristic that allocates approximately 50% of take-home income to needs, 30% to wants, and 20% to savings and/or debt repayment. The CFPB presents this as a learning framework rather than a universal requirement [3]. FinWise uses a 50/30/20 breakdown as a comparison view. The screenshot’s example data shows $5,500 monthly income, $3,451 expenses, and $2,049 remaining; the visible split is about 46% needs, 17% wants, and 37% savings. Actuals and targets should be displayed separately.
3.3	Goal-based savings
The CFPB’s Your Money, Your Goals toolkit includes materials for setting goals, creating a savings plan, tracking income, and managing bills [4]. This supports representing goals with a target amount, current balance, remaining amount, deadline, and suggested monthly pace. The monthly pace should be explained as an estimate based on remaining balance and time to deadline.
3.4	Responsible AI design
The NIST AI Risk Management Framework recommends considering validity and reliability, safety, security, accountability, transparency, explainability, privacy, and fairness throughout the AI lifecycle [5]. For a finance assistant, these principles imply that recommendations should state assumptions, avoid presenting uncertain outputs as guarantees, protect financial data, and allow users to review or reject suggestions. AI-generated guidance should supplement—not replace—user judgement or qualified professional advice.
 
4.	Proposed System Design and Methodology
4.1	High-level architecture
The proposed application can be organized into four layers. The presentation layer contains the dashboard, transaction table, budget editor, advisor chat, insights, and savings-goal views. The application logic layer validates entries, categorizes transactions, calculates totals, compares actual spending against limits, and calculates goal progress. A data layer stores income sources, transactions, category budgets, user preferences, and savings goals. An optional AI service receives only the minimum required, appropriately protected context and returns explanations or suggestions. The exact technology stack and deployment architecture are not identifiable from the screenshots and should be filled in from project source code.

Presentation layer
Dashboard · Expense tracker · Budget planner · Advisor · Savings goals
Application logic
Validation · Aggregations · Budget variance · Savings pace · Alert rules
Data layer
Income sources · Transactions · Category limits · Goals · Preferences
Optional AI service
Context-limited prompts · Explanations · Suggestions · Safety checks
Figure 1. Conceptual architecture proposed for the FinWise prototype; this is not a verified implementation diagram.

4.2	Core modules

Module	Purpose	Key output
Dashboard	Combine monthly cash-flow and budget indicators.	Income, expenses, surplus, warnings, category adherence.
Income & Expenses	Create, search, filter, and review transactions.	Ledger, totals, classifications, dates, amounts.
AI Budget Planner	Edit limits and compare planned budgets with actual spending.	Category allocations and possible rebalance suggestions.
Advisor Bot	Explain trends and propose practical options.	Plain-language, caveated recommendations.
Savings Goals	Track progress toward specific targets and deadlines.	Balance, funded percentage, remaining amount, suggested pace.
Reports / Insights	Summarize patterns over a selected period.	Trend summaries and exportable report; implementation to verify.
4.3	Calculation logic
Monthly surplus = total income  total expenses. Savings rate = (monthly surplus ÷ total income) × 100, when income is greater than zero. Budget variance = actual category spending  planned category budget; positive variance indicates an overrun. Goal completion = (current saved amount ÷ target amount) × 100, capped at 100% for display. Suggested monthly goal contribution = remaining amount ÷ number of months until deadline, with appropriate handling for past or same-month deadlines.
4.4	Methodology
This report uses a descriptive, screenshot-based design review. The four supplied screenshots were examined to identify visible features and example values. Public consumer-finance and AI-risk guidance was reviewed to establish background principles. No source-code inspection, usability test, formal participant study, or statistical experiment was provided; accordingly, this report does not claim measured improvements in financial behaviour or AI accuracy.
 
5.	Interface Walkthrough
5.1	Dashboard

Figure 2. Dashboard screen supplied by the project author. It summarizes monthly income, expenses, savings, a health-score indicator, category adherence, and a budget-overrun alert. The example reports $5,500 income, $3,451 expenses, and $2,049 remaining. The “health score” should be defined and validated before being interpreted as a meaningful financial-health measure.
The dashboard emphasizes at-a-glance status. The warning banner highlights dining/takeout and subscriptions as over budget in the sample scenario. Alerts can help users decide where to review spending, but the system should avoid shaming language and account for unusual or one-time expenses.
 
5.2	Income and expense tracker

Figure 3. Expense ledger screen. The view includes total expenses, needs and wants totals, search, category filtering, classification filters, dates, amounts, and row-level actions. Recurring labels are visible for selected items.
A transaction ledger is the traceable source for dashboard totals. For reliability, the application should validate amount and date fields, distinguish income from expenses, prevent accidental duplicate entries where possible, and label filtered totals clearly.
 
5.3	AI personalized budget planner

Figure 4. Budget planner screen. Users can adjust monthly category budgets while seeing how much has already been spent. The screen shows category allocations and total allocated amount. A robust version should warn when allocations exceed income and explain whether unallocated income is intended for savings, debt repayment, or a buffer.
The screen supports manual control of category limits. If AI recommendations are added, each suggestion should identify the data used, explain the expected trade-off, and allow the user to accept, modify, or dismiss it. Fixed percentage rules should remain configurable because rent, family obligations, income stability, and local costs vary.
 
5.4	Goal-based savings tracker

Figure 5. Savings-goal screen. Three sample goals are displayed: a home down-payment fund, an emergency cushion, and a vacation.
Each card presents a current balance, target, funded percentage, remaining amount, suggested monthly pace, and deadline.

Goal tracking makes the monthly surplus more concrete by associating it with a target. The UI should make clear that a recommended pace is a planning estimate rather than a promise, and should let users revise deadlines and contributions when circumstances change.
 
6.	Evaluation Plan and Discussion
6.1	What the screenshots demonstrate
The screenshots demonstrate a coherent visual concept with consistent navigation and four complementary financial workflows. The dashboard aggregates cash flow, the tracker exposes transaction-level records, the planner provides editable category limits, and the goals page turns saving into visible milestones. These are design-level observations; screenshots alone cannot establish calculation correctness, accessibility, security, persistence, or the quality of AI-generated responses.
6.2	Suggested functional test cases

Test	Input / action	Expected result
Cash-flow total	Add an expense of 100 to a month.	Expense total rises by 100 and surplus falls by 100.
Budget overrun	Set category budget to 350; record spending of 415.	Variance is +65 and an over-budget indicator appears.
Savings rate	Income 5,500; expenses 3,451.	Surplus is 2,049; savings rate is about 37.3%.
Goal progress	Saved 2,600 toward a 4,000 target.	Progress is 65%; remaining amount is 1,400.
Input validation	Submit missing dates, negative values, or zero target.	Invalid data is rejected or handled with clear guidance.
Privacy boundary	Ask advisor to explain a budget using sample data.	Only necessary context is sent; response states assumptions and uncertainty.
6.3	Evaluation metrics
Recommended metrics include calculation accuracy against hand-checked examples; completeness of transaction records; task completion rate for adding an expense or savings goal; time required to locate an over-budget category; accessibility checks for keyboard navigation and contrast; and user-rated clarity of AI explanations. AI outputs should be reviewed for factual consistency, unsupported claims, unsafe certainty, and disclosure of assumptions. These are recommendations for future validation, not completed results.
6.4	Discussion
The key design strength is the connection between daily transactions, category-level planning, and long-term savings. The principal risk is overconfidence: a polished dashboard can make unvalidated scores or AI suggestions look authoritative. FinWise should separate observed values, calculated indicators, and generated recommendations. It should also support irregular income, debt payments, emergency costs, and categories that do not fit a simplified needs/wants model.
7.	Limitations and Future Work
Limitations
•	The report is based on screenshots rather than source code or a deployed system.
•	Displayed names, amounts, goals, and dates appear to be example scenario data and are not independently verified.
•	The calculation behind the “health score” is not shown and must not be treated as validated.
•	No formal user study, benchmark, security audit, or longitudinal financial-outcome evaluation was provided.
•	The 50/30/20 rule is a heuristic and may not suit every user or cost-of-living context.
Future enhancements
•	Implement secure authentication, access controls, encryption, backups, and clear data-retention/deletion controls.
•	Add import/export and optional bank integrations only with explicit user consent and secure handling.
•	Show transaction provenance and explain every calculated metric; provide correction workflows.
•	Make categories, budgeting methods, currency, pay cycle, and irregular-income assumptions configurable.   

8.	Conclusion
FinWise proposes a unified interface for understanding cash flow, monitoring category budgets, receiving AI-assisted budgeting guidance, and progressing toward savings goals. The supplied screens communicate these workflows through summary cards, a transaction ledger, editable budgets, overrun warnings, and goal-progress indicators. Public guidance on budgeting and savings supports the emphasis on recording expenses, comparing actual spending with a plan, and setting explicit goals. To become a trustworthy working product, the prototype needs verified calculations, transparent metric definitions, secure data handling, clearly caveated AI outputs, and evaluation with real tasks and users. This document is project documentation and a foundation for further implementation and testing.
References
[1]	Consumer.gov. “Making a Budget.” U.S. Federal Trade Commission. https://consumer.gov/your-money/making-budget (accessed 26 October 2026).
[2]	Consumer Financial Protection Bureau. “Assess your spending.”
https://www.consumerfinance.gov/owning-a-home/prepare/assess-your-spending/ (accessed 26 October 2026).
[3]	Consumer Financial Protection Bureau. “Learning about budgets.” Updated 16 June 2022. https://www.consumerfinance.gov/consumer-tools/educator-tool/youth-financial-education/teach/activities/learning-about-budgets/ (accessed 26 October 2026).
[4]	Consumer Financial Protection Bureau. “Your Money, Your Goals toolkit.”
https://www.consumerfinance.gov/consumer-tools/educator-tool/your-money-your-goals/toolkit/ (accessed 26 October 2026).
[5]	Tabassi, E. (2023). Artificial Intelligence Risk Management Framework (AI RMF 1.0). National Institute of Standards and Technology, NIST AI 100-1. https://doi.org/10.6028/NIST.AI.100-1 (accessed 26 October 2026).
Appendix A. Screenshot provenance
Figures 2–5 are reproductions of the four interface screenshots supplied by the project author in this conversation. They are included for documentation purposes and are not third-party research figures. Figure 1 is a conceptual architecture diagram authored for this report.
Appendix B. Suggested citation
FinWise: AI-Assisted Personal Finance, Budget Planning and Goal-Based Savings Tracker. Project documentation / research-style report, October 2026.
 


