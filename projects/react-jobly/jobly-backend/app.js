"use strict";

/** Express app for jobly. */

// Library / package dependencies
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Local file dependencies
const { NotFoundError } = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");

// All the routes
const authRoutes = require("./routes/auth");
const companiesRoutes = require("./routes/companies");
const usersRoutes = require("./routes/users");
const jobsRoutes = require("./routes/jobs");

const app = express();

// This file just runs the middleware and routing

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(authenticateJWT);

// Middleware (app prefixes)
app.use("/auth", authRoutes);
app.use("/companies", companiesRoutes);
app.use("/users", usersRoutes);
app.use("/jobs", jobsRoutes);


// Global 404 Handler
app.use(function (req, res, next) {
  return next(new NotFoundError());
});

// Generic error handler; anything unhandled goes here.
app.use(function (err, req, res, next) {
  if (process.env.NODE_ENV !== "test") console.error(err.stack);
  const status = err.status || 500;
  const message = err.message;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app;
