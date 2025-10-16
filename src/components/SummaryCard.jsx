import React from 'react';

export default function SummaryCard({ title, amount, icon: Icon, gradient }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-xl shadow-lg p-6`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-white/70 mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{amount}</p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
}
