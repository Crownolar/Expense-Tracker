import React from 'react';
import { Calendar, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/formatters';

export default function TransactionItem({ transaction, onDelete }) {
  return (
    <div
      className={`bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border-l-4 ${
        transaction.type === 'income'
          ? 'border-green-500 hover:bg-green-900/20'
          : 'border-red-500 hover:bg-red-900/20'
      } transition-all hover:shadow-lg`}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold ${
                transaction.type === 'income'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {transaction.category}
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {new Date(transaction.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>
          <p className="text-white font-medium text-lg">{transaction.description}</p>
        </div>

        <div className="flex items-center gap-4">
          <span
            className={`text-2xl font-bold ${
              transaction.type === 'income' ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {transaction.type === 'income' ? '+' : '-'}
            {formatCurrency(transaction.amount)}
          </span>
          <button
            onClick={() => onDelete(transaction.id)}
            className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white p-2 rounded-lg transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
