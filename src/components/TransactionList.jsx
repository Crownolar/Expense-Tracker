import React from 'react';
import TransactionItem from './TransactionItem';

export default function TransactionList({ transactions, filter, setFilter, onDelete }) {
  const filtered = filter === 'all' ? transactions : transactions.filter(t => t.type === filter);

  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Transaction History</h2>
        <div className="flex gap-2">
          {['all', 'income', 'expense'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-all ${
                filter === f
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2">
        {filtered.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-slate-400">No transactions yet. Add your first transaction!</p>
          </div>
        ) : (
          filtered.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
}
