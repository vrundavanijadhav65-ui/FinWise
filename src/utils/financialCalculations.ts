import {
  Transaction,
  CategoryBudget,
  SavingGoal,
  FinancialHealthScore,
  ExpenseCategory,
  MonthlyFinancialReport
} from '../types';

export function calculateFinancialMetrics(
  transactions: Transaction[],
  budgets: CategoryBudget[],
  savingsGoals: SavingGoal[],
  baseIncome?: number
) {
  const incomeTx = transactions.filter((t) => t.type === 'income');
  const expenseTx = transactions.filter((t) => t.type === 'expense');

  const totalLoggedIncome = incomeTx.reduce((sum, t) => sum + t.amount, 0);
  const totalIncome = totalLoggedIncome > 0 ? totalLoggedIncome : (baseIncome || 0);

  const totalExpenses = expenseTx.reduce((sum, t) => sum + t.amount, 0);
  const essentialExpenses = expenseTx
    .filter((t) => t.isEssential)
    .reduce((sum, t) => sum + t.amount, 0);
  const discretionaryExpenses = expenseTx
    .filter((t) => !t.isEssential)
    .reduce((sum, t) => sum + t.amount, 0);

  const netSavings = Math.max(0, totalIncome - totalExpenses);
  const savingsRate = totalIncome > 0 ? Math.round((netSavings / totalIncome) * 100) : 0;

  // Category totals
  const categoryMap = new Map<string, { spent: number; isEssential: boolean }>();
  expenseTx.forEach((tx) => {
    const existing = categoryMap.get(tx.category) || { spent: 0, isEssential: tx.isEssential };
    categoryMap.set(tx.category, {
      spent: existing.spent + tx.amount,
      isEssential: tx.isEssential
    });
  });

  const categoryBreakdown = Array.from(categoryMap.entries()).map(([cat, val]) => ({
    category: cat as ExpenseCategory,
    amount: val.spent,
    percentage: totalExpenses > 0 ? Math.round((val.spent / totalExpenses) * 100) : 0,
    isEssential: val.isEssential
  })).sort((a, b) => b.amount - a.amount);

  // Overspending categories
  const overspentCategories = budgets
    .filter((b) => b.spentAmount > b.allocatedAmount)
    .map((b) => ({
      category: b.category,
      budget: b.allocatedAmount,
      actual: b.spentAmount,
      variance: b.spentAmount - b.allocatedAmount,
      percentage: Math.round(((b.spentAmount - b.allocatedAmount) / b.allocatedAmount) * 100)
    }))
    .sort((a, b) => b.variance - a.variance);

  // Emergency savings total
  const emergencySaved = savingsGoals
    .filter((g) => g.category === 'Emergency Fund')
    .reduce((sum, g) => sum + g.currentAmount, 0);

  const monthlyAverageExpense = totalExpenses > 0 ? totalExpenses : 2000;
  const emergencyRunwayMonths = Number((emergencySaved / monthlyAverageExpense).toFixed(1));

  // Calculate Health Score
  let score = 50; // base

  // 1. Savings rate component (up to +25)
  if (savingsRate >= 25) score += 25;
  else if (savingsRate >= 20) score += 20;
  else if (savingsRate >= 15) score += 15;
  else if (savingsRate >= 10) score += 10;
  else if (savingsRate >= 5) score += 5;
  else score -= 10;

  // 2. Essential ratio (50% target is ideal)
  const essentialRatio = totalIncome > 0 ? Math.round((essentialExpenses / totalIncome) * 100) : 60;
  if (essentialRatio <= 55) score += 15;
  else if (essentialRatio <= 65) score += 10;
  else if (essentialRatio <= 80) score += 0;
  else score -= 15;

  // 3. Emergency Runway (3-6 months is healthy)
  if (emergencyRunwayMonths >= 6) score += 15;
  else if (emergencyRunwayMonths >= 3) score += 10;
  else if (emergencyRunwayMonths >= 1) score += 5;
  else score -= 10;

  // 4. Overspending penalty
  if (overspentCategories.length === 0) score += 10;
  else if (overspentCategories.length === 1) score -= 5;
  else score -= 15;

  // Cap between 15 and 99
  const finalScore = Math.min(99, Math.max(18, score));

  let grade: FinancialHealthScore['grade'] = 'B (Healthy)';
  if (finalScore >= 88) grade = 'A+ (Flourishing)';
  else if (finalScore >= 78) grade = 'A (Strong)';
  else if (finalScore >= 65) grade = 'B (Healthy)';
  else if (finalScore >= 50) grade = 'C (Cautious)';
  else grade = 'D (At Risk)';

  const alerts: string[] = [];
  if (overspentCategories.length > 0) {
    alerts.push(
      `Over-budget in ${overspentCategories.map((o) => `${o.category} (+$${o.variance})`).join(', ')}`
    );
  }
  if (discretionaryExpenses > totalExpenses * 0.4) {
    alerts.push('Discretionary spending exceeds 40% of total outflows this month.');
  }
  if (emergencyRunwayMonths < 3) {
    alerts.push(`Emergency fund buffer currently at ${emergencyRunwayMonths} mo (Recommended: 3–6 mo).`);
  }

  const strengths: string[] = [];
  if (savingsRate >= 20) strengths.push(`Solid ${savingsRate}% savings rate ahead of national averages.`);
  if (emergencyRunwayMonths >= 3) strengths.push(`Healthy emergency reserve covering ${emergencyRunwayMonths} months.`);
  if (essentialExpenses <= totalIncome * 0.5) strengths.push('Essentials well balanced under 50% guideline.');

  const immediateActions: string[] = [];
  if (overspentCategories.length > 0) {
    immediateActions.push(`Freeze non-essential swipes in ${overspentCategories[0].category} for the remainder of the cycle.`);
  }
  immediateActions.push('Automate recurring transfer of surplus directly into high-yield savings.');
  immediateActions.push('Audit recurring subscriptions and app memberships for redundant charges.');

  const healthScore: FinancialHealthScore = {
    score: finalScore,
    grade,
    savingsRate,
    essentialRatio,
    discretionaryRatio: totalIncome > 0 ? Math.round((discretionaryExpenses / totalIncome) * 100) : 0,
    emergencyRunwayMonths,
    overspendingAlerts: alerts,
    keyStrengths: strengths,
    immediateActions
  };

  // Run-rate projection: assumes current day of month is roughly day 24 of 30
  const daysInMonth = 30;
  const currentDay = 24;
  const projectedMonthEndExpense = Math.round((totalExpenses / currentDay) * daysInMonth);
  const projectedSavings = Math.max(0, totalIncome - projectedMonthEndExpense);

  return {
    totalIncome,
    totalExpenses,
    essentialExpenses,
    discretionaryExpenses,
    netSavings,
    savingsRate,
    categoryBreakdown,
    overspentCategories,
    emergencySaved,
    emergencyRunwayMonths,
    healthScore,
    projectedMonthEndExpense,
    projectedSavings
  };
}

export function formatCurrency(amount: number, currency = '$'): string {
  return `${currency}${amount.toLocaleString('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })}`;
}

export function generateLocalReport(
  monthYear: string,
  personaName: string,
  metrics: ReturnType<typeof calculateFinancialMetrics>,
  budgets: CategoryBudget[]
): MonthlyFinancialReport {
  const overspendingAreas = metrics.overspentCategories.map((o) => ({
    category: o.category,
    budget: o.budget,
    actual: o.actual,
    variance: o.variance,
    advice: `Trim ${o.category} by cooking more at home, renegotiating plans, or enforcing a weekly ceiling.`
  }));

  const actionableSavingSuggestions = [
    `Redirect at least $${Math.round(metrics.netSavings * 0.4)} towards primary emergency reserve.`,
    metrics.overspentCategories.length > 0
      ? `Caps applied to ${metrics.overspentCategories[0].category} will unlock an immediate $${metrics.overspentCategories[0].variance}/mo margin.`
      : 'Maintain current spending momentum to hit annual savings targets 2 months early.',
    'Implement the 48-hour cool-off rule for any non-essential purchase exceeding $50.',
    'Schedule automated transfers on the day after primary income deposit.'
  ];

  return {
    reportId: `REP-${Date.now().toString(36).toUpperCase()}`,
    monthYear,
    personaName,
    totalIncome: metrics.totalIncome,
    totalExpenses: metrics.totalExpenses,
    netSavings: metrics.netSavings,
    savingsRate: metrics.savingsRate,
    overspendingAreas,
    categoryBreakdown: metrics.categoryBreakdown,
    aiExecutiveSummary: `Monthly fiscal performance is ${metrics.healthScore.grade}. Net positive cashflow stands at ${formatCurrency(metrics.netSavings)} with a ${metrics.savingsRate}% savings capture. ${metrics.overspentCategories.length > 0 ? `Primary leakage detected in ${metrics.overspentCategories.map((c) => c.category).join(', ')}.` : 'All monitored budget categories remained within target thresholds.'}`,
    actionableSavingSuggestions,
    nextMonthTargets: {
      incomeGoal: Math.round(metrics.totalIncome * 1.05),
      spendingCap: Math.round(metrics.totalExpenses * 0.95),
      targetSavings: Math.round(metrics.netSavings * 1.15),
      primaryFocus: metrics.overspentCategories.length > 0 ? `Contain ${metrics.overspentCategories[0].category}` : 'Accelerate Goal Funding'
    },
    generatedAt: new Date().toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  };
}
