import { useLocation, useNavigate } from "react-router-dom";
import CountUp from "react-countup";

function Dashboard() {
  const location = useLocation();
  const summary = location.state?.summary;
  const data = summary?.transactionSummary;
  const navigate = useNavigate();

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-xl font-semibold">
          No data available. Please upload a file first.
        </h2>
      </div>
    );
  }

  const categoryList = Object.entries(data.categoryTotals || {});

  // Category colors
  const categoryColors = {
    Food: "bg-red-500",
    Shopping: "bg-purple-500",
    Transport: "bg-yellow-500",
    Bills: "bg-blue-500",
    Entertainment: "bg-pink-500",
    Others: "bg-gray-500",
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 p-8">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">
              Welcome back, Deepanshu
            </h1>
            <p className="text-gray-500">
              Here’s your financial overview
            </p>
          </div>

          <button
            onClick={() => navigate("/upload")}
            className="bg-white border px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Upload Another File
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Income */}
          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-2">Total Income</p>
              <p className="text-3xl font-bold text-green-600">
                ₹<CountUp end={data.totalIncome} duration={1.2} />
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xl">
              ↑
            </div>
          </div>

          {/* Expense */}
          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-2">Total Expense</p>
              <p className="text-3xl font-bold text-red-500">
                ₹<CountUp end={data.totalExpense} duration={1.2} />
              </p>
            </div>
            <div className="w-12 h-12 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-xl">
              ↓
            </div>
          </div>

          {/* Savings */}
          <div className="bg-white/80 backdrop-blur p-6 rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-2">Savings</p>
              <p className="text-3xl font-bold text-blue-600">
                ₹<CountUp end={data.savings} duration={1.2} />
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
              💰
            </div>
          </div>
        </div>

        {/* Category Section */}
        <div>
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Expenses by Category
          </h2>

          {categoryList.length === 0 ? (
            <div className="bg-white p-10 rounded-2xl shadow text-center text-gray-400">
              <div className="text-5xl mb-4">📂</div>
              <p className="text-lg font-medium">
                No category data found
              </p>
              <p className="text-sm">
                Try uploading another statement
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {categoryList.map(([category, amount]) => {
                const totalExpense = data.totalExpense || 1;
                 const totalIncome = data.totalIncome || 1;
                const percent = Math.round((amount / (totalExpense+totalIncome)) * 100);

                return (
                  <div
                    key={category}
                    className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
                  >
                    {/* Top Row */}
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-3">
                        {/* Icon circle */}
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
                          {category.charAt(0)}
                        </div>

                        <span className="font-semibold text-gray-800">
                          {category}
                        </span>
                      </div>

                      <div className="text-right">
                        <p className="font-bold text-gray-800">
                          ₹{amount}
                        </p>
                        <p className="text-xs text-gray-400">
                          {percent}%
                        </p>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-200 rounded-full">
                      <div
                        className={`h-2 rounded-full transition-all duration-700 ${
                          categoryColors[category] || "bg-blue-500"
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
