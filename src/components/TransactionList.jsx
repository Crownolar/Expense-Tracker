import { Trash2, Calendar } from "lucide-react";

const TransactionList = ({ transactions, filter, setFilter, onDelete }) => {
  const filtered = transactions.filter((t) =>
    filter === "all" ? true : t.type === filter
  );

  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  return (
    <div className="bg-slate-800 rounded-lg sm:rounded-xl shadow-lg p-5">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-5 gap-3">
        <h2 className="text-lg font-bold text-white">Transaction History</h2>
        <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {["all", "income", "expense"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize ${
                filter === f
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-slate-700 text-slate-300 hover:bg-slate-600"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {filtered.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-slate-400">
              No transactions yet. Add your first transaction!
            </p>
          </div>
        ) : (
          filtered.map((t) => (
            <div
              key={t.id}
              className={`bg-slate-700/50 backdrop-blur-sm rounded-lg p-4 border-l-4 ${
                t.type === "income"
                  ? "border-green-500 hover:bg-green-900/20"
                  : "border-red-500 hover:bg-red-900/20"
              } transition-all`}
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        t.type === "income"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {t.category}
                    </span>
                    <span className="text-slate-400 text-xs flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(t.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <p className="text-white font-medium text-sm sm:text-base truncate">
                    {t.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 justify-between sm:justify-end w-full sm:w-auto">
                  <span
                    className={`text-lg font-bold ${
                      t.type === "income" ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {t.type === "income" ? "+" : "-"}
                    {formatCurrency(t.amount)}
                  </span>
                  <button
                    onClick={() => onDelete(t.id)}
                    className="bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white p-2 rounded-lg transition-all"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TransactionList;
