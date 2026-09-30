import React, { useState } from 'react';
import {
  PieChart,
  Sparkles,
  Sliders,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Layers,
  Save,
  RotateCcw
} from 'lucide-react';
import { CategoryBudget, UserPersonaProfile, ExpenseCategory } from '../types';
import { formatCurrency } from '../utils/financialCalculations';

interface BudgetPlannerProps {
  budgets: CategoryBudget[];
  onUpdateBudgets: (updated: CategoryBudget[]) => void;
  totalIncome: number;
  totalExpenses: number;
  currentProfile: UserPersonaProfile;
  currency?: string;
  onOpenAdvisorWithPrompt: (prompt: string) => void;
}

export const BudgetPlanner: React.FC<BudgetPlannerProps> = ({
  budgets,
  onUpdateBudgets,
  totalIncome,
  totalExpenses,
  currentProfile,
  currency = '$',
  onOpenAdvisorWithPrompt
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedFramework, setSelectedFramework] = useState<string>(
    currentProfile.id === 'student' ? '70/20/10 Micro-Budget' : currentProfile.id === 'freelancer' ? 'Variable Cashflow Buffer' : '50/30/20 Rule'
  );
  const [editingBudgetIndex, setEditingBudgetIndex] = useState<number | null>(null);
  const [editLimitValue, setEditLimitValue] = useState<number>(0);
  const [aiPlanResult, setAiPlanResult] = useState<any | null>(null);

  const totalAllocated = budgets.reduce((sum, b) => sum + b.allocatedAmount, 0);
  const unallocatedSurplus = Math.max(0, totalIncome - totalAllocated);

  // Call Gemini AI endpoint to generate optimized budget allocations
  const generateAIBudgetPlan = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch('/api/gemini/budget-plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          persona: currentProfile,
          totalIncome,
          currentBudgets: budgets,
          currentExpenses: totalExpenses
        })
      });

      const planData = await res.json();
      setAiPlanResult(planData);

      // Merge AI suggested limits into the current budgets
      if (planData.categories && Array.isArray(planData.categories)) {
        const updated = budgets.map((b) => {
          const matched = planData.categories.find(
            (c: any) => c.category?.toLowerCase() === b.category.toLowerCase()
          );
          if (matched && matched.suggestedLimit) {
            return {
              ...b,
              aiSuggestedLimit: matched.suggestedLimit,
              aiNote: matched.rational || b.aiNote
            };
          }
          return b;
        });
        onUpdateBudgets(updated);
      }
    } catch (err) {
      console.error('Error generating AI budget plan:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  const applyAISuggestedLimit = (index: number) => {
    const target = budgets[index];
    if (target.aiSuggestedLimit) {
      const updated = [...budgets];
      updated[index] = {
        ...target,
        allocatedAmount: target.aiSuggestedLimit
      };
      onUpdateBudgets(updated);
    }
  };

  const applyAllAISuggestions = () => {
    const updated = budgets.map((b) => ({
      ...b,
      allocatedAmount: b.aiSuggestedLimit || b.allocatedAmount
    }));
    onUpdateBudgets(updated);
  };

  const handleSaveEdit = (index: number) => {
    const updated = [...budgets];
    updated[index] = {
      ...updated[index],
      allocatedAmount: editLimitValue
    };
    onUpdateBudgets(updated);
    setEditingBudgetIndex(null);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Generation Trigger */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-400" />
                Automated AI Budget Planner
              </h2>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                AI Optimization Active
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Personalized budget limits generated for {currentProfile.name} ({currentProfile.scenarioTag})
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={applyAllAISuggestions}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3.5 py-2 rounded-xl transition-all"
            >
              Apply All AI Recommendations
            </button>

            <button
              onClick={generateAIBudgetPlan}
              disabled={isGenerating}
              className="bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 disabled:opacity-50 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-slate-950 animate-pulse" />
              <span>{isGenerating ? 'Computing Budget Plan...' : 'Generate New AI Plan'}</span>
            </button>
          </div>
        </div>

        {/* Framework Strategy Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block font-medium">Monthly Inflow Ceiling</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">
              {formatCurrency(totalIncome, currency)}
            </span>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block font-medium">Total Budget Allocated</span>
            <span className="text-xl font-bold text-white mt-1 block">
              {formatCurrency(totalAllocated, currency)}
              <span className="text-xs text-slate-400 ml-1.5 font-normal">
                ({Math.round((totalAllocated / (totalIncome || 1)) * 100)}% of income)
              </span>
            </span>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block font-medium">Target Savings Surplus</span>
            <span className="text-xl font-bold text-teal-300 mt-1 block">
              {formatCurrency(unallocatedSurplus, currency)}
              <span className="text-xs text-teal-400/80 ml-1.5 font-normal">
                ({Math.round((unallocatedSurplus / (totalIncome || 1)) * 100)}% to goals)
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* AI Strategy Highlights (if generated) */}
      {aiPlanResult && aiPlanResult.strategicHighlights && (
        <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="font-bold text-sm text-emerald-300">
              AI Strategic Directives for {aiPlanResult.planName || 'Current Plan'}
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {aiPlanResult.strategicHighlights.map((highlight: string, idx: number) => (
              <div key={idx} className="bg-slate-900/90 p-3 rounded-xl border border-slate-800 text-xs text-slate-200">
                <span className="text-emerald-400 font-bold mr-1.5">{idx + 1}.</span>
                {highlight}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Category Budget Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {budgets.map((item, index) => {
          const isOverBudget = item.spentAmount > item.allocatedAmount;
          const consumptionPct = Math.round((item.spentAmount / (item.allocatedAmount || 1)) * 100);
          const isEditing = editingBudgetIndex === index;

          return (
            <div
              key={item.category}
              className={`bg-slate-900/90 border rounded-2xl p-5 transition-all shadow-sm ${
                isOverBudget
                  ? 'border-rose-500/40 bg-gradient-to-b from-slate-900 to-rose-950/20'
                  : consumptionPct >= 80
                  ? 'border-amber-500/40'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-100 text-sm sm:text-base flex items-center gap-2">
                    {item.category}
                  </h4>
                  <span className="text-[11px] text-slate-400">
                    Spent: <strong className={isOverBudget ? 'text-rose-400' : 'text-slate-200'}>{formatCurrency(item.spentAmount, currency)}</strong>
                  </span>
                </div>

                <div className="text-right">
                  {isOverBudget ? (
                    <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-rose-400" />
                      +{formatCurrency(item.spentAmount - item.allocatedAmount, currency)} Over
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400">
                      {consumptionPct}% Used
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden my-3">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isOverBudget
                      ? 'bg-rose-500'
                      : consumptionPct >= 80
                      ? 'bg-amber-400'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, consumptionPct)}%` }}
                />
              </div>

              {/* Allocation limit editor */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60 mt-3">
                <div className="text-slate-400">
                  <span>Current Cap: </span>
                  {isEditing ? (
                    <span className="inline-flex items-center gap-1 ml-1">
                      <input
                        type="number"
                        value={editLimitValue}
                        onChange={(e) => setEditLimitValue(Number(e.target.value))}
                        className="w-20 bg-slate-950 border border-slate-700 rounded px-1.5 py-0.5 text-xs text-white"
                      />
                      <button
                        onClick={() => handleSaveEdit(index)}
                        className="text-emerald-400 hover:text-emerald-300 font-bold ml-1"
                      >
                        Save
                      </button>
                    </span>
                  ) : (
                    <span
                      onClick={() => {
                        setEditingBudgetIndex(index);
                        setEditLimitValue(item.allocatedAmount);
                      }}
                      className="font-bold text-white cursor-pointer hover:underline"
                      title="Click to edit cap"
                    >
                      {formatCurrency(item.allocatedAmount, currency)} ✏️
                    </span>
                  )}
                </div>

                {item.aiSuggestedLimit && (
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-semibold text-[11px]">
                      AI Target: {formatCurrency(item.aiSuggestedLimit, currency)}
                    </span>
                    {item.allocatedAmount !== item.aiSuggestedLimit && (
                      <button
                        onClick={() => applyAISuggestedLimit(index)}
                        className="text-[10px] bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-medium transition-colors"
                      >
                        Apply
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* AI Reasoning note */}
              {item.aiNote && (
                <div className="mt-2.5 p-2 bg-slate-950/60 rounded-xl border border-slate-800/80 text-[11px] text-slate-300 flex items-start gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{item.aiNote}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
