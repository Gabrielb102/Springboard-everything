const express = require("express");
const app = express();
const {items} = require("./fakeDb");
const ExpressError = require("./expressError.js");
const shoppingRoutes = require("./shoppingRoutes");


app.use(express.json());

app.use("/items", shoppingRoutes)

app.use(function(err, req, res, next) {
    let status = err.status || 500;
    return res.status(status).json({
      error: {message: err.message,status: status}
    });
  });

  app.listen(3000, function() {
    console.log("Server is listening on port 3000");
  });
  
  module.exports = app