const Express = require('express');
const ExpressError = require('../expressError');
const { ensureLoggedIn } = require('../middleware/auth');
const Message = require('../models/message');
const router = new Express.Router()


/** GET /:id - get detail of message.
 *
 * => {message: {id, body, sent_at, read_at, from_user: {username, first_name, last_name, phone}, 
 *         to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user. */

router.get('/:id', ensureLoggedIn, async (req, res, next) => {
    try {
        const message = await Message.get(req.params.id);
        if (req.user === message.from_user.username || req.user === message.to_user.username) {
            return res.json({ message });
        }
        throw new ExpressError("Not Authorized to view this conversation", 400)
    } catch(e) {
        next(e);
    }
})

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}} */

router.post('/', ensureLoggedIn, async (req, res, next) => {
    try {
        // checking for complete input
        const from_username = req.user;
        const {to_username, body} = req.body;
        [to_username, body].forEach((i) => {
            if (i === undefined) {
                throw new ExpressError("Bad Request: to_username and body all required for message.", 400)
            }
        })
        // Posting the message
        message = await Message.create({to_username, from_username, body});
        return res.json(message);
    } catch(e) {
        return next(e);
    }
})

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}} 
 * Make sure that the only the intended recipient can mark as read. */

router.post('/:id/read', ensureLoggedIn, async (req, res, next) => {
    try {
        const message = await Message.get(req.params.id);
        if (message.to_user.username === req.user) {
            const read = await Message.markRead(req.params.id);
            return res.json(read);    
        }
        throw new ExpressError("You are not the recipient", 400)
    } catch(e) {
        next(e);
    }
})

module.exports = router;