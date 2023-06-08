//ES5 Assigning Variables to Object Properties
{
const obj = {
    numbers: {
      a: 1,
      b: 2
    }
  };

//solution
let {a,b} = obj.numbers
}
{
//ES5 Array Swap
var arr = [1,2];

//solution
[arr[0], arr[1]] = [arr[1], arr[0]];
}

const raceResults = ([first, second, third, ...rest]) => {first, second, third, rest};
