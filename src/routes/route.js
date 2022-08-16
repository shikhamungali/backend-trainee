const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");

router.post("/createBooksList", BookController.createBook);


router.get("/getBooksList", BookController.getNewBook);


router.get("/booksList", BookController.bookList);


router.post("/getBooksInYear", BookController.getBooksInYear);


router.post("/getParticularBooks", BookController.getParticularBooks);


router.get("/getXINRBooks", BookController.getXINRBooks);


router.get("/getRandomBooks", BookController.getRandomBooks);


module.exports = router;