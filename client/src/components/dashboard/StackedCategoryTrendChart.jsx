import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
    Legend,
} from "recharts";

// Generate consistent color based on category name
const generateColorFromString = (str) => {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const hue = Math.abs(hash % 360);

    return `hsl(${hue}, 65%, 55%)`;
};

// 🔥 Custom Tooltip
const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;

    return (
        <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-2">
                {label}
            </p>

            {payload.map((entry, index) => (
                <div
                    key={index}
                    className="flex justify-between gap-6 text-sm"
                >
                    <span style={{ color: entry.color }}>
                        ● {entry.name}
                    </span>
                    <span className="font-medium">
                        ₹{entry.value.toLocaleString()}
                    </span>
                </div>
            ))}
        </div>
    );
};

function StackedCategoryTrendChart({
    data = [],
    categories = [],
    onMonthClick
}) {

    if (!data.length || !categories.length) return null;

    const formatMonthLabel = (monthKey) => {
        const [year, month] = monthKey.split("-");
        const date = new Date(year, month - 1);

        return date.toLocaleString("en-US", {
            month: "short",
            year: "2-digit",
        });
    };

    return (
        <div className="bg-linear-to-br from-white to-indigo-50/30 p-8 rounded-3xl shadow-md mt-10 border border-gray-100">

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800">
                        Category Trends
                    </h3>
                    <p className="text-sm text-gray-500">
                        Monthly category contribution breakdown
                    </p>
                </div>
            </div>

            {/* Chart */}
            <div className="w-full overflow-x-auto overflow-y-hidden">

                <div style={{ minWidth: data.length > 6 ? data.length * 80 : "100%" }}>

                    <ResponsiveContainer width="100%" height={450}>
                        <BarChart
                            data={data}
                            onClick={(state) => {
                                if (state?.activeLabel && onMonthClick) {
                                    onMonthClick(state.activeLabel);
                                }
                            }}
                        >


                            <CartesianGrid
                                stroke="#e5e7eb"
                                strokeDasharray="3 3"
                            />

                            <XAxis
                                dataKey="month"
                                tickFormatter={formatMonthLabel}
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}
                            />

                            <YAxis
                                width={60}
                                tick={{ fontSize: 12 }}
                                axisLine={false}
                                tickLine={false}

                            />

                            <Tooltip content={<CustomTooltip />} />

                            <Legend
                                wrapperStyle={{ fontSize: "13px", padding:"0px" }}
                            />

                            {categories.map((category) => (
                                <Bar
                                    key={category}
                                    dataKey={category}
                                    stackId="total"
                                    fill={generateColorFromString(category)}
                                    radius={[6, 6, 0, 0]}
                                />
                            ))}


                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}

export default StackedCategoryTrendChart;
