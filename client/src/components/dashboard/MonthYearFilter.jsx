import { useState, useMemo } from "react";
import { FiFilter } from "react-icons/fi";

const MONTHS = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
];

const MonthYearFilter = ({ monthlySummary = {}, onApply }) => {
    const [open, setOpen] = useState(false);
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");

    // Extract Years from monthlySummary keys
    const availableYears = useMemo(() => {
        const years = new Set();

        Object.keys(monthlySummary).forEach((key) => {
            const year = key.split("-")[0];
            years.add(year);
        });

        return Array.from(years).sort((a, b) => b - a);
    }, [monthlySummary]);

    //extract Months
    const availableMonths = useMemo(() => {
        if (!selectedYear) return [];

        return Object.keys(monthlySummary)
            .filter((key) => key.startsWith(selectedYear))
            .map((key) => key.split("-")[1]);
    }, [monthlySummary, selectedYear]);


    const handleApply = () => {
        onApply({
            year: selectedYear,
            month: selectedMonth,
        });
        setOpen(false);
    };

    return (
        <div className="relative inline-block">

            <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-lg hover:bg-gray-100 transition"
            >
                <FiFilter size={20} />
            </button>

            {open && (
                <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-lg p-4 space-y-4 z-50">

                    {/* Year Select */}
                    <select
                        required
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="">Select Year</option>
                        {availableYears.map((year) => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>

                    {/* Month Select */}
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    >
                        <option value="">Select Month</option>

                        {MONTHS.map((month) => {
                            const isAvailable = availableMonths.includes(month.value);

                            return (
                                <option
                                    key={month.value}
                                    value={month.value}
                                    disabled={selectedYear && !isAvailable}
                                    className={!isAvailable ? "text-gray-400" : ""}
                                >
                                    {month.label}
                                </option>
                            );
                        })}
                    </select>


                    <button
                        onClick={handleApply}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition duration-200"
                    >
                        Apply Filter
                    </button>

                </div>
            )}
        </div>
    );
};

export default MonthYearFilter;
