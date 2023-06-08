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

function findTargetRange (array, target, targetIdx) {
    let l = targetIdx;
    let r = targetIdx;
    while (array[l] === target) {
        l--;
    }
    l++;
    while (array[r] === target) {
        r++;
    }
    return r - l
}

function sortedFrequency(array, target) {
    const targetIdx = findTarget(array,target);
    if (targetIdx === -1) {
        return targetIdx;
    }
    return findTargetRange(array, target, targetIdx);
}

module.exports = sortedFrequency