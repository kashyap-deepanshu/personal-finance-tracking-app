// utils/groupByMonth.js

/**
 * Groups transactions by month (YYYY-MM)
 */

function groupByMonth(transactions) {
  const monthlyData = {};

  transactions.forEach((tx) => {
    if (!tx.date || !(tx.date instanceof Date)) return;

    const year = tx.date.getFullYear();
    const month = String(tx.date.getMonth() + 1).padStart(2, "0");

    const monthKey = `${year}-${month}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = [];
    }

    monthlyData[monthKey].push(tx);
  });

  return monthlyData;
}

module.exports = groupByMonth;
