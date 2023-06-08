const express = require('express');

const app = express();


//request.body will not return anything unless you tell express what type of data to parse
app.use(express.json())


//express automatically makes the request object, 
//and then can pass them in to the route callback 
//(it's the first parameter no matter what)
//Same goes for the response object, which is the second parameter

//response.send(automatically parses what's passed in, whether it's a string, or HTML, or so on )

//: is the notation for putting a variable in your path
app.get('/dogs/:dogname', function(request, response) {
    console.log(response)
    response.send(`<b>I'm a dog, bitch! I'm ${request.params.dogname}</b>`)
})


//req.query accesses the query string in an object
app.get('/search', function(req, res) {
    const {term = 'blank search', sort = 'top'} = req.query
    res.send(`The search term was ${term}, results are sorted to ${sort}`)
})


//the first argument for app.listen is the port number, 
//then the function you want to execute when the server starts
//app.listen should always be at the bottom of the script
app.listen(3000, function() {
    console.log('started')
})