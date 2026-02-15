function MonthDrillDown({ month, data }) {

  if (!data) return null;

  const { totalExpense, savings, categoryTotals = {} } = data;

  const sortedCategories = Object.entries(categoryTotals)
    .sort((a, b) => b[1] - a[1]);

  const formatMonthLabel = (monthKey) => {
    const [year, month] = monthKey.split("-");
    const date = new Date(year, month - 1);

    return date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white mt-10 p-8 rounded-3xl shadow border border-gray-100">

      <h3 className="text-xl font-semibold text-gray-800 mb-4">
        {formatMonthLabel(month)} Breakdown
      </h3>

      {/* Summary Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-red-50 p-4 rounded-xl">
          <p className="text-sm text-gray-500">Total Expense</p>
          <p className="text-lg font-bold text-red-600">
            ₹{totalExpense?.toLocaleString()}
          </p>
        </div>

        <div className="bg-green-50 p-4 rounded-xl">
          <p className="text-sm text-gray-500">Savings</p>
          <p className="text-lg font-bold text-green-600">
            ₹{savings?.toLocaleString()}
          </p>
        </div>
      </div>

      {/* Category Table */}
      <div className="space-y-3">
        {sortedCategories.map(([category, value]) => (
          <div
            key={category}
            className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
          >
            <span className="capitalize text-gray-700">
              {category}
            </span>
            <span className="font-medium">
              ₹{value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
}

export default MonthDrillDown;
