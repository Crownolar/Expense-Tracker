import React from 'react';
import { Wallet } from 'lucide-react';
import { formatDateTime } from '../utils/formatters';

export default function Header({ currentTime }) {
  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-2xl p-6 mb-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
            <Wallet className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">Expense Tracker</h1>
            <p className="text-blue-100 text-sm">Manage your finances efficiently</p>
          </div>
        </div>
        <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
          <p className="text-white text-sm font-medium">{formatDateTime(currentTime)}</p>
        </div>
      </div>
    </div>
  );
}
