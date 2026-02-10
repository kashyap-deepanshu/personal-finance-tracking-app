import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from "recharts";

function CategoryBarChart({ data = [] }) {

    // Total value
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Merge small categories into Others
    let mainData = [];
    let othersTotal = 0;

    data.forEach(item => {
        const percent = total > 0 ? (item.value / total) * 100 : 0;

        if (percent < 2) {
            othersTotal += item.value;
        } else {
            mainData.push(item);
        }
    });

    if (othersTotal > 0) {
        mainData.push({ name: "Others", value: othersTotal });
    }

    const processedData = mainData;

    // Chart sizing
    const barSize = Math.max(20, Math.min(80, 600 / processedData.length));
    // const chartHeight = Math.max(400, 600 / processedData.length);

    let containerWidth = "100%";
    if (processedData.length <= 3) containerWidth = "40%";
    else if (processedData.length <= 6) containerWidth = "60%";
    else if (processedData.length <= 10) containerWidth = "80%";

    // Color logic
    const getBarColor = (value) => {
        const percent = (value / total) * 100;
        if (percent > 30) return "#ef4444";
        if (percent > 20) return "#f59e0b";
        return "#22c55e";
    };

    const getTag = (value) => {
        const percent = (value / total) * 100;
        if (percent > 40) return "High Expense";
        if (percent > 20) return "Above Average";
        return "Normal";
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            const value = payload[0].value;
            const tag = getTag(value);
            const color = getBarColor(value);

            return (
                <div className="bg-white p-3 border rounded shadow">
                    <p className="font-semibold">{label}</p>
                    <p>Value: {value}</p>
                    <p className="font-semibold" style={{ color }}>
                        {tag}
                    </p>
                </div>
            );
        }
        return null;
    };
    // className="text-lg font-semibold text-gray-800"

    return (
        <ResponsiveContainer width="100%" height={450}>
            <BarChart data={processedData}>
                <XAxis dataKey="name" />
                <YAxis tickCount={8} />
                <Tooltip content={<CustomTooltip />} />

                <Bar dataKey="value" barSize={barSize}>
                    {processedData.map((entry, index) => (
                        <Cell
                            key={`cell-${index}`}
                            fill={
                                entry.name === "Others"
                                    ? "#9ca3af" // fixed gray for Others
                                    : getBarColor(entry.value)
                            }
                        />
                    ))}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}

export default CategoryBarChart;
