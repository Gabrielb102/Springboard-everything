const db = require('../db');
const express = require('express');
const ExpressError = require('../expressError');
const router = express.Router()


router.get('/', async function(req, res, next) {
    try {
        result = await db.query("SELECT id, comp_code, add_date, paid FROM invoices;")
        return res.json({invoices : result.rows});
    } catch (e) {
        return next(e);
    }
})


router.get('/:id', async function(req, res, next) {
    try {
        const { id } = req.params
        result = await db.query(`SELECT * FROM invoices WHERE id = $1`, [id])
        if (result.rows.length === 0) {
            throw new ExpressError("Could not find invoice with specified id.", 404)
        }
        return res.json({invoice : result.rows[0]});
    } catch (e) {
        return next(e);
    }
})


router.post('/', async function(req, res, next) {
    try {
        const {comp_code, amt} = req.body;
        if (comp_code === undefined || amt === undefined) {
            throw new ExpressError("Must include all necessary fields", 406)
        }
        result = await db.query('INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING comp_code, amt, add_date', [comp_code, amt])
        return res.status(201).json({new_invoice : result.rows[0]});
    } catch (e) {
        return next(e);
    }
})


router.put('/:id', async function(req, res, next) {
    try {
        const { id } = req.params
        const { amt } = req.body;
        const amtRes = await db.query('SELECT amt FROM invoices WHERE id = $1', [id])
        if (amtRes.rows.length === 0) {
            throw new ExpressError("No invoice found with specified id", 404)
        }
        const origAmt = amtRes.rows[0].amt;
        const newTotal = origAmt - amt;
        const paidDate = new Date()
        if (newTotal === 0) {
            const updateInv = db.query('UPDATE invoices SET paid = true WHERE id = $1 ', [id])
            const dateChange = db.query('UPDATE invoices SET paid_date = $1 WHERE id = $2 RETURNING comp_code, amt, paid, paid_date', [paidDate, id])
            const result = await Promise.all([updateInv, dateChange])
                .then(data => data)
                .catch(err => {throw new ExpressError(err)})
            return res.json({invoice : result[1].rows[0]});
        } else {
                return res.json({invoice : "not paid in full"})
        }
    } catch (e) {
        return next(e);
    }
})


router.delete('/:id', async function(req, res, next) {
    try {
        const {id} = req.params;
        result = await db.query('DELETE FROM invoices WHERE id = $1', [id])
        return res.json({message : `Invoice ${id} deleted`});
    } catch (e) {
        return next(e);
    }
})


module.exports = router;