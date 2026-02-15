import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Cell
} from "recharts";

function MonthlyComparisonChart({ data }) {

    if (!data || data.length === 0) return null;

    const maxValue = Math.max(...data.map(d => d.expense));

    // Define how many ranges you want
    const RANGE_COUNT = 4;  // Change to 5 or 6 anytime

    const rangeSize = maxValue / RANGE_COUNT;

    // Professional gradient palette
    const RANGE_COLORS = [
        "#22c55e", // Low – Green
        "#06b6d4", // Medium – Cyan
        "#f59e0b", // High – Amber
        "#ef4444", // Very High – Red
        "#a855f7",
        "#ec4899"
    ];

    const getRangeColor = (value) => {
        const rangeIndex = Math.min(
            Math.floor(value / rangeSize),
            RANGE_COUNT - 1
        );

        return RANGE_COLORS[rangeIndex % RANGE_COLORS.length];
    };

    return (
        <div className="bg-white p-6 rounded-2xl shadow mt-10">

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="#e5e7eb" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip
                        formatter={(value) =>
                            `₹${value.toLocaleString()}`
                        }
                    />

                    <Bar dataKey="expense" radius={[8, 8, 0, 0]} maxBarSize={50}  >
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={getRangeColor(entry.expense)}
                            />
                        ))}
                    </Bar>

                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MonthlyComparisonChart;
