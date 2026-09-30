import {
  UserPersonaProfile,
  Transaction,
  CategoryBudget,
  SavingGoal,
  PersonaType
} from '../types';

export const PERSONA_PROFILES: Record<PersonaType, UserPersonaProfile> = {
  salaried: {
    id: 'salaried',
    name: 'Marcus Vance',
    roleTitle: 'Salaried Software Engineer',
    avatar: '👨‍💼',
    scenarioTag: 'Scenario 1: Salaried Professional',
    monthlyBaseIncome: 5800,
    currency: '$',
    description: 'Receives consistent monthly paychecks. Wants to curb weekend dining overspending, maximize retirement/401(k) contributions, and build a 6-month buffer.',
    keyChallenges: [
      'High discretionary dining and delivery spend',
      'Creeping entertainment subscription costs',
      'Desire to optimize 50/30/20 budget framework'
    ],
    recommendedStrategy: '50/30/20 Smart Rule with automated transfers to high-yield savings on payday.',
    typicalCategories: [
      'Housing & Rent',
      'Food & Groceries',
      'Dining & Takeout',
      'Transportation',
      'Utilities & Bills',
      'Entertainment & Subscriptions',
      'Shopping & Personal'
    ]
  },
  student: {
    id: 'student',
    name: 'Maya Chen',
    roleTitle: 'College Junior (Pre-Med)',
    avatar: '🎓',
    scenarioTag: 'Scenario 2: College Student',
    monthlyBaseIncome: 1100,
    currency: '$',
    description: 'Living on a strict student allowance and tutoring stipend. Needs to prioritize textbooks, meal prep, and shared utilities while building a small graduation cushion.',
    keyChallenges: [
      'Strict fixed monthly allowance of $1,100',
      'Impulse campus snacks and coffee runs',
      'Heavy start-of-semester course material expenses'
    ],
    recommendedStrategy: 'Strict Envelope Micro-Budgeting with $5/day discretionary cap and student meal planning.',
    typicalCategories: [
      'Housing & Rent',
      'Food & Groceries',
      'Education & Learning',
      'Transportation',
      'Entertainment & Subscriptions',
      'Shopping & Personal'
    ]
  },
  freelancer: {
    id: 'freelancer',
    name: 'Devon Patel',
    roleTitle: 'Independent UX Designer',
    avatar: '💻',
    scenarioTag: 'Scenario 3: Freelance Professional',
    monthlyBaseIncome: 4950,
    currency: '$',
    description: 'Earns irregular client project retainers. Needs buffer strategies for lean invoice months, quarterly estimated tax set-asides, and software tool management.',
    keyChallenges: [
      'Fluctuating income ($2,500 in slow months to $7,000 in peak)',
      'Quarterly self-employment tax withholding',
      'SaaS overhead & project travel fluctuations'
    ],
    recommendedStrategy: 'Baseline Average Paycheck method + 30% Tax Vault + 6-month cushion buffer.',
    typicalCategories: [
      'Housing & Rent',
      'Food & Groceries',
      'Work & Freelance Tools',
      'Healthcare & Wellness',
      'Transportation',
      'Utilities & Bills',
      'Shopping & Personal'
    ]
  },
  household: {
    id: 'household',
    name: 'The Rivera Family',
    roleTitle: 'Dual-Earner Family Household',
    avatar: '🏡',
    scenarioTag: 'Scenario 4: Household Manager',
    monthlyBaseIncome: 8600,
    currency: '$',
    description: 'Oversees shared family accounts with 2 working parents and 2 school-age children. Balances mortgage, healthcare, grocery bills, and kids’ college funds.',
    keyChallenges: [
      'Coordinating multi-card household expenditures',
      'Unplanned healthcare copays and seasonal utilities spikes',
      'Balancing summer family vacation with 529 education deposits'
    ],
    recommendedStrategy: 'Consolidated Family Master Ledger with categorical caps on groceries and kids extracurriculars.',
    typicalCategories: [
      'Housing & Rent',
      'Food & Groceries',
      'Utilities & Bills',
      'Healthcare & Wellness',
      'Family & Childcare',
      'Education & Learning',
      'Transportation',
      'Entertainment & Subscriptions'
    ]
  },
  custom: {
    id: 'custom',
    name: 'My Custom Profile',
    roleTitle: 'Personal Financial Plan',
    avatar: '✨',
    scenarioTag: 'Personal Customized Workspace',
    monthlyBaseIncome: 4500,
    currency: '$',
    description: 'Your own custom personal financial setup. Track your real income streams, expenses, and tailored AI recommendations.',
    keyChallenges: [
      'Tracking daily real-world spending',
      'Meeting personal savings milestones',
      'Achieving long-term financial independence'
    ],
    recommendedStrategy: 'Tailored Hybrid Allocation with active AI budget auditing.',
    typicalCategories: [
      'Housing & Rent',
      'Food & Groceries',
      'Transportation',
      'Utilities & Bills',
      'Entertainment & Subscriptions',
      'Shopping & Personal'
    ]
  }
};

export const INITIAL_TRANSACTIONS: Record<PersonaType, Transaction[]> = {
  salaried: [
    {
      id: 'tx-s-1',
      type: 'income',
      amount: 5800,
      category: 'Monthly Salary',
      date: '2026-09-01',
      description: 'Bi-monthly tech payroll (Direct Deposit)',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-s-2',
      type: 'expense',
      amount: 1950,
      category: 'Housing & Rent',
      date: '2026-09-01',
      description: 'Modern 1BR Apartment Rent + Trash Fee',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-s-3',
      type: 'expense',
      amount: 160,
      category: 'Utilities & Bills',
      date: '2026-09-03',
      description: 'High-speed Fiber Internet & Electric power',
      isEssential: true,
      paymentMethod: 'Credit Card',
      recurring: true
    },
    {
      id: 'tx-s-4',
      type: 'expense',
      amount: 420,
      category: 'Food & Groceries',
      date: '2026-09-05',
      description: 'Trader Joe’s weekly bulk grocery run',
      isEssential: true,
      paymentMethod: 'Debit Card'
    },
    {
      id: 'tx-s-5',
      type: 'expense',
      amount: 480,
      category: 'Dining & Takeout',
      date: '2026-09-12',
      description: 'Sushi dinner with team & weekend cocktail lounge',
      isEssential: false,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'tx-s-6',
      type: 'expense',
      amount: 210,
      category: 'Transportation',
      date: '2026-09-14',
      description: 'Monthly Metro card & rideshare to airport',
      isEssential: true,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'tx-s-7',
      type: 'expense',
      amount: 135,
      category: 'Entertainment & Subscriptions',
      date: '2026-09-18',
      description: 'Streaming bundle (Netflix, Spotify, HBO) & Gym club pass',
      isEssential: false,
      paymentMethod: 'Credit Card',
      recurring: true
    },
    {
      id: 'tx-s-8',
      type: 'expense',
      amount: 310,
      category: 'Shopping & Personal',
      date: '2026-09-22',
      description: 'Autumn wardrobe jacket & wireless earbuds',
      isEssential: false,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'tx-s-9',
      type: 'expense',
      amount: 290,
      category: 'Dining & Takeout',
      date: '2026-09-26',
      description: 'DoorDash deliveries & artisanal espresso cafe visits',
      isEssential: false,
      paymentMethod: 'Digital Wallet'
    }
  ],

  student: [
    {
      id: 'tx-st-1',
      type: 'income',
      amount: 750,
      category: 'Monthly Allowance / Stipend',
      date: '2026-09-01',
      description: 'Family monthly educational support allowance',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-st-2',
      type: 'income',
      amount: 350,
      category: 'Side Hustle',
      date: '2026-09-15',
      description: 'Campus Bio-Chemistry peer tutoring stipend',
      isEssential: true,
      paymentMethod: 'Digital Wallet'
    },
    {
      id: 'tx-st-3',
      type: 'expense',
      amount: 480,
      category: 'Housing & Rent',
      date: '2026-09-01',
      description: 'Shared 3-student off-campus apartment rent portion',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-st-4',
      type: 'expense',
      amount: 145,
      category: 'Education & Learning',
      date: '2026-09-04',
      description: 'Digital textbook license & lab manual',
      isEssential: true,
      paymentMethod: 'Debit Card'
    },
    {
      id: 'tx-st-5',
      type: 'expense',
      amount: 190,
      category: 'Food & Groceries',
      date: '2026-09-08',
      description: 'Discount supermarket staple ingredients & ramen',
      isEssential: true,
      paymentMethod: 'Debit Card'
    },
    {
      id: 'tx-st-6',
      type: 'expense',
      amount: 45,
      category: 'Transportation',
      date: '2026-09-10',
      description: 'Subsidized university student bus transit pass',
      isEssential: true,
      paymentMethod: 'Cash'
    },
    {
      id: 'tx-st-7',
      type: 'expense',
      amount: 85,
      category: 'Entertainment & Subscriptions',
      date: '2026-09-16',
      description: 'Student Spotify/Hulu plan & study cafe smoothies with classmates',
      isEssential: false,
      paymentMethod: 'Digital Wallet'
    },
    {
      id: 'tx-st-8',
      type: 'expense',
      amount: 55,
      category: 'Shopping & Personal',
      date: '2026-09-24',
      description: 'Stationery, binder, and personal care pharmacy items',
      isEssential: true,
      paymentMethod: 'Debit Card'
    }
  ],

  freelancer: [
    {
      id: 'tx-f-1',
      type: 'income',
      amount: 2800,
      category: 'Freelance / Client Invoicing',
      date: '2026-09-02',
      description: 'Fintech Mobile App Redesign - Milestone 2 payment',
      isEssential: true,
      paymentMethod: 'Bank Transfer'
    },
    {
      id: 'tx-f-2',
      type: 'income',
      amount: 2150,
      category: 'Freelance / Client Invoicing',
      date: '2026-09-18',
      description: 'Monthly UX Design Retainer (E-Commerce Client)',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-f-3',
      type: 'expense',
      amount: 1650,
      category: 'Housing & Rent',
      date: '2026-09-01',
      description: 'Home Studio Loft Rent (30% tax-deductible office)',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-f-4',
      type: 'expense',
      amount: 240,
      category: 'Work & Freelance Tools',
      date: '2026-09-03',
      description: 'Figma Organization, Adobe CC, GitHub, Claude & Hosting',
      isEssential: true,
      paymentMethod: 'Credit Card',
      recurring: true
    },
    {
      id: 'tx-f-5',
      type: 'expense',
      amount: 380,
      category: 'Healthcare & Wellness',
      date: '2026-09-05',
      description: 'Individual ACA Health & Dental insurance premium',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-f-6',
      type: 'expense',
      amount: 510,
      category: 'Food & Groceries',
      date: '2026-09-11',
      description: 'Weekly healthy home cooking groceries',
      isEssential: true,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'tx-f-7',
      type: 'expense',
      amount: 190,
      category: 'Utilities & Bills',
      date: '2026-09-14',
      description: 'Commercial gigabit internet & electricity',
      isEssential: true,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'tx-f-8',
      type: 'expense',
      amount: 310,
      category: 'Dining & Takeout',
      date: '2026-09-20',
      description: 'Client coffee consultations & networking dinners',
      isEssential: false,
      paymentMethod: 'Credit Card'
    }
  ],

  household: [
    {
      id: 'tx-h-1',
      type: 'income',
      amount: 5100,
      category: 'Monthly Salary',
      date: '2026-09-01',
      description: 'Primary Earner Salary (Senior Project Director)',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-h-2',
      type: 'income',
      amount: 3500,
      category: 'Family Shared Income',
      date: '2026-09-05',
      description: 'Partner Salary (Healthcare Clinic Coordinator)',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-h-3',
      type: 'expense',
      amount: 2750,
      category: 'Housing & Rent',
      date: '2026-09-01',
      description: 'Suburban 3BR Home Mortgage, Escrow & Property Tax',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-h-4',
      type: 'expense',
      amount: 1150,
      category: 'Food & Groceries',
      date: '2026-09-06',
      description: 'Costco bulk food supplies & weekly fresh produce',
      isEssential: true,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'tx-h-5',
      type: 'expense',
      amount: 490,
      category: 'Utilities & Bills',
      date: '2026-09-10',
      description: 'Water, Gas, Electricity, Waste & Family Fiber Internet',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-h-6',
      type: 'expense',
      amount: 820,
      category: 'Family & Childcare',
      date: '2026-09-12',
      description: 'After-school care, gymnastics club & soccer league dues',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-h-7',
      type: 'expense',
      amount: 380,
      category: 'Healthcare & Wellness',
      date: '2026-09-17',
      description: 'Pediatrician visit copays, orthodontic braces check, prescriptions',
      isEssential: true,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'tx-h-8',
      type: 'expense',
      amount: 340,
      category: 'Transportation',
      date: '2026-09-21',
      description: 'Family minivan fuel & toll passes',
      isEssential: true,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'tx-h-9',
      type: 'expense',
      amount: 280,
      category: 'Entertainment & Subscriptions',
      date: '2026-09-25',
      description: 'Weekend family cinema outing & streaming subscriptions',
      isEssential: false,
      paymentMethod: 'Debit Card'
    }
  ],

  custom: [
    {
      id: 'tx-c-1',
      type: 'income',
      amount: 4500,
      category: 'Monthly Salary',
      date: '2026-09-01',
      description: 'Monthly direct deposit salary',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-c-2',
      type: 'expense',
      amount: 1500,
      category: 'Housing & Rent',
      date: '2026-09-01',
      description: 'Monthly apartment rent',
      isEssential: true,
      paymentMethod: 'Bank Transfer',
      recurring: true
    },
    {
      id: 'tx-c-3',
      type: 'expense',
      amount: 450,
      category: 'Food & Groceries',
      date: '2026-09-07',
      description: 'Groceries and weekly pantry staples',
      isEssential: true,
      paymentMethod: 'Debit Card'
    },
    {
      id: 'tx-c-4',
      type: 'expense',
      amount: 220,
      category: 'Transportation',
      date: '2026-09-12',
      description: 'Car fuel and transit tickets',
      isEssential: true,
      paymentMethod: 'Credit Card'
    },
    {
      id: 'tx-c-5',
      type: 'expense',
      amount: 180,
      category: 'Dining & Takeout',
      date: '2026-09-18',
      description: 'Dining out with friends',
      isEssential: false,
      paymentMethod: 'Credit Card'
    }
  ]
};

export const INITIAL_BUDGETS: Record<PersonaType, CategoryBudget[]> = {
  salaried: [
    { category: 'Housing & Rent', allocatedAmount: 2000, spentAmount: 1950, aiSuggestedLimit: 1950, aiNote: 'Ideal rent target is <=35% of take-home pay.' },
    { category: 'Food & Groceries', allocatedAmount: 500, spentAmount: 420, aiSuggestedLimit: 480, aiNote: 'Balanced grocery budget for high-nutrition cooking.' },
    { category: 'Dining & Takeout', allocatedAmount: 400, spentAmount: 770, aiSuggestedLimit: 450, aiNote: 'Warning: 92% over budget due to DoorDash and lounge bar tabs.' },
    { category: 'Transportation', allocatedAmount: 250, spentAmount: 210, aiSuggestedLimit: 230, aiNote: 'On target. Consider pre-tax commuter transit benefit.' },
    { category: 'Utilities & Bills', allocatedAmount: 180, spentAmount: 160, aiSuggestedLimit: 175, aiNote: 'Within normal seasonal range.' },
    { category: 'Entertainment & Subscriptions', allocatedAmount: 150, spentAmount: 135, aiSuggestedLimit: 120, aiNote: 'Audit unused streaming services.' },
    { category: 'Shopping & Personal', allocatedAmount: 300, spentAmount: 310, aiSuggestedLimit: 250, aiNote: 'Slightly high on impulse tech gear.' }
  ],
  student: [
    { category: 'Housing & Rent', allocatedAmount: 500, spentAmount: 480, aiSuggestedLimit: 480, aiNote: 'Fixed shared lease expense.' },
    { category: 'Food & Groceries', allocatedAmount: 220, spentAmount: 190, aiSuggestedLimit: 200, aiNote: 'Excellent frugal grocery allocation.' },
    { category: 'Education & Learning', allocatedAmount: 160, spentAmount: 145, aiSuggestedLimit: 150, aiNote: 'Book expenses peaked at semester start.' },
    { category: 'Transportation', allocatedAmount: 50, spentAmount: 45, aiSuggestedLimit: 45, aiNote: 'Student discount pass is highly cost-effective.' },
    { category: 'Entertainment & Subscriptions', allocatedAmount: 70, spentAmount: 85, aiSuggestedLimit: 60, aiNote: 'Slight overrun from study cafes.' },
    { category: 'Shopping & Personal', allocatedAmount: 60, spentAmount: 55, aiSuggestedLimit: 50, aiNote: 'Under cap. Well controlled.' }
  ],
  freelancer: [
    { category: 'Housing & Rent', allocatedAmount: 1650, spentAmount: 1650, aiSuggestedLimit: 1650, aiNote: '30% is eligible for home-office business writeoff.' },
    { category: 'Work & Freelance Tools', allocatedAmount: 250, spentAmount: 240, aiSuggestedLimit: 250, aiNote: 'Critical business tooling; inspect annual billing discounts.' },
    { category: 'Healthcare & Wellness', allocatedAmount: 400, spentAmount: 380, aiSuggestedLimit: 390, aiNote: 'Crucial health safeguard without employer subsidy.' },
    { category: 'Food & Groceries', allocatedAmount: 550, spentAmount: 510, aiSuggestedLimit: 520, aiNote: 'Consistent healthy home meal habits.' },
    { category: 'Utilities & Bills', allocatedAmount: 200, spentAmount: 190, aiSuggestedLimit: 195, aiNote: 'Broadband is primary business line.' },
    { category: 'Dining & Takeout', allocatedAmount: 250, spentAmount: 310, aiSuggestedLimit: 220, aiNote: 'Categorize business client meals for tax deductions.' }
  ],
  household: [
    { category: 'Housing & Rent', allocatedAmount: 2800, spentAmount: 2750, aiSuggestedLimit: 2750, aiNote: '32% of joint income, within healthy mortgage bounds.' },
    { category: 'Food & Groceries', allocatedAmount: 1100, spentAmount: 1150, aiSuggestedLimit: 1100, aiNote: 'Slightly high; buy seasonal produce and bulk snacks.' },
    { category: 'Family & Childcare', allocatedAmount: 850, spentAmount: 820, aiSuggestedLimit: 850, aiNote: 'Major recurring family investment for 2 children.' },
    { category: 'Utilities & Bills', allocatedAmount: 500, spentAmount: 490, aiSuggestedLimit: 480, aiNote: 'Watch for winter heating thermostat adjustments.' },
    { category: 'Healthcare & Wellness', allocatedAmount: 450, spentAmount: 380, aiSuggestedLimit: 400, aiNote: 'Under budget this month; roll surplus into HSA.' },
    { category: 'Transportation', allocatedAmount: 400, spentAmount: 340, aiSuggestedLimit: 360, aiNote: 'Gasoline and vehicle maintenance.' },
    { category: 'Entertainment & Subscriptions', allocatedAmount: 300, spentAmount: 280, aiSuggestedLimit: 250, aiNote: 'Family activities.' }
  ],
  custom: [
    { category: 'Housing & Rent', allocatedAmount: 1500, spentAmount: 1500, aiSuggestedLimit: 1500, aiNote: 'Base living expense' },
    { category: 'Food & Groceries', allocatedAmount: 500, spentAmount: 450, aiSuggestedLimit: 480, aiNote: 'Nutritional needs' },
    { category: 'Transportation', allocatedAmount: 250, spentAmount: 220, aiSuggestedLimit: 240, aiNote: 'Commute and travel' },
    { category: 'Dining & Takeout', allocatedAmount: 200, spentAmount: 180, aiSuggestedLimit: 190, aiNote: 'Social dining' }
  ]
};

export const INITIAL_SAVINGS_GOALS: Record<PersonaType, SavingGoal[]> = {
  salaried: [
    {
      id: 'sg-s-1',
      title: '6-Month Emergency Vault',
      targetAmount: 18000,
      currentAmount: 12400,
      targetDate: '2027-04-30',
      category: 'Emergency Fund',
      priority: 'high',
      monthlyContribution: 800
    },
    {
      id: 'sg-s-2',
      title: 'Alps Ski Vacation & Gear',
      targetAmount: 3500,
      currentAmount: 2100,
      targetDate: '2026-12-15',
      category: 'Vacation',
      priority: 'medium',
      monthlyContribution: 350
    },
    {
      id: 'sg-s-3',
      title: 'Index Fund Investment Booster',
      targetAmount: 10000,
      currentAmount: 5600,
      targetDate: '2027-08-31',
      category: 'Investments',
      priority: 'high',
      monthlyContribution: 500
    }
  ],
  student: [
    {
      id: 'sg-st-1',
      title: 'Post-Grad Moving & Deposit Fund',
      targetAmount: 2000,
      currentAmount: 750,
      targetDate: '2027-06-01',
      category: 'Emergency Fund',
      priority: 'high',
      monthlyContribution: 100
    },
    {
      id: 'sg-st-2',
      title: 'Next Semester Specialized Medical Lab Kit',
      targetAmount: 500,
      currentAmount: 380,
      targetDate: '2026-12-20',
      category: 'Education',
      priority: 'high',
      monthlyContribution: 60
    }
  ],
  freelancer: [
    {
      id: 'sg-f-1',
      title: 'Irregular Income Buffer (3 Months)',
      targetAmount: 12000,
      currentAmount: 7400,
      targetDate: '2027-03-31',
      category: 'Emergency Fund',
      priority: 'high',
      monthlyContribution: 650
    },
    {
      id: 'sg-f-2',
      title: 'Q4 Estimated Self-Employment Taxes',
      targetAmount: 4200,
      currentAmount: 3850,
      targetDate: '2026-10-15',
      category: 'Big Purchase',
      priority: 'high',
      monthlyContribution: 400
    },
    {
      id: 'sg-f-3',
      title: 'MacBook Pro M-Series Workstation Upgrade',
      targetAmount: 3200,
      currentAmount: 1600,
      targetDate: '2027-02-28',
      category: 'Big Purchase',
      priority: 'medium',
      monthlyContribution: 300
    }
  ],
  household: [
    {
      id: 'sg-h-1',
      title: 'Family Comprehensive Emergency Fund',
      targetAmount: 30000,
      currentAmount: 21500,
      targetDate: '2027-06-30',
      category: 'Emergency Fund',
      priority: 'high',
      monthlyContribution: 1100
    },
    {
      id: 'sg-h-2',
      title: 'Kids 529 College Growth Accounts',
      targetAmount: 15000,
      currentAmount: 8900,
      targetDate: '2028-09-01',
      category: 'Education',
      priority: 'high',
      monthlyContribution: 600
    },
    {
      id: 'sg-h-3',
      title: 'Summer National Parks Road Trip',
      targetAmount: 4500,
      currentAmount: 2700,
      targetDate: '2027-07-01',
      category: 'Vacation',
      priority: 'medium',
      monthlyContribution: 300
    }
  ],
  custom: [
    {
      id: 'sg-c-1',
      title: 'Emergency Rainy Day Fund',
      targetAmount: 5000,
      currentAmount: 2200,
      targetDate: '2027-05-01',
      category: 'Emergency Fund',
      priority: 'high',
      monthlyContribution: 300
    }
  ]
};
