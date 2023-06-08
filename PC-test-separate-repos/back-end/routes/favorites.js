const express = require("express");
const Favorite = require("../models/favorite");
const router = new express.Router();

// marks a new favorite
router.post("/", async (req, res, next) => {
    try {
      const { username, candidateId, year, candidateName, candidateOffice } = req.body;
      await Favorite.add(username, candidateId, year, candidateName, candidateOffice);
      return res.json(true);
    } catch (err) {
      return next(err);
    }
});

// gets all favorites
router.get("/", async (req, res, next) => {
    try {
      const { username } = req.query;
      const favorites = await Favorite.getList(username);
      return res.json(favorites);
    } catch (err) {
      return next(err);
    }
});

router.delete("/", async (req, res, next) => {
    try {
      const { username, candidateId, year } = req.body;
      await Favorite.remove(username, candidateId, year);
      return res.json(true);
    } catch (err) {
      return next(err);
    }
});

router.get("/check", async (req, res, next) => {
  try {
    const {username, candidateId, year} = req.body;
    const exists = await Favorite.check(username, candidateId, year);
    return res.json(exists);
  } catch (err) {

  }
})

module.exports = router;
