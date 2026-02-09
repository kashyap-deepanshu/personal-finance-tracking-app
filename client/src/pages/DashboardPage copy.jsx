import { useLocation } from "react-router-dom";

function Dashboard() {
  const location = useLocation();
  const summary = location.state?.summary;
  const data = summary?.transactionSummary;

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-xl font-semibold">
          No data available. Please upload a file first.
        </h2>
      </div>
    );
  }

  // categories ko array me convert karna
  const categoryList = Object.entries(data.categoryTotals || {});

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-8">
        Expense Dashboard
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Income</h2>
          <p className="text-2xl font-bold text-green-600">
            ₹{data.totalIncome}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Total Expense</h2>
          <p className="text-2xl font-bold text-red-600">
            ₹{data.totalExpense}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-gray-500">Savings</h2>
          <p className="text-2xl font-bold text-blue-600">
            ₹{data.savings}
          </p>
        </div>
      </div>

      {/* Category Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">
          Expenses by Category
        </h2>

        <div className="max-w-md">
          {categoryList.length === 0 ? (
            <p className="text-gray-500">
              No category data available.
            </p>
          ) : (
            categoryList.map(([category, amount]) => (
              <div
                key={category}
                className="flex justify-between bg-white p-4 rounded-lg shadow mb-3"
              >
                <span className="font-medium">
                  {category}
                </span>
                <span className="font-bold">
                  ₹{amount}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
