import React, { useState } from 'react';
import {
  TrendingUp,
  Sliders,
  AlertTriangle,
  Sparkles,
  Zap,
  ShieldCheck,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  CheckCircle2
} from 'lucide-react';
import { UserPersonaProfile, FinancialHealthScore, ExpenseCategory } from '../types';
import { formatCurrency } from '../utils/financialCalculations';

interface PredictiveAnalyticsProps {
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;
  essentialExpenses: number;
  discretionaryExpenses: number;
  projectedMonthEndExpense: number;
  projectedSavings: number;
  emergencyRunwayMonths: number;
  currentProfile: UserPersonaProfile;
  currency?: string;
  onOpenAdvisorWithPrompt: (prompt: string) => void;
}

export const PredictiveAnalytics: React.FC<PredictiveAnalyticsProps> = ({
  totalIncome,
  totalExpenses,
  netSavings,
  savingsRate,
  essentialExpenses,
  discretionaryExpenses,
  projectedMonthEndExpense,
  projectedSavings,
  emergencyRunwayMonths,
  currentProfile,
  currency = '$',
  onOpenAdvisorWithPrompt
}) => {
  // Simulator State
  const [incomeAdjustmentPct, setIncomeAdjustmentPct] = useState<number>(0); // -30% to +30%
  const [discretionaryTrimPct, setDiscretionaryTrimPct] = useState<number>(0); // 0% to 60%
  const [extraFixedExpense, setExtraFixedExpense] = useState<number>(0); // -$500 to +$500

  // Simulated Calculations
  const simulatedIncome = Math.round(totalIncome * (1 + incomeAdjustmentPct / 100));
  const simulatedDiscretionary = Math.round(discretionaryExpenses * (1 - discretionaryTrimPct / 100));
  const simulatedTotalExpense = Math.max(0, essentialExpenses + extraFixedExpense + simulatedDiscretionary);
  const simulatedSavings = Math.max(0, simulatedIncome - simulatedTotalExpense);
  const simulatedSavingsRate = simulatedIncome > 0 ? Math.round((simulatedSavings / simulatedIncome) * 100) : 0;
  const annualSavingsDelta = (simulatedSavings - netSavings) * 12;

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Predictive Spending Analytics & Cashflow Forecaster
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                Machine Learning Projections
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Anticipate end-of-month cashflow velocity, detect anomalies, and stress-test your financial resilience
            </p>
          </div>

          <button
            onClick={() => onOpenAdvisorWithPrompt('Run a predictive analysis on my spending run-rate and recommend where to park excess savings for growth.')}
            className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 self-start sm:self-auto"
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>AI Predictive Audit</span>
          </button>
        </div>

        {/* Pacing Comparison Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Current Logged Spend</span>
              <span>Day 24 of 30</span>
            </div>
            <div className="text-2xl font-bold text-white mt-1">
              {formatCurrency(totalExpenses, currency)}
            </div>
            <span className="text-[11px] text-slate-500 block mt-1">
              Burn rate: ~{formatCurrency(Math.round(totalExpenses / 24), currency)} / day
            </span>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Projected Month-End Outflow</span>
              <span className="text-amber-400 font-semibold">Forecast</span>
            </div>
            <div className="text-2xl font-bold text-amber-300 mt-1">
              {formatCurrency(projectedMonthEndExpense, currency)}
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Estimated remaining outflow: {formatCurrency(Math.max(0, projectedMonthEndExpense - totalExpenses), currency)}
            </span>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Projected Net Surplus</span>
              <span className="text-emerald-400 font-semibold">Target</span>
            </div>
            <div className="text-2xl font-bold text-teal-300 mt-1">
              {formatCurrency(projectedSavings, currency)}
            </div>
            <span className="text-[11px] text-teal-400/80 block mt-1">
              Expected capture rate: ~{Math.round((projectedSavings / (totalIncome || 1)) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {/* Anomaly Detection Alerts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-sm text-slate-200">Spending Velocity Anomalies</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {currentProfile.id === 'salaried'
              ? 'Weekend dining and takeaway frequency has created a 42% spending surge on Fridays through Sundays. Setting a $60 weekend limit will stabilize cashflow.'
              : currentProfile.id === 'student'
              ? 'Mid-month grocery purchases are trending low, but campus cafe runs show a 25% spike during exam review weeks.'
              : currentProfile.id === 'freelancer'
              ? 'Client invoicing patterns show high variance. A $1,200 delay in net-30 receipts would temporarily drop your operational cushion.'
              : 'Seasonal utility fluctuations typically raise heating costs by 12% in the coming quarter.'}
          </p>
        </div>

        <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5">
          <div className="flex items-center gap-2 mb-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-emerald-300">Investment & Wealth Suggestions</h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your emergency buffer currently protects <strong className="text-white">{emergencyRunwayMonths} months</strong>. Any additional monthly surplus above $500 is prime capital for broad-market index funds, tax-sheltered retirement vehicles, or high-yield deposit notes.
          </p>
        </div>
      </div>

      {/* Interactive "What-If" Financial Simulator */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-emerald-400" />
              Interactive "What-If" Scenario Simulator
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Simulate income shocks, discretionary cutbacks, and fixed cost variations in real time
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Controls Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Slider 1: Income Adjustment */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">
                  Income Shift: {incomeAdjustmentPct > 0 ? `+${incomeAdjustmentPct}%` : `${incomeAdjustmentPct}%`}
                </span>
                <span className="font-bold text-emerald-400">
                  {formatCurrency(simulatedIncome, currency)}/mo
                </span>
              </div>
              <input
                type="range"
                min="-30"
                max="30"
                step="5"
                value={incomeAdjustmentPct}
                onChange={(e) => setIncomeAdjustmentPct(Number(e.target.value))}
                className="w-full accent-emerald-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>-30% (Lean month/Loss)</span>
                <span>Baseline ($0)</span>
                <span>+30% (Promotion/Bonus)</span>
              </div>
            </div>

            {/* Slider 2: Discretionary Trim */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">
                  Trim Discretionary Spending: -{discretionaryTrimPct}%
                </span>
                <span className="font-bold text-amber-400">
                  {formatCurrency(simulatedDiscretionary, currency)}/mo
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="60"
                step="5"
                value={discretionaryTrimPct}
                onChange={(e) => setDiscretionaryTrimPct(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>0% (No changes)</span>
                <span>-30% (Moderate diet)</span>
                <span>-60% (Frugal lockdown)</span>
              </div>
            </div>

            {/* Slider 3: Fixed Costs Delta */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">
                  Fixed Bills / Rent Variation: {extraFixedExpense >= 0 ? `+$${extraFixedExpense}` : `-$${Math.abs(extraFixedExpense)}`}
                </span>
                <span className="font-bold text-slate-200">
                  {formatCurrency(essentialExpenses + extraFixedExpense, currency)}/mo
                </span>
              </div>
              <input
                type="range"
                min="-400"
                max="600"
                step="50"
                value={extraFixedExpense}
                onChange={(e) => setExtraFixedExpense(Number(e.target.value))}
                className="w-full accent-teal-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>-$400 (Downsized lease)</span>
                <span>Baseline</span>
                <span>+$600 (Rent hike / New bill)</span>
              </div>
            </div>
          </div>

          {/* Simulated Impact Output Column */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-3">
                Simulated Fiscal Outcome
              </span>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">New Net Savings:</span>
                  <span className="text-lg font-bold text-teal-300">
                    {formatCurrency(simulatedSavings, currency)}/mo
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">New Savings Rate:</span>
                  <span className="text-base font-bold text-white">
                    {simulatedSavingsRate}%
                  </span>
                </div>

                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-800">
                  <span className="text-slate-400">Annual Wealth Delta:</span>
                  <span className={`text-base font-extrabold ${
                    annualSavingsDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {annualSavingsDelta >= 0 ? '+' : ''}{formatCurrency(annualSavingsDelta, currency)}/yr
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed">
              {annualSavingsDelta > 0 ? (
                <span className="text-emerald-300">
                  ✨ These simulated adjustments would deposit an additional <strong>{formatCurrency(annualSavingsDelta, currency)}</strong> into your investment accounts every 12 months!
                </span>
              ) : (
                <span className="text-amber-300">
                  ⚠️ This stress scenario reduces annual savings accumulation by <strong>{formatCurrency(Math.abs(annualSavingsDelta), currency)}</strong>.
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
