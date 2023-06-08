const express = require('express')
const expressError = require('./expressError')

app = express()

const parseQueryString = (queryString) => {
    try {
        let numStrings = queryString.split(',');
        let numList = numStrings.map(( num => num == 0 ? 0 : (parseInt(num) || num)));
        for (num of numList) {
            if (typeof(num) !== 'number') {
                console.log(typeof(num))
                throw new expressError('All entries must be numbers', 403);
            } else {
                continue;
            }
        }
        return numList;
    } catch (err) {
        next(err) 
    }
}

app.get('/mean', (req, res) => {
    const {nums} = req.query
    const numArray = parseQueryString(nums)
    console.log(numArray)

    let sum = 0
    for (num of numArray) {
        sum += num
    }

    let mean = {'operation' : 'mean', 
                'value' : sum/numArray.length}

    res.status(200).json({response : mean})
})

app.get('/median', (req, res) => {
    const {nums} = req.query
    const numArray = parseQueryString(nums)

    let prevNum = 0

    numArray.sort(function(a, b) {
        return a - b;
        });

    let middlePoint = Math.floor(numArray.length / 2 )

    let median = {'operation' : 'median', 
                'value' : numArray[middlePoint]}

    res.status(200).json({response : median})
})

app.get('/mode', (req, res) => {
    const {nums} = req.query
    const numArray = parseQueryString(nums)

    let numCounts = {}

    for (num of numArray) {
        if (!numCounts[num]) {
            numCounts[num] = 1
        } else {
            numCounts[num]++
        }
    }

    let max = 0
    var mode = 0

    for (key of Object.keys(numCounts)) {
        if (numCounts[key] > max) {
            max = numCounts[key]
            mode = key
        }
    }

    let modeObj = {'operation' : 'mode', 
                'value' : mode}

    res.status(200).json({response : modeObj})
})

app.use((err, req, res, next) => {
    let status = err.status || 500;
    let msg = err.msg;
    res.status(status).json({
        error: { msg, status }
    })
})

app.listen(3000, (req, res) => {
    console.log('server started on port 3000')
})