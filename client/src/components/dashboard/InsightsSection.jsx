function InsightsSection({ monthlySummary = {} }) {

  const monthlyEntries = Object.entries(monthlySummary);
  if (monthlyEntries.length === 0) return null;

  const formatMonthLabel = (monthKey) => {
    const [year, month] = monthKey.split("-");
    const date = new Date(year, month - 1);

    return date.toLocaleString("en-US", {
      month: "short",
      year: "numeric",
    });
  };

  let highestExpenseMonth = null;
  let lowestExpenseMonth = null;
  let highestSavingsMonth = null;
  let lowestSavingsMonth = null;

  monthlyEntries.forEach(([month, data]) => {

    if (!highestExpenseMonth || data.totalExpense > highestExpenseMonth.totalExpense) {
      highestExpenseMonth = { month, ...data };
    }

    if (!lowestExpenseMonth || data.totalExpense < lowestExpenseMonth.totalExpense) {
      lowestExpenseMonth = { month, ...data };
    }

    if (!highestSavingsMonth || data.savings > highestSavingsMonth.savings) {
      highestSavingsMonth = { month, ...data };
    }

    if (!lowestSavingsMonth || data.savings < lowestSavingsMonth.savings) {
      lowestSavingsMonth = { month, ...data };
    }

  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

      {/* Highest Expense */}
      <div className="bg-gradient-to-br from-red-50 to-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-red-100">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Highest Expense</p>
          <span className="text-2xl">📈</span>
        </div>
        <p className="font-semibold text-gray-800 mt-2">
          {formatMonthLabel(highestExpenseMonth?.month)}
        </p>
        <p className="text-xl mt-2 font-bold text-red-500">
          ₹{highestExpenseMonth?.totalExpense?.toLocaleString()}
        </p>
      </div>

      {/* Lowest Expense */}
      <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-green-100">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Lowest Expense</p>
          <span className="text-2xl">📉</span>
        </div>
        <p className="font-semibold text-gray-800 mt-2">
          {formatMonthLabel(lowestExpenseMonth?.month)}
        </p>
        <p className="text-xl mt-2 font-bold text-green-600">
          ₹{lowestExpenseMonth?.totalExpense?.toLocaleString()}
        </p>
      </div>

      {/* Highest Savings */}
      <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-indigo-100">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Highest Savings</p>
          <span className="text-2xl">💰</span>
        </div>
        <p className="font-semibold text-gray-800 mt-2">
          {formatMonthLabel(highestSavingsMonth?.month)}
        </p>
        <p className="text-xl mt-2 font-bold text-indigo-600">
          ₹{highestSavingsMonth?.savings?.toLocaleString()}
        </p>
      </div>

      {/* Lowest Savings */}
      <div className="bg-gradient-to-br from-rose-50 to-white p-6 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-rose-100">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">Lowest Savings</p>
          <span className="text-2xl">💸</span>
        </div>
        <p className="font-semibold text-gray-800 mt-2">
          {formatMonthLabel(lowestSavingsMonth?.month)}
        </p>
        <p className="text-xl mt-2 font-bold text-rose-500">
          ₹{lowestSavingsMonth?.savings?.toLocaleString()}
        </p>
      </div>

    </div>
  );
}

export default InsightsSection;
