import { useNavigate } from 'react-router-dom';

const Header = ({data}) => {
    const navigate = useNavigate();
    const handleExportCSV = () => {
        const totalIncome = data.totalIncome || 0;
        const totalExpense = data.totalExpense || 0;
        const savings = data.savings || 0;

        let csvContent = "Financial Summary\n";
        csvContent += `Total Income,${totalIncome}\n`;
        csvContent += `Total Expense,${totalExpense}\n`;
        csvContent += `Savings,${savings}\n\n`;

        csvContent += "Category Breakdown\n";
        csvContent += "Category,Amount\n";

        Object.entries(data.categoryTotals || {}).forEach(
            ([category, amount]) => {
                csvContent += `${category},${amount}\n`;
            }
        );

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "financial-summary.csv";
        link.click();
    };


    return (
        <div className="flex justify-between items-center mb-10">
            <div>
                <h1 className="text-4xl font-bold text-gray-800">
                    Welcome back, Deepanshu
                </h1>
                <p className="text-gray-500">
                    Here’s your financial overview
                </p>
                <p className="text-gray-500 font-semibold text-sm">
                    {data.financialYear}
                </p>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={handleExportCSV}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 transition"
                >
                    Export CSV
                </button>

                <button
                    onClick={() => navigate("/upload")}
                    className="bg-white border px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
                >
                    Upload Another File
                </button>
            </div>

        </div>
    )
}

export default Header