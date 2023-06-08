/** Dog routes for express-pg-oo */

const express = require("express");

const Dog = require("../models/dog");

const router = new express.Router();

// IMPORTANT: all of these function bodies should really be
// wrapped in a try/catch, where catching an error calls
// next(err) --- this is omitted here for brevity in slides


/** get all dogs: [{id, name, age}, ...] */

router.get("/", async function (req, res, next) {
  let dogs = await Dog.getAll();
  // this makes sense, but it doesn't confirm that the dogs were made
  // call an instance method, which makes sure that they are a Dog
  dogs.forEach(d => d.speak())
  return res.json(dogs);
});

/** get dog by id: {id, name, age} */

router.get("/:id", async function (req, res, next) {
  let dog = await Dog.getById(req.params.id);
  return res.json(dog);
});

/** create dog from {name, age}: return id */

router.post("/", async function (req, res, next) {
  try {
    const { name, age } = req.body
    let id = await Dog.create(name, age);
    return res.json(id);
    } catch(e) {
      return next(e);
    }
});

/** delete dog from {id}; returns "deleted" */

router.delete("/:id", async function (req, res, next) {
  try {
    let dog = await Dog.getById(req.params.id);
    await dog.remove();
    return res.json({ message : "deleted" });  
  } catch (e) {
    return next(e);
  }
});


/** age dog: returns new age */
// .save() will match the object to the sql, which is simpler to code than expected

router.post("/:id/age", async function (req, res, next) {
  try {
    let dog = await Dog.getById(req.params.id);
    dog.age += 1;
    await dog.save();
    return res.json(dog);
    } catch (e) {
      return next(e);
    }
});


module.exports = router;