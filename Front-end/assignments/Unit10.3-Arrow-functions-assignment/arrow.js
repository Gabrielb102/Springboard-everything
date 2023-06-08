function double(arr) {
    return arr.map(function(val) {
      return val * 2;
    });
  }

const doubleArrow = (arr) => arr.map(val => val * 2);

function squareAndFindEvens(numbers) {
    const squares = numbers.map(function(num){
      return num ** 2;
    });
    const evens = squares.filter(function(square){
      return square % 2 === 0;
    });
    return evens;
}

const sqAndFindEvensArrow = (arr) => {
    const squares = arr.map(num => num ** 2);
    const evens = squares.filter(square => square % 2 ===0);
    return evens;
}