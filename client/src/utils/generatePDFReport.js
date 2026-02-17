        import jsPDF from "jspdf";

        const formatCurrency = (value) =>
        `₹${Number(value || 0).toLocaleString()}`;

        const generatePDFReport = ({
        overallSummary,
        monthlySummary,
        }) => {

        const doc = new jsPDF();
        let y = 20;

        const monthlyEntries = Object.entries(monthlySummary || {});

        // ---- Helper Calculations ----
        const totalMonths = monthlyEntries.length;

        const totalExpenseSum = monthlyEntries.reduce(
            (sum, [, data]) => sum + (data.totalExpense || 0),
            0
        );

        const averageExpense =
            totalMonths > 0 ? totalExpenseSum / totalMonths : 0;

        // ---- Volatility ----
        const expenses = monthlyEntries.map(
            ([, data]) => data.totalExpense || 0
        );

        const avg =
            expenses.reduce((sum, val) => sum + val, 0) /
            (expenses.length || 1);

        const variance =
            expenses.reduce((sum, val) => {
            return sum + Math.pow(val - avg, 2);
            }, 0) / (expenses.length || 1);

        const volatility =
            avg > 0 ? (Math.sqrt(variance) / avg) * 100 : 0;

        // ---- Title ----
        doc.setFontSize(18);
        doc.text("Financial Analytics Report", 20, y);
        y += 10;

        doc.setFontSize(11);
        doc.text(
            `Generated on: ${new Date().toLocaleDateString()}`,
            20,
            y
        );
        y += 15;

        // ---- Overall Summary ----
        doc.setFontSize(14);
        doc.text("Overall Summary", 20, y);
        y += 8;

        doc.setFontSize(11);
        doc.text(
            `Total Income: ${formatCurrency(overallSummary?.totalIncome)}`,
            20,
            y
        );
        y += 6;

        doc.text(
            `Total Expense: ${formatCurrency(overallSummary?.totalExpense)}`,
            20,
            y
        );
        y += 6;

        doc.text(
            `Total Savings: ${formatCurrency(overallSummary?.savings)}`,
            20,
            y
        );
        y += 12;

        // ---- Insights ----
        doc.setFontSize(14);
        doc.text("Key Insights", 20, y);
        y += 8;

        doc.setFontSize(11);

        doc.text(
            `Average Monthly Expense: ${formatCurrency(averageExpense)}`,
            20,
            y
        );
        y += 6;

        doc.text(
            `Expense Volatility Score: ${volatility.toFixed(1)}%`,
            20,
            y
        );
        y += 12;

        // ---- Monthly Breakdown ----
        doc.setFontSize(14);
        doc.text("Monthly Breakdown", 20, y);
        y += 8;

        doc.setFontSize(11);

        monthlyEntries.forEach(([month, data]) => {

            doc.text(`Month: ${month}`, 20, y);
            y += 6;

            doc.text(
            `Income: ${formatCurrency(data.totalIncome)}`,
            25,
            y
            );
            y += 6;

            doc.text(
            `Expense: ${formatCurrency(data.totalExpense)}`,
            25,
            y
            );
            y += 6;

            doc.text(
            `Savings: ${formatCurrency(data.savings)}`,
            25,
            y
            );
            y += 8;

            // ---- Category Breakdown ----
            Object.entries(data.categoryTotals || {}).forEach(
            ([category, amount]) => {
                doc.text(
                `- ${category}: ${formatCurrency(amount)}`,
                30,
                y
                );
                y += 6;
            }
            );

            y += 8;

            if (y > 270) {
            doc.addPage();
            y = 20;
            }

        });

        doc.save("Financial_Report.pdf");
        };

        export default generatePDFReport;
