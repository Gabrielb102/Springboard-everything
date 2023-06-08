/** Auth-related routes. */

const User = require('../models/user');
const express = require('express');
const router = express.Router();
const createTokenForUser = require('../helpers/createToken');
const ExpressError = require('../helpers/expressError');
const jsonschema = require('jsonschema');
const userSchema = require('../schema/userSchema.json');


/** Register user; return token.
 *
 *  Accepts {username, first_name, last_name, email, phone, password}.
 *  Returns {token: jwt-token-string}.*/

router.post('/register', async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, email, phone } = req.body;
    const validator = jsonschema.validate(req.body, userSchema);
    if (!validator.valid) {
      throw new ExpressError('All required fields must be filled!')
    }
    let user = await User.register({username, password, first_name, last_name, email, phone});
    const token = createTokenForUser(username, user.admin);
    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
}); 

/** Log in user; return token.
 *
 *  Accepts {username, password}.
 *  Returns {token: jwt-token-string}.
 *
 *  If incorrect username/password given, should raise 401.*/

router.post('/login', async function(req, res, next) {
  try {
    const { username, password } = req.body;
    let user = await User.authenticate(username, password);
    if (!user) {
      throw new ExpressError("Incorrect username or password", 401)
    }
    console.log(JSON.stringify(user));
    const token = createTokenForUser(user.username, user.admin);
    return res.json({ token });
  } catch (err) {
    return next(err);
  }
}); 

module.exports = router;
