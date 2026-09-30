import React from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Target,
  ArrowUpRight,
  ArrowDownRight,
  ShieldAlert,
  Sparkles,
  CheckCircle2,
  Calendar,
  ChevronRight,
  PieChart as PieIcon,
  Activity
} from 'lucide-react';
import {
  Transaction,
  CategoryBudget,
  SavingGoal,
  FinancialHealthScore,
  ExpenseCategory,
  PersonaType
} from '../types';
import { formatCurrency } from '../utils/financialCalculations';

interface DashboardOverviewProps {
  totalIncome: number;
  totalExpenses: number;
  essentialExpenses: number;
  discretionaryExpenses: number;
  netSavings: number;
  savingsRate: number;
  healthScore: FinancialHealthScore;
  categoryBreakdown: { category: ExpenseCategory; amount: number; percentage: number; isEssential: boolean }[];
  overspentCategories: { category: ExpenseCategory; budget: number; actual: number; variance: number; percentage: number }[];
  emergencyRunwayMonths: number;
  recentTransactions: Transaction[];
  savingsGoals: SavingGoal[];
  selectedPersona: PersonaType;
  onNavigateTab: (tab: string) => void;
  onOpenAddModal: () => void;
  onOpenAdvisorWithPrompt: (prompt: string) => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({
  totalIncome,
  totalExpenses,
  essentialExpenses,
  discretionaryExpenses,
  netSavings,
  savingsRate,
  healthScore,
  categoryBreakdown,
  overspentCategories,
  emergencyRunwayMonths,
  recentTransactions,
  savingsGoals,
  selectedPersona,
  onNavigateTab,
  onOpenAddModal,
  onOpenAdvisorWithPrompt
}) => {
  // Category color map for charts
  const categoryColors: Record<string, string> = {
    'Housing & Rent': '#6366f1',
    'Food & Groceries': '#10b981',
    'Dining & Takeout': '#f59e0b',
    'Transportation': '#06b6d4',
    'Utilities & Bills': '#8b5cf6',
    'Healthcare & Wellness': '#ec4899',
    'Education & Learning': '#3b82f6',
    'Entertainment & Subscriptions': '#f43f5e',
    'Shopping & Personal': '#eab308',
    'Family & Childcare': '#14b8a6',
    'Work & Freelance Tools': '#a855f7',
    'Emergency & Miscellaneous': '#64748b'
  };

  // 50/30/20 breakdown
  const essentialPct = totalIncome > 0 ? Math.round((essentialExpenses / totalIncome) * 100) : 0;
  const discretionaryPct = totalIncome > 0 ? Math.round((discretionaryExpenses / totalIncome) * 100) : 0;

  // Grade color
  const gradeColor =
    healthScore.score >= 80 ? 'text-emerald-400' :
    healthScore.score >= 65 ? 'text-teal-400' :
    healthScore.score >= 50 ? 'text-amber-400' : 'text-rose-400';

  const gradeBorderColor =
    healthScore.score >= 80 ? 'border-emerald-500/40' :
    healthScore.score >= 65 ? 'border-teal-500/40' :
    healthScore.score >= 50 ? 'border-amber-500/40' : 'border-rose-500/40';

  return (
    <div className="space-y-8">
      {/* Overspending Alert Banner (if any) */}
      {overspentCategories.length > 0 && (
        <div className="bg-gradient-to-r from-rose-950/80 via-slate-900 to-rose-950/40 border border-rose-500/40 rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-lg shadow-rose-950/20">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 rounded-xl border border-rose-500/30 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base">
                  Overspending Detected in {overspentCategories.length} {overspentCategories.length === 1 ? 'Category' : 'Categories'}
                </span>
                <span className="text-xs bg-rose-500/20 text-rose-300 font-semibold px-2 py-0.5 rounded-full border border-rose-500/30">
                  Attention Required
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                You have exceeded budget limits in:{' '}
                {overspentCategories.map((o) => (
                  <span key={o.category} className="font-semibold text-rose-300 mr-2">
                    {o.category} (+{formatCurrency(o.variance)}, +{o.percentage}%)
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch md:self-auto">
            <button
              onClick={() => onOpenAdvisorWithPrompt(`Analyze my overspending in ${overspentCategories.map((o) => o.category).join(' and ')} and suggest 3 concrete steps to cut back.`)}
              className="w-full md:w-auto bg-rose-500 hover:bg-rose-400 text-slate-950 font-semibold px-4 py-2 rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Fix with AI Advisor</span>
            </button>
            <button
              onClick={() => onNavigateTab('budget')}
              className="w-full md:w-auto bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium px-3.5 py-2 rounded-xl text-xs sm:text-sm border border-slate-700 transition-colors flex items-center justify-center"
            >
              Review Budget
            </button>
          </div>
        </div>
      )}

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Income Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Monthly Income</span>
            <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {formatCurrency(totalIncome)}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
              <span className="text-emerald-400 font-medium flex items-center">
                ● Active Inflow
              </span>
              <span>• {selectedPersona === 'freelancer' ? 'Variable invoices' : 'Monthly cadence'}</span>
            </div>
          </div>
        </div>

        {/* Expenses Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Expenses</span>
            <div className="p-2 bg-rose-500/10 text-rose-400 rounded-xl border border-rose-500/20">
              <ArrowDownRight className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-white">
              {formatCurrency(totalExpenses)}
            </div>
            <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-400">
              <span className="text-slate-300 font-medium">
                {formatCurrency(essentialExpenses)} Needs
              </span>
              <span>/</span>
              <span className="text-amber-400 font-medium">
                {formatCurrency(discretionaryExpenses)} Wants
              </span>
            </div>
          </div>
        </div>

        {/* Net Savings Card */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Net Monthly Savings</span>
            <div className="p-2 bg-teal-500/10 text-teal-400 rounded-xl border border-teal-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-300">
              {formatCurrency(netSavings)}
            </div>
            <div className="flex items-center justify-between mt-1 text-xs text-slate-400">
              <span>Savings Rate: <strong className="text-white">{savingsRate}%</strong></span>
              <span className={savingsRate >= 20 ? 'text-emerald-400 font-semibold' : 'text-amber-400'}>
                {savingsRate >= 20 ? 'Target Achieved' : 'Goal: 20%'}
              </span>
            </div>
            {/* Mini progress bar */}
            <div className="w-full bg-slate-800 rounded-full h-1.5 mt-2 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  savingsRate >= 20 ? 'bg-emerald-400' : 'bg-teal-400'
                }`}
                style={{ width: `${Math.min(100, (savingsRate / 20) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Health Score Card */}
        <div className={`bg-slate-900/90 border ${gradeBorderColor} rounded-2xl p-5 hover:border-slate-600 transition-all shadow-sm relative overflow-hidden`}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Financial Health</span>
            <span className={`text-xs px-2 py-0.5 rounded-full font-bold border ${gradeBorderColor} ${gradeColor} bg-slate-950`}>
              {healthScore.grade.split(' ')[0]}
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className={`text-3xl sm:text-4xl font-black ${gradeColor}`}>
              {healthScore.score}
            </span>
            <span className="text-xs text-slate-400 font-medium">/ 100 Score</span>
          </div>
          <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
            <span>Buffer Runway: <strong className="text-white">{emergencyRunwayMonths} mo</strong></span>
            <button
              onClick={() => onNavigateTab('predictive')}
              className="text-emerald-400 hover:text-emerald-300 font-semibold flex items-center"
            >
              Analyze <ChevronRight className="w-3 h-3 ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Visual Breakdown & 50/30/20 Framework */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Spending Breakdown */}
        <div className="lg:col-span-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <PieIcon className="w-5 h-5 text-emerald-400" />
                Monthly Spending Distribution by Category
              </h2>
              <p className="text-xs text-slate-400">
                Breakdown of all logged expenditures and relative budget impact
              </p>
            </div>
            <button
              onClick={() => onNavigateTab('ledger')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center self-start sm:self-center"
            >
              View Full Ledger <ChevronRight className="w-3.5 h-3.5 ml-1" />
            </button>
          </div>

          {/* Category Bars */}
          <div className="space-y-3.5">
            {categoryBreakdown.slice(0, 6).map((item) => {
              const color = categoryColors[item.category] || '#10b981';
              return (
                <div key={item.category} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      <span className="font-semibold text-slate-200">{item.category}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded font-medium ${
                        item.isEssential
                          ? 'bg-slate-800 text-slate-300 border border-slate-700'
                          : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                      }`}>
                        {item.isEssential ? 'Essential Need' : 'Discretionary'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white">{formatCurrency(item.amount)}</span>
                      <span className="text-slate-400 w-10 text-right">{item.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-slate-800/80 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${item.percentage}%`,
                        backgroundColor: color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Footer summary */}
          <div className="mt-6 pt-4 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
              <span className="text-[11px] text-slate-400 block">Total Categories</span>
              <span className="text-sm font-bold text-white">{categoryBreakdown.length}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
              <span className="text-[11px] text-slate-400 block">Needs Outflow</span>
              <span className="text-sm font-bold text-emerald-400">{formatCurrency(essentialExpenses)}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
              <span className="text-[11px] text-slate-400 block">Wants Outflow</span>
              <span className="text-sm font-bold text-amber-400">{formatCurrency(discretionaryExpenses)}</span>
            </div>
            <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800/60">
              <span className="text-[11px] text-slate-400 block">Savings Retained</span>
              <span className="text-sm font-bold text-teal-300">{formatCurrency(netSavings)}</span>
            </div>
          </div>
        </div>

        {/* 50/30/20 Budget Framework & Financial Health Score Breakdown */}
        <div className="space-y-6">
          {/* 50/30/20 Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-400" />
                50/30/20 Rule Alignment
              </h3>
              <span className="text-xs text-slate-400">Benchmark</span>
            </div>

            <div className="space-y-4">
              {/* Needs */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Needs (Target: 50%)</span>
                  <span className={`font-bold ${essentialPct > 55 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {essentialPct}% ({formatCurrency(essentialExpenses)})
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-emerald-500 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (essentialPct / 50) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Wants */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Wants (Target: 30%)</span>
                  <span className={`font-bold ${discretionaryPct > 35 ? 'text-amber-400' : 'text-slate-200'}`}>
                    {discretionaryPct}% ({formatCurrency(discretionaryExpenses)})
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-amber-400 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (discretionaryPct / 30) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Savings */}
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-300 font-medium">Savings (Target: 20%)</span>
                  <span className={`font-bold ${savingsRate >= 20 ? 'text-teal-400' : 'text-slate-400'}`}>
                    {savingsRate}% ({formatCurrency(netSavings)})
                  </span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2">
                  <div
                    className="bg-teal-400 h-2 rounded-full"
                    style={{ width: `${Math.min(100, (savingsRate / 20) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 leading-relaxed">
              💡 {selectedPersona === 'student'
                ? 'As a student, keeping needs under 65% while saving 10%+ is considered stellar discipline.'
                : selectedPersona === 'freelancer'
                ? 'Freelancers should prioritize funneling savings into an irregular income cash reserve.'
                : 'Allocations are well-proportioned. Maintain current discipline to hit goal targets.'}
            </div>
          </div>

          {/* AI Financial Health Score Card */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold text-white text-base mb-3 flex items-center justify-between">
              <span>Financial Health Audit</span>
              <span className={`text-xs font-semibold ${gradeColor}`}>
                {healthScore.grade}
              </span>
            </h3>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Emergency Fund Runway</span>
                <span className="font-bold text-white">{emergencyRunwayMonths} months</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Discretionary Ratio</span>
                <span className="font-bold text-amber-400">{healthScore.discretionaryRatio}%</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800/80">
                <span className="text-slate-400">Overspending Areas</span>
                <span className="font-bold text-white">{overspentCategories.length}</span>
              </div>
            </div>

            <button
              onClick={() => onOpenAdvisorWithPrompt('Give me a full comprehensive assessment of my financial health score and 3 steps to boost it.')}
              className="mt-4 w-full bg-slate-800 hover:bg-slate-700 text-emerald-400 hover:text-emerald-300 font-semibold py-2 px-3 rounded-xl text-xs border border-slate-700 transition-all flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Coach to Improve Score</span>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Recent Transactions & Active Savings Goals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-base">Recent Ledger Activity</h3>
              <p className="text-xs text-slate-400">Latest recorded income and expenses</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAddModal}
                className="text-xs bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-semibold px-2.5 py-1 rounded-lg border border-emerald-500/30 transition-colors"
              >
                + Log
              </button>
              <button
                onClick={() => onNavigateTab('ledger')}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors"
              >
                View All
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-800/70">
            {recentTransactions.slice(0, 5).map((tx) => {
              const isIncome = tx.type === 'income';
              return (
                <div key={tx.id} className="py-3 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded-xl text-xs font-bold shrink-0 ${
                      isIncome
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {isIncome ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-semibold text-slate-200 truncate">
                        {tx.description}
                      </p>
                      <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                        <span>{tx.category}</span>
                        <span>•</span>
                        <span>{tx.date}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`text-xs sm:text-sm font-bold ${
                      isIncome ? 'text-emerald-400' : 'text-slate-200'
                    }`}>
                      {isIncome ? '+' : '-'}{formatCurrency(tx.amount)}
                    </span>
                    <span className="block text-[10px] text-slate-500">
                      {tx.paymentMethod}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Savings Goals Highlights */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-white text-base">Active Savings Goals</h3>
              <p className="text-xs text-slate-400">Emergency fund & targeted milestones</p>
            </div>
            <button
              onClick={() => onNavigateTab('goals')}
              className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold flex items-center"
            >
              Manage Goals <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="space-y-4">
            {savingsGoals.slice(0, 3).map((goal) => {
              const progressPct = Math.min(100, Math.round((goal.currentAmount / goal.targetAmount) * 100));
              return (
                <div key={goal.id} className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-slate-200">{goal.title}</span>
                    </div>
                    <span className="text-slate-400 font-medium">
                      {progressPct}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden my-2">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-teal-400 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{formatCurrency(goal.currentAmount)} saved</span>
                    <span>Target: {formatCurrency(goal.targetAmount)} by {goal.targetDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
