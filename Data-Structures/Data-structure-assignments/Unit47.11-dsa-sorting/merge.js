function merge(arr1, arr2) {
    const result = [];
    let i = 0;
    let j = 0;
    for (let a = 0; a < arr1.length; a++) {
      for (let b = j; b < arr2.length; b++) {
        if (arr1[a] < arr2[b]) {
          result.push(arr1[a]);
          i++;
          break;
        } else {
          result.push(arr2[b]);
          j++;
        }
      }
    }
    if (i < arr1.length) {
      result.push(...arr1.slice(i));
    }
    if (j < arr2.length) {
      result.push(...arr2.slice(j));
    }
    return result;}

function mergeSort(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
}

module.exports = { merge, mergeSort};