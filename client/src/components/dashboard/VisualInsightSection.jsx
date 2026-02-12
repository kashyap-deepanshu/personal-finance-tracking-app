import React from 'react'
import CategoryBarChart from './CategoryBarChart'
import CategoryPieChart from './CategoryPieChart'

const VisualInsightSection = ({ data }) => {
    const chartData = Object.entries(data.categoryTotals || {}).map(
        ([name, value]) => ({
            name,
            value,
        })
    );

    return (
        <div className="">
            {chartData.length === 0 ? (
                <div className="bg-white p-10 rounded-2xl shadow text-center text-gray-400">
                    <div className="text-5xl mb-4">📂</div>
                    <p className="text-lg font-medium">
                        No visualize data found
                    </p>
                    <p className="text-sm">
                        Try uploading another statement
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Pie Chart */}
                    <div className="bg-white p-6 rounded-2xl shadow">

                        <CategoryPieChart data={chartData} />
                    </div>

                    {/* Bar Chart */}
                    <div className="bg-white p-6     rounded-2xl shadow">
                        <h2 className="text-lg pb-10  font-semibold text-gray-800">
                            Category Comparison
                        </h2>
                        <CategoryBarChart data={chartData} />
                    </div>

                </div>
            )}
        </div>

    )
}

export default VisualInsightSection