function AdvancedInsights({ monthlySummary = {} }) {

  const monthlyEntries = Object.entries(monthlySummary);
  if (monthlyEntries.length === 0) return null;

  const totalMonths = monthlyEntries.length;

  const totalExpenseSum = monthlyEntries.reduce(
    (sum, [, data]) => sum + (data.totalExpense || 0),
    0
  );

  const totalSavingsSum = monthlyEntries.reduce(
    (sum, [, data]) => sum + (data.savings || 0),
    0
  );

  const averageExpense =
    totalMonths > 0 ? totalExpenseSum / totalMonths : 0;

  const averageSavings =
    totalMonths > 0 ? totalSavingsSum / totalMonths : 0;

  const sortedMonths = monthlyEntries
    .sort((a, b) => new Date(a[0]) - new Date(b[0]));

  let expenseGrowthPercent = 0;

  if (sortedMonths.length >= 2) {
    const lastMonth = sortedMonths[sortedMonths.length - 1][1];
    const prevMonth = sortedMonths[sortedMonths.length - 2][1];

    const prevExpense = prevMonth.totalExpense || 0;
    const currentExpense = lastMonth.totalExpense || 0;

    if (prevExpense > 0) {
      expenseGrowthPercent =
        ((currentExpense - prevExpense) / prevExpense) * 100;
    }
  }

  const isGrowthPositive = expenseGrowthPercent >= 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

      {/* Average Expense */}
      <div className="bg-gradient-to-br from-amber-50 to-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-amber-100">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Average Monthly Expense
          </p>
          <span className="text-2xl">💸</span>
        </div>

        <p className="text-2xl mt-3 font-bold text-amber-600 tracking-wide">
          ₹{averageExpense.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          Based on {totalMonths} months
        </p>
      </div>


      {/* Average Savings */}
      <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-indigo-100">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Average Monthly Savings
          </p>
          <span className="text-2xl">💰</span>
        </div>

        <p className="text-2xl mt-3 font-bold text-indigo-600 tracking-wide">
          ₹{averageSavings.toLocaleString(undefined, {
            maximumFractionDigits: 0,
          })}
        </p>

        <p className="text-xs text-gray-400 mt-2">
          Consistent savings insight
        </p>
      </div>


      {/* Expense Growth */}
      <div
        className={`bg-gradient-to-br ${
          isGrowthPositive
            ? "from-red-50"
            : "from-green-50"
        } to-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border ${
          isGrowthPositive
            ? "border-red-100"
            : "border-green-100"
        }`}
      >
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Latest Expense Change
          </p>
          <span className="text-2xl">
            {isGrowthPositive ? "📈" : "📉"}
          </span>
        </div>

        <p
          className={`text-2xl mt-3 font-bold ${
            isGrowthPositive
              ? "text-red-500"
              : "text-green-600"
          }`}
        >
          {expenseGrowthPercent.toFixed(1)}%
        </p>

        <p className="text-xs text-gray-400 mt-2">
          Compared to previous month
        </p>
      </div>

    </div>
  );
}

export default AdvancedInsights;
