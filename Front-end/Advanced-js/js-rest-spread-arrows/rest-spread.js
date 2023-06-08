function filterOutOdds() {
    var nums = Array.prototype.slice.call(arguments);
    return nums.filter(function(num) {
      return num % 2 === 0
    });
  }

  /* Write an ES2015 Version */

const newFilterOutOdds = (...nums) => {
return nums.filter(function(num) {
    return num % 2 === 0;
});
}

const findMin = (...nums) => {
    const min = nums.reduce((currentVal, nextVal) => {
        if (currentVal >= nextVal) {
            return nextVal;
         } else {
            return currentVal;
         }
    });
    return min;
}

const mergeObjects = (obj1,obj2) => {
    const sumObj = {...obj1, ...obj2};
    return sumObj;
}

const doubleAndReturnArgs = (arr, ...nums) => {
    const doubledArr = nums.map(num => num * 2);
    const resultArray = [...arr, ...doubledArr];
    return resultArray;
}

/** remove a random element in the items array
and return a new array without that item. */

//it says "array" was it supposed to say "variable number of arguments"?

const removeRandom = (arr) => {
    const randomIndex = Math.floor((Math.random() * arr.length) - 1);
    const arrCopy = [...arr];
    arrCopy.splice(randomIndex, 1);
    return arrCopy;
}

/** Return a new array with every item in array1 and array2. */

const extend = (array1, array2) => {
    return [...array1, ...array2];
}

/** Return a new object with all the keys and values
from obj and a new key/value pair */

const addKeyVal = (obj, key, val) => {
    const newAddition = {};
    newAddition[key] = val;
    return {...obj, ...newAddition};
}


/** Return a new object with a key removed. */

const removeKey = (obj, key) => {
    const objCopy = {...obj};
    delete objCopy[key];
    return objCopy;
}


/** Combine two objects and return a new object. */

const combine = (obj1, obj2) => {
    return {...obj1, ...obj2};
}


/** Return a new object with a modified key and value. */

function update(obj, key, val) {
    const newAddition = {};
    newAddition[key] = val;
    return {...obj, ...newAddition};
}