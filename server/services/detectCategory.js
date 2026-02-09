const detectCategory = (descriptionText) => {
    const categoryRules = {
        Food: ["swiggy", "zomato", "restaurant", "cafe", "food"],
        Groceries: ["grocery", "kirana", "dairy", "milk", "vegetable", "mart"],
        Travel: ["uber", "ola", "metro", "petrol", "fuel", "irctc", "rapido"],
        Shopping: ["amazon", "flipkart", "myntra", "store", "mall", "zepto", "blinkit"],
        Bills: ["electricity", "recharge", "bill", "wifi", "broadband"],
        Medical: ["medical", "medico", "pharmacy", "hospital", "clinic", "medicine"],
        Education: ["school", "college", "tuition", "course", "coaching", "stationery"],
        Entertainment: ["movie", "cinema", "netflix", "prime", "hotstar", "game"],
        Rent: ["rent", "landlord"],
        Finance: ["emi", "loan", "credit card", "insurance", "investment"],
        Transfer: ["sent to", "received from", "paid to"],
        Cashback: ["cashback", "reward", "bonus"],
        Income: ["salary", "credit", "refund", "interest"],
    };

    if (!descriptionText) return null;

    // normalize description
    const description = String(descriptionText).toLowerCase().trim();

    for (const [category, keywords] of Object.entries(categoryRules)) {
        for (const word of keywords) {
            if (description.includes(word.toLowerCase())) {
                return category;
            }
        }
    }

    return null;
};

module.exports = detectCategory;
