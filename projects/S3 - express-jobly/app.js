"use strict";

/** Express app for jobly. */

// Misc requirements Doc
// express allows for sending requests and handling responses
// The not found error is the only error type needed for the app outside of the routes
const express = require("express");
const { NotFoundError } = require("./expressError");

// All middleware imports Doc
// Function to authenticate the current user using the "_token" in the request
// cors allows for resources to be shared with domains beyond this server
// Logs all requests made by the server
const { authenticateJWT } = require("./middleware/auth");
const cors = require("cors");
const morgan = require("morgan");

// Importing Routes
const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const usersRoutes = require("./routes/users");

// Initiate the app
const app = express();

// Middleware Doc
// Enable CORS for all routes
// Interperet the data coming in and going out as JSON
// Log all requests made in "tiny" format
// If user authenticates, create res.user
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

// Route prefixes
app.use("/auth", authRoutes);
app.use("/companies", companiesRoutes);
app.use("/users", usersRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
