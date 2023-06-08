require('axios-debug-log/enable')
const express = require("express");
const { createClient } = require("redis");
const router = new express.Router();
const { SECRET_KEY, API_KEY } = require("../config");
const axios = require("axios");
const { REDIS_URI } = require("../config");

// Caching allows for loading times to be cut short by holding the information in server memory
// The experation time is set relatively long due to the slow changing nature of the data

const client = createClient(REDIS_URI);
client.on('error', (err) => console.log('Redis Client Error', err));
client.connect();

axios.defaults.headers.common["X-Api-Key"] = API_KEY;
const FEC_API_URL = "https://api.open.fec.gov/v1/";
const DEF_EXP = 7200;

async function accessCache(key, url, params) {
    const data = await client.get(key);
    if (data !== null) {
        return JSON.parse(data);
    } else {
        const results = await axios.get(url, { params });
        const tResults = results.data.results;
        client.setEx(key, DEF_EXP, JSON.stringify(tResults));
        return tResults;
    }
}

// SEARCH
router.get("/candidates", async (req, res, next) => {
    const query = {
        name : req.query.name,
        party : req.query.party,
        state : req.query.state,
        year : req.query.year,
        office : req.query.office,
        district : req.query.district
    }
    for (let key of Object.keys(query)) {
        if (query[key] === '' || query[key] === undefined) {
            delete query[key];
        }
    }
    const results = await axios.get(`${FEC_API_URL}/candidates/search`, { params: query });
    return res.json(results.data);
    // just do all the searches
    // put an office checkbox, and a year drop-down
    // name
    // state
    // district
    // party
    // eliminate duplicates (maybe with a SET)
    // sort the results
    // const results = await axios.get(`${FEC_API_URL}/candidate/${candidateID}?year=${year}`);
});

// GET CANDIDATE
router.get("/candidate/:candidateId", async (req, res, next) => {
    const candidateKey = `${req.params.candidateId}-page`;
    const url = `${FEC_API_URL}/candidate/${req.params.candidateId}`;
    const candidate = await accessCache(candidateKey, url);
    return res.json(candidate[0]);
});

// GET OVERALL CANDIDATE ELECTION FINANCIALS
// delivers totals for all of a candidate's elections
router.get("/info/:candidateId", async (req, res, next) => {
    const financialsKey = `${req.params.candidateId}-financials`;
    const url = `${FEC_API_URL}candidate/${req.params.candidateId}/totals`;
    const financials = await accessCache(financialsKey, url);
    return res.json(financials);
});

// GET LIST OF COMMITTEES FOR A CANDIDATE ACTIVE IN A CERTAIN YEAR
router.get("/candidate/:candidateId/committees", async (req, res, next) => {
    const committeesKey = `${req.params.candidateId}-committees-${req.query.cycle}`;
    const url = `${FEC_API_URL}candidate/${req.params.candidateId}/committees`;
    const params = {cycle : req.query.cycle};
    const committees = await accessCache(committeesKey, url, params);
    return res.json(committees);
});

// GET ITEMIZED RECEIPTS FOR A COMMITTEE - INCOMPLETE
router.get("/comminfo/contributions", async (req, res, next) => {
    const ctrbnKey = `${req.query.committeeId} contributions ${req.query.cycle}`;
    const url = `${FEC_API_URL}schedules/schedule_a`;
    const params = {
        committee_id : req.query.committeeId,
        two_year_transaction_period: req.query.cycle,
        sort: '-contribution_receipt_amount',
        per_page: '20'
    }
    const receipts = await accessCache(ctrbnKey, url, params);
    return res.json(receipts);
});


module.exports = router;