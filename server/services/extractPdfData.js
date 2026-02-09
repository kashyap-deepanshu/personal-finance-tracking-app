// helper functions

const detectCategory = require("./detectCategory");

const extractDate = (data) => {
    const dateRegex = /\b\d{2}\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/;
    const match = data.match(dateRegex);
    return match ? match[0] : null;
};

const extractAmount = (data) => {
    const amountRegex = /([+-])\s*Rs\.?\s*([\d,]+(?:\.\d+)?)/i;
    const match = data.match(amountRegex);

    if (!match) return null;

    let sign = match[1];
    let number = match[2].replace(/,/g, "");

    let amount = parseFloat(number);

    return sign === "-" ? -amount : amount;
};

const extractTime = (data) => {
    const timeRegex = /\b(1[0-2]|[1-9]):([0-5][0-9]) (AM|PM)\b/;
    const match = data.match(timeRegex);
    // match? console.log(match[0]):console.log("not find");

    return match ? match[0] : null;
};

const extractTag = (data) => {
    const tagRegex = /#.*?([A-Za-z][^\s#]*(?:\s+[^\s#]+){0,19})/;
    const match = data.match(tagRegex);
    return match ? match[1].trim() : null;
};
const extractDescriptionIndex = (data, index) => {
    const timeRegex = /\b(1[0-2]|[1-9]):([0-5][0-9])\s(AM|PM)\b/g; // using timeRegex to findIndex
    const match = data.match(timeRegex);
    return match ? index + 1 : null;
}
// main function
const extractPdfData = (rawData) => {
    let paymentsData = [];

    rawData.map((dataBlock) => {
        let tag = null
        let date = null
        let amount = null
        let time = null
        let desIndex = null
        dataBlock.map((data, index) => {
            tag = tag ? tag : extractTag(data);
            date = date ? date : extractDate(data);
            amount =amount?amount: extractAmount(data);
            time = extractTime(data) ? extractTime(data) : time;
            desIndex =desIndex?desIndex: extractDescriptionIndex(data, index)
        })

        let description = dataBlock[desIndex];
        let category = null
        if (description) {
            category = detectCategory(description.toLowerCase())
        }
        let paymentsDetail = {
            tag: tag ? tag : null,
            date: date,
            amount: amount,
            time: time,
            category: category,
            description: description
        }
        paymentsData.push(paymentsDetail)
    })
    // console.log(paymentsData[0]);
    

    return paymentsData;
};

module.exports = extractPdfData;
