const Express = require('express');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const ExpressError = require('../expressError');
const { DB_URI, SECRET_KEY ,BCRYPT_WORK_FACTOR } = require("../config");
const router = new Express.Router();
const jwt = require('jsonwebtoken');


/** POST /login - login: {username, password} => {token}
 * + updates their last-login */

router.post('/login', async (req, res, next) => {
    try {
        if (!req.body.username || !req.body.password) {
            throw new ExpressError("Username and Password required", 400);
        }
        const authorized = await User.authenticate(req.body.username, req.body.password);
        if (authorized === true) {
            token = jwt.sign(req.body.username, SECRET_KEY);
            User.updateLoginTimestamp(req.body.username);
            return res.json({authenticated : req.body.username, token})
        } 
        throw new ExpressError("Invalid Credentials! You Fake!", 400);
    } catch(e) {
        next(e)
    }
})

/** POST /register - register user: registers, logs in,
 * + returns token if successful. */
router.post('/register', async (req, res, next) => {
    try {
        // The user model takes an object, so place all the inputs into an object
        const newUser = {username : req.body.username, 
                        password : req.body.password, 
                        first_name : req.body.first_name, 
                        last_name : req.body.last_name, 
                        phone : req.body.phone}

        // Check for all fields being satisfied
        for (value of Object.values(newUser)) {
            if (value === undefined) {
                throw new ExpressError("Please fill in all required fields", 400)
            }
        }
        // User model creates new user and changes the last_login_at field
        const registeredUser = await User.register(newUser);
        const token = await jwt.sign({user : registeredUser}, SECRET_KEY)
        current_user = token;
        // Give the token because I don't want the user to have to log in after they've 
        // essentially already put in their login credentials
        return res.json({registered : registeredUser, token});
    } catch(e) {
        next(e);
    }
})


module.exports = router;