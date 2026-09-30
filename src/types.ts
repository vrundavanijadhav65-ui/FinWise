export type PersonaType = 'salaried' | 'student' | 'freelancer' | 'household' | 'custom';

export type ExpenseCategory =
  | 'Housing & Rent'
  | 'Food & Groceries'
  | 'Dining & Takeout'
  | 'Transportation'
  | 'Utilities & Bills'
  | 'Healthcare & Wellness'
  | 'Education & Learning'
  | 'Entertainment & Subscriptions'
  | 'Shopping & Personal'
  | 'Family & Childcare'
  | 'Work & Freelance Tools'
  | 'Emergency & Miscellaneous';

export type IncomeCategory =
  | 'Monthly Salary'
  | 'Freelance / Client Invoicing'
  | 'Monthly Allowance / Stipend'
  | 'Family Shared Income'
  | 'Bonus & Commissions'
  | 'Investments & Dividends'
  | 'Side Hustle'
  | 'Other Income';

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  category: ExpenseCategory | IncomeCategory;
  date: string;
  description: string;
  isEssential: boolean; // Essential needs vs discretionary wants
  paymentMethod: 'Bank Transfer' | 'Credit Card' | 'Debit Card' | 'Cash' | 'Digital Wallet';
  recurring?: boolean;
}

export interface CategoryBudget {
  category: ExpenseCategory;
  allocatedAmount: number;
  spentAmount: number;
  aiSuggestedLimit?: number;
  aiNote?: string;
}

export interface SavingGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
  category: 'Emergency Fund' | 'Education' | 'Vacation' | 'Home / Rent' | 'Investments' | 'Big Purchase';
  priority: 'high' | 'medium' | 'low';
  monthlyContribution: number;
}

export interface FinancialHealthScore {
  score: number; // 0 - 100
  grade: 'A+ (Flourishing)' | 'A (Strong)' | 'B (Healthy)' | 'C (Cautious)' | 'D (At Risk)';
  savingsRate: number; // percentage e.g. 24%
  essentialRatio: number; // percentage of income spent on essentials
  discretionaryRatio: number; // percentage spent on wants
  emergencyRunwayMonths: number; // months living expenses covered
  overspendingAlerts: string[];
  keyStrengths: string[];
  immediateActions: string[];
}

export interface UserPersonaProfile {
  id: PersonaType;
  name: string;
  roleTitle: string;
  avatar: string;
  scenarioTag: string;
  monthlyBaseIncome: number;
  currency: string;
  description: string;
  keyChallenges: string[];
  recommendedStrategy: string;
  typicalCategories: ExpenseCategory[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  quickPrompts?: string[];
  categoryTags?: string[];
  actionSuggestion?: {
    type: 'adjust_budget' | 'add_saving_goal' | 'review_expenses' | 'generate_report';
    label: string;
    payload?: any;
  };
}

export interface MonthlyFinancialReport {
  reportId: string;
  monthYear: string;
  personaName: string;
  totalIncome: number;
  totalExpenses: number;
  netSavings: number;
  savingsRate: number;
  overspendingAreas: {
    category: ExpenseCategory;
    budget: number;
    actual: number;
    variance: number;
    advice: string;
  }[];
  categoryBreakdown: {
    category: ExpenseCategory;
    amount: number;
    percentage: number;
    isEssential: boolean;
  }[];
  aiExecutiveSummary: string;
  actionableSavingSuggestions: string[];
  nextMonthTargets: {
    incomeGoal: number;
    spendingCap: number;
    targetSavings: number;
    primaryFocus: string;
  };
  generatedAt: string;
}
