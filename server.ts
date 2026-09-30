import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Google GenAI client if GEMINI_API_KEY is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  } catch (err) {
    console.warn('Warning: Failed to initialize GoogleGenAI client:', err);
  }
}

// ----------------------------------------------------
// API: /api/gemini/advisor (Chat & Financial Guidance)
// ----------------------------------------------------
app.post('/api/gemini/advisor', async (req: Request, res: Response) => {
  const { userMessage, persona, financialSummary, chatHistory } = req.body;

  if (!userMessage) {
    res.status(400).json({ error: 'userMessage is required' });
    return;
  }

  // Fallback response generator if API key is missing or model fails
  const generateFallbackResponse = (query: string): string => {
    const q = query.toLowerCase();
    if (q.includes('overspend') || q.includes('cut') || q.includes('save money')) {
      return `### 💡 Actionable Overspending Reduction Plan\n\nBased on your logged numbers:\n- **Immediate Cut:** Look at your highest discretionary category (often Dining & Takeout or Subscriptions). Trimming just 2 meal deliveries per week typically recovers **$120 - $180/month**.\n- **The 48-Hour Rule:** For impulse online purchases over $40, pause for 48 hours before checking out.\n- **Automate First:** Move your targeted savings amount immediately upon receiving income rather than waiting for month-end leftovers.\n- **Weekly Micro-Budgets:** Break down your monthly spending into weekly allowance envelopes so you know your exact daily run-rate.`;
    }
    if (q.includes('50/30/20') || q.includes('budget plan') || q.includes('rule')) {
      return `### 📊 50/30/20 Framework Breakdown\n\nFor your current income profile:\n1. **50% Needs (Essentials):** Housing, groceries, primary utilities, and minimum debt payments.\n2. **30% Wants (Discretionary):** Dining out, entertainment, hobbies, and shopping.\n3. **20% Savings & Debt Acceleration:** Emergency fund deposits, retirement accounts, and extra debt principal payments.\n\n*Pro-tip:* If you are a freelancer or student, consider adapting to a **60/20/20** or **70/20/10** distribution to protect essential baseline living expenses.`;
    }
    if (q.includes('freelance') || q.includes('variable') || q.includes('irregular')) {
      return `### 💼 Freelance & Variable Income Playbook\n\n1. **Establish a Baseline Paycheck:** Calculate your lowest earning month in the last 12 months. Treat that as your fixed monthly salary.\n2. **The 3-Account Rule:** All client invoices flow into a Business/Holding account. Automatically siphon 25-30% to a Tax Vault, pay yourself your baseline salary, and retain surplus in an Irregular Income Buffer.\n3. **6-Month Emergency Cushion:** Non-negotiable for independent professionals to withstand delayed client net-30/net-60 invoices.`;
    }
    if (q.includes('student') || q.includes('allowance') || q.includes('college')) {
      return `### 🎓 Student Financial Discipline Strategy\n\n1. **Maximize Student Discounts:** Never pay retail for software (GitHub Student Pack, Spotify Student, Amazon Prime Student) or local transit passes.\n2. **Meal Prep Over Campus Cafes:** Campus smoothies and takeout eat through allowances rapidly. Preparing lunches saves upwards of $150/month.\n3. **Sell Past Semester Materials:** Liquidate textbooks and course packs right after finals to replenish next term’s book fund.`;
    }
    if (q.includes('household') || q.includes('family')) {
      return `### 🏡 Household Budgeting & Wealth Strategy\n\n1. **Categorical Grocery Caps:** Groceries represent the most elastic household cost. Create a weekly meal calendar and stick strictly to a digital shopping list.\n2. **Sinking Funds for Kids & Home Repairs:** Create dedicated sub-accounts for vehicle maintenance, pediatric checkups, and school activity fees.\n3. **Bi-Weekly Budget Sync:** A quick 10-minute check-in with your partner every two weeks keeps joint financial priorities aligned.`;
    }
    return `### 🤖 Financial Advisor Assessment\n\nThank you for reaching out! Looking closely at your financial profile:\n- **Cashflow Status:** You are currently sustaining positive cashflow with active savings tracking.\n- **Primary Recommendation:** Ensure your automated recurring savings transfer is executed on your primary income date.\n- **Next Milestone:** Keep daily discretionary expenses under your category caps to build your emergency buffer faster.\n\nAsk me anytime to analyze overspending, generate next month's budget, or calculate your emergency runway!`;
  };

  if (!ai) {
    res.json({ reply: generateFallbackResponse(userMessage) });
    return;
  }

  try {
    const prompt = `You are "Personal Finance Advisor Bot", a world-class certified financial planner and supportive AI coach.
User Persona: ${persona?.name || 'User'} (${persona?.roleTitle || 'Individual'}, Persona Type: ${persona?.id || 'standard'})
Monthly Baseline Income: $${financialSummary?.totalIncome || 0}
Total Monthly Expenses: $${financialSummary?.totalExpenses || 0}
Net Monthly Savings: $${financialSummary?.netSavings || 0} (Savings Rate: ${financialSummary?.savingsRate || 0}%)
Health Score: ${financialSummary?.healthScore?.score || 'N/A'}/100 (${financialSummary?.healthScore?.grade || 'Healthy'})
Emergency Runway: ${financialSummary?.emergencyRunwayMonths || 0} months
Overspent Categories: ${JSON.stringify(financialSummary?.overspentCategories || [])}
Category Breakdown: ${JSON.stringify(financialSummary?.categoryBreakdown || [])}
Recent User Query: "${userMessage}"

Provide a structured, engaging, and highly practical financial response:
- Use clear markdown formatting with headers, bullet points, and bold key numbers.
- Provide concrete calculations tailored to their specific income and numbers.
- Include 2-3 immediate high-impact action steps.
- Keep the tone encouraging, professional, and empowering.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt
    });

    const reply = response.text || generateFallbackResponse(userMessage);
    res.json({ reply });
  } catch (error) {
    console.error('Gemini Advisor API Error:', error);
    res.json({ reply: generateFallbackResponse(userMessage) });
  }
});

// ----------------------------------------------------
// API: /api/gemini/budget-plan (Automated Budget Plan)
// ----------------------------------------------------
app.post('/api/gemini/budget-plan', async (req: Request, res: Response) => {
  const { persona, totalIncome, currentBudgets, currentExpenses } = req.body;

  const fallbackPlan = {
    planName: `${persona?.roleTitle || 'Personal'} Optimized Budget Plan`,
    framework: persona?.id === 'student' ? 'Envelope Micro-Budget (70/20/10)' : persona?.id === 'freelancer' ? 'Variable Cashflow Buffer Plan' : '50/30/20 Rule',
    monthlyIncomeTarget: totalIncome || 5000,
    totalAllocatedBudget: Math.round((totalIncome || 5000) * 0.8),
    recommendedEmergencySavings: Math.round((totalIncome || 5000) * 0.2),
    categories: (currentBudgets || []).map((b: any) => ({
      category: b.category,
      suggestedLimit: b.allocatedAmount,
      currentSpent: b.spentAmount,
      rational: `Optimized allocation for ${b.category} based on historical spending pace.`
    })),
    strategicHighlights: [
      'Automate 20% of net deposits directly into high-yield savings vault.',
      'Cap non-essential dining and leisure at recommended maximums.',
      'Maintain flexible 5% miscellaneous contingency cushion.'
    ]
  };

  if (!ai) {
    res.json(fallbackPlan);
    return;
  }

  try {
    const prompt = `Generate a personalized, mathematically sound monthly budget plan for:
Persona: ${persona?.name} (${persona?.roleTitle}, Type: ${persona?.id})
Monthly Income: $${totalIncome}
Current Category Budgets & Spending: ${JSON.stringify(currentBudgets)}
Historical Outflows: ${JSON.stringify(currentExpenses)}

Create realistic recommended limits for each expense category that balance living essentials, discretionary quality-of-life, and aggressive savings progress.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            planName: { type: Type.STRING },
            framework: { type: Type.STRING },
            monthlyIncomeTarget: { type: Type.NUMBER },
            totalAllocatedBudget: { type: Type.NUMBER },
            recommendedEmergencySavings: { type: Type.NUMBER },
            categories: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  suggestedLimit: { type: Type.NUMBER },
                  currentSpent: { type: Type.NUMBER },
                  rational: { type: Type.STRING }
                },
                required: ['category', 'suggestedLimit', 'rational']
              }
            },
            strategicHighlights: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['planName', 'framework', 'categories', 'strategicHighlights']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error) {
    console.error('Gemini Budget Plan API Error:', error);
    res.json(fallbackPlan);
  }
});

// ----------------------------------------------------
// API: /api/gemini/monthly-report (Monthly Summary Report)
// ----------------------------------------------------
app.post('/api/gemini/monthly-report', async (req: Request, res: Response) => {
  const { persona, monthYear, financialSummary } = req.body;

  const fallbackReport = {
    reportTitle: `${monthYear || 'September 2026'} Monthly Financial Summary Report`,
    personaName: persona?.name || 'Personal Finance Member',
    totalIncome: financialSummary?.totalIncome || 5000,
    totalExpenses: financialSummary?.totalExpenses || 3500,
    netSavings: financialSummary?.netSavings || 1500,
    savingsRate: financialSummary?.savingsRate || 30,
    healthGrade: financialSummary?.healthScore?.grade || 'B (Healthy)',
    aiExecutiveSummary: `During ${monthYear || 'this month'}, total revenue reached $${financialSummary?.totalIncome || 5000} against $${financialSummary?.totalExpenses || 3500} in outflows, successfully locking in a ${financialSummary?.savingsRate || 30}% savings rate. Cashflow was managed soundly with clear opportunities to tighten discretionary leakages.`,
    overspendingAudit: (financialSummary?.overspentCategories || []).map((o: any) => ({
      category: o.category,
      varianceAmount: o.variance,
      recommendation: `Trim ${o.category} spending by establishing a weekly cap.`
    })),
    actionableSavingStrategies: [
      'Enforce an immediate weekend dining spend ceiling.',
      'Deposit 50% of monthly net surplus straight into the designated emergency fund.',
      'Review all recurring app & subscription charges for single-use or forgotten items.',
      'Utilize pre-tax or commuter benefits where applicable.'
    ],
    nextMonthTargets: {
      incomeGoal: Math.round((financialSummary?.totalIncome || 5000) * 1.05),
      spendingCap: Math.round((financialSummary?.totalExpenses || 3500) * 0.95),
      savingsGoal: Math.round((financialSummary?.netSavings || 1500) * 1.15),
      primaryMilestone: 'Consolidate 3-Month Emergency Reserve Cushion'
    }
  };

  if (!ai) {
    res.json(fallbackReport);
    return;
  }

  try {
    const prompt = `You are Personal Finance Advisor Bot. Generate a comprehensive, executive Monthly Financial Summary Report for:
Month/Year: ${monthYear}
Persona: ${persona?.name} (${persona?.roleTitle})
Total Income: $${financialSummary?.totalIncome}
Total Expenses: $${financialSummary?.totalExpenses}
Net Savings: $${financialSummary?.netSavings} (${financialSummary?.savingsRate}% savings rate)
Overspent Categories: ${JSON.stringify(financialSummary?.overspentCategories)}
Category Distribution: ${JSON.stringify(financialSummary?.categoryBreakdown)}

Return an insightful executive analysis, auditing overruns, providing 4 tailored saving strategies, and establishing specific next-month targets.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reportTitle: { type: Type.STRING },
            personaName: { type: Type.STRING },
            totalIncome: { type: Type.NUMBER },
            totalExpenses: { type: Type.NUMBER },
            netSavings: { type: Type.NUMBER },
            savingsRate: { type: Type.NUMBER },
            healthGrade: { type: Type.STRING },
            aiExecutiveSummary: { type: Type.STRING },
            overspendingAudit: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  category: { type: Type.STRING },
                  varianceAmount: { type: Type.NUMBER },
                  recommendation: { type: Type.STRING }
                }
              }
            },
            actionableSavingStrategies: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            nextMonthTargets: {
              type: Type.OBJECT,
              properties: {
                incomeGoal: { type: Type.NUMBER },
                spendingCap: { type: Type.NUMBER },
                savingsGoal: { type: Type.NUMBER },
                primaryMilestone: { type: Type.STRING }
              }
            }
          },
          required: [
            'reportTitle',
            'personaName',
            'totalIncome',
            'totalExpenses',
            'netSavings',
            'savingsRate',
            'aiExecutiveSummary',
            'actionableSavingStrategies',
            'nextMonthTargets'
          ]
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error) {
    console.error('Gemini Monthly Report API Error:', error);
    res.json(fallbackReport);
  }
});

// ----------------------------------------------------
// API: /api/gemini/predictive-insights
// ----------------------------------------------------
app.post('/api/gemini/predictive-insights', async (req: Request, res: Response) => {
  const { persona, financialSummary } = req.body;

  const fallback = {
    pacingStatus: 'On Track with Mild Caution',
    projectedMonthEndCashflow: Math.max(0, (financialSummary?.totalIncome || 5000) - (financialSummary?.projectedMonthEndExpense || 3500)),
    riskScore: 'Moderate',
    predictedAnomalies: [
      'Weekend entertainment and dining spending spikes are trending 28% higher than weekday averages.',
      'Utilities are anticipated to rise ~8% in the coming quarter due to seasonal heating.'
    ],
    growthSuggestions: [
      'Consider locking idle savings above your 3-month buffer in high-yield certificates or broad market index funds.',
      'Automate micro-investing rounding rules for debit card purchases.'
    ]
  };

  if (!ai) {
    res.json(fallback);
    return;
  }

  try {
    const prompt = `Provide predictive spending analytics and future cashflow forecasts for ${persona?.roleTitle} with monthly income $${financialSummary?.totalIncome} and current monthly spend $${financialSummary?.totalExpenses}. Identify spending anomalies and future recommendations.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            pacingStatus: { type: Type.STRING },
            projectedMonthEndCashflow: { type: Type.NUMBER },
            riskScore: { type: Type.STRING },
            predictedAnomalies: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            growthSuggestions: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ['pacingStatus', 'projectedMonthEndCashflow', 'riskScore', 'predictedAnomalies', 'growthSuggestions']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json(parsed);
  } catch (error) {
    console.error('Predictive API error:', error);
    res.json(fallback);
  }
});

// ----------------------------------------------------
// Vite / Static Server integration
// ----------------------------------------------------
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
