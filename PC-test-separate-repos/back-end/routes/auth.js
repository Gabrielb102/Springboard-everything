// Library Dependencies
const express = require("express");
const router = new express.Router();

// Local file Dependencies
const User = require("../models/user");
const { createToken } = require("../jwt");
const { BadRequestError } = require("../expressError");

// POST /auth/token:  { username, password } => { jwt }
// Returns the JWT that is expected by the middleware authentication functions
// Authorization required: none
// But only returns a token if user is authenticated
router.post("/token", async function (req, res, next) {
  try {
    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = createToken(user);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
});


// POST /auth/register:   { user } => { jwt }
// user must include { username, password, firstName, lastName, email }
// Creates JWT for a new user to be expected by authorization middleware
// Authorization required: none
router.post("/register", async function (req, res, next) {
  try {
    const newUser = await User.create({ ...req.body });
    const token = createToken(newUser);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
