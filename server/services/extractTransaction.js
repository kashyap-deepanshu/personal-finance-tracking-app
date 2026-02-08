const extractPdfData = require("./extractPdfData");

const extractTransactions = (text) => {
    console.log("extract transaction function running");

    const lines = text.split("\n");
    const transactions = [];
    console.log(lines.length);
    console.log("extract transaction function ends");
    // fs.writeFileSync("write-transaction.txt", lines.join("\n"), "utf-8")

    let startingIndex = -1;
    let endingIndex = lines.length;

    lines.forEach((line, index) => {
        const word = line.toLowerCase();

        // detect table start
        if (startingIndex === -1 && word.includes("passbook payments history")) {
            console.log("Header found at:", index);
            startingIndex = index;
        }
        if (startingIndex !== -1 && index > startingIndex) {
            transactions.push(line);
        }
    });
    const paymentsData = extractPdfData(transactions)
    
    return paymentsData;
};


module.exports = extractTransactions;