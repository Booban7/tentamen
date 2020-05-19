const express = require('express')
const router = express.Router()

const book = require('./book.js')

router.get("/books", book.get)
router.post("/books", book.post)
router.delete("/books/:id", book,deleteBook)
router.patch("/books/:id", book.patch)

module.exports = router