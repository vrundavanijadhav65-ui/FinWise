import React, { useState } from 'react';
import {
  FileText,
  Sparkles,
  Download,
  Printer,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Target,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import {
  MonthlyFinancialReport,
  UserPersonaProfile,
  FinancialHealthScore,
  ExpenseCategory,
  CategoryBudget
} from '../types';
import { formatCurrency, generateLocalReport } from '../utils/financialCalculations';

interface MonthlyReportViewProps {
  currentProfile: UserPersonaProfile;
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;
  healthScore: FinancialHealthScore;
  categoryBreakdown: { category: ExpenseCategory; amount: number; percentage: number; isEssential: boolean }[];
  overspentCategories: { category: ExpenseCategory; budget: number; actual: number; variance: number; percentage: number }[];
  emergencyRunwayMonths: number;
  budgets: CategoryBudget[];
  currency?: string;
  onOpenAdvisorWithPrompt: (prompt: string) => void;
}

export const MonthlyReportView: React.FC<MonthlyReportViewProps> = ({
  currentProfile,
  totalIncome,
  totalExpenses,
  netSavings,
  savingsRate,
  healthScore,
  categoryBreakdown,
  overspentCategories,
  emergencyRunwayMonths,
  budgets,
  currency = '$',
  onOpenAdvisorWithPrompt
}) => {
  const [selectedMonth, setSelectedMonth] = useState('September 2026');
  const [isGenerating, setIsGenerating] = useState(false);

  // Initial generated report
  const [report, setReport] = useState<any>(() => {
    return {
      reportTitle: `Monthly Financial Summary & Budget Report - September 2026`,
      personaName: currentProfile.name,
      totalIncome,
      totalExpenses,
      netSavings,
      savingsRate,
      healthGrade: healthScore.grade,
      aiExecutiveSummary: `During September 2026, total cash inflow was recorded at ${formatCurrency(totalIncome, currency)} against ${formatCurrency(totalExpenses, currency)} in essential and discretionary disbursements. Net positive cashflow stands at ${formatCurrency(netSavings, currency)}, delivering a ${savingsRate}% savings capture rate. Overall financial posture is rated ${healthScore.grade}. ${overspentCategories.length > 0 ? `Attention is advised regarding budget overruns in ${overspentCategories.map(o => o.category).join(', ')}.` : 'Fiscal discipline remained consistent across all primary cost centers.'}`,
      overspendingAudit: overspentCategories.map((o) => ({
        category: o.category,
        varianceAmount: o.variance,
        recommendation: `Enforce a strict weekly ceiling and monitor impulse purchases in ${o.category}.`
      })),
      actionableSavingStrategies: [
        `Direct at least ${formatCurrency(Math.round(netSavings * 0.5), currency)} toward the dedicated emergency reserve.`,
        overspentCategories.length > 0
          ? `Capping ${overspentCategories[0].category} will instantly liberate ${formatCurrency(overspentCategories[0].variance, currency)}/month in discretionary margin.`
          : 'Preserve current budgeting rhythm to reach annual investment targets 6 weeks ahead of schedule.',
        'Implement the 48-hour pause rule for unbudgeted non-essential expenses over $50.',
        'Schedule automated savings transfers on the immediate day following income arrival.'
      ],
      nextMonthTargets: {
        incomeGoal: Math.round(totalIncome * 1.05),
        spendingCap: Math.round(totalExpenses * 0.95),
        savingsGoal: Math.round(netSavings * 1.15),
        primaryMilestone: overspentCategories.length > 0 ? `Eliminate ${overspentCategories[0].category} Overrun` : 'Strengthen Emergency Liquidity'
      },
      generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    };
  });

  const handleGenerateAIReport = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/gemini/monthly-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: currentProfile,
          monthYear: selectedMonth,
          financialSummary: {
            totalIncome,
            totalExpenses,
            netSavings,
            savingsRate,
            healthScore,
            overspentCategories,
            categoryBreakdown
          }
        })
      });

      const data = await res.json();
      setReport({
        ...data,
        generatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      });
    } catch (err) {
      console.error('Error generating AI monthly report:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(report, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `financial_report_${selectedMonth.replace(/\s+/g, '_')}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Top Controls Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-400" />
              Structured Monthly Financial Report Generator
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Automated executive summary auditing income, expenses, overruns, and next month targets
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              <option value="September 2026">September 2026 (Current Cycle)</option>
              <option value="August 2026">August 2026</option>
              <option value="July 2026">July 2026</option>
            </select>

            <button
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleDownloadJSON}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition-all flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={handleGenerateAIReport}
              disabled={isGenerating}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>{isGenerating ? 'Synthesizing Report...' : 'Re-Generate with AI'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Printable Report Document Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-8 max-w-5xl mx-auto print:bg-white print:text-black print:border-none print:shadow-none print:p-0">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-6 gap-4 print:border-gray-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-400 print:text-emerald-700">
                Official Financial Statement
              </span>
              <span className="text-slate-600 print:text-gray-400">•</span>
              <span className="text-xs text-slate-400 print:text-gray-600">
                Generated: {report.generatedAt || 'Today'}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 print:text-black">
              {report.reportTitle}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 print:text-gray-600">
              Account Holder: <strong className="text-slate-200 print:text-black">{currentProfile.name}</strong> • Scenario: {currentProfile.scenarioTag}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-center">
            <div className="text-right">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block print:text-gray-500">
                Financial Health
              </span>
              <span className="text-sm sm:text-base font-bold text-emerald-400 print:text-emerald-700">
                {report.healthGrade || healthScore.grade}
              </span>
            </div>
          </div>
        </div>

        {/* Executive Summary Statement */}
        <div className="bg-slate-950/70 p-5 rounded-2xl border border-slate-800/80 print:bg-gray-50 print:border-gray-200">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-2 print:text-gray-700">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 print:hidden" />
            AI Executive Synthesis
          </h3>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal print:text-gray-800">
            {report.aiExecutiveSummary}
          </p>
        </div>

        {/* Financial Flow Summary Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 print:bg-gray-50 print:border-gray-200">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block print:text-gray-600">
              Gross Monthly Income
            </span>
            <span className="text-xl sm:text-2xl font-bold text-emerald-400 mt-1 block print:text-emerald-700">
              {formatCurrency(report.totalIncome || totalIncome, currency)}
            </span>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 print:bg-gray-50 print:border-gray-200">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block print:text-gray-600">
              Total Outflows
            </span>
            <span className="text-xl sm:text-2xl font-bold text-rose-400 mt-1 block print:text-rose-700">
              {formatCurrency(report.totalExpenses || totalExpenses, currency)}
            </span>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 print:bg-gray-50 print:border-gray-200">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block print:text-gray-600">
              Net Savings Retained
            </span>
            <span className="text-xl sm:text-2xl font-bold text-teal-300 mt-1 block print:text-teal-700">
              {formatCurrency(report.netSavings || netSavings, currency)}
            </span>
          </div>

          <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 print:bg-gray-50 print:border-gray-200">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider block print:text-gray-600">
              Savings Capture Rate
            </span>
            <span className="text-xl sm:text-2xl font-bold text-white mt-1 block print:text-black">
              {report.savingsRate || savingsRate}%
            </span>
          </div>
        </div>

        {/* Overspending Audit Section */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2 print:text-black">
            <AlertTriangle className="w-4 h-4 text-amber-400 print:text-amber-600" />
            Overspending Audit & Budget Variances
          </h3>

          {report.overspendingAudit && report.overspendingAudit.length > 0 ? (
            <div className="space-y-2.5">
              {report.overspendingAudit.map((item: any, i: number) => (
                <div
                  key={i}
                  className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 print:bg-gray-50 print:border-gray-200"
                >
                  <div>
                    <span className="font-bold text-white text-xs sm:text-sm print:text-black">
                      {item.category}
                    </span>
                    <p className="text-xs text-slate-400 mt-0.5 print:text-gray-600">
                      {item.recommendation}
                    </p>
                  </div>
                  <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 self-start sm:self-center shrink-0 print:bg-rose-100 print:text-rose-800">
                    +{formatCurrency(item.varianceAmount, currency)} Over Budget
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-emerald-400 flex items-center gap-2 print:bg-emerald-50 print:text-emerald-800 print:border-emerald-200">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero budget overruns detected this monthly cycle! All expenses were kept strictly within target ceilings.</span>
            </div>
          )}
        </div>

        {/* Actionable Saving Suggestions */}
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-2 print:text-black">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 print:text-emerald-600" />
            Tailored Actionable Saving Strategies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {report.actionableSavingStrategies &&
              report.actionableSavingStrategies.map((strat: string, i: number) => (
                <div
                  key={i}
                  className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 text-xs text-slate-200 flex items-start gap-2.5 print:bg-gray-50 print:border-gray-200 print:text-gray-800"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center shrink-0 text-[10px] print:bg-emerald-100 print:text-emerald-800">
                    {i + 1}
                  </span>
                  <span className="leading-relaxed">{strat}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Next Month Targets Box */}
        {report.nextMonthTargets && (
          <div className="bg-gradient-to-r from-emerald-950/40 via-slate-950 to-teal-950/40 border border-emerald-500/30 rounded-2xl p-6 print:bg-gray-100 print:border-gray-300">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-2 print:text-black">
              <Target className="w-4 h-4 text-emerald-400 print:text-emerald-600" />
              Next Month Target Benchmarks (October 2026)
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 print:bg-white print:border-gray-200">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block print:text-gray-500">Target Inflow</span>
                <span className="text-base sm:text-lg font-bold text-emerald-400 print:text-emerald-700">
                  {formatCurrency(report.nextMonthTargets.incomeGoal, currency)}
                </span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 print:bg-white print:border-gray-200">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block print:text-gray-500">Spending Cap</span>
                <span className="text-base sm:text-lg font-bold text-rose-400 print:text-rose-700">
                  {formatCurrency(report.nextMonthTargets.spendingCap, currency)}
                </span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 print:bg-white print:border-gray-200">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block print:text-gray-500">Savings Target</span>
                <span className="text-base sm:text-lg font-bold text-teal-300 print:text-teal-700">
                  {formatCurrency(report.nextMonthTargets.savingsGoal, currency)}
                </span>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 print:bg-white print:border-gray-200">
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block print:text-gray-500">Primary Focus</span>
                <span className="text-xs sm:text-sm font-bold text-slate-200 truncate block print:text-black">
                  {report.nextMonthTargets.primaryMilestone || 'Grow Reserve'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Footer verification stamp */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 print:text-gray-500 gap-2">
          <span>Personal Finance Advisor Bot • AI-Powered Financial Planning Assistant</span>
          <span>Report ID: REP-{Date.now().toString(36).toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};
