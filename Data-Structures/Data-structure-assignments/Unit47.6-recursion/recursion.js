/** product: calculate the product of an array of numbers. */

function product(nums, i = 0, prod = 1) {
  if (!nums.length) return 0;
  if (!nums[i]) return prod; 
  prod *= nums[i];
  return product(nums, i + 1, prod);
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, i = 0, currentMax = 0) {
  if (!words[i]) return currentMax;
  if (words[i].length > currentMax) {
    currentMax = words[i].length;
  }
  return longest(words, i + 1, currentMax);
}

/** everyOther: return a string with every other letter. */

function everyOther(str, i = 0, result = '') {
  if (i % 2 === 0) {
    if (!str[i]) return result;
    result += str[i];
  }
  return everyOther(str, i + 1, result)
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, i = 0) {
  if (i === str.length - 1) {
    return true;
  }
  const a = str[i];
  const z = str[str.length - 1 - i];
  if (a === z) {
    return isPalindrome(str, i + 1);
  } else {
    return false;
  }

}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, i = 0) {
  if (!arr[i]) {
    return -1;
  }
  if (arr[i] === val) {
    return i;
  }
  return findIndex(arr, val, i + 1)
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, i = 0) {
  const l = str.length - 1 - i;
  if (l === -1) return '';
  result = (str[l] + revString(str, i + 1))
  return result;
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj, i = 0, res = []) {
  const vals = Object.values(obj);
  if (!vals[i]) {
    console.log('result: ', res);
    return([...res]);
  }
  if (typeof(vals[i]) === "string") {
    res = [vals[i], ...res];
  } else if (typeof(vals[i]) === "object") {
    console.log('vals[i]: ', vals[i]);
    res = [...res, ...gatherStrings(vals[i])]
  } 
  return gatherStrings(obj, i + 1, res);
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

// function binarySearch(arr, val) {

// }

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  // binarySearch
};
