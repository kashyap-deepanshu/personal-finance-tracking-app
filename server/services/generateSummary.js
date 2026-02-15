const generateSummary = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryTotals = {};
    let transactionYears = [];

    for (const txn of transactions) {
        //get transactions year
        if (!transactionYears.includes(txn.date.getFullYear())) {
            transactionYears.push(txn.date.getFullYear())
        }

        const amount = txn.amount;

        // income vs expense
        if (amount > 0) {
            totalIncome += amount;
            totalIncome = Number(totalIncome.toFixed(2))
        } else {
            totalExpense += Math.abs(amount);
            totalExpense = Number(totalExpense.toFixed(2))
        }

        // determine category
        let category = txn.category;

        if (!category && txn.tag) {
            category = String(txn.tag).trim();
        }

        if (!category) {
            category = "Miscellaneous";
        }

        // 🔹 remove spaces from key
        category = category.replace(/\s+/g, "");

        // category totals
        if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
        }

        // categoryTotals[category] += Math.abs(amount);
        categoryTotals[category] = Number(
            (categoryTotals[category] + Math.abs(amount)).toFixed(2)
        );

    }

    const savings = totalIncome - totalExpense;

    return {
        transactionYears,
        totalIncome,
        totalExpense,
        savings,
        categoryTotals,
    };
};

module.exports = generateSummary;
