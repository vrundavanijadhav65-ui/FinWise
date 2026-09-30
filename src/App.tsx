/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import {
  PersonaType,
  Transaction,
  CategoryBudget,
  SavingGoal,
  UserPersonaProfile
} from './types';
import {
  PERSONA_PROFILES,
  INITIAL_TRANSACTIONS,
  INITIAL_BUDGETS,
  INITIAL_SAVINGS_GOALS
} from './data/scenarios';
import { calculateFinancialMetrics } from './utils/financialCalculations';

// Components
import { Navbar } from './components/Navbar';
import { ScenarioBanner } from './components/ScenarioBanner';
import { DashboardOverview } from './components/DashboardOverview';
import { TransactionLedger } from './components/TransactionLedger';
import { AdvisorChat } from './components/AdvisorChat';
import { BudgetPlanner } from './components/BudgetPlanner';
import { SavingsTracker } from './components/SavingsTracker';
import { PredictiveAnalytics } from './components/PredictiveAnalytics';
import { MonthlyReportView } from './components/MonthlyReportView';
import { AddTransactionModal } from './components/AddTransactionModal';
import { ArchitectureModal } from './components/ArchitectureModal';

export default function App() {
  const [selectedPersona, setSelectedPersona] = useState<PersonaType>('salaried');
  const [currentTab, setCurrentTab] = useState<string>('dashboard');

  // Multi-scenario data state (with localStorage caching)
  const [allTransactions, setAllTransactions] = useState<Record<PersonaType, Transaction[]>>(() => {
    try {
      const saved = localStorage.getItem('finadvisor_tx');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_TRANSACTIONS;
  });

  const [allBudgets, setAllBudgets] = useState<Record<PersonaType, CategoryBudget[]>>(() => {
    try {
      const saved = localStorage.getItem('finadvisor_budgets');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_BUDGETS;
  });

  const [allSavingsGoals, setAllSavingsGoals] = useState<Record<PersonaType, SavingGoal[]>>(() => {
    try {
      const saved = localStorage.getItem('finadvisor_goals');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // ignore
    }
    return INITIAL_SAVINGS_GOALS;
  });

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isArchitectureModalOpen, setIsArchitectureModalOpen] = useState(false);

  // Cross-component prompt communication
  const [chatExternalPrompt, setChatExternalPrompt] = useState<string>('');

  // Persist state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('finadvisor_tx', JSON.stringify(allTransactions));
    } catch (e) {
      // ignore
    }
  }, [allTransactions]);

  useEffect(() => {
    try {
      localStorage.setItem('finadvisor_budgets', JSON.stringify(allBudgets));
    } catch (e) {
      // ignore
    }
  }, [allBudgets]);

  useEffect(() => {
    try {
      localStorage.setItem('finadvisor_goals', JSON.stringify(allSavingsGoals));
    } catch (e) {
      // ignore
    }
  }, [allSavingsGoals]);

  // Current active data slices
  const currentProfile: UserPersonaProfile = PERSONA_PROFILES[selectedPersona];
  const currentTransactions = allTransactions[selectedPersona] || [];
  const currentBudgets = allBudgets[selectedPersona] || [];
  const currentGoals = allSavingsGoals[selectedPersona] || [];

  // Update budget spentAmount based on logged transactions
  const reconciledBudgets = useMemo(() => {
    const expenseMap = new Map<string, number>();
    currentTransactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        expenseMap.set(t.category, (expenseMap.get(t.category) || 0) + t.amount);
      });

    return currentBudgets.map((b) => ({
      ...b,
      spentAmount: expenseMap.get(b.category) || 0
    }));
  }, [currentBudgets, currentTransactions]);

  // Live metrics calculation
  const metrics = useMemo(() => {
    return calculateFinancialMetrics(
      currentTransactions,
      reconciledBudgets,
      currentGoals,
      currentProfile.monthlyBaseIncome
    );
  }, [currentTransactions, reconciledBudgets, currentGoals, currentProfile.monthlyBaseIncome]);

  // Transaction mutations
  const handleAddTransaction = (newTx: Omit<Transaction, 'id'>) => {
    const fullTx: Transaction = {
      ...newTx,
      id: `tx-${Date.now().toString(36)}`
    };

    setAllTransactions((prev) => ({
      ...prev,
      [selectedPersona]: [fullTx, ...(prev[selectedPersona] || [])]
    }));
  };

  const handleDeleteTransaction = (id: string) => {
    setAllTransactions((prev) => ({
      ...prev,
      [selectedPersona]: (prev[selectedPersona] || []).filter((t) => t.id !== id)
    }));
  };

  const handleUpdateBudgets = (updatedBudgets: CategoryBudget[]) => {
    setAllBudgets((prev) => ({
      ...prev,
      [selectedPersona]: updatedBudgets
    }));
  };

  const handleUpdateGoals = (updatedGoals: SavingGoal[]) => {
    setAllSavingsGoals((prev) => ({
      ...prev,
      [selectedPersona]: updatedGoals
    }));
  };

  const handleResetData = () => {
    if (window.confirm(`Reset scenario "${currentProfile.scenarioTag}" back to initial demo data?`)) {
      setAllTransactions((prev) => ({
        ...prev,
        [selectedPersona]: INITIAL_TRANSACTIONS[selectedPersona]
      }));
      setAllBudgets((prev) => ({
        ...prev,
        [selectedPersona]: INITIAL_BUDGETS[selectedPersona]
      }));
      setAllSavingsGoals((prev) => ({
        ...prev,
        [selectedPersona]: INITIAL_SAVINGS_GOALS[selectedPersona]
      }));
    }
  };

  const handleOpenAdvisorWithPrompt = (prompt: string) => {
    setChatExternalPrompt(prompt);
    setCurrentTab('advisor');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedPersona={selectedPersona}
        onSelectPersona={(p) => setSelectedPersona(p)}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenArchitectureModal={() => setIsArchitectureModalOpen(true)}
        totalIncome={metrics.totalIncome}
        totalExpenses={metrics.totalExpenses}
        netSavings={metrics.netSavings}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Scenario Banner (Hero Context) */}
        <ScenarioBanner
          selectedPersona={selectedPersona}
          onSelectPersona={(p) => setSelectedPersona(p)}
          onResetData={handleResetData}
          onOpenAdvisorWithPrompt={handleOpenAdvisorWithPrompt}
        />

        {/* Tab Views */}
        {currentTab === 'dashboard' && (
          <DashboardOverview
            totalIncome={metrics.totalIncome}
            totalExpenses={metrics.totalExpenses}
            essentialExpenses={metrics.essentialExpenses}
            discretionaryExpenses={metrics.discretionaryExpenses}
            netSavings={metrics.netSavings}
            savingsRate={metrics.savingsRate}
            healthScore={metrics.healthScore}
            categoryBreakdown={metrics.categoryBreakdown}
            overspentCategories={metrics.overspentCategories}
            emergencyRunwayMonths={metrics.emergencyRunwayMonths}
            recentTransactions={currentTransactions}
            savingsGoals={currentGoals}
            selectedPersona={selectedPersona}
            onNavigateTab={(tab) => setCurrentTab(tab)}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onOpenAdvisorWithPrompt={handleOpenAdvisorWithPrompt}
          />
        )}

        {currentTab === 'ledger' && (
          <TransactionLedger
            transactions={currentTransactions}
            onAddTransaction={handleAddTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            currency={currentProfile.currency}
          />
        )}

        {currentTab === 'advisor' && (
          <AdvisorChat
            currentProfile={currentProfile}
            totalIncome={metrics.totalIncome}
            totalExpenses={metrics.totalExpenses}
            netSavings={metrics.netSavings}
            savingsRate={metrics.savingsRate}
            healthScore={metrics.healthScore}
            overspentCategories={metrics.overspentCategories}
            categoryBreakdown={metrics.categoryBreakdown}
            emergencyRunwayMonths={metrics.emergencyRunwayMonths}
            externalPrompt={chatExternalPrompt}
            onClearExternalPrompt={() => setChatExternalPrompt('')}
            onNavigateTab={(tab) => setCurrentTab(tab)}
          />
        )}

        {currentTab === 'budget' && (
          <BudgetPlanner
            budgets={reconciledBudgets}
            onUpdateBudgets={handleUpdateBudgets}
            totalIncome={metrics.totalIncome}
            totalExpenses={metrics.totalExpenses}
            currentProfile={currentProfile}
            currency={currentProfile.currency}
            onOpenAdvisorWithPrompt={handleOpenAdvisorWithPrompt}
          />
        )}

        {currentTab === 'goals' && (
          <SavingsTracker
            savingsGoals={currentGoals}
            onUpdateGoals={handleUpdateGoals}
            netSavings={metrics.netSavings}
            currentProfile={currentProfile}
            currency={currentProfile.currency}
            onOpenAdvisorWithPrompt={handleOpenAdvisorWithPrompt}
          />
        )}

        {currentTab === 'predictive' && (
          <PredictiveAnalytics
            totalIncome={metrics.totalIncome}
            totalExpenses={metrics.totalExpenses}
            netSavings={metrics.netSavings}
            savingsRate={metrics.savingsRate}
            essentialExpenses={metrics.essentialExpenses}
            discretionaryExpenses={metrics.discretionaryExpenses}
            projectedMonthEndExpense={metrics.projectedMonthEndExpense}
            projectedSavings={metrics.projectedSavings}
            emergencyRunwayMonths={metrics.emergencyRunwayMonths}
            currentProfile={currentProfile}
            currency={currentProfile.currency}
            onOpenAdvisorWithPrompt={handleOpenAdvisorWithPrompt}
          />
        )}

        {currentTab === 'report' && (
          <MonthlyReportView
            currentProfile={currentProfile}
            totalIncome={metrics.totalIncome}
            totalExpenses={metrics.totalExpenses}
            netSavings={metrics.netSavings}
            savingsRate={metrics.savingsRate}
            healthScore={metrics.healthScore}
            categoryBreakdown={metrics.categoryBreakdown}
            overspentCategories={metrics.overspentCategories}
            emergencyRunwayMonths={metrics.emergencyRunwayMonths}
            budgets={reconciledBudgets}
            currency={currentProfile.currency}
            onOpenAdvisorWithPrompt={handleOpenAdvisorWithPrompt}
          />
        )}
      </main>

      {/* Modals */}
      <AddTransactionModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddTransaction={handleAddTransaction}
        currency={currentProfile.currency}
      />

      <ArchitectureModal
        isOpen={isArchitectureModalOpen}
        onClose={() => setIsArchitectureModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-8 px-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Personal Finance Advisor Bot</span>
            <span>•</span>
            <span>AI-Driven Financial Planning & Predictive Analytics</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsArchitectureModalOpen(true)}
              className="hover:text-emerald-400 transition-colors"
            >
              System Architecture
            </button>
            <button
              onClick={() => setCurrentTab('advisor')}
              className="hover:text-emerald-400 transition-colors"
            >
              Ask AI Co-Pilot
            </button>
            <button
              onClick={() => setCurrentTab('report')}
              className="hover:text-emerald-400 transition-colors"
            >
              Monthly Summary Report
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
