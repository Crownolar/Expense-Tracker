import React from 'react';
import { Plus } from 'lucide-react';
import { categories } from '../data/categories';

export default function TransactionForm({ formData, setFormData, handleSubmit }) {
  return (
    <div className="bg-slate-800 rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Plus className="w-5 h-5" /> Add Transaction
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Type</label>
          <div className="grid grid-cols-2 gap-2">
            {['income', 'expense'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setFormData({ ...formData, type, category: '' })}
                className={`py-2 px-4 rounded-lg font-medium transition-all ${
                  formData.type === type
                    ? type === 'income'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'bg-red-600 text-white shadow-lg'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <InputField
          label="Description"
          type="text"
          value={formData.description}
          placeholder="Enter description"
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />

        <InputField
          label="Amount ($)"
          type="number"
          value={formData.amount}
          placeholder="0.00"
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
        />

        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select category</option>
            {categories[formData.type].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <InputField
          label="Date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all shadow-lg hover:shadow-xl"
        >
          Add Transaction
        </button>
      </div>
    </div>
  );
}

const InputField = ({ label, type, value, placeholder, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
);
