const detectCategory = (descriptionArray) => {
    const categoryArray = [];

    const categoryRules = {
        Food: ["swiggy", "zomato", "restaurant", "cafe", "food"],
        Groceries: ["grocery", "kirana", "dairy", "milk", "vegetable", "mart"],
        Travel: ["uber", "ola", "metro", "petrol", "fuel", "irctc","rapido"],
        Shopping: ["amazon", "flipkart", "myntra", "store", "mall", "zepto", "blinkit"],
        Bills: ["electricity", "recharge", "bill", "wifi", "broadband"],
        Medical: ["medical", "medico", "pharmacy", "hospital", "clinic", "medicine"],
        Education: ["school", "college", "tuition", "course", "coaching", "stationery"],
        Entertainment: ["movie", "cinema", "netflix", "prime", "hotstar", "game"],
        Rent: ["rent", "landlord"],
        Finance: ["emi", "loan", "credit card", "insurance", "investment"],
        Transfer: ["sent to", "received from", "upi transfer"],
        Cashback: ["cashback", "reward", "bonus"],
        Income: ["salary", "credit", "refund", "interest"],
    };

    for (const descriptionText of descriptionArray) {
        const description = descriptionText.toLowerCase();
        let foundCategory = null; // default category

        for (const [category, keywords] of Object.entries(categoryRules)) {
            const isMatch = keywords.some(word =>
                description.includes(word.toLowerCase())
            );

            if (isMatch) {
                foundCategory = category;
                break;
            }
        }

        categoryArray.push(foundCategory);
    }

    return categoryArray;
};

module.exports = detectCategory;
