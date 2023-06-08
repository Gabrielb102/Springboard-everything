function average (r, l) {
    return Math.floor((r + l) / 2);
}

function countZeroes(array) {
    let r = array.length;
    let l = 0;
    let m = average(r,l);
    while (array[m] !== 1 || array[m + 1] !== 0) {
        if(l === m) {
            break;
        }

        if(r === m) {
            break;
        }

        if (array[m] === 0) {
            r = m;
            m = average(r,l);
            continue;
        }
        if (array[m] === 1) {
            l = m + 1;
            m = average(r,l) + 1;
            continue;
        }        
    }

    // if m is not at index 0, then this will make sure it doesn't accidentally include a 1 in the count
    const fm = array[m] === 0 ? m : m + 1;
    const zs = array.slice(fm , array.length);
    return zs.length;
}

module.exports = countZeroes