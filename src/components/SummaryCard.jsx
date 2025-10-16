const SummaryCard = ({ title, amount, icon: Icon, gradient }) => {
  const formatCurrency = (value) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);

  return (
    <div
      className={`bg-gradient-to-br ${gradient} rounded-lg sm:rounded-xl shadow-lg p-4 sm:p-5 md:p-6`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/70 text-sm font-medium mb-1">{title}</p>
          <p className="text-2xl sm:text-3xl font-bold text-white">
            {formatCurrency(amount)}
          </p>
        </div>
        <div className="bg-white/20 backdrop-blur-sm p-3 rounded-lg">
          <Icon className="w-8 h-8 text-white" />
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
