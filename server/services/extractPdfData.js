// helper functions

const detectCategory = require("./detectCategory");

const extractDate = (data) => {
    const dateRegex = /\b\d{2}\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/;
    const match = data.match(dateRegex);
    return match ? match[0] : null;
};

const extractTag = (data) => {
    const tagRegex = /#.*?([A-Za-z][^\s#]*(?:\s+[^\s#]+){0,19})/;
    const match = data.match(tagRegex);
    return match ? match[1].trim() : null;
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
    const timeRegex = /\b(1[0-2]|[1-9]):([0-5][0-9])\s(AM|PM)\b/g;
    const match = data.match(timeRegex);
    return match ? match[0] : null;
};

const extractDescriptionIndex = (data, index) => {
    const timeRegex = /\b(1[0-2]|[1-9]):([0-5][0-9])\s(AM|PM)\b/g; // using timeRegex to findIndex
    const match = data.match(timeRegex);
    return match ? index + 1 : null;
}
// main function
const extractPdfData = (transactions) => {
    let paymentsData = [];
    let tagArray = [];
    let dateArray = [];
    let amountArray = [];
    let timeArray = [];
    let descriptionIndexArray = [];
    let descriptionArray = [];
    let categoryArray = null;

    transactions.forEach((data, index) => {
        const tag = extractTag(data);
        const date = extractDate(data);
        const amount = extractAmount(data);
        const time = extractTime(data);
        const descriptionIndex = extractDescriptionIndex(data, index)

        if (tag) {
            tagArray.push(tag)
        }

        if (date) {
            dateArray.push(date)
        }
        if (amount) {
            amountArray.push(amount)
        }
        if (time) {
            timeArray.push(time);
        }
        if (descriptionIndex) {
            descriptionIndexArray.push(descriptionIndex);
        }

    });

    descriptionIndexArray.map((data) => {
        descriptionArray.push(transactions[data]);
    })

    if (descriptionArray) {
        categoryArray = detectCategory(descriptionArray) //calling detect category function 
    }

    if (tagArray.length == dateArray.length && tagArray.length == dateArray.length && 
        dateArray.length == amountArray.length) 
        {
        for (let index = 0; index < tagArray.length; index++) {
            paymentsData.push({
                date: dateArray[index],
                tag: tagArray[index],
                amount: amountArray[index],
                time: timeArray[index],
                description: descriptionArray[index],
                category : categoryArray[index]
            })
        }
        // console.log(amountArray.length);
        // console.log(tagArray.length);
        // console.log(dateArray.length);
    }

    // if (paymentsData) {

    // }
    // if (categoryArray) {
    //     console.log(categoryArray.length);
    //     console.log(dateArray.length);
        
        
    // }

    return paymentsData;
};

module.exports = extractPdfData;
