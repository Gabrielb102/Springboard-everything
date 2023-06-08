const db = require('../db');
const express = require('express');
const router = express.Router()


// GET /companies
// Returns list of companies, like {companies: [{code, name}, ...]}

router.get('/', async function(req, res, next) {
    try {
        result = await db.query("SELECT code, name FROM companies;")
        return res.json({companies : result.rows});
    } catch (e) {
        return next(e);
    }
})

// GET /companies/[code]
// Return obj of company: {company: {code, name, description}}

// If the company given cannot be found, this should return a 404 status response.

router.get('/:code', async function(req, res, next) {
    try {
        const { code } = req.params
        console.log(code)
        result = await db.query(`SELECT code, name, description FROM companies WHERE code = $1`, [code])
        return res.json({company : result.rows[0]});
    } catch (e) {
        return next(e);
    }
})


// POST /companies
// Adds a company.

// Needs to be given JSON like: {code, name, description}

// Returns obj of new company: {company: {code, name, description}}

router.post('/', async function(req, res, next) {
    try {
        const {code, name, description} = req.body;
        result = await db.query('INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description', [code, name, description])
        return res.status(201).json({company : result.rows[0]});
    } catch (e) {
        return next(e);
    }
})


// PUT /companies/[code]
// Edit existing company.

// Should return 404 if company cannot be found.

// Needs to be given JSON like: {name, description}

// Returns update company object: {company: {code, name, description}}

router.put('/:code', async function(req, res, next) {
    try {
        const { urlCode } = req.params
        const {code, name, description} = req.body;
        result = await db.query('UPDATE companies SET code = $1, name = $2, description = $3 WHERE code = $4 RETURNING code, name, description', [code, name, description, urlCode])
        return res.json({company : result.rows[0]});
    } catch (e) {
        return next(e);
    }
})


// DELETE /companies/[code]
// Deletes company.

// Should return 404 if company cannot be found.

// Returns {status: "deleted"}

router.delete('/:code', async function(req, res, next) {
    try {
        const {code} = req.params;
        result = await db.query('DELETE FROM companies WHERE code = $1', [code])
        return res.json({message : Deleted});
    } catch (e) {
        return next(e);
    }
})

module.exports = router;