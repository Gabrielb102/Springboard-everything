const unroll = (squareArray) => {
    const sideLength = squareArray.length;
    let spiral = [];

    for (let n = 1; n <= Math.ceil(sideLength/2); n++) {
        // across the top
        for (let i = n-1; i < sideLength-n; i++) {
            spiral.push(squareArray[n-1][i]);
        }
        
        // down the right side
        for (let i = n-1; i <= sideLength-n; i++) {
            spiral.push(squareArray[i][sideLength-n]);
        }

        // across the bottom
        for (let i = sideLength-1-n; i >= n-1; i--) {
            spiral.push(squareArray[sideLength-n][i]);
        }

        // up the left side
        for (let i = sideLength-1-n; i >= n; i--) {
            spiral.push(squareArray[i][n-1]);
        }
    }
    return spiral;
}

module.exports = unroll;
