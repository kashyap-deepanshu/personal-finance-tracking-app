const detectCategory = (descriptionText) => {
    const categoryRules = {

        Food: [
            "swiggy", "zomato", "restaurant", "cafe", "food", "dominos",
            "pizza", "burger", "kfc", "mcdonald", "eatery"
        ],

        Groceries: [
            "grocery", "kirana", "dairy", "milk", "vegetable",
            "mart", "supermarket", "bigbasket", "dmart", "reliance fresh"
        ],

        Travel: [
            "uber", "ola", "metro", "petrol", "fuel", "irctc",
            "rapido", "flight", "bus", "train", "airlines", "indigo",
            "spicejet", "makemytrip", "yatra"
        ],

        Shopping: [
            "amazon", "flipkart", "myntra", "store", "mall",
            "zepto", "blinkit", "meesho", "ajio", "tatacliq"
        ],

        Bills: [
            "electricity", "recharge", "bill", "wifi",
            "broadband", "gas bill", "water bill",
            "postpaid", "prepaid"
        ],

        Utilities: [
            "maintenance", "society", "service charge",
            "cleaning", "security"
        ],

        Medical: [
            "medical", "medico", "pharmacy",
            "hospital", "clinic", "medicine",
            "apollo", "diagnostic", "pathlab"
        ],

        Education: [
            "school", "college", "tuition",
            "course", "coaching", "stationery",
            "exam fee", "udemy", "coursera"
        ],

        Entertainment: [
            "movie", "cinema", "netflix", "prime",
            "hotstar", "game", "spotify",
            "youtube", "bookmyshow"
        ],

        Subscriptions: [
            "subscription", "membership", "renewal",
            "apple", "google play", "playstore"
        ],

        Rent: [
            "rent", "landlord", "flat rent"
        ],

        Finance: [
            "emi", "loan", "credit card", "insurance",
            "investment", "mutual fund", "sip",
            "trading", "zerodha", "groww", "upstox"
        ],

        BankCharges: [
            "atm charge", "sms charge",
            "processing fee", "bank charge",
            "annual fee", "penalty"
        ],

        Transfer: [
            "sent to", "received from",
            "upi", "imps", "neft", "rtgs",
            "transfer", "to account"
        ],

        Taxes: [
            "gst", "tds", "tax", "income tax"
        ],

        Cashback: [
            "cashback", "reward", "bonus",
            "offer", "discount"
        ],

        Income: [
            "salary", "credit", "refund",
            "interest", "dividend", "payout"
        ],

        ATMWithdrawal: [
            "atm withdrawal", "atm cash"
        ],

        Miscellaneous: [
            "misc", "others", "unknown"
        ]
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
