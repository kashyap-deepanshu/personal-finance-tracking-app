function SmartAlerts({ monthlySummary = {} }) {

    const monthlyEntries = Object.entries(monthlySummary);
    if (monthlyEntries.length < 2) return null;

    const totalExpense = monthlyEntries.reduce(
        (sum, [, data]) => sum + (data.totalExpense || 0),
        0
    );

    const averageExpense = totalExpense / monthlyEntries.length;

    const sortedMonths = monthlyEntries
        .sort((a, b) => new Date(a[0]) - new Date(b[0]));

    const latestMonth = sortedMonths[sortedMonths.length - 1];
    const latestExpense = latestMonth[1].totalExpense || 0;

    const spikeThreshold = averageExpense * 1.25;
    const dropThreshold = averageExpense * 0.75;

    let alertMessage = null;
    let alertStyle = {};
    let icon = "";

    if (latestExpense > spikeThreshold) {
        alertMessage = `Expense spike detected`;
        alertStyle = {
            border: "border-red-500",
            bg: "from-red-50 to-white",
            text: "text-red-600",
        };
        icon = "⚠️";
    }

    else if (latestExpense < dropThreshold) {
        alertMessage = `Expense significantly lower`;
        alertStyle = {
            border: "border-green-500",
            bg: "from-green-50 to-white",
            text: "text-green-600",
        };
        icon = "📉";
    }

    if (!alertMessage) return null;

    return (
        <div
            className={`bg-gradient-to-br ${alertStyle.bg} p-6 rounded-2xl shadow-md hover:shadow-lg transition w-full duration-300 mt-8 border-l-4 ${alertStyle.border}`}
        >
            <div className="flex items-start gap-4">

                {/* Icon */}
                <div className={`text-3xl ${alertStyle.text}`}>
                    {icon}
                </div>

                {/* Text Content */}
                <div className="flex-1">
                    <p className={`font-semibold text-lg ${alertStyle.text}`}>
                        {alertMessage}
                    </p>

                    <p className="text-sm text-gray-600 mt-1">
                        Month:{" "}
                        <span className="font-medium text-gray-800">
                            {latestMonth[0]}
                        </span>
                    </p>

                    <div className="mt-3 text-sm text-gray-700">
                        <div>
                            Latest Expense:{" "}
                            <span className="font-semibold">
                                ₹{latestExpense.toLocaleString()}
                            </span>
                        </div>
                        <div>
                            Average Expense:{" "}
                            <span className="font-semibold">
                                ₹{averageExpense.toLocaleString(undefined, {
                                    maximumFractionDigits: 0,
                                })}
                            </span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SmartAlerts;
