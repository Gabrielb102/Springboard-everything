const express = require("express");
const User = require("../models/user");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { UnauthorizedError, BadRequestError } = require("../expressError");

// Returns all users
router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll();
        return res.json({users});
    } catch (err) {
        return next(err);
    }
});

// Returns one specific user
// Must implement ensureCorrectUserOrAdmin
router.get("/:username", async (req, res, next) => {
    try {
        const user = await User.get(req.params.username);
        return res.json({ user });
    } catch (err) {
        return next(err);
    }
});

// Registers a new user
router.post("/", async (req, res, next) => {
    try {
        const newUser = await User.register({...req.body, is_admin: false});
        const token = jwt.sign(newUser, SECRET_KEY);
        return res.json({ token });
      } catch (err) {
        return next(err);
    }
});

// Updates a user
router.patch("/:username", async (req, res, next) => {
    try {
        const updated = User.update(req.params.username, req.body)
        return res.json({ "updated":"successfully" });
    } catch (err) {
        return next(err);
    }
});

// Authenticates a user
router.post("/login", async function (req, res, next) {
    try {
      const { username, password } = req.body;
      const user = await User.auth(username, password);
      if (user === undefined) {
        throw new UnauthorizedError("Incorrect Username or password");
      }

      const token = jwt.sign(user, SECRET_KEY);
      return res.json({ token });
    } catch (err) {
      return next(err);
    }
});

module.exports = router;