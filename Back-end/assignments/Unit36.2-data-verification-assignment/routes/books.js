const express = require("express");
const Book = require("../models/book");
const jsonSchema = require("jsonschema");
const bookSchema = require("../schema/books_schema.json")
const ExpressError = require("../expressError")

const router = new express.Router();


/** GET / => {books: [book, ...]}  */

router.get("/", async function (req, res, next) {
  try {
    const books = await Book.findAll(req.query);
    const listOfErrors = []
    for (book of books) {
      const result = jsonSchema.validate(book, bookSchema);
      if (result.valid) {
        continue;
      } else {
        listOfErrors.push(result)
      }
    }
    if (listOfErrors.length === 0) {
      return res.json({ books });
    } 
    throw new ExpressError(listOfErrors, 400);
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  => {book: book} */

router.get("/:id", async function (req, res, next) {
  try {
    const book = await Book.findOne(req.params.id);
    result = jsonSchema.validate(book, bookSchema);
    if (result.valid) {
      return res.json({ book });
    } else {
      throw new ExpressError(result.error, 400);
    }
  } catch (err) {
    return next(err);
  }
});

/** POST /   bookData => {book: newBook}  */

router.post("/", async function (req, res, next) {
  try {
    const { book_candidate } = req.body.book;
    const result = jsonSchema.validate(book_candidate, bookSchema)
    // I made it so this route accepts a book object becuase that way there is no interference
    // if this app decided to use tokens for authentication
    if (result.valid) {
      const book = await Book.create(req.body.book);
      return res.status(201).json({ book });
    }
    throw new ExpressError(result.error, 400);
  } catch (err) {
    return next(err);
  }
});

/** PUT /[isbn]   bookData => {book: updatedBook}  */

router.put("/:isbn", async function (req, res, next) {
  try {
    const result = jsonSchema.validate(req.body.book, bookSchema)
    if (result.valid) {
      const book = await Book.update(req.params.isbn, req.body.book);
      return res.json({ book });
    }
    throw new ExpressError(result.error, 400);
  } catch (err) {
    return next(err);
  }
});

/** DELETE /[isbn]   => {message: "Book deleted"} */

router.delete("/:isbn", async function (req, res, next) {
  try {
    await Book.remove(req.params.isbn);
    return res.json({ message: "Book deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
