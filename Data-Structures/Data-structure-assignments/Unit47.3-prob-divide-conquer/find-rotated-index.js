function average (r, l) {
    return Math.floor((r + l) / 2);
}

function findTarget(array, target) {
    let r = array.length - 1;
    let l = 0;
    let m = average(r,l);

    while (l <= r) {
        if (array[m] < target) {
            l = m + 1;
            m = average(l, r)
            continue;
        } else if (array[m] > target) {
            r = m - 1;
            m = average(r,l);
            continue;
        } else {
            return m;
        }   
    }
    return -1;
}

function getOffsetReturnSorted(array) {
    let l = 0;
    let r = array.length - 1;
    let m = average(l, r);

    if (array[r] > array[l]) {
        return {sortedArr : array, offset: 0};
    }

    while (l <= r) {
        if (array[m] > r ) {
            l = m + 1;
            m = average(l, r)
            continue;
        } else if (array[m] < l) {
            r = m - 1;
            m = average(r,l);
            continue;
        }  
    }
    return {sortedArr : [...array.slice(m + 1), ...array.slice(0, m + 1)], offset : m + 1};

}

function findRotatedIndex(array, target) {
    const {sortedArr, offset} = getOffsetReturnSorted(array);
    const idx = findTarget(sortedArr, target)
    if (idx === -1) return -1;
    let result = idx - offset;
    if (result < 0) {
        result += array.length;
    }
    return result;
}

module.exports = findRotatedIndex