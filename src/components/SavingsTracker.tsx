import React, { useState } from 'react';
import {
  Target,
  Sparkles,
  Plus,
  Calendar,
  CheckCircle2,
  DollarSign,
  TrendingUp,
  Award,
  Trash2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { SavingGoal, UserPersonaProfile } from '../types';
import { formatCurrency } from '../utils/financialCalculations';

interface SavingsTrackerProps {
  savingsGoals: SavingGoal[];
  onUpdateGoals: (goals: SavingGoal[]) => void;
  netSavings: number;
  currentProfile: UserPersonaProfile;
  currency?: string;
  onOpenAdvisorWithPrompt: (prompt: string) => void;
}

export const SavingsTracker: React.FC<SavingsTrackerProps> = ({
  savingsGoals,
  onUpdateGoals,
  netSavings,
  currentProfile,
  currency = '$',
  onOpenAdvisorWithPrompt
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTargetAmount, setNewTargetAmount] = useState<number>(3000);
  const [newCurrentAmount, setNewCurrentAmount] = useState<number>(500);
  const [newTargetDate, setNewTargetDate] = useState('2027-06-30');
  const [newCategory, setNewCategory] = useState<SavingGoal['category']>('Emergency Fund');
  const [newPriority, setNewPriority] = useState<SavingGoal['priority']>('high');

  const [depositModalGoalId, setDepositModalGoalId] = useState<string | null>(null);
  const [depositAmount, setDepositAmount] = useState<number>(100);

  const totalSaved = savingsGoals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalTarget = savingsGoals.reduce((sum, g) => sum + g.targetAmount, 0);
  const totalMonthlyCommitment = savingsGoals.reduce((sum, g) => sum + g.monthlyContribution, 0);

  const handleDeposit = (goalId: string, amount: number) => {
    if (amount <= 0) return;

    const updated = savingsGoals.map((g) => {
      if (g.id === goalId) {
        const nextAmount = g.currentAmount + amount;
        if (nextAmount >= g.targetAmount && g.currentAmount < g.targetAmount) {
          // Trigger celebration confetti
          try {
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch (e) {
            // ignore
          }
        }
        return {
          ...g,
          currentAmount: nextAmount
        };
      }
      return g;
    });

    onUpdateGoals(updated);
    setDepositModalGoalId(null);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newGoal: SavingGoal = {
      id: `goal-${Date.now()}`,
      title: newTitle.trim(),
      targetAmount: Number(newTargetAmount),
      currentAmount: Number(newCurrentAmount),
      targetDate: newTargetDate,
      category: newCategory,
      priority: newPriority,
      monthlyContribution: Math.round((Number(newTargetAmount) - Number(newCurrentAmount)) / 10)
    };

    onUpdateGoals([...savingsGoals, newGoal]);
    setShowAddModal(false);
    setNewTitle('');
  };

  const handleDeleteGoal = (id: string) => {
    onUpdateGoals(savingsGoals.filter((g) => g.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Top Overview Bar */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-400" />
              Goal-Based Savings Tracker
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Track emergency cushions, educational funds, debt payoff, and milestone goals
            </p>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-md shadow-emerald-500/20 cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Goal</span>
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-5">
          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block font-medium">Total Saved in Goals</span>
            <span className="text-xl font-bold text-emerald-400 mt-1 block">
              {formatCurrency(totalSaved, currency)}
            </span>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block font-medium">Cumulative Target</span>
            <span className="text-xl font-bold text-white mt-1 block">
              {formatCurrency(totalTarget, currency)}
            </span>
          </div>

          <div className="bg-slate-950/70 p-3.5 rounded-xl border border-slate-800/80">
            <span className="text-xs text-slate-400 block font-medium">Net Monthly Contribution</span>
            <span className="text-xl font-bold text-teal-300 mt-1 block">
              {formatCurrency(totalMonthlyCommitment, currency)}/mo
            </span>
          </div>
        </div>
      </div>

      {/* AI Feasibility Advisor Callout */}
      <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="p-2.5 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 shrink-0">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-sm text-emerald-300">
              AI Feasibility Assessment for {currentProfile.name}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
              With your current positive cashflow of <strong className="text-white">{formatCurrency(netSavings, currency)}/month</strong>, you can fully fund your committed goals ({formatCurrency(totalMonthlyCommitment, currency)}/mo) with a surplus of <strong className="text-teal-300">{formatCurrency(Math.max(0, netSavings - totalMonthlyCommitment), currency)}/mo</strong> to accelerate milestones!
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenAdvisorWithPrompt('Analyze my savings goals pace and tell me how I can reach my emergency fund target faster.')}
          className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold px-3 py-2 rounded-xl transition-all whitespace-nowrap self-stretch sm:self-auto text-center"
        >
          Optimize Goal Pace
        </button>
      </div>

      {/* Savings Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {savingsGoals.map((goal) => {
          const progressPct = Math.min(100, Math.round((goal.currentAmount / (goal.targetAmount || 1)) * 100));
          const isCompleted = goal.currentAmount >= goal.targetAmount;

          return (
            <div
              key={goal.id}
              className={`bg-slate-900/90 border rounded-2xl p-5 shadow-sm transition-all flex flex-col justify-between ${
                isCompleted
                  ? 'border-emerald-500/50 bg-gradient-to-b from-slate-900 to-emerald-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-400">
                      <Target className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-bold text-white text-sm sm:text-base leading-snug">
                        {goal.title}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {goal.category}
                      </span>
                    </div>
                  </div>

                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    goal.priority === 'high'
                      ? 'bg-rose-500/10 text-rose-300 border-rose-500/30'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {goal.priority}
                  </span>
                </div>

                {/* Progress Visual */}
                <div className="my-4">
                  <div className="flex justify-between items-baseline text-xs mb-1.5">
                    <span className="text-xl font-extrabold text-white">
                      {formatCurrency(goal.currentAmount, currency)}
                    </span>
                    <span className="text-slate-400 font-semibold">
                      {progressPct}% of {formatCurrency(goal.targetAmount, currency)}
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isCompleted
                          ? 'bg-emerald-400'
                          : 'bg-gradient-to-r from-emerald-500 to-teal-400'
                      }`}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Monthly Target:</span>
                    <span className="text-slate-200 font-semibold">{formatCurrency(goal.monthlyContribution, currency)}/mo</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Date:</span>
                    <span className="text-slate-200 font-semibold">{goal.targetDate}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-5 pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <button
                  onClick={() => handleDeleteGoal(goal.id)}
                  title="Remove goal"
                  className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setDepositModalGoalId(goal.id);
                    setDepositAmount(100);
                  }}
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold px-3 py-1.5 rounded-xl transition-all flex items-center gap-1.5 active:scale-95"
                >
                  <DollarSign className="w-3.5 h-3.5" />
                  <span>+ Deposit Funds</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Deposit Modal */}
      {depositModalGoalId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-sm w-full p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-2">Deposit Funds to Goal</h3>
            <p className="text-xs text-slate-400 mb-4">
              Enter the amount you wish to contribute from your available monthly surplus.
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Deposit Amount ({currency})
                </label>
                <input
                  type="number"
                  min="1"
                  value={depositAmount}
                  onChange={(e) => setDepositAmount(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex gap-2">
                {[50, 100, 250, 500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setDepositAmount(preset)}
                    className="flex-1 text-xs py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                  >
                    +${preset}
                  </button>
                ))}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setDepositModalGoalId(null)}
                  className="px-3.5 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDeposit(depositModalGoalId, depositAmount)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs"
                >
                  Confirm Deposit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add New Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-1">Create New Savings Milestone</h3>
            <p className="text-xs text-slate-400 mb-4">
              Set realistic targets to ensure steady financial progress.
            </p>

            <form onSubmit={handleAddGoal} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Goal Name</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Next Semester Tuition or 3-Month Emergency Fund"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Target Amount ({currency})</label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newTargetAmount}
                    onChange={(e) => setNewTargetAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Starting Amount ({currency})</label>
                  <input
                    type="number"
                    min="0"
                    value={newCurrentAmount}
                    onChange={(e) => setNewCurrentAmount(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="Emergency Fund">Emergency Fund</option>
                    <option value="Education">Education</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Home / Rent">Home / Rent</option>
                    <option value="Investments">Investments</option>
                    <option value="Big Purchase">Big Purchase</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Completion Date</label>
                <input
                  type="date"
                  required
                  value={newTargetDate}
                  onChange={(e) => setNewTargetDate(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-md shadow-emerald-500/20"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
