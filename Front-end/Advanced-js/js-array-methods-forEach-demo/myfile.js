var arr1 = ["Saturn ", "The sisters", "All my 6 brothers", "disney 5 gang"];

var numString = '1234567890';
function checksForNumber(val) {
    for (let char of val) {
        if (numString.includes(char)) {
            return true;
        }
    }
    return false;
}

function filter(arr, func) {
    var newArr = [];
    for (i = 0; i < arr.length; i++) {
        if (func(arr[i], i, arr)) {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}