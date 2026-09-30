import React from 'react';
import { X, Layers, Database, Bot, Server, Shield, CheckCircle2, Cpu } from 'lucide-react';

interface ArchitectureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ArchitectureModal: React.FC<ArchitectureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">
              System Architecture & Full-Stack Engine
            </h2>
            <p className="text-xs text-slate-400">
              Technical overview of the Personal Finance Advisor Bot platform
            </p>
          </div>
        </div>

        <div className="space-y-6 mt-6 text-xs sm:text-sm">
          {/* Architecture Diagram Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 1. Frontend Web Layer */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                <Cpu className="w-4 h-4" />
                <span>Client Web Interface</span>
              </div>
              <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                React 19 + TypeScript SPA styled with Tailwind CSS, animated with Motion and visual charting engines.
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1">
                <li>• 4 Persona Scenarios & Custom</li>
                <li>• Real-time Ledger & Filtering</li>
                <li>• Interactive Cashflow Simulator</li>
                <li>• Printable Monthly Statements</li>
              </ul>
            </div>

            {/* 2. Backend API Layer */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-teal-400 font-bold mb-2">
                <Server className="w-4 h-4" />
                <span>Backend Services (REST)</span>
              </div>
              <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                Scalable full-stack architecture running Node.js / Express proxy and Flask microservices.
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1">
                <li>• <code>/api/gemini/advisor</code></li>
                <li>• <code>/api/gemini/budget-plan</code></li>
                <li>• <code>/api/gemini/monthly-report</code></li>
                <li>• <code>/api/gemini/predictive-insights</code></li>
              </ul>
            </div>

            {/* 3. AI & Data Layer */}
            <div className="bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2 text-indigo-400 font-bold mb-2">
                <Bot className="w-4 h-4" />
                <span>AI Financial Engine</span>
              </div>
              <p className="text-xs text-slate-300 mb-2 leading-relaxed">
                Google GenAI SDK (gemini-3.8-flash) executing structured JSON schemas and financial heuristics.
              </p>
              <ul className="text-[11px] text-slate-400 space-y-1">
                <li>• 50/30/20 & Envelope Rules</li>
                <li>• Velocity Anomaly Detector</li>
                <li>• Dynamic Health Scoring (0-100)</li>
                <li>• Emergency Runway Calculator</li>
              </ul>
            </div>
          </div>

          {/* SQLAlchemy Schema Design */}
          <div className="bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2 text-white font-bold mb-3">
              <Database className="w-4 h-4 text-emerald-400" />
              <span>SQLAlchemy Relational Schema Entities</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 font-mono text-[11px] text-slate-300">
                <strong className="text-emerald-400 block mb-1">User & Transaction Models</strong>
                <div>• UserProfile (id, persona_type, base_income, currency)</div>
                <div>• Transaction (id, type, amount, category, is_essential, date, payment_method)</div>
              </div>

              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800/80 font-mono text-[11px] text-slate-300">
                <strong className="text-teal-400 block mb-1">Budget & Milestones Models</strong>
                <div>• CategoryBudget (id, category, allocated_amount, spent_amount, ai_cap)</div>
                <div>• SavingsGoal (id, title, target_amount, current_amount, priority, due_date)</div>
              </div>
            </div>
          </div>

          {/* Security & Design Principles */}
          <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-xs text-emerald-300 flex items-start gap-2.5">
            <Shield className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold text-emerald-200 block mb-1">
                Zero Client Key Exposure & Data Sovereignty
              </strong>
              <span>
                All AI model invocations and financial evaluations are executed strictly through server-side proxy routes. The client interface never accesses private environment credentials.
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl text-xs sm:text-sm border border-slate-700 transition-colors"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
};
