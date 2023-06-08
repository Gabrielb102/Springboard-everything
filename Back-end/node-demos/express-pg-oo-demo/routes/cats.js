/** Cat routes for express-pg-oo */

const express = require("express");
const db = require("../db");

const Cat = require("../models/catclass");

const router = new express.Router();

// IMPORTANT: all of these function bodies should really be
// wrapped in a try/catch, where catching an error calls
// next(err) --- this is omitted here for brevity in slides


/** get all cats: [{id, name, age}, ...] */

// router.get("/", async function (req, res, next) {
//   let result = await db.query("SELECT * FROM cats");
//   let cats = result.rows;
//   return res.json(cats)
// });

/** (fixed) get all cats: [{id, name, age}] */

router.get("/", async (req, res, next) => {
  try {
    const cats = await Cat.getAll()
    return res.json(cats);
    } catch(e) {
      return next(e);
    }
});

/** get cat by id: {id, name, age} */

router.get("/:id", async (req, res, next) => {
  try {
    let cat = await Cat.getById(req.params.id);
    return res.json(cat);
    } catch (e) {
      return next (e);
    }
});

/** create cat from {name, age}: return {name, age} */

router.post("/", async (req, res, next) => {
  try {
    let cat = await Cat.create(req.body.name, req.body.age);
    return res.json(cat);
  } catch (e) {
    return next(e)
  }
});

/** delete cat from {id}; returns "deleted" */

router.delete("/:id", async (req, res, next) => {
  try {
    await Cat.delete(req.params.id);
    return res.json({message : "deleted"});
  } catch (e) {
    return next(e);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, age } = req.body
    const cat = await Cat.update(name, age, req.params.id)
    return res.json(cat)
  } catch(e) {
    return next(e);
  }
})

/** age cat: returns new age */

router.patch("/:id/age", async (req, res, next) => {
  let newAge = await Cat.makeOlder(req.params.id);
  return res.json(newAge);
});


module.exports = router;