function average(r, l) {
    return Math.floor((r + l) / 2);
  }
  
function findRotationCount(array) {

let l = 0;
let r = array.length - 1;
let m = average(l, r);

if (array[r] > array[l]) {
    return 0;
}

while (l <= r) {

    if (array[m] > r) {
    l = m + 1;
    m = average(l, r)
    continue;
    } else if (array[m] < l) {
    r = m - 1;
    m = average(r, l);
    continue;
    } else {
    break
    }
}
return m;

}

const array1 = [34, 56, 78, 0, 2, 3];

module.exports = findRotationCount;  