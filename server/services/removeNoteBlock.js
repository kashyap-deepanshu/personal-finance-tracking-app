const removeNoteBlock = (lines) => {
    const noteText =
        "note: this payment is not included in the total money paid and money received calculations.";

    const dateRegex =  /\b\d{2}\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b/;

    let result = [...lines];

    for (let i = 0; i < result.length; i++) {
        const currentLine = result[i].toLowerCase().trim();

        // step 1: note line detect
        if (currentLine === noteText) {
            let startIndex = i;

            // step 2: reverse search for time line
            while (startIndex >= 0) {
                if (dateRegex.test(result[startIndex])) {
                    break;
                }
                startIndex--;
            }

            // step 3: remove full block (time line → note line)
            if (startIndex >= 0) {
                const removeCount = i - startIndex + 1;
                result.splice(startIndex, removeCount);

                // reset loop index
                i = startIndex - 1;
            }
        }
    }

    return result;
};

module.exports = removeNoteBlock;
