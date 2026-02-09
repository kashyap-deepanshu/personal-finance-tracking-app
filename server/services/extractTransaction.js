const extractPdfData = require("./extractPdfData");
const findRawData = require("./findRawData");
const removeNoteBlock = require("./removeNoteBlock");

const extractTransactions = (text) => {
    console.log("extract transaction function running");

    const linesWithNotes = text.split("\n");

    const lines = removeNoteBlock(linesWithNotes)
    
    const transactions = [];
    console.log(lines.length);
    console.log("extract transaction function ends");
    // fs.writeFileSync("write-transaction.txt", lines.join("\n"), "utf-8")

    let startingIndex = -1;
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

    const rawData = findRawData(transactions)
    // console.log(rawData);
    const paymentsData = extractPdfData(rawData)

    
    return paymentsData;
};


module.exports = extractTransactions;