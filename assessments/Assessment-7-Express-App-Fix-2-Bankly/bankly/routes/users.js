/** User related routes. */

const User = require('../models/user');
const express = require('express');
const router = new express.Router();
const ExpressError = require('../helpers/expressError');
const { authUser, requireLogin, requireAdmin } = require('../middleware/auth');

/** GET /
 * Get list of users. Only logged-in users should be able to use this.
 *
 * Returns: {users: [{username, first_name, last_name}, ...]} */

router.get('/', authUser, requireLogin, async (req, res, next) => {
  try {
    let users = await User.getAll();
    return res.json({ users });
  } catch (err) {
    return next(err);
  }
}); 

/** GET /[username]
 * Get details on a user. Only logged-in users should be able to use this.
 *
 * Returns: {user: {username, first_name, last_name, phone, email}}
 *
 * If user cannot be found, return a 404 err. */

router.get('/:username', authUser, requireLogin, async (req, res, next) => {
  try {
    let user = await User.get(req.params.username);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
});

/** PATCH /[username]
 * Update user. Only the user themselves or any admin user can use this.
 *
 * Accepts: {first_name, last_name, phone, email}
 *
 * Returns: {user: all-data-about-user}
 *
 * Returns a 404 err if user not found. 
 * Unauth If they try to change other fields (including non-existent ones) */

router.patch('/:username', authUser, requireLogin, async (req, res, next) => {
  try {
    if (!req.curr_admin && req.curr_username !== req.params.username) {
      throw new ExpressError('Only that user or admin can edit a user.', 401);
    }

    // get fields to change; remove token so we don't try to change it
    if (req.body.admin || req.body.username || req.body.password) {
      throw new ExpressError('Those fields may not be changed.', 401)
    }
    const fields = { first_name, last_name, phone, email } = req.body;
    for (let key in Object.keys(fields)) {
      if (fields[key] === undefined) {
        delete fields[key];
      }
    }
    // Doesn't validate this data either
    let user = await User.update(req.params.username, fields);
    return res.json({ user });
  } catch (err) {
    return next(err);
  }
}); // end

/** DELETE /[username]
 *
 * Delete a user. Only an admin user should be able to use this.
 *
 * It should return:
 *   {message: "deleted"}
 *
 * If user cannot be found, return a 404 err.
 */

router.delete('/:username', authUser, requireAdmin, async function(
  req,
  res,
  next
) {
  try {
    User.delete(req.params.username);
    return res.json({ message: 'deleted' });
  } catch (err) {
    return next(err);
  }
}); // end

module.exports = router;
