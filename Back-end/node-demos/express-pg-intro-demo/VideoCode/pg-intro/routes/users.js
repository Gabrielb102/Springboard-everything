/** Routes for users of pg-intro-demo. */

const express = require("express");
const ExpressError = require("../expressError")
const router = express.Router();
const db = require("../db");

router.get('/', async (req, res, next) => {
// Using a try/catch allows errors to be caught, and async functions to stop awaiting something which will never come.
  try {
    const results = await db.query(`SELECT * FROM users`);
    debugger;
    return res.json({ users: results.rows })
  } catch (e) {
    return next(e);
  }
})
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await db.query('SELECT * FROM users WHERE id = $1', [id])
    if (results.rows.length === 0) {
      throw new ExpressError(`Can't find user with id of ${id}`, 404)
    }
    return res.send({ user: results.rows[0] })
  } catch (e) {
    return next(e)
  }
})

router.get('/search', async (req, res, next) => {
  try {
    const { type } = req.query;
    // this is known as query parametization, which takes the input as an array after the query
    // The array is accessed by the $n variable, which calls that index (starting with 1, not 0)
    // to fill the variable
    // This makes postgreSQL process it a little bit, and they have security measures in place to prevent badd stuff
    // It prevents people from slapping in their own SQL
    const results = await db.query(`SELECT * FROM users WHERE type=$1`, [type])
    return res.json(results.rows)
  } catch (e) {
    return next(e)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, type } = req.body;
    // This does it and returns what the database would print out, 
    // This means that for some "queries" you must specify what to return 
    // You can use a "RETURNING" clause, 
    // or make another query that returns data (like SELECT) and return that
    const results = await db.query('INSERT INTO users (name, type) VALUES ($1, $2) RETURNING id, name, type', [name, type]);
    return res.status(201).json({ user: results.rows[0] })
  } catch (e) {
    return next(e)
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, type } = req.body;
    const results = await db.query('UPDATE users SET name=$1, type=$2 WHERE id=$3 RETURNING id, name, type', [name, type, id])
    if (results.rows.length === 0) {
      throw new ExpressError(`Can't update user with id of ${id}`, 404)
    }
    return res.send({ user: results.rows[0] })
  } catch (e) {
    return next(e)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const results = db.query('DELETE FROM users WHERE id = $1', [req.params.id])
    return res.send({ msg: "DELETED!" })
  } catch (e) {
    return next(e)
  }
})


module.exports = router;