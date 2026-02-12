
const CategorySection = ({ data }) => {
    const categoryList = Object.entries(data.categoryTotals || {}) 
        .sort((a, b) => b[1] - a[1]);

    // Category colors
    const categoryColors = {
        transfer: "bg-red-500",
        Shopping: "bg-purple-500",
        Transport: "bg-yellow-500",
        Bills: "bg-blue-500", 
        Entertainment: "bg-pink-500",
        Others: "bg-gray-500",
    };
    return (
        <div>

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
                        const percent = Math.round((amount / (totalExpense + totalIncome)) * 100);

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
                                        className={`h-2 rounded-full transition-all duration-700 ${categoryColors[category] || "bg-blue-500"
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

    )
}

export default CategorySection