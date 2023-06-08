"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn } = require("../middleware/auth");
const { BadRequestError, UnauthorizedError } = require("../expressError");
const User = require("../models/user");
const { createToken } = require("../helpers/tokens");
const userNewSchema = require("../schemas/userNew.json");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();


/** POST / { user }  => { user, token }
 *
 * Adds a new user. This is not the registration endpoint --- instead, this is
 * only for admin users to add new users. The new user being added can be an
 * admin.
 *
 * This returns the newly created user and an authentication token for them:
 *  {user: { username, firstName, lastName, email, isAdmin }, token }
 *
 * Authorization required: login
 **/

router.post("/", ensureLoggedIn, async (req, res, next) => {
  try {
    if (res.locals.user.isAdmin === false) {
      throw new UnauthorizedError("Must be admin to create a new user with out registering")
    }
    const validator = jsonschema.validate(req.body, userNewSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.register(req.body);
    const token = createToken(user);
    return res.status(201).json({ user, token });
  } catch (err) {
    return next(err);
  }
});


/** GET / => { users: [ {username, firstName, lastName, email }, ... ] }
 *
 * Returns list of all users.
 *
 * Authorization required: admin
 **/

router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    if (res.locals.user.isAdmin === false) {
      throw new UnauthorizedError("Must be admin exhaustive user list")
    }
    const users = await User.findAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
});


/** GET /[username] => { user }
 *
 * Returns { username, firstName, lastName, isAdmin }
 *
 * Authorization required: login by user being requested or admin
 **/

router.get("/:username", ensureLoggedIn, async (req, res, next) => {
  try {
    const isAdmin = (res.locals.user.isAdmin === true);
    const isRequestedUser = (res.locals.user.username === req.params.username);
    if (!isAdmin && !isRequestedUser) {
      throw new UnauthorizedError("Must be requested user or admin to see user details");
    }
    const user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, password, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: login of user-to-edit or admin
 **/

router.patch("/:username", ensureLoggedIn, async (req, res, next) => {
  try {
    const isAdmin = (res.locals.user.isAdmin === true);
    const isRequestedUser = (res.locals.user.username === req.params.username);
    if (!isAdmin && !isRequestedUser) {
      throw new UnauthorizedError("Must be requested user or admin to edit user details");
    }

    const validator = jsonschema.validate(req.body, userUpdateSchema);
    if (!validator.valid) {
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }

    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});


/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: login
 **/

router.delete("/:username", ensureLoggedIn, async (req, res, next) => {
  try {
    const isAdmin = (res.locals.user.isAdmin === true);
    const isRequestedUser = (res.locals.user.username === req.params.username);
    if (!isAdmin && !isRequestedUser) {
      throw new UnauthorizedError("Must be requested user or admin to delete user");
    }
    await User.remove(req.params.username);
    return res.json({ deleted: req.params.username });
  } catch (err) {
    return next(err);
  }
});

/** POST /[username]/jobs/[jobId] => {applied : { username : jobId }} */

router.post("/:username/jobs/:jobId", ensureLoggedIn, async (req, res, next) => {
  try {
    const { username, jobId } = req.params;
    const isAdmin = (res.locals.user.isAdmin === true);
    const isRequestedUser = (res.locals.user.username === username);
    if (!isAdmin && !isRequestedUser) {
      throw new UnauthorizedError("Must be user applying or admin to delete user");
    }
    const application = await User.apply(username, jobId);
    return res.json({ application });
  } catch (err) {
      return next(err);
  }
})


module.exports = router;
