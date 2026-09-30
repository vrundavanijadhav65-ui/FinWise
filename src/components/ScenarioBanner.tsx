import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PersonaType, UserPersonaProfile } from '../types';
import { PERSONA_PROFILES } from '../data/scenarios';

interface ScenarioBannerProps {
  selectedPersona: PersonaType;
  onSelectPersona: (persona: PersonaType) => void;
  onResetData: () => void;
  onOpenAdvisorWithPrompt: (prompt: string) => void;
}

export const ScenarioBanner: React.FC<ScenarioBannerProps> = ({
  selectedPersona,
  onSelectPersona,
  onResetData,
  onOpenAdvisorWithPrompt
}) => {
  const profile: UserPersonaProfile = PERSONA_PROFILES[selectedPersona];

  const quickPromptsByPersona: Record<PersonaType, string> = {
    salaried: 'Audit my dining and entertainment expenses and show me where I am overspending this month.',
    student: 'Help me stretch my monthly allowance with realistic grocery prep and textbook saving tips.',
    freelancer: 'How should I allocate this month’s client invoices to prepare for lean months and estimated taxes?',
    household: 'Review our shared family expenses in groceries and childcare, and provide a consolidated savings strategy.',
    custom: 'Analyze my current budget allocations and give me 3 ways to boost my monthly savings rate.'
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 rounded-2xl p-5 sm:p-6 mb-8 shadow-xl relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-teal-500/5 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-700/50 pb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl p-2 bg-slate-800 rounded-xl border border-slate-700">
              {profile.avatar}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {profile.scenarioTag}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-medium bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {profile.name} • {profile.roleTitle}
                </span>
              </div>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                {profile.description}
              </p>
            </div>
          </div>

          {/* Quick actions for scenario */}
          <div className="flex items-center gap-2 self-start lg:self-center shrink-0">
            <button
              onClick={() => onOpenAdvisorWithPrompt(quickPromptsByPersona[selectedPersona])}
              className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span>Ask AI Advisor for {selectedPersona === 'household' ? 'Family' : profile.id} Plan</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onResetData}
              title="Reset scenario data to default values"
              className="p-2 text-slate-400 hover:text-slate-200 bg-slate-800/80 hover:bg-slate-700 rounded-xl border border-slate-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Persona Key Challenges & AI Strategy */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 text-xs">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Key Financial Challenges
            </span>
            <ul className="space-y-1 text-slate-300">
              {profile.keyChallenges.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-400 font-bold">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Recommended AI Framework
            </span>
            <p className="text-slate-200 leading-relaxed font-medium">
              {profile.recommendedStrategy}
            </p>
          </div>

          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80 md:col-span-2 lg:col-span-1">
            <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1.5 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
              Scenario Quick Switcher
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              {(Object.keys(PERSONA_PROFILES) as PersonaType[]).map((key) => {
                const isSelected = selectedPersona === key;
                return (
                  <button
                    key={key}
                    onClick={() => onSelectPersona(key)}
                    className={`px-2 py-1.5 rounded-lg text-left text-xs transition-all flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-semibold'
                        : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    <span>{PERSONA_PROFILES[key].avatar}</span>
                    <span className="truncate">{key === 'household' ? 'Household' : PERSONA_PROFILES[key].roleTitle.split(' ')[0]}</span>
                    {isSelected && <CheckCircle2 className="w-3 h-3 text-emerald-400 ml-auto shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
