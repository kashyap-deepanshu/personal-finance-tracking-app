import { useLocation } from "react-router-dom";

import CategorySection from "../components/dashboard/CategorySection";
import VisualInsightSection from "../components/dashboard/VisualInsightSection";
import SummaryCards from "../components/dashboard/SummaryCards";
import Header from "../components/dashboard/Header";
import { useState } from "react";

function Dashboard() {
  const location = useLocation();
  const summary = location.state?.summary;
  const data = summary?.overallSummary;
  const [showVisual, setShowVisual] = useState(false);

  if (!summary) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-xl font-semibold">
          No data available. Please upload a file first.
        </h2>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-blue-50 p-8 animate-fadeIn">
      <div className="max-w-8xl mx-auto">
        {/* Header */}
        <Header data={data} />

        {/* Summary Cards */}
        <SummaryCards data={data} />

        {/* Category Section && Visual Insights Section*/}
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">

            {showVisual ? "Visual Insights" : "Expenses by Category"}
          </h2>
          {/* <p className="  text-xl font-semibold mb-6 text-gray-800 bg-white m-4">
          <span className="bg-gray-200 px-3 py-1">Visual Insight</span>
          <span>Category Insight</span>
        </p> */}
          <div
            className="inline-flex items-center bg-white/60 backdrop-blur-md 
                rounded-full p-1 shadow-lg border border-gray-200"
          >
            {/* Category Insight */}
            <button
              onClick={() => setShowVisual(false)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
              transition-all duration-300 ${!showVisual
                  ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white shadow-md scale-105"
                  : "text-gray-500 hover:text-indigo-600"
                }`}
            >
              📁 Category
            </button>

            {/* Visual Insight */}
            <button
              onClick={() => setShowVisual(true)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
              transition-all duration-300 ${showVisual
                  ? "bg-linear-to-r from-emerald-400 to-teal-500 text-white shadow-md scale-105"
                  : "text-gray-500 hover:text-emerald-600"
                }`}
            >
              📊 Visual
            </button>
          </div>
        </div>

        {/* conditional rendering */}
        {showVisual ? <VisualInsightSection data={data} /> : <CategorySection data={data} />}


      </div>
    </div>
  );
}

export default Dashboard;
