function buildCategoryTrendDataset(monthlySummary = {}) {

  const monthlyEntries = Object.entries(monthlySummary);
  if (monthlyEntries.length === 0) return [];

  // 🔹 Step-1: Extract all unique categories
  const categorySet = new Set();

  monthlyEntries.forEach(([, data]) => {
    const categoryTotals = data.categoryTotals || {};
    Object.keys(categoryTotals).forEach((cat) => {
      categorySet.add(cat);
    });
  });

  const categories = Array.from(categorySet);

  // 🔹 Step-2: Build structured dataset
  const dataset = monthlyEntries
    .sort((a, b) => new Date(a[0]) - new Date(b[0]))
    .map(([month, data]) => {

      const categoryTotals = data.categoryTotals || {};

      const monthData = {
        month
      };

      categories.forEach((cat) => {
        monthData[cat] = categoryTotals[cat] || 0;
      });

      return monthData;
    });

  return {
    dataset,
    categories
  };
}

export default buildCategoryTrendDataset;
