/** Demo app for routing. */

const express = require("express");
const ExpressError = require("./expressError");
const app = express();

const middleware = require("./middleware");
const morgan = require("morgan")

app.use(express.json());

app.use(morgan('dev'))

// this applies to all requests at all paths
app.use(middleware.logger);
// end middleware.logger

//  apply a prefix to every route in userRoutes
app.use("/users", userRoutes);
// end userRoutes

// route handler with middleware
app.get("/hello/:name",
  middleware.onlyAllowElie,
  function(req, res, next) {
    return res.send("Hello " + req.params.name);
  }
);

app.get("/secret", middleware.checkForPassword, (req, res) => {
  res.send("You made it!! Congratulations!!")
})

app.get("/private", middleware.checkForPassword, (req, res) => {
  res.send("You made it! Congrats")
})

app.get("/favicon.ico", (req, res) => res.sendStatus(204))

// 404 handler
app.use(function(req, res) {
  return new ExpressError("Not Found", 404);
});

// generic error handler
app.use(function(err, req, res, next) {
  // the default status is 500 Internal Server Error
  let status = err.status || 500;

  // set the status and alert the user
  return res.status(status).json({
    error: {
      message: err.message,
      status: status
    }
  });
});
// end generic handler
app.listen(3000, function() {
  console.log("Server is listening on port 3000");
});
// end app.listen
