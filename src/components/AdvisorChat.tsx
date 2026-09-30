import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  User,
  Copy,
  Check,
  RefreshCw,
  Lightbulb,
  ShieldCheck,
  ArrowRight,
  TrendingDown,
  Target
} from 'lucide-react';
import { ChatMessage, UserPersonaProfile, FinancialHealthScore, ExpenseCategory } from '../types';
import { formatCurrency } from '../utils/financialCalculations';

interface AdvisorChatProps {
  currentProfile: UserPersonaProfile;
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;
  healthScore: FinancialHealthScore;
  overspentCategories: { category: ExpenseCategory; budget: number; actual: number; variance: number }[];
  categoryBreakdown: { category: ExpenseCategory; amount: number; percentage: number }[];
  emergencyRunwayMonths: number;
  externalPrompt?: string;
  onClearExternalPrompt?: () => void;
  onNavigateTab: (tab: string) => void;
}

export const AdvisorChat: React.FC<AdvisorChatProps> = ({
  currentProfile,
  totalIncome,
  totalExpenses,
  netSavings,
  savingsRate,
  healthScore,
  overspentCategories,
  categoryBreakdown,
  emergencyRunwayMonths,
  externalPrompt,
  onClearExternalPrompt,
  onNavigateTab
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: `Hello ${currentProfile.name.split(' ')[0]}! 👋 I am your **Personal Finance Advisor Bot** powered by the Gemini AI Engine.

I have analyzed your **${currentProfile.scenarioTag}** financial status:
- **Monthly Inflow:** ${formatCurrency(totalIncome)}
- **Monthly Outflows:** ${formatCurrency(totalExpenses)}
- **Net Savings:** ${formatCurrency(netSavings)} (${savingsRate}% savings rate)
- **Financial Health:** ${healthScore.grade} (${healthScore.score}/100)
- **Emergency Runway:** ${emergencyRunwayMonths} months

${overspentCategories.length > 0 ? `⚠️ **Overspending Alert:** You currently have budget overruns in ${overspentCategories.map(c => `**${c.category}** (+${formatCurrency(c.variance)})`).join(', ')}.` : '✅ All monitored categories are currently within baseline thresholds.'}

How can I help you optimize your money today? You can select a quick prompt below or type any question!`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      quickPrompts: [
        'Analyze my overspending and suggest 3 cuts',
        'Build my next month 50/30/20 budget plan',
        'How to grow my emergency buffer to 6 months?',
        'Evaluate my savings rate against benchmarks'
      ]
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // Handle external prompt passed from banner or widgets
  useEffect(() => {
    if (externalPrompt) {
      sendMessage(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/advisor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userMessage: userMsg.text,
          persona: currentProfile,
          financialSummary: {
            totalIncome,
            totalExpenses,
            netSavings,
            savingsRate,
            healthScore,
            emergencyRunwayMonths,
            overspentCategories,
            categoryBreakdown
          }
        })
      });

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'I have completed your financial analysis.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: [
          'Create next month budget limits',
          'What happens if my income drops 15%?',
          'Generate complete monthly report'
        ]
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error('Failed to communicate with advisor backend:', err);
      const errorMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: `### 💡 Quick Action Financial Directive\n\n- **Target Essential Savings:** Allocate at least **${formatCurrency(Math.round(totalIncome * 0.2))}** directly to savings upon income receipt.\n- **Overspending Focus:** Review ${overspentCategories.length > 0 ? overspentCategories[0].category : 'discretionary items'} to restore baseline balance.\n- **Emergency Cushion:** Continue contributing to hit 3 to 6 months of living expenses ($${formatCurrency(totalExpenses * 3)}).`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: `Conversation reset. I am ready to evaluate new scenarios, optimize your budget, or simulate future cashflow outcomes.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        quickPrompts: [
          'Audit my top spending categories',
          'Recommend savings goals for my income',
          'How does 50/30/20 apply to me?'
        ]
      }
    ]);
  };

  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl flex flex-col h-[750px] overflow-hidden">
      {/* Advisor Header */}
      <div className="bg-slate-950/80 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400/40">
            <Bot className="w-5 h-5 text-slate-950 font-bold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-white">AI Financial Advisor Bot</h2>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Gemini 3.8 Flash
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Certified Financial Planning Co-Pilot • Context: {currentProfile.scenarioTag}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleClearChat}
            title="Reset conversation"
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Real-time Context Badge */}
      <div className="bg-slate-950/40 px-6 py-2 border-b border-slate-800/60 text-[11px] text-slate-400 flex items-center justify-between overflow-x-auto">
        <div className="flex items-center gap-4 whitespace-nowrap">
          <span>Profile: <strong className="text-slate-200">{currentProfile.name}</strong></span>
          <span>Income: <strong className="text-emerald-400">{formatCurrency(totalIncome)}</strong></span>
          <span>Expenses: <strong className="text-rose-400">{formatCurrency(totalExpenses)}</strong></span>
          <span>Runway: <strong className="text-teal-300">{emergencyRunwayMonths} mo</strong></span>
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-medium whitespace-nowrap ml-4">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Real-time Financial Ingestion</span>
        </div>
      </div>

      {/* Chat Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-3xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              {/* Avatar */}
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-1 ${
                isUser
                  ? 'bg-slate-800 text-slate-200 border border-slate-700'
                  : 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-sm'
              }`}>
                {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble */}
              <div className="space-y-2 max-w-[88%] sm:max-w-[82%]">
                <div className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed relative group ${
                  isUser
                    ? 'bg-emerald-600 text-white rounded-tr-none shadow-md shadow-emerald-900/20'
                    : 'bg-slate-950/80 border border-slate-800 text-slate-200 rounded-tl-none shadow-sm'
                }`}>
                  {/* Copy button */}
                  {!isUser && (
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="absolute right-2 top-2 p-1.5 text-slate-500 hover:text-slate-200 bg-slate-900/80 rounded-md opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Copy response"
                    >
                      {copiedId === msg.id ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}

                  {/* Message content rendering */}
                  <div className="prose prose-invert prose-xs sm:prose-sm max-w-none whitespace-pre-wrap">
                    {msg.text}
                  </div>
                </div>

                {/* Quick Prompts under bot response */}
                {msg.quickPrompts && msg.quickPrompts.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.quickPrompts.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(prompt)}
                        className="text-[11px] bg-slate-800/90 hover:bg-slate-700 text-emerald-300 hover:text-emerald-200 border border-slate-700/80 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 active:scale-95"
                      >
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span>{prompt}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className={`text-[10px] text-slate-500 ${isUser ? 'text-right' : 'text-left'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 max-w-xl mr-auto">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 animate-spin" />
            </div>
            <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
              <span className="text-xs text-slate-300 font-medium">
                Personal Finance Advisor is computing calculations and spending insights...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Box and Action Bar */}
      <div className="p-4 bg-slate-950/90 border-t border-slate-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(inputMessage);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder={`Ask about budgeting, cuts, ${currentProfile.scenarioTag.split(':')[0]} tips...`}
            disabled={isLoading}
            className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-emerald-500 disabled:opacity-50 transition-all"
          />

          <button
            type="submit"
            disabled={!inputMessage.trim() || isLoading}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold px-5 py-3 rounded-xl transition-all flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20 active:scale-95 cursor-pointer disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 px-1">
          <span>AI outputs are personalized for budgeting and educational planning.</span>
          <span className="hidden sm:inline">Press Enter to send</span>
        </div>
      </div>
    </div>
  );
};
