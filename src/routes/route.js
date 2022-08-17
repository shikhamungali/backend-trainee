const express = require("express");
const router = express.Router();
const BookController = require("../controllers/bookController");
const AuthorController = require("../controllers/authorController")

router.post("/createBooksList", BookController.createBook);
router.post("/createAuthorList", AuthorController.createAuthor);

router.get("/getBooksList", BookController.getNewBook);
router.get("/getAuthorList", AuthorController.getAuthor);


router.get("/getChetanBooks", BookController.booksByChetan);


router.get("/getTwoStates", BookController.TwoStates);



router.get("/getCostofbooks", BookController.CostOfBook);





module.exports = router;