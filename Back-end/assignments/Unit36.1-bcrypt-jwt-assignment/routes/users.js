const Express = require('express')
const User = require('../models/user')
const router = new Express.Router()

/** GET / - get list of users. => {users: [{username, first_name, last_name, phone}, ...]} **/

router.get('/', async (req, res, next) => {
    try {
        const users = await User.all();
        return res.json({users});    
    } catch (e) {
        return next(e);
    }
} )

/** GET /:username - get detail of users. => {user: {username, first_name, last_name, phone, join_at, last_login_at}}**/

router.get('/:username', async (req, res, next) => {
    try {
        const user = await User.get(username);
        return res.json({user});
    } catch(e) {
        next(e)
    }
})

/** GET /:username/to - get messages to user **/

router.get('/:username/to', async (req, res, next) => {
    try {
        messages = await User.messagesTo(req.params.username);
        return res.json(messages);
    } catch(e) {
        next(e)
    }
})

/** GET /:username/from - get messages from user **/

router.get('/:username/from', async (req, res, next) => {
    try {
        messages = await User.messagesFrom(req.params.username);
        return res.json(messages);
    } catch (e) {
        next(e);
    }
})

module.exports = router;