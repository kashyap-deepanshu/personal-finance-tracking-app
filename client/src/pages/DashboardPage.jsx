import { useLocation } from "react-router-dom";
import { useState } from "react";

import CategorySection from "../components/dashboard/CategorySection";
import VisualInsightSection from "../components/dashboard/VisualInsightSection";
import SummaryCards from "../components/dashboard/SummaryCards";
import Header from "../components/dashboard/Header";
import MonthYearFilter from "../components/dashboard/MonthYearFilter";
import MonthlyComparisonChart from "../components/dashboard/MonthlyComparisonChart";
import InsightsSection from "../components/dashboard/InsightsSection";
import AdvancedInsights from "../components/dashboard/AdvancedInsights";
import SmartAlerts from "../components/dashboard/SmartAlerts";
import VolatilityScore from "../components/dashboard/VolatilityScore";
import buildCategoryTrendDataset from "../utils/buildCategoryTrendDataset";
import StackedCategoryTrendChart from "../components/dashboard/StackedCategoryTrendChart";
import MonthDrillDown from "../components/dashboard/MonthDrillDown";

function Dashboard() {
  const location = useLocation();
  const storedSummary = JSON.parse(localStorage.getItem("summary"));
  const summary = location.state?.summary || storedSummary;
  const [selectedMonth, setSelectedMonth] = useState(null);

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-xl font-semibold">
          No data available. Please upload a file first.
        </h2>
      </div>
    );
  }

  // Extract required data
  const overallSummary = summary?.overallSummary;
  const monthlySummary = summary?.monthlySummary;

  const { dataset: categoryTrendData, categories } =
    buildCategoryTrendDataset(monthlySummary);

  const [activeSummary, setActiveSummary] = useState(overallSummary || {});
  const [viewMode, setViewMode] = useState("insights");

  // FILTER FUNCTION

  const handleFilter = ({ year, month }) => {
    // 1️ Nothing selected → show overall summary
    if (!year && !month) {
      setActiveSummary(overallSummary);
      return;
    }

    // 2️ Year + Month selected
    if (year && month) {
      const formattedMonth = String(month).padStart(2, "0");
      const key = `${year}-${formattedMonth}`;
      setActiveSummary(monthlySummary?.[key] || {});
      return;
    }

    // 3️ Only Year selected
    if (year && !month) {
      const filteredMonths = Object.keys(monthlySummary || {})
        .filter((key) => key.startsWith(year));

      let combined = {
        total: 0,
        income: 0,
        expense: 0,
        transactionCount: 0
      };

      filteredMonths.forEach((key) => {
        const m = monthlySummary[key];
        if (!m) return;

        combined.total += m.total || 0;
        combined.income += m.income || 0;
        combined.expense += m.expense || 0;
        combined.transactionCount += m.transactionCount || 0;
      });

      setActiveSummary(combined);
    }
  };

  const monthlyComparisonData = Object.entries(monthlySummary || {}).map(
    ([monthKey, data]) => ({
      month: monthKey,
      expense: data.totalExpense || 0,
      savings: data.savings || 0,
    })
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 p-8 animate-fadeIn">
      <div className="max-w-8xl mx-auto">

        {/* Header */}
        <Header financialYear={overallSummary?.financialYear} overallSummary={overallSummary} monthlySummary={monthlySummary} />

        {/* Summary Cards */}
        <SummaryCards data={activeSummary} />

        {/* Section Header + Toggle + Filter */}
        <div className="sm:flex-row flex-col justify-between items-center mt-10 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            {viewMode === "insights" && "Financial Insights & Analytics"}
            {viewMode === "category" && "Expenses by Category"}
            {viewMode === "visual" && "Visual Insights"}
            {viewMode === "monthly" && "Monthly Expense Comparison"}
          </h2>


          <div className="flex gap-6 items-center">

            {/* Toggle Buttons */}
            <div className="inline-flex items-center bg-white/60 backdrop-blur-md rounded-full p-1 shadow-lg border border-gray-200">

              {/* Insights */}
              <button
                onClick={() => setViewMode("insights")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${viewMode === "insights"
                  ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-md scale-105"
                  : "text-gray-500 hover:text-indigo-600"
                  }`}
              >
                🧠 Insights
              </button>

              {/* Category */}
              <button
                onClick={() => setViewMode("category")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${viewMode === "category"
                  ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-md scale-105"
                  : "text-gray-500 hover:text-indigo-600"
                  }`}
              >
                📁 Category
              </button>

              {/* Visual */}
              <button
                onClick={() => setViewMode("visual")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${viewMode === "visual"
                  ? "bg-linear-to-r from-emerald-400 to-teal-500 text-white shadow-md scale-105"
                  : "text-gray-500 hover:text-emerald-600"
                  }`}
              >
                📊 Visual
              </button>

              {/* Monthly */}
              <button
                onClick={() => setViewMode("monthly")}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${viewMode === "monthly"
                  ? "bg-linear-to-r from-rose-400 to-pink-500 text-white shadow-md scale-105"
                  : "text-gray-500 hover:text-rose-600"
                  }`}
              >
                📈 Monthly
              </button>

            </div>

            {/* Filter Component */}
            <MonthYearFilter
              monthlySummary={monthlySummary}
              onApply={handleFilter}
            />

          </div>
        </div>

        {/* Conditional Section */}

        {viewMode === "insights" && (
          <div>
            <InsightsSection monthlySummary={monthlySummary} />
            <AdvancedInsights monthlySummary={monthlySummary} />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <SmartAlerts monthlySummary={monthlySummary} />
              <VolatilityScore monthlySummary={monthlySummary} />
            </div>
          </div>
        )}

        {viewMode === "category" && (
          <CategorySection data={activeSummary} />
        )}

        {viewMode === "visual" && (
          <VisualInsightSection data={activeSummary} />
        )}

        {viewMode === "monthly" &&
          Object.keys(monthlySummary || {}).length > 1 && (
            <MonthlyComparisonChart data={monthlyComparisonData} />
          )}
        {viewMode === "monthly" && (
          <StackedCategoryTrendChart
            data={categoryTrendData}
            categories={categories}
            onMonthClick={(month) => setSelectedMonth(month)}
          />

        )}

        {viewMode === "monthly" && selectedMonth && (
          <MonthDrillDown
            month={selectedMonth}
            data={monthlySummary[selectedMonth]}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
