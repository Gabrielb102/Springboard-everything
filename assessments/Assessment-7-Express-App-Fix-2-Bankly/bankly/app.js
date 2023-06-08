/** Application for bank.ly */

// Dependencies
const express = require('express');
const app = express();
const ExpressError = require("./helpers/expressError");

// Body parsing/writing
app.use(express.json());

//Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// 404 handler 
app.use(function(req, res, next) {
  const err = new ExpressError("Not Found", 404);
  return next(err);
});

// General Error Handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    status: err.status,
    message: err.message
  });
});

module.exports = app;

module.exports = app;

// The repeated module.exports isn't a bug is it? Keeping it just in case