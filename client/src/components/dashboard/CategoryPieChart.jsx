import { useState } from "react";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = [
    "#6366f1",
    "#22c55e",
    "#ef4444",
    "#f59e0b",
    "#06b6d4",
    "#8b5cf6",
    "#ec4899",
    "#14b8a6",
];

function CategoryPieChart({ data = [] }) {
    const [isDonut, setIsDonut] = useState(true);

    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Group small values into Others (<2%)
    let mainData = [];
    let othersTotal = 0;

    data.forEach((item) => {
        const percent = total > 0 ? (item.value / total) * 100 : 0;
        percent < 2 ? (othersTotal += item.value) : mainData.push(item);
    });

    if (othersTotal > 0) {
        mainData.push({ name: "Others", value: othersTotal });
    }

    const sortedData = mainData.sort((a, b) => b.value - a.value);

    return (
        <>
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    Category Distribution
                </h2>

                <button
                    onClick={() => setIsDonut(!isDonut)}
                    className="px-4 py-1.5 text-sm rounded-full border text-gray-700 hover:bg-gray-100 transition"
                >
                    {isDonut ? "Pie View" : "Donut View"}
                </button>
            </div>

            <ResponsiveContainer width="100%" height={450}>
                <PieChart>
                    <Pie
                        data={sortedData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={isDonut ? 80 : 0}
                        outerRadius={140}
                        labelLine={true}
                        label
                    >
                        {sortedData.map((entry, index) => (
                            <Cell
                                key={index}
                                fill={
                                    entry.name === "Others"
                                        ? "#9ca3af"
                                        : COLORS[index % COLORS.length]
                                }
                            />
                        ))}
                    </Pie>

                    {/* Center text (donut only) */}
                    {isDonut && (
                        <text
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            dominantBaseline="middle"
                            className="fill-gray-800"
                        >
                            <tspan x="50%" dy="-4" className="text-sm fill-gray-400">
                                Total
                            </tspan>
                            <tspan x="50%" dy="20" className="text-xl font-bold">
                                ₹{Math.round(total).toLocaleString()}
                            </tspan>
                        </text>
                    )}

                    {/* Custom Tooltip */}
                    <Tooltip
                        formatter={(value, name) => {
                            const percent =
                                total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                            return [`₹${value.toLocaleString()} (${percent}%)`, name];
                        }}
                    />

                    <Legend
                        verticalAlign="bottom"
                        iconType="circle"
                        wrapperStyle={{ fontSize: "12px" }}
                    />
                </PieChart>
            </ResponsiveContainer>
        </>
    );
}

export default CategoryPieChart;
