// helper functions

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
    const amountRegex = /([+-])\s*Rs\.([^\sA-Za-z]+)/g;
    const match = data.match(amountRegex);
    return match ? match[0]: null;
};

// main function

const extractPdfData = (transactions) => {
    let paymentsData = [];
    let tagArray = [];
    let dateArray = [];
    let amountArray =[]


    transactions.forEach((data) => {
        const tag = extractTag(data);
        const date = extractDate(data);
        const amount = extractAmount(data);
    

        if (tag) { 
            tagArray.push(tag)
        }

        if (date) {
            dateArray.push(date)
        }
        if (amount) {
            const result = amount.slice(0, 1) + amount.slice(5);
            amountArray.push(Number(result))
        }

    });
   if (tagArray.length == dateArray.length &&dateArray.length  ==amountArray.length ) {
    for (let index = 0; index < tagArray.length; index++) {
        paymentsData.push({
            date:dateArray[index],
            tag:tagArray[index],
            amount: amountArray[index]
        })
    }
    console.log(amountArray.length);
    console.log(tagArray.length);
    console.log(dateArray.length);
    console.log(amountArray[5]);
    console.log(amountArray[10]);
    
    
    console.log(amountArray[5]-amountArray[10]);
    
    
    
    

   }


    return paymentsData;
};

module.exports = extractPdfData;
