import React, { useState } from 'react';
import { X, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Transaction, ExpenseCategory, IncomeCategory } from '../types';

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTransaction: (tx: Omit<Transaction, 'id'>) => void;
  currency?: string;
}

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  onAddTransaction,
  currency = '$'
}) => {
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [amount, setAmount] = useState<number | ''>('');
  const [category, setCategory] = useState<string>('Food & Groceries');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [isEssential, setIsEssential] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<Transaction['paymentMethod']>('Credit Card');
  const [recurring, setRecurring] = useState(false);

  if (!isOpen) return null;

  const expenseCategories: ExpenseCategory[] = [
    'Housing & Rent',
    'Food & Groceries',
    'Dining & Takeout',
    'Transportation',
    'Utilities & Bills',
    'Healthcare & Wellness',
    'Education & Learning',
    'Entertainment & Subscriptions',
    'Shopping & Personal',
    'Family & Childcare',
    'Work & Freelance Tools',
    'Emergency & Miscellaneous'
  ];

  const incomeCategories: IncomeCategory[] = [
    'Monthly Salary',
    'Freelance / Client Invoicing',
    'Monthly Allowance / Stipend',
    'Family Shared Income',
    'Bonus & Commissions',
    'Investments & Dividends',
    'Side Hustle',
    'Other Income'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0 || !description.trim()) return;

    onAddTransaction({
      type,
      amount: Number(amount),
      category: category as any,
      date,
      description: description.trim(),
      isEssential: type === 'income' ? true : isEssential,
      paymentMethod,
      recurring
    });

    onClose();
    // Reset fields
    setAmount('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/80 hover:bg-slate-700 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <h2 className="text-xl font-bold text-white mb-1">Log New Transaction</h2>
        <p className="text-xs text-slate-400 mb-6">
          Record cash inflows or categorize daily & weekly expenditures
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          {/* Income vs Expense Toggle */}
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-2xl border border-slate-800">
            <button
              type="button"
              onClick={() => {
                setType('expense');
                setCategory('Food & Groceries');
              }}
              className={`py-2 px-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-1.5 ${
                type === 'expense'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowDownRight className="w-4 h-4 text-rose-400" />
              <span>Log Expense</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setType('income');
                setCategory('Monthly Salary');
              }}
              className={`py-2 px-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-1.5 ${
                type === 'income'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ArrowUpRight className="w-4 h-4 text-emerald-400" />
              <span>Record Income</span>
            </button>
          </div>

          {/* Amount & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs">Amount ({currency})</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                required
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white font-bold text-base focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs">Transaction Date</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-slate-300 font-semibold mb-1 text-xs">Description / Merchant</label>
            <input
              type="text"
              required
              placeholder={type === 'income' ? 'e.g. Client Wire / Tech Payroll' : 'e.g. Whole Foods Groceries, Uber commute, Netflix'}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {/* Category & Payment Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
              >
                {type === 'expense'
                  ? expenseCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))
                  : incomeCategories.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
              </select>
            </div>

            <div>
              <label className="block text-slate-300 font-semibold mb-1 text-xs">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 text-xs"
              >
                <option value="Credit Card">Credit Card</option>
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Debit Card">Debit Card</option>
                <option value="Digital Wallet">Digital Wallet (Apple/Google Pay)</option>
                <option value="Cash">Cash</option>
              </select>
            </div>
          </div>

          {/* Essential vs Discretionary (Only for expenses) */}
          {type === 'expense' && (
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="block text-slate-300 font-semibold mb-2 text-xs">
                Budget Framework Nature (50/30/20)
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsEssential(true)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                    isEssential
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Essential Need (50%)
                </button>
                <button
                  type="button"
                  onClick={() => setIsEssential(false)}
                  className={`py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                    !isEssential
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Discretionary Want (30%)
                </button>
              </div>
            </div>
          )}

          {/* Recurring monthly flag */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="recurring-check"
              checked={recurring}
              onChange={(e) => setRecurring(e.target.checked)}
              className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
            />
            <label htmlFor="recurring-check" className="text-xs text-slate-400 cursor-pointer select-none">
              Mark as recurring monthly transaction (e.g. salary, rent, subscription)
            </label>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end gap-2 pt-4 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all active:scale-95 cursor-pointer"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
