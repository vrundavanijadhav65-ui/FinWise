import React from 'react';
import {
  Wallet,
  Sparkles,
  Bot,
  PieChart,
  BarChart3,
  Target,
  FileText,
  TrendingUp,
  Layers,
  Info
} from 'lucide-react';
import { PersonaType, UserPersonaProfile } from '../types';
import { PERSONA_PROFILES } from '../data/scenarios';
import { formatCurrency } from '../utils/financialCalculations';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  selectedPersona: PersonaType;
  onSelectPersona: (persona: PersonaType) => void;
  onOpenAddModal: () => void;
  onOpenArchitectureModal: () => void;
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  selectedPersona,
  onSelectPersona,
  onOpenAddModal,
  onOpenArchitectureModal,
  totalIncome,
  totalExpenses,
  netSavings
}) => {
  const currentProfile: UserPersonaProfile = PERSONA_PROFILES[selectedPersona];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'ledger', label: 'Income & Expenses', icon: Wallet },
    { id: 'advisor', label: 'AI Advisor Bot', icon: Bot, badge: 'AI' },
    { id: 'budget', label: 'Budget Planner', icon: PieChart },
    { id: 'goals', label: 'Savings Goals', icon: Target },
    { id: 'predictive', label: 'Predictive Analytics', icon: TrendingUp },
    { id: 'report', label: 'Monthly Report', icon: FileText }
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      {/* Top utility bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/30">
              <Bot className="w-6 h-6 text-slate-950 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-white via-slate-100 to-emerald-300 bg-clip-text text-transparent">
                  Personal Finance Advisor Bot
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <Sparkles className="w-3 h-3 text-emerald-400 animate-pulse" />
                  AI Engine
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Intelligent Cashflow, Budget Generation & Savings Planning
              </p>
            </div>
          </div>

          {/* Persona Quick Selector */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center bg-slate-800/80 rounded-lg p-1 border border-slate-700/70">
              {(Object.keys(PERSONA_PROFILES) as PersonaType[]).map((key) => {
                const p = PERSONA_PROFILES[key];
                const isSelected = selectedPersona === key;
                return (
                  <button
                    key={key}
                    onClick={() => onSelectPersona(key)}
                    className={`px-2.5 py-1 text-xs font-medium rounded-md transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-500 text-slate-950 font-semibold shadow-sm'
                        : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                    }`}
                    title={p.roleTitle}
                  >
                    <span>{p.avatar}</span>
                    <span className="capitalize">{key === 'household' ? 'Family' : key}</span>
                  </button>
                );
              })}
            </div>

            {/* Mobile persona select */}
            <div className="lg:hidden">
              <select
                value={selectedPersona}
                onChange={(e) => onSelectPersona(e.target.value as PersonaType)}
                className="bg-slate-800 border border-slate-700 text-xs rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                {(Object.keys(PERSONA_PROFILES) as PersonaType[]).map((key) => (
                  <option key={key} value={key}>
                    {PERSONA_PROFILES[key].avatar} {PERSONA_PROFILES[key].roleTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Architecture stack details button */}
            <button
              onClick={onOpenArchitectureModal}
              title="System Architecture (Flask / SQLAlchemy / AI Engine)"
              className="p-2 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800 hover:border-slate-700"
            >
              <Layers className="w-4 h-4" />
            </button>

            {/* Quick Log Transaction Button */}
            <button
              onClick={onOpenAddModal}
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold px-3.5 py-1.5 rounded-lg text-xs sm:text-sm transition-all shadow-md shadow-emerald-500/20 flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span className="text-base leading-none font-bold">+</span>
              <span className="hidden sm:inline">Log Transaction</span>
              <span className="sm:hidden">Log</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 scrollbar-none border-t border-slate-800/60">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-slate-800 text-emerald-400 shadow-sm border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className="px-1.5 py-0.2 text-[10px] uppercase font-bold rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Quick live context strip */}
      <div className="bg-slate-950/70 border-t border-slate-800/40 px-4 py-1.5 text-xs text-slate-400 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300 font-medium">
              <span>{currentProfile.avatar}</span>
              <span>{currentProfile.name}</span>
              <span className="text-slate-500">({currentProfile.roleTitle})</span>
            </span>
            <span className="text-slate-600">|</span>
            <span>Scenario: <strong className="text-slate-300">{currentProfile.scenarioTag}</strong></span>
          </div>

          <div className="flex items-center gap-5">
            <div>
              <span className="text-slate-500">Monthly Inflow: </span>
              <span className="font-semibold text-emerald-400">{formatCurrency(totalIncome)}</span>
            </div>
            <div>
              <span className="text-slate-500">Monthly Outflow: </span>
              <span className="font-semibold text-rose-400">{formatCurrency(totalExpenses)}</span>
            </div>
            <div>
              <span className="text-slate-500">Net Savings: </span>
              <span className="font-semibold text-teal-300">{formatCurrency(netSavings)}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
