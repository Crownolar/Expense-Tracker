import { Wallet, TrendingUp, TrendingDown, DollarSign } from "lucide-react";
import Header from "./components/Header";
import SummaryCard from "./components/SummaryCard";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";
import { useEffect, useState } from "react";

const ExpenseTracker = () => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    type: "expense",
    description: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    category: "",
  });

  const [filter, setFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const categories = {
    income: ["Salary", "Freelance", "Investment", "Business", "Other"],
    expense: [
      "Food",
      "Transport",
      "Utilities",
      "Entertainment",
      "Healthcare",
      "Shopping",
      "Other",
    ],
  };

  const calculateTotals = () => {
    const income = transactions
      .filter((t) => t.type === "income")
      .reduce((a, b) => a + b.amount, 0);
    const expense = transactions
      .filter((t) => t.type === "expense")
      .reduce((a, b) => a + b.amount, 0);
    return { income, expense, balance: income - expense };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount || !formData.category) {
      alert("Please fill in all fields");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
    };

    setTransactions([newTransaction, ...transactions]);
    setFormData({
      type: "expense",
      description: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      category: "",
    });
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const totals = calculateTotals();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <Header currentTime={currentTime} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-6">
          <SummaryCard
            title="Total Income"
            amount={totals.income}
            icon={TrendingUp}
            gradient="from-green-500 to-emerald-600"
          />
          <SummaryCard
            title="Total Expenses"
            amount={totals.expense}
            icon={TrendingDown}
            gradient="from-red-500 to-rose-600"
          />
          <SummaryCard
            title="Balance"
            amount={totals.balance}
            icon={DollarSign}
            gradient={
              totals.balance >= 0
                ? "from-blue-500 to-indigo-600"
                : "from-orange-500 to-red-600"
            }
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <TransactionForm
            formData={formData}
            setFormData={setFormData}
            handleSubmit={handleSubmit}
            categories={categories}
          />
          <div className="lg:col-span-2">
            <TransactionList
              transactions={transactions}
              filter={filter}
              setFilter={setFilter}
              onDelete={deleteTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseTracker;
