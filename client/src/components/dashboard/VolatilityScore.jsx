function VolatilityScore({ monthlySummary = {} }) {

  const monthlyEntries = Object.entries(monthlySummary);

  if (monthlyEntries.length < 2) return null;

  const expenses = monthlyEntries.map(
    ([, data]) => data.totalExpense || 0
  );

  // ---- Average ----
  const average =
    expenses.reduce((sum, val) => sum + val, 0) / expenses.length;

  // ---- Standard Deviation ----
  const variance =
    expenses.reduce((sum, val) => {
      return sum + Math.pow(val - average, 2);
    }, 0) / expenses.length;

  const standardDeviation = Math.sqrt(variance);

  const volatilityPercent =
    average > 0 ? (standardDeviation / average) * 100 : 0;

  let level = "";
  let color = "";

  if (volatilityPercent < 15) {
    level = "Stable Spending";
    color = "text-green-600 border-green-500";
  } 
  else if (volatilityPercent < 30) {
    level = "Moderate Variation";
    color = "text-amber-600 border-amber-500";
  } 
  else {
    level = "High Volatility";
    color = "text-red-600 border-red-500";
  }

  return (
    <div className={ ` w-full bg-white p-5 rounded-xl shadow mt-6 border-l-4 ${color}`}>
      <p className="text-sm text-gray-500">Expense Volatility Score</p>

      <p className="text-lg font-semibold">
        {volatilityPercent.toFixed(1)}%
      </p>

      <p className="mt-1 font-medium">
        {level}
      </p>

      <p className="text-xs text-gray-500 mt-2">
        Measures how consistent your monthly expenses are.
      </p>
    </div>
  );
}

export default VolatilityScore;
