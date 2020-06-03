const express = require('express')
const router = express.Router()

const book = require('./book.js')

router.get("/books", book.get)
router.get("/books/:id", book.getById)
router.post("/books", book.post)
router.patch("/books/:id", book.patch)
router.delete("/books/:id", book.deleteById)

module.exports = router