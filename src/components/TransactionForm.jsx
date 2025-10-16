import { Plus } from "lucide-react";

const TransactionForm = ({
  formData,
  setFormData,
  handleSubmit,
  categories,
}) => {
  return (
    <div className="bg-slate-800 rounded-lg sm:rounded-xl shadow-lg p-5">
      <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
        <Plus className="w-5 h-5" /> Add Transaction
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-2">
          {["income", "expense"].map((type) => (
            <button
              type="button"
              key={type}
              onClick={() => setFormData({ ...formData, type, category: "" })}
              className={`py-2 rounded-lg font-medium transition-all ${
                formData.type === type
                  ? type === "income"
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-red-600 text-white shadow-lg"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>

        <input
          type="text"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Description"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="number"
          step="0.01"
          value={formData.amount}
          onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
          placeholder="Amount ($)"
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={formData.category}
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Select category</option>
          {categories[formData.type].map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-2.5 rounded-lg transition-all shadow-lg"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;
