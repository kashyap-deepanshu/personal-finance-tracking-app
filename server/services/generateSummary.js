const generateSummary = (transactions) => {
    let totalIncome = 0;
    let totalExpense = 0;
    const categoryTotals = {};

    for (const txn of transactions) {
        const amount = txn.amount;

        // income vs expense
        if (amount > 0) {
            totalIncome += amount;
        } else {
            totalExpense += Math.abs(amount);
        }

        // determine category
        let category = txn.category;

        if (!category && txn.tag) {
            category = String(txn.tag).trim();
        }

        if (!category) {
            category = "Others";
        }

        // 🔹 remove spaces from key
        category = category.replace(/\s+/g, "");

        // category totals
        if (!categoryTotals[category]) {
            categoryTotals[category] = 0;
        }

        categoryTotals[category] += Math.abs(amount);
    }

    const savings = totalIncome - totalExpense;

    return {
        totalIncome,
        totalExpense,
        savings,
        categoryTotals,
    };
};

module.exports = generateSummary;
