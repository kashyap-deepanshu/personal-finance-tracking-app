import CountUp from "react-countup";

const SummaryCards = ({ data }) => {
    return (
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
                    <p className="text-3xl font-bold text-teal-600">
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
                    <p className={` text-3xl font-bold ${data.savings >= 0 ? "text-blue-600" : "text-red-600" }`}>
                        ₹<CountUp end={data.savings} duration={1.2} />
                    </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xl">
                    💰
                </div>
            </div>
        </div>
    )
}

export default SummaryCards