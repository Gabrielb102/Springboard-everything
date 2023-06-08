function addCommas(num) {
    const numString = num.toString();
    const numStringParts = numString.split('.');
    const decimals = numStringParts[1];
    let wholeNums = numStringParts[0];
    let wholeNumsLength = wholeNums.length;

    if (num < 0) {
        wholeNums = wholeNums.slice(1,wholeNumsLength);
        wholeNumsLength--;
    }

    if (wholeNumsLength <= 3) {
        return numString;
    }

    let segs = [];
    if (wholeNumsLength > 3) {
        for (i = 0; i < wholeNumsLength; i += 3) {
            let lowerBound = (wholeNumsLength - (i + 3))
            if (lowerBound < 0) {
                lowerBound = 0;
            }
            const seg = wholeNums.slice(lowerBound, wholeNumsLength - i)
            segs.unshift(seg);
        }
        const mainString = segs.join(',');
        const isNegative = num < 0 ? '-' : '';
        const decimalString = decimals ? `.${decimals}` : '';
        const returnString = isNegative + mainString + decimalString;
        return returnString;
    }

}

module.exports = addCommas;