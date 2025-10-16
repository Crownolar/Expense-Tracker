import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import Header from './components/Header';
import SummaryCard from './components/SummaryCard';
import TransactionForm from './components/TransactionForm';
import TransactionList from './components/TransactionList';
import { formatCurrency } from './utils/formatters';

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'income', description: 'Salary', amount: 5000, date: '2025-10-01', category: 'Salary' },
    { id: 2, type: 'expense', description: 'Groceries', amount: 150, date: '2025-10-05', category: 'Food' },
    { id: 3, type: 'expense', description: 'Electric Bill', amount: 80, date: '2025-10-08', category: 'Utilities' },
  ]);

  const [formData, setFormData] = useState({
    type: 'expense',
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    category: '',
  });

  const [filter, setFilter] = useState('all');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const totals = {
    income: transactions.filter(t => t.type === 'income').reduce((a, b) => a + b.amount, 0),
    expense: transactions.filter(t => t.type === 'expense').reduce((a, b) => a + b.amount, 0),
  };
  totals.balance = totals.income - totals.expense;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) {
      alert('Please fill in all fields');
      return;
    }
    const newTransaction = { id: Date.now(), ...formData, amount: parseFloat(formData.amount) };
    setTransactions([newTransaction, ...transactions]);
    setFormData({
      type: 'expense',
      description: '',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      category: '',
    });
  };

  const deleteTransaction = (id) => setTransactions(transactions.filter(t => t.id !== id));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <Header currentTime={currentTime} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <SummaryCard title="Total Income" amount={formatCurrency(totals.income)} icon={TrendingUp} gradient="from-green-500 to-emerald-600" />
          <SummaryCard title="Total Expenses" amount={formatCurrency(totals.expense)} icon={TrendingDown} gradient="from-red-500 to-rose-600" />
          <SummaryCard
            title="Balance"
            amount={formatCurrency(totals.balance)}
            icon={DollarSign}
            gradient={totals.balance >= 0 ? 'from-blue-500 to-indigo-600' : 'from-orange-500 to-red-600'}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <TransactionForm formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} />
          <div className="lg:col-span-2">
            <TransactionList transactions={transactions} filter={filter} setFilter={setFilter} onDelete={deleteTransaction} />
          </div>
        </div>
      </div>
    </div>
  );
}
