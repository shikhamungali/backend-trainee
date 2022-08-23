const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publisherController = require("../controllers/publisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})
///=============================== author API ======================================================
router.post("/createAuthor", authorController.createAuthor  )
router.get("/getAuthorsData", authorController.getAuthorsData)

////====================================== PUBLISHER API ==============================================
router.post("/createPublisher", publisherController.createPublisher)
router.get("/getPublisherData", publisherController.getPublisher)

///================================== BOOK API =================================================
router.post("/createBook", bookController.createBook  )
router.get("/getBooksData", bookController.getBooksData)
router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)
router.put("/updateBooks", bookController.updateBooks)
router.get("/getSumOfPrices", bookController.getSumOfPrices)


module.exports = router;