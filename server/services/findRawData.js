const extractAmount = (data) => {
    const amountRegex = /([+-])\s*Rs\.?\s*([\d,]+(?:\.\d+)?)/i;
    const match = data.match(amountRegex);

    if (!match) return null;

    let sign = match[1];
    let number = match[2].replace(/,/g, ""); 

    let amount = parseFloat(number);

    return sign === "-" ? -amount : amount;
};

const findRawData = (transactions) => {
    const rawDataArray = [];
    let temp = [];

    const dateRegex = /\b\d{2}\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/;

    let collecting = false;

    for (const line of transactions) {
        // date start
        if (dateRegex.test(line)) {
            temp = [line];
            collecting = true;
            continue;
        }

        if (collecting) {
            temp.push(line);

            // use extractAmount instead of regex
            if (extractAmount(line) !== null) {
                rawDataArray.push([...temp]);
                temp = [];
                collecting = false;
            }
        }
    }

    return rawDataArray;
};

module.exports = findRawData;
