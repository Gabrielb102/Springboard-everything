function average (r, l) {
    return Math.floor((r + l) / 2);
}

function findFloor(array, target) {
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
            return array[m];
        }   
    }

    return array[m] <= target ? array[m] : -1;
}

module.exports = findFloor